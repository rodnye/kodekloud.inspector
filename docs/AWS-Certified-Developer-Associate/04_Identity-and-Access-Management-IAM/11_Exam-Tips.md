# Exam Tips - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Identity-and-Access-Management-IAM/Exam-Tips)

---

## Table of Contents

- Exam Tips
  - Key Recommendations
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Identity and Access Management IAM

# Exam Tips

This article provides essential recommendations to help you prepare for your AWS exam effectively. Follow these best practices to secure your AWS account and manage permissions confidently.

> [!important]
> **Security Best Practice**
>
> Avoid using the root account for everyday tasks. Instead, secure your root account and enable multi-factor authentication (MFA) to prevent unauthorized access.

## Key Recommendations

1.  **Avoid Root Account Usage**  
    Refrain from using the AWS root account for regular operations. Exposing the root account credentials greatly increases the risk of unauthorized access. Instead, secure and monitor this account thoroughly.
2.  **Implement the Principle of Least Privilege**  
    Grant users and roles only the essential permissions they need. When configuring AWS Identity and Access Management (IAM), create individual IAM users for every person or application that requires access:
    - Assign permissions directly to users, groups, or roles based on necessity.
    - Use roles to provide temporary security credentials, especially when delegation is required.

![The image provides tips for acing an exam, focusing on AWS security practices like avoiding root account use, implementing MFA, granting least privilege permissions, creating IAM users, and assigning permissions.](https://kodekloud.com/kk-media/image/upload/v1752858914/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-security-exam-tips.jpg)

3.  **Utilize Roles and Trust Policies**  
    Roles are ideal for allowing temporary access to AWS resources. They involve:
    - Configuring trust policies to define which entities can assume a role.
    - Using the PassRole permission when a service needs to assign a role to another AWS service, ensuring controlled role delegation.

4.  **Manage External Application Access**  
    For applications outside AWS that require access to AWS services:
    - Create an IAM user with dedicated credentials.
    - Use the `AssumeRole` method via the API when temporary credentials are required.
    - If MFA is enabled, leverage the `GetSessionToken` method to obtain secure temporary credentials.

![The image provides tips for acing an exam related to AWS, including information on roles, trust policies, PassRole permission, and using AssumeRole and GetSessionToken.](https://kodekloud.com/kk-media/image/upload/v1752858915/notes-assets/images/AWS-Certified-Developer-Associate-Exam-Tips/aws-exam-tips-roles-policies.jpg)

5.  **Facilitate Cross-Account Access**  
    In scenarios where a user from one AWS account (Account A) needs to access services in another account (Account B):
    - Establish a role in Account B with the required access permissions.
    - Allow the user in Account A to assume this role securely to access the necessary services.

Following these strategies will not only help you prepare for your AWS exam but also ensure that your AWS environment adheres to industry best practices for security and access management.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/683c50bc-9bd3-4094-b666-354fcc06941f/lesson/96abb211-0c39-4aca-834b-4a0650e5ed96)**
>
> Watch video content
