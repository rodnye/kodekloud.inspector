# Demo Trivy Image Scan Docker 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevSecOps-Pipeline/Demo-Trivy-Image-Scan-Docker-1)

---

## Table of Contents

- Demo Trivy Image Scan Docker 1
  - Installation
  - Trivy Scanning Targets & Modes
  - Quick Scan with Trivy Docker Image
  - Filtering by Severity
  - Using Custom Exit Codes
  - Integrating Trivy in a Jenkins Pipeline
  - Creating the Trivy Scan Script
  - Verifying in Jenkins
  - Links and References
  - Watch Video
    - RPM-based Systems
    - Debian-based Systems
    - Docker Image

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevSecOps Pipeline

# Demo Trivy Image Scan Docker 1

In this tutorial, we'll use **Trivy**—the open-source vulnerability scanner from Aqua Security—to analyze a base image defined in your `Dockerfile`. Trivy can operate in **standalone** or **client-server** mode and supports three artifact types:

- Container images
- File systems
- Git repositories

Throughout this guide, we’ll focus on scanning **container images** with Trivy’s Docker image.

> [!important]
> **Note**
>
> Refer to the official [Trivy Documentation](https://aquasecurity.github.io/trivy/) for detailed information on supported targets and scanning modes.

![The image shows a webpage for Trivy, a vulnerability scanner for containers and other artifacts, with a menu on the left and an abstract section describing its features. There is also a diagram illustrating different targets, artifacts, and modes.](https://kodekloud.com/kk-media/image/upload/v1752873706/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Trivy-Image-Scan-Docker-1/trivy-vulnerability-scanner-webpage-diagram.jpg)

---

## Installation

You can install Trivy as a native binary or pull the official Docker image.

### RPM-based Systems

```
sudo tee /etc/yum.repos.d/trivy.repo <<EOF
[trivy]
name=Trivy repository
baseurl=https://aquasecurity.github.io/trivy-repo/rpm/releases/$releasever/$basearch/
gpgcheck=0
enabled=1
EOF


sudo yum -y update
sudo yum -y install trivy
```

### Debian-based Systems

```
sudo apt-get update
sudo apt-get install -y wget apt-transport-https gnupg lsb-release
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo "deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" \
  | sudo tee /etc/apt/sources.list.d/trivy.list
sudo apt-get update
sudo apt-get install -y trivy
```

### Docker Image

```
docker pull aquasec/trivy:0.18.3
```

---

## Trivy Scanning Targets & Modes

| Artifact Type   | Description                         | Example Command                                    |
| --------------- | ----------------------------------- | -------------------------------------------------- |
| Container Image | Docker or OCI images                | `trivy image python:3.4-alpine`                    |
| File System     | Local directory scan                | `trivy fs /path/to/project`                        |
| Git Repository  | Remote or local Git repository scan | `trivy repo https://github.com/aquasecurity/trivy` |

| Mode          | Description                                   |
| ------------- | --------------------------------------------- |
| Standalone    | Local DB, no server required                  |
| Client-server | Centralized vulnerability database (gRPC API) |

---

## Quick Scan with Trivy Docker Image

Scan the `python:3.4-alpine` image and cache the vulnerability database locally:

```
docker run --rm \
  -v $HOME/Library/Caches:/root/.cache/ \
  aquasec/trivy:0.18.3 \
  python:3.4-alpine
```

Sample output:

```
2021-06-18T15:04:39.306Z    INFO  Detected OS: alpine
2021-06-18T15:04:39.306Z    INFO  Detecting Alpine vulnerabilities...
2021-06-18T15:04:39.306Z    WARN  This OS version is no longer supported: alpine 3.9.2


Total: 37 (UNKNOWN: 0, LOW: 4, MEDIUM: 16, HIGH: 13, CRITICAL: 4)
...
```

> [!important]
> **Note**
>
> Mounting a cache directory speeds up repeated scans by storing the vulnerability database locally.

---

## Filtering by Severity

To report only **CRITICAL** vulnerabilities:

```
docker run --rm \
  -v $HOME/Library/Caches:/root/.cache/ \
  aquasec/trivy:0.18.3 \
  --severity CRITICAL \
  python:3.4-alpine
```

Sample output:

```
Total: 4 (CRITICAL: 4)
...
```

> [!important]
> **Warning**
>
> By default, Trivy exits with code `0` even if vulnerabilities are found. Use `--exit-code` to enforce build failures in CI/CD.

---

## Using Custom Exit Codes

Fail CI pipelines on CRITICAL issues:

```
docker run --rm \
  -v $HOME/Library/Caches:/root/.cache/ \
  aquasec/trivy:0.18.3 \
  --severity CRITICAL \
  --exit-code 1 \
  python:3.4-alpine


echo $?  # Returns 1 if any CRITICAL vulnerabilities are detected
```

Ignore LOW severity issues while still failing on HIGH+:

```
docker run --rm \
  -v $HOME/Library/Caches:/root/.cache/ \
  aquasec/trivy:0.18.3 \
  --severity LOW \
  --exit-code 0 \
  python:3.4-alpine


echo $?  # Always returns 0, even if LOW or MEDIUM are found
```

---

## Integrating Trivy in a Jenkins Pipeline

Scan the base image before building and pushing Docker artifacts. Below is a sample **declarative Jenkinsfile**:

```
pipeline {
  agent any


  stages {
    stage('SonarQube - SAST') {
      steps {
        withSonarQubeEnv('SonarQube') {
          sh "mvn sonar:sonar \
             -Dsonar.projectKey=numeric-application \
             -Dsonar.host.url=http://devsecops-demo.eastus.cloudapp.azure.com:9000"
        }
      }
      post {
        always {
          timeout(time: 2, unit: 'MINUTES') {
            script { waitForQualityGate abortPipeline: true }
          }
        }
      }
    }


    stage('Vulnerability Scan - Docker') {
      steps {
        parallel(
          'Dependency Scan': {
            sh "mvn dependency-check:check"
          },
          'Trivy Scan': {
            sh "bash trivy-docker-image-scan.sh"
          }
        )
      }
    }


    stage('Docker Build and Push') {
      steps {
        withDockerRegistry([credentialsId: 'docker-hub', url: '']) {
          sh 'docker build -t siddharth67/numeric-app:$GIT_COMMIT .'
          sh 'docker push siddharth67/numeric-app:$GIT_COMMIT'
        }
      }
    }


    stage('Kubernetes Deployment - DEV') {
      steps {
        // Add deployment steps here
      }
    }
  }
}
```

---

## Creating the Trivy Scan Script

Add a file named `trivy-docker-image-scan.sh` at the repository root:

```
#!/bin/bash


# Extract base image from the first line of Dockerfile
dockerImageName=$(awk 'NR==1 {print $2}' Dockerfile)
echo "Scanning image: $dockerImageName"


# Scan HIGH severity (no failure)
docker run --rm -v $WORKSPACE:/root/.cache/ \
  aquasec/trivy:0.17.2 -q image \
  --exit-code 0 --severity HIGH --light \
  $dockerImageName


# Scan CRITICAL severity (fail on detection)
docker run --rm -v $WORKSPACE:/root/.cache/ \
  aquasec/trivy:0.17.2 -q image \
  --exit-code 1 --severity CRITICAL --light \
  $dockerImageName


exit_code=$?
echo "Exit code: $exit_code"


if [ $exit_code -eq 1 ]; then
  echo "Image scanning failed. CRITICAL vulnerabilities found."
  exit 1
else
  echo "Image scanning passed. No CRITICAL vulnerabilities found."
  exit 0
fi
```

Make the script executable:

```
chmod +x trivy-docker-image-scan.sh
```

---

## Verifying in Jenkins

Commit and push your changes. Trigger a Jenkins build to see two parallel steps under the **Vulnerability Scan – Docker** stage:

![The image shows a GitHub Desktop interface with no local changes and options to push commits, open the repository in an editor, view files in Explorer, or open the repository on GitHub. A profile picture is visible in the top right corner.](https://kodekloud.com/kk-media/image/upload/v1752873707/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Trivy-Image-Scan-Docker-1/github-desktop-interface-no-changes.jpg)

![The image shows a Jenkins dashboard with a list of projects, including "checking-versions" and "devsecops-numeric-application," displaying their last success, last failure, and duration. The interface includes navigation options on the left and a user profile icon on the top right.](https://kodekloud.com/kk-media/image/upload/v1752873708/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Trivy-Image-Scan-Docker-1/jenkins-dashboard-projects-list.jpg)

![The image shows a Jenkins pipeline dashboard with a stage view of a build process, including stages like SCM checkout, Maven build, unit tests, and vulnerability scans. It also features graphs for coverage and dependency-check trends.](https://kodekloud.com/kk-media/image/upload/v1752873710/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Trivy-Image-Scan-Docker-1/jenkins-pipeline-dashboard-build-process.jpg)

![The image shows a Jenkins dashboard displaying a list of pipeline builds for a project named "devsecops-numeric-application," with their statuses, run numbers, commit messages, durations, and completion times.](https://kodekloud.com/kk-media/image/upload/v1752873711/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Trivy-Image-Scan-Docker-1/jenkins-dashboard-devsecops-pipeline-builds.jpg)

![The image shows a Jenkins dashboard with a pipeline stage view, including build history and error logs. It displays various stages of a build process, some of which have failed, indicated by red highlights.](https://kodekloud.com/kk-media/image/upload/v1752873712/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-Trivy-Image-Scan-Docker-1/jenkins-dashboard-pipeline-stage-view.jpg)

---

## Links and References

- [Trivy Documentation](https://aquasecurity.github.io/trivy/)
- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/6f377ac0-6ca9-405a-8296-6bb893fda2ac)**
>
> Watch video content
