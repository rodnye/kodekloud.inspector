# S3 with Terraform - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-with-AWS/S3-with-Terraform)

---

## Table of Contents

- S3 with Terraform
  - Creating an S3 Bucket
  - Uploading a File to the S3 Bucket
  - Applying a Bucket Policy
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Terraform Basics Training Course

Terraform with AWS

# S3 with Terraform

In this guide, you will learn how to create and manage an S3 bucket using Terraform. We will cover the steps to:

- Create an S3 bucket,
- Upload a file to the bucket, and
- Attach a bucket policy that grants access to an existing IAM entity.

Follow along to understand how Terraform integrates with AWS for managing S3 resources.

## Creating an S3 Bucket

To create an S3 bucket, we use the AWS S3 bucket resource in Terraform. For more details on the available resource arguments, please refer to the [Terraform AWS documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs).

Below is an example configuration where we define an S3 bucket with a unique name and attach a descriptive tag.

```
resource "aws_s3_bucket" "finance" {
  bucket = "finance-21092020"
  tags = {
    Description = "Finance and Payroll"
  }
}
```

When you run the following command, Terraform will plan and proceed to create the bucket:

```
$ terraform apply
Terraform will perform the following actions:

# aws_s3_bucket.finance will be created
+ resource "aws_s3_bucket" "finance" {
    + acceleration_status = (known after apply)
    + acl                 = "private"
    + arn                 = (known after apply)
    + bucket              = "finance-21092020"
  }

Plan: 1 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
Terraform will perform the actions described above.
Only 'yes' will be accepted to approve.

Enter a value: yes
aws_s3_bucket.finance: Creating...
aws_s3_bucket.finance: Creation complete after 0s [id=finance-21092020]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

Terraform automatically tracks the bucket’s state in the local `terraform.tfstate` file.

## Uploading a File to the S3 Bucket

After successfully creating the S3 bucket, the next step is to upload a file. We use the AWS S3 Bucket Object resource to achieve this. The key arguments required are:

- The bucket reference,
- The content (or reference to the file), and
- The key, which is the file name.

> [!important]
> **Note**
>
> If you want to upload the actual contents of a file instead of a literal string, use the `file()` function. For example, replace the content argument with `content = file("/root/finance/finance-2020.doc")` to correctly read the file's contents.

Below is an example configuration for uploading a file to your bucket:

```
resource "aws_s3_bucket_object" "finance-2020" {
  content = "/root/finance/finance-2020.doc"
  key     = "finance-2020.doc"
  bucket  = aws_s3_bucket.finance.id
}
```

After updating your Terraform configuration, run `terraform apply` to upload the file to the S3 bucket.

## Applying a Bucket Policy

To grant access to members of an IAM entity named "finance-analysts", we must attach a bucket policy to the S3 bucket. Note that IAM groups cannot be directly used as principals in S3 bucket policies. Instead, you should use individual IAM users or roles. In this example, we retrieve IAM group details using a data source.

> [!important]
> **Warning**
>
> IAM groups are not valid principals in S3 bucket policies. To grant access to a group's members, ensure you reference the ARNs of individual IAM users or roles.

The following data source fetches the details of the IAM group "finance-analysts":

```
data "aws_iam_group" "finance-data" {
  group_name = "finance-analysts"
}
```

Next, we create an AWS S3 bucket policy resource which attaches a policy to the S3 bucket. The policy document uses Terraform interpolation to dynamically reference the bucket and IAM group details.

```
resource "aws_s3_bucket_policy" "finance-policy" {
  bucket = aws_s3_bucket.finance.id
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "*",
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::${aws_s3_bucket.finance.id}/*",
      "Principal": {
        "AWS": [
          "${data.aws_iam_group.finance-data.arn}"
        ]
      }
    }
  ]
}
EOF
}
```

After running `terraform apply`, the bucket policy is attached, granting full access to the specified IAM entity.

Below is a sample output when applying the configuration that includes uploading the S3 object:

```
$ terraform apply
.
.
Terraform will perform the following actions:

  # aws_s3_bucket_object.finance-2020 will be created
  + resource "aws_s3_bucket_object" "finance-2020" {
      + acl           = "private"
      + bucket        = "finance-21092020"
      + content       = "/root/finance/finance-2020.doc"
      + force_destroy = false
      + id            = (known after apply)
      + key           = "finance-2020.doc"
    }

Plan: 1 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
Terraform will perform the actions described above.
Only 'yes' will be accepted to approve.

Enter a value: yes
aws_s3_bucket_object.finance-2020: Creating...
aws_s3_bucket_object.finance-2020: Creation complete after 0s [id=finance-2020.doc]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

## Conclusion

In this article, we demonstrated how to:

- Create an S3 bucket,
- Upload a file to that bucket, and
- Attach a bucket policy using Terraform.

With these steps, you can now efficiently manage S3 resources in your AWS environment using Terraform. For more detailed documentation on Terraform and AWS integration, consider reviewing additional resources like the [Terraform AWS Provider Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) and [AWS S3 Documentation](https://aws.amazon.com/s3/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/e1d12378-f838-46c9-9b2e-28d86daa1e1e/lesson/8102451c-8a2e-4add-99f4-34d552c04a8d)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/e1d12378-f838-46c9-9b2e-28d86daa1e1e/lesson/2c63e33a-7462-4659-a0d1-0dc6559e9e41)**
>
> Practice lab
