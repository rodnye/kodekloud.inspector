# Types of IAC Tools - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Introduction-to-Infrastructure-as-Code/Types-of-IAC-Tools)

---

## Table of Contents

- Types of IAC Tools
  - Watch Video

---

## Content

Terraform Basics Training Course

Introduction to Infrastructure as Code

# Types of IAC Tools

In this article, we introduce the concept of Infrastructure as Code (IAC) and review several popular IAC tools that help automate the provisioning and management of infrastructure.

Traditionally, infrastructure provisioning was performed manually using the management consoles provided by various cloud providers. However, a more robust approach is to codify the entire provisioning process. By writing and executing code, you can define, provision, configure, update, and ultimately decommission infrastructure resources. This approach is known as Infrastructure as Code (IAC). With IAC, almost every component—such as databases, networks, storage systems, and application configurations—can be managed via code.

Consider the following example of a Bash shell script that provisions an [Amazon Elastic Compute Cloud (EC2)](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) instance, waits until it reaches a running state, verifies its status, and then associates an IP address with it:

```
#!/bin/bash

IP_ADDRESS="10.2.2.1"

EC2_INSTANCE=$(ec2-run-instances --instance-type t2.micro ami-0edab43b6fa892279)

INSTANCE=$(echo ${EC2_INSTANCE} | sed 's/.*INSTANCE //; s/ .*//')

# Wait for the instance to be ready
while ! ec2-describe-instances $INSTANCE | grep -q "running"; do
  echo "Waiting for $INSTANCE to be ready..."
done

# Check if the instance is not running and exit if so
if ! ec2-describe-instances $INSTANCE | grep -q "running"; then
  echo "Instance $INSTANCE is stopped."
  exit
fi

ec2-associate-address $IP_ADDRESS -i $INSTANCE
echo "Instance $INSTANCE was created successfully!!!"
```

Managing such scripts can become cumbersome as complexity and custom logic increase. This is where IAC tools like Terraform and Ansible come in. These tools offer human-readable, maintainable configuration files that simplify infrastructure management.

For instance, the same infrastructure resource can be defined with a few lines of Terraform configuration:

```
resource "aws_instance" "webserver" {
  ami           = "ami-0edab43b6fa892279"
  instance_type = "t2.micro"
}
```

Below is an example using Ansible to provision three [Amazon Elastic Compute Cloud (EC2)](https://learn.kodekloud.com/user/courses/amazon-elastic-compute-cloud-ec2) instances with a specific AMI. Although both Ansible and Terraform are IAC tools, each serves different scenarios:

```
- amazon.aws.ec2:
    key_name: mykey
    instance_type: t2.micro
    image: ami-123456
    wait: yes
    group: webserver
    count: 3
    vpc_subnet_id: subnet-29e63245
    assign_public_ip: yes
```

IAC tools can be grouped into three main categories:

1.  > [!important]
    > **Configuration Management Tools**
    >
    > Examples include Ansible, Puppet, and SaltStack. These tools are used for installing and managing software on existing infrastructure components—such as servers, databases, and network devices. They offer a consistent structure for changes, facilitate version control, and are idempotent. An Ansible playbook or role can be stored in a version control system for reuse and distribution.

    ![The image lists configuration management tools Ansible, Puppet, and SaltStack, highlighting features like software management, standard structure, version control, and idempotency.](https://kodekloud.com/kk-media/image/upload/v1752884182/notes-assets/images/Terraform-Basics-Training-Course-Types-of-IAC-Tools/frame_180.jpg)

2.  > [!important]
    > **Server Templating Tools**
    >
    > Tools such as Docker, Vagrant, and Packer (from HashiCorp) allow you to create custom images pre-installed with the software and dependencies you need. This method reduces the need for post-deployment software installation and promotes immutable infrastructure. Common examples include VM images from osboxes.org, custom AMIs in Amazon AWS, and Docker images available on Docker Hub.

    ![The image lists server templating tools: Docker, Packer, and Vagrant, highlighting features like pre-installed software, virtual machine or Docker images, and immutable infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752884183/notes-assets/images/Terraform-Basics-Training-Course-Types-of-IAC-Tools/frame_260.jpg)

3.  > [!important]
    > **Infrastructure Provisioning Tools**
    >
    > These tools use a declarative, high-level language to provision infrastructure components, such as virtual machines, VPCs, databases, subnets, security groups, and storage. While AWS CloudFormation is tailored for AWS, Terraform is vendor-agnostic and supports a wide range of cloud providers through its plugin architecture.

    ![The image describes provisioning tools like Terraform and CloudFormation for deploying immutable infrastructure resources, including servers, databases, and network components across multiple providers.](https://kodekloud.com/kk-media/image/upload/v1752884184/notes-assets/images/Terraform-Basics-Training-Course-Types-of-IAC-Tools/frame_330.jpg)

In the upcoming lesson, we will explore how Terraform simplifies the process of provisioning infrastructure across multiple cloud providers.

---

For additional insights on IAC, consider these resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/e860c2fb-d55e-48f2-87cc-9149460b600a/lesson/8780a3ee-19b8-4802-9861-88fced7d092d)**
>
> Watch video content
