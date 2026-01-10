# What are OCI Artifacts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Helm-Controller-and-OCI-Registry/What-are-OCI-Artifacts)

---

## Table of Contents

- What are OCI Artifacts
  - Traditional vs. OCI-Based Storage
  - OCI Registries and Repositories
  - 1. Pushing a Docker Image
  - 2. Pushing a Helm Chart
  - 3. Publishing Plain Kubernetes Manifests
  - What’s Next?
  - Links and References
  - Watch Video

---

## Content

GitOps with FluxCD

Helm Controller and OCI Registry

# What are OCI Artifacts

In this guide, you’ll discover how **OCI Artifacts** simplify storing and distributing a variety of Kubernetes-related resources in a single, unified registry. By leveraging any OCI-compliant registry, you benefit from consistent authentication, authorization, and versioning across:

- Container images
- Helm charts
- Kubernetes manifests
- Kustomize overlays
- OPA policies

## Traditional vs. OCI-Based Storage

| Resource Type                   | Traditional Storage                                                           | Unified OCI Registry   |
| ------------------------------- | ----------------------------------------------------------------------------- | ---------------------- |
| Container images                | Container registries                                                          | OCI-compliant registry |
| Helm charts                     | [Artifact Hub](https://artifacthub.io) or Helm registries                     | OCI-compliant registry |
| Kubernetes manifests & overlays | Git repositories                                                              | OCI-compliant registry |
| OPA policies                    | [Open Policy Registry](https://openpolicyagent.org/docs/latest/opa-registry/) | OCI-compliant registry |

> [!important]
> **Note**
>
> An OCI registry implements the [OCI Distribution Specification](https://github.com/opencontainers/distribution-spec), enabling you to store any artifact type beyond container images.

---

## OCI Registries and Repositories

An **OCI Registry** is a server-side component that hosts one or more **repositories**, each containing multiple **artifacts** at various tags or digests.

- Registry → Repository → Artifact
- Artifacts can be images, charts, manifests, or any OCI-compatible payload

Next, we’ll walk through pushing three artifact types—Docker images, Helm charts, and plain Kubernetes manifests—to GitHub Container Registry (`ghcr.io`). The workflow applies equally to Azure, GCR, ECR, and other OCI-compliant registries.

---

## 1\. Pushing a Docker Image

1.  Authenticate with the registry.
2.  Tag your local image.
3.  Push it upstream.

```
# 1. Log in to ghcr.io
docker login ghcr.io \
  --username sidd-harth \
  --password <GH_PERSONAL_ACCESS_TOKEN>
# 2. Verify local image
docker images nginx
# REPOSITORY   TAG       IMAGE ID    CREATED     SIZE
# 3. Tag for ghcr.io
docker tag nginx ghcr.io/sidd-harth/nginx:1.1.0


# 4. Push the tagged image
docker push ghcr.io/sidd-harth/nginx:1.1.0
# The push refers to repository [ghcr.io/sidd-harth/nginx]
# 1.1.0: digest sha256:6ad839ec10c687385 size: 1570
```

> [!important]
> **Warning**
>
> Never commit your `Personal Access Token` or other credentials to version control. Store them securely with your CI/CD secrets manager.

---

## 2\. Pushing a Helm Chart

1.  Generate a new chart.
2.  Package it into a `.tgz`.
3.  Authenticate via Helm.
4.  Push to the OCI registry.

```
# 1. Create a chart named "app1"
helm create app1
# 2. Package the chart
helm package app1
# 3. Log in to ghcr.io with Helm
helm registry login ghcr.io \
  --username sidd-harth \
  --password <GH_PERSONAL_ACCESS_TOKEN>
# 4. Push the chart to OCI
helm push app1-1.0.0.tgz oci://ghcr.io/sidd-harth/nginx
# Pushed: ghcr.io/sidd-harth/nginx/app1:1.0.0
# Digest: sha256:81de917eaf38536b1145bdde2984d2cfd14
```

---

## 3\. Publishing Plain Kubernetes Manifests

Bundle your plain YAML manifests as an OCI artifact using the Flux CLI.

```
# Example directory layout
tree nginx/
├── manifests
│   ├── deployment.yaml
│   └── service.yaml
```

1.  Ensure you’re logged in (via Docker).
2.  Push the manifest directory.

```
# 1. Authenticate (if not already)
docker login ghcr.io \
  --username sidd-harth \
  --password <GH_PERSONAL_ACCESS_TOKEN>
# 2. Push manifests as OCI artifact
flux push artifact oci://ghcr.io/sidd-harth/nginx-2:$(git rev-parse --short HEAD) \
  --path="./nginx/manifests" \
  --source="$(git config --get remote.origin.url)" \
  --revision="$(git branch --show-current)-$(git rev-parse HEAD)"
# ✓ pushing to ghcr.io/sidd-harth/nginx-2:1b31558
# artifact successfully pushed to ghcr.io/sidd-harth/nginx-2@sha256:235b486d4f4a38f0151
```

---

## What’s Next?

With your artifacts securely stored in an OCI registry, you can seamlessly integrate any GitOps tool—such as [Flux](https://fluxcd.io)—to pull, verify, and deploy them into your Kubernetes clusters.

---

## Links and References

- [Open Container Initiative (OCI)](https://opencontainers.org)
- [OCI Distribution Specification](https://github.com/opencontainers/distribution-spec)
- [GitHub Container Registry](https://github.com/features/packages)
- [Helm OCI Registry Support](https://helm.sh/docs/topics/registries/)
- [Flux CLI: push artifact](https://fluxcd.io/docs/cmd/flux_push_artifact/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/205ec7c7-4cb6-4ecb-9bb5-fa50419f1e68/lesson/a341e1a3-4789-4f0e-8f85-52391332cb74)**
>
> Watch video content
