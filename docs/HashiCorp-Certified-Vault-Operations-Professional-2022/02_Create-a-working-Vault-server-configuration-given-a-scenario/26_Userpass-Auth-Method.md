# Userpass Auth Method - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/Userpass-Auth-Method)

---

## Table of Contents

- Userpass Auth Method
  - How It Works
  - Configuration Workflow
  - Enabling Userpass
  - Creating a User
  - Additional Token Configuration Options
  - Reading User Settings
  - Modifying User Configuration
  - Authenticating with Userpass
  - Password Rotation
  - Best Practices and Considerations
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# Userpass Auth Method

The Userpass authentication method enables Vault clients to log in using a username and password stored in Vault itself. Since it doesn’t depend on an external identity provider, Userpass is perfect for quick labs, testing environments, and simple use cases where you need basic credential management without added complexity.

> [!important]
> **Warning**
>
> Userpass does not enforce password complexity, expiration, or rotation by default. For production workloads, consider integrating Vault with [external identity providers](https://www.vaultproject.io/docs/auth/jwt#oidc-and-jwt-configuration) or LDAP.

## How It Works

![The image illustrates a "Userpass – Auth Workflow," showing a Vault user sending an authentication request with a username and password to a vault using the UserPass authentication method.](https://kodekloud.com/kk-media/image/upload/v1752878513/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Userpass-Auth-Method/userpass-auth-workflow-vault-diagram.jpg)

1.  User provides **username** (e.g., `hcvop-engineer`) and **password**.
2.  Vault validates credentials and issues a **token**.
3.  The token is used to interact with Vault’s API and secrets engines.

## Configuration Workflow

![The image illustrates a "Userpass – Configuration Workflow" showing the steps for a Vault Admin to create a user, provide credentials, and authenticate, with an optional password change for a developer.](https://kodekloud.com/kk-media/image/upload/v1752878514/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Userpass-Auth-Method/userpass-configuration-workflow-vault-admin.jpg)

1.  Vault Admin **enables** the `userpass` auth method.
2.  Admin **creates** a user with policies and token settings.
3.  Admin hands off credentials to the Developer.
4.  Developer **logs in** and obtains a token.
5.  Developer may **update** their password if allowed by policy.

## Enabling Userpass

```
# Enable at default path (userpass/)
vault auth enable userpass


# Or enable at custom path (e.g., vault-local/)
vault auth enable -path=vault-local userpass
```

## Creating a User

Run `vault write` against the `auth/userpass/users/<username>` path:

```
vault write auth/userpass/users/hcvop-engineer \
    password=cm084kjfj340 \
    policies=engineering-policy \
    token_ttl=15m \
    token_max_ttl=8h
```

| Parameter           | Description                                       | Example              |
| ------------------- | ------------------------------------------------- | -------------------- |
| password            | Initial user password                             | `cm084kjfj340`       |
| policies            | Comma-separated Vault policies                    | `engineering-policy` |
| token\\\_ttl        | Time-to-live for issued tokens                    | `15m`                |
| token\\\_max\\\_ttl | Maximum time-to-live before renewal is disallowed | `8h`                 |

> [!important]
> **Note**
>
> You can assign multiple policies (e.g., `default`,`engineering-policy`) or fine-tune token parameters per user.

## Additional Token Configuration Options

| Option                  | Description                        | Example                            |
| ----------------------- | ---------------------------------- | ---------------------------------- |
| token\\\_type           | Token type (`default` or `batch`)  | `token_type=batch`                 |
| token\\\_num\\\_uses    | Maximum number of uses for a token | `token_num_uses=5`                 |
| token\\\_bound\\\_cidrs | CIDR list restricting token usage  | `token_bound_cidrs="10.1.16.0/16"` |
| token\\\_period         | Duration for periodic tokens       | `token_period=1h`                  |

Include these flags in the same `vault write` command when creating or updating a user.

## Reading User Settings

Retrieve user configuration:

```
vault read auth/userpass/users/hcvop-engineer
```

Sample output:

```
Key                       Value
---                       -----
policies                  [engineering-policy]
token_bound_cidrs         []
token_explicit_max_ttl    0s
token_max_ttl             8h
token_ttl                 15m
token_type                default
```

## Modifying User Configuration

To update a single attribute, re-run `vault write` with the changed flag:

```
vault write auth/userpass/users/hcvop-engineer token_type=batch
```

Only the specified setting (`token_type`) is updated; other attributes remain intact.

## Authenticating with Userpass

```
vault login -method=userpass username=hcvop-engineer
# Prompts for password (hidden)
```

Successful authentication returns:

- **Token**
- **Duration** (TTL)
- **Renewable** flag
- **Attached policies**

Your CLI automatically caches the token for subsequent commands.

## Password Rotation

Grant users the ability to update their own password by adding this to their policy:

```
path "auth/userpass/users/{{identity.entity.aliases.userpass.username}}/password" {
  capabilities = ["update"]
}
```

Then users can run:

```
vault write auth/userpass/users/hcvop-engineer/password password=xmeij9dk20je
```

This enables self-service rotation without exposing credentials to admins.

## Best Practices and Considerations

- Regularly **revoke** or **delete** user entries when access is no longer required.
- Implement an **external password policy** (complexity, expiry) via automation or scripts.
- For enterprise use, prefer **OIDC**, **LDAP**, or **Kerberos** auth methods to centralize identity management.

## Links and References

- [HashiCorp Vault Userpass Auth](https://www.vaultproject.io/docs/auth/userpass)
- [Vault Authentication Methods](https://www.vaultproject.io/docs/auth)
- [Vault CLI Commands](https://www.vaultproject.io/docs/commands)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/ad9d02f0-1e6e-4e0e-ba94-f2331dc9cb43)**
>
> Watch video content
