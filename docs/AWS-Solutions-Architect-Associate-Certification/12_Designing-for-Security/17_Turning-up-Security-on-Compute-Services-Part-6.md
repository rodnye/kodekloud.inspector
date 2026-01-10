# Turning up Security on Compute Services Part 6 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Compute-Services-Part-6)

---

## Table of Contents

- Turning up Security on Compute Services Part 6
  - Lambda in Media Applications
  - AWS Lambda Shared Responsibility
  - Best Practices for Environment Variables
  - Securing Lambda Execution and Permissions
  - Leveraging AWS X-Ray and GuardDuty
  - AWS Step Functions: Orchestration and Security
  - AWS Serverless Application Model (SAM)
  - AWS Serverless Application Repository (SAR) and Logging
  - AWS Amplify: A Managed Deployment Option
  - Hybrid Computing with AWS Outposts
  - ECS, EKS Anywhere, and Container Management
  - VMware Cloud on AWS
  - AWS Snow Family
  - Summary
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Compute Services Part 6

In this lesson, we dive into the serverless domain with a focus on AWS Lambda. Introduced in 2013–2014, Lambda has quickly become a key component in modern applications by enabling serverless computing and event-driven architectures.

Consider the following architecture diagram. A CloudFormation stack creates multiple resources where a user interacts with APIs (for product, basket, and order management) through an API Gateway. Depending on the URL or endpoint accessed, the gateway routes the request to the corresponding Lambda function that communicates with its dedicated DynamoDB backend. Within this microservices setup, individual functions (e.g., product handling, basket management, ordering) trigger events in EventBridge or dispatch messages to SQS queues. This diagram illustrates a straightforward microservices product predominantly powered by AWS Lambda.

