# Output Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Variables-Resource-Attributes-and-Dependencies/Output-Variables)

---

## Table of Contents

- Output Variables
  - AWS Instance Example with Output Variables
  - Defining Necessary Variables
  - Viewing Output Variables
  - Conclusion
  - Watch Video

---

## Content

Terraform Associate Certification: HashiCorp Certified

Variables Resource Attributes and Dependencies

# Output Variables

In this article, we will explore output variables in Terraform—a powerful feature for capturing and displaying the results of your configurations. Output variables in Terraform work in tandem with input variables, allowing you to easily reference and use the values of expressions from your infrastructure. For instance, if you want to capture the public IP address of an AWS EC2 instance, you can define an output variable to display this information.

> [!important]
> **Tip**
>
> Using output variables is especially useful when you need to pass dynamic information from Terraform into other automation tools such as ad-hoc scripts or Ansible playbooks.

## AWS Instance Example with Output Variables

Below is a Terraform configuration that creates an AWS instance and then outputs its public IP address:

```
resource "aws_instance" "cerberus" {
  ami           = var.ami
  instance_type = var.instance_type
}


output "pub_ip" {
  value       = aws_instance.cerberus.public_ip
  description = "Print the public IPv4 address"
}
```

In this configuration:

- The resource block defines an AWS instance named "cerberus".
- The `output` block uses the keyword `output` followed by the variable name `pub_ip`.
- The mandatory `value` argument references the public IP of the AWS instance.
- An optional description provides clarity about the output.

## Defining Necessary Variables

To complete the configuration, you need to define the necessary variables. Below is an example of how to define these variables:

```
variable "ami" {
  default = "ami-06178cf087598769c"
}


variable "instance_type" {
  default = "m5.large"
}


variable "region" {
  default = "eu-west-2"
}
```

## Viewing Output Variables

After running the `terraform apply` command, Terraform displays the configured output variable. This is an immediate way to verify the information, even if no changes have occurred in the configuration.

To view all defined outputs, run:

```
$ terraform output
pub_ip = 54.214.145.69
```

To retrieve a specific output variable, pass its name as an argument:

```
$ terraform output pub_ip
54.214.145.69
```

> [!important]
> **Essential Information**
>
> Output variables not only help display important resource details after deployment but also facilitate integration with other infrastructure-as-code tools.

## Conclusion

Output variables in Terraform are a convenient feature that enhances the transparency of your infrastructure deployments. They allow you to quickly display and reuse critical information, making them indispensable for dynamic and scalable infrastructure management.

That concludes this article. Please proceed to the multiple-choice quiz for this section.

For further details on Terraform and infrastructure management, be sure to explore the [Terraform Documentation](https://www.terraform.io/docs).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/cca81ade-f05a-42b2-af56-1926cade6582/lesson/63d8b6ca-172a-4304-83d5-cf63d8c4ca41)**
>
> Watch video content
