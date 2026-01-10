# Demo Configuring Auth Methods using the CLI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-Authentication-Methods/Demo-Configuring-Auth-Methods-using-the-CLI)

---

## Table of Contents

- Demo Configuring Auth Methods using the CLI
  - Viewing Available Auth Subcommands
  - Enabling and Listing Auth Methods
  - Disabling Auth Methods
  - Adding a Description When Mounting
  - Tuning an Auth Method
  - Configuring the userpass Backend
  - Example: Enabling and Configuring AppRole
  - Conclusion
  - Links and References
  - Watch Video
    - 1. Enable userpass at the Default Path
    - 2. Enable userpass on a Custom Path
    - 1. Remove the Default userpass Mount
    - 2. Clean Up the Custom Mount
    - Create a User in bryan
    - List and Read User Details

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare Authentication Methods

# Demo Configuring Auth Methods using the CLI

In this guide, we’ll walk through how to manage HashiCorp Vault authentication methods (`auth` backends) using the Vault CLI. You’ll learn to enable, list, disable, tune, and interact with backends such as `userpass` and `approle` in a consistent, repeatable way.

## Viewing Available Auth Subcommands

Start by inspecting the top-level `vault auth` command:

```
vault auth -h
```

To see commonly used subcommands:

| Command                     | Description                                      |
| --------------------------- | ------------------------------------------------ |
| `vault auth list`           | List all enabled auth methods                    |
| `vault auth enable [TYPE]`  | Enable a new auth backend                        |
| `vault auth disable [PATH]` | Disable an existing auth backend                 |
| `vault auth tune [OPTIONS]` | Update mount settings (e.g., TTLs, descriptions) |
| `vault auth help [BACKEND]` | Show detailed help for a specific auth backend   |

You can also run:

```
vault auth help userpass
vault auth help approle
```

to get backend-specific guidance.

## Enabling and Listing Auth Methods

### 1\. Enable `userpass` at the Default Path

```
vault auth enable userpass
# Success! Enabled userpass auth method at: userpass/
```

Verify it’s enabled:

```
vault auth list
# Path      Type      Accessor
# ----      ----      ---------
# token/    token     auth_token_...
# userpass/ userpass  auth_userpass_...
```

### 2\. Enable `userpass` on a Custom Path

```
vault auth enable -path=vault-course userpass
# Success! Enabled userpass auth method at: vault-course/
```

List both mounts:

```
vault auth list
# Path           Type      Accessor
# ----           ----      ---------
# token/         token     auth_token_...
# userpass/      userpass  auth_userpass_...
# vault-course/  userpass  auth_userpass_...
```

## Disabling Auth Methods

> [!important]
> **Warning**
>
> Disabling an auth method immediately revokes any credentials issued under that mount.

### 1\. Remove the Default `userpass` Mount

```
vault auth disable userpass
# Success! Disabled the auth method at: userpass/
```

Confirm removal:

```
vault auth list
# Path           Type      Accessor
# ----           ----      ---------
# token/         token     auth_token_...
# vault-course/  userpass  auth_userpass_...
```

### 2\. Clean Up the Custom Mount

```
vault auth disable vault-course
# Success! Disabled the auth method at: vault-course/
```

Only the `token` backend remains:

```
vault auth list
# Path      Type   Accessor
# ----      ----   ---------
# token/    token  auth_token_...
```

## Adding a Description When Mounting

Descriptions must be provided at mount time. Any existing mount must be disabled first.

```
vault auth disable userpass
```

> [!important]
> **Note**
>
> You cannot add or update a description on an existing mount. Always set it when you enable the backend.

```
vault auth enable \
  -path=bryan \
  -description="Local credentials for Vault access" \
  userpass
# Success! Enabled userpass auth method at: bryan/
```

Verify the description:

```
vault auth list
# Path   Type      Accessor             Description
# ----   ----      --------             -----------
# bryan/ userpass  auth_userpass_...     Local credentials for Vault access
# token/ token     auth_token_...        token based credentials
```

## Tuning an Auth Method

Adjust the default lease TTL for tokens issued via the `bryan` mount:

```
vault auth tune \
  -default-lease-ttl=24h \
  bryan/
# Success! Tuned the auth method at: bryan/
```

## Configuring the `userpass` Backend

### Create a User in `bryan`

```
vault write auth/bryan/users/krausen \
  password=vault \
  policies=bryan
# Success! Data written to: auth/bryan/users/krausen
```

### List and Read User Details

```
vault list auth/bryan/users
# Keys
# ----
vault read auth/bryan/users/krausen
# Key                     Value
# ---                     -----
# policies                [bryan]
# token_bound_cidrs       []
# token_policies          [bryan]
# token_ttl               0s
# token_type              default
```

Different backends accept different parameters—for example, `approle` uses `role` instead of `users`.

## Example: Enabling and Configuring AppRole

1.  **Enable the AppRole Method**

    ```
    vault auth enable approle
    # Success! Enabled approle auth method at: approle/
    ```

2.  **Create a Role with a 20-Minute Token TTL**

    ```
    vault write auth/approle/role/bryan \
      token_ttl=20m \
      policies=bryan
    # Success! Data written to: auth/approle/role/bryan
    ```

> [!important]
> **Note**
>
> AppRole is recommended for machine-to-machine authentication and automated workflows.

## Conclusion

You’ve learned how to:

- Enable and list Vault auth methods
- Disable mounts safely
- Add metadata (descriptions)
- Tune mount configurations
- Create and manage users in `userpass`
- Configure an AppRole backend

These CLI patterns apply to all Vault authentication backends—just adjust paths, parameters, and payloads to fit your use case.

## Links and References

- [Vault CLI Documentation](https://www.vaultproject.io/docs/commands/auth)
- [Userpass Auth Method](https://www.vaultproject.io/docs/auth/userpass)
- [AppRole Auth Method](https://www.vaultproject.io/docs/auth/approle)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/eebfb593-8885-43b0-a9ba-9f88af87092e/lesson/e69b59fd-06a5-464a-9bf3-5d3e85324e02)**
>
> Watch video content
