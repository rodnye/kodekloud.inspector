# Database Secrets Engine - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/Database-Secrets-Engine)

---

## Table of Contents

- Database Secrets Engine
  - Supported Database Plugins
  - Configuration Workflow
  - Defining Roles
  - Password Policies
  - Generating Dynamic Credentials
  - Vault Policy for Credential Generation
  - Links and References
  - Watch Video
    - 1. Enable the Engine and Configure a Connection
    - 2. Rotate Root Credentials
    - Example: Dynamic Role
    - Static Roles

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# Database Secrets Engine

Vault’s Database Secrets Engine generates dynamic, time-bound credentials for a variety of database backends. Each credential is leased, and Vault automatically revokes the user when the lease expires—eliminating stale accounts and reducing risk.

![The image is a slide titled "Intro to Database Secrets Engine," explaining how the engine generates dynamic credentials for databases, ties them to a lease, and revokes them upon expiration. It includes a certification badge and a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752878406/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Database-Secrets-Engine/intro-database-secrets-engine-slide.jpg)

## Supported Database Plugins

Vault ships with numerous database plugins out of the box. Below is a selection of popular platforms:

| Database Platform | Use Case                             |
| ----------------- | ------------------------------------ |
| Cassandra         | Distributed NoSQL storage            |
| Couchbase         | In-memory document store             |
| Elasticsearch     | Full-text search & analytics         |
| Microsoft SQL     | Enterprise RDBMS                     |
| Oracle            | High-performance transactional RDBMS |
| MySQL             | Widely-used open-source database     |
| PostgreSQL        | Advanced open-source relational DB   |
| MongoDB           | Flexible document database           |
| Snowflake         | Cloud-native data warehouse          |
| Redshift          | Petabyte-scale analytics             |

