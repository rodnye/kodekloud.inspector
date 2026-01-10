# Managing Policies using the UI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Create-Vault-Policies/Managing-Policies-using-the-UI)

---

## Table of Contents

- Managing Policies using the UI
  - Accessing the Policies Tab
  - Viewing and Managing Policies
  - Creating a New ACL Policy
  - Further Reading and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Create Vault Policies

# Managing Policies using the UI

Vault provides an intuitive web interface for creating, viewing, editing, and deleting ACL policies. Use the top navigation bar to quickly switch between **Secrets**, **Access**, **Policies**, and **Tools**.

![The image is a screenshot of a user interface for managing policies in Vault, showing options to create, view, edit, or delete ACL policies. It includes labeled arrows indicating actions like downloading or editing policies.](https://kodekloud.com/kk-media/image/upload/v1752878142/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Managing-Policies-using-the-UI/vault-acl-policies-management-ui-screenshot.jpg)

## Accessing the Policies Tab

1.  Click on the **Policies** tab (highlighted by the pink arrow in the screenshot).
2.  Vault lists all ACL policies, including built-in and any custom policies you’ve defined.

> [!important]
> **Built-in Policies**
>
> By default, Vault includes two core policies:
>
> | Policy  | Description                                |
> | ------- | ------------------------------------------ |
> | default | Minimal access scope applied to all tokens |
> | root    | Full administrative access                 |

In this example, you’ll also see a custom **Admin Policy** listed alongside the built-in entries.

## Viewing and Managing Policies

- Click a policy’s **name** to open its rule editor.
- Click the **⋮ (three-dot) menu** on the right to:
  - Download the policy file
  - View policy details in a modal
  - Edit the policy rules inline
  - Delete the policy

> [!important]
> **Editing Live Policies**
>
> Changes take effect immediately for all tokens bound to the policy. Always review your updates before saving.

## Creating a New ACL Policy

1.  Click **Create ACL Policy** on the right.
2.  Enter a **unique name** for your policy.
3.  Paste your HCL or JSON rule definitions into the editor.
4.  Click **Save** to apply the new policy.

## Further Reading and References

- [Vault ACL Policies](https://www.vaultproject.io/docs/concepts/policies)
- [HCL Language Documentation](https://github.com/hashicorp/hcl)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/83a61f63-3f1f-436c-8aa3-e972b099eeec/lesson/0e2587e8-2a44-46c1-89f6-afd362155a8e)**
>
> Watch video content
