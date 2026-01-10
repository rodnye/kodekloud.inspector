# Update and Destroy Infrastructure - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Getting-Started-with-Terraform/Update-and-Destroy-Infrastructure)

---

## Table of Contents

- Update and Destroy Infrastructure
  - Updating the Resource
  - Destroying the Resource
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Terraform Basics Training Course

Getting Started with Terraform

# Update and Destroy Infrastructure

This guide will walk you through updating and destroying infrastructure using Terraform. In previous tutorials, we covered how to create a local file resource. Today, we will update its configuration and then completely destroy it.

## Updating the Resource

In this section, we update the local file resource by changing its file permissions from the default (0777) to a more secure permission (0700). This update restricts file access exclusively to the owner.

Below is the updated Terraform configuration:

```
resource "local_file" "pet" {
  filename        = "/root/pets.txt"
  content         = "We love pets!"
  file_permission = "0700"
}
```

Updating this configuration marks the current resource as needing replacement. When you run the Terraform plan, you will see that Terraform plans to replace the resource. The output indicates the replacement using the symbol "-/+" to show that Terraform will destroy the existing file and create a new one with the updated permissions.

Below is an example of the Terraform plan output:

```
$ terraform plan
local_file.pet: Refreshing state...
[id=5f8fb950ac60f7f23ef968097cda0a1fd3c11bdf]


An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
   -/+ destroy and then create replacement


Terraform will perform the following actions:


# local_file.pet must be replaced.
-/+ resource "local_file" "pet" {
      content             = "We love pets!"
      directory_permission = "0777"
  ~ file_permission      = "0777" -> "0700" # forces replacement
      filename            = "/root/pets.txt"
  ~ id                   = "5f8fb950ac60f7f23ef968097cda0a1fd3c11bdf" -> (known after apply)
}


Plan: 1 to add, 0 to change, 1 to destroy.


Note: You didn't specify an "-out" parameter to save this plan, so Terraform can't guarantee that exactly these actions will be performed if "terraform apply" is subsequently run.
```

> [!important]
> **Important**
>
> Even though the configuration change is minor, Terraform treats the resource as immutable. This means the old resource is destroyed and a new one is created with the updated settings.

To proceed with applying these changes, run the Terraform apply command. Confirm the action by typing "yes" when prompted:

```
$ terraform apply
# local_file.pet must be replaced
-/+ resource "local_file" "pet" {
    content              = "We love pets!"
    directory_permission = "0777"
    ~ file_permission    = "0777" -> "0700" # forces replacement
    filename             = "/root/pets.txt"
    ~ id                 = "5f8fb950ac60f7f23ef968097cda0a1fd3c11bdf" -> (known after apply)
}
Plan: 1 to add, 0 to change, 1 to destroy.


Do you want to perform these actions?
Terraform will perform the actions described above.
Only 'yes' will be accepted to approve.


Enter a value: yes
local_file.pet: Destroying... [id=5f8fb950ac60f7f23ef968097cda0a1fd3c11bdf]
local_file.pet: Destruction complete after 0s
local_file.pet: Creating...
local_file.pet: Creation complete after 0s
Applied! Resources: 1 added, 0 changed, 1 destroyed.
```

## Destroying the Resource

When you need to completely delete the infrastructure, use the Terraform destroy command. Running this command will generate an execution plan that shows every attribute of the resource marked for deletion. The minus symbol (-) indicates that each attribute will be removed.

Below is an example output from the Terraform destroy command:

```
$ terraform destroy
local_file.pet: Refreshing state... [id=5f8fb950ac60f7f23ef968097cda0a1fd3c11bdf]


An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  - destroy


Terraform will perform the following actions:


# local_file.pet will be destroyed
- resource "local_file" "pet" {
    content             = "We love pets!" -> null
    directory_permission = "0777" -> null
    file_permission     = "0700" -> null
    filename            = "/root/pets.txt" -> null
    id                  = "5f8fb950ac60f7f23ef968097cda0a1fd3c11bdf" -> null
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

> [!important]
> **Caution**
>
> Double-check your plan before running the destroy command, as this action will permanently delete all managed resources in the current configuration.

## Conclusion

You have now learned how to update and destroy infrastructure using Terraform. Updating a resource triggers a replacement, while the destroy command allows for the complete removal of the resource. Practice these steps to reinforce your Terraform skills and better manage your infrastructure lifecycle.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/385de3de-cd58-4925-9a24-207ebd7844b3/lesson/885285d5-9916-42c5-9558-f75a0f6503af)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/385de3de-cd58-4925-9a24-207ebd7844b3/lesson/e3732897-89a4-42ce-b045-4cda7f012907)**
>
> Practice lab
