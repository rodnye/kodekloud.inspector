# Managing and enabling security - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Securing-Jenkins/Managing-and-enabling-security)

---

## Table of Contents

- Managing and enabling security
  - Watch Video
  - Practice Lab

---

## Content

Jenkins

Securing Jenkins

# Managing and enabling security

Managing and securing Jenkins is a critical aspect of system administration. While developers may not interact with every security detail, ensuring robust code security remains essential. In this article, we explore the various security options available in Jenkins, covering both global security settings and plugin-based implementations.

When you navigate to the "Manage Jenkins" section, you'll notice a dedicated area for security. To further enhance your setup, consider exploring the security-related plugins available under "Manage Plugins." By searching for terms like "Role-based Authorization Strategy," "Authorize Project," "Mask Passwords," "GitHub Authentication," and "OWASP Dependency Check," you can find multiple approaches tailored to different security needs.

![The image shows the Jenkins Plugin Manager interface, displaying available security-related plugins for installation, including "Role-based Authorization Strategy" and "Authorize Project."](https://kodekloud.com/kk-media/image/upload/v1752880131/notes-assets/images/Jenkins-Managing-and-enabling-security/frame_60.jpg)

Returning to "Manage Jenkins," you will find four primary security options:

- Manage Credentials
- Configure Credential Providers
- Manage Users
- Configure Global Security

We previously discussed managing credentials during pipeline creation and user management. In the "Configure Credential Providers" section, clicking on "Providers" and selecting "Exclude Selected" displays several available options.

![The image shows a Jenkins dashboard with options for system configuration, security settings, and build executor status, including managing plugins, credentials, and users.](https://kodekloud.com/kk-media/image/upload/v1752880132/notes-assets/images/Jenkins-Managing-and-enabling-security/frame_110.jpg)

Within this view, you'll see selections for folder credential providers, Jenkins credential providers, and user credential providers. Additional providers may appear if installed via plugins. Similarly, clicking on "Types" and selecting "Exclude Selected" reveals options such as username and password, GitHub app, SSH username with private key, secret file, secret text, and certificate. This variety underscores Jenkins' flexible and secure configuration capabilities.

Now, let’s shift focus to "Configure Global Security." This section determines who can access and use your Jenkins instance and includes several key settings:

- **Authentication Options:** Disable features like "Remember Me" (which caches credentials similar to Gmail) to minimize security risks and ensure users re-enter their credentials each session.
- **Security Realm:** Choose from various options:
  - Delegate to Servlet Container (utilizes the container's authentication system)
  - Jenkins' own user database (with an optional sign-up feature)
  - LDAP configuration
  - Unix user group database
  - None (not recommended)
- **Agent Protocols:** Configure TCP ports for inbound connectivity and control the display of security warnings.
- **API Options:** While creating legacy API tokens or manual generation is discouraged, enabling API token usage statistics can enhance security monitoring.
- **Agent Controller Access:** Enable this if you plan on using build agents for your pipelines.
- **Jenkins as an SSH Server:** Although Jenkins can act as an SSH server for Jenkins Cloud commands, it is disabled by default. Current recommendations suggest keeping it disabled for better security.

> [!important]
> **Note**
>
> Appropriately configuring global security settings is essential for protecting your Jenkins environment. Always assess your organization's requirements before modifying security features.

![The image shows a Jenkins dashboard interface for configuring credential providers, with options to exclude specific providers and types, and buttons to save or apply changes.](https://kodekloud.com/kk-media/image/upload/v1752880133/notes-assets/images/Jenkins-Managing-and-enabling-security/frame_150.jpg)

These global security settings offer the flexibility to tailor your Jenkins instance according to your organization's specific needs. Whether you enable or disable certain features, the available options ensure that your system remains secure and manageable.

![The image shows a Jenkins "Configure Global Security" settings page, detailing options for security realm and authorization, with user signup enabled.](https://kodekloud.com/kk-media/image/upload/v1752880134/notes-assets/images/Jenkins-Managing-and-enabling-security/frame_230.jpg)

Additional configuration options, such as agent protocols, legacy API tokens, API token usage statistics, and SSH server settings, allow for further fine-tuning of your security setup.

![The image shows a Jenkins configuration page for global security settings, including API token options, agent-controller security, and SSH server port settings.](https://kodekloud.com/kk-media/image/upload/v1752880135/notes-assets/images/Jenkins-Managing-and-enabling-security/frame_290.jpg)

This concludes our detailed overview of managing and enabling security in Jenkins. We encourage you to apply these concepts on your system to enhance your understanding and further secure your Jenkins environment.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/7c4c28a9-3607-46d4-920a-3f94ed6a7d5b/lesson/f1648f9d-b530-496b-b608-108c89981298)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/jenkins/module/7c4c28a9-3607-46d4-920a-3f94ed6a7d5b/lesson/fbdfd8e9-70b2-4fbf-b704-3259cbcfaa0f)**
>
> Practice lab
