# Demo Jenkins Pipeline Checking Versions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevOps-Pipeline/Demo-Jenkins-Pipeline-Checking-Versions)

---

## Table of Contents

- Demo Jenkins Pipeline Checking Versions
  - Table of Contents
  - Prerequisites
  - Create the Pipeline
  - Inspect the Build Results
  - Configure Kubernetes CLI Plugin
  - Add the Kubeconfig Credential
  - Update Pipeline with Kubeconfig
  - Verify Success
  - References & Links
  - Watch Video
  - Practice Lab

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevOps Pipeline

# Demo Jenkins Pipeline Checking Versions

In this guide, you’ll create a Jenkins Pipeline named **checking-versions** to verify that Jenkins can execute Git, Maven, Docker, and Kubernetes commands. This helps catch any environment issues before running your CI/CD workflows.

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [Create the Pipeline](#create-the-pipeline)
3.  [Inspect the Build Results](#inspect-the-build-results)
4.  [Configure Kubernetes CLI Plugin](#configure-kubernetes-cli-plugin)
5.  [Add the Kubeconfig Credential](#add-the-kubeconfig-credential)
6.  [Update Pipeline with Kubeconfig](#update-pipeline-with-kubeconfig)
7.  [Verify Success](#verify-success)
8.  [References & Links](#references--links)

## Prerequisites

- Jenkins (v2.x or later) with [Pipeline](https://www.jenkins.io/doc/book/pipeline/) plugin
- Agents that have Git, Maven, Docker, and `kubectl` installed
- Admin access to Jenkins for managing credentials

## Create the Pipeline

1.  In Jenkins, click **New Item**.
2.  Enter **checking-versions** as the name.
3.  Select **Pipeline** and click **OK**.

![The image shows a Jenkins interface where a user is creating a new item named "checking-version." Various project options like Freestyle project, Pipeline, and Multibranch Pipeline are listed.](https://kodekloud.com/kk-media/image/upload/v1752873580/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Jenkins-Pipeline-Checking-Versions/jenkins-interface-creating-checking-version.jpg)

Scroll to the **Pipeline** section and replace the script with:

```
pipeline {
    agent any
    stages {
        stage('Git Version') {
            steps {
                sh 'git --version'
            }
        }
        stage('Maven Version') {
            steps {
                sh 'mvn -v'
            }
        }
        stage('Docker Version') {
            steps {
                sh 'docker -v'
            }
        }
        stage('Kubernetes Version') {
            steps {
                sh 'kubectl version --short'
            }
        }
    }
}
```

Save and click **Build Now**.

## Inspect the Build Results

Once the job runs, the Pipeline view will display four stages. The first three should pass, but the Kubernetes stage may fail due to missing cluster credentials:

![The image shows a Jenkins dashboard displaying a pipeline named "checking-versions" with a stage view of different version checks, including Git, Maven, Docker, and Kubernetes. The sidebar includes options like "Build Now" and "Configure," and there's a build history section at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752873581/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Jenkins-Pipeline-Checking-Versions/jenkins-dashboard-checking-versions-pipeline.jpg)

Open the console output:

```
[Pipeline] stage
[Pipeline] { (Git Version)
[Pipeline] sh
+ git --version
git version 2.17.1
[Pipeline] }
...
[Pipeline] stage
[Pipeline] { (Kubernetes Version)
+ kubectl version --short
Client Version: v1.21.0
Error from server (Forbidden): <html>…authentication required…
```

> [!important]
> **Note**
>
> The Kubernetes CLI ran locally but failed to authenticate with the API server.

## Configure Kubernetes CLI Plugin

To inject a `kubeconfig` into your build, install and use the [Kubernetes CLI Plugin](https://plugins.jenkins.io/kubernetes-cli/).

![The image shows a webpage from the Jenkins documentation, specifically about the Kubernetes CLI Jenkins plugin, detailing supported credentials and usage parameters. There is also a browser window with multiple tabs open at the top.](https://kodekloud.com/kk-media/image/upload/v1752873583/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Jenkins-Pipeline-Checking-Versions/jenkins-kubernetes-cli-plugin-documentation.jpg)

**Scripted Pipeline example:**

```
node {
  stage('List Pods') {
    withKubeConfig([credentialsId: 'user1', serverUrl: 'https://api.k8s.my-company.com']) {
      sh 'kubectl get pods'
    }
  }
}
```

## Add the Kubeconfig Credential

1.  Go to **Manage Jenkins** → **Manage Credentials**.
2.  Under **Global**, click **Add Credentials**.
3.  For **Kind**, select **Secret file** and upload your local `kubeconfig`.
4.  Set **ID** to `kubeconfig`, add a description, then **OK**.

![The image shows a Jenkins interface for adding new credentials, with options to choose a secret file, set the scope, and provide an ID and description. A person is visible in a small video call window at the top right corner.](https://kodekloud.com/kk-media/image/upload/v1752873583/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Jenkins-Pipeline-Checking-Versions/jenkins-add-credentials-interface.jpg)

Confirm the credential appears in the list:

![The image shows a Jenkins interface displaying global credentials, specifically a kubeconfig file listed as a secret file. The browser tabs and address bar are visible at the top.](https://kodekloud.com/kk-media/image/upload/v1752873584/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Jenkins-Pipeline-Checking-Versions/jenkins-global-credentials-kubeconfig.jpg)

## Update Pipeline with Kubeconfig

Edit the **checking-versions** Pipeline script. Wrap the Kubernetes stage with `withKubeConfig`:

```
pipeline {
    agent any
    stages {
        stage('Git Version') {
            steps { sh 'git --version' }
        }
        stage('Maven Version') {
            steps { sh 'mvn -v' }
        }
        stage('Docker Version') {
            steps { sh 'docker -v' }
        }
        stage('Kubernetes Version') {
            steps {
                withKubeConfig([credentialsId: 'kubeconfig']) {
                    sh 'kubectl version --short'
                }
            }
        }
    }
}
```

Save and **Build Now** again.

## Verify Success

Now all four stages—including both Kubernetes client and server checks—should pass:

```
+ kubectl version --short
Client Version: v1.21.0
Server Version: v1.21.0
```

> [!important]
> **Warning**
>
> For production, avoid using a cluster-admin `kubeconfig`. Instead, create a ServiceAccount with minimal RBAC permissions for Jenkins.

---

## References & Links

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Pipeline Syntax Reference](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Kubernetes CLI Plugin](https://plugins.jenkins.io/kubernetes-cli/)
- [Kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/6942848d-9481-472e-a8ec-47357cf8ceaa/lesson/49b8a45e-715a-472b-9b32-a37c24677d6c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/6942848d-9481-472e-a8ec-47357cf8ceaa/lesson/28e2007d-981d-413c-934c-79dec526c8eb)**
>
> Practice lab
