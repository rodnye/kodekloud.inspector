# Intro to the Vault Agent - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Vault-Agent/Intro-to-the-Vault-Agent)

---

## Table of Contents

- Intro to the Vault Agent
  - Why Use Vault Agent?
  - Vault Agent Features at a Glance
  - 1. Automatic Authentication and Renewal
  - 2. Secure Token Storage and Delivery
  - 3. Local Secret Caching
  - 4. Templating
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Vault Agent

# Intro to the Vault Agent

Vault Agent is a client-side daemon that runs alongside your application to handle all Vault interactions on its behalf. It’s especially valuable for legacy or third-party applications without native Vault integration. By deploying Vault Agent, you avoid modifying your application code, while still benefiting from dynamic secret retrieval, secure token management, and template rendering.

## Why Use Vault Agent?

- Securely inject secrets into applications that cannot reach Vault directly
- Automate authentication, token renewal, and secret caching
- Render configuration files at startup using Vault data

> [!important]
> **Note**
>
> Vault Agent supports multiple authentication methods (like [AppRole](https://www.vaultproject.io/docs/auth/approle) and [Kubernetes](https://www.vaultproject.io/docs/auth/kubernetes)) and can wrap responses to protect tokens in transit.

## Vault Agent Features at a Glance

| Feature                            | Description                                                                         |
| ---------------------------------- | ----------------------------------------------------------------------------------- |
| Automatic Authentication & Renewal | Authenticates to Vault (e.g., AppRole, Kubernetes) and renews tokens automatically. |
| Secure Token Storage & Delivery    | Stores tokens in a configured sink (file, memory) and optionally wraps them.        |
| Local Secret Caching               | Caches fetched secrets to minimize Vault API calls and reduce latency.              |
| Templating                         | Renders configuration files by pulling secrets from Vault into templates.           |

---

## 1\. Automatic Authentication and Renewal

Vault Agent can authenticate using various methods. Below is an example `auto_auth` block for the AppRole method:

```
# /etc/vault/agent-config.hcl
auto_auth {
  method "approle" {
    mount_path = "auth/approle"
    config = {
      role_id_file_path   = "/etc/vault/role_id"
      secret_id_file_path = "/etc/vault/secret_id"
    }
  }


  sink "file" {
    config = {
      path = "/home/app/.vault-token"
    }
  }
}
```

- `method`: Defines the auth method type and its configuration.
- `sink`: Specifies where the resulting token is stored for the application.

---

## 2\. Secure Token Storage and Delivery

After authentication, Vault Agent stores its token in a sink of your choice:

```
sink "file" {
  config = {
    path = "/var/run/vault/token"
    mode = 0600
  }
}
```

> [!important]
> **Warning**
>
> Always set restrictive file permissions (`mode = 0600` or stricter) on token sinks to prevent unauthorized access.

---

## 3\. Local Secret Caching

To reduce Vault API calls and improve performance, Vault Agent can cache secrets locally. Configure caching like this:

```
cache {
  use_auto_auth_token = true
  path                = "/home/app/.vault-agent-cache.json"
}
```

> [!important]
> **Note**
>
> When `use_auto_auth_token` is enabled, cached entries are automatically authenticated and renewed.

---

## 4\. Templating

Vault Agent’s templating feature fetches secrets and renders them into static files before your application starts:

```
template {
  source      = "/etc/vault/templates/config.ctmpl"
  destination = "/etc/app/config.yaml"
  command     = "systemctl restart my-app.service"
}
```

In your `config.ctmpl`, leverage the [Vault template syntax](https://www.vaultproject.io/docs/configuration/templates):

```
db_user  = "{{ with secret "database/creds/app" }}{{ .Data.username }}{{ end }}"
db_pass  = "{{ with secret "database/creds/app" }}{{ .Data.password }}{{ end }}"
```

---

## Links and References

- [Vault Agent Documentation](https://www.vaultproject.io/docs/agent)
- [AppRole Auth Method](https://www.vaultproject.io/docs/auth/approle)
- [Kubernetes Auth Method](https://www.vaultproject.io/docs/auth/kubernetes)
- [Vault Template Syntax](https://www.vaultproject.io/docs/configuration/templates)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/25b89318-77a0-4f52-a4d7-2df3696e3362/lesson/76453e84-4f12-43f8-8072-39cc43318931)**
>
> Watch video content
