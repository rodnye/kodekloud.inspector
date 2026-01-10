# Section Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Production-Backstage/Section-Introduction)

---

## Table of Contents

- Section Introduction
  - Watch Video

---

## Content

Certified Backstage Associate (CBA)

Production Backstage

# Section Introduction

In this lesson, you’ll learn how to deploy a robust, production-grade Backstage instance. We’ll walk through three critical tasks:

1.  **Configure PostgreSQL** as your primary database instead of the default in-memory store (which is only suitable for local development).
2.  **Enable user authentication** to ensure that only authorized users can access your Backstage instance.
3.  **Containerize Backstage with Docker** for consistent, repeatable deployments across environments.

> [!important]
> **Note**
>
> By default, Backstage uses an in-memory database meant for testing and development. For production, a managed PostgreSQL instance provides durability, scalability, and backup capabilities.

![The image is a section introduction for "Setting Up Backstage for Production," featuring three steps: using a Postgres database, implementing authentication, and deploying with Docker.](https://kodekloud.com/kk-media/image/upload/v1752870178/notes-assets/images/Certified-Backstage-Associate-CBA-Section-Introduction/setting-up-backstage-production-steps.jpg)

Throughout this guide, you’ll also discover best practices for safely upgrading your Backstage instance whenever a new version is released, minimizing downtime and ensuring data integrity.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/d82fc857-4b5c-42a7-ab46-3772f749a741/lesson/10148bbb-c4d2-42f6-82d2-c677c0e1b0ea)**
>
> Watch video content
