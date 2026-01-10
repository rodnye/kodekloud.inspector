# Turning up Reliability on Compute Services Part 3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Reliability/Turning-up-Reliability-on-Compute-Services-Part-3)

---

## Table of Contents

- Turning up Reliability on Compute Services Part 3
  - AWS Lambda Performance and Resiliency
  - AWS Step Functions: Orchestrating Serverless Workflows
  - The Serverless Application Model (SAM)
  - AWS Serverless Application Repository (SAR)
  - AWS Amplify
  - Hybrid Computing – AWS Outposts
  - ECS and EKS Anywhere & VMware Cloud
  - The Snow Family
  - Summary
  - Watch Video
  - Practice Lab

---

## Content

AWS Solutions Architect Associate Certification

Designing for Reliability

# Turning up Reliability on Compute Services Part 3

In this article, we shift our focus from container-based compute services to serverless computing with AWS Lambda. AWS Lambda is a fully managed serverless platform where you don't need to manage the underlying servers. Instead, Lambda automatically runs your code in response to specific triggers. For example, if your function is invoked 1,000 times in a short amount of time, 1,000 independent instances are created concurrently. Each execution is isolated, which ensures optimal resiliency. This isolation, coupled with built-in features like retries, dead-letter queues, and log monitoring, significantly enhances the overall reliability of your serverless applications.

