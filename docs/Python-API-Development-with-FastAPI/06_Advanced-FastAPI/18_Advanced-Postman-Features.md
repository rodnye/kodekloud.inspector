# Advanced Postman Features - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Advanced-FastAPI/Advanced-Postman-Features)

---

## Table of Contents

- Advanced Postman Features
  - Using Environments
  - Automating Access Token Management
  - Watch Video
    - Step 1: Obtain the Access Token
    - Step 2: Save the Token as an Environment Variable
    - Step 3: Use the Environment Variable in Requests
    - Step 4: Apply to Other Endpoints

---

## Content

Python API Development with FastAPI

Advanced FastAPI

# Advanced Postman Features

In this lesson, we explore several advanced Postman techniques that enhance your API testing workflow by leveraging Postman environments and automating access token management.

---

## Using Environments

Postman environments enable you to define a set of variables that represent different configurations, such as development, production, or testing. Instead of hardcoding values (like IP addresses or ports) in your requests, you can reference environment variables to ensure a smooth transition between different setups.

For instance, during development, your API endpoints might be configured using the IP address 127.0.0.1 on port 8000. However, when deploying your application to a public server, these values will change (possibly to include HTTPS). Without environments, updating every request becomes a tedious process.

By using an environment variable—say, one named URL—you can store the base URL for your API. In your API requests, simply reference this variable using the double curly braces syntax (e.g., {{URL}}). Postman automatically replaces it with the correct value based on the selected environment.

![The image shows a Postman interface with a GET request to a local server, displaying an authorization error message: "Could not validate credentials." The left panel lists various API endpoints related to a FastAPI course.](https://kodekloud.com/kk-media/image/upload/v1752883316/notes-assets/images/Python-API-Development-with-FastAPI-Advanced-Postman-Features/postman-get-request-auth-error-fastapi.jpg)

To set up an environment:

1.  Open the Environments tab in Postman.
2.  Create a new environment (for example, name it "dev").
3.  Define a variable named URL with both the initial and current values set to your development server’s address (e.g., http://127.0.0.1:8000).
4.  Save the environment.

After creating the variable, select the “dev” environment from the Postman dropdown. Update your API requests to use `{{URL}}` instead of hardcoding the URL. When Postman successfully resolves the variable, it appears highlighted in orange. If it appears red, verify the variable name for accuracy.

![The image shows a split-screen view of Visual Studio Code and Postman. The VS Code window displays a Python project structure, while the Postman window shows an environment setup for a FastAPI development server.](https://kodekloud.com/kk-media/image/upload/v1752883317/notes-assets/images/Python-API-Development-with-FastAPI-Advanced-Postman-Features/vs-code-postman-fastapi-setup.jpg)

---

## Automating Access Token Management

When your API requires authentication, manually retrieving and updating access tokens can slow down your testing process. Postman’s scripting capabilities allow you to automate the token management process, ensuring that every request uses the most recent access token.

### Step 1: Obtain the Access Token

Start by sending a request to your "login user" endpoint to retrieve an access token. The response might resemble the following:

```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0NTY3ODkwLCJ... ",
  "token_type": "bearer"
}
```

### Step 2: Save the Token as an Environment Variable

Navigate to the Tests tab of your login request, and add the following script to automatically store the access token as an environment variable named JWT:

```
pm.environment.set("JWT", pm.response.json().access_token);
```

This script extracts the access token from the response and saves it under the key JWT in your current environment. You can now reference `{{JWT}}` in subsequent requests.

### Step 3: Use the Environment Variable in Requests

For example, when creating a post, substitute any hardcoded tokens with `{{JWT}}`. Your payload might look like this:

```
{
  "title": "top beaches in florida",
  "content": "something something beaches",
  "published": true,
  "id": 44,
  "created_at": "2021-08-28T20:30:10.589011-04:00"
}
```

When this request is sent, Postman replaces `{{JWT}}` in the authorization header with the most up-to-date access token. You can confirm this by verifying that the JWT value changes after each login.

![The image shows the Postman application interface with a collection of API requests related to a "fastapi-course." The "Create Post" request is selected, displaying authorization details and a JSON response in the body section.](https://kodekloud.com/kk-media/image/upload/v1752883318/notes-assets/images/Python-API-Development-with-FastAPI-Advanced-Postman-Features/postman-fastapi-course-api-requests.jpg)

### Step 4: Apply to Other Endpoints

Repeat this process for any endpoint that requires authentication. Whether you are retrieving, updating, or deleting posts, ensure that you reference the JWT environment variable rather than hardcoding credentials.

> [!important]
> **Tip**
>
> By automating token management, you not only streamline your testing process but also reduce the risk of errors when switching environments.

---

Leveraging Postman's environment variables and scripting capabilities can significantly simplify your API testing workflow, especially in dynamic systems where configuration settings frequently change. Carefully verify that all variable names match between your test scripts and API requests to avoid any issues.

Happy testing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/ed782f8c-495c-4ff8-8703-c9ab0ab04a4d/lesson/a4f3abce-918f-43b5-b7d9-c98e01b306da)**
>
> Watch video content
