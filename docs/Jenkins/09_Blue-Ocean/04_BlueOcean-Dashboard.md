# BlueOcean Dashboard - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Blue-Ocean/BlueOcean-Dashboard)

---

## Table of Contents

- BlueOcean Dashboard
  - Overview of the Pipeline Dashboard
  - Inspecting Pipeline Stages and Steps
  - Pipeline Execution Details
  - Troubleshooting and Logs
  - Next Steps
  - Watch Video
  - Practice Lab

---

## Content

Jenkins

Blue Ocean

# BlueOcean Dashboard

Now that we've observed a pipeline in action, let's examine the BlueOcean dashboard interface in detail. In this lesson, we will walk through the key components of the pipeline view, highlighting how to navigate and interpret the various elements.

## Overview of the Pipeline Dashboard

When you click on **Build**, the dashboard displays an overview of your pipeline. Here, you have multiple options at your disposal:

- View activity logs
- Switch between branches (especially useful for multibranch pipeline jobs)
- Review pull requests
- Rerun the pipeline
- Disable the pipeline if required

## Inspecting Pipeline Stages and Steps

Upon selecting a specific pipeline run, you can inspect the individual stages and steps executed within it. For example, the initial step involves pulling the Go web app sample from GitHub:

```
The recommended git tool is: NONE
No credentials specified
Warning: JENKINS-30600: special launcher org.jenkinsci.plugins.docker.workflow.WithContainerStep$Decorators$1@656b86d53; decorates RemoteLauncher[hudson.remoting.Channel@326e796b:ubuntuagent] will be ignored (a typical symptom is the Git executable not being found)
Cloning the remote Git repository
Avoid second fetch
Checking out Revision 8b15445397d3fa8110566c45b8d98f0b8f7a6 (refs/remotes/origin/master)
Commit message: "dockerfile"
First time build. Skipping changelog.
Cloning repository https://github.com/AdminTurnedDevOps/go-webapp-sample.git
> git init /home/newuser/workspace/gobuild # timeout=10
```

The log above confirms that the pipeline successfully cloned the repository and checked out the specified commit.

> [!important]
> **Note**
>
> Make sure that your Git configuration is set correctly to avoid warnings related to missing credentials or executables.

## Pipeline Execution Details

Another crucial step is verifying that the correct Go environment is set up for your build. Within the pipeline, the Go version is explicitly executed to ensure that the appropriate Go environment is available:

```
go version
```

This command confirms the Go version installed on the build agent, ensuring compatibility with your project's requirements.

## Troubleshooting and Logs

If you need to troubleshoot or analyze pipeline execution further, the BlueOcean dashboard provides two key features:

1.  **Restart the Pipeline:** Quickly re-run the pipeline to test fixes or updates.
2.  **Download the Log File:** Access a comprehensive log file that includes detailed insights into the pipeline's performance and any issues encountered.

Below is an image illustrating the dashboard interface with options to restart the pipeline and view execution details:

![The image shows a software development pipeline interface, indicating the "Development" stage is complete, with options to restart and view details.](https://kodekloud.com/kk-media/image/upload/v1752879998/notes-assets/images/Jenkins-BlueOcean-Dashboard/frame_50.jpg)

Downloading the log file is especially useful for troubleshooting, as it includes critical information such as tests archived, artifacts created, runtime duration, change timings, and the user who initiated the build.

> [!important]
> **Dashboard Overview**
>
> The BlueOcean interface is designed primarily to enhance visualization and provide an intuitive user experience for monitoring and interacting with your pipelines. It leverages familiar patterns to make managing complex builds straightforward.

## Next Steps

Now that you have an in-depth look at the BlueOcean dashboard and its functionalities, continue with further hands-on exercises to deepen your understanding of managing and troubleshooting Jenkins pipelines.

For additional resources and detailed documentation, consider visiting [Jenkins Documentation](https://www.jenkins.io/doc/) or [BlueOcean Overview](https://www.jenkins.io/projects/blueocean/).

Keep exploring to master the intricacies of Jenkins pipelines and optimize your continuous integration and delivery processes.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/77db3006-93f7-42b0-90d0-6fd961631d1f/lesson/09a6d832-daca-4cb4-a15d-8bf3364284bd)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/jenkins/module/77db3006-93f7-42b0-90d0-6fd961631d1f/lesson/71f84523-dd37-48c0-81e1-0b0d3e5e620f)**
>
> Practice lab
