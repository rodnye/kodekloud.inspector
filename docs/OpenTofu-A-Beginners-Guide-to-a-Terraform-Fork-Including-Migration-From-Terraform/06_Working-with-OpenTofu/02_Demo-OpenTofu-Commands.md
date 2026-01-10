# Demo OpenTofu Commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/Working-with-OpenTofu/Demo-OpenTofu-Commands)

---

## Table of Contents

- Demo OpenTofu Commands
  - 1. Visualizing Resources
  - 2. Validating Configuration
  - 3. Planning and Applying
  - 4. Fixing the TLS Resource Block
  - 5. Formatting Code
  - 6. Inspecting State
  - 7. Providers Subcommands
  - 8. Reviewing Downloaded Providers
  - Links and References
  - Watch Video
  - Practice Lab
    - 3.1 Generating a Plan
    - 3.2 First Apply Attempt

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

Working with OpenTofu

# Demo OpenTofu Commands

Welcome to this hands-on lab on OpenTofu commands. Here, you’ll learn how to visualize, validate, plan, and apply your infrastructure-as-code (IaC) configurations using the `tofu` CLI. By the end of this guide, you’ll be comfortable generating dependency graphs, troubleshooting HCL errors, and managing provider plugins.

## 1\. Visualizing Resources

To inspect resource dependencies, generate a DOT graph:

```
tofu graph > graph.dot
```

You can then render `graph.dot` with [Graphviz](https://graphviz.org/) to visualize your IaC topology.

| Subcommand     | Purpose                              | Example                               |
| -------------- | ------------------------------------ | ------------------------------------- |
| tofu graph     | Generate DOT-format dependency graph | `tofu graph > graph.dot`              |
| tofu validate  | Validate HCL configuration           | `tofu validate`                       |
| tofu plan      | Create an execution plan             | `tofu plan`                           |
| tofu apply     | Apply the planned changes            | `tofu apply`                          |
| tofu fmt       | Format Terraform/OpenTofu files      | `tofu fmt`                            |
| tofu state     | Inspect or modify the state file     | `tofu state show local_file.key_data` |
| tofu providers | Manage provider plugins              | `tofu providers --help`               |

## 2\. Validating Configuration

Before creating any resources, validate your HCL syntax and catch typos:

1.  Change into your project directory:

    ```
    cd /root/opentofu-projects/project-shazam
    ```

2.  Run the validator:

    ```
    tofu validate
    ```

![The image shows a Visual Studio Code interface with a task description on the left about fixing configuration errors using the `tofu validate` command. On the right, there's a terminal and file explorer open, displaying a project directory structure.](https://kodekloud.com/kk-media/image/upload/v1752882904/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-OpenTofu-Commands/visual-studio-code-task-terminal-explorer.jpg)

If you see:

```
Error: An argument named "dsa_bits" is not expected here.
  on main.tf line 8, in resource "tls_private_key" "private_key":
   8:   dsa_bits = 2048


Did you mean "rsa_bits"?
```

> [!important]
> **Warning**
>
> Always match algorithm-specific arguments. In this case, replace `dsa_bits` with `rsa_bits` for an RSA key.

Correct the block in **main.tf**:

```
resource "tls_private_key" "private_key" {
  algorithm = "RSA"
  rsa_bits  = 2048
}
```

Re-run `tofu validate` until no errors remain.

## 3\. Planning and Applying

### 3.1 Generating a Plan

Create an execution plan to preview changes:

```
tofu plan
```

You’ll see which resources will be added, changed, or destroyed.

### 3.2 First Apply Attempt

Apply the plan:

```
tofu apply
```

If you encounter:

```
Error: Provider produced inconsistent final plan
...
inconsistent values for sensitive attribute
```

it means the syntax was valid but some resource arguments are incompatible.

## 4\. Fixing the TLS Resource Block

Ensure your `main.tf` includes only RSA-compatible settings and the local file resource:

```
resource "local_file" "key_data" {
  filename        = "/tmp/.pki/private_key.pem"
  content         = tls_private_key.private_key.pem
  file_permission = "0400"
}


resource "tls_private_key" "private_key" {
  algorithm = "RSA"
  rsa_bits  = 2048
}


resource "tls_cert_request" "csr" {
  private_key_pem = file("/tmp/.pki/private_key.pem")
  depends_on      = [local_file.key_data]


  subject {
    common_name  = "flexit.com"
    organization = "FlexIT Consulting Services"
  }
}
```

Re-initialize, plan, and apply:

```
tofu init
tofu plan
tofu apply
```

If `tofu apply` completes without errors, your configuration is now correct.

## 5\. Formatting Code

Keep your files consistent:

```
tofu fmt
```

This enforces HCL canonical style across all `.tf` files.

## 6\. Inspecting State

Query the state for a specific resource:

```
cd ~/opentofu-projects/project-shazam
tofu state show local_file.key_data
```

Check the `filename` attribute (e.g., `/tmp/.pki/private_key.pem`) to confirm it matches expectations.

## 7\. Providers Subcommands

OpenTofu uses providers to interact with external APIs. To list available provider commands:

```
tofu providers --help
```

Common subcommands include:

- mirror
- list
- install
- remove

## 8\. Reviewing Downloaded Providers

Without browsing the directory directly, list installed plugins:

```
tofu providers
```

![The image shows a coding environment with a file explorer and a code editor displaying a JSON file related to Terraform configuration. There is also a terminal at the bottom with commands related to navigating directories and managing provider plugins.](https://kodekloud.com/kk-media/image/upload/v1752882905/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-OpenTofu-Commands/coding-environment-json-terraform-terminal.jpg)

You should see entries like:

- `registry.opentofu.org/hashicorp/aws`
- `registry.opentofu.org/hashicorp/local`

---

## Links and References

- [OpenTofu GitHub Repository](https://github.com/opentofu/opentofu)
- [Terraform Concepts](https://www.terraform.io/docs/concepts/index.html)
- [Graphviz Overview](https://graphviz.org/documentation/)
- [TLS Provider Documentation](https://registry.terraform.io/providers/hashicorp/tls/latest/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/69432d48-55d0-4340-a56d-9f9a7819d26c/lesson/d1e2cf32-919d-448c-b8e0-2abdaaa25a01)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/69432d48-55d0-4340-a56d-9f9a7819d26c/lesson/fa965784-46aa-4503-a227-6a5096c4890a)**
>
> Practice lab
