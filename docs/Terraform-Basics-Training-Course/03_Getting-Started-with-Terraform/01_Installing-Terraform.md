# Installing Terraform - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Getting-Started-with-Terraform/Installing-Terraform)

---

## Table of Contents

- Installing Terraform
  - Installing Terraform 0.13 on Linux
  - Working with Terraform
  - Getting Started with Simple Resources
  - Watch Video
    - Understanding Terraform Resources

---

## Content

Terraform Basics Training Course

Getting Started with Terraform

# Installing Terraform

In this lesson, you'll learn how to install Terraform—a powerful tool for managing infrastructure as code. Terraform is distributed as a single binary that you can download from the official [Terraform website](https://www.terraform.io/downloads.html). Once downloaded, simply place the executable in your system's PATH and verify the installation by checking its version.

Terraform supports Windows, macOS, and a range of Linux distributions. For the purposes of this lesson, all examples and labs will use Terraform version 0.13 on a Linux machine.

> [!important]
> **Terraform Version**
>
> This lesson uses Terraform v0.13. Ensure you download the correct version for your operating system.

## Installing Terraform 0.13 on Linux

Follow these steps to install Terraform 0.13 on a Linux system:

1.  Open your terminal.
2.  Download the Terraform 0.13 binary.
3.  Unzip the downloaded file.
4.  Move the Terraform executable to `/usr/local/bin` so that it is accessible from anywhere.
5.  Verify the installation by checking the Terraform version.

Run the following commands:

```
wget https://releases.hashicorp.com/terraform/0.13.0/terraform_0.13.0_linux_amd64.zip
unzip terraform_0.13.0_linux_amd64.zip
mv terraform /usr/local/bin
terraform version
```

You should see output similar to:

```
Terraform v0.13.0
```

## Working with Terraform

After installing Terraform, you can begin deploying resources using configuration files written in the HashiCorp Configuration Language (HCL). These files have a `.tf` extension and can be edited with any text editor or IDE.

For example, consider the following HCL snippet that defines an AWS EC2 instance resource:

```
resource "aws_instance" "webserver" {
  ami           = "ami-0c2f25c1f66a1ff4d"
  instance_type = "t2.micro"
}
```

### Understanding Terraform Resources

A resource in Terraform represents an object managed by the tool. This can range from local files to virtual machines, cloud services, and beyond. Here’s a quick overview of some common resource types:

| Resource Type | Description              | Example         |
| ------------- | ------------------------ | --------------- |
| EC2 Instance  | Virtual machine on AWS   | `aws_instance`  |
| S3 Bucket     | Cloud storage on AWS     | `aws_s3_bucket` |
| IAM Role      | Access management in AWS | `aws_iam_role`  |

Terraform enables you to provision hundreds of resources across multiple cloud providers (such as AWS, GCP, or Azure) as well as manage on-premises infrastructure.

## Getting Started with Simple Resources

In the initial sections of this lesson, we focus on two simple resource types:

- A local file resource.
- A special resource called a random pet.

These examples are designed to help you understand key concepts such as resource lifecycle management and the basics of HCL syntax. Once you have a solid grasp of these fundamentals, you'll be better prepared to deploy more complex, real-world infrastructure scenarios later in the lesson.

> [!important]
> **Next Steps**
>
> With these basic concepts in hand, you're now ready to explore more advanced Terraform configurations and resource management techniques.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/385de3de-cd58-4925-9a24-207ebd7844b3/lesson/705722ca-8f44-4c90-b62e-079fb8c634ee)**
>
> Watch video content
