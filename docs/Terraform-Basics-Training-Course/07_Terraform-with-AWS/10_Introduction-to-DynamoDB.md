# Introduction to DynamoDB - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-with-AWS/Introduction-to-DynamoDB)

---

## Table of Contents

- Introduction to DynamoDB
  - Watch Video

---

## Content

Terraform Basics Training Course

Terraform with AWS

# Introduction to DynamoDB

In this guide, we provide an in-depth introduction to Amazon DynamoDB, AWS's fully managed NoSQL database solution. If you're already acquainted with DynamoDB, feel free to skip ahead to more advanced topics later in the guide.

DynamoDB is engineered for high scalability and low latency data access, making it an ideal choice for applications that process millions of requests daily. Whether you're developing mobile or web applications, gaming platforms, or IoT systems, DynamoDB ensures robust performance and efficiency. Additionally, as a fully managed service, AWS handles tasks such as software installation, upgrades, and patching, so you can focus on building your application. Its data replication capability across multiple AWS regions further guarantees high availability, a feature trusted by many large-scale applications.

DynamoDB organizes data using key-value pairs and document structures. For example, consider designing a database to store information about cars. You might begin with a table that includes keys such as manufacturer and model. As your data requirements evolve, you can enhance the table by adding keys like the manufacturing year and the vehicle identification number (VIN).

Each row in the table is referred to as an "item." In our car database example, each item holds details about a car, including the manufacturer, model, year, and VIN. This process is illustrated in the diagram below:

![The image shows a table listing car details: manufacturer, model, year, and VIN for Toyota, Honda, Dodge, and Ford vehicles.](https://kodekloud.com/kk-media/image/upload/v1752884240/notes-assets/images/Terraform-Basics-Training-Course-Introduction-to-DynamoDB/frame_110.jpg)

An item in DynamoDB is composed of one or more attributes that describe the data. In our vehicle database, these attributes include the manufacturer, model, year, and VIN. The JSON examples below demonstrate how each car item might be defined:

```
{
  "Manufacturer": "Toyota",
  "Make": "Corolla",
  "Year": 2004,
  "VIN": "4Y1SL65848Z411439"
}
{
  "Manufacturer": "Honda",
  "Make": "Civic",
  "Year": 2017,
  "VIN": "DY1SL65848Z411432"
}
{
  "Manufacturer": "Dodge",
  "Make": "Journey",
  "Year": 2014,
  "VIN": "SD1SL65848Z411443"
}
{
  "Manufacturer": "Ford",
  "Make": "F150",
  "Year": 2020,
  "VIN": "DH1SL65848Z411100"
}
```

> [!important]
> **Primary Key Guidelines**
>
> DynamoDB requires a primary key to uniquely identify each item in a table. In this case, using the VIN as the primary key is ideal because each vehicle's identification number is unique. When adding a new item, providing a value for the primary key is mandatory, while other attributes remain optional and can be omitted if necessary.

This concludes our introduction to DynamoDB. In the upcoming lessons, we will explore practical techniques for managing and querying your DynamoDB database to further enhance performance and scalability.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/e1d12378-f838-46c9-9b2e-28d86daa1e1e/lesson/56cc8ba2-b5eb-489d-9f29-032fbafb7d14)**
>
> Watch video content
