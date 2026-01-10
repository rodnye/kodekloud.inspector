# Turning up Security on Network Services Part 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Network-Services-Part-2)

---

## Table of Contents

- Turning up Security on Network Services Part 2
  - Designing for Global Architecture and VPC Deployment
  - Isolated Multi-VPC Architecture for Multinational Corporations
  - Default VPC vs. Custom VPCs for Startups
  - Subnet Design for Layer Segregation
  - Routing Between Tiers
  - Internet Gateways and Controlled Access
  - NAT Gateways for Outbound Traffic
  - Egress-Only Gateways for IPv6 Traffic
  - Secure DNS Resolution within a VPC
  - Elastic IP Addresses for Persistent Connectivity
  - Enhancing Network Performance with Specialized Adapters
  - Network Access Control Lists (NACLs)
  - Security Groups for Stateful Firewall Protection
  - Application Load Balancers (ALBs) and SSL/TLS Termination
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Network Services Part 2

In this article, we explore advanced AWS networking design strategies that enhance security while ensuring optimal performance. We cover global architectures, multi-VPC deployments, secure subnet design, and specialized networking features—all aimed at keeping customer data compliant with regional regulations and streamlining internal communications.

---

## Designing for Global Architecture and VPC Deployment

Imagine a global e-commerce company that must serve customers in North America, Europe, and Asia with low-latency access while ensuring local storage of customer data. To achieve this, it deploys applications in multiple VPCs—one per region (e.g., Virginia, Frankfurt, and Tokyo). A single VPC approach would risk cross-region data flow, even with replication in place.

Using Route 53, requests are directed to the nearest region to comply with data regulations like GDPR and minimize latency:

