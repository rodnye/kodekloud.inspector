# Environments - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Postman-Essentials/Postman-Essentials/Environments)

---

## Table of Contents

- Environments
  - Using Environment Variables
  - Configuring the Base URL Variable
  - Switching Environments
  - Conclusion
  - Watch Video

---

## Content

Postman Essentials

Postman Essentials

# Environments

In this guide, we explore how to manage different environments—development and production—using environment variables. This approach simplifies testing by eliminating the need to manually change URLs every time you switch between servers.

## Using Environment Variables

Suppose you have deployed your API on a production server running on IP address 192.168.1.42 at port 4000, while your development server runs on localhost. For example, executing a cURL command against the production server:

```
curl 192.168.1.42:4000
```

returns:

```
{"status": "success"}
```

Calling the same endpoint on the development server using localhost returns an identical successful response.

Below is a sample implementation of a sign-up endpoint in a Node.js application:

```
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;


  try {
    const hashpassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      email,
      password: hashpassword,
    });
    res.status(201).json({ message: "User created successfully." });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});
```

You might currently be testing your production server by manually updating URLs in your code and HTTP requests—from `localhost` to `192.168.1.42` and vice versa:

```
curl 192.168.1.42:4000
{"status": "success"}


curl localhost:4000
{"status": "success"}
```

> [!important]
> **Tip**
>
> Instead of manually switching URLs, you can use an environment variable to store your base URL, making your workflow more efficient.

## Configuring the Base URL Variable

Instead of hardcoding URLs, create an environment variable (for example, "base URL") that represents your server's base address. In your development environment, set the base URL to `localhost:4000` and save the configuration. This ensures that all API requests reference the same variable.

![The image shows a Postman interface with environment variables set for a "Dev" environment, including email, password, token, and base URL. The sidebar displays options like Collections, APIs, and Environments.](https://kodekloud.com/kk-media/image/upload/v1752882929/notes-assets/images/Postman-Essentials-Environments/postman-dev-environment-variables.jpg)

Once the base URL is configured, your GET request for products will automatically use the environment's value. For instance, here's a sample JSON response when fetching products:

```
{
    "products": [
        {
            "id": 1,
            "name": "TV",
            "price": 100,
            "category": "electronics",
            "createdAt": "2023-04-14T05:03:59.933Z",
            "updatedAt": "2023-04-14T05:03:59.933Z"
        },
        {
            "id": 2,
            "name": "TV123",
            "price": 100,
            "category": "electronics",
            "createdAt": "2023-04-14T05:41:41.184Z",
            "updatedAt": "2023-04-14T05:41:41.184Z"
        },
        {
            "id": 3,
            "name": "TV234",
            "price": 100,
            "category": "electronics",
            "createdAt": "2023-04-14T05:49:00.371Z",
            "updatedAt": "2023-04-14T05:49:00.371Z"
        }
    ]
}
```

By switching the environment configuration, you can easily toggle between development and production. For instance, for production, set the "base URL" variable to `192.168.1.42:4000` and save it. When you run the same GET request, your REST API client will use the production URL.

![The image shows a Postman interface with collections for "ecommerce" and "Auth" APIs, displaying various HTTP requests like GET, POST, and PATCH. The environment variables section is visible, showing a variable named "baseurl" with an IP address value.](https://kodekloud.com/kk-media/image/upload/v1752882930/notes-assets/images/Postman-Essentials-Environments/postman-ecommerce-auth-api-requests.jpg)

## Switching Environments

When working in the development environment (with the base URL set to localhost), sending a GET request returns a full list of products. Changing the environment to production will use the production base URL and might return a different product response, such as:

```
{
  "products": [
    {
      "id": 1,
      "name": "TV",
      "price": 100,
      "category": "electronics",
      "createdAt": "2023-04-14T05:03:59.933Z",
      "updatedAt": "2023-04-14T05:03:59.933Z"
    },
    {
      "id": 2,
      "name": "TV123",
      "price": 100,
      "category": "electronics",
      "createdAt": "2023-04-14T05:41:184Z",
      "updatedAt": "2023-04-14T05:41:184Z"
    },
    {
      "id": 3,
      "name": "TV12334",
      "price": 200,
      "category": "electronics",
      "createdAt": "2023-04-14T05:47:417Z",
      "updatedAt": "2023-04-14T05:47:417Z"
    }
  ]
}
```

If an endpoint returns no products, it could indicate that the production server currently has no products or that different query parameters are in effect. You can append query parameters to filter results. For example, to filter products by type or price:

```
GET {{baseurl}}/products?filter=tv&price=12
```

This might return:

```
{
  "products": []
}
```

You can either enter these parameters directly in the URL or specify them in the query parameters section of your API client.

> [!important]
> **Best Practice**
>
> Using environment variables not only simplifies switching between different servers but also minimizes the risk of errors from manually updating URLs. Postman automatically replaces the variable with the corresponding value from the selected environment.

## Conclusion

By leveraging environment variables, you can streamline your workflow and avoid tedious manual updates when switching between development and production environments. This method enhances efficiency and reduces errors, making it an essential practice for API development and testing.

For further reading on managing environments and testing APIs, check out the [Postman Documentation](https://learning.postman.com/docs/getting-started/introduction/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/postman-essentials/module/0a8a02c7-cab8-4bd9-886e-c7570885146f/lesson/e038a28d-5111-4bf3-bcd7-6c2976f211f3)**
>
> Watch video content
