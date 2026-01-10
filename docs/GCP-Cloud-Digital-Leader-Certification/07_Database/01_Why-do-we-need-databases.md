# Why do we need databases - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/Database/Why-do-we-need-databases)

---

## Table of Contents

- Why do we need databases
  - Watch Video

---

## Content

GCP Cloud Digital Leader Certification

Database

# Why do we need databases

Hello and welcome to this lesson on the importance of databases, especially within applications hosted on the [Google Cloud Platform (GCP)](https://cloud.google.com). In today’s digital landscape, databases are not just storage solutions but are critical components in ensuring scalability, reliability, and efficiency for modern applications.

Imagine an architecture where an instance group hosts an application behind a load balancer. Consider a pharmaceutical company that requires user authentication for its engineers and researchers. In this scenario, each user provides a username and password that could be stored locally on individual virtual machines. However, this approach introduces several challenges:

- Data stored on one virtual machine is not automatically shared with others.
- As the application scales to include more virtual machines or additional instance groups, isolated authentication details can lead to inconsistent behavior.
- In the event of a failure in one instance group, health checks may reroute traffic to another instance group that lacks the necessary authentication records.
- Data stored on local volumes may be lost when machines are replaced or scaled.

> [!important]
> **Key Point**
>
> Centralized data management is critical for applications that require high availability and seamless scaling.

To overcome these challenges, adopting a centralized and robust method for storing and retrieving data is essential. Databases address these issues by:

- **Centralized Storage:** Consolidates data into a single, reliable location.
- **Scalability:** Efficiently manages large volumes of data—potentially terabytes—while supporting concurrent data access.
- **Concurrent Access:** Allows multiple users or systems to read and modify data simultaneously.
- **Search and Sort Functionality:** Offers built-in capabilities to quickly locate and organize data.
- **Advanced Analytics:** Enables powerful data analysis to extract insights that drive informed decision-making.

![The image illustrates four benefits of databases: data storage, multi-user access, searchability, and business insights. Each benefit is represented with an icon and a brief description.](https://kodekloud.com/kk-media/image/upload/v1752875230/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Why-do-we-need-databases/database-benefits-icons-description.jpg)

This diagram effectively summarizes why databases are essential for modern applications. In the upcoming lesson, we will explore the various database options available in GCP and examine the different types of databases you can implement.

That concludes this lesson. Thank you for joining us, and see you in the next session!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/8bcad91c-3036-4438-ae54-6ad95434bbeb/lesson/e2ab2709-64db-4368-8fc8-7004bf0432eb)**
>
> Watch video content
