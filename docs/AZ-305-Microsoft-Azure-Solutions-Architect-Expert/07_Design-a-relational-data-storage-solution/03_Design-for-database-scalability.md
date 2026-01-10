# Design for database scalability - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-305-Microsoft-Azure-Solutions-Architect-Expert/Design-a-relational-data-storage-solution/Design-for-database-scalability)

---

## Table of Contents

- Design for database scalability
  - Purchasing Models for Azure SQL Database
  - Choosing the Right Database Offering
  - Watch Video
    - DTU Purchasing Model
    - vCore Purchasing Model

---

## Content

AZ-305: Microsoft Azure Solutions Architect Expert

Design a relational data storage solution

# Design for database scalability

In this lesson, we explore the scalability options available for Azure SQL Database, focusing on the purchasing models and solutions designed to meet a variety of resource and cost requirements. We will also cover key considerations to help you choose the right offering for your needs.

## Purchasing Models for Azure SQL Database

When deploying an Azure SQL Database, you have two purchasing models to choose from: the DTU model and the vCore model. Note that these models apply only to Azure SQL Database; for SQL Managed Instance, only the vCore model is available.

### DTU Purchasing Model

The DTU (Database Transaction Unit) model is a composite measure defined by Microsoft that bundles compute, storage, and I/O resources. When creating a database using this model, you specify the number of DTUs you require (for example, 100, 200, 300, or even 5,000) based on your workload's performance needs. The DTU model offers three service tiers: Basic, Standard, and Premium. For example, if you select the Basic tier in the Azure portal, you are using the DTU model.

> [!important]
> **Note**
>
> Keep in mind that the DTU model does not allow you to individually customize compute, memory, and storage resources; scaling is done in fixed increments (e.g., 5, 10, 20, 30 DTUs). This may not precisely align with your unique requirements.

The image below compares the DTU purchasing model with the vCore purchasing model:

![The image compares two Azure SQL Database purchasing models: the DTU model, which combines compute, storage, and IO resources, and the vCore model, which allows independent selection of compute and storage resources.](https://kodekloud.com/kk-media/image/upload/v1752867178/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-database-scalability/azure-sql-dtu-vcore-comparison.jpg)

### vCore Purchasing Model

The vCore purchasing model offers greater flexibility by allowing you to independently select the number of vCPUs and the amount of storage tailored to your application's needs. For instance, you might configure a database with 80 vCPUs and 512 GB of storage. Although this model may incur higher costs compared to the DTU model, cost reduction options such as the Azure Hybrid Benefit for existing licenses or reserved instances can help optimize expenses.

The vCore model is available in three tiers: General Purpose, Business Critical, and Hyperscale.

## Choosing the Right Database Offering

When planning your database solution, consider the following questions to determine the most appropriate offering for your scenario:

1.  **Do you need to manage multiple Azure SQL databases with varying resource requirements?**
    - If so, consider using elastic pools. Elastic pools enable databases to share pre-provisioned compute and storage resources, accommodating workload variability across databases.

2.  **Is a single database sufficient for development or testing purposes?**
    - For single-database scenarios, you can choose between an Azure SQL Database or a SQL Managed Instance based on your needs. If your application does not require instance-scoped functionality or native virtual network deployment, an Azure SQL Database might be more cost-effective.

3.  **Do you need to optimize costs across a group of databases within a defined budget?**
    - In this case, think about using an instance pool. An instance pool allows you to provision a fixed amount of compute and storage resources to be shared among multiple databases, ensuring total cost remains within your budget.

The infographic below visually summarizes these scaling strategies and offers guidance for managing Azure SQL databases while optimizing costs:

![The image is an infographic by KodeKloud about scaling databases, featuring questions related to managing Azure SQL databases and optimizing costs, with visual elements like planes and database icons.](https://kodekloud.com/kk-media/image/upload/v1752867179/notes-assets/images/AZ-305-Microsoft-Azure-Solutions-Architect-Expert-Design-for-database-scalability/scaling-azure-sql-databases-infographic.jpg)

> [!important]
> **Additional Resources**
>
> For more detailed information on Azure SQL Database scalability and purchasing options, visit the [Azure SQL Database documentation](https://docs.microsoft.com/en-us/azure/azure-sql/).

When designing your database solution, use these considerations to select the appropriate purchasing model and scalability option that best meets your performance and budget requirements.

This concludes our discussion on designing for database scalability. Next, we will move on to the topic of database availability.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-305-microsoft-azure-solutions-architect-expert/module/9697e3cc-0c47-4c28-aac7-fd0fcc89cdb2/lesson/fbe5dca7-1843-4c7f-9754-99b0cdb40acb)**
>
> Watch video content
