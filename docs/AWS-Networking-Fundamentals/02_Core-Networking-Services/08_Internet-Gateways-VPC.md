# Internet Gateways VPC - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Core-Networking-Services/Internet-Gateways-VPC)

---

## Table of Contents

- Internet Gateways VPC
  - Key Characteristics of Internet Gateways
  - Steps to Make a Subnet Public
  - Public IP Assignment
  - Summary
  - References
  - Watch Video

---

## Content

AWS Networking Fundamentals

Core Networking Services

# Internet Gateways VPC

In this lesson, we'll explore how Internet Gateways enable internet access for subnets in an Amazon Virtual Private Cloud (VPC), effectively converting private subnets into public ones.

By default, all newly created subnets are private: instances cannot reach the internet, nor can external clients initiate connections to them. Attaching an Internet Gateway to your VPC and updating route tables provides the necessary ingress and egress paths for internet communication.

## Key Characteristics of Internet Gateways

| Feature           | Description                                                        |
| ----------------- | ------------------------------------------------------------------ |
| Attachment Limit  | One Internet Gateway per VPC                                       |
| VPC Association   | An Internet Gateway can only be attached to a single VPC at a time |
| High Availability | Region-resilient across all Availability Zones                     |

> [!important]
> **Note**
>
> Internet Gateways are highly available within an AWS region and handle both ingress and egress traffic for your VPC.

## Steps to Make a Subnet Public

1.  **Create an Internet Gateway**

    ```
    aws ec2 create-internet-gateway
    ```

2.  **Attach the Internet Gateway to Your VPC**

    ```
    aws ec2 attach-internet-gateway \
      --internet-gateway-id igw-0123456789abcdef0 \
      --vpc-id vpc-0abcdef1234567890
    ```

3.  **Create a Custom Route Table**

    ```
    aws ec2 create-route-table --vpc-id vpc-0abcdef1234567890
    ```

4.  **Add a Default Route (`0.0.0.0/0`)**  
    Point to the Internet Gateway:

    ```
    aws ec2 create-route \
      --route-table-id rtb-0abcdef1234567890 \
      --destination-cidr-block 0.0.0.0/0 \
      --gateway-id igw-0123456789abcdef0
    ```

5.  **Associate the Public Subnet with the Custom Route Table**

    ```
    aws ec2 associate-route-table \
      --subnet-id subnet-01234abcde5678fgh \
      --route-table-id rtb-0abcdef1234567890
    ```

![The image illustrates the setup of an Internet Gateway within a VPC, showing steps like creating the gateway, attaching it to the VPC, creating a custom route table, and configuring the default route. It includes a diagram of a region with a VPC, availability zone, public subnet, and route table.](https://kodekloud.com/kk-media/image/upload/v1752863236/notes-assets/images/AWS-Networking-Fundamentals-Internet-Gateways-VPC/internet-gateway-vpc-setup-diagram.jpg)

The default route (`0.0.0.0/0 → igw-xxxxxxxx`) ensures that any traffic not matching more specific routes is forwarded to the Internet Gateway. Associating your subnet with this route table makes it a **public subnet**, enabling instances to send and receive internet traffic.

## Public IP Assignment

Instances in a public subnet only receive a private IP address (e.g., `192.168.1.1`) by default. To allow access from the internet, enable **Auto-assign Public IPv4 address** on the subnet or assign a public IP when launching the instance. This allocates a public IP (e.g., `1.1.1.1`) and automatically maps it to the private IP.

From the instance’s perspective:

- Incoming requests target the **public IP**.
- AWS Network Address Translation (NAT) translates the public IP to the instance’s **private IP**.
- The instance processes traffic using its private IP, unaware of the public endpoint.

![The image illustrates a network diagram of an AWS Cloud setup, showing a public subnet with a resource that has both a private IP (192.163.1.1) and a public IP (1.1.1.1), accessible by a user.](https://kodekloud.com/kk-media/image/upload/v1752863237/notes-assets/images/AWS-Networking-Fundamentals-Internet-Gateways-VPC/aws-cloud-network-diagram-public-subnet.jpg)

If an instance has multiple Elastic Network Interfaces (ENIs), each interface can have its own public IP address mapped to a private IP. AWS uses these mappings to direct internet traffic to the correct interface.

## Summary

| Summary Point                        | Details                                                                   |
| ------------------------------------ | ------------------------------------------------------------------------- |
| Purpose of Internet Gateway          | Provides a path for internet traffic into and out of your VPC             |
| Attachment Rules                     | One Internet Gateway per VPC; one VPC per Internet Gateway                |
| Public Subnet Requirement            | Route table must include a default route pointing to the Internet Gateway |
| Public IP for External Accessibility | Instances need a public IPv4 address (auto-assigned or manually added)    |

![The image is a summary slide with three key points about internet gateways and VPCs, highlighting connectivity, attachment, and limitations.](https://kodekloud.com/kk-media/image/upload/v1752863239/notes-assets/images/AWS-Networking-Fundamentals-Internet-Gateways-VPC/internet-gateways-vpcs-summary-slide.jpg)

## References

- [AWS Internet Gateways](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html)
- [AWS VPC Documentation](https://docs.aws.amazon.com/vpc/)
- [Amazon EC2 User Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/406e4440-01a6-45f6-ab45-e14485d333c3/lesson/7258034f-e429-445f-ba36-5bc0bb772004)**
>
> Watch video content
