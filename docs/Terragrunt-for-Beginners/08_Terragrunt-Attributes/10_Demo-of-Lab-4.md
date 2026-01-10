# Demo of Lab 4 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Attributes/Demo-of-Lab-4)

---

## Table of Contents

- Demo of Lab 4
  - 1. Configure the VPC Module
  - 2. Configure a Custom Terragrunt Cache
  - 3. Prevent Accidental Destruction
  - 4. Use a Specific IAM Role
  - 5. Specify a Custom Terraform Binary & Version
  - 6. Enforce a Terragrunt Version Constraint
  - 7. Configure Retryable Errors
  - Terragrunt Settings at a Glance
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Terragrunt for Beginners

Terragrunt Attributes

# Demo of Lab 4

Welcome to Lab 4. In this lesson, you’ll configure Terragrunt to deploy and manage an AWS VPC module. You have access to an AWS account—follow the steps below to set up credentials, initialize modules, enforce safeguards, and customize Terragrunt settings for a robust infrastructure workflow.

> [!important]
> **Note**
>
> Keep your AWS credentials secure. You can retrieve them with:
>
> ```
> show creds
> ```
>
> Or log in via the provided link using your username and password. Consider opening a second terminal tab to streamline copy-and-paste.

---

## 1\. Configure the VPC Module

In `Terraform stack/VPC/terragrunt.hcl`, reference the remote AWS VPC module (v5.8.1) from the Terraform Registry:

```
terraform {
  source  = "registry.terraform.io/terraform-aws-modules/vpc/aws"
  version = "5.8.1"
}

inputs = {
  name = "KodeKloud VPC"
  cidr = "10.64.0.0/16"
}
```

Initialize and review the plan:

```
cd "Terraform stack/VPC"
terragrunt init
terragrunt plan
```

You should see **4 to add**. If everything checks out, continue to the next section.

---

## 2\. Configure a Custom Terragrunt Cache

Terragrunt can cache downloaded modules locally to speed up repeated runs. Add a top-level `download_dir` in your root `terragrunt.hcl`:

```
download_dir = "/full/path/to/Terraform stack/.terragrunt_config"

terraform {
  source  = "registry.terraform.io/terraform-aws-modules/vpc/aws"
  version = "5.8.1"
}

remote_state {
  backend = "local"
  config  = {}
}

inputs = {
  name = "KodeKloud VPC"
  cidr = "10.64.0.0/16"
}
```

Re-initialize and verify the cache directory:

```
terragrunt init
ls "Terraform stack/.terragrunt_config"
```

Then plan and apply:

```
terragrunt plan
terragrunt apply
```

After confirming the apply, check the AWS Console under **VPC** to see your new VPC.

---

## 3\. Prevent Accidental Destruction

Protect critical resources by adding a `prevent_destroy` lifecycle rule:

```
lifecycle {
  prevent_destroy = true
}
```

Re‐apply and test destruction:

```
terragrunt apply
terragrunt destroy
```

Terragrunt will refuse to destroy due to the `prevent_destroy` setting.

> [!important]
> **Warning**
>
> If you need to remove the resource later, you must first remove or comment out the `prevent_destroy` block.

---

## 4\. Use a Specific IAM Role

All Terragrunt operations should assume the `KodeKloudTerragruntRole` role. Retrieve your AWS account ID:

```
aws sts get-caller-identity --output text --query Account
```

Then add the role ARN to `terragrunt.hcl`:

```
iam_role = "arn:aws:iam::<YOUR_ACCOUNT_ID>:role/KodeKloudTerragruntRole"
```

Verify the role is in use:

```
terragrunt plan
```

---

## 5\. Specify a Custom Terraform Binary & Version

Use the Terraform 1.82 binary packaged in this stack:

```
terraform_binary             = "/full/path/to/Terraform stack/terraform_1.82/terraform"
terraform_version_constraint = "1.82"
```

Re‐run:

```
terragrunt init
terragrunt plan
```

---

## 6\. Enforce a Terragrunt Version Constraint

Require Terragrunt in the `>= 0.34.0, < 0.40.0` range:

```
terragrunt_version_constraint = ">= 0.34.0, < 0.40.0"
```

If you encounter a compatibility error (e.g., on version 0.58.8), update to include your version:

```
terragrunt_version_constraint = ">= 0.34.0, <= 0.59"
```

Then re‐plan:

```
terragrunt plan
```

---

## 7\. Configure Retryable Errors

Handle transient network or locking issues by specifying retry patterns:

```
retryable_errors = [
  "Error locking state:.*",
  "no such host",
  "request timed out"
]
```

Run:

```
terragrunt plan
terragrunt apply
```

Terragrunt will retry on matching errors automatically.

---

## Terragrunt Settings at a Glance

| Setting                             | Purpose                                 | Example                                              |
| ----------------------------------- | --------------------------------------- | ---------------------------------------------------- |
| terraform.source                    | Module source                           | `"registry.terraform.io/.../vpc/aws"`                |
| download\\\_dir                     | Cache directory for modules             | `"/path/to/.terragrunt_config"`                      |
| lifecycle.prevent\\\_destroy        | Prevent critical-resource deletion      | `prevent_destroy = true`                             |
| iam\\\_role                         | Specifies assumed IAM role              | `"arn:aws:iam::123456789012:role/...TerragruntRole"` |
| terraform\\\_binary                 | Custom Terraform CLI path               | `"/path/to/terraform_1.82/terraform"`                |
| terraform\\\_version\\\_constraint  | Lock Terraform to a specific version    | `"1.82"`                                             |
| terragrunt\\\_version\\\_constraint | Lock Terragrunt to a version range      | `">= 0.34.0, <= 0.59"`                               |
| retryable\\\_errors                 | Patterns that trigger automatic retries | `["Error locking state:.*", "no such host"]`         |

---

## Links and References

- [Terraform AWS VPC Module](https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws)
- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [AWS CLI Configuration](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)
- [AWS IAM Roles Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html)

That completes **Lab 4**. Thank you for following along!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/1a2a45b4-e7d1-4af2-a897-7ebf83a4350e/lesson/85edd206-4f62-45a0-9a1e-b392827e2847)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/1a2a45b4-e7d1-4af2-a897-7ebf83a4350e/lesson/6e9c7bbd-209c-4ab0-a0dc-410eb3c2af6b)**
>
> Practice lab
