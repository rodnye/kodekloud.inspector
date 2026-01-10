# Demo Trivy Image Scan Docker 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevSecOps-Pipeline/Demo-Trivy-Image-Scan-Docker-2)

---

## Table of Contents

- Demo Trivy Image Scan Docker 2
  - Prerequisites
  - 1. Scan the Current Base Image
  - 2. Compare Alternative Base Images
  - 3. Detailed Scan Examples
  - 4. Update the Dockerfile
  - 5. Jenkins Pipeline Configuration
  - 6. Build & Scan Logs
  - Next Steps
  - Watch Video
  - Practice Lab
    - 2.1 Summary of Scan Results
    - 3.1 openjdk (latest)
    - 3.2 openjdk:8
    - 3.3 openjdk:8-alpine
    - 3.4 adoptopenjdk/openjdk8:alpine-slim

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevSecOps Pipeline

# Demo Trivy Image Scan Docker 2

In this guide, we use [Trivy](https://github.com/aquasecurity/trivy) to scan Docker base images for vulnerabilities and select the most secure option for a Spring Boot application. We’ll compare five candidates, update the Dockerfile, adjust our Jenkins Pipeline, and verify the build.

## Prerequisites

- Docker installed locally
- Trivy image cache volume (`$WORKSPACE` mapped to `/root/.cache/`)
- A Spring Boot JAR artifact in `target/*.jar`

---

## 1\. Scan the Current Base Image

First, scan `myorg/numeric-app:latest`:

```
docker run --rm \
  -v $WORKSPACE:/root/.cache/ \
  aquasec/trivy:0.17.2 \
  -q image \
  --exit-code 1 \
  --severity CRITICAL \
  --light myorg/numeric-app:latest
# CRITICAL: 4, HIGH: 32
```

This reveals 4 critical and 32 high vulnerabilities—unsuitable for production.

---

## 2\. Compare Alternative Base Images

We’ll evaluate these images:

1.  `openjdk` (latest)
2.  `openjdk:8`
3.  `openjdk:8-alpine`
4.  `adoptopenjdk/openjdk8:alpine-slim`

Use this scan command template:

```
docker run --rm \
  -v $WORKSPACE:/root/.cache/ \
  aquasec/trivy:0.17.2 \
  -q image \
  --exit-code 1 \
  --severity CRITICAL \
  --light $IMAGE
```

### 2.1 Summary of Scan Results

| Base Image                        | CRITICAL | HIGH | MEDIUM | LOW | UNKNOWN | Total | Verdict          |
| --------------------------------- | -------- | ---- | ------ | --- | ------- | ----- | ---------------- |
| myorg/numeric-app:latest          | 4        | 32   | –      | –   | –       | 36    | Discard          |
| openjdk                           | 0        | 0    | 0      | 0   | 0       | 0     | Caution (latest) |
| openjdk:8                         | 9        | 26   | 17     | 151 | 5       | 208   | Discard          |
| openjdk:8-alpine                  | –        | –    | –      | –   | –       | 274   | Discard          |
| adoptopenjdk/openjdk8:alpine-slim | 0        | 0    | 0      | 0   | 0       | 0     | Selected (fixed) |

> [!important]
> **Warning**
>
> Using the `latest` tag can introduce unexpected changes. Always pin to a specific version for production.

---

## 3\. Detailed Scan Examples

### 3.1 openjdk (latest)

```
docker run --rm \
  -v $WORKSPACE:/root/.cache/ \
  aquasec/trivy:0.17.2 \
  -q image \
  --exit-code 1 \
  --severity CRITICAL \
  --light openjdk
```

Result:

```
Total: 0 (CRITICAL: 0)
```

### 3.2 openjdk:8

```
docker run --rm \
  -v $WORKSPACE:/root/.cache/ \
  aquasec/trivy:0.17.2 \
  -q image \
  --light openjdk:8
```

Result:

```
Total: 208 (UNKNOWN: 5, LOW: 151, MEDIUM: 17, HIGH: 26, CRITICAL: 9)
```

### 3.3 openjdk:8-alpine

```
docker run --rm \
  -v $WORKSPACE:/root/.cache/ \
  aquasec/trivy:0.17.2 \
  -q image \
  --light openjdk:8-alpine
```

Result:

```
Total: 274 vulnerabilities
```

### 3.4 adoptopenjdk/openjdk8:alpine-slim

```
docker run --rm \
  -v $WORKSPACE:/root/.cache/ \
  aquasec/trivy:0.17.2 \
  -q image \
  --exit-code 1 \
  --light adoptopenjdk/openjdk8:alpine-slim
```

Result:

```
Total: 0 (UNKNOWN: 0, LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0)
```

> We choose `adoptopenjdk/openjdk8:alpine-slim` for its zero vulnerabilities and fixed version on Alpine Slim.

---

## 4\. Update the Dockerfile

Switch the base image:

```
FROM adoptopenjdk/openjdk8:alpine-slim
EXPOSE 8080

ARG JAR_FILE=target/*.jar
ADD ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
```

Commit and push these changes. The next Jenkins run will pick up the new base image.

---

## 5\. Jenkins Pipeline Configuration

In your `Jenkinsfile`, ensure you have Trivy and Docker build stages:

```
pipeline {
  agent any
  stages {
    stage('Vulnerability Scan - Docker') {
      parallel {
        stage('Dependency Scan') {
          steps {
            sh 'mvn dependency-check:check'
          }
        }
        stage('Trivy Scan') {
          steps {
            sh 'bash trivy-docker-image-scan.sh'
          }
        }
      }
    }
    stage('Docker Build and Push') {
      steps {
        withDockerRegistry(credentialsId: 'docker-hub', url: '') {
          sh 'printenv'
          sh 'sudo docker build -t myorg/numeric-app:"$GIT_COMMIT" .'
          sh 'docker push myorg/numeric-app:"$GIT_COMMIT"'
        }
      }
    }
  }
}
```

> [!important]
> **Note**
>
> Using `sudo` resolves permission issues on the Trivy cache directory. Alternatively, add the Trivy cache folder to `.dockerignore`.

---

## 6\. Build & Scan Logs

```
> sudo docker build -t myorg/numeric-app:"$GIT_COMMIT" .
Sending build context to Docker daemon  19.84kB
Step 1/5 : FROM adoptopenjdk/openjdk8:alpine-slim
...
Successfully built 213b62066198
Successfully tagged myorg/numeric-app:"$GIT_COMMIT"
```

Trivy in the pipeline reports:

```
adoptopenjdk/openjdk8:alpine-slim (alpine 3.13.5)
Total: 0 (CRITICAL: 0)
Exit Code: 0

Image scanning completed. No CRITICAL vulnerabilities found
```

---

## Next Steps

In subsequent lessons, we’ll integrate [OPA Conftest](https://github.com/open-policy-agent/conftest) to enforce Dockerfile best practices and compliance policies.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/694c51c2-4887-4bc3-9a5c-051cf2883ed0)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/fe16c95a-55eb-4163-8789-5c6c4f012f36)**
>
> Practice lab
