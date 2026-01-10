# AWS Question 6 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevOps-Interview-Preparation-Course/AWS/AWS-Question-6)

---

## Table of Contents

- AWS Question 6
  - Why the Different Policy Types?
  - AWS Managed Policies
  - Customer Managed Policies
  - Inline Policies
  - Explaining IAM Policy Types in an Interview
  - Key Comparison
  - Watch Video

---

## Content

DevOps Interview Preparation Course

AWS

# AWS Question 6

Understanding the three types of AWS IAM policies—managed, customer managed, and inline policies—is crucial for every DevOps engineer. This explanation will clarify their differences and help you articulate them clearly in an interview.

## Why the Different Policy Types?

In AWS, having distinct policy types allows you to balance security, flexibility, and convenience:

- **AWS Managed Policies** simplify permissions for default operations.
- **Customer Managed Policies** provide custom-tailored permissions for your unique organizational requirements.
- **Inline Policies** offer granular control by being directly embedded in the IAM entity for temporary or highly specific permissions.

> [!important]
> **Note**
>
> Having hands-on experience with creating and managing these policies, either independently or using tools like Terraform, significantly improves your readiness for real-world scenarios and interviews.

## AWS Managed Policies

AWS managed policies are created and maintained by AWS, offering default permission sets required for many AWS services. For instance, when launching a Lambda function or configuring a Kinesis stream that accesses an S3 bucket, AWS may suggest an IAM role with an attached managed policy. This simplifies the setup process by automatically incorporating the necessary permissions.

## Customer Managed Policies

Customer managed policies are created by you to meet your organization’s specific needs. These policies provide enhanced flexibility and are customizable to align with your applications and workflows. Organizations often manage these policies using infrastructure-as-code tools like Terraform, ensuring consistent permission standards across multiple users, groups, or roles.

## Inline Policies

Inline policies are defined directly within an IAM user, group, or role. Their key characteristic is their tight coupling with the associated entity—if the entity is deleted, the inline policy is also permanently removed. This approach is ideal for granting temporary access or testing specific permission changes without affecting broader managed policies.

A critical difference is that while customer managed policies can be attached across multiple IAM entities, inline policies exist only within their specific attachment context.

![The image explains three types of AWS IAM policies: managed, customer managed, and inline, with annotations and a screenshot of a permissions policies interface.](https://kodekloud.com/kk-media/image/upload/v1752873331/notes-assets/images/DevOps-Interview-Preparation-Course-AWS-Question-6/aws-iam-policies-managed-inline.jpg)

## Explaining IAM Policy Types in an Interview

When discussing IAM policies during an interview, you might structure your answer like this:

"In AWS, managed policies are pre-defined by AWS to support default service operations. Customer managed policies, on the other hand, allow us to create custom policies tailored to our organization’s needs, and they can be attached to multiple IAM entities. Inline policies are directly embedded into a specific IAM user, group, or role, meaning that if the entity is deleted, so is the policy. This design allows us to grant temporary or highly specific permissions without impacting our broader set of policies."

## Key Comparison

| Policy Type               | Description                                                   | Use Case                                        |
| ------------------------- | ------------------------------------------------------------- | ----------------------------------------------- |
| AWS Managed Policies      | Pre-defined policies maintained by AWS                        | Default service permissions                     |
| Customer Managed Policies | Custom policies created to meet specific organizational needs | Tailoring permissions for multiple IAM entities |
| Inline Policies           | Policies embedded directly within an IAM entity               | Granting temporary or context-specific access   |

This overview of AWS IAM policy types will help you articulate their differences effectively. Continue to explore additional scenarios and interview questions in our next lesson.

Happy learning!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devops-interview-preparation-course/module/f1169a2e-23de-4377-bc4f-a07c136a11d6/lesson/238daf87-b22c-47a1-95df-c881d8a9da9e)**
>
> Watch video content
