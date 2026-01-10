# Demo Vault Agent - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Configure-Vault-Agent/Demo-Vault-Agent)

---

## Table of Contents

- Demo Vault Agent
  - Prerequisites
  - 1. Enable and Configure AppRole
  - 2. Retrieve Role ID & Secret ID
  - 3. Create Vault Agent Configuration
  - 4. Run the Vault Agent
  - 5. Enable Templating
  - 6. Populate the KV Store
  - 7. Restart the Agent and Verify Rendering
  - Configuration Blocks Overview
  - Conclusion
  - Watch Video
    - Template File: web.tmpl

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Configure Vault Agent

# Demo Vault Agent

In this tutorial, you’ll learn how to configure HashiCorp Vault Agent for automatic AppRole login and dynamic template rendering. By the end, you’ll have a Vault Agent setup that fetches a token via AppRole and injects secrets into a configuration file.

## Prerequisites

- A local Vault server running, unsealed, and accessible at `http://127.0.0.1:7200`.
- Vault CLI (`vault`) installed and authenticated as an operator.
- Basic knowledge of Vault’s AppRole auth method and KV secrets engine.

> [!important]
> **Note**
>
> Ensure your Vault server is unsealed and you have the `root` or equivalent token in `VAULT_TOKEN` before proceeding.

---

## 1\. Enable and Configure AppRole

1.  **Enable the AppRole auth method**

    ```
    vault auth enable approle
    ```

2.  **Create an AppRole named `agent`** with the policy `cloud-policy`:

    ```
    vault write auth/approle/role/agent token_policies="cloud-policy"
    ```

3.  **Verify the role**

    ```
    vault read auth/approle/role/agent
    ```

    Expected output:

    ```
    Key              Value
    ---              -----
    token_policies   ["cloud-policy"]
    ```

---

## 2\. Retrieve Role ID & Secret ID

1.  **Fetch the Role ID**

    ```
    vault read auth/approle/role/agent/role-id
    ```

2.  **Generate a Secret ID**

    ```
    vault write -f auth/approle/role/agent/secret-id
    ```

3.  **Store credentials** in files for the agent to consume:

    ```
    echo "<ROLE_ID>"   > role.txt
    echo "<SECRET_ID>" > secret.txt
    ```

> [!important]
> **Warning**
>
> Keep `secret.txt` secure! Anyone with access can authenticate as the AppRole.

---

## 3\. Create Vault Agent Configuration

Save the following as `agent.hcl`. It tells the agent how to authenticate and where to write its token.

```
vault {
  address = "http://127.0.0.1:7200"
}


auto_auth {
  method "approle" {
    config = {
      role_id_file_path                   = "./role.txt"
      secret_id_file_path                 = "./secret.txt"
      remove_secret_id_file_after_reading = true
    }
  }
  sink "file" {
    config = {
      path = "./sink.txt"
    }
  }
}
```

If you prefer to keep the Secret ID after login, set `remove_secret_id_file_after_reading = false`.

---

## 4\. Run the Vault Agent

Start the agent with your configuration:

```
vault agent -config=agent.hcl
```

You should see logs like:

```
2022-06-28T13:28:44.821-0400 [INFO] sink.file: creating file sink
2022-06-28T13:28:44.843-0400 [INFO] auth.handler: authentication successful, sending token to sinks
```

Verify the token is written:

```
cat sink.txt
```

---

## 5\. Enable Templating

Stop the agent (Ctrl+C) and append a `template` block to `agent.hcl`:

```
template {
  source      = "./web.tmpl"
  destination = "./output.yaml"
}
```

Now your full `agent.hcl` looks like:

```
vault {
  address = "http://127.0.0.1:7200"
}


auto_auth {
  method "approle" {
    config = {
      role_id_file_path                   = "./role.txt"
      secret_id_file_path                 = "./secret.txt"
      remove_secret_id_file_after_reading = false
    }
  }
  sink "file" {
    config = {
      path = "./sink.txt"
    }
  }
}


template {
  source      = "./web.tmpl"
  destination = "./output.yaml"
}
```

### Template File: `web.tmpl`

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

---

## 6\. Populate the KV Store

Store sample credentials under `kv/apps/webapp`:

```
vault kv put kv/apps/webapp username=administrator password=kfi3ksoi2msij2s
```

---

## 7\. Restart the Agent and Verify Rendering

Start the agent again:

```
vault agent -config=agent.hcl
```

You should see template rendering logs:

```
2022-06-28T13:14:15.854-0400 [INFO] (runner) rendered "./web.tmpl" => "./output.yaml"
```

Inspect the generated file:

```
production:
  adapter: postgresql
  encoding: unicode
  database: orders
  username: "administrator"
  password: "kfi3ksoi2msij2s"
```

---

## Configuration Blocks Overview

| Block        | Purpose                                      |
| ------------ | -------------------------------------------- |
| vault        | Vault server address                         |
| auto\\\_auth | AppRole login method and token sink          |
| sink         | File sink for writing the Vault token        |
| template     | Source and destination for rendering secrets |

---

## Conclusion

You’ve successfully:

- Enabled the AppRole auth method in Vault
- Retrieved Role ID and Secret ID for machine identity
- Configured Vault Agent for auto-authentication and token storage
- Rendered secrets into a dynamic configuration file using templating

For more details, visit the [Vault Agent Documentation](https://www.vaultproject.io/docs/agent).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/0e6639de-d61c-402b-a161-8f7fc39daf07/lesson/de64e058-744c-4a60-a44a-3cd3fe85b6d2)**
>
> Watch video content
