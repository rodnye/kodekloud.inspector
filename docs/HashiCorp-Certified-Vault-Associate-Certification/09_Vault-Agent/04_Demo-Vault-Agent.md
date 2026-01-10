# Demo Vault Agent - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Vault-Agent/Demo-Vault-Agent)

---

## Table of Contents

- Demo Vault Agent
  - Prerequisites
  - 1. Enable the AppRole Auth Method
  - 2. Create an AppRole for the Agent
  - 3. Retrieve Role ID and Secret ID
  - 4. Store Role ID & Secret ID in Files
  - 5. Configure Vault Agent (agent.hcl)
  - 6. Start Vault Agent
  - 7. Templating with Vault Agent
  - Conclusion
  - Links and References
  - Watch Video
    - 6.1 Preserve the Secret ID File (Optional)
    - 7.1 Prepare the Template (web.tmpl)
    - 7.2 Seed the KV Store
    - 7.3 Update agent.hcl with a Template Block
    - 7.4 Restart Vault Agent & Verify

---

## Content

HashiCorp Certified: Vault Associate Certification

Vault Agent

# Demo Vault Agent

Learn how to leverage HashiCorp Vault Agent to automatically authenticate via AppRole and render configuration files with secrets fetched from Vault.

## Prerequisites

| Requirement       | Description                                          |
| ----------------- | ---------------------------------------------------- |
| Vault Server      | Running, unsealed, and accessible (default `:8200`). |
| Vault CLI & Agent | Installed on your local machine.                     |
| AppRole Policy    | A policy (e.g., `cloud-policy`) defined in Vault.    |

---

## 1\. Enable the AppRole Auth Method

Enable AppRole so Vault Agent can authenticate:

```
vault auth enable approle
```

Expected output:

```
Success! Enabled approle auth method at: approle/
```

> [!important]
> **Note**
>
> AppRole is a machine-friendly auth method designed for non-interactive workflows.
> Learn more: [AppRole Auth Method](https://www.vaultproject.io/docs/auth/approle)

---

## 2\. Create an AppRole for the Agent

Define a role with the appropriate policy:

```
vault write auth/approle/role/agent \
  token_policies="cloud-policy"
```

Verify the role settings:

```
vault read auth/approle/role/agent
```

Sample output:

| Key                  | Value              |
| -------------------- | ------------------ |
| bind\\\_secret\\\_id | true               |
| token\\\_policies    | \\[cloud-policy\\] |

---

## 3\. Retrieve Role ID and Secret ID

Fetch the `role_id`:

```
vault read -format=json auth/approle/role/agent/role-id
```

Generate a one-time `secret_id`:

```
vault write -f auth/approle/role/agent/secret-id
```

Example JSON response:

```
{
  "data": {
    "role_id": "3ae4b467-c469-6a38-adbe-83e1ab5f1dd0",
    "secret_id": "6b74a5ef-d4f5-0690-67f1-c457c1060ac7"
  }
}
```

---

## 4\. Store Role ID & Secret ID in Files

Create two files in your working directory:

**role.txt**

```
3ae4b467-c469-6a38-adbe-83e1ab5f1dd0
```

**secret.txt**

```
6b74a5ef-d4f5-0690-67f1-c457c1060ac7
```

> [!important]
> **Warning**
>
> Ensure these files have restrictive permissions (e.g., `chmod 600`) to prevent unauthorized access.

---

## 5\. Configure Vault Agent (`agent.hcl`)

Define auto-auth and token sink settings:

```
auto_auth {
  method "approle" {
    mount_path = "approle"
    config = {
      role_id_file_path    = "/path/to/role.txt"
      secret_id_file_path  = "/path/to/secret.txt"
    }
  }


  sink "file" {
    config = {
      path = "/path/to/sink.txt"
    }
  }
}


vault {
  address = "http://127.0.0.1:8200"
}
```

> [!important]
> **Note**
>
> - `mount_path` defaults to `"approle"`.
> - Adjust `address` if your Vault server listens on a different host or port.

---

## 6\. Start Vault Agent

Run the agent with your configuration:

```
vault agent -config=agent.hcl
```

You should see logs indicating successful authentication and token writing:

```
[INFO] sink.file: file sink configured: path=/path/to/sink.txt
[INFO] auth.handler: authentication successful, sending token to sinks
[INFO] auth.handler: renewed auth token
```

Verify the token:

```
cat /path/to/sink.txt
# s.xxxxxxxxxxxxxxxxxxxxxxxx
```

---

### 6.1 Preserve the Secret ID File (Optional)

By default, Vault Agent deletes `secret.txt`. To retain it, add `remove_secret_id_file = false`:

```
auto_auth {
  method "approle" {
    mount_path = "approle"
    config = {
      role_id_file_path      = "/path/to/role.txt"
      secret_id_file_path    = "/path/to/secret.txt"
      remove_secret_id_file  = false
    }
  }
  sink "file" {
    config = {
      path = "/path/to/sink.txt"
    }
  }
}
```

Restart Vault Agent. The `secret.txt` file will persist.

---

## 7\. Templating with Vault Agent

Vault Agent can render templates populated with secrets. Follow these steps:

### 7.1 Prepare the Template (`web.tmpl`)

```
production:
  adapter: postgresql
  encoding: unicode
  database: orders
{{ with secret "kv/apps/webapp" }}
  username: "{{ .Data.data.username }}"
  password: "{{ .Data.data.password }}"
{{ end }}
```

### 7.2 Seed the KV Store

Populate Vault’s KV engine:

```
vault kv put kv/apps/webapp \
  username="administrator" \
  password="kfi3ksoi2msij2s"
```

### 7.3 Update `agent.hcl` with a Template Block

Add a `template` stanza to render `web.tmpl` to `output.yaml`:

```
template {
  source      = "/path/to/web.tmpl"
  destination = "/path/to/output.yaml"
}
```

Full `agent.hcl` snippet:

```
template {
  source      = "/path/to/web.tmpl"
  destination = "/path/to/output.yaml"
}


vault {
  address = "http://127.0.0.1:8200"
}
```

### 7.4 Restart Vault Agent & Verify

```
vault agent -config=agent.hcl
```

Check the rendered file:

```
cat /path/to/output.yaml
```

Expected content:

```
production:
  adapter: postgresql
  encoding: unicode
  database: orders
  username: "administrator"
  password: "kfi3ksoi2msij2s"
```

---

## Conclusion

You’ve now automated the following with Vault Agent:

1.  AppRole-based auto-authentication.
2.  Securely stored & managed `role_id` and `secret_id`.
3.  Token persistency with customizable sinks.
4.  Dynamic templating to inject secrets into configuration files.

---

## Links and References

- [Vault Agent Overview](https://www.vaultproject.io/docs/agent)
- [AppRole Auth Method](https://www.vaultproject.io/docs/auth/approle)
- [Vault CLI Documentation](https://www.vaultproject.io/docs/commands)
- [Template Syntax](https://www.vaultproject.io/docs/agent/templates)
- [KV Secrets Engine](https://www.vaultproject.io/docs/secrets/kv)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/25b89318-77a0-4f52-a4d7-2df3696e3362/lesson/72c31d12-bcc9-4d96-b28b-2057ea11b144)**
>
> Watch video content
