# Environment Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Spacelift-Elevate-Your-Infrastructure-Deployment/Spacelift-Basics/Environment-Variables)

---

## Table of Contents

- Environment Variables
  - Sample Terraform Configuration
  - Passing Environment Variables to the Spacelift Runner
  - Managing AWS Credentials in Spacelift
  - Watch Video

---

## Content

Spacelift: Elevate Your Infrastructure Deployment

Spacelift Basics

# Environment Variables

In this lesson, you'll learn how to configure AWS credentials in Spacelift for a demo deployment. While several authentication methods are available, we begin with the simplest approach. If the AWS provider is not configured correctly, you may encounter an error similar to the following:

```
Planning failed. Terraform encountered an error while generating this plan.


  Error: configuring Terraform AWS Provider: no valid credential sources for Terraform AWS Provider found.


  Please see https://registry.terraform.io/providers/hashicorp/aws
  for more information about providing credentials.


  AWS Error: failed to refresh cached credentials: no EC2 IMDS role found, operation error ec2: DescribeInstances,
  request canceled, context deadline exceeded


  with provider["registry.terraform.io/hashicorp/aws"],
 on main.tf line 11, in provider "aws":
  11: provider "aws" {}


[1821G4J8XYZ43R5R3KGH3C] Unexpected exit code when planning changes: 1
```

> [!important]
> **Credential Configuration Note**
>
> The same methods for configuring the AWS provider in Spacelift also apply when working on your local machine or within any containerized environment.

## Sample Terraform Configuration

Below is an example Terraform configuration that sets up the AWS provider and creates a Virtual Private Cloud (VPC). In your environment, you can pass your AWS Access Key ID and AWS Secret Access Key as environment variables:

```
# Configure the AWS Provider
provider "aws" {
  version = "~> 4.0"
  region  = "us-east-1"
}


# Create a VPC
resource "aws_vpc" "example" {
  cidr_block = "10.0.0.0/16"
}
```

## Passing Environment Variables to the Spacelift Runner

Before running Terraform, export your AWS credentials and region in your terminal:

```
export AWS_ACCESS_KEY_ID="anaccesskey"
export AWS_SECRET_ACCESS_KEY="asecretkey"
export AWS_REGION="us-west-2"
terraform plan
```

After performing these steps, navigate to your stack's environment settings in Spacelift and select "Edit" to add or update the necessary variables. To confirm your current AWS credential configuration, run:

```
cat ~/.aws/credentials
```

The credentials file may also include Terraform output blocks that display resource attributes after provisioning. For instance:

```
output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.app_server.id
}


output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.app_server.public_ip
}
```

After you verify and commit your changes, push them to your repository with:

```
git push
```

The terminal output should resemble the following, indicating a successful commit:

```
1 file changed, 2 insertions(+)
C:\Users\sanje\Documents\scratch\spacelift-demo
>git push
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 12 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 304 bytes | 304.00 KiB/s, done.
Total 3 (delta 2), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
To https://github.com/Sanjeev-Thiyagarajan/spacelift-demo.git
   8997C93..2e4b018  main -> main
```

## Managing AWS Credentials in Spacelift

When configuring your environment variables in Spacelift, you have two options for storing AWS credentials:

| Storage Option | Visibility                       | Recommendation                                                                |
| -------------- | -------------------------------- | ----------------------------------------------------------------------------- |
| Plain Text     | Visible and editable             | Suitable for non-sensitive variables (e.g., AWS region)                       |
| Secret         | Hidden and not directly viewable | Essential for sensitive data like AWS Access Key ID and AWS Secret Access Key |

> [!important]
> **Security Warning**
>
> Always store sensitive credentials as secrets in Spacelift. This ensures that your AWS credentials remain hidden and secure, protecting them from unauthorized access.

When stored as plain text, the values are visible and can be edited by anyone with access to Spacelift. Therefore, for security reasons, always mark your AWS credentials as secrets.

![The image shows a web interface for managing environment variables in a Spacelift stack, with options to edit or delete variables. The stack is labeled as "failed," and various environment variables are listed with options to override.](https://kodekloud.com/kk-media/image/upload/v1752884080/notes-assets/images/Spacelift-Elevate-Your-Infrastructure-Deployment-Environment-Variables/spacelift-stack-environment-variables.jpg)

By following these guidelines, you can efficiently manage your AWS credentials in Spacelift while ensuring your Terraform projects are configured securely and correctly.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/spacelift-elevate-your-infrastructure-deployment/module/74dbb4df-716f-4fa2-92e9-a223a3a697ca/lesson/b01f8c43-13ef-47ca-bc4a-e783aeebcdbd)**
>
> Watch video content
