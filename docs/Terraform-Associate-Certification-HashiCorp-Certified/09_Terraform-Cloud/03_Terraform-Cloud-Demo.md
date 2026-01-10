# Terraform Cloud Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Terraform-Cloud/Terraform-Cloud-Demo)

---

## Table of Contents

- Terraform Cloud Demo
  - 1. Creating a Terraform Cloud Account
  - 2. Setting Up a New Organization and Workspace
  - 3. Configuring Variables and Running Execution Plans
  - 4. Workspace Settings and Account Upgrades
  - 5. Cost Estimation and Policy Enforcement with Sentinel
  - 6. Organization Settings and Final Thoughts
  - Watch Video
    - 2.1 Create an Organization
    - 2.2 Create a Workspace
    - 3.1 Execute an Execution Plan
    - 3.2 Destroying Resources
    - 3.3 Handling GitHub Repository Changes
    - 5.1 Cost Estimation
    - 5.2 Enforcing Compliance with Sentinel Policies

---

## Content

Terraform Associate Certification: HashiCorp Certified

Terraform Cloud

# Terraform Cloud Demo

In this lesson, we will demonstrate how to use Terraform Cloud—from creating an account and setting up a workspace to executing plans and enforcing compliance with Sentinel policies. This comprehensive guide is designed to help you understand and optimize your Terraform Cloud workflow.

---

## 1\. Creating a Terraform Cloud Account

