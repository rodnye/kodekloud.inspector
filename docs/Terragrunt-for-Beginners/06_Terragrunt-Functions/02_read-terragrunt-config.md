# read terragrunt config - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Functions/read-terragrunt-config)

---

## Table of Contents

- read terragrunt config
  - Key Benefits
  - Best Practices
  - Example: Sharing Common Variables
  - Initializing Terragrunt
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Functions

# read terragrunt config

In this lesson, we’ll dive into Terragrunt’s built-in function `read_terragrunt_config`, which reads a Terragrunt HCL file and returns its contents as a map. This enables you to:

- Dynamically consume inputs, outputs, blocks, and attributes from another configuration.
- Adapt resources for different environments or setups.
- Promote modularity, reusability, and DRY infrastructure code.

When you invoke:

```
read_terragrunt_config("<path/to/file.hcl>")
```

Terragrunt will:

1.  Parse the specified HCL file.
2.  Serialize its contents into a map.
3.  Expose all blocks and attributes under that map for referencing in your configuration.

## Key Benefits

- **Dynamic Configuration**: Tailor resources per environment.
- **Modularity**: Reuse shared inputs and outputs.
- **Maintainability**: Avoid duplication across modules.

## Best Practices

| Practice                 | Recommendation                                           |
| ------------------------ | -------------------------------------------------------- |
| Centralize common inputs | Store project-level variables in a root `common.hcl`.    |
| Use `locals` for mapping | Assign descriptive local names to imported values.       |
| Keep shared configs lean | Include only widely used variables to reduce complexity. |
| Verify relative paths    | Ensure the path passed to the function is correct.       |

![The image outlines best practices for "read_terragrunt_config," highlighting the need for resources to adapt dynamically and access input/output configurations.](https://kodekloud.com/kk-media/image/upload/v1752884356/notes-assets/images/Terragrunt-for-Beginners-read-terragrunt-config/best-practices-read-terragrunt-config.jpg)

> [!important]
> **Tip**
>
> Use clear naming conventions in your `common.hcl` to avoid confusion when referencing nested attributes.

---

## Example: Sharing Common Variables

Create a root-level `common.hcl` with project-wide variables:

```
# common.hcl
inputs = {
  project     = "KodeKloud"
  environment = "dev"
}
```

In the `vpc/` directory, import these inputs using `read_terragrunt_config`:

```
# vpc/terragrunt.hcl
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws//?version=5.8.1"
}


locals {
  common_vars = read_terragrunt_config("../common.hcl")
}


inputs = {
  name = "${local.common_vars.inputs.project}-${local.common_vars.inputs.environment}-VPC"
}
```

What happens under the hood:

1.  Terragrunt reads `../common.hcl`.
2.  `local.common_vars.inputs` contains:
    - `project`: `"KodeKloud"`
    - `environment`: `"dev"`
3.  The VPC module’s `name` input resolves to:

```
KodeKloud-dev-VPC
```

> [!important]
> **Warning**
>
> Verify the relative path to `common.hcl`, or Terragrunt will error out with a file-not-found.

---

## Initializing Terragrunt

Run the following in the `vpc/` directory:

```
$ terragrunt init
```

Expected output:

```
- Finding hashicorp/aws versions matching ">= 5.30.0"...
- Installing hashicorp/aws v5.52.0...
- Installed hashicorp/aws v5.52.0 (signed by HashiCorp)


Terraform has created a lock file .terraform.lock.hcl ...
Terraform has been successfully initialized!
```

> [!important]
> **Next Steps**
>
> After initialization, run `terragrunt plan` to preview changes based on your dynamic inputs.

---

## Links and References

- [Terragrunt Function Reference](https://github.com/gruntwork-io/terragrunt#functions)
- [Terraform AWS VPC Module](https://github.com/terraform-aws-modules/terraform-aws-vpc)
- [Terragrunt Official Documentation](https://terragrunt.gruntwork.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/5775621f-5504-4da8-835d-661cda37a852/lesson/ed759e39-32c9-4e7a-952c-82af22f54cee)**
>
> Watch video content
