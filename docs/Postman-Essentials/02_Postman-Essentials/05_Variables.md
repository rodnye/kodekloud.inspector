# Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Postman-Essentials/Postman-Essentials/Variables)

---

## Table of Contents

- Variables
  - What Are Variables?
  - Setting Up an Environment
  - Referencing Variables in Requests
  - Login Request Example
  - Generating Client Code with Postman
  - Transitioning to JSON Web Tokens (JWT)
  - Watch Video
    - Sample Code: API Response

---

## Content

Postman Essentials

Postman Essentials

# Variables

In this lesson, we'll explore how to use variables in Postman to make your API testing more dynamic and flexible. By using variables, you avoid hardcoding sensitive or frequently changing values—such as emails and passwords—directly in your API requests.

## What Are Variables?

Variables in Postman enable you to store key-value pairs that can be reused across requests. This means you can have a single source of truth for values like email addresses and passwords, reducing manual effort when updating test data.

### Sample Code: API Response

Consider the following code snippet representing a sample API response:

```
{
  "products": []
}
```

## Setting Up an Environment

Imagine you're testing a login or signup API. Instead of embedding fixed values in your requests, you can save them as variables within an environment. For example, you might create a "dev" environment in Postman and set variables like this:

```
{
  "email": "test@gmail.com",
  "password": "password"
}
```

When your API returns a response, it might look something like this:

```
{
  "user": {
    "id": 1,
    "email": "test@gmail.com",
    "password": "$2a$10$2S2oB0vMagbEkDnaUfRM3u0sVaP5j8kt/XXXXwFuVJSERBkl6mmWC",
    "updatedAt": "2023-04-14T04:52:17.967Z",
    "createdAt": "2023-04-14T04:52:17.967Z"
  }
}
```

> [!important]
> **Note**
>
> After setting your variables in the "dev" environment, remember to save your changes. When testing the sign-up and login processes, use the variable references rather than hardcoded values.

## Referencing Variables in Requests

To reference variables in your requests, Postman uses the double curly braces syntax: `{{variableName}}`. For instance, update your request body as follows:

```
{
  "user": {
    "id": 1,
    "email": "{{email}}",
    "password": "$2a$10$obV0dAgbEkDnaUlfRN3U0o5aVpSjktx/XXAViwFuVJ5ERHkL6mmWC",
    "updatedAt": "2023-04-14T04:52:17.962Z",
    "createdAt": "2023-04-14T04:52:17.962Z"
  }
}
```

Similarly, replace the password field with its variable reference by using `{{password}}`. Ensure that you have selected the correct environment (such as "dev") from the dropdown menu prior to sending a request. If not, Postman will not resolve these variables, and you might encounter errors like incorrect email and password messages.

## Login Request Example

Once the environment is properly set, a typical login request using variables might look like this:

```
{
  "email": "{{email}}",
  "password": "{{password}}"
}
```

And the API might respond with an error message if the credentials do not match:

```
{
  "message": "incorrect username or password"
}
```

Testing with variables allows you to easily validate that your API handles dynamic inputs correctly and returns the expected status updates.

## Generating Client Code with Postman

One of Postman's powerful features is its ability to generate client code for API requests. When you open a request, click the code icon (or select "Code") on the right-hand side to display a variety of code snippets—for example, a curl command for the current request.

If you wish to see how the API call is implemented in another language, such as JavaScript using the fetch API, simply copy and paste the generated code. Here's an example:

```
var myHeaders = new Headers();
myHeaders.append("Cookie", "connect.sid=s%3AN3cYacsskyU8JuDOnpV1LWhX0W.pinNstEVnByodB4HSrstUsTASl5XIt2wCoZgudFk");


var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};


fetch("localhost:4000/products", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

![The image shows a Postman interface with environment variables set for "email" and "password" in the "Dev" environment. The sidebar includes options like Collections, APIs, and Environments.](https://kodekloud.com/kk-media/image/upload/v1752882943/notes-assets/images/Postman-Essentials-Variables/postman-dev-environment-variables.jpg)

## Transitioning to JSON Web Tokens (JWT)

After mastering environment variables, the next topic in our teaching series is JSON Web Tokens (JWT). JWT provides a token-based approach for API authentication, which modernizes the process compared to traditional sessions and cookies.

> [!important]
> **Note**
>
> Adopting JWT for API authentication enhances security by limiting the lifespan of each token and reducing the risks associated with static session management.

Happy testing, and keep exploring the dynamic capabilities of Postman for smarter API development and validation!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/postman-essentials/module/0a8a02c7-cab8-4bd9-886e-c7570885146f/lesson/540ed626-3222-465e-ab39-cdb42818042f)**
>
> Watch video content
