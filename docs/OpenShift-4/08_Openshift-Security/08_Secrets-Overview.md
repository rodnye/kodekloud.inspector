# Secrets Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Openshift-Security/Secrets-Overview)

---

## Table of Contents

- Secrets Overview
  - Watch Video

---

## Content

OpenShift 4

Openshift Security

# Secrets Overview

In Kubernetes, Secrets offer a robust way to manage sensitive information such as passwords, connection strings, API tokens, and even simple text messages. Although it might seem unusual to store a casual "hello world" message as a Secret, Kubernetes provides the flexibility to manage any string you choose securely.

Whenever you need to protect sensitive data—like usernames, passwords, or API keys—a Secret is the ideal solution to prevent unauthorized access.

![The image shows a blue icon of a key next to a text box labeled "Store Sensitive info," with four red buttons labeled "User," "Anything," "Hello!?," and "You Got Options!"](https://kodekloud.com/kk-media/image/upload/v1752882750/notes-assets/images/OpenShift-4-Secrets-Overview/blue-key-store-sensitive-info.jpg)

By default, Kubernetes encodes Secrets using base64 encoding. However, this encoding does not encrypt the data. Unless encryption at rest is explicitly configured, these Secrets are stored as plain text in the cluster's etcd datastore. Although data is handled securely during transmission to a Pod, be aware that it may remain unencrypted when stored.

> [!important]
> **Security Warning**
>
> Without additional encryption measures, your base64 encoded data in etcd could be vulnerable. Always consider integrating advanced security solutions for production environments.

![The image is a diagram illustrating a Kubernetes security process involving the OPAC standard, with icons representing keys, locks, and containers.](https://kodekloud.com/kk-media/image/upload/v1752882751/notes-assets/images/OpenShift-4-Secrets-Overview/kubernetes-security-opac-diagram.jpg)

In many production environments, administrators choose to enhance security by leveraging advanced secret management solutions. These may include:

- **HashiCorp Vault** for dynamic secrets and access control.
- **AWS Secrets Manager** and **Azure Key Vault** for cloud-native secret management.
- Managed Kubernetes service tools available in platforms such as [AWS EKS](https://learn.kodekloud.com/user/courses/aws-eks) and [Azure Kubernetes Service](https://learn.kodekloud.com/user/courses/azure-kubernetes-service).

![The image shows a blue key icon alongside logos for HashiCorp Vault, AWS, and Kubernetes, suggesting a theme of cloud security or management.](https://kodekloud.com/kk-media/image/upload/v1752882752/notes-assets/images/OpenShift-4-Secrets-Overview/cloud-security-key-icon-logos.jpg)

Even if your current setup does not require advanced secret management, or if you want to experiment with different security configurations, understanding how to create and use Secrets in Kubernetes is essential.

> [!important]
> **Demo Overview**
>
> In the upcoming demo, we will walk you through the process of creating a Secret and integrating it into your Deployments and Pods. This demonstration will help solidify your understanding of managing sensitive information within your Kubernetes environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/413252bb-7455-41fa-86eb-e3e9370c8f08/lesson/d23e7b8a-0e79-4cbb-97d3-cf1c43df5b83)**
>
> Watch video content
