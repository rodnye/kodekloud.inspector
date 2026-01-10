# Installation of Kubeseal CLI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Introduction-to-Sealed-Secrets-in-Kubernetes/Sealed-Secrets-Fundamentals/Installation-of-Kubeseal-CLI)

---

## Table of Contents

- Installation of Kubeseal CLI
  - Prerequisites
  - Step 1: Download the Kubeseal Binary
  - Step 2: Extract the Executable
  - Step 3: Install to Your PATH
  - Step 4: Verify Connectivity
  - References
  - Watch Video

---

## Content

Introduction to Sealed Secrets in Kubernetes

Sealed Secrets Fundamentals

# Installation of Kubeseal CLI

Follow these steps to install the Kubeseal CLI on Linux. Kubeseal converts Kubernetes Secrets into SealedSecrets, allowing safe storage in Git.

## Prerequisites

- A working Kubernetes cluster
- `kubectl` configured and pointed at your cluster

> [!important]
> **Note**
>
> Kubeseal v0.23.0 is used here as an example. Replace `0.23.0` with the version you need:
>
> ```
> export KUBESEAL_VERSION="0.23.0"
> ```

## Step 1: Download the Kubeseal Binary

Fetch the Linux AMD64 tarball from the official releases:

```
wget -O kubeseal-${KUBESEAL_VERSION}-linux-amd64.tar.gz \
  "https://github.com/bitnami-labs/sealed-secrets/releases/download/v${KUBESEAL_VERSION}/kubeseal-${KUBESEAL_VERSION}-linux-amd64.tar.gz"
```

## Step 2: Extract the Executable

Unpack only the `kubeseal` binary from the archive:

```
tar -xvzf kubeseal-${KUBESEAL_VERSION}-linux-amd64.tar.gz kubeseal
```

## Step 3: Install to Your PATH

Move `kubeseal` into `/usr/local/bin` for system-wide access:

```
sudo install -m 755 kubeseal /usr/local/bin/kubeseal
```

## Step 4: Verify Connectivity

Ensure Kubeseal can talk to the Sealed Secrets controller by listing pods in the `kube-system` namespace:

```
kubectl get pods -n kube-system
```

Example output:

```
NAME                                           READY   STATUS    RESTARTS   AGE
coredns-5d78c9869d-wm8sw                       1/1     Running   0          13h
etcd-minikube                                  1/1     Running   0          13h
kube-apiserver-minikube                        1/1     Running   0          13h
kube-controller-manager-minikube               1/1     Running   0          13h
kube-proxy-x6f9j                               1/1     Running   0          13h
kube-scheduler-minikube                        1/1     Running   0          13h
my-release-sealed-secrets-76b49fc554-wk717     1/1     Running   0          21s
storage-provisioner                            1/1     Running   1          13h
```

> [!important]
> **Success**
>
> Seeing the `my-release-sealed-secrets-*` pod in **Running** state means Kubeseal is installed and ready to use.

## References

- [Sealed Secrets GitHub Repository](https://github.com/bitnami-labs/sealed-secrets)
- [Kubeseal Releases](https://github.com/bitnami-labs/sealed-secrets/releases)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/introduction-to-sealed-secrets-in-kubernetes/module/0f3ed562-f151-48f9-bb8c-8d3a4dbb4fc3/lesson/f96bad90-6142-49d3-bacd-4714490b1273)**
>
> Watch video content
