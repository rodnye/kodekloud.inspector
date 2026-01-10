# Application Loadbalancer Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Load-Balancing-AutoScaling/Application-Loadbalancer-Demo)

---

## Table of Contents

- Application Loadbalancer Demo
  - Configuring the Load Balancer
  - Important Security Considerations
  - Conclusion
  - Watch Video
  - Practice Lab
    - Creating Dedicated Load Balancer Subnets
    - Ensuring Public Accessibility
    - Setting Up the Application Load Balancer
    - Configuring Listener and Target Groups
    - Testing the Load Balancer

---

## Content

AWS Certified Developer - Associate

Load Balancing AutoScaling

# Application Loadbalancer Demo

In this lesson, you will set up an Application Load Balancer (ALB) in AWS to distribute network requests across multiple EC2 instances. To save time, several resources have already been provisioned. We have two EC2 instances—"web server one" and "web server two"—located in different availability zones (US East 1a and US East 1b), both running Nginx and displaying a simple webpage that identifies the server handling the request.

![The image shows an AWS EC2 Management Console with two running instances, "web-server1" and "web-server2," both of type t2.micro. The details of "web-server2" are displayed, including its instance ID, public IPv4 address, and instance state.](https://kodekloud.com/kk-media/image/upload/v1752858995/notes-assets/images/AWS-Certified-Developer-Associate-Application-Loadbalancer-Demo/aws-ec2-management-console-instances.jpg)

When you access the IP address of web server one (using HTTP:// followed by the IP), you see the webpage indicating "server one." Accessing web server two similarly displays "server two."

![The image shows an AWS EC2 Management Console with two running instances, "web-server1" and "web-server2," both of which are t2.micro types with passed status checks.](https://kodekloud.com/kk-media/image/upload/v1752858996/notes-assets/images/AWS-Certified-Developer-Associate-Application-Loadbalancer-Demo/aws-ec2-management-console-instances-2.jpg)

The EC2 instances operate in two public subnets:

- **Subnet one (10.0.201.0/24) in US East 1a:** Hosts web server one.
- **Subnet two (10.0.202.0/24) in US East 1b:** Hosts web server two.

![The image shows the AWS Management Console displaying the "Subnets" section under the "VPC" dashboard, listing two subnets with their details such as VPC ID, IPv4 CIDR, and availability zones.](https://kodekloud.com/kk-media/image/upload/v1752858997/notes-assets/images/AWS-Certified-Developer-Associate-Application-Loadbalancer-Demo/aws-management-console-subnets-vpc.jpg)

These public subnets are configured with an Internet Gateway and proper route table settings to allow internet traffic.

---

## Configuring the Load Balancer

To provide a unified DNS name and add redundancy to your application, you will create an Application Load Balancer that forwards incoming requests to the two web servers. The process includes configuring dedicated subnets for the load balancer nodes, ensuring public accessibility, and setting up target groups.

### Creating Dedicated Load Balancer Subnets

The load balancer will handle traffic across both US East 1a and US East 1b. For this purpose, you need to create two additional subnets:

1.  **US East 1a:** Create a subnet named "LB" with CIDR 10.0.101.0/24.
2.  **US East 1b:** Create a subnet named "LB" with CIDR 10.0.102.0/24.

At this stage, the VPC contains four subnets:

- Web US East 1a
- Web US East 1b
- LB US East 1a
- LB US East 1b

![The image shows a screenshot of the AWS Management Console, specifically the VPC (Virtual Private Cloud) creation page, where subnet settings are being configured. It includes fields for VPC ID, associated CIDRs, subnet name, availability zone, and IPv4 CIDR block.](https://kodekloud.com/kk-media/image/upload/v1752858998/notes-assets/images/AWS-Certified-Developer-Associate-Application-Loadbalancer-Demo/aws-vpc-creation-screenshot.jpg)

After creation, verify the new subnets in the VPC dashboard:

![The image shows an AWS Management Console screen displaying a list of subnets within a Virtual Private Cloud (VPC). A notification at the top indicates that a new subnet has been successfully created.](https://kodekloud.com/kk-media/image/upload/v1752859001/notes-assets/images/AWS-Certified-Developer-Associate-Application-Loadbalancer-Demo/aws-management-console-vpc-subnets.jpg)

### Ensuring Public Accessibility

Before setting up the load balancer, confirm that the LB subnets (LB US East 1a and LB US East 1b) are configured as public subnets. Check that the route table has a default route pointing to an Internet Gateway.

![The image shows an AWS Management Console screen displaying a list of subnets within a VPC, along with their details such as Subnet ID, State, and IPv4 CIDR. The route table section at the bottom shows routing information for the selected subnet.](https://kodekloud.com/kk-media/image/upload/v1752859003/notes-assets/images/AWS-Certified-Developer-Associate-Application-Loadbalancer-Demo/aws-management-console-subnets-vpc-2.jpg)

> [!important]
> **Tip**
>
> Ensure that the route table for your LB subnets has a default route (0.0.0.0/0) directing traffic to the Internet Gateway.

### Setting Up the Application Load Balancer

Follow these steps to configure your Application Load Balancer:

1.  Navigate to the EC2 dashboard and select "Load Balancers."
2.  Create a new Application Load Balancer named "web load balancer."
3.  Choose the internet-facing option with IPv4 (or dual-stack if needed) and select the appropriate VPC.
4.  For Availability Zones, select the LB subnets in US East 1a and US East 1b. (Avoid using the web server subnets.)
5.  Choose or create a security group that permits web traffic (ports 80 and 443).
6.  Set up a listener for HTTP traffic on port 80.

![The image shows a comparison of three types of AWS load balancers: Application Load Balancer, Network Load Balancer, and Gateway Load Balancer, each with a brief description and a "Create" button.](https://kodekloud.com/kk-media/image/upload/v1752859004/notes-assets/images/AWS-Certified-Developer-Associate-Application-Loadbalancer-Demo/aws-load-balancer-comparison.jpg)

### Configuring Listener and Target Groups

After creating your load balancer, configure a listener to forward HTTP requests on port 80 to a target group. Create a target group (named "web") with the following settings:

- **Target Type:** Instances
- **Protocol:** HTTP
- **Port:** 80 (matches the web server configuration)
- **VPC:** Select your demo VPC
- **Health Checks:** Set to the default path ("/") or use a custom health check if required

![The image shows an AWS Management Console screen for creating a target group in a load balancer setup. It includes fields for target group name, protocol, port, VPC selection, and protocol version options.](https://kodekloud.com/kk-media/image/upload/v1752859004/notes-assets/images/AWS-Certified-Developer-Associate-Application-Loadbalancer-Demo/aws-management-console-target-group-setup.jpg)

Advanced health check options are available, but for simplicity, the default settings are used. Once the target group is created, register the two EC2 instances (web server one and web server two) as targets on port 80.

![The image shows a section of the AWS Management Console, specifically the configuration page for setting up a target group with options for VPC selection, protocol version, and health check settings.](https://kodekloud.com/kk-media/image/upload/v1752859006/notes-assets/images/AWS-Certified-Developer-Associate-Application-Loadbalancer-Demo/aws-management-console-target-group-setup-2.jpg)

After registering the targets, the load balancer will route incoming HTTP requests to the appropriate web server.

![The image shows an AWS Management Console screen for configuring a load balancer, displaying sections for basic configuration, security groups, network mapping, listeners and routing, and attributes. There is a button labeled "Create load balancer" at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752859007/notes-assets/images/AWS-Certified-Developer-Associate-Application-Loadbalancer-Demo/aws-load-balancer-configuration-console.jpg)

Click "Create load balancer" and wait a few minutes for the provisioning process to complete.

### Testing the Load Balancer

Once the Application Load Balancer becomes active, its details screen will show a DNS name that users can utilize to access your application. Copy this DNS name and open a new browser tab to send an HTTP request.

![The image shows an AWS Management Console screen displaying details of a load balancer named "web-lb," which is active and internet-facing, with information about its VPC, availability zones, and other settings.](https://kodekloud.com/kk-media/image/upload/v1752859008/notes-assets/images/AWS-Certified-Developer-Associate-Application-Loadbalancer-Demo/aws-load-balancer-web-lb-console.jpg)

When you visit the load balancer’s DNS name, the webpage served by one of the backend web servers should display. Refresh the page several times to observe that traffic is evenly distributed between server one and server two.

![The image shows a web page indicating "This is server1!" with a message confirming the successful installation of the Nginx web server. It suggests further configuration is required and provides links for documentation and support.](https://kodekloud.com/kk-media/image/upload/v1752859009/notes-assets/images/AWS-Certified-Developer-Associate-Application-Loadbalancer-Demo/nginx-server1-installation-message.jpg)

---

## Important Security Considerations

Direct access to the EC2 instances is possible because each server has a public IP address. In a production environment, it is recommended to enhance security by:

- Placing the web servers in private subnets to eliminate direct internet exposure.
- Using security groups or firewall rules to allow traffic only from the load balancer to the web servers.

![The image shows an AWS EC2 Management Console with a list of instances, some running and some terminated. The user is searching for instances with the state "running."](https://kodekloud.com/kk-media/image/upload/v1752859010/notes-assets/images/AWS-Certified-Developer-Associate-Application-Loadbalancer-Demo/aws-ec2-management-console-instances-3.jpg)

![The image shows an AWS EC2 management console with two running instances, "web-server1" and "web-server2," both of type t2.micro. The details of "web-server1" are displayed, including its instance ID, public IPv4 address, and instance state.](https://kodekloud.com/kk-media/image/upload/v1752859012/notes-assets/images/AWS-Certified-Developer-Associate-Application-Loadbalancer-Demo/aws-ec2-management-console-instances-4.jpg)

By keeping the load balancer public and isolating the backend web servers in private subnets, you significantly reduce potential attack vectors while maintaining application accessibility.

![The image shows an AWS Management Console screen displaying the "Target Groups" section, with one target group named "tg-web" listed. The target group uses HTTP protocol on port 80 and is not associated with a load balancer.](https://kodekloud.com/kk-media/image/upload/v1752859013/notes-assets/images/AWS-Certified-Developer-Associate-Application-Loadbalancer-Demo/aws-management-console-target-group-tg-web.jpg)

> [!important]
> **Security Best Practice**
>
> For enhanced security, consider configuring your architecture so that the web servers reside in private subnets, and only the load balancer is directly exposed to the internet.

---

## Conclusion

This lesson demonstrated how to set up an Application Load Balancer in AWS to distribute traffic between multiple web servers. By carefully configuring load balancer subnets, target groups, and security settings, you create a robust, redundant, and secure architecture that ensures efficient handling of web traffic.

Happy configuring, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c5fbed4d-288a-4e90-9f57-04fbe853f8a5/lesson/50236d14-f357-4e23-be65-1750836653e6)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/c5fbed4d-288a-4e90-9f57-04fbe853f8a5/lesson/f59aac96-c8a3-4feb-97b8-2f66e7adabf8)**
>
> Practice lab
