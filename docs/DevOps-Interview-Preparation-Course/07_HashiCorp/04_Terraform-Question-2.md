# Terraform Question 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/HashiCorp/Terraform-Question-2)

---

## Table of Contents

- Terraform Question 2
  - Explanation
  - Additional Resources
  - Watch Video
    - Breaking Down the Code
    - Why Validate During the Plan Phase?

---

## Content

DevOps Interview Preparation Course

HashiCorp

# Terraform Question 2

In this article, you'll learn how to enforce validation for a Terraform variable during the plan phase, specifically for an AMI ID used in an EC2 instance. Validating your variables early on helps catch errors before any changes are applied, ensuring a smoother deployment process.

When provisioning an EC2 instance with Terraform, you might encounter issues if the AMI ID provided by the user doesn't follow the proper format. For example, instead of a correctly formatted AMI ID (like "ami-1234abcd"), a user could mistakenly supply a simple number. Such errors, if not caught early, lead to failures during the Terraform apply phase, causing unnecessary confusion and troubleshooting delays.

![The image contains a question about validating a variable during Terraform plan time, specifically for an AMI variable, with handwritten notes explaining potential mistakes and the importance of proper format.](https://kodekloud.com/kk-media/image/upload/v1752873358/notes-assets/images/DevOps-Interview-Preparation-Course-Terraform-Question-2/terraform-validate-ami-variable-notes.jpg)

Below is an example of how you can enforce variable validation using a validation block in Terraform:

```
variable "ami" {
  type        = string
  description = "EC2 instance AMI ID"
  default     = "ami-90394321875931"


  validation {
    condition     = length(var.ami) > 4 && substr(var.ami, 0, 4) == "ami-"
    error_message = "Enter a proper AMI ID."
  }
}
```

## Explanation

### Breaking Down the Code

1.  **Variable Declaration**  
    The `ami` variable is defined with several attributes:
    - **Type**: It is declared as a string.
    - **Description**: Provides context about what the variable represents.
    - **Default Value**: Supplies a fallback AMI ID in case the user doesn't define their own.

2.  **Validation Block**  
    The validation block contains a condition that checks two requirements:
    - The provided AMI string must be longer than 4 characters.
    - The first four characters of the string must be "ami-".  
      This check is performed using the `substr()` function to extract the initial segment of the string.

3.  **Custom Error Message**  
    If the AMI ID does not meet the conditions (for instance, if it is too short or does not start with "ami-"), Terraform will output the custom error message: "Enter a proper AMI ID." This process runs during the plan phase, ensuring any errors are caught early.

> [!important]
> **Key Takeaway**
>
> Implementing validation blocks in Terraform not only prevents runtime errors but also enhances the overall robustness of your infrastructure code. This proactive approach is beneficial both for production deployments and technical interviews.

### Why Validate During the Plan Phase?

Validating variables during the plan phase offers significant advantages:

- **Error Prevention:** Catch formatting errors before any changes are applied.
- **Efficient Troubleshooting:** Identify mistakes quickly, reducing downtime.
- **Robust Configurations:** Maintain high-quality and error-resistant Terraform code.

When discussing this method in an interview, you can highlight how early validation prevents misconfigurations and potential failures in your Terraform projects.

That concludes this article. I hope you found the explanation clear and helpful for both your projects and interview preparations. Happy Terraforming!

## Additional Resources

- [Terraform Documentation](https://www.terraform.io/docs)
- [AWS EC2 Instance Documentation](https://docs.aws.amazon.com/ec2/)
- [Terraform Best Practices](https://www.terraform-best-practices.com)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/04f41564-5032-49c6-a98f-da77606c4687/lesson/531b66df-49cc-44e6-8bdd-95b19170e51a)**
>
> Watch video content
