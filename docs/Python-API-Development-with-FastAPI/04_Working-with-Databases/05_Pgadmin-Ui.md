# Pgadmin Ui - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Working-with-Databases/Pgadmin-Ui)

---

## Table of Contents

- Pgadmin Ui
  - Creating a New Server from Scratch
  - Working with Databases and Tables
  - Creating a "Products" Table
  - Inserting and Editing Data
  - Modifying the Table Schema
  - Watch Video
    - Adding a Boolean Column ("is_sale")
    - Adding an Inventory Column
    - Adding a Timestamp Column ("created_at")

---

## Content

Python API Development with FastAPI

Working with Databases

# Pgadmin Ui

In this lesson, we explore PgAdmin, the graphical user interface designed to simplify managing your PostgreSQL instance. You will learn how to define tables, create and modify database entries, and delete records when necessary. To begin, search for PgAdmin in your applications and launch it. Upon first use, PgAdmin prompts you to set a master password. This password is specifically for securing the PgAdmin interface and is separate from the PostgreSQL installation password. The master password enables PgAdmin to securely store connection passwords for your PostgreSQL servers.

When PgAdmin opens, it automatically configures a default server connection for your local PostgreSQL instance. Under the "Service" section, you will see a pre-configured server labeled "PostgreSQL 13." This server represents the PostgreSQL instance running on your machine. Simply enter the PostgreSQL user password—the one set during PostgreSQL installation—and optionally save it for future sessions.

