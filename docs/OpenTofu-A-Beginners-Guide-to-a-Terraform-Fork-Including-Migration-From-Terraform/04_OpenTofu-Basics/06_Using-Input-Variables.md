# Using Input Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenTofu-A-Beginners-Guide-to-a-Terraform-Fork-Including-Migration-From-Terraform/OpenTofu-Basics/Using-Input-Variables)

---

## Table of Contents

- Using Input Variables
  - Table of Contents
  - Defining Variables
  - Referencing Variables
  - Example: AWS EC2 Instance
  - Overriding Variable Values
  - Variable Precedence
  - Links and References
  - Watch Video

---

## Content

OpenTofu: A Beginners Guide to a Terraform Fork Including Migration From Terraform

OpenTofu Basics

# Using Input Variables

Replacing hardcoded values with input variables in OpenTofu (a drop-in replacement for Terraform) makes your infrastructure code more modular, configurable, and reusable. In this guide, you’ll learn how to:

- Define variables in a dedicated file
- Reference them in resource blocks
- Override defaults at runtime
- Understand OpenTofu’s variable precedence

This approach applies to any provider—from local files to AWS EC2 instances—so you can eliminate literal strings and numbers scattered across your configuration.

---

## Table of Contents

- [Defining Variables](#defining-variables)
- [Referencing Variables](#referencing-variables)
- [Example: Local File & Random Pet](#example-local-file--random-pet)
- [Example: AWS EC2 Instance](#example-aws-ec2-instance)
- [Overriding Variable Values](#overriding-variable-values)
- [Variable Precedence](#variable-precedence)
- [Links and References](#links-and-references)

---

## Defining Variables

Best practice is to keep all variable definitions in **variables.tf** (you can also place them alongside resources in **main.tf**, but separation improves readability).

```
// variables.tf
variable "filename" {
  description = "Path to the output file"
  default     = "/root/pets.txt"
}

variable "content" {
  description = "Text content written into the file"
  default     = "We love pets!"
}

variable "prefix" {
  description = "Prefix for random pet names"
  default     = "Mrs"
}

variable "separator" {
  description = "Separator between prefix and pet name"
  default     = "."
}

variable "length" {
  description = "Length of the random suffix"
  default     = "1"
}
```

Each block names the variable and can include:

- `description` (optional): clarifies its purpose
- `default`: used when no other value is supplied
- `type` (optional): for stricter validation (e.g., `string`, `number`, `list(string)`)

> [!important]
> **Avoid Hardcoded Secrets**
>
> Do **not** store sensitive credentials (like passwords or API keys) in `default`. Use environment variables, a secure vault provider, or encrypted files instead.

---

## Referencing Variables

In your **main.tf**, replace literal values with `var.<name>` references:

```
resource "local_file" "pet" {
  filename = var.filename
  content  = var.content
}

resource "random_pet" "my-pet" {
  prefix    = var.prefix
  separator = var.separator
  length    = var.length
}
```

> [!important]
> **Note**
>
> When referencing variables, do **not** wrap `var.name` in quotes.
> Correct: `filename = var.filename`
> Incorrect: `filename = "var.filename"`

Apply these changes:

```
$ tofu apply
```

If you need different defaults, edit **variables.tf** (for example, set `length = "2"`) and re-run `tofu apply`.

---

## Example: AWS EC2 Instance

Use variables to configure cloud resources just as easily:

```
// main.tf
resource "aws_instance" "webserver" {
  ami           = var.ami
  instance_type = var.instance_type
}

// variables.tf
variable "ami" {
  description = "AMI ID for the EC2 instance"
  default     = "ami-0edab43b6fa892279"
}

variable "instance_type" {
  description = "EC2 instance type"
  default     = "t2.micro"
}
```

You can still override these at apply time without changing the file.

---

## Overriding Variable Values

OpenTofu supports four primary ways to supply or override variable values:

| Method                | Description                                       | Example                                                                                                                                       |
| --------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Prompted Input        | Leave out `default` and answer interactive prompt | `hcl\\nvariable "ami" {}\\nvariable "instance_type" {}\\n`<br/>`$ tofu apply`                                                                 |
| CLI Flags             | Pass `-var` flags on the command line             | `bash\\n$ tofu apply \\\\\\n -var "ami=ami-0edab43b6fa892279" \\\\\\n -var "instance_type=t2.micro"\\n`                                       |
| Environment Variables | Set `TF_VAR_<name>` in your shell                 | `bash\\nexport TF_VAR_ami="ami-0edab43b6fa892279"\\nexport TF_VAR_instance_type="t2.micro"\\n$ tofu apply\\n`                                 |
| tfvars Files          | Use `.tfvars` or `.tfvars.json` files             | **variables.tfvars**:<br/>`hcl\\nami = "ami-0edab43b6fa892279"\\ninstance_type = "t2.micro"\\n`<br/>`$ tofu apply -var-file=variables.tfvars` |

---

## Variable Precedence

When the same variable is defined multiple times, OpenTofu applies them in this order (lowest → highest):

1.  **Environment variables** (`TF_VAR_name`)
2.  **terraform.tfvars**
3.  **.auto.tfvars** / **.auto.tfvars.json** (alphabetical)
4.  **\-var-file**
5.  **\-var** flags

Example scenario:

```
export TF_VAR_type="t2.nano"          # (1)
# terraform.tfvars: type = "t3.micro"  # (2)
# vars.auto.tfvars: type = "t3.small"  # (3)
$ tofu apply -var "type=t2.medium"     # (5)
```

The final `instance_type` will be **t2.medium**, since `-var` overrides all others.

---

## Links and References

- [OpenTofu GitHub](https://github.com/opentofu/opentofu)
- [Terraform Input Variables](https://developer.hashicorp.com/terraform/language/values/variables)
- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/module/c3586b29-e450-4c95-bad9-91bdf332eb24/lesson/e015a0a3-3e40-43f0-93a0-2ca32c47b5f8)**
>
> Watch video content
