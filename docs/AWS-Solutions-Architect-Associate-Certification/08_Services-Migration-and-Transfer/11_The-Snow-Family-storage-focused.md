# The Snow Family storage focused - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Migration-and-Transfer/The-Snow-Family-storage-focused)

---

## Table of Contents

- The Snow Family storage focused
  - Main Features of the AWS Snow Family
  - Overview of AWS Snow Family Devices
  - Use Cases for the AWS Snow Family
  - Integration Capabilities
  - Summary
  - Watch Video
    - AWS Snowball Edge
    - AWS Snowcone
    - AWS Snowball
    - AWS Snowmobile

---

## Content

AWS Solutions Architect Associate Certification

Services Migration and Transfer

# The Snow Family storage focused

In this lesson, we explore the AWS Snow Family, a collection of physical storage devices designed to facilitate the secure and efficient transfer of massive data volumes between your on-premises environment and AWS. These devices act like portable hard disks, enabling you to bypass the bandwidth, cost, and security challenges often associated with large network-based data transfers.

Transferring extensive amounts of data (multiple terabytes to petabytes) via traditional networks can be slow, expensive, and risky. The AWS Snow Family addresses these challenges by physically transporting your data, making it a robust alternative for large-scale migrations.

## Main Features of the AWS Snow Family

Before diving into the specifics of each device, let’s review some of the key features and benefits:

- **Rugged and Portable:**  
  Many of these devices are built with ruggedized cases to withstand rough handling. For instance, the AWS Snowcone is a compact device weighing only 4.5 pounds, while the AWS Snowball weighs less than 50 pounds. Their durability makes them convenient for transport in challenging environments.
- **NFS Mount Point Support:**  
  The devices support NFS versions 3 and 4.1, which allows seamless integration with on-premises servers and file-based applications. The file system metadata remains intact until files are converted into objects when migrated to an Amazon S3 bucket.
- **Onboard Compute Capabilities:**  
  With built-in computing resources, you can process and analyze data at the edge. The devices support running specific Amazon EC2 instances and AWS IoT Greengrass functions. During the ordering process, you can choose preferred EC2 AMIs (including those for IoT Greengrass) that are pre-loaded onto the device.
- **Data Security:**  
  All data transferred is automatically encrypted using 256-bit encryption keys managed by AWS KMS. These keys are never stored on the devices, ensuring robust data security during transit.
- **Offline Data Migration:**  
  The Snow Family devices support efficient offline data migration by shipping the hardware loaded with your data to your designated AWS region. Remember to configure your S3 buckets before ordering a Snowball device to streamline the transfer process.
- **Tamper-Proof Design:**  
  Each device features a trusted platform module that establishes a hardware root of trust, protecting your data and preventing device tampering.
- **End-to-End Tracking:**  
  Innovative shipping labels allow for real-time tracking of your data migration progress via the AWS console, Amazon SNS notifications, and text messages. After the transfer to AWS, the device is securely wiped clean to protect your data.

![The image lists features of a "Transfer Family," including Rugged and Portable, NFS Endpoint, On-board Computing, Encryptions, Offline Data Migration, Anti-tamper, End-to-end Tracking, and Secure Erasure. Each feature is represented with an icon.](https://kodekloud.com/kk-media/image/upload/v1752865470/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-The-Snow-Family-storage-focused/transfer-family-features-icons.jpg)

## Overview of AWS Snow Family Devices

### AWS Snowball Edge

The AWS Snowball Edge is a 50-pound device that combines significant onboard storage with compute capabilities. It is ideal for local processing and running edge computing workloads while also transferring data between your on-premises environment and AWS Cloud.

### AWS Snowcone

AWS Snowcone is an ultra-portable, secure, and rugged device designed for environments where space and power are limited. It supports both offline data transfer (via shipping) and online transfer using AWS DataSync, making it an excellent choice for remote locations such as construction sites, ships, or military deployments.

### AWS Snowball

Distinct from the Snowball Edge, the standard AWS Snowball is a suitcase-sized device available in two configurations:

- **Snowball Edge Compute Optimized:** Offers up to 104 vCPUs for intensive compute applications.
- **Snowball Edge Storage Optimized:** Provides up to 80 terabytes of hard disk capacity alongside 210 terabytes of NVMe storage for large-scale data migration.

This flexibility allows you to select a device that best meets your compute or storage requirements.

### AWS Snowmobile

For organizations facing exabyte-scale data migrations, AWS Snowmobile is the solution. This truck-sized device can transfer up to 100 petabytes of data, making it ideally suited for extremely large-scale data transfers where traditional methods would be impractical.

![The image is an infographic showing the components of the AWS Snow Family, including AWS Snowball Edge, AWS Snowcone, AWS Snowball, and AWS Snowmobile, with details on their optimization and data migration capabilities.](https://kodekloud.com/kk-media/image/upload/v1752865472/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-The-Snow-Family-storage-focused/aws-snow-family-infographic.jpg)

## Use Cases for the AWS Snow Family

- **Edge Computing and IoT:**  
  In environments with intermittent or limited connectivity, devices like the Snowball Edge and Snowcone act as local hubs that can process, analyze, and handle data—including image, video, or AI/ML analytics—directly at the edge.

  > [!important]
  > **Note**
  >
  > Leveraging edge computing can significantly reduce latency and improve responsiveness in remote applications.

- **Large-Scale Data Migration:**  
  For enterprises needing to migrate vast amounts of data from on-premises data centers to AWS, both the standard Snowball and the Snowmobile offer secure and efficient solutions. Their robust design ensures that data is transferred reliably and securely at scale.

![The image illustrates "Snow Use Cases," showing a flow from edge computing and corporate data centers through the "Snow Family" to an AWS Cloud S3 Bucket. It highlights data migration and processing in a cloud infrastructure context.](https://kodekloud.com/kk-media/image/upload/v1752865473/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-The-Snow-Family-storage-focused/snow-use-cases-data-migration.jpg)

## Integration Capabilities

While the primary function of the Snow Family is to transfer data to Amazon S3, these devices also integrate with AWS Lambda. This integration enables you to execute compute tasks directly on the devices, providing advanced processing capabilities for supported workloads.

> [!important]
> **Tip**
>
> Integrating AWS Lambda with the Snow Family can streamline workflows by processing data locally before or during migration.

## Summary

The AWS Snow Family offers versatile solutions to physically transfer data into AWS, catering to a wide range of applications—from small-scale edge deployments to exabyte-level data migrations. With features such as rugged durability, onboard compute capabilities, robust security, and comprehensive tracking, these devices provide an efficient and reliable method for migrating large volumes of data while maintaining integrity and security throughout the process.

For more detailed information on the AWS Snow Family and additional AWS storage solutions, be sure to explore the [AWS Documentation](https://aws.amazon.com/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/4fd27446-288a-44dc-a3f3-99e943f92fe2/lesson/f44f5349-9119-40fd-b290-badb9ad7ee96)**
>
> Watch video content