![The image is a diagram of an AWS cloud architecture featuring microservices for products, baskets, and ordering, using AWS Lambda and DynamoDB, with an API Gateway and EventBridge for event handling. It also includes an SQS queue and is managed with CDK CloudFormation.](https://kodekloud.com/kk-media/image/upload/v1752864135/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/aws-cloud-architecture-microservices-diagram.jpg)

> [!important]
> **Key Concept**
>
> AWS Lambda simplifies deployment and management by handling much of the heavy lifting such as infrastructure management, allowing you to focus on your application's business logic.

## Lambda in Media Applications

Consider a media company using Lambda to process and transcode large video files. One major challenge is ensuring that Lambda functions complete processing within the maximum execution time limit of 15 minutes (up from 5 minutes earlier). When facing the risk of transcoding jobs exceeding this limit, several strategies can be implemented:

1.  Increase the Lambda memory allocation (which boosts CPU and memory but may not guarantee completion).
2.  Split the video file into smaller chunks, processing each chunk with a separate Lambda invocation.
3.  Set the Lambda function timeout to the maximum allowed limit and hope for timely completion (this is not advisable).
4.  Store video files in Amazon S3 and trigger processing via S3 events (useful but does not guarantee completion within 15 minutes).

The optimal strategy is to split the video into smaller chunks, ensuring individual invocations complete within the execution window.

![The image presents a scenario where a media company is using AWS Lambda to process large video files and lists four strategies to ensure the functions complete within the execution time limit. The strategies include increasing memory allocation, splitting video files into chunks, setting maximum timeout, and using Amazon S3 for triggering processing.](https://kodekloud.com/kk-media/image/upload/v1752864136/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/aws-lambda-video-processing-strategies.jpg)

## AWS Lambda Shared Responsibility

AWS Lambda is a highly managed service. Similar to other managed services, AWS minimizes the customer’s responsibilities regarding data encryption, integrity, authentication, application management, internet access, and monitoring/logging. The diagram below illustrates the shared responsibility model for Lambda:

![The image illustrates the shared responsibility model for AWS Lambda, highlighting the security responsibilities of the customer and AWS. It categorizes responsibilities into areas like data encryption, application management, and infrastructure management.](https://kodekloud.com/kk-media/image/upload/v1752864137/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/aws-lambda-shared-responsibility-model.jpg)

For example, a fintech startup building a serverless application to handle sensitive financial transactions must focus on implementing proper IAM roles and permissions for their Lambda functions. Customers are responsible for access control configurations while AWS manages physical security and infrastructure updates.

![The image presents a scenario about a fintech startup using AWS Lambda and asks which actions align with the customer's responsibility in the AWS shared responsibility model. It lists four options related to security and infrastructure management.](https://kodekloud.com/kk-media/image/upload/v1752864139/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/fintech-aws-lambda-responsibility-model.jpg)

## Best Practices for Environment Variables

Lambda allows you to set environment variables (e.g., database host, database name) by default. However, it is best not to place sensitive information directly in these variables. Instead, consider using services like AWS Secrets Manager or the Systems Manager Parameter Store to securely retrieve sensitive data. Even though many databases now offer IAM integration—meaning permissions are defined in the Lambda runtime role—storing sensitive data directly in environment variables should be avoided.

![The image shows a user interface for managing environment variables, with fields for "ENVIRONMENT," "databaseHost," and "databaseName," each with a corresponding value and a "Remove" button. Below, there's a note about discussing environment variables, encrypted by default.](https://kodekloud.com/kk-media/image/upload/v1752864140/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/environment-variables-ui-management.jpg)

For instance, a healthcare company processing patient data with Lambda might choose to use encrypted environment variables to securely manage database credentials and API keys. Lambda’s built-in encryption mechanism ensures that stored data is encrypted at rest, providing an additional layer of security.

![The image presents a scenario where a healthtech company is using AWS Lambda to process patient data and is considering methods to securely manage encrypted environment variables. It lists four approaches for managing these variables, focusing on encryption and decryption strategies.](https://kodekloud.com/kk-media/image/upload/v1752864141/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/aws-lambda-encrypted-variables-strategies.jpg)

## Securing Lambda Execution and Permissions

It is critical to assign minimal necessary permissions using IAM roles when configuring Lambda functions. Never embed access keys or credentials directly in your code. The recommended approach is to create a role with the least privileges required and associate it with your Lambda function. Enhance your Lambda’s security by enabling monitoring and logging with CloudWatch, CloudTrail, and X-Ray. The use of AWS X-Ray provides detailed tracing of individual components during function execution.

![The image is a diagram illustrating the interaction between AWS Lambda, Amazon DynamoDB, Amazon CloudWatch Logs, and AWS IAM roles and policies, emphasizing the importance of permissions.](https://kodekloud.com/kk-media/image/upload/v1752864142/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/aws-lambda-dynamodb-architecture-diagram.jpg)

For example, a fintech company must configure roles with only the necessary permissions to access AWS services like S3 or DynamoDB, rather than using excessive privileges.

![The image presents a scenario where a fintech company is using AWS Lambda for financial transactions and needs to securely manage permissions for accessing other AWS services. It lists four approaches for managing these permissions.](https://kodekloud.com/kk-media/image/upload/v1752864144/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/aws-lambda-fintech-permissions-management.jpg)

## Leveraging AWS X-Ray and GuardDuty

Integrate AWS X-Ray with your Lambda functions by ensuring that the execution role has the permissions to send trace data. There is no need to manually embed the X-Ray SDK in your code—Lambda automatically handles much of the integration. This native capability offers an end-to-end view of your application’s performance and activity.

![The image is a service map diagram showing AWS Lambda's integration with other services like DynamoDB and Amazon Rekognition, highlighting average processing times and transaction rates. It illustrates the flow from clients to various AWS services.](https://kodekloud.com/kk-media/image/upload/v1752864144/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/aws-lambda-service-map-diagram.jpg)

Additionally, AWS GuardDuty can monitor CloudWatch logs and other data sources to detect potential vulnerabilities and threats. GuardDuty’s capabilities extend to Lambda, checking for any security anomalies and ensuring enhanced protection.

![The image presents a scenario where a fintech company is considering using AWS GuardDuty to monitor AWS Lambda functions for security threats, with four suggested implementation steps.](https://kodekloud.com/kk-media/image/upload/v1752864146/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752864146/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/aws-guardduty-lambda-security-steps.jpg)

## AWS Step Functions: Orchestration and Security

AWS Step Functions provide orchestration for workflows by coordinating multiple AWS services. Think of these as the modern evolution of the Simple Workflow Service (SWF). For example, a media company might utilize Step Functions to manage a video processing pipeline, where the state machine handles the sequence of tasks.

When designing secure state machines, avoid storing sensitive data directly within the state machine. Instead, implement roles with fine-grained permissions for each state to ensure that only authorized services are accessed.

![The image presents a scenario where a media company is developing a video processing pipeline using AWS Step Functions, and it lists four practices to ensure a secure and efficient state machine.](https://kodekloud.com/kk-media/image/upload/v1752864148/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/aws-step-functions-video-pipeline.jpg)

For financial transactions and other event-driven architectures, consider using Amazon EventBridge to capture external events and trigger the appropriate Step Functions state machine. This push model is both reliable and cost-effective compared to continuous polling.

![The image presents a scenario where a fintech company is building a serverless event-driven architecture using AWS Step Functions, with four suggested approaches for ensuring secure and efficient processing.](https://kodekloud.com/kk-media/image/upload/v1752864149/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/fintech-serverless-architecture-aws.jpg)

## AWS Serverless Application Model (SAM)

The Serverless Application Model (SAM) simplifies the deployment and management of serverless resources. SAM leverages AWS IAM for permission management, and many security features—such as data encryption, logging, and monitoring—are inherited from AWS services. For example, a healthcare startup managing patient records via SAM should avoid embedding sensitive configuration data directly into SAM templates. Instead, use SAM’s support for fine-grained IAM permissions to secure each resource.

![The image presents a scenario where a healthcare startup is using AWS Serverless Application Model (SAM) to manage patient records, emphasizing the importance of security. It lists four practices to ensure secure serverless applications, focusing on configuration data, IAM permissions, deployment, and logging.](https://kodekloud.com/kk-media/image/upload/v1752864150/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/aws-sam-healthcare-security-practices.jpg)

When developing with the SAM CLI, ensure that your local testing environment mirrors production closely. This reduces the risk of deployment issues by preventing direct development-to-production pushes without proper staging and testing.

## AWS Serverless Application Repository (SAR) and Logging

The Serverless Application Repository (SAR) serves as an image registry for serverless solution patterns. When deploying applications from SAR—especially in sensitive environments like healthcare—thoroughly review the source code, documentation, and associated permissions to ensure compliance with industry regulations. It is also crucial to log all activities for monitoring and auditing using CloudWatch, CloudTrail, and AWS Config.

![The image presents a scenario where a healthcare company is considering using the AWS Serverless Application Repository to deploy applications securely and compliantly. It lists four practices the company could adopt, focusing on reviewing source code, using search functionality, and ensuring compliance.](https://kodekloud.com/kk-media/image/upload/v1752864151/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/aws-serverless-application-practices.jpg)

## AWS Amplify: A Managed Deployment Option

AWS Amplify offers a simplified deployment experience, especially for web and mobile applications backed by Lambda functions. Amplify automatically secures data both in transit and at rest, providing significant security advantages over self-managed systems. Additionally, its native integration with CloudWatch facilitates comprehensive logging of user activity and error metrics.

![The image presents a scenario where a media company is considering using AWS Amplify for a web application, highlighting four security benefits: automatic data encryption, built-in antivirus, third-party identity integration, and automatic server patching.](https://kodekloud.com/kk-media/image/upload/v1752864152/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/aws-amplify-security-benefits.jpg)

For startups developing mobile e-commerce apps, using AWS Amplify with its built-in CloudWatch logging ensures that user activities and errors are monitored effectively, enhancing overall application security.

![The image presents a scenario where a startup is using AWS Amplify for a mobile app, with a focus on logging user activities and errors for auditing. It lists four AWS Amplify features to consider for this requirement.](https://kodekloud.com/kk-media/image/upload/v1752864153/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/aws-amplify-mobile-app-logging.jpg)

## Hybrid Computing with AWS Outposts

Hybrid computing integrates on-premises hardware with AWS services. AWS Outposts extends AWS infrastructure into your data center, allowing you to run AWS services locally while maintaining secure connectivity with the cloud through Direct Connect or VPN. Outposts requires connectivity for updates and configuration changes, ensuring continuous integration with AWS security tools.

For instance, when deploying a Kubernetes cluster with Amazon EKS on Outposts, it is vital to use IAM for worker nodes, ensuring that the nodes only access necessary AWS services securely.

![The image is a diagram illustrating AWS Step Functions, showing a workflow involving services like Amazon SQS, Lambda, API Gateway, DynamoDB, Comprehend, Translate, and Pinpoint. It highlights the process flow and interactions between these services.](https://kodekloud.com/kk-media/image/upload/v1752864154/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/aws-step-functions-workflow-diagram.jpg)

When securing EKS on Outposts, follow these best practices:

- Use IAM roles that grant least-privilege permissions.
- Avoid creating full administrative users.
- Prevent storing credentials on hardware.

![The image presents a scenario where an e-commerce company is deploying a Kubernetes cluster using Amazon EKS on AWS Outposts, with four options for ensuring the security of EKS worker nodes.](https://kodekloud.com/kk-media/image/upload/v1752864156/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/kubernetes-eks-security-options.jpg)

Furthermore, secure IAM integration on Outposts by assigning roles with specific, least-privilege permissions for each resource rather than relying on broad administrative rights.

![The image presents a scenario where a manufacturing company is integrating AWS Outposts with IAM for secure access control, and it lists four steps to ensure secure IAM integration.](https://kodekloud.com/kk-media/image/upload/v1752864157/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/aws-outposts-iam-integration-steps.jpg)

## ECS, EKS Anywhere, and Container Management

For organizations looking to extend container workloads on-premises, ECS and EKS Anywhere offer integrated solutions. These services allow deployment and management of containers in traditional data centers while maintaining AWS-level security and IAM integration. For example, a global retail company running containerized applications with ECS must ensure that the ECS Anywhere agent has proper permissions for secure communication with AWS.

![The image presents a scenario where a fintech company is considering using AWS GuardDuty to monitor AWS Lambda functions for security threats, with four suggested implementation steps.](https://kodekloud.com/kk-media/image/upload/v1752864146/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752864146/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/aws-guardduty-lambda-security-steps.jpg)

Similarly, when using EKS Anywhere, leverage AWS connectors and IAM to manage Kubernetes clusters securely so that integration with AWS services remains seamless.

## VMware Cloud on AWS

VMware Cloud on AWS is a unique solution where most security responsibilities are managed through VMware’s suite of tools (vRealize, vCenter, vSAN, and vSphere) rather than AWS-specific configurations. This approach benefits organizations by providing a familiar IT environment alongside AWS’s global infrastructure. For multinational companies migrating on-premises VMware environments to the cloud, the seamless integration between VMware tools and AWS services eliminates the need for major refactoring.

## AWS Snow Family

The AWS Snow Family, which includes devices like Snowcone and Snowball, offers hardened solutions for edge computing and temporary on-site data processing under limited connectivity conditions. Although these devices support compute functionalities similar to EC2, they only offer a subset of instance types. For a global research organization needing remote data processing, the compute version of the Snowball device is particularly well-suited for on-site processing and secure data transfer back to the cloud.

![The image describes a scenario where a global research organization needs to process and transfer data from remote locations using AWS Snow Family solutions. It lists four options: AWS Snowcone, AWS Snowball, AWS Snowmobile, and AWS Snowpark, each with a brief description of their capabilities.](https://kodekloud.com/kk-media/image/upload/v1752864158/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-6/aws-snow-family-data-transfer-options.jpg)

## Summary

Securing compute services on AWS spans various environments—from virtual machines and containers to serverless and hybrid setups. For fully managed services like AWS Lambda, Step Functions, SAM, Amplify, and hybrid solutions such as Outposts, ECS/EKS Anywhere, and the Snow Family, the focus is on leveraging AWS’s built-in security features (encryption, IAM, logging, and tracing) and following best practices. Although traditional infrastructure like EC2 offers more granular control (e.g., OS-level security and patching), managed services relieve you of such burdens, allowing you to concentrate on proper configuration, access management, and monitoring.

If you have followed along, you are now better equipped to design and secure diverse compute environments on AWS. In upcoming sections, we will explore additional services and design considerations to further enhance your cloud security expertise.

Learn more about these AWS services in the official [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/5f745843-5957-4bac-8d0b-9abfe1ecfd08)**
>
> Watch video content
