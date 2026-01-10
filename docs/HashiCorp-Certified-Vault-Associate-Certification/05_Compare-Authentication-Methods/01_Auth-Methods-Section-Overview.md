# Auth Methods Section Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-Authentication-Methods/Auth-Methods-Section-Overview)

---

## Table of Contents

- Auth Methods Section Overview
  - What You’ll Learn
  - Links and References
  - Watch Video
    - 1A. Describe Vault Auth Methods
    - 1B. Choose an Auth Method Based on Use Case
    - 1C. Differentiate Human vs. System Auth Methods

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare Authentication Methods

# Auth Methods Section Overview

In this lesson, we’ll move beyond the basics of Vault and explore its authentication (auth) methods in depth. Properly choosing and implementing an auth method is vital for secure access to Vault. Here’s what we’ll cover:

## What You’ll Learn

### 1A. Describe Vault Auth Methods

- Define Vault’s auth methods and key terminology
- Walk through the full authentication workflow: submitting credentials to Vault and receiving a token
- Explain entities and groups: their roles and significance in Vault

![The image is a section overview with three objectives related to authentication methods, including descriptions, use cases, and differentiating human versus system methods.](https://kodekloud.com/kk-media/image/upload/v1752878008/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Auth-Methods-Section-Overview/authentication-methods-overview-objectives.jpg)

### 1B. Choose an Auth Method Based on Use Case

- Evaluate common scenarios: automation, cloud-based requests, and human users (UI/CLI)
- Determine which auth method best fits each scenario

<table> <thead> <tr> <th>Use Case</th> <th>Recommended Auth Method</th> <th>Example</th> </tr> </thead> <tbody> <tr> <td>Automated CI/CD</td> <td>AppRole</td> <td><code>vault write auth/approle/role/ci-role</code></td> </tr> <tr> <td>AWS Workloads</td> <td>AWS IAM</td> <td><code>vault auth enable aws</code></td> </tr> <tr> <td>Human Users</td> <td>Userpass or LDAP</td> <td><code>vault auth enable userpass</code></td> </tr> </tbody> </table>

### 1C. Differentiate Human vs. System Auth Methods

- Compare methods tailored for human users versus system workloads
- Discuss:
  - Human access through the CLI or UI
  - Workloads on AWS, Azure, and GCP
  - Machine-to-machine interactions across on-premises, cloud, and hybrid environments

![The image is a section overview with three objectives related to authentication methods, including descriptions, use cases, and differentiating human versus system methods.](https://kodekloud.com/kk-media/image/upload/v1752878009/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Auth-Methods-Section-Overview/authentication-methods-overview-objectives-2.jpg)

<table> <thead> <tr> <th>Category</th> <th>Auth Method</th> <th>Access Pattern</th> </tr> </thead> <tbody> <tr> <td>Human</td> <td>Userpass, LDAP, GitHub</td> <td>Interactive CLI / UI login</td> </tr> <tr> <td>System</td> <td>AppRole, AWS IAM, Azure MSI, GCP IAM</td> <td>Token exchange via API</td> </tr> </tbody> </table>

With these goals in place, we’ll dive into each auth method, answer frequently asked questions, and guide you in selecting the right approach for your environment.

Let’s get started!

## Links and References

- [Vault Authentication Methods](https://www.vaultproject.io/docs/auth)
- [Vault Entities and Groups](https://www.vaultproject.io/docs/concepts/entities-groups)
- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs)

> [!important]
> **Note**
>
> Entities in Vault represent human or machine identities, while groups allow you to bundle entities for policy management.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/eebfb593-8885-43b0-a9ba-9f88af87092e/lesson/33243008-40e6-47cf-8ef0-4f4a39bd4e4d)**
>
> Watch video content
