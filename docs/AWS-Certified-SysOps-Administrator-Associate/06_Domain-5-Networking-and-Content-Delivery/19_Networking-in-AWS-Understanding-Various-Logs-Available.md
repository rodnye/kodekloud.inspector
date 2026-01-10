# Networking in AWS Understanding Various Logs Available - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-5-Networking-and-Content-Delivery/Networking-in-AWS-Understanding-Various-Logs-Available)

---

## Table of Contents

- Networking in AWS Understanding Various Logs Available
  - VPC Flow Logs
  - AWS CloudTrail Logs
  - Route 53 DNS Query Logs
  - ELB Access Logs
  - CloudFront Access Logs
  - Global Accelerator Flow Logs
  - AWS WAF Logs
  - Transit Gateway Flow Logs
  - Summary
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 5 Networking and Content Delivery

# Networking in AWS Understanding Various Logs Available

Welcome to this comprehensive guide on AWS networking logs. In this article, we explore the critical log types available for AWS networking, each playing an essential role in exam preparation and practical troubleshooting. The logs discussed include VPC Flow Logs, AWS CloudTrail Logs, Route 53 DNS Query Logs, ELB Access Logs, CloudFront Access Logs, Global Accelerator Flow Logs, AWS WAF Logs, and Transit Gateway Flow Logs.

---

## VPC Flow Logs

VPC Flow Logs capture detailed information about IP traffic reaching your VPC’s network interfaces. They can be delivered to Amazon S3 or CloudWatch Logs, making them invaluable for monitoring network connectivity, performing security analysis, and ensuring compliance. Tools like GuardDuty may leverage these logs to detect and analyze malicious network patterns.

