# Lab Solution Terraform to GitHub - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Terraform-Cloud-Workflows/Lab-Solution-Terraform-to-GitHub)

---

## Table of Contents

- Lab Solution Terraform to GitHub
  - 1. Create a GitHub Repository
  - 2. Generate a GitHub Personal Access Token
  - 3. Clone the Repository Locally
  - 4. Configure GitHub as a VCS Provider in Terraform Cloud
  - 5. Associate the Workspace with Your GitHub Repository
  - 6. Verify the Connection and Trigger a Run
  - Conclusion
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

HashiCorp : Terraform Cloud

Terraform Cloud Workflows

# Lab Solution Terraform to GitHub

In this tutorial, you’ll learn how to integrate **Terraform Cloud** with your **GitHub** account to enable the Version Control Workflow. By registering GitHub as a VCS provider, any commit to your repository automatically triggers `terraform init`, `plan`, and `apply` in Terraform Cloud.

**Prerequisite**: A GitHub account.

---

## 1\. Create a GitHub Repository

1.  Log in to GitHub and click **New** repository.
2.  Configure the repository as follows:

| Setting             | Value                      |
| ------------------- | -------------------------- |
| Repository name     | `clumsy_bird`              |
| Description         | _Your project description_ |
| Visibility          | Private                    |
| Initialize with     | README                     |
| .gitignore template | Terraform                  |

3.  Click **Create repository**.

---

## 2\. Generate a GitHub Personal Access Token

You need a **Personal Access Token (PAT)** with `repo` scope to allow Terraform Cloud to read your repository.

1.  In GitHub, go to **Settings > Developer settings > Personal access tokens**.
2.  Click **Generate new token**, select **repo** scope, then **Generate token**.
3.  Copy the token now—you won’t be able to see it again.

