# Configuring Auth Methods using the CLI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-Authentication-Methods/Configuring-Auth-Methods-using-the-CLI)

---

## Table of Contents

- Configuring Auth Methods using the CLI
  - vault auth Subcommands
  - Enabling an Auth Method
  - Disabling an Auth Method
  - Listing Enabled Auth Methods
  - Tuning an Auth Method
  - Viewing Command Help
  - Command Breakdown
  - Configuring an Enabled Auth Method
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare Authentication Methods

# Configuring Auth Methods using the CLI

HashiCorp Vault’s authentication methods allow you to control how clients authenticate and obtain tokens. While the Vault UI and API offer full functionality, the Vault CLI (`vault`) provides a fast, scriptable approach to enable, disable, list, tune, and configure auth methods.

## vault auth Subcommands

```
Usage: vault auth [OPTIONS] COMMAND
```

| Command | Description                                   |
| ------- | --------------------------------------------- |
| enable  | Mount a new auth method                       |
| disable | Unmount an existing auth method               |
| list    | Display all enabled auth method mounts        |
| tune    | Adjust configuration settings for a mount     |
| help    | Show help for a specific `vault auth` command |

> [!important]
> **Note**
>
> Use `vault auth help <subcommand>` for in-depth usage details and examples.

## Enabling an Auth Method

By default, Vault mounts an auth method at a path matching its type:

```
$ vault auth enable approle
Success! Enabled approle auth method at: approle/
```

To customize the mount path, include `-path`:

```
$ vault auth enable -path=custom-approle approle
Success! Enabled approle auth method at: custom-approle/
```

You can also add a description for clarity:

```
$ vault auth enable \
    -path=apps \
    -description="Application credentials" \
    approle
Success! Enabled approle auth method at: apps/
```

## Disabling an Auth Method

When disabling, reference the mount path, **not** the auth type:

```
$ vault auth disable apps
Success! Disabled the auth method (if it existed) at: apps/
```

> [!important]
> **Warning**
>
> Specifying the wrong mount path will have no effect. Always verify the path with `vault auth list` before disabling.

## Listing Enabled Auth Methods

Run `vault auth list` to view mounts, types, accessors, and descriptions:

```
$ vault auth list
Path            Type      Accessor                    Description
----            ----      --------                    -----------
approle/        approle   auth_approle_d8c20abe       Application roles
token/          token     auth_token_89ce3371         Token-based access
custom-approle/ approle   auth_approle_b3f0c92d       Custom path example
```

## Tuning an Auth Method

Adjust TTLs or other parameters with `vault auth tune`. For example, set a default lease TTL of 30 minutes and a max lease TTL of 1 hour:

```
$ vault auth tune \
    -default-lease-ttl=30m \
    -max-lease-ttl=1h \
    apps/
Success! Tuned auth method at: apps/
```

## Viewing Command Help

To get usage and flag information for any subcommand:

```
$ vault auth help enable
```

## Command Breakdown

Each `vault auth` invocation follows this pattern:

```
vault auth <subcommand> [options] <mount-path-or-type>
```

- `vault` — Vault CLI binary
- `auth` — Auth methods subsystem
- `<subcommand>` — `enable`, `disable`, `list`, `tune`, or `help`
- `[options]` — Flags like `-path` or `-description`
- `<mount-path-or-type>` — Type for `enable`; mount path for `disable` and `tune`

## Configuring an Enabled Auth Method

Once mounted, interact under the `auth/` prefix. To create an AppRole role named `vault-course`:

```
$ vault write auth/approle/role/vault-course \
    secret_id_ttl=10m \
    secret_id_num_uses=40 \
    token_ttl=20m \
    token_max_ttl=30m \
    token_num_uses=10
Success! Data written to: auth/approle/role/vault-course
```

Here, each flag sets TTLs or usage limits for the role.

## Next Steps

You now know how to enable, disable, list, tune, and configure Vault auth methods via the CLI. In the next lesson, we’ll explore advanced options, automation patterns, and best practices for securing auth backends.

## Links and References

- [Vault CLI Commands](https://www.vaultproject.io/docs/commands)
- [Authentication Methods Overview](https://www.vaultproject.io/docs/auth)
- [AppRole Auth Method](https://www.vaultproject.io/docs/auth/approle)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/eebfb593-8885-43b0-a9ba-9f88af87092e/lesson/9156dd83-34f1-43bb-bca8-b4d9a3becb62)**
>
> Watch video content
