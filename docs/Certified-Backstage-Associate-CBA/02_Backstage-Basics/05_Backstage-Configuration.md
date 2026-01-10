# Backstage Configuration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Backstage-Basics/Backstage-Configuration)

---

## Table of Contents

- Backstage Configuration
  - Configuration Overview
  - 1. app-config.yaml
  - 2. app-config.local.yaml
  - 3. app-config.production.yaml
  - Reloading Configuration
  - Links and References
  - Watch Video

---

## Content

Certified Backstage Associate (CBA)

Backstage Basics

# Backstage Configuration

Configuring Backstage involves adjusting a few YAML files to control behavior across different environments—development, staging, and production. This guide walks you through the three primary configuration files you’ll find in a standard Backstage project:

- `app-config.yaml`
- `app-config.local.yaml`
- `app-config.production.yaml`

You’ll learn each file’s role, how they merge, and best practices for managing sensitive data.

## Configuration Overview

| Config File                  | Environment       | Purpose                                  |
| ---------------------------- | ----------------- | ---------------------------------------- |
| `app-config.yaml`            | All               | Shared defaults for every deployment     |
| `app-config.local.yaml`      | Local development | Overrides for your local machine         |
| `app-config.production.yaml` | Production        | Overrides for live, production instances |

## 1\. app-config.yaml

This is the **base configuration** loaded in every environment. Put settings here that do **not** change between development, staging, and production, such as your app title, organization name, and common backend options.

Example `app-config.yaml`:

```
app:
  title: "Scaffolded Backstage App"
  baseUrl: http://147.182.170.10:3000


organization:
  name: "My Company"


backend:
  baseUrl: http://147.182.170.10:7007
  listen:
    port: 7007
  cors:
    origin: http://147.182.170.10:3000
    methods: [GET, HEAD, PATCH, POST, PUT, DELETE]
    credentials: true
```

## 2\. app-config.local.yaml

Use this file for **local development overrides**. When you run `yarn dev`, Backstage merges these settings on top of `app-config.yaml` so you can point to `localhost` endpoints and use personal API keys.

> [!important]
> **Note**
>
> `app-config.local.yaml` merges with (and overrides) the base settings in `app-config.yaml`—ideal for local tweaks.

Example `app-config.local.yaml`:

```
app:
  baseUrl: http://localhost:3000


backend:
  baseUrl: http://localhost:7007
  cors:
    origin: http://localhost:3000
```

> [!important]
> **Warning**
>
> Do **not** commit `app-config.local.yaml` to version control—it may contain sensitive credentials or machine-specific settings.

## 3\. app-config.production.yaml

Define **production-specific** overrides here. Backstage will merge this file with `app-config.yaml` when running in a production mode (e.g., `NODE_ENV=production yarn start`).

> [!important]
> **Note**
>
> `app-config.production.yaml` replaces or extends base settings for your live environment.
> You can reference environment variables (e.g., `${HOST}`) to avoid hard-coding secrets.

Example snippet:

```
app:
  baseUrl: https://${HOST}


backend:
  baseUrl: https://${HOST}:7007
  cors:
    origin: https://${HOST}
```

## Reloading Configuration

Backstage reads configuration only at startup. After editing any YAML file, restart your server to apply changes:

```
# Stop the running instance
CTRL+C


# Restart in development mode
yarn dev
```

In production, you might use:

```
NODE_ENV=production yarn start
```

Always restart or reload your process manager after config updates to ensure Backstage picks up the latest settings.

## Links and References

- [Backstage Configuration Docs](https://backstage.io/docs/features/app-configuration)
- [YAML Specification](https://yaml.org/spec/)
- [Environment Variables in JavaScript](https://nodejs.org/docs/latest/api/process.html#process_process_env)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/fcbbf923-69c3-4147-bd51-18db2bd18957/lesson/548b4bbc-0a5c-4d63-94ee-250dfd40cd25)**
>
> Watch video content
