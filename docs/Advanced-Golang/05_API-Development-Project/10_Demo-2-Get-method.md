# Demo 2 Get method - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/API-Development-Project/Demo-2-Get-method)

---

## Table of Contents

- Demo 2 Get method
  - Fetching Products from the Database
  - Updating the Main Application to Add a GET Route
  - Defining the GET Handlers
  - Retrieving Product Details from the Database
  - Testing the Endpoints
  - Watch Video
    - Handler for Fetching All Products
    - Handler for Fetching a Specific Product

---

## Content

Advanced Golang

API Development Project

# Demo 2 Get method

In this lesson, we implement a GET route to fetch a product by its unique ID. We begin by reviewing the database query logic that retrieves all products.

## Fetching Products from the Database

The following code demonstrates how to query the database for products. Notice that we select the `id`, `name`, `quantity`, and `price` fields:

```
query := "SELECT id, name, quantity, price FROM products"
rows, err := db.Query(query)

if err != nil {
    return nil, err
}

products := []product{}
for rows.Next() {
    var p product
    err = rows.Scan(&p.ID, &p.Name, &p.Quantity, &p.Price)
}
```

Below is a sample terminal output when running our program:

```
Desktop/kodekLOUD/my-inventory via 🐶 v1.19.3
./my-inventory
^C
Desktop/kodekLOUD/my-inventory via 🐶 v1.19.3 took 7m41s
```

## Updating the Main Application to Add a GET Route

Next, we update the main application file (`app.go`) to include a GET route that captures a dynamic product ID from the URL. The route follows the pattern `/product/{id}`.

> > [!important]
> > **Note**
> >
> > This URL pattern leverages the mux router's ability to capture dynamic segments from the URL.

Below is the updated route configuration:

```
func (app *App) handleRoutes() {
    app.Router.HandleFunc("/products", app.getProducts).Methods("GET")
    app.Router.HandleFunc("/product/{id}", app.getProduct).Methods("GET")
}
```

The terminal output after running the server is:

```
Desktop/kodekloud/my-inventory via 🦊 v1.19.3
> ./my-inventory
C
Desktop/kodekloud/my-inventory via 🦊 v1.19.3 took 7m41s
```

## Defining the GET Handlers

### Handler for Fetching All Products

The `getProducts` handler retrieves all products from the database and sends the response. Its signature is similar to other handlers:

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

A sample terminal output when running the application is provided below:

```
Desktop/kodekloud/my-inventory via 🐢 v1.19.3
    ./my-inventory
^C
Desktop/kodekloud/my-inventory via 🐢 v1.19.3 took 7m41s
```

### Handler for Fetching a Specific Product

To fetch a specific product, we first extract the product ID from the incoming request URL using the mux router:

```
func (app *App) getProduct(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    id := vars["id"]
}
```

The terminal output confirming this step is:

```
Desktop/codekLOUD/my-inventory via 🐱 v1.19.3
➜  ./my-inventory
^C
Desktop/codekLOUD/my-inventory via 🐱 v1.19.3 took 7m41s
```

Next, we convert the captured string ID into an integer using `strconv.Atoi`. This conversion ensures that only numeric IDs are processed; otherwise, a 400 Bad Request error is sent:

```
func (app *App) getProduct(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    key, err := strconv.Atoi(vars["id"])
    if err != nil {
        sendError(w, http.StatusBadRequest, "invalid product ID")
        return
    }
}
```

Another terminal run output confirms this change:

```
Desktop/kodekloud/my-inventory via 🐹 v1.19.3
➜ ./my-inventory
^C
Desktop/kodekloud/my-inventory via v1.19.3 took 7m41s
```

If the conversion fails, the system responds with an error. If it passes, we initialize a product structure with the provided ID:

```
func (app *App) getProduct(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    key, err := strconv.Atoi(vars["id"])
    if err != nil {
        sendError(w, http.StatusBadRequest, "invalid product ID")
        return
    }

    p := product{ID: key}
}
```

## Retrieving Product Details from the Database

Before proceeding, let's review our product structure and a generic method to retrieve all products:

```
import "database/sql"

type product struct {
    ID       int     `json:"id"`
    Name     string  `json:"name"`
    Quantity int     `json:"quantity"`
    Price    float64 `json:"price"`
}

func getProducts(db *sql.DB) ([]product, error) {
    query := "SELECT id, name, quantity, price FROM products"
    rows, err := db.Query(query)
    if err != nil {
        return nil, err
    }

    products := []product{}
    for rows.Next() {
        // Assume further logic would go here
    }
    return products, nil
}
```

Now, we add a method to the product struct that fetches the product's complete details using its ID. This function builds a SQL query, executes it with `QueryRow`, and scans the result into the struct fields:

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

Returning to our `getProduct` handler, we invoke the `getProduct` method. Based on the error returned, we send the appropriate HTTP response:

```
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
        case sql.ErrNoRows:
            sendError(w, http.StatusNotFound, "Product not found")
        default:
            sendError(w, http.StatusInternalServerError, err.Error())
        }
        return
    }

    sendResponse(w, http.StatusOK, p)
}
```

The complete routing configuration remains as follows:

```
func (app *App) handleRoutes() {
    app.Router.HandleFunc("/products", app.getProducts).Methods("GET")
    app.Router.HandleFunc("/product/{id}", app.getProduct).Methods("GET")
}
```

## Testing the Endpoints

After rebuilding and running the application, you can test the endpoints using Postman or any other API testing tool. Below are some examples:

| Request URL                        | Expected Response                                                  |
| ---------------------------------- | ------------------------------------------------------------------ |
| GET localhost:10000/product/1      | `json { "id": 1, "name": "chair", "quantity": 100, "price": 200 }` |
| GET localhost:10000/product/2      | `json { "id": 2, "name": "desk", "quantity": 800, "price": 600 }`  |
| GET localhost:10000/product/string | `json { "error": "invalid product ID" }`                           |
| GET localhost:10000/product/10     | `json { "error": "Product not found" }`                            |

For the `/products` route, the sample response will be:

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

> > [!important]
> > **Summary**
> >
> > In summary, we implemented two routes:
> >
> > - `/products` to fetch all products in the database.
> > - `/product/{id}` to fetch a specific product by its ID. This approach leverages robust error handling and the dynamic capabilities of the mux router to ensure reliable product retrieval.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/483ddd82-96d2-43d5-a9a8-e27e8cdb064d/lesson/07de5bcd-e155-4548-905b-425082094501)**
>
> Watch video content
