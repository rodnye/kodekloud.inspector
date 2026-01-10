# Test Delete Product - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Golang/API-Development-Project/Test-Delete-Product)

---

## Table of Contents

- Test Delete Product
  - Adding a Product and Validating Creation
  - End-to-End Delete Product Test
  - Example Test Output
  - Additional Resources
  - Watch Video

---

## Content

Advanced Golang

API Development Project

# Test Delete Product

In this article, we demonstrate how to test the DELETE API for our product inventory. The testing process consists of the following steps:

1.  Clear the product table.
2.  Add a new product using the POST API.
3.  Retrieve the product with a GET API to verify its creation.
4.  Delete the product using the DELETE API.
5.  Attempt to retrieve the deleted product to ensure it has been removed.

Below is the enhanced and consolidated test code that enforces consistent naming and proper status code verification.

## Adding a Product and Validating Creation

The first code block shows how to prepare a product payload, add the product using the POST API, and validate the returned product details.

```
// Prepare and add the product using the POST API.
payload := []byte(`{"name":"chair","quantity":1,"price":100}`)
req, _ := http.NewRequest("POST", "/product", bytes.NewBuffer(payload))
req.Header.Set("Content-Type", "application/json")


response := sendRequest(req)
checkStatusCode(t, http.StatusCreated, response.Code)


var m map[string]interface{}
json.Unmarshal(response.Body.Bytes(), &m)


if m["name"] != "chair" {
    t.Errorf("Expected name: %v, Got: %v", "chair", m["name"])
}
if m["quantity"] != 1.0 {
    t.Errorf("Expected quantity: %v, Got: %v", 1.0, m["quantity"])
}
```

## End-to-End Delete Product Test

The following test demonstrates how to clear existing data, add a product named "connector", verify its addition, and then delete it. Finally, it confirms that a GET request after deletion returns a 404 Not Found status.

```
func TestDeleteProduct(t *testing.T) {
    // Clear existing data.
    clearTable()


    // Add a product "connector" with quantity 10 and price 10.
    addProduct("connector", 10, 10)


    // Retrieve the product using GET request.
    req, _ := http.NewRequest("GET", "/product/1", nil)
    response := sendRequest(req)
    checkStatusCode(t, http.StatusOK, response.Code)


    // Validate the retrieved product details.
    var m map[string]interface{}
    json.Unmarshal(response.Body.Bytes(), &m)
    if m["name"] != "connector" {
        t.Errorf("Expected name: %v, Got: %v", "connector", m["name"])
    }
    if m["quantity"] != 10.0 {
        t.Errorf("Expected quantity: %v, Got: %v", 10.0, m["quantity"])
    }


    // Delete the product using DELETE request.
    req, _ = http.NewRequest("DELETE", "/product/1", nil)
    response = sendRequest(req)
    checkStatusCode(t, http.StatusOK, response.Code)


    // Try to retrieve the deleted product.
    req, _ = http.NewRequest("GET", "/product/1", nil)
    response = sendRequest(req)
    // Expect a 404 Not Found status since the product has been deleted.
    checkStatusCode(t, http.StatusNotFound, response.Code)
}
```

> [!important]
> **Note**
>
> In the application code (for example, in app.go), the DELETE API must correctly handle the removal of a product by its ID. Following the deletion, a GET request for the same product ID should yield a 404 status, confirming the deletion was successful.

## Example Test Output

When running the tests using `go test`, you might encounter output similar to the following if there is a discrepancy between expected and actual status codes:

```
2022/12/28 06:00:13 clearTable
2022/12/28 06:00:13 clearTable
--- FAIL: TestDeleteProduct (0.03s)
app_test.go:64: Expected status: 200, Received: 404
FAIL
exit status 1
FAIL    example.com/my-inventory    0.537s
```

In this log, a 404 response was received instead of the expected 200 OK status before deletion. The improved test code now correctly checks for a 404 Not Found status after the product has been deleted.

All tests should pass once the DELETE API and the status code validations are implemented correctly.

## Additional Resources

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-golang/module/483ddd82-96d2-43d5-a9a8-e27e8cdb064d/lesson/52aba6c2-8176-447d-ba8b-14ed62112e9e)**
>
> Watch video content
