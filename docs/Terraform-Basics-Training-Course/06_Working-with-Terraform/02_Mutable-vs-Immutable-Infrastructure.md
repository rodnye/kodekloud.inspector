# Mutable vs Immutable Infrastructure - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Working-with-Terraform/Mutable-vs-Immutable-Infrastructure)

---

## Table of Contents

- Mutable vs Immutable Infrastructure
  - Mutable Infrastructure in Practice
  - Embracing Immutable Infrastructure
  - Terraform and Immutable Infrastructure
  - Watch Video
    - Challenges with Mutable Infrastructure
    - Benefits of Immutable Infrastructure

---

## Content

Terraform Basics Training Course

Working with Terraform

# Mutable vs Immutable Infrastructure

In this lesson, we dive into the fundamental differences between mutable and immutable infrastructure. Understanding these differences is essential when implementing Infrastructure as Code (IaC) and using tools like [Terraform](https://www.terraform.io/).

Terraform handles resource updates—such as modifying the permissions of a local file—by destroying an existing resource and then re-creating it with the updated settings. Consider the following example:

```
resource "local_file" "pet" {
  filename        = "/root/pets.txt"
  content         = "We love pets!"
  file_permission = "0700"
}
```

When you run Terraform to apply this configuration, the output might look like:

```
$ terraform apply
# local_file.pet must be replaced
-/+ resource "local_file" "pet" {
      content                = "We love pets!"
      directory_permission   = "0777"
  ~   file_permission        = "0777" -> "0700" # forces replacement
      filename               = "/root/pet.txt"
      ~ id                    = "5f8fb950ac60f7f23ef968097cda01fd3c11bdf" -> (known after apply)
}
Plan: 1 to add, 0 to change, 1 to destroy.
Do you want to perform these actions?
Terraform will perform the actions described above. Only 'yes' will be accepted to approve.
Enter a value: yes
local_file.pet: Destroying...
[id=5f8fb950ac60f7f23ef968097cda01fd3c11bdf]
Destroy complete after 0s
```

This output clearly shows that Terraform destroys the existing resource before creating a new one with updated permissions.

## Mutable Infrastructure in Practice

Imagine you are running an application server with Nginx version 1.17. When a new version is released, you might choose to update the web server incrementally—from version 1.17 to 1.18, and later from 1.18 to 1.19. The upgrade process often involves either:

- Manually downloading and installing the new version during a maintenance window.
- Automating the process with configuration management tools like [Ansible](https://www.ansible.com/).

For high availability, you might run a pool of servers with identical software and configurations. In this case, performing in-place updates individually on each server represents mutable infrastructure. Even though the underlying hardware or virtual infrastructure remains the same, the software and configuration details change with each update.

![The image shows a server icon with "v1.19" above it, a script file named "upgrade-nginx.sh," and the Ansible logo, suggesting an Nginx upgrade process.](https://kodekloud.com/kk-media/image/upload/v1752884248/notes-assets/images/Terraform-Basics-Training-Course-Mutable-vs-Immutable-Infrastructure/frame_70.jpg)

> [!important]
> **Note**
>
> An in-place update may lead to configuration drift over time. If one server fails to upgrade due to dependency issues, it will remain on an older version while others move forward, complicating future maintenance.

### Challenges with Mutable Infrastructure

When updating software on a system:

- Dependencies must be met for a successful upgrade.
- If one or more servers (e.g., web server 3) have unmet dependencies—such as network issues, storage constraints, or compatibility differences—the upgrade might fail, leaving that server on an older version (e.g., version 1.18).
- After multiple update cycles, configuration drift can occur, where servers run different versions of software, increasing the complexity of troubleshooting and further updates.

## Embracing Immutable Infrastructure

Immutable infrastructure takes a different approach. Instead of modifying existing servers, you provision new servers with the updated version (for example, replacing Nginx 1.17 with 1.18). Once the new servers are confirmed to run correctly, the old servers are decommissioned.

In immutable infrastructure, resources are never modified post-deployment—they are always replaced. This method minimizes the risk of configuration drift because the previous version remains unchanged until a fully validated new version is deployed.

![The image illustrates "Immutable Infrastructure" with three identical server icons labeled "v1.18," representing unchangeable server versions.](https://kodekloud.com/kk-media/image/upload/v1752884249/notes-assets/images/Terraform-Basics-Training-Course-Mutable-vs-Immutable-Infrastructure/frame_280.jpg)

### Benefits of Immutable Infrastructure

- Easier to version infrastructure and roll back to previous releases.
- Consistent environments reduce the complexity of governance and maintenance.
- Reliable deployment pipelines, as each release is a fresh creation rather than an update.

## Terraform and Immutable Infrastructure

Terraform exemplifies immutable infrastructure by default. For instance, if you update a resource block—changing the permission from "0777" to "0700"—Terraform destroys the original resource and creates a new one with the updated settings.

Revisiting our earlier example:

```
resource "local_file" "pet" {
  filename        = "/root/pets.txt"
  content         = "We love pets!"
  file_permission = "0700"
}
```

The Terraform output for this update might appear as follows:

```
$ terraform apply
# local_file.pet must be replaced
-/+ resource "local_file" "pet" {
    content               = "We love pets!"
    directory_permission  = "0777"
  ~ file_permission       = "0777" -> "0700" # forces replacement
    filename              = "/root/pet.txt"
    ~ id                  = "5f8fb950ac60f7f23ef968097cda0a1fd3c11bdf" -> (known after apply)
}
Plan: 1 to add, 0 to change, 1 to destroy.


local_file.pet: Destroying...
[id=5f8fb950ac60f7f23ef968097cda0a1fd3c11bdf]
local_file.pet: Destruction complete after 0s
local_file.pet: Creating...
[id=5f8fb950ac60f7f23ef968097cda0a1fd3c11bdf]
Apply complete! Resources: 1 added, 0 changed, 1 destroyed.
```

By default, Terraform replaces the resource. However, you may encounter scenarios where you wish to modify this behavior—for example, creating a new resource before the old one is decommissioned or retaining the old resource for a time. Such behaviors can be controlled through lifecycle rules defined within the resource block. We will cover lifecycle customizations in the upcoming section.

> [!important]
> **Warning**
>
> Altering default resource creation and deletion strategies without a thorough understanding of lifecycle rules can lead to unexpected outages. Always test changes in a staging environment before applying them in production.

For more insights into managing infrastructure with Terraform, refer to the official [Terraform Documentation](https://www.terraform.io/docs).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/98de9b33-985e-4ec4-9903-b39856d309e8/lesson/fe362a30-ceb6-4246-9007-9208d2eec5b8)**
>
> Watch video content
