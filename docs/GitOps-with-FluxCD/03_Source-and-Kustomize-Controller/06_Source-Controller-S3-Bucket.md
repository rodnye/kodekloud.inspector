# Source Controller S3 Bucket - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Source-and-Kustomize-Controller/Source-Controller-S3-Bucket)

---

## Table of Contents

- Source Controller S3 Bucket
  - Prerequisites
  - 1. Create the MinIO Credentials Secret
  - 2. Register the Flux Bucket Source
  - 3. Apply Manifests with Flux Kustomization
  - Summary of Resources
  - Links and References
  - Watch Video

---

## Content

GitOps with FluxCD

Source and Kustomize Controller

# Source Controller S3 Bucket

In this guide, you’ll learn how to use Flux CD’s Source Controller to fetch Kubernetes manifests from an S3-compatible bucket (for example, MinIO). We assume you have a bucket named `k8s-manifests` with two subfolders, `app-A` and `app-B`, each containing its own manifests. By the end, you will:

1.  Store MinIO credentials in a Kubernetes Secret
2.  Register the bucket as a Flux `Bucket` source
3.  Apply the `app-A` manifests via a Flux `Kustomization`

---

## Prerequisites

- A running Kubernetes cluster
- Flux CD installed (Source and Kustomize Controllers)
- A MinIO (or other S3-compatible) endpoint
- A bucket named `k8s-manifests` containing `app-A/` and `app-B/`

---

## 1\. Create the MinIO Credentials Secret

Store your MinIO access key and secret key as a Kubernetes Secret in the `flux-system` namespace:

```
kubectl -n flux-system create secret generic minio-crd \
  --from-literal=accesskey=minioadmin \
  --from-literal=secretkey=minioadmin
```

Expected output:

```
secret/minio-crd created
```

> [!important]
> **Note**
>
> Ensure your credentials are scoped to the least-privileged user on your S3 endpoint.

---

## 2\. Register the Flux Bucket Source

Define a Flux `Bucket` resource that points to your S3-compatible endpoint. Replace the `--endpoint` value with your MinIO service address if different.

```
flux create source bucket minio-bucket \
  --bucket-name k8s-manifests \
  --endpoint minio.minio-dev.svc.cluster.local:9000 \
  --provider generic \
  --insecure \
  --secret-ref minio-crd
```

Sample output:

```
► generating Bucket source
✔ Bucket source updated
⟳ waiting for Bucket source reconciliation
✔ Bucket source reconciliation completed
fetched revision: b3642f24daf09a297b6237b345a6a
```

This creates a `Bucket` named `minio-bucket` in the `flux-system` namespace, which tars and retrieves all contents under `k8s-manifests`.

> [!important]
> **Warning**
>
> Using `--insecure` disables TLS verification. Only use this flag in trusted environments or testing scenarios.

---

## 3\. Apply Manifests with Flux Kustomization

Now that Flux can fetch the bucket contents, configure a Kustomization to build and apply the `app-A` manifests:

```
flux create kustomization kust-app-a \
  --source Bucket/minio-bucket \
  --path "./app-A" \
  --prune=true \
  --interval=10m
```

Sample output:

```
► generating Kustomization
✔ Kustomization updated
⟳ waiting for Kustomization reconciliation
✔ Kustomization kust-app-a is ready
✔ applied revision b3642f24daf09a297b6237b345a6a
```

Flux will now periodically reconcile and apply the contents of `app-A` to your cluster.

---

## Summary of Resources

| Resource        | Purpose                              | Flux Command                                |
| --------------- | ------------------------------------ | ------------------------------------------- |
| Secret          | Store MinIO S3 credentials           | `kubectl create secret generic minio-crd …` |
| Bucket (Source) | Fetch objects from `k8s-manifests`   | `flux create source bucket minio-bucket …`  |
| Kustomization   | Build & apply manifests from `app-A` | `flux create kustomization kust-app-a …`    |

---

## Links and References

- [Flux Source Controller](https://fluxcd.io/docs/components/source/)
- [Flux Bucket Source](https://fluxcd.io/docs/components/source/bucket/)
- [Flux Kustomization](https://fluxcd.io/docs/components/kustomize/kustomization/)
- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)
- [MinIO Documentation](https://min.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/857e34cf-a086-433b-bf3b-88a5a5096a6f/lesson/06320ec2-07d1-4c3f-b62a-506a88d68541)**
>
> Watch video content