![The image shows a GitHub settings page for personal access tokens, displaying generated tokens with options to delete or generate new ones.](https://kodekloud.com/kk-media/image/upload/v1752878900/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-to-GitHub/github-settings-personal-access-tokens.jpg)

> [!important]
> **Warning**
>
> Keep your PAT secure. Do not commit it to any repository or share it publicly.

---

## 3\. Clone the Repository Locally

In your local or lab environment, clone and push the initial commit:

```
cd ~/VCS
git clone https://github.com/<your-org>/clumsy_bird.git
cd clumsy_bird


# Add your Terraform code or update README
git add .
git commit -m "Initial Terraform configuration"
git push origin main
```

Verify the three files (`README.md`, `.gitignore`, your Terraform code) in GitHub:

![The image shows a GitHub repository named "clumsy_bird" with several files related to Terraform configuration. It includes details like commit messages and timestamps.](https://kodekloud.com/kk-media/image/upload/v1752878901/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-to-GitHub/clumsy-bird-github-repo-terraform.jpg)

---

## 4\. Configure GitHub as a VCS Provider in Terraform Cloud

1.  In Terraform Cloud, navigate to **Settings > VCS Providers**.
2.  Click **Connect new provider** → **GitHub**.
3.  Follow the instructions to register a new OAuth application on GitHub:

![The image shows a setup page for connecting a version control system (VCS) provider to Terraform Cloud, with instructions for registering a new OAuth application on GitHub. The sidebar includes options like Plan & Billing, Security, and Version Control.](https://kodekloud.com/kk-media/image/upload/v1752878903/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-to-GitHub/vcs-connection-setup-terraform-cloud.jpg)

![The image shows a setup guide for connecting GitHub to Terraform Cloud, including instructions for registering a new OAuth application and entering details like application name, homepage URL, and authorization callback URL.](https://kodekloud.com/kk-media/image/upload/v1752878904/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-to-GitHub/github-terraform-cloud-setup-guide.jpg)

4.  After registering the app, copy the **Client ID** and **Client Secret**:

![The image shows a settings page for a Terraform Cloud application on GitHub, displaying details like the client ID and client secrets, with options to manage user tokens and generate new secrets.](https://kodekloud.com/kk-media/image/upload/v1752878905/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-to-GitHub/terraform-cloud-github-settings-page.jpg)

5.  Back in Terraform Cloud, enter the **Client ID**, **Client Secret**, and click **Connect and continue**. Then authorize the OAuth app.

> [!important]
> **Note**
>
> If you prefer SSH-based access instead of HTTPS, generate an SSH key pair and upload the public key in your GitHub OAuth settings:
>
> ```
> ssh-keygen -t rsa -m PEM -f "~/.ssh/service_terraform" -C "service_terraform_enterprise"
> ```

Once connected, GitHub appears as a VCS provider:

![The image shows a VCS Providers settings page for GitHub in Terraform Cloud, displaying details like callback URL, HTTP URL, API URL, creation date, and OAuth token ID. There are options to edit or delete the client and add a VCS provider.](https://kodekloud.com/kk-media/image/upload/v1752878906/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-to-GitHub/github-vcs-providers-settings-terraform.jpg)

---

## 5\. Associate the Workspace with Your GitHub Repository

1.  In your Terraform Cloud workspace, go to **Settings > Version Control Workflow**.
2.  Select the GitHub provider and choose your repository (`<your-org>/clumsy_bird`).

![The image shows a Terraform Cloud interface where a user is choosing a repository for version control. The selected repository is "gmaentz/clumsy_bird" from a list of available repositories.](https://kodekloud.com/kk-media/image/upload/v1752878908/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-to-GitHub/terraform-cloud-repository-selection-gmaentz.jpg)

3.  Enable the following options:

| Option                 | Description                                     |
| ---------------------- | ----------------------------------------------- |
| Auto Apply             | Automatically apply approved plans              |
| Automatic Run Triggers | Trigger runs on VCS events                      |
| Speculative Plans      | Create a plan on pull requests without applying |

4.  Click **Save settings**.

![The image shows a settings page for a workspace in Terraform Cloud, focusing on run triggers, version control, and pull request options. It includes options for automatic run triggering and other settings related to version control and submodules.](https://kodekloud.com/kk-media/image/upload/v1752878909/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-to-GitHub/terraform-cloud-workspace-settings-page.jpg)

---

## 6\. Verify the Connection and Trigger a Run

After saving, Terraform Cloud will detect the latest commit and automatically start a run. In the workspace overview, you’ll see the plan and apply details:

![The image shows a Terraform Cloud workspace overview for "devops-aws-myapp-dev," displaying details of the latest run, including resource changes and configuration updates.](https://kodekloud.com/kk-media/image/upload/v1752878910/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-to-GitHub/terraform-cloud-workspace-devops-aws.jpg)

You can inspect the commit that triggered the run. For example, this simple deployment script runs as part of a Terraform provisioner:

```
#!/bin/bash
sudo apt -y update
sudo apt -y install cowsay unzip git build-essential nodejs curl npm node-grunt-cli


# Clone Clumsy Bird application
mkdir -p /src
git clone https://github.com/ellisonleao/clumsy-bird /src/clumsy-bird
```

Once connected, any future commit to `clumsy_bird` will kick off `terraform init`, `plan`, and `apply` in Terraform Cloud:

![The image shows a Terraform Cloud interface displaying a successful run of a Terraform configuration upload from GitHub, with details about the commit and execution. The plan and apply processes have finished, adding 23 resources.](https://kodekloud.com/kk-media/image/upload/v1752878911/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Terraform-to-GitHub/terraform-cloud-successful-run-github.jpg)

---

## Conclusion

You have successfully linked **Terraform Cloud** with **GitHub** using the Version Control Workflow. Every code change now triggers automated infrastructure provisioning.

---

## Links and References

- [Terraform Cloud Version Control Workflow](https://developer.hashicorp.com/terraform/cloud/vcs)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Terraform Cloud](https://www.terraform.io/cloud)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/8dc830bd-1e70-4a76-bc45-b417ff7c1771/lesson/f7384291-f095-4935-94ff-f4409dc44fbd)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/8dc830bd-1e70-4a76-bc45-b417ff7c1771/lesson/2126326e-6db6-4ed8-b2ab-03b910147f90)**
>
> Practice lab
