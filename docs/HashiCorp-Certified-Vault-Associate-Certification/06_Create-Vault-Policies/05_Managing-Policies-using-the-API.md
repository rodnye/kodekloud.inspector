# Managing Policies using the API - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Create-Vault-Policies/Managing-Policies-using-the-API)

---

## Table of Contents

- Managing Policies using the API
  - Create or Update a Policy
  - Next Steps & References
  - Watch Video
    - payload.json Example

---

## Content

HashiCorp Certified: Vault Associate Certification

Create Vault Policies

# Managing Policies using the API

Vault’s HTTP API provides a straightforward way to create, update, and manage policies. By sending a `PUT` request to the `/v1/sys/policy/<name>` endpoint along with a JSON payload, you can define or overwrite policy rules.

## Create or Update a Policy

Use the following `curl` command to create or update a policy named `webapp`:

```
curl \
  --header "X-Vault-Token: s.bCEo8HFNIIR8wRGAzwXwkqUk" \
  --request PUT \
  --data @payload.json \
  http://127.0.0.1:8200/v1/sys/policy/webapp
```

| Option                        | Description                                                       | Example                                     |
| ----------------------------- | ----------------------------------------------------------------- | ------------------------------------------- |
| `--header "X-Vault-Token: …"` | Vault token for authentication                                    | `X-Vault-Token: s.bCEo8HFNIIR8wRGAzwXwkqUk` |
| `--request PUT`               | HTTP method for creating or updating a policy                     | `PUT`                                       |
| `--data @payload.json`        | Path to the JSON file with the policy definition                  | `@payload.json`                             |
| API endpoint                  | Target URL for policy management; replace `webapp` with your name | `/v1/sys/policy/webapp`                     |

> [!important]
> **Warning**
>
> Using `PUT` on an existing policy will overwrite it. Always review the policy rules before applying.

### payload.json Example

Below is a sample `payload.json` defining a policy with read, write, list, and delete permissions on `kv/apps/webapp`:

```
{
  "policy": "
    path \"kv/apps/webapp\" {
      capabilities = [\"create\", \"update\", \"read\", \"delete\", \"list\"]
    }
  "
}
```

- **`policy`**: Contains the HCL-like policy string.
- **`path "kv/apps/webapp"`**: Specifies the secrets path this policy governs.
- **`capabilities`**: Lists allowed operations on that path.

> [!important]
> **Note**
>
> Ensure `payload.json` is located in your current directory or provide an absolute path.
> For advanced policy syntax, see the [Vault Policy Documentation](https://www.vaultproject.io/docs/concepts/policies).

## Next Steps & References

- Learn more about Vault’s policy engine and HCL syntax:  
  [Vault Policy Language](https://www.vaultproject.io/docs/concepts/policies)
- Explore other system endpoints in the API:  
  [Vault HTTP API Reference](https://www.vaultproject.io/api-docs)
- Secure Vault tokens and follow [best practices](/docs/security/best-practices).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/83a61f63-3f1f-436c-8aa3-e972b099eeec/lesson/725b59ca-113b-4b81-8696-428b32d41eab)**
>
> Watch video content
