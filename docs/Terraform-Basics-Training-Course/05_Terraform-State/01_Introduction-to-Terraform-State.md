# Introduction to Terraform State - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-State/Introduction-to-Terraform-State)

---

## Table of Contents

- Introduction to Terraform State
  - Terraform Workflow Overview
  - Initializing and Running Terraform Plan
  - Applying the Terraform Configuration
  - Terraform State File
  - Updating the Configuration
  - Conclusion
  - Watch Video

---

## Content

Terraform Basics Training Course

Terraform State

# Introduction to Terraform State

In this article, we expand on our introduction to Terraform by exploring how state management works under the hood. Building on our foundational knowledge of writing simple Terraform configurations with HCL, declaring variables, using reference expressions, and linking resources, we now dive into Terraform state to understand how Terraform tracks real-world infrastructure changes.

## Terraform Workflow Overview

Imagine you have a project directory named "terraform-local-file" containing the following two files:

```
$ ls terraform-local-file
main.tf  variables.tf
```

The primary Terraform configuration is defined in `main.tf` as shown below:

```
resource "local_file" "pet" {
  filename = var.filename
  content  = var.content
}
```

The variables used by this configuration are declared in `variables.tf`:

```
variable "filename" {
  default = "/root/pets.txt"
}


variable "content" {
  default = "I love pets!"
}
```

At this stage, no local file resource has been created yet.

## Initializing and Running Terraform Plan

Before provisioning any resources, initialize Terraform by executing the `terraform init` command. This command downloads the necessary plugins. Next, generate an execution plan with the `terraform plan` command. Notice that Terraform refreshes the state in memory (even if no state exists yet) and computes an execution plan that indicates which resources will be created.

The output of the plan command is similar to the following:

```
[terraform-local-file]$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, persisted to local or remote state storage.


An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create


Terraform will perform the following actions:


  # local_file.pet will be created
  + resource "local_file" "pet" {
      + content              = "I love pets!"
      + directory_permission = "0777"
      + file_permission      = "0777"
      + filename             = "/root/pets.txt"
      + id                   = (known after apply)
    }


Plan: 1 to add, 0 to change, 0 to destroy.


Note: You didn’t specify an -out parameter to save this plan, so it will not be possible to replay this exact plan thereafter.
```

Since the state file does not yet record any resources, Terraform understands that all resources defined in the configuration will be newly created.

## Applying the Terraform Configuration

To apply the configuration, run the `terraform apply` command. This command will reinitialize the in-memory state, confirm that no state file exists yet, and then proceed to create the local file resource:

```
$ terraform apply
An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create


Terraform will perform the following actions:


  # local_file.pet will be created
  + resource "local_file" "pet" {
      + content              = "I love pets!"
      + directory_permission = "0777"
      + file_permission      = "0777"
      + filename             = "/root/pets.txt"
      + id                   = (known after apply)
    }


Plan: 1 to add, 0 to change, 0 to destroy.


Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.


Enter a value: yes


local_file.pet: Creating...
local_file.pet: Creation complete after 0s
[id=7e4db4fbfddb108bdd046926202bae3e9bd1e168]
```

Upon confirmation, Terraform creates the resource, generates a unique ID for it, and creates the file `/root/pets.txt` with the content "I love pets!" If you run `terraform apply` again, Terraform refreshes the state, detects that the resource already exists, and confirms that no further actions are needed:

```
[terraform-local-file]$ cat /root/pets.txt
I love pets!


[terraform-local-file]$ terraform apply
local_file.pet: Refreshing state...
[id=7e4db4fbfdbb108bdd04692602bae3e9bd1e1b68]
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
```

Terraform maintains a state file, which is how it tracks that the resource is already provisioned.

## Terraform State File

After the initial successful `terraform apply`, an additional file named `terraform.tfstate` is created in the project directory. This file is a JSON data structure mapping your real-world infrastructure to the resource definitions from your configuration files. The directory now appears as follows:

```
[terraform-local-file]$ ls
main.tf  variables.tf  terraform.tfstate
```

Inspecting `terraform.tfstate` reveals a detailed record of the infrastructure, including resource IDs, provider information, and resource attributes:

