# Terraform Commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Working-with-Terraform/Terraform-Commands)

---

## Table of Contents

- Terraform Commands
  - Terraform Validate
  - Terraform fmt
  - Terraform Show
  - Terraform Providers
  - Terraform Output Variables
  - Terraform Refresh
  - Terraform Graph
  - Visualizing the Graph with Graphviz
  - Watch Video
  - Practice Lab

---

## Content

Terraform Basics Training Course

Working with Terraform

# Terraform Commands

In this guide, we explore essential Terraform commands used to validate configurations, format files, inspect state, manage providers, output variables, refresh state, and visualize resource dependencies. Each section provides clear examples and outputs to help you master the use of Terraform in your infrastructure management tasks.

---

## Terraform Validate

After crafting your Terraform configuration files, you can verify their syntax without running a full plan or apply. The `terraform validate` command checks your configuration for errors, ensuring that your HCL (HashiCorp Configuration Language) is correct.

For example, consider the following configuration:

```
resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "We love pets!"
}
```

Run the command:

```
$ terraform validate
Success! The configuration is valid.
```

If an error is present, such as using an unsupported argument, Terraform will indicate the issue. For instance, using `file_permissions` instead of `file_permission` may lead to an error. The corrected configuration should be:

```
resource "local_file" "pet" {
  filename        = "/root/pets.txt"
  content         = "We love pets!"
  file_permission = "0700"
}
```

If left uncorrected, you might see an error like this:

```
$ terraform validate
Error: Unsupported argument


  on main.tf line 4, in resource "local_file" "pet":
   4:   file_permissions = "0777"


An argument named "file_permissions" is not expected here. Did you mean "file_permission"?
```

---

## Terraform fmt

The `terraform fmt` command scans your configuration files in the current directory and reformats them into a standard style. This canonical formatting greatly improves code readability and consistency. Running the command will list any files that were modified during the formatting process.

---

## Terraform Show

The `terraform show` command is used to display the current Terraform state, detailing all attributes of your managed resources. This output helps you verify the actual state of your infrastructure.

For example, if you have a local file resource, running:

```
$ terraform show
# local_file.pet:
resource "local_file" "pet" {
  content              = "We love pets!"
  directory_permission = "0777"
  file_permission      = "0777"
  filename             = "/root/pets.txt"
  id                   = "cba595b7d9f94ba1107a46f3f731912d95fb3d2c"
}
```

To view this state in JSON format, use the `-json` flag:

```
$ terraform show -json
{"format_version":"0.1","terraform_version":"0.13.0","values":{"root_module":{"resources":[{"address":"local_file.pet","mode":"managed","type":"local_file","name":"pet","provider_name":"registry.terraform.io/hashicorp/local","schema_version":0,"values":{"content":"We love pets!","content_base64":null,"directory_permission":"0777","file_permission":"0777","filename":"/root/pets.txt","id":"cba595b7d9f94ba1107a46f3f731912d95fb3d2c","sensitive_content":null}}]}}}
```

---

## Terraform Providers

The `terraform providers` command lists all providers required by your configuration along with those used in your state. It also supports mirroring provider plugins to a specified directory.

For example:

```
$ terraform providers
Providers required by configuration:
    └── provider[registry.terraform.io/hashicorp/local]


Providers required by state:
    provider[registry.terraform.io/hashicorp/local]


$ terraform providers mirror /root/terraform/new_local_file
- Mirroring hashicorp/local...
- Selected v1.4.0 with no constraints
- Downloading package for windows_amd64...
- Package authenticated: signed by HashiCorp
```

> [!important]
> **Tip**
>
> Mirroring providers can accelerate deployments in environments with restricted internet access, ensuring that all necessary plugins are available locally.

---

## Terraform Output Variables

Terraform output variables allow you to extract and display configuration values once your infrastructure has been applied. This is particularly useful for showing key results or passing values between modules.

Consider the following configuration:

```
resource "local_file" "pet" {
  filename       = "/root/pets.txt"
  content        = "We love pets!"
  file_permission = "0777"
}


resource "random_pet" "cat" {
  length    = "2"
  separator = "-"
}


output "content" {
  value       = local_file.pet.content
  sensitive   = false
  description = "Print the content of the file"
}


output "pet-name" {
  value       = random_pet.cat.id
  sensitive   = false
  description = "Print the name of the pet"
}
```

