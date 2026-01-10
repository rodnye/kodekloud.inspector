# Terraform Provisioners - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-Provisioners/Terraform-Provisioners)

---

## Table of Contents

- Terraform Provisioners
  - Remote Execution Example
  - Remote Execution with Connection Block
  - Local Execution with local-exec Provisioner
  - Create-Time and Destroy-Time Provisioners
  - Handling Provisioner Failures
  - Best Practices: Using Native Resource Capabilities
  - Conclusion
  - Useful Links and References
  - Watch Video

---

## Content

Terraform Basics Training Course

Terraform Provisioners

# Terraform Provisioners

In this article, we revisit Terraform provisioners and demonstrate how to use them effectively for both remote and local operations. Provisioners allow you to execute commands or scripts on remote resources or on the local machine where Terraform is run. For example, the remote-exec provisioner can be used to execute a bash script immediately after a resource is created.

## Remote Execution Example

Below is an example using our familiar web server scenario. In this configuration, an inline script is executed after an EC2 instance is deployed. This script updates the package index, installs NGINX, and then enables and starts the service:

```
resource "aws_instance" "webserver" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"


  provisioner "remote-exec" {
    inline = [
      "sudo apt update",
      "sudo apt install nginx -y",
      "sudo systemctl enable nginx",
      "sudo systemctl start nginx",
    ]
  }

  key_name               = aws_key_pair.web.id
  vpc_security_group_ids = [aws_security_group.ssh-access.id]
}
```

> [!important]
> **Note**
>
> Ensure that the proper network connectivity (SSH for Linux or WinRM for Windows), security groups, and an SSH key pair are in place for successful execution.

## Remote Execution with Connection Block

This example expands on the previous one by including a connection block, which specifies the SSH details required to connect to the remote instance. The connection block leverages the `self.public_ip` expression to dynamically reference the deployed instance's public IP address:

```
resource "aws_instance" "webserver" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"

  provisioner "remote-exec" {
    inline = [
      "sudo apt update",
      "sudo apt install nginx -y",
      "sudo systemctl enable nginx",
      "sudo systemctl start nginx",
    ]
  }

  connection {
    type        = "ssh"
    host        = self.public_ip
    user        = "ubuntu"
    private_key = file("/root/.ssh/web")
  }

  key_name               = aws_key_pair.web.id
  vpc_security_group_ids = [aws_security_group.ssh-access.id]
}


resource "aws_key_pair" "web" {
  # << code hidden >>
}
```

## Local Execution with local-exec Provisioner

Provisioners are not limited to remote tasks. The local-exec provisioner is used to execute commands on the local machine where Terraform is run. This is particularly useful for gathering information and saving it locally. The following example stores the public IP address of an EC2 instance in the `/tmp/ips.txt` file:

```
resource "aws_instance" "webserver" {
  ami           = "ami-0edad43b6fa892279"
  instance_type = "t2.micro"


  provisioner "local-exec" {
    command = "echo ${aws_instance.webserver.public_ip} >> /tmp/ips.txt"
  }
}
```

## Create-Time and Destroy-Time Provisioners

By default, provisioners run after a resource is created (create-time provisioners). However, you can also configure a provisioner to run before a resource is destroyed (destroy-time provisioners) using the `when` argument. The example below demonstrates both scenarios:

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

After applying this configuration, you might see output similar to the following upon resource destruction:

```
$ cat /tmp/instance_state.txt
Instance 3.96.136.157 Deleted!
```

## Handling Provisioner Failures

A key behavior of provisioners is that if the command or script execution fails, the entire `terraform apply` operation will error out. For example, specifying an incorrect file path can lead to failure:

```
resource "aws_instance" "webserver" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"


  provisioner "local-exec" {
    command = "echo Instance ${aws_instance.webserver.public_ip} Created! > /temp/instance_state.txt"
  }


  provisioner "local-exec" {
    when    = destroy
    command = "echo Instance ${aws_instance.webserver.public_ip} Destroyed! > /tmp/instance_state.txt"
  }
}
```

```
$ terraform apply
Error: Error running command 'echo 35.183.14.192 > /temp/pub_ip.txt': exit status 1.
Output: The system cannot find the path specified.
```

To modify this behavior, you can set the `on_failure` argument within the provisioner block. This allows Terraform to continue with resource creation even if the command fails. For example:

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
    command = "echo Instance ${aws_instance.webserver.public_ip} Destroyed! > /tmp/instance_state.txt"
  }
}
```

> [!important]
> **Warning**
>
> Use provisioners sparingly. They are intended as a last resort when native resource configurations are not available.

## Best Practices: Using Native Resource Capabilities

Terraform recommends using provisioners only as a last resort. Whenever possible, prefer native resource configurations supplied by the provider. For example, AWS EC2 instances can be configured using user data, Azure Virtual Machines with custom data, or metadata for GCP. The following example leverages AWS EC2 user data to install and start NGINX on an Ubuntu instance without resorting to provisioners:

```
resource "aws_instance" "webserver" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"
  tags = {
    Name        = "webserver"
    Description = "An NGINX WebServer on Ubuntu"
  }
  user_data = <<-EOF
    #!/bin/bash
    sudo apt update
    sudo apt install nginx -y
    sudo systemctl enable nginx
    sudo systemctl start nginx
  EOF
}
```

## Conclusion

Terraform provisioners, such as remote-exec and local-exec, provide flexibility for post-deployment configuration and local operations. However, they should be used judiciously. Leveraging native resource capabilities results in more reliable and maintainable configurations.

## Useful Links and References

- [Terraform Provisioners Documentation](https://www.terraform.io/docs/provisioners/index.html)
- [AWS EC2 User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata.html)
- [Terraform Documentation](https://www.terraform.io/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/9fcbd3cd-b06d-4816-8646-3639ca3d19cd/lesson/c52ef7d1-b55a-46d8-90b1-c8a2e0763adb)**
>
> Watch video content
