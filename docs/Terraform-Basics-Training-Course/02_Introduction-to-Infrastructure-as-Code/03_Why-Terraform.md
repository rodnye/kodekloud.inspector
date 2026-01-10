# Why Terraform - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Introduction-to-Infrastructure-as-Code/Why-Terraform)

---

## Table of Contents

- Why Terraform
  - Providers: Expanding Terraform's Reach
  - HashiCorp Configuration Language (HCL)
  - The Three Phases of Terraform
  - Managing Infrastructure with Terraform
  - Advanced Features: Terraform Cloud and Terraform Enterprise
  - Watch Video

---

## Content

Terraform Basics Training Course

Introduction to Infrastructure as Code

# Why Terraform

In this article, we will explore Terraform and highlight some of its key features. Terraform is a popular Infrastructure as Code (IaC) tool developed by HashiCorp that enables you to build, manage, and destroy infrastructure rapidly through a single binary installation.

Terraform’s simplicity and robust design make it ideal for managing a wide variety of infrastructures. Whether you are maintaining an on-premises vSphere cluster or deploying resources on cloud platforms like AWS, GCP, or Azure, Terraform streamlines infrastructure management using providers.

> [!important]
> **Key Advantage**
>
> Terraform can deploy infrastructure across diverse platforms using providers, ensuring that your infrastructure remains consistent across different environments.

## Providers: Expanding Terraform's Reach

Providers are plugins that allow Terraform to interact with third-party platforms via their APIs. They enable Terraform to manage not only cloud platforms (AWS, GCP, Azure) but also network infrastructure (e.g., F5 BIG-IP, Cloudflare, DNS, Palo Alto Networks, Infoblox), monitoring and data tools (e.g., Datadog, Grafana, Auth0, Wavefront, Sumo Logic), databases (e.g., InfluxDB, MongoDB, MySQL, PostgreSQL), and version control systems (e.g., GitHub, Bitbucket, GitLab).

The table below summarizes some examples of resource types and their real-world use cases:

| Resource Type    | Use Case                                 | Example Command/Resource      |
| ---------------- | ---------------------------------------- | ----------------------------- |
| Compute Instance | Launching virtual servers                | AWS EC2 instance provisioning |
| Storage Bucket   | Object storage and data management       | AWS S3 bucket creation        |
| IAM User         | Managing user identities and permissions | AWS IAM user setup            |

## HashiCorp Configuration Language (HCL)

Terraform uses HCL (HashiCorp Configuration Language), a declarative and easy-to-read language, to define the desired state of your infrastructure. These configurations are stored in files with a `.tf` extension. The descriptive syntax makes it accessible even for beginners, while also being powerful enough for advanced automation.

Below is an example Terraform configuration that provisions multiple AWS resources:

```
resource "aws_instance" "webserver" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"
}


resource "aws_s3_bucket" "finance" {
  bucket = "finance-21092020"
  tags = {
    Description = "Finance and Payroll"
  }
}


resource "aws_iam_user" "admin-user" {
  name = "lucy"
  tags = {
    Description = "Team Leader"
  }
}
```

This code demonstrates how Terraform provisions a new EC2 instance, creates an S3 bucket, and manages an IAM user on AWS. Because Terraform configurations are declarative, they represent the target state of your infrastructure. Terraform then automatically determines what changes are required to align your current environment with this desired state.

## The Three Phases of Terraform

Terraform operations are divided into three distinct phases:

1.  **Init Phase:**  
    Terraform initializes the project and downloads the necessary providers for the specified environment.
2.  **Plan Phase:**  
    Terraform creates a detailed execution plan that outlines the changes required to achieve the desired infrastructure state.
3.  **Apply Phase:**  
    Terraform implements the planned changes, ensuring that your environment matches the configuration. If there is any drift from the defined state, running `terraform apply` again will correct the discrepancies.

> [!important]
> **Declarative Nature**
>
> Since Terraform configurations are declarative, they simply describe the desired state. Terraform takes care of figuring out the steps necessary to reach that state.

## Managing Infrastructure with Terraform

Every component managed by Terraform is considered a resource. These resources can range from compute instances and database servers in the cloud to physical machines on-premises. Terraform not only provisions these resources but also continuously monitors their state to ensure that any updates or changes are applied consistently.

Terraform also provides mechanisms to import existing infrastructure into its management framework using data sources. This allows you to bring manually created or externally managed resources under Terraform’s control.

## Advanced Features: Terraform Cloud and Terraform Enterprise

Terraform Cloud and Terraform Enterprise extend Terraform’s capabilities by offering features that facilitate team collaboration, enhance security, and provide a centralized user interface for deployments. These features make Terraform a powerful tool for enterprise-grade infrastructure management.

---

This article provided a high-level introduction to Terraform. In the upcoming sections, we will explore these concepts in greater detail with guided examples and hands-on labs. For more detailed information on Terraform, be sure to check out the [Terraform Documentation](https://www.terraform.io/docs).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/e860c2fb-d55e-48f2-87cc-9149460b600a/lesson/7cdb4abf-6042-4f83-8236-fe1330144b9c)**
>
> Watch video content
