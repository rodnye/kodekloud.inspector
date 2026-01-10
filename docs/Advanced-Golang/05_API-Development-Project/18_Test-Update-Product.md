# Test Update Product - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/API-Development-Project/Test-Update-Product)

---

## Table of Contents

- Test Update Product
  - API Route Handlers
  - Testing the API Endpoints
  - Helper Function: sendRequest
  - Running the Tests
  - Extending the Test Suite
  - Watch Video
  - Practice Lab
    - 1. Testing Product Deletion
    - 2. Testing Product Update
    - 3. Testing Product Creation

---

## Content

Advanced Golang

API Development Project

# Test Update Product

In this article, we demonstrate how to test your product API endpoints—including create, update, and delete—using various HTTP methods. The sections below detail the implementation of the API routes and the corresponding test functions, ensuring a comprehensive and self-contained guide.

## API Route Handlers

Our API route handlers are implemented using various HTTP verbs. The snippet below shows how the routes are configured:

```
p := product{ID: key}
err = p.deleteProduct(app.DB)
if err != nil {
    sendError(w, http.StatusInternalServerError, err.Error())
    return
}
sendResponse(w, http.StatusOK, map[string]string{"result": "successful deletion"})


func (app *App) handleRoutes() {
    app.Router.HandleFunc("/products", app.getProducts).Methods("GET")
    app.Router.HandleFunc("/product/{id}", app.getProduct).Methods("GET")
    app.Router.HandleFunc("/product", app.createProduct).Methods("POST")
    app.Router.HandleFunc("/product/{id}", app.updateProduct).Methods("PUT")
    app.Router.HandleFunc("/product/{id}", app.deleteProduct).Methods("DELETE")
}
```

> [!important]
> **Note**
>
> The above code snippet sets up routes for handling product retrieval, creation, updating, and deletion using an HTTP router.

---

## Testing the API Endpoints

Before delving into individual test cases, note that each test function begins by clearing the database table and adding a sample product. This approach ensures that tests are isolated and reproducible.

### 1\. Testing Product Deletion

The following test function outlines the deletion process. Initially, a product is added and verified via a GET request. The product is then deleted using a DELETE request, and a final GET request confirms the deletion.

```
func TestDeleteProduct(t *testing.T) {
    clearTable()
    addProduct("connector", 10, 10)


    // Verify the product exists.
    req, _ := http.NewRequest("GET", "/product/1", nil)
    response := sendRequest(req)
    checkStatusCode(t, http.StatusOK, response.Code)


    // Delete the product.
    req, _ = http.NewRequest("DELETE", "/product/1", nil)
    response = sendRequest(req)
    checkStatusCode(t, http.StatusOK, response.Code)


    // Verify the product no longer exists.
    req, _ = http.NewRequest("GET", "/product/1", nil)
    response = sendRequest(req)
    checkStatusCode(t, http.StatusNotFound, response.Code)
}
```

---

### 2\. Testing Product Update

This section details the procedure for testing the update functionality. The test retrieves the original product details, performs a PUT request to update the product, and finally compares the old and new values to confirm that only the desired changes were made.

```
func TestUpdateProduct(t *testing.T) {
    clearTable()
    addProduct("connector", 10, 10)


    // Retrieve the original product.
    req, _ := http.NewRequest("GET", "/product/1", nil)
    response := sendRequest(req)
    checkStatusCode(t, http.StatusOK, response.Code)


    var oldValue map[string]interface{}
    json.Unmarshal(response.Body.Bytes(), &oldValue)


    // Prepare updated product payload; here, the quantity is changed while keeping the name consistent.
    product := []byte(`{"name":"connector", "quantity":1, "price":10}`)
    req, _ = http.NewRequest("PUT", "/product/1", bytes.NewBuffer(product))
    req.Header.Set("Content-Type", "application/json")
    response = sendRequest(req)


    var newValue map[string]interface{}
    json.Unmarshal(response.Body.Bytes(), &newValue)


    // Verify that the product ID remains unchanged.
    if oldValue["id"] != newValue["id"] {
        t.Errorf("Expected id: %v, Got: %v", oldValue["id"], newValue["id"])
    }


    // Validate updated fields.
    if newValue["name"] != "connector" {
        t.Errorf("Expected name: connector, Got: %v", newValue["name"])
    }
    if newValue["price"] != float64(10) {
        t.Errorf("Expected price: 10, Got: %v", newValue["price"])
    }
    // Confirm that the quantity has been updated.
    if oldValue["quantity"] == newValue["quantity"] {
        t.Errorf("Expected quantity to change from %v, but got %v", oldValue["quantity"], newValue["quantity"])
    }
}
```

