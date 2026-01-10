# Identity Secrets Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/Identity-Secrets-Engine)

---

## Table of Contents

- Identity Secrets Engine
  - Overview
  - Entities and Aliases
  - Multiple Authentication Methods
  - Vault Groups
  - Internal vs. External Groups
  - Summary
  - Links and References
  - Watch Video
    - Consolidating into a Single Entity
    - Internal Groups and Namespaces
    - External Groups

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# Identity Secrets Engine

Vault’s Identity Secrets Engine is the core component for managing identities and policies in Vault. It tracks all clients (entities), maps authentication methods to those entities via aliases, and enables scalable policy assignment using groups.

## Overview

> [!important]
> **Note**
>
> The Identity Secrets Engine is mounted by default in Vault (path: `identity/`). It cannot be disabled or moved.

Key characteristics:

- Represents every Vault client as an **entity**, each with:
  - A unique entity ID.
  - Zero or more **aliases** linking auth methods.
- Operators can manage entities, aliases, and groups via the **UI**, **CLI**, or **API**.
- On first login, Vault auto-creates an entity and alias if none exist.

| Feature       | Description                                            |
| ------------- | ------------------------------------------------------ |
| Entities      | Unique identities for users or systems                 |
| Aliases       | Links between auth methods and entities                |
| Groups        | Collections of entities for policy management at scale |
| Default Mount | Always enabled at `identity/`                          |

## Entities and Aliases

An **entity** represents one person or system. An **alias** maps a particular authentication method to that entity. You can pre-create entities and add aliases later or let Vault handle it automatically.

When a new user logs in via **userpass**, Vault:

1.  Creates an entity (e.g., `b81de864-...`).
2.  Attaches an alias combining the auth method (`userpass`) and username (`JSmith`).
3.  Associates policies and optional metadata.

Example CLI commands:

```
vault write identity/entity name="Julie Smith" metadata=department=finance policies="management"
vault write identity/entity-alias name="JSmith" canonical_id="E48C..." mount_accessor="$(vault auth list -format=json | jq -r '.userpass_accessor')"
```

![The image illustrates a Vault entity setup, showing a user with an alias, entity ID, and associated policy. It includes a character labeled as a finance specialist and a certification badge.](https://kodekloud.com/kk-media/image/upload/v1752878449/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Identity-Secrets-Engine/vault-entity-setup-user-policy.jpg)

## Multiple Authentication Methods

Without consolidation, multiple auth methods create separate entities:

- `userpass/JSmith` → entity `B81D…` (policy: `accounting`)
- `ldap/jsmith@example.com` → entity `E93D…` (policy: `finance`)
- `github/jsmith22` → entity `F45A…` (policy: `accounts-payable`)

This fragmentation can complicate policy management and reporting.

![The image illustrates a "Vault Entities" diagram featuring a character named Julie Smith, a finance specialist, with authentication options and entity details for accounting and finance departments. It also includes a certification badge labeled "Vault Certified Operations Professional."](https://kodekloud.com/kk-media/image/upload/v1752878450/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Identity-Secrets-Engine/vault-entities-julie-smith-diagram.jpg)

### Consolidating into a Single Entity

To unify access, create one **Julie Smith** entity and attach all auth method aliases:

1.  Create the entity and assign shared policy (`management`):

    ```
    vault write identity/entity name="Julie Smith" policies="management"
    ```

2.  Add aliases for each auth method:

    ```
    vault write identity/entity-alias name="JSmith" canonical_id="E48C..." mount_accessor="userpass_accessor"
    vault write identity/entity-alias name="jsmith@example.com" canonical_id="E48C..." mount_accessor="ldap_accessor"
    vault write identity/entity-alias name="jsmith22" canonical_id="E48C..." mount_accessor="github_accessor"
    ```

3.  On login via any method, tokens inherit:
    - Alias-level policy (e.g., `accounting`)
    - Entity-level policy (`management`)

![The image illustrates the concept of Vault Entities, showing how a user named Julie Smith is authenticated via LDAP to receive a Vault token, which inherits capabilities from multiple policies. It includes a diagram of the authentication process and lists aliases with associated policies.](https://kodekloud.com/kk-media/image/upload/v1752878452/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Identity-Secrets-Engine/vault-entities-authentication-diagram.jpg)

## Vault Groups

Groups enable policy management for many entities simultaneously:

- A **group** can contain entities and subgroups.
- Assign policies at the group level; all members inherit them.
- Similar to directory-based groups (LDAP/AD).

Example: A **Finance Team** group with the `finance` policy includes:

- Maria (entity-level `accounts-payable`)
- John (entity-level `management`)

On login, tokens merge policies from:

1.  Alias
2.  Entity
3.  Group

![The image illustrates a "Vault Groups" structure, showing members with their entity IDs, policies, and aliases, and explaining how tokens inherit capabilities from aliases, entities, and groups.](https://kodekloud.com/kk-media/image/upload/v1752878453/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Identity-Secrets-Engine/vault-groups-structure-illustration.jpg)

## Internal vs. External Groups

Vault supports two group types:

| Group Type     | Creation             | Membership Source      | Use Case                                              |
| -------------- | -------------------- | ---------------------- | ----------------------------------------------------- |
| Internal Group | Manually in Vault    | Vault managed          | Propagate permissions across namespaces               |
| External Group | Auto-mapped from IdP | LDAP, OIDC, Okta, etc. | Mirror external identity provider groups and policies |

![The image compares internal and external Vault groups, explaining that internal groups are manually created to propagate identical permissions, while external groups are inferred and created based on group associations from authentication methods.](https://kodekloud.com/kk-media/image/upload/v1752878455/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Identity-Secrets-Engine/vault-groups-internal-external-comparison.jpg)

### Internal Groups and Namespaces

Use internal groups at the root namespace to grant child namespaces access without reconfiguring auth everywhere:

- At root: create an internal group `team-finance` with policy `finance`.
- In child namespace (`finance`): reference the root group as a subgroup.
- Users authenticated at root automatically gain child namespace permissions.

![The image is an informational slide about internal groups in Vault, explaining their use in managing permissions and propagating them through namespaces. It includes a diagram showing the relationship between a root namespace and a child namespace.](https://kodekloud.com/kk-media/image/upload/v1752878456/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Identity-Secrets-Engine/vault-internal-groups-permissions-diagram.jpg)

### External Groups

External groups sync with your identity provider’s groups:

- Create a Vault external group (e.g., `team-finance`).
- Map an alias to the provider’s group name or UUID.
- Assign policies in Vault; manage membership in your IdP.

On login, Vault reflects current IdP memberships and applies policies.

![The image explains how external groups are used to set permissions based on group membership from an external identity provider, with a diagram showing integration between Active Directory and HashiCorp Vault.](https://kodekloud.com/kk-media/image/upload/v1752878458/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Identity-Secrets-Engine/external-groups-permissions-active-directory-vault.jpg)

## Summary

- **Entities** unify clients under a unique identifier.
- **Aliases** link auth methods to entities for granular policies.
- **Groups** (internal/external) scale policy management across teams and namespaces.
- Use the Vault **CLI** and **UI** to configure entities, aliases, and groups.

## Links and References

- [Vault Identity Secrets Engine](https://www.vaultproject.io/docs/secrets/identity)
- [Managing Identities and Access](https://www.vaultproject.io/guides/identity)
- [HashiCorp Vault CLI](https://www.vaultproject.io/docs/commands)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/48dbcef3-9a97-4549-8cfb-90a89176bc65)**
>
> Watch video content
