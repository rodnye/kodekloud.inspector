# Lab Solution Version Compatibility - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Terraform-Cloud/Advanced-Topics/Lab-Solution-Version-Compatibility)

---

## Table of Contents

- Lab Solution Version Compatibility
  - Terraform Cloud Run Types
  - 1. Launch a Speculative Plan
  - 2. Execute the Speculative Plan
  - 3. Review and Validate the Plan
  - 4. Next Steps
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

HashiCorp : Terraform Cloud

Advanced Topics

# Lab Solution Version Compatibility

Terraform’s core is updated frequently, and new features or behaviors can introduce breaking changes. To keep your infrastructure code up to date—and avoid surprises in production—you can use Terraform Cloud’s speculative plan (plan-only run) to validate your configurations against a newer Terraform version without touching state or resources. In this lab, you’ll:

- Open the **DevOps AWS MyApp Dev** workspace
- Trigger a speculative plan using Terraform **v1.3.0**
- Confirm that your code remains compatible before upgrading

---

## Terraform Cloud Run Types

| Run Type    | Description                                             | State Impact            |
| ----------- | ------------------------------------------------------- | ----------------------- |
| Plan        | Preview changes, then apply automatically if approved   | No change until apply   |
| Plan (only) | Generate a plan but do **not** apply or update state    | **No** state change     |
| Apply       | Execute changes to real infrastructure and update state | Yes, modifies resources |

---

## 1\. Launch a Speculative Plan

1.  In Terraform Cloud, navigate to the **DevOps AWS MyApp Dev** workspace.
2.  Click **Actions** → **Start new run**.
3.  Under **Run type**, select **Plan (only)**.
4.  From the **Terraform version** dropdown, choose **v1.3.0** (or any newer version).

![The image shows a dialog box titled "Start a new run" in a software interface, with options to choose the reason for starting the run, run type, and Terraform version, along with "Start run" and "Cancel" buttons.](https://kodekloud.com/kk-media/image/upload/v1752878710/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Version-Compatibility/start-new-run-dialog-box-options.jpg)

> [!important]
> **Note**
>
> Speculative plans do not apply changes or update the state file. Use them to safely validate configuration compatibility.

---

## 2\. Execute the Speculative Plan

Click **Start run**. Terraform Cloud will now only run the plan phase using Terraform **v1.3.0**, leaving your existing resources untouched. You can monitor progress in the UI.

![The image shows a Terraform Cloud interface where a speculative plan has been triggered via the UI for a development workspace. The plan is currently running, and cost estimation is pending.](https://kodekloud.com/kk-media/image/upload/v1752878711/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Version-Compatibility/terraform-cloud-speculative-plan-running.jpg)

---

## 3\. Review and Validate the Plan

Once the run finishes, review the output. A clean plan with zero changes confirms compatibility with Terraform **v1.3.0**.

![The image shows a Terraform Cloud interface displaying a completed speculative plan run with no changes needed, and a cost estimation for AWS resources.](https://kodekloud.com/kk-media/image/upload/v1752878713/notes-assets/images/HashiCorp-Terraform-Cloud-Lab-Solution-Version-Compatibility/terraform-cloud-speculative-plan-aws.jpg)

---

## 4\. Next Steps

- If the speculative plan reports no errors or unexpected diffs, update your workspace’s Terraform version to **v1.3.0**.
- Perform a full **Plan & Apply** run in Terraform Cloud to implement any pending changes under the new version.
- Regularly use speculative plans when adopting upcoming Terraform releases or major provider updates.

---

## Links and References

- [Terraform Cloud Runs](https://www.terraform.io/docs/cloud/run/index.html)
- [Terraform Version Constraints](https://www.terraform.io/docs/language/settings/version.html)
- [Terraform Upgrade Guides](https://www.terraform.io/upgrade-guides)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/f7d08e72-e35f-436f-8d42-d0d7364d2532/lesson/78dd2681-bd0f-40b0-b2fe-4dfec30cca2a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-terraform-cloud/module/f7d08e72-e35f-436f-8d42-d0d7364d2532/lesson/714a6f5e-2cf6-4d08-b38c-2e3e39160978)**
>
> Practice lab
