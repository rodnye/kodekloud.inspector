# Managing Directories - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kustomize/Kustomize-Basics/Managing-Directories)

---

## Table of Contents

- Managing Directories
  - Flat Directory Structure
  - Introducing Subdirectories
  - Single Root kustomization.yaml
  - When the Resource List Grows
  - Nested kustomization.yaml Files
  - Command Reference
  - Links and References
  - Watch Video

---

## Content

Kustomize

Kustomize Basics

# Managing Directories

Even with a minimal `kustomization.yaml`, Kustomize lets you orchestrate Kubernetes manifests across many folders—no extra scripting required.

## Flat Directory Structure

When you start small, a single directory often suffices:

```
k8s/
├── api-depl.yaml
├── api-service.yaml
├── db-depl.yaml
└── db-service.yaml
```

To deploy all resources at once:

```
kubectl apply -f k8s/
```

This is plain Kubernetes—no Kustomize features yet.

## Introducing Subdirectories

As your manifest count grows, you might split them:

```
k8s/
├── api/
│   ├── api-depl.yaml
│   └── api-service.yaml
└── db/
    ├── db-depl.yaml
    └── db-service.yaml
```

Now deployment requires two commands:

```
kubectl apply -f k8s/api/
kubectl apply -f k8s/db/
```

> [!important]
> **Warning**
>
> Manually running `kubectl apply` in each subfolder can be error-prone and difficult to automate in CI/CD.

## Single Root kustomization.yaml

Instead of listing directories every time, create a single `kustomization.yaml` at `k8s/`:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization


resources:
  - api/api-depl.yaml
  - api/api-service.yaml
  - db/db-depl.yaml
  - db/db-service.yaml
```

Then deploy with one of these commands:

```
kustomize build k8s/ | kubectl apply -f -
# or
kubectl apply -k k8s/
```

> [!important]
> **Note**
>
> `kubectl apply -k` invokes Kustomize natively—you don’t need the standalone binary.

## When the Resource List Grows

Adding more services (e.g., `cache/`, `kafka/`) quickly makes the root manifest unwieldy:

```
k8s/
├── api/
├── db/
├── cache/
│   ├── redis-config.yaml
│   ├── redis-depl.yaml
│   └── redis-service.yaml
└── kafka/
    ├── kafka-config.yaml
    ├── kafka-depl.yaml
    └── kafka-service.yaml
```

A flat list of ten or more files in one `kustomization.yaml` is hard to maintain.

## Nested kustomization.yaml Files

A cleaner pattern is to give each subdirectory its own `kustomization.yaml`:

**`k8s/api/kustomization.yaml`**

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization


resources:
  - api-depl.yaml
  - api-service.yaml
```

**`k8s/db/kustomization.yaml`**

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization


resources:
  - db-depl.yaml
  - db-service.yaml
```

Repeat for `cache/` and `kafka/`. Then simplify your root `kustomization.yaml`:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization


resources:
  - api/
  - db/
  - cache/
  - kafka/
```

Deploy everything in one go:

```
kubectl apply -k k8s/
# or
kustomize build k8s/ | kubectl apply -f -
```

This hierarchical layout keeps the root file concise and scales seamlessly.

## Command Reference

| Layout                    | Command                  |
| ------------------------- | ------------------------ | ------------------- |
| Flat folder               | `kubectl apply -f k8s/`  |
| Single-root Kustomization | `kubectl apply -k k8s/`  |
| Build then apply          | `kustomize build k8s/ \\ | kubectl apply -f -` |

## Links and References

- [Kustomize Documentation](https://kubectl.docs.kubernetes.io/references/kustomize/)
- [kubectl apply](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#apply)
- [Kubernetes Manifests Guide](https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kustomize/module/8b591384-c5e2-4411-afc1-443d3f2ba735/lesson/4b621de0-dbb3-4f3c-a60b-6abfe7ba9e83)**
>
> Watch video content
