# TerraformOpenTofu and Terragrunt Compatibility Chart - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Good-to-Know-Concepts-Ideas/TerraformOpenTofu-and-Terragrunt-Compatibility-Chart)

---

## Table of Contents

- TerraformOpenTofu and Terragrunt Compatibility Chart
  - Why Version Compatibility Matters
  - Compatibility Chart
  - Best Practices for Managing Versions
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Good to Know Concepts Ideas

# TerraformOpenTofu and Terragrunt Compatibility Chart

Ensuring your Terragrunt version aligns with your Terraform or OpenTofu release is critical for a seamless infrastructure automation workflow. Terragrunt is rigorously tested against specific Terraform/OpenTofu versions, and mismatches can lead to plan/apply errors or unexpected behavior.

## Why Version Compatibility Matters

- Prevents runtime errors during `terragrunt plan` or `terragrunt apply`
- Ensures access to the latest features without sacrificing stability
- Simplifies troubleshooting by minimizing version-related issues

> [!important]
> **Note**
>
> Always review the Terragrunt [release notes](https://terragrunt.gruntwork.io/docs/) before upgrading. Breaking changes can impact your existing configuration.

## Compatibility Chart

Refer to the matrix below to confirm which Terragrunt versions support your Terraform or OpenTofu release:

![The image is a compatibility chart showing the versions of Terraform/OpenTofu and their corresponding compatible Terragrunt versions. It includes a link to more information on supported versions.](https://kodekloud.com/kk-media/image/upload/v1752884358/notes-assets/images/Terragrunt-for-Beginners-TerraformOpenTofu-and-Terragrunt-Compatibility-Chart/terraform-opentofu-terragrunt-compatibility-chart.jpg)

## Best Practices for Managing Versions

| Action                              | Example                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------ |
| Pin Terraform/OpenTofu in modules   | `hcl<br>terraform {<br> required_version = ">= 1.5.0, < 1.6.0"<br>}<br>` |
| Lock Terragrunt in CI/CD            | `yaml<br>steps:<br>- uses: gruntwork-io/terragrunt-action@v0.0.0<br>`    |
| Regularly audit version constraints | Run `terragrunt validate-all` after upgrades to catch incompatibilities  |

## Links and References

- [Terragrunt Official Documentation](https://terragrunt.gruntwork.io/)
- [Terraform Versioning Guide](https://www.terraform.io/docs/language/versions/index.html)
- [OpenTofu Release Notes](https://github.com/opentofu/opentofu/releases)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/c2ee1192-4547-4149-82dc-d7e2940cb844/lesson/753cc09c-e388-466b-bb0f-9857a1c01709)**
>
> Watch video content
