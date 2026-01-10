# Summary on Technology - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Bringing-it-all-together/Summary-on-Technology)

---

## Table of Contents

- Summary on Technology
  - Deployment Methods
  - Global Infrastructure
  - Networking Concepts
  - Storage Options
  - Compute Resources
  - Database Services
  - Application Integration
  - Management Services
  - Migration Services
  - Watch Video
    - Firewall Types
    - Block Storage
    - File Storage
    - Object Storage
    - Amazon EC2
    - AWS Lambda
    - Container Services
    - SQL-Based Managed Databases
    - NoSQL and Other Database Services
      - EC2 Pricing Models

---

## Content

AWS Cloud Practitioner CLF-C02

Bringing it all together

# Summary on Technology

This article provides a comprehensive overview of key AWS concepts, covering deployment methods, global infrastructure, networking, storage, compute resources, database services, application integration, management services, and migration tools. Learn how these components work together to create a secure, scalable, and robust cloud environment.

## Deployment Methods

When working with AWS, you have three primary approaches for deploying and managing your resources:

1.  **Console:** Use AWS's web-based graphical interface for an intuitive, visual experience when creating and managing resources.
2.  **Command Line Interface (CLI):** Manage resources faster and more efficiently with a powerful command line, allowing command reuse and configuration of settings not available in the Console.
3.  **Software Development Kit (SDK):** Programmatically interact with AWS using your favorite programming language to integrate AWS services into your applications.

