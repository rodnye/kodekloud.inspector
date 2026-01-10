# API Keys Usage Plans Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/API-Gateway/API-Keys-Usage-Plans-Demo)

---

## Table of Contents

- API Keys Usage Plans Demo
  - Enforcing the API Key Requirement
  - Creating a Usage Plan
  - Creating and Associating an API Key
  - Testing API Access with Quota Enforcement
  - Conclusion
  - Watch Video

---

## Content

AWS Certified Developer - Associate

API Gateway

# API Keys Usage Plans Demo

In this lesson, we will learn how to secure your API by enforcing API keys and implementing usage plans. Using API keys ensures that only authenticated users can access your API, while usage plans help control the traffic by setting quotas (for example, limiting users to 1,000 requests per month or 20 requests per day).

## Enforcing the API Key Requirement

To secure your API endpoint, begin by navigating to the specific method request where you want to require an API key. Click **Edit** and enable the **API Key Required** option. Once you save the changes and deploy your API, any request without a valid API key will be rejected with a forbidden error.

For example, if you send a request without the required header, you might receive one of the following responses:

```
{
  "message": "Limit Exceeded"
}
```

or

```
{
  "message": "Forbidden"
}
```

These responses confirm that the endpoint is now protected and inaccessible without proper authentication.

## Creating a Usage Plan

Before generating an API key, it is essential to define a usage plan. A usage plan specifies the maximum number of requests a user can make over a predetermined period and can include throttling settings to prevent abuse.

In the API Gateway console, follow these steps:

1.  Navigate to the **Usage Plan** section.
2.  Create a new usage plan (e.g., name it "premium").
3.  Define different models if required—for example, offering a free plan for general access and a premium plan for increased rate limits.

![The image shows an AWS interface for creating a usage plan, with fields for name, description, throttling, rate, burst, and quota settings.](https://kodekloud.com/kk-media/image/upload/v1752857840/notes-assets/images/AWS-Certified-Developer-Associate-API-Keys-Usage-Plans-Demo/aws-usage-plan-interface-settings.jpg)

Within the usage plan, you can configure the following settings:

- **Rate:** Total number of requests allowed per second (e.g., 2 requests per second).
- **Burst:** Maximum number of concurrent requests a client can submit at one time (e.g., 10 requests).
- **Quota:** Total number of requests permitted per time period (e.g., 20 requests per day).

After configuring these settings, create the usage plan.

![The image shows an AWS API Gateway interface with a "premium" usage plan created, displaying details like request rate, burst, and quota. The interface includes options for managing APIs, custom domain names, and VPC links.](https://kodekloud.com/kk-media/image/upload/v1752857841/notes-assets/images/AWS-Certified-Developer-Associate-API-Keys-Usage-Plans-Demo/aws-api-gateway-premium-plan.jpg)

## Creating and Associating an API Key

Next, create an API key for your client by following these steps:

1.  In the AWS console, create a new API key and give it a descriptive name (e.g., "user1").
2.  Choose to auto-generate the key or customize it as per your requirements.
3.  Once the key is generated, view or copy its value.

![The image shows an AWS console screen for creating an API key, with fields for entering the name and an optional description, and options to auto-generate or customize the key.](https://kodekloud.com/kk-media/image/upload/v1752857842/notes-assets/images/AWS-Certified-Developer-Associate-API-Keys-Usage-Plans-Demo/aws-console-api-key-creation.jpg)

After generating the API key, associate it with your created usage plan:

1.  In the API Gateway console, select the newly created API key.
2.  Click **Add to Usage Plan**.
3.  Select the "premium" usage plan previously created and save the changes.

![The image shows an AWS API Gateway interface displaying details of an API key named "user1," including its ID, status, and creation date, with options to edit, delete, or add to a usage plan.](https://kodekloud.com/kk-media/image/upload/v1752857843/notes-assets/images/AWS-Certified-Developer-Associate-API-Keys-Usage-Plans-Demo/aws-api-gateway-user1-key-details.jpg)

After association, the API key becomes active. Ensure that you include a header in your API requests using `x-api-key` followed by the API key value.

## Testing API Access with Quota Enforcement

With the API key in place, sending a properly authenticated request to the API Gateway should return a successful response, such as:

```
{
  "body": "Here is a list of all tasks.",
  "event": {}
}
```

> [!important]
> **Note**
>
> Remember that the usage plan enforces a daily quota (in this example, 20 requests). Repeated requests beyond this limit will trigger a quota restriction.

Once the quota is exceeded, subsequent requests will return a status code of 429 (Too Many Requests) along with a message similar to:

```
{
  "message": "Limit Exceeded"
}
```

This response confirms that the usage plan effectively controls the volume of API requests.

## Conclusion

In this lesson, you learned how to enhance your API security by enforcing API key requirements and implementing usage plans with throttling and quota options. By taking these steps, you can ensure that only authenticated users access your API while effectively managing API call volumes to protect your services.

For more info on securing your APIs, explore the [AWS API Gateway Documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/628f3688-9475-4368-90bb-89dc572f86d0/lesson/c1f1c6d4-dc6a-4854-bfcd-e04e2e5c5c51)**
>
> Watch video content
