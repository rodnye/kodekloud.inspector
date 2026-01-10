# Creating your first stack - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Spacelift-Elevate-Your-Infrastructure-Deployment/Spacelift-Basics/Creating-your-first-stack)

---

## Table of Contents

- Creating your first stack
  - Terraform Configuration
  - Repository Setup
  - Configuring Spacelift
  - Triggering a New Run
  - Conclusion
  - Watch Video

---

## Content

Spacelift: Elevate Your Infrastructure Deployment

Spacelift Basics

# Creating your first stack

In this guide, you'll learn how to use Spacelift with a straightforward Terraform configuration. This configuration launches an AWS EC2 instance of type t2.micro tagged as "app-server" and outputs both the instance ID and its public IP. The AMI used is the default Linux AMI for the us-east-1 region, so if you're operating in another region, update the AMI accordingly.

## Terraform Configuration

Below is the Terraform configuration that creates the EC2 instance:

```
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }
  required_version = ">= 1.2.0"
}


provider "aws" {
  region = "us-east-1"
}


resource "aws_instance" "app_server" {
  ami           = "ami-02396cdd13e9a1257"
  instance_type = "t2.micro"


  tags = {
    Name = "app-server"
  }
}
```

This configuration deploys a simple EC2 instance. To retrieve essential details about this instance, such as its ID and public IP address, include the following outputs:

```
output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.app_server.id
}


output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.app_server.public_ip
}
```

## Repository Setup

To begin, create a GitHub repository for your project. In this example, we use "spacelift-demo" as the repository name, keeping it public with default settings.

