# Sharing a File between Containers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Pipeline-Enhancement-and-Caching/Sharing-a-File-between-Containers)

---

## Table of Contents

- Sharing a File between Containers
  - Jenkins Pipeline Configuration
  - Pipeline in Action
  - Console Output Example
  - Comparing Jenkins Agent Strategies
  - Links and References
  - Watch Video

---

## Content

Advanced Jenkins

Pipeline Enhancement and Caching

# Sharing a File between Containers

By default, all containers within a Kubernetes Pod share the same filesystem. In this tutorial, we'll demonstrate how to create a file in an Ubuntu container and then read it from a Node.js container within the same Pod using a Jenkins pipeline.

> [!important]
> **Note**
>
> Containers in the same Pod share volumes and file systems, allowing seamless data exchange without additional configuration.

## Jenkins Pipeline Configuration

Paste the following pipeline definition into your Jenkinsfile to set up two containers—`ubuntu-container` and `node-container`—in a single Pod:

```
pipeline {
  agent {
    kubernetes {
      yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: ubuntu-container
    image: ubuntu
    command: ['sleep']
    args: ['infinity']
  - name: node-container
    image: node:18-alpine
    command: ['cat']
    tty: true
"""
      defaultContainer 'ubuntu-container'
    }
  }


  stages {
    stage('Create File on Ubuntu') {
      steps {
        sh '''
          # Display the hostname
          hostname


          # Write data to a file
          echo important_UBUNTU_data > ubuntu-$BUILD_ID.txt


          # Confirm the file was created
          ls -ltr ubuntu-$BUILD_ID.txt
        '''
      }
    }


    stage('Access File on Node') {
      steps {
        container('node-container') {
          sh '''
            # Verify Node.js and npm versions
            node -v
            npm -v


            # List and read the file created earlier
            ls -ltr ubuntu-$BUILD_ID.txt
            cat ubuntu-$BUILD_ID.txt
          '''
        }
      }
    }
  }
}
```

## Pipeline in Action

Once you commit and run this pipeline, Jenkins will create the Pod and execute both stages. The Ubuntu container writes `ubuntu-$BUILD_ID.txt`, and the Node.js container reads it immediately afterward.

![The image shows a Jenkins dashboard displaying the status of a pipeline named "k8s-cloud-agent-demo," with several stages and their execution results.](https://kodekloud.com/kk-media/image/upload/v1752868898/notes-assets/images/Advanced-Jenkins-Sharing-a-File-between-Containers/jenkins-dashboard-k8s-pipeline-status.jpg)

According to the [Kubernetes Pod Lifecycle documentation](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/), all containers in a Pod can share volumes and files.

![The image is a screenshot from the Kubernetes documentation website, showing a diagram of a multi-container Pod with a file puller sidecar, a web server, and a shared volume.](https://kodekloud.com/kk-media/image/upload/v1752868900/notes-assets/images/Advanced-Jenkins-Sharing-a-File-between-Containers/kubernetes-multi-container-pod-diagram.jpg)

## Console Output Example

Below is an excerpt from the Jenkins console log illustrating how the file is shared between containers:

```
[ubuntu-container] Running shell script
+ hostname
k8s-cloud-agent-demo-5-rv7b8-8frt0-n41pw
+ echo important_UBUNTU_data
+ ls -ltr ubuntu-5.txt
-rw-r--r-- 1 root root 22 Nov 10 09:47 ubuntu-5.txt


[node-container] Running shell script
+ node -v
v18.20.4
+ npm -v
8.19.2
+ ls -ltr ubuntu-5.txt
-rw-r--r-- 1 root root 22 Nov 10 09:47 ubuntu-5.txt
+ cat ubuntu-5.txt
important_UBUNTU_data
```

## Comparing Jenkins Agent Strategies

Choose the right Jenkins agent model based on your infrastructure and maintenance requirements:

| Agent Type             | Description                                                    |
| ---------------------- | -------------------------------------------------------------- |
| Kubernetes Cloud Agent | On-demand Pods; auto-provisioned and cleaned up per job.       |
| Docker Agent           | Temporary containers managed by Jenkins; easy to customize.    |
| Static Node            | Always-on VMs or servers; requires manual OS and tool updates. |

> [!important]
> **Warning**
>
> Static nodes demand ongoing maintenance (OS patches, software upgrades). For most CI/CD workflows, dynamic agents reduce resource waste and simplify updates.

## Links and References

- [Kubernetes Pod Lifecycle](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/)
- [Jenkins Kubernetes Plugin](https://plugins.jenkins.io/kubernetes/)
- [Docker Official Images](https://hub.docker.com/search?q=node)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/5352396d-b54f-4910-a874-f2aa70e88823/lesson/5903fefe-f487-42f9-859d-d64545445dc0)**
>
> Watch video content
