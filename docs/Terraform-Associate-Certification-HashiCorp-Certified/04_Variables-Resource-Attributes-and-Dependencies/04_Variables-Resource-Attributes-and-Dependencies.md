# Variables Resource Attributes and Dependencies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Terraform-Associate-Certification-HashiCorp-Certified/Variables-Resource-Attributes-and-Dependencies/Variables-Resource-Attributes-and-Dependencies)

---

## Table of Contents

- Variables Resource Attributes and Dependencies
  - Marking a Variable as Sensitive
  - Demonstrating Sensitive Handling in Terraform Plan
  - Receiving Sensitive Inputs
  - Handling Errors When Exposing Sensitive Outputs
  - Watch Video

---

## Content

Terraform Associate Certification: HashiCorp Certified

Variables Resource Attributes and Dependencies

# Variables Resource Attributes and Dependencies

In this lesson, you'll learn how to mark variables and outputs as sensitive in Terraform, ensuring secure handling of critical information such as passwords, API keys, and other secrets. Terraform provides built-in mechanisms to safeguard sensitive data, preventing accidental exposure in logs or terminal outputs.

![The image shows a HashiCorp Terraform interface for defining sensitive information, with options for passwords, API keys, and other data.](https://kodekloud.com/kk-media/image/upload/v1752884175/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Variables-Resource-Attributes-and-Dependencies/frame_30.jpg)

## Marking a Variable as Sensitive

Designating a variable as sensitive is straightforward. Simply include the `sensitive = true` attribute within its declaration. Consider the example below:

```
variable "ami" {
  default   = "ami-06178cf887597869c"
  sensitive = true
}


variable "instance_type" {
  default = "t3.micro"
}


variable "region" {
  default = "eu-west-2"
}


resource "aws_instance" "test-servers" {
  ami           = var.ami
  instance_type = var.instance_type
}
```

With this configuration, Terraform treats the `ami` variable as sensitive. This causes Terraform to mask the actual value during both planning and apply phases, which prevents sensitive details from being displayed in logs or terminal outputs.

## Demonstrating Sensitive Handling in Terraform Plan

When you run a plan, Terraform automatically hides the sensitive value for the AMI. Here’s an example of what you might see:

```
> terraform plan


Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
 + create


Terraform will perform the following actions:


# aws_instance.test-servers will be created
+ resource "aws_instance" "test_servers" {
  + ami                                  = (sensitive value)
  + arn                                  = (known after apply)
  + associate_public_ip_address          = (known after apply)
  + availability_zone                    = (known after apply)
  + cpu_core_count                       = (known after apply)
  + cpu_threads_per_core                 = (known after apply)
  + disable_api_termination              = (known after apply)
  + ebs_optimized                        = (known after apply)
  + get_password_data                    = false
  + host_id                              = (known after apply)
  + id                                   = (known after apply)
  + instance_initiated_shutdown_behavior = (known after apply)
  + instance_state                       = (known after apply)
}
```

This output confirms that the `ami` value is redacted, maintaining confidentiality by preventing accidental data leaks.

## Receiving Sensitive Inputs

If you leave a sensitive variable without a default value, Terraform prompts for the input during the plan or apply process. The input remains hidden as you type:

```
variable "ami" {
  type      = string
  sensitive = true
}
```

```
> terraform plan
var.ami
Enter a value:
```

To streamline processes and avoid manual input each time, store the secret values in a separate `.tfvars` file and provide them via the `-var-file` parameter:

```
> terraform apply -var-file=secret.tfvars


Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
 + create


Terraform will perform the following actions:


# aws_instance.test-servers will be created
+ resource "aws_instance" "test_servers" {
  + ami                                  = (sensitive value)
  + arn                                  = (known after apply)
  + associate_public_ip_address          = (known after apply)
  + availability_zone                    = (known after apply)
  + cpu_core_count                       = (known after apply)
  + cpu_threads_per_core                 = (known after apply)
  + disable_api_termination              = (known after apply)
  + ebs_optimized                        = (known after apply)
  + get_password_data                    = false
  + host_id                              = (known after apply)
  + id                                   = (known after apply)
  + instance_initiated_shutdown_behavior = (known after apply)
  + instance_state                       = (known after apply)
  + instance_type                        = "t3.micro"
  + ipv6_address_count                   = (known after apply)
}
```

> [!important]
> **Keep Secrets Secure**
>
> Storing sensitive values in a dedicated `.tfvars` file and using the `-var-file` option significantly reduces the risk of accidentally exposing secret information.

Alternatively, you can export sensitive values as environment variables. This approach is especially useful in CI/CD pipelines, where Terraform can securely access sensitive data without manual input.

## Handling Errors When Exposing Sensitive Outputs

Terraform prevents sensitive information from being exposed in outputs. If you try to output sensitive details without explicitly marking them as such, Terraform will throw an error. For instance, the following output configuration attempts to expose the sensitive `ami` value:

```
output "info_string" {
  description = "Information regarding provisioned resources"
  value       = "AMI=${var.ami} Instance Type=${var.instance_type}"
}
```

When you run the apply command, Terraform redacts the sensitive output:

```
> terraform apply
aws_instance.test-servers: Refreshing state... [id=i-a15264c034b27b3d3]


Changes to Outputs:
  + info_string = (sensitive value)


You can apply this plan to save these new output values to the Terraform state, without changing any real infrastructure.


Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.


Enter a value: yes


Apply complete! Resources: 0 added, 0 changed, 0 destroyed.


Outputs:
info_string = <sensitive>
```

To view the actual value of a sensitive output variable, use the `terraform output` command followed by the variable name:

```
terraform output info_string
"AMI=ami-06178cf087598769c; Instance Type=t3.micro"
```

> [!important]
> **Caution on State Files**
>
> Remember that even if sensitive attributes are masked in terminal outputs, they are stored as plain text in the Terraform state file. Ensure that you manage access to your state file securely and consider using encryption to protect it.

That's it for this lesson on marking variables as sensitive in Terraform. Continue exploring Terraform best practices to further enhance your infrastructure security and efficiency.

![The image shows a selection interface for securing a state file, with options: "Sensitive attributes hidden," "Plain text in state file" (highlighted), and "Secure state file."](https://kodekloud.com/kk-media/image/upload/v1752884177/notes-assets/images/Terraform-Associate-Certification-HashiCorp-Certified-Variables-Resource-Attributes-and-Dependencies/frame_200.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/terraform-associate-certification-hashicorp-certified/module/cca81ade-f05a-42b2-af56-1926cade6582/lesson/fdb35cae-60fd-43c6-a997-b981b359efbd)**
>
> Watch video content
