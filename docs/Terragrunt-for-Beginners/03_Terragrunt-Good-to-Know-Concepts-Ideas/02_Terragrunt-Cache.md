# Terragrunt Cache - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Good-to-Know-Concepts-Ideas/Terragrunt-Cache)

---

## Table of Contents

- Terragrunt Cache
  - How Terragrunt Uses the Cache
  - Pruning Cache Directories
  - Centralizing Cache Storage
  - Links and References
  - Watch Video
    - Configure Your Shell

---

## Content

Terragrunt for Beginners

Terragrunt Good to Know Concepts Ideas

# Terragrunt Cache

Terragrunt creates a hidden cache directory (`.terragrunt-cache`) as a local “scratchpad” to speed up your Terraform workflows. This cache helps with:

- Downloading remote Terraform configurations, modules, and providers
- Executing Terraform commands in an isolated workspace
- Ensuring that you can delete and recreate the cache at any time without impacting live infrastructure

> [!important]
> **Note**
>
> The cache size grows as your project’s number of modules and providers increases. Plan for disk usage accordingly.

## How Terragrunt Uses the Cache

When you run a Terragrunt command, it:

1.  Fetches remote Terraform configurations and modules into `.terragrunt-cache`.
2.  Initializes a temporary working directory for Terraform to apply changes.
3.  Cleans up after execution, leaving `.terragrunt-cache` in place for future runs.

![The image is a diagram explaining the Terragrunt cache process, showing steps like downloading Terraform config remotely, running Terraform commands, and indicating that the cache can be safely deleted and recreated.](https://kodekloud.com/kk-media/image/upload/v1752884359/notes-assets/images/Terragrunt-for-Beginners-Terragrunt-Cache/terragrunt-cache-process-diagram.jpg)

## Pruning Cache Directories

Over time, you may accumulate many `.terragrunt-cache` folders across your repo. To reclaim disk space, run these commands from your project root:

| Action                       | Command                                                                       |
| ---------------------------- | ----------------------------------------------------------------------------- |
| List all cache directories   | `bash<br>find . -type d -name ".terragrunt-cache"`                            |
| Delete all cache directories | `bash<br>find . -type d -name ".terragrunt-cache" -prune -exec rm -rf {} \\;` |

> [!important]
> **Warning**
>
> The delete command uses `rm -rf`. Double-check your working directory before running irreversible removal commands.

## Centralizing Cache Storage

You can direct all `.terragrunt-cache` directories to a single folder by setting the `TERRAGRUNT_DOWNLOAD_DIR` environment variable. This makes it easier to manage and monitor cache usage.

![The image instructs to set the environment variable "TERRAGRUNT_DOWNLOAD" for Terragrunt Cache.](https://kodekloud.com/kk-media/image/upload/v1752884360/notes-assets/images/Terragrunt-for-Beginners-Terragrunt-Cache/terragrunt-download-environment-variable-instruction.jpg)

### Configure Your Shell

Add the following to your shell configuration file (`~/.bashrc`, `~/.zshrc`, etc.):

```
export TERRAGRUNT_DOWNLOAD_DIR="/path/to/central/cache"
```

Then, reload your shell:

```
source ~/.bashrc  # or source ~/.zshrc
```

> [!important]
> **Note**
>
> From now on, Terragrunt will store every `.terragrunt-cache` in `"/path/to/central/cache"`. You can periodically clean this directory to reclaim space.

## Links and References

- [Terragrunt Caching Documentation](https://terragrunt.gruntwork.io/docs/features/cache/)
- [Terraform Modules Overview](https://www.terraform.io/docs/language/modules/index.html)
- [Managing Remote State in Terraform](https://www.terraform.io/docs/language/state/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/c2ee1192-4547-4149-82dc-d7e2940cb844/lesson/0dea2ac9-e33b-4ff0-a2b0-98b301ecd684)**
>
> Watch video content
