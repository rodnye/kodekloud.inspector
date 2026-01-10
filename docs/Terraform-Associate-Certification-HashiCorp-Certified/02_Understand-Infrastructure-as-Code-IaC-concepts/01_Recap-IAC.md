# Recap IAC - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Understand-Infrastructure-as-Code-IaC-concepts/Recap-IAC)

---

## Table of Contents

- Recap IAC
  - 1. Configuration Management Tools
  - 2. Server Templating Tools
  - 3. Infrastructure Provisioning (Orchestration) Tools
  - Procedural vs. Declarative Approach
  - Choosing the Right IaC Tool
  - Watch Video
    - Ansible Example (Procedural)
    - Terraform Example (Declarative)

---

## Content

Terraform Associate Certification: HashiCorp Certified

Understand Infrastructure as Code IaC concepts

# Recap IAC

In this article, we explore key concepts and tools in the Infrastructure as Code (IaC) ecosystem to help you prepare for your exam. IaC not only simplifies the deployment process but also ensures consistency and scalability in modern IT infrastructures.

We leverage a variety of tools such as Ansible, Terraform, Puppet, CloudFormation, Packer, SaltStack, Vagrant, Docker, and more. Although many of these tools can achieve similar outcomes, each one is optimized for specific tasks. Broadly, IaC tools are classified into three categories:

## 1\. Configuration Management Tools

Tools such as Ansible, Chef, Puppet, and SaltStack are used to install and manage software on existing infrastructure resources like servers, databases, and networking devices. They help maintain a consistent code structure, enable version control, and ensure idempotency (i.e., re-executing the code only applies necessary changes).

![The image lists configuration management tools Ansible, Puppet, and SaltStack, highlighting features like software installation, standard structure maintenance, version control, and idempotency.](https://kodekloud.com/kk-media/image/upload/v1752884168/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Recap-IAC/frame_90.jpg)

For example, an Ansible playbook designed to install a package on a group of servers first checks whether the software is already installed, only applying the installation when necessary.

## 2\. Server Templating Tools

Server templating tools such as Docker, Packer, and Vagrant are used to create custom images of virtual machines or containers. These images are pre-installed with the required software and dependencies, eliminating the need for post-deployment software installation. Common examples include VM images from [osboxes.org](https://www.osboxes.org), custom [Amazon AMIs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html), and Docker images from [Docker Hub](https://hub.docker.com).

Server templating supports an immutable infrastructure model—making updates as simple as redeploying a new instance with an updated image rather than modifying a running system.

![The image lists server templating tools: Docker, Packer, and Vagrant, highlighting features like pre-installed software, virtual machine or Docker images, and immutable infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752884169/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Recap-IAC/frame_150.jpg)

## 3\. Infrastructure Provisioning (Orchestration) Tools

Provisioning tools, such as Terraform and CloudFormation, enable you to manage a variety of infrastructure components like virtual machines, databases, VPCs, subnets, security groups, and storage using declarative code. CloudFormation is ideal for AWS-only deployments, whereas Terraform offers a vendor-agnostic solution that supports multi-cloud or hybrid environments through numerous plugins.

![The image describes provisioning tools for deploying immutable infrastructure resources, including servers and databases, using multiple providers like Terraform and CloudFormation.](https://kodekloud.com/kk-media/image/upload/v1752884170/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Recap-IAC/frame_240.jpg)

> [!important]
> **Note**
>
> Although configuration management tools can provision infrastructure (for example, using Ansible’s EC2 module), this approach is less effective for managing larger infrastructures due to its procedural nature.

---

## Procedural vs. Declarative Approach

Understanding the difference between procedural and declarative approaches is crucial when working with IaC tools.

### Ansible Example (Procedural)

Ansible employs a procedural approach in which every step must be explicitly defined. Consider the following playbook that provisions two EC2 instances:

```
- name: Provision AWS Resources
  hosts: localhost
  tasks:
    - name: Provision EC2 instances using Ansible
      ec2:
        key_name: appserver
        instance_tags:
          Name: appserver
        instance_type: t2.micro
        image: ami-0d8ad3ab25e7abc51
        region: ca-central-1
        wait: yes
        count: 2
```

Executing the playbook:

```
> ansible-playbook ec2.yaml
.
PLAY RECAP *********************************************************************
localhost                  : ok=2    changed=1    unreachable=0    failed=0    rescued=0    ignored=0
```

If you run the playbook again, Ansible will create two additional EC2 instances, resulting in a total of four. To maintain exactly two instances, you must include additional parameters to manage the desired state. The enhanced version for both provisioning and deletion is as follows:

```
- name: Provision AWS Resources
  hosts: localhost
  tasks:
    - name: Provision EC2 instances using Ansible
      ec2:
        key_name: appserver
        instance_tags:
          Name: appserver
        instance_type: t2.micro
        image: ami-0d8ad3ab25e7abc51
        region: ca-central-1
        wait: yes
        exact_count: 2
        count_tag:
          Name: appserver


    - name: Delete Instances
      ec2:
        state: absent
        instance_ids: '{{ ec2.instance_ids }}'
```

### Terraform Example (Declarative)

In contrast, Terraform uses a declarative approach where you specify the desired end state of your infrastructure. Consider the Terraform configuration below that ensures exactly two EC2 instances:

```
resource "aws_instance" "app" {
  ami           = "ami-0d8ad3ab25e7abc51"
  instance_type = "t2.micro"
  count         = 2
  key_name      = "appserver"
  tags = {
    Name = "appserver"
  }
}
```

Running the following command applies the configuration:

```
> terraform apply
```

Terraform creates or maintains exactly two EC2 instances. On subsequent executions, Terraform will indicate that the current state matches the configuration:

```
> terraform apply
aws_instance.app[0]: Creation complete after 33s [id=i-014c93c14e12a6442]
aws_instance.app[1]: Creation complete after 33s [id=i-0fc7d85da32d24c63]
Terraform has compared your real infrastructure against your configuration and found no changes. You can start your work!


Apply complete! Resources: 2 added, 0 changed, 0 destroyed.
```

If no drift is detected, the output will state:

```
> terraform apply
No changes. Your infrastructure matches the configuration.


Terraform has compared your real infrastructure against your configuration and found no differences, so no changes are needed.


Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
```

Terraform maintains the state of each provisioned resource in a state file, which it uses to detect deviations between your desired configuration and the actual infrastructure. This powerful state management enables resource teardown using:

```
> terraform destroy
```

---

## Choosing the Right IaC Tool

There is no one-size-fits-all solution when it comes to selecting an IaC tool. For deployments exclusive to AWS, CloudFormation offers simplicity and direct integration. However, for multi-cloud or hybrid environments, Terraform's vendor-agnostic design makes it an excellent choice.

> [!important]
> **Tip**
>
> Maximize efficiency by leveraging the strengths of each IaC tool: use Terraform for resource provisioning and configuration management tools like Ansible for post-deployment tasks such as software installation and configuration.

For further insights on IaC best practices and tool comparisons, consider reviewing additional resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/e27c7cfe-a9f1-4e56-b55b-f908bd92d21c/lesson/85dd5318-6fff-4041-901e-ce75b6b47afb)**
>
> Watch video content
