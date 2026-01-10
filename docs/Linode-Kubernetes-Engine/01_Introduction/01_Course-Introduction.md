# Course Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linode-Kubernetes-Engine/Introduction/Course-Introduction)

---

## Table of Contents

- Course Introduction
  - Learning Objectives
  - Managed vs Self-Managed Kubernetes
  - Links and References
  - Watch Video

---

## Content

Linode : Kubernetes Engine

Introduction

# Course Introduction

Welcome to the Linode Kubernetes Engine (LKE) course at KodeKloud. I’m Michael Levan, and in this lesson we’ll explore how to leverage LKE for deploying and managing Kubernetes workloads.

This hands-on course guides you through:

- Exploring the official LKE documentation
- Provisioning Kubernetes clusters on Linode
- Deploying and scaling applications with kubectl

While Kubernetes fundamentals are covered in our dedicated course, here we’ll contrast using a managed service like LKE against running an on-premises cluster.

## Learning Objectives

By the end of this lesson, you will be able to:

- Compare managed Kubernetes (LKE) with self-managed, on-premises clusters
- Create and configure LKE clusters
- Connect to your LKE clusters using kubectl
- Deploy and manage applications on LKE

> [!important]
> **Prerequisites**
>
> Before you begin, ensure you have:
>
> - A Linode account
> - kubectl installed (see [Kubectl Installation Guide](https://kubernetes.io/docs/tasks/tools/))
> - Basic familiarity with Kubernetes concepts

## Managed vs Self-Managed Kubernetes

| Feature                  | Managed LKE                                  | Self-Managed (On-Premises)               |
| ------------------------ | -------------------------------------------- | ---------------------------------------- |
| Control Plane Management | Linode-managed with SLA                      | You manage API server, etcd, etc.        |
| Upgrades & Patching      | Automated rolling updates                    | Manual patching and version upgrades     |
| Node Provisioning        | One-click node pool creation                 | Custom scripts or tooling                |
| Scalability              | Scale clusters in minutes via the LKE UI/CLI | Requires capacity planning and scripting |
| Cost Structure           | Pay per node instance                        | Infrastructure + operational overhead    |

## Links and References

- [Linode Kubernetes Engine Documentation](https://www.linode.com/docs/guides/lke-overview/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubectl Installation Guide](https://kubernetes.io/docs/tasks/tools/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linode-kubernetes-engine/module/c530412c-19ac-4b5a-a852-d025b095a75c/lesson/31143899-7ded-48d9-95c1-5c42433aca37)**
>
> Watch video content
