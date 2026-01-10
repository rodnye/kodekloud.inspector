# Authentication Authorization - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/API-Gateway/Authentication-Authorization)

---

## Table of Contents

- Authentication Authorization
  - Using IAM for Authentication and Authorization
  - Using a Lambda Authorizer
  - Using Resource Policies
  - Using Amazon Cognito
  - Comparison of Authentication and Authorization Methods
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

API Gateway

# Authentication Authorization

In this lesson, we explore how authentication and authorization work with API Gateway. API Gateway integrates with a variety of authentication mechanisms—such as AWS IAM, Lambda authorizers, resource policies, and Amazon Cognito—to ensure that only properly authenticated and authorized requests are processed. Understanding these methods helps you secure your APIs according to your application's requirements.

## Using IAM for Authentication and Authorization

When an API endpoint is secured with IAM, the client includes a Signature Version 4 header with its request. API Gateway extracts the signature, then communicates with IAM to verify that the user has the necessary permissions to perform the requested action. Once IAM confirms the authorization, the request is forwarded to the backend service, and the response is returned to the user.

## Using a Lambda Authorizer

Another effective approach to secure API Gateway is by implementing a Lambda authorizer. In this scenario, a user logs in via a third-party identity provider (IDP) (e.g., Google) and obtains a bearer token. This token is then passed in the HTTP headers to API Gateway. The gateway forwards the token to the Lambda authorizer, which validates it with the third-party authentication system. After successful validation, the Lambda function generates an IAM policy that governs the user's access permissions.

![The image is a diagram illustrating an API Gateway with a Lambda Authorizer, showing the interaction between a user, OAuth provider, and the API Gateway for token verification.](https://kodekloud.com/kk-media/image/upload/v1752857856/notes-assets/images/AWS-Certified-Developer-Associate-Authentication-Authorization/api-gateway-lambda-authorizer-diagram.jpg)

If the generated IAM policy permits access, the request is routed to the backend service, and the response is relayed back to the user. A key benefit of using a Lambda authorizer is that API Gateway caches the IAM policy, reducing the need for repeated token validations on consecutive requests.

![The image is a flowchart illustrating an API Gateway with a Lambda Authorizer, showing interactions between a user, OAuth provider, API Gateway, Lambda function, and DynamoDB.](https://kodekloud.com/kk-media/image/upload/v1752857857/notes-assets/images/AWS-Certified-Developer-Associate-Authentication-Authorization/api-gateway-lambda-authorizer-flowchart.jpg)

## Using Resource Policies

API Gateway also supports the use of resource policies, which function similarly to those used by other AWS services. Resource policies are especially valuable when you need to grant API access across different AWS accounts or to unauthenticated users.

Below is an example of a JSON resource policy that grants public access while denying requests from IP addresses outside a specific range:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "execute-api:Invoke",
      "Resource": "arn:aws:execute-api:region:account-id:*"
    },
    {
      "Effect": "Deny",
      "Principal": "*",
      "Action": "execute-api:Invoke",
      "Resource": "arn:aws:execute-api:region:account-id:*",
      "Condition": {
        "NotIpAddress": {
          "aws:SourceIp": "123.4.5.6/24"
        }
      }
    }
  ]
}
```

> [!important]
> **Note**
>
> Resource policies provide additional flexibility beyond IAM by securing access for both authenticated and unauthenticated users, allowing for granular control over API access.

## Using Amazon Cognito

Another robust approach for managing authentication and authorization involves Amazon Cognito. In this workflow, a user logs into an application integrated with Cognito. When authentication is successful, Cognito returns an ID token to the client application. The client then uses this token in HTTP headers when making a request to API Gateway. API Gateway validates the token before passing the request to the backend service.

![The image is a flowchart illustrating the interaction between a user, an app, an API Gateway, and Cognito for verification. It shows the process of user authentication using API Gateway with Cognito.](https://kodekloud.com/kk-media/image/upload/v1752857858/notes-assets/images/AWS-Certified-Developer-Associate-Authentication-Authorization/user-app-api-gateway-cognito-flowchart.jpg)

## Comparison of Authentication and Authorization Methods

Below is a table that highlights the key differences and use cases of the discussed methods:

| Authentication Method | Use Case                                                | Key Benefit                                                                              |
| --------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| IAM                   | Securing endpoints with AWS credentials                 | Tight integration with AWS services and permissions management                           |
| Lambda Authorizer     | Token-based authentication using external IDPs          | Flexibility to integrate with third-party identity providers and caching of IAM policies |
| Resource Policies     | Cross-account or unauthenticated access control         | Granular control over API access based on custom IP ranges and conditions                |
| Amazon Cognito        | User authentication with serverless identity management | Simplified user management and seamless integration with mobile and web applications     |

## Summary

API Gateway offers multiple methods to secure your APIs:

- **IAM for Authentication and Authorization:** Uses AWS credentials and Signature Version 4 for secure access.
- **Lambda Authorizers:** Validates bearer tokens provided by external identity providers and caches IAM policies.
- **Resource Policies:** Provides granular access control, especially useful for cross-account access or unauthenticated scenarios.
- **Amazon Cognito:** Manages user authentication with an ID token flow for client applications.

Choosing the right method depends on your application's requirements, the identity provider in use, and the level of access control required. By leveraging these strategies, you can ensure that your APIs remain secure, efficient, and reliable.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/628f3688-9475-4368-90bb-89dc572f86d0/lesson/4f55213b-2b64-4b43-a68a-ce0e8bf5e58a)**
>
> Watch video content
