# Lambda Layers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless/Lambda-Layers)

---

## Table of Contents

- Lambda Layers
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Serverless

# Lambda Layers

In this lesson, we will dive into Lambda Layers, a powerful feature that simplifies managing common dependencies across multiple AWS Lambda functions.

Imagine that you have two AWS Lambda functions that both require a third-party dependency, such as the Python package NumPy. Typically, you would package NumPy with the code for each function. However, if you have several functions depending on the same library, duplicating the dependency in every function becomes redundant and inefficient.

Consider a scenario with ten Lambda functions, all using NumPy. Instead of packaging the dependency for each function separately, Lambda Layers allow you to upload the NumPy package to AWS once. It then becomes easily accessible to all your Lambda functions without duplication.

Lambda Layers can include libraries, custom runtimes, and other dependencies required by your functions. This approach offers several benefits:

- **Efficiency:** Reduce repeated packaging of the same dependency across functions.
- **Simplified Deployment:** Manage and update common dependency libraries from a single location.
- **Optimized Package Size:** Keep deployment packages small by storing large third-party libraries separately.

![The image illustrates the concept of Lambda Layers, showing three Lambda symbols connected to a box labeled "Lambda Layers" containing "Libraries," "Custom Runtime," and "Other Dependencies."](https://kodekloud.com/kk-media/image/upload/v1752859534/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Layers/lambda-layers-concept-diagram.jpg)

> [!important]
> **Note**
>
> By offloading external libraries to layers, your Lambda functions remain lightweight. This not only optimizes deployments but also improves resource usage by eliminating repetitive dependency packaging.

![The image is a slide titled "Lambda Layers – Benefits," explaining that storing external libraries in layers allows Lambda functions to remain small.](https://kodekloud.com/kk-media/image/upload/v1752859535/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Layers/lambda-layers-benefits-slide.jpg)

In summary, Lambda Layers provide a streamlined method to share common dependencies across multiple Lambda functions. They help maintain small, manageable deployment packages and simplify the overall deployment process. Keep in mind that you can incorporate up to five layers per function, offering flexibility in how you structure and reuse your code dependencies.

For more detailed guidance and best practices, visit the [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3c842ffc-5841-456d-9fad-7bb3af5fdbfc/lesson/09e4d41b-704f-430e-bbdb-9e0636dc0a44)**
>
> Watch video content
