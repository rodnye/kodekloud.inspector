# Unauthorized Get Posts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Python-API-Development-with-FastAPI/Testing/Unauthorized-Get-Posts)

---

## Table of Contents

- Unauthorized Get Posts
  - Watch Video

---

## Content

Python API Development with FastAPI

Testing

# Unauthorized Get Posts

In this article, we explore scenarios where making an unauthorized GET request to retrieve posts from an API results in errors. Such issues typically arise when authentication credentials are missing, incorrect, or when the required permissions are not granted.

When the system cannot verify the client's identity, it may display an error message such as:

"Unable to fetch caption"

This error indicates that the caption for a post could not be retrieved due to authorization issues. To fix this problem, verify the following:

- Ensure that the correct API credentials (e.g., API key or token) are provided.
- Confirm that the proper authorization headers are included in your request.
- Check that your user account has the necessary permissions to access the resource.

> [!important]
> **Tip**
>
> Double-check your API gateway configuration to ensure that it correctly routes and validates authentication tokens.

By addressing these points, you can prevent unauthorized errors and guarantee smooth access to post details.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/python-api-development-with-fastapi/module/eed445e5-68aa-46b3-9922-0fdf2a57b8f1/lesson/20dc6fae-7a0b-41fe-8951-f7a41c75eee1)**
>
> Watch video content
