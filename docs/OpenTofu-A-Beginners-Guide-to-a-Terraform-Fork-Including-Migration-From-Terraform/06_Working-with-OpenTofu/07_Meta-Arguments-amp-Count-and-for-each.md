# Meta Arguments amp Count and for each - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/Working-with-OpenTofu/Meta-Arguments-amp-Count-and-for-each)

---

## Table of Contents

- Meta Arguments amp Count and for each
  - 1. Using count
  - 2. Using for_each
  - Links and References
  - Watch Video
    - Dynamic count with length()

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

Working with OpenTofu

# Meta Arguments amp Count and for each

In this guide, you’ll learn how to provision multiple EC2 instances with the `count` and `for_each` meta-arguments in OpenTofu. Both approaches let you duplicate a single resource block, but differ in indexing and lifecycle behavior.

| Meta-Argument | Key Characteristic                     | Best Use Case                                |
| ------------- | -------------------------------------- | -------------------------------------------- |
| count         | Integer-based, zero-indexed            | Create a fixed number of identical resources |
| for\\\_each   | Key-based, uses a set or map of values | Stable addressing of dynamic or named items  |

---

## 1\. Using `count`

The `count` meta-argument accepts an integer and creates that many instances of a resource.

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

Run:

```
tofu apply
```

Then verify:

```
tofu state list
# aws_instance.web[0]
# aws_instance.web[1]
# aws_instance.web[2]
```

### Dynamic `count` with `length()`

Instead of hardcoding an integer, drive `count` from a list:

```
variable "webservers" {
  type    = list(string)
  default = ["web1", "web2", "web3"]
}


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
```

Here, each instance tag is assigned by its `count.index`:

- `count.index = 0` → `Name = "web1"`
- `count.index = 1` → `Name = "web2"`
- `count.index = 2` → `Name = "web3"`

> [!important]
> **Reindexing with \`count\`**
>
> Removing or reordering items in the `webservers` list causes all subsequent resources to be reindexed. This can lead to unintended in-place updates instead of only removing the orphaned resource.

Example plan when deleting `"web1"`:

```
# aws_instance.web[0] will be updated (web1 → web2)
# aws_instance.web[1] will be updated (web2 → web3)
# aws_instance.web[2] will be destroyed (web3)
```

---

## 2\. Using `for_each`

The `for_each` meta-argument uses a set or map, giving each resource a stable key based on its value.

```
variable "webservers" {
  type    = set(string)
  default = ["web1", "web2", "web3"]
}


resource "aws_instance" "web" {
  ami           = var.ami
  instance_type = var.instance_type
  for_each      = var.webservers


  tags = {
    Name = each.value
  }
}
```

Run and list state:

```
tofu apply
tofu state list
# aws_instance.web["web1"]
# aws_instance.web["web2"]
# aws_instance.web["web3"]
```

If you remove `"web1"` from the set and run `tofu plan`, only that resource is destroyed:

```
# aws_instance.web["web1"] will be destroyed
Plan: 0 to add, 0 to change, 1 to destroy.
```

This ensures stable resource addressing and prevents unnecessary updates.

---

## Links and References

- [OpenTofu Documentation](https://docs.opentofu.org)
- [AWS EC2 Instance Resource](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance)
- [Terraform `count` Meta-Argument](https://developer.hashicorp.com/terraform/meta-arguments/count)
- [Terraform `for_each` Meta-Argument](https://developer.hashicorp.com/terraform/meta-arguments/for_each)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/69432d48-55d0-4340-a56d-9f9a7819d26c/lesson/c0fe2879-c597-4c61-857d-cc2debd2f337)**
>
> Watch video content
