# Demo Put method - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/API-Development-Project/Demo-Put-method)

---

## Table of Contents

- Demo Put method
  - Updating Route Definitions
  - Creating the updateProduct Handler
  - Database Layer Integration
  - Testing the PUT Endpoint
  - Watch Video
    - Example Scenario: Invalid Payload
    - Example Scenario: Valid Update

---

## Content

Advanced Golang

API Development Project

# Demo Put method

In this lesson, we detail how to add a new route for the PUT endpoint to update a specific product. This endpoint follows a structure similar to our GET and POST endpoints, with the PUT HTTP method enabling data updates.

## Updating Route Definitions

Start by updating your application's routing function to include the new PUT route:

```
func (app *App) handleRoutes() {
    app.Router.HandleFunc("/products", app.getProducts).Methods("GET")
    app.Router.HandleFunc("/product/{id}", app.getProduct).Methods("GET")
    app.Router.HandleFunc("/product", app.createProduct).Methods("POST")
    app.Router.HandleFunc("/product/{id}", app.updateProduct).Methods("PUT")
}
```

## Creating the updateProduct Handler

Next, implement the `updateProduct` handler. The first step involves extracting the product ID from the URL, which is necessary to determine which product to update.

```
func (app *App) updateProduct(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    key, err := strconv.Atoi(vars["id"])
    if err != nil {
        sendError(w, http.StatusBadRequest, "invalid product ID")
        return
    }
}
```

Once you have successfully extracted the product ID, decode the user-provided JSON payload to update the product. The process is similar to the one used in the `createProduct` method. For reference, here is the original `createProduct` function:

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
```

For updating a product, the handler decodes the JSON payload and assigns the extracted product ID to the product before calling the `updateProduct` method:

```
func (app *App) updateProduct(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    key, err := strconv.Atoi(vars["id"])
    if err != nil {
        sendError(w, http.StatusBadRequest, "invalid product ID")
        return
    }


    var p product
    err = json.NewDecoder(r.Body).Decode(&p)
    if err != nil {
        sendError(w, http.StatusBadRequest, "Invalid request payload")
        return
    }
    p.ID = key


    err = p.updateProduct(app.DB)
    if err != nil {
        sendError(w, http.StatusInternalServerError, err.Error())
        return
    }
    sendResponse(w, http.StatusOK, p)
}
```

## Database Layer Integration

Update the database layer by adding a new method to handle the update query. Previously, we used the `createProduct` function to insert new products:

```
func (p *product) createProduct(db *sql.DB) error {
    query := fmt.Sprintf("insert into products(name, quantity, price) values('%v', %v, %v)", p.Name, p.Quantity, p.Price)
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

Now, create the `updateProduct` method. This function updates the product's attributes based on its ID. Notice the check to ensure that at least one row was affected by the update:

```
func (p *product) updateProduct(db *sql.DB) error {
    query := fmt.Sprintf("update products set name='%v', quantity=%v, price=%v where id=%v", p.Name, p.Quantity, p.Price, p.ID)
    result, err := db.Exec(query)
    if err != nil {
        return err
    }
    rowsAffected, err := result.RowsAffected()
    if err != nil {
        return err
    }
    if rowsAffected == 0 {
        return errors.New("No such row exists")
    }
    return nil
}
```

> [!important]
> **Note**
>
> Ensure that your database user has proper permissions for executing update queries and that the table schema matches the fields being updated.

## Testing the PUT Endpoint

After integrating the database update logic, it's time to test the implementation.

1.  Build the module and run the executable.
2.  Open Postman and create a new PUT request to modify a product.

### Example Scenario: Invalid Payload

If you send a PUT request without a valid JSON payload (e.g., for product with ID 10), you will receive an error response:

_Request:_

```
PUT localhost:10000/product/10
```

_Request Body (empty or invalid):_

```
{
  "error": "Invalid request payload"
}
```

### Example Scenario: Valid Update

Send a valid JSON payload to update an existing product. For instance, updating product ID 2:

_Request:_

```
PUT localhost:10000/product/2
```

_Request Body:_

```
{
  "name": "desk",
  "quantity": 2000,
  "price": 600
}
```

_Response:_

```
{
  "id": 2,
  "name": "desk",
  "quantity": 2000,
  "price": 600
}
```

You can verify the update by fetching all products using the GET `/products` endpoint, which should return a list similar to:

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
        "quantity": 2000,
        "price": 600
    },
    {
        "id": 3,
        "name": "Pens",
        "quantity": 100,
        "price": 10
    }
]
```

> [!important]
> **Successful Update**
>
> When the update is successful, verify that the response returns the updated product data and that subsequent GET requests display the updated information.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/483ddd82-96d2-43d5-a9a8-e27e8cdb064d/lesson/59a5575f-7f37-4af9-aabb-b76da61db32a)**
>
> Watch video content
