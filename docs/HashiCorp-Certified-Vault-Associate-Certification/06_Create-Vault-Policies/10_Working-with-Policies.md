# Working with Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Create-Vault-Policies/Working-with-Policies)

---

## Table of Contents

- Working with Policies
  - Table of Contents
  - Creating a Token with a Policy
  - Inspecting an Existing Token
  - Testing Token Capabilities
  - Writing Administrative Policies
  - Links and References
  - Watch Video
  - Practice Lab
    - Token Attributes
    - Key Points

---

## Content

HashiCorp Certified: Vault Associate Certification

Create Vault Policies

# Working with Policies

In this guide, you’ll learn how to create and test tokens scoped to specific policies and write administrative policies for Vault operators. Leveraging policy-based access control (PBAC) in HashiCorp Vault ensures fine-grained security, minimal access, and clear audit trails.

## Table of Contents

1.  [Creating a Token with a Policy](#creating-a-token-with-a-policy)
2.  [Inspecting an Existing Token](#inspecting-an-existing-token)
3.  [Testing Token Capabilities](#testing-token-capabilities)
4.  [Writing Administrative Policies](#writing-administrative-policies)
5.  [Links and References](#links-and-references)

---

## Creating a Token with a Policy

To issue a new Vault token and bind it to one or more policies, run:

```
vault token create -policy="web-app"
```

Example output:

```
Key                    Value
---                    -----
token                  s.7uBlZwXSxOg31uGXIUetEdXD
token_accessor         18r88muoe3x1xEqVqXdlTMwJ
token_duration         768h
token_renewable        true
token_policies         ["default" "web-app"]
identity_policies      []
```

### Token Attributes

| Field                | Description                                           |
| -------------------- | ----------------------------------------------------- |
| token                | The actual authentication token                       |
| token\\\_accessor    | Short-lived handle for revocation or lookup           |
| token\\\_duration    | Time-to-live (TTL) for the token                      |
| token\\\_renewable   | Indicates if the token can be renewed                 |
| token\\\_policies    | List of attached policies (always includes `default`) |
| identity\\\_policies | Attached identity group policies (if any)             |

> [!important]
> **Note**
>
> Every token in Vault inherits the `default` policy. Always design your custom policies to grant only the permissions required for your application.

---

## Inspecting an Existing Token

To review the details and policies of an existing Vault token, use:

```
vault token lookup <token>
```

This command displays all token attributes, including the list of policies attached.

---

## Testing Token Capabilities

Before deploying a token in production, validate that it grants exactly the permissions you need. Suppose your `web-app` policy (`web-app.hcl`) should:

1.  Read a secret at `secret/data/api/key/google`.
2.  Generate AWS credentials from `aws/creds/s3-readonly`.

After writing and loading your policy:

```
vault policy write web-app web-app.hcl
```

Test the policy with these steps:

```
# 1. Create a token scoped to "web-app"
vault token create -policy="web-app" -format=json \
  | jq -r ".auth.client_token" > token.txt


# 2. Log in with the new token
vault login "$(cat token.txt)"


# 3. Verify read access (should succeed)
vault kv get secret/api/key/google


# 4. Verify write access is denied (should fail)
vault kv put secret/api/key/google key="ABCDE12345"


# 5. Verify AWS credentials issuance (should succeed)
vault read aws/creds/s3-readonly
```

> [!important]
> **Warning**
>
> Always test both allowed and denied operations. Overprovisioned policies can lead to security risks.

---

## Writing Administrative Policies

Vault operators need permissions to manage core system paths under `sys/`. Below is an example HCL policy granting common operator capabilities:

```
# Manage License
path "sys/license" {
  capabilities = ["read", "list", "create", "update", "delete"]
}


# Initialize Vault
path "sys/init" {
  capabilities = ["read", "create", "update"]
}


# Configure the UI
path "sys/config/ui" {
  capabilities = ["read", "list", "update", "delete", "sudo"]
}


# Rekey and Unseal Keys
path "sys/rekey/*" {
  capabilities = ["read", "list", "update", "delete"]
}


# Rotate the Master Key
path "sys/rotate" {
  capabilities = ["update", "sudo"]
}


# Seal the Vault
path "sys/seal" {
  capabilities = ["sudo"]
}
```

### Key Points

- **Capabilities**
  - `read`, `list`, `create`, `update`, `delete`: Standard operations.
  - `sudo`: Grants access to root-protected endpoints (use sparingly).

- **Least Privilege**  
  Only include the paths and capabilities that each operator role truly requires.

---

## Links and References

- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs)
- [Vault CLI Reference](https://www.vaultproject.io/docs/commands)
- [Vault Policy Management](https://www.vaultproject.io/docs/concepts/policies)
- [Terraform Vault Provider Registry](https://registry.terraform.io/providers/hashicorp/vault/latest)
- [jq Manual](https://stedolan.github.io/jq/manual/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/83a61f63-3f1f-436c-8aa3-e972b099eeec/lesson/8e53f231-10d5-472a-a37f-99b72974b689)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/83a61f63-3f1f-436c-8aa3-e972b099eeec/lesson/77addfcc-3dee-4a61-a241-bdf03488c60b)**
>
> Practice lab
