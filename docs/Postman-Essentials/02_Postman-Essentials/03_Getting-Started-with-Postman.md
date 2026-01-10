# Getting Started with Postman - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Postman-Essentials/Postman-Essentials/Getting-Started-with-Postman)

---

## Table of Contents

- Getting Started with Postman
  - Reviewing Our API Code
  - Creating and Testing Requests in Postman
  - Creating a Product
  - Updating and Deleting a Product
  - Conclusion
  - Watch Video
    - Testing the GET /products Endpoint
    - Testing the GET /products/:id Endpoint
    - Updating a Product
    - Deleting a Product

---

## Content

Postman Essentials

Postman Essentials

# Getting Started with Postman

Postman offers both a web client and a desktop client. Although you can use the web client, the desktop version is recommended for its consistent behavior—especially in handling CORS. To download the app, scroll to the bottom of the Postman website and click on the "Download the app" link. Your operating system will be detected automatically, and you'll be directed to the appropriate download page.

![The image shows a webpage for Postman, an API platform, featuring a sign-up section and information about its tools and features. It includes a screenshot of the Postman interface and descriptions of its API tools, workspaces, and governance features.](https://kodekloud.com/kk-media/image/upload/v1752882931/notes-assets/images/Postman-Essentials-Getting-Started-with-Postman/postman-api-platform-webpage-screenshot.jpg)

When you launch Postman, you'll be greeted by its interface.

> [!important]
> **Note**
>
> My Postman is set to dark mode, but you can switch themes by navigating to File > Settings > Themes. While signing in allows you to sync requests across devices, it is optional for this demonstration.

## Reviewing Our API Code

In the `index.js` file, the API endpoints are defined. We start with a simple GET endpoint at the root URL and another to retrieve a list of products:

```
app.use(cookieParser());
app.use(express.json());


app.get("/", (req, res) => {
    res.json({ status: "success" });
});


app.get("/products", async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json({ products });
    } catch (e) {
        res.status(500).json({ message: e });
    }
});
```

To verify that the API is running on localhost (port 4000), execute the following command in your terminal:

```
curl localhost:4000
```

You should see:

```
{"status":"success"}
```

This confirms that the API is operational. In this lesson, we will mimic these curl requests using Postman.

## Creating and Testing Requests in Postman

To create a new request, click the plus icon in Postman to open a new tab. Set the HTTP method to GET—matching our endpoint—and enter the URL (e.g., `http://localhost:4000/`). You can also set headers, input request data in the body, or configure authorization settings if necessary.

![The image shows the Postman application interface with a dropdown menu for selecting HTTP request methods, such as GET, POST, and DELETE. The interface also includes options for creating collections and entering request details.](https://kodekloud.com/kk-media/image/upload/v1752882932/notes-assets/images/Postman-Essentials-Getting-Started-with-Postman/postman-http-request-interface.jpg)

After setting up the request, click the "Send" button. The response pane will display the output, including the body:

```
{
  "status": "success"
}
```

Along with the response data, you can review the status code (e.g., 200 for success), response time (such as 5 milliseconds), and additional metrics like TCP session time and DNS lookup time.

An additional benefit of Postman is the ability to save your requests for future use. Click "Save," assign a request name (e.g., "API Test"), and add it to a collection. Collections are useful for grouping related API requests. For this demonstration, I created an "e-commerce" collection and stored the "API Test" request within it.

![The image shows a Postman interface where a request named "Create Products" is being saved to a collection called "ecommerce." The interface includes options to save or cancel the action.](https://kodekloud.com/kk-media/image/upload/v1752882933/notes-assets/images/Postman-Essentials-Getting-Started-with-Postman/postman-create-products-ecommerce.jpg)

### Testing the GET /products Endpoint

Now, test the GET request for `/products` to retrieve the list of products. Since no products exist initially, the response should be:

```
{
  "products": []
}
```

Save this request as "Get Products" in the e-commerce collection.

## Creating a Product

To add a product, send a POST request to the `/products` endpoint. The API expects three fields in the request body: `name`, `price`, and `category`. The relevant code snippet is:

```
app.post("/products", async (req, res) => {
  const { name, price, category } = req.body;
  try {
    const product = await Product.create({ name, price, category });
    res.status(201).json({ product });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});


app.patch("/products/:id", async (req, res) => {
  // code omitted
});
```

After starting your server, you might see console output like:

```
12 packages are looking for funding
run `npm fund` for details


found 0 vulnerabilities
C:\Users\sanje\Documents\demo\postman>curl localhost:4000
{"status":"success"}
C:\Users\sanje\Documents\demo\postman>
```

To create a product with Postman, set the method to POST and use the URL `http://localhost:4000/products`. In the Body tab, select "raw" and choose "JSON" as the format. Postman automatically sets the `Content-Type` header to `application/json`. Enter the following JSON data:

```
{
  "name": "TV",
  "price": 100,
  "category": "electronics"
}
```

Click "Send." The API should return a 201 status code along with the newly created product details, including an auto-generated `id`, `createdAt`, and `updatedAt` fields. Save this request as "Create Products" in the e-commerce collection.

![The image shows a Postman interface with a "Save Request" dialog open, prompting the user to create a collection to save an API request named "API Test."](https://kodekloud.com/kk-media/image/upload/v1752882934/notes-assets/images/Postman-Essentials-Getting-Started-with-Postman/postman-save-request-api-test.jpg)

### Testing the GET /products/:id Endpoint

To fetch a single product by its ID, review the following endpoint:

```
app.get("/products/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findOne({ where: { id } });
        if (!product) {
            return res
                .status(404)
                .json({ message: `Product with ${id} was not found` });
        }
        res.json(product);
    } catch (e) {
        res.status(500).json({ message: e });
    }
});
```

Create a GET request in Postman with the URL `http://localhost:4000/products/1` (assuming the product's ID is 1). The response should resemble:

```
{
  "product": {
    "id": 1,
    "name": "TV",
    "price": 100,
    "category": "electronics",
    "createdAt": "2023-04-14T04:44:20.537Z",
    "updatedAt": "2023-04-14T04:44:20.537Z"
  }
}
```

Save this request as "GET Single Product" in your collection.

## Updating and Deleting a Product

### Updating a Product

Below is the code to update a product:

```
app.patch("/products/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;


    try {
        const product = await Product.findOne({ where: { id } });


        if (!product) {
            return res
                .status(404)
                .json({ message: `Product with ${id} was not found` });
        }


        product.set(body);
        await product.save();
        res.json(product);
    } catch (e) {
        res.status(500).json({ message: e });
    }
});
```

To update a product via Postman, create a PATCH request with the URL `http://localhost:4000/products/{id}` (replace `{id}` with the actual product ID) and include the updated data in the raw JSON body. For example, to update the price:

```
{
  "price": 150
}
```

After clicking "Send," the product's price should be updated accordingly. Save this request as "Update Product."

### Deleting a Product

The deletion endpoint is defined as follows:

```
app.delete("/products/:id", async (req, res) => {
    const id = req.params.id;


    try {
        const product = await Product.destroy({
            where: {
                id,
            },
        });


        if (!product) {
            return res.status(404).json({ message: `Product with ${id} not found` });
        }


        res.status(204).send();
    } catch (e) {
        res.status(500).json({ message: e });
    }
});
```

To test deletion, create a DELETE request in Postman with the URL `http://localhost:4000/products/1` (or the corresponding product ID). A successful deletion will return a 204 status code with no content. You can verify the deletion by executing the GET request for products again and confirming that the product list is updated.

![The image shows a Postman interface with a collection of API requests related to an e-commerce application. The "Get Products" request is selected, displaying details like the request type, URL, and response status.](https://kodekloud.com/kk-media/image/upload/v1752882935/notes-assets/images/Postman-Essentials-Getting-Started-with-Postman/postman-ecommerce-api-requests.jpg)

## Conclusion

This lesson has walked you through the steps of using Postman to test various API endpoints for creating, retrieving, updating, and deleting products. By saving these requests within your organized "e-commerce" collection, you can easily re-run tests and continue API development with improved efficiency.

Happy testing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/postman-essentials/module/0a8a02c7-cab8-4bd9-886e-c7570885146f/lesson/07eb4fd1-4664-49db-b556-14c7a4315888)**
>
> Watch video content
