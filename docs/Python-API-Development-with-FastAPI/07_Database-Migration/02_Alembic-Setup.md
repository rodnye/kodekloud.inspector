# Alembic Setup - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Database-Migration/Alembic-Setup)

---

## Table of Contents

- Alembic Setup
  - Project Structure
  - Installing Alembic
  - Preparing the Database
  - Initializing Alembic
  - Configuring env.py for SQLAlchemy
  - Configuring alembic.ini
  - Overriding the Database URL in env.py
  - Final Remarks
  - Watch Video

---

## Content

Python API Development with FastAPI

Database Migration

# Alembic Setup

This article explains how to set up Alembic for migration management with SQLAlchemy, specifically within a FastAPI project. You will learn how to install, initialize, and configure Alembic to keep track of your database schema changes.

## Project Structure

Below is an example of the project structure, which shows where migration scripts will be stored:

```
yourproject/
    alembic/
        versions/
            23e153465_add_account.py
            23f5e266_add_address_field.py
```

## Installing Alembic

Begin by installing Alembic using pip. This not only installs the package but also provides access to its command-line interface:

```
pip install alembic
```

After installing, verify the installation by running:

```
alembic --help
```

You should see output similar to this:

```
Requirement already satisfied: six==1.5 in c:\users\sanje\documents\courses\fastapi\venv\lib\site-packages
Installing collected packages: alembic
Successfully installed alembic-1.6.5
WARNING: You are using pip version 21.2.1; however, version 21.2.4 is available.
You should consider upgrading via the 'c:\users\sanje\documents\courses\fastapi\venv\scripts\python.exe -m pip install --upgrade pip' command.
```

Before moving forward, note that the sample code below presents snippets of your SQLAlchemy models. For instance, you could have models for `User` and `Vote` as follows:

```
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    phone_number = Column(String)


class Vote(Base):
    __tablename__ = "votes"
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True)
```

> [!important]
> **Note**
>
> In this example, you are instructed to remove the `phone_number` field once Alembic is set up and you are ready to update your database schema.

## Preparing the Database

Before running migrations, ensure that your application is stopped to prevent automatic restarts during the migration process. If required, drop any existing tables—using `DROP CASCADE` if there are foreign key constraints—to start with a clean slate.

To check the current data in your database, you can run the following SQL query:

```
SELECT * FROM public.posts
ORDER BY id ASC
```

## Initializing Alembic

Initialize Alembic to create the necessary directory structure and configuration files. The Alembic CLI provides several subcommands, which you can review using:

```
positional arguments:
  {branches,current,downgrade,edit,heads,history,init,list_templates,merge,revision,show,stamp,upgrade}
    branches         Show current branch points.
    current          Display the current revision for a database.
    downgrade        Revert to a previous version.
    edit             Edit revision script(s) using $EDITOR.
    heads            Show current available heads in the script directory.
    history          List changed scripts in chronological order.
    init             Initialize a new scripts directory.
    list_templates    List available templates.
    merge            Merge two revisions together. Creates a new migration file.
    revision         Create a new revision file.
    show             Show the revision(s) denoted by the given symbol.
    stamp            "stamp" the revision table with the given revision; don't run any migrations.
    upgrade          Upgrade to a later version.


optional arguments:
  -h, --help           show this help message and exit
  --version            show program's version number and exit
  -C CONFIG, --config CONFIG
                        Alternate config file; defaults to value of ALEMBIC_CONFIG environment
  -n NAME, --name NAME
                        Name of section in ini file to use for Alembic config
  -x X                 Additional arguments consumed by custom env.py scripts, e.g. -x
  setting1=something   -x setting2=something
  -r, --raiseerr       Raise a full stack trace on error
```

You can also check help for initialization by running:

```
(venv) C:\Users\sanje\Documents\Courses\fastapi> alembic init --help
```

When ready, initialize Alembic by specifying a directory name. For example:

```
(venv) C:\Users\sanje\Documents\Courses\fastapi> alembic init alembic
```

The output should indicate that the directory structure and configuration files have been created successfully:

```
Creating directory C:\Users\sanje\Documents\Courses\fastapi\alembic ... done
Creating directory C:\Users\sanje\Documents\Courses\fastapi\alembic\versions ... done
Generating C:\Users\sanje\Documents\Courses\fastapi\alembic.ini ... done
Generating C:\Users\sanje\Documents\Courses\fastapi\alembic\env.py ... done
Generating C:\Users\sanje\Documents\Courses\fastapi\alembic\README ... done
Generating C:\Users\sanje\Documents\Courses\fastapi\alembic\script.py.mako ... done
Please edit configuration/connection/logging settings in 'C:\Users\sanje\Documents\Courses\fastapi\alembic.ini' before proceeding.
```

This creates the Alembic directory outside the application folder along with the `alembic.ini` configuration file. Next, you need to update both the `env.py` and `alembic.ini` files to connect Alembic with your SQLAlchemy models and database settings.

