# Vault Agent Templating - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Vault-Agent/Vault-Agent-Templating)

---

## Table of Contents

- Vault Agent Templating
  - The Challenge with Legacy Applications
  - What Is Consul Template?
  - Vault Agent Templating Overview
  - Example Vault Agent Configuration
  - Links and References
  - Watch Video
    - How Consul Template Works
    - Example Template (config.tmpl)
    - Comparing Consul Template vs. Vault Agent Templating

---

## Content

HashiCorp Certified: Vault Associate Certification

Vault Agent

# Vault Agent Templating

Learn how HashiCorp Vault Agent’s templating feature enables legacy applications to consume Vault secrets from a local file—no direct API calls required.

## The Challenge with Legacy Applications

Many legacy apps cannot call Vault’s HTTP API. Even if Vault Agent auto-authenticates and fetches a token, the application can’t use it without direct Vault access. To bridge this gap, Vault Agent can render secrets into a local file that the application reads like any other configuration.

## What Is Consul Template?

Vault Agent’s templating builds on [Consul Template](https://github.com/hashicorp/consul-template), a standalone utility that:

- Renders data from Vault or Consul into files
- Manages automatic secrets retrieval and renewal
- Operates without a running Consul cluster when used with Vault

### How Consul Template Works

Consul Template follows a simple three-step workflow:

1.  **Template Definition**  
    Create a template file specifying Vault paths and placeholders.
2.  **Rendering**  
    Run Consul Template; it fetches secrets and writes them to the destination file.
3.  **Application Consumption**  
    The app reads the rendered file at runtime as a static config.

![The image illustrates a three-step workflow for using a Consul Template, detailing the creation of a templated file, execution of the template, and application runtime reading. It includes icons and a certification badge for Vault.](https://kodekloud.com/kk-media/image/upload/v1752878258/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Vault-Agent-Templating/consul-template-workflow-three-steps.jpg)

### Example Template (`config.tmpl`)

```
production:
  adapter: postgresql
  encoding: unicode
  database: orders
  host: postgres.hcvop.com
  {{ with secret "database/creds/readonly" }}
  username: "{{ .Data.username }}"
  password: "{{ .Data.password }}"
  {{ end }}
```

- `secret "database/creds/readonly"` points to the Vault secret path.
- `.Data.username` and `.Data.password` extract the JSON fields returned by Vault.

After rendering, `config.yml` contains:

```
production:
  adapter: postgresql
  encoding: unicode
  database: orders
  host: postgres.hcvop.com
  username: "readonly-username"
  password: "readonly-password"
```

The application simply reads `config.yml` for its credentials.

## Vault Agent Templating Overview

Vault Agent now embeds Consul Template functionality—no separate binary needed. It handles both auto-auth and templating in one process:

1.  **Auto Auth**  
    Vault Agent authenticates (e.g., [AppRole](/docs/auth/approle), [Kubernetes](/docs/auth/kubernetes)) and writes the token to a sink.
2.  **Templating**  
    It reads secrets via the template and renders them to a local file.
3.  **Application**  
    The app reads the rendered file and connects to external services using up-to-date credentials.

![The image illustrates the process of Vault Agent Templating, showing the interaction between a Vault Agent, an application server/container, and a sink for storing tokens. It includes steps for authentication, token retrieval, secret reading, and rendering secrets to an output file.](https://kodekloud.com/kk-media/image/upload/v1752878258/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Vault-Agent-Templating/vault-agent-templating-process-diagram.jpg)

### Comparing Consul Template vs. Vault Agent Templating

| Feature        | Consul Template            | Vault Agent Templating   |
| -------------- | -------------------------- | ------------------------ |
| Binary         | Separate `consul-template` | Built into `vault agent` |
| Authentication | External token required    | Integrated Auto Auth     |
| Secret Renewal | Managed by Consul Template | Managed by Vault Agent   |
| Configuration  | HCL or CLI flags           | HCL in `agent.hcl`       |

## Example Vault Agent Configuration

Use this HCL snippet to enable templating in Vault Agent:

> [!important]
> **Note**
>
> Ensure you’re running Vault Agent version 1.5+ to use built-in templating.

```
auto_auth {
  method "approle" {
    mount_path = "auth/approle"
    # AppRole role_id & secret_id will be supplied here
  }


  sink "file" {
    config = {
      path = "/etc/vault.d/token.txt"
      mode = 0640
    }
  }
}


template_config {
  exit_on_retry_failure         = true    # Exit if rendering fails permanently
  static_secret_render_interval = "10m"   # Refresh KV secrets every 10 minutes
}


template {
  source      = "/etc/vault/web.tmpl"
  destination = "/etc/webapp/config.yml"
  perms       = "0640"
}
```

> [!important]
> **Warning**
>
> Storing tokens on disk can be a security risk. Protect the sink file with appropriate OS permissions.

The template file (`/etc/vault/web.tmpl`) can mirror the earlier Consul Template example.

![The image shows a template configuration for Vault, detailing sections for auto-auth configuration, sink configuration, global template configurations, and template configuration, with color-coded brackets for each section.](https://kodekloud.com/kk-media/image/upload/v1752878259/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Vault-Agent-Templating/vault-template-configuration-auto-auth-sink.jpg)

With this setup, you can run legacy or unmodified applications without any Vault-specific code changes—they simply read secrets from a local file.

## Links and References

- [Vault Auto Auth (AppRole)](https://www.vaultproject.io/docs/auth/approle)
- [Vault Auto Auth (Kubernetes)](https://www.vaultproject.io/docs/auth/kubernetes)
- [Consul Template GitHub](https://github.com/hashicorp/consul-template)
- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/25b89318-77a0-4f52-a4d7-2df3696e3362/lesson/c2761fc2-04db-4142-8629-22f4fbb6f74a)**
>
> Watch video content
