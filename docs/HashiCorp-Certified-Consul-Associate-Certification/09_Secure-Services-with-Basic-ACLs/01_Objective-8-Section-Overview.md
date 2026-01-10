# Objective 8 Section Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Secure-Services-with-Basic-ACLs/Objective-8-Section-Overview)

---

## Table of Contents

- Objective 8 Section Overview
  - Lesson Objectives
  - Watch Video

---

## Content

HashiCorp Certified: Consul Associate Certification

Secure Services with Basic ACLs

# Objective 8 Section Overview

Welcome to Objective 8 of the HashiCorp Certified Consul Associate certification. In this lesson, you’ll discover how to secure your Consul environment using the Access Control List (ACL) system, ensuring fine-grained access control across services.

![The image outlines objectives for securing services with Access Control Lists (ACLs), including setting up ACL systems, creating policies, managing token lifecycles, and performing CLI and API requests using tokens. It also indicates a difficulty level of 2.](https://kodekloud.com/kk-media/image/upload/v1752877960/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Objective-8-Section-Overview/acl-security-objectives-policies-tokens.jpg)

## Lesson Objectives

| Task                       | Description                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------- |
| Setup and Configuration    | Enable ACLs (disabled by default), bootstrap the system, and explore core ACL components          |
| Policy Creation            | Define permission rules, write HCL or JSON policies, and attach them to tokens                    |
| Token Lifecycle Management | Create tokens with single or multiple policies, configure automatic revocation, assign identities |
| Authenticated Operations   | Perform authorized CLI, HTTP API, and UI requests using valid tokens                              |

> [!important]
> **Note**
>
> Consul ACLs are disabled by default. You must enable and bootstrap the ACL system before creating policies or issuing tokens.
> For more details, see the [Consul ACL documentation](https://www.consul.io/docs/security/acl).

By the end of this module, you will be able to:

- Enable and bootstrap the Consul ACL system
- Author and attach ACL policies
- Manage token lifecycles, including automatic revocation
- Execute authenticated operations via CLI, API, and UI

Let’s dive in and secure your Consul cluster step by step.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/77c34744-e0fe-450e-82ea-c699ae223d45/lesson/68fea28b-dfa1-4884-a7e4-0a90b563ed28)**
>
> Watch video content
