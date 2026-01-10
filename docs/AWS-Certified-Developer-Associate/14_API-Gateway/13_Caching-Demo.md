# Caching Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/API-Gateway/Caching-Demo)

---

## Table of Contents

- Caching Demo
  - Step 1: Select and Edit the API Stage
  - Step 2: Customize Caching Parameters
  - Step 3: Configure Caching for Individual API Methods
  - Conclusion
  - Watch Video

---

## Content

AWS Certified Developer - Associate

API Gateway

# Caching Demo

In this lesson, we will guide you through the steps necessary to configure caching for your AWS API Gateway. Proper caching not only enhances your API's performance by storing responses for a specified duration but also helps manage traffic more effectively.

## Step 1: Select and Edit the API Stage

Begin by navigating to your API and choosing the specific stage for which you want to configure caching. Remember, each stage can have its own unique configuration settings. Once you have selected the correct stage, click **Edit** to access the stage configuration.

Within the stage configuration, locate the cache settings. Activating these settings provisions a cache for your API. However, note that caching remains inactive until you explicitly enable method-level caching. Even when stage-level caching is configured, you must enable it for each API method individually. Alternatively, you may opt to activate caching automatically for all GET methods.

## Step 2: Customize Caching Parameters

You have the flexibility to adjust several caching parameters at the stage level:

- Define the cache capacity.
- Enable data encryption to secure your cached data.
- Set the TTL (Time-To-Live), which determines how long cached responses remain valid.
- Activate authorization in the cache to manage interactions with unauthorized requests.

> [!important]
> **Customization Tip**
>
> When cache authorization is enabled, you can configure the response for unauthorized invalidation attempts. Options include ignoring the header, issuing a warning, or returning a 403 status code.

![The image shows an AWS API Gateway settings page, where options for caching, throttling, and firewall settings are being configured. The page includes dropdown menus and toggle switches for various settings.](https://kodekloud.com/kk-media/image/upload/v1752857860/notes-assets/images/AWS-Certified-Developer-Associate-Caching-Demo/aws-api-gateway-settings-configure.jpg)

## Step 3: Configure Caching for Individual API Methods

Caching can also be tailored for individual API methods. To enable this:

1.  Navigate to the specific method and click **Edit**.
2.  In the method configuration page, enable method-level caching.
3.  Adjust parameters such as TTL or cache capacity to override stage-level settings if necessary.

![The image shows a configuration page from AWS API Gateway, detailing settings for API caching, throttling, and firewall and certificate options.](https://kodekloud.com/kk-media/image/upload/v1752857861/notes-assets/images/AWS-Certified-Developer-Associate-Caching-Demo/aws-api-gateway-configuration-settings.jpg)

Further adjustments can be made directly in the method's override settings:

![The image shows the "Edit method overrides" settings page in AWS API Gateway, where options for CloudWatch logs, throttling, method cache, and cache time-to-live are configured.](https://kodekloud.com/kk-media/image/upload/v1752857862/notes-assets/images/AWS-Certified-Developer-Associate-Caching-Demo/edit-method-overrides-aws-api-gateway.jpg)

## Conclusion

By following these steps, you can effectively set up and customize caching in AWS API Gateway. This configuration not only enhances your API performance by reducing response times but also helps in managing traffic by efficiently handling repeated requests.

For additional details and advanced configurations, consider reviewing the [AWS API Gateway Documentation](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/628f3688-9475-4368-90bb-89dc572f86d0/lesson/43710cfa-7b9e-4f9e-b84a-a2e9c8249b9f)**
>
> Watch video content
