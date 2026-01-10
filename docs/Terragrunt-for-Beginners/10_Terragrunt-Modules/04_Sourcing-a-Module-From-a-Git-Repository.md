# Sourcing a Module From a Git Repository - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Modules/Sourcing-a-Module-From-a-Git-Repository)

---

## Table of Contents

- Sourcing a Module From a Git Repository
  - Prerequisites
  - Authentication Methods
  - Referencing a Module in Terraform
  - Initializing and Updating Modules
  - Best Practices
  - Links and References
  - Watch Video
    - HTTPS Example
    - SSH Example

---

## Content

Terragrunt for Beginners

Terragrunt Modules

# Sourcing a Module From a Git Repository

In this guide, you’ll learn how to reference Terraform modules hosted in a private Git repository (GitHub, GitLab, Bitbucket, etc.) and manage authentication securely. By the end, you’ll be able to pin module versions for reproducible Terraform runs.

## Prerequisites

- A Terraform module stored in a private Git repository
- Credentials configured in your local environment (HTTPS token or SSH key)
- Terraform CLI installed on your workstation

## Authentication Methods

Choose one of the following authentication options to securely fetch private modules:

| Method                        | Description                                  | Setup Commands                                                                                             |
| ----------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| HTTPS + Personal Access Token | Use a PAT stored in an environment variable. | `bash<br>export GIT_TOKEN="your_token_here"<br>`<br>Configure `~/.netrc` or a Git credential helper.       |
| SSH Keys                      | Authenticate via your SSH keypair.           | `bash<br>eval "$(ssh-agent -s)"<br>ssh-add ~/.ssh/id_rsa<br>`<br>Add your public key to your Git provider. |

> [!important]
> **Note**
>
> Avoid hard-coding tokens or keys in your `.tf` files. Instead, use environment variables, `~/.netrc`, or a Git credential helper.

## Referencing a Module in Terraform

Insert one of the following snippets into your `main.tf`. Replace `<org>`, `<repo>`, and `modules/my_module` with your repository and path.

### HTTPS Example

```
module "my_module" {
  source = "git::https://<username>:${var.GIT_TOKEN}@github.com/<org>/<repo>.git//modules/my_module?ref=v1.0.0"


  # Module inputs
  example_var = "foo"
}
```

### SSH Example

```
module "my_module" {
  source = "git::ssh://git@github.com/<org>/<repo>.git//modules/my_module?ref=v1.0.0"


  # Module inputs
  example_var = "foo"
}
```

- The double slash (`//modules/my_module`) specifies the subdirectory within the repository.
- The `?ref=v1.0.0` suffix pins the module to a tag, branch, or commit.

> [!important]
> **Warning**
>
> Embedding credentials in URLs can expose sensitive data if your configuration is shared. Use variables and environment-based authentication whenever possible.

## Initializing and Updating Modules

1.  Initialize Terraform and download referenced modules:

    ```
    terraform init
    ```

2.  After updating the remote module, refresh your local cache:

    ```
    terraform get -update
    ```

3.  Review and apply your changes:

    ```
    terraform apply
    ```

## Best Practices

- Always pin module sources with `?ref=` to ensure reproducibility.
- Store API tokens and SSH keys outside of version control.
- Test module updates in a non-production workspace before rolling out.

## Links and References

- [Terraform Modules Documentation](https://www.terraform.io/docs/language/modules/index.html)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [SSH Key Setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [Terraform CLI Commands](https://www.terraform.io/docs/cli/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/4d4cda50-7d42-4622-b0d4-fa6e6ce0a16d/lesson/f0b5f16b-2caf-423c-bc3c-44dd38a3ae9e)**
>
> Watch video content
