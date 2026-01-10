# Demo Troubleshooting Internal Networking - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Kubernetes-Services/Demo-Troubleshooting-Internal-Networking)

---

## Table of Contents

- Demo Troubleshooting Internal Networking
  - Table of Contents
  - 1. Verify CNI Pod Health
  - 2. Inspect Network Policies
  - 3. Troubleshoot Pods and Services
  - 4. Summary
  - 5. References
  - Watch Video
  - Practice Lab
    - 1.1 Using the Cilium CLI
    - 1.2 Running cilium-debug
    - 1.3 Checking Node Connectivity
    - 2.1 Testing Egress Connectivity
    - 3.1 Checking Pod Status and Logs
    - 3.2 Port-Forwarding to the Pod
    - 3.3 Verifying Service Endpoints

---

## Content

Kubernetes Networking Deep Dive

Kubernetes Services

# Demo Troubleshooting Internal Networking

In this step-by-step guide, you’ll learn how to diagnose and resolve internal networking issues in Kubernetes using Cilium CNI, NetworkPolicies, and core troubleshooting techniques for Pods and Services. These best practices help ensure cluster connectivity and reliable application delivery.

## Table of Contents

1.  [Verify CNI Pod Health](#1-verify-cni-pod-health)  
    1.1 [Using the Cilium CLI](#11-using-the-cilium-cli)  
    1.2 [Running `cilium-debug`](#12-running-cilium-debug)  
    1.3 [Checking Node Connectivity](#13-checking-node-connectivity)
2.  [Inspect Network Policies](#2-inspect-network-policies)  
    2.1 [Testing Egress Connectivity](#21-testing-egress-connectivity)
3.  [Troubleshoot Pods and Services](#3-troubleshoot-pods-and-services)  
    3.1 [Checking Pod Status and Logs](#31-checking-pod-status-and-logs)  
    3.2 [Port-Forwarding to the Pod](#32-port-forwarding-to-the-pod)  
    3.3 [Verifying Service Endpoints](#33-verifying-service-endpoints)
4.  [Summary](#4-summary)
5.  [References](#5-references)

---

## 1\. Verify CNI Pod Health

Start by confirming that all Cilium components are running in the `kube-system` namespace:

```
kubectl get pods -n kube-system
```

Sample output:

```
NAME                                   READY   STATUS    RESTARTS   AGE
cilium-6xfl8                           1/1     Running   0          3m11s
cilium-9qzr8                           1/1     Running   0          3m11s
cilium-operator-58684c48c9-4rntb       1/1     Running   0          3m11s
coredns-76f75df574-964d                1/1     Running   0          2m54s
```

Cilium consists of:

- A **DaemonSet** (`cilium-<pod>`) on each node
- A single **operator** pod managing cluster-wide CRDs

Inspect operator logs to catch any errors or warnings:

```
kubectl logs -n kube-system cilium-operator-58684c48c9-4rntb
```

![The image shows a log output from a Kubernetes system, detailing operations related to Cilium, including node taints, pod scheduling, and garbage collection processes.](https://kodekloud.com/kk-media/image/upload/v1752880343/notes-assets/images/Kubernetes-Networking-Deep-Dive-Demo-Troubleshooting-Internal-Networking/kubernetes-cilium-log-output-details.jpg)

For agent diagnostics, view a Cilium DaemonSet pod log:

```
kubectl logs -n kube-system cilium-6xfl8
```

### 1.1 Using the Cilium CLI

If you have the **Cilium CLI** installed, quickly check cluster health:

```
cilium status
```

Example:

```
Cilium:                OK
Operator:              OK
DaemonSet cilium:      Desired: 2, Ready: 2/2, Available: 2/2
```

### 1.2 Running `cilium-debug`

Run the built-in debug tool to gather component status:

```
kubectl exec -n kube-system cilium-6xfl8 -- cilium-debug status
```

Key checks include KVStore, API server connectivity, IPAM, and overall cluster health:

```
Kubernetes:              Ok      1.29 (v1.29.0) [linux/amd64]
Cilium:                  Ok      1.15.3
Cluster health:         2/2 reachable (2024-07-21T20:18:25Z)
```

### 1.3 Checking Node Connectivity

Validate inter-node connectivity with `cilium-health`:

```
kubectl exec -n kube-system cilium-6xfl8 -- cilium-health status
```

```
Kubernetes:         Ok      1.29 (v1.29.0)
Cilium:             Ok      1.15.3
Cilium health:      2/2 reachable (2024-07-21T20:18:25Z)
```

---

## 2\. Inspect Network Policies

NetworkPolicies can block unintended traffic flows. List all policies across namespaces:

```
kubectl get networkpolicies.networking.k8s.io -A
```

| NAMESPACE | NAME                | POD-SELECTOR | AGE   |
| --------- | ------------------- | ------------ | ----- |
| default   | default-deny-egress | <none>       | 7m12s |

Describe a restrictive policy:

```
kubectl describe networkpolicies.networking.k8s.io default-deny-egress -n default
```

```
PodSelector: <none>    # Applies to all pods in this namespace
Policy Types: Egress
Egress: <none>         # Denies all egress traffic
```

> [!important]
> **Warning**
>
> Deleting or modifying NetworkPolicies in production can expose workloads. Always validate in a non-production namespace first.

### 2.1 Testing Egress Connectivity

Launch a temporary pod to test outbound access:

```
kubectl run --rm -i --tty debug \
  --image=curlimages/curl \
  --restart=Never \
  -- curl www.google.com --connect-timeout 2
```

- If the request hangs, the policy is blocking egress.
- To restore connectivity, delete the policy:

```
kubectl delete networkpolicy default-deny-egress -n default
```

Re-run the curl test to confirm successful egress.

---

## 3\. Troubleshoot Pods and Services

### 3.1 Checking Pod Status and Logs

List application pods:

```
kubectl get pods
```

If a pod is running but not behaving, inspect its details and events:

```
kubectl describe pod nginx-deployment-56fcf95486-7d2dw
```

![The image shows a terminal output displaying Kubernetes pod details, including conditions, volumes, and events related to the deployment and startup of an Nginx container.](https://kodekloud.com/kk-media/image/upload/v1752880344/notes-assets/images/Kubernetes-Networking-Deep-Dive-Demo-Troubleshooting-Internal-Networking/kubernetes-pod-details-nginx-container.jpg)

Follow up by streaming the logs:

```
kubectl logs -f nginx-deployment-56fcf95486-7d2dw
```

### 3.2 Port-Forwarding to the Pod

Test direct connectivity by forwarding local port 8080 to the pod’s port 80:

```
kubectl port-forward nginx-deployment-56fcf95486-7d2dw 8080:80
```

Open your browser or use `curl http://localhost:8080` to verify the service response.

### 3.3 Verifying Service Endpoints

Services provide stable access to Pods. If port-forward works on the pod but fails on the Service:

1.  Describe the Service:

    ```
    kubectl describe svc nginx-service
    ```

2.  If you see `Endpoints: <none>`, the selector may not match any Pods.
3.  Check the Pod labels:

    ```
    kubectl get pod nginx-deployment-56fcf95486-7d2dw \
      -o=jsonpath='{.metadata.labels}'
    ```

4.  Edit the Service selector to match the Pod labels:

    ```
    kubectl edit svc nginx-service
    # Update selector from app=nginx-website to app=nginx
    ```

5.  Confirm the endpoint appears:

    ```
    kubectl describe svc nginx-service
    # Endpoints: 10.0.0.247:80
    ```

6.  Forward traffic via the Service:

    ```
    kubectl port-forward svc/nginx-service 8080:80
    ```

---

## 4\. Summary

In this tutorial, you learned how to:

- Validate **Cilium CNI** health with pod status, logs, and CLI tools (`cilium status`, `cilium-debug`, `cilium-health`).
- Inspect and test the impact of **NetworkPolicies** on egress traffic.
- Diagnose **Pod** and **Service** connectivity with `kubectl describe`, logs, port-forwarding, and selector verification.

Following these steps will help you quickly identify and resolve internal networking issues in your Kubernetes cluster.

---

## 5\. References

- [Cilium Documentation](https://docs.cilium.io/)
- [Kubernetes Networking Concepts](https://kubernetes.io/docs/concepts/cluster-administration/networking/)
- [Kubernetes API Reference: NetworkPolicy](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.29/#networkpolicy-v1-networking-k8s-io)
- [cilium CLI GitHub](https://github.com/cilium/cilium-cli)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/00c6db37-72b0-44e1-8c3a-81e22c8d8af6/lesson/fd0eb557-015f-4090-999d-ee11e7eaa847)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/00c6db37-72b0-44e1-8c3a-81e22c8d8af6/lesson/00eed1e5-013f-4b11-82dd-604cb24288d8)**
>
> Practice lab
