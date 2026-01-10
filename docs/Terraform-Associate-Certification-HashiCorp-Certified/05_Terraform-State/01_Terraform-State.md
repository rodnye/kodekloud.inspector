# Terraform State - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Terraform-State/Terraform-State)

---

## Table of Contents

- Terraform State
  - Initial Resource Creation
  - Refreshing State with Terraform Plan
  - Tracking Configuration Changes with the State File
  - Managing Resource Dependencies
  - Security and Remote State Management
  - Final Thoughts on Terraform State
  - Summary
  - Watch Video
    - Original Variable Definitions
    - After Modifying the Configuration

---

## Content

Terraform Associate Certification: HashiCorp Certified

Terraform State

# Terraform State

In this lesson, we'll review Terraform state, its purpose, and best practices for managing it. Terraform state is a JSON file that records your infrastructure's current configuration and serves as a single source of truth for Terraform operations like plan and apply.

When you create a resource for the first time by running the Terraform apply command, Terraform generates a state file named terraform.tfstate in the same directory as your configuration files. Additionally, a backup file called terraform.tfstate.backup is created.

## Initial Resource Creation

Consider the following Terraform configuration:

```
# main.tf
resource "aws_instance" "cerberus" {
  ami           = var.ami
  instance_type = var.instance_type
}


# variables.tf
variable "ami" {
  default = "ami-06178cf087598769c"
}


variable "instance_type" {
  default = "m5.large"
}
```

When you run the apply command:

```
$ terraform apply
aws_instance.cerberus: Creating...
aws_instance.cerberus: Still creating... [10s elapsed]
aws_instance.cerberus: Creation complete after 10s [id=i-c791dc46a6639d4a7]
Apply complete! Resources: 1 added, 0 changed, 0 destroyed
```

Terraform generates the state file, which contains all the details about the resources it created. For example, a snippet from the state file may look like this:

```
{
  "version": 4,
  "terraform_version": "0.13.3",
  "serial": 2,
  "lineage": "ccd95cf0-9966-549b-c7d1-1d2683b3119b",
  "outputs": {},
  "resources": [
    {
      "mode": "managed",
      "type": "aws_instance",
      "name": "cerberus",
      "provider": "provider[\"registry.terraform.io/hashicorp/aws\"]",
      "instances": [
        {
          "schema_version": 1,
          "attributes": {
            "ami": "ami-06178cf087598769c",
            "arn": "arn:aws:ec2:eu-west-2:instance/i-1db6bfe81bd1e3ed7",
            "associate_public_ip_address": true,
            "availability_zone": "eu-west-2a",
            "capacity_reservation_specification": [],
            "cpu_core_count": null,
            "cpu_threads_per_core": null,
            "credit_specification": [],
            "disable_api_termination": false,
            "ebs_block_device": []
          }
        }
      ]
    }
  ]
}
```

This state file holds vital information such as resource IDs, provider details, and all resource attributes that Terraform uses to manage your infrastructure.

## Refreshing State with Terraform Plan

Before generating an execution plan, Terraform refreshes the state by comparing it with the actual state of your external resources. For example, the output of the plan command may look like:

```
$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be persisted to local or remote state storage.


aws_instance.cerberus: Refreshing state... [id=i-1db6bfe81bd1e3ed7]


---------------------------------------------------------------------------
No changes. Infrastructure is up-to-date.
```

If no differences are detected between your configuration and the real-world resources, Terraform indicates that no changes are needed. The apply command also performs a state refresh before proceeding with any updates.

In certain cases, you might want to skip refreshing the state. This can be done using the -refresh=false option:

```
$ terraform apply -refresh=false
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
```

> [!important]
> **Warning**
>
> Disabling the state refresh is generally not recommended as it may introduce inconsistencies if resources have been manually modified. Use this option with caution, especially in large environments.

## Tracking Configuration Changes with the State File

Terraform continuously monitors the state file to detect changes between your configurations and your provisioned resources. For example, if you change the instance type from m5.large to t3.micro, Terraform will detect the discrepancy during the next plan or apply.

### Original Variable Definitions

```
variable "ami" {
  default = "ami-06178cf087598769c"
}


variable "instance_type" {
  default = "m5.large"
}
```

And a sample snippet from the terraform.tfstate file:

```
{
  "version": 4,
  "terraform_version": "0.13.3",
  "serial": 1,
  "lineage": "160ca48f-cd6a-bd64-fc1b-0e2e78c2bc10",
  "outputs": {},
  "resources": [
    {
      "mode": "managed",
      "type": "aws_instance",
      "name": "cerberus",
      "provider": "provider[\"registry.terraform.io/hashicorp/aws\"]",
      "instances": [
        {
          "schema_version": 1,
          "attributes": {
            "ami": "ami-06178cf087598769c",
            "arn": "arn:aws:ec2:eu-west-2:instance/i-9d394a982f158e887",
            "instance_state": "running",
            "instance_type": "m5.large"
          }
        }
      ]
    }
  ]
}
```

### After Modifying the Configuration

