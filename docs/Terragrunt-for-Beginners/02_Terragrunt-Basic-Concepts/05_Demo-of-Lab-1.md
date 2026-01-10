# Demo of Lab 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terragrunt-for-Beginners/Terragrunt-Basic-Concepts/Demo-of-Lab-1)

---

## Table of Contents

- Demo of Lab 1
  - Question 1: Install Terraform 1.8.3 and Verify the Version
  - Question 2: Install Terragrunt 0.58.8 and Verify the Version
  - Question 3: Beautify Terraform Code with Terragrunt
  - Question 4: Beautify Terragrunt HCL Configuration
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Terragrunt for Beginners

Terragrunt Basic Concepts

# Demo of Lab 1

Welcome to **Lab 1**! This lesson will guide you through installing Terraform 1.8.3 and Terragrunt 0.58.8 in your cloud shell. You’ll also learn how to format your Terraform and Terragrunt code.

When you open the lab, click **Open in VS Code** to launch the editor in a new browser tab. This allows you to copy and paste commands directly into the integrated terminal. Dismiss any initial prompts to get started.

![The image shows a split-screen view of a Visual Studio Code environment with instructions for opening a terminal and copying text, alongside a task prompt about using VS Code in a browser tab.](https://kodekloud.com/kk-media/image/upload/v1752884284/notes-assets/images/Terragrunt-for-Beginners-Demo-of-Lab-1/vs-code-terminal-instructions-task-prompt.jpg)

---

## Question 1: Install Terraform 1.8.3 and Verify the Version

The lab environment doesn’t include Terraform by default. Let’s confirm:

```
terraform version
```

You should see:

```
bash: terraform: command not found
```

Follow these steps to install Terraform 1.8.3:

| Step | Command / Action                                                                                                                            |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.   | Download the Terraform 1.8.3 ZIP (linux\\\_amd64):<br>`wget https://releases.hashicorp.com/terraform/1.8.3/terraform_1.8.3_linux_amd64.zip` |
| 2.   | Ensure `unzip` is installed:<br>`apt update && apt install -y unzip`                                                                        |
| 3.   | Unpack the archive:<br>`unzip terraform_1.8.3_linux_amd64.zip`                                                                              |
| 4.   | Make the binary executable and move it to `/usr/bin`:<br>`chmod +x terraform && mv terraform /usr/bin/`                                     |
| 5.   | Remove the ZIP file:<br>`rm terraform_1.8.3_linux_amd64.zip`                                                                                |
| 6.   | Verify the installation:<br>`terraform version`                                                                                             |

```
# Example commands in sequence
wget https://releases.hashicorp.com/terraform/1.8.3/terraform_1.8.3_linux_amd64.zip
apt update && apt install -y unzip
unzip terraform_1.8.3_linux_amd64.zip
chmod +x terraform && mv terraform /usr/bin/
rm terraform_1.8.3_linux_amd64.zip
terraform version
```

> [!important]
> **Expected Output**
>
> ```
> Terraform v1.8.3
> ```

Once you see **Terraform v1.8.3**, return to the lab interface and mark **Question 1** complete.

---

## Question 2: Install Terragrunt 0.58.8 and Verify the Version

Next, install Terragrunt. First, confirm it’s missing:

```
terragrunt --version
```

Expected result:

```
bash: terragrunt: command not found
```

1.  Navigate to the [Terragrunt GitHub releases](https://github.com/gruntwork-io/terragrunt/releases) page and locate **v0.58.8**.
2.  Under **Assets**, copy the link for **terragrunt_linux_amd64**.

![The image shows a GitHub release page for version 0.58.8 of a software, listing assets for download, including various platform-specific files and source code. The description notes a fix related to S3 bucket URL modifying.](https://kodekloud.com/kk-media/image/upload/v1752884286/notes-assets/images/Terragrunt-for-Beginners-Demo-of-Lab-1/github-release-0-58-8-assets.jpg)

3.  Download, make executable, and move it into your PATH:

```
# Download Terragrunt v0.58.8 for Linux AMD64
wget https://github.com/gruntwork-io/terragrunt/releases/download/v0.58.8/terragrunt_linux_amd64

# Install the binary
chmod +x terragrunt_linux_amd64
mv terragrunt_linux_amd64 /usr/bin/terragrunt

# Verify installation
terragrunt --version
```

> [!important]
> **Expected Output**
>
> ```
> terragrunt version v0.58.8
> ```

After confirming **v0.58.8**, return to the lab and proceed to **Question 3**.

---

## Question 3: Beautify Terraform Code with Terragrunt

Terragrunt can wrap and extend Terraform commands. To format all `.tf` files in your directory:

```
terragrunt fmt
```

This ensures consistent indentation and style across your Terraform modules.

---

## Question 4: Beautify Terragrunt HCL Configuration

To format a Terragrunt HCL file (`.hcl`), use:

```
terragrunt hclfmt
```

This command tidies up your Terragrunt `*.hcl` configuration, making it easier to read and maintain.

---

Congratulations—**Lab 1** is now complete!

---

## Links and References

- [HashiCorp Terraform releases](https://releases.hashicorp.com/terraform/)
- [Terragrunt GitHub releases](https://github.com/gruntwork-io/terragrunt/releases)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/9618155f-f613-4c7b-92c7-9be9ddfa22b5/lesson/88627ebf-779f-46c0-a0b7-054b1ffa3eef)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terragrunt-for-beginners/module/9618155f-f613-4c7b-92c7-9be9ddfa22b5/lesson/687c7569-fd0e-4f75-9c11-b7d4551cacd5)**
>
> Practice lab
