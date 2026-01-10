# Utilize Docker Image Agent - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Agents-and-Nodes-in-Jenkins/Utilize-Docker-Image-Agent)

---

## Table of Contents

- Utilize Docker Image Agent
  - Prerequisites
  - Configuring a Docker-Based Agent
  - Example Pipeline
  - Build Console Output
  - Verifying on the Jenkins Agent
  - Conclusion
  - Links and References
  - Watch Video
    - Adding a Docker Image Agent to Stage S3
      - Scheduling on a Specific Node

---

## Content

Advanced Jenkins

Agents and Nodes in Jenkins

# Utilize Docker Image Agent

In this guide, you’ll learn how to configure Jenkins Pipeline stages to run inside Docker containers using the Docker Pipeline Plugin. By the end, you’ll be able to pull official images (e.g., Node.js 18 Alpine) or build custom images from a Dockerfile, schedule them on specific nodes, and inspect the full console output.

## Prerequisites

Ensure you have the [Docker Pipeline Plugin](https://plugins.jenkins.io/docker-workflow/) installed and enabled:

![The image shows the Jenkins plugin management interface, specifically the "Installed plugins" section, with Docker-related plugins listed.](https://kodekloud.com/kk-media/image/upload/v1752868781/notes-assets/images/Advanced-Jenkins-Utilize-Docker-Image-Agent/jenkins-plugin-management-docker.jpg)

## Configuring a Docker-Based Agent

Navigate to **Pipeline Syntax** → **Agent** to generate the DSL snippet. You can choose:

| Directive  | Description                                     |
| ---------- | ----------------------------------------------- |
| dockerFile | Build a custom image from a local `Dockerfile`. |
| docker     | Pull and run a prebuilt Docker image.           |

When selecting `docker`, you can configure:

| Parameter         | Purpose                                                           |
| ----------------- | ----------------------------------------------------------------- |
| `image`           | Name of the Docker image (e.g., `node:18-alpine`).                |
| `args`            | Additional flags for `docker run`.                                |
| `label`           | (Optional) Restrict execution to nodes with this label.           |
| `customWorkspace` | (Optional) Override the workspace directory inside the container. |
| `registryUrl`     | (Optional) Private registry URL.                                  |
| `credentialsId`   | (Optional) Credentials for private registry.                      |
| `alwaysPull`      | Force image pull on each build.                                   |

> [!important]
> **Note**
>
> Use `alwaysPull true` to ensure the latest image version is used, preventing stale caches.

![The image shows a Jenkins interface for configuring a pipeline directive, specifically setting up an agent to run inside a Docker container with the image "node:18".](https://kodekloud.com/kk-media/image/upload/v1752868782/notes-assets/images/Advanced-Jenkins-Utilize-Docker-Image-Agent/jenkins-pipeline-docker-agent-node18.jpg)

The generated snippet might look like this:

```
agent {
    docker {
        alwaysPull true
        image 'node:18'
    }
}
```

## Example Pipeline

Below is a sample `Jenkinsfile` demonstrating three stages:

```
pipeline {
    agent any
    stages {
        stage('S1-Any Agent') {
            steps {
                sh 'cat /etc/os-release'
                sh 'node -v'
                sh 'npm -v'
            }
        }
        stage('S2-Ubuntu Agent') {
            agent { label 'ubuntu-docker-jdk17-node20' }
            steps {
                sh 'cat /etc/os-release'
                sh 'node -v'
                sh 'npm -v'
            }
        }
        stage('S3-Docker Image Agent') {
            // To be configured
        }
    }
}
```

### Adding a Docker Image Agent to Stage S3

To run **S3-Docker Image Agent** inside the official Node.js 18 Alpine container, update that stage:

```
pipeline {
    agent any
    stages {
        stage('S1-Any Agent') { ... }
        stage('S2-Ubuntu Agent') { ... }
        stage('S3-Docker Image Agent') {
            agent {
                docker {
                    image 'node:18-alpine'
                }
            }
            steps {
                sh 'cat /etc/os-release'
                sh 'node -v'
                sh 'npm -v'
            }
        }
    }
}
```

#### Scheduling on a Specific Node

If you need the Docker container to run on a labeled node (for example, one with JDK 17 and Node 20), add the `label` directive:

```
pipeline {
    agent any
    stages {
        stage('S1-Any Agent') { ... }
        stage('S2-Ubuntu Agent') { ... }
        stage('S3-Docker Image Agent') {
            agent {
                docker {
                    image 'node:18-alpine'
                    label 'ubuntu-docker-jdk17-node20'
                }
            }
            steps {
                sh 'cat /etc/os-release'
                sh 'node -v'
                sh 'npm -v'
            }
        }
    }
}
```

Commit and push this `Jenkinsfile` to your repository, then trigger the build in Jenkins:

![The image shows a Jenkins dashboard displaying the status of a pipeline named "pipeline-external-agent," with stages like "Checkout SCM" and "S1-Any Agent" marked as completed. The interface includes options for configuring and managing the pipeline.](https://kodekloud.com/kk-media/image/upload/v1752868783/notes-assets/images/Advanced-Jenkins-Utilize-Docker-Image-Agent/jenkins-dashboard-pipeline-status.jpg)

## Build Console Output

When the pipeline runs, Jenkins will:

1.  Pull the Docker image if it’s not already available.
2.  Create and start a container on the designated agent.
3.  Execute the shell steps inside that container.
4.  Stop and remove the container once finished.

Example console output illustrating the pull:

```
> docker pull node:18-alpine
18-alpine: Pulling from library/node
...
Status: Downloaded newer image for node:18-alpine
docker.io/library/node:18-alpine
```

Within the running container:

```
+ cat /etc/os-release
NAME="Alpine Linux"
ID=alpine
VERSION_ID=3.20.3
PRETTY_NAME="Alpine Linux v3.20"
...
+ node -v
v18.20.4
+ npm -v
10.7.0
```

Cleanup at the end of the stage:

```
> docker stop --time=1 a71ce79625ec636f...
> docker rm -f -v a71ce79625ec636f...
```

## Verifying on the Jenkins Agent

After completion, confirm no containers are running:

```
docker ps
# no containers
docker ps -a
# previous containers removed
docker images
# node:18-alpine should appear in the list
```

## Conclusion

You’ve configured a Jenkins Pipeline stage to execute inside a Docker container using a prebuilt image. For more control over dependencies and environment setup, consider building custom images with a `Dockerfile`.

## Links and References

- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Docker Workflow Plugin](https://plugins.jenkins.io/docker-workflow/)
- [Node.js Docker Official Images](https://hub.docker.com/_/node)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/d1f217e1-bfef-4ba3-adf8-1411e911e0bc/lesson/01befd7f-936f-4aeb-8e73-b51abb850849)**
>
> Watch video content
