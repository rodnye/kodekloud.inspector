# AWS Shared Responsibility Model for Security - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Security-and-Compliance/AWS-Shared-Responsibility-Model-for-Security)

---

## Table of Contents

- AWS Shared Responsibility Model for Security
  - Traditional On-Premises Security
  - Transition to Cloud Security
  - Service Models
  - Conclusion
  - Watch Video
    - AWS Responsibilities
    - Customer Responsibilities
    - Infrastructure as a Service (IaaS)
    - Platform as a Service (PaaS)
    - Software as a Service (SaaS)

---

## Content

AWS Cloud Practitioner CLF-C02

Security and Compliance

# AWS Shared Responsibility Model for Security

In this article, we explore the AWS Shared Responsibility Model, a security paradigm that defines the division of security roles between AWS and its customers. Understanding this model is crucial for ensuring the safety of your cloud infrastructure and applications.

## Traditional On-Premises Security

Before cloud computing emerged, all security responsibilities were managed on-premises. In a traditional physical data center, organizations handled every aspect of security, including:

- **Physical Security:** Controlling access to data centers so that only authorized personnel can enter.
- **Network Security:** Safeguarding data transmissions using firewalls and other network devices.
- **Server Security:** Maintaining and protecting physical servers.
- **Operating System Security:** Regularly patching and updating operating systems to fix vulnerabilities.
- **Application Security:** Ensuring applications are secure and free of bugs or vulnerabilities.

![The image outlines traditional security measures: securing data centers, networking, servers, operating systems, and applications, emphasizing authorized access and vulnerability patching.](https://kodekloud.com/kk-media/image/upload/v1752861735/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Shared-Responsibility-Model-for-Security/frame_90.jpg)

In such environments, organizations were solely responsible for managing the entire security lifecycle.

## Transition to Cloud Security

Migrating to the cloud introduces a shared responsibility model. Here, AWS handles security "of" the cloud, which refers to the underlying infrastructure, while customers manage security "in" the cloud by securing their applications and data.

### AWS Responsibilities

AWS takes charge of securing the physical foundation of its cloud. Their responsibilities include:

- Operating secure data centers across regions, availability zones, and edge locations.
- Protecting compute power, storage, databases, and networking components.
- Ensuring robust physical security measures to prevent unauthorized access.

![The image illustrates the AWS Shared Responsibility Model, detailing security responsibilities between the customer and AWS for cloud services.](https://kodekloud.com/kk-media/image/upload/v1752861736/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Shared-Responsibility-Model-for-Security/frame_160.jpg)

### Customer Responsibilities

As a customer, your role is to secure the elements you deploy on AWS. This includes:

- **Operating System Security:** Securing and updating the operating systems on your virtual servers.
- **Network Configuration:** Establishing firewall rules and managing network settings.
- **Application Security:** Writing and maintaining secure application code.
- **Client-Side Security:** Implementing encryption and managing secure access with services like Identity and Access Management (IAM).
- **Data Security:** Ensuring that your data is protected through robust security measures.

> [!important]
> **Note**
>
> For optimal security, always follow industry best practices and AWS security guidelines when managing your resources.

## Service Models

AWS offers various service models, each with different shared responsibility scopes:

### Infrastructure as a Service (IaaS)

[IaaS](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2), such as Amazon EC2, provides virtual machines along with the underlying hardware. Here, AWS secures the physical infrastructure, while you are responsible for the operating system, network configuration, and any software running on the virtual machine.

![The image illustrates AWS as an IaaS provider, featuring Amazon Elastic Compute Cloud (EC2) and a touch interface icon, with "Copyright KodeKloud" noted.](https://kodekloud.com/kk-media/image/upload/v1752861737/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Shared-Responsibility-Model-for-Security/frame_250.jpg)

### Platform as a Service (PaaS)

[AWS Lambda](https://learn.kodekloud.com/user/courses/aws-lambda) exemplifies PaaS. With Lambda, you simply upload your code, and AWS manages the underlying physical infrastructure, operating system, and runtime environment. Your primary responsibility is ensuring your application code is secure.

### Software as a Service (SaaS)

In the SaaS model, the service provider manages nearly all aspects of the service. As a customer, you are responsible only for managing and inputting your data securely.

![The image features AWS with icons for Amazon WorkMail, Amazon Chime, and Amazon WorkDocs, representing SaaS solutions.](https://kodekloud.com/kk-media/image/upload/v1752861738/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-AWS-Shared-Responsibility-Model-for-Security/frame_320.jpg)

## Conclusion

The AWS Shared Responsibility Model clearly delineates the security tasks managed by AWS and those managed by the customer. By securing the cloud infrastructure, AWS enables you to focus on protecting the applications and data you deploy. This clear division of responsibilities helps maintain a secure environment across all layers of your technological stack.

> [!important]
> **Final Thought**
>
> Adopting the AWS Shared Responsibility Model is essential for any organization moving to the cloud, as it ensures that both infrastructure and applications are safeguarded against threats.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/4528372a-a177-43ff-b4b6-236c0eee4029/lesson/506f061c-93f9-4a33-bc3b-8444eb75ebc6)**
>
> Watch video content
