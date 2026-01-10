# Shield and Shield Advanced - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Security/Shield-and-Shield-Advanced)

---

## Table of Contents

- Shield and Shield Advanced
  - AWS Shield Standard
  - AWS Shield Advanced
  - Key Features of AWS Shield Advanced
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Security

# Shield and Shield Advanced

In this lesson, we explore AWS Shield, Amazon's managed Distributed Denial of Service (DDoS) protection service. AWS Shield defends your applications from malicious attempts to disrupt network services by overwhelming them with excessive traffic. Understanding the basics of a DDoS attack is key: such an attack floods a network resource with illegitimate requests, effectively denying service to genuine users.

AWS Shield is available in two distinct tiers: AWS Shield Standard and AWS Shield Advanced.

## AWS Shield Standard

AWS Shield Standard is automatically activated for all AWS customers at no extra charge. It offers robust protection against common network layer (Layer 3) and transport layer (Layer 4) attacks such as SYN/UDP floods and reflection attacks.

## AWS Shield Advanced

AWS Shield Advanced is a premium service, available for an additional fee of $3,000 per month, that provides enhanced defense against more sophisticated DDoS attacks targeting services including EC2, ELB, CloudFront, Global Accelerator, and Route 53. This tier delivers advanced capabilities such as:

- **24/7 Access to the AWS DDoS Response Team (DRT):** Get custom mitigation strategies at any time during an attack.
- **Financial Safeguards:** AWS offers financial protection that helps mitigate unexpected billing spikes during a DDoS event.

> [!important]
> **Important**
>
> AWS Shield Advanced incurs an additional cost of $3,000 per month. Evaluate your application's risk profile to determine whether this enhanced security tier is necessary.

Below is a diagram that illustrates the architecture of AWS Shield and Shield Advanced. The diagram demonstrates how AWS Shield defends against threats from malicious actors while ensuring uninterrupted access for legitimate users to AWS services and associated Virtual Private Clouds (VPCs):

![The image illustrates the architecture of AWS Shield and Shield Advanced, showing how it protects against threats from hackers while allowing legitimate users access through various AWS services and a Virtual Private Cloud (VPC).](https://kodekloud.com/kk-media/image/upload/v1752865924/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Shield-and-Shield-Advanced/aws-shield-architecture-diagram.jpg)

## Key Features of AWS Shield Advanced

AWS Shield Advanced enhances your security posture with a suite of advanced features:

- **WAF Integration:** Integrate with AWS Web Application Firewall (WAF) to achieve comprehensive Layer 7 protection.
- **Automatic Application Layer DDoS Mitigation:** Automatically respond to and mitigate Layer 7 attacks with configurable settings.
- **Health Checks via Route 53:** Leverage Route 53 for effective health monitoring, reducing false positives by accurately detecting anomalous events.
- **Direct Access to the AWS Shield Response Team:** Receive immediate assistance from the AWS Shield Response Team during DDoS incidents.
- **Financial Safeguards:** Protect your budget from unexpected charging spikes that occur during DDoS attacks.

The diagram below summarizes these key features, highlighting AWS WAF integration, automatic application layer DDoS mitigation, and health-based detection:

![The image describes three features: AWS WAF Integration, Automatic Application Layer DDoS Mitigation, and Health-Based Detection, each with brief explanations.](https://kodekloud.com/kk-media/image/upload/v1752865925/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Shield-and-Shield-Advanced/aws-waf-ddos-mitigation-features.jpg)

Additionally, the following diagram emphasizes the role of the AWS Shield Response Team, proactive engagement during DDoS events, and the available cost protection measures:

![The image describes three features of AWS Shield: the AWS Shield Response Team (SRT) for DDoS attack assistance, Proactive Engagement for direct contact during attacks, and Cost Protection Opportunities for financial safeguards against DDoS-related billing spikes.](https://kodekloud.com/kk-media/image/upload/v1752865927/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Shield-and-Shield-Advanced/aws-shield-features-srt-engagement.jpg)

For further details on implementing AWS security measures, consider reviewing the [AWS Documentation](https://aws.amazon.com/shield/) and exploring additional resources on [DDoS Protection Best Practices](https://aws.amazon.com/architecture/ddos-protection/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6b2d9e18-1714-499c-83d4-4d1f7ff29e66/lesson/9d15a8f9-b4fd-4039-a906-ea359c665de2)**
>
> Watch video content
