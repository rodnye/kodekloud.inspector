# What is AWS Specifically - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Cloud-Computing/What-is-AWS-Specifically)

---

## Table of Contents

- What is AWS Specifically
  - AWS vs. Traditional IT
  - Core Service Categories
  - Ways to Interact with AWS
  - Exploring the AWS Management Console
  - AWS: A Market Pioneer and Leader
  - Final Thoughts
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Cloud Computing

# What is AWS Specifically

Welcome back! I'm Michael Forrester, and in this lesson we'll dive into Amazon Web Services (AWS) and explore how it fits into the broader concept of cloud computing.

## AWS vs. Traditional IT

Imagine building your own kitchen to make a pizza from scratch—you must gather ingredients, buy equipment, and manage every detail. This is similar to setting up a traditional IT environment where you purchase and configure hardware such as servers, network cables, power, and cooling. Alternatively, ordering a pizza from a restaurant like Pizza Hut saves you the hassle. Similarly, AWS takes care of the underlying operations for you. With AWS, you simply use ready-to-go services rather than managing the physical infrastructure yourself.

When using a conventional data center, you need to request server hardware, coordinate with operations and security teams, and wait days or even months for access. Consider the following diagram that compares these traditional IT setup requirements:

![The image compares Amazon Web Services with traditional IT, highlighting the optional requests and timeframes involved in traditional IT setups.](https://kodekloud.com/kk-media/image/upload/v1752861596/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-What-is-AWS-Specifically/frame_100.jpg)

In contrast, AWS automates many of these tasks. Here's what changes when you choose AWS:

- You interface with pre-built services that include networking, cooling, and power.
- You access virtual machine services, database services, and application services that are ready to configure.

Take a look at the cloud computing diagram below. The basic components—networking, compute, and storage, along with governance and security—are clearly represented. With AWS, each of these components is replaced by dedicated services, which offload the operational overhead:

![The image contrasts Amazon Web Services with traditional IT, highlighting ease of service configuration over managing physical hardware.](https://kodekloud.com/kk-media/image/upload/v1752861597/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-What-is-AWS-Specifically/frame_140.jpg)

![The image is a diagram explaining cloud computing, featuring elements like networks, computers, data storage, IT management, security, databases, and data migration.](https://kodekloud.com/kk-media/image/upload/v1752861598/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-What-is-AWS-Specifically/frame_170.jpg)

![The image illustrates Amazon Web Services (AWS) components: App and Data Migration, Networking, Compute, Storage, Management, Database, Security, and Application Integration.](https://kodekloud.com/kk-media/image/upload/v1752861599/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-What-is-AWS-Specifically/frame_190.jpg)

> [!important]
> **Key Benefit**
>
> AWS is designed to relieve you from the burdens of security and operational management, allowing you to concentrate on building your solution.

## Core Service Categories

AWS provides a wide range of services. The core categories include:

- Compute
- Storage (or Data)
- Networking and Content Delivery (including internet access and firewall control)
- Databases (from traditional relational options such as Oracle and Microsoft to modern NoSQL databases like MongoDB)
- Security, Identity, and Compliance
- Management and Governance

![The image displays AWS Core Service Categories: Compute, Networking and Content Delivery, Storage, Database, Security, Identity and Compliance, and Management and Governance.](https://kodekloud.com/kk-media/image/upload/v1752861599/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-What-is-AWS-Specifically/frame_220.jpg)

Below is a summary table of these resource types and their use cases:

| AWS Service Category             | Use Case                                                   | Example                |
| -------------------------------- | ---------------------------------------------------------- | ---------------------- |
| Compute                          | Running virtual machines and scaling applications          | EC2, Lambda            |
| Storage                          | Storing and accessing data                                 | Amazon S3, EFS         |
| Networking and Content Delivery  | Managing network traffic, CDN, and firewall configurations | Amazon VPC, CloudFront |
| Database                         | Managing various database needs (relational & NoSQL)       | RDS, DynamoDB          |
| Security, Identity, & Compliance | Ensuring secure access and compliance measures             | IAM, AWS Shield        |
| Management and Governance        | Monitoring, managing cost, and automating infrastructure   | CloudWatch, AWS Config |

## Ways to Interact with AWS

There are three primary methods to interact with AWS:

1.  **Management Console**  
    The AWS Management Console is a web-based interface that offers an intuitive way to explore and create resources. It’s ideal for beginners and for validating your interactions with AWS services.
2.  **AWS Command Line Interface (CLI)**  
    The AWS CLI lets you execute commands directly in your terminal to retrieve information or manage resources. For example:

    ```
    $ aws ec2 describe-instances
    $ aws ec2 start-instance --instance-ids i-1348636c
    $ aws sns publish --topic-arn arn:aws:sns:us-east-1:546419318123:OperationsError --message "Script Failure"
    $ aws sqs receive-message --queue-url https://queue.amazonaws.com/546419318123/Test
    ```

    This approach is especially popular among engineers, developers, and operations teams due to its power and flexibility.

3.  **Software Development Kits (SDKs)**  
    AWS offers SDKs for several programming languages such as Python, Java, JavaScript, and Ruby. These SDKs enable you to integrate AWS services directly into your applications, which is particularly useful for programmatically managing AWS resources.

## Exploring the AWS Management Console

Let's switch gears and take a closer look at the AWS Management Console. When you log in, you will see various service categories, including:

- Compute
- Storage
- Databases
- Management and Governance
- Security and Compliance
- Cost Management
- Machine Learning
- Networking and Content Delivery

![The image shows a list of AWS services categorized under sections like Containers, Storage, Database, Media Services, and more, from the AWS Management Console.](https://kodekloud.com/kk-media/image/upload/v1752861601/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-What-is-AWS-Specifically/frame_420.jpg)

For instance, clicking on S3 navigates you to the Amazon S3 dashboard, which displays storage buckets along with metrics such as total storage and object counts.

![The image shows an Amazon S3 dashboard with account snapshot details, including total storage, object count, and a list of buckets with their regions and creation dates.](https://kodekloud.com/kk-media/image/upload/v1752861602/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-What-is-AWS-Specifically/frame_480.jpg)

While the console offers many options, you only need to become familiar with a few key services such as EC2 and S3 at a basic level. Advanced functionalities will be detailed in subsequent lessons.

## AWS: A Market Pioneer and Leader

AWS revolutionized the delivery of IT resources by pioneering on-demand cloud services. Launched in 2006 with Amazon S3, followed shortly by Amazon SQS, AWS has since expanded to offer more than 300 services. Although hundreds of services are available, for certification purposes, a basic understanding of approximately 20 to 30 core services is sufficient.

Creating an AWS account is simple and free. A phone number and credit card are required, with many services featuring a free tier. However, a word of caution:

> [!important]
> **Cost Alert**
>
> While many AWS services are free or low-cost, some services—such as virtual machines—incur charges after they are activated. Always monitor usage to avoid unexpected bills.

![The image summarizes AWS, highlighting its launch in 2006, growth to 300+ services, free sign-up, and its large community and market presence.](https://kodekloud.com/kk-media/image/upload/v1752861603/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-What-is-AWS-Specifically/frame_600.jpg)

## Final Thoughts

In summary, AWS empowers you to consume IT resources on-demand, eliminating the need to manage physical infrastructure and its associated operational overhead. This makes AWS an essential platform for organizations looking to leverage cloud computing technologies effectively.

Thank you for following along in this lesson. We will continue to build on these concepts in our next lesson.

For further reading, check out these helpful resources:

- [AWS Documentation](https://aws.amazon.com/documentation/)
- [Introduction to Cloud Computing](https://aws.amazon.com/what-is-cloud-computing/)
- [Getting Started with AWS](https://aws.amazon.com/getting-started/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/d77f9b54-67f6-4c49-9f9c-9a7734db0d91/lesson/7c867a99-d718-4a47-b786-7bd9e0256ce7)**
>
> Watch video content
