# Kustomize ApiVersion Kind - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Kustomize-Basics-2025-Updates/Kustomize-ApiVersion-Kind)

---

## Table of Contents

- Kustomize ApiVersion Kind
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Kustomize Basics 2025 Updates

# Kustomize ApiVersion Kind

When managing Kubernetes resources with Kustomize, your configuration is defined in a kustomization.yaml file. While the ApiVersion and Kind properties are technically optional—since Kustomize assigns default values—they are essential for maintaining stability, especially when updates might introduce breaking changes.

Below is an example of a properly configured kustomization.yaml file:

```
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
# Kubernetes resources to be managed by Kustomize
resources:
  - nginx-depl.yaml
  - nginx-service.yaml
# Customizations to be applied
commonLabels:
  company: KodeKloud
```

> [!important]
> **Note**
>
> Hardcoding the ApiVersion and Kind values is a best practice that helps ensure compatibility and prevents unexpected behavior as new versions of Kustomize are released.

For additional insights on using Kustomize with Kubernetes, visit the [Kubernetes Documentation](https://kubernetes.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/031e84b8-bcbc-4f39-94d6-66d93b05bddc/lesson/0a9df343-8d0f-4db4-a85e-15945d53ef14)**
>
> Watch video content