After applying the configuration, run:

```
$ terraform output
content = We love pets!
pet-name = huge-owl
```

---

## Terraform Refresh

The `terraform refresh` command synchronizes your Terraform state with the actual state of your infrastructure. This is particularly useful when external changes have occurred outside of Terraform.

Consider the following configuration:

```
resource "local_file" "pet" {
  filename       = "/root/pets.txt"
  content        = "We love pets!"
  file_permission = "0777"
}


resource "random_pet" "cat" {
  length    = "2"
  separator = "_"
}
```

When you run a plan, Terraform refreshes the state in-memory:

```
$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be persisted to local or remote state storage.


random_pet.cat: Refreshing state... [id=huge-owl]
local_file.pet: Refreshing state... [id=cba595b7d9f94ba1107a46f3f731912d95fb3d2c]
--------------------------------------------------------------------
No changes. Infrastructure is up-to-date.
```

You can also update the state file without changing any infrastructure by using the `-refresh-only` flag with `terraform apply`:

```
$ terraform apply -refresh-only
random_pet.cat: Refreshing state... [id=huge-owl]
local_file.pet: Refreshing state... [id=cba595b7d9f94ba1107a46f3f731912d95fb3d2c]
```

To prevent automatic refreshing during plan or apply, use the `-refresh=false` option.

---

## Terraform Graph

The `terraform graph` command creates a DOT format representation of resource dependencies in your configuration. The graph visually outlines how resources are connected.

For example, in this configuration with dependency references:

```
resource "local_file" "pet" {
  filename = "/root/pets.txt"
  content  = "My favorite pet is ${random_pet.my-pet.id}"
}


resource "random_pet" "my-pet" {
  prefix    = "Mr"
  separator = "."
  length    = "1"
}
```

Running the command produces:

```
$ terraform graph
digraph {
  compound = "true"
  newrank = "true"
  subgraph "root" {
    "[root] local_file.pet (expand)" [label = "local_file.pet", shape = "box"]
    "[root]"
    provider["registry.terraform.io/hashicorp/local"] [label = "provider[\"registry.terraform.io/hashicorp/local\"]", shape = "diamond"]
    "[root]"
    provider["registry.terraform.io/hashicorp/random"] [label = "provider[\"registry.terraform.io/hashicorp/random\"]", shape = "diamond"]
    "[root] random_pet.my-pet (expand)" [label = "random_pet.my-pet", shape = "box"]
    "[root] local_file.pet (expand)" -> "[root] local_file.pet (expand)" [label = "provider[\"registry.terraform.io/hashicorp/local\"]"]
    "[root] local_file.pet (expand)" -> "[root] random_pet.my-pet (expand)"
    "[root] meta.count-boundary (EachMode fixup)" -> "[root] local_file.pet (expand)"
  }
}
```

> [!important]
> **Graph Visualization**
>
> The DOT format may be challenging to interpret directly. Use a visualization tool like Graphviz to render a graphical version of the dependency graph.

---

## Visualizing the Graph with Graphviz

Graphviz is a widely-used tool for converting DOT files into visual images. On Ubuntu, you can install Graphviz as follows:

```
$ apt update
$ apt install graphviz -y
```

After installation, pipe the output of the `terraform graph` command into Graphviz's `dot` command to create an SVG:

```
$ terraform graph | dot -Tsvg > graph.svg
```

Open the resulting `graph.svg` file in your browser to see a visual representation of your resource dependencies. This helps in understanding how resources like the local file and random pet interact through dependency expressions.

---

That concludes our comprehensive look at essential Terraform commands. Use these tools to validate, format, and manage your infrastructure configurations effectively. Now, proceed to the hands-on labs to further explore and practice Terraform’s capabilities.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/98de9b33-985e-4ec4-9903-b39856d309e8/lesson/a1fb64aa-097f-46c1-92e8-0902161b2b0f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/98de9b33-985e-4ec4-9903-b39856d309e8/lesson/870d2152-4979-422c-9dff-766e0ec630f5)**
>
> Practice lab
