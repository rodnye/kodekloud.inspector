# Terraform State Commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Remote-State/Terraform-State-Commands)

---

## Table of Contents

- Terraform State Commands
  - Listing Resources in the State
  - Showing Resource Details
  - Moving Resources in the State
  - Pulling Remote State
  - Removing Resources from the State
  - Watch Video
  - Practice Lab

---

## Content

Terraform Basics Training Course

Remote State

# Terraform State Commands

In this guide, you will learn how to list and manipulate Terraform state files using various Terraform state commands. The state file is stored in JSON format, and it is crucial not to edit it manually. Instead, use the provided commands to safely work with your state.

Terraform state commands follow this basic syntax:

terraform state \[subcommand\] \[options\] \[address\]

Each subcommand—such as list, show, move (mv), pull, or rm—is designed to perform a specific operation on the state file.

---

## Listing Resources in the State

The `list` subcommand displays all resource addresses recorded in the Terraform state file. For example, to list all resources:

```
$ terraform state list
aws_dynamodb_table.cars
aws_s3_bucket.finance-2020922
```

You can also provide an additional argument to filter for a specific resource address. If a match is found, only the matching resource(s) will be returned.

---

## Showing Resource Details

To inspect detailed attributes of a particular resource, use the `show` subcommand. For example, to display all attributes for the S3 bucket resource `finance-2020922`, run:

```
$ terraform state show aws_s3_bucket.finance-2020922
resource "aws_s3_bucket" "terraform-state" {
  acl                         = "private"
  arn                         = "arn:aws:s3:::finance-2020922"
  bucket                      = "finance-2020922"
  bucket_domain_name          = "finance-2020922.s3.amazonaws.com"
  bucket_regional_domain_name = "finance-2020922.s3.us-west-1.amazonaws.com"
  force_destroy               = false
  hosted_zone_id              = "Z2F5ABCDE1ACD"
  id                          = "finance-2020922"
  region                      = "us-west-1"
  request_payer               = "BucketOwner"
  tags = {
    "Description" = "Bucket to store Finance and Payroll Information"
  }
}
versioning {
  enabled    = false
  mfa_delete = false
}
```

---

## Moving Resources in the State

The `move` subcommand (or its alias `mv`) is used to change a resource's address within the state file. This command is particularly useful when you want to rename a resource without recreating it. It requires specifying both a source address and a destination address.

Consider the following example where you have a DynamoDB table defined in your Terraform configuration and state:

```
resource "aws_dynamodb_table" "state-locking" {
  name         = "state-locking"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"


  attribute {
    name = "LockID"
    type = "S"
  }
}
```

And the corresponding state file entry appears as:

```
{
  "resources": [
    {
      "mode": "managed",
      "type": "aws_dynamodb_table",
      "name": "state-locking",
      "provider": "provider[\"registry.terraform.io/hashicorp/aws\"]"
    }
  ]
}
```

To rename the resource from `state-locking` to `state-locking-db` without having to recreate it, execute:

```
$ terraform state mv aws_dynamodb_table.state-locking aws_dynamodb_table.state-locking-db
Move "aws_dynamodb_table.state-locking" to "aws_dynamodb_table.state-locking-db"
Successfully moved 1 object(s).
```

After moving the state, update your configuration file as shown below:

```
resource "aws_dynamodb_table" "state-locking-db" {
  name         = "state-locking-db"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"


  attribute {
    name = "LockID"
    type = "S"
  }
}
```

When you run `terraform apply` afterward, Terraform should detect no changes for the renamed resource:

```
$ terraform apply
aws_dynamodb_table.state-locking-db: Refreshing state... [id=state-locking]
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
```

---

## Pulling Remote State

When using remote state, the state file is not saved locally in your configuration directory. Use the `pull` subcommand to download and print the remote state. For example:

```
$ terraform state pull
{
  "version": 4,
  "terraform_version": "0.13.0",
  "serial": 0,
  "lineage": "b6e2cf0e-ef8d-3c59-1e11-c6520dcd745c",
  "resources": [
    {
      "mode": "managed",
      "type": "aws_dynamodb_table",
      "name": "state-locking-db",
      "provider": "provider[\"registry.terraform.io/hashicorp/aws\"]",
      "instances": [
        {
          "schema_version": 1,
          "attributes": {
            ...
          }
        }
      ]
    }
  ]
}
```

You can pipe the output to JSON query tools like `jq` for further data manipulation. For instance, to filter and display the `hash_key` attribute of the `state-locking-db` table, run:

```
$ terraform state pull | jq '.resources[] | select(.name == "state-locking-db") | .instances[].attributes.hash_key'
```

---

## Removing Resources from the State

The `rm` (or remove) subcommand deletes one or more resources from the Terraform state file. Removing a resource detaches it from Terraform management without destroying the actual infrastructure. For example, to remove the S3 bucket resource from the state, run:

```
$ terraform state rm aws_s3_bucket.finance-2020922
Acquiring state lock. This may take a few moments...
Removed aws_s3_bucket.finance-2020922
Successfully removed 1 resource instance(s).
Releasing state lock. This may take a few moments...
```

> [!important]
> **Important**
>
> After removing a resource from the state, remember to also delete or comment out the corresponding resource block in your Terraform configuration file.

---

That concludes this lesson on Terraform state commands. In the next section, you'll have the opportunity to work on hands-on labs and practice using these commands in real-world scenarios.

For more information about Terraform and managing infrastructure as code, be sure to explore the [Terraform Documentation](https://www.terraform.io/docs).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/9464f9ce-236c-4f22-a61b-5398307b47b4/lesson/d02940a3-5096-4afc-8114-0110e408380c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/9464f9ce-236c-4f22-a61b-5398307b47b4/lesson/63df6255-7f16-4936-9c6f-e294280fb244)**
>
> Practice lab
