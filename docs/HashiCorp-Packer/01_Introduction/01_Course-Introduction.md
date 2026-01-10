# Course Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Packer/Introduction/Course-Introduction)

---

## Table of Contents

- Course Introduction
  - Why Use Packer?
  - Course Outline
  - What You’ll Learn
  - Watch Video

---

## Content

HashiCorp Packer

Introduction

# Course Introduction

Welcome to this comprehensive HashiCorp Packer tutorial! I’m **Sanjeev Thiyagarajan**, and in this course you’ll learn how to build **custom machine images** for AWS, Azure, GCP, and more—using Packer’s powerful workflow for **immutable infrastructure**.

## Why Use Packer?

HashiCorp Packer automates the creation of machine images by “baking in” everything your servers need before launch:

- Install required packages and dependencies
- Copy and configure your application’s source code
- Apply system hardening and security settings

The result is a **fully configured**, **immutable image**. When you deploy instances from that image, they’re production-ready with zero additional setup.

> [!important]
> **Prerequisites**
>
> Before you begin, ensure you have:
>
> - An active cloud provider account (e.g., AWS, Azure, GCP)
> - Your CLI configured for your target provider
> - Basic familiarity with JSON or HCL configuration files

## Course Outline

| Module                      | Topics Covered                                          |
| --------------------------- | ------------------------------------------------------- |
| 1\\. Introduction to Packer | What is Packer?<br>Benefits of immutable machine images |
| 2\\. Builders               | AWS AMI, Azure VM Image, GCP Image                      |
| 3\\. Provisioners           | Shell scripts, Ansible, Chef, Puppet                    |
| 4\\. Post-Processors        | AMI registration, Docker export, artifact upload        |
| 5\\. Hands-On Demo          | Step-by-step AMI build with AWS                         |

![The image shows a person sitting in front of a microphone with a neon cloud and lightning decoration in the background. A text box on the left lists topics related to Packer, including builders, provisioners, and post processors.](https://kodekloud.com/kk-media/image/upload/v1752878649/notes-assets/images/HashiCorp-Packer-Course-Introduction/person-microphone-neon-cloud-topics.jpg)

## What You’ll Learn

- How to write Packer templates in HCL or JSON
- Best practices for reusable and maintainable image builds
- Integrating Packer with CI/CD pipelines
- Debugging build failures and optimizing performance

By the end of this course, you’ll be able to produce **production-ready AMIs** (and other images) that accelerate your deployments and standardize your infrastructure.

[Get started with the official Packer documentation](https://www.packer.io/docs) and let’s dive in!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-packer/module/3c219c08-371e-4630-821e-64bbdff21701/lesson/7c7027ca-0174-4a59-8565-402ca8cb4e3b)**
>
> Watch video content
