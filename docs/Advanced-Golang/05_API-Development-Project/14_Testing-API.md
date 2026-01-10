# Testing API - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/API-Development-Project/Testing-API)

---

## Table of Contents

- Testing API
  - Update Application Initialization
  - Update Route Handlers
  - Testing Setup
  - Summary
  - Watch Video
    - Modify Create Product Handler
    - Additional Route Handler Implementations

---

## Content

Advanced Golang

API Development Project

# Testing API

In this article, we will demonstrate how to write test cases for our API endpoints while making necessary changes to our application code. These improvements improve flexibility, testability, and ensure that our endpoints return the correct HTTP status codes.

---

## Update Application Initialization

Before testing, we need to modify the application initialization method to dynamically accept database credentials (DB user, DB password, and DB name) instead of relying on hardcoded constants. This change allows us to specify different credentials during testing.

Below is the original initialization method:

```
func (app *App) Initialise() error {
	connectionString := fmt.Sprintf(":%v@tcp(127.0.0.1:3306)/%v", DbUser, DbPassword, DbName)
	var err error
	app.DB, err = sql.Open("mysql", connectionString)
	if err != nil {
		return err
	}


	app.Router = mux.NewRouter().StrictSlash(true)
	app.handleRoutes()
	return nil
}


func (app *App) Run(address string) {
	log.Fatal(http.ListenAndServe(address, app.Router))
}
```

To enable passing credentials via parameters, modify the `Initialise` method as follows:

```
type App struct {
	Router *mux.Router
	DB     *sql.DB
}


func (app *App) Initialise(DbUser string, DbPassword string, DbName string) error {
	connectionString := fmt.Sprintf(":%s@tcp(127.0.0.1:3306)/%s", DbUser, DbPassword, DbName)
	var err error
	app.DB, err = sql.Open("mysql", connectionString)
	if err != nil {
		return err
	}


	app.Router = mux.NewRouter().StrictSlash(true)
	app.handleRoutes()
	return nil
}


func (app *App) Run(address string) {
	log.Fatal(http.ListenAndServe(address, app.Router))
}
```

In your `main.go` file, initialize the application by passing the database constants:

```
package main


func main() {
	app := App{}
	app.Initialise(DbUser, DbPassword, DbName)
	app.Run("localhost:10000")
}
```

> [!important]
> **Note**
>
> Using dynamic credentials improves flexibility by letting you create separate configurations for production and testing environments.

---

## Update Route Handlers

### Modify Create Product Handler

The `createProduct` handler originally returns an HTTP status code of 200 (OK) when a product is successfully created. However, according to RESTful best practices, a 201 (Created) response is more appropriate for resource creation. Below is the existing implementation:

```
func (app *App) createProduct(w http.ResponseWriter, r *http.Request) {
	var p product
	err := json.NewDecoder(r.Body).Decode(&p)
	if err != nil {
		sendError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	err = p.createProduct(app.DB)
	if err != nil {
		sendError(w, http.StatusInternalServerError, err.Error())
		return
	}
	sendResponse(w, http.StatusOK, p)
}


func (app *App) updateProduct(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	_, err := strconv.Atoi(vars["id"])
	if err != nil {
		// handle error appropriately
	}
}
```

Update the `createProduct` handler to return a 201 (Created) status code:

```
func (app *App) createProduct(w http.ResponseWriter, r *http.Request) {
	var p product
	err := json.NewDecoder(r.Body).Decode(&p)
	if err != nil {
		sendError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}
	err = p.createProduct(app.DB)
	if err != nil {
		sendError(w, http.StatusInternalServerError, err.Error())
		return
	}
	sendResponse(w, http.StatusCreated, p)
}
```

### Additional Route Handler Implementations

Below are implementations for other route handlers used to retrieve products:

```
func (app *App) getProducts(w http.ResponseWriter, r *http.Request) {
	products, err := getProducts(app.DB)
	if err != nil {
		sendError(w, http.StatusInternalServerError, err.Error())
		return
	}
	sendResponse(w, http.StatusOK, products)
}


func (app *App) getProduct(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	key, err := strconv.Atoi(vars["id"])
	if err != nil {
		sendError(w, http.StatusBadRequest, "invalid product ID")
		return
	}


	p := product{ID: key}
	err = p.getProduct(app.DB)
	if err != nil {
		switch err {
		// include switch cases as needed to handle different error types
		}
	}
}
```

---

## Testing Setup

To test the API, create a separate test file (e.g., `app_test.go`). In this file, declare your application variable and use the test main function to initialize the application for testing. The test main function, introduced in Go 1.4, is executed to set up and run all tests within the package. Note that the test main function should appear only once per package.

Below is an example of initializing your app variable in the test main function:

```
package main


import (
	"log"
	"testing"
)


var a App


func TestMain(m *testing.M) {
	err := a.Initialise(DbUser, DbPassword, "test")
	if err != nil {
		log.Fatal("Error occurred while initialising the database")
	}
	// Additional setup (e.g., creating a test table) can be done here


	m.Run()
}
```

In this testing setup, notice how we use the same constants for DB user and DB password but specify a different database name ("test") to prevent interference with production data. For improved code organization, consider isolating test table creation into a dedicated function.

> [!important]
> **Testing Best Practices**
>
> Using a dedicated test database ensures that your testing operations do not affect live production data. Always isolate your testing environment from production.

---

## Summary

This article explained:

- How to modify the application initialization to dynamically accept database credentials.
- Updating the `createProduct` handler to return an HTTP 201 status code for resource creation.
- Setting up a dedicated test environment to safely run API tests.

By following this improved structure and flow, you ensure that your API is more flexible, testable, and follows best practices for HTTP response codes.

For additional details, you can refer to these useful resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/483ddd82-96d2-43d5-a9a8-e27e8cdb064d/lesson/e1c255ae-65da-4f24-a396-1735a2e27d06)**
>
> Watch video content
