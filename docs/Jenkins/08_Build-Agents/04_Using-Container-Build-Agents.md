# Using Container Build Agents - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Jenkins/Build-Agents/Using-Container-Build-Agents)

---

## Table of Contents

- Using Container Build Agents
  - Setting Up the Pipeline
  - Configuring the Pipeline in Jenkins
  - Viewing the Build Process
  - Conclusion
  - Watch Video

---

## Content

Jenkins

Build Agents

# Using Container Build Agents

This article explains a modern method for creating build agents using Docker containers. Instead of managing persistent virtual machines—even in the cloud—you can leverage ephemeral Docker containers that start for a specific task and then shut down. This approach greatly simplifies infrastructure management by using containers as temporary build agents.

We will use Docker to launch a Go container and walk you through each step.

## Setting Up the Pipeline

Begin by opening your VS Code and reviewing the pipeline code. The pipeline defines a development stage where it clones a Git repository and runs a command to display the Go version. The significant difference in this configuration is the specification of a Docker image for the build agent.

Below is the Jenkins pipeline code that utilizes the official Go image from Docker Hub:

```
pipeline {
    agent {
        docker { image 'golang:latest' }
    }
    stages {
        stage('Development') {
            steps {
                git 'https://github.com/AdminTurnedDevOps/go-webapp-sample.git'
                sh 'go version'
            }
        }
    }
}
```

Historically, you may have used a freestyle project to select an Ubuntu instance as your build agent. With Docker, however, the container itself becomes the build agent. For most cases, the built-in Docker images (like `golang:latest`) available on Docker Hub are sufficient.

> [!important]
> **Tip**
>
> Using Docker containers as build agents eliminates the overhead of managing virtual machines and can streamline your CI/CD workflow.

## Configuring the Pipeline in Jenkins

Once you have your pipeline code ready, follow these steps in Jenkins:

1.  Create a new item and name it (e.g., "go build").
2.  Select "Pipeline" as the project type.
3.  Click "OK" and paste the above pipeline code into the configuration area.

The image below illustrates the Jenkins interface for creating a new item:

![The image shows a Jenkins interface for creating a new item, with options like Freestyle project, Pipeline, and Multi-configuration project.](https://kodekloud.com/kk-media/image/upload/v1752880001/notes-assets/images/Jenkins-Using-Container-Build-Agents/frame_130.jpg)

After pasting the code, save the configuration and click “Build Now” to trigger the pipeline.

## Viewing the Build Process

When you initiate the build, Jenkins will launch the Docker container and execute the pipeline. Internally, the Docker run command is invoked to execute the `go version` command within the container. You can monitor the console output in the build logs to see the version of Go installed.

Below is an overview of the Jenkins dashboard stage view:

![The image shows a Jenkins dashboard with options like "Build Now" and "Configure," displaying a stage view with development time and build history.](https://kodekloud.com/kk-media/image/upload/v1752880002/notes-assets/images/Jenkins-Using-Container-Build-Agents/frame_150.jpg)

Here is a sample console output from the pipeline execution:

```
[Pipeline] sh
Cloning repository https://github.com/AdminTurnedDevOps/go-webapp-sample.git
> git init /home/newuser/workspace/gobuild # timeout=10
Fetching upstream changes from https://github.com/AdminTurnedDevOps/go-webapp-sample.git
> git --version # timeout=10
> git --version # git version 2.25.1
> git fetch --tags --force --progress -- https://github.com/AdminTurnedDevOps/go-webapp-sample.git +refs/heads/*:refs/remotes/origin/* # timeout=10
> git config remote.origin.url https://github.com/AdminTurnedDevOps/go-webapp-sample.git # timeout=10
> git config --add remote.origin.fetch +refs/heads/*:refs/remotes/origin/* # timeout=10
> git rev-parse refs/remotes/origin/master^{commit} # timeout=10
> git config core.sparsecheckout # timeout=10
> git checkout -f 8b1545397d3fa8110566c4f5b8d98f0bf8f7a6 # timeout=10
> git branch -a -v --no-abbrev # timeout=10
> git checkout -b master 8b1545397d3fa8110566c4f5b8d98f0bf8f7a6 # timeout=10
+ go version
go version go1.17.6 linux/amd64
[Pipeline] }
[Pipeline] // stage
[Pipeline] }
[Pipeline] // withDockerContainer
[Pipeline] }
[Pipeline] // node
[Pipeline] End of Pipeline
Finished: SUCCESS
```

As seen in the logs, the build process successfully clones the repository and executes the `go version` command inside the Docker container. Notice that the command output reports Go version 1.17.6.

> [!important]
> **Note**
>
> If you require a specific Go version for your project, consider using a tagged Docker image (e.g., `golang:1.17.6`) to ensure consistency across builds.

## Conclusion

This article demonstrated how to use Docker containers as ephemeral build agents in Jenkins. By specifying the Docker image within your pipeline script, you can achieve a more lightweight and flexible CI/CD process that leverages containerized resources without the need for managing traditional virtual machines.

In the next lesson, we will explore further enhancements to containerized build processes and additional customization options for your pipelines.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/jenkins/module/1abff4aa-214c-48a2-98f1-2188e2e446bd/lesson/0a379185-c7ce-45c1-a08f-e21b8b6d12b1)**
>
> Watch video content
