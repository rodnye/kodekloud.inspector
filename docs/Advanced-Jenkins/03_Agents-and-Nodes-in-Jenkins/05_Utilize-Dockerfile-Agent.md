# Utilize Dockerfile Agent - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Agents-and-Nodes-in-Jenkins/Utilize-Dockerfile-Agent)

---

## Table of Contents

- Utilize Dockerfile Agent
  - Overview
  - Prerequisites
  - Step 1: Example with the Standard Node.js Alpine Image
  - Step 2: Create a Custom Dockerfile
  - Step 3: Switch to the dockerfile Agent
  - Step 4: Confirm Successful Build
  - Links and References
  - Watch Video

---

## Content

Advanced Jenkins

Agents and Nodes in Jenkins

# Utilize Dockerfile Agent

## Overview

Leveraging a Dockerfile agent in Jenkins lets you build a custom Docker image with all the CLI tools your pipeline requires. This approach ensures:

- Consistent environments across builds
- Isolation for each job
- Flexibility to install any SDKs, CLIs, or dependencies

## Prerequisites

| Requirement    | Purpose                                             |
| -------------- | --------------------------------------------------- |
| Jenkins 2.10+  | Pipeline support for `dockerfile` agent             |
| Docker Daemon  | Must be available on the agent node                 |
| Git Repository | Contains both `Jenkinsfile` and `Dockerfile.cowsay` |

> [!important]
> **Note**
>
> Ensure your Jenkins agent node has Docker installed and that the Jenkins user has permission to run Docker commands.

---

## Step 1: Example with the Standard Node.js Alpine Image

Here’s a simple `Jenkinsfile` using the official `node:18-alpine` image:

```
pipeline {
    agent any
    stages {
        stage('S4 - Standard Node.js Image') {
            agent {
                docker {
                    image 'node:18-alpine'
                    label 'ubuntu-docker-jdk17-node20'
                }
            }
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'cowsay -f dragon "Hello from Docker Container"'
            }
        }
    }
}
```

When executed, the first two commands succeed, but `cowsay` is missing:

```
/home/jenkins-agent/.../script.sh: line 1: cowsay: not found
```

![The image shows a Jenkins dashboard displaying the activity of a pipeline named "pipeline-external-agent," with details on the status, run number, message, duration, and completion time of recent builds.](https://kodekloud.com/kk-media/image/upload/v1752868784/notes-assets/images/Advanced-Jenkins-Utilize-Dockerfile-Agent/jenkins-dashboard-pipeline-external-agent.jpg)

---

## Step 2: Create a Custom Dockerfile

To include `cowsay`, create `Dockerfile.cowsay`:

```
FROM node:18-alpine

RUN apk update && \
    apk add --no-cache git perl && \
    git clone https://github.com/jasonm23/cowsay.git /tmp/cowsay && \
    cd /tmp/cowsay && \
    ./install.sh /usr/local && \
    rm -rf /tmp/cowsay
```

This Dockerfile:

1.  Updates the Alpine package index
2.  Installs Git and Perl
3.  Clones and installs `cowsay`
4.  Cleans up temporary files

> [!important]
> **Warning**
>
> Always remove temporary directories like `/tmp/cowsay` to keep your image size small.

---

## Step 3: Switch to the `dockerfile` Agent

Update your `Jenkinsfile` to build the custom image on the fly:

```
pipeline {
    agent any
    stages {
        stage('S4 - Dockerfile Agent') {
            agent {
                dockerfile {
                    filename 'Dockerfile.cowsay'
                    label 'ubuntu-docker-jdk17-node20'
                }
            }
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'cowsay -f dragon "This is running on Docker Container"'
            }
        }
    }
}
```

Behind the scenes, Jenkins will:

1.  Read `Dockerfile.cowsay` from the workspace
2.  Run:

    ```
    docker build -t <generated-image-id> -f "Dockerfile.cowsay" .
    ```

3.  Launch a container from the new image and execute your steps

---

## Step 4: Confirm Successful Build

In the Jenkins console you’ll see:

```
docker build -t 0f559f3f6a2c220b616594d407b50bd36d837f4 -f "Dockerfile.cowsay" .
docker inspect -f '{{.Id}}' 0f559f3f6a2c220b616594d407b50bd36d837f4
v18.20.4
10.7.0
This is running on Docker Container
```

All commands now succeed, including `cowsay`.

---

## Links and References

- [Jenkins Pipeline Agents](https://www.jenkins.io/doc/book/pipeline/syntax/#agent)
- [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)
- [Node.js Official Docker Images](https://hub.docker.com/_/node)
- [cowsay GitHub Repository](https://github.com/jasonm23/cowsay)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/d1f217e1-bfef-4ba3-adf8-1411e911e0bc/lesson/10aeb450-17d4-4a8f-8ee5-481ad7662ee7)**
>
> Watch video content
