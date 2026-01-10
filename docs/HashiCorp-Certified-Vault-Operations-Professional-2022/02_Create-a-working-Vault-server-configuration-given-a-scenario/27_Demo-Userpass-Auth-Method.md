# Demo Userpass Auth Method - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/Demo-Userpass-Auth-Method)

---

## Table of Contents

- Demo Userpass Auth Method
  - Table of Contents
  - 1. Enable the userpass Auth Method
  - 2. Inspect Auth Backends
  - 3. Manage Policies
  - 4. Create and Configure Users
  - 5. Authenticate with userpass
  - Conclusion
  - Watch Video
  - Practice Lab
    - 4.1 Create Users
    - 4.2 Read and Update User Configuration
      - Read Current Settings
      - Update Token TTL

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# Demo Userpass Auth Method

In this tutorial, you’ll learn how to enable and manage the `userpass` auth method in Vault. We’ll cover:

- Enabling and inspecting auth backends
- Configuring and listing policies
- Creating, reading, and updating users
- Authenticating with the `userpass` method

## Table of Contents

1.  [Enable the userpass Auth Method](#enable-the-userpass-auth-method)
2.  [Inspect Auth Backends](#inspect-auth-backends)
3.  [Manage Policies](#manage-policies)
4.  [Create and Configure Users](#create-and-configure-users)
5.  [Authenticate with userpass](#authenticate-with-userpass)

---

## 1\. Enable the userpass Auth Method

First, see which auth methods are currently enabled:

```
vault auth list
```

Example output:

| Path   | Type  | Accessor                  | Description             |
| ------ | ----- | ------------------------- | ----------------------- |
| token/ | token | auth\\\_token\\\_9e81d3bb | token based credentials |

Enable `userpass` at the default path:

```
vault auth enable userpass
```

Success message:

```
Success! Enabled userpass auth method at: userpass/
```

:::note Custom Path You can also enable `userpass` under a custom mount point, for example `local`:

```
vault auth enable -path=local userpass
```

:::

After enabling, verify both default and custom mounts:

```
vault auth list
```

| Path      | Type     | Accessor                    | Description             |
| --------- | -------- | --------------------------- | ----------------------- |
| local/    | userpass | auth\\\_userpass\\\_abcd123 | n/a                     |
| userpass/ | userpass | auth\\\_userpass\\\_efgh456 | n/a                     |
| token/    | token    | auth\\\_token\\\_9e81d3bb   | token based credentials |

If you only need the default mount, disable the custom one:

```
vault auth disable local
```

Now you should see:

```
vault auth list
```

| Path      | Type     | Accessor                    | Description             |
| --------- | -------- | --------------------------- | ----------------------- |
| token/    | token    | auth\\\_token\\\_9e81d3bb   | token based credentials |
| userpass/ | userpass | auth\\\_userpass\\\_efgh456 | n/a                     |

---

## 2\. Inspect Auth Backends

Vault supports multiple auth methods. To view all enabled backends:

```
vault auth list
```

| Mount Point | Auth Method | Description                |
| ----------- | ----------- | -------------------------- |
| token/      | token       | Token-based authentication |
| userpass/   | userpass    | Username & password        |

For more details, see the [Vault Authentication Methods](https://www.vaultproject.io/docs/auth) reference.

---

## 3\. Manage Policies

Before creating users, check existing policies:

```
vault policy list
```

Example output:

- default
- kv-policy
- root

We’ll use `kv-policy` in this demo to grant Key/Value access.

---

## 4\. Create and Configure Users

### 4.1 Create Users

Add a new user named `automation` with `kv-policy`:

```
vault write auth/userpass/users/automation \
    password=Password1 \
    policies=kv-policy
```

Success message:

```
Success! Data written to: auth/userpass/users/automation
```

Verify the list of `userpass` users:

```
vault list auth/userpass/users
```

| Keys       |
| ---------- |
| automation |

Add a second user `bryan`:

```
vault write auth/userpass/users/bryan \
    password=Secret123 \
    policies=kv-policy
```

Confirm both users:

```
vault list auth/userpass/users
```

| Keys       |
| ---------- |
| automation |
| bryan      |

### 4.2 Read and Update User Configuration

#### Read Current Settings

Inspect the `automation` user:

```
vault read auth/userpass/users/automation
```

| Key                              | Value           |
| -------------------------------- | --------------- |
| policies                         | \\[kv-policy\\] |
| token\\\_ttl                     | 0s              |
| token\\\_max\\\_ttl              | 0s              |
| token\\\_no\\\_default\\\_policy | false           |

By default, TTLs are `0s`, inheriting the system defaults.

#### Update Token TTL

Set a 24-hour token TTL for `automation`:

```
vault write auth/userpass/users/automation token_ttl=24h
```

Verify the update:

```
vault read auth/userpass/users/automation
```

| Key          | Value           |
| ------------ | --------------- |
| token\\\_ttl | 24h             |
| policies     | \\[kv-policy\\] |

:::note Token Time-To-Live (TTL) Defining `token_ttl` limits how long a login token remains valid. Adjust according to your security requirements. :::

---

## 5\. Authenticate with userpass

Now that your user is configured, log in with:

```
vault login -method=userpass username=automation
```

Enter the password when prompted. Example response:

```
Success! You are now authenticated.


Key                    Value
---                    -----
token                  hvs.CAE...5sNTd
token_accessor         62meW...3mjErMQwlQ
token_duration         24h
token_renewable        true
token_policies         ["default" "kv-policy"]
token_meta_username    automation
```

You now have a token scoped to `kv-policy` with a 24-hour TTL. To reuse the token directly:

```
vault login hvs.CAE...5sNTd
```

Success message:

```
Success! Token renewed successfully.
```

:::warning Security Reminder Always store your Vault tokens securely. Avoid checking plaintext tokens into version control or logs. :::

---

## Conclusion

You’ve successfully:

- Enabled and inspected the `userpass` auth method
- Listed and managed Vault policies
- Created users and customized their token TTL
- Authenticated via `userpass` for secure, password-based access

For more on Vault auth methods and best practices, visit the [HashiCorp Vault Documentation](https://www.vaultproject.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/0962b0e6-b90b-4f19-91d6-b876d7a9f8cb)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/2019f26f-c69d-43e5-bce8-5a4d70ef4040)**
>
> Practice lab
