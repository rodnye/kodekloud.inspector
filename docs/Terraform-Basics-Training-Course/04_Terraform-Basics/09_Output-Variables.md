# Output Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-Basics/Output-Variables)

---

## Table of Contents

- Output Variables
  - Capturing Resource Attributes
  - Configuration of Related Variables
  - Displaying Outputs with Terraform
  - Further Reading
  - Watch Video
  - Practice Lab

---

## Content

Terraform Basics Training Course

Terraform Basics

# Output Variables

Terraform output variables are a powerful feature that allow you to store the results of expressions from your configuration files for later use. In previous lessons, we covered input variables and reference expressions; output variables complement these by enabling you to retrieve and present important output information after your infrastructure has been provisioned.

## Capturing Resource Attributes

Consider a configuration that creates a random pet name using Terraform's resource definitions. In this example, a resource called random_pet generates a pet name, and an output variable called pet-name captures the generated id. This is especially useful for passing data to other tools or for quick resource verification.

Below is an example configuration:

```
resource "local_file" "pet" {
  filename = var.filename
  content  = "My favorite pet is ${random_pet.my-pet.id}"
}

resource "random_pet" "my-pet" {
  prefix    = var.prefix
  separator = var.separator
  length    = var.length
}

output "pet-name" {
  value = random_pet.my-pet.id
  desc  = ""
}
```

The output block starts with the keyword `output` followed by the variable name. Inside the block, the **value** argument is required and uses a reference expression (`random_pet.my-pet.id`). Although the **desc** argument is optional, it is a good practice to include a brief description of the output's purpose.

> [!important]
> **Tip**
>
> Use meaningful descriptions for your output variables. This practice enhances code readability and aids in documentation, especially when collaborating with other team members.

## Configuration of Related Variables

To support the resources defined above, ensure the following variables are declared in your configuration:

```
variable "filename" {
  default = "/root/pets.txt"
}

variable "content" {
  default = "I love pets!"
}

variable "prefix" {
  default = "Mrs"
}

variable "separator" {
  default = "."
}

variable "length" {
  default = "1"
}
```

These variable definitions set the necessary defaults and ensure the configuration runs smoothly during execution.

## Displaying Outputs with Terraform

When you run `terraform apply`, Terraform automatically displays the output variables after resource creation. For example:

```
$ terraform apply
...
Outputs:
  pet-name = Mrs.gibbon
```

You can also retrieve the value of output variables at any time using the `terraform output` command. Running the command without any arguments lists all outputs:

```
$ terraform output
pet-name = Mrs.gibbon
```

To display an individual output variable, simply specify its name:

```
$ terraform output pet-name
Mrs.gibbon
```

> [!important]
> **Remember**
>
> Output variables are invaluable for quickly viewing details about your provisioned resources and for integrating with other infrastructure as code tools, ad hoc scripts, or configuration management systems like Ansible.

## Further Reading

For more comprehensive information on Terraform output variables and other configuration concepts, please refer to the following resources:

- [Terraform Official Documentation](https://www.terraform.io/docs)
- [Terraform CLI Documentation](https://www.terraform.io/cli)

By incorporating output variables into your Terraform configurations, you can streamline the process of accessing essential resource details and improve the overall management of your infrastructure.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/df2660a4-c959-4fa7-bfa8-0700885b598e/lesson/5b60fceb-9041-4f11-9cb2-24a04cf37e94)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/df2660a4-c959-4fa7-bfa8-0700885b598e/lesson/6026caa5-ccaf-41f9-8842-6e2ff319231c)**
>
> Practice lab
