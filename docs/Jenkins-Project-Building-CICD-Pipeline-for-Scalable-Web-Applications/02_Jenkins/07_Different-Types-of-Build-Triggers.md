# Different Types of Build Triggers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications/Jenkins/Different-Types-of-Build-Triggers)

---

## Table of Contents

- Different Types of Build Triggers
  - Triggering a Build After Another Project
  - Periodic Builds
  - GitHub Hook Trigger
  - Poll SCM
  - Remote Build Trigger
  - Watch Video

---

## Content

Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications

Jenkins

# Different Types of Build Triggers

In this article, we explore various build triggers available in Jenkins and explain how they determine when jobs are executed. A build trigger specifies the event that causes Jenkins to run a job—whether it’s a code push, a scheduled time, or the completion of another project. Each trigger allows you to automate parts of your CI/CD pipeline, from testing and linting to deployment, ensuring that your workflow is both efficient and reliable.

> [!important]
> **Key Information**
>
> Jenkins build triggers enable automated workflows and streamlined deployments by initiating jobs automatically based on specific events.

## Triggering a Build After Another Project

One common method is to trigger a build when another project successfully completes. This setup is especially useful for managing multiple jobs that need to run sequentially. For instance, configuring Job B to start only after Job A has completed ensures that dependencies are handled correctly.

![The image shows a flowchart with two jobs, "Job A" and "Job B," connected by an arrow, indicating a sequence. A red alert icon is next to "Job B."](https://kodekloud.com/kk-media/image/upload/v1752879888/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Different-Types-of-Build-Triggers/flowchart-job-a-job-b-alert.jpg)

## Periodic Builds

Periodic builds allow you to schedule a build at set intervals, regardless of code changes. Similar to cron jobs, you can configure Jenkins to trigger scheduled builds—for example, every night at 1 AM. This approach helps ensure that your application is regularly tested and deployed, even if there aren’t any recent code modifications.

## GitHub Hook Trigger

The GitHub hook trigger facilitates real-time builds by allowing Jenkins to react to GitHub repository events. When a developer pushes code or opens a pull request, GitHub can send a webhook to Jenkins, automatically initiating a build. This mechanism is vital for continuous integration environments, where immediate feedback on code changes is essential.

![The image illustrates a process flow where a developer triggers a GitHub hook, which then interacts with Jenkins for GITScm polling.](https://kodekloud.com/kk-media/image/upload/v1752879889/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Different-Types-of-Build-Triggers/github-hook-jenkins-gitscm-flow.jpg)

## Poll SCM

The Poll SCM trigger continuously monitors the source code repository (such as GitHub) at defined intervals. Unlike periodic builds, which run independently of repository changes, Poll SCM triggers a build only when a new commit or update is detected. This method minimizes unnecessary builds and optimizes resource usage.

![The image shows a diagram with Jenkins and GitHub logos connected by arrows, indicating a two-way interaction.](https://kodekloud.com/kk-media/image/upload/v1752879890/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Different-Types-of-Build-Triggers/jenkins-github-interaction-diagram.jpg)

## Remote Build Trigger

Finally, Jenkins can be configured to trigger builds remotely. By setting up a unique URL endpoint and using a token, you can start builds from external systems, local machines, or third-party services. This option is particularly useful for integrating Jenkins with other applications that need to prompt builds based on external events.

![The image illustrates a process for triggering Jenkins builds remotely using an external service, with a URL and token involved.](https://kodekloud.com/kk-media/image/upload/v1752879891/notes-assets/images/Jenkins-Project-Building-CICD-Pipeline-for-Scalable-Web-Applications-Different-Types-of-Build-Triggers/jenkins-remote-build-trigger-process.jpg)

> [!important]
> **Summary**
>
> Jenkins supports multiple build triggers—from chaining project builds and scheduling periodic builds to utilizing GitHub hooks, SCM polling, and remote triggering. Each method is designed to automate your build process and align Jenkins with your continuous integration and deployment strategies.

For more detailed information, you can explore these resources:

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Jenkins Plugins](https://plugins.jenkins.io/)

Transcribed by https://otter.ai

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins-project-building-ci-cd-pipeline-for-scalable-web-applications/module/4b025d4d-3ef9-479d-a483-3aa7a206a553/lesson/0bd36205-7514-49fa-98cb-c07b2fe554c9)**
>
> Watch video content
