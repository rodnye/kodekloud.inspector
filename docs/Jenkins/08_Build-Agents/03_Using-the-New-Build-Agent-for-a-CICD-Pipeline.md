# Using the New Build Agent for a CICD Pipeline - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Build-Agents/Using-the-New-Build-Agent-for-a-CICD-Pipeline)

---

## Table of Contents

- Using the New Build Agent for a CICD Pipeline
  - Creating a New Pipeline Project
  - Restricting the Project to a Specific Build Agent
  - Configuring a Build Step
  - Verifying the Build Outcome
  - Watch Video
  - Practice Lab

---

## Content

Jenkins

Build Agents

# Using the New Build Agent for a CICD Pipeline

In this guide, we will demonstrate how to configure and utilize a dedicated build agent within a Jenkins-based CICD pipeline. This setup is especially beneficial for scenarios involving applications that require specific operating systems, such as macOS apps or Linux-based testing environments.

## Creating a New Pipeline Project

To start, log in to Jenkins and click on **New Item**. Provide a project name (for example, "Ubuntu Test Pipeline") and then select the **Freestyle project** option.

![The image shows a Jenkins interface for creating a new item, with options like Freestyle project, Pipeline, and Multi-configuration project.](https://kodekloud.com/kk-media/image/upload/v1752880007/notes-assets/images/Jenkins-Using-the-New-Build-Agent-for-a-CICD-Pipeline/frame_30.jpg)

After selecting the project type, click **OK** to proceed.

## Restricting the Project to a Specific Build Agent

In the project configuration page, enable the option **Restrict where this project can be run**. Enter the build agent name on which you want to execute the project. Jenkins will help by indicating if it finds a matching agent as you type.

![The image shows a Jenkins pipeline configuration screen with options for Docker, GitHub, and build settings, including a restriction for project execution on a specific node labeled "ubuntuagent."](https://kodekloud.com/kk-media/image/upload/v1752880008/notes-assets/images/Jenkins-Using-the-New-Build-Agent-for-a-CICD-Pipeline/frame_50.jpg)

> [!important]
> **Tip**
>
> Ensure you enter the exact agent identifier. If an unrecognized name is entered, Jenkins will display a message such as "no agent matches."

For example, by entering "Ubuntu Agent" (or the exact matching identifier), Jenkins will confirm the availability of the agent for your project.

## Configuring a Build Step

Next, test the build agent by adding a build step:

1.  Scroll down to the **Build** section.
2.  Select **Execute shell** as the build step.
3.  Insert the following simple command to verify the functionality:

```
echo "testing to confirm the build agent works"
```

Once the build step is configured, click **Save** and then trigger the build by selecting **Build Now**.

![The image shows a Jenkins dashboard for the project "ubuntutestpipeline," featuring options like "Build Now," "Workspace," and "Recent Changes."](https://kodekloud.com/kk-media/image/upload/v1752880009/notes-assets/images/Jenkins-Using-the-New-Build-Agent-for-a-CICD-Pipeline/frame_90.jpg)

## Verifying the Build Outcome

After the build is initiated, inspect the console output to verify that the build executed on your designated "Ubuntu Agent." The console output should resemble the following:

```
Started by user mike
Running as SYSTEM
Building remotely on ubuntuagent in workspace /home/newuser/workspace/ubuntutestpipeline
[ubuntutestpipeline] $ /bin/sh -xe /tmp/jenkins1094049092160565796.sh
+ echo "testing to confirm the build agent works"
testing to confirm the build agent works
Finished: SUCCESS
```

This output confirms that the build agent is correctly configured and functioning as expected.

> [!important]
> **Next Steps**
>
> Continue exploring the power of build agents in CICD pipelines by experimenting with additional configurations and practical exercises.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/1abff4aa-214c-48a2-98f1-2188e2e446bd/lesson/f1007797-2386-4f55-8534-2e59f58b48ec)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/jenkins/module/1abff4aa-214c-48a2-98f1-2188e2e446bd/lesson/887f1f29-e6bf-41f0-83c4-3e8391207821)**
>
> Practice lab
