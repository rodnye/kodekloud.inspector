# OpenTofu Commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/Working-with-OpenTofu/OpenTofu-Commands)

---

## Table of Contents

- OpenTofu Commands
  - OpenTofu Command Overview
  - 1. Validate Configuration
  - 2. Format HCL Files
  - 3. Show Infrastructure State
  - 4. Providers
  - 5. Outputs
  - 6. Refresh and Plan
  - 7. Dependency Graph
  - References
  - Watch Video

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

Working with OpenTofu

# OpenTofu Commands

OpenTofu provides a powerful CLI for managing infrastructure with HCL files. In this guide, we'll cover the essential `tofu` commands to validate, format, visualize, and apply your configurations.

## OpenTofu Command Overview

| Command          | Purpose                                                  | Example                  |
| ---------------- | -------------------------------------------------------- | ------------------------ |
| `tofu validate`  | Validate HCL syntax and internal consistency             | `tofu validate`          |
| `tofu fmt`       | Reformat HCL files to canonical style                    | `tofu fmt`               |
| `tofu show`      | Display current infrastructure state                     | `tofu show --json`       |
| `tofu providers` | List providers required by configuration and state       | `tofu providers`         |
| `tofu output`    | Read defined outputs or a specific output value          | `tofu output pet-name`   |
| `tofu refresh`   | Refresh state without planning or applying changes       | `tofu refresh`           |
| `tofu plan`      | Show execution plan after refreshing state               | `tofu plan`              |
| `tofu graph`     | Generate a DOT-format dependency graph for visualization | `tofu graph > graph.dot` |

## 1\. Validate Configuration

Use `tofu validate` to check your HCL files for syntax errors and internal consistency. It flags errors with precise file and line numbers.

```
$ tofu validate
Success! The configuration is valid.
```

> [!important]
> **Note**
>
> When validation fails, OpenTofu highlights the incorrect attribute. For example, replace `file permission` with `file_permission` to match HCL naming conventions.

```
resource "local_file" "pet" {
  filename        = "/root/pets.txt"
  content         = "We love pets!"
  file_permission = "0700"  # Corrected attribute name
}
```

## 2\. Format HCL Files

The `tofu fmt` command enforces a consistent style across all `.tf` files in the current directory, handling indentation, alignment, and spacing automatically.

```
$ tofu fmt
main.tf
```

## 3\. Show Infrastructure State

`tofu show` prints the current state stored by OpenTofu. Add `--json` for a machine-readable output.

```
$ tofu show --json
{
  "values": { … }
}
```

## 4\. Providers

`tofu providers` lists providers declared in your configuration versus those recorded in the state file.

```
resource "aws_instance" "db" {
  ami           = var.ami
  instance_type = var.instance_type
}
```

```
$ tofu providers
Providers required by configuration:
.
└── provider[registry.opentofu.org/hashicorp/aws] 4.15.0

Providers required by state:
provider[registry.opentofu.org/hashicorp/aws] 4.15.0
```

## 5\. Outputs

Use `tofu output` to inspect all declared outputs or fetch a single output by name.

```
resource "local_file" "pet" {
  filename        = "/root/pets.txt"
  content         = "We love pets!"
  file_permission = "0777"
}

resource "random_pet" "cat" {
  length    = 2
  separator = "-"
}

output "content" {
  description = "Print the content of the file"
  value       = local_file.pet.content
}

output "pet-name" {
  description = "Print the name of the pet"
  value       = random_pet.cat.id
}
```

```
$ tofu output
content  = We love pets!
pet-name = huge-owl

$ tofu output pet-name
pet-name = huge-owl
```

## 6\. Refresh and Plan

By default, `tofu plan` and `tofu apply` refresh the state before execution. To update only the state file without planning or applying, run:

```
$ tofu refresh
random_pet.cat: Refreshing state… [id=bold-coyote]
local_file.pet: Refreshing state… [id=cba595b7d9f94ba1107a46f3f731912d95fb3d2c]
```

This syncs your state with external changes. Then check for drift or planned changes:

```
$ tofu plan
random_pet.cat: Refreshing state… [id=bold-coyote]
local_file.pet: Refreshing state… [id=cba595b7d9f94ba1107a46f3f731912d95fb3d2c]
No changes. Your infrastructure matches the configuration.
```

## 7\. Dependency Graph

Generate a dependency graph in [DOT format](https://graphviz.org/doc/info/lang.html) using `tofu graph`. You can then visualize it with [GraphViz](https://graphviz.org):

```
$ tofu graph > graph.dot
```

```
digraph {
  compound = "true"
  newrank = "true"
  subgraph "root" {
    "[root] aws_instance.cerberus (expand)" [label = "aws_instance.cerberus", shape = "box"]
    "[root] provider[\"registry.opentofu.org/hashicorp/aws/\"]" [label = "provider[\"registry.opentofu.org/hashicorp/aws/\"]", shape = "diamond"]
    /* … additional nodes and edges … */
  }
}
```

> [!important]
> **Note**
>
> Save the DOT output (e.g., `graph.dot`) and render it with:
>
> ```
> dot -Tpng graph.dot -o graph.png
> ```

## References

- [OpenTofu Documentation](https://opentofu.org/docs)
- [HCL Language Guide](https://github.com/hashicorp/hcl)
- [GraphViz](https://graphviz.org)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/69432d48-55d0-4340-a56d-9f9a7819d26c/lesson/4cf2f489-9c9f-4ede-99d6-5cdfa7df908e)**
>
> Watch video content
