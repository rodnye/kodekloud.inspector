# Kustomize ApiVersion Kind - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kustomize/Kustomize-Basics/Kustomize-ApiVersion-Kind)

---

## Table of Contents

- Kustomize ApiVersion Kind
  - Kustomize: Specifying apiVersion and kind
  - Why Declare apiVersion and kind?
  - Further Reading
  - Watch Video
    - Example kustomization.yaml

---

## Content

Kustomize

Kustomize Basics

# Kustomize ApiVersion Kind

## Kustomize: Specifying `apiVersion` and `kind`

When authoring your `kustomization.yaml`, explicitly declaring the `apiVersion` and `kind` fields is a recommended best practice. Although Kustomize infers sensible defaults when they’re omitted, specifying them ensures compatibility with future Kustomize releases and helps prevent unexpected breaking changes.

### Example `kustomization.yaml`

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

# List of Kubernetes manifests managed by Kustomize
resources:
  - nginx-depl.yaml
  - nginx-service.yaml

# Apply these labels to every resource
commonLabels:
  company: KodeKloud
```

> [!important]
> **Note**
>
> Defining `apiVersion` and `kind` in your `kustomization.yaml` locks in the schema and ensures that Kustomize processes your resources exactly as intended, even after upgrades.

## Why Declare `apiVersion` and `kind`?

| Benefit       | Description                                                                  |
| ------------- | ---------------------------------------------------------------------------- |
| Stability     | Prevents defaults from shifting in newer Kustomize versions                  |
| Clarity       | Makes the file self-descriptive and easier to review                         |
| Compatibility | Ensures tools and CI/CD pipelines that parse your manifest won’t break later |

## Further Reading

- [Kustomize Official Documentation](https://kubectl.docs.kubernetes.io/references/kustomize/)
- [Understanding `kustomization.yaml`](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kustomize/module/8b591384-c5e2-4411-afc1-443d3f2ba735/lesson/6e53fad0-8921-4260-8072-8693fc382a77)**
>
> Watch video content
