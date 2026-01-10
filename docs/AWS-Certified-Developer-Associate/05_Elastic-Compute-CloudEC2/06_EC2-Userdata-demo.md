# EC2 Userdata demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Elastic-Compute-CloudEC2/EC2-Userdata-demo)

---

## Table of Contents

- EC2 Userdata demo
  - Automating Nginx Installation
  - EC2 Instance Setup
  - Post-Deployment Verification
  - Process Overview Diagram
  - Watch Video
  - Practice Lab

---

## Content

AWS Certified Developer - Associate

Elastic Compute CloudEC2

# EC2 Userdata demo

In this lesson, we demonstrate how to leverage EC2 user data for the automatic execution of commands during the initialization of a new instance. This capability allows for seamless configuration, such as installing and starting services, without requiring manual login.

## Automating Nginx Installation

The following user data script installs Nginx, starts the service, and configures it to launch at boot automatically:

```
#!/bin/bash
sudo yum install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

When you launch an EC2 instance with this user data, AWS executes the script during the instance initialization phase. The actions performed by the script include:

1.  **Installation**: Nginx is installed using the package manager.
2.  **Service Start**: The Nginx service is started immediately.
3.  **Boot Configuration**: Nginx is enabled to run automatically on instance boot.

## EC2 Instance Setup

To set up your EC2 instance with the above configuration, follow these steps:

- **Instance Details**:
  - Assign a name to your instance (e.g., "user data demo").
  - Select the Amazon Linux AMI.
  - Choose the T2 micro instance type.
  - Pick the appropriate key pair for secure access.

- **Security Group Configuration**:
  - Ensure that the security group is configured to allow both HTTP and HTTPS traffic.

- **User Data Configuration**:
  - In the **Advanced Details** section during instance configuration, scroll down to the user data input area.
  - Paste the script directly into the input field or upload a file containing the script.

  > [!important]
  > **Note**
  >
  > AWS executes the provided commands automatically once the instance is launched, removing the need for manual setup.

## Post-Deployment Verification

After the instance is launched:

1.  Retrieve the instance's public IP address.
2.  Access the IP address using a web browser to check if the Nginx web server is running.
3.  You should see the default Nginx HTML page if the installation and configuration were successful.

## Process Overview Diagram

An illustrative image below summarizes the EC2 instance setup process and highlights where the user data script is integrated:

/images/Python_Basics-Comments/frame_100.jpg

This image visually explains the integration of the user data script within the EC2 instance initialization workflow. By following the steps outlined above, you can effectively automate the configuration of your EC2 instances, ensuring critical services like Nginx are installed and operational immediately upon deployment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/538040df-b323-4fd1-ad80-f5c22725c345/lesson/4d194068-131d-4c68-81d7-c6bb83184e48)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/538040df-b323-4fd1-ad80-f5c22725c345/lesson/94dee8ad-43a6-4e6d-8600-6c55be407222)**
>
> Practice lab
