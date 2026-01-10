# What is Remote State and State Locking - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Remote-State/What-is-Remote-State-and-State-Locking)

---

## Table of Contents

- What is Remote State and State Locking
  - Benefits of the Terraform State
  - Challenges with Local State Files
  - How Terraform State Locking Works
  - Remote Backends: A Secure Alternative
  - Watch Video

---

## Content

Terraform Basics Training Course

Remote State

# What is Remote State and State Locking

In this lesson, we introduce the concept of remote state in Terraform and explain why state locking is essential for effective team collaboration.

Terraform uses a state file to map your configuration resources to your real-world infrastructure. Initially, this state file was stored locally. When you first run `terraform apply`, a file named `terraform.tfstate` is created in your configuration directory.

![The image illustrates a comparison between real-world infrastructure and a Terraform state file, showing icons for a server, dog, and document linked to their representations.](https://kodekloud.com/kk-media/image/upload/v1752884186/notes-assets/images/Terraform-Basics-Training-Course-What-is-Remote-State-and-State-Locking/frame_10.jpg)

## Benefits of the Terraform State

Storing state locally provides several benefits:

- Mapping Terraform configurations to real infrastructure.
- Tracking metadata and resource dependencies, enabling Terraform to create and delete resources in the correct order.
- Enhancing performance when managing large configurations across multiple cloud providers.
- Facilitating team collaboration by offering a single view of the infrastructure state.

For example, your configuration directory might look like this:

```
$ ls
main.tf  variables.tf  terraform.tfstate
```

> [!important]
> **Note**
>
> For individual projects, a local state file might suffice. However, as your team grows and your infrastructure becomes more complex, managing state locally can lead to significant challenges.

## Challenges with Local State Files

In early configurations, the state file was created and maintained on a developer’s machine. Although this approach works for smaller projects, it poses several risks:

- Sensitive data (e.g., IP addresses, initial database passwords, key names) remains on a local machine.
- Concurrent modifications become difficult to manage, leading to potential state corruption.
- Storing the state file in version control is not recommended because it may expose sensitive information.

Consider this Terraform configuration that creates files and a pet resource:

```
resource "local_file" "pet" {
  filename = "/root/pet.txt"
  content  = "My favorite pet is Mr.Whiskers!"
}


resource "random_pet" "my-pet" {
  length = 1
}


resource "local_file" "cat" {
  filename = "/root/cat.txt"
  content  = "I like cats too!"
}
```

And here is an excerpt from the corresponding state file in JSON format:

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
        "ami": "ami-0a634ae95e11c6f91",
        ...
        "primary_network_interface_id": "eni-0ccd57b1597e633e0",
        "private_dns": "ip-172-31-7-21.us-west-2.compute.internal",
        "private_ip": "172.31.7.21",
        "public_dns": "ec2-54-71-34-19.us-west-2.compute.amazonaws.com",
        "public_ip": "34.71.34.19",
        "root_block_device": [
          {
            "delete_on_termination": true,
            "device_name": "/dev/sda1",
            "encrypted": false,
            "iops": 100,
            "kms_key_id": "",
            "volume_id": "vol-070720a363679c22",
            "volume_type": "gp2"
          }
        ]
      }
    }
  ]
}
```

Imagine a scenario where a developer named Abdul creates a Terraform configuration for provisioning an S3 bucket. After running `terraform plan` and applying the configuration, Terraform generates a local state file (`terraform.tfstate`). Abdul then commits all configuration files, including the state file, into a Git repository. Later, when another developer, Lee, pulls the repository, he makes his modifications, reviews the plan, applies the changes, and pushes the updated configuration and state file back to the Git repository.

![The image illustrates a workflow where two users, Abdul and Lee, use Terraform and GitHub to manage infrastructure, storing state files in an S3 bucket.](https://kodekloud.com/kk-media/image/upload/v1752884187/notes-assets/images/Terraform-Basics-Training-Course-What-is-Remote-State-and-State-Locking/frame_190.jpg)

This process, while seemingly functional, introduces significant risks:

- Sensitive infrastructure details (such as IP addresses and key names) are stored within a Git repository.
- Concurrent updates using local state files can lead to conflicts or even state corruption.

## How Terraform State Locking Works

Terraform incorporates a mechanism called state locking to prevent simultaneous modifications. When you run commands like `terraform apply`, Terraform locks the state file to avoid interference from another operation. Consider the following execution process:

```
$ terraform apply
...
+ server_side_encryption = (known after apply)
+ storage_class          = (known after apply)
+ version_id             = (known after apply)
...
Plan: 2 to add, 0 to change, 0 to destroy.


