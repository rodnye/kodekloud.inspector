# Global Security Settings - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Pipelines/Jenkins-Administration-and-Monitoring/Global-Security-Settings)

---

## Table of Contents

- Global Security Settings
  - Markup Formatting Security
  - CSRF Protection
  - Watch Video
    - Example of Markup Formatting

---

## Content

Jenkins Pipelines

Jenkins Administration and Monitoring

# Global Security Settings

In this article, we explore Jenkins global security settings, focusing on how these measures protect your Jenkins instance and when adjustments might be necessary for specific tasks.

Jenkins comes pre-configured with robust security options that minimize potential vulnerabilities. These default settings help secure your instance by reducing potential attack entry points. However, certain jobs may require temporarily relaxing these settings.

> [!important]
> **Warning**
>
> Modifying global security settings is similar to temporarily unlocking a highly secured door—it should be done with extreme caution and re-secured immediately afterward.

## Markup Formatting Security

One key global security feature in Jenkins involves markup formatting. Jenkins allows descriptions in jobs, views, and system messages to be formatted for enhanced readability. Without proper controls, there is a risk of injecting malicious code through these formatting options, potentially leading to cross-site scripting (XSS) vulnerabilities.

To mitigate this risk, Jenkins offers several markup formatter options:

1.  **Plain Text (Default):** Treats all input as plain text by escaping any characters that could be interpreted as code. This is the most secure option.
2.  **Safe HTML:** Permits basic HTML formatting while removing potentially dangerous elements, thereby preventing XSS attacks.
3.  **Custom Markup Formatters:** Available through plugins, these allow more advanced formatting options. However, they should be configured carefully to maintain security.

![The image is an infographic about markup formatting in Jenkins, highlighting security concerns like XSS attacks and suggesting security measures such as using plain text, safe HTML, and custom formatters.](https://kodekloud.com/kk-media/image/upload/v1752879658/notes-assets/images/Jenkins-Pipelines-Global-Security-Settings/jenkins-markup-formatting-infographic.jpg)

### Example of Markup Formatting

When using the plain text formatter, any HTML tags in a system message are rendered as simple text. For example, consider the following code snippet:

```
<p>Welcome to <strong><span style="color: rgb(235, 107, 86);">KodeKloud</span></strong> Jenkins Controller</p><script>
```

This code displays the HTML tags as plain text without any styling or functionality.

In contrast, the safe HTML mode permits basic styling but strips out elements that could lead to XSS vulnerabilities. For instance:

```
<p>Welcome to <strong><span style="color: rgb(235, 107, 86);">KodeKloud</span></strong> Jenkins_Controller</p><script>
```

## CSRF Protection

Another essential Jenkins security measure is protection against Cross-Site Request Forgery (CSRF). CSRF is a web vulnerability that tricks authenticated users into performing unintended actions on Jenkins. An attacker might send a malicious link or script, exploiting the user’s active session to execute unauthorized commands—such as triggering builds, deleting builds or artifacts, or modifying configurations.

![The image illustrates a CSRF (Cross-Site Request Forgery) attack scenario involving a hacker embedding a request in a hyperlink, which a logged-in Jenkins user clicks, leading to unauthorized actions on the Jenkins server.](https://kodekloud.com/kk-media/image/upload/v1752879659/notes-assets/images/Jenkins-Pipelines-Global-Security-Settings/csrf-attack-jenkins-hacker-scenario.jpg)

To combat such attacks, Jenkins implements built-in CSRF protection (also known as crumb protection). When enabled, every form and state-changing request includes a hidden token (or "crumb") that verifies the request’s legitimacy. This security mechanism covers both form submissions and API calls, even those authenticated via basic username and password.

![The image is about CSRF protection in Jenkins, showing a configuration panel for enabling proxy compatibility and explaining the use of a special token ("crumb") for form submissions and API calls.](https://kodekloud.com/kk-media/image/upload/v1752879660/notes-assets/images/Jenkins-Pipelines-Global-Security-Settings/csrf-protection-jenkins-configuration.jpg)

It is highly recommended to keep CSRF protection enabled to ensure maximum security. Additionally, educating users to avoid clicking on suspicious links while logged into Jenkins further reduces the risk of exploit.

For more information on Jenkins security best practices, please refer to the [Jenkins Documentation](https://www.jenkins.io/doc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-pipelines/module/f046d5d1-6fa6-4156-b38d-202ed885b64d/lesson/10ce6813-2dd0-4609-aa79-42939d610a7a)**
>
> Watch video content