```
variable "ami" {
  default = "ami-06178cf087598769"
}


variable "instance_type" {
  default = "t3.micro"
}
```

Terraform’s execution plan will mark the resource for recreation due to the change in instance type.

## Managing Resource Dependencies

Terraform also manages inter-resource dependencies using the state file. Consider a configuration where a web instance depends on a DB instance:

```
resource "aws_instance" "db" {
  ami           = var.ami
  instance_type = var.instance_type
}


resource "aws_instance" "web" {
  ami           = var.ami
  instance_type = var.instance_type
  depends_on    = [aws_instance.db]
}
```

The state file captures this dependency explicitly:

```
{
  "mode": "managed",
  "type": "aws_instance",
  "name": "web",
  "provider": "provider[\"registry.terraform.io/hashicorp/aws\"]",
  "instances": [
    {
      "schema_version": 1,
      "attributes": {
        "ami": "ami-06178cf087598769c",
        "arn": "arn:aws:ec2:eu-west-2:instance/i-33b55018bd1a8d8ca",
        ...
      },
      ...
      "dependencies": [
        "aws_instance.db"
      ]
    }
  ]
}
```

During provisioning, Terraform creates the DB instance first, followed by the web instance. Conversely, when destroying resources, Terraform will remove the web instance before deleting the DB instance.

## Security and Remote State Management

> [!important]
> **Note**
>
> The state file contains sensitive information, including configuration variables and resource attributes like SSH keys or initial passwords. Store your state file securely in remote backends (e.g., Amazon S3 or Terraform Cloud) and never commit it to version control systems.

For illustration, here is a snippet showing sensitive data in a state file:

```
{
  "mode": "managed",
  "type": "aws_instance",
  "name": "web",
  "provider": "provider[\"registry.terraform.io/hashicorp/aws\"]",
  "instances": [
    {
      "schema_version": 1,
      "attributes": {
        "ami": "ami-0a634ae95e11c6f91",
        ...
        "primary_network_interface_id": "eni-0ccd57b1597e633e0",
        "private_dns": "ip-172-31-7-21.us-west-2.compute.internal",
        "private_ip": "172.31.7.21",
        "public_dns": "ec2-54-71-34-19.us-west-2.compute.amazonaws.com",
        "public_ip": "54.71.34.19",
        "root_block_device": [
          {
            "delete_on_termination": true,
            "device_name": "/dev/sda1",
            "encrypted": false,
            "iops": 100,
            "kms_key_id": "vol-070720a3636979c22"
          }
        ]
      }
    }
  ]
}
```

The configuration for managing dependencies remains the same:

```
resource "aws_instance" "db" {
  ami           = var.ami
  instance_type = var.instance_type
}


resource "aws_instance" "web" {
  ami           = var.ami
  instance_type = var.instance_type
  depends_on    = [aws_instance.db]
}
```

## Final Thoughts on Terraform State

Terraform state is designed exclusively for internal Terraform operations. It is essential to avoid manually editing the state file and to use Terraform commands to manage state. The information contained in the state file is crucial, and any changes to the configuration are reflected through Terraform's plan and apply process.

For example, here is a state file entry for a development EC2 instance:

```
{
  "mode": "managed",
  "type": "aws_instance",
  "name": "dev-ec2",
  "provider": "provider[\"registry.terraform.io/hashicorp/aws\"]",
  "instances": [
    {
      "schema_version": 1,
      "attributes": {
        "ami": "ami-0a634ae95e11c6f91"
      },
      ...
      "primary_network_interface_id": "eni-0ccd57b1597e633e0",
      "private_dns": "ip-172-31-7-21.us-west-2.compute.internal",
      "private_ip": "172.31.7.21",
      "public_dns": "ec2-54-71-34-19.us-west-2.compute.amazonaws.com",
      "public_ip": "54.71.34.19",
      "root_block_device": [
        {
          "delete_on_termination": true,
          "device_name": "/dev/sda1",
          "encrypted": false,
          "iops": 100,
          ...
        }
      ]
    }
  ]
}
```

Remember, proper management of your Terraform state is key to maintaining the integrity and security of your infrastructure. For more detailed information and advanced state management practices, refer to the [Terraform documentation](https://www.terraform.io/docs).

## Summary

| Topic                      | Description                                                              | Example Command/Resource                          |
| -------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------- |
| Terraform State File       | Tracks infrastructure, resources, and metadata in a JSON format          | terraform.tfstate, terraform.tfstate.backup       |
| Refreshing Terraform State | Ensures state matches external resources before planning and applying    | terraform plan, terraform apply                   |
| Resource Dependencies      | Records dependencies to manage correct resource creation and deletion    | depends\\\_on attribute in resource configuration |
| Secure State Management    | Store state in secure remote backends and avoid version control exposure | Using backends like Amazon S3 or Terraform Cloud  |

By following these best practices, you can ensure that your Terraform operations are secure, reliable, and accurately reflect your intended infrastructure changes.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/4b6ab52b-4fbb-4a33-9dbc-0fb1c6900c7e/lesson/6a7d2a40-816d-4326-88fe-1431bd17082a)**
>
> Watch video content
