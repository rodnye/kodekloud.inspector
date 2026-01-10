# Demo Note About Backstage Database - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Backstage-Basics/Demo-Note-About-Backstage-Database)

---

## Table of Contents

- Demo Note About Backstage Database
  - In-Memory Database (Development)
  - Production Database (PostgreSQL)
  - Watch Video

---

## Content

Certified Backstage Associate (CBA)

Backstage Basics

# Demo Note About Backstage Database

Before we wrap up this section, it’s crucial to understand how Backstage manages its data store. By default, Backstage relies on an in-memory database, which only persists data for the lifetime of the process.

> [!important]
> **Warning**
>
> The in-memory database is intended for development and testing only. All registered components and services are cleared whenever Backstage restarts.

![The image illustrates a development environment setup with an in-memory database, featuring a restart option. It is titled "Managing Data on Backstage."](https://kodekloud.com/kk-media/image/upload/v1752870031/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Note-About-Backstage-Database/managing-data-backstage-development-setup.jpg)

## In-Memory Database (Development)

- Quick to set up: No external dependencies required.
- Ideal for prototyping and experimentation.
- Volatile storage: data is lost on every restart.

To maintain data between restarts in production, Backstage supports PostgreSQL as its primary database. Configuring PostgreSQL ensures catalog entities remain intact, even after service reboots.

![The image is a diagram titled "Managing Data on Backstage," showing a Postgres Database connected to an Auth service within a production environment.](https://kodekloud.com/kk-media/image/upload/v1752870032/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Note-About-Backstage-Database/managing-data-backstage-diagram.jpg)

## Production Database (PostgreSQL)

| Feature          | In-Memory Database | PostgreSQL (Production)                  |
| ---------------- | ------------------ | ---------------------------------------- |
| Persistence      | Volatile           | Persistent across restarts               |
| Setup Complexity | Minimal            | Requires external database configuration |
| Scalability      | Limited            | High                                     |
| Recommended Use  | Development/Test   | Production                               |

> [!important]
> **Note**
>
> Later in this lesson, you’ll find step-by-step instructions on integrating PostgreSQL with Backstage, including connection settings and schema migrations.

For more information, refer to the [Backstage Database Configuration guide](https://backstage.io/docs/development/backend-database).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/fcbbf923-69c3-4147-bd51-18db2bd18957/lesson/635dfd83-bc8b-439e-a272-31dfd777686d)**
>
> Watch video content
