# Tasks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Spacelift-Elevate-Your-Infrastructure-Deployment/Spacelift-Basics/Tasks)

---

## Table of Contents

- Tasks
  - Running One-Off Terraform Commands
  - Watch Video

---

## Content

Spacelift: Elevate Your Infrastructure Deployment

Spacelift Basics

# Tasks

When working with Spacelift, there may be occasions when you need to run one-off Terraform commands—such as "terraform state list"—to troubleshoot issues or quickly gather important infrastructure details. This article explains how to execute these commands within Spacelift in a streamlined manner.

> [!important]
> **Tip**
>
> One-off commands can be especially useful when you need immediate feedback on the state of your infrastructure without altering your main configuration processes.

## Running One-Off Terraform Commands

To execute a single Terraform command:

1.  **Navigate to the Tasks Section:**  
    In the Spacelift dashboard, locate and click on the Tasks section. This is where you can input and run one-off commands.
2.  **Execute Your Command:**  
    Once you enter your desired Terraform command (for example, `terraform state list`) and click "Perform," Spacelift will automatically spin up a container to handle the command execution. The resulting output is then displayed directly in the interface for your review.
3.  **Review the Command Output:**  
    The output provides real-time information about the current state of your infrastructure. For instance, running `terraform state list` might show entries for both an AWS instance and an AWS VPC, enabling you to quickly diagnose or verify the state of your deployments.

Below is a sample output demonstrating a successful one-off command execution:

```
[0m[32m[0161AZ1ZKRCFPHW9RCHMBOX] calculating state checksum...
[0m[32m[0161AZ1ZKRCFPHW9RCHMBOX] Running custom task with 0 custom hooks...
[0m[32m[0161AZ1ZKRCFPHW9RCHMBOX] Custom task performed successfully
[0m[32m[0161AZ1ZKRCFPHW9RCHMBOX] calculating state checksum...
```

> [!important]
> **Note**
>
> This facility not only helps in troubleshooting but also assists in gathering real-time state information without impacting your ongoing infrastructure operations.

Using one-off Terraform commands in Spacelift provides a quick and efficient method to inspect and diagnose your infrastructure, ensuring that you can address issues as they arise. For additional information on integrating Spacelift with Terraform workflows, refer to the [Spacelift Documentation](https://spacelift.io/docs) and [Terraform Documentation](https://www.terraform.io/docs).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/spacelift-elevate-your-infrastructure-deployment/module/74dbb4df-716f-4fa2-92e9-a223a3a697ca/lesson/36939112-f096-4fad-bf68-d50f6ef8217c)**
>
> Watch video content
