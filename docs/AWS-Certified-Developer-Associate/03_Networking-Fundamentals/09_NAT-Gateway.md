# NAT Gateway - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Networking-Fundamentals/NAT-Gateway)

---

## Table of Contents

- NAT Gateway
  - How NAT Gateway Works
  - Deployment Considerations and AWS Management
  - Summary of NAT Gateway Features
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Networking Fundamentals

# NAT Gateway

In AWS architectures, NAT gateways play a crucial role in providing secure outbound internet connectivity for servers located in private subnets. They enable these servers to download updates, patches, and other necessary data without exposing them to incoming internet traffic.

Consider a scenario where a server in a private subnet requires access to the internet for security patches. An initial thought might be to attach an internet gateway to the VPC, update the route table, and convert the subnet into a public one. However, this change would expose the server to unwanted inbound traffic. Instead, a NAT gateway ensures that the server can initiate outbound connections while keeping it shielded from direct internet access.

![The image is a diagram illustrating a NAT Gateway setup within a VPC, showing the connection between public and private subnets and the internet. It includes route tables and indicates data flow through the gateway.](https://kodekloud.com/kk-media/image/upload/v1752859191/notes-assets/images/AWS-Certified-Developer-Associate-NAT-Gateway/nat-gateway-vpc-diagram.jpg)

## How NAT Gateway Works

To deploy a NAT gateway, follow these steps:

1.  **Configure an Internet Gateway:** Attach an Internet Gateway to your VPC.
2.  **Create a Public Subnet:** Set up a public subnet with a default route that points to the Internet Gateway.
3.  **Deploy the NAT Gateway:** Launch the NAT gateway within the public subnet. Think of it as a dedicated server with a public IP that relays outbound traffic from your private subnets to the internet.

The routing configuration is straightforward. The private subnet's route table includes a default route that directs traffic to the NAT gateway. When a server in the private subnet initiates a connection, the packet is forwarded to the NAT gateway in the public subnet, which then routes it through the Internet Gateway to reach its destination. This method ensures that the server, lacking a public IP, remains inaccessible to inbound internet connections.

![The image is an AWS diagram illustrating a NAT Gateway, with a note that charges are applied per hour and per GB of data processed.](https://kodekloud.com/kk-media/image/upload/v1752859192/notes-assets/images/AWS-Certified-Developer-Associate-NAT-Gateway/aws-nat-gateway-diagram-charges.jpg)

> [!important]
> **Key Insight**
>
> NAT gateways are not stand-alone solutions. They require the presence of an Internet Gateway to facilitate internet access.

## Deployment Considerations and AWS Management

NAT gateways are a managed AWS service. Once deployed along with the necessary routing configurations, AWS handles scaling and maintenance. A key detail is that billing for NAT gateways is determined by the duration of operation (per hour) and the amount of data processed (per GB).

Another important consideration is availability. Unlike Internet Gateways, NAT gateways are tied to a specific availability zone through their subnet. If an availability zone fails, the associated NAT gateway will become unavailable. To enhance redundancy, it is recommended to deploy NAT gateways across multiple availability zones with the appropriate routing configuration.

![The image is a diagram illustrating a NAT Gateway setup within a default VPC, showing four availability zones, each with a NAT Gateway and a route to 0.0.0.0/0.](https://kodekloud.com/kk-media/image/upload/v1752859193/notes-assets/images/AWS-Certified-Developer-Associate-NAT-Gateway/nat-gateway-default-vpc-diagram.jpg)

## Summary of NAT Gateway Features

NAT gateways enable secure outbound internet access for private subnets by allowing only outbound-initiated connections. They are deployed in public subnets and require an Internet Gateway. With support for Elastic IPs, NAT gateways automatically scale (supporting up to 5 Gbps, and even up to 100 Gbps when necessary) and are fully managed by AWS. For optimal resilience, deploy one NAT gateway per availability zone or use multiple zones.

The private subnet's route table should include a default route that directs traffic to the NAT gateway in the public subnet. Once set up, AWS ensures that the NAT gateway scales based on traffic demands while handling all underlying maintenance.

![The image is a summary slide about NAT Gateways, highlighting their role in allowing subnets to access the internet, deployment on public subnets, use of Elastic IPs, and the need for one gateway per availability zone.](https://kodekloud.com/kk-media/image/upload/v1752859194/notes-assets/images/AWS-Certified-Developer-Associate-NAT-Gateway/nat-gateways-summary-slide.jpg)

Finally, remember that while NAT gateways efficiently manage outbound connectivity and are charged per hour and per gigabyte of data processed, they also require careful deployment planning to maintain high availability and redundancy.

![The image is a summary slide with points about NAT Gateway, including routing for private subnets, AWS management, and charging details.](https://kodekloud.com/kk-media/image/upload/v1752859195/notes-assets/images/AWS-Certified-Developer-Associate-NAT-Gateway/nat-gateway-summary-routing-aws.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c8f3ca76-9178-474e-a33b-bf1de4fd948c/lesson/52366421-3019-4714-9838-98f81719b051)**
>
> Watch video content
