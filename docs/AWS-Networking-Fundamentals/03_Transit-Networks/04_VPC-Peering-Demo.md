# VPC Peering Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Networking-Fundamentals/Transit-Networks/VPC-Peering-Demo)

---

## Table of Contents

- VPC Peering Demo
  - 1. Create the VPC Peering Connection
  - 2. Accept the Peering Request
  - 3. Update Route Tables
  - 4. Verify Connectivity
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

AWS Networking Fundamentals

Transit Networks

# VPC Peering Demo

In this tutorial, you’ll learn how to establish a VPC peering connection between two AWS VPCs so that their EC2 instances can communicate over the private AWS network:

| VPC Identifier | CIDR Block  | EC2 Instance | Private IP |
| -------------- | ----------- | ------------ | ---------- |
| VPC-A          | 10.1.0.0/16 | server1      | 10.1.1.13  |
| VPC-B          | 10.2.0.0/16 | server2      | 10.2.1.139 |

> [!important]
> **Prerequisites**
>
> Make sure both VPCs have security groups and network ACLs allowing ICMP traffic. You also need IAM permissions to manage VPC peering and route tables.

Since VPCs are isolated by default, pinging from **server1** to **server2** will initially fail:

```
[ec2-user@ip-10-1-1-13 ~]$ ping 10.2.1.139
PING 10.2.1.139 (10.2.1.139) 56(84) bytes of data.
^C
--- 10.2.1.139 ping statistics ---
195 packets transmitted, 0 received, 100% packet loss
```

## 1\. Create the VPC Peering Connection

1.  Open the AWS VPC console and select **Peering Connections** → **Create Peering Connection**.
2.  Name the connection `VPC-A-to-VPC-B`.
3.  Under **Requester**, choose **VPC-A**.
4.  Under **Accepter**, select your account and region, then choose **VPC-B**.
5.  Click **Create Peering Connection**.

![The image shows the AWS VPC Management Console interface for creating a peering connection, with options to select a local VPC and specify regions.](https://kodekloud.com/kk-media/image/upload/v1752863426/notes-assets/images/AWS-Networking-Fundamentals-VPC-Peering-Demo/aws-vpc-management-console-peering-connection.jpg)

> [!important]
> **Automation Tip**
>
> You can also provision VPC peering using Infrastructure as Code tools like Terraform or AWS CloudFormation.

## 2\. Accept the Peering Request

1.  In **Peering Connections**, locate the new connection in **Pending Acceptance**.
2.  Select it, then choose **Actions** → **Accept Request**.

![The image shows an AWS Management Console screen displaying details of a VPC peering connection request, which is pending acceptance. It includes information such as requester and accepter IDs, VPCs, and regions.](https://kodekloud.com/kk-media/image/upload/v1752863427/notes-assets/images/AWS-Networking-Fundamentals-VPC-Peering-Demo/aws-management-console-vpc-peering-request.jpg)

Once accepted, its status changes to **Active**:

![The image shows an AWS VPC dashboard with a peering connection established between two VPCs, indicated by a green status bar and details about the connection.](https://kodekloud.com/kk-media/image/upload/v1752863428/notes-assets/images/AWS-Networking-Fundamentals-VPC-Peering-Demo/aws-vpc-dashboard-peering-connection.jpg)

> [!important]
> **Important**
>
> Even after peering is active, traffic won’t flow until you update each VPC’s route tables.

## 3\. Update Route Tables

Each VPC needs a route pointing to the other VPC’s CIDR block through the peering connection:

1.  In the VPC console, go to **Route Tables**.
2.  Select the route table for **VPC-A**.

![The image shows the AWS management console displaying the route tables for a Virtual Private Cloud (VPC). It lists several route tables with details such as route table ID, subnet associations, and routes with their destinations and targets.](https://kodekloud.com/kk-media/image/upload/v1752863429/notes-assets/images/AWS-Networking-Fundamentals-VPC-Peering-Demo/aws-management-console-vpc-route-tables.jpg)

3.  Under **Routes**, click **Edit routes** → **Add route**:
    - Destination: `10.2.0.0/16`
    - Target: the peering connection (`VPC-A-to-VPC-B`)
4.  Save changes.

![The image shows the AWS Management Console with a VPC route table being edited, displaying routes with their destinations, targets, and statuses.](https://kodekloud.com/kk-media/image/upload/v1752863430/notes-assets/images/AWS-Networking-Fundamentals-VPC-Peering-Demo/aws-management-console-vpc-route-table.jpg)

5.  Repeat these steps on **VPC-B**’s route table, adding a route to `10.1.0.0/16` via the same peering connection.

## 4\. Verify Connectivity

Return to **server1** and ping **server2**:

```
[ec2-user@ip-10-1-1-13 ~]$ ping 10.2.1.139
PING 10.2.1.139 (10.2.1.139) 56(84) bytes of data.
64 bytes from 10.2.1.139: icmp_seq=1 ttl=127 time=1.88 ms
64 bytes from 10.2.1.139: icmp_seq=2 ttl=127 time=1.43 ms
64 bytes from 10.2.1.139: icmp_seq=3 ttl=127 time=1.38 ms
^C
--- 10.2.1.139 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2002ms
rtt min/avg/max/mdev = 1.382/1.563/1.882/0.187 ms
```

Your EC2 instances can now communicate across VPCs using the private AWS backbone.

## Links and References

- [AWS VPC Peering Documentation](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html)
- [AWS Route Tables](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html)
- [Terraform AWS VPC Peering Module](https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/latest)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/056227a0-6523-43a5-942e-4082adfaadf7/lesson/1da0656d-9ac5-450c-aa5d-e019deb3f09a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-networking-fundamentals/module/056227a0-6523-43a5-942e-4082adfaadf7/lesson/dbdeb9f9-2201-4ad5-b7ba-e23dcb45002c)**
>
> Practice lab
