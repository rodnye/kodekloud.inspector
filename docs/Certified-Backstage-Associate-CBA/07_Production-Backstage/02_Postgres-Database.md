# Postgres Database - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Production-Backstage/Postgres-Database)

---

## Table of Contents

- Postgres Database
  - 1. Provision a PostgreSQL Instance
  - 2. Configure app-config.yaml
  - 3. Set Environment Variables
  - 4. Launch Backstage
  - Links and References
  - Watch Video

---

## Content

Certified Backstage Associate (CBA)

Production Backstage

# Postgres Database

By default, Backstage uses an in-memory database that resets on every restart—ideal for demos and local testing but unsuitable for production workloads. Switching to PostgreSQL provides persistent storage for all your catalog entities, ensuring data remains intact across restarts and upgrades.

![The image compares data management in development and production environments, showing an in-memory database for development (temporary, lost on restart) and a Postgres database for production (persistent storage).](https://kodekloud.com/kk-media/image/upload/v1752870178/notes-assets/images/Certified-Backstage-Associate-CBA-Postgres-Database/data-management-dev-prod-comparison.jpg)

> [!important]
> **Warning**
>
> If you continue using the default in-memory database in production, all of your tracked applications and metadata will be lost whenever the Backstage instance restarts.

## 1\. Provision a PostgreSQL Instance

You can provision PostgreSQL in several environments:

| Environment                   | Description                     | Example Command                                                                          |
| ----------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------- |
| Local (Docker)                | Run a container on your machine | `docker run -d --name backstage-pg -e POSTGRES_PASSWORD=secret -p 5432:5432 postgres:13` |
| AWS RDS                       | Managed PostgreSQL in AWS       | Create via AWS Console or `aws rds create-db-instance ...`                               |
| GCP Cloud SQL                 | Google-managed SQL service      | Provision with Cloud Console or `gcloud sql instances create ...`                        |
| Azure Database for PostgreSQL | Azure-managed service           | Provision via Azure Portal or `az postgres flexible-server create ...`                   |

After deployment, note the following connection details:

- Host
- Port (default: 5432)
- Database name
- Username
- Password

## 2\. Configure `app-config.yaml`

Update your Backstage configuration to use the PostgreSQL client. In `app-config.yaml`, replace the in-memory settings under `backend.database` with your PostgreSQL credentials:

```
backend:
  database:
    client: pg
    connection:
      host: ${POSTGRES_HOST}
      port: ${POSTGRES_PORT}
      user: ${POSTGRES_USER}
      password: ${POSTGRES_PASSWORD}
      database: ${POSTGRES_DB}
```

Field reference:

- `host`: Hostname or IP address of the PostgreSQL server
- `port`: TCP port (default `5432`)
- `user`: Database user with read/write permissions
- `password`: Password for the specified user
- `database`: Name of the target PostgreSQL database

> [!important]
> **Note**
>
> Using environment variables keeps sensitive data out of your config file and allows you to manage credentials securely with tools like [Vault](https://www.vaultproject.io/).

## 3\. Set Environment Variables

Before starting Backstage, export the connection parameters:

```
export POSTGRES_HOST=your-postgres-host
export POSTGRES_PORT=5432
export POSTGRES_USER=backstage_user
export POSTGRES_PASSWORD=secretpassword
export POSTGRES_DB=backstage
```

Ensure these variables are loaded in your shell or container environment.

## 4\. Launch Backstage

With configuration and environment variables in place, start the Backstage backend:

```
yarn workspace backend start
```

Backstage will now connect to PostgreSQL, persisting all your catalog metadata and application data.

## Links and References

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Hub: PostgreSQL Image](https://hub.docker.com/_/postgres)
- [AWS RDS for PostgreSQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.PostgreSQL.html)
- [Google Cloud SQL for PostgreSQL](https://cloud.google.com/sql/docs/postgres)
- [Azure Database for PostgreSQL Documentation](https://learn.microsoft.com/azure/postgresql/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/d82fc857-4b5c-42a7-ab46-3772f749a741/lesson/cdb1de6b-4cdd-4d3d-b3cb-6786ac4117a6)**
>
> Watch video content