```
{
  "version": 4,
  "terraform_version": "0.13.0",
  "serial": 1,
  "lineage": "e35dde72-a943-de50-3c8b-1df8986e5a31",
  "outputs": {},
  "resources": [
    {
      "mode": "managed",
      "type": "local_file",
      "name": "pet",
      "provider": "provider[\"registry.terraform.io/hashicorp/local\"]",
      "instances": [
        {
          "schema_version": 0,
          "attributes": {
            "content": "I love pets!",
            "content_base64": null,
            "directory_permission": "0777",
            "file_permission": "0777",
            "filename": "/root/pets.txt",
            "id": "7e4db4fbfdcb108dd04692062bae39bd1e1b68",
            "sensitive_content": null
          },
          "private": "bnVzBA=="
        }
      ]
    }
  ]
}
```

This state file is the single source of truth for Terraform. It is leveraged during subsequent commands such as `terraform plan` and `terraform apply` to determine if any changes to the infrastructure are required.

## Updating the Configuration

Consider updating the configuration in `variables.tf` to modify the content of the file, as shown below:

```
variable "filename" {
  default = "/root/pets.txt"
}


variable "content" {
  default = "We love pets!"
}
```

After this change, running `terraform apply` causes Terraform to refresh the state and detect a difference between the new configuration and the existing state. Consequently, Terraform decides the resource must be replaced:

```
$ terraform apply
local_file.pet: Refreshing state... [id=7e4db4fbfdb108ddb04692602bae3e9bd1e1b68]


Terraform will perform the following actions:


# local_file.pet must be replaced
-/+ resource "local_file" "pet" {
      directory_permission = "0777"
      file_permission      = "0777"
      filename             = "/root/pets.txt"
  ~   id                   = "7e4db4fbfdb108ddb04692602bae3e9bd1e1b68" -> "7e4db4fbfdb108ddb04692602bae3e9bc4d1c14"
      # "We love pets!" # forces replacement due to content change
    }
```

After applying these changes, Terraform deletes the old resource and creates a new one with a different unique ID. The updated `terraform.tfstate` now reflects the new state:

```
{
  "version": 4,
  "terraform_version": "0.13.0",
  "serial": 1,
  "lineage": "e35dde72-a943-de50-3c8b-1df8986e5a31",
  "outputs": {},
  "resources": [
    {
      "mode": "managed",
      "type": "local_file",
      "name": "pet",
      "provider": "provider[\"registry.terraform.io/hashicorp/local\"]",
      "instances": [
        {
          "schema_version": 0,
          "attributes": {
            "content": "We love pets!",
            "content_base64": null,
            "directory_permission": "0777",
            "file_permission": "0777",
            "filename": "/root/pets.txt",
            "id": "7e4db4fbfdb108ddb04692602bae3e9bc4d1c14",
            "sensitive_content": null
          },
          "private": "bnVsBSA=="
        }
      ]
    }
  ]
}
```

Now that the configuration file and the state file are in sync, any subsequent runs of `terraform apply` will report that no changes are necessary.

## Conclusion

In this lesson, we explored how Terraform leverages a state file—initially created during the first successful apply—to track and manage real-world infrastructure. This state file serves as the authoritative record for your resources and is essential for Terraform to efficiently plan and apply configuration changes.

> [!important]
> **Note**
>
> Managing your Terraform state is crucial for ensuring consistent and predictable infrastructure behavior. For more information, consider reading the [Terraform State documentation](https://www.terraform.io/language/state).

![The image illustrates a comparison between real-world infrastructure and a Terraform state file, using icons for servers, documents, and a dog.](https://kodekloud.com/kk-media/image/upload/v1752884211/notes-assets/images/Terraform-Basics-Training-Course-Introduction-to-Terraform-State/frame_320.jpg)

In upcoming lectures, we will further explore the significance of state management in Terraform and discuss best practices for handling it effectively. For additional Terraform guides, visit the [Terraform Documentation](https://www.terraform.io/docs).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/153d021a-b7cd-48bb-8249-2de4b55cb6df/lesson/b88b42db-6124-49ec-af8a-34506f4a7ff8)**
>
> Watch video content
