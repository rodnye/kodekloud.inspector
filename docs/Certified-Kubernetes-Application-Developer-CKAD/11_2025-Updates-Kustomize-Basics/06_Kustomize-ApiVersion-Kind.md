# Kustomize ApiVersion Kind - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/2025-Updates-Kustomize-Basics/Kustomize-ApiVersion-Kind)

---

## Table of Contents

- Kustomize ApiVersion Kind
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

2025 Updates Kustomize Basics

# Kustomize ApiVersion Kind

Just like other Kubernetes resource files, you can specify the ApiVersion and Kind properties explicitly in your kustomization.yaml file. Although these properties are optional—since Kustomize assigns default values by default—it is highly recommended to hardcode them. This proactive approach helps safeguard your configuration against potential breaking changes in future Kustomize releases.

Below is an example of a kustomization.yaml file that includes the ApiVersion and Kind properties, along with a defined list of resources and common labels for customization:

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
> Hardcoding the ApiVersion and Kind properties ensures compatibility and clarity in your configuration files, making them more predictable and easier to manage.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/2503ab74-a871-4b65-a677-7180c001d5c5/lesson/0a9df343-8d0f-4db4-a85e-15945d53ef14)**
>
> Watch video content
