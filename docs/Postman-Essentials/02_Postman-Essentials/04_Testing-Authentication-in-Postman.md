# Testing Authentication in Postman - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Postman-Essentials/Postman-Essentials/Testing-Authentication-in-Postman)

---

## Table of Contents

- Testing Authentication in Postman
  - Starting the Server and Testing Additional Endpoints
  - Adding User Authentication Endpoints
  - Example JSON Responses
  - Testing Authentication Endpoints with Postman
  - Organizing Your Postman Collection
  - Watch Video
    - Signup Endpoint
    - Login Endpoint
    - Signup Request
    - Login Request

---

## Content

Postman Essentials

Postman Essentials

# Testing Authentication in Postman

In this lesson, you'll learn how to test authentication endpoints using Postman. Follow these steps to run the server, add authentication endpoints, and test them using Postman.

## Starting the Server and Testing Additional Endpoints

Stop your current server with Ctrl+C. Then, open the "lesson two" index.js file and run the start command for lesson two. In this lesson, additional endpoints have been introduced. For example, consider the following DELETE endpoint for products:

```
app.delete("/products/:id", async (req, res) => {
    const id = req.params.id;
});
```

Below is a sample of the server log output when running this command:

```
Executing (default): DROP TABLE IF EXISTS `Products` ;
Executing (default): PRAGMA foreign_keys = OFF
Executing (default): DROP TABLE IF EXISTS `Products`;
Executing (default): DROP TABLE IF EXISTS `Users`;
Executing (default): PRAGMA foreign_keys = ON
Executing (default): DROP TABLE IF EXISTS `Products` ;
Executing (default): CREATE TABLE IF NOT EXISTS `Products` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` VARCHAR(255) NOT NULL UNIQUE, `price` FLOAT, `category` TEXT NOT NULL, createdAt` DATETIME NOT NULL, updatedAt` DATETIME NOT NULL);
Executing (default): PRAGMA INDEX_LIST(`Products`);
Executing (default): DROP TABLE IF EXISTS `Users` ;
Executing (default): CREATE TABLE IF NOT EXISTS `Users` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `email` VARCHAR(255) NOT NULL UNIQUE, createdAt` DATETIME NOT NULL, updatedAt` DATETIME NOT NULL);
Executing (default): PRAGMA INDEX_LIST(`Users`);
Connection has been established successfully.
listening on port 4000
0
```

## Adding User Authentication Endpoints

Now, add endpoints for user authentication, including signup and login functionalities.

Scroll to the bottom of the "lesson two" index.js file to see an example of error handling:

```
res.status(500).json({ message: e });
```

### Signup Endpoint

Add the following code for the signup endpoint:

```
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;


    try {
        const hashpassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            email,
            password: hashpassword,
        });
        // Optionally, send a response with the new user data
    } catch (e) {
        res.status(500).json({ message: e });
    }
});
```

When you run this endpoint, the server logs output similar SQL commands as before:

```
Executing (default): DROP TABLE IF EXISTS `Products` ;
Executing (default): PRAGMA foreign_keys = OFF
Executing (default): DROP TABLE IF EXISTS `Products`;
Executing (default): DROP TABLE IF EXISTS `Users`;
Executing (default): PRAGMA foreign_keys = ON
Executing (default): DROP TABLE IF EXISTS `Products`;
Executing (default): CREATE TABLE IF NOT EXISTS `Products` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` VARCHAR(255) NOT NULL UNIQUE, `price` FLOAT, `category` TEXT NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
Executing (default): DROP TABLE IF EXISTS `Users`;
Executing (default): CREATE TABLE IF NOT EXISTS `Users` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `email` VARCHAR(255) NOT NULL UNIQUE, `password` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
Executing (default): PRAGMA INDEX_LIST(`Products`);
Executing (default): PRAGMA INDEX_LIST(`Users`);
Connection has been established successfully.
```

There are two authentication endpoints now:

1.  **POST /signup**: Creates a new user.
2.  **POST /login**: Authenticates an existing user by verifying the email and password.

### Login Endpoint

Below is the code for the login endpoint:

```
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({
                message: "incorrect username or password",
            });
        }
        const isCorrect = await bcrypt.compare(password, user.password);
        // Continue with login, setting a cookie if successful
    } catch (error) {
        // Handle error here
        res.status(500).json({ message: error });
    }
});
```

The server log for the login endpoint execution is as follows:

