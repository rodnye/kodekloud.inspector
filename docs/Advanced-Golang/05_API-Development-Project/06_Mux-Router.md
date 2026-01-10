# Mux Router - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/API-Development-Project/Mux-Router)

---

## Table of Contents

- Mux Router
  - Section 1. Defining the Product Data Structure and Creating a Basic HTTP Server
  - Section 2. Adding Endpoints and Returning JSON Data
  - Section 3. Retrieving a Specific Product by ID
  - Section 4. Introducing Gorilla Mux for Advanced Routing
  - Summary
  - Watch Video

---

## Content

Advanced Golang

API Development Project

# Mux Router

In this article, you'll learn how to create a simple RESTful API in Go. We'll begin by setting up an in-memory slice for product data and establishing basic endpoints using Go's standard library. Later, we'll enhance our routing with the Gorilla Mux router for more elegant route handling and dynamic variable extraction.

Below is an organized outline of the development process.

──────────────────────────────

## Section 1. Defining the Product Data Structure and Creating a Basic HTTP Server

We start by defining a product type as a struct. Each product consists of an ID, Name, Quantity, and Price. Then, we set up a basic HTTP server with a homepage endpoint.

```
package main


import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)


// Product represents a product with essential attributes.
type Product struct {
	Id       string  `json:"Id"`
	Name     string  `json:"Name"`
	Quantity int     `json:"Quantity"`
	Price    float64 `json:"Price"`
}


// Products holds our in-memory list of products.
var Products []Product


func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")
	log.Println("Endpoint Hit: homePage")
}


func main() {
	Products = []Product{
		{Id: "1", Name: "Chair", Quantity: 100, Price: 100.00},
		{Id: "2", Name: "Desk", Quantity: 200, Price: 200.00},
	}
	http.HandleFunc("/", homePage)
	http.ListenAndServe(":10000", nil)
}
```

In the code above, the server listens on port 10000 and logs each request to the homepage.

──────────────────────────────

## Section 2. Adding Endpoints and Returning JSON Data

We now introduce a new endpoint to return all products in JSON format. The Go `encoding/json` package encodes our data seamlessly.

```
package main


import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)


// Product and Products declarations remain the same


func returnAllProducts(w http.ResponseWriter, r *http.Request) {
	log.Println("Endpoint hit: returnAllProducts")
	json.NewEncoder(w).Encode(Products)
}


func handleRequests() {
	http.HandleFunc("/products", returnAllProducts)
	http.HandleFunc("/", homePage)
	http.ListenAndServe(":10000", nil)
}


func main() {
	Products = []Product{
		{Id: "1", Name: "Chair", Quantity: 100, Price: 100.00},
		{Id: "2", Name: "Desk", Quantity: 200, Price: 200.00},
	}
	handleRequests()
}
```

When you access `http://localhost:10000/products`, the API returns the JSON-encoded list of products:

```
[
  {
    "Id": "1",
    "Name": "Chair",
    "Quantity": 100,
    "Price": 100
  },
  {
    "Id": "2",
    "Name": "Desk",
    "Quantity": 200,
    "Price": 200
  }
]
```

──────────────────────────────

## Section 3. Retrieving a Specific Product by ID

Next, we implement an endpoint to fetch a specific product based on its ID by slicing the URL path.

```
func getProduct(w http.ResponseWriter, r *http.Request) {
	log.Println(r.URL.Path)
	// Extract the product ID from URL (e.g., /product/1)
	key := r.URL.Path[len("/product/"):]
	for _, product := range Products {
		// Directly compare string IDs.
		if product.Id == key {
			json.NewEncoder(w).Encode(product)
			return
		}
	}
}
```

To register this endpoint, update the request handler as shown:

```
func handleRequests() {
	http.HandleFunc("/products", returnAllProducts)
	http.HandleFunc("/product/", getProduct)
	http.HandleFunc("/", homePage)
	http.ListenAndServe(":10000", nil)
}
```

Visiting `http://localhost:10000/product/1` logs the URL and returns the matching product in JSON format.

──────────────────────────────

## Section 4. Introducing Gorilla Mux for Advanced Routing

While the standard library works well for basic routing, slicing URL strings is not the most elegant solution. To simplify route handling and support dynamic URL variables, we integrate the Gorilla Mux router.

Gorilla Mux is one of the most popular routing packages in the Go ecosystem. It supports method-based routing and lets you define route variables using patterns like `/movies/{id}`, where `{id}` is dynamically extracted from the URL.

![The image is a slide describing the "gorilla/mux router," which is a package that implements a request router and dispatcher for handling HTTP requests. It explains that "mux" stands for "HTTP request multiplexer" and compares it to the standard `http.ServeMux`.](https://kodekloud.com/kk-media/image/upload/v1752868682/notes-assets/images/Advanced-Golang-Mux-Router/gorilla-mux-router-description.jpg)

It also enables URL path variables:

![The image explains that URL paths can support variables, using "/movies/{id}" as an example, where "id" is a dynamic variable.](https://kodekloud.com/kk-media/image/upload/v1752868683/notes-assets/images/Advanced-Golang-Mux-Router/url-paths-variables-movies-id.jpg)

> [!important]
> **Note**
>
> To install Gorilla Mux, run the command:
>
> go get github.com/gorilla/mux

Now, update your code to integrate Gorilla Mux. Since Mux implements the HTTP.Handler interface, you can pass it directly to `http.ListenAndServe`:

```
package main


import (
	"encoding/json"
	"log"
	"net/http"


	"github.com/gorilla/mux"
)


// Product and Products declarations remain the same


func homePage(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Welcome to the HomePage!"))
	log.Println("Endpoint Hit: homePage")
}


func returnAllProducts(w http.ResponseWriter, r *http.Request) {
	log.Println("Endpoint hit: returnAllProducts")
	json.NewEncoder(w).Encode(Products)
}


func getProduct(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	key := vars["id"]
	for _, product := range Products {
		if product.Id == key {
			json.NewEncoder(w).Encode(product)
			return
		}
	}
	// Return a 404 error if no matching product is found.
	http.Error(w, "Product not found", http.StatusNotFound)
}


func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/products", returnAllProducts).Methods("GET")
	myRouter.HandleFunc("/product/{id}", getProduct).Methods("GET")
	myRouter.HandleFunc("/", homePage).Methods("GET")
	http.ListenAndServe(":10000", myRouter)
}


func main() {
	Products = []Product{
		{Id: "1", Name: "Chair", Quantity: 100, Price: 100.00},
		{Id: "2", Name: "Desk", Quantity: 200, Price: 200.00},
	}
	handleRequests()
}
```

Running the application with:

```
go run main.go
```

and accessing `http://localhost:10000/product/2` will return a JSON response similar to:

```
{
    "Id": "2",
    "Name": "Desk",
    "Quantity": 200,
    "Price": 200
}
```

──────────────────────────────

## Summary

In this article, we built a RESTful API in Go using the following steps:

- Defined a product struct and maintained an in-memory data slice.
- Created basic endpoints with the net/http package to return all products and a specific product by ID.
- Enhanced the API by integrating the Gorilla Mux router for more efficient route handling and dynamic URL variable extraction.

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/483ddd82-96d2-43d5-a9a8-e27e8cdb064d/lesson/710dfc31-27ad-4ea2-b5a1-791a10dc1c60)**
>
> Watch video content
