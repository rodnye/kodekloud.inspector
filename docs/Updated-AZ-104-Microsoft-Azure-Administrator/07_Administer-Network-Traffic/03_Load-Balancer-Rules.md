# Load Balancer Rules - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Updated-AZ-104-Microsoft-Azure-Administrator/Administer-Network-Traffic/Load-Balancer-Rules)

---

## Table of Contents

- Load Balancer Rules
  - Load Balancing Rules
  - Inbound NAT Rules
  - Outbound Rules
  - Session Persistence
  - Watch Video

---

## Content

\[Updated\] AZ-104: Microsoft Azure Administrator

Administer Network Traffic

# Load Balancer Rules

Azure Load Balancer rules are crucial for efficiently managing how traffic is distributed across your resources. In this article, we explore the various rule types that guide the behavior of an Azure Load Balancer.

## Load Balancing Rules

Load balancing rules are the backbone of effective traffic management. They dictate how incoming requests are evenly distributed among instances in a back-end pool. For example, in a Virtual Network hosting multiple servers within a web subnet, load balancing rules ensure that user traffic is allocated across these servers, preventing any single server from becoming overwhelmed. This balanced distribution enhances performance and maintains service reliability.

![Load Balancing Diagram](/images/Python_Basics-Comments/frame_100.jpg)

## Inbound NAT Rules

Inbound Network Address Translation (NAT) rules enable precise traffic redirection. These rules forward incoming traffic to a specific port on a designated Virtual Machine in your back-end pool. For example, if port 30008 on the load balancer is mapped to port 3389 on a particular VM, incoming traffic on port 30008 will be directed to port 3389 of that VM. Administrators can configure similar mappings for other VMs as needed, ensuring targeted access control.

![Inbound NAT Diagram](/images/Python_Basics-Comments/frame_100.jpg)

## Outbound Rules

Outbound rules manage traffic leaving your virtual network. They ensure that responses reach users and that your VMs can securely access external resources, whether on the internet or other networks. By defining clear pathways for outbound communication, these rules play a key role in maintaining network security and operational predictability.

![Outbound Rules Diagram](/images/Python_Basics-Comments/frame_100.jpg)

## Session Persistence

Session persistence ensures that client requests within the same session are consistently directed to the same back-end instance. This is especially important when the application requires the preservation of state or context across sequential requests, thereby enhancing the overall user experience.

![Session Persistence Diagram](/images/Python_Basics-Comments/frame_100.jpg)

> [!important]
> **Note**
>
> Collectively, these rules provide a comprehensive framework for managing both inbound and outbound traffic in Azure environments. Implementing these configurations helps achieve optimized performance, high availability, and improved security for your applications.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-104-microsoft-azure-administrator/module/50248c52-4b17-4c2d-87f8-52a42eff2d2f/lesson/e4b6ed95-c6c8-42ca-a804-ae1589e8ff3c)**
>
> Watch video content