![The image shows a GitHub page for creating a new repository, with options to set the repository name, visibility, and initialize with a README file.](https://kodekloud.com/kk-media/image/upload/v1752884069/notes-assets/images/Spacelift-Elevate-Your-Infrastructure-Deployment-Creating-your-first-stack/github-new-repository-creation.jpg)

After you name the repository, click **Create repository**. Then, run the following commands to initialize your repository locally, add your files, commit your changes, and push your repository to GitHub:

```
echo "# spacelift-demo" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Sanjeev-Thiyagarajan/spacelift-demo.git
git push -u origin main
```

Once the push is complete, you will see your repository populated with the corresponding files.

![The image shows a GitHub repository page with files listed, including `.gitignore`, `main.tf`, and `outputs.tf`. The repository is public and has no description, stars, or forks.](https://kodekloud.com/kk-media/image/upload/v1752884070/notes-assets/images/Spacelift-Elevate-Your-Infrastructure-Deployment-Creating-your-first-stack/github-repository-files-listing.jpg)

A default `.gitignore` is automatically included to prevent committing unnecessary files.

## Configuring Spacelift

With your repository ready, head over to the [Spacelift website](https://spacelift.io/) and click the **Get Started** button on the homepage.

![The image is a screenshot of Spacelift's website, showcasing it as a flexible Infrastructure as Code (IaC) management platform with various integrations and features. It highlights its compatibility with tools like Terraform, CloudFormation, and Kubernetes.](https://kodekloud.com/kk-media/image/upload/v1752884072/notes-assets/images/Spacelift-Elevate-Your-Infrastructure-Deployment-Creating-your-first-stack/spacelift-iac-management-screenshot.jpg)

You can sign up using GitHub, GitLab, or Google. Using GitHub simplifies the process, as Spacelift automatically detects your repositories.

After logging in, you'll see a dashboard featuring a **Stacks** section. In Spacelift, stacks are the core building blocks, with each repository linked to its corresponding stack. Follow these steps to create a stack for your demo:

1.  Click on **Create new stack**.
2.  Name the stack "Spacelift-demo" and optionally add labels and a description for better management.

    ![The image shows a web interface for creating a new stack in Spacelift, with fields for name, space, labels, and description. The interface includes a sidebar with various options like stacks, blueprints, and modules.](https://kodekloud.com/kk-media/image/upload/v1752884073/notes-assets/images/Spacelift-Elevate-Your-Infrastructure-Deployment-Creating-your-first-stack/spacelift-new-stack-interface.jpg)

3.  Click **Continue** and search for your GitHub repository by typing "spacelift-demo." Select the main branch.
4.  If your Terraform code is inside a subdirectory, specify the project root; otherwise, leave the field with its default value.
5.  Choose **Terraform** as the backend and keep the advanced configurations unchanged.

    ![The image shows a web interface for creating a new stack in Spacelift, with options to select a GitHub repository and branch. Various repositories are listed in a dropdown menu.](https://kodekloud.com/kk-media/image/upload/v1752884074/notes-assets/images/Spacelift-Elevate-Your-Infrastructure-Deployment-Creating-your-first-stack/spacelift-new-stack-interface-2.jpg)

    ![The image shows a web interface for creating a new stack in Spacelift, with options to configure the backend using tools like Terraform, Pulumi, CloudFormation, or Kubernetes.](https://kodekloud.com/kk-media/image/upload/v1752884076/notes-assets/images/Spacelift-Elevate-Your-Infrastructure-Deployment-Creating-your-first-stack/spacelift-new-stack-configuration.jpg)

6.  Leave additional settings (such as auto deploy or auto retry) at their defaults and click **Save Stack**.

    ![The image shows a web interface for creating a new stack in Spacelift, with options to configure stack behavior and advanced settings. The interface includes toggles for features like autodeploy and run promotion, and a section for customizing workflow commands.](https://kodekloud.com/kk-media/image/upload/v1752884078/notes-assets/images/Spacelift-Elevate-Your-Infrastructure-Deployment-Creating-your-first-stack/spacelift-new-stack-interface-3.jpg)

Your "Spacelift-demo" stack is now created and visible on your dashboard. Any changes pushed to your GitHub repository will automatically trigger a run in Spacelift.

## Triggering a New Run

To see Spacelift in action, make a slight modification to your Terraform configuration (such as adding a comment), then commit and push the change:

```
git add .
git commit -m "second commit"
git push
```

Once pushed, Spacelift detects the update and initiates a new run. The run status on the dashboard will change from "queued" to "preparing" as Spacelift initializes a containerized runner.

![The image shows a Spacelift dashboard with a tracked run for a project named "spacelift-demo," indicating a recent Git commit labeled "second commit."](https://kodekloud.com/kk-media/image/upload/v1752884079/notes-assets/images/Spacelift-Elevate-Your-Infrastructure-Deployment-Creating-your-first-stack/spacelift-dashboard-spacelift-demo-run.jpg)

During the run, you may see output logs indicating that Spacelift is initializing the Terraform backend and provider plugins. For example, the planning phase might display an error like this:

```
Error: configuring Terraform AWS Provider: no valid credential sources for Terraform AWS Provider found.


Please see https://registry.terraform.io/providers/hashicorp/aws for more information about providing credentials.


AWS Error: failed to refresh cached credentials, no EC2 IMDS role found, operation error ec2imds: GetMetadata, request canceled, context deadline exceeded


with provider["registry.terraform.io/hashicorp/aws"],
on main.tf line 11, in provider "aws":
11: provider "aws" {
[...]
```

> [!important]
> **Note**
>
> This error occurs because AWS credentials have not been provided. Ensure your AWS credentials are configured correctly before re-running the plan. Despite this error, the primary objective of the demonstration is to showcase the Spacelift workflow.

## Conclusion

This walkthrough has demonstrated how to create your first stack with Spacelift using a simple Terraform configuration. You now understand how to set up your repository, connect it with Spacelift, and trigger runs through Git operations. Happy deploying!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/spacelift-elevate-your-infrastructure-deployment/module/74dbb4df-716f-4fa2-92e9-a223a3a697ca/lesson/ffa70455-8277-4a65-8706-3f39c7cc71e4)**
>
> Watch video content
