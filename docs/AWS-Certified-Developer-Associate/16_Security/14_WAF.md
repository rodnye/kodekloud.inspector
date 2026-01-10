# WAF - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Security/WAF)

---

## Table of Contents

- WAF
  - Understanding Web ACLs
  - Data Flow in AWS WAF
  - Use Cases and Advantages
  - Key Benefits of AWS WAF
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Security

# WAF

In this lesson, we explore the Web Application Firewall (WAF) and its role in defending your web applications from common exploits. AWS WAF helps protect against Layer 7 attacks, including those outlined in the OWASP Top 10 such as SQL injection and cross-site scripting (XSS) attacks.

## Understanding Web ACLs

Web ACLs are central to configuring AWS WAF. They consist of a collection of rules designed to evaluate incoming web requests. When a client request enters the system, the WAF compares it against the rules specified in the Web ACL. For instance, a rule might verify whether the request originates from a certain IP address or uses a particular HTTP method. When a request meets one of these conditions, an associated action is triggered. Typical actions include:

- Dropping the request.
- Forwarding the request.
- Redirecting the request.

These rules determine how the WAF handles incoming traffic and ensure that your system remains secure.

> [!important]
> **Note**
>
> AWS WAF's granular control over web requests allows you to tailor your security policies according to specific threat scenarios and compliance requirements.

## Data Flow in AWS WAF

When a client sends a request, it reaches the AWS WAF before being processed by your backend infrastructure. The WAF runs the request through the list of rules defined in your Web ACL. Depending on the rule evaluation, the request is either forwarded to your backend or blocked to prevent potential security breaches.

![The image is a diagram illustrating the flow of data through AWS WAF, showing connections from a client to AWS WAF, then to WebACL, and finally to API Gateway, CloudFront, and Load Balancer.](https://kodekloud.com/kk-media/image/upload/v1752859416/notes-assets/images/AWS-Certified-Developer-Associate-WAF/aws-waf-data-flow-diagram.jpg)

## Use Cases and Advantages

AWS WAF is versatile in its application:

- It protects against web attacks, including SQL injection, cross-site scripting, and cross-site request forgery (CSRF).
- It secures APIs exposed to the internet from unauthorized access.
- For serverless architectures that use AWS Lambda, AWS WAF integrates seamlessly with API Gateway to add an extra layer of security.
- Operating at the application layer, the WAF inspects and filters HTTP traffic with precision.
- Its integration with AWS Firewall Manager and AWS CloudWatch supports robust security and compliance management.

![The image lists five use cases for a Web Application Firewall (WAF): protection against common web attacks, API security, protection for serverless applications, application layer firewall, and integration with other AWS services.](https://kodekloud.com/kk-media/image/upload/v1752859417/notes-assets/images/AWS-Certified-Developer-Associate-WAF/waf-use-cases-web-security.jpg)

## Key Benefits of AWS WAF

The table below summarizes the core benefits and use cases of AWS WAF:

| Benefit/Use Case                  | Description                                                                            |
| --------------------------------- | -------------------------------------------------------------------------------------- |
| Protection Against Web Attacks    | Shields applications from threats like SQL injection, XSS, and CSRF.                   |
| API Security                      | Secures APIs against unauthorized access and malicious requests.                       |
| Serverless Application Protection | Enhances security for applications built using AWS Lambda and API Gateway.             |
| Application Layer Inspection      | Filters HTTP traffic effectively at the application level.                             |
| Integration with AWS Ecosystem    | Seamlessly works with AWS Firewall Manager and AWS CloudWatch for enhanced management. |

> [!important]
> **Security Tip**
>
> For optimal use of AWS WAF, regularly update your Web ACL rules based on emerging threats and evolving application architectures.

## Summary

AWS WAF serves as a crucial line of defense against Layer 7 web exploits, including SQL injection and XSS attacks. By leveraging Web ACLs that consist of rules with specific conditions, you can define how incoming requests are processed—whether they are forwarded, dropped, or redirected. This capability helps ensure that your web applications and APIs remain secure while maintaining high performance.

![The image is a summary slide about AWS WAF, highlighting its protection against layer-7 web exploits, threats like SQL injection and XSS, and the use of WebACLs with rules for packet actions.](https://kodekloud.com/kk-media/image/upload/v1752859418/notes-assets/images/AWS-Certified-Developer-Associate-WAF/aws-waf-summary-layer7-protection.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/294fdab3-80dd-4183-aa7e-e5e3ffc9edd8/lesson/141d27d3-d809-46f3-8a5e-081d7ca9bb5e)**
>
> Watch video content
