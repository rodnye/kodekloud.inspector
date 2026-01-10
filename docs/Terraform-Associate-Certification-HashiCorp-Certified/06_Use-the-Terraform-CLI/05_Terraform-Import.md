# Terraform Import - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Use-the-Terraform-CLI/Terraform-Import)

---

## Table of Contents

- Terraform Import
  - Prerequisites
  - Step 1: Define an Empty Resource Block
  - Step 2: Import the Resource
  - Step 3: Update the Resource Block with Configuration
  - Step 4: Verify the Configuration
  - Watch Video

---

## Content

Terraform Associate Certification: HashiCorp Certified

Use the Terraform CLI

# Terraform Import

In this guide, you'll learn how to import your pre-existing AWS resources into Terraform. This process is essential when some resources—such as an EC2 instance—have been created using other tools or methods and you want to manage them with Terraform. For more context on alternative provisioning tools, refer to the [Ansible Advanced Course](https://learn.kodekloud.com/user/courses/ansible-advanced-course).

## Prerequisites

Before you begin, ensure you have the following:

- A unique identifier for the resource you wish to import (for example, the EC2 instance ID).
- The resource’s current configuration information from AWS.

> [!important]
> **Important**
>
> Remember that the Terraform Import command updates only the state file. You must manually update your configuration files to reflect the imported resources.

## Step 1: Define an Empty Resource Block

Start by creating an empty resource block in your Terraform configuration file. In this example, we define a resource named "webserver-2". You can choose any unique name that suits your configuration and state.

```
resource "aws_instance" "webserver-2" {
  # (resource arguments)
}
```

## Step 2: Import the Resource

With your resource block in place, execute the Terraform Import command from your terminal. The syntax is as follows:

terraform import \[resource address\] \[unique resource attribute\]

For an EC2 instance, the resource address is "aws_instance.webserver-2" and the unique resource attribute is the instance ID. Run the command as shown below:

```
$ terraform import aws_instance.webserver-2 i-026e13be10d5326f7
aws_instance.webserver-2: Importing from ID "i-026e13be10d5326f7"...
aws_instance.webserver-2: Import prepared!
Prepared aws_instance for import
aws_instance.webserver-2: Refreshing state... [id=i-026e13be10d5326f7]


Import successful!


The resource has been imported into your Terraform state and is now managed by Terraform.
```

## Step 3: Update the Resource Block with Configuration

After a successful import, inspect either the AWS management console or the Terraform state file to capture key resource attributes needed for the configuration. An example snippet from the state file might look like this:

```
{
  "mode": "managed",
  "type": "aws_instance",
  "name": "webserver-2",
  "provider": "provider[\"registry.terraform.io/hashicorp/aws\"]",
  "instances": [
    {
      "schema_version": 1,
      "attributes": {
        "ami": "ami-0edab43b6fa892279",
        "instance_state": "running",
        "instance_type": "t2.micro",
        "key_name": "ws",
        "tags": {
          "Name": "old-ec2"
        },
        "vpc_security_group_ids": [
          "sg-8064fdee"
        ]
      }
    }
  ]
}
```

Using these details, update your resource block configuration as shown below:

```
resource "aws_instance" "webserver-2" {
  ami                    = "ami-0edab43b6fa892279"
  instance_type          = "t2.micro"
  key_name               = "ws"
  vpc_security_group_ids = ["sg-8064fdee"]
}
```

## Step 4: Verify the Configuration

To validate that Terraform correctly recognizes the imported resource, run the Terraform plan. This operation compares your configuration with the current state and should report no changes if everything is in sync.

```
$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be persisted to local or remote state storage.


aws_instance.webserver-2: Refreshing state... [id=i-0d7c008069819ff8]
-------------------------------------------------------------------------------


No changes. Infrastructure is up-to-date.
```

The message "No changes. Infrastructure is up-to-date." confirms that your EC2 instance is now fully managed by Terraform with no discrepancies.

> [!important]
> **Next Steps**
>
> Now that your EC2 instance is under Terraform management, proceed with the usual Terraform workflow for future modifications. Always update your configuration file and run `terraform plan` followed by `terraform apply` to implement changes.

By following these steps, you effectively bring your external AWS resources under the management of Terraform, streamlining your infrastructure as code practices. Happy provisioning, and see you in the next guide!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/ed4291fc-57a9-43d3-abff-eb82bba4a679/lesson/50a657ce-0ad2-4469-8eeb-2651633c2a25)**
>
> Watch video content
