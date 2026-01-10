# OpenTofu Provisioners - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Provisioners/OpenTofu-Provisioners)

---

## Table of Contents

- OpenTofu Provisioners
  - Provisioner Types
  - Remote-Exec Provisioner
  - Local-Exec Provisioner
  - Create-Time and Destroy-Time Hooks
  - Handling Provisioner Failures
  - Best Practices
  - Links and References
  - Watch Video
    - Example Resources

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Provisioners

# OpenTofu Provisioners

Provisioners in OpenTofu enable you to execute scripts or commands either on remote resources or locally on the machine running the OpenTofu binary. They are useful for bootstrapping instances or performing cleanup tasks but should be used sparingly.

## Provisioner Types

| Provisioner Type | Execution Location | Default Timing |
| ---------------- | ------------------ | -------------- |
| remote-exec      | Remote instance    | Create-time    |
| local-exec       | Local machine      | Create-time    |

## Remote-Exec Provisioner

Use `remote-exec` to run shell commands on a newly created EC2 instance. Place the provisioner block inside your resource:

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


  connection {
    type        = "ssh"
    host        = self.public_ip
    user        = "ubuntu"
    private_key = file("/root/.ssh/web")
  }


  key_name               = aws_key_pair.web.id
  vpc_security_group_ids = [aws_security_group.ssh-access.id]
}
```

> [!important]
> **Prerequisites**
>
> - A security group allowing SSH (`22`) or WinRM (`5986` for Windows).
> - An SSH key pair created via `aws_key_pair` or your preferred key management.
> - Correct user name for your AMI (e.g., `ubuntu`, `ec2-user`, `admin`).

### Example Resources

```
resource "aws_key_pair" "web" {
  key_name   = "web-key"
  public_key = file("/root/.ssh/web.pub")
}


resource "aws_security_group" "ssh-access" {
  name        = "allow-ssh"
  description = "Allow SSH inbound"
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```

When you run `tofu apply`, you’ll see:

```
$ tofu apply
aws_key_pair.web: Creating...
aws_security_group.ssh-access: Creating...
aws_instance.webserver: Creating...
aws_instance.webserver: Provisioning with 'remote-exec'...
aws_instance.webserver (remote-exec): Connecting to remote host via SSH...
aws_instance.webserver (remote-exec): Host: 3.96.136.157
aws_instance.webserver (remote-exec): User: ubuntu
aws_instance.webserver (remote-exec): Connected!
Apply complete! Resources: 3 added, 0 changed, 0 destroyed.
```

## Local-Exec Provisioner

The `local-exec` provisioner runs commands on your workstation or CI/CD runner where OpenTofu is executed:

```
resource "aws_instance" "webserver" {
  ami           = "ami-0edad43b6fa892279"
  instance_type = "t2.micro"


  provisioner "local-exec" {
    command = "echo ${aws_instance.webserver.public_ip} >> /tmp/ips.txt"
  }
}
```

After `tofu apply`, verify the file:

```
$ cat /tmp/ips.txt
54.214.68.27
```

## Create-Time and Destroy-Time Hooks

By default, provisioners run after creation. You can also run them before destruction:

```
resource "aws_instance" "webserver" {
  ami           = "ami-0edad43b6fa892279"
  instance_type = "t2.micro"


  provisioner "local-exec" {
    when    = "create"
    command = "echo Instance ${aws_instance.webserver.public_ip} Created! > /tmp/instance_state.txt"
  }


  provisioner "local-exec" {
    when    = "destroy"
    command = "echo Instance ${aws_instance.webserver.public_ip} Destroyed! >> /tmp/instance_state.txt"
  }
}
```

## Handling Provisioner Failures

By default, a failed provisioner aborts the apply and marks the resource as tainted:

```
resource "aws_instance" "webserver" {
  # ...


  provisioner "local-exec" {
    on_failure = "fail"
    command    = "echo Instance ${aws_instance.webserver.public_ip} > /temp/instance_state.txt"
  }
}
```

```
$ tofu apply
Error: Error running command 'echo 35.183.14.192 > /temp/instance_state.txt': exit status 1.
Output: The system cannot find the path specified.
```

To continue despite errors, set `on_failure = "continue"`:

```
provisioner "local-exec" {
  on_failure = "continue"
  command    = "echo Instance ${aws_instance.webserver.public_ip} > /temp/instance_state.txt"
}
```

> [!important]
> **Warning**
>
> Overusing `on_failure = "continue"` can hide critical bootstrap errors. Use it only when failures are non-fatal.

## Best Practices

- Use provisioners **only as a last resort**.
- Prefer native options when available:
  - AWS: `user_data`
  - Azure: `custom_data`
  - GCP: `metadata.startup-script`

Example using AWS `user_data`:

```
resource "aws_instance" "webserver" {
  ami           = "ami-0edad43b6fa892279"
  instance_type = "t2.micro"


  tags = {
    Name        = "webserver"
    Description = "NGINX WebServer on Ubuntu"
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

> [!important]
> **Note**
>
> Using `user_data` or cloud-init reduces complexity and maintains idempotency compared to provisioners.

## Links and References

- [OpenTofu Provisioners](https://docs.opentofu.io/provisioners)
- [Terraform Provisioner Documentation](https://www.terraform.io/language/resources/provisioners)
- [AWS EC2 Instance Resource](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/98011198-b847-4ee1-a7bd-7593bfe5576c/lesson/373ac6fd-f67c-4596-9de4-1f158c1025bb)**
>
> Watch video content
