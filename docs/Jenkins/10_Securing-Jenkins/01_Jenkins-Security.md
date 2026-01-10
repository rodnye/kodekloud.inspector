# Jenkins Security - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Securing-Jenkins/Jenkins-Security)

---

## Table of Contents

- Jenkins Security
  - Common Jenkins Security Pitfalls
  - Watch Video

---

## Content

Jenkins

Securing Jenkins

# Jenkins Security

In this lesson, we will explore various aspects of securing your Jenkins installation. We cover essential principles including configuring credentials for pipelines, managing global security settings, and safeguarding both the Jenkins server and its source code.

We begin by discussing how to add credentials during pipeline configuration. Jenkins provides a centralized global security settings page where you can define authentication methods, select security realms, configure authorization strategies, and set markup formatters.

![The image shows the Jenkins "Configure Global Security" settings page, detailing authentication, security realm, authorization, and markup formatter options.](https://kodekloud.com/kk-media/image/upload/v1752880126/notes-assets/images/Jenkins-Jenkins-Security/frame_10.jpg)

Although we reviewed the global configuration settings earlier, this discussion takes a deeper dive into what security means specifically for Jenkins. Unlike services such as [GitHub](https://github.com), which typically offer CI/CD as a SaaS, Jenkins is usually hosted on your own server. This self-hosted setup means that securing Jenkins involves protecting your code, controlling access to pipelines, and ensuring that server and system configurations are secure.

![The image shows a "Jenkins Security" interface with icons for "Code" and "Server," each secured with a lock symbol.](https://kodekloud.com/kk-media/image/upload/v1752880127/notes-assets/images/Jenkins-Jenkins-Security/frame_70.jpg)

A fundamental aspect of Jenkins security is user and access control, which can be divided into two main components:

1.  **Authentication**: Where users prove their identity through a defined security realm that manages user identities and group memberships.
2.  **Authorization**: After authentication, users are granted specific permissions to perform actions. For example, one user might have the ability to edit a pipeline, while another might have restricted access.

![The image is a diagram illustrating user and access control, highlighting authentication and authorization, with a focus on security realm, identity, and membership.](https://kodekloud.com/kk-media/image/upload/v1752880129/notes-assets/images/Jenkins-Jenkins-Security/frame_100.jpg)

Authorization in Jenkins is implemented via an authorization strategy. This strategy determines what permissions a user or group receives, such as the ability to modify a CI/CD pipeline.

> [!important]
> **Note**
>
> Always review and update your authorization strategies to reflect your organizational policies. This minimizes the risk of unauthorized access and ensures that users only receive the permissions necessary for their roles.

## Common Jenkins Security Pitfalls

Below are some common mistakes that can significantly compromise the security of your Jenkins installation. Addressing these issues is critical for maintaining a secure CI/CD environment.

1.  **Anyone Can Do Anything**  
    Using an open authorization strategy that allows everybody, including anonymous users, to administer Jenkins is highly insecure. Relying on obscurity, such as non-public Jenkins URLs, does not protect your system.
2.  **Logged-In Users Can Do Anything**  
    Even authenticated users should have tailored limitations. Similar to how [AWS](https://aws.amazon.com) uses [IAM](https://aws.amazon.com/iam) to restrict user actions—even when using programmatic access—Jenkins must restrict what logged-in users can do via role-based permissions.
3.  **Excessive Permissions for Anonymous or All Authenticated Users**  
    Granting overly broad permissions, even to authenticated or anonymous users, introduces significant risk. Utilize fine-grained controls like the matrix authorization strategy to ensure that no generic account has full administrator privileges. Often, it is best to completely disable or heavily restrict access for the anonymous user.
4.  **Insecure Use of the Built-in Node**  
    The built-in node—where Jenkins itself is installed—should not be used for running builds if users have limited permissions. Although examples in CI/CD pipeline tutorials might use the built-in node, industry best practices recommend dedicated build agents for running jobs. This minimizes security risks by preventing unauthorized job execution on the main Jenkins server.

![The image lists common Jenkins security mistakes, including unrestricted access for anyone, logged-in users, anonymous and authenticated users, and issues with the built-in node.](https://kodekloud.com/kk-media/image/upload/v1752880130/notes-assets/images/Jenkins-Jenkins-Security/frame_270.jpg)

In summary, securing Jenkins involves multiple layers—from safeguarding the server installation and pipelines to enforcing strict user access controls. Addressing these common security issues will help ensure that your Jenkins environment remains robust and minimizes the risk of unauthorized actions.

Let's now dive into hands-on practices. In the following sections, we will walk through various Jenkins security concerns, implement the necessary fixes, and explain the rationale behind each solution.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/7c4c28a9-3607-46d4-920a-3f94ed6a7d5b/lesson/da3dcdbe-0453-4f67-8140-f65edd5ef86f)**
>
> Watch video content
