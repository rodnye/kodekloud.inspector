# What is Packer - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Packer/HashiCorp-Packer-Basics/What-is-Packer)

---

## Table of Contents

- What is Packer
  - Key Benefits of Packer
  - Packer Configuration Components
  - Example: Building an Ubuntu AMI with Nginx
  - How Packer Executes Builds
  - Next Steps & References
  - Watch Video
    - Build Commands

---

## Content

HashiCorp Packer

HashiCorp Packer Basics

# What is Packer

Packer by HashiCorp is an open-source tool that automates the creation of **machine images** for various platforms—AWS, Azure, Docker, and more—using a single source configuration. Instead of manually configuring each virtual machine or container, Packer enables you to bake your desired packages, dependencies, and application code into a **golden image** that’s ready for deployment.

![The image illustrates how Packer creates images for AWS, Azure, and Docker, showing the flow from source to deployment.](https://kodekloud.com/kk-media/image/upload/v1752878647/notes-assets/images/HashiCorp-Packer-What-is-Packer/packer-image-creation-aws-azure-docker.jpg)

## Key Benefits of Packer

- **Consistency**: Build identical images every time.
- **Speed**: Automate provisioning and eliminate manual steps.
- **Portability**: Use a single HCL template across multiple cloud and container platforms.
- **Scalability**: Integrate into CI/CD pipelines for fully automated image builds.

> [!important]
> **Note**
>
> Before you begin, ensure you have the latest [Packer CLI](https://www.packer.io/downloads) installed and your cloud provider credentials configured (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, etc.).

## Packer Configuration Components

A typical Packer template consists of three primary sections:

| Component       | Purpose                                                                                  | Example                                                       |
| --------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Builders        | Defines the target platform and base image (e.g., AWS AMI, Azure Managed Image, Docker). | `source "amazon-ebs" "ubuntu" { ... }`                        |
| Provisioners    | Runs scripts or commands to install dependencies, copy code, and configure services.     | `provisioner "shell" { inline = ["sudo apt install nginx"] }` |
| Post-Processors | Optional steps to compress artifacts, upload images to registries, or tag images.        | `post-processor "docker-tag" { ... }`                         |

## Example: Building an Ubuntu AMI with Nginx

Below is a simple HCL template (`template.pkr.hcl`) that launches an EC2 instance from an Ubuntu AMI, installs Nginx, clones application code, and then creates a new AMI.

```
source "amazon-ebs" "ubuntu" {
  ami_name      = "my-first-packer-image"
  instance_type = "t2.micro"
  region        = "us-east-1"
  source_ami    = "ami-0557a15b87f6559cf"
  ssh_username  = "ubuntu"
}

build {
  name    = "ubuntu-nginx-image"
  sources = ["source.amazon-ebs.ubuntu"]

  provisioner "shell" {
    inline = [
      "sudo apt update -y",
      "sudo apt install nginx -y",
      "git clone https://github.com/example/my-app.git /home/ubuntu/app",
      "sudo ufw allow 'Nginx HTTP'",
      "sudo systemctl enable nginx",
      "sudo systemctl start nginx"
    ]
  }
}
```

### Build Commands

Run these commands in your project directory:

```
# Initialize the working directory
packer init .

# Validate the template syntax
packer validate template.pkr.hcl

# Build the image
packer build template.pkr.hcl
```

## How Packer Executes Builds

Packer processes your template in three sequential stages:

| Stage              | Description                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| **Builder**        | Launches a temporary VM or container from the specified base image (e.g., spins up an EC2).     |
| **Provisioner**    | Customizes the instance: installs packages, copies code, configures services, and runs scripts. |
| **Post-Processor** | Packages the instance into a final image (AMI, VHD, Docker image), uploads or tags artifacts.   |

## Next Steps & References

Once you’ve created your custom image, integrate it into your deployment pipelines or use it as the base for auto-scaling groups, Kubernetes clusters, or container workloads.

Links and further reading:

- [Packer Documentation](https://www.packer.io/docs)
- [HashiCorp Configuration Language (HCL)](https://www.packer.io/docs/templates/hcl)
- [AWS AMI Basics](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-packer/module/88bc689f-1e45-49d8-887c-cb44923b3390/lesson/d22515f2-3cb5-4ffb-8903-7075f87f67b0)**
>
> Watch video content
