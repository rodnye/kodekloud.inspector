# Demo AppRole Auth Method - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/Demo-AppRole-Auth-Method)

---

## Table of Contents

- Demo AppRole Auth Method
  - Prerequisites
  - 1. Verify Enabled Auth Methods
  - 2. Enable AppRole Auth Method
  - 3. Define a Read-Only KV Policy
  - 4. Create and Configure the AppRole
  - 5. Retrieve the Role ID
  - 6. Generate a Secret ID
  - 7. Authenticate with AppRole
  - Watch Video
  - Practice Lab
    - 4.1 Create the AppRole
    - 4.2 List and Inspect Roles
    - 4.3 (Optional) Set a Default Token TTL

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# Demo AppRole Auth Method

In this tutorial, you’ll learn how to configure and use Vault’s AppRole authentication method to grant machine clients read access to a KV secrets engine. By the end, you’ll create a policy, define an AppRole, and retrieve a client token using Role ID and Secret ID.

## Prerequisites

- A running Vault server
- `VAULT_ADDR` environment variable set (e.g., `export VAULT_ADDR=http://127.0.0.1:8200`)
- Vault CLI installed and authenticated as an administrator

## 1\. Verify Enabled Auth Methods

By default, Vault includes the Token auth method. Let’s confirm:

```
vault auth list
```

Example output:

```
Path    Type    Accessor
----    ----    --------
token/  token   auth_token_9e81d3bb
```

You can also compare common methods:

| Auth Method | Path     | Description                    |
| ----------- | -------- | ------------------------------ |
| token       | token/   | Default client token login     |
| approle     | approle/ | Machine-based, non-human login |

## 2\. Enable AppRole Auth Method

Enable AppRole at the path `approle/`:

```
vault auth enable approle
```

Expected response:

```
Success! Enabled approle auth method at: approle/
```

## 3\. Define a Read-Only KV Policy

Create a policy file named `kv-policy.hcl`:

```
path "kv/data/*" {
  capabilities = ["read"]
}
```

Upload the policy to Vault:

```
vault policy write kv-policy kv-policy.hcl
```

```
Success! Uploaded policy: kv-policy
```

## 4\. Create and Configure the AppRole

### 4.1 Create the AppRole

Associate the `kv-policy` with a new AppRole called `automation`:

```
vault write auth/approle/role/automation \
    policies="kv-policy"
```

```
Success! Data written to: auth/approle/role/automation
```

### 4.2 List and Inspect Roles

List all AppRole roles:

```
vault list auth/approle/role
```

```
Keys
----
automation
```

Inspect the `automation` role’s settings:

```
vault read auth/approle/role/automation
```

```
Key                       Value
---                       -----
bind_secret_id            true
policies                  [kv-policy]
token_ttl                 0s
token_max_ttl             0s
token_policies            [kv-policy]
...
```

### 4.3 (Optional) Set a Default Token TTL

Assign a 24-hour default token TTL to the `automation` role:

```
vault write auth/approle/role/automation \
    token_ttl="24h"
```

Verify the update:

```
vault read auth/approle/role/automation | grep token_ttl
```

```
token_ttl             24h
```

## 5\. Retrieve the Role ID

The Role ID is a stable, unique identifier—think of it as a username. Fetch it with:

```
vault read auth/approle/role/automation/role-id
```

```
Key      Value
---      -----
role_id  1dc0ddb7-2117-3dd2-b391-e5bdfc6a5389
```

## 6\. Generate a Secret ID

The Secret ID is equivalent to a password. To get a one-time Secret ID, run:

```
vault write -force auth/approle/role/automation/secret-id
```

```
Key                 Value
---                 -----
secret_id           83ef7b27-5c13-4051-79e1-5130d069f627
secret_id_accessor  6daa5f2e-e3f1-e29d-af10-65dd0860f23b
secret_id_ttl       0s
```

> [!important]
> **Protect Your Secret ID**
>
> Treat both Role ID and Secret ID as sensitive credentials. Avoid exposing them in logs, version control, or shared terminals.

## 7\. Authenticate with AppRole

Now request a Vault token by supplying your Role ID and Secret ID:

```
vault write auth/approle/login \
    role_id="1dc0ddb7-2117-3dd2-b391-e5bdfc6a5389" \
    secret_id="83ef7b27-5c13-4051-79e1-5130d069f627"
```

Sample response:

```
Key                   Value
---                   -----
token                 hvs.CAESlNhzOeu9SvYiHGAJBIt-Q-9-2Mrw...
token_duration        24h
token_renewable       true
token_policies        ["kv-policy" "default"]
...
```

You now hold a Vault token, renewable for 24 hours, with read-only access to `kv/data/*`.

> [!important]
> **Programmatic Access**
>
> AppRole is ideal for automation and CI/CD pipelines. You can also authenticate via the HTTP API:
> POST `/v1/auth/approle/login` with JSON body:
>
> ```
> { "role_id": "...", "secret_id": "..." }
> ```

---

You have successfully configured Vault’s AppRole auth method. For more details, see the [Vault AppRole Authentication Guide](https://www.vaultproject.io/docs/auth/approle).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/deedd4da-a247-449a-925d-2f6c0b99b4de)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/a78e07d2-c84d-4821-a40b-1826158fcbd2)**
>
> Practice lab
