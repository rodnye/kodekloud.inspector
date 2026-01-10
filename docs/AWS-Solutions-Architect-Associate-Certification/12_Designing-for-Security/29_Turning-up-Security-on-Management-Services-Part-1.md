# Turning up Security on Management Services Part 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Management-Services-Part-1)

---

## Table of Contents

- Turning up Security on Management Services Part 1
  - Provisioning Services and CloudFormation Security
  - Cloud Development Kit (CDK) and Its Security Considerations
  - Observability: CloudWatch, X-Ray, and Data Protection
  - Managed Prometheus and Grafana
  - Trusted Advisor, Launch Wizard, and Compute Optimizer
  - Summary
  - Watch Video
    - CloudWatch for Monitoring and Logging
    - AWS X-Ray for Tracing
    - Personal Health Dashboard
    - Amazon Managed Service for Prometheus
    - Amazon Managed Grafana
    - AWS Trusted Advisor
    - AWS Launch Wizard
    - AWS Compute Optimizer

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Management Services Part 1

Welcome to this comprehensive lesson on Designing for Security. In this article, we delve into security measures for various AWS management and governance services. We focus on the importance of secure provisioning and observability, highlighting best practices and key considerations when working with these highly managed services.

---

## Provisioning Services and CloudFormation Security

AWS CloudFormation, the leading infrastructure-as-code tool, allows you to create and manage AWS resources based on a template you author. Typically, you craft a CloudFormation template, store it locally or in an S3 bucket, load it into the CloudFormation engine, and then create the associated stack.

