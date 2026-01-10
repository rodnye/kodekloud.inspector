# Network Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Kubernetes-Security-Fundamentals/Network-Policies)

---

## Table of Contents

- Network Policies
  - 1. Default “Allow-All” Behavior
  - 2. Deny All Ingress to the DB Pod
  - 3. Allow Ingress from the API Pod on Port 3306
  - 4. Restrict API Access by Namespace
  - 5. Allow Traffic from an External IP Range
  - 6. Adding Egress Rules
  - Summary of Policy Types
  - References
  - Watch Video
  - Practice Lab
    - Selector Logic

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Kubernetes Security Fundamentals

# Network Policies

In this guide, you’ll learn how to secure communication between pods using Kubernetes NetworkPolicies. We’ll start with a permissive default, then restrict access to a database (DB) pod so that only an API pod can connect on port 3306. Finally, you’ll see how to scope access by namespace, IP range, and even add egress rules.

## 1\. Default “Allow-All” Behavior

By default, Kubernetes does **not** restrict pod-to-pod traffic. Any pod in the cluster can communicate with any other pod on any port. To secure your DB pod:

1.  Deny all incoming traffic.
2.  Explicitly allow only the API pod to connect on port 3306.

## 2\. Deny All Ingress to the DB Pod

First, create a policy that selects pods with label `role=db` and blocks **all** ingress:

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-policy
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
    - Ingress
```

> [!important]
> **Note**
>
> This policy ensures no traffic can reach the DB pod until you add explicit `ingress` rules.

## 3\. Allow Ingress from the API Pod on Port 3306

Next, extend `db-policy` to permit traffic from the API pod:

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-policy
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              name: api-pod
      ports:
        - protocol: TCP
          port: 3306
```

> [!important]
> **Note**
>
> Responses from the DB pod back to the API pod are automatically allowed—no `egress` rule is required for reply traffic.

## 4\. Restrict API Access by Namespace

If you have multiple namespaces (`dev`, `test`, `prod`), the preceding policy allows API pods from **all** namespaces. To limit to the `prod` namespace, add a `namespaceSelector`:

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-policy
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              name: api-pod
          namespaceSelector:
            matchLabels:
              name: prod
      ports:
        - protocol: TCP
          port: 3306
```

> [!important]
> **Warning**
>
> The target namespace must have the label `name=prod` before this selector will match.

## 5\. Allow Traffic from an External IP Range

To permit a backup server (e.g., `192.168.5.10/32`) outside your cluster to read from the DB, use an `ipBlock`:

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-policy
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              name: api-pod
          namespaceSelector:
            matchLabels:
              name: prod
        - ipBlock:
            cidr: 192.168.5.10/32
      ports:
        - protocol: TCP
          port: 3306
```

Here, matching **either** condition (API pod in `prod` **OR** external IP) grants access.

### Selector Logic

| Combination                                | Semantics                    |
| ------------------------------------------ | ---------------------------- |
| `podSelector` + `namespaceSelector` (same) | AND (both must match)        |
| Multiple entries under `from` or `to`      | OR (any one entry may match) |

## 6\. Adding Egress Rules

If your DB pod must initiate outbound connections (e.g., pushing backups), include `Egress` in `policyTypes` and define an `egress` rule:

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: db-policy
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              name: api-pod
      ports:
        - protocol: TCP
          port: 3306
  egress:
    - to:
        - ipBlock:
            cidr: 192.168.5.10/32
      ports:
        - protocol: TCP
          port: 80
```

This allows the DB pod to send TCP traffic on port 80 to the backup server at `192.168.5.10`.

## Summary of Policy Types

| Policy Type | Controls                            |
| ----------- | ----------------------------------- |
| Ingress     | Incoming traffic to selected pods   |
| Egress      | Outgoing traffic from selected pods |

---

## References

- [Kubernetes NetworkPolicy](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/0148994b-9ccc-4725-a77b-a4a63592152f/lesson/34baae73-2cab-46bc-b5aa-688076e57052)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/0148994b-9ccc-4725-a77b-a4a63592152f/lesson/749eb79d-ebfc-40ad-af35-8639abfd721e)**
>
> Practice lab
