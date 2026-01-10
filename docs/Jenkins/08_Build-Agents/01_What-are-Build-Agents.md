# What are Build Agents - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Build-Agents/What-are-Build-Agents)

---

## Table of Contents

- What are Build Agents
  - What Exactly Are Build Agents?
  - Supported Operating Systems
  - Why You Need Build Agents
  - Watch Video

---

## Content

Jenkins

Build Agents

# What are Build Agents

Imagine building a car. The body of the car (hood, doors, roof, etc.) provides structure and comfort, but it's the tires that move the car forward. In the same way, build agents in Jenkins and CI/CD pipelines are like the tires—they drive crucial processes such as code building, testing, and deployment.

![The image explains build agents, depicting a car labeled "Workload" and "Build agents," with buttons for "Deploy," "Build codes," and "Run automated tests."](https://kodekloud.com/kk-media/image/upload/v1752880010/notes-assets/images/Jenkins-What-are-Build-Agents/frame_60.jpg)

In this article, we explore what build agents are and how they operate. These systems are responsible for running various CI/CD pipeline tasks—from compiling code and executing unit tests to running integration and smoke tests. They transform your source code into deployable binaries or artifacts that work across multiple platforms like Windows, Linux, or macOS.

![The image illustrates a CI pipeline process, showing code building, testing, and producing binaries/artifacts for Windows, Linux, and MacOS platforms.](https://kodekloud.com/kk-media/image/upload/v1752880011/notes-assets/images/Jenkins-What-are-Build-Agents/frame_110.jpg)

## What Exactly Are Build Agents?

Build agents function as the executors in your CI/CD workflow. When a task is queued in the pipeline, a build agent picks it up and performs the required steps. The beauty of build agents is their versatility; any machine that can run Java can serve as a build agent. This includes:

- A physical server (bare metal)
- A virtual machine or desktop
- A Docker container, which can even be managed through Kubernetes for scalability
- An ARM-based device like a Raspberry Pi

![The image illustrates a "Task Executor" connected to various build agents: Raspberry Pi, Windows, Linux, MacOS, and Docker.](https://kodekloud.com/kk-media/image/upload/v1752880012/notes-assets/images/Jenkins-What-are-Build-Agents/frame_150.jpg)

> [!important]
> **Note**
>
> In production environments, it is advisable to deploy build agents on secure and resilient infrastructure, such as data centers or dedicated server racks, as opposed to personal machines.

## Supported Operating Systems

Build agents can operate on various platforms, including:

- Windows (e.g., Windows Server, Windows 10)
- Linux (distributions like Ubuntu, Red Hat, Debian, etc.)
- macOS (commonly used for building macOS applications)

Utilizing Docker containers offers extra benefits. Containers are highly scalable, allowing you to rapidly adjust resources which can significantly enhance the flexibility and efficiency of your CI/CD pipeline.

![The image shows Jenkins with build agents for Windows, Linux, MacOS, and Docker, featuring their respective logos.](https://kodekloud.com/kk-media/image/upload/v1752880013/notes-assets/images/Jenkins-What-are-Build-Agents/frame_290.jpg)

## Why You Need Build Agents

Although it is possible to run builds directly on the Jenkins server, this approach is generally discouraged for two main reasons:

1.  **Performance:**  
    Running builds on the Jenkins server can overload it with heavy tasks. When multiple builds execute simultaneously, the server might struggle with CPU and memory constraints, leading to delays and reduced overall efficiency.

    ![The image shows a choice between a Jenkins Server and a Build Server, with the Build Server marked as recommended.](https://kodekloud.com/kk-media/image/upload/v1752880014/notes-assets/images/Jenkins-What-are-Build-Agents/frame_330.jpg)

2.  **Security:**  
    Isolating build executions by offloading them to dedicated build agents improves security. Separating these tasks minimizes the risk of exposing the main Jenkins server to vulnerabilities that might occur during build or script execution.

    ![The image shows a Jenkins Server with a green checkmark, indicating it's running builds on the same server, but it's labeled as "Not Recommended."](https://kodekloud.com/kk-media/image/upload/v1752880015/notes-assets/images/Jenkins-What-are-Build-Agents/frame_310.jpg)

> [!important]
> **Warning**
>
> Avoid running builds on your main Jenkins server to maintain stability and safeguard your system from potential security threats.

By leveraging dedicated build agents, you ensure that your Jenkins environment runs efficiently while securely managing diverse build workloads.

That’s it for this overview. With this foundation on build agents, you’re now ready to delve deeper into configuring and managing them for optimal CI/CD pipeline performance.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/1abff4aa-214c-48a2-98f1-2188e2e446bd/lesson/4c6cbd2c-81a3-4257-bbce-c98c48c32d9d)**
>
> Watch video content
