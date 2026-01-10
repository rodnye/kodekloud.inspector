# Markup Formatters - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Jenkins-Administration-and-Monitoring/Markup-Formatters)

---

## Table of Contents

- Markup Formatters
  - Understanding the Options
  - Enabling HTML Formatting
  - Broad Application of Markup Formatter
  - Watch Video

---

## Content

Jenkins Pipelines

Jenkins Administration and Monitoring

# Markup Formatters

In this lesson, learn about the Jenkins Markup Formatter—a powerful feature that offers rich formatting for descriptions within Views, Jobs, Builds, System Messages, and more. This tool not only enhances the visual appeal of your Jenkins interface but also safeguards against cross-site scripting (XSS) attacks.

![The image shows a webpage from the Jenkins documentation about "Markup Formatters," detailing their purpose and configuration. It includes a navigation menu on the left and content about security considerations and user profile descriptions.](https://kodekloud.com/kk-media/image/upload/v1752879678/notes-assets/images/Jenkins-Pipelines-Markup-Formatters/jenkins-markup-formatters-documentation.jpg)

## Understanding the Options

Jenkins provides multiple formatting options, including plain text and safe HTML. When displayed in the Jenkins UI, these two options produce different effects based on the configuration.

Imagine you are logged into your Jenkins controller. Initially, you might see a simple system message that looks like this:

Welcome to Dasher CI organization.

To enhance this system message with HTML formatting, follow these steps:

1.  Navigate to the "Manage Jenkins" section.
2.  Select "System Configuration."
3.  Replace the plain text message with HTML formatted text. For example, you might use the `<strong>` tag to create bold text or include other styling tags to improve the message's appearance.

![The image shows a Jenkins system configuration page with a system message about server maintenance and contact information. It includes fields for the home directory, number of executors, and labels.](https://kodekloud.com/kk-media/image/upload/v1752879679/notes-assets/images/Jenkins-Pipelines-Markup-Formatters/jenkins-system-configuration-page.jpg)

> [!important]
> **Note**
>
> Even if you include HTML tags (like `<strong>`), the default configuration under "Manage Jenkins" → "Security" uses the plain text markup formatter. As a result, HTML tags will be escaped and displayed as plain text.

## Enabling HTML Formatting

To enable HTML formatting in your system messages and other text areas:

- Change the configuration to use the safe HTML formatter.
- The safe HTML formatter treats your input as HTML but sanitizes it to remove potentially harmful elements (such as `<script>` tags) while preserving allowed HTML tags.

After switching to the safe HTML formatter, remember to save your changes. When you return to the Jenkins dashboard, the system message will now display with the HTML formatting applied. For example, any colors or bold styling defined with HTML will render correctly.

![The image shows a Jenkins security configuration screen with user roles and permissions, and options for markup formatting and agent settings.](https://kodekloud.com/kk-media/image/upload/v1752879681/notes-assets/images/Jenkins-Pipelines-Markup-Formatters/jenkins-security-configuration-screen.jpg)

## Broad Application of Markup Formatter

This approach of using the safe HTML formatter applies across multiple areas in Jenkins. Use it to enhance:

- **System Messages**: Improve visibility and user engagement.
- **Job Descriptions**: Clearly communicate job details and instructions.
- **Build Details**: Make build logs and statuses more readable.
- **View Configurations**: Customize dashboards for a better user experience.

Implementing rich text formatting throughout Jenkins not only makes your interface more appealing but also improves overall usability.

Thank you for following this lesson on Jenkins Markup Formatters. For more detailed Jenkins documentation, visit the [official Jenkins documentation](https://www.jenkins.io/doc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/f046d5d1-6fa6-4156-b38d-202ed885b64d/lesson/c6924110-e997-4321-99ff-aa3a88645e1f)**
>
> Watch video content
