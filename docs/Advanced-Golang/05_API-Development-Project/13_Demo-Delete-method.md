# Demo Delete method - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/API-Development-Project/Demo-Delete-method)

---

## Table of Contents

- Demo Delete method
  - CRUD Endpoints Recap
  - Updating the Route Handler
  - Creating the Delete Handler
  - Implementing the Delete Function in the Model
  - Verifying the DELETE Operation
  - Final Route Handler
  - Watch Video

---

## Content

Advanced Golang

API Development Project

# Demo Delete method

In this guide, we extend our inventory API by adding a DELETE endpoint. Previously, our API supported creating, reading, and updating products. Now, we will implement the functionality to delete a product.

## CRUD Endpoints Recap

Earlier, we set up our CRUD endpoints as shown below:

```
p.ID = key
err = p.updateProduct(app.DB)
if err != nil {
    sendError(w, http.StatusInternalServerError, err.Error())
    return
}
sendResponse(w, http.StatusOK, p)
```

To build and run the application, use the following commands:

```
go build
Desktop/kodekloud/my-inventory via 🐹 v1.19.3
./my-inventory
```

At this stage, our API supports two endpoints for reading resources and one for updating a resource. The DELETE endpoint is the final piece to complete the CRUD operations.

## Updating the Route Handler

To support the DELETE method, update your router configuration to include it. Note that the DELETE endpoint extracts the product ID from the URL variable.

```
func (app *App) handleRoutes() {
    app.Router.HandleFunc("/products", app.getProducts).Methods("GET")
    app.Router.HandleFunc("/product/{id}", app.getProduct).Methods("GET")
    app.Router.HandleFunc("/product", app.createProduct).Methods("POST")
    app.Router.HandleFunc("/product/{id}", app.updateProduct).Methods("PUT")
    app.Router.HandleFunc("/product/{id}", app.deleteProduct).Methods("DELETE")
}
```

Rebuild and run your application:

```
go build
Desktop/kodekloud/my-inventory via 🐱 v1.19.3
./my-inventory
```

## Creating the Delete Handler

The delete handler retrieves the product ID from the URL and validates it, much like the update handler did. First, review the snippet for obtaining the product ID:

```
func (app *App) updateProduct(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    key, err := strconv.Atoi(vars["id"])
    if err != nil {
        sendError(w, http.StatusBadRequest, "invalid product ID")
        return
    }
    // Further handling...
}
```

Now, create the DELETE handler that leverages similar logic to remove a product from the database:

```
func (app *App) deleteProduct(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id, err := strconv.Atoi(vars["id"])
    if err != nil {
        sendError(w, http.StatusBadRequest, "invalid product ID")
        return
    }
    p := product{ID: id}
    err = p.deleteProduct(app.DB)
    if err != nil {
        sendError(w, http.StatusInternalServerError, err.Error())
        return
    }
    sendResponse(w, http.StatusOK, map[string]string{"result": "successful deletion"})
}
```

## Implementing the Delete Function in the Model

In the product model, you already have an update function. Now add a delete function that executes a SQL DELETE statement. This function ensures proper error handling, as demonstrated below:

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
        return errors.New("no such product exists")
    }
    return nil
}


func (p *product) deleteProduct(db *sql.DB) error {
    query := fmt.Sprintf("delete from products where id=%v", p.ID)
    _, err := db.Exec(query)
    return err
}
```

> [!important]
> **Tip**
>
> After implementing the delete function in your model, ensure you handle errors gracefully to improve user feedback and debugging.

## Verifying the DELETE Operation

To test the DELETE endpoint, you can use Postman. Configure a DELETE request targeting a specific product ID. For example, to delete the product with ID 2, send a DELETE request to:

```
localhost:10000/product/2
```

The response should indicate a "successful deletion." You can verify the removal by using the getAllProducts API endpoint to confirm that the product is no longer in the inventory.

![The image shows a Postman interface with a DELETE request setup for a product in a collection named "my-inventory." The request URL is "localhost:10000/product/2," and the response section is empty.](https://kodekloud.com/kk-media/image/upload/v1752868678/notes-assets/images/Advanced-Golang-Demo-Delete-method/postman-delete-request-my-inventory.jpg)

## Final Route Handler

Below is the complete version of the route handler incorporating all CRUD endpoints, including DELETE:

```
func (app *App) handleRoutes() {
    app.Router.HandleFunc("/products", app.getProducts).Methods("GET")
    app.Router.HandleFunc("/product/{id}", app.getProduct).Methods("GET")
    app.Router.HandleFunc("/product", app.createProduct).Methods("POST")
    app.Router.HandleFunc("/product/{id}", app.updateProduct).Methods("PUT")
    app.Router.HandleFunc("/product/{id}", app.deleteProduct).Methods("DELETE")
}
```

With all API endpoints implemented, your inventory API is now fully functional. Enjoy working with your enhanced project and efficient product management!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/483ddd82-96d2-43d5-a9a8-e27e8cdb064d/lesson/15fa2c2d-02ce-4544-983d-bec557126885)**
>
> Watch video content
