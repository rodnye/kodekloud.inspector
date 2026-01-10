# Remote Backends with S3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Remote-State/Remote-Backends-with-S3)

---

## Table of Contents

- Remote Backends with S3
  - Configuring Your Terraform Backend
  - Initializing the Remote Backend
  - Applying Changes with the Remote Backend
  - Watch Video
  - Practice Lab
    - Breakdown of the Configuration

---

## Content

Terraform Basics Training Course

Remote State

# Remote Backends with S3

In this lesson, we explain how to configure Terraform to use a remote backend with an AWS S3 bucket and DynamoDB for state locking and consistency checks. This approach helps centralize your state file and improve collaboration when managing infrastructure as code.

> [!important]
> **Prerequisites**
>
> Before you begin, ensure you have completed the following:
>
> 1.  Created an S3 bucket to store your Terraform state file.
> 2.  Set up a DynamoDB table with a primary (hash) key named "lockid" for state locking.

![The image illustrates a remote backend setup for Terraform, showing components like Terraform State and State Locking, with configuration details for a bucket and DynamoDB table.](https://kodekloud.com/kk-media/image/upload/v1752884185/notes-assets/images/Terraform-Basics-Training-Course-Remote-Backends-with-S3/frame_20.jpg)

Make note of the following details:

- S3 bucket name.
- S3 key (object path) for the state file.
- AWS region where the bucket is hosted.
- Name of the DynamoDB table.

## Configuring Your Terraform Backend

Navigate to your configuration directory. Typically, you might have a `main.tf` file that creates local resources. When you run `terraform apply`, Terraform initially generates a local state file (`terraform.tfstate`).

To switch to a remote backend, add a Terraform block with backend settings. Previously, the Terraform block was used solely to specify the provider version. It now also includes the backend configuration for remote state storage. For example, update your configuration as follows:

```
resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}


terraform {
  backend "s3" {
    bucket         = "kodekloud-terraform-state-bucket01"
    key            = "finance/terraform.tfstate"
    region         = "us-west-1"
    dynamodb_table = "state-locking"
  }
}
```

### Breakdown of the Configuration

- **bucket:** The name of the S3 bucket where the state file will be stored.
- **key:** The S3 object path for storing the state file (in this example, under a folder named "finance").
- **region:** The AWS region where your S3 bucket is located.
- **dynamodb_table:** Name of the pre-created DynamoDB table enabling state locking to ensure safe concurrent updates.

> [!important]
> **Best Practice**
>
> It is recommended to separate your backend configuration from your infrastructure code. Consider moving the Terraform block (or at least the backend settings) from `main.tf` to a separate file (e.g., `terraform.tf`) to improve clarity.

## Initializing the Remote Backend

After reorganizing your files (for example, `main.tf` for resource definitions and `terraform.tf` for backend configuration), initialize your Terraform configuration using the command below:

```
$ terraform init
Initializing the backend...
Do you want to copy existing state to the new backend?
  Pre-existing state was found while migrating the previous "local" backend to the newly configured "s3" backend. No existing state was found in the newly configured "s3" backend. Do you want to copy this state to the new "s3" backend? Enter "yes" to copy and "no" to start with an empty state.


Enter a value: yes


Successfully configured the backend "s3"! Terraform will automatically use this backend unless the backend configuration changes.


Initializing provider plugins...
- Using previously-installed hashicorp/aws v3.7.0
... [Output Truncated]
```

This initialization process migrates your local state to the configured S3 bucket. After confirming the migration, you can remove the local state file to ensure Terraform uses only the remote state:

```
$ rm -rf terraform.tfstate
```

## Applying Changes with the Remote Backend

From now on, any terraform operations will update the remote state. When you run `terraform plan` or `terraform apply`, Terraform locks the state, retrieves it from the S3 bucket, and releases the lock after the operation completes. An example output during a successful apply operation is as follows:

```
$ terraform apply
Acquiring state lock. This may take a few moments...
aws_s3_bucket.terraform-state: Refreshing state... [id=kodekloud-terraform-state-bucket01]
aws_dynamodb_table.state-locking: Refreshing state... [id=state-locking]
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
Releasing state lock. This may take a few moments.
```

With these steps, you have successfully configured a remote backend for Terraform using AWS S3 and DynamoDB for state locking. Practice these concepts to further solidify your understanding and improve your infrastructure management practices.

For additional resources and documentation, see:

- [Terraform Backend Configuration](https://www.terraform.io/language/settings/backends)
- [AWS S3 Documentation](https://aws.amazon.com/s3/)
- [DynamoDB Documentation](https://aws.amazon.com/dynamodb/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/9464f9ce-236c-4f22-a61b-5398307b47b4/lesson/679971cc-3f97-4c67-8788-30574aad8083)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/9464f9ce-236c-4f22-a61b-5398307b47b4/lesson/31d4668f-3bef-442e-b7df-aac695f52719)**
>
> Practice lab
