# Authentication Authorization Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/API-Gateway/Authentication-Authorization-Demo)

---

## Table of Contents

- Authentication Authorization Demo
  - Configuring Method-Level Authorization
  - Setting Up a Lambda Authorizer
  - Testing the Authorization
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

API Gateway

# Authentication Authorization Demo

In this lesson, you will learn how to configure authentication and authorization for your API Gateway using various methods. We'll walk through setting up method-level authorization with AWS IAM and resource policies, as well as implementing a custom Lambda authorizer.

![The image shows the AWS API Gateway console with a list of four APIs named "ecommerce," "library," "taskmanager," and "taskmanager2," all using the REST protocol. A green notification at the top indicates a successful deletion of an authorizer.](https://kodekloud.com/kk-media/image/upload/v1752857850/notes-assets/images/AWS-Certified-Developer-Associate-Authentication-Authorization-Demo/aws-api-gateway-apis-list.jpg)

## Configuring Method-Level Authorization

To enable authorization for a specific method on your API Gateway, follow these steps:

1.  Select the API from the AWS API Gateway console.
2.  Choose the method you wish to modify.
3.  Click **Edit** under the method request.

In the authorization section, you can select one of the available options. By default, AWS IAM is chosen, which means IAM handles all authorization and integrates seamlessly with other AWS services.

Another approach to controlling API access involves using resource policies. In the resource policies section, click **Create policy** to define a policy document similar to those used with other AWS services like S3 or Lambda. For example, to allow access only from specific AWS accounts, you could define a policy like this:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": [
          "arn:aws:iam::{{otherAWSAccountID}}:root",
          "arn:aws:iam::{{otherAWSAccountID}}:user/{{otherAWSUserName}}",
          "arn:aws:iam::{{otherAWSAccountID}}:role/{{otherAWSRoleName}}"
        ]
      },
      "Action": "execute-api:Invoke",
      "Resource": [
        "execute-api:{{stageNameOrWildcard}}/{{httpVerbOrWildcard}}/{{resourcePathOrWildcard}}"
      ]
    }
  ]
}
```

To restrict access based on IP addresses or IP ranges, use a policy similar to this:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Principal": "*",
      "Action": "execute-api:Invoke",
      "Resource": "execute-api:{{stageNameOrWildcard}}{{httpVerbOrWildcard}}{{resourcePathOrWildcard}}",
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": ["{{sourceIpOrCIDRBlock}}", "{{sourceIpOrCIDRBlock}}"]
        }
      }
    },
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "execute-api:Invoke",
      "Resource": "execute-api:{{stageNameOrWildcard}}{{httpVerbOrWildcard}}{{resourcePathOrWildcard}}"
    }
  ]
}
```

## Setting Up a Lambda Authorizer

A Lambda authorizer allows you to implement custom authorization logic in a Lambda function. When configured, API Gateway passes the incoming request's authorization token to your Lambda function, which returns an IAM policy determining whether to allow or deny the request.

![The image shows the "Edit method request" page in AWS API Gateway, where settings like authorization, request validator, and operation name are configured. Options for URL query string parameters, HTTP request headers, and request body are also visible.](https://kodekloud.com/kk-media/image/upload/v1752857851/notes-assets/images/AWS-Certified-Developer-Associate-Authentication-Authorization-Demo/aws-api-gateway-edit-method.jpg)

Below is an example of a simple Lambda authorizer written in JavaScript. This function checks if the token is equal to "abc123" and then returns a corresponding IAM policy:

```
export const handler = async (event) => {
    // Implement token validation logic
    let effect = "Deny";
    if (event.authorizationToken === "abc123") {
        effect = "Allow";
    }
    const policy = {
        principalId: "abc123",
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: effect,
                    Resource: "arn:aws:execute-api:us-east-1:841860927337:gz4gka5de0/dev/*/*"
                }
            ]
        }
    };
    return policy;
};
```

This Lambda function examines the client-provided header (typically "authorization" or "authorization token"), performs validation, and returns a policy document to either grant or deny access.

![The image shows an AWS API Gateway interface for creating an authorizer, with options to select the authorizer type, Lambda function, and other settings.](https://kodekloud.com/kk-media/image/upload/v1752857852/notes-assets/images/AWS-Certified-Developer-Associate-Authentication-Authorization-Demo/aws-api-gateway-authorizer-interface.jpg)

When configuring the Lambda authorizer in API Gateway:

- Select Lambda as the authorizer type.
- Choose the Lambda function you created.
- Specify the header name (for example, "authorization token") that contains the token.
- Optionally, configure caching settings (default is set to 300 seconds) for improved performance.

![The image shows a configuration screen for setting up a Lambda authorizer in AWS API Gateway, with options for selecting the authorizer type, Lambda function, and other settings.](https://kodekloud.com/kk-media/image/upload/v1752857854/notes-assets/images/AWS-Certified-Developer-Associate-Authentication-Authorization-Demo/lambda-authorizer-aws-api-gateway.jpg)

Once the authorizer is created, you can test it directly from the API Gateway console. Using an incorrect token will return a policy that denies access, while the correct token "abc123" will return a policy that allows access.

To use your new Lambda authorizer on an API method:

1.  Navigate to the specific method in your API.
2.  Click **Edit** under the method request section.
3.  Under the authorization settings, select your Lambda authorizer.
4.  Save your changes.
5.  Deploy the API for the changes to take effect.

## Testing the Authorization

After deploying your changes, test your API endpoint to ensure that the authorization settings are functioning as expected.

- Without sending the token, you should receive an unauthorized response:

  ```
  {
    "message": "Unauthorized"
  }
  ```

- If you provide an incorrect token, the API will still deny access.
- When you send the correct token (authorization token: "abc123"), the API should return the expected response. For instance, if your API returns a list of authors, the response might look like this:

  ```
  {
    "body": "Here is a list of all authors"
  }
  ```

![The image shows a Postman interface with a GET request to an AWS API Gateway endpoint, displaying a JSON response. The response body contains a message: "Here is a list of all authors."](https://kodekloud.com/kk-media/image/upload/v1752857855/notes-assets/images/AWS-Certified-Developer-Associate-Authentication-Authorization-Demo/postman-get-request-aws-api.jpg)

> [!important]
> **Testing Tip**
>
> Ensure you deploy your API after making changes to the authorization configuration. This guarantees that your test results reflect the latest settings.

## Summary

In this lesson, we demonstrated multiple approaches for authorizing access to your API Gateway:

- Using AWS IAM for method-level authorization.
- Employing resource policies to restrict access based on AWS account or IP address.
- Implementing a custom Lambda authorizer to handle complex authorization logic.

By selecting and configuring the approach that best fits your security requirements, you can ensure that your API Gateway is robustly secured.

For further details on AWS API Gateway and related configurations, consider exploring the [AWS Documentation](https://aws.amazon.com/documentation/api-gateway/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/628f3688-9475-4368-90bb-89dc572f86d0/lesson/83ccf7fc-3cfe-4734-a41f-01bf70dd1d1c)**
>
> Watch video content
