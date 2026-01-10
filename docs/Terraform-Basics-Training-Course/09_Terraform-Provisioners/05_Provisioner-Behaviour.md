# Provisioner Behaviour - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-Provisioners/Provisioner-Behaviour)

---

## Table of Contents

- Provisioner Behaviour
  - Creation-Time Provisioners
  - Destroy-Time Provisioners
  - Handling Provisioner Failures
  - Allowing Provisioner Failures
  - Watch Video
  - Practice Lab

---

## Content

Terraform Basics Training Course

Terraform Provisioners

# Provisioner Behaviour

In this lesson, you'll learn how to leverage provisioners in Terraform to execute scripts or commands during resource creation or destruction. Provisioners offer flexibility by allowing you to perform custom actions on your resources, such as logging details or cleaning up after resource deletion.

## Creation-Time Provisioners

Creation-time provisioners are triggered when a resource is created. Terraform supports both remote and local execution of commands during this phase. For instance, the example below launches an AWS EC2 instance and uses the local-exec provisioner to record the instance's public IP address to a local file:

```
resource "aws_instance" "webserver" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"

  provisioner "local-exec" {
    command = "echo Instance ${aws_instance.webserver.public_ip} Created! > /tmp/instance_state.txt"
  }
}
```

After applying this configuration, you can verify the output by running:

```
$ cat /tmp/instance_state.txt
```

> [!important]
> **Tip**
>
> Remember to verify that the specified file path exists and is writable by your user.

## Destroy-Time Provisioners

Terraform also allows you to execute provisioners right before a resource is destroyed. By setting the `when` argument to `destroy`, you can define commands to be executed during the resource's teardown process. The example below shows a resource block that contains both creation and destroy-time provisioners:

```
resource "aws_instance" "webserver" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"


  provisioner "local-exec" {
    command = "echo Instance ${aws_instance.webserver.public_ip} Created! > /tmp/instance_state.txt"
  }


  provisioner "local-exec" {
    when    = destroy
    command = "echo Instance ${aws_instance.webserver.public_ip} Destroyed! > /tmp/instance_state.txt"
  }
}
```

After the resource is destroyed, checking the file might show an output similar to:

```
$ cat /tmp/instance_state.txt
Instance 3.96.136.157 Destroyed!
```

## Handling Provisioner Failures

By default, if a provisioner fails, Terraform stops the execution and the entire `terraform apply` fails. For example, if the command in the creation-time provisioner attempts to write to a non-existent directory, Terraform will produce an error:

```
resource "aws_instance" "webserver" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"


  provisioner "local-exec" {
    on_failure = fail
    command    = "echo Instance ${aws_instance.webserver.public_ip} Created! > /temp/instance_state.txt"
  }


  provisioner "local-exec" {
    when    = destroy
    command = "echo Instance ${aws_instance.webserver.public_ip} Destroyed! > /temp/instance_state.txt"
  }
}
```

Running `terraform apply` with this configuration may produce an output similar to:

```
$ terraform apply
Error: Error running command 'echo 35.183.14.192 > /temp/pub_ip.txt': exit status 1.
Output: The system cannot find the path specified.
```

When this error occurs, Terraform marks the associated resource as tainted, indicating it may need to be recreated.

> [!important]
> **Failure Handling**
>
> Ensure that any file paths or commands used in provisioners are valid and tested. Failing provisioners can block your deployment process.

## Allowing Provisioner Failures

In some cases, the execution of a provisioner may be optional and should not halt the entire apply process if it fails. To override the default behavior, set the `on_failure` argument to `continue`:

```
resource "aws_instance" "webserver" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"


  provisioner "local-exec" {
    on_failure = continue
    command    = "echo Instance ${aws_instance.webserver.public_ip} Created! > /temp/instance_state.txt"
  }


  provisioner "local-exec" {
    when    = destroy
    command = "echo Instance ${aws_instance.webserver.public_ip} Destroyed! > /temp/instance_state.txt"
  }
}
```

With the `on_failure` option set to `continue`, Terraform proceeds with the apply process even if the provisioner fails:

```
$ terraform apply
aws_instance.webserver (local-exec): The system cannot find the path specified.
aws_instance.project: Creation complete after 22s [id=i-01585c2b9dbc445db]
```

This concludes the lesson on Terraform provisioners. Experiment with these configurations to solidify your understanding and enhance your Terraform deployments.

For more information, consider visiting the following resources:

- [Terraform Provisioners Documentation](https://www.terraform.io/docs/provisioners/index.html)
- [AWS Provider Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/9fcbd3cd-b06d-4816-8646-3639ca3d19cd/lesson/febf437a-a857-4442-a4ed-564902d4e87d)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/9fcbd3cd-b06d-4816-8646-3639ca3d19cd/lesson/be343b5b-9cbc-4c4a-b8d6-3d4504aba315)**
>
> Practice lab
