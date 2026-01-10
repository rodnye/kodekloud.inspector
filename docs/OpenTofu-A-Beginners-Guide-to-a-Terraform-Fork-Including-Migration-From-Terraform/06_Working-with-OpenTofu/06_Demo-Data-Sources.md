# Demo Data Sources - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/Working-with-OpenTofu/Demo-Data-Sources)

---

## Table of Contents

- Demo Data Sources
  - Quiz Questions
  - Hands-On: Local File Data Source
  - AWS Data Sources
  - Links and References
  - Watch Video
  - Practice Lab
    - Incorrect Configuration
    - Corrected Configuration
    - Apply the Configuration
    - EBS Volume
    - S3 Bucket

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

Working with OpenTofu

# Demo Data Sources

Welcome to this lesson on using data sources in OpenTofu. Data sources let you read and reference existing infrastructure or local data, without creating or managing new resources.

## Quiz Questions

1.  **Can a data source be used to create, update, and destroy infrastructure?**  
    Answer: False. A data source only reads resource data and makes it available in OpenTofu.  
    For more details, see the official [OpenTofu documentation](https://docs.opentofu.org).
2.  **Can a data source be created using the `data` block?**  
    Answer: True. Data sources are defined with a `data` block, analogous to `resource` blocks.

---

## Hands-On: Local File Data Source

In the directory `/root/OpenTofu/project/lexcorp`, update `main.tf` to:

- Read the contents of `/etc/os-release` via the `local_file` data source.
- Output that content as an OpenTofu output variable.

### Incorrect Configuration

```
output "os-version" {
  value = data.local_file.content
}


datasource "local_file" "os" {
  filename = "/etc/os-release"
}
```

> [!important]
> **Warning**
>
> 1.  The block keyword must be `data`, not `datasource`.
> 2.  The output reference requires the data source name (`os`).

### Corrected Configuration

```
data "local_file" "os" {
  filename = "/etc/os-release"
}


output "os-version" {
  value = data.local_file.os.content
}
```

### Apply the Configuration

```
opentofu init
opentofu plan
opentofu apply
```

Expected output:

```
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.


Outputs:
os-version = <<EOT
PRETTY_NAME="Ubuntu 22.04.3 LTS"
NAME="Ubuntu"
VERSION_ID="22.04"
...
EOT
```

---

## AWS Data Sources

Next, we’ll work with AWS data sources. Below is a quick reference table for the examples covered.

| AWS Data Source      | Required Argument | Description                        |
| -------------------- | ----------------- | ---------------------------------- |
| aws\\\_ebs\\\_volume | volume\\\_id      | Fetches the EBS volume ID          |
| aws\\\_s3\\\_bucket  | bucket            | Specifies the existing bucket name |

### EBS Volume

Open `ebs.tf` to find a data source block for an AWS EBS volume:

```
data "aws_ebs_volume" "gpt_volume" {
  # configuration...
}
```

**Question:** Which attribute fetches the volume ID?  
**Answer:** `volume_id`

### S3 Bucket

In `s3.tf`, you’ll see a data source intended to read an existing S3 bucket:

```
data "aws_s3_bucket" "selected" {
  bucket_name = "bucket.test.com"
}
```

> [!important]
> **Warning**
>
> The argument `bucket_name` is invalid. The correct argument is `bucket`.

Correct configuration:

```
data "aws_s3_bucket" "selected" {
  bucket = "bucket.test.com"
}
```

---

That completes this lesson on OpenTofu data sources. In upcoming modules, you’ll get more hands-on practice with AWS data sources and resources. Happy building!

## Links and References

- [OpenTofu Documentation](https://docs.opentofu.org)
- [AWS EBS Volume Data Source](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/ebs_volume)
- [AWS S3 Bucket Data Source](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/s3_bucket)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/69432d48-55d0-4340-a56d-9f9a7819d26c/lesson/420e1e82-8822-4b98-b49c-feff9ec4c1c2)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/69432d48-55d0-4340-a56d-9f9a7819d26c/lesson/38d2db09-c3d2-4582-94a0-8fe0271ed1fe)**
>
> Practice lab
