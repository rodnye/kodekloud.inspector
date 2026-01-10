# Securing APIs by Using Subscriptions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-API-Management/Securing-APIs-by-Using-Subscriptions)

---

## Table of Contents

- Securing APIs by Using Subscriptions
  - Subscription Key Scopes
  - Managing Subscription Keys in the API Management Portal
  - Authenticating API Requests with Subscription Keys
  - Demonstration in the Azure Portal
  - Testing API Calls with Postman
  - Conclusion
  - Watch Video

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring API Management

# Securing APIs by Using Subscriptions

Securing your APIs is essential to ensure that only authorized applications can connect to your services. Azure API Management employs subscription keys as a primary way to control API access. This guide explains how subscription keys work, their various scopes, and how to manage them through the Azure API Management portal.

## Subscription Key Scopes

Azure API Management allows you to apply subscription keys at different scopes to suit your access control needs:

1.  **All APIs Scope:**  
    The subscription key provides access to every API available through the gateway. This simplifies management when you want a single key to cover your entire API portfolio.
2.  **Single API Scope:**  
    The subscription key is limited to a specific API and all its endpoints. This approach is ideal for restricting access to selected APIs.
3.  **Product Scope:**  
    A product is a grouping of APIs with shared access rules, usage quotas, and terms of use. Subscription keys at the product level are particularly useful for managing bundled service offerings.

> [!important]
> **Note**
>
> API Management also supports additional security mechanisms such as OAuth 2.0, client certificates, and IP allow listings, providing multiple layers of protection.

![The image is a table describing subscription key scopes for APIs, detailing how they apply to all APIs, a single API, or a product. It also notes that API management supports various security mechanisms.](https://kodekloud.com/kk-media/image/upload/v1752866334/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Securing-APIs-by-Using-Subscriptions/subscription-key-scopes-api-table.jpg)

## Managing Subscription Keys in the API Management Portal

When you make a request to a secured API, the subscription key must be included for authentication. Without it, attempts to access protected resources (for example, using Postman to retrieve flight logs) will fail.

You can regenerate subscription keys at any time from the Azure portal. Regular key regeneration is a best practice to maintain security, especially if a key is compromised.

![The image shows a screenshot of an API management service interface, focusing on subscriptions with options for adding and managing keys. It includes a note about the necessity of including keys in requests and the ability to regenerate them.](https://kodekloud.com/kk-media/image/upload/v1752866336/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Securing-APIs-by-Using-Subscriptions/api-management-subscriptions-keys-screenshot.jpg)

Each subscription includes both primary and secondary keys to enable seamless key rotation. For instance, you can switch to the secondary key while regenerating the primary key to ensure uninterrupted API access.

## Authenticating API Requests with Subscription Keys

To authenticate API requests, include the subscription key as either a request header or a query string parameter. By default, Azure API Management expects the key to be passed in the header named `OCP-Apim-Subscription-Key`.

![The image shows a user interface for managing API access with a subscription key, highlighting options for passing keys in the request header or URL query string. It includes settings for subscription requirements and header names.](https://kodekloud.com/kk-media/image/upload/v1752866337/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Securing-APIs-by-Using-Subscriptions/api-access-management-ui.jpg)

Azure API Management also features a developer portal that allows you to test API calls, ensuring your subscription key is properly integrated before the API goes live.

## Demonstration in the Azure Portal

To manage subscription keys in the Azure portal:

1.  Navigate to your API Management instance.
2.  Select the "Subscriptions" section to view both product-level keys and service-level keys that grant access to all APIs.
3.  Click "Add Subscription" to create a new subscription. Provide a name (for example, "Flight API") and select the appropriate scope.

![The image shows a Microsoft Azure API Management portal with a list of subscriptions and a panel for creating a new subscription.](https://kodekloud.com/kk-media/image/upload/v1752866338/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Securing-APIs-by-Using-Subscriptions/azure-api-management-subscriptions-panel.jpg)

For example, you might choose the "Specific API" option and select the "Flight Logs API." After creating the subscription, click on "Show/Hide Keys" to view the primary key. You will then integrate this key in your API calls, either as a header with the name `OCP-Apim-Subscription-Key` or as a query string parameter.

![The image shows the Microsoft Azure portal interface, specifically the API Management service settings for a "Flight Logs API," including configuration options for URL, subscription, and security settings.](https://kodekloud.com/kk-media/image/upload/v1752866340/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Securing-APIs-by-Using-Subscriptions/azure-portal-api-management-flight-logs.jpg)

## Testing API Calls with Postman

When testing your API using tools like Postman, be sure to include the subscription key. A valid request returns a response similar to the following JSON:

```
[
    {
        "flightNumber": 1566,
        "departureAirportCode": "LIZ",
        "arrivalAirportCode": "CHW",
        "departureDatetime": "2022-12-13T08:00:00",
        "arrivalDatetime": "2022-12-13T10:00:00",
        "airlineName": "united",
        "flightDurationMinutes": 1332
    },
    {
        "flightNumber": 5377,
        "departureAirportCode": "TBM",
        "arrivalAirportCode": "BBU",
        "departureDatetime": "2022-06-05T06:00:00",
        "arrivalDatetime": "2022-06-05T08:00:00",
        "airlineName": "united",
        "flightDurationMinutes": 1399
    },
    {
        "flightNumber": 3034,
        "departureAirportCode": "TXN",
        "arrivalAirportCode": "LLM",
        "departureDatetime": "2022-09-14T08:00:00",
        "arrivalDatetime": "2022-09-14T10:00:00",
        "airlineName": "united",
        "flightDurationMinutes": 1210
    }
]
```

> [!important]
> **Warning**
>
> Always include the subscription key in your API requests. Omitting it will result in rejected calls and a failure to retrieve data.

## Conclusion

Subscription keys are an integral part of securing and managing access to your APIs using Azure API Management. Whether you decide to use a single key for all APIs, restrict access to a specific API, or manage a suite of APIs via a product, subscription keys offer flexible and robust control over your endpoints. Combined with features like key rotation and the developer testing portal, they make managing API security straightforward and efficient.

For more details on best practices and additional security options, refer to the [Azure API Management documentation](https://learn.microsoft.com/en-us/azure/api-management/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/4fb192a0-bdef-49d6-9dd7-7e788680ea1a/lesson/07be8151-1200-4ca3-a6c3-c970e7772ae4)**
>
> Watch video content
