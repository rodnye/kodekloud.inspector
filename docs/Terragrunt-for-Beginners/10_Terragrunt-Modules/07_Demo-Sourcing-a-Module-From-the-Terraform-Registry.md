# Demo Sourcing a Module From the Terraform Registry - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Modules/Demo-Sourcing-a-Module-From-the-Terraform-Registry)

---

## Table of Contents

- Demo Sourcing a Module From the Terraform Registry
  - Why Use the Terraform Registry?
  - terragrunt.hcl Configuration
  - Initialize and Apply with Terragrunt
  - Verify the S3 Bucket
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Modules

# Demo Sourcing a Module From the Terraform Registry

In this guide, we’ll demonstrate how to source the same S3 bucket module from the Terraform Registry using Terragrunt. Instead of pulling the module from GitHub, we switch to the `tfr:///` prefix and pin a specific version. This approach simplifies version management and leverages the official [Terraform Registry](https://registry.terraform.io/) distribution.

## Why Use the Terraform Registry?

| Source Type        | Prefix                        | Example Address                                                             |
| ------------------ | ----------------------------- | --------------------------------------------------------------------------- |
| GitHub             | `git::https://github.com/...` | `git::https://github.com/terraform-aws-modules/terraform-aws-s3-bucket.git` |
| Terraform Registry | `tfr:///`                     | `tfr:///terraform-aws-modules/s3-bucket/aws?version=4.1.2`                  |

> [!important]
> **Note**
>
> Pinning module versions (e.g. `?version=4.1.2`) ensures reproducible builds and prevents unexpected changes when upstream modules are updated.

## terragrunt.hcl Configuration

Create or update your `terragrunt.hcl` file with the registry source and input variables:

```
# terragrunt.hcl
terraform {
  source = "tfr:///terraform-aws-modules/s3-bucket/aws?version=4.1.2"
}


inputs = {
  bucket = "my-unique-bucket-name"
  acl    = "private"


  public_access_block = {
    block_public_acls       = true
    block_public_policy     = true
    ignore_public_acls      = true
    restrict_public_buckets = true
  }
}
```

The syntax breakdown:

- `tfr:///` — Registry prefix (two slashes for delimiter + one slash to start address).
- `namespace/module_name/provider` — Module path on the Terraform Registry.
- `?version=x.y.z` — Query parameter to lock the module version.

## Initialize and Apply with Terragrunt

Run the following commands to download the module and provision your S3 bucket:

```
$ terragrunt init
[terragrunt]  INFO: Downloading module...
...


$ terragrunt apply --auto-approve
...
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

## Verify the S3 Bucket

Use the AWS CLI to confirm that your bucket exists:

```
$ aws s3 ls
2023-08-15 12:34:56 my-unique-bucket-name
```

> [!important]
> **Warning**
>
> Bucket names must be globally unique. If you encounter an error about the bucket already existing, choose a different name.

## Links and References

- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [Terraform Registry: S3 Bucket Module](https://registry.terraform.io/modules/terraform-aws-modules/s3-bucket/aws/latest)
- [AWS CLI S3 Commands](https://docs.aws.amazon.com/cli/latest/reference/s3/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/4d4cda50-7d42-4622-b0d4-fa6e6ce0a16d/lesson/10f295f9-2ab3-4c55-8c4a-2f26863db598)**
>
> Watch video content