![The image is a diagram illustrating an AWS Lambda architecture with microservices for product, basket, and ordering, using AWS API Gateway, DynamoDB, SQS Queue, and EventBridge. It shows the flow of user requests through these services and the handling of events.](https://kodekloud.com/kk-media/image/upload/v1752863689/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-3/aws-lambda-microservices-architecture.jpg)

## AWS Lambda Performance and Resiliency

One common challenge with Lambda is managing cold starts. A cold start happens when a Lambda function initializes from scratch, which can add latency to function execution. To address this, AWS provides a feature called provisioned concurrency. With provisioned concurrency, you can reserve a set number of Lambda instances to remain “hot,” thereby reducing the latency caused by cold starts.

> [!important]
> **Lambda Resiliency Note**
>
> AWS Lambda manages many aspects of scaling, fault tolerance, and performance under the hood. However, you can also customize retry policies and configure dead-letter queues to handle function failures.

Security permissions are equally important. Incorrect IAM permissions can prevent a function from executing as expected. Lambda allows you to configure automatic retries and route failed events to a dead-letter queue for further analysis or reprocessing. You can customize these retry policies—setting the number of attempts, intervals, and whether to apply exponential backoff.

Monitoring and tracing are integrated into AWS Lambda. Standard tools include CloudWatch for logs and metrics, CloudTrail for API activity monitoring, and AWS Config for tracking configuration changes. AWS X-Ray further enhances visibility by providing in-depth analysis of your Lambda functions and their interactions with other services.

![The image illustrates the interaction between AWS Lambda, Amazon DynamoDB, and Amazon CloudWatch Logs, highlighting the roles of AWS IAM in managing access and execution policies.](https://kodekloud.com/kk-media/image/upload/v1752863690/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-3/aws-lambda-dynamodb-cloudwatch-iam.jpg)

When troubleshooting performance issues or resource limitations, CloudWatch metrics can help pinpoint throttling events or resource overuse. By default, an AWS account typically has 1,000 concurrent Lambda invocations, although these limits can be adjusted using the Service Quotas console.

![The image is a service map diagram showing AWS Lambda's integration with other services, including DynamoDB and Amazon Rekognition, along with performance metrics. It highlights AWS Lambda's use of standard monitoring tools and AWS X-Ray.](https://kodekloud.com/kk-media/image/upload/v1752863692/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-3/aws-lambda-service-map-diagram.jpg)

---

## AWS Step Functions: Orchestrating Serverless Workflows

AWS Step Functions offer a robust method to coordinate multiple AWS services into complex, serverless workflows. When processing large datasets in parallel, the failure of a single task should not break the entire workflow. The recommended approach is to integrate catchers within the parallel state. These catchers capture errors from individual tasks, allowing the state machine to continue execution by rerouting the error-handling flow.

![The image is a diagram illustrating an AWS Step Functions workflow, showing the integration of various AWS services like API Gateway, SQS, Lambda, Comprehend, Translate, and Pinpoint. It highlights the process flow from support and user inputs through different functions and services.](https://kodekloud.com/kk-media/image/upload/v1752863693/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-3/aws-step-functions-workflow-diagram.jpg)

For non-transient errors, it is essential to incorporate a catch field into your state definitions. This practice ensures that even when exceptions occur, the state machine can gracefully transition to an alternate execution path.

![The image presents a question about ensuring a parallel task failure doesn't stop an AWS Step Functions state machine, with four solution options: implementing a Lambda function for errors, using a Try/Catch block, setting MaxConcurrency to 1, and defining Catchers in the Parallel state.](https://kodekloud.com/kk-media/image/upload/v1752863694/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-3/aws-step-functions-parallel-failure-options.jpg)

![The image presents a question about designing a resilient workflow for handling non-transient failures in a state machine, with four options for custom error handling after retries are exhausted.](https://kodekloud.com/kk-media/image/upload/v1752863695/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-3/resilient-workflow-state-machine-errors.jpg)

---

## The Serverless Application Model (SAM)

The Serverless Application Model (SAM) is a framework that simplifies the development and deployment of serverless applications. SAM abstracts the underlying infrastructure, with AWS handling many resiliency features. For example, to ensure high availability and quick redeployment across regions, you can define a SAM template and use AWS CloudFormation StackSets.

![The image illustrates a serverless application model using AWS services, showing the flow from a user request to an HTTP API endpoint, invoking a Lambda function, and accessing a DynamoDB database. It highlights the use of IAM roles for permissions.](https://kodekloud.com/kk-media/image/upload/v1752863697/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-3/serverless-application-aws-diagram.jpg)

For enhanced resiliency, include configurations such as dead-letter queues in your SAM template. SAM also supports semantic versioning, which is beneficial for managing deployment rollbacks or upgrades in case of issues with new versions.

![The image presents a scenario where a Solutions Architect is designing a serverless application using AWS SAM, with a focus on redeploying in another region for high availability. It lists four options for facilitating this requirement, including using SAM's global deployment features and AWS CloudFormation StackSets.](https://kodekloud.com/kk-media/image/upload/v1752863698/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-3/serverless-application-aws-sam-deployment.jpg)

---

## AWS Serverless Application Repository (SAR)

AWS Serverless Application Repository (SAR) provides prebuilt Lambda templates and functions, which can be a great starting point for your serverless projects. While SAR itself has limited options for configuring resiliency directly, you can improve reliability by leveraging semantic versioning. This approach enables clear version control and straightforward rollbacks or forward rollouts in case of deployment issues.

![The image is a diagram explaining the AWS Serverless Application Repository process, including steps for searching, configuring, and deploying applications. It also mentions the importance of securing applications for reliability.](https://kodekloud.com/kk-media/image/upload/v1752863699/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-3/aws-serverless-application-repository-diagram.jpg)

![The image presents a scenario about deploying a serverless application from the AWS Serverless Application Repository, asking which feature should be used for easy redeployment or rollback. It lists four options: using AWS CloudFormation Drift Detection, enabling version control, utilizing semantic versioning, and relying on AWS Config rules.](https://kodekloud.com/kk-media/image/upload/v1752863700/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-3/aws-serverless-application-redeployment-options.jpg)

---

## AWS Amplify

AWS Amplify streamlines the deployment and hosting of web applications, particularly those built on serverless architectures. Amplify integrates with a variety of AWS services, including API Gateway, Lambda, and database services, and features tools like GraphQL transform to manage API versioning and maintain backward compatibility.

![The image illustrates how AWS Amplify integrates with various AWS services like Lambda, AppSync, and DynamoDB, along with monitoring tools such as CloudWatch, EventBridge, and CloudTrail. It shows a flow of data and notifications through these services.](https://kodekloud.com/kk-media/image/upload/v1752863701/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-3/aws-amplify-integration-diagram.jpg)

Amplify automatically integrates with CloudWatch to provide detailed performance insights through custom metrics, while also supporting AWS CloudTrail and AWS Config for enhanced security and operational monitoring.

![The image provides strategies for ensuring that AWS Amplify-generated APIs remain loosely coupled with the frontend, focusing on scalability and updates. It suggests implementing BaaS features, using Amplify DataStore, creating multiple environments, and designing the frontend to interact directly with backend APIs.](https://kodekloud.com/kk-media/image/upload/v1752863702/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-3/aws-amplify-api-strategies.jpg)

![The image presents a question about integrating AWS services with AWS Amplify to gain insights into application performance, followed by four options: AWS CloudTrail, Amazon QuickSight, Amazon Cognito, and AWS CloudWatch.](https://kodekloud.com/kk-media/image/upload/v1752863703/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-3/aws-amplify-integration-options.jpg)

---

## Hybrid Computing – AWS Outposts

Hybrid computing solutions bring the power of AWS services into your on-premises data centers with AWS Outposts. Outposts extends your Amazon VPC into your data center, connecting via AWS Direct Connect for a reliable private link between your on-premises network and AWS cloud services.

A reference architecture for AWS Outposts includes an Amazon VPC, an Outpost subnet, and a service anchor that routes traffic over a Direct Connect line to a customer edge router. Local infrastructure components, such as dedicated VLANs and local gateways, integrate AWS services like RDS and EC2. Although Outposts benefit from traditional data center resiliency—such as redundancy across racks and locations—many resiliency settings are determined by your local infrastructure design.

![The image is a networking reference architecture diagram for AWS Outposts Rack, illustrating connectivity for LAN, WAN, and Amazon VPC. It includes components like AWS regions, customer on-premises setups, and various network devices and connections.](https://kodekloud.com/kk-media/image/upload/v1752863704/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752863704/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-3/aws-outposts-rack-network-architecture.jpg)

Another diagram demonstrates an Outposts deployment supporting EKS with dual subnets: one for the management/control plane and another for data (including ALBs, volumes, and EC2 instances). While AWS provides robust connectivity and integration, the ultimate responsibility for ensuring a resilient data center lies with you.

![The image presents a scenario where an Outposts instance integrates with EKS and EC2 instances running containers, with clear separation between the control and data planes managed via local gateways and ALBs.](https://kodekloud.com/kk-media/image/upload/v1752863704/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752863704/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-3/aws-outposts-rack-network-architecture.jpg)

For regulatory compliance or low-latency needs, Outposts can also serve as primary or secondary failover sites, keeping critical data on-premises while maintaining connectivity with AWS cloud services.

---

## ECS and EKS Anywhere & VMware Cloud

AWS offers container orchestration solutions that extend beyond the cloud. ECS and EKS Anywhere enable you to run containerized applications on-premises while leveraging AWS management and control planes. In these cases, resiliency hinges on the robustness of your local data center architecture, including redundancy, security, and performance measures.

![The image presents a scenario where a Solutions Architect needs to design a containerized application that runs on-premises with AWS management. It lists four service options: AWS Outposts, Amazon ECS Anywhere, Amazon EKS, and AWS Fargate.](https://kodekloud.com/kk-media/image/upload/v1752863706/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-3/containerized-application-aws-options.jpg)

Similarly, VMware Cloud on AWS enables customers to integrate their existing on-premises vCenter environments with AWS resources. Here, resiliency strategies focus on ensuring operational consistency between on-premises VMware environments and the AWS cloud.

![The image is a diagram illustrating the integration of VMware on AWS, showing the transition from an on-premises vCenter to VMware Cloud on AWS, and access to native AWS services like EC2, S3, and RDS.](https://kodekloud.com/kk-media/image/upload/v1752863706/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Reliability-on-Compute-Services-Part-3/vmware-aws-integration-diagram.jpg)

---

## The Snow Family

Within the Snow family, devices are engineered for specific computing and data transfer use cases. For example, Snowmobile is designed primarily for large-scale storage and transfer, while Snowcone offers a compact, portable solution with built-in compute capabilities. Snowball devices incorporate resiliency through features such as RAID and error correction, with settings preconfigured by AWS to ensure security and durability.

For scenarios that require reliable data collection and transfer in remote or connectivity-constrained environments, Snowcone is an ideal choice—provided your dataset fits within its storage limitations.

---

## Summary

This module explored the resiliency considerations across a diverse range of compute services including:

- **AWS Lambda:** Achieves reliability through automatic scaling, provisioned concurrency, retries, and dead-letter queues.
- **AWS Step Functions:** Enhances workflow resiliency by incorporating catchers in parallel states to handle individual task failures.
- **Serverless Frameworks (SAM and SAR):** Utilize CloudFormation StackSets and semantic versioning to support high availability and straightforward rollbacks.
- **AWS Amplify:** Simplifies web application deployment and integrates seamlessly with AWS monitoring tools to maintain backend API resiliency.
- **Hybrid Solutions (AWS Outposts, ECS/EKS Anywhere, VMware Cloud):** Require robust local data center architectures while leveraging AWS connectivity.
- **Edge Devices (Snow Family):** Are preconfigured for resilient operations in data transfer and remote computing use cases.

Implementing redundancy through load balancing and autoscaling, coupled with effective monitoring, retry mechanisms, and data replication strategies, is key to developing resilient applications that withstand failures and minimize downtime.

Up next, we'll explore database resiliency in our next article.

---

For additional resources, please refer to:

- [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/)
- [AWS Step Functions Documentation](https://docs.aws.amazon.com/step-functions/)
- [Serverless Application Model (SAM)](https://aws.amazon.com/serverless/sam/)
- [AWS Outposts](https://aws.amazon.com/outposts/)
- [VMware Cloud on AWS](https://aws.amazon.com/vmware/)

Happy architecting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/2a99d085-acf0-4910-924f-737bfc1652da/lesson/21c8ae27-4a68-46bf-b831-1cd9a3d41efa)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/2a99d085-acf0-4910-924f-737bfc1652da/lesson/b8673565-eec3-4c55-8040-b30944928550)**
>
> Practice lab
