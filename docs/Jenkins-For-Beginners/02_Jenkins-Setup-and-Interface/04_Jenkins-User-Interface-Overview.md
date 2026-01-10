# Jenkins User Interface Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-For-Beginners/Jenkins-Setup-and-Interface/Jenkins-User-Interface-Overview)

---

## Table of Contents

- Jenkins User Interface Overview
  - System Configuration and Settings
  - Detailed System Information
  - Viewing Logs and Advanced Options
  - Customizing the Jenkins Appearance
  - Conclusion
  - Watch Video

---

## Content

Jenkins For Beginners

Jenkins Setup and Interface

# Jenkins User Interface Overview

In this lesson, we explore the Jenkins user interface, highlighting its key features and configuration options. This guide will help you navigate through the interface, understand system settings, and manage Jenkins effectively.

After installing Jenkins, you are directed to the login page. Before logging in, it is useful to review system information such as the installed Jenkins version. Click on the Jenkins icon located at the bottom right of the page to reveal details like the current version and other relevant metadata. For example, you might see:

- **Current version:** 2.46.2
- A list of mavenized dependencies packaged with Jenkins, including static resources like themes, icons, author details, and license information.
- Hyperlinks for additional details about licenses and plugin dependencies.

![The image shows the "About Jenkins" page for version 2.462.1, displaying information about the open-source automation server and its dependencies. The page includes navigation links and a list of Mavenized dependencies with their licenses.](https://kodekloud.com/kk-media/image/upload/v1752879548/notes-assets/images/Jenkins-For-Beginners-Jenkins-User-Interface-Overview/about-jenkins-2-462-1-dependencies.jpg)

Once you log in as an administrator (default username "admin"), you are presented with the Jenkins login page.

![The image shows a Jenkins login page with fields for username and password, alongside the Jenkins logo on a colorful background.](https://kodekloud.com/kk-media/image/upload/v1752879549/notes-assets/images/Jenkins-For-Beginners-Jenkins-User-Interface-Overview/jenkins-login-page-username-password.jpg)

After successful authentication, the dashboard is displayed, granting you full administrative access. The dashboard’s top section features notifications, including important security warnings. One such warning recommends avoiding the use of the built-in node for both building and managing Jenkins; setting up distributed builds is advised for enhanced security.

![The image shows the "Manage Jenkins" dashboard, displaying various configuration options like system settings, tools, plugins, and security. There's a warning about security issues related to building on the built-in node.](https://kodekloud.com/kk-media/image/upload/v1752879550/notes-assets/images/Jenkins-For-Beginners-Jenkins-User-Interface-Overview/manage-jenkins-dashboard-security-warning.jpg)

> [!important]
> **Dashboard Overview**
>
> The "Manage Jenkins" section offers a wide range of configuration and management options, including system settings, security configurations, status information, and troubleshooting tools. Additional options may be available depending on the installed plugins.

## System Configuration and Settings

Within the system configuration, you can view and modify key settings of your Jenkins instance. For instance:

- **System Message:** Modify it to display announcements or notifications. In our example, the message was updated to "Welcome to Dasher Team CI organization."
- **Executors and Node Labels:** Check the number of executors and labels used for job execution.
- **Jenkins URL:** Set during installation, this URL is crucial for correctly referencing Jenkins within images and email links.
- **Help Icon:** Click the question mark icon next to any configuration option to get detailed explanations.

![The image shows a Jenkins configuration page in a web browser, displaying settings for Jenkins URL, system admin email address, and resource root URL.](https://kodekloud.com/kk-media/image/upload/v1752879551/notes-assets/images/Jenkins-For-Beginners-Jenkins-User-Interface-Overview/jenkins-configuration-page-settings.jpg)

After modifying configurations, you have two options:

- **Apply:** Save changes without leaving the page.
- **Save:** Commit changes and be redirected to the home page, where the updated system message is displayed.

![The image shows a Jenkins dashboard interface with options to create a job, set up a distributed build, and manage Jenkins. It includes sections for build queue and build executor status.](https://kodekloud.com/kk-media/image/upload/v1752879552/notes-assets/images/Jenkins-For-Beginners-Jenkins-User-Interface-Overview/jenkins-dashboard-job-setup.jpg)

This system message is an effective way to notify users of planned downtime or maintenance, as it appears to every user upon login.

## Detailed System Information

Beyond basic configuration, the "Manage Jenkins" section provides access to in-depth system information. Selecting "System Information" displays a comprehensive list of system properties, environment variables, and installed plugins. Note that while you might have manually installed only a few plugins, Jenkins comes pre-installed with many, resulting in more than 50 entries in some cases.

![The image shows the "Manage Jenkins" dashboard, displaying various configuration and management options such as security, credentials, system information, and troubleshooting tools.](https://kodekloud.com/kk-media/image/upload/v1752879553/notes-assets/images/Jenkins-For-Beginners-Jenkins-User-Interface-Overview/manage-jenkins-dashboard-options.jpg)

On the System Information page, you can find:

- **Environment Variables:** All variables accessible to the Jenkins server.
- **Plugin Details:** A dedicated tab showing plugin names, versions, and statuses.
- **System Memory Usage:** Visual graphs and thread dumps for troubleshooting performance issues.

![The image shows a Jenkins dashboard displaying system information, including system properties like executable paths and Java settings. The interface includes tabs for environment variables, plugins, memory usage, and thread dumps.](https://kodekloud.com/kk-media/image/upload/v1752879555/notes-assets/images/Jenkins-For-Beginners-Jenkins-User-Interface-Overview/jenkins-dashboard-system-info.jpg)

![The image shows a Jenkins dashboard displaying system information, specifically listing various plugins with their names, versions, and enabled status.](https://kodekloud.com/kk-media/image/upload/v1752879556/notes-assets/images/Jenkins-For-Beginners-Jenkins-User-Interface-Overview/jenkins-dashboard-plugins-info.jpg)

![The image shows a Jenkins dashboard displaying system information, specifically focusing on memory usage with a graph. The interface includes navigation options like "Dashboard," "Manage Jenkins," and "System Information."](https://kodekloud.com/kk-media/image/upload/v1752879557/notes-assets/images/Jenkins-For-Beginners-Jenkins-User-Interface-Overview/jenkins-dashboard-memory-usage-graph.jpg)

## Viewing Logs and Advanced Options

You can also access Jenkins logs directly from the user interface. While tools like journalctl or direct log file inspection on your virtual machine are available, reviewing logs within Jenkins is both convenient and efficient for diagnosing issues.

In upcoming lessons, we'll cover managing plugins—adding, removing, and disabling them—as these options are critical for extending Jenkins' functionality.

## Customizing the Jenkins Appearance

This lesson also demonstrates how to customize the Jenkins appearance. In our example, a dark theme plugin is used to switch to a darker interface. This plugin not only changes the theme but also provides options such as displaying pipeline graphs on job and build pages. After enabling and saving these settings, the interface adopts the new dark theme, offering a visually distinct alternative to the default light theme.

![The image shows the "Manage Jenkins" dashboard, displaying various configuration options such as System, Tools, Nodes, and Security settings. It includes a warning about security issues related to the built-in node and options to set up agents and clouds.](https://kodekloud.com/kk-media/image/upload/v1752879558/notes-assets/images/Jenkins-For-Beginners-Jenkins-User-Interface-Overview/manage-jenkins-dashboard-settings.jpg)

## Conclusion

This overview of the Jenkins user interface covers essential features for new and advanced users alike. In future lessons, we will explore more advanced configuration options, detailed plugin management, and additional administrative functions.

Thank you for following along, and happy building with Jenkins!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-for-beginners/module/3c1739a1-ee72-4285-a832-4ce3c95b784d/lesson/4bbf41e6-d736-425f-b5b3-b9d5a54f8856)**
>
> Watch video content
