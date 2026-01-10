# Provisioners - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Read-generate-and-modify-configuration/Provisioners)

---

## Table of Contents

- Provisioners
  - Remote-Exec Provisioner
  - Local-Exec Provisioner
  - Best Practices
  - Summary
  - Additional Resources
  - Watch Video
    - Handling Provisioner Failures

---

## Content

Terraform Associate Certification: HashiCorp Certified

Read generate and modify configuration

# Provisioners

Terraform provisioners enable you to execute commands or scripts either locally or on remote resources. They are especially useful for post-creation configuration tasks such as installing packages or starting services. In this guide, we’ll explore both the remote-exec and local-exec provisioners, their configurations, and best practices for use.

## Remote-Exec Provisioner

The remote-exec provisioner allows you to run commands on a remote resource, such as a web server instance. For example, after creating a web server, you might want to update the package list, install NGINX, enable it at startup, and then start the service. The configuration below demonstrates how to use the remote-exec provisioner:

```
resource "aws_instance" "webserver" {
  ami           = "ami-0edad43b6fa892279"
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
> Ensure that network connectivity exists between the machine running Terraform and the remote instance. For Linux, this typically involves SSH, whereas Windows instances require WinRM connectivity.

In the example below, a security group and an SSH key pair resource are also created to manage connectivity and authentication:

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


resource "aws_security_group" "ssh-access" {
  << code hidden >>
}
```

To facilitate secure authentication, define a connection block inside your resource configuration. The connection block below enables SSH access by setting the host to the instance's public IP, the user to "ubuntu," and retrieves the private key from a local file:

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
  << code hidden >>
}
```

When you run `terraform apply`, Terraform connects to the instance via SSH as specified in the connection block and executes the inline script. An example output is shown below:

```
$ terraform apply
aws_key_pair.web: Creating...
aws_security_group.ssh-access: Creating...
aws_key_pair.web: Creation complete after 0s [id=terraform-202201015013048590100000001]
aws_security_group.ssh-access: Creation complete after 1s [id=sg-0]
aws_instance.webserver: Creating...
aws_instance.webserver: Still creating... [10s elapsed]
aws_instance.webserver: Still creating... [20s elapsed]
aws_instance.webserver: Still creating... [30s elapsed]
aws_instance.webserver (remote-exec): Connecting to remote host via SSH...
aws_instance.webserver (remote-exec):   Host: 3.96.136.157
aws_instance.webserver (remote-exec):   User: ubuntu
aws_instance.webserver (remote-exec):   Password: false
aws_instance.webserver (remote-exec):   Private key: true
aws_instance.webserver (remote-exec):   Certificate: false
aws_instance.webserver (remote-exec):   SSH Agent: false
aws_instance.webserver (remote-exec): Connected!
aws_instance.webserver: Still creating... [40s elapsed]
aws_instance.webserver: Creating...
aws_instance.webserver: Creation complete after 50s [id=i-0e10fd3a5b1a4f16c]
```

## Local-Exec Provisioner

The local-exec provisioner runs commands on the local machine where Terraform is executed. It’s useful for tasks like logging or writing data to a file. For example, to save the public IP address of an EC2 instance to `/tmp/ips.txt`, you can configure the local-exec provisioner as follows:

```
resource "aws_instance" "webserver" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"


  provisioner "local-exec" {
    command = "echo ${aws_instance.webserver.public_ip} >> /tmp/ips.txt"
  }
}
```

After running `terraform apply`, the instance's public IP will be appended to the file on your local system.

Provisioners run by default after resource creation (create-time provisioners), but you can also execute them before resource destruction. In the example below, one local-exec provisioner runs post-creation and another runs pre-destruction:

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

When you inspect the file (for example, by executing `cat /tmp/instance_state.txt`), you might see:

```
$ cat /tmp/instance_state.txt
Instance 3.96.136.157 Destroyed!
```

### Handling Provisioner Failures

By default, if a provisioner command fails, Terraform will error out and mark any created resources as tainted. You can customize this behavior using the `on_failure` argument:

- To force Terraform to fail on error, use:

  ```
  resource "aws_instance" "webserver" {
    ami           = "ami-0edab43b6fa892279"
    instance_type = "t2.micro"


    provisioner "local-exec" {
      on_failure = "fail"
      command    = "echo Instance ${aws_instance.webserver.public_ip} Created! > /tmp/instance_state.txt"
    }


    provisioner "local-exec" {
      when    = destroy
      command = "echo Instance ${aws_instance.webserver.public_ip} Destroyed! > /tmp/instance_state.txt"
    }
  }
  ```

- Alternatively, if you want resource creation to succeed even when the provisioner command fails, set `on_failure` to `"continue"`:

  ```
  resource "aws_instance" "webserver" {
    ami           = "ami-0edab43b6fa892279"
    instance_type = "t2.micro"


    provisioner "local-exec" {
      on_failure = "continue"
      command    = "echo Instance ${aws_instance.webserver.public_ip} Created! > /tmp/instance_state.txt"
    }


    provisioner "local-exec" {
      when    = destroy
      command = "echo Instance ${aws_instance.webserver.public_ip} Destroyed! > /tmp/instance_state.txt"
    }
  }
  ```

## Best Practices

Terraform advises using provisioners only as a last resort. When possible, utilize the inherent features of your resource type to perform configuration actions. For example, rather than using remote-exec provisioner to install software on an AWS EC2 instance, consider using the `user_data` attribute to initiate scripts during instance launch. Here’s an improved approach using the `user_data` attribute to install and start NGINX on an EC2 instance:

```
resource "aws_instance" "webserver" {
  ami           = "ami-0edad43b6fa892279"
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

With this configuration, the initialization script runs automatically during boot, reducing dependency on provisioners for post-creation configuration.

## Summary

Terraform provisioners, both remote-exec and local-exec, offer flexible options for performing configuration tasks after resource creation or before destruction. However, for improved efficiency and reliability, consider native configuration options like `user_data` or metadata provided by cloud providers.

Now, please head over to the multiple-choice quiz for this section.

## Additional Resources

- [Terraform Provisioners Documentation](https://www.terraform.io/docs/language/resources/provisioners/syntax.html)
- [AWS EC2 User Data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/c59e52ed-8a8c-4a6c-8ad0-8dcc38c1598e/lesson/193385e5-f8be-4211-bf7b-18c71b1489bb)**
>
> Watch video content
