# Lab Solution Sign Up Setup - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Terraform-Cloud-Setup/Lab-Solution-Sign-Up-Setup)

---

## Table of Contents

- Lab Solution Sign Up Setup
  - Table of Contents
  - Task 1: Sign Up for Terraform Cloud
  - Task 2: Create a Terraform Cloud Organization
  - Task 3: Authenticate via the CLI
  - Summary of Tasks
  - Links and References
  - Watch Video

---

## Content

HashiCorp : Terraform Cloud

Terraform Cloud Setup

# Lab Solution Sign Up Setup

Welcome to this hands-on lab. In this guide, you’ll sign up for Terraform Cloud, create your first organization, and integrate the Terraform CLI with Terraform Cloud. By the end, you’ll be ready to manage infrastructure seamlessly across any cloud.

![The image shows a webpage from KodeKloud about Terraform Cloud signup and setup, with a terminal interface on the right side.](https://kodekloud.com/kk-media/image/upload/v1752878842/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Sign-Up-Setup/kodekloud-terraform-cloud-signup-setup.jpg)

---

## Table of Contents

- [Task 1: Sign Up for Terraform Cloud](#task-1-sign-up-for-terraform-cloud)
- [Task 2: Create a Terraform Cloud Organization](#task-2-create-a-terraform-cloud-organization)
- [Task 3: Authenticate via the CLI](#task-3-authenticate-via-the-cli)
- [Summary of Tasks](#summary-of-tasks)
- [Links and References](#links-and-references)

---

## Task 1: Sign Up for Terraform Cloud

Begin by navigating to the Terraform website:

1.  Go to terraform.io and click **Try Terraform Cloud**.
2.  On the signup form, enter your desired **Username**, **Email**, and **Password**, then submit.

![The image shows a webpage for HashiCorp Terraform, highlighting options for automating infrastructure on any cloud with links to download the open-source version or try Terraform Cloud.](https://kodekloud.com/kk-media/image/upload/v1752878843/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Sign-Up-Setup/hashicorp-terraform-automation-webpage.jpg)

![The image shows a Terraform Cloud account creation page with fields for username, email, and password, alongside a section highlighting the benefits of using Terraform Cloud.](https://kodekloud.com/kk-media/image/upload/v1752878844/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Sign-Up-Setup/terraform-cloud-account-creation-page.jpg)

> [!important]
> **Note**
>
> If you already have an account, click **Sign In** instead of creating a new one.

---

## Task 2: Create a Terraform Cloud Organization

Once you’re logged in, Terraform Cloud prompts you to create a new organization if none exists. Organization names must be unique across all Terraform Cloud users.

1.  Enter a globally unique **Organization Name**.
2.  Confirm your email address.
3.  Click **Create organization**.

![The image shows a webpage for creating a new organization in Terraform Cloud, with fields for organization name and email address. There is a button labeled "Create organization" at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752878845/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Sign-Up-Setup/terraform-cloud-create-organization-page.jpg)

In this lab, our example org is named **Mastering Terraform Cloud**. You’ll see the new organization dashboard, ready for workspace and settings configuration.

---

## Task 3: Authenticate via the CLI

To link your local Terraform CLI to Terraform Cloud, generate an API token:

1.  Run the login command in your terminal:

    ```
    terraform login
    ```

2.  When prompted, confirm by typing `yes`:

    ```
    Do you want to proceed?
    Only 'yes' will be accepted to confirm.
    Enter a value: yes
    ```

3.  Terraform opens a browser window to the tokens page:

    ```
    Open the following URL to access the tokens page for app.terraform.io:
    https://app.terraform.io/app/settings/tokens?source=terraform-login
    ```

4.  On the Terraform Cloud website, create a new token (e.g., **Terraform login – Mastering Terraform Cloud**) and copy it.

![The image shows a web page with a pop-up window displaying a newly created API token for Terraform Cloud. The token is shown with an option to copy it, and there is a "Done" button at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752878846/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Sign-Up-Setup/terraform-cloud-api-token-popup.jpg)

5.  Paste the token back into the CLI (it will be hidden as you type):

    ```
    Token for app.terraform.io:
    Enter a value: <paste-your-token>
    ```

Upon successful authentication, you’ll see a confirmation message:

```
Retrieved token for user <your_username>
Welcome to Terraform Cloud!
Documentation: terraform.io/docs/cloud
New to TFC? Follow these steps to instantly apply an example configuration:
  $ git clone https://github.com/hashicorp/tfc-getting-started.git
  $ cd tfc-getting-started
  $ scripts/setup.sh
```

> [!important]
> **Warning**
>
> Your API token is stored in plain text at `~/.terraform.d/credentials.tfrc.json`. To remove it, run:
>
> ```
> terraform logout
> ```

---

## Summary of Tasks

| Task                              | Description                                            |
| --------------------------------- | ------------------------------------------------------ |
| 1\\. Sign Up for Terraform Cloud  | Create your free Terraform Cloud account               |
| 2\\. Create a Terraform Cloud Org | Choose a unique name and confirm your email            |
| 3\\. Authenticate via the CLI     | Generate and store an API token for `app.terraform.io` |

---

## Links and References

- [Terraform Cloud Documentation](https://www.terraform.io/docs/cloud)
- [Terraform CLI Reference](https://www.terraform.io/docs/cli)
- [Terraform Getting Started Examples](https://github.com/hashicorp/tfc-getting-started)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/f0c13760-a79c-42c2-a089-44f1c0a59bee/lesson/6e792ad8-1137-42a2-a8fb-22241d2ae73e)**
>
> Watch video content
