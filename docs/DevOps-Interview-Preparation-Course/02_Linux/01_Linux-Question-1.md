# Linux Question 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/Linux/Linux-Question-1)

---

## Table of Contents

- Linux Question 1
  - Diagnosing the Root Volume Issue
  - Diagnosing the Application Volume Issue
  - Interview Response Strategy
  - Watch Video

---

## Content

DevOps Interview Preparation Course

Linux

# Linux Question 1

This article tackles a common Linux challenge: resolving disk space issues on an [EC2 instance](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2). While the question is rooted in Linux troubleshooting, the focus is on managing EC2 disk space—an important topic for DevOps professionals during technical interviews.

The problem typically arises from issues with EBS (Elastic Block Store) volumes attached to your EC2 instance. Often, your instance will have multiple volumes, such as:

- **Root EBS Volume**: Holds the operating system data.
- **Application EBS Volume**: Stores application-specific data.

> [!important]
> **Note**
>
> Before proceeding, ensure that you have a proper backup of your critical data to avoid any loss during the troubleshooting process.

## Diagnosing the Root Volume Issue

When the root EBS volume runs out of space, immediate action is required because the operating system depends on it for essential functions. Follow these steps:

1.  **Inspect System Logs**: Check directories like `/var/log` for any unusual file sizes or logs that might be filling up the disk.
2.  **Identify Temporary Files**: Investigate temporary directories that may have accumulated redundant files.
3.  **Monitor Disk Utilization**: If the disk usage hits 100%, the system might fail to allocate space for its operations, risking a shutdown.

![The image contains notes about managing EC2 disk space, specifically focusing on EBS volumes, root and application volumes, and steps to handle space issues.](https://kodekloud.com/kk-media/image/upload/v1752873382/notes-assets/images/DevOps-Interview-Preparation-Course-Linux-Question-1/ec2-disk-space-management-notes.jpg)

## Diagnosing the Application Volume Issue

If the application EBS volume is full, you can adopt a slightly relaxed approach compared to the root volume. Consider the steps below:

1.  **Analyze Volume Usage**: Determine which application data is consuming disk space.
2.  **Review Application Logs**: Check if the application is generating excessive logs or temporary files.
3.  **Examine Deployment Artifacts**: Identify any obsolete JAR files or unused libraries resulting from recent deployments.

> [!important]
> **Tip**
>
> For application volumes, it is advisable to create an EBS snapshot to secure data before making changes.

Once you secure a snapshot, you can safely increase the volume size to address the limited disk space.

## Interview Response Strategy

When responding to a question about disk space issues during an interview, a structured answer can make a strong impression. Consider the following approach:

1.  **Clarify the Affected Volume**:
    - For the **root volume**: "I would first review the system logs (e.g., from `/var/log`) to identify unnecessary files. Freeing up space is critical to ensure that the OS continues functioning without interruption."
    - For the **application volume**: "I would analyze application-specific logs, check for excessive temporary files or redundant data, and clean up any unnecessary artifacts."

2.  **Outline Your Resolution Strategy**:
    - **Root Volume**: Take immediate measures by cleaning non-essential logs and files to prioritize system stability.
    - **Application Volume**: Create an EBS snapshot for backup and then increase the volume size, ensuring that the application continues running smoothly.

| Volume Type            | Key Focus              | Recommended Action                                                          |
| ---------------------- | ---------------------- | --------------------------------------------------------------------------- |
| Root EBS Volume        | OS operation integrity | Clear non-essential files in system directories, especially `/var/log`      |
| Application EBS Volume | App data management    | Secure a snapshot and resize the volume to maintain application performance |

By following these troubleshooting steps, you not only safeguard the [EC2 instance](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) from potential downtime but also demonstrate your systematic problem-solving skills in a technical interview.

That concludes our discussion on handling EC2 disk space issues. In the next article, we will cover additional interview questions and delve deeper into debugging techniques.

Thank you.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/65a571ca-df69-45f1-bf30-f85f0debdaf4/lesson/6cf4a8d0-531c-473a-9711-b99d5c240655)**
>
> Watch video content