![The image shows the pgAdmin interface with a pop-up window prompting for a password to connect to a PostgreSQL server. The interface includes options for managing and configuring PostgreSQL databases.](https://kodekloud.com/kk-media/image/upload/v1752883499/notes-assets/images/Python-API-Development-with-FastAPI-Pgadmin-Ui/pgadmin-password-prompt-postgresql.jpg)

Upon providing the password, PgAdmin connects to your local instance and displays various statistics, such as active sessions, transactions per second, and other server activity details.

![The image shows a pgAdmin dashboard displaying server sessions, transactions, tuples, and server activity for a PostgreSQL database. It includes graphs and a table with details like PID, database, user, and application state.](https://kodekloud.com/kk-media/image/upload/v1752883500/notes-assets/images/Python-API-Development-with-FastAPI-Pgadmin-Ui/pgadmin-postgresql-dashboard-server-sessions.jpg)

---

## Creating a New Server from Scratch

To create a new server manually, follow these steps:

1.  Right-click on the existing server and choose "Remove Server" if you want to start fresh.
2.  Click "Create Server" and provide a descriptive name (e.g., "My Local PostgreSQL Instance").
3.  In the connection details section:
    - Enter the host as `localhost` (for remote instances, use the corresponding IP address or domain name).
    - Provide the PostgreSQL password that you set during installation.
    - Keep the default port as `5432` unless your configuration differs.
    - Specify the database name, which is "Postgres" by default.
    - The username is also "Postgres" by default. Ensure you do not confuse the database name, DBMS, and username.
4.  Optionally, select "Save Password" to avoid re-entering it every time.

Once saved, the new server will appear in PgAdmin. While PgAdmin offers many menus and options, focus on the features essential for interacting with your PostgreSQL databases.

![The image shows the pgAdmin interface, a management tool for PostgreSQL, with a "Create - Server" dialog box open for configuring a new server connection.](https://kodekloud.com/kk-media/image/upload/v1752883501/notes-assets/images/Python-API-Development-with-FastAPI-Pgadmin-Ui/pgadmin-create-server-dialog.jpg)

---

## Working with Databases and Tables

Within PgAdmin, your PostgreSQL instance includes a "Databases" section managed under the server. The default "Postgres" database is visible; however, you can create your own database as follows:

1.  Right-click on "Databases" and select "Create" > "Database."
2.  Enter a name for the new database (for example, "fastapi").
3.  Review the "SQL" tab at the end to see the generated SQL:

    sql CREATE DATABASE fastapi WITH OWNER = postgres ENCODING = 'UTF8' CONNECTION LIMIT = -1;

This SQL confirmation shows that PgAdmin abstracts SQL commands behind the scenes, offering a visual approach to database management.

![The image shows a pgAdmin interface with a "Create Database" dialog open, where a database named "fastapi" is being created. The background displays server sessions, activity, and statistics.](https://kodekloud.com/kk-media/image/upload/v1752883503/notes-assets/images/Python-API-Development-with-FastAPI-Pgadmin-Ui/pgadmin-create-database-fastapi.jpg)

Once the database is created, expand it to view "Schemas" > "public" > "Tables." This is where you design your database tables.

---

## Creating a "Products" Table

For demonstration, let’s create a "products" table to represent items in an e-commerce scenario:

1.  Right-click on "Tables" under the "public" schema and select "Create" > "Table."
2.  Set the table name to "products."
3.  Define the following columns:
    - **name:**
      - Data type: Select "character varying" as it is commonly used for text.
      - Check "Not Null" to ensure every product has a name.
      - Do not mark this column as the primary key.

      ![The image shows a pgAdmin interface with a "Create - Table" dialog open, displaying options for setting the table's owner, schema, and other properties, with server activity graphs visible on the right.](https://kodekloud.com/kk-media/image/upload/v1752883504/notes-assets/images/Python-API-Development-with-FastAPI-Pgadmin-Ui/pgadmin-create-products-table.jpg)

    - **price:**
      - Data type: Use "integer" for simplicity, even though types like `numeric` or floating point are more common for prices.
      - Check "Not Null" to ensure every product has a price.
      - Note that PostgreSQL provides various integer types (smallint, integer, bigint) that differ in storage size and range.

      ![The image shows a pgAdmin interface where a table is being created with columns for "name" (character varying) and "price" (integer). The interface includes options for setting data types, constraints, and other properties.](https://kodekloud.com/kk-media/image/upload/v1752883505/notes-assets/images/Python-API-Development-with-FastAPI-Pgadmin-Ui/pgadmin-create-table-postgresql.jpg)

    - **id:**
      - Data type: Use the "serial" data type, which auto-increments the ID starting at 1 for each new product.
      - Mark this column as the primary key.

      ![The image shows a pgAdmin interface where a table is being created with columns for "name" (character varying) and "price" (integer). The interface includes options for setting data types, constraints, and other properties.](https://kodekloud.com/kk-media/image/upload/v1752883506/notes-assets/images/Python-API-Development-with-FastAPI-Pgadmin-Ui/pgadmin-table-creation-name-price.jpg)

4.  After configuring the columns, click Save. The "products" table will now appear in the "Tables" section.

![The image shows a pgAdmin interface with a "Create - Table" window open, displaying columns for a database table with fields for name, price, and id. The background includes a dashboard with server activity and database statistics.](https://kodekloud.com/kk-media/image/upload/v1752883508/notes-assets/images/Python-API-Development-with-FastAPI-Pgadmin-Ui/pgadmin-create-table-interface.jpg)

---

## Inserting and Editing Data

To insert data into the "products" table:

1.  Right-click on the table and choose "View/Edit Data" > "All Rows." PgAdmin executes a query similar to:

    sql SELECT \* FROM public.products ORDER BY "id" ASC;

    Initially, this will return no rows if the table is empty.

2.  Insert a new product entry by providing values for the fields:
    - For example, enter "TV" for the name and `200` for the price.
    - The "id" field is left blank as it is auto-generated.
    - Click the "Save Data Changes" button to commit the entry.

3.  You can insert additional entries such as:
    - "DVD player" with a price of `80`.
    - "Remote" with a price of `10`.

    > [!important]
    > **Note**
    >
    > Unsaved changes will appear in bold in the grid, and once saved, they revert to normal.

4.  If you attempt to insert a product while omitting a required non-null field (e.g., missing a price or name), PostgreSQL will return an error message indicating that null values are not permitted.

Once changes are committed, you can view the ordered entries by running:

sql SELECT \* FROM public.products ORDER BY "id" ASC;

---

## Modifying the Table Schema

### Adding a Boolean Column ("is_sale")

To modify the schema and add a new column that indicates whether an item is on sale:

1.  Right-click on the "products" table and select "Properties."
2.  Navigate to the "Columns" tab and click the plus icon to add a new column.
3.  Name the column "is_sale."
4.  Set the data type to "Boolean."
5.  Leave the "Not Null" option unchecked and set a default value of `false` so that existing rows automatically receive this value.
6.  Save your changes and refresh the data view to see the new column with the default value.

### Adding an Inventory Column

Next, add a column to keep track of the inventory for each product:

1.  In the "Properties" of the "products" table, add a new column named "inventory."
2.  Set the data type to "integer."
3.  Check "Not Null" to ensure every product has an inventory count.
4.  To prevent errors for existing rows, set the default value to `0`.
5.  Save and refresh the view to confirm that the inventory for pre-existing products is now set to zero.

![The image shows a pgAdmin interface with a database schema for a "products" table, displaying columns such as name, price, id, is_sale, and inventory, along with their data types and constraints.](https://kodekloud.com/kk-media/image/upload/v1752883509/notes-assets/images/Python-API-Development-with-FastAPI-Pgadmin-Ui/pgadmin-products-table-schema.jpg)

### Adding a Timestamp Column ("created_at")

Recording the creation time of each entry is a best practice. To add a timestamp column:

1.  Right-click the "products" table, select "Properties," and navigate to the "Columns" tab.
2.  Add a new column named "created_at" and set its data type to "timestamp with time zone" to capture both the date and time.
3.  Set the default value to `now()` so PostgreSQL automatically records the creation time upon inserting a new record.
4.  Save your changes. Note that for existing rows, PostgreSQL will update the "created_at" field with the current timestamp.

To verify, insert a new product (for instance, a "keyboard" with a price of `28` and an inventory of `50`), and the "created_at" field will be populated automatically:

sql SELECT \* FROM public.products ORDER BY "id" ASC;

![The image shows a pgAdmin interface with a database table named "products" open, displaying columns such as name, price, id, is_sale, inventory, and created_at, along with their data types and properties. The table structure and some data entries are visible in the interface.](https://kodekloud.com/kk-media/image/upload/v1752883510/notes-assets/images/Python-API-Development-with-FastAPI-Pgadmin-Ui/pgadmin-products-table-interface.jpg)

> [!important]
> **Quick Tip**
>
> PgAdmin's visual interface is a powerful tool that abstracts complex SQL commands into an easy-to-use GUI, helping you get started with PostgreSQL even if you are new to SQL.

---

By following these steps—from creating a server and database to designing table schemas, inserting data, and modifying existing structures—you now have a solid understanding of how PgAdmin facilitates PostgreSQL management. Enjoy experimenting with your newfound skills!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/0304b044-64ce-4fd6-a384-156867f36547/lesson/4acad5a3-ae4f-457e-9632-b2807996cf30)**
>
> Watch video content