![The image lists deployment methods: Console, CLI, and SDK, each with a checkmark, under the title "Deployment Methods - Summary."](https://kodekloud.com/kk-media/image/upload/v1752861543/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Technology/frame_50.jpg)

## Global Infrastructure

AWS’s global infrastructure is designed to maximize performance, scalability, and redundancy. It is organized into the following key components:

- **Regions:** Geographical areas where you deploy your applications. Not every AWS service is available in all regions.
- **Availability Zones (AZs):** Isolated data centers within a region providing redundancy and high availability by distributing workloads across multiple zones.
- **Edge Locations:** Points of presence located closer to end users to reduce latency.
- **Local Zones:** Extensions of AWS regions in select metropolitan areas, bringing services closer to customers.

![The image summarizes global infrastructure concepts: regions, service availability, availability zones, and edge locations for deploying and running services closer to customers.](https://kodekloud.com/kk-media/image/upload/v1752861544/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Technology/frame_110.jpg)

## Networking Concepts

AWS networking is engineered to isolate and protect your computing resources while ensuring optimal connectivity:

- **Virtual Private Cloud (VPC):** A logically isolated section of the AWS Cloud where you launch resources. Each VPC is scoped to a single region and defined by a unique CIDR block.
- **Subnets:** Subdivisions within a VPC that reside in individual Availability Zones. They can be public or private, depending on their connectivity to Internet Gateways or NAT Gateways.
  - **Internet Gateways:** Enable bidirectional communication between subnets and the internet.
  - **NAT Gateways:** Allow outbound internet traffic from private subnets while blocking inbound access.
- **Additional Components:**
  - **Virtual Private Gateways:** Provide secure connectivity between your VPC and remote networks.
  - **Direct Connect:** Offers a dedicated network connection to your AWS region for reduced latency and increased bandwidth.

Every region includes a default VPC pre-configured with a CIDR block (172.31.0.0/16), default subnets (one per AZ), security groups with default outbound traffic permissions, and open network ACLs.

![The image summarizes networking concepts, highlighting VPC isolation, regional constraints, CIDR block definitions, and subnets within a VPC.](https://kodekloud.com/kk-media/image/upload/v1752861545/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Technology/frame_160.jpg)

### Firewall Types

AWS implements two main firewall controls to secure network traffic:

- **Stateless Firewalls (Network ACLs):** Filter traffic at the subnet level and require explicit permission for both inbound and outbound traffic.
- **Stateful Firewalls (Security Groups):** Apply to individual resources (such as EC2 instances), allowing return traffic automatically once a connection is established.

![The image summarizes firewall types: stateless, stateful, network ACLs, and security groups, highlighting their functions in network traffic management and resource protection.](https://kodekloud.com/kk-media/image/upload/v1752861546/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Technology/frame_290.jpg)

A high-level view of AWS’s network architecture shows a VPC covering all Availability Zones within a region. Each zone contains its own subnets, with security groups providing resource-level protection and NACLs securing traffic between subnets. Internet and NAT gateways facilitate connectivity with external networks.

![The image illustrates a Virtual Private Cloud (VPC) architecture with public and private subnets, internet and NAT gateways, route tables, and access control lists (ACLs).](https://kodekloud.com/kk-media/image/upload/v1752861547/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Technology/frame_310.jpg)

## Storage Options

AWS offers three primary types of storage services tailored to different use cases.

### Block Storage

- **Amazon Elastic Block Store (EBS):** Provides block-level storage volumes that can be mounted as drives to an EC2 instance. Note that EBS volumes reside in a single Availability Zone, so ensure the instance and volume are in the same zone.
- **Instance Store:** Offers ephemeral block storage directly attached to EC2 instances. Data stored here is temporary and is lost when the instance is stopped or terminated.

![The image summarizes block storage concepts, highlighting EBS volumes' mountability, availability zone constraints, and instance store removal upon EC2 instance restart.](https://kodekloud.com/kk-media/image/upload/v1752861548/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Technology/frame_370.jpg)

### File Storage

- **Amazon Elastic File System (EFS):** A scalable file storage service for use with AWS Cloud services and on-premises resources. It provides a hierarchical structure accessible over the network but cannot be used as a boot volume.

![The image summarizes file storage, highlighting EFS's hierarchical structure, network accessibility, OS mounting capability, and its limitation as a non-bootable volume.](https://kodekloud.com/kk-media/image/upload/v1752861550/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Technology/frame_400.jpg)

### Object Storage

- **Amazon Simple Storage Service (S3):** A highly scalable object storage service with a flat file structure. S3 is ideal for storing media files, logs, and audit reports. It offers various storage classes that affect data accessibility, resiliency, and cost, but S3 storage cannot be mounted or used as a boot volume.

![The image summarizes object storage, highlighting its flat file structure, suitability for various files, API-based access, and the impact of storage classes on accessibility and cost.](https://kodekloud.com/kk-media/image/upload/v1752861551/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Technology/frame_430.jpg)

A recap diagram illustrates the three storage types:

- Block Storage: Amazon EBS
- File Storage: Amazon EFS
- Object Storage: Amazon S3

![The image illustrates three types of storage: Block Storage (Amazon EBS), File Storage (Amazon EFS), and Object Storage (Amazon S3).](https://kodekloud.com/kk-media/image/upload/v1752861553/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Technology/frame_450.jpg)

## Compute Resources

AWS provides a range of compute services designed for flexibility, scalability, and performance.

### Amazon EC2

Amazon EC2 enables you to quickly provision servers using pre-configured AMIs (Amazon Machine Images). With a range of instance types optimized for memory, compute, or storage, and support for operating systems ranging from various Linux distributions to Windows, EC2 caters to diverse workloads. Additionally, instances are available with different processors (ARM, AMD, Intel) and thousands of pre-built images available in the AWS Marketplace.

#### EC2 Pricing Models

- **On-Demand:** Pay only for the compute capacity you use with per-second or hourly billing—ideal for short-term or unpredictable workloads.
- **Spot Instances:** Benefit from substantial cost savings by using spare AWS capacity, suitable for interruption-tolerant applications.
- **Reserved Instances:** Lower your costs by committing to a one- to three-year term.
- **Dedicated Host/Instances:** Reserve physical servers, ensuring resource isolation and consistency.

### AWS Lambda

AWS Lambda is a serverless compute service that automatically scales your applications. Simply upload your code, and Lambda handles the rest—scaling the resources based on demand and billing you only for the compute time you consume. It is a perfect solution for file processing, mobile and web backends, and API-driven applications.

![The image summarizes AWS Lambda features: serverless computing, automatic scaling, file processing, mobile/web backend use cases, and pay-per-invocation pricing.](https://kodekloud.com/kk-media/image/upload/v1752861554/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Technology/frame_630.jpg)

### Container Services

Containers encapsulate your application and its dependencies into a single image, ensuring consistency across different environments. AWS offers two primary container orchestration services:

- **Amazon ECS:** A fully managed container orchestrator that simplifies running containerized applications but is closely integrated with the AWS ecosystem.
- **Amazon EKS:** A managed Kubernetes service providing the flexibility of open-source Kubernetes while AWS manages the control plane.

![The image summarizes container concepts, including packaging applications, container orchestrators, ECS, Kubernetes, and EKS, highlighting their roles in managing and scaling applications.](https://kodekloud.com/kk-media/image/upload/v1752861555/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Technology/frame_680.jpg)

## Database Services

AWS database services cater to a broad range of use cases, from self-managed installations on EC2 instances to fully managed solutions.

### SQL-Based Managed Databases

- **Amazon RDS:** A managed relational database service supporting engines such as Oracle, MySQL, MariaDB, Microsoft SQL, and PostgreSQL.
- **Amazon Aurora:** A high-performance relational database within RDS that offers both MySQL and PostgreSQL compatibility along with a serverless option (Aurora Serverless v2) to reduce management overhead.
- **Amazon Redshift:** Designed for online analytical processing (OLAP) with options for scaling to petabyte-size data warehouses, including a serverless option.

![The image lists AWS SQL database services, including RDS, Aurora, Aurora Serverless, and Redshift, highlighting features like encryption, autoscaling, and data handling capabilities.](https://kodekloud.com/kk-media/image/upload/v1752861556/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Technology/frame_810.jpg)

### NoSQL and Other Database Services

AWS also offers fully managed NoSQL database services and other specialized databases:

- **Amazon DynamoDB:** A high-performance NoSQL service tailored for fast, predictable performance with flexible security, search, and throughput options.
- **Amazon DocumentDB:** A managed document database service designed for compatibility with MongoDB.
- **Other Specialized Options:**
  - **Amazon Keyspaces:** A service for handling semi-structured data built on Apache Cassandra.
  - **Amazon Timestream:** Optimized for fast, scalable ingestion and querying of time series data.
  - **Caching:** Solutions like Amazon ElastiCache and Amazon MemoryDB provide in-memory data caching similar to Redis.
  - **Search:** Amazon OpenSearch Service delivers managed search and analytics.
  - **Graph Data:** Amazon Neptune is built to manage and query highly connected data efficiently.
  - **Ledger Databases:** Amazon Quantum Ledger Database (QLDB) ensures a secure, immutable ledger of transactions.

![The image lists AWS NoSQL database services, highlighting DynamoDB, DocumentDB, and open-source products, emphasizing features and use cases like search and security.](https://kodekloud.com/kk-media/image/upload/v1752861557/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Technology/frame_850.jpg)

A recap slide in the original material illustrates which database service is best suited to each use case—a valuable reference when preparing for AWS certification exams.

## Application Integration

AWS application integration services enable seamless communication between distributed components:

- **Simple Notification Service (SNS):** Facilitate the distribution of messages to a variety of endpoints or subscribers.
- **Simple Queue Service (SQS):** Decouple and scale microservices with a managed message queuing service.
- **Elastic Load Balancing (ELB):** Distribute incoming traffic across multiple resources, such as EC2 instances or containers, ensuring reliable performance.
- **Auto Scaling:** Automatically adjust your capacity to maintain consistent performance during fluctuations in traffic.

![The image lists application integration services: Simple Notification Service, Simple Queue System, Elastic Load Balancing, Autoscaling, and mentions additional services in practice exams.](https://kodekloud.com/kk-media/image/upload/v1752861559/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Technology/frame_1010.jpg)

## Management Services

AWS provides a suite of management tools that simplify the administration of your cloud environment:

- **CloudFormation:** Use infrastructure-as-code templates to provision and manage AWS resources in a declarative manner.
- **OpsWorks:** Manage configurations using Chef and Puppet for streamlined, automated operations.
- **Systems Manager:** Gather operational data across AWS services to automate maintenance and track system health.
- **Control Tower:** Centrally manage and govern multiple AWS accounts with ease.
- **AWS Config:** Monitor and record resource configurations for visibility and compliance.
- **AWS CloudTrail:** Log nearly every API request made within your account for auditing and compliance.

![The image summarizes AWS management services, highlighting CloudFormation, OpsWorks, Systems Manager, Organizations, Control Tower, AWS Config, and AWS CloudTrail functionalities.](https://kodekloud.com/kk-media/image/upload/v1752861561/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Technology/frame_1060.jpg)

## Migration Services

Migrating to AWS begins with a well-crafted strategy often guided by the AWS Cloud Adoption Framework. AWS offers multiple services to streamline migration:

- **Migration Hub:** Consolidate your migration tools and monitor progress in one central location.
- **Data Transfer Options:** Utilize services such as Snowcone, Snowball, or Snowmobile for transferring large data volumes. Traditional protocols like FTPS, SFTP, FTP, and AS2 are also supported.
- **Application Discovery Service:** Analyze your on-premises environment to aid in planning your migration.
- **Database Migration Service:** Migrate databases from on-premises data centers to AWS with minimal downtime.
- **Mainframe Modernization:** Transition legacy mainframe workloads to AWS efficiently.

![The image summarizes AWS migration services, highlighting planning, centralized tools, data transfer options, supported protocols, application discovery, and mainframe modernization.](https://kodekloud.com/kk-media/image/upload/v1752861562/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Summary-on-Technology/frame_1160.jpg)

AWS provides a full suite of services and tools to facilitate every stage of migration, ensuring a smooth transition to the cloud.

---

> [!important]
> **Summary**
>
> This article offered an overview of AWS deployment strategies, global infrastructure, networking, storage options, compute benefits, database services, application integration, management tools, and migration services. Use this guide as a quick reference for understanding AWS fundamentals.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/e578bb11-e866-4f03-94b8-1a3e89c9afb3/lesson/cfb461c2-d177-4691-8ae0-61f35a40d5f2)**
>
> Watch video content
