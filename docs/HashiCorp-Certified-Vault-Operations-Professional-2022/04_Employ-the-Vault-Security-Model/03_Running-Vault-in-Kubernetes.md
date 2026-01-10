# Running Vault in Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Employ-the-Vault-Security-Model/Running-Vault-in-Kubernetes)

---

## Table of Contents

- Running Vault in Kubernetes
  - Deploying with the Official Helm Chart
  - TLS End-to-End Encryption
  - Disable Core Dumps
  - Enable mlock
  - Run as Non-Root & Read-Only Filesystem
  - Security Context Cheat Sheet
  - Additional Best Practices
  - Watch Video

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Employ the Vault Security Model

# Running Vault in Kubernetes

In this guide, we explore the security implications and best practices for running HashiCorp Vault on Kubernetes platforms like EKS, AKS, GKE, and OpenShift. While Vault’s default security model targets VMs or bare metal, containerized deployments require extra hardening. The easiest way to get started is with the official Helm chart—just provide your custom values and install.

## Deploying with the Official Helm Chart

To install Vault using Helm:

```
helm repo add hashicorp https://helm.releases.hashicorp.com
helm repo update
helm install vault hashicorp/vault \
  --namespace vault \
  --create-namespace \
  --values my-vault-values.yaml
```

This chart supports high availability, integrated storage backends, TLS, and more. Customize `my-vault-values.yaml` to enable mlock, non-root execution, and other hardening options.

## TLS End-to-End Encryption

Ensure that all traffic between clients, load balancers, and Vault pods is encrypted with TLS 1.2 or higher. Do **not** terminate TLS at the load balancer; instead, use TLS passthrough so that Vault pods handle the certificate handshake.

> [!important]
> **Note**
>
> Configure your cloud load balancer for TCP passthrough to maintain end-to-end encryption. This prevents cleartext traffic from ever reaching your Vault pods.

![The image is a diagram illustrating TLS end-to-end encryption for a load balancer service with vault servers and persistent volume claims. It includes notes on not offloading TLS at the load balancer, ensuring encryption, using trusted CA-signed certificates, and requiring TLS 1.2 or higher.](https://kodekloud.com/kk-media/image/upload/v1752878550/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Running-Vault-in-Kubernetes/tls-end-to-end-encryption-diagram.jpg)

Use certificates signed by a trusted CA, enforce TLS 1.2+, and mount each Vault pod’s certificate and private key via a Kubernetes `Secret` and a `PersistentVolumeClaim`.

![The image illustrates a TLS end-to-end encryption setup with a load balancer service and multiple vault servers, emphasizing not offloading TLS at the load balancer and using trusted CA-signed certificates. It also highlights the requirement for TLS 1.2+ and includes persistent volume claims for each node.](https://kodekloud.com/kk-media/image/upload/v1752878551/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Running-Vault-in-Kubernetes/tls-end-to-end-encryption-setup.jpg)

## Disable Core Dumps

Core dumps can inadvertently capture Vault’s in-memory encryption keys. Disable them at the kernel and container levels:

```
# Disable core dumps on the host
ulimit -c 0
```

In your Pod spec security context:

```
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  capabilities:
    add: ["IPC_LOCK"]
  resources:
    limits:
      core: 0
```

> [!important]
> **Warning**
>
> A core dump could expose sensitive encryption keys. Always set `RLIMIT_CORE` to `0` in your containers.

![The image provides guidance on disabling core dumps in a Kubernetes cluster, highlighting the importance of setting `RLIMIT_CORE` to 0 to prevent core dumps that may contain sensitive encryption keys. It includes a diagram of a Kubernetes cluster with nodes running Vault servers.](https://kodekloud.com/kk-media/image/upload/v1752878552/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Running-Vault-in-Kubernetes/disable-core-dumps-kubernetes-diagram.jpg)

## Enable mlock

Prevent Vault’s memory from being swapped to disk by granting the `IPC_LOCK` capability. This ensures in-memory encryption keys never hit swap:

```
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  capabilities:
    add: ["IPC_LOCK"]
```

## Run as Non-Root & Read-Only Filesystem

Running Vault as root increases risk if a container escape occurs. Enforce non-root execution and mount the filesystem read-only:

```
apiVersion: v1
kind: Pod
metadata:
  name: vault-server
spec:
  containers:
    - name: vault
      image: vault:latest
      securityContext:
        runAsNonRoot: true
        readOnlyRootFilesystem: true
        capabilities:
          add: ["IPC_LOCK"]
```

![The image is a slide advising not to run Vault as root, explaining that it should run as an unprivileged user to prevent exposure of process memory and encryption keys. It features a yellow background with a cartoon character in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752878553/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Running-Vault-in-Kubernetes/vault-not-run-as-root-advice.jpg)

## Security Context Cheat Sheet

| Feature                   | Configuration Snippet                  | Purpose                               |
| ------------------------- | -------------------------------------- | ------------------------------------- |
| Disable Core Dumps        | limits.core: 0                         | Prevents writing memory dumps to disk |
| Enable mlock              | capabilities.add: \\["IPC\\_LOCK"\\]   | Locks memory to avoid swapping        |
| Non-Root Execution        | runAsNonRoot: true<br/>runAsUser: 1000 | Reduces attack surface in container   |
| Read-Only Root Filesystem | readOnlyRootFilesystem: true           | Prevents unwanted file modifications  |

## Additional Best Practices

- Deploy Vault on a dedicated Kubernetes cluster.
- Minimize enabled auth methods and secrets engines.
- Keep token TTLs short and prune unused policies regularly.
- Ensure Vault is the main process (PID 1) in each container, so it receives signals properly.

For a deeper dive, see the  
[HashiCorp Learn tutorial on running Vault in Kubernetes](https://learn.hashicorp.com/tutorials/vault/kubernetes).  
Other useful references:

- [Vault Helm Chart](https://artifacthub.io/packages/helm/hashicorp/vault)
- [Kubernetes Security Context](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/e5e1dc8a-e494-400d-8c96-44665ed5981d/lesson/900fe81c-0d64-466a-adc0-75c07d1d27d0)**
>
> Watch video content