![The image is a diagram of an AWS Virtual Private Cloud (VPC) setup, showing components like public and private subnets, internet and egress-only gateways, NAT gateways, and VPC endpoints within a cloud account.](https://kodekloud.com/kk-media/image/upload/v1752864447/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/aws-vpc-setup-diagram.jpg)

---

## Isolated Multi-VPC Architecture for Multinational Corporations

Multinational corporations often require isolated VPC environments for each subsidiary to meet data sovereignty and regulatory standards. Although deploying separate VPCs with encrypted internet communication is an option, AWS VPC Peering provides a more secure alternative by leveraging AWS’s private backbone.

![The image presents a scenario where a multinational corporation is deploying a global application on AWS, requiring secure and compliant multi-VPC architecture for its subsidiaries. It lists four approaches to achieve this, focusing on VPC deployment and communication strategies.](https://kodekloud.com/kk-media/image/upload/v1752864448/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/aws-multinational-vpc-architecture.jpg)

---

## Default VPC vs. Custom VPCs for Startups

For startups launching web applications on AWS, time is of the essence. Using the default VPC can speed up deployment, provided that the security groups and network ACLs are modified to enforce the principle of least privilege. Keep in mind that the default VPC comes preconfigured with broad access, so manual adjustments are necessary for enhanced security.

![The image presents a scenario where a startup is using AWS to host a web application and needs to ensure security while minimizing VPC setup time. It lists four approaches for achieving these requirements.](https://kodekloud.com/kk-media/image/upload/v1752864449/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/aws-web-app-security-approaches.jpg)

By default, AWS provides each region with one default VPC and five additional customer VPCs, with more available upon request:

![The image is a comparison table between Default VPC and Custom/Nondefault VPC, detailing parameters such as creation, IPv4 address, internet access, and readiness for use.](https://kodekloud.com/kk-media/image/upload/v1752864450/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/vpc-comparison-default-custom-table.jpg)

---

## Subnet Design for Layer Segregation

For a retail company deploying an e-commerce application, separating the application and database layers reduces the risk of unauthorized access. Instead of isolating these layers across different VPCs, the best practice is to use multiple subnets within a single VPC. One subnet handles the application layer while another, secured by distinct firewall rules, serves the database layer.

![The image presents a scenario about a retail company deploying an e-commerce application on AWS, with four options for securely architecting the application while segregating different layers. Each option suggests different configurations of VPCs, subnets, and security settings.](https://kodekloud.com/kk-media/image/upload/v1752864452/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/aws-ecommerce-architecture-options.jpg)

For more complex setups like three-tier architectures, the web tier resides in a public subnet while the application and database tiers are isolated in private subnets with carefully configured routing and access control.

![The image presents a scenario where a retail company is deploying a multi-tier e-commerce application on AWS, with options for ensuring secure connectivity between web, application, and database tiers. Four approaches are listed for consideration.](https://kodekloud.com/kk-media/image/upload/v1752864453/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/aws-multi-tier-ecommerce-deployment.jpg)

A foundational diagram illustrating public and private subnets within a VPC is shown below:

![The image is a diagram of an AWS cloud account setup, illustrating a Virtual Private Cloud (VPC) with public and private subnets, availability zones, gateways, and services like Amazon Route 53 and Amazon S3.](https://kodekloud.com/kk-media/image/upload/v1752864455/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/aws-cloud-account-vpc-diagram.jpg)

---

## Routing Between Tiers

For multinational corporations running multi-tier web applications, configuring routing tables is crucial. Typically, only the web tier has a route to an Internet Gateway, while the application and database tiers remain isolated from direct internet exposure. Even if the primary focus is on protecting the database, restricting the application tier from direct internet access is a good security practice.

![The image presents a scenario about a multinational corporation deploying a multi-tier web application on AWS, with a question on managing traffic flow between tiers and the internet. It lists four approaches for configuring routing tables to ensure secure and functional connectivity.](https://kodekloud.com/kk-media/image/upload/v1752864456/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/aws-multinational-web-app-routing.jpg)

---

## Internet Gateways and Controlled Access

A software development company might deploy an application on AWS for testing that must be accessible through an Internet Gateway—exclusively to developers. While attaching an Internet Gateway is simple, security groups need to restrict inbound access to specific IP addresses. In many cases, companies enhance this configuration with remote hybrid connectivity.

![The image presents a scenario where a software development company is deploying an application on AWS, requiring secure internet access for developers. It lists four approaches to ensure the application is accessible while maintaining security.](https://kodekloud.com/kk-media/image/upload/v1752864457/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/aws-application-deployment-security-approaches.jpg)

---

## NAT Gateways for Outbound Traffic

For FinTech and financial analytics companies, applications in private subnets may need secure access to public APIs. Deploy a NAT Gateway in a public subnet and update the private subnet’s routing to direct outbound traffic through it. This configuration allows secure data retrieval from the internet without exposing the internal instances.

![The image is a diagram of an AWS cloud architecture featuring a Virtual Private Cloud (VPC) with public and private subnets, NAT gateways, and various components like NACLs, resolvers, and load balancing. It illustrates the network setup within an AWS cloud account, including internet and egress-only gateways.](https://kodekloud.com/kk-media/image/upload/v1752864458/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/aws-cloud-architecture-diagram.jpg)

---

## Egress-Only Gateways for IPv6 Traffic

In situations where an IPv6 application must download external datasets without accepting incoming IPv6 traffic, deploying an egress-only Internet Gateway is the ideal solution. Direct all IPv6 outbound traffic from private subnets to the gateway, ensuring that the application remains shielded from unsolicited inbound requests.

![The image presents a scenario where a research institution needs to securely access external datasets over IPv6 on AWS while keeping the application inaccessible from the internet. It lists four approaches to achieve this, including deploying an Egress-Only Internet Gateway and configuring route tables.](https://kodekloud.com/kk-media/image/upload/v1752864462/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/ipv6-secure-access-aws-datasets.jpg)

---

## Secure DNS Resolution within a VPC

For multi-tier applications, ensuring that EC2 instances communicate using private DNS names is fundamental to security. Enable DNS resolution and hostname settings within your VPC so that internal DNS queries do not traverse the public internet. One effective approach uses the Route 53 Resolver to connect an on-premises data center with AWS, allowing granular control over DNS query rules.

![The image presents a scenario where a software company needs to ensure secure and private DNS resolution for EC2 instances within a VPC on AWS. It lists four approaches to achieve this, focusing on DNS resolution and hostname settings.](https://kodekloud.com/kk-media/image/upload/v1752864463/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/secure-dns-resolution-ec2-vpc.jpg)

![The image is a diagram illustrating a DNS security design within a core networking context, showing the interaction between an on-premises data center and an Amazon Web Services (AWS) region. It includes components like DNS servers, a customer gateway, virtual private gateway, and AWS services such as EC2 instances and Route 53 Resolver.](https://kodekloud.com/kk-media/image/upload/v1752864464/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/dns-security-design-network-diagram.jpg)

---

## Elastic IP Addresses for Persistent Connectivity

For web applications hosted on EC2 instances, maintaining a consistent public IP address is critical, even after instance restarts. Assigning an Elastic IP (EIP) guarantees persistent public connectivity, unlike dynamically assigned public IPs that can change upon reboot.

![The image presents a scenario where a startup is deploying a web application on an AWS EC2 instance and needs to ensure persistent public IP addressing while maintaining security. It lists four approaches to address this requirement.](https://kodekloud.com/kk-media/image/upload/v1752864465/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/aws-ec2-web-app-deployment.jpg)

An additional diagram illustrates an EC2 instance with a dedicated Elastic IP, ensuring continuous connectivity:

![The image is a diagram illustrating an AWS architecture setup, showing an EC2 instance within a VPC, connected to an Elastic IP through a security group and an internet gateway.](https://kodekloud.com/kk-media/image/upload/v1752864466/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/aws-architecture-ec2-vpc-diagram.jpg)

---

## Enhancing Network Performance with Specialized Adapters

High-performance applications, such as multiplayer game backends or financial analytics platforms, demand low latency and high throughput. AWS offers two specialized networking options:

1.  **Elastic Network Adapter (ENA):** Provides consistent throughput and low latency for demanding applications. Ensure security groups and NACLs are tuned to optimize traffic flow.
2.  **Elastic Fabric Adapter (EFA):** Ideal for high-performance computing (HPC) environments, offering isolated, low-latency communication perfect for HPC workloads.

![The image presents a scenario where a financial analytics company is deploying a high-performance computing application on AWS, requiring low latency and secure network traffic. It lists four approaches to ensure network performance and security for the application.](https://kodekloud.com/kk-media/image/upload/v1752864467/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/aws-financial-analytics-hpc-deployment.jpg)

---

## Network Access Control Lists (NACLs)

NACLs provide stateless filtering at the subnet level. Consider the following use cases:

1.  **Securing Database Servers:** In a multi-tier application, configure NACLs on private subnets so that only traffic from web servers (within a specified IP range) is allowed, with outbound rules permitting necessary responses. (Remember that NACLs evaluate rules in order; deny rules should precede allow rules to be effective.)

    > [!important]
    > **Note**
    >
    > Ensure your NACL rules are strictly ordered, as misconfiguration may inadvertently allow unauthorized access.

    ![The image presents a scenario where a retail company is deploying a multi-tier web application on AWS, with options for configuring Network ACLs to secure database servers. It lists four approaches to ensure the database servers are secure and only accessible by the web servers.](https://kodekloud.com/kk-media/image/upload/v1752864469/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/aws-multi-tier-web-app-security.jpg)

2.  **Blocking Unauthorized Access:** For FinTech companies facing repeated attacks, implement top-priority deny rules in your NACL configurations to block known malicious IP ranges.
3.  **Allowing Outbound Connections:** For gaming companies, configure NACLs to allow all outbound traffic while restricting inbound traffic to ephemeral ports, ensuring only response traffic is accepted.

![The image presents a scenario where a gaming company needs to configure Network ACLs (NACLs) on AWS to allow outbound connections while denying unsolicited inbound traffic. It lists four configuration options for managing the traffic.](https://kodekloud.com/kk-media/image/upload/v1752864470/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/aws-nacls-gaming-company-traffic.jpg)

Additional diagrams illustrate broader VPC architectures featuring public/private subnets, NAT gateways, and load balancers:

![The image is a diagram of an AWS cloud account setup, illustrating a Virtual Private Cloud (VPC) with public and private subnets, network ACLs, NAT gateways, and other components like Elastic Load Balancing and VPC endpoints. It shows the network architecture within a region, including internet and egress-only gateways.](https://kodekloud.com/kk-media/image/upload/v1752864471/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/aws-cloud-account-vpc-diagram-2.jpg)

---

## Security Groups for Stateful Firewall Protection

Security Groups act as stateful firewalls and are essential for controlling traffic between instances within a VPC. Consider these scenarios:

1.  **Inter-Instance Communication:** For backend applications that need to communicate with database and cache layers, assign all related instances to a single security group. This allows free intra-group communication while blocking external access by default.

    ![The image presents a scenario where a company is deploying an application backend on AWS EC2 instances within a VPC and needs to ensure secure communication between instances while restricting external access. It lists four approaches involving Security Groups to achieve this.](https://kodekloud.com/kk-media/image/upload/v1752864472/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/aws-ec2-vpc-security-groups.jpg)

2.  **Layered Security Model:** For applications with multiple tiers (e.g., healthcare applications), create separate security groups for the web, application, and database layers. Limit communication between layers to only essential interactions to reduce cross-tier vulnerabilities.

    ![The image presents a scenario about a healthcare application deployed on AWS, discussing how to manage secure communication between different layers using Security Groups. It lists four approaches for ensuring restricted communication between the layers.](https://kodekloud.com/kk-media/image/upload/v1752864473/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/aws-healthcare-application-security-groups.jpg)

---

## Application Load Balancers (ALBs) and SSL/TLS Termination

Applications that process sensitive data, such as FinTech payment gateways, benefit from offloading SSL/TLS termination to an Application Load Balancer (ALB). By terminating the SSL/TLS connection at the ALB, the backend servers receive decrypted traffic, thereby reducing their computational load. AWS Certificate Manager simplifies public certificate management, ensuring smooth certificate rotation.

A diagram below illustrates an architecture with ALBs in public subnets and internal load balancers or application servers within private subnets:

![The image is a diagram illustrating the architecture of application load balancers within an AWS cloud environment, showing components like public subnets, EC2 instances, and both internet-facing and internal load balancers.](https://kodekloud.com/kk-media/image/upload/v1752864474/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-2/aws-application-load-balancer-architecture-diagram.jpg)

This deployment demonstrates how VPCs, subnets, and load balancers work together to provide secure and efficient communications.

---

This article has provided a comprehensive overview of AWS networking security strategies—from multi-VPC and subnet designs to specialized adapters, NACLs, and security groups. By configuring these components effectively, organizations can build architectures that are secure, scalable, and compliant with regional data regulations.

For more details on AWS security best practices and network design, explore the following resources:

- [AWS Security Best Practices](https://aws.amazon.com/architecture/security-best-practices/)
- [Understanding AWS VPCs](https://aws.amazon.com/vpc/)
- [AWS Networking Fundamentals](https://aws.amazon.com/networking/)

Happy architecting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/b1a29f04-8b2a-472f-8fd7-cc66369775e7)**
>
> Watch video content
