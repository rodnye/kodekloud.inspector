# Create Update and Destroy Infrastructure - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Understand-Infrastructure-as-Code-IaC-concepts/Create-Update-and-Destroy-Infrastructure)

---

## Table of Contents

- Create Update and Destroy Infrastructure
  - Updating a Resource
  - Destroying a Resource
  - Organizing Your Configuration Directory
  - Watch Video

---

## Content

Terraform Associate Certification: HashiCorp Certified

Understand Infrastructure as Code IaC concepts

# Create Update and Destroy Infrastructure

In this article, we revisit how to update and destroy infrastructure resources managed with Terraform. Using a local file resource as an example, we will walk through updating a resource configuration, previewing the changes, and eventually destroying the resource if needed.

## Updating a Resource

To update a resource in Terraform, simply modify the configuration file. For example, you might add a new argument to update the file permissions of a resource to "0700":

```
resource "local_file" "pet" {
  filename        = "/root/pets.txt"
  content         = "We love pets!"
  file_permission = "0700"
}
```

After making your changes, run the Terraform plan to preview the execution changes:

```
$ terraform plan
```

> [!important]
> **Note**
>
> Running `terraform plan` is optional because executing `terraform apply` displays the same execution plan.

In the execution plan, Terraform uses the “-/+” symbol preceding the resource name to indicate that the resource will be destroyed and then recreated. A corresponding line in the output specifies that the change in file permissions is forcing this replacement. Since Terraform adheres to immutable infrastructure principles, any update that alters critical properties results in the resource being destroyed and re-created with the new settings.

Once you have reviewed the changes, apply the updates with:

```
$ terraform apply
local_file.pet: Refreshing state...
[id=feafccdae259f25533749abfb90e27558256459]


-/+ destroy and then create replacement
...
Plan: 1 to add, 0 to change, 1 to destroy.


Do you want to perform these actions?
Terraform will perform the actions described above.
Only 'yes' will be accepted to approve.


Enter a value: yes
local_file.pet: Destroying...
[id=feafccdae259f25533749abfb90e27558256459]
local_file.pet: Destruction complete after 0s
local_file.pet: Creating...
local_file.pet: Creation complete after 0s
[id=feafccdae259f25533749abfb90e27558256459]


Apply complete! Resources: 1 added, 0 changed, 1 destroyed.
```

## Destroying a Resource

To remove a resource completely from your infrastructure, use the `terraform destroy` command. This command generates an execution plan that shows a minus symbol next to each resource set for removal. Review the plan carefully before confirming the destruction.

```
$ terraform destroy
local_file.pet: Refreshing state...
[id=5f8fb950ac60f7f23ef968097cda0a1fd3c11bdf]


An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  - destroy


Terraform will perform the following actions:


  # local_file.pet will be destroyed
  - resource "local_file" "pet" {
      - content             = "My favorite pet is a gold fish" -> null
      - directory_permission = "0777" -> null
      - file_permission     = "0700" -> null
      - filename            = "/root/pet.txt" -> null
      - id                  = "5f8fb950ac60f7f23ef968097cda0a1fd3c11bdf" -> null
    }


Plan: 0 to add, 0 to change, 1 to destroy.


Do you really want to destroy all resources?
Terraform will destroy all your managed infrastructure, as shown above.
There is no undo. Only 'yes' will be accepted to confirm.


Enter a value: yes
local_file.pet: Destroying... [id=5f8fb950ac60f7f23ef968097cda0a1fd3c11bdf]
local_file.pet: Destruction complete after 0s


Destroy complete! Resources: 1 destroyed.
```

You can bypass the confirmation prompt by including the `auto-approve` flag with the `terraform destroy` command. Use this option with caution, as it immediately removes all managed resources.

## Organizing Your Configuration Directory

Terraform treats any file with a `.tf` extension found in the current working directory as part of your configuration. This allows you to split your infrastructure configuration across multiple files for better organization. For instance, if your configuration is stored under `/root/terraform-local-file` with an initial file named `local.tf`, your directory might look like this:

```
[terraform-local-file]$ ls /root/terraform-local-file
local.tf
```

The `local.tf` file may contain a resource like:

```
resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}
```

You can add another configuration file, such as `cat.tf`, to define an additional resource:

```
resource "local_file" "cat" {
  filename = "/root/cat.txt"
  content  = "My favorite pet is Mr. Whiskers"
}
```

Both resources will be created when you run `terraform apply` for the first time.

A common best practice is to consolidate resource blocks into a single configuration file (often named `main.tf`) while separating variables and outputs into dedicated files such as `variables.tf` and `outputs.tf`. This modular structure improves manageability, especially as your project grows in complexity.

That concludes our guide on updating and destroying Terraform-managed infrastructure resources. To reinforce your understanding, consider taking the multiple-choice quiz and testing your knowledge of these Terraform operations.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/e27c7cfe-a9f1-4e56-b55b-f908bd92d21c/lesson/98cc4b71-d037-4127-8cef-9e1d463a0017)**
>
> Watch video content
