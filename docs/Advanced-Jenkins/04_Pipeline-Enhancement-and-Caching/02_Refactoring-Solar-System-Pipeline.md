# Refactoring Solar System Pipeline - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Jenkins/Pipeline-Enhancement-and-Caching/Refactoring-Solar-System-Pipeline)

---

## Table of Contents

- Refactoring Solar System Pipeline
  - 1. Current Jenkinsfile Using agent any
  - 2. Defining a Kubernetes Pod Template
  - 3. Referencing the Pod in Your Jenkinsfile
  - 4. Configuring Node.js–Based Stages
  - 5. Observing the Refactored Pipeline
  - 6. Verifying the Console Output
  - Links and References
  - Watch Video

---

## Content

Advanced Jenkins

Pipeline Enhancement and Caching

# Refactoring Solar System Pipeline

Building on Jenkins’ extensible agent model, this guide demonstrates how to refactor an existing Solar System Pipeline so that all Node.js–based steps run inside a single Kubernetes Pod, while Docker builds and security scans execute on the controller node.

## 1\. Current Jenkinsfile Using `agent any`

The legacy `Jenkinsfile` relies on `agent any`, which executes every stage on the default executor. Here’s a simplified snippet:

```
pipeline {
  agent any


  tools {
    // e.g., nodejs 'node-18'
  }


  environment {
    MONGO_URI          = "mongodb+srv://supercluster.d83jj.mongodb.net/superData"
    MONGO_DB_CREDS     = credentials('mongo-db-credentials')
    MONGO_USERNAME     = credentials('mongo-db-username')
    MONGO_PASSWORD     = credentials('mongo-db-password')
    SONAR_SCANNER_HOME = tool 'sonarqube-scanner-610'
    GITEA_TOKEN        = credentials('gitea-api-token')
  }


  options {
    timestamps()
    buildDiscarder(logRotator(daysToKeepStr: '7'))
  }


  stages {
    stage('Installing Dependencies') {
      options { timestamps() }
      steps {
        sh 'npm install'
      }
    }
    // ...additional stages...
  }
}
```

This approach can lead to inconsistent environments across stages and requires pre-installed tools on every Jenkins agent.

## 2\. Defining a Kubernetes Pod Template

Create a Pod definition file named `k8s-agent.yaml` at the repository root. This template spins up two Node.js containers, defaulting to `node-18`:

```
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: node-18
      image: node:18-alpine
      command: [ "cat" ]
      tty: true
    - name: node-19
      image: node:19-alpine
      command: [ "cat" ]
      tty: true
```

> [!important]
> **Note**
>
> The `command: ["cat"]` and `tty: true` settings keep the container alive for Jenkins to execute steps interactively.

## 3\. Referencing the Pod in Your Jenkinsfile

Update your `Jenkinsfile` header to leverage the Kubernetes cloud and point to the Pod template:

```
pipeline {
  agent {
    kubernetes {
      cloud 'dasher-prod-k8s-us-east'
      yamlFile 'k8s-agent.yaml'
      defaultContainer 'node-18'
    }
  }


  tools {
    // e.g., nodejs 'node-18'
  }


  environment {
    MONGO_URI          = "mongodb+srv://supercluster.d83jj.mongodb.net/superData"
    MONGO_DB_CREDS     = credentials('mongo-db-credentials')
    MONGO_USERNAME     = credentials('mongo-db-username')
    MONGO_PASSWORD     = credentials('mongo-db-password')
    SONAR_SCANNER_HOME = tool 'sonarqube-scanner-610'
    GITEA_TOKEN        = credentials('gitea-api-token')
  }


  options {
    timestamps()
    timeout(time: 1, unit: 'HOURS')
  }


  stages {
    // Defined next...
  }
}
```