![The image is an infographic explaining AWS CloudFormation, showing a process of creating or using a template, saving it locally or in an S3 bucket, and using CloudFormation to create and configure stack resources.](https://kodekloud.com/kk-media/image/upload/v1752864327/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/aws-cloudformation-infographic-template.jpg)

When deploying infrastructure with CloudFormation, pay close attention to the following security aspects:

- Secure storage of sensitive information.
- Assigning appropriate permissions to CloudFormation during execution.  
  For example, if CloudFormation is tasked with creating 15 resources but is granted permissions for only 14, the stack creation will fail. Ensure the IAM roles and policies specified in your template align with the minimum permissions required for each resource.

![The image illustrates a process involving AWS CloudFormation, showing how a customer account uses a template to create a cross-account role, which is then sent to an SNS topic in another company's AWS account. It highlights the importance of IAM permissions in CloudFormation's security.](https://kodekloud.com/kk-media/image/upload/v1752864328/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/aws-cloudformation-cross-account-role.jpg)

A best practice is to define a tailored IAM role (or a set of roles) that grants only the necessary permissions for each component of your template. Remember, if no specific user or role is provided, CloudFormation operates with the permissions of the initiating user. Also, avoid embedding sensitive credentials directly in your template; instead, utilize services like [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/) or the [Systems Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html).

![The image provides guidance on using AWS CloudFormation to manage IAM access, emphasizing defining specific IAM roles for each resource type to ensure minimum necessary permissions. It presents four options, highlighting the importance of tailored permissions for security compliance.](https://kodekloud.com/kk-media/image/upload/v1752864330/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/aws-cloudformation-iam-access-guidance.jpg)

Sensitive data should be referenced using secure strings from the Parameter Store or managed via Secrets Manager with automatic rotation. Additionally, CloudFormation logs stack creation events in both its Events tab and AWS CloudTrail, making monitoring and review straightforward.

![The image is a diagram illustrating the use of AWS Secrets Manager with AWS CloudFormation to manage security credentials, emphasizing not to include sensitive credentials in CloudFormation templates.](https://kodekloud.com/kk-media/image/upload/v1752864330/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/aws-secrets-manager-cloudformation-diagram.jpg)

CloudWatch Events and CloudTrail further enhance security by tracking all stack-related changes.

![The image shows an AWS CloudFormation console with a list of stack events, including timestamps, statuses, and types. It also mentions that CloudFormation reports events to CloudTrail and the CF console.](https://kodekloud.com/kk-media/image/upload/v1752864332/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/aws-cloudformation-stack-events-console.jpg)

---

## Cloud Development Kit (CDK) and Its Security Considerations

AWS Cloud Development Kit (CDK) version 2 similarly transforms your code into CloudFormation templates. Security in the CDK framework hinges on the careful definition of roles and permission assignments within your constructs. When designing resources in languages such as TypeScript or Python, ensure that the IAM roles you define provide only the minimum necessary privileges.

![The image illustrates the structure of a Cloud Development Kit (CDK) application, showing how code in languages like TypeScript or Python is converted into CloudFormation templates to manage AWS resources like SQS, Lambda, S3, and DynamoDB.](https://kodekloud.com/kk-media/image/upload/v1752864333/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/cdk-application-structure-cloudformation.jpg)

The CDK offers the flexibility to define resource roles and permissions as part of your application code. This approach not only streamlines infrastructure provisioning but also embeds security best practices from the onset.

![The image illustrates a Cloud Development Kit (CDK) application architecture, showing constructs like Amazon SQS, AWS Lambda, Amazon S3, and Amazon DynamoDB, with a focus on security roles and permissions. It also highlights integration with AWS CloudFormation and supports multiple programming languages.](https://kodekloud.com/kk-media/image/upload/v1752864334/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/cdk-application-architecture-diagram.jpg)

Furthermore, CDK allows you to associate roles for the deployed resources directly within your deployment script, ensuring that both the provisioning process and the running services adhere to defined permissions.

![The image is an informational graphic about using the AWS Cloud Development Kit (CDK) to manage IAM roles for cloud infrastructure deployment. It presents four options for how the CDK can handle IAM roles, focusing on automation and security.](https://kodekloud.com/kk-media/image/upload/v1752864335/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/aws-cdk-iam-roles-graphic.jpg)

---

## Observability: CloudWatch, X-Ray, and Data Protection

### CloudWatch for Monitoring and Logging

AWS CloudWatch is central to collecting metrics, logs, alarms, events, X-Ray traces, and insights. It is essential for ensuring performance monitoring, health assessment, and timely alarm notifications. Although data is encrypted by default in CloudWatch, exercise caution to avoid unintentional exposure of sensitive information in logs or canaries. Data protection policies within log groups can help mask or filter sensitive elements such as email addresses, social security numbers, or credit card details.

![The image presents a scenario where a company uses AWS CloudWatch to monitor cloud infrastructure, with four options detailing how to utilize CloudWatch features for performance tracking, alarms, and log storage.](https://kodekloud.com/kk-media/image/upload/v1752864337/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/aws-cloudwatch-monitoring-options.jpg)

![The image is a diagram illustrating the AWS migration process, including portfolio assessment and migration steps for servers, databases, and web apps. It also mentions CloudWatch encryption and potential PII leakage into logs and canaries.](https://kodekloud.com/kk-media/image/upload/v1752864338/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/aws-migration-process-diagram.jpg)

Set up data identifiers and designate secure destinations for log data—such as S3, Kinesis Firehose, or CloudWatch Logs—to enforce filtering and masking rules.

![The image provides guidance for a healthcare organization on using AWS CloudWatch Logs to protect sensitive patient data, suggesting methods like enabling data protection policies, manual redaction, encryption, and access control.](https://kodekloud.com/kk-media/image/upload/v1752864339/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/aws-cloudwatch-logs-data-protection.jpg)

### AWS X-Ray for Tracing

AWS X-Ray offers end-to-end tracing capabilities for monitoring user sessions across your AWS environment. With data encryption enabled by default via AWS KMS, secure access to trace data should only be granted to authorized users via well-defined IAM roles. If any trace segments contain sensitive information, configure sampling rules to exclude those segments as necessary.

![The image is a diagram illustrating the components and workflow of AWS X-Ray, showing how application code, scripts, and tools interact with the X-Ray API and console. It highlights the integration with various SDKs and clients, and mentions that X-Ray is highly managed and encrypts by default.](https://kodekloud.com/kk-media/image/upload/v1752864340/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/aws-xray-components-workflow-diagram.jpg)

![The image outlines security measures for a financial services company using AWS X-Ray, suggesting encryption with AWS KMS, storing data on private servers, disabling tracing for sensitive data, and using AWS CloudTrail for sensitive requests.](https://kodekloud.com/kk-media/image/upload/v1752864342/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/aws-security-measures-financial-services.jpg)

![The image presents strategies for a company using AWS X-Ray to prevent exposure of personally identifiable information (PII) in trace data, including configuring sampling rules, using annotations, enabling automatic redaction, and storing data in encrypted S3 buckets.](https://kodekloud.com/kk-media/image/upload/v1752864343/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/aws-xray-pii-protection-strategies.jpg)

### Personal Health Dashboard

The AWS Personal Health Dashboard (PHD), accessible via Systems Manager, provides a real-time status board for monitoring AWS service events that could impact your resources. Although the dashboard may display sensitive information, all data is encrypted and securely managed by AWS. Ensure that only users with specific permissions have access to this dashboard.

![The image outlines key features of the AWS Personal Health Dashboard, including real-time alerts, automated remediation, continuous security assessment, and detailed performance metrics for maintaining AWS resources.](https://kodekloud.com/kk-media/image/upload/v1752864344/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/aws-personal-health-dashboard-features.jpg)

![The image shows a slide about the AWS Health or Personal Health Dashboard (PHD), highlighting its features and security practices, with a screenshot of the dashboard interface displaying account health and operational issues.](https://kodekloud.com/kk-media/image/upload/v1752864345/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/aws-health-dashboard-features-screenshot.jpg)

---

## Managed Prometheus and Grafana

### Amazon Managed Service for Prometheus

AWS recently introduced a managed service for Prometheus, which competes with CloudWatch by gathering metrics in a highly managed environment. Standard security measures—including encryption, logging, and IAM-based access—are in place. Access is secured via VPC endpoints, and integrating its API calls with CloudTrail enables comprehensive auditing.

![The image is a diagram illustrating the environment setup for a managed service for Prometheus, showing the flow of metrics from various sources to Amazon Managed Service for Prometheus and then to Amazon Managed Service for Grafana. It highlights the use of VPC endpoints and mentions features like encryption, logging, and IAM.](https://kodekloud.com/kk-media/image/upload/v1752864346/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/prometheus-managed-service-diagram.jpg)

![The image outlines key security considerations for implementing Amazon Managed Service for Prometheus, emphasizing IAM roles, public access, encryption, and network firewalls.](https://kodekloud.com/kk-media/image/upload/v1752864347/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/amazon-prometheus-security-considerations.jpg)

CloudTrail logs API calls made by Prometheus to ensure operational transparency and compliance.

![The image is a guide for integrating Amazon Managed Service for Prometheus with AWS CloudTrail, providing four options for logging and compliance.](https://kodekloud.com/kk-media/image/upload/v1752864349/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/amazon-prometheus-cloudtrail-integration-guide.jpg)

### Amazon Managed Grafana

Amazon Managed Grafana offers rich data visualization by integrating with multiple AWS services and data sources. Unlike other AWS services that depend on IAM for authorization, Managed Grafana uses Amazon Identity Center or third-party identity providers such as Okta. This model means that dashboard access is controlled externally from IAM policies, though AWS CloudTrail and CloudWatch still assist in auditing and monitoring access.

![The image outlines security measures for a retail company using Amazon Managed Grafana, including implementing network ACLs, using identity providers for authentication, encrypting data with AWS KMS, and configuring IAM roles for access control.](https://kodekloud.com/kk-media/image/upload/v1752864350/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/retail-security-amazon-grafana.jpg)

![The image shows a slide about Amazon Managed Grafana, featuring a dashboard with various metrics like response time and annotations, alongside text explaining logging and permission modes.](https://kodekloud.com/kk-media/image/upload/v1752864351/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/amazon-managed-grafana-dashboard-slide.jpg)

Managed Grafana supports multiple permission models, including service-managed and customer-managed permissions. For robust, fine-grained access control, customer-managed permissions are recommended.

![The image is a guide on applying permission models for Amazon Managed Grafana in a multinational corporation with multiple AWS accounts. It outlines four steps for using service-managed and customer-managed permissions.](https://kodekloud.com/kk-media/image/upload/v1752864353/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/amazon-grafana-permission-models-guide.jpg)

---

## Trusted Advisor, Launch Wizard, and Compute Optimizer

### AWS Trusted Advisor

AWS Trusted Advisor offers proactive recommendations to help optimize cost, performance, fault tolerance, and security. For security-focused guidance, Trusted Advisor highlights issues like overly permissive IAM policies or the absence of multi-factor authentication. While it does not directly resolve these issues, it provides actionable insights that can help close security gaps.

![The image describes how a financial services company can use AWS Trusted Advisor to identify security risks and enhance security measures, highlighting four specific capabilities of the service.](https://kodekloud.com/kk-media/image/upload/v1752864354/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/aws-trusted-advisor-security-capabilities.jpg)

### AWS Launch Wizard

AWS Launch Wizard guides you through the deployment of applications by providing a step-by-step setup for environments such as Kubernetes or SQL Server. When using Launch Wizard, verify that necessary IAM roles are either specified or created during the process, ensuring that deployments are performed securely.

![The image is an infographic about AWS Launch Wizard, explaining its process for deploying applications with steps like choosing applications, entering specifications, and configuring resources. It highlights the tool's ability to help deploy, cost, and implement best practices for various services on AWS.](https://kodekloud.com/kk-media/image/upload/v1752864355/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/aws-launch-wizard-infographic.jpg)

![The image explains how AWS Launch Wizard manages IAM permissions for deploying a Microsoft SQL Server, presenting four different approaches to handling roles and permissions.](https://kodekloud.com/kk-media/image/upload/v1752864356/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/aws-launch-wizard-iam-permissions.jpg)

### AWS Compute Optimizer

AWS Compute Optimizer provides recommendations to optimize resource usage—including instance types and sizes—for both cost and performance improvements. Although Compute Optimizer carries minimal inherent security implications, proper IAM permissions are required for cross-account access via Trusted Access mode, which extends its recommendation capabilities.

![The image describes how AWS Compute Optimizer can help a large enterprise optimize its cloud infrastructure for cost and performance, with four options detailing different aspects of its functionality.](https://kodekloud.com/kk-media/image/upload/v1752864358/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/aws-compute-optimizer-enterprise.jpg)

![The image is an informational graphic discussing the role of trusted access in AWS Compute Optimizer for a multinational corporation's cloud infrastructure management, focusing on cross-account access and its impact on security and optimization. It presents four points about trusted access and its necessity for AWS services.](https://kodekloud.com/kk-media/image/upload/v1752864359/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Management-Services-Part-1/trusted-access-aws-compute-optimizer.jpg)

---

## Summary

In this lesson, we reviewed key elements to secure your AWS management services:

- Ensure proper IAM role management and safeguard sensitive data in CloudFormation templates.
- Use the AWS Cloud Development Kit (CDK) to embed security best practices directly into your code.
- Leverage observability tools like CloudWatch and X-Ray to monitor performance while enforcing data protection measures.
- Explore the security models of new services such as Amazon Managed Prometheus and Amazon Managed Grafana.
- Adopt AWS Trusted Advisor, Launch Wizard, and Compute Optimizer to gain actionable insights and optimize both security and efficiency.

> [!important]
> **Key Takeaway**
>
> By following these practices, you can design an AWS infrastructure that is secure, compliant, and resilient, ensuring that your cloud environment remains robust against potential threats.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/beddaa01-9817-4880-b1d0-e6e49084b1b9)**
>
> Watch video content
