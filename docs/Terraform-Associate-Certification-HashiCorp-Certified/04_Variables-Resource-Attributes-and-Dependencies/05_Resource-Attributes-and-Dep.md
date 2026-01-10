# Resource Attributes and Dep - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Variables-Resource-Attributes-and-Dependencies/Resource-Attributes-and-Dep)

---

## Table of Contents

- Resource Attributes and Dep
  - Understanding Exported Attributes
  - Referencing Resource Attributes
  - Managing Explicit Dependencies
  - Conclusion
  - Additional Resources
  - Watch Video

---

## Content

Terraform Associate Certification: HashiCorp Certified

Variables Resource Attributes and Dependencies

# Resource Attributes and Dep

In this lesson, we explore how Terraform manages resource attributes and dependencies. When you provision a resource, Terraform stores various details (attributes) related to that resource. These attributes can then be referenced throughout your configuration, enabling you to create dynamic and interconnected infrastructures.

## Understanding Exported Attributes

Earlier, we created an AWS key pair resource that required a user-supplied public key. After its creation, Terraform exported several attributes, which you can inspect using the Terraform show command.

Below is the configuration used to create the AWS key pair resource:

```
resource "aws_key_pair" "alpha" {
  key_name   = "alpha"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAADAQABAAABAAQD3......alpha@a-server"
}
```

Run the following command to display the resource details:

```
$ terraform show
```

The command produces output similar to this:

```
# aws_key_pair.alpha:
resource "aws_key_pair" "alpha" {
  arn          = "arn:aws:ec2:us-east-1::key-pair/alpha"
  fingerprint  = "d7:ff:a6:63:18:64:9c:57:a1:ee:ca:a4:ad:c2:81:62"
  id           = "alpha"
  key_name     = "alpha"
  public_key   = "ssh-rsa AAAAB3NzaC1yc2EAAAA...alpha@a-server"
  tags_all     = {}
}
```

This output reveals exported attributes such as ARN, fingerprint, ID, key name, public key, and tags. For more detailed explanations of these attributes, refer to the [Terraform Documentation](https://www.terraform.io/docs) for each resource.

> [!important]
> **Note**
>
> Remember: Utilizing exported attributes allows you to build dependencies between resources, enabling dynamic infrastructure provisioning.

## Referencing Resource Attributes

Exported resource attributes are often used as inputs for configuring other resources. Consider a scenario where you need to configure an EC2 instance using the AWS key pair resource. You can reference the key pair's attributes in your EC2 instance configuration as follows:

```
resource "aws_key_pair" "alpha" {
  key_name   = "alpha"
  public_key = "ssh-rsa..."
}


resource "aws_instance" "cerberus" {
  ami           = var.ami
  instance_type = var.instance_type
  key_name      = aws_key_pair.alpha.key_name
}
```

In this configuration, the EC2 instance's key_name parameter is set using the reference expression:

resourceType.ResourceName.attribute

Here, `aws_key_pair.alpha.key_name` refers to the key_name attribute of the key pair resource named "alpha". By running `terraform apply`, both the key pair and the EC2 instance are provisioned in the correct order. Terraform automatically ensures that the key pair is created before the EC2 instance, thanks to the inherent resource dependency.

The sample console output from running `terraform apply` is shown below:

```
$ terraform apply
...
aws_key_pair.alpha: Creating...
aws_key_pair.alpha: Creation complete after 1s [id=alpha]
aws_instance.cerberus: Creating...
aws_instance.cerberus: Still creating... [10s elapsed]
aws_instance.cerberus: Creation complete after 10s [id=i-c791dc46a6639d4a7]
Apply complete! Resources: 2 added, 0 changed, 0 destroyed
```

> [!important]
> **Note**
>
> Terraform automatically manages the creation order by analyzing resource dependencies. During deletion, resources are removed in reverse order, ensuring a safe teardown.

## Managing Explicit Dependencies

Sometimes, two resources might not implicitly depend on each other—for instance, two EC2 instances that do not reference one another. In such cases, you can enforce a creation order using the `depends_on` meta-argument.

Imagine you have two EC2 instances: one for your database server and another for your web server. To ensure that Terraform creates the database instance before the web instance, modify the configuration as follows:

```
resource "aws_instance" "db" {
  ami           = var.db_ami
  instance_type = var.db_instance_type
}


resource "aws_instance" "web" {
  ami           = var.web_ami
  instance_type = var.web_instance_type
  depends_on = [
    aws_instance.db
  ]
}
```

With the `depends_on` argument, Terraform provisions the database instance first. When removing resources, it deletes the web instance before the database instance, preserving the dependency order.

> [!important]
> **Warning**
>
> Be cautious with explicit dependencies. Overusing `depends_on` can lead to unnecessarily complex dependency graphs, which might complicate the execution plan.

## Conclusion

This lesson has reviewed how Terraform manages resource attributes and dependencies. By leveraging both implicit and explicit dependencies, you can efficiently control resource creation and deletion order, ensuring a robust infrastructure lifecycle management.

Happy building with Terraform!

## Additional Resources

- [Terraform Documentation](https://www.terraform.io/docs)
- [AWS Provider Docs](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/cca81ade-f05a-42b2-af56-1926cade6582/lesson/c980f12b-3dab-4e34-8d4f-beb7178d78be)**
>
> Watch video content
