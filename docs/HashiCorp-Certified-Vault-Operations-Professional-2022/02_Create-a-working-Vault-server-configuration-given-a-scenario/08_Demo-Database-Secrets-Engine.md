# Demo Database Secrets Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/Demo-Database-Secrets-Engine)

---

## Table of Contents

- Demo Database Secrets Engine
  - Prerequisites
  - 1. Verify Enabled Secrets Engines
  - 2. Enable the Database Secrets Engine
  - 3. Configure the Database Connection
  - 4. Create a Dynamic Role
  - 5. Rotate the Root Credentials
  - 6. Generate Dynamic Credentials
  - 7. Revoke Leases and Cleanup
  - References
  - Watch Video
  - Practice Lab
    - Revoke a Single Lease
    - Revoke All Leases for a Role

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# Demo Database Secrets Engine

In this guide, you’ll learn how to enable and configure HashiCorp Vault’s Database Secrets Engine to manage dynamic credentials for a PostgreSQL database running in AWS RDS. We’ll cover:

1.  Verifying enabled secrets engines
2.  Enabling the Database Secrets Engine
3.  Configuring the database connection
4.  Creating a dynamic role
5.  Rotating root credentials
6.  Generating dynamic credentials
7.  Revoking leases and cleanup

---

## Prerequisites

- A running Vault server (`vault status` returns OK)
- Network connectivity from Vault to your RDS instance (security group, firewall)
- AWS RDS PostgreSQL endpoint, admin username, and password

---

## 1\. Verify Enabled Secrets Engines

Start by listing all secrets engines currently enabled:

```
vault secrets list
```

Expected output:

```
Path         Type        Accessor           Description
----         ----        --------           -----------
aws/         aws         aws_9de29d31       n/a
cubbyhole/   cubbyhole   cubbyhole_772dff42 per-token private secret storage
identity/    identity    identity_8efc4dd9  identity store
sys/         system      system_5d807a2a    system endpoints used for control, policy and debugging
```

The `database/` engine should **not** appear yet.

---

## 2\. Enable the Database Secrets Engine

Enable the database engine at its default mount path:

```
vault secrets enable database
```

You should see:

```
Success! Enabled the database secrets engine at: database/
```

Verify it’s listed:

```
vault secrets list
```

```
Path         Type        Accessor          Description
----         ----        --------          -----------
aws/         aws         aws_9de29d31      n/a
cubbyhole/   cubbyhole   cubbyhole_772dff42 per-token private secret storage
database/    database    database_123abc   n/a
identity/    identity    identity_8efc4dd9 identity store
sys/         system      system_5d807a2a   system endpoints used for control, policy and debugging
```

---

## 3\. Configure the Database Connection

Create a Vault “database configuration” named `hcvop-db` that points to your AWS RDS PostgreSQL instance:

```
vault write database/config/hcvop-db \
    plugin_name=postgresql-database-plugin \
    allowed_roles="hcvop-demo-role" \
    connection_url="postgresql://{{username}}:{{password}}@postgres01.cxojwmhweukf.us-east-1.rds.amazonaws.com:5432/" \
    username="postgres" \
    password="vaultdemo123"
```

| Parameter         | Description                                                                              | Example                                                      |
| ----------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| plugin\\\_name    | The database plugin to use                                                               | postgresql-database-plugin                                   |
| allowed\\\_roles  | Roles permitted to generate credentials via this connection                              | hcvop-demo-role                                              |
| connection\\\_url | Template URL with placeholders for the admin credentials                                 | `postgresql://{{username}}:{{password}}@your-rds-host:5432/` |
| username/password | Admin credentials Vault will use to manage the database (rotations, user creation, etc.) | postgres / vaultdemo123                                      |

Success message:

```
Success! Data written to: database/config/hcvop-db
```

To inspect the saved configuration:

```
vault read database/config/hcvop-db
```

```
Key                       Value
---                       -----
allowed_roles             [hcvop-demo-role]
connection_url            postgresql://{{username}}:{{password}}@postgres01.cxojwmhweukf.us-east-1.rds.amazonaws.com:5432/
plugin_name               postgresql-database-plugin
password_policy           n/a
root_credentials_rotate_statements []
```

> [!important]
> **Note**
>
> Vault does **not** show the stored `username` and `password` for security reasons.

---

## 4\. Create a Dynamic Role

A Vault “role” defines how dynamic users are created and what permissions they have:

```
vault write database/roles/hcvop-demo-role \
    db_name="hcvop-db" \
    default_ttl="4h" \
    max_ttl="24h" \
    creation_statements="
      CREATE ROLE \"{{name}}\" WITH LOGIN PASSWORD '{{password}}' VALID UNTIL '{{expiration}}';
      GRANT SELECT ON ALL TABLES IN SCHEMA public TO \"{{name}}\";
    "
```

- **db_name**: Must match the configuration name (`hcvop-db`).
- **default_ttl/max_ttl**: Time-to-live for generated credentials.
- **creation_statements**: SQL executed to create a new user with permissions.

Verify the role:

```
vault read database/roles/hcvop-demo-role
```

```
Key                   Value
---                   -----
creation_statements   [CREATE ROLE "{{name}}" WITH LOGIN PASSWORD '{{password}}' VALID UNTIL '{{expiration}}'; GRANT SELECT ON ALL TABLES IN SCHEMA public TO "{{name}}";]
db_name               hcvop-db
default_ttl           4h
max_ttl               24h
```

---

## 5\. Rotate the Root Credentials

Regularly rotating your admin credentials reduces risk:

```
vault write -f database/rotate-root/hcvop-db
```

```
Success! Data written to: database/rotate-root/hcvop-db
```

> [!important]
> **Warning**
>
> After rotation, the old admin credentials become invalid immediately. Update any systems relying on these credentials.

---

## 6\. Generate Dynamic Credentials

Applications can now request short-lived credentials:

```
vault read database/creds/hcvop-demo-role
```

```
Key             Value
---             -----
lease_id        database/creds/hcvop-demo-role/sTmzKcBPw1uGOygvuPpc4i3i
lease_duration  4h
lease_renewable true
username        v-root-hcvop-de-Mop0jmV6qCkFhmuT6ftu-1652122668
password        wzpc9Br-CTAuvZw-aS50
```

These credentials automatically expire after the TTL unless renewed.

---

## 7\. Revoke Leases and Cleanup

### Revoke a Single Lease

```
vault lease revoke database/creds/hcvop-demo-role/sTmzKcBPw1uGOygvuPpc4i3i
```

### Revoke All Leases for a Role

```
vault lease revoke -prefix database/creds/hcvop-demo-role
```

Vault will run the appropriate SQL to drop the dynamic users in your database.

---

## References

- [Vault Database Secrets Engine](https://www.vaultproject.io/docs/secrets/databases)
- [AWS RDS for PostgreSQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html)
- [HashiCorp Vault CLI](https://www.vaultproject.io/docs/commands)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/91b40042-d98d-48e8-be99-8b4c8d78e92b)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/974a425b-c165-4ef1-b492-9c8935d70a39)**
>
> Practice lab
