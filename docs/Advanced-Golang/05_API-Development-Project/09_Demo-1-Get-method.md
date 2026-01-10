# Demo 1 Get method - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/API-Development-Project/Demo-1-Get-method)

---

## Table of Contents

- Demo 1 Get method
  - Response Helper Methods
  - GET /products Route Handler
  - Database Models and Querying
  - Application Initialization
  - Testing the Endpoint with Postman
  - Next Steps
  - Watch Video

---

## Content

Advanced Golang

API Development Project

# Demo 1 Get method

In this guide, we implement the GET /products endpoint, which retrieves all product records from the database table and returns them as a JSON response. The following sections detail the implementation steps along with code snippets.

---

## Response Helper Methods

Before handling any routes, we create two helper methods: one for sending a successful response and another for sending error messages in JSON format.

The first helper method, sendResponse, takes the response writer, an HTTP status code, and a payload (of any type). It marshals the payload into JSON and sends it to the client.

```
func sendResponse(w http.ResponseWriter, statusCode int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	w.Write(response)
}
```

Similarly, the sendError method accepts a response writer, a status code, and a string error message. It constructs an error message map and returns it using sendResponse.

```
func sendError(w http.ResponseWriter, statusCode int, err string) {
	errorMessage := map[string]string{"error": err}
	sendResponse(w, statusCode, errorMessage)
}
```

---

## GET /products Route Handler

The next step is to define the route handler for the GET /products endpoint. This handler is implemented as a method on the App struct. Inside the handler, products are retrieved from the database using a dedicated function. If an error is encountered, sendError is used with an HTTP 500 status. Otherwise, the products are returned with an HTTP 200 OK status.

```
func (app *App) getProducts(w http.ResponseWriter, r *http.Request) {
	products, err := getProducts(app.DB)
	if err != nil {
		sendError(w, http.StatusInternalServerError, err.Error())
		return
	}
	sendResponse(w, http.StatusOK, products)
}
```

This route is then registered within the router configuration. Notice that the method receiver (app.getProducts) is passed to the router’s HandleFunc.

```
func (app *App) handleRoutes() {
	app.Router.HandleFunc("/products", app.getProducts).Methods("GET")
}
```

---

## Database Models and Querying

For clearer code organization, create a separate file (e.g., model.go) for database-related methods. Define the product struct with appropriate JSON tags to represent a product record from the products table.

```
package main

type product struct {
	ID       int     `json:"id"`
	Name     string  `json:"name"`
	Quantity int     `json:"quantity"`
	Price    float64 `json:"price"`
}
```

Next, implement the getProducts function. This function accepts a database pointer and retrieves all products by executing a SELECT query. It iterates over each row and appends the product struct to a slice.

```
func getProducts(db *sql.DB) ([]product, error) {
	query := "SELECT id, name, quantity, price FROM products"
	rows, err := db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	products := []product{}
	for rows.Next() {
		var p product
		err := rows.Scan(&p.ID, &p.Name, &p.Quantity, &p.Price)
		if err != nil {
			return nil, err
		}
		products = append(products, p)
	}
	return products, nil
}
```

---

## Application Initialization

In the App initialization method, a connection to the MySQL database is established and the router is initialized. The DB pointer is assigned to app.DB, and the routes are set up by calling handleRoutes.

```
func (app *App) Initialise() error {
	connectionString := fmt.Sprintf("%v:%v@tcp(127.0.0.1:3306)/%v", DbUser, DbPassword)
	var err error
	app.DB, err = sql.Open("mysql", connectionString)
	if err != nil {
		return err
	}

	app.Router = mux.NewRouter().StrictSlash(true)
	app.handleRoutes()
	return nil
}
```

After initialization, you can start your application using the run function.

```
func (app *App) Run(address string) {
	log.Fatal(http.ListenAndServe(address, app.Router))
}
```

> [!important]
> **Note**
>
> You can confirm the correct configuration of your database connection and router setup by checking the logs when the application starts.

---

## Testing the Endpoint with Postman

For testing this API endpoint, it is recommended to use Postman rather than a web browser. Follow these steps:

1.  Create a new Postman collection (e.g., "my inventory").
2.  Inside the collection, create a new request titled "get products".
3.  Set the request URL appropriately and select the GET method.
4.  Send the request.

Upon a successful request, you should receive a JSON response similar to the following:

```
[
  {
    "id": 1,
    "name": "chair",
    "quantity": 100,
    "price": 200
  },
  {
    "id": 2,
    "name": "desk",
    "quantity": 800,
    "price": 600
  }
]
```

> [!important]
> **Tip**
>
> Be sure to save your Postman collection for quick access during future API tests.

---

## Next Steps

With the GET endpoint successfully implemented and tested, consider extending your inventory API by adding additional routes such as creating, updating, and deleting products.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/483ddd82-96d2-43d5-a9a8-e27e8cdb064d/lesson/afe61f15-6b0d-463d-b147-21bbf205bcbb)**
>
> Watch video content
