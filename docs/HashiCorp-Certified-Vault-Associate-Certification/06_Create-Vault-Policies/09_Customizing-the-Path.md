# Customizing the Path - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Create-Vault-Policies/Customizing-the-Path)

---

## Table of Contents

- Customizing the Path
  - The Glob Wildcard (\*)
  - The Single-Segment Wildcard (+)
  - Combining + and \*
  - ACL Templating in Paths
  - Links and References
  - Watch Video
    - Example Policy with \*
    - Breaking Down a Complex Pattern

---

## Content

HashiCorp Certified: Vault Associate Certification

Create Vault Policies

# Customizing the Path

In this guide, you’ll learn how to tailor Vault policy paths using wildcards and ACL templating. By combining glob (`*`) and single‐segment (`+`) wildcards with dynamic templates, you can create flexible, maintainable access controls that adapt to your organization’s structure.

## The Glob Wildcard (`*`)

The glob wildcard (`*`) matches any sequence of characters—including path separators. It’s only valid at the end of a segment or within a pattern. Use it to grant access across multiple nested paths in one rule.

![The image explains how to use the asterisk (*) as a wildcard to customize paths, with examples showing its application at the end of a path or as part of a pattern.](https://kodekloud.com/kk-media/image/upload/v1752878132/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Customizing-the-Path/wildcard-asterisk-paths-examples.jpg)

With `*`, you can:

- Match every subpath under a prefix.
- Include hyphens, numbers, or letters as part of the pattern.

For instance:

- `secret/apps/application1/*` matches:
  - `secret/apps/application1/web`
  - `secret/apps/application1/db/config`
  - `secret/apps/application1/anything/else`

  It does **not** match the base path `secret/apps/application1` itself.

- `KV/platform/DB-*` matches:
  - `KV/platform/DB-2`
  - `KV/platform/DB-10/web`

  It does **not** match `KV/platform/DB2` (missing the hyphen).

### Example Policy with `*`

```
path "secret/apps/application1/*" {
  capabilities = ["read"]
}
```

> [!important]
> **Note**
>
> This rule grants `read` access to every path under `secret/apps/application1` but not to the directory itself. To include the base path, add an explicit rule:
>
> ```
> path "secret/apps/application1" {
> capabilities = ["read"]
> }
> path "secret/apps/application1/*" {
> capabilities = ["read"]
> }
> ```

## The Single-Segment Wildcard (`+`)

Use the single‐segment wildcard (`+`) to match exactly one segment in a path. You can chain multiple `+` wildcards for deeper control.

![The image explains how to use the plus sign (+) for wildcard matching in directory paths, providing examples of its application in different path segments.](https://kodekloud.com/kk-media/image/upload/v1752878134/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Customizing-the-Path/plus-sign-wildcard-matching-paths.jpg)

Example patterns:

- `secret/+/DB` matches:
  - `secret/app/DB`
  - `secret/consul/DB`
  - `secret/123/DB`

- `KV/data/apps/+/webapp` matches:
  - `KV/data/apps/dev/webapp`
  - `KV/data/apps/qa/webapp`
  - `KV/data/apps/prod/webapp`

### Breaking Down a Complex Pattern

Consider `secret/data/+/apps/webapp`:

- **secret**: the mount path of the Secrets Engine.
- **data**: indicates KV version 2.
- **+**: matches any single segment (e.g., `dev`, `qa`, `team-xyz`).
- **apps/webapp**: fixed suffix.

Any path of the form `secret/data/<any>/apps/webapp` will match.

![The image explains path matching rules, showing examples of paths that match and do not match a specific pattern. It includes a visual breakdown of the pattern and a list of matching and non-matching paths.](https://kodekloud.com/kk-media/image/upload/v1752878135/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Customizing-the-Path/path-matching-rules-examples-diagram.jpg)

| Matching Paths                     | Non-Matching Paths                            |
| ---------------------------------- | --------------------------------------------- |
| secret/data/production/apps/webapp | secret/data/apps/webapp (missing one segment) |
| secret/data/dev-1/apps/webapp      | secret/data/front-end/apps (ends with `apps`) |
| secret/data/team-ABC/apps/webapp   | secret/dev (wrong prefix)                     |
| secret/data/456/apps/webapp        |                                               |

## Combining `+` and `*`

Mix both wildcards for even more flexible rules:

```
path "secret/+/+/webapp" {
  capabilities = ["read", "list"]
}

path "secret/apps/+/*team-*" {
  capabilities = ["create", "read"]
}
```

- `secret/+/+/webapp`: two single segments (e.g., `secret/dev/qa/webapp`).
- `secret/apps/+/*team-*`: one segment after `apps` and then any suffix beginning with `team-` (e.g., `secret/apps/dev/team-123`).

## ACL Templating in Paths

Vault’s ACL templating lets you interpolate variables from the token’s context (such as identity entity or group metadata). Templates use `{{ }}`.

![The image is a table titled "ACL Templating" that lists parameters and their descriptions related to entity and group metadata. It includes a URL at the bottom and a cartoon character in the corner.](https://kodekloud.com/kk-media/image/upload/v1752878136/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Customizing-the-Path/acl-templating-parameters-table.jpg)

For example, to isolate each user’s KV v2 path by their `identity.entity.id`:

```
path "secret/data/{{identity.entity.id}}/*" {
  capabilities = ["create", "update", "read", "delete"]
}

path "secret/metadata/{{identity.entity.id}}/*" {
  capabilities = ["list"]
}
```

- User A (entity ID `12345`) gains access to `secret/data/12345/*`.
- User B (entity ID `678910`) gains access to `secret/data/678910/*`.

This ensures complete isolation: users only see their own secrets.

> [!important]
> **Note**
>
> For a full list of template variables—such as `identity.entity.name`, `identity.group.id`, and more—see the [Vault policy template variables documentation](https://www.vaultproject.io/docs/concepts/policies#template-variables).

---

By mastering glob and single‐segment wildcards along with ACL templates, you’ll be able to define concise, scalable policies that adapt automatically to your team’s hierarchy and usage patterns.

## Links and References

- [Vault Policies Concepts](https://www.vaultproject.io/docs/concepts/policies)
- [Vault ACL Template Variables](https://www.vaultproject.io/docs/concepts/policies#template-variables)
- [Vault KV Secrets Engine](https://www.vaultproject.io/docs/secrets/kv)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/83a61f63-3f1f-436c-8aa3-e972b099eeec/lesson/f0a55b5e-9b82-4d7c-9509-aac2673cba80)**
>
> Watch video content