```
Executing (default): DROP TABLE IF EXISTS `Products` ;
Executing (default): PRAGMA foreign_keys = OFF
Executing (default): DROP TABLE IF EXISTS `Products`;
Executing (default): DROP TABLE IF EXISTS `Users`;
Executing (default): PRAGMA foreign_keys = 0
Executing (default): DROP TABLE IF EXISTS `Products`;
Executing (default): CREATE TABLE IF NOT EXISTS `Products` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` VARCHAR(255) NOT NULL UNIQUE, `price` FLOAT, `category` TEXT NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
Executing (default): PRAGMA INDEX_LIST(`Products`)
Executing (default): DROP TABLE IF EXISTS `Users`;
Executing (default): CREATE TABLE IF NOT EXISTS `Users` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `email` VARCHAR(255) NOT NULL UNIQUE, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
Executing (default): PRAGMA INDEX_LIST(`Users`)
Connection has been established successfully.
```

## Example JSON Responses

For demonstration purposes, here is an example JSON response when retrieving a product:

```
{
  "product": {
    "id": 2,
    "name": "TV",
    "price": 9999,
    "category": "electronics",
    "createdAt": "2023-04-14T04:49:01.951Z",
    "updatedAt": "2023-04-14T04:49:51.574Z"
  }
}
```

## Testing Authentication Endpoints with Postman

### Signup Request

To test the authentication process using Postman, create a new POST request for signup on localhost. Configure the request body as raw JSON similar to the sample below:

```
{
  "email": "test@gmail.com",
  "password": "yourPassword"
}
```

When you send the signup request, the API responds with user information similar to this:

```
{
  "user": {
    "id": 1,
    "email": "test@gmail.com",
    "password": "$2b$12$S0vD0WgEbDNuUfRMJ0UsaVgPsJbkIkt/XXAiuwfuVJ5ERBKl6mmHC",
    "updatedAt": "2023-04-14T04:52:17.962Z",
    "createdAt": "2023-04-14T04:52:17.962Z"
  }
}
```

### Login Request

Next, create a POST request for login using the same email and password:

```
{
  "email": "test@gmail.com",
  "password": "password"
}
```

A successful login returns a success status and sets a cookie for the session:

```
{
  "status": "success"
}
```

After logging in, navigate to the cookie management section in Postman by clicking the "Cookies" button. This section displays session cookie details such as the name, domain, path, and value. Deleting the cookie simulates a logged-out state. For example, if you try to create a new product without a cookie, the API returns:

```
{
  "message": "Unauthorized to access"
}
```

Once you log in again and obtain a new cookie, you can perform create, delete, or update operations on products. Note that retrieving a product list does not require authentication. An example response for fetching a product is:

```
{
  "product": {
    "id": 1,
    "name": "TV",
    "price": 100,
    "category": "electronics",
    "createdAt": "2023-04-14T04:56:08.602Z",
    "updatedAt": "2023-04-14T04:56:08.602Z"
  }
}
```

## Organizing Your Postman Collection

To keep your API requests organized:

- Create a folder named **products** for all product-related requests.
- Create another folder named **auth** for authentication endpoints.
- You may leave miscellaneous test requests outside these folders if desired.

Below is an image of the Postman interface showing the structure of the ecommerce API requests for products:

![The image shows a Postman interface with an "ecommerce" collection containing various API requests like "Get Products" and "Create Products." The authorization tab is open, displaying options for setting up request authentication.](https://kodekloud.com/kk-media/image/upload/v1752882941/notes-assets/images/Postman-Essentials-Testing-Authentication-in-Postman/postman-ecommerce-api-requests.jpg)

After organizing your requests, resend the login request to verify the creation of the session cookie. Postman's cookie management feature allows you to manually add, view, or delete cookies, which helps simulate different testing scenarios. For instance, if you delete the cookie, trying to create a product returns an "Unauthorized" error. Logging in again refreshes the cookie, and product operations can then proceed seamlessly.

The following image illustrates the Postman interface with the authentication requests and the cookie details for a successful login:

![The image shows a Postman interface with a collection of API requests related to "ecommerce" and "Auth," specifically highlighting a POST request to "localhost:4000/login." The response includes a cookie named "connect.sid" with details about its domain, path, and expiration.](https://kodekloud.com/kk-media/image/upload/v1752882942/notes-assets/images/Postman-Essentials-Testing-Authentication-in-Postman/postman-ecommerce-auth-api-requests.jpg)

> [!important]
> **Note**
>
> With these configurations, your API now requires authentication (via a valid cookie) to create, update, or delete a product, while retrieving product lists remains open to all users.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/postman-essentials/module/0a8a02c7-cab8-4bd9-886e-c7570885146f/lesson/15e971c8-b56f-4894-829e-02e8b8dfc5c8)**
>
> Watch video content
