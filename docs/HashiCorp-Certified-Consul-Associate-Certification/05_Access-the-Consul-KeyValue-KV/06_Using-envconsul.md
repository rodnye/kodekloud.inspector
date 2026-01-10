# Using envconsul - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Access-the-Consul-KeyValue-KV/Using-envconsul)

---

## Table of Contents

- Using envconsul
  - Why Use Envconsul?
  - Key Features
  - Example: Loading Database Configuration
  - Envconsul Workflow
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Consul Associate Certification

Access the Consul KeyValue KV

# Using envconsul

Envconsul is a lightweight HashiCorp tool that launches a subprocess to populate environment variables from data stored in Consul or Vault. You can run envconsul alongside your application—either on the host or inside a container—so your app reads configuration at startup without any code changes.

![The image explains "envconsul," a tool that sets environment variables from Consul and Vault, simplifying application integration by eliminating the need for apps to read sensitive data from config files.](https://kodekloud.com/kk-media/image/upload/v1752877790/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Using-envconsul/envconsul-environment-variables-integration.jpg)

## Why Use Envconsul?

- Eliminates clear-text config files containing secrets
- Works with both Consul KV and Vault secrets
- Requires no modifications to application source code
- Compatible with containers (Docker, Kubernetes) and bare-metal deployments

> [!important]
> **Note**
>
> Envconsul only needs network access to your Consul or Vault cluster. You don’t need a full Consul agent on every host if you use a remote Consul server.

## Key Features

| Feature            | Use Case                                           | Example                                   |
| ------------------ | -------------------------------------------------- | ----------------------------------------- |
| `-prefix`          | Load all keys under a KV path                      | `envconsul -prefix db01 env`              |
| `-secrets-path`    | Retrieve Vault secrets                             | `envconsul -secrets-path secret/app`      |
| Dynamic refresh    | Watch for changes and update environment variables | `envconsul -watch -prefix config`         |
| Template rendering | Render Consul templates to files                   | `envconsul -template template.ctmpl:.env` |

## Example: Loading Database Configuration

First, write sample KV entries into Consul:

```
consul kv put db01/DB_ADDRESS 10.2.23.98
consul kv put db01/DB_PORT 3306
consul kv put db01/DB_MAX_CONNS 50
```

Then invoke envconsul with the `-prefix` flag to export all `db01` keys:

```
envconsul -prefix db01 env
```

Output:

```
DB_ADDRESS=10.2.23.98
DB_PORT=3306
DB_MAX_CONNS=50
```

These variables will be set in the environment before your application launches, allowing it to read typical database settings (host, port, max connections) without embedding secrets in code or config files.

> [!important]
> **Warning**
>
> When running inside containers, ensure your orchestration platform passes through the envconsul‐set environment variables to your application process. Failing to do so will result in missing config at runtime.

## Envconsul Workflow

1.  Schedule or start a container (Docker, Kubernetes) or launch on the host.
2.  Execute envconsul as the entrypoint or sidecar alongside your application.
3.  Envconsul queries Consul KV store (or Vault) for requested keys.
4.  Consul (or Vault) returns the secret values.
5.  Envconsul exports these key–value pairs as environment variables.
6.  Your application starts and reads the environment variables normally.

![The image is a flowchart explaining the process of "envconsul," showing steps from container scheduling to application launch, with interactions with a Consul cluster for environment variable population.](https://kodekloud.com/kk-media/image/upload/v1752877791/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Using-envconsul/envconsul-flowchart-container-scheduling-launch.jpg)

## Links and References

- [Consul KV Documentation](https://www.consul.io/docs/agent/kv)
- [Vault Secrets Engines](https://www.vaultproject.io/docs/secrets)
- [Envconsul GitHub Repository](https://github.com/hashicorp/envconsul)
- [Consul Integration Patterns](https://www.consul.io/docs/guides)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/70a7eb0f-aec7-41aa-b417-398c341698b6/lesson/7b512837-1f00-43f5-81d6-f5956e628a06)**
>
> Watch video content
