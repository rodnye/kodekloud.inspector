# Intro to Vault Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Create-Vault-Policies/Intro-to-Vault-Policies)

---

## Table of Contents

- Intro to Vault Policies
  - Why Use Vault Policies?
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Create Vault Policies

# Intro to Vault Policies

Vault Policies are the core mechanism for enforcing authorization in HashiCorp Vault. By defining fine-grained permissions on Vault paths and operations, policies uphold the principle of least privilege. This ensures that diverse clients—DBAs creating dynamic database credentials, Packer builds pulling secrets, reporting applications querying data, CI/CD pipelines provisioning cloud resources, and administrators performing routine tasks—receive only the access they need.

![The image is a slide about Vault Policies, explaining their role in permitting or denying access, the use of declarative statements in JSON or HCL, and the importance of the principle of least privilege.](https://kodekloud.com/kk-media/image/upload/v1752878140/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Intro-to-Vault-Policies/vault-policies-access-declarative-statements.jpg)

## Why Use Vault Policies?

- Enforce Role-Based Access Control (RBAC)
- Segregate duties across automation tools and human operators
- Protect sensitive paths and actions
- Minimize blast radius by granting minimal required capabilities

> [!important]
> **Note**
>
> Always follow the principle of least privilege: grant only the permissions necessary for each client.

Vault supports policies authored in JSON or HCL (HashiCorp Configuration Language). HCL is more human-readable and is the community’s preferred choice for most configurations.

> [!important]
> **Note**
>
> For detailed syntax and examples, see the official [Vault Policy Syntax documentation](https://www.vaultproject.io/docs/concepts/policies).

Vault Policies operate under three fundamental rules:

| Feature         | Description                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------- |
| Deny by Default | Any access not explicitly granted is automatically denied.                                   |
| Explicit Deny   | You may override allow rules by explicitly denying specific paths or capabilities.           |
| Cumulative      | A token can have multiple policies attached; its effective permissions are the union of all. |

![The image explains Vault policies, highlighting that they are "Deny by Default" and require explicit grants. It also notes that policies are cumulative and attached to tokens, with capabilities being additive.](https://kodekloud.com/kk-media/image/upload/v1752878140/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Intro-to-Vault-Policies/vault-policies-deny-by-default-diagram.jpg)

When a client authenticates, Vault issues a token. Policies attached to that token determine the client’s capabilities. If multiple policies are attached, their permissions merge together.

Vault ships with two built-in policies:

| Policy Name | Description                                                | Modifiable | Attached To         |
| ----------- | ---------------------------------------------------------- | ---------- | ------------------- |
| `root`      | Grants unrestricted access to all Vault paths and actions. | No         | All root tokens     |
| `default`   | Allows basic token operations (lookup, renew, revoke).     | Yes        | All non-root tokens |

![The image describes "Out-of-the-Box Vault Policies," detailing the characteristics of the "root" and "default" policies, including their permissions and modifiability.](https://kodekloud.com/kk-media/image/upload/v1752878141/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Intro-to-Vault-Policies/out-of-the-box-vault-policies-details.jpg)

> [!important]
> **Warning**
>
> The `root` policy is implicit and **cannot** be viewed, modified, or deleted.

To list all available policies in your Vault server:

```
vault policy list
# Output:
# default
# root
```

Read the contents of the `default` policy:

```
vault policy read default
# Allow tokens to look up their own properties
path "auth/token/lookup-self" {
  capabilities = ["read"]
}


# Allow tokens to renew themselves
path "auth/token/renew-self" {
  capabilities = ["update"]
}


# Allow tokens to revoke themselves
path "auth/token/revoke-self" {
  capabilities = ["update"]
}


# Allow tokens to view their own capabilities
path "sys/capabilities-self" {
  capabilities = ["update"]
}
```

Attempting to read the `root` policy returns an error:

```
vault policy read root
# Error reading policy: No policy named 'root'
```

Under the hood, the `root` policy behaves as if it contains:

```
path "*" {
  capabilities = ["create", "read", "update", "delete", "list", "sudo"]
}
```

- [Vault Policies Overview](https://www.vaultproject.io/docs/concepts/policies)
- [HCL Configuration Language](https://www.vaultproject.io/docs/configuration/hcl)
- [Vault Authentication Methods](https://www.vaultproject.io/docs/auth)
- [Vault CLI Guide](https://www.vaultproject.io/docs/commands)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/83a61f63-3f1f-436c-8aa3-e972b099eeec/lesson/0691a24b-ed2f-46b4-b147-372fac3ce38c)**
>
> Watch video content
