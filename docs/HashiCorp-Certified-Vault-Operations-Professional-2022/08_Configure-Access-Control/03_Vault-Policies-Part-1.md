# Vault Policies Part 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Configure-Access-Control/Vault-Policies-Part-1)

---

## Table of Contents

- Vault Policies Part 1
  - What Are Vault Policies?
  - Built-In (Out-of-the-Box) Policies
  - Managing Policies with the CLI
  - Managing Policies in the UI
  - Managing Policies via the HTTP API
  - Anatomy of a Vault Policy
  - Understanding Vault Paths
  - Root-Protected Paths
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Configure Access Control

# Vault Policies Part 1

Welcome to Vault Policies Part 1. Whether you’re a Vault operator or preparing for the [Certified Vault Operations Professional exam](https://www.hashicorp.com/certification/vault-operations-professional), mastering policies is essential. In this guide, you’ll learn how Vault policies define which clients—CI/CD pipelines, auditors, Terraform, DevOps engineers, admins, Packer, web apps, and more—can access specific secrets and paths.

![The image is a diagram illustrating how different roles and applications, such as admins, DevOps engineers, and CI/CD pipelines, interact with a central system to determine access to secrets. It includes various icons and arrows indicating the flow of access.](https://kodekloud.com/kk-media/image/upload/v1752878365/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Policies-Part-1/access-secrets-diagram-roles-flow.jpg)

## What Are Vault Policies?

Vault policies are declarative rules (in HCL or JSON) that grant or deny capabilities on Vault paths. They provide fine-grained, RBAC-style access control. Most operators prefer HCL for readability.

> [!important]
> **Note**
>
> Always adhere to the principle of least privilege. Grant only the permissions required for an entity to perform its tasks.

By default, Vault enforces an implicit deny: if no policy grants access to a path, the request is denied. You can also add explicit `deny` rules to override grants. Policies are attached to tokens and other auth entities; multiple policies on a token combine their permissions cumulatively.

![The image is a slide about Vault Policies, explaining their role in access control, the use of JSON or HCL for writing policies, and the importance of following the principle of least privilege. It includes a Vault certification badge.](https://kodekloud.com/kk-media/image/upload/v1752878367/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Policies-Part-1/vault-policies-access-control-principle.jpg)

## Built-In (Out-of-the-Box) Policies

Immediately after deployment, Vault includes two default policies:

| Policy Name | Type      | Description                                                                                                                                            |
| ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **root**    | Superuser | Full privileges (`create, read, update, delete, list, sudo`). Non-editable and auto-attached only to root tokens.                                      |
| **default** | Baseline  | Basic token operations (`lookup-self`, `renew-self`, `revoke-self`, `capabilities-self`). Editable but cannot be deleted; auto-attach can be disabled. |

![The image describes "Out of the Box Policies" for a system, detailing the default "root" and "default" policies, their permissions, and their attachment to tokens. It also features a Vault certification badge.](https://kodekloud.com/kk-media/image/upload/v1752878368/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Policies-Part-1/out-of-the-box-policies-defaults-vault.jpg)

To list and inspect these policies:

```
vault policy list
# -> default
vault policy read default
# Allow tokens to look up their own properties
path "auth/token/lookup-self" {
  capabilities = ["read"]
}
# ... other default rules
```

Reading the `root` policy returns an error (no readable rules):

```
vault policy read root
# No policy named: root
```

Internally, the root policy is equivalent to:

```
path "*" {
  capabilities = ["create","read","update","delete","list","sudo"]
}
```

> [!important]
> **Warning**
>
> Use root tokens sparingly. They grant complete control over the Vault cluster.

## Managing Policies with the CLI

Vault’s CLI offers `vault policy` subcommands: `list`, `read`, `write`, `delete`, and `fmt`.

List all policies:

```
vault policy list
# -> admin-policy
#    default
#    root
```

Create or update a policy from an HCL file:

```
vault policy write admin-policy /tmp/admin.hcl
# Success! Uploaded policy: admin-policy
```

**Inline policy definition** via heredoc:

```
vault policy write webapp -<< 'EOF'
path "kv/data/apps/*" {
  capabilities = ["read","create","update","delete"]
}
path "kv/metadata/*" {
  capabilities = ["read","create","update","list"]
}
EOF
```

## Managing Policies in the UI

In the Vault web UI, go to **Policies** to view ACLs. The `root` policy appears grayed out (non-editable). Use the three-dot menu on any other policy to edit or delete it, or click **Create ACL Policy** to add a new one.

![The image is a screenshot of a user interface for managing policies in Vault, showing options to create, view, edit, or delete ACL policies. It includes annotations and a small illustration of a person in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752878368/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Policies-Part-1/vault-acl-policies-management-screenshot.jpg)

## Managing Policies via the HTTP API

Vault’s HTTP API exposes policy management endpoints. To write a policy:

```
curl --header "X-Vault-Token: s.EXAMPLETOKEN" \
     --request PUT \
     --data @payload.json \
     https://vault.example.com:8200/v1/sys/policy/webapp
```

- Header: `X-Vault-Token` for auth
- Method: `PUT` to create or update
- URL: `/v1/sys/policy/<policy-name>`
- Body (`payload.json`): JSON with a `"policy"` field containing HCL or JSON rules

Example `payload.json`:

```
{
  "policy": "path \"kv/apps/webapp\" { capabilities = [\"read\",\"list\"] }"
}
```

For details, see the [Vault HTTP API docs](https://www.vaultproject.io/api-docs).

## Anatomy of a Vault Policy

Each policy consists of one or more path blocks:

```
path "<resource-path>" {
  capabilities = ["<create|read|update|delete|list|sudo>"]
}
```

Combine blocks to cover multiple resources:

```
path "kv/data/apps/jenkins" {
  capabilities = ["read","update","delete"]
}


path "sys/policies/*" {
  capabilities = ["create","update","list","delete"]
}


path "aws/creds/web-app" {
  capabilities = ["read"]
}
```

## Understanding Vault Paths

Every Vault feature—secret engines, auth methods, KV data—is namespaced under a path. Examples:

![The image is a slide titled "Vault Policies - Path," listing examples of paths used in a system, with a certification badge in the top right corner.](https://kodekloud.com/kk-media/image/upload/v1752878370/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Policies-Part-1/vault-policies-path-examples-slide.jpg)

- `sys/policy`: Manage Vault’s own ACLs
- `kv/app1/app01/web`: KV v1 secrets
- `database/creds/my-role`: Dynamic DB credentials
- `auth/token/renew-self`: Token renewal endpoint

For KV v2 mounts (e.g., at `secrets`), include the `data` prefix:

```
vault kv get secrets/data/platform/aws/tools/ansible
```

Here, `secrets` = mount point, `data` = v2 API prefix.

## Root-Protected Paths

Certain operations require a root token or `sudo` capability. Examples:

![The image is a slide about Vault Policies, specifically focusing on root-protected paths that require a root token or sudo capability. It lists examples of such paths and their functions.](https://kodekloud.com/kk-media/image/upload/v1752878371/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Policies-Part-1/vault-policies-root-protected-paths.jpg)

- `auth/token/create-orphan`: Create orphan tokens
- `pki/root/sign-self-issued`: Sign certificates
- `sys/rotate`: Rotate encryption keys
- `sys/seal`: Seal the Vault
- `sys/step-down`: Force leader step-down

Example policy granting `sudo`:

```
path "sys/rotate" {
  capabilities = ["sudo"]
}
path "sys/seal" {
  capabilities = ["sudo"]
}
path "sys/step-down" {
  capabilities = ["sudo"]
}
```

> [!important]
> **Warning**
>
> Grant sudo sparingly—only highly trusted operators should have these elevated rights.

## Links and References

- [Vault HTTP API Documentation](https://www.vaultproject.io/api-docs)
- [HashiCorp Vault Concepts](https://www.vaultproject.io/docs/concepts)
- [Terraform Registry](https://registry.terraform.io/)
- [Packer Documentation](https://www.packer.io/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/968cf007-376b-48c8-83f9-17521b5dd575/lesson/ec697a75-1b71-465c-a7bc-ccbbbed23773)**
>
> Watch video content
