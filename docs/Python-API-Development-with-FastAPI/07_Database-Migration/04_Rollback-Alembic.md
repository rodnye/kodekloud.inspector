# Rollback Alembic - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Database-Migration/Rollback-Alembic)

---

## Table of Contents

- Rollback Alembic
  - Creating the Initial Table
  - Modifying the Table: Adding a New Column
  - Verifying the Applied Migration
  - Rolling Back a Migration
  - Summary
  - Watch Video

---

## Content

Python API Development with FastAPI

Database Migration

# Rollback Alembic

In this article, we will walk through the process of creating and modifying database tables using Alembic migrations and how to roll back those changes when needed. This guide is ideal for developers looking to manage database schema changes in a seamless manner.

## Creating the Initial Table

Initially, we created our first table using an Alembic revision. The following migration script creates a "posts" table:

```
def upgrade():
    op.create_table(
        'posts',
        sa.Column('id', sa.Integer(), nullable=False, primary_key=True),
        sa.Column('title', sa.String(), nullable=False)
    )
    pass


def downgrade():
    op.drop_table('posts')
```

When you run this migration, you may see output similar to the following:

```
alembic: error: unrecognized arguments: ccfc4f0d2d18
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade -> ccfc4f0d2d18, create posts table
```

> [!important]
> **Tip**
>
> Ensure your Alembic configuration is set correctly to avoid unrecognized argument errors.

## Modifying the Table: Adding a New Column

After reviewing our application models, we decided to add a new column called "content" to the "posts" table. First, update your SQLAlchemy model as shown below:

```
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from .database import Base


class Post(Base):
    __tablename__ = "posts"


    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    published = Column(Boolean, server_default='TRUE', nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False, ondelete="CASCADE")
```

Next, generate a new Alembic revision with an informative message:

```
(venv) C:\Users\sanje\Documents\Courses\fastapi>alembic revision -m "add content column to posts table"
```

This command creates a new migration file. You then need to define the upgrade and downgrade logic to add this column. Below is an example revision file for this change:

```
# revision identifiers, used by Alembic.
revision = '01b2584928a5'
down_revision = 'ccfc4fd02d18'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('posts', sa.Column('content', sa.String(), nullable=False))
    pass


def downgrade():
    op.drop_column('posts', 'content')
    pass
```

When you run the upgrade, the log output might look like this:

```
INFO [alembic.runtime.migration] Will assume transactional DDL.
INFO [alembic.runtime.migration] Running upgrade -> ccfc4fd02d18, create posts table
Generating C:\Users\sanje\Documents\Courses\fastapi\alembic\versions\01b2584928a5_add_content_column_to_p
done
```

## Verifying the Applied Migration

To ensure the migration has been applied successfully, you can check the current revision using:

```
(venv) C:\Users\sanje\Documents\Courses\fastapi>alembic current
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
cfcc4fd02d18
```

To view the latest (head) migration, run:

```
(venv) C:\Users\sanje\Documents\Courses\fastapi>alembic heads
01b2584928a5 (head)
```

Since the latest migration is referred to as the head, upgrade to it by specifying the revision number or simply using "head":

```
(venv) C:\Users\sanje\Documents\Courses\fastapi>alembic upgrade head
```

After upgrading successfully, verify PostgreSQL table properties using a query like:

```
SELECT * FROM public.alembic_version
ORDER BY version_num ASC;
```

## Rolling Back a Migration

If you decide that the "content" column is no longer needed, you can revert the change using the downgrade function defined in the migration script. To roll back the changes, run:

```
(venv) C:\Users\sanje\Documents\Courses\fastapi>alembic downgrade cfcc4fd0218
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
```

Alternatively, you can perform a relative downgrade by moving one revision back:

```
(venv) C:\Users\sanje\Documents\Courses\fastapi>alembic downgrade -1
```

After downgrading, refresh your database client to verify that the "content" column has been removed.

> [!important]
> **Rollback Caution**
>
> Before executing a downgrade in a production environment, ensure that you have backed up your database to prevent any accidental data loss.

## Summary

Alembic offers a streamlined way to manage your database schema:

- Create new tables or modify existing ones by writing migrations.
- Apply changes via `alembic upgrade` and roll them back with `alembic downgrade`.

This process provides excellent version control for your database, ensuring that any changes can be easily reversed if necessary.

For further reading, check out these helpful resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/a6a7b30d-5ca7-4d69-a323-c508340e9931/lesson/ee4ed733-0132-42d5-94e7-9abbcb3dcf50)**
>
> Watch video content