## Configuring env.py for SQLAlchemy

The `env.py` file is the main configuration file for Alembic. It must be updated to import your SQLAlchemy models and set the target metadata for autogeneration. An initial snippet might look like this:

```
from logging.config import fileConfig


from sqlalchemy import engine_from_config
from sqlalchemy import pool


from alembic import context


# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config


# Interpret the config file for Python logging.
# This line sets up loggers basically.
fileConfig(config.config_file_name)


# add your model's MetaData object here
# for 'autogenerate' support
from myapp import mymodel
target_metadata = mymodel.Base.metadata


target_metadata = None
```

To work with SQLAlchemy models, update the file to import your base object from your database module. For example:

```
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from .config import settings


SQLALCHEMY_DATABASE_URL = f'postgresql://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}'


engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

Then, modify your `env.py` file to import `Base` from your application’s database file. Replace the original metadata configuration with:

```
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
from app.database import Base
from app.config import settings


# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config
config.set_main_option(
    "sqlalchemy.url",
    f"postgresql+psycopg2://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}"
)


# Interpret the config file for Python logging.
fileConfig(config.config_file_name)


# add your model's MetaData object here for 'autogenerate' support
target_metadata = Base.metadata
```

If your models are defined or imported from a different file (e.g., `app.models`), ensure the import reflects that. For instance, to detect changes in a `Post` model:

```
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from app.database import Base


class Post(Base):
    __tablename__ = "posts"


    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    published = Column(Boolean, server_default='TRUE', nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    owner = relationship("User")


class User(Base):
    __tablename__ = "users"
    # Define additional columns for the User model here.
```

Then, update your `env.py` accordingly:

```
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
from app.models import Base
from app.config import settings


# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config
config.set_main_option(
    "sqlalchemy.url",
    f"postgresql+psycopg2://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}"
)


# Interpret the config file for Python logging.
fileConfig(config.config_file_name)


# add your model's MetaData object here for 'autogenerate' support
target_metadata = Base.metadata
```

This configuration ensures that Alembic can access your SQLAlchemy models and automatically track schema changes.

## Configuring alembic.ini

Within the `alembic.ini` file, specify your SQLAlchemy database URL. Initially, it might appear as follows:

```
[alembic]
# path to migration scripts
script_location = alembic


# template used to generate migration files
# sys.path path, will be prepended to sys.path if present.
# defaults to the current working directory.
prepend_sys_path = .


# timezone to use when rendering the date
# within the migration file as well as the filename.
# string value is passed to dateutil.tz.gettz()
# leave blank for localtime
# max length of characters to apply to the
sqlalchemy.url = driver://user:pass@localhost/dbname


[post_write_hooks]
# post_write_hooks defines scripts or Python functions that are run
# on newly generated revision scripts. See the documentation for further
# detail and examples.
```

Replace the placeholder connection string with your actual database credentials. For example, if you are using PostgreSQL:

```
sqlalchemy.url = postgresql+psycopg2://postgres:password123@localhost:5432/fastapi
```

> [!important]
> **Security Notice**
>
> While the above example hardcodes credentials for demonstration purposes, it is advisable to manage sensitive information using environment variables in production.

## Overriding the Database URL in env.py

To avoid hardcoding credentials within `alembic.ini`, you can override the SQLAlchemy URL directly in `env.py` using values from your configuration file. For example:

```
from alembic import context
from app.database import Base
from app.config import settings
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool


# this is the Alembic Config object, which provides access to the values within the .ini file in use.
config = context.config
config.set_main_option(
    "sqlalchemy.url",
    f"postgresql+psycopg2://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}"
)


# Interpret the config file for Python logging.
fileConfig(config.config_file_name)


# add your model's MetaData object here for 'autogenerate' support
target_metadata = Base.metadata
```

This method allows you to securely manage database credentials using environment variables. A typical Pydantic settings class defined in `config.py` might resemble:

```
from pydantic import BaseSettings


class Settings(BaseSettings):
    database_hostname: str
    database_port: str
    database_password: str
    database_name: str
    database_username: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int


    class Config:
        env_file = ".env"
```

You can then use these settings in your main application as follows:

```
from fastapi import FastAPI
from . import models
from .database import engine
from .routers import post, user, auth, vote
from .config import settings


print(settings.database_username)


models.Base.metadata.create_all(bind=engine)


app = FastAPI()


app.include_router(post.router)
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(vote.router)
```

## Final Remarks

After completing these configurations, Alembic will be connected to your PostgreSQL database and ready to detect changes in your SQLAlchemy models. This setup streamlines the process of generating migration scripts and applying database updates.

To create and run migrations, use the following commands:

```
alembic revision --autogenerate -m "Your migration message"
alembic upgrade head
```

Happy migrating!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/a6a7b30d-5ca7-4d69-a323-c508340e9931/lesson/3ad8ae82-a1b2-4e6c-b89a-b2bae924f121)**
>
> Watch video content
