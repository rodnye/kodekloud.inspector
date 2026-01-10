# Demo Sourcing a Module From a Git Repository - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Modules/Demo-Sourcing-a-Module-From-a-Git-Repository)

---

## Table of Contents

- Demo Sourcing a Module From a Git Repository
  - Prerequisites
  - terragrunt.hcl
  - Module Inputs
  - Apply the Configuration
  - Verify the Bucket
  - Sourcing from Private Repositories
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Modules

# Demo Sourcing a Module From a Git Repository

In this tutorial, you’ll learn how to source the official [Terraform AWS S3 Bucket Module](https://github.com/terraform-aws-modules/terraform-aws-s3-bucket) directly from GitHub using Terragrunt. By pinning to a specific release tag, you can guarantee consistent deployments across environments.

## Prerequisites

- Terragrunt installed (v0.XX+).
- [AWS CLI](https://aws.amazon.com/cli/) configured with valid credentials.
- Git installed and reachable from your environment.

## terragrunt.hcl

Create or update your `terragrunt.hcl` file:

```
terraform {
  source = "git::https://github.com/terraform-aws-modules/terraform-aws-s3-bucket.git?ref=v4.1.2"
}

inputs = {
  # This module expects "bucket" (not "bucket_name")
  bucket = "terragrunt-demo-bucket"
}
```

> [!important]
> **Pinning Module Versions**
>
> Appending `?ref=v4.1.2` to the Git URL locks the module to version 4.1.2. This prevents unexpected changes due to upstream updates.

## Module Inputs

| Input  | Description            | Required | Default |
| ------ | ---------------------- | -------- | ------- |
| bucket | Name of the S3 bucket. | yes      | —       |

## Apply the Configuration

Run the following command in the directory containing your `terragrunt.hcl`:

```
terragrunt apply
```

You should see a plan similar to:

```
  # module.s3_bucket.aws_s3_bucket.this will be created
  + resource "aws_s3_bucket" "this" {
      + bucket = "terragrunt-demo-bucket"
      …
    }

  # module.s3_bucket.aws_s3_bucket_public_access_block.this will be created
  + resource "aws_s3_bucket_public_access_block" "this" {
      …
    }
```

Confirm by typing `yes` and wait for provisioning to complete.

## Verify the Bucket

After Terragrunt finishes, list your S3 buckets:

```
aws s3 ls
```

Expected output:

```
2023-06-01 12:34:56 terragrunt-demo-bucket
```

You should see `terragrunt-demo-bucket` in the list.

## Sourcing from Private Repositories

If your module resides in a private Git repo, update the `source` URL to point to your private repository (HTTPS or SSH) and ensure authentication is set up:

- **SSH**: Configure SSH keys and add them to your Git provider.
- **HTTPS**: Use `git-credential-helper` or environment variables for credentials.

> [!important]
> **Private Repository Authentication**
>
> Do not store credentials in version control. Use secure credential helpers or environment variables to manage access.

## Links and References

| Resource                 | URL                                                              |
| ------------------------ | ---------------------------------------------------------------- |
| Terraform AWS S3 Module  | https://github.com/terraform-aws-modules/terraform-aws-s3-bucket |
| Terragrunt Documentation | https://terragrunt.gruntwork.io/docs/                            |
| Terraform Documentation  | https://www.terraform.io/docs/                                   |
| AWS CLI                  | https://aws.amazon.com/cli/                                      |

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/4d4cda50-7d42-4622-b0d4-fa6e6ce0a16d/lesson/8a3a7434-c751-49b0-8ff8-4d5e3f342d3c)**
>
> Watch video content
