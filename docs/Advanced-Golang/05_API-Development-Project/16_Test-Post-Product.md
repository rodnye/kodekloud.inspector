# Test Post Product - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/API-Development-Project/Test-Post-Product)

---

## Table of Contents

- Test Post Product
  - Helper Functions for Testing
  - Testing the POST API
  - Verifying the Response Payload
  - Running the Tests
  - API Implementation Snippet
  - Product Structure Definition
  - Handling JSON Number Conversion
  - Conclusion
  - References
  - Watch Video

---

## Content

Advanced Golang

API Development Project

# Test Post Product

In this article, we demonstrate how to test the POST API endpoint for creating a new product. The guide covers writing helper functions, constructing the request payload, sending the request, and verifying the API response.

## Helper Functions for Testing

First, we define helper functions to verify status codes and to send HTTP requests. These functions simplify the testing process by encapsulating common operations.

```
func checkStatusCode(t *testing.T, expectedStatusCode int, actualStatusCode int) {
    if expectedStatusCode != actualStatusCode {
        t.Errorf("Expected status: %v, Received: %v", expectedStatusCode, actualStatusCode)
    }
}


func sendRequest(request *http.Request) *httptest.ResponseRecorder {
    recorder := httptest.NewRecorder()
    a.Router.ServeHTTP(recorder, request)
    return recorder
}
```

## Testing the POST API

The test for the POST API for creating a product involves several key steps:

1.  **Clearing the table:** Ensure the database table is empty before running the test.
2.  **Preparing the payload:** A JSON payload representing a new product is created.
3.  **Creating and sending the HTTP POST request:** The JSON payload is converted into a byte slice and wrapped in a bytes buffer, as required by the `http.NewRequest` function.
4.  **Verifying the response:** The response status is checked to confirm if the product was created successfully.

> [!important]
> **Key Point**
>
> The request header is explicitly set to `"application/json"` to ensure the server processes the payload correctly.

Below is the test function for the POST API:

```
func TestCreateProduct(t *testing.T) {
    clearTable()
    var product = []byte(`{"name":"chair", "quantity":1, "price":100}`)
    req, _ := http.NewRequest("POST", "/product", bytes.NewBuffer(product))
    req.Header.Set("Content-Type", "application/json")

    response := sendRequest(req)
    checkStatusCode(t, http.StatusCreated, response.Code)
}
```

## Verifying the Response Payload

After executing the request, we inspect the response payload by unmarshaling the JSON into a map. This verification ensures that the product details in the response match the expected values. Note that when JSON is unmarshaled into a map with `interface{}` values, numbers convert to `float64` by default.

```
func TestCreateProduct(t *testing.T) {
    clearTable()
    var product = []byte(`{"name":"chair", "quantity":1, "price":100}`)
    req, _ := http.NewRequest("POST", "/product", bytes.NewBuffer(product))
    req.Header.Set("Content-Type", "application/json")


    response := sendRequest(req)
    checkStatusCode(t, http.StatusCreated, response.Code)


    var m map[string]interface{}
    json.Unmarshal(response.Body.Bytes(), &m)


    if m["name"] != "chair" {
        t.Errorf("Expected name: %v, Got: %v", "chair", m["name"])
    }
    if m["quantity"] != 1.0 { // Numbers are unmarshaled as float64.
        t.Errorf("Expected quantity: %v, Got: %v", 1.0, m["quantity"])
    }
}
```

## Running the Tests

Execute the tests using the command below to confirm that both the POST and GET API endpoints are functioning as expected:

```
go test
2022/12/28 05:50:34 ClearTable
2022/12/28 05:50:34 ClearTable
2022/12/28 05:50:34 Float64
PASS
ok      example.com/my-inventory     0.469s
```

## API Implementation Snippet

For additional context, here is an excerpt from the API implementation where the `createProduct` method is defined. This method inserts the new product into the database and sends the appropriate HTTP response:

```
err = p.createProduct(app.DB)
if err != nil {
    sendError(w, http.StatusInternalServerError, err.Error())
    return
}
sendResponse(w, http.StatusCreated, p)
}


func (app *App) updateProduct(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    key, err := strconv.Atoi(vars["id"])
```

## Product Structure Definition

Below is the structure definition for the `product` type. This type represents individual items in the inventory:

```
package main


import "database/sql"


type product struct {
    ID       int     `json:"id"`
    Name     string  `json:"name"`
    Quantity int     `json:"quantity"`
    Price    float64 `json:"price"`
}


func getProducts(db *sql.DB) ([]product, error) {
    // function implementation
}
```

## Handling JSON Number Conversion

An important detail is how JSON numbers are unmarshaled. Initially, an error occurred because the expected quantity was specified as `1` (an integer) while the unmarshaled value was `1.0` (a float64). Adjusting the expected value to `1.0` resolved the issue, and the test passed successfully.

```
go test
2022/12/28 05:50:34 ClearTable
2022/12/28 05:50:34 ClearTable
2022/12/28 05:50:34 Float64
PASS
ok      example.com/my-inventory     0.469s
```

## Conclusion

This article demonstrated how to test the POST API for creating a product. We covered the creation of helper functions, setting up the test request, verifying the response, and handling JSON number conversion in Go.

Next, we will explore testing the DELETE API. Stay tuned for more detailed tutorials on API testing.

## References

- [Go Testing Overview](https://golang.org/pkg/testing/)
- [HTTP Testing in Go](https://golang.org/pkg/net/http/httptest/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/483ddd82-96d2-43d5-a9a8-e27e8cdb064d/lesson/24ea8f84-4574-4386-8f77-44cf367f38a5)**
>
> Watch video content
