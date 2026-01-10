# Exam Tips - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Networking-Fundamentals/Exam-Tips)

---

## Table of Contents

- Exam Tips
  - Virtual Private Clouds (VPCs)
  - Routing and Route Tables
  - Internet Gateways
  - NAT Gateways
  - Public vs. Private Subnets
  - Elastic IPs
  - Security Groups and Network ACLs (NACLs)
  - VPC Peering
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Networking Fundamentals

# Exam Tips

Below are essential exam tips focusing on networking and cloud infrastructure concepts to help you prepare effectively.

## Virtual Private Clouds (VPCs)

VPCs allow you to isolate and manage your cloud computing resources in a dedicated network environment. They are tied to specific regions and require the definition of a VPC CIDR block during configuration, which sets the range of IP addresses for all resources inside the VPC.

![The image contains exam tips about Virtual Private Clouds (VPC), highlighting their isolation of computing resources, regional isolation, and the role of CIDR blocks in defining IP addresses.](https://kodekloud.com/kk-media/image/upload/v1752859136/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/vpc-exam-tips-isolation-cidr.jpg)

You can assign an additional secondary IPv4 CIDR block or an IPv6 CIDR block if required. Every region provides a default VPC with pre-configured subnets, security groups, and network ACLs (NACLs). The default VPC uses the CIDR block 172.31.0.0/16. The default subnets, created in each availability zone, and the default security groups allow outbound internet access. Additionally, the default NACLs permit both inbound and outbound traffic.

![The image provides exam tips about subnets, highlighting default VPC and subnet internet access, default subnets in availability zones, and security group and NACL traffic permissions.](https://kodekloud.com/kk-media/image/upload/v1752859138/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/exam-tips-subnets-vpc-access.jpg)

## Routing and Route Tables

Every VPC is equipped with a router that manages traffic between its subnets and to external networks. This router, which has an interface in each subnet, uses route tables—collections of rules that determine how network packets are forwarded based on destination IP addresses. Each route table includes a local route for internal VPC traffic and, when applicable, an IPv6 local route. Although every subnet must be associated with a route table, one route table may serve multiple subnets.

![The image provides exam tips on routing, explaining concepts like VPC routers, route tables, and packet forwarding. It highlights key points about network interfaces, destination IPs, and subnet linkage.](https://kodekloud.com/kk-media/image/upload/v1752859138/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/exam-tips-routing-vpc-routers.jpg)

## Internet Gateways

An Internet Gateway enables your VPC to communicate with the internet. After creating an Internet Gateway, you must attach it to a VPC. Note that Internet Gateways are region-resilient: each VPC supports only one, and each Internet Gateway can be attached to a single VPC. A subnet is designated as public when its default route directs traffic to an Internet Gateway.

![The image provides exam tips about Internet Gateways, explaining their role in connecting resources to the internet, their attachment to VPCs, and limitations on the number of gateways per VPC.](https://kodekloud.com/kk-media/image/upload/v1752859139/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/internet-gateways-exam-tips.jpg)

## NAT Gateways

NAT Gateways provide resources within private subnets with outbound internet access while blocking inbound connections initiated by the internet. This is especially useful when an EC2 instance or server needs to download updates or connect to external repositories without being publicly accessible. NAT Gateways are deployed in public subnets and come with Elastic IPs to ensure seamless connectivity.

When setting up a NAT Gateway, specify the subnet in which it will reside, as this defines the availability zone. For high availability, it is recommended to deploy NAT Gateways in multiple availability zones to manage potential failures efficiently. AWS manages NAT Gateways as a managed service; however, there are costs for data processing and availability. By default, a NAT Gateway supports up to five gigabits per second of bandwidth and can scale automatically to 100 gigabits per second.

> [!important]
> **Tip**
>
> For optimal performance and fault tolerance, ensure that your NAT Gateways are distributed across different availability zones.

![The image provides exam tips for NAT Gateway, highlighting key points such as deployment in public subnets, requirement per availability zone, AWS management, and cost considerations.](https://kodekloud.com/kk-media/image/upload/v1752859140/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/nat-gateway-exam-tips-aws.jpg)

## Public vs. Private Subnets

The design of your subnets determines resource accessibility. Public subnets offer two-way internet access, whereas private subnets do not allow inbound internet connections unless they have an outbound route via a NAT Gateway. Without a NAT Gateway, resources in private subnets remain isolated from the internet.

![The image provides exam tips on the differences between private and public subnets, stating that resources in public subnets are accessible to and from the internet, while resources in private subnets are not.](https://kodekloud.com/kk-media/image/upload/v1752859143/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/exam-tips-private-public-subnets.jpg)

## Elastic IPs

Public IP addresses assigned to EC2 instances are dynamic and may change if the instance is stopped and restarted. To maintain a fixed IP address, Elastic IPs (static IPv4 addresses) are used. You can allocate an Elastic IP to your AWS account and then assign it to an instance or network interface. Keep in mind that Elastic IPs are region-specific and cannot be moved between regions.

![The image provides exam tips about Elastic IPs, explaining that public IPs are not static, Elastic IPs are static IPv4 addresses, and how to allocate and associate an Elastic IP.](https://kodekloud.com/kk-media/image/upload/v1752859144/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/elastic-ips-exam-tips.jpg)

## Security Groups and Network ACLs (NACLs)

Understanding the distinction between stateful and stateless firewalls is crucial for network security in AWS.

- Network ACLs act as stateless firewalls at the subnet level, requiring explicit rules for both inbound and outbound traffic.
- Security Groups, on the other hand, are stateful firewalls for individual resources such as EC2 instances, network interfaces, and load balancers. They track connections and automatically allow return traffic. All security group rules explicitly allow traffic while implicitly denying any unspecified actions. Additionally, multiple security groups can be applied to a single resource, and their rules are merged together.

Each subnet must be associated with a single Network ACL, although one NACL can be linked to several subnets.

![The image provides exam tips on Security Groups and Network ACLs, highlighting differences between stateless and stateful firewalls, and their functions in network security.](https://kodekloud.com/kk-media/image/upload/v1752859146/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/exam-tips-security-groups-acls.jpg)

![The image provides exam tips related to security groups and network ACLs, highlighting rules about merging, subnet associations, and limitations.](https://kodekloud.com/kk-media/image/upload/v1752859150/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/exam-tips-security-groups-acls-2.jpg)

## VPC Peering

VPC Peering enables network connectivity between two VPCs, allowing them to exchange traffic seamlessly. This connectivity can occur between VPCs in the same region, across different regions, or even between different AWS accounts. Although establishing a VPC peering connection is free, be aware that data transfer charges may apply when traffic moves between availability zones. Also, keep in mind that VPC peering is non-transitive; if VPC A is peered with VPC B and VPC B is peered with VPC C, VPC A will not automatically have connectivity with VPC C.

![The image provides exam tips about VPC Peering, highlighting that it connects VPCs across regions and accounts, is free to create, but incurs costs for data transfer across availability zones.](https://kodekloud.com/kk-media/image/upload/v1752859152/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/vpc-peering-exam-tips.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c8f3ca76-9178-474e-a33b-bf1de4fd948c/lesson/ef6f357c-3179-4bd3-b0ab-0aa8dc1c3f76)**
>
> Watch video content
