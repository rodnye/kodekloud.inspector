# First Revision - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Database-Migration/First-Revision)

---

## Table of Contents

- First Revision
  - Exploring Alembic Commands
  - Creating the Posts Table
  - Tracking Migrations with Alembic
  - Conclusion
  - Watch Video

---

## Content

Python API Development with FastAPI

Database Migration

# First Revision

In this article, we demonstrate how to manage PostgreSQL database changes using Alembic. Initially, our database was empty, with no defined tables:

```
SELECT * FROM public.posts
ORDER BY id ASC
```

We started building our application by creating tables directly in the PostgreSQL database as required. For instance, during the early stages, we created a "posts" table without handling user creation, password hashing, or establishing user relationships. Later, with the implementation of CRUD operations for posts and the introduction of user registration, we added a "users" table and modified the "posts" table to include a foreign key. Eventually, a "votes" table was added, complete with its own set of foreign keys.

Now, with Alembic integrated into our workflow, we will walk through a controlled, step-by-step process to manage these database migrations.

## Exploring Alembic Commands

Begin by reviewing the available Alembic commands. Running the help command:

```
alembic --help
```

displays multiple options. One of the most frequently used options is the `revision` command, which is similar to a git commit message. It allows you to attach a human-readable message to each schema change.

For example, to create a revision for the posts table, run:

```
alembic revision -m "create posts table"
```

This command generates a new file in the Alembic versions folder. The output will resemble:

```
Generating C:\Users\sanje\Documents\Courses\fastapi\alembic\versions\cfcc4fd02d18_create_posts_table.py .
```

Inside this generated file, you will see a structure similar to the following:

```
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cfcc4fd02d18'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
```

> [!important]
> **Note**
>
> The `upgrade()` function is used to apply changes, while the `downgrade()` function allows you to roll back those changes. Always add the necessary logic to these functions based on your migration requirements.

To explore more options for the `alembic revision` command, run:

```
alembic revision --help
```

Some key options include:

| Option         | Description                                     |
| -------------- | ----------------------------------------------- |
| `-m`           | Specify the migration message                   |
| `--rev-id`     | Provide a hardcoded revision identifier         |
| `--depends-on` | Define dependencies between different revisions |

## Creating the Posts Table

After creating the revision file, add the logic to create the posts table in the `upgrade()` function. We'll define two essential columns:

- An `id` column of type `Integer`, which is non-nullable and serves as the primary key.
- A `title` column of type `String`, also non-nullable.

Below is the updated migration script:

```
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cfcc4fd02d18'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'posts',
        sa.Column('id', sa.Integer(), nullable=False, primary_key=True),
        sa.Column('title', sa.String(), nullable=False)
    )


def downgrade():
    op.drop_table('posts')
```

After saving the migration file, apply the latest revision by running:

```
alembic upgrade <revision_id>
```

Replace `<revision_id>` with your revision identifier (e.g., `cfcc4fd02d18`). Alternatively, you can upgrade to the latest revision using:

```
alembic upgrade head
```

This command applies the migration, creating the posts table. Verify the changes by refreshing your PostgreSQL interface with:

```
SELECT * FROM public.posts
ORDER BY id ASC
```

You should now see that the posts table includes two columns: `id` (the primary key, non-nullable) and `title` (non-nullable).

![The image shows a Visual Studio Code interface with Python code for a database migration script using Alembic. The code editor displays a function definition, and a tooltip provides information about the `Operations` class.](https://kodekloud.com/kk-media/image/upload/v1752883379/notes-assets/images/Python-API-Development-with-FastAPI-First-Revision/vscode-python-database-migration-alembic.jpg)

Additionally, when you inspect the table in pgAdmin, the defined columns and associated constraints are clearly visible:

![The image shows a pgAdmin interface with a table named "posts" being edited. It displays columns for "id" and "title" with their data types and constraints.](https://kodekloud.com/kk-media/image/upload/v1752883380/notes-assets/images/Python-API-Development-with-FastAPI-First-Revision/pgadmin-posts-table-edit-interface.jpg)

## Tracking Migrations with Alembic

Alembic maintains a version table in your database that keeps track of all applied revisions. To inspect this version table, execute:

```
SELECT * FROM public.alembic_version
ORDER BY version_num ASC
```

> [!important]
> **Warning**
>
> Do not delete the Alembic versioning table. It is crucial for tracking schema changes and ensuring the consistency of your database migrations.

## Conclusion

This guide demonstrated how to create a simple "posts" table using Alembic, including both the upgrade and downgrade migration paths. For additional operations—such as altering columns, adding constraints, or working with computed defaults—refer to the [Alembic API documentation](https://alembic.sqlalchemy.org/en/latest/).

By managing database migrations with Alembic, you ensure a controlled and consistent way to apply schema changes, making your database evolution both predictable and reversible.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/a6a7b30d-5ca7-4d69-a323-c508340e9931/lesson/6eb4e2de-24b7-4f45-a269-1cd0eecac8fb)**
>
> Watch video content
