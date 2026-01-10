# Count and for each - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Read-generate-and-modify-configuration/Count-and-for-each)

---

## Table of Contents

- Count and for each
  - Using Count
  - Using For_Each
  - Conclusion
  - Watch Video
    - Dynamically Setting Count Using a List Variable
    - Potential Drawback of Using Count

---

## Content

Terraform Associate Certification: HashiCorp Certified

Read generate and modify configuration

# Count and for each

In this guide, we'll explore how to use Terraform's meta-arguments—`count` and `for_each`—to efficiently create multiple instances of a resource using the same configuration block. Understanding these options will help you manage resource deployments more dynamically and reliably.

## Using Count

The `count` meta-argument allows you to create multiple copies of a resource. In the example below, we launch three EC2 instances by setting `count` to 3:

```
resource "aws_instance" "web" {
  ami           = var.ami
  instance_type = var.instance_type
  count         = 3
}

variable "ami" {
  default = "ami-06178cf087598769c"
}

variable "instance_type" {
  default = "m5.large"
}
```

After running `terraform apply`, Terraform records these instances in the state file as a list. This means that each resource is identified by its index, for example:

- `aws_instance.web[0]`
- `aws_instance.web[1]`
- `aws_instance.web[2]`

### Dynamically Setting Count Using a List Variable

To streamline your configuration, you can use a list variable instead of a hardcoded count. The following configuration uses the `length` function to determine the number of instances based on the number of elements in the `webservers` list:

```
resource "aws_instance" "web" {
  ami           = var.ami
  instance_type = var.instance_type
  count         = length(var.webservers)
  tags = {
    Name = var.webservers[count.index]
  }
}

variable "ami" {
  default = "ami-06178cf087598769c"
}

variable "instance_type" {
  default = "m5.large"
}

variable "webservers" {
  type    = list(string)
  default = ["web1", "web2", "web3"]
}
```

In this configuration, Terraform creates as many instances as there are elements in the `webservers` list, with each instance tagged according to its corresponding name.

> [!important]
> **Tip**
>
> Using a dynamic list makes your Terraform configuration more flexible and easier to maintain when scaling resources.

### Potential Drawback of Using Count

One important limitation of the `count` meta-argument is that it organizes resources based on list indices. If the order of the elements changes or an element is removed, Terraform may update the wrong resource or destroy the unintended instance.

For example, consider the updated configuration when `"web1"` is removed from the list:

```
# main.tf
resource "aws_instance" "web" {
  ami           = var.ami
  instance_type = var.instance_type
  count         = length(var.webservers)
  tags = {
    Name = var.webservers[count.index]
  }
}

# variables.tf
variable "ami" {
  default = "ami-06178cf087598769c"
}

variable "instance_type" {
  default = "m5.large"
}

variable "webservers" {
  type    = list(string)
  default = ["web2", "web3"]
}
```

Running `terraform plan` may generate an execution plan like this:

```
$ terraform plan
...
Terraform will perform the following actions:

# aws_instance.web[0] will be updated in-place
~ resource "aws_instance" "web" {
    ami = "ami-06178cf087598769c"
    ...
    tags = {
        ~ "Name" = "web1" -> "web2"
    }
}

# aws_instance.web[1] will be updated in-place
~ resource "aws_instance" "web" {
    ami = "ami-06178cf087598769c"
    ...
    tags = {
        ~ "Name" = "web2" -> "web3"
    }
}

# aws_instance.web[2] will be destroyed
- resource "aws_instance" "web" {
    ...
}

Plan: 0 to add, 2 to change, 1 to destroy.
```

> [!important]
> **Warning**
>
> Since resources are managed as a list when using `count`, removing or reordering items can lead to unintended updates or inadvertent deletion of resources. Always verify your plan before applying such changes.

## Using For_Each

The `for_each` meta-argument offers an alternative approach by creating a resource for each element in a set or map. Unlike `count`, `for_each` stores resources in a map keyed by each element’s value, eliminating issues caused by index reordering.

Consider the following configuration that uses `for_each` to loop through the `webservers` variable:

```
resource "aws_instance" "web" {
  ami           = var.ami
  instance_type = var.instance_type
  for_each      = var.webservers
  tags = {
    Name = each.value
  }
}

variable "ami" {
  default = "ami-06178cf087598769c"
}

variable "instance_type" {
  default = "m5.large"
}

variable "webservers" {
  type    = set(string)
  default = ["web1", "web2", "web3"]
}
```

Key advantages of using `for_each`:

- The `webservers` variable is defined as a set (or map) to ensure unique keys.
- Each resource is identified by its key, such as `aws_instance.web["web1"]`.
- Removing an element (like `"web1"`) only destroys that specific resource without affecting the others.

After applying this configuration, running `terraform state list` displays resources as:

```
$ terraform state list
aws_instance.web["web1"]
aws_instance.web["web2"]
aws_instance.web["web3"]
```

This predictable mapping means that modifying the set—such as removing `"web1"`—only affects the corresponding resource.

## Conclusion

In this article, we explored two strategies for provisioning multiple instances in Terraform: using `count` and using `for_each`. While `count` is straightforward, it can introduce complications when handling dynamic lists due to index-based identification. In contrast, `for_each` facilitates more predictable resource management by leveraging set or map keys.

By understanding these distinctions, you can choose the most appropriate approach for your Terraform configurations and avoid unintended resource modifications. Stay tuned for our next article, where we'll dive deeper into advanced Terraform concepts and best practices.

For more detailed Terraform documentation and best practices, visit the [Terraform Registry](https://registry.terraform.io/) or [HashiCorp's documentation](https://www.terraform.io/docs).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/c59e52ed-8a8c-4a6c-8ad0-8dcc38c1598e/lesson/c74b55ae-d1b0-4b56-a865-08d69121bf97)**
>
> Watch video content
