# Python Question 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/Programming/Python-Question-1)

---

## Table of Contents

- Python Question 1
  - Using the Requests Module for API Testing
  - Additional Considerations
  - Watch Video

---

## Content

DevOps Interview Preparation Course

Programming

# Python Question 1

In this article, we will explore how to perform simple API testing using Python. We'll focus on using the popular requests module to verify if an API endpoint is operational by checking its HTTP status code.

## Using the Requests Module for API Testing

The recommended module for this task is the [requests](https://docs.python-requests.org/) module. It allows you to send an HTTP GET request to an API endpoint and retrieve its status code. If the returned status code is 200, it indicates that the API endpoint is functioning properly. Any other status code suggests that there might be an issue with the endpoint.

Below is an example demonstrating the basic usage:

```
import requests

website = "http://example.com/api"  # Replace with your API endpoint
status_code = requests.get(website).status_code
print(f"Status Code: {status_code}")

# Status code 200 means the API endpoint is working fine.
# Any other value indicates a problem with the API.
```

This code snippet sends a GET request to the specified API endpoint, retrieves the HTTP status code, and prints it to the console.

> [!important]
> **Note**
>
> In an interview or practical scenario, you can explain that a status code of 200 confirms the API is operating normally. Conversely, any other code signals potential issues that may need further investigation.

## Additional Considerations

If you are proficient in another programming language, such as Java or Node.js, you can adapt this approach using the corresponding HTTP library available in that language. The core idea remains consistent across languages: perform an HTTP GET request and validate the status code to ensure the API endpoint's availability.

This method provides a simple and effective way to write test cases for API endpoints, making it an essential technique in your DevOps or development workflow.

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/5e7996c8-ac3e-49b6-bfce-717b5a2ff2d3/lesson/22caa145-44c3-4127-bdd4-190e10a07a13)**
>
> Watch video content
