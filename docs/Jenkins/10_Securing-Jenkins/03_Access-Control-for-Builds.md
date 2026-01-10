# Access Control for Builds - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Securing-Jenkins/Access-Control-for-Builds)

---

## Table of Contents

- Access Control for Builds
  - Watch Video

---

## Content

Jenkins

Securing Jenkins

# Access Control for Builds

Securing your build process is essential, especially when deploying your builds across multiple virtual machines. In previous sections, we emphasized agent security to ensure that only authorized operations are executed during builds, thereby maintaining the overall integrity and security of your environment.

To enhance security within your Jenkins setup, consider installing specialized plugins. Follow these steps:

1.  Navigate to Manage Jenkins > Manage Plugins.
2.  Search for "Pipeline" to explore a variety of options that can reinforce your pipelines.

![The image shows a Jenkins Plugin Manager interface, highlighting a deprecated "Pipeline: Declarative Agent API" plugin, with options to install or update plugins.](https://kodekloud.com/kk-media/image/upload/v1752880117/notes-assets/images/Jenkins-Access-Control-for-Builds/frame_40.jpg)

Some of the notable plugins include Declarative Pipeline API, AWS Steps (enabling interaction with the AWS API), Pipeline for GitHub, and several multi-branch build strategies. These plugins are designed to address various requirements, providing you with versatile tools to tailor your build process.

![The image shows a Jenkins Plugin Manager interface listing various pipeline-related plugins, their descriptions, versions, and update information, with options to install or download them.](https://kodekloud.com/kk-media/image/upload/v1752880118/notes-assets/images/Jenkins-Access-Control-for-Builds/frame_50.jpg)

For build-specific stages, the "Build Pipeline" plugin is often highlighted because it visually connects upstream and downstream jobs to create a complete build pipeline. However, it's important to be aware that this plugin has a known security vulnerability related to stored cross-site scripting (XSS).

> [!important]
> **Warning**
>
> The "Build Pipeline" plugin is vulnerable to stored XSS attacks. It is recommended to consider alternative solutions, such as SSH Pipeline Steps, to secure your build and agent processes.

![The image shows a Jenkins Plugin Manager interface listing plugins, including a warning about a stored XSS vulnerability in the "Build Pipeline" plugin.](https://kodekloud.com/kk-media/image/upload/v1752880122/notes-assets/images/Jenkins-Access-Control-for-Builds/frame_70.jpg)

By leveraging the wide range of available Pipeline plugins, you can establish robust access controls and fortify each stage of your build process. Empower your Jenkins environment with the right tools to enhance operational security throughout all build activities.

Now, let's apply these concepts through hands-on exercises.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/7c4c28a9-3607-46d4-920a-3f94ed6a7d5b/lesson/bce419ee-1cc4-4608-bfb7-a1c061119064)**
>
> Watch video content