> [!important]
> **Note**
>
> If your database isn’t listed, implement a [custom database plugin](https://www.vaultproject.io/docs/secrets/plugins).

![The image lists various database plugins for a "Database Secrets Engine," including Cassandra, MongoDB, Oracle, and others. It also features a Vault certification badge and a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752878408/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Database-Secrets-Engine/database-secrets-engine-plugins-list.jpg)

## Configuration Workflow

Setting up the Database Secrets Engine consists of two main steps:

1.  Configure Vault’s connection to your database (using a management account).
2.  Define Vault roles that map to SQL statements granting the appropriate permissions.

![The image outlines two steps for configuring a database secrets engine: configuring Vault with database access and configuring roles based on required permissions. It includes a Vault certification badge and a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752878409/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Database-Secrets-Engine/database-secrets-engine-configuration-steps.jpg)

### 1\. Enable the Engine and Configure a Connection

Enable the secrets engine:

```
vault secrets enable database
```

Next, register a connection to your database. The following example creates a MySQL backend named `prod-database`:

```
vault write database/config/prod-database \
    plugin_name=mysql-database-plugin \
    connection_url="{{username}}:{{password}}@tcp(prod.hcvop.com:3306)/" \
    allowed_roles="app-integration,app-hcvop" \
    username="vault-admin" \
    password="vneJ4908fkd3084Bmrk39fmslsl#e&349"
```

- `plugin_name`: selects the plugin (e.g., `mysql-database-plugin`, `mysql-rds-plugin`).
- `connection_url`: uses `{{username}}` and `{{password}}` placeholders.
- `allowed_roles`: limits which Vault roles can issue credentials.
- `username`/`password`: initial credentials Vault uses to manage users (these values are masked on read).

![The image illustrates a database secrets engine configuration, showing Vault interacting with multiple databases (prod-sql-01, mysql-dev-03, oracle-db-22) and highlighting the need for credentials.](https://kodekloud.com/kk-media/image/upload/v1752878410/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Database-Secrets-Engine/database-secrets-engine-vault-configuration.jpg)

### 2\. Rotate Root Credentials

Regularly rotating root credentials reduces human exposure. Vault’s `rotate-root` endpoint generates new admin credentials and updates the database behind the scenes:

![The image is a slide about rotating root credentials, explaining the benefits of using the rotate-root endpoint for database configurations. It highlights compliance with internal policies and ensures only Vault and the database server know the credentials.](https://kodekloud.com/kk-media/image/upload/v1752878411/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Database-Secrets-Engine/rotate-root-credentials-database-configs.jpg)

```
vault write -f database/rotate-root/prod-database
# Success! Data written to: database/rotate-root/prod-database
```

## Defining Roles

Roles define the SQL statements Vault runs to create and grant permissions to a dynamic user. Each role is tied to a configured database connection.

![The image illustrates a "Database Secrets Engine - Roles" concept, showing a central icon connected to three databases labeled "prod-sql-01," "oracle-db-22," and "mysql-dev-03," with a note to configure roles based on required permissions. A cartoon character is also present in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752878412/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Database-Secrets-Engine/database-secrets-engine-roles-diagram.jpg)

### Example: Dynamic Role

This example creates an `app-hcvop` role that grants read-only access:

```
vault write database/roles/app-hcvop \
    db_name="prod-database" \
    creation_statements="CREATE USER '{{name}}'@'%' IDENTIFIED BY '{{password}}';
                         GRANT SELECT ON *.* TO '{{name}}'@'%';" \
    default_ttl="1h" \
    max_ttl="24h"
```

- `db_name`: references the database config (`prod-database`).
- `creation_statements`: templated SQL for creating and granting privileges.
- `default_ttl` / `max_ttl`: control lease duration and renewability.

![The image illustrates a diagram of a Database Secrets Engine, showing roles and their permissions required for accessing different databases. It includes a list of roles and arrows indicating access paths to various database servers.](https://kodekloud.com/kk-media/image/upload/v1752878413/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Database-Secrets-Engine/database-secrets-engine-roles-permissions-diagram.jpg)

### Static Roles

For applications that require a fixed username (e.g., `ecommerce_user`), use a **static role**. Vault will only rotate the password, preserving the username—ideal for legacy or COTS software.

## Password Policies

Vault auto-generates strong passwords by default (20 characters, mixed case, numbers, dash). You can attach a custom Vault policy to match your database’s requirements.

![The image outlines password policies for databases, specifying a default policy of 20 characters with at least one uppercase, one lowercase, one number, and one dash. It also notes that credentials from different plugins may vary based on the platform.](https://kodekloud.com/kk-media/image/upload/v1752878414/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Database-Secrets-Engine/password-policies-database-credentials-outline.jpg)

> [!important]
> **Warning**
>
> Ensure your password policy adheres to backend constraints such as maximum length and allowed characters.

## Generating Dynamic Credentials

Applications request credentials by reading from the role’s path. Vault creates the user, returns the credentials, and sets the lease TTL:

![The image illustrates the process of generating dynamic credentials using a database secrets engine, involving a Vault, a web application, and a database table. It shows the flow of requests and credentials between these components, with a focus on security and credential expiration.](https://kodekloud.com/kk-media/image/upload/v1752878416/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Database-Secrets-Engine/dynamic-credentials-database-secrets-engine.jpg)

```
vault read database/creds/app-hcvop

Key              Value
---              -----
lease_id         database/creds/app-hcvop/abc123
lease_duration   1h
lease_renewable  true
username         V_VAULTUSE_APP_HCVOP_XYZ123
password         yRUSyd-vPYDg5NkU9kDg
```

Once the lease expires, Vault automatically revokes the database user.

## Vault Policy for Credential Generation

Grant your application’s Vault token permission to read from `database/creds/<role>`:

```
# Allow generating credentials for app-hcvop
path "database/creds/app-hcvop" {
  capabilities = ["read"]
}
```

Adjust policies per role to enforce least privilege.

---

With Vault’s Database Secrets Engine, you can automate the lifecycle of database credentials—improving security, simplifying audits, and eliminating long-lived static accounts.

## Links and References

- [Vault Database Secrets Engine](https://www.vaultproject.io/docs/secrets/databases)
- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs/)
- [Custom Database Plugin](https://www.vaultproject.io/docs/secrets/plugins)
- [Vault Secrets Engines Overview](https://www.vaultproject.io/docs/secrets)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/0f2caef8-381e-4725-85dc-7512758c66f6)**
>
> Watch video content
