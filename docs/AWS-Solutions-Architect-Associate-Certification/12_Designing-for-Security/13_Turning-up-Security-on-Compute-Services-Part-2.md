# Turning up Security on Compute Services Part 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Compute-Services-Part-2)

---

## Table of Contents

- Turning up Security on Compute Services Part 2
  - AWS Image Builder
  - AWS Elastic Beanstalk
  - Integrating AWS X-Ray with Elastic Beanstalk
  - Conclusion
  - Watch Video
    - Scenario 1: Streamlining AMI Build and Deployment
    - Scenario 2: Ensuring Compliance for Migrating Applications
    - Typical Elastic Beanstalk Architecture
    - Scenario 3: Simplified Secure Deployment
    - Enhanced Health Reporting in Elastic Beanstalk

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Compute Services Part 2

In this article, we explore key AWS services for designing secure compute environments, focusing on AWS Image Builder and Elastic Beanstalk. We will discuss their benefits, scenarios where they excel, and best practices to enhance security in your AWS deployments.

---

## AWS Image Builder

AWS Image Builder is a managed service that automates the creation of secure Amazon Machine Images (AMIs). It functions similarly to [HashiCorp’s Packer](https://learn.kodekloud.com/user/courses/hashicorp-packer) and is reminiscent of tools like [Acronis](https://www.acronis.com) and [Clonezilla](https://clonezilla.org). With Image Builder, you can integrate source images, various software components, and region-specific configurations (such as instance type or subnet restrictions) to produce a secure base image for your instances.

> [!important]
> **Note**
>
> When using AWS Image Builder, remember that while the service automates the image creation process, you must still incorporate secure software updates and regularly scan for known vulnerabilities (CVEs) to maintain a secure AMI.

---

### Scenario 1: Streamlining AMI Build and Deployment

Consider a startup that wants to automate the build, test, and deployment process for their Amazon EC2 instances using EC2 Image Builder. For more complex requirements, you might also explore [HashiCorp’s Packer](https://learn.kodekloud.com/user/courses/hashicorp-packer).

![The image presents a scenario about a startup considering EC2 Image Builder to automate AMI processes, with four statements evaluating its benefits.](https://kodekloud.com/kk-media/image/upload/v1752864072/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-2/ec2-image-builder-ami-benefits.jpg)

**Evaluate the Benefits:**

1.  Image Builder allows users to manually patch AMIs, assuring they’re always up to date.  
    _Manual patching contradicts the principle of automation._
2.  EC2 Image Builder provides a fully managed service that simplifies the creation, maintenance, validation, and sharing of virtual machine or container images.  
    ✓ This is correct. (Note that Image Builder now also supports container images.)
3.  EC2 Image Builder is primarily designed to optimize the storage capacity of AMIs, reducing their size.  
    _This is not accurate._
4.  Image Builder can automatically convert AMIs into container images for use with EC.  
    _While image conversion is possible, it is not automated._

The correct answer is statement 2 because EC2 Image Builder streamlines the entire lifecycle of image management.

---

### Scenario 2: Ensuring Compliance for Migrating Applications

An organization migrating on-premises applications to AWS needs to update their EC2 instances regularly with patches and software updates while maintaining compliance. They are considering using Image Builder as part of a mutable infrastructure setup with potential integration of AWS Systems Manager or CodePipeline.

![The image describes a healthcare company's migration to AWS, highlighting the need for regular updates and compliance using EC2 Image Builder. It lists features of EC2 Image Builder that could assist in this process, such as automated pipelines and AMI replication.](https://kodekloud.com/kk-media/image/upload/v1752864073/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-2/healthcare-aws-migration-ec2-image-builder.jpg)

**Evaluate the Benefits:**

1.  Image Builder allows users to integrate third-party applications directly into the AMI process.  
    _Customization is possible; however, direct integration is not automated._
2.  EC2 Image Builder provides automated pipelines to build, test, deploy, customize, and secure images based on defined recipes.  
    _While additional services may be combined for full automation, this accurately captures the benefit._
3.  Image Builder can replicate AMIs across multiple AWS accounts or regions without additional configuration.  
    ✓ This statement is correct and highlights one of its key features.
4.  EC2 Image Builder offers a marketplace where users can purchase pre-built AMIs from other customers.  
    _AWS Marketplace exists, but it is not a feature of Image Builder._

The best answer here is statement 3 for its replication capability across regions with minimal configuration.

Remember: AWS Image Builder offers few direct security features—it's your responsibility to ensure that the underlying software is continuously updated and that known vulnerabilities are addressed.

---

## AWS Elastic Beanstalk

AWS Elastic Beanstalk serves as an orchestration service that simplifies the deployment of web applications by provisioning underlying services with secure default configurations. While basic security settings such as enabling SSL, encryption, and auto-scaling are managed through these underlying services, Elastic Beanstalk integrates these best practices to reduce deployment complexity.

### Typical Elastic Beanstalk Architecture

A common Elastic Beanstalk setup might include a cluster deployment with multiple standby instances (typically two, not one) and several web application servers organized within auto-scaling groups. This setup is further enhanced by additional services like CloudFront and S3 for content delivery and storage.

![The image is a diagram of an AWS Elastic Beanstalk architecture, showing components like EC2 instances, an Elastic Load Balancer, RDS databases, CloudFront distribution, and an S3 bucket. It illustrates the setup across two availability zones with auto-scaling groups.](https://kodekloud.com/kk-media/image/upload/v1752864074/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-2/aws-elastic-beanstalk-architecture-diagram.jpg)

Since Elastic Beanstalk leverages other AWS services for security, key security settings must be adjusted within those services. Despite Elastic Beanstalk featuring some checkboxes for best practices, robust security configurations typically reside in the integrated services.

---

### Scenario 3: Simplified Secure Deployment

A startup developing a web application seeks a simplified, secure deployment process with the ability to easily apply future updates. They are evaluating Elastic Beanstalk for this purpose.

**Key Feature Evaluation:**

1.  Elastic Beanstalk automatically encrypts all data.  
    _Encryption requires explicit configuration._
2.  Elastic Beanstalk allows for direct SSH access to running instances by default.  
    _This is not enabled by default._
3.  Elastic Beanstalk provides managed platform updates to ensure the runtime environment is updated with the latest patches.  
    ✓ This is correct.
4.  Elastic Beanstalk offers a built-in web application firewall with customizable rules.  
    _WAF functionality is not provided by default._

The best choice is statement 3, as managed updates help maintain a secure runtime environment.

Elastic Beanstalk logs events such as instance additions or transitions in environment health. These notifications are critical for staying on top of potential issues.

![The image shows a screenshot of recent events in AWS Elastic Beanstalk, detailing environment health transitions and instance changes with timestamps and status types.](https://kodekloud.com/kk-media/image/upload/v1752864075/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-2/aws-elastic-beanstalk-events-screenshot.jpg)

---

### Enhanced Health Reporting in Elastic Beanstalk

Enhanced health reporting in Elastic Beanstalk provides detailed metrics, logs, and real-time notifications about your application's health. It is particularly useful for rapidly growing e-commerce applications that require immediate visibility and issue resolution.

![The image is a question about Enhanced Health Reporting in AWS Elastic Beanstalk, with four statements to evaluate which one is true. It discusses features like integration with Amazon SNS and detailed metrics in the AWS Management Console.](https://kodekloud.com/kk-media/image/upload/v1752864076/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-2/enhanced-health-reporting-aws-eb.jpg)

**Evaluate the Statements:**

1.  Enhanced reporting only provides metrics beyond what the environment level offers and excludes instance-specific details.  
    _This is not true._
2.  Enhanced reporting automatically integrates with Amazon SNS to send real-time notifications about environment health.  
    ✓ This statement is correct.
3.  Enhanced health reporting requires manual configuration on each EC2 instance launched by Elastic Beanstalk.  
    _This is incorrect as it is enabled by default._
4.  Enhanced health reporting provides detailed metrics and logs that can be viewed directly in the AWS Management Console for quick resolution of issues.  
    ✓ This is also true.

Thus, statements 2 and 4 are correct.

---

## Integrating AWS X-Ray with Elastic Beanstalk

AWS X-Ray offers distributed tracing to monitor and troubleshoot applications by providing a detailed service map. In the service map, different performance colors help you quickly identify issues: green for acceptable performance, yellow for issues, and red for critical problems.

![The image shows a service map from AWS X-Ray, displaying interconnected nodes representing different services with performance metrics. It is part of an Elastic Beanstalk environment.](https://kodekloud.com/kk-media/image/upload/v1752864077/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Compute-Services-Part-2/aws-xray-service-map-elastic-beanstalk.jpg)

For startups deploying microservices-based applications, integrating AWS X-Ray is straightforward. To ensure a secure and effective integration, follow these best practices:

1.  Manually installing the X-Ray daemon is not recommended as it is unnecessary.
2.  Enable X-Ray directly from the Elastic Beanstalk configuration settings and ensure that the necessary IAM roles (with adequate permissions) are in place.  
    ✓ This is the recommended approach.
3.  Modify the application code to remove any logging mechanism.  
    _X-Ray complements existing logging; it does not replace it._
4.  Store X-Ray traces in an S3 bucket without encryption for easier access.  
    _Storing sensitive data without encryption is strongly discouraged._

The correct approach is to enable X-Ray through the Elastic Beanstalk configuration and verify that the required IAM roles are properly configured.

---

## Conclusion

This article covered essential aspects and scenarios for leveraging AWS Image Builder, implementing secure Elastic Beanstalk configurations, utilizing enhanced health reporting, and integrating AWS X-Ray. By understanding these components and best practices, you can significantly improve the security, management, and monitoring of your AWS deployments.

For further details on these services, consider exploring additional resources and documentation available on the [AWS Documentation](https://aws.amazon.com/documentation/) page.

Happy securing your cloud deployments!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/28bf2536-dfd7-49c3-8795-e0bda36797fb)**
>
> Watch video content
