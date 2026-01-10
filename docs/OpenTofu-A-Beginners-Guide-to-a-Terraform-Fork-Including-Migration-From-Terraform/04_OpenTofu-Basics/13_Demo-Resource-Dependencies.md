# Demo Resource Dependencies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Basics/Demo-Resource-Dependencies)

---

## Table of Contents

- Demo Resource Dependencies
  - Table of Contents
  - Understanding Resource Dependencies
  - Generating a TLS Private Key
  - Writing the Key to a Local File
  - Cleanup
  - Explicit Dependency with depends_on
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Basics

# Demo Resource Dependencies

This lesson demonstrates how to manage resource dependencies in OpenTofu, covering both explicit and implicit approaches using `depends_on` and attribute references.

## Table of Contents

1.  [Understanding Resource Dependencies](#understanding-resource-dependencies)
2.  [Generating a TLS Private Key](#generating-a-tls-private-key)
3.  [Writing the Key to a Local File](#writing-the-key-to-a-local-file)
4.  [Cleanup](#cleanup)
5.  [Explicit Dependency with depends_on](#explicit-dependency-with-depends_on)
6.  [Links and References](#links-and-references)

## Understanding Resource Dependencies

OpenTofu resources can depend on each other in two ways:

| Dependency Type | Definition                                                                 | Syntax Example                                     |
| --------------- | -------------------------------------------------------------------------- | -------------------------------------------------- |
| Explicit        | Resource A waits for Resource B without accessing its attributes directly. | `depends_on = [local_file.krill]`                  |
| Implicit        | Resource A references Resource B’s attribute in its arguments.             | `content = tls_private_key.pvtkey.private_key_pem` |

First, we set an **explicit dependency** using the `depends_on` argument when Resource A does not reference Resource B’s attributes:

![The image shows a Visual Studio Code editor with a welcome message for KodeKloud OpenTofu Lab on the right, and a multiple-choice question about dependencies on the left.](https://kodekloud.com/kk-media/image/upload/v1752882826/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-Resource-Dependencies/vscode-kodekloud-opentofu-lab-question.jpg)

Next, an **implicit dependency** is created by referencing one resource’s attributes inside another:

![The image shows a KodeKloud OpenTofu Lab interface with a Visual Studio Code editor on the right, displaying a welcome message and terminal, and a quiz question on the left about implicit dependency.](https://kodekloud.com/kk-media/image/upload/v1752882827/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-Resource-Dependencies/kodekloud-opentofu-lab-vscode-quiz.jpg)

## Generating a TLS Private Key

Navigate to your project’s `key-generator` directory and create `key.tf`:

```
resource "tls_private_key" "pvtkey" {
  algorithm = "RSA"
  rsa_bits  = 4096
}
```

Initialize, plan, and apply the configuration:

```
opentofu init
opentofu plan
opentofu apply
# Type "yes" to confirm
```

Inspect the generated key:

```
opentofu show tls_private_key.pvtkey
```

> [!important]
> **Warning**
>
> Storing private keys in plain text can pose a security risk. Never commit sensitive key material to version control.

## Writing the Key to a Local File

Update `key.tf` to include a `local_file` resource:

```
resource "tls_private_key" "pvtkey" {
  algorithm = "RSA"
  rsa_bits  = 4096
}


resource "local_file" "key_details" {
  filename = "/root/key.txt"
  content  = tls_private_key.pvtkey.private_key_pem
}
```

Re-run OpenTofu:

```
opentofu init
opentofu plan
opentofu apply
# Confirm with "yes"
```

Verify that `/root/key.txt` contains your PEM-encoded private key.

## Cleanup

When you’re done, destroy both resources:

```
opentofu destroy
# Confirm with "yes"
```

## Explicit Dependency with depends_on

Create a new directory (e.g., `/root/explicit-dependency`) and add `main.tf`:

```
resource "local_file" "krill" {
  filename = "/root/krill.txt"
  content  = "krill"
}


resource "local_file" "whale" {
  filename   = "/root/whale.txt"
  content    = "whale"
  depends_on = [local_file.krill]
}
```

Here, `whale` will only be created after `krill`, illustrating an **explicit dependency** without attribute references.

Apply this configuration:

```
opentofu init
opentofu plan
opentofu apply
# Enter "yes" to proceed
```

## Links and References

- [OpenTofu CLI Documentation](https://docs.opentofu.org/cli)
- [Terraform TLS Provider](https://registry.terraform.io/providers/hashicorp/tls/latest)
- [OpenTofu GitHub Repository](https://github.com/opentofu/opentofu)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/c3586b29-e450-4c95-bad9-91bdf332eb24/lesson/6e6cebbb-004c-453c-952d-309748451cb4)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/c3586b29-e450-4c95-bad9-91bdf332eb24/lesson/b8e642d8-752e-46a9-9a8e-6c18fe04d3a2)**
>
> Practice lab
