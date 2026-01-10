# terragrunt hclfmt - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Commands/terragrunt-hclfmt)

---

## Table of Contents

- terragrunt hclfmt
  - Integration and Workflow
  - Core Benefits
  - Example Usage
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Commands

# terragrunt hclfmt

Terragrunt HCL Format (`hclfmt`) enforces a consistent style for Terragrunt’s HashiCorp Configuration Language (HCL) files. Built on top of `terraform fmt`, it applies Terraform’s formatting conventions while understanding Terragrunt’s hierarchical configuration structure. Using `terragrunt hclfmt` helps teams maintain clean, readable code and minimize version-control noise.

![The image describes the purpose of "Terragrunt hclfmt," highlighting its use for formatting HCL files, enforcing consistent formatting, being equivalent to 'terraform fmt,' and maintaining a clean and readable codebase.](https://kodekloud.com/kk-media/image/upload/v1752884323/notes-assets/images/Terragrunt-for-Beginners-terragrunt-hclfmt/terragrunt-hclfmt-formatting-tool.jpg)

## Integration and Workflow

Integrate `terragrunt hclfmt` into your development lifecycle to automate formatting:

- Embed in Git pre-commit hooks to catch style issues before code review.
- Run in CI/CD pipelines to enforce formatting across all branches.
- Leverage the underlying `terraform fmt` compatibility for seamless adoption.

![The image illustrates the integration of Terragrunt hclfmt with Terragrunt.hcl, highlighting its connection with Terraform.](https://kodekloud.com/kk-media/image/upload/v1752884324/notes-assets/images/Terragrunt-for-Beginners-terragrunt-hclfmt/terragrunt-hclfmt-integration-terraform.jpg)

**Best Practices:**

- Add `terragrunt hclfmt` to your `.pre-commit-config.yaml` so developers never miss a formatting step.
- Include formatting checks in your pipeline as a gating job.
- Keep your Terragrunt modules consistent by running `hclfmt` after merging feature branches.

![The image is about automating the formatting process using CI/CD pipelines and Git pre-commit hooks, with a "Best Practices" button at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752884324/notes-assets/images/Terragrunt-for-Beginners-terragrunt-hclfmt/automating-formatting-cicd-git-hooks.jpg)

## Core Benefits

Using `terragrunt hclfmt` delivers:

| Benefit               | Description                                           |
| --------------------- | ----------------------------------------------------- |
| Consistent Formatting | Uniform HCL style for Terragrunt and Terraform files. |
| Easier Collaboration  | Reduces discussions over indentation and layout.      |
| Cleaner Diffs         | Removes non-functional changes from version control.  |

![The image highlights the benefits of "Terragrunt hclfmt," including improved code readability, easier collaboration, and reduced version control noise.](https://kodekloud.com/kk-media/image/upload/v1752884325/notes-assets/images/Terragrunt-for-Beginners-terragrunt-hclfmt/terragrunt-hclfmt-benefits-diagram.jpg)

## Example Usage

Here’s how to format a simple `terragrunt.hcl` that defines a VPC module with inputs for `name` and `cidr`:

Unformatted `terragrunt.hcl`:

```
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws//?version=5.8.1"
}


inputs = {
  name = "Kodekloud-VPC-2"
  cidr = "10.0.0.0/16"
}
```

Run the formatter:

```
cd ~/workspace
terragrunt hclfmt
```

Terminal output:

```
INFO[0000] /config/workspace/terragrunt.hcl was updated
```

After formatting, the file adheres to style guidelines:

```
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws//?version=5.8.1"
}


inputs = {
  name = "Kodekloud-VPC-2"
  cidr = "10.0.0.0/16"
}
```

This workflow ensures that every Terragrunt HCL file in your repository remains consistent, reducing merge conflicts and speeding up code reviews.

> [!important]
> **Note**
>
> Integrating `terragrunt hclfmt` early in your CI/CD process saves time and enforces standards across teams.> [!important]
> **Warning**
>
> Always run `terragrunt hclfmt` before committing changes. Unformatted HCL may cause pipeline failures or inconsistent diffs.

## Links and References

- [Terraform fmt CLI](https://developer.hashicorp.com/terraform/cli/commands/fmt)
- [Terragrunt Documentation](https://terragrunt.gruntwork.io/)
- [pre-commit Hooks](https://pre-commit.com)
- [Terraform AWS Modules](https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/e42961fc-4288-4cc2-8db8-3882b884c0b1/lesson/e594328c-1fdf-4646-a40f-bf2d82d95f1c)**
>
> Watch video content