![The image is a diagram illustrating VPC Flow Logs, showing data flow from Amazon EC2 and Elastic Load Balancing to Amazon S3 and CloudWatch. It highlights the capture of IP traffic information within a Virtual Private Cloud (VPC).](https://kodekloud.com/kk-media/image/upload/v1752860861/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Networking-in-AWS-Understanding-Various-Logs-Available/vpc-flow-logs-diagram-ec2-elb.jpg)

Flow Logs record extensive information, including source and destination IP addresses, protocols, data volumes, and firewall dispositions (accepted or dropped).

![The image lists four use cases for VPC Flow Logs: network monitoring, troubleshooting network connectivity, security analysis, and compliance auditing.](https://kodekloud.com/kk-media/image/upload/v1752860862/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Networking-in-AWS-Understanding-Various-Logs-Available/vpc-flow-logs-use-cases.jpg)

![The image lists data captured by VPC Flow Logs, including source and destination IPs, ports and protocols, volume of data, and traffic status.](https://kodekloud.com/kk-media/image/upload/v1752860864/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Networking-in-AWS-Understanding-Various-Logs-Available/vpc-flow-logs-data-summary.jpg)

---

## AWS CloudTrail Logs

AWS CloudTrail logs record every API call made against your AWS services and resources. These logs capture a wide range of actions—from starting or stopping services to configuration changes and login attempts—and can be generated via the AWS console, command line, or SDK. CloudTrail logs, stored in Amazon S3 or CloudWatch Logs and streamed to EventBridge as events, are crucial for auditing, compliance, troubleshooting, and security monitoring. Note that AWS CloudTrail is enabled by default for new accounts.

![The image is a diagram showing AWS CloudTrail logs capturing actions on AWS resources like S3, EC2, and Elastic Load Balancing, with outputs to S3 and CloudWatch.](https://kodekloud.com/kk-media/image/upload/v1752860864/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Networking-in-AWS-Understanding-Various-Logs-Available/aws-cloudtrail-logs-diagram.jpg)

![The image lists four use cases for AWS CloudTrail Logs: Auditing, Compliance, Troubleshooting, and Security Monitoring.](https://kodekloud.com/kk-media/image/upload/v1752860865/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Networking-in-AWS-Understanding-Various-Logs-Available/aws-cloudtrail-logs-use-cases.jpg)

![The image lists data captured by AWS CloudTrail logs, including API calls, caller identity, time of call, source IP address, and service response.](https://kodekloud.com/kk-media/image/upload/v1752860866/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Networking-in-AWS-Understanding-Various-Logs-Available/aws-cloudtrail-logs-data-summary.jpg)

---

## Route 53 DNS Query Logs

Route 53 DNS Query Logs provide detailed insights into DNS queries processed by Route 53, and they are useful for measuring query patterns, troubleshooting domain name resolution issues, and enhancing security monitoring. Additionally, GuardDuty can leverage this data for threat detection.

![The image is a diagram illustrating how Amazon Route 53 logs DNS query information, showing the flow from a user to Route 53, then to Amazon S3 and Amazon CloudWatch.](https://kodekloud.com/kk-media/image/upload/v1752860867/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Networking-in-AWS-Understanding-Various-Logs-Available/route-53-dns-query-logging-diagram.jpg)

![The image outlines three use cases for Amazon Route 53 DNS Query Logs: troubleshooting DNS issues, security monitoring, and analyzing query patterns.](https://kodekloud.com/kk-media/image/upload/v1752860868/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Networking-in-AWS-Understanding-Various-Logs-Available/amazon-route-53-dns-logs-use-cases.jpg)

![The image lists data captured by Amazon Route 53 DNS query logs, including domain names queried, query time, and response codes.](https://kodekloud.com/kk-media/image/upload/v1752860869/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Networking-in-AWS-Understanding-Various-Logs-Available/route-53-dns-query-logs.jpg)

---

## ELB Access Logs

Elastic Load Balancing (ELB) Access Logs deliver detailed request-level information processed by your load balancers. These logs reveal client IP addresses, request paths, response codes, and various timing details. They are essential for performance monitoring, troubleshooting load balancer or backend issues, conducting security analyses, and deriving user access patterns.

![The image is a diagram illustrating AWS Elastic Load Balancing (ELB) Access Logs, showing how requests are processed through ELB to Amazon EC2 instances and logged to Amazon S3.](https://kodekloud.com/kk-media/image/upload/v1752860870/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Networking-in-AWS-Understanding-Various-Logs-Available/aws-elb-access-logs-diagram.jpg)

![The image outlines four use cases for AWS Elastic Load Balancing (ELB) access logs: performance monitoring, troubleshooting, security analysis, and access pattern analytics.](https://kodekloud.com/kk-media/image/upload/v1752860871/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Networking-in-AWS-Understanding-Various-Logs-Available/aws-elb-access-logs-use-cases.jpg)

![The image lists data captured by AWS Elastic Load Balancing (ELB) access logs, including client IP addresses, request paths, response codes, request processing times, and backend response times.](https://kodekloud.com/kk-media/image/upload/v1752860872/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Networking-in-AWS-Understanding-Various-Logs-Available/aws-elb-access-logs-data.jpg)

---

## CloudFront Access Logs

CloudFront Access Logs record detailed information on requests received by the CloudFront CDN. These logs are similar to ELB logs but also include performance metrics that help diagnose content delivery issues and analyze access patterns.

![The image outlines three use cases for Amazon CloudFront Access Logs: performance monitoring, troubleshooting content delivery issues, and understanding access patterns.](https://kodekloud.com/kk-media/image/upload/v1752860873/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Networking-in-AWS-Understanding-Various-Logs-Available/amazon-cloudfront-access-logs-use-cases.jpg)

---

## Global Accelerator Flow Logs

AWS Global Accelerator provides global load balancing, with its flow logs capturing traffic data across all entry points. These logs, which are available in CloudWatch Logs or exportable to S3, include source and destination IPs, ports, protocols, and detailed packet and byte counts. They are effective for performance optimization, troubleshooting routing issues, and ensuring application availability.

![The image shows two use cases for AWS Global Accelerator Flow Logs: performance optimization and troubleshooting routing issues.](https://kodekloud.com/kk-media/image/upload/v1752860875/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Networking-in-AWS-Understanding-Various-Logs-Available/aws-global-accelerator-use-cases.jpg)

![The image lists data captured by AWS Global Accelerator Flow Logs, including source and destination IPs, ports, protocols, packet counts, and byte counts.](https://kodekloud.com/kk-media/image/upload/v1752860876/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Networking-in-AWS-Understanding-Various-Logs-Available/aws-global-accelerator-flow-logs.jpg)

---

## AWS WAF Logs

AWS Web Application Firewall (WAF) Logs capture metrics on web traffic that is allowed, blocked, or subjected to rate limiting based on your defined rules. They are critical for security monitoring, threat analysis, fine-tuning rules, and compliance auditing. Captured details often include source IP addresses, HTTP methods, headers, URLs, and the outcomes of rule evaluations.

![The image outlines four use cases for AWS Web Application Firewall (WAF) logs: security monitoring, threat analysis, rule tuning, and compliance.](https://kodekloud.com/kk-media/image/upload/v1752860878/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Networking-in-AWS-Understanding-Various-Logs-Available/aws-waf-logs-use-cases.jpg)

---

## Transit Gateway Flow Logs

Transit Gateway Flow Logs offer insights into network traffic traversing an AWS Transit Gateway, which can be used to interconnect VPNs, Direct Connect, and VPCs. These logs assist in monitoring both inter- and intra-VPC traffic, troubleshooting routing issues, and performing security analysis. They capture key data points such as source and destination IPs, ports, packet counts, byte counts, and traffic routing statuses.

![The image illustrates AWS Transit Gateway Flow Logs, showing network flow information between two VPCs (A and B) connected through an AWS Transit Gateway.](https://kodekloud.com/kk-media/image/upload/v1752860878/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Networking-in-AWS-Understanding-Various-Logs-Available/aws-transit-gateway-flow-logs.jpg)

![The image lists data captured by AWS Transit Gateway Flow Logs, including source and destination IPs, ports, packet counts, bytes, and traffic status (allowed or denied).](https://kodekloud.com/kk-media/image/upload/v1752860880/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Networking-in-AWS-Understanding-Various-Logs-Available/aws-transit-gateway-flow-logs-2.jpg)

---

## Summary

> [!important]
> **Key Takeaways**
>
> For managing AWS networking effectively, focus on the following logs:
>
> - **VPC Flow Logs:** Monitor network connectivity and troubleshoot issues.
> - **CloudTrail Logs:** Audit API actions across your AWS environment.
> - **Route 53 DNS Query Logs:** Resolve DNS problems and improve security monitoring.
> - **ELB Access Logs:** Gain insights into load balancing and client access patterns.

Other logs like CloudFront, Global Accelerator, WAF, and Transit Gateway flow logs are also significant. Their detailed data empowers professionals to enhance security monitoring, streamline troubleshooting, and maintain compliance in complex AWS environments.

We hope this guide helps solidify your understanding of AWS networking logs as you continue to master AWS technologies and prepare for certification exams.

---

For more details and additional resources, check out these helpful links:

- [AWS Documentation](https://aws.amazon.com/documentation/)
- [AWS Logging and Monitoring](https://aws.amazon.com/monitoring/)
- [AWS Certified SysOps Administrator – Associate](https://aws.amazon.com/certification/certified-sysops-admin-associate/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/fd99c412-5efc-46e2-99ce-bb9c581fec27/lesson/87b76b7f-9cdf-461a-aa5a-e40189f1f8e8)**
>
> Watch video content
