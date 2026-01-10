# Demo AWS EC2 and Provisioners - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Provisioners/Demo-AWS-EC2-and-Provisioners)

---

## Table of Contents

- Demo AWS EC2 and Provisioners
  - Prerequisites
  - 1. Provision a Simple EC2 Instance
  - 2. Create an SSH Key Pair
  - 3. Attach the Key to the EC2 Instance
  - 4. Install Nginx via User Data
  - 5. Provisioners and Connection Blocks
  - 6. Retrieve the Public IPv4 Address
  - 7. Reserve and Associate an Elastic IP
  - 8. Understanding Dependency Direction
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Provisioners

# Demo AWS EC2 and Provisioners

Welcome to this hands-on tutorial on provisioning an AWS EC2 instance using OpenTofu (a community-driven fork of Terraform). You’ll learn how to:

- Create and configure an EC2 instance
- Manage SSH keys
- Apply user data scripts
- Use provisioners for automation
- Allocate and associate an Elastic IP
- Understand Terraform’s dependency graph

This guide assumes you have AWS credentials configured and the OpenTofu CLI installed.

## Prerequisites

- OpenTofu CLI installed (`tofu version`)
- AWS CLI configured (`aws configure`)
- An SSH key pair (we’ll generate one in step 2)

---

## 1\. Provision a Simple EC2 Instance

1.  Change to your project directory and open `main.tf`:

    ```
    cd /root/OpenTofu/projects/project-cerberus/
    touch main.tf
    ```

2.  Define the EC2 resource and variables:

    ```
    resource "aws_instance" "cerberus" {
      ami           = var.ami
      instance_type = var.instance_type
    }


    variable "ami" {
      default = "ami-06178c7f087598769c"
    }


    variable "region" {
      default = "eu-west-2"
    }


    variable "instance_type" {
      default = "m5.large"
    }
    ```

3.  Initialize and apply:

    ```
    tofu init
    tofu apply
    ```

    Example output:

    ```
    Plan: 1 to add, 0 to change, 0 to destroy.
    aws_instance.cerberus: Creating...
    aws_instance.cerberus: Creation complete after 12s [id=i-3f85199c9711d152f]
    Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
    ```

Inspect your instance attributes:

```
tofu show
```

---

## 2\. Create an SSH Key Pair

Generate an SSH key pair on your local machine:

```
ssh-keygen -t rsa -b 4096 -f ~/.ssh/cerberus -N ""
```

Then add this to `main.tf`:

```
resource "aws_key_pair" "cerberus_key" {
  key_name   = "cerberus"
  public_key = file("~/.ssh/cerberus.pub")
}
```

Apply the change:

```
tofu init
tofu apply
```

You should see:

```
aws_key_pair.cerberus_key: Creating...
aws_key_pair.cerberus_key: Creation complete after 0s [id=cerberus]
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

---

## 3\. Attach the Key to the EC2 Instance

Update the `aws_instance` block to reference the key:

```
resource "aws_instance" "cerberus" {
  ami           = var.ami
  instance_type = var.instance_type
  key_name      = "cerberus"
}
```

Re-apply:

```
tofu apply
```

```
aws_instance.cerberus: Modifying... [id=i-3f85199c9711d152f]
aws_instance.cerberus: Destruction complete after 10s
aws_instance.cerberus: Creation complete after 11s [id=i-2386285c5705afa5071]
Apply complete! Resources: 1 added, 0 changed, 1 destroyed.
```

---

## 4\. Install Nginx via User Data

Provision your instance to install Nginx at launch:

1.  Create `install-nginx.sh`:

    ```
    #!/bin/bash
    apt-get update
    apt-get install -y nginx
    ```

2.  Reference it in your EC2 resource:

    ```
    resource "aws_instance" "cerberus" {
      ami           = var.ami
      instance_type = var.instance_type
      key_name      = "cerberus"
      user_data     = file("./install-nginx.sh")
    }
    ```

> [!important]
> **Note**
>
> User data scripts run only on the first instance launch. Future `tofu apply` runs will not re-execute `user_data`.

Attempt to apply:

```
tofu apply
```

You’ll see no changes if the instance already exists.

---

## 5\. Provisioners and Connection Blocks

Terraform supports three built-in provisioners. Only **local-exec** does **not** require a `connection` block.

| Provisioner | Connection Required? | Use Case                                       |
| ----------- | -------------------- | ---------------------------------------------- |
| local-exec  | No                   | Run commands on the machine executing OpenTofu |
| remote-exec | Yes                  | Execute SSH/WinRM commands on the remote host  |
| file        | Yes                  | Upload/download files to/from the resource     |

Remember: provisioners must be nested inside the resource block they target.

---

## 6\. Retrieve the Public IPv4 Address

After creating your EC2 instance, run:

```
tofu show aws_instance.cerberus
```

Look for the `public_ip` attribute (for example, `54.214.169.15`).

---

## 7\. Reserve and Associate an Elastic IP

An Elastic IP (EIP) is a static public IPv4 address. Add this resource:

```
resource "aws_eip" "eip" {
  vpc      = true
  instance = aws_instance.cerberus.id
}
```

To save the public DNS to a file, use a `local-exec` provisioner:

```
resource "aws_eip" "eip" {
  vpc      = true
  instance = aws_instance.cerberus.id


  provisioner "local-exec" {
    command = <<EOT
echo "${self.public_dns}" > /root/serverless_publicDNS.txt
EOT
  }
}
```

> [!important]
> **Note**
>
> This block allocates and associates an Elastic IP, then writes the instance’s public DNS to `/root/serverless_publicDNS.txt`.

![The image shows a split-screen view with a task description on the left about creating an Elastic IP in Terraform, and a code editor on the right displaying a Terraform configuration file with AWS resources.](https://kodekloud.com/kk-media/image/upload/v1752882882/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-AWS-EC2-and-Provisioners/elastic-ip-terraform-configuration-editor.jpg)

Apply your changes:

```
tofu apply
```

Inspect the EIP:

```
tofu show aws_eip.eip
```

Note the `public_ip` (e.g., `52.47.169.195`).

---

## 8\. Understanding Dependency Direction

Because `aws_eip.eip` references `aws_instance.cerberus.id`, Terraform automatically creates the EC2 instance before allocating the EIP. There’s no reverse dependency.

> [!important]
> **Note**
>
> Terraform’s graph engine infers resource creation order by scanning references. No explicit `depends_on` is needed here.

![The image shows a split screen with a multiple-choice question on the left and a code editor on the right displaying Terraform configuration files. The terminal at the bottom shows the output of a Terraform apply command.](https://kodekloud.com/kk-media/image/upload/v1752882884/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-AWS-EC2-and-Provisioners/terraform-multiple-choice-code-editor.jpg)

---

That completes this lab. Thank you for following along!

## Links and References

- [OpenTofu CLI Repository](https://github.com/opentofu/opentofu)
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/index.html)
- [Terraform Provisioners](https://www.terraform.io/docs/language/resources/provisioners/syntax.html)
- [SSH Key Management](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/98011198-b847-4ee1-a7bd-7593bfe5576c/lesson/f86348a1-e5b4-41e1-9265-34c3fa2dc375)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/98011198-b847-4ee1-a7bd-7593bfe5576c/lesson/67b0b9cc-3146-41a2-8b4f-7a0762841f04)**
>
> Practice lab