After updating the product, the test compares the original values with the updated ones. For instance, if the new quantity remains unchanged (i.e., still 10 instead of the expected 1), an error is triggered:

```
if oldValue["quantity"] == newValue["quantity"] {
    t.Errorf("Expected quantity: %v, Got: %v", newValue["quantity"], oldValue["quantity"])
}
```

> [!important]
> **Tip**
>
> Ensure that the test checks only the intended fields for updates to prevent unexpected behavior in unrelated parts of your product data.

---

### 3\. Testing Product Creation

This test case demonstrates the product creation process. A POST request helps to create a new product, and the response is unmarshaled to verify that the product properties match the expected values.

```
func TestCreateProduct(t *testing.T) {
    clearTable()
    product := []byte(`{"name":"chair", "quantity":1, "price":100}`)
    req, _ := http.NewRequest("POST", "/product", bytes.NewBuffer(product))
    req.Header.Set("Content-Type", "application/json")
    response := sendRequest(req)
    checkStatusCode(t, http.StatusCreated, response.Code)


    var m map[string]interface{}
    json.Unmarshal(response.Body.Bytes(), &m)
    if m["name"] != "chair" {
        t.Errorf("Expected name: chair, Got: %v", m["name"])
    }
    if m["quantity"] != float64(1) {
        t.Errorf("Expected quantity: 1, Got: %v", m["quantity"])
    }
}
```

---

## Helper Function: sendRequest

A common helper function is used to send HTTP requests to the application's router. This function is essential for abstracting the request process in the tests.

```
func sendRequest(req *http.Request) *httptest.ResponseRecorder {
    recorder := httptest.NewRecorder()
    a.Router.ServeHTTP(recorder, req)
    return recorder
}
```

---

## Running the Tests

After implementing your tests, run them using the command below:

```
go test
```

You should see output similar to the following:

```
2022/12/28 06:06:40 clearTable
2022/12/28 06:06:40 clearTable
2022/12/28 06:06:40 clearTable
2022/12/28 06:06:40 clearTable
PASS
ok      example.com/my-inventory    0.536s
```

Any failures during testing—for example, if the updated quantity does not change as intended—will produce an error message such as:

```
--- FAIL: TestUpdateProduct (0.01s)
    app_test.go:141: Expected quantity: 1, Got: 10
```

> [!important]
> **Warning**
>
> Error messages like the one above indicate potential issues in your update logic and should be addressed promptly to ensure your API functions as expected.

---

## Extending the Test Suite

To ensure the robustness of your API, consider adding the following test cases:

| Test Case                               | Description                                                              |
| --------------------------------------- | ------------------------------------------------------------------------ |
| Non-existent Product Retrieval          | Test retrieving a product that does not exist.                           |
| Get All Products                        | Test the endpoint to retrieve all products after multiple additions.     |
| Error Handling for Incorrect Data Types | Test posting data with wrong data types to check proper error responses. |
| Deleting a Non-existent Product         | Test DELETE requests for a product that does not exist.                  |

Expanding your test suite with these scenarios will help ensure your API reliably handles various edge cases.

---

By following this guide and implementing comprehensive tests, you can confidently develop and maintain your product inventory application, ensuring that it behaves as expected across all CRUD operations.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/483ddd82-96d2-43d5-a9a8-e27e8cdb064d/lesson/47ed90a4-29d5-4d3d-b086-3fc15cb9089c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/advanced-golang/module/483ddd82-96d2-43d5-a9a8-e27e8cdb064d/lesson/aa1dfddd-3756-4b26-b962-7725fd3a4878)**
>
> Practice lab
