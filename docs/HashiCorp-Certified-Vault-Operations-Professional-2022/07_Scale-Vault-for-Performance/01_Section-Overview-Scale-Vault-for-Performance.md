# Section Overview Scale Vault for Performance - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Scale-Vault-for-Performance/Section-Overview-Scale-Vault-for-Performance)

---

## Table of Contents

- Section Overview Scale Vault for Performance
  - Batch Tokens
  - Watch Video

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Scale Vault for Performance

# Section Overview Scale Vault for Performance

In this lesson, you’ll learn how to optimize HashiCorp Vault for high throughput and low latency. We’ll cover four key areas:

- Batch Tokens
- Performance Standby Nodes (Vault Enterprise)
- Performance Replication (Vault Enterprise)
- Path Filters

> [!important]
> **Note**
>
> Performance Standby Nodes and Performance Replication features require Vault Enterprise.

| Feature                   | Vault Version    | Purpose                                      |
| ------------------------- | ---------------- | -------------------------------------------- |
| Batch Tokens              | OSS & Enterprise | Reduce client API calls and boost throughput |
| Performance Standby Nodes | Enterprise       | Offload read-only traffic                    |
| Performance Replication   | Enterprise       | Asynchronous data synchronization            |
| Path Filters              | OSS & Enterprise | Limit which secrets paths are replicated     |

![The image is an "Objective Overview" slide for scaling Vault for performance, listing tasks such as using batch tokens and configuring performance replication. It includes a certification badge and a cartoon character at the bottom right.](https://kodekloud.com/kk-media/image/upload/v1752878618/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Section-Overview-Scale-Vault-for-Performance/scaling-vault-performance-overview-slide.jpg)

## Batch Tokens

Let’s dive into the first topic: batch tokens.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b6a41fdb-447c-43b2-9489-6c8459821fab/lesson/12509202-2566-4999-a5b7-94f54cbca281)**
>
> Watch video content
