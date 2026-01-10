# Terraform Demo S3 Deployment - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CDK-for-Terraform-with-TypeScript/Course-Introduction/Terraform-Demo-S3-Deployment)

---

## Table of Contents

- Terraform Demo S3 Deployment
  - Project Overview
  - Reusable Module for S3 Bucket
  - Initializing and Deploying with Terraform
  - Verifying Bucket Configuration
  - Detailed Configuration Breakdown
  - Benefits and Limitations
  - Watch Video

---

## Content

CDK for Terraform with TypeScript

Course Introduction

# Terraform Demo S3 Deployment

In this lesson, we demonstrate how to deploy Amazon S3 buckets using Terraform. We begin by reviewing the primary Terraform configuration that creates these buckets, and later we explore an equivalent deployment using [CDK for Terraform with TypeScript](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript).

## Project Overview

In our lab environment, the project is organized with a main Terraform file (`main.tf`) that specifies the AWS provider, generates unique bucket names using a random ID resource, and creates the S3 buckets. Below is an overview of the main configuration:

```
# Configure the AWS provider
provider "aws" {
  region = "us-east-1"
}


# Generate a random ID to ensure unique bucket names
resource "random_id" "bucket_id" {
  byte_length = 4
}


# Create the first S3 bucket with object lock enabled
resource "aws_s3_bucket" "tf-demo-bucket-1" {
  bucket              = "tf-demo-bucket-1-${random_id.bucket_id.hex}"
  object_lock_enabled = true
}


# Create the second S3 bucket using a module for reusability
module "s3_bucket" {
  source = "./modules/s3_bucket_with_env_tag"
  env    = "dev"
  name   = "tf-demo-bucket-2-${random_id.bucket_id.hex}" # Ensure unique bucket name
}
```

> [!important]
> **Note**
>
> In the above configuration, object locking is enabled on the S3 buckets. Object locking helps protect your data from accidental deletion or modification.

## Reusable Module for S3 Bucket

A module is used to encapsulate the S3 bucket creation logic, promoting reusability and maintainability. Within the module located at `./modules/s3_bucket_with_env_tag`, the main file includes the following snippet:

```
resource "aws_s3_bucket" "tf-demo-bucket-2" {
  bucket              = var.name
  object_lock_enabled = true
  tags = {
    env = var.env
  }
}
```

This module uses a variables file to define configurable parameters such as the bucket name and environment tag. Separating configuration from usage enables parameterized and reusable infrastructure components.

## Initializing and Deploying with Terraform

Before deploying, navigate to the directory containing your Terraform files (e.g., `cd TF`) and run the following command to initialize the environment:

```
terraform init
```

The console output should resemble:

```
Terraform initialized in an empty directory!


The directory has no Terraform configuration files. You may begin working with Terraform immediately by creating Terraform configuration files.
```

After successful initialization, deploy your configuration with:

```
terraform apply
```

When prompted, confirm the action to proceed with the deployment. Once the process completes, navigate to your AWS S3 console to verify that two new buckets have been created, each with a unique name that includes a random ID. The second bucket will also display the tag "env" set to "dev".

## Verifying Bucket Configuration

The following images illustrate key aspects of the bucket configurations:

![The image shows an Amazon S3 bucket properties page, detailing the bucket's region, ARN, creation date, versioning status, and MFA delete settings.](https://kodekloud.com/kk-media/image/upload/v1752869590/notes-assets/images/CDK-for-Terraform-with-TypeScript-Terraform-Demo-S3-Deployment/amazon-s3-bucket-properties-page.jpg)

![The image shows an AWS S3 bucket settings page, displaying configurations for multi-factor authentication, tags, default encryption, and intelligent-tiering archive configurations.](https://kodekloud.com/kk-media/image/upload/v1752869591/notes-assets/images/CDK-for-Terraform-with-TypeScript-Terraform-Demo-S3-Deployment/aws-s3-bucket-settings-configurations.jpg)

These visuals confirm that the bucket properties and settings have been correctly applied as described in the Terraform configuration.

## Detailed Configuration Breakdown

Below is an excerpt showcasing the bucket resource parameters and the corresponding variable definitions to enforce proper configuration:

```
resource "aws_s3_bucket" "tf-demo-bucket-2" {
  bucket              = var.name
  object_lock_enabled = true
  tags = {
    env = var.env
  }
}
```

And the variables:

```
variable "env" {
  description = "Environment tag for the bucket"
  type        = string
  validation {
    condition     = var.env == "dev" || var.env == "prod"
    error_message = "The env variable must be either 'dev' or 'prod'."
  }
}


variable "name" {
  description = "The name of the bucket"
  type        = string
}
```

> [!important]
> **SEO Tip**
>
> Using descriptive variable names and thorough validation not only helps maintain clean code but also enhances readability and search engine optimization for technical documentation.

## Benefits and Limitations

In the upcoming section, we will discuss the benefits of leveraging Terraform for infrastructure deployment, as well as some inherent limitations of this approach. By defining infrastructure as code using a declarative language like HCL, teams can manage and scale their resources more efficiently.

For further reading, visit the following resources:

- [Terraform Documentation](https://www.terraform.io/docs)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/index.html)

This concludes our walkthrough of deploying Amazon S3 buckets with Terraform.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cdk-for-terraform-with-typescript/module/813d9207-e35e-4698-babc-436986515d19/lesson/4ab4bc08-1cd8-4221-a974-a6b0700c1318)**
>
> Watch video content
