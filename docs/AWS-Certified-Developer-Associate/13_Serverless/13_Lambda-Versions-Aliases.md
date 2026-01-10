# Lambda Versions Aliases - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Serverless/Lambda-Versions-Aliases)

---

## Table of Contents

- Lambda Versions Aliases
  - Understanding Lambda Versions
  - Exploring Lambda Aliases
  - Key Takeaways
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Serverless

# Lambda Versions Aliases

AWS Lambda provides powerful features for managing your functions through versions and aliases. In this guide, we’ll explore how Lambda function versions and aliases work and how you can leverage them to streamline your development and deployment processes.

## Understanding Lambda Versions

When you create a Lambda function, you can publish different versions of your function. Each published version is an immutable snapshot of your code and configuration at the time of publication. For example, the first published version is labeled as v1, the next v2, and so on. This mechanism allows you to manage different environments -- API Gateway, for instance, can route traffic to v1 for a development environment and to v2 for a production environment.

> [!important]
> **Note**
>
> The version labeled as "latest" is mutable and represents your working copy during development. Once you decide to publish these changes, a new immutable version is generated.

![The image illustrates the concept of AWS Lambda versions, showing that the latest version is mutable and can be published to create immutable versions (V1, V2).](https://kodekloud.com/kk-media/image/upload/v1752859562/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Versions-Aliases/aws-lambda-versions-illustration.jpg)

When updates are needed, simply modify the "latest" version and publish it again to create another snapshot (e.g., v3). Remember, once a version is published, its configuration cannot be altered.

## Exploring Lambda Aliases

Lambda aliases act as named pointers to specific Lambda versions. This allows you to abstract version details away and refer to your function with user-friendly names like "prod" for production or "dev" for development.

Beyond simple version mapping, aliases can manage traffic routing between multiple versions. For instance, you can configure an alias to route 90% of incoming traffic to v1 and the remaining 10% to v2. This feature is particularly useful for scenarios such as canary testing or gradually rolling out new updates.

![The image is a diagram illustrating AWS Lambda aliases, showing an Amazon API Gateway connected to a Lambda alias (Prod), which routes traffic to two versions (V1 and V2) with 90% and 10% distribution, respectively.](https://kodekloud.com/kk-media/image/upload/v1752859564/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Versions-Aliases/aws-lambda-aliases-diagram.jpg)

## Key Takeaways

- Versions provide immutable snapshots of your Lambda function at a given time.
- The "latest" version is mutable, representing your active development state.
- Aliases act as fixed pointers to a specific version and can also facilitate traffic splitting between versions.

> [!important]
> **Summary Note**
>
> Leveraging Lambda versions and aliases allows for controlled deployments and smoother transitions between different versions of your function. This is essential for maintaining stability while implementing new features or fixes.

![The image is a summary slide explaining key points about AWS Lambda, including version immutability, the latest version identifier, alias functionality, and traffic splitting.](https://kodekloud.com/kk-media/image/upload/v1752859565/notes-assets/images/AWS-Certified-Developer-Associate-Lambda-Versions-Aliases/aws-lambda-summary-key-points.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/3c842ffc-5841-456d-9fad-7bb3af5fdbfc/lesson/e998391a-f537-410e-b742-c091ecd67b03)**
>
> Watch video content
