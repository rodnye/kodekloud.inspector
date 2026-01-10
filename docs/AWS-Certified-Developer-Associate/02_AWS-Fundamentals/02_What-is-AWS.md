# What is AWS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/AWS-Fundamentals/What-is-AWS)

---

## Table of Contents

- What is AWS
  - Traditional IT Infrastructure Challenges
  - AWS: Simplifying IT Infrastructure
  - Leveraging AWS Services
  - Summary
  - Watch Video

---

## Content

AWS Certified Developer - Associate

AWS Fundamentals

# What is AWS

In this lesson, we explore cloud computing and AWS, explaining what AWS is, its benefits, and the challenges it addresses. We compare traditional data center deployments with the flexibility and efficiency offered by AWS, making it easier to understand why cloud computing is revolutionizing IT infrastructure.

## Traditional IT Infrastructure Challenges

Before cloud computing, deploying an application meant facing significant logistical and financial hurdles. You either had to build a full-scale data center—which is expensive—or rent space in an existing one. Once the data center was secured, procuring and installing physical servers required selecting hardware with specific requirements such as CPU, memory, and graphics cards. The process involved ordering equipment and waiting for days, weeks, or even months for delivery. After receiving the hardware, an employee had to physically rack the servers and set up power, networking, and security before the application could be deployed.

At first glance, a deployed application might seem operational. However, managing physical infrastructure is an ongoing challenge. Hardware can fail, cooling systems may malfunction, and a larger team is necessary to resolve these issues. Additionally, as application traffic increases, scaling becomes cumbersome. Ordering more servers and manually integrating them delays response to sudden spikes and causes inefficiencies.

![The image depicts a traditional IT setup with servers, a cloud icon, and people working on computers. An exclamation mark indicates an alert or issue with the servers.](/images/AWS-Certified-Developer-Associate-What-is-AWS/traditional-it-setup-servers-alert.jpg)

Scaling a traditional environment means ordering new servers, handling long delivery times, and dealing with underutilized resources when traffic decreases—leading to unnecessary costs.

![The image illustrates a traditional IT setup with servers and people working on laptops, highlighting issues like paying for idle servers and unused compute power.](/images/AWS-Certified-Developer-Associate-What-is-AWS/traditional-it-setup-servers-laptops.jpg)

Expanding into multiple geographic regions further increases complexity, requiring additional data center spaces, server orders, local setups, and remote logistics. Clearly, traditional IT infrastructure is burdened with high costs, long provisioning times, and inflexibility.

![The image illustrates the cons of traditional IT, highlighting increased costs, long provisioning times, more personnel, limited geographic presence, and a non-dynamic environment, alongside a graphic of people working with servers.](/images/AWS-Certified-Developer-Associate-What-is-AWS/traditional-it-cons-illustration.jpg)

> [!important]
> **Note**
>
> Cloud computing eliminates many of these challenges by eliminating the need for manual hardware management.

## AWS: Simplifying IT Infrastructure

Cloud computing—and AWS in particular—simplifies the IT infrastructure by leveraging a global network of data centers. With AWS, you can quickly spin up servers, deploy databases, and provision other services without handling underlying hardware issues. AWS takes over security, networking, and maintenance, allowing you to concentrate on your application.

AWS operates on a simple client-server model. As a user, you send a request to AWS via the AWS Console, CLI, or SDK, specifying your desired resources (for example, one CPU and two gigabytes of RAM). AWS dynamically provisions a server in seconds or less than a minute, then provides you with complete details, such as the IP address.

![The image illustrates a user requesting a server with 1 CPU and 2GB RAM from AWS Cloud using a console, CLI, or SDK.](/images/AWS-Certified-Developer-Associate-What-is-AWS/aws-server-request-1cpu-2gb-ram.jpg)

When the server is no longer needed, you can simply send an API request to terminate it. AWS confirms the deletion, ensuring that you only pay for the operational time. This pay-as-you-go model avoids the expense of idle resources that burden traditional infrastructures.

![The image illustrates a cloud computing process on AWS, showing a user requesting a server with specific specifications (1 CPU, 2GB RAM) via console, CLI, or SDK, and receiving server details from the AWS cloud.](/images/AWS-Certified-Developer-Associate-What-is-AWS/aws-cloud-computing-server-request.jpg)

![The image illustrates a process in cloud computing with AWS, showing a user sending a request to delete a server and receiving confirmation that the server was successfully deleted.](/images/AWS-Certified-Developer-Associate-What-is-AWS/aws-cloud-computing-server-deletion.jpg)

## Leveraging AWS Services

AWS offers a wide array of services designed to handle specific functions—ranging from compute power to storage and managed databases. Think of it like ordering a pizza. Instead of gathering ingredients and baking it yourself, you simply visit a restaurant where experts prepare and serve the pizza. Similarly, AWS handles complex tasks such as computing, data storage, and database management for you.

![The image explains why Amazon Web Services (AWS) is named as such, highlighting that Amazon offers computing power as a paid service, represented by a server icon within the AWS Cloud.](/images/AWS-Certified-Developer-Associate-What-is-AWS/aws-computing-power-explained.jpg)

Consider deploying an application that requires a database. In a traditional setup, you would need to manage hardware, install and configure the database software, set up backups, ensure high availability with failovers, and apply security patches—often relying on a dedicated database administrator. AWS simplifies this by offering managed database services. For example, when you request a MySQL database, AWS takes care of the setup, high availability, backup scheduling, and security configurations, then provides you with the connection details to integrate with your application.

![The image is an infographic explaining why it's called Amazon Web Services, highlighting components like hardware, software, and backups, and features such as availability, security, and scalability. It centers around managing a database.](/images/AWS-Certified-Developer-Associate-What-is-AWS/amazon-web-services-infographic.jpg)

![The image is a diagram explaining how a user requests a MySQL database via AWS Cloud, highlighting the management, operation, and maintenance of the database.](/images/AWS-Certified-Developer-Associate-What-is-AWS/aws-cloud-mysql-database-diagram.jpg)

Simply put, AWS lets you focus on what matters most—developing your application—while it handles the complex tasks of provisioning, maintaining, and scaling IT resources. Whether it’s compute power, storage, or database services, AWS offers hundreds of fully featured services designed to simplify modern IT operations.

## Summary

Cloud computing provides on-demand delivery of IT resources, including computing power, networking, and storage. AWS’s client-server model allows you to provision resources quickly and pay only for what you use. This on-demand, pay-as-you-go approach—combined with an extensive range of specialized services—makes AWS a highly efficient and flexible platform for deploying and managing modern applications.

![The image is a summary slide about cloud computing, highlighting its on-demand delivery of IT resources, client-server model, and pay-as-you-go access to AWS services.](/images/AWS-Certified-Developer-Associate-What-is-AWS/cloud-computing-summary-aws-services.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/6d3acaeb-020a-4e1e-9bd0-5fc6c50eb164/lesson/86d1d31f-d13a-40ce-b132-55dd817b4a38)**
>
> Watch video content
