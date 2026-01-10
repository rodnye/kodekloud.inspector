# WAF and Shield Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/WAF-and-Shield-Overview)

---

## Table of Contents

- WAF and Shield Overview
  - Web Application Firewall (WAF)
  - AWS Shield
  - Conclusion
  - Watch Video
  - Practice Lab
    - Use Cases and Integrations
    - Components of WAF

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# WAF and Shield Overview

In this article, we explore two essential AWS services—Web Application Firewall (WAF) and AWS Shield—that work in tandem to secure your web applications and protect your infrastructure from various attacks.

## Web Application Firewall (WAF)

WAF protects your web application by monitoring HTTP and HTTPS traffic at Layer 7. It defends against common threats such as SQL injection and cross-site scripting by inspecting incoming traffic and ensuring that only legitimate requests reach your application.

![The image illustrates the concept of a Web Application Firewall (WAF), showing how it monitors HTTP requests from clients before they reach web applications.](https://kodekloud.com/kk-media/image/upload/v1752860691/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-WAF-and-Shield-Overview/web-application-firewall-waf-diagram.jpg)

Key benefits of WAF include flexible rule sets, automatic scaling, and cost-effective monitoring. It supports the protection of RESTful APIs and web applications hosted on various AWS services such as Lambda, API Gateway, and EC2.

![The image lists features of a Web Application Firewall (WAF), including firewall for web apps, flexibility, scalability, and cost-effectiveness.](https://kodekloud.com/kk-media/image/upload/v1752860692/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-WAF-and-Shield-Overview/waf-features-flexibility-scalability.jpg)

### Use Cases and Integrations

WAF actively protects exposed endpoints operating over HTTP or HTTPS. It integrates seamlessly with services including:

- Amazon CloudFront (via a simple checkbox)
- API Gateway
- Application Load Balancer
- AWS AppSync
- AWS Cognito
- AWS App Runner
- AWS Verified Access

By filtering requests based on IP addresses, HTTP headers, URI strings, and geo-location, WAF helps safeguard your applications against common web attacks.

![The image lists five use cases for a Web Application Firewall (WAF): protection against common web attacks, API security, protection for serverless applications, application layer firewall, and integration with other AWS services.](https://kodekloud.com/kk-media/image/upload/v1752860693/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-WAF-and-Shield-Overview/waf-use-cases-web-security.jpg)

### Components of WAF

WAF is composed of several key components managed via a centralized dashboard:

- **Web ACLs:** Define rules to either allow, block, or count a request.
- **Rule Groups:** Collections of rules that can be custom-defined or sourced from managed rule groups available through AWS or the AWS Marketplace.

> [!important]
> **Note**
>
> Each AWS resource can associate with only one Web ACL at a time, although a single ACL can protect multiple resources.

![The image illustrates the components of AWS WAF, including the WAF Dashboard, Web ACLs, Rules, Rule Groups, Managed Rule Groups, and Conditions.](https://kodekloud.com/kk-media/image/upload/v1752860694/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-WAF-and-Shield-Overview/aws-waf-components-dashboard-rules.jpg)

Rules in WAF may filter requests based on several criteria:

- IP address
- HTTP header information
- HTTP body content
- Size constraints
- Geo-match (to block or allow traffic from specific regions)
- Rate limits (e.g., requests per hour)

![The image is a diagram illustrating the flow of web access control lists (ACLs), showing conditions and actions organized into rules and rule groups, with icons representing a firewall and network components.](https://kodekloud.com/kk-media/image/upload/v1752860695/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-WAF-and-Shield-Overview/web-access-control-lists-diagram.jpg)

When multiple rules are in place, their evaluation order (determined by rule priority) dictates whether a request is allowed, denied, or simply counted. Lower numeric priority values represent higher precedence. For example, CloudFront uses a simple checkbox integration, whereas an Application Load Balancer may require a region-specific WAF setup.

![The image illustrates a network diagram showing a Web ACL with an Application Load Balancer (ALB), where traffic is directed to two instances in Region A and blocked from reaching Region B.](https://kodekloud.com/kk-media/image/upload/v1752860697/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-WAF-and-Shield-Overview/web-acl-alb-network-diagram.jpg)

![The image illustrates rule priority in a Web ACL, showing a list of rules with assigned priorities on the left and their corresponding order on the right.](https://kodekloud.com/kk-media/image/upload/v1752860697/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-WAF-and-Shield-Overview/web-acl-rule-priority-illustration.jpg)

AWS also provides managed rule groups that offer baseline protections for various use cases including SQL databases, Linux operating systems, IP reputation lists, and fraud control measures.

![The image lists AWS Managed Rules for AWS WAF, categorizing them into Baseline Rule Groups and Use-Case-Specific Rule Groups to protect against common web threats.](https://kodekloud.com/kk-media/image/upload/v1752860699/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-WAF-and-Shield-Overview/aws-waf-managed-rules-list.jpg)

Additional features include:

- IP reputation: Blocks traffic from known malicious sources.
- Fraud control: Prevents bot and malicious activity with CAPTCHA challenges.

![The image outlines AWS Managed Rules for AWS WAF, focusing on protecting against common web threats with IP reputation rule groups and fraud control rule groups.](https://kodekloud.com/kk-media/image/upload/v1752860700/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-WAF-and-Shield-Overview/aws-managed-rules-waf-protection.jpg)

![The image lists five AWS WAF intelligent threat mitigation options, including fraud control, bot control, and CAPTCHA rule actions.](https://kodekloud.com/kk-media/image/upload/v1752860701/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-WAF-and-Shield-Overview/aws-waf-threat-mitigation-options.jpg)

## AWS Shield

Transitioning to network-layer security, AWS Shield helps protect against Distributed Denial-of-Service (DDoS) attacks. DDoS attacks involve multiple compromised systems used by attackers to overwhelm services, often causing upset scaling costs.

AWS Shield is available in two variants:

- **Shield Standard:** A free service offered to all AWS accounts.
- **Shield Advanced:** A premium service that offers enhanced protection, access to the AWS security team, and automatic rule updates.

![The image illustrates a DDoS attack, showing a hacker using multiple bots to target a system.](https://kodekloud.com/kk-media/image/upload/v1752860704/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-WAF-and-Shield-Overview/ddos-attack-hacker-bots-illustration.jpg)

Shield Advanced can mitigate a variety of DDoS attack types, including:

- UDP reflection attacks: Exploit the stateless nature of UDP by spoofing requests.
- TCP SYN floods: Create incomplete connections that drain system resources.
- DNS query floods: Overwhelm DNS servers, disrupting service.
- Layer 7 attacks: Overload web servers with traffic, even when auto-scaling is active.

![The image lists examples of DDoS attacks, specifically "User Datagram Protocol reflection attacks" and "TCP SYN flood."](https://kodekloud.com/kk-media/image/upload/v1752860706/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-WAF-and-Shield-Overview/ddos-attack-examples-udp-tcp.jpg)

In a UDP reflection attack, spoofed UDP packets are sent to multiple reflectors, which then send a large volume of responses to the target, effectively causing an overload.

![The image illustrates a UDP reflection attack, showing the flow of a spoofed UDP packet from an attacker to a reflector, which then sends a large response to the target.](https://kodekloud.com/kk-media/image/upload/v1752860708/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-WAF-and-Shield-Overview/udp-reflection-attack-diagram.jpg)

Shield Advanced is priced at approximately $36,000 per year with an annual commitment. It protects all AWS edge entry points, offers access to the DDoS Response Team (DRT), and automatically updates rules in your WAF and Firewall Manager as threats evolve.

![The image compares AWS Shield and AWS Shield Advanced, highlighting their features and differences in DDoS protection services. AWS Shield is a free service, while AWS Shield Advanced offers more comprehensive protection for a fee.](https://kodekloud.com/kk-media/image/upload/v1752860709/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-WAF-and-Shield-Overview/aws-shield-comparison-ddos-protection.jpg)

Unlike WAF which focuses on Layer 7 protection, AWS Shield secures Layers 3, 4, and 7, covering IP, TCP, UDP, and HTTP attacks. Combining Shield with WAF creates a layered defense strategy, ensuring complete protection for both application and network layers.

![The image lists AWS Shield Advanced protected resources, including Amazon CloudFront, Amazon Route 53, Amazon EC2 with Elastic IP Address, and various load balancers.](https://kodekloud.com/kk-media/image/upload/v1752860711/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-WAF-and-Shield-Overview/aws-shield-advanced-resources-list.jpg)

Shield Advanced further enhances protection by offering proactive DDoS attack handling along with reviews from the Shield Response Team. This team provides custom network mitigations, optimized traffic management, and architectural guidance for frequently targeted infrastructures.

![The image describes three features of AWS: AWS Shield Response Team (SRT) for DDoS attack assistance, Proactive Engagement for direct contact during attacks, and Cost Protection Opportunities for financial safeguards against billing spikes.](https://kodekloud.com/kk-media/image/upload/v1752860714/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-WAF-and-Shield-Overview/aws-shield-srt-features.jpg)

![The image outlines four aspects of Shield Response Team (SRT) support: AWS WAF log analysis and rules, building custom network mitigations, network traffic engineering, and architectural recommendations.](https://kodekloud.com/kk-media/image/upload/v1752860718/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-WAF-and-Shield-Overview/srt-support-aws-waf-network-mitigations.jpg)

## Conclusion

WAF and AWS Shield together deliver comprehensive security for your infrastructure. Here is a summary of their roles:

| Service                          | Focus Area                                      | Key Benefit                                                                    |
| -------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------ |
| Web Application Firewall (WAF)   | Application Layer (Layer 7)                     | Protects against web attacks such as SQL injection, cross-site scripting, etc. |
| AWS Shield (Standard & Advanced) | Network & Application Layers (Layers 3, 4, & 7) | Defends against DDoS attacks and network-based threats                         |

By integrating WAF and Shield with AWS components like CloudFront, API Gateway, and various load balancers, you ensure robust security and maintain high availability under attack conditions. This layered defense strategy is essential for sustaining service uptime and controlling costs.

Thank you for reading this article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/97dec89c-f1f2-42a2-ad7c-af2b66e00bd5)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/11b726c2-0499-47d6-9e24-ead910bbf6d2)**
>
> Practice lab
