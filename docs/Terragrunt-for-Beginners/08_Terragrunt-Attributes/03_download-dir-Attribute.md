# download dir Attribute - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Attributes/download-dir-Attribute)

---

## Table of Contents

- download dir Attribute
  - What Is download_dir?
  - Key Benefits
  - Considerations
  - Demonstration
  - Links and References
  - Watch Video
    - Default Behavior
    - Custom Download Directory

---

## Content

Terragrunt for Beginners

Terragrunt Attributes

# download dir Attribute

In this lesson, we’ll dive into the **download_dir** attribute in Terragrunt. This setting lets you control where Terraform module sources are cached before running any Terraform command, helping you maintain a clean workspace and isolate module downloads per project or environment.

## What Is download_dir?

- **Purpose**: Defines the folder on your local file system where Terragrunt will store downloaded Terraform configurations and module dependencies.
- **Type**: String (absolute or relative path).
- **Use Cases**:
  - Organizing module downloads by project.
  - Separating cache directories for different environments or teams.
  - Keeping CI/CD pipelines’ caches isolated.

> [!important]
> **Note**
>
> The `download_dir` path can be absolute or relative. If the directory doesn’t exist, Terragrunt will attempt to create it.

## Key Benefits

| Benefit       | Details                                                                            |
| ------------- | ---------------------------------------------------------------------------------- |
| Customization | Select any directory to store Terraform modules instead of the default cache.      |
| Organization  | Keep downloaded modules apart from your working files and avoid clutter.           |
| Isolation     | Use different download directories for separate pipelines, teams, or environments. |

## Considerations

- Ensure the specified directory exists or is creatable by Terragrunt.
- Verify file-system permissions to allow read/write operations.
- Confirm sufficient disk space is available to store module downloads.

> [!important]
> **Warning**
>
> If `download_dir` lacks write permissions or runs out of space, Terragrunt may fail during `init`, interrupting your Terraform workflow.

![The image is an infographic titled "Download dir" with icons and text indicating the need for necessary permissions and directory accessibility, labeled under "Consideration."](https://kodekloud.com/kk-media/image/upload/v1752884273/notes-assets/images/Terragrunt-for-Beginners-download-dir-Attribute/download-dir-infographic-permissions-accessibility.jpg)

---

## Demonstration

### Default Behavior

With no `download_dir` set in your `terragrunt.hcl`, Terragrunt uses a hidden cache folder under your current working directory:

```
~/workspace/vpc
$ terragrunt init
INFO[0000] Downloading Terraform configurations from tfr://terraform-aws-modules/vpc/aws?version=5.8.1 \
into /workspace/vpc/.terragrunt-cache/5eyWb_1sjaAZ9XRFnWys_PGxK0E/ThyVwttki6d6ASaD5OwoqIWA
...
Terraform has been successfully initialized!
```

### Custom Download Directory

Add `download_dir` to your `terragrunt.hcl` at the root of your module:

```
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws//?version=5.8.1"
}


include "root" {
  path   = find_in_parent_folders()
  expose = true
}


download_dir = "../.terragrunt-kodekloud"


inputs = {
  name = "KodeKloud-VPC"
  cidr = "10.100.0.0/16"
}
```

Running initialization again stores the module cache in your custom directory:

```
~/workspace/vpc
$ terragrunt init
INFO[0000] Downloading Terraform configurations from tfr://terraform-aws-modules/vpc/aws?version=5.8.1 \
into ../.terragrunt-kodekloud/5eyWb_lsjAZ9XrfnWJs_pGxNOE/ThyYwttki6d6ASaD5OwoqIAW
Initializing the backend...
Initializing provider plugins...
- Reusing previous versions of hashicorp/aws from the dependency lock file
- Installing hashicorp/aws v5.52.0...
Terraform has been successfully initialized!
```

Notice the cache now resides under `../.terragrunt-kodekloud` instead of the default `.terragrunt-cache`.

## Links and References

- [Terragrunt Documentation](https://terragrunt.gruntwork.io/docs/)
- [Terraform Module Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/1a2a45b4-e7d1-4af2-a897-7ebf83a4350e/lesson/dd6b206d-54c8-44dd-bcd3-95001e813a39)**
>
> Watch video content
