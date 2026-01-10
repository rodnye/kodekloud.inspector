# Source Controller OCI Repository - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Helm-Controller-and-OCI-Registry/Source-Controller-OCI-Repository)

---

## Table of Contents

- Source Controller OCI Repository
  - Prerequisites
  - 1. Create the OCI Secret
  - 2. Register the OCI Repository as a Source
  - 3. Apply Manifests with Kustomization
  - 4. Fetching OCI-Hosted Helm Charts
  - Comparison of OCI vs. Helm Sources
  - Links and References
  - Watch Video
    - 4.1 Register the Helm Repository
    - 4.2 Deploy the Helm Chart

---

## Content

GitOps with FluxCD

Helm Controller and OCI Registry

# Source Controller OCI Repository

In this guide, we’ll show you how to use the Flux Source Controller to fetch resources from an OCI artifacts repository. This approach works with any compliant OCI registry—such as GitHub Container Registry (GHCR), Docker Hub, or cloud‐hosted registries—by leveraging the OCI Artifacts API.

## Prerequisites

- A running Kubernetes cluster with Flux installed in the `flux-system` namespace
- An OCI registry account (e.g., GitHub Container Registry)
- A personal access token (PAT) or registry credentials with pull permissions

## 1\. Create the OCI Secret

First, store your registry credentials in a Flux `Secret` of type `OCI`. This will allow Flux to authenticate when fetching artifacts.

> [!important]
> **Warning**
>
> Do **not** commit your `<GitHub-Personal-Access-Token>` or any credentials into your Git repository. Treat them as sensitive data.

```
flux create secret oci ghcr-auth \
  --url ghcr.io \
  --username sidd-harth \
  --password <<GitHub-Personal-Access-Token>>
# oci secret 'ghcr-auth' created in 'flux-system' namespace
```

## 2\. Register the OCI Repository as a Source

Point Flux to your OCI‐hosted image or artifact by creating an `OCIRepository` source.

```
flux create source oci nginx \
  --url oci://ghcr.io/sidd-harth/nginx \
  --tag 1.0.0 \
  --secret-ref ghcr-auth \
  --provider generic
# applying OCIRepository
# OCIRepository updated
# waiting for OCIRepository reconciliation
# OCIRepository reconciliation completed
# fetched revision: 1b31558/235b486df4a38f99336712
```

## 3\. Apply Manifests with Kustomization

Once the `OCIRepository` is ready, deploy its manifests into your cluster via a `Kustomization`.

```
flux create kustomization kust-nginx-oci \
  --source OCIRepository/nginx \
  --target-namespace default \
  --interval 10s \
  --prune=false \
  --health-check="Deployment/nginx.default"
# generating Kustomization
# applying Kustomization
# Kustomization updated
# waiting for Kustomization reconciliation
# Kustomization kust-nginx-oci is ready
# applied revision 1b31558/235b486df4a38f99336712
```

> [!important]
> **Note**
>
> Set `--prune=false` if you want to retain orphaned resources. Adjust `--interval` to control reconciliation frequency.

---

## 4\. Fetching OCI-Hosted Helm Charts

Flux’s Kustomize Controller cannot process Helm charts directly. To deploy charts stored in an OCI registry, register the same registry as a Helm source.

### 4.1 Register the Helm Repository

```
flux create source helm chart-oci \
  --url oci://ghcr.io/sidd-harth/chart \
  --secret-ref ghcr-auth
# generating HelmRepository source
# applying HelmRepository source
# HelmRepository source updated
# waiting for HelmRepository source reconciliation
# HelmRepository source reconciliation completed
```

### 4.2 Deploy the Helm Chart

Create a `HelmRelease` to instruct Flux’s Helm Controller to fetch and install the chart.

```
flux create helmrelease chart-oci-release \
  --source HelmRepository/chart-oci \
  --target-namespace nginx \
  --chart nginx \
  --chart-version 0.1.0
# generating HelmRelease
# applying HelmRelease
# HelmRelease chart-oci-release created
# waiting for HelmRelease reconciliation
# HelmRelease chart-oci-release is ready
# applied revision 0.1.0
```

This will trigger the Helm Controller to pull chart artifacts from your OCI registry and perform automated releases.

---

## Comparison of OCI vs. Helm Sources

| Resource Type  | Controller           | Use Case                        |
| -------------- | -------------------- | ------------------------------- |
| OCIRepository  | Source Controller    | Static YAML, images, configs    |
| Kustomization  | Kustomize Controller | Apply kustomized manifests      |
| HelmRepository | Source Controller    | OCI-packaged Helm charts        |
| HelmRelease    | Helm Controller      | Automated Helm chart deployment |

---

## Links and References

- [Flux CD Documentation](https://fluxcd.io/docs/)
- [OCI Artifacts Specification](https://github.com/opencontainers/artifacts)
- [Kustomize Controller](https://fluxcd.io/docs/components/kustomize/)
- [Helm Controller](https://fluxcd.io/docs/components/helm/)
- [GitHub Container Registry](https://docs.github.com/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/205ec7c7-4cb6-4ecb-9bb5-fa50419f1e68/lesson/e0dac113-2d98-451d-a64c-9989507e8b8c)**
>
> Watch video content
