# NAT Gateways VPC Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Core-Networking-Services/NAT-Gateways-VPC-Demo)

---

## Table of Contents

- NAT Gateways VPC Demo
  - 1. Create a New VPC
  - 2. Create a Private Subnet
  - 3. Launch an EC2 Instance in the Private Subnet
  - 4. Create and Attach an Internet Gateway
  - 5. Create a Public Subnet
  - 6. Configure Route Tables
  - 7. Deploy a NAT Gateway
  - 8. Update the Private Route Table
  - 9. Plan for High Availability
  - Links and References
  - Watch Video
    - Steps

---

## Content

AWS Networking Fundamentals

Core Networking Services

# NAT Gateways VPC Demo

In this walkthrough, you’ll learn how to configure an AWS NAT Gateway to enable internet access for EC2 instances in a private subnet—while preventing unsolicited inbound connections from the internet. By the end, only instances that initiate outbound requests will receive responses.

## 1\. Create a New VPC

1.  Open the **VPC** console and select **Create VPC**.
2.  Enter a **Name tag** (e.g., `demo-vpc`) and set the **IPv4 CIDR block** to `10.0.0.0/16`.
3.  Leave IPv6 settings disabled and click **Create**.

![The image shows the AWS Management Console interface for creating a VPC, with options for setting the name tag, IPv4 CIDR block, and other configurations.](https://kodekloud.com/kk-media/image/upload/v1752863282/notes-assets/images/AWS-Networking-Fundamentals-NAT-Gateways-VPC-Demo/aws-management-console-create-vpc.jpg)

## 2\. Create a Private Subnet

This subnet will host your EC2 instance without a public IP.

- **Name**: `private-subnet`
- **Availability Zone**: e.g., `us-east-1b`
- **IPv4 CIDR block**: `10.0.1.0/24`

![The image shows the AWS Management Console interface for creating a subnet within a VPC. It includes fields for VPC ID, subnet name, availability zone, and IPv4 CIDR block.](https://kodekloud.com/kk-media/image/upload/v1752863283/notes-assets/images/AWS-Networking-Fundamentals-NAT-Gateways-VPC-Demo/aws-management-console-create-subnet-vpc.jpg)

## 3\. Launch an EC2 Instance in the Private Subnet

1.  Navigate to the **EC2** console → **Launch Instance**.
2.  Select the **Amazon Linux 2 AMI** (or your preferred AMI).
3.  Under **Network settings**:
    - Choose your **demo-vpc** and the **private-subnet**.
    - Disable **Auto-assign Public IP**.
4.  Configure or select a security group (default settings are fine).
5.  Review and **Launch**. Name it `private-server`.

Because there’s no public IP, the instance cannot be reached directly from the internet.

![The image shows an AWS EC2 instance launch configuration screen, detailing network settings, security group options, and a summary of the instance specifications.](https://kodekloud.com/kk-media/image/upload/v1752863284/notes-assets/images/AWS-Networking-Fundamentals-NAT-Gateways-VPC-Demo/aws-ec2-instance-launch-configuration.jpg)

## 4\. Create and Attach an Internet Gateway

An Internet Gateway (IGW) is required to give public subnets internet access.

1.  In the VPC console, go to **Internet Gateways** → **Create Internet Gateway**.
2.  Name it `my-igw` and click **Create**.
3.  Select the new IGW → **Actions** → **Attach to VPC** → choose `demo-vpc`.

![The image shows an AWS Management Console screen displaying the "Internet gateways" section, with one internet gateway listed as attached to a VPC.](https://kodekloud.com/kk-media/image/upload/v1752863286/notes-assets/images/AWS-Networking-Fundamentals-NAT-Gateways-VPC-Demo/aws-management-console-internet-gateways-vpc.jpg)

## 5\. Create a Public Subnet

This subnet will host the NAT Gateway and must have a route to the IGW.

- **Name**: `public-subnet`
- **Availability Zone**: same or different (e.g., `us-east-1b`)
- **IPv4 CIDR block**: `10.0.2.0/24`

![The image shows an AWS VPC dashboard with a notification indicating the successful creation of a subnet. The subnet details, including its ID and availability, are displayed.](https://kodekloud.com/kk-media/image/upload/v1752863288/notes-assets/images/AWS-Networking-Fundamentals-NAT-Gateways-VPC-Demo/aws-vpc-dashboard-subnet-creation.jpg)

## 6\. Configure Route Tables

You need two route tables: one public and one private.

> [!important]
> **Note**
>
> Separate route tables help isolate internet-facing and internal traffic.

| Route Table Name    | Associated Subnet | Default Route Target        |
| ------------------- | ----------------- | --------------------------- |
| public-route-table  | public-subnet     | Internet Gateway (`my-igw`) |
| private-route-table | private-subnet    | (added after NAT creation)  |

### Steps

1.  **Create** `public-route-table` → select `demo-vpc` → **Create**.
2.  **Edit routes** → **Add route** `0.0.0.0/0` → Target: **Internet Gateway** → choose `my-igw` → **Save**.
3.  **Associate** with `public-subnet`.
4.  **Create** `private-route-table` → select `demo-vpc` → **Create**.
5.  **Associate** with `private-subnet` (no default route yet).

![The image shows an AWS Management Console screen displaying details of a VPC route table, including route entries and their statuses. The route table has two routes, one for internet gateway access and another for local network access, both marked as active.](https://kodekloud.com/kk-media/image/upload/v1752863289/notes-assets/images/AWS-Networking-Fundamentals-NAT-Gateways-VPC-Demo/aws-vpc-route-table-details.jpg)

## 7\. Deploy a NAT Gateway

In a public subnet, NAT Gateways allow private instances to access the internet securely.

1.  Go to **NAT Gateways** → **Create NAT Gateway**.
2.  Name it `my-nat-gateway`.
3.  Subnet: **public-subnet**.
4.  Allocate a new **Elastic IP**.
5.  Click **Create NAT Gateway**.

![The image shows an AWS Management Console screen displaying details of a newly created NAT gateway, which is currently in a pending state.](https://kodekloud.com/kk-media/image/upload/v1752863290/notes-assets/images/AWS-Networking-Fundamentals-NAT-Gateways-VPC-Demo/aws-management-console-nat-gateway-pending.jpg)

You can also use the AWS CLI:

```
aws ec2 create-nat-gateway \
  --subnet-id <public-subnet-id> \
  --allocation-id <eip-allocation-id>
```

## 8\. Update the Private Route Table

After the NAT Gateway becomes **available**:

1.  Open `private-route-table` → **Edit routes**.
2.  **Add route** `0.0.0.0/0` → Target: **NAT Gateway** → select `my-nat-gateway`.
3.  **Save**.

Now, instances in `private-subnet` will send outbound traffic through the NAT Gateway while remaining inaccessible from the internet.

## 9\. Plan for High Availability

NAT Gateways are zonal resources. To avoid a single point of failure:

- Deploy one NAT Gateway per Availability Zone.
- Update each private route table to point to the NAT Gateway in its own AZ.

> [!important]
> **Warning**
>
> If the AZ with your NAT Gateway goes down, all instances using it lose internet access.

![The image shows an AWS Management Console screen displaying details of a public subnet within a Virtual Private Cloud (VPC). It includes information such as the subnet ID, state, IPv4 CIDR, and availability zone.](https://kodekloud.com/kk-media/image/upload/v1752863292/notes-assets/images/AWS-Networking-Fundamentals-NAT-Gateways-VPC-Demo/aws-management-console-public-subnet-vpc.jpg)

## Links and References

- [Amazon VPC Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [AWS NAT Gateway](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html)
- [AWS CLI Command Reference](https://docs.aws.amazon.com/cli/latest/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/406e4440-01a6-45f6-ab45-e14485d333c3/lesson/d29b603d-a21e-4cd3-a744-265d55acd3c2)**
>
> Watch video content
