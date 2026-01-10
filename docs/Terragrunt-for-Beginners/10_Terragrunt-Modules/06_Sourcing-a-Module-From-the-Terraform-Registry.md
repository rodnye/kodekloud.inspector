# Sourcing a Module From the Terraform Registry - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Modules/Sourcing-a-Module-From-the-Terraform-Registry)

---

## Table of Contents

- Sourcing a Module From the Terraform Registry
  - 1. Referencing a Module in Terragrunt
  - 2. Initializing the Configuration
  - 3. Pinning a Module Version
  - 4. Updating to the Latest Matching Version
  - 5. Security and Best Practices
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Modules

# Sourcing a Module From the Terraform Registry

Leverage the Terraform Registry to discover, share, and reuse community-maintained modules. When you integrate Terragrunt, you can reference these modules directly using the `tfr://` protocol.

## 1\. Referencing a Module in Terragrunt

In your `terragrunt.hcl` file, set the `source` attribute to point at a Registry module:

```
# terragrunt.hcl
terraform {
  source = "tfr://<namespace>/<module_name>/<provider>"
}
```

| Element        | Description                                  | Example               |
| -------------- | -------------------------------------------- | --------------------- |
| namespace      | Author or organization publishing the module | terraform-aws-modules |
| module\\\_name | Identifier for the module                    | vpc                   |
| provider       | Cloud provider name                          | aws                   |

Example:

```
terraform {
  source = "tfr://terraform-aws-modules/vpc/aws"
}
```

## 2\. Initializing the Configuration

Run the following command to download and prepare the module in your working directory:

```
terragrunt init
```

This initializes your Terragrunt configuration and fetches the specified module from the Terraform Registry.

## 3\. Pinning a Module Version

To guarantee reproducible builds and avoid unintended upgrades, specify a version constraint:

```
terraform {
  source  = "tfr://terraform-aws-modules/vpc/aws"
  version = "~> 3.0"
}
```

Modules in the Registry follow semantic versioning. Locking to `~> 3.0` ensures you get all non-breaking updates in the 3.x series.

## 4\. Updating to the Latest Matching Version

When you’re ready to pull in the newest matching release (within your version constraint), use:

```
terragrunt get --update
```

This command refreshes your local copy of the module, incorporating any fixes or enhancements.

## 5\. Security and Best Practices

> [!important]
> **Security Warning**
>
> Always verify the module’s publisher and review its source code before applying in production. Prefer modules marked as **Verified** or provided by official vendors to reduce risk.

- Review module inputs, outputs, and provisioners for security compliance.
- Check the [Terraform Registry](https://registry.terraform.io) page for the module’s documentation and changelog.
- Use version pinning to control when features and fixes are introduced.

## Links and References

- [Terraform Registry](https://registry.terraform.io)
- [Terragrunt Documentation](https://terragrunt.gruntwork.io/)
- [Terraform Modules Best Practices](https://www.terraform.io/docs/language/modules/develop/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/4d4cda50-7d42-4622-b0d4-fa6e6ce0a16d/lesson/0d9390cd-e0d4-4e5f-af6f-00a2e9bf6d3b)**
>
> Watch video content
