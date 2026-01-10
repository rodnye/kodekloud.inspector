# DEMO Setup Bitnami Sealed - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Secret-Management-Sign-Verification/DEMO-Setup-Bitnami-Sealed)

---

## Table of Contents

- DEMO Setup Bitnami Sealed
  - Prerequisites
  - 1. Switch to the infrastructure branch
  - 2. Define the Helm repository
  - 3. Create a Flux Kustomization
  - 4. Verify the Sealed Secrets controller
  - 5. Install the kubeseal CLI
  - 6. Fetch the Sealed Secrets public certificate
  - 7. Seal and commit Kubernetes Secrets
  - Links and References
  - Watch Video

---

## Content

GitOps with FluxCD

Secret Management Sign Verification

# DEMO Setup Bitnami Sealed

In this guide, you’ll deploy the Bitnami Sealed Secrets controller using Flux CD and learn how to seal Kubernetes Secrets for safe Git storage. Follow the steps below to get started.

## Prerequisites

- A running Kubernetes cluster and configured `kubectl` context
- Flux v2 installed ([Flux CLI Install](https://fluxcd.io/docs/installation/))
- A Git repository (e.g., `bb-app-source-git`) with an `infrastructure` branch

---

## 1\. Switch to the `infrastructure` branch

> [!important]
> **Note**
>
> Always ensure your working directory is clean before switching branches.

```
cd bb-app-source-git
git checkout infrastructure
```

Expected output:

```
Switched to branch 'infrastructure'
Your branch is up to date with 'origin/infrastructure'.
```

---

## 2\. Define the Helm repository

Create a `HelmRepository` manifest under the `bitnami-sealed-secrets` directory to let Flux pull the Sealed Secrets charts.

```
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: HelmRepository
metadata:
  name: sealed-secrets
  namespace: flux-system
spec:
  interval: 24h
  url: https://bitnami-labs.github.io/sealed-secrets
```

Commit and push:

```
git add bitnami-sealed-secrets/helmrepository.yaml
git commit -m "Add Bitnami Sealed Secrets HelmRepository"
git push
```

---

## 3\. Create a Flux Kustomization

In your Flux cluster repo (for example, `block-buster/flux-clusters/dev-cluster`), scaffold a Kustomization that points to the Sealed Secrets path.

```
cd ~/block-buster/flux-clusters/dev-cluster
flux create kustomization sealed-secrets \
  --source GitRepository/infra-source-git \
  --path "./bitnami-sealed-secrets" \
  --prune=true \
  --interval=1h \
  --export > sealed-secrets-kustomization.yaml
```

Commit and reconcile:

```
git add sealed-secrets-kustomization.yaml
git commit -m "Add Sealed Secrets Kustomization"
git push


flux reconcile source git infra-source-git
flux reconcile kustomization sealed-secrets
```

---

## 4\. Verify the Sealed Secrets controller

The controller is deployed in the `kube-system` namespace. Run:

```
kubectl -n kube-system get all
```

You should see:

| Resource                                  | READY | STATUS  | AGE |
| ----------------------------------------- | ----- | ------- | --- |
| pod/sealed-secrets-controller-xxxxx       | 1/1   | Running | 30s |
| service/sealed-secrets-controller         | —     | —       | 30s |
| deployment.apps/sealed-secrets-controller | 1/1   | Running | 30s |
| replicaset.apps/sealed-secrets-controller | 1     | 1       | 30s |

A TLS Secret (`kubernetes.io/tls`) containing the controller’s key pair is also created in `kube-system`.

---

## 5\. Install the `kubeseal` CLI

Download and install the latest `kubeseal` binary:

```
VERSION="v0.19.5"
wget https://github.com/bitnami-labs/sealed-secrets/releases/download/${VERSION}/kubeseal-${VERSION}-linux-amd64.tar.gz
tar -xzf kubeseal-${VERSION}-linux-amd64.tar.gz
sudo mv kubeseal /usr/local/bin/
```

Validate installation:

```
kubeseal --version
```

Expected:

```
kubeseal version: 0.19.5
```

---

## 6\. Fetch the Sealed Secrets public certificate

You need the controller’s public key to seal secrets locally:

```
kubeseal \
  --fetch-cert \
  --controller-name sealed-secrets-controller \
  --controller-namespace kube-system \
  > sealed-secrets.pub
```

This outputs `sealed-secrets.pub`, which you will use to encrypt your Kubernetes Secrets.

---

## 7\. Seal and commit Kubernetes Secrets

1.  Create a plain Secret manifest (`secret.yaml`).
2.  Run:

    ```
    kubeseal \
      --cert sealed-secrets.pub \
      < secret.yaml \
      > sealed-secret.yaml
    ```

3.  Review, commit, and push `sealed-secret.yaml` to your Git repo. Flux will apply it automatically.

---

## Links and References

- [Sealed Secrets Repository](https://github.com/bitnami-labs/sealed-secrets)
- [Flux CD Documentation](https://fluxcd.io/docs/)
- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/c8ad2608-2804-4413-9041-5e8dc9126d53/lesson/254cf972-bcf8-421d-81ec-9434f6d441fc)**
>
> Watch video content
