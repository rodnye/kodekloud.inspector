# Basic Terraform Commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Use-the-Terraform-CLI/Basic-Terraform-Commands)

---

## Table of Contents

- Basic Terraform Commands
  - Terraform Validate
  - Terraform fmt
  - Terraform Show
  - Terraform Providers
  - Terraform Output
  - Terraform Refresh
  - Terraform Graph
  - Terraform State Commands
  - Watch Video
    - List Resources
    - Show Resource Details
    - Move Resources
    - Pulling Remote State
    - Removing Resources from State
    - Pushing State Changes

---

## Content

Terraform Associate Certification: HashiCorp Certified

Use the Terraform CLI

# Basic Terraform Commands

In this lesson, we will revisit some of the most commonly used Terraform commands. These commands help ensure your configurations are valid, well-formatted, and in sync with your real-world infrastructure. Read on to learn how to validate, format, view the state, and manage resources with Terraform.

## Terraform Validate

The `terraform validate` command checks whether your configuration syntax is correct and internally consistent. When your configuration is valid, you'll receive a successful validation message. For example, a valid configuration like the one below:

```
resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}
```

Running the command produces:

```
$ terraform validate
Success! The configuration is valid.
```

If an error exists in your configuration file, Terraform pinpoints the problematic line and offers suggestions for a fix. For instance, using an unsupported argument such as `file_permissions` instead of the correct `file_permission` generates an error message:

```
resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}
```

```
$ terraform validate
Error: Unsupported argument


  on main.tf line 4, in resource "local_file" "pet":
  4:  file_permissions = "0777"


An argument named "file_permissions" is not expected here. Did you mean "file_permission"?
```

> [!important]
> **Note**
>
> Always review the error messages carefully—Terraform’s hints help you quickly identify and fix configuration mistakes.

## Terraform fmt

The `terraform fmt` command scans all configuration files in the current directory and reformats them into a canonical format. This improves readability and consistency across your files. When you run this command, any files that are modified will be displayed in the output.

## Terraform Show

The `terraform show` command displays the current state of your managed infrastructure. This includes a detailed view of resources and their attributes. To facilitate further processing, you can append the `--json` flag, which outputs the state in JSON format for easier integration with other tools.

## Terraform Providers

The `terraform providers` command lists all providers declared in your configuration. For example, if your configuration uses only AWS resources, the command produces an output similar to:

```
resource "aws_instance" "db" {
  ami           = var.ami
  instance_type = var.instance_type
}
```

```
$ terraform providers
Providers required by configuration:
└── provider[registry.terraform.io/hashicorp/aws]


Providers required by state:
provider[registry.terraform.io/hashicorp/aws]
```

## Terraform Output

The `terraform output` command retrieves the output variables defined in your configuration. You can display either all outputs or a specific one by providing the output name. Consider the example below:

```
resource "local_file" "pet" {
  filename        = "/root/pets.txt"
  content         = "We love pets!"
  file_permission = "0777"
}


resource "random_pet" "cat" {
  length    = 2
  separator = "-"
}


output "content" {
  value       = local_file.pet.content
  sensitive   = false
  description = "Print the content of the file"
}


output "pet-name" {
  value       = random_pet.cat.id
  sensitive   = false
  description = "Print the name of the pet"
}
```

When you run:

```
$ terraform output
content  = We love pets!
pet-name = huge-owl
```

You can also specify an output by appending its name to the command.

## Terraform Refresh

Terraform automatically refreshes the state during commands like `terraform plan` and `terraform apply` to capture any real-world changes. The `terraform refresh` command explicitly syncs the state file with the actual infrastructure. For example, if a resource has been manually updated, refreshing the state will capture the latest changes:

```
resource "local_file" "pet" {
  filename        = "/root/pets.txt"
  content         = "We love pets!"
  file_permission = "0777"
}


resource "random_pet" "cat" {
  length    = 2
  separator = "-"
}
```

```
$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.


random_pet.cat: Refreshing state... [id-huge-owl]
local_file.pet: Refreshing state... [id=cba595b7d9f94ba1107a46f3f731912d95fb3d2c]
--------------------------------------------------------------------------
No changes. Infrastructure is up-to-date.


$ terraform apply -refresh-only
random_pet.cat: Refreshing state... [id-huge-owl]
local_file.pet: Refreshing state... [id=cba595b7d9f94ba1107a46f3f731912d95fb3d2c]
```

This command updates the state file without altering your actual infrastructure, helping you determine the next steps for your deployment.

## Terraform Graph

The `terraform graph` command generates a visual representation of resource dependencies in your configuration or execution plan. The output is produced in DOT format and can be visualized with Graphviz. For users who prefer a visual perspective, this helps in understanding complex dependency relationships within your infrastructure.