Begin by visiting [Terraform Cloud](https://app.terraform.io) and creating your free account. You can choose to sign in or register a new account by clicking "Free Account." Provide your username, email, and password, and be sure to accept the Terms of Use and Privacy Policy.

![The image shows a Terraform Cloud account creation page with fields for username, email, and password, alongside features and benefits of using Terraform Cloud.](https://kodekloud.com/kk-media/image/upload/v1752884106/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_50.jpg)

After registration, check your email for a confirmation message. Open the link provided to verify your email address.

![The image shows a web page for confirming an email address on Terraform's platform, with options to resend the confirmation link.](https://kodekloud.com/kk-media/image/upload/v1752884108/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_60.jpg)

Once confirmed, log in to Terraform Cloud. The dashboard initially shows your user settings such as username, email, and other profile details. Click the Terraform icon in the top left corner to access the main dashboard.

![The image shows a Terraform Cloud profile settings page, displaying options for username, email address, and avatar, with navigation links for user settings.](https://kodekloud.com/kk-media/image/upload/v1752884109/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_80.jpg)

If this is your first login, you will see the "Welcome to Terraform Cloud" page.

![The image shows a "Welcome to Terraform Cloud" page offering setup workflow options: "Try an example configuration" and "Start from scratch."](https://kodekloud.com/kk-media/image/upload/v1752884110/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_90.jpg)

---

## 2\. Setting Up a New Organization and Workspace

### 2.1 Create an Organization

Select **"Start from scratch"** to create your first organization. Provide a globally unique organization name. In this demo, we use:

KodeKloud-terraform-cloud-demo-01

The same email you registered with is used for the organization.

![The image shows a web interface for creating a new organization in Terraform Cloud, with fields for organization name and email address.](https://kodekloud.com/kk-media/image/upload/v1752884112/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_120.jpg)

### 2.2 Create a Workspace

After your organization is set up, create a workspace. A workspace in Terraform Cloud serves as your configuration directory (root module) where you manage configuration files, states, and variables. Choose from these workflow options:

1.  **Version Control Workflow** – Integrate directly with repositories from GitHub, GitLab, or Bitbucket.
2.  **CLI-driven Workflow** – Execute Terraform runs locally while operations are coordinated remotely.
3.  **API-driven Workflow** – Run Terraform operations using API integrations.

For this demo, select the **Version Control Workflow**.

![The image shows a Terraform Cloud interface for creating a new workspace, offering workflow options like version control, CLI-driven, and API-driven workflows.](https://kodekloud.com/kk-media/image/upload/v1752884113/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_170.jpg)

Terraform Cloud will prompt you to connect a version control provider (defaulting to GitHub if already logged in).

![The image shows a Terraform Cloud interface for creating a new workspace, with options to connect to version control providers like GitHub, GitLab, Bitbucket, and Azure DevOps.](https://kodekloud.com/kk-media/image/upload/v1752884114/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_200.jpg)

Select your GitHub account, then choose the repository containing your Terraform configuration files (for example, a repository named "Terraform Cloud Repository" with files such as `main.tf`, `provider.tf`, and Sentinel policy files).

![The image shows a Terraform Cloud interface for creating a new workspace, with options to choose a repository and connect to version control.](https://kodekloud.com/kk-media/image/upload/v1752884116/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_220.jpg)

Review the following example from your `main.tf` file, which provisions an AWS EC2 instance using predefined variables:

```
variable "ami" {}
variable "region" {}
variable "instance_type" {}
variable "access_key" {}
variable "secret_key" {}
variable "subnet_id" {}


resource "aws_instance" "terraform-cloud-demo-server" {
  ami           = var.ami
  instance_type = var.instance_type
  subnet_id     = var.subnet_id
  tags = {
    Name = "terraform-cloud-demo-server"
  }
}
```

Similarly, the `provider.tf` file configures the AWS provider with the same variables. After selecting the repository, name the workspace (for example, "Terraform Cloud") and click **Create Workspace**.

![The image shows a Terraform Cloud interface indicating successful configuration upload and workspace creation, with options to configure variables or start a new plan.](https://kodekloud.com/kk-media/image/upload/v1752884117/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_310.jpg)

---

## 3\. Configuring Variables and Running Execution Plans

Within the workspace, navigate through the following tabs: **Overview**, **Runs**, **State**, and **Variables**. The Overview displays workspace status, VCS integration details, and the current Terraform version (default is 1.1.1, although you can change it).

Since the configuration files only declare variables, set their values in the **Variables** tab. For example, add the following:

- ami: `ami-04505e74c0741db8d`
- region: `us-east-1`
- instance_type: `t2.micro`
- subnet_id: `subnet-0344bed8d8e0f1384`

Also, add AWS access and secret keys as sensitive variables—this ensures that once entered, they will remain masked.

![The image shows a Terraform Cloud workspace variables page with five variables listed, including "ami," "region," "instance_type," "subnet_id," and a sensitive "access_key."](https://kodekloud.com/kk-media/image/upload/v1752884118/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_510.jpg)

### 3.1 Execute an Execution Plan

After configuring the variables, start your first execution plan:

1.  Click the **Actions** button.
2.  Select **Start New Plan**.
3.  Choose **Plan (most common)**.

Terraform Cloud will generate an execution plan similar to running `terraform plan` on your local machine.

![The image shows a Terraform Cloud interface where a user is starting a new plan, selecting "Plan (most common)" as the plan type.](https://kodekloud.com/kk-media/image/upload/v1752884119/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_560.jpg)

Review the plan and then choose to either confirm and apply or discard it. If you discard, the Overview tab will update to reflect this choice. You can then create a new plan if desired, and confirm to apply it to provision the EC2 instance.

![The image shows a Terraform Cloud interface with a completed plan for creating an AWS instance, triggered by a user, indicating successful resource creation.](https://kodekloud.com/kk-media/image/upload/v1752884121/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_660.jpg)

When the plan is applied, the EC2 instance is created, and its resource details, including the provider and outputs, are displayed.

### 3.2 Destroying Resources

If you wish to destroy the resource, navigate to **Workspace Settings > Destruction & Deletion** to queue a destroy plan. This plan is equivalent to running `terraform destroy` on the command line. For example, the execution plan might include details such as:

```
ami: "ami-04505e74c0741db8d"
arn: "arn:aws:ec2:us-east-1:938059356357:instance/i-082d7c78db7ddc761"
associate_public_ip_address: false
availability_zone: "us-east-1a"
cpu_core_count: 1
cpu_threads_per_core: 1
disable_api_termination: false
ebs_optimized: false
get_password_data: false
hibernation: false
iam_instance_profile: ""
id: "i-082d7c78db7ddc761"
instance_initiated_shutdown_behavior: "stop"
instance_state: "running"
instance_type: "t2.micro"
ipv6_address_count: 0
ipv6_addresses: []
```

After the destroy plan is applied, the Overview tab will confirm that no resources remain.

### 3.3 Handling GitHub Repository Changes

Terraform Cloud automatically triggers a new execution plan upon changes pushed to your GitHub repository. For instance, if you modify the resource name in `main.tf`:

```
variable "ami" {}
variable "region" {}
variable "instance_type" {}
variable "access_key" {}
variable "secret_key" {}
variable "subnet_id" {}


resource "aws_instance" "terraform-cloud-demo-server" {
  ami           = var.ami
  instance_type = var.instance_type
  subnet_id     = var.subnet_id
  tags = {
    Name = "terraform-cloud-demo-server"
  }
}
```

A new plan is triggered by GitHub commits to the main branch. Once confirmed and applied, the updated state is reflected in the **State** tab where you can review the current `terraform.tfstate` stored remotely.

A sample state snippet might look like:

```
{
  "volume_size": 8,
  "volume_type": "gp2",
  "secondary_private_ips": [],
  "security_groups": [
    "default"
  ],
  "source_dest_check": true,
  "subnet_id": "subnet-0344bed8d8e0f1384",
  "tags": {
    "Name": "terraform-cloud-demo-server"
  },
  "tags_all": {
    "Name": "terraform-cloud-demo-server"
  },
  "default": ""
}
```

![The image shows a Terraform Cloud workspace interface displaying current and past runs, with details like branch, status, and trigger source.](https://kodekloud.com/kk-media/image/upload/v1752884122/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_830.jpg)

---

## 4\. Workspace Settings and Account Upgrades

Within your workspace settings, you can modify:

- **Execution Mode:** Choose between remote and local execution.
- **Apply Method:** Select manual or auto-apply.
- **Terraform Version:** Change the version (default is 1.1.1).

Locking a workspace prevents concurrent plans, and version control settings display which repository is connected.

![The image shows a Terraform Cloud settings page for version control, connected to a GitHub repository, with options for automatic run triggering and speculative plans.](https://kodekloud.com/kk-media/image/upload/v1752884123/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752884123/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_1000.jpg)

To manage your organization, access the user settings on the left to update organization details (like password changes and two-factor authentication). Organization-specific settings allow you to review the organization name and manage deletion if necessary.

![The image shows the general settings page of a Terraform Cloud organization, with options to update organization details or delete the organization.](https://kodekloud.com/kk-media/image/upload/v1752884124/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_1050.jpg)

The **Plan & Billing** tab displays your current free plan (supporting up to five users) and offers comparisons for upgrading to more advanced plans. Upgrading to a trial plan for team accounts is available without requiring a credit card.

![The image shows a "Plan & Billing" page for Terraform Cloud, offering a 30-day free trial and displaying a current free plan with one active user.](https://kodekloud.com/kk-media/image/upload/v1752884125/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_1060.jpg)

You can manage teams under the **Teams** section—by default, an "owners" team exists. You can add new users and create API tokens as necessary.

![The image shows a settings page for a team named "owners" in a cloud platform, with options for visibility and API token management.](https://kodekloud.com/kk-media/image/upload/v1752884126/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_1080.jpg)

Manage individual users in the **Users** section, and assign them to teams such as "owners."

![The image shows a user management interface in Terraform Cloud, displaying one active user with the email "terraform-cloud-demo-user@kodekloud.com" under the "Users" section.](https://kodekloud.com/kk-media/image/upload/v1752884127/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_1090.jpg)

Upgrade via the plan comparisons page to access additional features like creating extra teams and integrations.

![The image shows a pricing plan page for Terraform Cloud, detailing Free, Trial, Team, and Team & Governance options with features and costs.](https://kodekloud.com/kk-media/image/upload/v1752884129/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_1120.jpg)

After upgrading to a trial plan, you gain access to features such as additional team creation and cost estimation capabilities.

![The image shows a "Team Management" page from Terraform Cloud, allowing users to create and manage teams with specific access control settings.](https://kodekloud.com/kk-media/image/upload/v1752884130/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_1170.jpg)

---

## 5\. Cost Estimation and Policy Enforcement with Sentinel

### 5.1 Cost Estimation

Terraform Cloud offers a cost estimation feature to help you monitor resource expenditure. To explore this:

1.  Queue a destroy plan for the existing EC2 instance and confirm the action.
2.  During the destroy run, check the cost estimation tab, which might indicate savings (e.g., saving $9.43 by destroying the resource).

Once the resource is destroyed, create a new plan to provision the instance. The cost estimation stage will now display the estimated monthly cost (for example, $8.63).

![The image shows a Terraform Cloud interface with a destroy run triggered, indicating one AWS instance to be destroyed. The plan and cost estimation are finished.](https://kodekloud.com/kk-media/image/upload/v1752884131/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_1220.jpg)

After confirming and applying the plan, the instance is created. The Overview tab will then display updated resource details, including cost estimations.

![The image shows a Terraform Cloud interface with a completed run for "test cost estimation," indicating successful planning, cost estimation, and application of resources.](https://kodekloud.com/kk-media/image/upload/v1752884133/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_1290.jpg)

![The image shows a Terraform Cloud workspace overview, displaying details of the latest run, including cost estimation, resources changed, and execution metrics.](https://kodekloud.com/kk-media/image/upload/v1752884134/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_1310.jpg)

### 5.2 Enforcing Compliance with Sentinel Policies

Terraform Sentinel allows you to enforce compliance constraints as code. In this demo, we restrict the allowed EC2 instance type.

Follow these steps:

1.  Go to **Settings** in your workspace and select **Policies and Policy Sets**.
2.  Click **Connect a New Policy Set**.
3.  Choose GitHub as your VCS provider and select the repository containing your Sentinel policy files (this example repository includes Terraform Sentinel policy examples for AWS).

![The image shows a Terraform Cloud interface for connecting a policy set to a version control provider, with options for GitHub and other VCS connections.](https://kodekloud.com/kk-media/image/upload/v1752884135/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_1370.jpg)

After connecting, name your policy set (for example, "policy set one") and select your desired workspace scope (either all workspaces or selected ones).

![The image shows a Terraform Cloud interface for connecting a policy set, allowing users to choose a repository for hosting Terraform source code.](https://kodekloud.com/kk-media/image/upload/v1752884137/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_1390.jpg)

Within your GitHub repository, create a Sentinel policy file (`restrict-ec2-instance-type.sentinel`) with the following content:

```
# This policy uses the Sentinel tfplan/v2 import to require that
import "tfplan-functions" as plan


# Allowed EC2 Instance Types
# Include "null" to allow missing or computed values
allowed_types = ["t2.micro"]


# Get all EC2 instances
allEC2Instances = plan.find_resources("aws_instance")


# Filter to EC2 instances with violations (prints warnings for violations)
violatingEC2Instances = plan.filter_attribute_not_in_list(allEC2Instances, "instance_type", allowed_types, true)


# Count violations
violations = length(violatingEC2Instances["messages"])


# Main rule: no violations allowed
main = rule {
    violations == 0
}
```

This policy permits only instances with the type `t2.micro`. The enforcement level is set to **soft-mandatory**, which informs you of policy violations while still allowing you to override them if necessary.

A typical Sentinel policy module configuration might look like:

```
module "tfplan-functions" {
  source = "../common-functions/tfplan-functions.sentinel"
}


module "tfstate-functions" {
  source = "../common-functions/tfstate-functions.sentinel"
}


module "tfconfig-functions" {
  source = "../common-functions/tfconfig-functions.sentinel"
}


module "aws-functions" {
  source = "./aws-functions/aws-functions.sentinel"
}


policy "restrict-ec2-instance-type.sentinel" {
  source            = "./restrict-ec2-instance-type.sentinel"
  enforcement_level = "soft-mandatory"
}
```

Update your policy set configuration with the correct custom paths for your policy definitions and click **Update Policy Set**.

![The image shows the "Policy Sets" page in Terraform Cloud, displaying a policy set named "policyset1" with options for managing Sentinel policies.](https://kodekloud.com/kk-media/image/upload/v1752884138/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_1430.jpg)

To test policy enforcement, update your workspace's variable for `instance_type` from `t2.micro` to another value, such as `m5.large`, then run a new execution plan.

![The image shows a Terraform Cloud interface displaying workspace variables, including keys like "ami," "region," and "instance_type," with some marked as sensitive.](https://kodekloud.com/kk-media/image/upload/v1752884139/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_1610.jpg)

During the plan execution, Terraform Cloud will perform a policy check. Since `m5.large` is not allowed according to the Sentinel policy, the check will soft-fail and produce an error message similar to:

```
1 points evaluated.


## Policy 1: policyset1/restrict-ec2-instance-type.sentinel (soft-mandatory)


Result: false


Description:
This policy uses the Sentinel tfplan/v2 import to require that all EC2 instances have instance types from an allowed list


Print messages:
aws_instance.terraform-cloud-demo has instance_type with value m5.large that is not in the allowed list: [t2.micro]


./restrict-ec2-instance-type.sentinel:24:1 - Rule "main"
Description:
Main rule


Value:
false
```

> [!important]
> **Note**
>
> As the organization owner, you have the ability to override the policy error and proceed with the updated configuration.

Upon confirmation, the resource is recreated with the modified instance type, and the updated state is visible in the **State** tab.

---

## 6\. Organization Settings and Final Thoughts

Review and update your organization settings by navigating to your organization page (e.g., `KodeKloud-Terraform-Cloud-Demo01`). Here, you can adjust details, manage teams, and view billing information.

![The image shows a Terraform Cloud workspace interface with one workspace named "terraform-cloud," which has a run status of "Applied" and indicates success.](https://kodekloud.com/kk-media/image/upload/v1752884140/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_1040.jpg)

![The image shows a Terraform Cloud settings page for version control, connected to a GitHub repository, with options for automatic run triggering and speculative plans.](https://kodekloud.com/kk-media/image/upload/v1752884123/notes-assetshttps://kodekloud.com/kk-media/image/upload/v1752884123/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Terraform-Cloud-Demo/frame_1000.jpg)

This lesson provided a comprehensive walkthrough of using Terraform Cloud—from account creation to advanced policy enforcement with Sentinel. For further insights, explore the accompanying multiple-choice quiz to test your knowledge of Terraform Cloud features.

Happy provisioning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/5a83b210-e98f-4f9b-9c4e-a2b03d28d619/lesson/b4f0a62d-042e-4619-90a8-53134e3da7d1)**
>
> Watch video content
