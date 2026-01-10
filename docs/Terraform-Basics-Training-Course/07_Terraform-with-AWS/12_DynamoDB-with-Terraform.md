# DynamoDB with Terraform - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-with-AWS/DynamoDB-with-Terraform)

---

## Table of Contents

- DynamoDB with Terraform
  - Creating the DynamoDB Table
  - Inserting Items into the Table
  - Hands-On Lab
  - Watch Video
  - Practice Lab

---

## Content

Terraform Basics Training Course

Terraform with AWS

# DynamoDB with Terraform

In this guide, you will learn how to create and manage DynamoDB tables using Terraform. We will walk through creating a DynamoDB table that stores vehicle information and then inserting data into that table. By following these steps, you'll gain practical experience with the Terraform AWS provider for DynamoDB.

## Creating the DynamoDB Table

To begin, we create a DynamoDB table using the AWS DynamoDB table resource in Terraform. In this example, we create a table named "cars" that holds data about vehicles. The table requires a name and a hash key that serves as the primary key—in our case, the vehicle identification number (VIN). Additionally, an attribute block is specified to detail the attribute (VIN) and the billing mode is set to on-demand (PAY_PER_REQUEST).

Below is the Terraform configuration for creating the "cars" DynamoDB table with on-demand billing:

```
resource "aws_dynamodb_table" "cars" {
  name         = "cars"
  hash_key     = "VIN"
  billing_mode = "PAY_PER_REQUEST"
  attribute {
    name = "VIN"
    type = "S"
  }
}
```

When using provisioned capacity (the default mode), you would need to declare the read and write capacity units. However, this example uses PAY_PER_REQUEST (on-demand mode).

After saving your configuration, run the Terraform plan and apply commands to create the table:

```
$ terraform apply
```

Terraform will output something similar to the following, confirming the creation of the table:

```
Terraform will perform the following actions:

# aws_dynamodb_table.cars will be created
+ resource "aws_dynamodb_table" "cars" {
    + arn              = (known after apply)
    + billing_mode     = "PAY_PER_REQUEST"
    + hash_key         = "VIN"
    + id               = (known after apply)
    + name             = "cars"
    + stream_arn       = (known after apply)
    + stream_label     = (known after apply)
    + stream_view_type = (known after apply)

    + attribute {
        + name = "VIN"
        + type = "S"
      }

    + point_in_time_recovery {
        + enabled = (known after apply)
      }
}
aws_dynamodb_table.cars: Creating...
aws_dynamodb_table.cars: Creation complete after 0s [id=cars]
```

> [!important]
> **Note**
>
> Remember, on-demand billing is ideal for workloads with unpredictable traffic, as you only pay for the read/write operations you use.

## Inserting Items into the Table

Once the DynamoDB table is created, the next step is to insert items into it. Terraform provides the `aws_dynamodb_table_item` resource for adding entries to your DynamoDB table. This resource requires the table name and hash key (which can be referenced from the table resource) along with the item data.

Below is an example configuration that includes both the table creation and the insertion of a single item into the table. Note the use of heredoc syntax (`<<EOF ... EOF`) for defining the item in valid JSON format, including the types for each attribute (e.g., "S" for string and "N" for number).

```
resource "aws_dynamodb_table" "cars" {
  name         = "cars"
  hash_key     = "VIN"
  billing_mode = "PAY_PER_REQUEST"
  attribute {
    name = "VIN"
    type = "S"
  }
}

resource "aws_dynamodb_table_item" "car-items" {
  table_name = aws_dynamodb_table.cars.name
  hash_key   = aws_dynamodb_table.cars.hash_key
  item       = <<EOF
{
  "Manufacturer": {"S": "Toyota"},
  "Make": {"S": "Corolla"},
  "Year": {"N": "2004"},
  "VIN": {"S": "4Y1SL65848Z411439"}
}
EOF
}
```

Apply the configuration to insert the item:

```
$ terraform apply
```

Terraform will produce output indicating that the `aws_dynamodb_table_item.car-items` resource is being created. The process will output values similar to this:

```
# aws_dynamodb_table_item.car-items will be created.
+ resource "aws_dynamodb_table_item" "car-items" {
    + hash_key  = "VIN"
    + id        = (known after apply)
    + item      = jsonencode(
        {
          Manufacturer = {
            + S = "Toyota"
          }
          Make = {
            + S = "Corolla"
          }
          VIN = {
            + S = "4Y1SL65848Z411439"
          }
          Year = {
            + N = "2004"
          }
        }
      )
    + table_name = "cars"
}
Plan: 1 to add, 0 to change, 0 to destroy.
```

> [!important]
> **Warning**
>
> This method is intended for managing a few items. For large-scale data management or bulk operations, consider alternative solutions or data migration strategies.

## Hands-On Lab

Now that you have learned how to create a DynamoDB table and insert data using Terraform, it's time for a practical hands-on lab. Follow along with the lab instructions to reinforce your understanding of managing DynamoDB tables with Terraform.

For further reading and more advanced Terraform configurations, refer to the following resources:

- [Terraform AWS Provider Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS DynamoDB Documentation](https://aws.amazon.com/dynamodb/)

Happy building with Terraform and DynamoDB!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/e1d12378-f838-46c9-9b2e-28d86daa1e1e/lesson/74690b8e-93ec-4ed5-bf09-621199fc3db0)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/e1d12378-f838-46c9-9b2e-28d86daa1e1e/lesson/4d16fcae-204c-453f-b5eb-c685fede6343)**
>
> Practice lab