```
$ terraform graph
digraph {
  compound = "true"
  newrank = "true"
  subgraph "root" {
    "[root] aws_instance.cerberus (expand)" [label = "aws_instance.cerberus", shape = "box"]
    "[root] provider[\"registry.terraform.io/hashicorp/aws\"]" [label = "provider[\"registry.terraform.io/hashicorp/aws\"]", shape = "diamond"]
    "[root] var.ami" [label = "var.ami", shape = "note"]
    "[root] var.instance_type" [label = "var.instance_type", shape = "note"]
    "[root] var.region" [label = "var.region", shape = "note"]
    "[root] aws_instance.cerberus (expand)" -> "[root] provider[\"registry.terraform.io/hashicorp/aws\"]"
    "[root] aws_instance.cerberus (expand)" -> "[root] var.ami"
    "[root] aws_instance.cerberus (expand)" -> "[root] var.instance_type"
    "[root] meta.count-boundary (EachMode fixup)" -> "[root] aws_instance.cerberus (expand)"
    "[root] provider[\"registry.terraform.io/hashicorp/aws\"]" -> "[root] var.region"
    "[root] root" -> "[root] meta.count-boundary (EachMode fixup)"
    "[root] root" -> "[root] provider[\"registry.terraform.io/hashicorp/aws\"]"
  }
}
```

You can generate and inspect the DOT output with Graphviz to gain a deeper understanding of your infrastructure's architecture.

## Terraform State Commands

Terraform includes several commands to manage the state file—allowing you to list, view, move, pull, and remove state entries. It is important to use these commands instead of manually modifying the state file.

### List Resources

Use the `terraform state list` command to display all resources recorded in the state file. The output lists resource addresses in the format _resource_type.resource_name_. For example:

```
$ terraform state list
aws_dynamodb_table.cars
aws_s3_bucket.finance-202922
```

You can also filter resources by specifying a pattern:

```
$ terraform state list aws_s3_bucket.cerberus-finance
aws_s3_bucket.cerberus-finance
```

### Show Resource Details

The `terraform state show` command displays attributes of a single resource from the state file. For example, to see details of an S3 bucket:

```
$ terraform state show aws_s3_bucket.cerberus-finance
resource "aws_s3_bucket" "terraform-state" {
  acl                         = "private"
  arn                         = "arn:aws:s3:::cerberus-finance"
  bucket                      = "cerberus-finance"
  bucket_domain_name          = "cerberus-finance.s3.amazonaws.com"
  bucket_regional_domain_name = "cerberus-finance.s3.us-west-1.amazonaws.com"
  force_destroy               = false
  hosted_zone_id              = "Z2F5ABCDE1ACD"
  id                          = "cerberus-finance"
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

### Move Resources

The `terraform state mv` command is used to rename or move a resource within the state file. This does not automatically update your configuration files, so you must adjust them manually.

For example, suppose you have the following configuration for a DynamoDB table:

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

And your state file includes:

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

To rename this resource from `state-locking` to `state-locking-db`, execute:

```
$ terraform state mv aws_dynamodb_table.state-locking aws_dynamodb_table.state-locking-db
```

After moving the resource in the state, update your configuration file accordingly:

```
resource "aws_dynamodb_table" "state-locking-db" {
  name         = "state-locking"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }
}
```

A subsequent `terraform apply` will confirm that no changes are pending:

```
$ terraform apply
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
```

### Pulling Remote State

If you are using remote state, you may need to download the state file locally. The `terraform state pull` command retrieves the remote state, which can be processed with tools like `jq` for JSON querying:

```
$ ls
main.tf  provider.tf
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

You can query specific details using `jq`:

```
$ terraform state pull | jq '.resources[] | select(.name == "state-locking-db") | .instances[].attributes.hash_key'
"LockID"
```

### Removing Resources from State

The `terraform state rm` command allows you to remove one or more resources from the state file. This is useful when you no longer want Terraform to manage a resource. Remember, removing a resource from the state does not delete the actual infrastructure.

```
$ terraform state rm aws_s3_bucket.finance-2020922
Acquiring state lock. This may take a few moments...
Removed aws_s3_bucket.finance-2020922
Successfully removed 1 resource instance(s).
Releasing state lock. This may take a few moments...
```

After removal, ensure you also delete the corresponding resource block from your configuration files.

### Pushing State Changes

The `terraform state push` command updates the remote state by pushing your local state file. Use this command with extreme caution, as it can disrupt your configuration if misused. If the local state differs significantly from the remote state, you may encounter an error message like this:

```
$ terraform state push ./terraform.tfstate
$ terraform state push ./randomstate/terraform.tfstate
Failed to write state: cannot import state with lineage "1dc19ee8-2b7f-d87a-4786-4be724b24988" over unrelated state with lineage "6d167ba6-5171-a624-6bad-2e6bfec62c28"
```

Although the `--force` option exists, it is recommended only as a last resort.

---

That concludes our lesson on basic Terraform commands. By understanding these commands, you will be better equipped to validate your configurations, maintain a clean state, and manage your infrastructure efficiently.

For additional resources and more detailed explanations, consider visiting the following links:

- [Terraform Documentation](https://www.terraform.io/docs)
- [Terraform State Management](https://www.terraform.io/docs/state)
- [Terraform Commands](https://www.terraform.io/docs/cli/commands-index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/ed4291fc-57a9-43d3-abff-eb82bba4a679/lesson/8d5ee4a6-584a-4300-8d76-ea654f8f2a04)**
>
> Watch video content
