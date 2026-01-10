# Data Sources - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/Working-with-OpenTofu/Data-Sources)

---

## Table of Contents

- Data Sources
  - Why Use Data Sources?
  - Referencing an Existing AWS Key Pair
  - Filtering Data Sources by Tags
  - Resources vs. Data Sources
  - Links and References
  - Watch Video

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

Working with OpenTofu

# Data Sources

OpenTofu lets you provision infrastructure and reference attributes between resources using expressions. But what if a resource already exists—created manually, via another tool, or in a different configuration? Data sources solve this by fetching read-only information about existing infrastructure.

## Why Use Data Sources?

- Read attributes of existing resources without managing their lifecycle.
- Integrate with resources created by CloudFormation, Ansible, Terraform, or manually.
- Avoid duplicating state in multiple configurations.

> [!important]
> **Note**
>
> Data sources are _read-only_. They cannot create, update, or destroy resources. For full lifecycle management, use `resource` blocks instead.

## Referencing an Existing AWS Key Pair

Suppose you already have an AWS Key Pair named `alpha`. You can fetch its `key_name` for use in an EC2 instance:

```
data "aws_key_pair" "cerberus_key" {
  key_name = "alpha"
}


resource "aws_instance" "cerberus" {
  ami           = var.ami
  instance_type = var.instance_type
  key_name      = data.aws_key_pair.cerberus_key.key_name
}
```

- `data "aws_key_pair" "cerberus_key"` declares a data source.
- The argument `key_name = "alpha"` locates the existing key pair.
- In the EC2 resource, `data.aws_key_pair.cerberus_key.key_name` provides the fetched value.

![The image shows a section of AWS documentation related to EC2 key pairs, including a search result for "aws_key_pair" and an argument reference detailing optional and required parameters for querying key pairs.](https://kodekloud.com/kk-media/image/upload/v1752882900/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Data-Sources/aws-ec2-key-pairs-documentation.jpg)

> [!important]
> **Note**
>
> Check the AWS Provider Data Sources documentation for all available arguments and attributes: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/key\_pair

## Filtering Data Sources by Tags

When you can’t identify a resource by a single attribute, use filters. For example, locate the key pair tagged with `project = cerberus`:

```
data "aws_key_pair" "cerberus_key" {
  filter {
    name   = "tag:project"
    values = ["cerberus"]
  }
}


resource "aws_instance" "cerberus" {
  ami           = var.ami
  instance_type = var.instance_type
  key_name      = data.aws_key_pair.cerberus_key.key_name
}
```

- The `filter` block matches key pairs with the given tag.
- Multiple filters can be combined to narrow the search.

## Resources vs. Data Sources

| Aspect          | Resource Blocks              | Data Source Blocks            |
| --------------- | ---------------------------- | ----------------------------- |
| Lifecycle       | Create, Read, Update, Delete | Read only                     |
| Keyword         | `resource`                   | `data`                        |
| Terraform State | Managed                      | Not managed                   |
| Use Case        | Provision infrastructure     | Query existing infrastructure |

![The image compares Terraform "Resource" and "Data Source," highlighting their differences in keywords, functionality, and terminology. It shows that resources create, update, and destroy infrastructure, while data sources only read infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752882901/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Data-Sources/terraform-resource-data-source-comparison.jpg)

## Links and References

- [OpenTofu Documentation](https://opentofu.io/)
- [Terraform AWS Provider Data Sources](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/)
- [AWS CloudFormation](https://docs.aws.amazon.com/cloudformation/)
- [Ansible](https://www.ansible.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/69432d48-55d0-4340-a56d-9f9a7819d26c/lesson/5036c5cd-aa89-4255-8417-70d9b4c7b505)**
>
> Watch video content
