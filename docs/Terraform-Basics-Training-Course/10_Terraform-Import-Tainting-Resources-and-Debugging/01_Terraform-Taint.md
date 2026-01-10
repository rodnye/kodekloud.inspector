# Terraform Taint - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-Import-Tainting-Resources-and-Debugging/Terraform-Taint)

---

## Table of Contents

- Terraform Taint
  - Overview
  - Scenario: Tainted Resource due to Provisioner Failure
  - Forcing a Resource Rebuild
  - Reversing Taint: Using the Untaint Command
  - Summary Table
  - Watch Video
    - Resource Definition Example
    - Applying the Configuration
    - Verifying the Tainted Resource
    - Tainting the Resource
    - Confirming the Change with Terraform Plan

---

## Content

Terraform Basics Training Course

Terraform Import Tainting Resources and Debugging

# Terraform Taint

In this article, we explain how to use Terraform’s taint and untaint commands to manage resource recreation effectively. These commands are especially useful when a resource fails during creation or when manual changes occur that necessitate a fresh deployment.

## Overview

Terraform marks a resource as tainted when it encounters errors during creation, such as a failed provisioner command. A tainted resource is scheduled for replacement during the next apply. Conversely, you can use the untaint command to clear this status and prevent a replacement.

> [!important]
> **Tip**
>
> Using taint and untaint commands allows for efficient control of resource lifecycle without a complete destroy and reapply cycle.

## Scenario: Tainted Resource due to Provisioner Failure

Consider a scenario where an AWS EC2 instance is provisioned using a local provisioner to store its public IP address in a file. If the provisioner command fails—perhaps because the file path is incorrect—the resource is marked as tainted, triggering its replacement on the next apply.

### Resource Definition Example

```
resource "aws_instance" "webserver-3" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"
  key_name      = "ws"

  provisioner "local-exec" {
    command = "echo ${aws_instance.webserver-3.public_ip} > /temp/pub_ip.txt"
  }
}
```

### Applying the Configuration

When executing the apply command, you might see output indicating that the provisioner has failed:

```
$ terraform apply
Plan: 1 to add, 0 to change, 0 to destroy.

aws_instance.webserver: Creating...
aws_instance.webserver: Still creating... [10s elapsed]
aws_instance.webserver: Still creating... [20s elapsed]
aws_instance.webserver: Still creating... [30s elapsed]
aws_instance.webserver: Provisioning with 'local-exec'...
aws_instance.webserver (local-exec): Executing: ["cmd" "/C" "echo 35.183.14.192 > /temp/pub_ip.txt"]
aws_instance.webserver (local-exec): The system cannot find the path specified.

Error: Error running command 'echo 35.183.14.192 > /temp/pub_ip.txt': exit status 1. Output: The system
```

At this point, Terraform marks the "webserver" resource as tainted.

### Verifying the Tainted Resource

Running the terraform plan command confirms that the tainted resource is scheduled for replacement:

```
$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.

aws_instance.webserver: Refreshing state... [id=i-0dba2d5dc22a9a904]
------------------------------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
-/+ destroy and then create replacement

Terraform will perform the following actions:

# aws_instance.webserver is tainted, so must be replaced
-/+ resource "aws_instance" "webserver-3" {
```

> [!important]
> **Warning**
>
> Double-check your resource configuration and provisioner commands to avoid unintentional resource replacement.

## Forcing a Resource Rebuild

There are situations where you might want to deliberately force a resource rebuild. For example, if manual changes—such as updating the Nginx version—were made on an AWS instance, you can efficiently trigger the recreation of that resource without performing a full destroy and apply cycle.

### Tainting the Resource

Run the following command to mark the resource as tainted:

```
$ terraform taint aws_instance.webserver
Resource instance aws_instance.webserver has been marked as tainted.
```

### Confirming the Change with Terraform Plan

After tainting, a terraform plan will show that the resource is scheduled for replacement:

```
$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be persisted to local or remote state storage.

aws_instance.webserver: Refreshing state... [id=i-0fd3946f5b3ab8af8]
--------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
    -/+ destroy and then create replacement

Terraform will perform the following actions:

  # aws_instance.webserver is tainted, so must be replaced
  -/+ resource "aws_instance" "webserver" {
```

## Reversing Taint: Using the Untaint Command

If you later decide that a resource should not be replaced, you can remove its tainted state by using the untaint command. This prevents Terraform from destroying and recreating the resource during the next apply.

```
$ terraform untaint aws_instance.webserver
Resource instance aws_instance.webserver has been successfully untainted.
```

## Summary Table

| Command           | Action                           | Description                                           |
| ----------------- | -------------------------------- | ----------------------------------------------------- |
| terraform taint   | Mark resource as tainted         | Forces the resource to be replaced on the next apply  |
| terraform untaint | Remove taint from resource       | Prevents resource replacement during the next apply   |
| terraform plan    | Verify resource replacement plan | Confirms which resources are marked for replacement   |
| terraform apply   | Apply configuration changes      | Executes resource creation and replacement operations |

By leveraging the taint and untaint commands, you can manage resource lifecycle events efficiently, ensuring that your infrastructure remains consistent with your desired state.

For further details, explore the [Terraform Documentation](https://www.terraform.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/29825b4d-c0d3-4732-a4e0-ec3a2988e2a3/lesson/bec58f8f-0c05-40f4-baaa-c19827185899)**
>
> Watch video content
