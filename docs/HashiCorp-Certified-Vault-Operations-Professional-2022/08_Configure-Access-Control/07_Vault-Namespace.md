# Vault Namespace - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Configure-Access-Control/Vault-Namespace)

---

## Table of Contents

- Vault Namespace
  - What Is a Namespace?
  - Namespace Hierarchy
  - Assigning Namespaces to Teams
  - Administrative Delegation
  - Authenticating to Namespaces
  - Common Namespace CLI Commands
  - Using Namespaces in the API
  - Writing Policies for Namespaces
  - Authenticating via the UI
  - Conclusion
  - References
  - Watch Video
    - Using an Environment Variable
    - Using the -namespace Flag
    - Nested Namespace Example
    - 1. X-Vault-Namespace Header
    - 2. Namespace in the URL Path

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Configure Access Control

# Vault Namespace

Vault Namespaces provide isolated, virtual Vault environments within a single cluster. They enable multi-tenancy by letting you delegate administration, manage policies, auth methods, secrets engines, tokens, and identities per namespace—without running multiple clusters or storage backends.

> [!important]
> **Note**
>
> Vault Namespaces are available only in **Vault Enterprise**.
> See [Enterprise Namespaces Documentation](https://www.vaultproject.io/docs/enterprise/namespaces) for more details.

## What Is a Namespace?

A Vault namespace is a child environment inside the root namespace. Each namespace acts like a standalone Vault, offering:

- Fully isolated policies, auth methods, and secrets engines
- Delegation of administration to namespace-specific admins
- Centralized cluster management (storage backend, audit devices, upgrades)
- Hierarchical namespaces, with support for nested child namespaces
- Namespace-scoped tokens (valid only within the issuing namespace)

![The image is a slide explaining namespaces, highlighting that the default namespace is 'root', they are hierarchical, and tokens are valid in a single namespace. It includes a Vault certification badge and a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752878355/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Namespace/namespaces-default-hierarchy-vault-badge.jpg)

## Namespace Hierarchy

Namespaces are organized in a tree structure under the root. You can enable auth methods, secrets engines, and policies at any level—paths and ACLs are always relative to the namespace where they’re defined. This makes policy reuse straightforward.

![The image illustrates a hierarchical structure of namespaces in a Vault system, showing how each namespace can have its own authentication methods, secrets engine, and policies.](https://kodekloud.com/kk-media/image/upload/v1752878357/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Namespace/vault-namespaces-hierarchical-structure.jpg)

Each namespace can spawn child namespaces indefinitely:

![The image is a diagram illustrating a hierarchy of namespaces, showing how they are organized with elements like Auth Method, Secrets Engine, and Policies. It includes a "Vault Certified Operations Professional" badge and a cartoon character at the bottom right.](https://kodekloud.com/kk-media/image/upload/v1752878358/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Namespace/namespace-hierarchy-diagram-vault-badge.jpg)

## Assigning Namespaces to Teams

In a production Vault cluster, you might create separate namespaces for Cloud, Engineering, and Developer teams. Each namespace starts empty—no auth methods or engines are enabled by default.

![The image illustrates a "Production Vault Cluster" with three namespaces: Cloud-Team, Engineering, and Developer, each containing "Secrets Engines," "Auth Methods," and "Policies."](https://kodekloud.com/kk-media/image/upload/v1752878359/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Namespace/production-vault-cluster-namespaces.jpg)

Teams then manage only their assigned namespace:

![The image illustrates the assignment of namespaces within a production vault cluster, showing different teams (Cloud Engineers, DevOps Engineers, Core Developers) and their respective namespaces with components like Secrets Engines, Auth Methods, and Policies.](https://kodekloud.com/kk-media/image/upload/v1752878360/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Namespace/namespace-assignment-production-vault-cluster.jpg)

## Administrative Delegation

Vault engineers handle cluster-wide tasks (storage backend, root namespace, upgrades). Namespace admins (e.g., developers) gain autonomy to configure auth methods, secrets engines, policies, and tokens—without tickets.

![The image illustrates administrative delegation in a Vault system, showing different namespaces and responsibilities for developers and engineers. It highlights the roles of Developer Namespace Admins and Vault Engineers in managing secrets engines, policies, and cluster components.](https://kodekloud.com/kk-media/image/upload/v1752878362/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Namespace/vault-administrative-delegation-namespaces.jpg)

## Authenticating to Namespaces

Users authenticate either at the root or directly into child namespaces—wherever relevant auth methods are enabled.

![The image illustrates a diagram of authenticating to namespaces, showing a root namespace with cloud-team and engineering namespaces, each using different authentication methods (AWS, Azure, OIDC). A person is depicted using a laptop, and there's a Vault certification badge.](https://kodekloud.com/kk-media/image/upload/v1752878363/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Namespace/authenticating-namespaces-diagram-cloud-team.jpg)

If a child namespace has its own auth method enabled (e.g., `userpass`), users can log in directly there:

![The image illustrates a diagram of authenticating to namespaces, showing different authentication methods (AWS, Azure, Userpass, OIDC) within a root namespace structure. It also includes a person using a laptop, with a badge indicating "Vault Certified Operations Professional."](https://kodekloud.com/kk-media/image/upload/v1752878364/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Namespace/authenticating-namespaces-authentication-diagram.jpg)

## Common Namespace CLI Commands

| Command          | Description                  | Example                              |
| ---------------- | ---------------------------- | ------------------------------------ |
| Create namespace | Create a new namespace       | `vault namespace create <namespace>` |
| List namespaces  | List all existing namespaces | `vault namespace list`               |
| Delete namespace | Remove an existing namespace | `vault namespace delete <namespace>` |

```
$ vault namespace create cloud-team
Key     Value
---     -----
id      n57y6
path    cloud-team/

$ vault namespace list
$ vault namespace delete cloud-team
```

### Using an Environment Variable

Set `VAULT_NAMESPACE` so all CLI requests default to that namespace:

```
export VAULT_NAMESPACE=cloud-team
vault kv get kv/data/sql/prod
```

### Using the `-namespace` Flag

Override the namespace for a single command:

```
vault kv get -namespace=cloud-team kv/data/sql/prod
```

### Nested Namespace Example

Combine both methods to target child namespaces:

```
export VAULT_NAMESPACE=cloud-team
vault kv get -namespace=team-one kv/data/sql/prod
```

## Using Namespaces in the API

You can specify namespaces either via a header or in the URL path.

| Method            | Description                             |
| ----------------- | --------------------------------------- |
| Header approach   | Send `X-Vault-Namespace` in the request |
| URL path approach | Prefix the endpoint with `<namespace>/` |

### 1\. X-Vault-Namespace Header

```
curl \
  --header "X-Vault-Token: hvs.a83b50ed2aa548212" \
  --header "X-Vault-Namespace: development/" \
  --request GET \
  https://vault.example.com:8200/v1/kv/data/sql/prod
```

### 2\. Namespace in the URL Path

```
curl \
  --header "X-Vault-Token: hvs.CAESIA7Y-LwSxnE926onQwdxIUf7" \
  --request GET \
  https://vault.example.com:8200/v1/development/kv/data/sql/prod
```

For nested namespaces, extend the path:  
`v1/development/team-one/kv/data/sql/prod`

## Writing Policies for Namespaces

Policy paths are relative to their namespace:

Inside `cloud-team`:

```
path "database/creds/prod-db" {
  capabilities = ["read"]
}
```

From the root namespace to access a secret in `cloud-team`:

```
path "cloud-team/database/creds/prod-db" {
  capabilities = ["read"]
}
```

Include further segments for deeper hierarchies.

## Authenticating via the UI

When signing in, specify your namespace (default is `root`), choose the auth method, and enter your credentials:

![The image shows a login interface for "Sign in to Vault" with fields for namespace, method, username, and password. It includes annotations with arrows and a badge labeled "Vault Certified Operations Professional."](https://kodekloud.com/kk-media/image/upload/v1752878365/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Namespace/sign-in-to-vault-login-interface.jpg)

## Conclusion

Vault Namespaces streamline multi-tenant deployments, enabling delegated management and isolated environments within a single cluster. Master the CLI, API, and UI workflows for effective namespace administration and be prepared for your Vault certification.

## References

- [Vault Enterprise Namespaces](https://www.vaultproject.io/docs/enterprise/namespaces)
- [Vault CLI Documentation](https://www.vaultproject.io/docs/commands)
- [Vault HTTP API](https://www.vaultproject.io/api-docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/968cf007-376b-48c8-83f9-17521b5dd575/lesson/75b42b11-cf65-4ff9-985c-62c51cfcb2e1)**
>
> Watch video content
