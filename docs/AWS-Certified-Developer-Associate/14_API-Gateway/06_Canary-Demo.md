# Canary Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/API-Gateway/Canary-Demo)

---

## Table of Contents

- Canary Demo
  - Overview
  - Testing the Production Environment
  - Initiating a Canary Deployment
  - Promoting the Canary Deployment
  - Conclusion
  - Watch Video
    - Testing the Canary Deployment

---

## Content

AWS Certified Developer - Associate

API Gateway

# Canary Demo

In this guide, we walk through performing a canary deployment within API Gateway. The configuration includes an AWS Lambda function integrated with API Gateway stages. Using stage variables, we determine which Lambda alias (and version) is invoked for each stage.

## Overview

We start with a Lambda function named "getProducts" that has three versions:

- Version v1: Aliased as "prod"
- Version v2: Aliased as "staging"
- Version v3: Aliased as "dev"

![The image shows an AWS Lambda console with a function named "getProducts." It displays the function overview, including aliases for different environments like dev, prod, and staging.](https://kodekloud.com/kk-media/image/upload/v1752857865/notes-assets/images/AWS-Certified-Developer-Associate-Canary-Demo/aws-lambda-getproducts-function-overview.jpg)

In API Gateway, the `/products` resource is configured with a GET method. There are three stages (dev, prod, and staging), and each stage uses a stage variable to determine which Lambda alias to invoke. For example:

- The **dev** stage uses the alias "dev" (version v3).
- The **prod** stage uses the alias "prod" (version v1).
- The **staging** stage uses the alias "staging" (version v2).

![The image shows the AWS API Gateway console, specifically the "Stages" section for an API named "ecommerce," with details about the "dev" stage, including logs and tracing settings.](https://kodekloud.com/kk-media/image/upload/v1752857866/notes-assets/images/AWS-Certified-Developer-Associate-Canary-Demo/aws-api-gateway-ecommerce-stages.jpg)

## Testing the Production Environment

Let's verify the production environment first. Since the prod stage points to the "prod" alias, invoking the API returns:

```
{
  "body": "Here is a list of all products v1"
}
```

## Initiating a Canary Deployment

Suppose you want to upgrade the prod environment to version v2 (currently associated with the staging alias) without disrupting all users. You can perform a canary deployment to gradually shift the traffic.

1.  **Configure Canary Settings:**  
    Navigate to the prod stage in API Gateway and enable the canary deployment configuration. Specify the percentage of traffic to route to the newer version; for this demo, we set it to 50%. This configuration directs half of the requests to the new version (v2) while the other half continue being served by the original prod version (v1).
2.  **Adjust Stage Variables:**  
    In the canary settings page, override the default stage variable so that it points to the "staging" alias (version v2). Click "create canary" to apply the changes.
3.  **Deploy the API:**  
    Return to the API configuration and deploy the changes. Although no direct modifications to the API integration are made, deploying the API triggers the canary configuration.

![The image shows the AWS API Gateway console with a focus on the "Stages" section for an "ecommerce" API, displaying the "prod" stage and its GET method for the "/products" endpoint. A green notification indicates that stage variables have been successfully updated.](https://kodekloud.com/kk-media/image/upload/v1752857867/notes-assets/images/AWS-Certified-Developer-Associate-Canary-Demo/aws-api-gateway-ecommerce-prod.jpg)

> [!important]
> **Note**
>
> Deploying the API, even without integration changes, ensures the canary settings are active and traffic distribution is updated.

Additionally, you have the option to configure a hard-coded Lambda ARN override in the integration request. However, utilizing stage variables provides flexibility for version switching through canary deployments.

![The image shows the AWS console interface for creating a canary in API Gateway, with settings for request distribution and stage variables. The canary is set to receive 50% of the API traffic, and there are options for configuring stage cache and variables.](https://kodekloud.com/kk-media/image/upload/v1752857868/notes-assets/images/AWS-Certified-Developer-Associate-Canary-Demo/aws-api-gateway-canary-settings.jpg)

### Testing the Canary Deployment

After deployment, allow some time for the changes to propagate. When testing the API, you should observe mixed responses:

- Approximately 50% of requests are handled by version v1:

  ```
  {
    "body": "Here is a list of all products v1"
  }
  ```

- The remaining 50% of requests are served by version v2:

  ```
  {
    "body": "Here is a list of all products v2"
  }
  ```

This alternating pattern confirms that the production traffic is split roughly 50/50.

## Promoting the Canary Deployment

Once you confirm that version v2 is functioning correctly and meeting performance expectations, you can promote the canary to make it the default for the prod stage. Follow these steps:

1.  Navigate back to the prod stage.
2.  Access the canary section and select "promote canary."
3.  Leave the configuration options as default and confirm the promotion.

After promotion, 100% of prod traffic is routed to version v2 via the updated stage variable.

The expected response from testing the prod stage post-promotion is:

```
{
  "body": "Here is a list of all products v2"
}
```

![The image shows the AWS API Gateway console, specifically the "Stages" section for an "ecommerce" API. It displays details about the "prod" stage, including logs, tracing settings, and canary deployment settings.](https://kodekloud.com/kk-media/image/upload/v1752857869/notes-assets/images/AWS-Certified-Developer-Associate-Canary-Demo/aws-api-gateway-ecommerce-stages-2.jpg)

## Conclusion

This guide has demonstrated how to perform a canary deployment within API Gateway, enabling you to upgrade your production environment gradually. By following these steps, you can test new versions under controlled traffic conditions and promote them once verified, ensuring minimal disruption and a smooth transition.

Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/628f3688-9475-4368-90bb-89dc572f86d0/lesson/49974bb0-3bc9-4826-9acb-35ae96f45ec3)**
>
> Watch video content
