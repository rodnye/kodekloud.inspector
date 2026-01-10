# Turning up Security on Network Services Part 3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Designing-for-Security/Turning-up-Security-on-Network-Services-Part-3)

---

## Table of Contents

- Turning up Security on Network Services Part 3
  - Networking Load Balancers
  - Gateway Load Balancers
  - Transit Networking
  - Endpoints and PrivateLink
  - Edge Networking with CloudFront
  - DNS Security with Route 53
  - Conclusion
  - Watch Video
  - Practice Lab
    - VPN for Secure Data Transfer
    - Direct Connect and Enhanced Security
    - VPC Peering and Transit Gateway
    - Secure Access to External APIs
    - Accessing AWS Secrets Manager Securely
    - Field-Level Encryption
    - CloudFront Functions and Lambda@Edge
    - Route 53 Application Recovery Controller

---

## Content

AWS Solutions Architect Associate Certification

Designing for Security

# Turning up Security on Network Services Part 3

In this lesson, we explore advanced security design strategies for network services on AWS. We examine topics including networking load balancers, gateway load balancers, transit networking, secure endpoints with PrivateLink, and DNS security with Route 53. By leveraging these approaches, organizations can ensure that only authorized traffic reaches their critical resources while maintaining high performance and availability.

---

## Networking Load Balancers

Consider a scenario where a gaming company deploys a real-time multiplayer game on AWS. The backend is hosted on EC2 instances within a VPC, and it is crucial that only legitimate gaming traffic on a specific UDP port reaches the servers, with traffic distributed evenly across instances. Since UDP demands low latency and high throughput, a Network Load Balancer (NLB) is an excellent choice.

In previous implementations, security groups were not supported on load balancers; only Network ACLs (attached to subnets) were available. In this scenario, the recommended approach is to assign a security group to the NLB that permits traffic solely through the specified UDP port, while configuring a network ACL to allow all inbound and outbound traffic. Although reverse configurations or sole reliance on network ACLs are possible, security groups offer greater control and flexibility.

