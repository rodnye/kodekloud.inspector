# Integration Types mapping Templates - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/API-Gateway/Integration-Types-mapping-Templates)

---

## Table of Contents

- Integration Types mapping Templates
  - Mock Integration
  - AWS Proxy (Lambda Proxy) Integration
  - HTTP Proxy Integration
  - AWS Integration
  - HTTP Integration with Mapping Templates
  - Watch Video

---

## Content

AWS Certified Developer - Associate

API Gateway

# Integration Types mapping Templates

In this lesson, we explore how API Gateway manages different integration types and mapping templates to efficiently translate data between users, API Gateway, and backend services. Whether you're working with Lambda functions or HTTP endpoints, understanding these flows is essential for building robust APIs.

When a user sends an HTTP request to your API Gateway, the request includes details such as HTTP headers, the method, and the request body. For example, a complete HTTP request might be:

```
{
  "headers": {
    "Authorization": "fjasdfj211232aa",
    "Content-Type": "application/json",
    "Host": "amazon.com"
  },
  "method": "GET",
  "body": {
    "name": "iphone",
    "price": 1000
  }
}
```

API Gateway can either forward the entire request to your backend service or employ a mapping template to extract and forward only the necessary data. For instance, if only the body is required, a mapping template transforms the request to forward just that part:

```
{
  "name": "iphone",
  "price": 1000
}
```

The same approach is applied when processing responses from the backend. The backend returns data to API Gateway, which then assembles the final HTTP response for the client.

Below are the various integration types available:

---

## Mock Integration

In a mock integration, API Gateway does not send the request to a backend service. Instead, it returns a predetermined response. This integration is ideal for testing your API functionality without invoking backend resources or incurring charges.

> [!important]
> **Note**
>
> Mock integration is a cost-effective way to validate API behaviors during development and testing.

---

## AWS Proxy (Lambda Proxy) Integration

AWS Proxy integration, also known as Lambda Proxy integration, allows API Gateway to act as an intermediary that transparently passes the entire HTTP request (including headers, method, and body) to a Lambda function. The Lambda function is then responsible for processing the request and returning a full HTTP response.

A typical request forwarded to a Lambda function is structured as follows:

```
{
  "headers": {
    "Authorization": "fjaasdfj211232aa",
    "Content-Type": "application/json",
    "Host": "amazon.com"
  },
  "method": "GET",
  "body": {
    "name": "iphone",
    "price": 1000
  }
}
```

After processing, the Lambda function returns a response similar to this:

```
{
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "data": "data"
  }
}
```

API Gateway then constructs the final HTTP response delivered to the user.

---

## HTTP Proxy Integration

HTTP Proxy integration functions similarly to Lambda Proxy, except that the backend is a custom HTTP endpoint rather than a Lambda function. In this scenario, API Gateway forwards the complete request to the designated HTTP endpoint:

```
{
  "headers": {
    "Authorization": "fjaasdfj211232a",
    "Content-Type": "application/json",
    "Host": "amazon.com"
  },
  "method": "GET",
  "body": {
    "name": "iphone",
    "price": 1000
  }
}
```

The HTTP endpoint processes the request and sends back an HTTP response such as:

```
{
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "data": "data"
  }
}
```

API Gateway then forwards this response to the client.

---

## AWS Integration

With AWS integration, API Gateway leverages mapping templates to extract only specific parts of the HTTP request before sending the data to a Lambda function. For example, if the Lambda function only requires the product name and price, you can define a mapping template to extract these details.

Starting from the full HTTP request:

```
{
  "headers": {
    "Authorization": "fjaasdfj211232a",
    "Content-Type": "application/json",
    "Host": "amazon.com"
  },
  "method": "GET",
  "body": {
    "name": "iphone",
    "price": 1000
  }
}
```

The mapping template transforms the request into a simplified payload like this:

```
{
  "name": "iphone",
  "price": 1000
}
```

The Lambda function processes this extracted data and returns its result. A separate mapping template then converts the backend response into a complete HTTP response for the client.

> [!important]
> **Tip**
>
> Using mapping templates for AWS integration ensures that your backend only receives the necessary data, optimizing performance and minimizing processing overhead.

---

## HTTP Integration with Mapping Templates

HTTP integration with a custom HTTP endpoint also benefits from mapping templates. These templates extract only the required details from the original HTTP request such as parts of the body or headers. For example, a mapping template might transform the original request into:

```
{
  "name": "iphone",
  "price": 1000
}
```

After processing, the HTTP endpoint returns a response similar to:

```
{
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "message": "success"
  }
}
```

API Gateway applies a final mapping template to format this data into a full HTTP response for the user.

---

Transcribed by https://otter.ai

For more detailed information on API Gateway integrations, explore our [developer documentation](/docs/api-gateway/integrations).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/628f3688-9475-4368-90bb-89dc572f86d0/lesson/2c473b41-0214-4791-bbfd-d28d3769bf8f)**
>
> Watch video content
