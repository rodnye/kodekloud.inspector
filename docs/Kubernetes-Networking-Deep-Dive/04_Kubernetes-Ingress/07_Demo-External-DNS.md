# Demo External DNS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Networking-Deep-Dive/Kubernetes-Ingress/Demo-External-DNS)

---

## Table of Contents

- Demo External DNS
  - Cluster Overview
  - 1. Install ExternalDNS via Helm
  - 2. Create and Apply the Ingress
  - References
  - Watch Video
    - Values Reference

---

## Content

Kubernetes Networking Deep Dive

Kubernetes Ingress

# Demo External DNS

In this guide, you will learn how to install and configure [ExternalDNS](https://github.com/kubernetes-sigs/external-dns) on a Kubernetes cluster to automatically manage DNS records in GoDaddy based on Ingress resources. This approach ensures that your services are always reachable via the correct domain names without manual DNS updates.

## Cluster Overview

Before we begin, verify the current state of your cluster and the Traefik ingress controller.

```
kubectl get all
```

```
NAME                                READY   STATUS    RESTARTS   AGE
pod/whoami-8c9864b56-phnp7          1/1     Running   0          17m


NAME                TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
service/kubernetes  ClusterIP   10.96.0.1        <none>        443/TCP   14h
service/whoami      ClusterIP   10.104.155.171   <none>        80/TCP    17m


NAME                                READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/whoami              1/1     1            1           17m


NAME                                        DESIRED   CURRENT   READY   AGE
replicaset.apps/whoami-8c9864b56           1         1         1       17m
```

Check Traefik in the `traefik` namespace:

```
kubectl get pods -n traefik
```

```
NAME                             READY   STATUS    RESTARTS   AGE
traefik-7df9fd988f-j49ln         1/1     Running   0          18m
```

---

## 1\. Install ExternalDNS via Helm

1.  Add and update the ExternalDNS Helm repository:

    ```
    helm repo add external-dns https://kubernetes-sigs.github.io/external-dns/
    helm repo update
    ```

2.  Create a `values.yaml` file with your GoDaddy credentials:

    ```
    # values.yaml
    provider:
      name: godaddy
    sources:
      - ingress
    domainFilters:
      - kubernetkk.xyz
    txtPrefix: external-dns
    txtOwnerId: owner-id
    extraArgs:
      - --godaddy-api-key=YOUR_GO_DADDY_API_KEY
      - --godaddy-api-secret=YOUR_GO_DADDY_API_SECRET
      - --godaddy-api-ote
    ```

### Values Reference

| Key             | Description                                                | Example                 |
| --------------- | ---------------------------------------------------------- | ----------------------- |
| `provider.name` | DNS provider to use                                        | `godaddy`               |
| `sources`       | Kubernetes resources to watch (`service`, `ingress`, etc.) | `- ingress`             |
| `domainFilters` | Domains allowed for record management                      | `- kubernetkk.xyz`      |
| `txtPrefix`     | Prefix for TXT ownership records                           | `external-dns`          |
| `txtOwnerId`    | Identifier for TXT record ownership                        | `owner-id`              |
| `extraArgs`     | Additional CLI flags, including API credentials & OTE flag | `--godaddy-api-key=...` |

> [!important]
> **Warning**
>
> Never commit your GoDaddy API key/secret to version control. Use a secure secret management system or Kubernetes `Secret`.

3.  Install ExternalDNS in the `default` namespace:

    ```
    helm install external-dns external-dns/external-dns \
      --values ./values.yaml --namespace default
    ```

4.  Confirm the ExternalDNS pod is running:

    ```
    kubectl get pods -n default -l app.kubernetes.io/name=external-dns
    ```

5.  View logs to verify it authenticates and syncs:

    ```
    kubectl logs -f deployment/external-dns -n default
    ```

    Expected log excerpt:

    ```
    time="2024-07-18T23:18:02Z" level=info msg="Using inCluster-config based on serviceaccount-token"
    time="2024-07-18T23:18:04Z" level=info msg="GoDaddy: 2 zones found"
    time="2024-07-18T23:18:04Z" level=info msg="All records are already up to date"
    ```

---

## 2\. Create and Apply the Ingress

Define an Ingress that exposes the `whoami` service and instructs ExternalDNS to manage the DNS record `whoami.kubernetkk.xyz` pointing to your node IP (`192.168.121.243` in this example).

```
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: whoami-ingress
  annotations:
    external-dns.alpha.kubernetes.io/hostname: whoami.kubernetkk.xyz
    external-dns.alpha.kubernetes.io/target: "192.168.121.243"
spec:
  rules:
    - http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: whoami
                port:
                  number: 80
```

Apply the Ingress:

```
kubectl apply -f ingress.yaml
```

Watch ExternalDNS logs as it detects the new Ingress:

```
kubectl logs -f deployment/external-dns -n default
```

Look for a log entry like:

```
time="2024-07-18T23:21:05Z" level=info msg="GoDaddy: 3 changes will be done"
```

This confirms that ExternalDNS is creating the DNS record.

> [!important]
> **Note**
>
> If you use a cloud provider’s `LoadBalancer` service type, omit the `external-dns.alpha.kubernetes.io/target` annotation. ExternalDNS will automatically use the LoadBalancer’s IP.

---

## References

- [ExternalDNS GitHub](https://github.com/kubernetes-sigs/external-dns)
- [GoDaddy API Documentation](https://developer.godaddy.com/)
- [Kubernetes Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
- [Helm Charts](https://helm.sh/docs/topics/charts/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-networking/module/19677663-2b7d-4c3d-92ee-06df9f5530eb/lesson/b562f81a-4ce6-404a-85de-01ed64dc8a03)**
>
> Watch video content
