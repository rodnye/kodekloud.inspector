# Installing Terragrunt - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Basic-Concepts/Installing-Terragrunt)

---

## Table of Contents

- Installing Terragrunt
  - Installation Summary
  - Windows
  - macOS
  - Linux
  - Links and References
  - Watch Video

---

## Content

Terragrunt for Beginners

Terragrunt Basic Concepts

# Installing Terragrunt

Learn how to install Terragrunt on Windows, macOS, and Linux to streamline your Terraform workflows. Follow the steps below to get up and running in minutes.

> [!important]
> **Prerequisites**
>
> - Ensure you have Terraform installed and configured: [Terraform Documentation](https://www.terraform.io/docs).
> - Verify you have permissions to modify your `PATH` environment variable.
> - For macOS users, Homebrew must be installed: `brew --version`.

## Installation Summary

| Operating System | Method          | Quick Command or Action                                                  |
| ---------------- | --------------- | ------------------------------------------------------------------------ |
| Windows          | Download Binary | Download from GitHub, place `terragrunt.exe` in a directory under `PATH` |
| macOS            | Homebrew        | `brew install terragrunt`                                                |
| Linux            | Download Binary | Download from GitHub, move to `/usr/local/bin`, then `chmod +x`          |

---

## Windows

1.  Download the latest `terragrunt.exe` from the [official GitHub releases page](https://github.com/gruntwork-io/terragrunt/releases).
2.  Move the executable into a folder included in your `PATH` (for example, `C:\Windows\System32` or a custom tools directory).
3.  Open a new Command Prompt or PowerShell window and verify:

```
terragrunt --version
```

You should see output similar to:

```
terragrunt version v0.x.x
```

> [!important]
> **Windows Path Configuration**
>
> Be careful when editing system environment variables. Incorrect changes to `PATH` can prevent other applications from running.

---

## macOS

On macOS, use Homebrew to install Terragrunt:

```
brew install terragrunt
```

Once the installation completes, confirm it’s successful:

```
terragrunt --version
```

If you see the version printed, Terragrunt is ready to use.

---

## Linux

First, download the appropriate binary for your CPU architecture from the [official GitHub releases page](https://github.com/gruntwork-io/terragrunt/releases).

![The image provides instructions for installing Terragrunt, showing a list of downloadable assets for different operating systems, including Windows, macOS, and Linux. It also includes a link to the GitHub releases page for Terragrunt.](https://kodekloud.com/kk-media/image/upload/v1752884287/notes-assets/images/Terragrunt-for-Beginners-Installing-Terragrunt/terragrunt-installation-instructions-assets.jpg)

Then move the binary into a directory on your `PATH` (e.g., `/usr/local/bin`) and make it executable:

```
sudo mv terragrunt /usr/local/bin/
sudo chmod +x /usr/local/bin/terragrunt
```

Finally, verify the installation:

```
terragrunt --version
```

---

With Terragrunt installed on your platform of choice, you can now leverage its features—such as DRY configurations, remote state management, and automated locking—to enhance your Terraform projects.

## Links and References

- [Terragrunt GitHub Releases](https://github.com/gruntwork-io/terragrunt/releases)
- [Terraform Documentation](https://www.terraform.io/docs)
- [Homebrew](https://brew.sh/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/9618155f-f613-4c7b-92c7-9be9ddfa22b5/lesson/f8f916fd-7f10-40df-aada-8f5e7a3cc6f8)**
>
> Watch video content
