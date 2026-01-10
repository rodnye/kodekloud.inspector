# Demo Migrating existing Terraform configuration to OpenTofu - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Beyond-Basics/Demo-Migrating-existing-Terraform-configuration-to-OpenTofu)

---

## Table of Contents

- Demo Migrating existing Terraform configuration to OpenTofu
  - 1. Apply the Initial Terraform Configuration
  - 2. Install OpenTofu
  - 3. Backup the Terraform State
  - 4. Initialize with OpenTofu
  - 5. Preview the OpenTofu Plan
  - 6. Update the main.tf for OpenTofu
  - 7. Apply with OpenTofu
  - 8. Roll Back to Terraform
  - Links and References
  - Watch Video
  - Practice Lab
    - Automated Debian/Ubuntu Installer

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Beyond Basics

# Demo Migrating existing Terraform configuration to OpenTofu

In this guide, you’ll learn how to migrate an existing Terraform project to OpenTofu, verify the changes, and then roll back to Terraform. We’ll cover:

- Applying the initial Terraform configuration
- Installing OpenTofu
- Backing up state files
- Initializing and planning with OpenTofu
- Updating resources and applying changes
- Rolling back to Terraform

---

## 1\. Apply the Initial Terraform Configuration

1.  Navigate to your project directory and review **main.tf**:

    ```
    resource "local_file" "file" {
      filename = "terraform.txt"
      content  = "This file has been created with Terraform"
    }
    ```

2.  Initialize and apply:

    ```
    cd ~/opentofu-projects/migration
    terraform init
    terraform apply
    ```

3.  When prompted, enter `yes`. You should see:

    ```
    local_file.file: Creating...
    local_file.file: Creation complete after 0s [id=342bd3c96f4da9100a6360378942400b96bfb5]
    Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
    ```

4.  Verify that **terraform.txt** exists with the correct content.

---

## 2\. Install OpenTofu

Refer to the [OpenTofu installation guide](https://docs.opentofu.org/intro/getting-started/#installation) and select the installer for your OS.

> [!important]
> **Note**
>
> Make sure to check your distribution using `cat /etc/os-release` before running the installer.

![The image shows a webpage for installing OpenTofu, detailing various installation methods for different operating systems like Alpine Linux, Debian, Fedora, and more. The page includes a navigation menu on the left and installation options in the main section.](https://kodekloud.com/kk-media/image/upload/v1752882836/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-Migrating-existing-Terraform-configuration-to-OpenTofu/opentofu-installation-methods-webpage.jpg)

### Automated Debian/Ubuntu Installer

```
curl --proto '=https' --tlsv1.2 -fsSL https://get.opentofu.org/install-opentofu.sh -o install-opentofu.sh
chmod +x install-opentofu.sh
./install-opentofu.sh --install-method deb
rm install-opentofu.sh
```

Or bundle the commands in **install.sh**:

```
#!/bin/bash
curl --proto '=https' --tlsv1.2 -fsSL https://get.opentofu.org/install-opentofu.sh -o install-opentofu.sh
chmod +x install-opentofu.sh
./install-opentofu.sh --install-method deb
rm install-opentofu.sh
```

Then run:

```
chmod +x install.sh
./install.sh
```

Verify the installation:

```
tofu version
```

---

## 3\. Backup the Terraform State

> [!important]
> **Warning**
>
> Always archive your existing Terraform state before migrating. Losing state can lead to resource drift or duplicates.

```
tar czf terraform.tfstate.tar.gz terraform.tfstate
```

Confirm the archive:

```
ls
# install.sh  main.tf  terraform.tfstate  terraform.tfstate.tar.gz
```

---

## 4\. Initialize with OpenTofu

Switch to the OpenTofu workflow:

```
tofu init
```

---

## 5\. Preview the OpenTofu Plan

Compare the two workflows with this quick reference:

| Action     | Terraform Command    | OpenTofu Command |
| ---------- | -------------------- | ---------------- |
| Initialize | `terraform init`     | `tofu init`      |
| Plan       | `terraform plan`     | `tofu plan`      |
| Validate   | `terraform validate` | `tofu validate`  |
| Apply      | `terraform apply`    | `tofu apply`     |

Run the plan:

```
tofu plan
```

You should see the same `local_file.file` resource with `filename = "terraform.txt"`.

---

## 6\. Update the main.tf for OpenTofu

Change **main.tf** to point to a new file and content:

```
resource "local_file" "file" {
  filename = "opentofu.txt"
  content  = "This file has been created with OpenTofu"
}
```

Validate the updated configuration:

```
tofu validate
```

---

## 7\. Apply with OpenTofu

Apply the OpenTofu configuration:

```
tofu apply
```

Type `yes` when prompted.

![The image shows a split screen with a task interface on the left, indicating progress in a task related to applying changes using OpenTofu, and a code editor on the right displaying a file structure and terminal output related to a Terraform project.](https://kodekloud.com/kk-media/image/upload/v1752882837/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-Migrating-existing-Terraform-configuration-to-OpenTofu/opentofu-task-interface-terraform-project.jpg)

Confirm that **opentofu.txt** has been created with the new content.

---

## 8\. Roll Back to Terraform

1.  **Backup the OpenTofu state:**

    ```
    tar czf terraform.tfstate.tar.gz terraform.tfstate
    ```

2.  **Re-initialize with Terraform:**

    ```
    terraform init
    ```

    ![The image shows a coding environment with a task to initialize a configuration directory using Terraform. The terminal indicates that Terraform has been successfully initialized.](https://kodekloud.com/kk-media/image/upload/v1752882838/notes-assets/images/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform-Demo-Migrating-existing-Terraform-configuration-to-OpenTofu/terraform-initialize-configuration-directory.jpg)

3.  **Revert main.tf to the original Terraform resource:**

    ```
    resource "local_file" "file" {
      filename = "terraform.txt"
      content  = "This file has been created with Terraform"
    }
    ```

4.  **Apply with Terraform:**

    ```
    terraform apply
    ```

    Enter `yes` and observe:

    ```
    Plan: 1 to add, 0 to change, 1 to destroy.
    Enter a value: yes
    local_file.file: Destroying... [id=91b198b8059c5f72782d9c1d1fe18f6d]
    local_file.file: Destruction complete after 0s
    local_file.file: Creating...
    local_file.file: Creation complete after 0s [id=342bd3c9e4fda9100a36097894200e96b]
    Apply complete! Resources: 1 added, 0 changed, 1 destroyed.
    ```

You’ve now successfully migrated to OpenTofu and rolled back to Terraform!

---

## Links and References

- [Terraform Documentation](https://www.terraform.io/docs)
- [OpenTofu Getting Started](https://docs.opentofu.org/intro/getting-started/)
- [Terraform local_file Resource](https://registry.terraform.io/providers/hashicorp/local/latest/docs/resources/file)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/5a06d90f-8a8a-49a9-99d6-30b70e37bc83/lesson/d0d5c982-7258-4475-88f8-b28ba6fc7028)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/5a06d90f-8a8a-49a9-99d6-30b70e37bc83/lesson/df68a9ef-9245-4a42-a707-d8bebefc6127)**
>
> Practice lab
