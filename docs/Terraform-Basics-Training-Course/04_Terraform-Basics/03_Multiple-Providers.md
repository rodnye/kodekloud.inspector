# Multiple Providers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-Basics/Multiple-Providers)

---

## Table of Contents

- Multiple Providers
  - Initializing Providers
  - Reviewing the Execution Plan
  - Applying the Configuration
  - Next Steps
  - Watch Video
  - Practice Lab

---

## Content

Terraform Basics Training Course

Terraform Basics

# Multiple Providers

In this lesson, you’ll learn how to leverage multiple providers in a Terraform configuration. Until now, you have been using a single provider (local) to deploy a file to your system:

```
resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}
```

Terraform makes it easy to integrate additional providers. In this example, we introduce the random provider, which is capable of generating random resources, such as IDs, integers, or even pet names. Our goal is to generate a random pet name by adding a new resource block that uses the random provider.

By referring to the provider documentation, you can add the following resource block to your existing main.tf file. The resource block is divided into two parts: the provider (random) and the resource type (pet). We name this resource "my-pet" and specify three arguments:

- prefix: A string added to the beginning of the generated pet name.
- separator: A character that separates the prefix from the pet name.
- length: The number of words in the generated pet name.

The updated main.tf file now looks like this:

```
resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}


resource "random_pet" "my-pet" {
  prefix    = "Mrs"
  separator = "."
  length    = 1
}
```

This configuration now contains resource definitions for both the local file and the random pet.

> [!important]
> **Note**
>
> Before proceeding with any changes or deployments, always run the Terraform initialization command to download and configure all required provider plugins.

## Initializing Providers

Before generating an execution plan and applying the configuration, you must initialize the providers by using the Terraform init command. This command downloads and sets up the necessary plugins for each provider being used. When you run the following command, Terraform will initialize both the local and random provider plugins:

```
$ terraform init
Initializing the backend...


Initializing provider plugins...
- Using previously-installed hashicorp/local v2.0.0
- Finding latest version of hashicorp/random...
- Installing hashicorp/random v2.3.0...
- Installed hashicorp/random v2.3.0 (signed by HashiCorp)


The following providers do not have any version constraints in configuration,
so the latest version was installed.


To prevent automatic upgrades to new major versions that may contain breaking
changes, we recommend adding version constraints in a required_providers block
in your configuration, with the constraint strings suggested below.
* hashicorp/local: version = "~> 2.0.0"
* hashicorp/random: version = "~> 2.3.0"


Terraform has been successfully initialized!
```

As shown, Terraform reuses the already installed local provider and newly installs the random provider since it had not been used before.

## Reviewing the Execution Plan

After initialization, review the planned actions by running the Terraform plan command. In this plan, the local file resource remains unchanged, and a new resource (“my-pet”) is set to be created:

```
$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but
will not be persisted to local or remote state storage.


local_file.pet: Refreshing state...
[id=d1a31467f206d6ea8ab1cad382bc106bf46df69e]
.
.
# random_pet.my-pet will be created
+ resource "random_pet" "my-pet" {
+   id        = (known after apply)
+   length    = 1
+   prefix    = "Mrs"
+   separator = "."
}


Plan: 1 to add, 0 to change, 0 to destroy.
```

## Applying the Configuration

Once you are satisfied with the execution plan, apply the configuration using Terraform apply. This step creates the new resource for the random pet while leaving the local file resource unchanged. Notice that the random provider outputs the generated pet name:

```
$ terraform apply
local_file.pet: Refreshing state...
[id=d1a31467f206d6ea8ab1cad382bc106bf46df69e]


An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create


Terraform will perform the following actions:


# random_pet.my-pet will be created
+ resource "random_pet" "my-pet" {
  + id        = (known after apply)
  + length    = 1
  + prefix    = "Mrs"
  + separator = "."
}


Plan: 1 to add, 0 to change, 0 to destroy.


random_pet.my-pet: Creating...
random_pet.my-pet: Creation complete after 0s [id=Mrs.hen]


Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

Notice that an attribute called "id" appears in the output, reflecting the generated pet name.

> [!important]
> **Important**
>
> Although this example uses a pet symbol for demonstration, the random pet resource can generate a variety of pet names and is not limited to any specific animal type.

## Next Steps

Now that you have learned how to work with multiple providers in Terraform, continue experimenting with additional providers and resource types to further expand your infrastructure automation skills. For more detailed information on Terraform providers and best practices, visit the [Terraform Documentation](https://terraform.io/docs).

Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/df2660a4-c959-4fa7-bfa8-0700885b598e/lesson/1d2c3002-ead1-4ee8-8b41-cc60bebd6315)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/df2660a4-c959-4fa7-bfa8-0700885b598e/lesson/9ddacf3d-182a-4932-80b4-da86babc0a2a)**
>
> Practice lab
