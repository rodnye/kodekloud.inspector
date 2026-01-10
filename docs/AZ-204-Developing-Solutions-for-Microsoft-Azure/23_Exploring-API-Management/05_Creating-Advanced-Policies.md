# Creating Advanced Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-API-Management/Creating-Advanced-Policies)

---

## Table of Contents

- Creating Advanced Policies
  - Policy Types and Their Functions
  - Example: Configuring Policies
  - Additional Policy Examples
  - Testing API Endpoints with Postman
  - Summary
  - Additional Resources
  - Watch Video
    - Control Flow
    - Forward Request
    - Limit Concurrency
    - Log to Event Hub
    - Mock Response
    - Retry
    - Rewrite URI for a Hardware API Request
    - Endpoint Rewrite Example

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring API Management

# Creating Advanced Policies

In this guide, you will learn how to create advanced policies in Azure API Management. These policies allow for sophisticated control over API behavior, enabling advanced customization that enhances performance, security, and monitoring. We will explore various policy types, discuss their functions, and demonstrate practical configuration examples.

## Policy Types and Their Functions

### Control Flow

The control flow policy executes conditionally based on a Boolean expression. This allows for logic-based decision-making and dynamic policy behavior. Use it to apply policies only when certain conditions are met.

### Forward Request

The forward request policy directs a client’s request to the appropriate backend service. This policy supports all HTTP request types and ensures efficient routing.

### Limit Concurrency

The limit concurrency policy restricts the number of requests processed concurrently, preventing backend overload. In the example below, the "key" attribute sets the evaluation expression, while "max-count" defines the maximum number of concurrent executions allowed. Nested policy statements are executed only if the concurrency limit is not exceeded.

```
<limit-concurrency key="expression" max-count="number">
    <!-- nested policy statements -->
</limit-concurrency>
<forward-request timeout="time in seconds" follow-redirects="true | false"/>
```

### Log to Event Hub

The log to Event Hub policy sends log data to an Event Hub, using pre-defined parameters such as logger ID, partition ID, and partition key. This is essential for tracking events and monitoring API performance over time.

```
<log-to-eventhub logger-id="id of the logger entity" partition-id="index of the partition where messages are sent" partition-key="value used for partition assignment">
    <!-- Expression returning a string to be logged -->
</log-to-eventhub>
```

### Mock Response

The mock response policy simulates an API response without forwarding the request to a backend service. This is particularly useful for testing or when the backend is temporarily unavailable.

### Retry

The retry policy attempts to re-execute a policy statement until a specified condition is met. This helps to handle transient errors when communicating with backend services.

## Example: Configuring Policies

Below is a real-world example that combines policies in an API Management configuration. In this case, we use the rewrite URI and set-backend-service policies to properly route requests.

Navigate to the design section and insert the following configuration:

```
<policies>
    <inbound>
        <base />
        <rewrite-uri template="/api/employee" copy-unmatched-params="true" />
        <set-backend-service id="apim-generated-policy" backend-id="WebApp_employeeDetailsa204" />
    </inbound>
    <backend>
        <base />
    </backend>
    <outbound>
        <base />
    </outbound>
    <on-error>
        <base />
    </on-error>
</policies>
```

After saving, test the endpoint to verify that employee data is retrieved successfully. This approach can be applied to other APIs as well. For instance, if a GET request on a flight API returns a 404 error, ensure that the correct URI path is provided by adding or editing the rewrite URI policy accordingly:

```
<rewrite-uri template="/api/flightlogs" />
```

Once updated, retest the GET request to confirm that flight logs are returned as expected.

## Additional Policy Examples

Below are optional examples to further illustrate policy capabilities. These examples are useful for understanding how to adapt policies for different scenarios.

### Rewrite URI for a Hardware API Request

```
<policies>
  <inbound>
    <base />
    <rewrite-uri template="/V2/US/hardware/{$storename}&{ordernumber}&City={city}&State={state}" />
  </inbound>
  <outbound>
    <base />
  </outbound>
</policies>
```

### Endpoint Rewrite Example

