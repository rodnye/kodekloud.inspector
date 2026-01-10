# Vault Identity Entities and Groups - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Configure-Access-Control/Vault-Identity-Entities-and-Groups)

---

## Table of Contents

- Vault Identity Entities and Groups
  - Vault Entities
  - Entity Aliases
  - Unifying Aliases Under One Entity
  - Vault Groups
  - Internal vs. External Groups
  - Further Reading and References
  - Watch Video
    - Internal Groups
    - External Groups

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Configure Access Control

# Vault Identity Entities and Groups

Unlock the full power of HashiCorp Vault by mastering its Identity system. In this guide, you’ll learn how Entities, Aliases, and Groups help you manage user and machine identities, unify authentication methods, and streamline permission assignment.

---

## Vault Entities

A **Vault Entity** is the canonical representation of a user or machine (Vault client). When a unique client first authenticates, Vault’s Identity Secrets Engine creates an entity:

![The image is a slide explaining Vault Entities, detailing how Vault creates entities and aliases, and their roles in authentication. It includes a Vault certification badge and a cartoon character illustration.](https://kodekloud.com/kk-media/image/upload/v1752878347/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Identity-Entities-and-Groups/vault-entities-authentication-slide.jpg)

- Every entity has its own unique ID (`canonical_id`).
- Zero or more **Aliases** can link different auth methods and identifiers to the same entity.
- Attach **policies** and **metadata** (e.g., department, team) directly to an entity for centralized authorization.

> [!important]
> **Note**
>
> Entities simplify auditing and policy management by providing a single point to attach metadata and policies.

---

## Entity Aliases

An **alias** connects an auth method (e.g., Userpass, LDAP, GitHub) and the user’s login identifier to an entity. If no matching alias exists at login, Vault automatically creates both the entity and its alias.

![The image is an illustration showing a character named Julie Smith, a finance specialist, with her authentication options and associated entity details for UserPass, LDAP, and GitHub. Each entity includes specific department and team information.](https://kodekloud.com/kk-media/image/upload/v1752878348/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Identity-Entities-and-Groups/julie-smith-authentication-options-illustration.jpg)

In this example, Julie Smith has three aliases:

| Auth Method | Login Identifier     | Assigned Policy    |
| ----------- | -------------------- | ------------------ |
| Userpass    | `JSmith`             | `accounting`       |
| LDAP        | `jsmith@example.com` | `finance`          |
| GitHub      | `JSmith22`           | `accounts_payable` |

Without unification, Julie would need to log out and back in to switch permission sets.

---

## Unifying Aliases Under One Entity

To grant Julie all her permissions in a single login, manually create one entity and map all aliases to it. Entities and aliases contribute their policies **additively**.

1.  Create Julie’s entity with management metadata:

    ```
    vault write identity/entity \
      name="Julie Smith" \
      policies="it-management" \
      metadata="organization"="HCVOP, Inc" \
      metadata="team"="management"
    ```

    Save the returned `entity_id` (the `canonical_id`).

2.  Add each alias, using the appropriate `mount_accessor` for the auth method:

    ```
    # GitHub alias
    vault write identity/entity-alias \
      name="jsmith22" \
      canonical_id="<entity_id>" \
      mount_accessor="<github_auth_accessor>"

    # LDAP alias
    vault write identity/entity-alias \
      name="jsmith@hcvop.com" \
      canonical_id="<entity_id>" \
      mount_accessor="<ldap_auth_accessor>"
    ```

    Get your `mount_accessor` values with:

    ```
    vault auth list
    ```

> [!important]
> **Warning**
>
> Ensure each `mount_accessor` matches the correct auth path. Misconfigured accessors may lead to orphaned aliases.

Once configured, any login by Julie—whether via LDAP, GitHub, or Userpass—yields a token with:

- Policies from the alias (e.g., `finance`)
- Policies from the entity (e.g., `it-management`)

![The image illustrates a process involving Vault entities, showing how a user authenticates with LDAP credentials to receive a Vault token, which inherits capabilities from multiple policies. It includes a diagram with a character, entity details, and a flow of authentication steps.](https://kodekloud.com/kk-media/image/upload/v1752878349/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Identity-Entities-and-Groups/vault-authentication-ldap-token-diagram.jpg)

---

## Vault Groups

Groups let you bundle multiple entities (and even other groups) under shared policies. This structure scales permission management across teams.

![The image shows a diagram of a "Vault Groups" structure for a team named "Finance_Team" with members Maria Shi and John Lee, each having specific policies and entity aliases.](https://kodekloud.com/kk-media/image/upload/v1752878350/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Identity-Entities-and-Groups/vault-groups-finance-team-diagram.jpg)

Example group configuration:

| Group Name     | Members                 | Group Policy |
| -------------- | ----------------------- | ------------ |
| `finance_team` | `maria.she`, `john.lee` | `finance`    |

- **Maria Shi** (alias `maria.she`) has `base_user` via her entity.
- **John Lee** (alias `john.lee`) has `superuser` via his entity.

When John logs in:

- He inherits `superuser` (alias).
- He gets `management` (entity).
- He also receives `finance` (group).

---

## Internal vs. External Groups

![The image is a comparison between "Internal Group" and "External Group" in Vault, describing their creation and purpose. Internal Groups are created manually to group entities with identical permissions, while External Groups are inferred and created based on group associations from authentication methods, either manually or automatically.](https://kodekloud.com/kk-media/image/upload/v1752878351/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Identity-Entities-and-Groups/internal-external-groups-comparison-vault.jpg)

### Internal Groups

- Defined and managed solely within Vault.
- Ideal for grouping entities that share identical permission sets.
- Permissions automatically propagate into child namespaces without reconfiguring auth backends.

![The image explains the concept of Vault Groups, highlighting their use in managing permissions within Vault Namespaces. It includes a diagram showing the relationship between a root namespace and a child namespace for a finance team.](https://kodekloud.com/kk-media/image/upload/v1752878353/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Identity-Entities-and-Groups/vault-groups-permissions-diagram-namespaces.jpg)

### External Groups

- Created in Vault to mirror groups from external identity providers (LDAP, Okta, OIDC).
- Membership is controlled at the IDP—Vault simply assigns matching policies.
- Automatically keeps Vault policies in sync with your existing corporate groups.

![The image explains how external groups are used in HashiCorp Vault to set permissions based on group membership from identity providers like LDAP or Okta. It includes a diagram showing the integration between Active Directory and HashiCorp Vault for managing group permissions.](https://kodekloud.com/kk-media/image/upload/v1752878353/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Vault-Identity-Entities-and-Groups/hashicorp-vault-external-groups-diagram.jpg)

**Workflow for External Groups**:

1.  Enable and configure the auth method (e.g., LDAP).
2.  Create an external group in Vault matching the IDP’s group name.
3.  Attach policies to that external group.
4.  Users in the IDP group inherit those policies on Vault login.

---

## Further Reading and References

- [Vault Identity Secrets Engine](https://www.vaultproject.io/docs/secrets/identity)
- [Vault Authentication Methods](https://www.vaultproject.io/docs/auth)
- [Vault Namespaces](https://www.vaultproject.io/docs/enterprise/namespaces)
- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs)

Master these Identity features to automate policy management, simplify user access, and maintain tight security controls in your Vault environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/968cf007-376b-48c8-83f9-17521b5dd575/lesson/cddfb91f-6acb-4f61-be22-ed929c9d017f)**
>
> Watch video content
