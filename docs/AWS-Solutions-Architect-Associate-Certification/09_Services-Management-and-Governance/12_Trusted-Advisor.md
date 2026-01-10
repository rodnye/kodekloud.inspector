# Trusted Advisor - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Management-and-Governance/Trusted-Advisor)

---

## Table of Contents

- Trusted Advisor
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Management and Governance

# Trusted Advisor

In this lesson, we explore AWS Trusted Advisor—a vital tool designed to provide real-time guidance and help you adhere to AWS best practices. By continuously reviewing your environment, Trusted Advisor offers actionable recommendations in key areas such as cost optimization, security, fault tolerance, and performance enhancement.

For instance, consider an EC2 instance deployed within a Virtual Private Cloud (VPC). AWS Trusted Advisor evaluates your instance configuration and suggests adjustments, such as implementing security group rules, to significantly strengthen your network security.  
![The image illustrates the use of AWS Trusted Advisor to enhance network security by implementing security group rules for Amazon EC2 within a Virtual Private Cloud (VPC).](https://kodekloud.com/kk-media/image/upload/v1752865392/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Trusted-Advisor/aws-trusted-advisor-network-security.jpg)

Another common scenario involves managing an S3 bucket. Trusted Advisor recommends enabling lifecycle policies to archive data and shift objects to more cost-effective storage classes, thereby reducing your monthly expenses.  
![The image illustrates a process involving Amazon S3 and AWS Trusted Advisor, highlighting the enablement of lifecycle policies for data archiving and cost reduction.](https://kodekloud.com/kk-media/image/upload/v1752865395/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Trusted-Advisor/amazon-s3-aws-trusted-advisor-lifecycle.jpg)

> [!important]
> **Key Benefits**
>
> The main advantages of using AWS Trusted Advisor include:
>
> - **Cost Optimization:** Detect idle resources and underutilized services (e.g., redundant RDS instances or EBS volumes) to lower costs.
> - **Performance Improvement:** Analyze usage patterns and configurations, such as EBS throughput or EC2 compute usage, to enhance efficiency.
> - **Enhanced Security:** Identify potential security risks like exposed access keys or overly permissive S3 bucket policies, and implement recommended best practices.
> - **Fault Tolerance and Reliability:** Receive advice on how to bolster the resilience of your deployments.
> - **Service Quota Monitoring:** Get alerts when resource usage approaches 80% of preset limits.

![The image outlines five benefits: cost optimization, performance, security, fault tolerance, and service quotas, each with a brief description and icon.](https://kodekloud.com/kk-media/image/upload/v1752865396/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Trusted-Advisor/benefits-cost-performance-security-diagram.jpg)

For exam preparation, it's important to remember that AWS Trusted Advisor is the service that provides prescriptive advice to optimize your deployments. When asked which AWS service offers recommendations to improve system configurations or deployments, the correct answer is AWS Trusted Advisor.

For further details on cloud optimization and security best practices, consider checking out the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/3c1ec40a-853a-4bf0-a4de-d53993e309f0/lesson/2dea6393-56cd-4ac4-a4e8-caabf00504a1)**
>
> Watch video content