Consider an incoming request like `/get?a=b&c=d` with an operation template set to `/get?a={b}`. The following policy rewrites the endpoint:

```
<!-- Assuming incoming request is /get?a=b&c=d and operation template is set to /get?a={b} -->
<policies>
  <inbound>
    <base />
    <rewrite-uri template="/put" />
  </inbound>
  <outbound>
    <base />
  </outbound>
</policies>
<!-- Resulting URL will be /put?cd -->
```

> [!important]
> **Note**
>
> These optional examples are designed to showcase additional policies and are especially useful for exam preparation or advanced configurations.

## Testing API Endpoints with Postman

Testing your API endpoints is crucial. Use Postman to verify that your APIs are reachable and functioning as expected.

Consider the sample response from an employee API endpoint:

```
[
    {"employeeId":1,"firstName":"Fanny","lastName":"Mose","salary":37311.79,"hireDate":"2009-06-17T00:00:00Z","department":"IT","employeeStatus":"Contractor"},
    {"employeeId":2,"firstName":"Redd","lastName":"Heels","salary":130282.04,"hireDate":"2000-01-12T00:00:00Z","department":"Marketing","employeeStatus":"Contractor"},
    {"employeeId":3,"firstName":"Andrew","lastName":"Wallas","salary":13070468,"hireDate":"2021-01-13T00:00:00Z","department":"Marketing","employeeStatus":"Part-time"},
    {"employeeId":4,"firstName":"Vassily","lastName":"Morters","salary":132497.57,"hireDate":"2022-04-17T00:00:00Z","department":"IT","employeeStatus":"Contractor"},
    {"employeeId":5,"firstName":"Dalis","lastName":"Whithrow","salary":6964.14,"hireDate":"2011-08-07T00:00:00Z","department":"employeeStatus","employeeStatus":"Contractor"},
    {"employeeId":6,"firstName":"Diorne","lastName":"Rethrong","salary":12139.64,"hireDate":"2017-05-14T00:00:00Z","department":"HR","employeeStatus":"Part-time"},
    {"employeeId":7,"firstName":"Trumann","lastName":"Raion","salary":18856.49,"hireDate":"2011-06-09T00:00:00Z","department":"Finance","employeeStatus":"Contractor"},
    {"employeeId":8,"firstName":"Florence","lastName":"Uen","salary":40397.53,"hireDate":"2011-08-14T00:00:00Z","department":"IT","employeeStatus":"Contractor"},
    {"employeeId":9,"firstName":"Patin","lastName":"Creys","salary":44357.35,"hireDate":"2003-05-08T00:00:00Z","department":"IT","employeeStatus":"Full-time"},
    {"employeeId":10,"firstName":"Brider","lastName":"Lott","salary":99999.00,"hireDate":"2021-01-10T00:00:00Z","department":"Marketing","employeeStatus":"Part-time"}
    // Additional employee objects...
]
```

Test the API by copying and using the following endpoint in Postman:

```
GET https://apimaz204demo.azure-api.net/api/lightlogs/ HTTP/1.1
Host: apimaz204demo.azure-api.net
```

> [!important]
> **Warning**
>
> If you encounter an "Access Denied" error, such as:
>
> ```
> {
> "statusCode": 401,
> "message": "Access denied due to missing subscription key. Make sure to include subscription key when making requests to an API."
> }
> ```
>
> This indicates that the subscription key is missing. Be sure to include the required subscription key in your request headers for public APIs that require authentication.

## Summary

By mastering advanced API management policies—such as concurrency limits, logging, request forwarding, and URI rewriting—you can greatly enhance control, reliability, and monitoring of your APIs. This guide has covered key policies along with practical configuration examples using Azure API Management. With these skills, you are well-prepared to deploy and manage sophisticated API solutions.

## Additional Resources

For further reading and related topics, consider these resources:

- [Azure API Management Documentation](https://docs.microsoft.com/en-us/azure/api-management/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/4fb192a0-bdef-49d6-9dd7-7e788680ea1a/lesson/ef0dc91a-1ff0-4ee0-8409-5fa323e2e8e5)**
>
> Watch video content
