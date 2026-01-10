# Managing the system and credentials - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Exploring-the-Jenkins-UI/Managing-the-system-and-credentials)

---

## Table of Contents

- Managing the system and credentials
  - Configuring the System
  - GitHub and Source Control Integration
  - Email Notification Settings
  - Global Security Configuration
  - Conclusion
  - Watch Video
  - Practice Lab
    - Security Realm
    - Authentication and Authorization
    - Agent and Controller Security
    - SSH Server for CLI Commands

---

## Content

Jenkins

Exploring the Jenkins UI

# Managing the system and credentials

In this guide, we explore the essential configurations within Jenkins that control system-wide settings and credentials management. By understanding these configurations, you can optimize your Jenkins environment for stability, security, and seamless integration with external systems.

## Configuring the System

The "Configure System" page in Jenkins is pivotal for setting up the server’s operational parameters. Here, you define critical settings such as the home directory (e.g., /var/live/Jenkins), system messages, number of executors, labels, and usage options. These configurations determine where Jenkins is installed, its performance behavior, and how it interacts with external networks—for example, assigning a DNS name to the public IP (e.g., "Jenkins 01" or "Organization Jenkins 01").

![The image shows a Jenkins configuration page with settings for home directory, system message, executors, labels, and usage options.](https://kodekloud.com/kk-media/image/upload/v1752880020/notes-assets/images/Jenkins-Managing-the-system-and-credentials/frame_40.jpg)

Scrolling further down reveals additional global properties, including pipeline speed and durability settings. All overarching configurations of Jenkins are managed through these "Configure System" settings.

## GitHub and Source Control Integration

Jenkins offers robust integration with GitHub and other source control systems. In the configuration, you can set up GitHub servers and tailor usage rate limiting strategies for both pull and push requests. This section also supports the integration of GitHub Enterprise servers and the management of pipeline libraries, ensuring that Jenkins communicates effectively with external repositories.

![The image shows a configuration interface for managing lockable resources and GitHub settings, including options to add resources, servers, and set API usage strategies.](https://kodekloud.com/kk-media/image/upload/v1752880021/notes-assets/images/Jenkins-Managing-the-system-and-credentials/frame_110.jpg)

Furthermore, Jenkins allows you to configure the Git global settings, including the user email used for build notifications and other communications.

![The image shows a configuration interface for setting up global pipeline libraries, build-timeout plugin, and Git plugin options, including user name and email configurations.](https://kodekloud.com/kk-media/image/upload/v1752880023/notes-assets/images/Jenkins-Managing-the-system-and-credentials/frame_140.jpg)

## Email Notification Settings

Effective communication during build failures or pipeline errors is crucial. Jenkins can automatically dispatch email notifications when issues occur. Within these settings, you can configure SMTP servers (such as Google, Office 365, or a personal SMTP server) and specify the intended recipients. Typically, this configuration is customized per department to ensure that the right teams receive updates.

![The image shows an email configuration interface with fields for SMTP server, port, email suffix, content type, and list ID, along with save and apply buttons.](https://kodekloud.com/kk-media/image/upload/v1752880024/notes-assets/images/Jenkins-Managing-the-system-and-credentials/frame_170.jpg)

Additional options allow you to define default recipients, reply-to addresses, emergency reroutes, allowed domains, and content details. This ensures important information—like project name, build number, and build status—is always communicated effectively.

![The image shows a configuration settings page with fields for email recipients, domains, subject, and attachment size, along with "Save" and "Apply" buttons.](https://kodekloud.com/kk-media/image/upload/v1752880025/notes-assets/images/Jenkins-Managing-the-system-and-credentials/frame_180.jpg)

When a CI/CD pipeline runs, Jenkins uses predefined variables for notifications. For example, a typical message might appear as follows:

```
$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS:
Check console output at $BUILD_URL to view the results.
```

## Global Security Configuration

Security is paramount in any CI/CD environment. The "Configure Global Security" section in Jenkins houses settings that are critical for ensuring system integrity. This section is likely of high interest to your security team or CISO.

### Security Realm

The Security Realm determines how user authentication is managed within Jenkins. Options include:

- Delegation to servlet containers
- Jenkins' built-in user database
- Integration with LDAP or Unix user and group databases
- Disabling authentication (not recommended)

![The image shows a "Configure Global Security" settings page for Jenkins, detailing authentication, security realm, and authorization options with save and apply buttons.](https://kodekloud.com/kk-media/image/upload/v1752880026/notes-assets/images/Jenkins-Managing-the-system-and-credentials/frame_270.jpg)

### Authentication and Authorization

For enhanced security, you can disable the "remember me" functionality to avoid automatic logins. Jenkins supports various authorization strategies, including a role-based strategy provided via a plugin, which offers more granular permissions compared to legacy models.

![The image shows a configuration screen for global security settings, including user sign-up options, authorization strategies, and markup formatter settings, with "Role-Based Strategy" selected.](https://kodekloud.com/kk-media/image/upload/v1752880027/notes-assets/images/Jenkins-Managing-the-system-and-credentials/frame_310.jpg)

### Agent and Controller Security

Managing how build agents interact with the Jenkins controller is another critical aspect. If inbound agents are not in use, it is recommended to disable the related communication options. When agents are required, ensure that the proper ports are open and configured for secure communication.

Additional settings suppress security warnings from update sites, manage API token creation (with best practices advising against legacy API tokens), and secure the communication between agents and the controller.

![The image shows a Jenkins "Configure Global Security" settings page, including options for API Token, Agent to Controller Security, and SSH Server configurations.](https://kodekloud.com/kk-media/image/upload/v1752880029/notes-assets/images/Jenkins-Managing-the-system-and-credentials/frame_360.jpg)

### SSH Server for CLI Commands

Jenkins can also operate as an SSH server to process a subset of CLI commands, allowing centralized management of CLI operations directly through the Jenkins server.

> [!important]
> **Note**
>
> Ensure that SSH configurations are secured and that access is limited to trusted users to prevent unauthorized actions.

## Conclusion

This guide covered the primary configuration areas within Jenkins—from system settings and source control integration to email notifications and security configurations. Exploring and fine-tuning these settings in your Jenkins instance will help you create a secure, efficient, and industry-compliant CI/CD environment.

For further details, consider reviewing additional resources:

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [GitHub Integration Guide](https://www.jenkins.io/doc/book/scaling/github/)

Happy configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/a04dd614-ac4a-452f-b42a-c7f7086c5897/lesson/0f5ed8ca-f26e-417d-9351-daac48521b60)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/jenkins/module/a04dd614-ac4a-452f-b42a-c7f7086c5897/lesson/166fa542-0082-446f-8411-16bdb58d7e18)**
>
> Practice lab