Do you want to perform these actions?
Terraform will perform the actions described above.
Only 'yes' will be accepted to approve.


Enter a value: yes


aws_s3_bucket_object.finance-2020: Creating...
aws_s3_bucket.finance: Creating...
[10s elapsed]
aws_s3_bucket_object.finance-2020: Still creating...
aws_s3_bucket.finance: Still creating... [10s elapsed]
aws_s3_bucket_object.finance-2020: Still creating... [20s elapsed]
aws_s3_bucket.finance: Still creating...
```

If another operation is attempted during this process in a separate terminal, Terraform will return an error similar to:

```
$ terraform apply
Error: Error locking state: Error acquiring the state lock: resource temporarily unavailable
Lock Info:
  ID:        fefe3806-007c-084b-be61-cef4cdc77dee
  Path:      terraform.tfstate
  Operation: OperationTypeApply
  Who:       root@iac-server
  Version:   0.13.3
  Created:   2020-09-22 20:35:27.051330492 +0000 UTC
Info:


Terraform acquires a state lock to protect the state from being written by multiple users at the same time. Please resolve the issue above and try again. For most commands, you can disable locking with the "-lock=false" flag, but this is not recommended.
```

![The image illustrates Terraform state locking, showing two operations accessing a local Terraform state, with one operation blocked to prevent simultaneous changes to infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752884188/notes-assets/images/Terraform-Basics-Training-Course-What-is-Remote-State-and-State-Locking/frame_280.jpg)

> [!important]
> **Warning**
>
> Avoid disabling state locking with the "-lock=false" flag in a team environment, as doing so can lead to concurrent modifications and potential data loss.

## Remote Backends: A Secure Alternative

Version control systems like GitHub do not support state locking. If multiple users access and modify a state file stored in version control simultaneously, it can result in conflicts and even data loss. Additionally, working with outdated state files (by not pulling the latest changes) can lead to accidental destructive actions, such as unintended resource rollbacks or deletions.

A far better approach is to store the Terraform state in a secured, shared storage solution using remote backends. Remote backends store the state file outside the configuration directory and version control system using services such as AWS S3, Google Cloud Storage, HashiCorp Consul, or Terraform Cloud. With a remote backend, Terraform automatically:

- Loads the state from shared storage for every operation.
- Uploads state updates after each `terraform apply`.
- Provides state locking to maintain state integrity.
- Enhances security by offering features like encryption at rest and in transit.

![The image illustrates Terraform state locking with remote backends like AWS S3, Google Cloud Storage, HashiCorp Consul, and Terraform Cloud, supporting automatic state file management.](https://kodekloud.com/kk-media/image/upload/v1752884189/notes-assets/images/Terraform-Basics-Training-Course-What-is-Remote-State-and-State-Locking/frame_360.jpg)

Using remote backends ensures that your Terraform state is managed centrally and securely, supporting team collaboration and reducing the risks associated with local state management.

For additional details on configuring remote backends in Terraform, refer to the [Terraform documentation](https://www.terraform.io/docs/backends/index.html).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/9464f9ce-236c-4f22-a61b-5398307b47b4/lesson/d3b1b09d-75a3-4641-a4a0-9a4ec6b5b705)**
>
> Watch video content
