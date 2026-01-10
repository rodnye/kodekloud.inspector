# The 4Cs of Cloud Native Security - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Overview-of-Cloud-Native-Security/The-4Cs-of-Cloud-Native-Security)

---

## Table of Contents

- The 4Cs of Cloud Native Security
  - Overview of Vulnerabilities and Mitigations
  - 1. Cloud Security
  - 2. Cluster Security
  - 3. Container Security
  - 4. Code Security
  - Watch Video

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Overview of Cloud Native Security

# The 4Cs of Cloud Native Security

Protecting a Kubernetes-based voting application requires a multi-layered approach. In this guide, we’ll unpack the “4 C’s”—Cloud, Cluster, Container, and Code—to demonstrate how attackers exploit each layer and how you can shore up defenses across your entire stack.

## Overview of Vulnerabilities and Mitigations

| C         | Focus Area            | Common Attack Vectors                                 | Key Best Practices                                        |
| --------- | --------------------- | ----------------------------------------------------- | --------------------------------------------------------- |
| Cloud     | Infrastructure        | Exposed management ports, overly permissive IAM roles | Firewalls, VPN/bastion, role audits                       |
| Cluster   | Control Plane & APIs  | Public Docker API, unsecured Kubernetes API/Dashboard | Secure APIs, RBAC, OIDC/TLS, regular patching             |
| Container | Workload Isolation    | Untrusted images, privileged containers, lax runtime  | Image signing/scanning, PSP/PSA, seccomp, resource limits |
| Code      | Application & Secrets | Hard-coded credentials, plaintext env vars, no mTLS   | Vault/K8s Secrets (encrypted), mutual TLS, code reviews   |

---

## 1\. Cloud Security

Cloud security protects the environment that hosts your cluster—public cloud, private data center, or colocation. In our demo, an attacker gained access because SSH and API ports were open with no firewall rules.

- Implement network firewalls or cloud security groups around SSH (22), Kubernetes API (6443), and other management ports.
- Require VPN or bastion host access for all administrative connections.
- Audit IAM roles and permissions monthly; follow the principle of least privilege.

> [!important]
> **Note**
>
> Regularly review firewall rules and security group configurations to prevent unintended exposure.

---

## 2\. Cluster Security

The control plane is the heart of Kubernetes. In our breach scenario, the Docker remote API, Kubernetes API server, and Dashboard were exposed without auth.

- Restrict or disable the Docker remote API (`–host=unix:///var/run/docker.sock` only).
- Enable RBAC for the API server and Dashboard; define granular roles.
- Use OIDC, service accounts, or TLS client certificates for authentication.
- Keep control plane components and etcd up to date with patches.

> [!important]
> **Warning**
>
> Disabling the Docker remote API can impact automation scripts. Validate your CI/CD pipelines before rolling this out in production.

---

## 3\. Container Security

Containers should run with the least privilege and only use trusted images. In our example, the attacker pulled arbitrary images, ran them in privileged mode, and installed malicious software.

- Enforce image signing and vulnerability scanning; whitelist approved registries.
- Block privileged containers by default with Pod Security Policies (PSP) or Pod Security Admission (PSA).
- Leverage runtimes that support user namespaces, seccomp, and AppArmor profiles.
- Set CPU, memory limits and use read-only root filesystems.

> [!important]
> **Note**
>
> Pod Security Admission (PSA) is the replacement for PSP in newer Kubernetes versions. Ensure you migrate policies accordingly.

---

## 4\. Code Security

Application-level flaws—like hard-coded secrets, plaintext environment variables, and missing TLS—open doors to attackers.

- Store and manage secrets with tools such as [HashiCorp Vault](https://www.vaultproject.io/) or [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/), enabling encryption at rest.
- Implement mutual TLS (mTLS) for service-to-service communication inside the cluster.
- Conduct regular code reviews and static analysis to catch vulnerabilities early.

---

![The image illustrates the "4 C's of Cloud Native Security," which include Code, Container, Cluster, and Cloud, each with specific security practices and components.](https://kodekloud.com/kk-media/image/upload/v1752880867/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-The-4Cs-of-Cloud-Native-Security/4-cs-cloud-native-security.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/a0ddd095-0114-4aa4-b3a5-2b31e773f241/lesson/d7cf008d-bd13-46e2-9571-f380e33e31f0)**
>
> Watch video content
