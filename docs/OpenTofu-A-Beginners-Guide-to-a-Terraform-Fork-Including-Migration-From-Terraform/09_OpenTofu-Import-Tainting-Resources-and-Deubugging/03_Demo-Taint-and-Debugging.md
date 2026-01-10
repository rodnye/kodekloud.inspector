# Demo Taint and Debugging - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Import-Tainting-Resources-and-Deubugging/Demo-Taint-and-Debugging)

---

## Table of Contents

- Demo Taint and Debugging
  - 1. Environment Variables for Debugging
  - 2. Enabling Logging and Exporting Logs
  - 3. Provisioning an EC2 Instance and Tainting
  - References
  - Watch Video
  - Practice Lab
    - Effects of Tainting
    - Replacing a Tainted Resource

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Import Tainting Resources and Deubugging

# Demo Taint and Debugging

Welcome to the OpenTofu lab on Tainting and Debugging. In this hands-on tutorial, you will learn:

1.  How to export logs to a specific path using environment variables
2.  Generating and configuring debug log levels
3.  Enabling logging for an OpenTofu project
4.  Tainting and replacing Terraform resources (AWS EC2 example)

## 1\. Environment Variables for Debugging

OpenTofu uses two key environment variables to control logging:

| Variable          | Purpose                                                                  | Example                          |
| ----------------- | ------------------------------------------------------------------------ | -------------------------------- |
| TF\\\_LOG         | Sets the log verbosity level (`error`, `warn`, `info`, `debug`, `trace`) | `export TF_LOG=debug`            |
| TF\\\_LOG\\\_PATH | Specifies the file path where log output will be written                 | `export TF_LOG_PATH=/tmp/ot.log` |

> [!important]
> **Note**
>
> `TF_LOG_PATH` must be set alongside `TF_LOG`; otherwise, no logs will be written to disk.

## 2\. Enabling Logging and Exporting Logs

Assume your project directory is `/root/OpenTofu/projects/project_a`. To enable `error`\-level logging and export output to `/tmp/project_a.log`, run:

![The image shows a Visual Studio Code interface with a task description on the left and a file explorer and terminal on the right. The task involves enabling logging for a project and exporting logs.](https://kodekloud.com/kk-media/image/upload/v1752882870/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-Taint-and-Debugging/visual-studio-code-task-logging-export.jpg)

```
cd /root/OpenTofu/projects/project_a
export TF_LOG=error
export TF_LOG_PATH=/tmp/project_a.log
opentofu init
opentofu apply
```

When prompted, type `yes`. Authentication warnings may appear, but the log file will be created at `/tmp/project_a.log`.

> [!important]
> **Warning**
>
> Do not modify any configuration files before exporting logs; this ensures you capture the original error context.

Among the log levels, `trace` produces the most detailed output.

## 3\. Provisioning an EC2 Instance and Tainting

Navigate to the `projectB` directory:

```
cd /root/OpenTofu/projects/projectB
```

Your `main.tf` defines an AWS EC2 instance:

```
resource "aws_instance" "ProjectB" {
  ami           = "ami-0c9bf21ac5bf10eb"
  instance_type = "t2.large"
  tags = {
    Name        = "projectB-webserver"
    Description = "Oversized Webserver"
  }
}
```

Initialize and apply the configuration:

![The image shows a coding environment with a task description on the left and a Visual Studio Code interface on the right, displaying a project directory and a terminal with an error message related to AWS credentials.](https://kodekloud.com/kk-media/image/upload/v1752882872/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-Taint-and-Debugging/coding-environment-visual-studio-code.jpg)

```
opentofu init
opentofu apply
```

Confirm with `yes`. After apply completes, the EC2 instance `ProjectB` appears in your AWS console.

### Effects of Tainting

To mark the EC2 instance for replacement:

```
opentofu taint aws_instance.ProjectB
```

Review the plan:

```
opentofu plan
```

Expected output:

```
Plan: 1 to add, 0 to change, 0 to destroy.
```

This indicates that the tainted resource will be recreated.

### Replacing a Tainted Resource

Execute the apply command with `-replace`:

```
opentofu apply -replace=aws_instance.ProjectB
```

OpenTofu will destroy the existing instance and create a new one before finalizing the update.

## References

- [OpenTofu Documentation](https://docs.opentofu.org/)
- [Terraform CLI Docs](https://developer.hashicorp.com/terraform/cli)
- [AWS Provider on Terraform Registry](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

This concludes the lab on Tainting and Debugging with OpenTofu. In the next lesson, we'll explore resource dependencies and outputs.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/0fda982f-8bb2-4b57-8009-996870d27e43/lesson/adac0469-942c-4a9a-b597-9503cfd4bc7d)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/0fda982f-8bb2-4b57-8009-996870d27e43/lesson/68678212-159f-49e9-8b93-49c111de4f38)**
>
> Practice lab
