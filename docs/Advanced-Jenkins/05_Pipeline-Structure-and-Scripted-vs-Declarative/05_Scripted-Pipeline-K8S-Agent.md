# Scripted Pipeline K8S Agent - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Pipeline-Structure-and-Scripted-vs-Declarative/Scripted-Pipeline-K8S-Agent)

---

## Table of Contents

- Scripted Pipeline K8S Agent
  - Declarative Pipeline Example
  - Scripted Pipeline with podTemplate
  - Full Scripted Jenkinsfile Example
  - Links and References
  - Watch Video
  - Practice Lab
    - 1. Defining Pod Templates in the Jenkins UI
    - 2. Using the Snippet Generator
    - Pipeline Stage Summary

---

## Content

Advanced Jenkins

Pipeline Structure and Scripted vs Declarative

# Scripted Pipeline K8S Agent

In this lesson, you’ll learn how to run scripted Jenkins pipeline stages inside Kubernetes Pods using the Jenkins Kubernetes plugin’s `podTemplate`. We’ll compare a Declarative Pipeline on a static agent versus a Scripted Pipeline on a dynamic K8s agent, then walk through defining pod templates and share a full example.

> [!important]
> **Prerequisites**
>
> - Jenkins server with the [Kubernetes Plugin](https://plugins.jenkins.io/kubernetes/) installed
> - Access to a Kubernetes cluster and a configured Kubernetes cloud in Jenkins
> - Credentials for any external services (e.g., MongoDB, Gitea) stored in Jenkins

## Declarative Pipeline Example

Here’s a standard Declarative Pipeline bound to a static Jenkins agent:

```
pipeline {
  agent {
    node {
      label 'ubuntu-docker-jdk17-node20'
      environment {
        NODEJS_HOME        = "${tool 'nodejs-22-6-0'}"
        PATH               = "${env.NODEJS_HOME}/bin:${env.PATH}"
        MONGO_URI          = "mongodb+srv://supercluster.d83j"
        MONGO_DB_CREDS     = credentials('mongo-db-creds')
        MONGO_USERNAME     = credentials('mongo-db-user')
        MONGO_PASSWORD     = credentials('mongo-db-pass')
        SONAR_SCANNER_HOME = tool 'sonarqube-scanner'
        GITEA_TOKEN        = credentials('gitea-api-token')
      }
    }
  }
  properties {
    // repository properties
  }
  stages {
    stage('Installing Dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Dependency Scanning') {
      steps {
        sh 'npm audit'
      }
    }
    stage('Unit Testing') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'credential')]) {
          sh 'node -v'
          sh 'npm test'
        }
      }
    }
  }
}
```

```
$ git checkout -b pipeline/scripted
Switched to a new branch 'pipeline/scripted'
```

To switch this Declarative Pipeline onto Kubernetes Pods, update the `agent` block:

```
pipeline {
  agent {
    kubernetes {
      cloud            'dasher-prod-k8s-us-east'
      yamlFile         'k8s-agent.yaml'
      defaultContainer 'node-18'
    }
  }
  environment {
    MONGO_URI        = "mongodb+srv://supercluster.d83jj.mongodb.net/super"
    MONGO_DB_CREDS   = credentials('mongo-db-credentials')
    MONGO_USERNAME   = credentials('mongo-db-username')
    MONGO_PASSWORD   = credentials('mongo-db-password')
    GITEA_TOKEN      = credentials('gitea-api-token')
  }
  // ...
}
```

## Scripted Pipeline with podTemplate

For Scripted Pipelines, the `podTemplate` step defines how Jenkins spins up Pods. You have two main options:

1.  **Define Pod Templates in the Jenkins UI**
2.  **Generate with the Snippet Generator**

### 1\. Defining Pod Templates in the Jenkins UI

Navigate to **Manage Jenkins → Configure Clouds → dasher-prod-k8s-us-east** and click **Add Pod Template**. Configure Name, Namespace, Labels, Usage, then add container templates:

![The image shows a Jenkins dashboard under the "Clouds" section, listing a cloud named "dasher-prod-k8s-us-east" with an option to configure it.](https://kodekloud.com/kk-media/image/upload/v1752868915/notes-assets/images/Advanced-Jenkins-Scripted-Pipeline-K8S-Agent/jenkins-dashboard-clouds-dasher-prod.jpg)

![The image shows a Jenkins interface for creating a new pod template, with fields for name, namespace, labels, usage, and other settings.](https://kodekloud.com/kk-media/image/upload/v1752868916/notes-assets/images/Advanced-Jenkins-Scripted-Pipeline-K8S-Agent/jenkins-new-pod-template-interface.jpg)

### 2\. Using the Snippet Generator

Open **Pipeline Syntax → Snippet Generator**, choose **podTemplate**, then select your cloud and a unique label (e.g., `nodejs-pod`). Click **Add Container Template**:

![The image shows a Jenkins interface with a "Snippet Generator" for creating pipeline scripts, featuring a dropdown menu with various options for execution steps.](https://kodekloud.com/kk-media/image/upload/v1752868918/notes-assets/images/Advanced-Jenkins-Scripted-Pipeline-K8S-Agent/jenkins-snippet-generator-interface.jpg)

Configure the pod label and usage:

![The image shows a Jenkins pipeline configuration screen with options for node usage and pod template settings. It includes a label field set to "nodejs-pod" and a dropdown for usage selection.](https://kodekloud.com/kk-media/image/upload/v1752868919/notes-assets/images/Advanced-Jenkins-Scripted-Pipeline-K8S-Agent/jenkins-pipeline-nodejs-pod-settings.jpg)

Define the container details:

![The image shows a Jenkins pipeline configuration screen, specifically a container template setup with fields for Docker image, working directory, and command to run.](https://kodekloud.com/kk-media/image/upload/v1752868920/notes-assets/images/Advanced-Jenkins-Scripted-Pipeline-K8S-Agent/jenkins-pipeline-container-template.jpg)

Clean up the generated snippet to only include fields you need:

```
podTemplate(
  cloud:   'dasher-prod-k8s-us-east',
  label:   'nodejs-pod',
  containers: [
    containerTemplate(
      name:       'node-18',
      image:      'node:18-alpine',
      command:    'sleep',
      args:       '9999999',
      privileged: true,
      ttyEnabled: true
    )
  ]
) {
  // your scripted pipeline steps
}
```

## Full Scripted Jenkinsfile Example

Below is a consolidated Scripted Pipeline that uses:

- A **static node** for checkout and dependency install
- A **Kubernetes pod** for isolated unit testing
- **stash/unstash** for sharing artifacts

```
#!/usr/bin/env groovy


podTemplate(
  cloud:   'dasher-prod-k8s-us-east',
  label:   'nodejs-pod',
  containers: [
    containerTemplate(
      name:       'node-18',
      image:      'node:18-alpine',
      command:    'sleep',
      args:       '9999999',
      privileged: true,
      ttyEnabled: true
    )
  ]
) {
  // Static agent for checkout & install
  node('ubuntu-docker-jdk17-node20') {
    env.NODEJS_HOME = tool('nodejs-22-6-0')
    env.PATH        = "${env.NODEJS_HOME}/bin:${env.PATH}"
    env.MONGO_URI   = "mongodb+srv://supercluster.d83jj.mongodb.net/superData"


    stage('Checkout') {
      checkout scm
    }


    wrap([$class: 'TimestamperBuildWrapper']) {
      stage('Installing Dependencies') {
        cache(maxCacheSize: 550, caches: [
          arbitraryFileCache(
            cacheName:                 'npm-dependency-cache',
            cacheValidityDecidingFile: 'package-lock.json',
            includes:                  '**/*',
            path:                      'node_modules'
          )
        ]) {
          sh 'node -v'
          sh 'npm install --no-audit'
          stash includes: 'node_modules/', name: 'solar-system-node-modules'
        }
      }
    }
  }


  // Kubernetes Pod for unit testing
  stage('Unit Testing') {
    node('nodejs-pod') {
      container('node-18') {
        checkout scm
        unstash 'solar-system-node-modules'


        withCredentials([usernamePassword(
          credentialsId:    'mongo-db-credentials',
          usernameVariable: 'MONGO_USERNAME',
          passwordVariable: 'MONGO_PASSWORD'
        )]) {
          sh 'node -v'
          sh 'npm test'
        }
      }
    }
  }
}
```

```
$ git checkout -b pipeline/scripted
$ git commit -am "Use podTemplate for scripted pipeline"
$ git push origin pipeline/scripted
```

In [Blue Ocean](https://www.jenkins.io/projects/blueocean/) you’ll see the pipeline stages and Pod creation in action:

![The image shows a Jenkins pipeline interface with multiple build stages, including "Checkout," "Installing Dependencies," and "Unit Testing." It also displays a build history with several builds listed, one of which is pending.](https://kodekloud.com/kk-media/image/upload/v1752868921/notes-assets/images/Advanced-Jenkins-Scripted-Pipeline-K8S-Agent/jenkins-pipeline-build-stages-interface.jpg)

Under the hood, Jenkins spins up a Pod similar to:

```
apiVersion: "v1"
kind:       "Pod"
metadata:
  name:       "nodejs-pod-XXXXX"
  namespace:  "jenkins"
  labels:
    jenkins/label: "nodejs-pod"
spec:
  containers:
    - name:  "node-18"
      image: "node:18-alpine"
      command: ["sleep"]
      args:    ["9999999"]
      tty:     true
      securityContext:
        privileged: true
      volumeMounts:
        - mountPath: "/home/jenkins/agent"
          name:      "workspace-volume"
```

Once dependencies are unstashed, unit tests run inside the `node-18` container:

```
+ node -v
v18.20.4
+ npm test
> Solar System@6.7.6 test /home/jenkins/agent/workspace/solar-system
> mocha app-test.js --timeout 10000 --reporter mocha-junit-reporter --exit


  ✔ should retrieve the solar objects
  √ will handle missing data correctly


2 tests complete (xxxxms)
```

### Pipeline Stage Summary

| Stage                   | Agent                              | Tasks                                       |
| ----------------------- | ---------------------------------- | ------------------------------------------- |
| Checkout                | `ubuntu-docker-jdk17-node20`       | SCM checkout                                |
| Installing Dependencies | `ubuntu-docker-jdk17-node20`       | npm install, stash `node_modules`           |
| Unit Testing            | `nodejs-pod` (container `node-18`) | Unstash modules, run tests with credentials |

By combining a static agent for caching and Kubernetes pods for isolated execution, you achieve a scalable, flexible Scripted Pipeline. Use `podTemplate`, `node`, `container`, and `stash`/`unstash` to coordinate across stages.

## Links and References

- [Jenkins Kubernetes Plugin](https://plugins.jenkins.io/kubernetes/)
- [Blue Ocean Plugin](https://www.jenkins.io/projects/blueocean/)
- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/cffedc7a-8318-433c-83ff-5ec8f272486f/lesson/cb96f010-03c3-42fc-a8be-6d58ee742f1c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/cffedc7a-8318-433c-83ff-5ec8f272486f/lesson/6578e055-38f1-45eb-b447-773d0f3e2fea)**
>
> Practice lab
