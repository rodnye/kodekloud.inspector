# Terraform Import - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Basics-Training-Course/Terraform-Import-Tainting-Resources-and-Debugging/Terraform-Import)

---

## Table of Contents

- Terraform Import
  - Accessing Existing Resources Using Data Sources
  - Importing an Existing Resource into Terraform
  - Next Steps
  - Watch Video
  - Practice Lab
    - Step 1: Create an Empty Resource Block
    - Step 2: Run the Import Command
    - Step 3: Complete the Resource Configuration

---

## Content

Terraform Basics Training Course

Terraform Import Tainting Resources and Debugging

# Terraform Import

In this guide, we will explain how to import existing infrastructure into your Terraform configuration using the Terraform import command. Typically, you create and manage resources with Terraform. However, in many real-world projects, some resources might be provisioned with tools like the AWS Management Console or Ansible. Importing these resources into Terraform helps streamline provisioning, updates, and deletion.

For instance, consider the following diagram illustrating AWS services managed by Terraform, Ansible, and the AWS Management Console:

![The image shows AWS services managed by Terraform, Ansible, and AWS Management Console, including EC2, DynamoDB, S3, Route 53, Elastic Block Store, and VPC.](https://kodekloud.com/kk-media/image/upload/v1752884193/notes-assets/images/Terraform-Basics-Training-Course-Terraform-Import/frame_40.jpg)

This diagram sets the stage for your inquiry: How can you bring externally created resources under Terraform’s direct management?

## Accessing Existing Resources Using Data Sources

Initially, you might leverage data sources in Terraform to fetch details from resources not currently managed by your configuration. Data sources allow you to read attributes and integrate existing infrastructure into your workflow without enabling Terraform to update or delete these resources.

For example, the configuration below reads attributes of an existing AWS instance using its instance ID:

```
data "aws_instance" "newserver" {
  instance_id = "i-026e13be10d5326f7"
}


output "newserver" {
  value = data.aws_instance.newserver.public_ip
}
```

When you run:

```
$ terraform apply


data.aws_instance.newserver: Refreshing state... [id=i-026e13be10d5326f7]
aws_key_pair.web: Refreshing state... [id=terraform-2020101501348509100000001]
aws_security_group.ssh-access: Refreshing state... [id=sg-0a543f25009e14628]
aws_instance.webserver: Refreshing state... [id=i-068fad300d9df27ac]


Apply complete! Resources: 0 added, 0 changed, 0 destroyed.


Outputs:
newserver = 15.223.1.176
```

Notice that while Terraform outputs the instance's public IP, it remains unmanaged by Terraform since it’s accessed as a data source.

## Importing an Existing Resource into Terraform

To fully control an existing resource, you need to import it into Terraform’s state. The syntax for the import command is as follows:

```
# terraform import <resource_type>.<resource_name> <attribute>
$ terraform import aws_instance.webserver-2 i-026e13be10d5326f7
```

> [!important]
> **Warning**
>
> Before running the import command, ensure that the corresponding configuration exists. If the resource block isn't defined, Terraform will return an error.

If the resource configuration hasn’t been created, you might see an error like:

```
Error: resource address "aws_instance.webserver-2" does not exist in the configuration.


Before importing this resource, please create its configuration in the root module. For example:
resource "aws_instance" "webserver-2" {
  # (resource arguments)
}
```

Terraform import only updates the state file and does not alter configuration files. Hence, ensure that you create an appropriate resource block beforehand.

### Step 1: Create an Empty Resource Block

Begin by defining an empty resource block in your configuration file:

```
resource "aws_instance" "webserver-2" {
  # (resource arguments)
}
```

### Step 2: Run the Import Command

After the empty block is defined, run the import command again. It should output something similar to:

```
$ terraform import aws_instance.webserver-2 i-026e13be10d5326f7
aws_instance.webserver-2: Importing from ID "i-026e13be10d5326f7"...
aws_instance.webserver-2: Import prepared!
Prepared aws_instance for import
aws_instance.webserver-2: Refreshing state... [id=i-026e13be10d5326f7]


Import successful!
```

The command imports the resource into your Terraform state file, allowing Terraform to manage it moving forward.

### Step 3: Complete the Resource Configuration

Next, update the resource block with the necessary configurations. You can retrieve the required attribute values from the AWS Management Console or by inspecting the state file. For example, update the resource configuration as follows:

```
resource "aws_instance" "webserver-2" {
  ami                    = "ami-0edab43b6fa892279"
  instance_type          = "t2.micro"
  key_name               = "ws"
  vpc_security_group_ids = ["sg-8064fdeee"]
}
```

Running a Terraform plan now ensures that your configuration matches the imported infrastructure:

```
$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be persisted to local or remote state storage.


aws_instance.webserver-2: Refreshing state... [id=i-0d7c0088069819ff8]
-------------------------------------------------------------------------------
No changes. Infrastructure is up-to-date.
```

> [!important]
> **Note**
>
> This output confirms that Terraform has successfully imported the resource. Any future changes to the infrastructure can be managed by modifying this configuration and following the standard Terraform workflow: init, plan, and apply.

## Next Steps

Proceed to the hands-on labs to practice using the Terraform import command, and continue streamlining your infrastructure management by bringing all resources under Terraform control.

For further information, check out:

- [Terraform Documentation](https://www.terraform.io/docs/)
- [AWS Documentation](https://docs.aws.amazon.com/)
- [Terraform Import Guide](https://www.terraform.io/cli/import)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/29825b4d-c0d3-4732-a4e0-ec3a2988e2a3/lesson/bcdec6a0-4ac8-4995-8374-2e6af2aaf68a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/terraform-basics-training-course/module/29825b4d-c0d3-4732-a4e0-ec3a2988e2a3/lesson/2ad6df8d-66d1-41e1-be9d-b78f0c1065e6)**
>
> Practice lab
