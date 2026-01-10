# JWT tokens in Postman - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Postman-Essentials/Postman-Essentials/JWT-tokens-in-Postman)

---

## Table of Contents

- JWT tokens in Postman
  - Signing Up and Logging In
  - Authenticating Requests with JWT
  - Setting Up Collection-Level Authorization
  - Automating Token Management
  - Additional Resources
  - Watch Video

---

## Content

Postman Essentials

Postman Essentials

# JWT tokens in Postman

> [!important]
> **Note**
>
> Before proceeding, please note that restarting your server will clear all previously stored data. This means you must re-register (sign up) and log in again to obtain a new token.

## Signing Up and Logging In

When you sign up, you send a JSON payload like the following:

```
{
  "email": "[email]",
  "password": "[password]"
}
```

The server will respond with a success status:

```
{
  "status": "success"
}
```

After signing up or logging in, you receive a JSON Web Token (JWT). For example, a sign-up request might look like this:

```
POST localhost:4000/signup
{
  "email": "[email]",
  "password": "[password]"
}
```

And the server’s response will include the token:

```
{
  "token": "eyJhbc6iIDU1Ni1rS6C1IpXvC39.eyJpZCOi6RlniC3RAZ2hlaWwvY29tYyLC1HAoJE2D0BENTIXkJ39.#K_1.CQiFtvom1c3D4aseyYnql4RNZ2m8kBQMwg0"
}
```

This token is essential for authenticating further API requests.

## Authenticating Requests with JWT

To create a product or access any protected endpoint, your request must include a valid token. If you try to access these endpoints without the proper token, you will receive an unauthorized access response:

```
{
  "message": "Unauthorized to access"
}
```

After logging in and obtaining your token, include it in your request headers as a Bearer token. There are two common methods to do this in Postman:

1.  **Manually Adding the Token in Headers:**  
    Navigate to the request's **Headers** tab, and add an `Authorization` key with this value:

    ```
    Bearer [Your_Token_Here]
    ```

    Ensure “Bearer” starts with a capital “B”, followed by a space and then your token.

2.  **Using Postman’s Authorization Tab:**  
    Switch to the **Authorization** tab for the request, select **Bearer Token** from the drop-down menu, and paste your token into the token field. Postman will automatically add the appropriate header.

After authenticating your request, you can create a product. For example, the sample product data might look as follows:

```
{
  "product": {
    "id": "1",
    "name": "TV",
    "price": 100,
    "category": "electronics",
    "updatedAt": "2023-04-14T04:56:08.602Z",
    "createdAt": "2023-04-14T04:50:08.602Z"
  }
}
```

Successful authentication ensures that you can create products without encountering unauthorized error messages.

## Setting Up Collection-Level Authorization

When managing multiple endpoints that require token authentication (e.g., creating, deleting, or updating products), manually adding the token to each request may be inefficient. Instead, you can set up collection-level authorization in Postman:

1.  Select your collection (for example, "e-commerce").
2.  Set the collection’s Authorization type to **Bearer Token** and paste your token.
3.  In each request under the collection, choose **Inherit auth from parent** in the Authorization settings.

For instance, consider a request for updating a product. The request body may be:

```
{
  "name": "TV123",
  "price": 100,
  "category": "electronics"
}
```

A successful update will return a response similar to this:

```
{
  "product": {
    "id": 2,
    "name": "TV123",
    "price": 100,
    "category": "electronics",
    "updatedAt": "2023-04-14T15:05:41.104Z",
    "createdAt": "2023-04-14T15:05:41.104Z"
  }
}
```

By configuring the token at the collection level, you can streamline your workflow and eliminate repetitive manual token entries.

## Automating Token Management

Even with collection-level authorization, you must log in and update the token initially. To further automate token management, Postman allows the use of environment variables and test scripts. With this approach, your token is updated dynamically when you log in, eliminating the need to manually copy and paste the token for each new session.

---

In this guide, we have covered how to effectively use JWT tokens in Postman to authenticate and secure your API requests. This process not only bolsters the security of your endpoints but also optimizes your testing and development workflows.

## Additional Resources

- [Postman Documentation](https://learning.postman.com/docs/getting-started/introduction/)
- [JWT Introduction](https://jwt.io/introduction)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/postman-essentials/module/0a8a02c7-cab8-4bd9-886e-c7570885146f/lesson/fae996b8-b0dc-43bf-a768-38eacb54dffb)**
>
> Watch video content