![The image shows a Jenkins configuration interface for setting up a Kubernetes cloud agent, with fields for specifying cloud, namespace, container, and pod template details.](https://kodekloud.com/kk-media/image/upload/v1752868891/notes-assets/images/Advanced-Jenkins-Refactoring-Solar-System-Pipeline/jenkins-kubernetes-cloud-agent-setup.jpg)

## 4\. Configuring Node.js–Based Stages

With the Kubernetes Pod in place, all Node.js stages execute inside `node-18`:

```
stages {
  stage('Installing Dependencies') {
    options { timestamps() }
    steps {
      sh 'node -v'
      sh 'npm install --no-audit'
    }
  }


  stage('Dependency Scanning') {
    parallel {
      stage('NPM Dependency Audit') {
        steps {
          sh '''
            node -v
            npm audit --audit-level=critical
            echo $?
          '''
        }
      }
    }
  }


  stage('Unit Testing') {
    options { retry(2) }
    steps {
      sh 'node -v'
      sh 'npm test'
    }
  }


  stage('Code Coverage') {
    steps {
      catchError(buildResult: 'SUCCESS', message: 'Coverage issues will be fixed later') {
        sh 'node -v'
        sh 'npm run coverage'
      }
    }
  }


  stage('Build Docker Image') {
    agent any
    steps {
      sh 'printenv'
      sh 'docker build -t siddharth67/solar-system:$GIT_COMMIT .'
    }
  }


  stage('Trivy Vulnerability Scanner') {
    agent any
    steps {
      script {
        trivyScanScript.vulnerability(imageName: "siddharth67/solar-system:$GIT_COMMIT", severity: "LOW")
        trivyScanScript.vulnerability(imageName: "siddharth67/solar-system:$GIT_COMMIT", severity: "MED")
        trivyScanScript.vulnerability(imageName: "siddharth67/solar-system:$GIT_COMMIT", severity: "HIGH")
      }
    }
  }
}
```

![The image shows a Visual Studio Code interface with a Jenkinsfile open, displaying code for building a Docker image. The terminal at the bottom indicates an SSH connection to a server.](https://kodekloud.com/kk-media/image/upload/v1752868892/notes-assets/images/Advanced-Jenkins-Refactoring-Solar-System-Pipeline/vscode-jenkinsfile-docker-build.jpg)

Push your changes to trigger the updated pipeline automatically.

## 5\. Observing the Refactored Pipeline

In Blue Ocean or the classic Jenkins UI, the run displays each Kubernetes-backed stage:

![The image shows a Jenkins dashboard displaying a pipeline for a project named "feature/advanced-demo" with various stages and their statuses. The interface includes options like "Open Blue Ocean" and a build history section.](https://kodekloud.com/kk-media/image/upload/v1752868893/notes-assets/images/Advanced-Jenkins-Refactoring-Solar-System-Pipeline/jenkins-dashboard-feature-advanced-demo.jpg)

Once execution completes, the full pipeline view confirms success across all stages:

![The image shows a Jenkins pipeline interface for a project named "solar-system" under "Gitea-Organization," displaying the progress of various stages like dependency scanning and unit testing. The Trivy Vulnerability Scanner section is expanded, showing detailed steps and their execution times.](https://kodekloud.com/kk-media/image/upload/v1752868894/notes-assets/images/Advanced-Jenkins-Refactoring-Solar-System-Pipeline/jenkins-pipeline-solar-system-gitea.jpg)

## 6\. Verifying the Console Output

The Jenkins console log provides details on Pod creation and step execution:

![The image shows a Jenkins pipeline console output with details about a build process, including Git operations and YAML file retrieval. The interface includes navigation options and timestamp settings on the left.](https://kodekloud.com/kk-media/image/upload/v1752868895/notes-assets/images/Advanced-Jenkins-Refactoring-Solar-System-Pipeline/jenkins-pipeline-console-output.jpg)

```
> git --version # git version 2.30.2
> git fetch --no-tags --force --progress https://gitea-server/credentials
> git checkout -f 5ea4402af016919de95183e847d60b321d2fe8d
> git rev-list --no-walk 5ea4402af016919de95183e847d60b321d2fe8d
```

Inside the `node-18` container:

```
+ node -v
v18.20.4
+ npm install --no-audit
added 358 packages in 4s


+ npm audit --audit-level=critical
# (audit results)
+ echo 0
0


+ node -v
v18.20.4
+ npm test
+ node -v
v18.20.4
+ npm run coverage
# (coverage report)
```

All Node.js stages share an `emptyDir` volume, so dependencies persist across steps without reinstallation.

---

By consolidating Node.js workloads into a single Kubernetes Pod and delegating Docker builds and vulnerability scans to the controller, this solution ensures consistency, reduces setup time, and leverages cloud-native best practices.

## Links and References

- [Jenkins Kubernetes Plugin](https://plugins.jenkins.io/kubernetes/)
- [Kubernetes Pod Templates](https://kubernetes.io/docs/concepts/workloads/pods/)
- [Blue Ocean User Guide](https://www.jenkins.io/projects/blueocean/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-jenkins/module/5352396d-b54f-4910-a874-f2aa70e88823/lesson/016f46b5-9dc4-4b31-a24e-3721594c0359)**
>
> Watch video content