![The image presents a scenario where a gaming company is using AWS for a multiplayer game and needs to ensure secure traffic management. It lists four approaches involving Security Groups and Network ACLs to optimize security and ensure legitimate gaming traffic reaches backend servers.](https://kodekloud.com/kk-media/image/upload/v1752864475/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-3/aws-gaming-security-traffic-management.jpg)

---

## Gateway Load Balancers

Gateway load balancers are built to filter and inspect traffic when managing virtual appliances—such as firewalls—used for in-depth security inspections. For example, a global e-commerce company might deploy several virtual appliances in its VPC to inspect and filter traffic. By using an AWS Gateway Load Balancer, the company can scale the deployment uniformly while satisfying the security team’s requirements.

When implementing a gateway load balancer, ensure that routing and target groups are configured correctly to map application components and dependencies. The load balancer distributes incoming traffic across firewall appliances, which then perform deep packet inspection and enforce security policies.

![The image presents a scenario where a global e-commerce company is deploying virtual appliances using AWS Gateway Load Balancer, with four options for ensuring secure and resilient deployment. The options include considerations for dependencies, public access, accurate configuration, and manual management.](https://kodekloud.com/kk-media/image/upload/v1752864476/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-3/aws-gateway-load-balancer-deployment-options.jpg)

Reviewing the architecture, the application subnet routes traffic to a gateway load balancer endpoint. This endpoint directs traffic to the inspection appliances and then forwards approved traffic to the Internet Gateway.

![The image is a diagram illustrating the architecture of gateway load balancers, showing the flow of traffic between an application VPC, an appliance VPC, and various subnets and route tables.](https://kodekloud.com/kk-media/image/upload/v1752864477/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-3/gateway-load-balancer-architecture-diagram.jpg)

---

## Transit Networking

Transit networking ensures secure data transfers between on-premises data centers and AWS environments. Below are several key strategies:

### VPN for Secure Data Transfer

A healthcare organization uses AWS to host its patient management application while storing sensitive patient data on-premises. To securely transfer data for processing in the cloud, the organization plans to use an AWS site-to-site VPN with dynamic routing via BGP and encryption enabled. Although VPN connections occur over the internet, they provide encryption by default.

![The image presents a scenario where a healthcare organization needs to securely transfer patient data between its on-premises data center and AWS using a VPN. It lists four approaches to establish this secure connection, focusing on encryption and routing methods.](https://kodekloud.com/kk-media/image/upload/v1752864478/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-3/healthcare-vpn-data-transfer-aws.jpg)

A detailed diagram shows the VPN terminating at a Transit Gateway, which centralizes and distributes the connection to various VPCs for production, test, development, and shared purposes.

![The image is a diagram illustrating a VPN setup, showing a corporate data center connected to an AWS region via a site-to-site VPN connection, with a transit gateway linking to various VPCs (Production, Test, Development, and Infrastructure Shared Services).](https://kodekloud.com/kk-media/image/upload/v1752864479/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-3/vpn-setup-diagram-aws-transit-gateway.jpg)

### Direct Connect and Enhanced Security

For a multinational corporation transferring large amounts of data between on-premises data centers and AWS, AWS Direct Connect offers a dedicated connection without relying on the public internet. For even greater security, a VPN can be established over the Direct Connect connection, or MACsec can be used to encrypt data in transit.

![The image presents a scenario about a multinational corporation using AWS Direct Connect for secure data transfer between on-premises data centers and AWS. It lists four approaches to ensure data security during the transfer.](https://kodekloud.com/kk-media/image/upload/v1752864480/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-3/aws-direct-connect-data-security-approaches.jpg)

In the accompanying diagram, the corporate data center (customer gateway) connects via a Direct Connect partner to a virtual gateway (not a Transit Gateway), which then routes traffic to a specific VPC and its subnets.

![The image is a diagram illustrating AWS Direct Connect, showing the connection between an AWS cloud environment and a corporate data center. It includes components like VPC, subnets, routers, and gateways.](https://kodekloud.com/kk-media/image/upload/v1752864481/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-3/aws-direct-connect-diagram.jpg)

### VPC Peering and Transit Gateway

A large company manages three VPCs (Dev, UAT, and Prod) in separate AWS accounts with non-overlapping CIDR blocks. Although UAT is peered with both Prod and Dev, transitive routing is not allowed. Therefore, a direct VPC peering connection between Prod and Dev is necessary for effective communication.

Note that VPC peering only supports direct point-to-point connections; transitive routing across peered VPCs is not supported by AWS. Each communication channel must be explicitly established.

A transit gateway diagram illustrates how flexible routing and proper routing table permissions facilitate communication among multiple VPCs in a multi-VPC architecture while supporting disaster recovery.

![The image is a diagram illustrating an AWS transit gateway setup, showing a corporate data center connecting through a site-to-site VPN to a transit gateway, which in turn links to multiple VPCs in different regions.](https://kodekloud.com/kk-media/image/upload/v1752864482/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-3/aws-insurance-vpcs-code-release-options.jpg)

---

## Endpoints and PrivateLink

### Secure Access to External APIs

For a healthcare application that requires secure communication between microservices and an external API, utilizing a VPC endpoint through PrivateLink creates a secure route without exposing traffic on the public internet. When the external API is hosted within AWS (for example, by a partner), PrivateLink ensures that traffic remains private.

![The image presents a scenario about deploying a healthcare application on AWS, requiring secure communication with an external API. It lists four approaches for ensuring secure communication while adhering to AWS best practices.](https://kodekloud.com/kk-media/image/upload/v1752864483/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-3/aws-healthcare-application-deployment.jpg)

### Accessing AWS Secrets Manager Securely

A fintech company developing a microservices-based application on AWS needs one of its services to securely retrieve configuration data from AWS Secrets Manager without exposing it publicly. The solution is to create a VPC interface endpoint for Secrets Manager and associate it with a security group that restricts access to required IP addresses and ports. Remember that gateway endpoints are available only for S3 and DynamoDB.

![The image presents a scenario where a financial technology company is considering using VPC Interface Endpoints to securely access AWS Secrets Manager, with four different approaches listed for ensuring secure access.](https://kodekloud.com/kk-media/image/upload/v1752864485/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-3/vpc-interface-endpoints-aws-secrets-manager.jpg)

The following diagram details VPC endpoints by distinguishing between gateway endpoints (for S3 and DynamoDB) and interface endpoints (which leverage PrivateLink for a variety of AWS services).

![The image is a diagram illustrating AWS VPC Endpoints and PrivateLink, showing connections between AWS Direct Connect, VPN, Transit Gateway, and Amazon S3. It includes components like gateway and interface endpoints within VPCs.](https://kodekloud.com/kk-media/image/upload/v1752864486/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-3/aws-vpc-endpoints-privatelink-diagram.jpg)

---

## Edge Networking with CloudFront

### Field-Level Encryption

A media streaming company using Amazon CloudFront collects sensitive user information (such as credit card details) via web forms. They require encryption of specific fields as data travels from the user to the origin server. CloudFront’s field-level encryption feature, combined with a customer-managed KMS key, addresses this need by protecting sensitive data while in transit.

![The image presents a scenario where a media-streaming company is considering using Amazon CloudFront's field-level encryption for sensitive data. It lists four approaches for implementing this encryption.](https://kodekloud.com/kk-media/image/upload/v1752864487/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-3/amazon-cloudfront-field-level-encryption.jpg)

CloudFront not only distributes content globally but also caches files and communicates with origin servers based on well-defined path configurations. This ensures that the sensitive data remains encrypted throughout its journey.

### CloudFront Functions and Lambda@Edge

For a global e-commerce platform, deploying lightweight serverless functions at the edge can enhance both security and user experience by modifying HTTP requests or responses. When using CloudFront Functions, ensure that the functions run with the least privileges necessary to limit risk.

Likewise, Lambda@Edge functions allow companies to deliver customized content directly from CloudFront without having to manage servers. It is crucial to assign only the minimal set of permissions necessary to perform their designated tasks.

![The image presents a scenario where a global e-commerce platform uses Amazon CloudFront to distribute web content and considers implementing CloudFront Functions for enhanced security and user experience. It lists four approaches to ensure secure implementation and execution of these functions.](https://kodekloud.com/kk-media/image/upload/v1752864489/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-3/cloudfront-ecommerce-security-approaches.jpg)

An illustration reveals the request-response flow in CloudFront, detailing how viewer requests are processed via edge caches and regional edge caches. Functions like CloudFront Functions or Lambda@Edge can be invoked to modify requests as needed.

![The image illustrates the flow of requests and responses in AWS CloudFront, showing interactions between the client, CloudFront edge cache, regional edge caches, and the origin, with functions like CloudFront Functions and Lambda@Edge.](https://kodekloud.com/kk-media/image/upload/v1752864489/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-3/aws-cloudfront-request-response-flow.jpg)

Additionally, a diagram details the secure implementation of Lambda@Edge functions alongside CloudFront, emphasizing the use of minimal permissions while AWS manages much of the inherent security infrastructure.

![The image presents a scenario about a content delivery network using AWS Lambda@Edge and Amazon CloudFront, with four approaches to ensure secure implementation and execution of Lambda@Edge functions.](https://kodekloud.com/kk-media/image/upload/v1752864491/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-3/aws-lambda-edge-cloudfront-security.jpg)

---

## DNS Security with Route 53

Amazon Route 53 provides global DNS routing for critical applications. For a multinational corporation, protecting DNS configurations against threats—like distributed denial-of-service (DDoS) attacks—is paramount. Implement strict access controls and routing policies using Route 53 features. Recommended practices include restricting write access and validating DNS responses through well-crafted policies.

![The image presents a scenario where a multinational corporation is using Amazon Route 53 for DNS routing and is considering security practices to enhance resilience against attacks. It lists four approaches for ensuring secure and resilient DNS routing.](https://kodekloud.com/kk-media/image/upload/v1752864492/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-3/amazon-route53-dns-security-practices.jpg)

A diagram illustrates a Route 53 setup with a primary web server in one region and a standby server in another, utilizing various routing policies such as latency-based, failover, and geoproximity routing. This design enhances both application availability and resilience.

![The image is a diagram illustrating an AWS Route 53 setup with a private hosted zone, showing a primary web server in the N. Virginia region and a standby web server in the N. California region, connected via VPC peering.](https://kodekloud.com/kk-media/image/upload/v1752864493/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-3/aws-route53-private-hosted-zone-diagram.jpg)

### Route 53 Application Recovery Controller

For a financial technology company, the Route 53 Application Recovery Controller assists in rapid recovery from failures while ensuring robust security and resiliency. The recommended configuration includes establishing recovery readiness checks and grouping related application components. Correctly mapping dependencies and securing connections with strict IAM policies is essential.

![The image presents a scenario where a financial technology company is considering using Amazon Route 53 Application Recovery Controller for secure and resilient application recovery. It lists four approaches for implementing the controller, focusing on recovery readiness checks, security, and availability.](https://kodekloud.com/kk-media/image/upload/v1752864494/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-3/amazon-route53-application-recovery.jpg)

Another diagram displays the architecture of an Application Recovery Controller setup with active and standby zones across multiple AWS regions. It leverages global services, such as replicated DynamoDB tables, to maintain data consistency and enable rapid failover.

![The image is a diagram illustrating the architecture of a Route 53 Application Recovery Controller setup, featuring two AWS regions with active and standby TicTacToe game servers, connected to Amazon DynamoDB global tables.](https://kodekloud.com/kk-media/image/upload/v1752864495/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Turning-up-Security-on-Network-Services-Part-3/route53-application-recovery-architecture-diagram.jpg)

---

## Conclusion

This lesson provided a comprehensive overview of security strategies for AWS network services—from load balancers and VPNs to Direct Connect, VPC endpoints, CloudFront, and Route 53. Each section emphasized best practices and proper configurations, ensuring robust security while maintaining optimal performance and high availability.

> [!important]
> **Further Information**
>
> For more insights into AWS network security best practices, be sure to visit the [AWS Documentation](https://aws.amazon.com/documentation/) and explore detailed case studies on secure cloud architectures.

For any questions or further discussions, reach out via email at michael.forrester@gmail.com, join our forum discussions, or connect on Slack. Thank you for participating in this lesson—stay tuned for the next session.

— Michael Forrester

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/3a5897e8-aad3-40cf-9a77-335986692f1e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/fcdcac66-6274-4b2f-912a-d6e9de511e5a/lesson/d2f90330-f917-40df-8978-3009633f5919)**
>
> Practice lab
