# Demo Post method - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/API-Development-Project/Demo-Post-method)

---

## Table of Contents

- Demo Post method
  - Defining the Routes
  - Implementing the Database Methods
  - Creating the Route Handler for POST Requests
  - Testing the POST Endpoint
  - Verifying the Inserted Product
  - Watch Video
    - Fetching an Existing Product
    - Inserting a New Product

---

## Content

Advanced Golang

API Development Project

# Demo Post method

In this lesson, we will demonstrate how to create a new route that handles POST requests for inserting a new product into the database. This guide covers updating routes, implementing database methods for product insertion, creating the HTTP handler for the POST request, and testing the new endpoint.

---

## Defining the Routes

First, update the routes in your application to include a new route for creating products. In addition to the existing routes for fetching products, we'll add a route that handles POST requests for inserting new products.

```
func (app *App) handleRoutes() {
    app.Router.HandleFunc("/products", app.getProducts).Methods("GET")
    app.Router.HandleFunc("/product/{id}", app.getProduct).Methods("GET")
    app.Router.HandleFunc("/product", app.createProduct).Methods("POST")
}
```

---

## Implementing the Database Methods

Before handling the POST request, define the necessary methods on your product model.

### Fetching an Existing Product

First, verify the method for fetching a product from the database works correctly:

```
func (p *product) getProduct(db *sql.DB) error {
    query := fmt.Sprintf("SELECT name, quantity, price FROM products WHERE id=%v", p.ID)
    row := db.QueryRow(query)
    err := row.Scan(&p.Name, &p.Quantity, &p.Price)
    if err != nil {
        return err
    }
    return nil
}
```

### Inserting a New Product

Next, implement the method that inserts a product into the database. This method constructs an INSERT query using the product's name, quantity, and price. After executing the query, it retrieves the last inserted ID and assigns it to the product struct.

```
func (p *product) createProduct(db *sql.DB) error {
    query := fmt.Sprintf("INSERT INTO products(name, quantity, price) VALUES('%v', %v, %v)", p.Name, p.Quantity, p.Price)
    result, err := db.Exec(query)
    if err != nil {
        return err
    }
    id, err := result.LastInsertId()
    if err != nil {
        return err
    }
    p.ID = int(id)
    return nil
}
```

> [!important]
> **Note**
>
> If your database table contains more columns than these three, ensure you specify the exact columns in your INSERT statement.

---

## Creating the Route Handler for POST Requests

Now, create the HTTP handler function that will process the POST requests. This handler is responsible for decoding the JSON payload sent by the client. If the payload cannot be decoded properly, the function returns an error response with the HTTP status "Bad Request".

```
func (app *App) createProduct(w http.ResponseWriter, r *http.Request) {
    var p product


    // Decode the JSON request payload into a product object
    err := json.NewDecoder(r.Body).Decode(&p)
    if err != nil {
        sendError(w, http.StatusBadRequest, "Invalid request payload")
        return
    }


    // Insert the product into the database
    err = p.createProduct(app.DB)
    if err != nil {
        sendError(w, http.StatusInternalServerError, err.Error())
        return
    }


    sendResponse(w, http.StatusOK, p)
}
```

Ensure that your routes are properly updated (as described in the previous section) so that the POST requests to `/product` are routed to the `createProduct` function.

---

## Testing the POST Endpoint

After building and running your application, test the new endpoint by sending a sample JSON payload. For instance, you can use a tool like Postman or curl to send a POST request to the `/product` endpoint with the following JSON:

```
{
  "name": "Pens",
  "price": 10,
  "quantity": 100
}
```

If the insertion is successful, you will see a confirmation. However, if there is a mismatch between the number of columns and values, you might receive an error such as:

```
{
  "error": "Error 1136: Column count doesn't match value count at row 1"
}
```

> [!important]
> **Warning**
>
> This error indicates that the number of values provided in the INSERT statement does not match the columns in the products table. Verify your INSERT query to ensure the columns and values align correctly.

---

## Verifying the Inserted Product

Finally, confirm that the new product has been inserted by accessing the GET endpoint for `/products`. A typical successful response may look like this:

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

If your newly added product is visible in the output, your POST endpoint is functioning correctly.

---

This lesson covered updating routes, implementing model methods for data insertion, decoding JSON from POST requests, and testing the endpoint. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/483ddd82-96d2-43d5-a9a8-e27e8cdb064d/lesson/ff878e5d-86eb-4664-9385-310ac9a30024)**
>
> Watch video content
