# AppRole Auth Method - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/AppRole-Auth-Method)

---

## Table of Contents

- AppRole Auth Method
  - What Is AppRole?
  - Authentication Workflow
  - Configuration Workflow
  - Why Use AppRole for a Fleet of Web Servers?
  - AppRole Configuration Tips
  - Step-by-Step Guide
  - Links and References
  - Watch Video
    - 1. Enable the AppRole Auth Method
    - 2. Create a Role
    - 3. View Role Configuration
    - 4. Retrieve the Role ID
    - 5. Generate a Secret ID
    - 6. Authenticate with AppRole (CLI)
    - 7. Authenticate with AppRole (HTTP API)

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# AppRole Auth Method

HashiCorp Vault’s AppRole auth method enables machines and automated pipelines to authenticate securely using a predefined role. Each AppRole consists of:

- A static **Role ID** (like a username).
- One or more **Secret IDs** (like one-time passwords).

Combining Role ID + Secret ID grants a Vault token, similar to how users log in with username and password.

> [!important]
> **Note**
>
> AppRole is ideal for non-interactive workloads (CI/CD pipelines, containers, VMs) that require short-lived credentials.

## What Is AppRole?

AppRole is a secrets-engine authentication method in Vault. It’s commonly used when human interaction isn’t possible or desired. You:

1.  Enable the `approle` auth method.
2.  Create a role with policies, TTLs, and CIDR restrictions.
3.  Distribute the static Role ID and dynamically generate Secret IDs.

## Authentication Workflow

1.  Vault Admin enables AppRole and creates a role (e.g., `hcvop`).
2.  Developer reads the static Role ID and bakes it into the container image.
3.  CI/CD pipeline requests a new Secret ID (optionally wrapped).
4.  Pipeline deploys the container, injecting Role ID + Secret ID.
5.  Application logs in and receives a Vault token.

## Configuration Workflow

1.  Enable the AppRole auth method at a path (default or custom).
2.  Create a role with policies, TTL settings, and CIDR restrictions.
3.  Read the constant Role ID.
4.  Generate a unique Secret ID at deployment time.

## Why Use AppRole for a Fleet of Web Servers?

Multiple instances share the same Role ID but each receives a unique Secret ID. This approach:

- Prevents credential sharing between workloads.
- Enables single-workload revocation and auditing.

## AppRole Configuration Tips

Use the table below to tune your AppRole role:

| Parameter               | Description                                                               |
| ----------------------- | ------------------------------------------------------------------------- |
| token\\\_policies       | Vault policies attached to the generated token (e.g., `web-app`).         |
| token\\\_ttl            | Default TTL for tokens issued under this role (e.g., `1h`).               |
| token\\\_max\\\_ttl     | Maximum TTL users can renew tokens to (e.g., `24h`).                      |
| secret\\\_id\\\_ttl     | Time-to-live for unused Secret IDs to limit exposure.                     |
| token\\\_bound\\\_cidrs | List of CIDR blocks from which the token is valid (e.g., `10.1.16.0/16`). |
| token\\\_type           | Token type (`service` or `batch`). Batch tokens cannot be renewed.        |

## Step-by-Step Guide

### 1\. Enable the AppRole Auth Method

```
# Default path: "approle"
vault auth enable approle


# Custom path: "hcvop"
vault auth enable -path=hcvop approle
```

### 2\. Create a Role

```
vault write auth/approle/role/hcvop \
  token_policies=web-app \
  token_ttl=1h \
  token_max_ttl=24h \
  secret_id_ttl=24h \
  token_bound_cidrs="10.1.16.0/16" \
  token_type=batch
```

### 3\. View Role Configuration

```
vault read auth/approle/role/hcvop
```

Sample output:

```
Key                    Value
---                    -----
token_policies         [web-app]
token_ttl              1h
token_max_ttl          24h
secret_id_ttl          24h
token_bound_cidrs      [10.1.16.0/16]
token_type             batch
```

### 4\. Retrieve the Role ID

```
vault read auth/approle/role/hcvop/role-id
```

```
Key     Value
---     -----
role_id 22549d0d-147a-d6e2-fa2e-9cedd3b20977
```

### 5\. Generate a Secret ID

> [!important]
> **Warning**
>
> `secret_id` is sensitive. Store or wrap it securely and avoid long-lived exposure.

```
vault write -f auth/approle/role/hcvop/secret-id
```

```
Key                Value
---                -----
secret_id          0514b3b1-e1ce-2741-0b57-ef836c29c7d3
secret_id_accessor da025e1f-7247-1888-218c-37382d31e98e
secret_id_ttl      24h
```

### 6\. Authenticate with AppRole (CLI)

```
vault write auth/approle/login \
  role_id=22549d0d-147a-d6e2-fa2e-9cedd3b20977 \
  secret_id=0514b3b1-e1ce-2741-0b57-ef836c29c7d3
```

Sample response:

```
Key                   Value
---                   -----
token                 hvs.CAESIGjTXNY...
token_accessor        KmRLXSRBozhXo...
token_duration        24h
token_renewable       true
token_policies        ["default" "web-app"]
token_meta_role_name  hcvop
```

### 7\. Authenticate with AppRole (HTTP API)

```
curl --request POST \
     --data '{"role_id":"22549d0d-147a-d6e2-fa2e-9cedd3b20977","secret_id":"0514b3b1-e1ce-2741-0b57-ef836c29c7d3"}' \
     https://vault.example.com:8200/v1/auth/approle/login | jq .
```

Sample JSON:

```
{
  "auth": {
    "client_token": "hvs.CAESIIJoCqiCpci...",
    "policies": ["default","web-app"],
    "metadata": {"role_name":"hcvop"},
    "lease_duration": 2764800,
    "renewable": true,
    "token_type": "service"
  }
}
```

Extract only the token:

```
curl --request POST \
     --data '{"role_id":"...","secret_id":"..."}' \
     https://vault.example.com:8200/v1/auth/approle/login \
  | jq -r '.auth.client_token'
```

---

That concludes the AppRole auth method guide. For human-centric authentication, explore the [Userpass auth method](https://www.vaultproject.io/docs/auth/userpass).

## Links and References

- [Vault AppRole Documentation](https://www.vaultproject.io/docs/auth/approle)
- [HashiCorp Vault Concepts](https://www.vaultproject.io/docs/concepts)
- [jq Manual](https://stedolan.github.io/jq/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/8dc0af78-c47f-4f35-83c0-f5eafa95f7f6)**
>
> Watch video content
