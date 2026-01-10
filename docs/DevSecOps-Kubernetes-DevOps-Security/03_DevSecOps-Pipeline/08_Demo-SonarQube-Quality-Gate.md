# Demo SonarQube Quality Gate - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevSecOps-Pipeline/Demo-SonarQube-Quality-Gate)

---

## Table of Contents

- Demo SonarQube Quality Gate
  - Prerequisites
  - 1. Verify SonarQube Scanner Plugin
  - 2. Configure SonarQube Server in Jenkins
  - 3. Add SonarQube Webhook
  - 4. Create Declarative Jenkins Pipeline
  - 5. Diagnose Quality Gate Failures
  - 6. Confirm Quality Gate Pass
  - References
  - Watch Video

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevSecOps Pipeline

# Demo SonarQube Quality Gate

In this tutorial, we’ll show you how to integrate SonarQube quality gates into a Jenkins pipeline so that builds automatically pass or fail based on code quality metrics. We’ll use the **SonarQube Scanner for Jenkins** plugin to pause the pipeline for code analysis and enforce the gate status before proceeding.

**Key Benefits**

- Enforces coding standards automatically
- Fails builds on critical issues
- Provides real-time feedback on code smells, bugs, and vulnerabilities

## Prerequisites

| Requirement                              | Details                                                      |
| ---------------------------------------- | ------------------------------------------------------------ |
| SonarQube Scanner for Jenkins (v2.13.1+) | Installed via **Manage Plugins**                             |
| SonarQube instance                       | Accessible URL (Community, Developer, or Enterprise edition) |
| Jenkins webhook                          | Configured in SonarQube Administration → Webhooks            |
| Jenkins credentials                      | SonarQube auth token added as a **Secret Text** credential   |

> [!important]
> **Note**
>
> Ensure you have administrative access in both Jenkins and SonarQube to configure plugins, credentials, and webhooks.

---

## 1\. Verify SonarQube Scanner Plugin

In Jenkins, navigate to **Manage Jenkins → Manage Plugins**, then open the **Installed** tab to confirm:

