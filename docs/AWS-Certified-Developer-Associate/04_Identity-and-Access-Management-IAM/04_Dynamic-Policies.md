# Dynamic Policies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Identity-and-Access-Management-IAM/Dynamic-Policies)

---

## Table of Contents

- Dynamic Policies
  - Static Policies for Individual Users
  - Introducing Dynamic Policies
  - Benefits of Using Variables in IAM Policies
  - Watch Video

---

## Content

AWS Certified Developer - Associate

Identity and Access Management IAM

# Dynamic Policies

In this lesson, you'll learn how to create dynamic IAM policies by using variables to automatically configure resource access based on the authenticated user's identity. This approach significantly simplifies permission management, especially when dealing with a large number of users.

Imagine an S3 bucket that contains two directories—one for Mark and one for Sarah. The objective is to ensure that each user has exclusive access to their corresponding directory. For instance, Mark can only upload and read files in the "mark" directory, while Sarah has the same privileges solely in the "sarah" directory.

## Static Policies for Individual Users

A common approach is to create separate policies for each user. For example, Mark's policy might look like this:

```
{
  "Sid": "VisualEditor1",
  "Effect": "Allow",
  "Action": "s3:*",
  "Resource": [
    "arn:aws:s3:::example-bucket/mark/*"
  ]
}
```

Similarly, Sarah's policy would be nearly identical, except that the directory name is changed accordingly:

```
{
  "Sid": "VisualEditor1",
  "Effect": "Allow",
  "Action": "s3:*",
  "Resource": [
    "arn:aws:s3:::example-bucket/sarah/*"
  ]
}
```

This method is feasible for a small number of users. However, when managing many users — say 100 or more — maintaining individual static policies becomes unscalable and error-prone.

## Introducing Dynamic Policies

To overcome these challenges, you can use variables in your IAM policies. Instead of hard coding directory names, variables allow policies to be dynamically updated based on user information. In AWS IAM policies, variables are represented using the syntax `${variable_name}`.

For instance, to automatically assign S3 directory access based on the user's name, update the policy as follows:

```
{
  "Sid": "VisualEditor1",
  "Effect": "Allow",
  "Action": "s3:*",
  "Resource": [
    "arn:aws:s3:::example-bucket/${aws:username}/*"
  ]
}
```

In this dynamic policy, the placeholder `${aws:username}` is automatically replaced with the name of the user attempting to access the S3 bucket. This ensures that each user gains access only to the directory that corresponds to their username.

> [!important]
> **Note**
>
> Using dynamic policy variables not only streamlines the management of permissions but also reduces the risk of manual errors during policy configuration.

## Benefits of Using Variables in IAM Policies

Employing variables in IAM policies presents several advantages:

- **Scalability:** Easily manage permissions for a large number of users without having to create individual policies.
- **Simplicity:** Reduce complexity by eliminating repetitive manual configurations.
- **Security:** Enhance security by ensuring that users can only access resources that match their specific attributes.

Beyond `aws:username`, AWS supports additional well-known variables such as `aws:PrincipalType`, `aws:SourceVpc`, and `aws:SourceIp`. These variables enable you to build more sophisticated and dynamic security policies.

For further details, visit the [official AWS IAM documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_variables.html).

By leveraging dynamic IAM policies, you can automate and secure access permissions efficiently, making it easy to scale your cloud resources while maintaining strict security controls.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-developer-associate/module/683c50bc-9bd3-4094-b666-354fcc06941f/lesson/f9499512-433a-4a8c-9f97-5db08df5a6ab)**
>
> Watch video content
