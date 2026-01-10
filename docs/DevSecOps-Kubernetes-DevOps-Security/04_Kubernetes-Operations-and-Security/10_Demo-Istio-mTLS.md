# Demo Istio mTLS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/Kubernetes-Operations-and-Security/Demo-Istio-mTLS)

---

## Table of Contents

- Demo Istio mTLS
  - Prerequisites
  - 1. List Istio CRDs
  - 2. Inspect the prod Namespace
  - 3. Observe Traffic
  - 4. Visualize in Kiali
  - 5. Disable mTLS Globally
  - 6. Switch to Permissive Mode
  - 7. Enforce Strict mTLS Mode
  - 8. Verify with Packet Capture
  - Links and References
  - Watch Video

---

## Content

DevSecOps - Kubernetes DevOps & Security

Kubernetes Operations and Security

# Demo Istio mTLS

In this tutorial, you’ll learn how to enforce mutual TLS (mTLS) between your Kubernetes workloads using Istio’s PeerAuthentication API. We’ll cover:

- Listing Istio Custom Resource Definitions (CRDs)
- Inspecting pods and services in the `prod` namespace
- Observing traffic before and after mTLS
- Applying `DISABLE`, `PERMISSIVE`, and `STRICT` mTLS modes
- Verifying encryption with packet capture

## Prerequisites

- A running Kubernetes cluster with Istio installed
- `kubectl` configured for your cluster
- Kiali add-on for traffic visualization

## 1\. List Istio CRDs

Istio installs several CRDs, including PeerAuthentication. To view them:

```
kubectl get crd
```

Example output:

```
NAME                                                   CREATED AT
authorizationpolicies.security.istio.io               2021-06-20T13:04:57Z
envoyfilters.networking.istio.io                       2021-06-20T13:04:57Z
gateways.networking.istio.io                           2021-06-20T13:04:57Z
istiooperators.install.istio.io                        2021-06-20T13:04:57Z
monitoringdashboards.monitoring.kiali.io               2021-06-20T13:04:36Z
peerauthentication.security.istio.io                   2021-06-20T13:04:57Z
requestauthentications.security.istio.io               2021-06-20T13:04:57Z
services.networking.istio.io                           2021-06-20T13:04:57Z
sidecars.networking.istio.io                           2021-06-20T13:04:57Z
virtualservices.networking.istio.io                    2021-06-20T13:04:57Z
workloadentries.networking.istio.io                    2021-06-20T13:04:57Z
workloadgroups.networking.istio.io                     2021-06-20T13:04:56Z
```

By default, no PeerAuthentication resources are defined:

```
kubectl get peerauthentication -A
# No resources found
```

## 2\. Inspect the `prod` Namespace

List pods and services running in `prod`:

```
kubectl -n prod get pods,svc
```

Pods:

```
NAME                              READY   STATUS    RESTARTS   AGE
pod/devsecops-769f696c95f7jq      2/2     Running   0          2m17s
pod/devsecops-769f696c9f9f        2/2     Running   0          2m17s
pod/node-app-597464649c-5x75q     2/2     Running   0          4d4h
```

Services:

```
NAME                   TYPE        CLUSTER-IP       PORT(S)     AGE
service/devsecops-svc  ClusterIP   10.101.121.127   8080/TCP    4d2h
service/node-service   ClusterIP   10.101.46.231    5000/TCP    4d4h
```

## 3\. Observe Traffic

Generate continuous requests to the `devsecops-svc` service:

```
while true; do
  curl -s 10.101.121.127:8080/increment/99
  sleep 1
done
```

## 4\. Visualize in Kiali

Open Kiali’s Graph view for the `prod` namespace. By default, Istio uses **PERMISSIVE** mTLS, so you’ll see both plaintext and encrypted traffic between `devsecops-svc` and `node-service`.

![The image shows a Kiali dashboard displaying a service mesh graph for a Kubernetes environment, illustrating the connections and response times between different services.](https://kodekloud.com/kk-media/image/upload/v1752873753/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Istio-mTLS/kiali-dashboard-service-mesh-graph.jpg)

Click the lock icon to confirm which connections are encrypted.

## 5\. Disable mTLS Globally

> [!important]
> **Warning**
>
> Disabling mTLS will route all service-to-service traffic over plaintext HTTP, exposing your data in transit.

Create a `PeerAuthentication` in the `istio-system` namespace:

```
# peerauth-disable.yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: istio-system
spec:
  mtls:
    mode: DISABLE
```

Apply it:

```
kubectl apply -f peerauth-disable.yaml
```

Wait ~15 seconds and refresh Kiali. You’ll first see mixed traffic, then all connections drop the lock icon.

## 6\. Switch to Permissive Mode

> [!important]
> **Note**
>
> Permissive mode allows both mTLS and plaintext connections simultaneously—ideal for gradual rollout.

Edit the default PeerAuthentication:

```
kubectl edit peerauthentication default -n istio-system
```

Update the spec:

```
spec:
  mtls:
    mode: PERMISSIVE
```

Save and exit, then verify:

```
kubectl get peerauthentication default -n istio-system
# NAME      MODE        AGE
# default   PERMISSIVE  2m36s
```

Refresh Kiali to observe a mix of encrypted and unencrypted traffic.

## 7\. Enforce Strict mTLS Mode

To require mTLS for all workloads:

```
kubectl edit peerauthentication default -n istio-system
```

Change to:

```
spec:
  mtls:
    mode: STRICT
```

Save. The `curl` loop will now fail, as plaintext requests are blocked. Kiali will show a fully locked mesh:

![The image shows a Kiali dashboard displaying a service mesh graph for a Kubernetes environment, illustrating the connections and response times between different services.](https://kodekloud.com/kk-media/image/upload/v1752873755/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Istio-mTLS/kiali-dashboard-service-mesh-graph-2.jpg)

Hover over the lock icon to see “Mesh-wide mTLS is enabled.”

## 8\. Verify with Packet Capture

Install the `ksniff` plugin and capture traffic to confirm encryption:

```
# Install ksniff
kubectl krew install ksniff


# Capture TCP traffic from a pod
kubectl sniff <pod-name> -n prod --protocol tcp
```

Open the resulting PCAP in [Wireshark](https://www.wireshark.org/) and inspect TLS records on port `15001`.

---

In this lesson, you learned how to manage mTLS modes with Istio’s [PeerAuthentication API](https://istio.io/latest/docs/reference/config/security/peer_authentication/) and verify traffic encryption. Next, explore securing ingress traffic using the [Istio ingress gateway](https://istio.io/latest/docs/tasks/traffic-management/ingress/ingress-control/).

## Links and References

- [Istio PeerAuthentication API](https://istio.io/latest/docs/reference/config/security/peer_authentication/)
- [Kiali Documentation](https://www.kiali.io/documentation/)
- [Wireshark](https://www.wireshark.org/)
- [ksniff Plugin](https://krew.sigs.k8s.io/plugins/ksniff)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/fc1733bc-1e9c-4e38-ae86-84e6bd9af04d/lesson/48076de3-407c-435c-95af-1b1a07bb0a2a)**
>
> Watch video content
