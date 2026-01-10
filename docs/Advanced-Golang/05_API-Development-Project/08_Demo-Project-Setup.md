# Demo Project Setup - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/API-Development-Project/Demo-Project-Setup)

---

## Table of Contents

- Demo Project Setup
  - Step 1: Initial Golang File Overview
  - Step 2: Database Setup in MySQL
  - Step 3: Project Directory and Module Initialization
  - Step 4: Application Structure and Database Initialization
  - Step 5: Main Function and Route Handling
  - Summary
  - Watch Video

---

## Content

Advanced Golang

API Development Project

# Demo Project Setup

In this lesson, we'll create a simple project that connects to a MySQL database using [Golang](https://learn.kodekloud.com/user/courses/golang). You will learn how to create a database, set up a table, insert sample data, and build a [Golang](https://learn.kodekloud.com/user/courses/golang) application that connects to the database and registers HTTP routes.

─────────────────────────────

## Step 1: Initial Golang File Overview

Begin by creating a basic Golang file. The snippet below includes the necessary imports and a placeholder function for error checking:

```
package main

import (
    "database/sql"
    "fmt"
    _ "github.com/go-sql-driver/mysql"
    "log"
)

func checkError(e error) {
    // Implement error handling as needed
}
```

```
Desktop/kodekloud/learn via 🐹 v1.19.3
```

─────────────────────────────

## Step 2: Database Setup in MySQL

First, create a database named **Inventory**. Follow these steps:

1.  Log in to MySQL:

    ```
    mysql -u root -p
    ```

2.  In the MySQL shell, create the database:

    ```
    create database inventory;
    -- Query OK, 1 row affected (0.01 sec)
    ```

3.  Switch to the new database and create a table named **Products** with the following columns:
    - **id**: An integer, not null and auto-incremented.
    - **name**: A non-null varchar field.
    - **quantity**: An integer.
    - **price**: A float with precision.

    Execute the following SQL commands:

    ```
    mysql> use inventory;
    Database changed

    mysql> create table products(
        ->   id int NOT NULL AUTO_INCREMENT,
        ->   name varchar(255) NOT NULL,
        ->   quantity int,
        ->   price float(10,7),
        ->   PRIMARY KEY(id)
        -> );
    Query OK, 0 rows affected, 1 warning (0.01 sec)

    mysql> insert into products values(1, "chair", 100, 200.00);
    Query OK, 1 row affected (0.00 sec)

    mysql> insert into products values(2, "desk", 800, 600.00);
    Query OK, 1 row affected (0.00 sec)

    mysql> select * from products;
    +----+-------+----------+---------------+
    | id | name  | quantity | price         |
    +----+-------+----------+---------------+
    |  1 | chair |      100 | 200.0000000   |
    |  2 | desk  |      800 | 600.0000000   |
    +----+-------+----------+---------------+
    2 rows in set (0.00 sec)
    ```

─────────────────────────────

## Step 3: Project Directory and Module Initialization

Set up your workspace by creating a new project directory called **my-inventory**. Then, initialize a new Go module and create the main application file.

```
cd ..
~/Desktop/kodekloud
mkdir my-inventory
cd my-inventory
```

Initialize the module and create the app file:

```
go mod init example.com/my-inventory
# go: creating new go.mod: module example.com/my-inventory
touch app.go
```

─────────────────────────────

## Step 4: Application Structure and Database Initialization

Open the **app.go** file in your preferred IDE. This file will hold application variables such as the HTTP router, database instance, and methods for setting up routes.

1.  **Define the Package and App Struct**

    Start by declaring the package and defining an `App` struct that stores pointers to the HTTP router and the SQL database:

    ```
    package main

    import (
        "database/sql"
        "fmt"
        "log"
        "net/http"

        "github.com/gorilla/mux"
        _ "github.com/go-sql-driver/mysql"
    )

    type App struct {
        Router *mux.Router
        DB     *sql.DB
    }
    ```

2.  **Create a Constants File for Database Configuration**

    For better organization, create a file named **constants.go** that will store your database configuration details:

    ```
    package main

    const DbName = "inventory"
    const DbUser = "root"
    const DbPassword = "Priyanka#123"
    ```

3.  **Implement the Initialize Method**

    This method constructs the connection string, opens a MySQL connection, and initializes the HTTP router:

    ```
    func (app *App) Initialize() error {
        connectionString := fmt.Sprintf("%v:%v@tcp(127.0.0.1:3306)/%v", DbUser, DbPassword, DbName)

        var err error
        app.DB, err = sql.Open("mysql", connectionString)
        if err != nil {
            return err
        }

        app.Router = mux.NewRouter().StrictSlash(true)
        return nil
    }
    ```

4.  **Create the Run Method**

    Define the `Run` method to start the HTTP server. This method listens on a specified address and uses `log.Fatal` to report any server startup errors:

    ```
    func (app *App) Run(address string) {
        log.Fatal(http.ListenAndServe(address, app.Router))
    }
    ```

─────────────────────────────

## Step 5: Main Function and Route Handling

Create a **main.go** file, which will serve as the application's entry point.

1.  **Set Up the Main Function**

    Initialize the `App`, set up your HTTP routes, and run the server on a specified address (e.g., "localhost:10000"):

    ```
    package main

    func main() {
        app := App{}
        if err := app.Initialize(); err != nil {
            log.Fatal(err)
        }

        // Register HTTP routes.
        app.handleRoutes()

        // Start the server on localhost at port 10000.
        app.Run("localhost:10000")
    }
    ```

2.  **Register HTTP Routes**

    Define the route registration method on the `App` struct. Here, a simple GET route for `/products` is registered, which is handled by the `getProducts` function:

    ```
    func (app *App) handleRoutes() {
        app.Router.HandleFunc("/products", getProducts).Methods("GET")
    }
    ```

    > [!important]
    > **Note**
    >
    > Remember to implement the `getProducts` handler to process HTTP GET requests for the `/products` route based on your application needs.

─────────────────────────────

## Summary

In this lesson, we covered the following:

- Created a MySQL database and a **Products** table with sample data.
- Set up a new [Golang](https://learn.kodekloud.com/user/courses/golang) module and organized the project into multiple files.
- Built an `App` struct to encapsulate the database connection and HTTP router.
- Implemented the `Initialize` and `Run` methods to manage the MySQL connection and start the HTTP server.
- Registered a sample route for fetching products.

This structured approach lays the foundation for further developing your application with expanded routing and enhanced database operations.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/483ddd82-96d2-43d5-a9a8-e27e8cdb064d/lesson/8e429055-beee-4d76-a736-4aaebdf643c9)**
>
> Watch video content
