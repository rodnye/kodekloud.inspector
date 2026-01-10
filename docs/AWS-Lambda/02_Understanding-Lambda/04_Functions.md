# Functions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Lambda/Understanding-Lambda/Functions)

---

## Table of Contents

- Functions
  - AWS Lambda Function Handler Overview
  - Handler Parameters in Detail
  - Python Handler Example
  - Learn More
  - Next Up: Lambda Pricing Model
  - Watch Video
    - Event Object
    - Context Object

---

## Content

AWS Lambda

Understanding Lambda

# Functions

## AWS Lambda Function Handler Overview

Once a source event triggers an AWS Lambda function, Lambda invokes the **function handler**, which serves as the entry point for your code. You can author this handler in any natively supported language, so existing code requires minimal modification. The only requirement is a handler function that accepts two parameters:

| Parameter   | Description                                                                         |
| ----------- | ----------------------------------------------------------------------------------- |
| **event**   | Carries data from the event source (e.g., S3 bucket details, API Gateway payload)   |
| **context** | Provides runtime metadata (e.g., function name, memory limits, request identifiers) |

![The image illustrates the flow of data in an AWS Lambda function, showing a source triggering the function handler, which processes event and context objects to execute the Lambda function.](https://kodekloud.com/kk-media/image/upload/v1752863175/notes-assets/images/AWS-Lambda-Functions/aws-lambda-data-flow-diagram.jpg)

> [!important]
> **Note**
>
> Use the `event` object to tailor your logic at runtime—extract bucket names for S3 triggers or HTTP headers for API Gateway—and leverage the `context` object to retrieve execution metadata like remaining run time.

## Handler Parameters in Detail

### Event Object

The `event` parameter contains details from the triggering source. For example:

- S3 events: `event['Records'][0]['s3']['bucket']['name']`
- API Gateway: JSON payload with HTTP method, headers, and body

### Context Object

The `context` parameter gives access to runtime information and Lambda environment methods, such as:

- `context.function_name`
- `context.get_remaining_time_in_millis()`

## Python Handler Example

Below is a simple Python function that reads a user's first and last name from the incoming event and returns a personalized greeting:

```
def lambda_handler(event, context):
    first_name = event.get('first_name', 'Guest')
    last_name = event.get('last_name', '')
    # Construct and trim the greeting message
    message = f"Hello {first_name} {last_name}!".strip()
    return {
        "message": message
    }
```

## Learn More

- For detailed guidance on writing handlers and custom runtimes, see the [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html).
- To explore recommended patterns for coding style, testing, performance tuning, and service integrations, consult the [AWS Lambda Best Practices Guide](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html).

![The image is a slide titled "Functions" with a link to AWS Lambda best practices and a list of topics including writing functions, testing, performance, and more.](https://kodekloud.com/kk-media/image/upload/v1752863177/notes-assets/images/AWS-Lambda-Functions/functions-aws-lambda-best-practices.jpg)

## Next Up: Lambda Pricing Model

In the next section, we'll explore AWS Lambda's pricing structure, cost optimization strategies, and tips for estimating your monthly bill.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-lambda/module/fdb5ec1b-18a2-4034-baed-3231f187825b/lesson/2d9678dc-64d3-43f7-904d-b07b1c8d3b4c)**
>
> Watch video content
