# Test Get Product - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/API-Development-Project/Test-Get-Product)

---

## Table of Contents

- Test Get Product
  - Creating the Products Table
  - Implementing Test Helpers
  - Testing the GET API
  - Routing Configuration
  - Test Suite Setup
  - Verifying the Test
  - Next Steps
  - Watch Video
    - Clear Table
    - Adding a Product
    - Helper: Sending a Request
    - Helper: Checking the Response Status Code

---

## Content

Advanced Golang

API Development Project

# Test Get Product

In this lesson, we build and test a RESTful API endpoint for retrieving a product from the database. The walkthrough covers creating the products table, implementing helper functions to clear the table and add products, and writing a test to ensure the GET API functions as expected.

---

## Creating the Products Table

The `createTable` method defines a SQL query to create the table if it does not already exist. The table includes an auto-incrementing `id`, a `name`, a `quantity`, and a `price`, with the `id` set as the primary key.

```
func createTable() {
	createTableQuery := `CREATE TABLE IF NOT EXISTS products (
		id int NOT NULL AUTO_INCREMENT,
		name varchar(255) NOT NULL,
		quantity int,
		price float(10,7),
		PRIMARY KEY (id)
	);`
	_, err := a.DB.Exec(createTableQuery)
	if err != nil {
		log.Fatal(err)
	}
}
```

This function is invoked from our test's main method to guarantee that the table exists before any tests are executed.

---

## Implementing Test Helpers

To prepare our test environment, we include helper functions for clearing data from the table and inserting products.

### Clear Table

Before testing the GET API, we clear the content of the products table. As the `id` field is auto-incremented, we reset the counter to ensure that a new product receives an ID of 1.

```
func clearTable() {
	// Delete all records from the products table.
	_, err := a.DB.Exec("DELETE FROM products")
	if err != nil {
		log.Printf("Error clearing table: %v", err)
	}
	// Reset the auto-increment counter.
	_, err = a.DB.Exec("ALTER TABLE products AUTO_INCREMENT=1")
	if err != nil {
		log.Printf("Error resetting auto_increment: %v", err)
	}
	log.Println("clearTable completed")
}
```

### Adding a Product

The `addProduct` helper method inserts a new product into the database. It accepts parameters for the product's `name`, `quantity`, and `price`.

```
func addProduct(name string, quantity int, price float64) {
	query := fmt.Sprintf("INSERT INTO products(name, quantity, price) VALUES('%v', %v, %v)", name, quantity, price)
	_, err := a.DB.Exec(query)
	if err != nil {
		log.Printf("Error adding product: %v", err)
	}
}
```

---

## Testing the GET API

The following test function, `TestGetProduct`, demonstrates the end-to-end process of verifying the GET API:

1.  Clear the products table.
2.  Add a new product to the database.
3.  Create an HTTP GET request to retrieve the product with ID 1.
4.  Use the helper function `sendRequest` to dispatch the request to our router.
5.  Confirm that the API returns a status code of 200 (HTTP OK).

```
func TestGetProduct(t *testing.T) {
	clearTable()
	// Add a new product. With the auto-increment reset, the new product’s ID will be 1.
	addProduct("keyboard", 100, 500)

	// Create a new GET request for the product with ID 1.
	request, err := http.NewRequest("GET", "/product/1", nil)
	if err != nil {
		t.Fatalf("Couldn't create request: %v", err)
	}

	// Send the request and get the response.
	response := sendRequest(request)

	// Verify the HTTP status code.
	checkStatusCode(t, http.StatusOK, response.Code)
}
```

---

### Helper: Sending a Request

The `sendRequest` function leverages the HTTP test package to record the response, invoking the router's `ServeHTTP` method with the test request.

```
func sendRequest(request *http.Request) *httptest.ResponseRecorder {
	recorder := httptest.NewRecorder()
	a.Router.ServeHTTP(recorder, request)
	return recorder
}
```

---

### Helper: Checking the Response Status Code

The `checkStatusCode` function validates that the actual HTTP status code matches the expected one. If they differ, an error is logged through the testing framework.

```
func checkStatusCode(t *testing.T, expectedStatusCode int, actualStatusCode int) {
	if expectedStatusCode != actualStatusCode {
		t.Errorf("Expected status: %v, Received: %v", expectedStatusCode, actualStatusCode)
	}
}
```

---

## Routing Configuration

Our router is configured to associate URL endpoints with their corresponding handler functions. This mapping ensures that the correct handler processes each request.

```
func (app *App) handleRoutes() {
	app.Router.HandleFunc("/products", app.getProducts).Methods("GET")
	app.Router.HandleFunc("/product/{id}", app.getProduct).Methods("GET")
	app.Router.HandleFunc("/product", app.createProduct).Methods("POST")
	app.Router.HandleFunc("/product/{id}", app.updateProduct).Methods("PUT")
	app.Router.HandleFunc("/product/{id}", app.deleteProduct).Methods("DELETE")
}
```

The Gorilla Mux package's `ServeHTTP` method dispatches incoming requests to the appropriate handlers. Route variables can be accessed using `mux.Vars(request)` when needed.

---

## Test Suite Setup

Before running the tests, we initialise the application and create the products table in the test's main function. Ensure that the specified database ("test") exists. If the database is missing, use the following instructions:

> [!important]
> **Database Not Found Warning**
>
> If you encounter an error such as `Error 1049: Unknown database 'test'`, log into MySQL and create the database manually.

Execute in the terminal:

```
mysql -u root -p
```

And within the MySQL prompt:

```
CREATE DATABASE test;
```

Below is the test main function demonstrating the initialisation:

```
var a App


func TestMain(m *testing.M) {
	err := a.Initialise(DbUser, DbPassword, "test")
	if err != nil {
		log.Fatal("Error occurred while initialising the database: ", err)
	}
	createTable()
	m.Run()
}
```

Run the test suite with:

```
go test
```

---

## Verifying the Test

After running `go test`, verify that the test passes with an HTTP status code of 200. Checking the database table should reveal that the auto-increment counter resets correctly, assigning an ID of 1 to a newly inserted product after clearing the table.

> [!important]
> **Successful Test Execution**
>
> A successful test run confirms that the GET API functions as intended and that the database setup and routing configurations are correct.

---

## Next Steps

With the GET API successfully working and tested, proceed to implement and test the POST API and other endpoints using a similar approach.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/483ddd82-96d2-43d5-a9a8-e27e8cdb064d/lesson/15fda0fa-73ef-4de6-b927-3e3b7d3e8f6b)**
>
> Watch video content
