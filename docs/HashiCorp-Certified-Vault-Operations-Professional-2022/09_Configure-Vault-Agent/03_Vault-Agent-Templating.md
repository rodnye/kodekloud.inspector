# Vault Agent Templating - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Configure-Vault-Agent/Vault-Agent-Templating)

---

## Table of Contents

- Vault Agent Templating
  - The Challenge
  - Consul Template Overview
  - Vault Agent Templating
  - Links and References
  - Watch Video
    - Consul Template Workflow
    - Templating Workflow
    - Configuration Example
      - Example: Template Input (web.tmpl) and Rendered Output

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Configure Vault Agent

# Vault Agent Templating

In this guide, we'll configure Vault Agent Templating to allow legacy applications to consume Vault secrets via local files without modifying application code.

## The Challenge

Legacy applications often cannot call the Vault HTTP API directly, so they lack a mechanism to fetch secrets using a Vault token. By delegating authentication and token management to Vault Agent, we can render secrets into files that such applications read like standard configuration.

![The image illustrates how legacy applications can use Vault for secrets management, showing a flow where a Vault Agent handles authentication and token retrieval.](https://kodekloud.com/kk-media/image/upload/v1752878379/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Agent-Templating/legacy-apps-vault-secrets-management-flow.jpg)

## Consul Template Overview

Vault Agent Templating leverages the [Consul Template](https://github.com/hashicorp/consul-template) engine. Despite its name, Consul Template can fetch and renew secrets directly from Vault.

Consul Template is a standalone binary that:

- Retrieves secrets from Vault (or data from Consul).
- Manages token acquisition and renewal.
- Renders secrets to a file based on a provided template.
- Requires a valid Vault token to operate.

![The image is a slide about Consul Template, describing it as a standalone application that renders data from Consul or Vault onto the target file system, and noting that it retrieves secrets from Vault.](https://kodekloud.com/kk-media/image/upload/v1752878380/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Agent-Templating/consul-template-application-secrets-rendering.jpg)

### Consul Template Workflow

| Step                        | Description                                                                                        |
| --------------------------- | -------------------------------------------------------------------------------------------------- |
| 1\\. Create template        | Define a file with Vault paths and data keys (e.g., `{{ with secret "database/creds/readonly" }}`) |
| 2\\. Run Consul Template    | Fetch secrets and render to the destination file                                                   |
| 3\\. Application reads file | Legacy app uses the rendered file without calling Vault                                            |

![The image illustrates a three-step workflow for using a Consul Template, detailing the creation of a templated file, execution of the template to retrieve data, and application runtime reading of the file with secrets from Vault.](https://kodekloud.com/kk-media/image/upload/v1752878381/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Agent-Templating/consul-template-workflow-three-steps.jpg)

#### Example: Template Input (`web.tmpl`) and Rendered Output

Input (`web.tmpl`):

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

Output (`config.yml`):

```
production:
  adapter: postgresql
  encoding: unicode
  database: orders
  host: postgres.hcvop.com
  username: "v-vault-readonly-fm3dfm20sm2s"
  password: "fjk39fk49fks02k_3ks02mdz1s1"
```

## Vault Agent Templating

Vault Agent integrates the Consul Template engine directly, removing the need for a separate binary. It uses Auto Auth to authenticate and then renders secrets via templates.

![The image illustrates the process of Vault Agent Templating, showing how an application server/container interacts with a Vault Agent to authenticate, retrieve a client token, read secrets, and render them to an output file. It includes labeled steps and icons representing the components involved.](https://kodekloud.com/kk-media/image/upload/v1752878382/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Agent-Templating/vault-agent-templating-process-diagram.jpg)

### Templating Workflow

1.  **Authentication**  
    Vault Agent uses Auto Auth (AppRole, Kubernetes, AWS, etc.) to authenticate and writes the token to a sink.
2.  **Templating**  
    The embedded Consul Template engine reads the template and fetches secrets from Vault.
3.  **Rendering**  
    Secrets are written to the specified destination file.
4.  **Application Access**  
    The legacy application reads the rendered file as its configuration.

> [!important]
> **Note**
>
> Vault Agent Templating supports multiple `template` blocks. Each block can point to a different source and destination file.

### Configuration Example

Below is a minimal `vault.hcl` enabling Auto Auth and templating:

```
auto_auth {
  method "approle" {
    mount_path = "auth/approle"
    role_name  = "my-role"
  }
  sink "file" {
    config = {
      path = "/etc/vault.d/token.txt"
    }
  }
}


template_config {
  exit_on_retry_failure         = true
  static_secret_render_interval = "10m"
}


template {
  source      = "/etc/vault/web.tmpl"
  destination = "/etc/webapp/config.yml"
}
```

| Configuration Block | Purpose                                      | Example Setting                  |
| ------------------- | -------------------------------------------- | -------------------------------- |
| auto\\\_auth        | Defines authentication method and token sink | `method "approle" { ... }`       |
| template\\\_config  | Global templating options (retry, intervals) | `exit_on_retry_failure = true`   |
| template            | Template source and output destination       | `source = "/etc/vault/web.tmpl"` |

> [!important]
> **Warning**
>
> The `exit_on_retry_failure` flag will terminate Vault Agent if templating consistently fails. Use with caution in production environments.

With this setup, unmodified legacy applications can seamlessly consume dynamic Vault-managed secrets via local configuration files.

## Links and References

- [Consul Template GitHub](https://github.com/hashicorp/consul-template)
- [Vault Auto Auth Methods](https://www.vaultproject.io/docs/agent/auto-auth)
- [Vault Agent Configuration](https://www.vaultproject.io/docs/agent)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/0e6639de-d61c-402b-a161-8f7fc39daf07/lesson/58a9e3f1-eaf1-4417-9ac9-102f82ea8460)**
>
> Watch video content
