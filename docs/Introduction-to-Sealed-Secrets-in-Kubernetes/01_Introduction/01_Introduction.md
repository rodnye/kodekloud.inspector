# Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Introduction-to-Sealed-Secrets-in-Kubernetes/Introduction/Introduction)

---

## Table of Contents

- Introduction
  - Introduction
  - What You’ll Learn
  - Core Components Overview
  - References
  - Watch Video

---

## Content

Introduction to Sealed Secrets in Kubernetes

Introduction

# Introduction

## Introduction

Sealed Secrets is an open-source tool by Bitnami for managing sensitive data securely in Kubernetes and other environments like Terraform. Instead of storing raw secrets in your Git repository, you encrypt them into “sealed” Secrets, which only the target cluster can decrypt.

In this lesson, we will:

- Define Sealed Secrets and its primary use cases
- Explore core components and workflow
- Demonstrate a hands-on example to seal and unseal secrets

> [!important]
> **Note**
>
> You will need access to a running Kubernetes cluster and the `kubeseal` CLI installed locally.

---

## What You’ll Learn

| Topic                | Description                                                            |
| -------------------- | ---------------------------------------------------------------------- |
| Core Concepts        | Overview of Sealed Secrets architecture and components                 |
| Workflow Overview    | Encrypting, committing, and decrypting secrets                         |
| Demo                 | Creating a Kubernetes Secret, sealing it, and applying it to a cluster |
| Integration with IaC | Using Sealed Secrets in Terraform and GitOps pipelines                 |

---

## Core Components Overview

Sealed Secrets relies on three main components:

- SealedSecret custom resource for encrypted data
- Controller that runs in-cluster to decrypt SealedSecrets into native Kubernetes Secrets
- kubeseal CLI for encrypting Secret manifests outside the cluster

---

## References

- [Sealed Secrets GitHub Repository](https://github.com/bitnami-labs/sealed-secrets)
- [Bitnami Sealed Secrets Documentation](https://github.com/bitnami-labs/sealed-secrets#readme)
- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/introduction-to-sealed-secrets-in-kubernetes/module/fbf97fdc-fe0f-4d01-b19a-d1be56322bac/lesson/febac6c6-137c-4a40-b684-cf1d940c625a)**
>
> Watch video content
