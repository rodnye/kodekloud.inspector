# Establishing Connection between Kubeseal and Kubernetes Cluster - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Introduction-to-Sealed-Secrets-in-Kubernetes/Sealed-Secrets-Fundamentals/Establishing-Connection-between-Kubeseal-and-Kubernetes-Cluster)

---

## Table of Contents

- Establishing Connection between Kubeseal and Kubernetes Cluster
  - 1. Verify Your Cluster Is Running
  - 2. Attempt to Fetch the Public Certificate
  - 3. Discover the Sealed Secrets Service
  - 4. Fetch and Save the Public Key
  - Quick Reference Table
  - Links and References
  - Watch Video

---

## Content

Introduction to Sealed Secrets in Kubernetes

Sealed Secrets Fundamentals

# Establishing Connection between Kubeseal and Kubernetes Cluster

Before you can start sealing secrets, the Kubeseal CLI must retrieve the public key from the Sealed Secrets controller running in your cluster. This key allows Kubeseal to encrypt secrets so that only the controller can decrypt them.

## 1\. Verify Your Cluster Is Running

First, ensure your Kubernetes cluster is healthy by listing all pods in the `kube-system` namespace:

```
kubectl get pods -n kube-system
```

You should see output similar to:

```
NAME                                          READY   STATUS    RESTARTS   AGE
coredns-5d78c9869d-wm8sw                      1/1     Running   0          13h
etcd-minikube                                 1/1     Running   0          13h
kube-apiserver-minikube                       1/1     Running   0          13h
kube-controller-manager-minikube              1/1     Running   0          13h
kube-proxy-x6f9j                              1/1     Running   0          13h
kube-scheduler-minikube                       1/1     Running   0          13h
my-release-sealed-secrets-76b49fc554-wk717    1/1     Running   0          21s
storage-provisioner                           1/1     Running   0          13h
```

> [!important]
> **Note**
>
> If any core component is not `Running`, troubleshoot using `kubectl describe pod <pod-name> -n kube-system` or check your cluster’s control-plane logs.

## 2\. Attempt to Fetch the Public Certificate

Run the following command to fetch the controller’s public certificate. This step fails initially because Kubeseal doesn’t know which controller service to target:

```
kubeseal --fetch-cert
```

Expected error:

```
error: cannot get sealed secret service: services "sealed-secrets-controller" not found
Please, use the flag --controller-name and --controller-namespace to set up the name and namespace of the sealed secrets controller
```

## 3\. Discover the Sealed Secrets Service

Identify the actual service name and namespace by listing services in `kube-system`:

```
kubectl get svc -n kube-system
```

Example output:

```
NAME                          TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
kube-dns                      ClusterIP   10.96.0.10     <none>        53/UDP     13h
my-release-sealed-secrets     ClusterIP   10.97.19.137   <none>        8080/TCP   3m25s
```

From this list, note:

- Service Name: `my-release-sealed-secrets`
- Namespace: `kube-system`

## 4\. Fetch and Save the Public Key

With the service details in hand, re-run the fetch command with the appropriate flags:

```
kubeseal --fetch-cert \
  --controller-name      my-release-sealed-secrets \
  --controller-namespace kube-system \
  > pub-cert.pem
```

If this completes without errors, you now have `pub-cert.pem` containing the Sealed Secrets controller’s public key.

> [!important]
> **Next Steps**
>
> You’re ready to use `kubeseal` with `--cert pub-cert.pem` to encrypt your Kubernetes Secrets. Learn more in the [Sealed Secrets documentation](https://github.com/bitnami-labs/sealed-secrets).

## Quick Reference Table

| Step                         | Command                                     | Purpose                                             |
| ---------------------------- | ------------------------------------------- | --------------------------------------------------- |
| Check cluster pods           | `kubectl get pods -n kube-system`           | Verify core components and Sealed Secrets pod state |
| List services                | `kubectl get svc -n kube-system`            | Discover the Sealed Secrets service name            |
| Fetch controller certificate | `kubeseal --fetch-cert --controller-name …` | Retrieve public key for encrypting secrets          |

## Links and References

- [Sealed Secrets Operator GitHub](https://github.com/bitnami-labs/sealed-secrets)
- [Kubeseal CLI Usage](https://github.com/bitnami-labs/sealed-secrets#kubeseal)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/introduction-to-sealed-secrets-in-kubernetes/module/0f3ed562-f151-48f9-bb8c-8d3a4dbb4fc3/lesson/59fb8d23-93b4-451f-9541-c486dbd250bd)**
>
> Watch video content