![The image shows the Jenkins Plugin Manager interface with the "Installed" tab open, displaying a list of installed plugins including "Credentials Plugin," "Plain Credentials Plugin," and "SonarQube Scanner for Jenkins." A person is visible in a small video call window at the top right corner.](https://kodekloud.com/kk-media/image/upload/v1752873678/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-SonarQube-Quality-Gate/jenkins-plugin-manager-installed-plugins.jpg)

If it’s missing, install **SonarQube Scanner for Jenkins** from the **Available** tab and restart Jenkins.

---

## 2\. Configure SonarQube Server in Jenkins

1.  In your SonarQube user profile, generate an authentication token.
2.  In Jenkins, go to **Credentials → System → Global credentials** and add a new **Secret Text** credential with your token:

![The image shows a Jenkins interface displaying a list of global credentials, including kubeconfig, docker-hub, and sonar-qube-auth-token, with their respective types and descriptions.](https://kodekloud.com/kk-media/image/upload/v1752873679/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-SonarQube-Quality-Gate/jenkins-global-credentials-interface.jpg)

3.  Still under **Manage Jenkins → Configure System**, scroll to **SonarQube servers** and add:
    - **Name**: SonarQube
    - **Server URL**: `https://<your-sonarqube-host>`
    - **Server authentication token**: Select your **Secret Text** credential

You can now review existing project gates in SonarQube. Here’s an example of a failed gate due to excessive code smells:

![The image shows a SonarQube dashboard with a "Failed" quality gate status due to 14 code smells, exceeding the threshold of 12. The measures indicate no new bugs, vulnerabilities, or security hotspots, and a duplication rate of 0.0%.](https://kodekloud.com/kk-media/image/upload/v1752873680/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-SonarQube-Quality-Gate/sonarqube-dashboard-failed-quality-gate.jpg)

---

## 3\. Add SonarQube Webhook

In SonarQube, go to **Administration → Configuration → Webhooks**:

1.  **Name**: Jenkins webhook
2.  **URL**: `https://<your-jenkins-host>/sonarqube-webhook/`
3.  (Optional) Secret if you want to secure payloads

![The image shows a web interface for creating a webhook in SonarQube, with fields for the name, URL, and secret. The browser tabs and taskbar are visible, indicating a Windows operating system.](https://kodekloud.com/kk-media/image/upload/v1752873681/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-SonarQube-Quality-Gate/sonarqube-webhook-interface-windows.jpg)

Save and verify it appears in the list:

![The image shows a SonarQube administration page displaying webhook configurations, with one webhook named "jenkins-webhook" listed. The page is accessed through a browser with multiple tabs open.](https://kodekloud.com/kk-media/image/upload/v1752873682/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-SonarQube-Quality-Gate/sonarqube-webhook-configuration-jenkins.jpg)

---

## 4\. Create Declarative Jenkins Pipeline

Place the following **Jenkinsfile** at the root of your repository. It:

1.  Checks out source code
2.  Runs Maven build & SonarQube analysis
3.  Waits for the quality gate result (`abortPipeline: true` stops the build on failure)
4.  Builds and pushes a Docker image

```
pipeline {
  agent any

  stages {
    stage('Checkout SCM') {
      steps {
        git url: 'https://github.com/foo/bar.git'
      }
    }

    stage('Build & Analyze') {
      steps {
        withSonarQubeEnv('SonarQube') {
          withMaven(maven: 'Maven 3.5') {
            sh 'mvn clean package sonar:sonar'
          }
        }
      }
    }

    stage('Quality Gate') {
      steps {
        timeout(time: 1, unit: 'HOURS') {
          waitForQualityGate abortPipeline: true
        }
      }
    }

    stage('Docker Build & Push') {
      steps {
        withDockerRegistry([credentialsId: 'docker-hub', url: '']) {
          sh 'docker build -t sidharth67/numeric-app:${GIT_COMMIT} .'
          sh 'docker push sidharth67/numeric-app:${GIT_COMMIT}'
        }
      }
    }
  }
}
```

Commit and push this file to your Git repo to trigger a new build.

![The image shows a Jenkins pipeline dashboard with a stage view of various build processes, including stages like "Checkout SCM," "Build Artifact," and "Unit Tests." Some stages are marked as failed, indicated by red highlights, while others are successful, shown in green.](https://kodekloud.com/kk-media/image/upload/v1752873683/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-SonarQube-Quality-Gate/jenkins-pipeline-dashboard-build-processes.jpg)

> [!important]
> **Warning**
>
> If the quality gate fails, the pipeline will abort at the **Quality Gate** stage. Inspect and resolve all reported issues before retrying.

---

## 5\. Diagnose Quality Gate Failures

When the pipeline fails at the gate, open SonarQube to see detailed issues:

![The image shows a SonarQube dashboard with a "Failed" quality gate status due to 14 code smells, and metrics indicating no bugs, vulnerabilities, or security hotspots.](https://kodekloud.com/kk-media/image/upload/v1752873684/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-SonarQube-Quality-Gate/sonarqube-dashboard-failed-quality-gate-2.jpg)

Common findings include unused imports and code smells:

![The image shows a SonarQube interface displaying code issues related to unused imports in a Java file. The issues are categorized as "Code Smell" and are listed with details such as file path and line numbers.](https://kodekloud.com/kk-media/image/upload/v1752873685/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-SonarQube-Quality-Gate/sonarqube-code-smell-unused-imports.jpg)

Refactor or remove the offending lines, then commit and push again.

---

## 6\. Confirm Quality Gate Pass

After addressing issues, trigger a new build. A successful SonarQube analysis will pass the gate:

![The image shows a SonarQube dashboard with a "Passed" quality gate status, indicating no bugs, vulnerabilities, or security hotspots, and displaying metrics like code coverage and code smells.](https://kodekloud.com/kk-media/image/upload/v1752873686/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-SonarQube-Quality-Gate/sonarqube-dashboard-passed-quality-gate.jpg)

You can review any remaining non-blocking issues here:

![The image shows a SonarQube dashboard displaying code issues, specifically "code smells," with details such as severity, type, and suggested actions. The interface includes filters and a list of issues with descriptions and timestamps.](https://kodekloud.com/kk-media/image/upload/v1752873687/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-SonarQube-Quality-Gate/sonarqube-dashboard-code-issues-smells.jpg)

---

## References

- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [SonarQube Official Documentation](https://docs.sonarqube.org/)
- [SonarQube Scanner for Jenkins Plugin](https://plugins.jenkins.io/sonar/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/d49734b5-f6f9-4745-ba57-6ecc43f495ac)**
>
> Watch video content
