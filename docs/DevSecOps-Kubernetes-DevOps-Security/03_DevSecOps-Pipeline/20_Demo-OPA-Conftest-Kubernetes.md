# Demo OPA Conftest Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevSecOps-Pipeline/Demo-OPA-Conftest-Kubernetes)

---

## Table of Contents

- Demo OPA Conftest Kubernetes
  - Prerequisites
  - Jenkins Pipeline Stages
  - Defining the OPA Policy
  - Running Conftest
  - Fixing Policy Violations
  - Verifying Deployment
  - Links and References
  - Watch Video
    - 1. Enforce runAsNonRoot
    - 2. Specify Numeric User (Optional)

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevSecOps Pipeline

# Demo OPA Conftest Kubernetes

In this hands-on tutorial, you’ll integrate OPA Conftest into a Jenkins pipeline to enforce custom policy-as-code for Kubernetes Deployments and Services. Scanning your manifests before they reach the cluster helps prevent misconfigurations and potential security vulnerabilities.

![The image is a presentation slide titled "HANDS ON" about Kubernetes vulnerabilities, mentioning OPA Conftest, Kubesc, and Trivy. It includes a meme of a boy excitedly looking at a computer with the text "I CAN'T BELIEVE IT IT'S DEMO TIME."](https://kodekloud.com/kk-media/image/upload/v1752873634/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Demo-OPA-Conftest-Kubernetes/hands-on-kubernetes-vulnerabilities-demo-meme.jpg)

## Prerequisites

- Jenkins server with [Docker](https://docs.docker.com/) installed
- Kubernetes cluster and `kubectl` configured
- OPA Conftest CLI available locally or via Docker

> [!important]
> **Note**
>
> Ensure your `kubeconfig` credentials are stored in Jenkins (e.g., under `credentialsId: 'kubeconfig'`) before starting.

## Jenkins Pipeline Stages

Add a vulnerability scan stage between the Docker build and Kubernetes deployment:

```
pipeline {
  agent any
  stages {
    stage('Docker Build and Push') {
      steps {
        withDockerRegistry([credentialsId: 'docker-hub', url: '']) {
          sh 'sudo docker build -t siddharth67/numeric-app:${GIT_COMMIT} .'
          sh 'docker push siddharth67/numeric-app:${GIT_COMMIT}'
        }
      }
    }


    stage('Vulnerability Scan - Kubernetes') {
      steps {
        sh '''\
          docker run --rm \
            -v $(pwd):/project \
            openpolicyagent/conftest test \
            --policy opa-k8s-security.rego \
            k8s_deployment_service.yaml
        '''
      }
    }


    stage('Kubernetes Deployment - DEV') {
      steps {
        withKubeConfig([credentialsId: 'kubeconfig']) {
          sh 'sed -i "s|replace|siddharth67/numeric-app:${GIT_COMMIT}|" k8s_deployment_service.yaml'
          sh 'kubectl apply -f k8s_deployment_service.yaml'
        }
      }
    }
  }
}
```

## Defining the OPA Policy

Create `opa-k8s-security.rego` at the root of your project:

```
package main


deny[msg] {
  input.kind == "Service"
  not input.spec.type == "NodePort"
  msg = "Service type should be NodePort"
}


deny[msg] {
  input.kind == "Deployment"
  not input.spec.template.spec.containers[0].securityContext.runAsNonRoot
  msg = "Containers must not run as root - set runAsNonRoot: true"
}
```

| Resource Kind | Rule Description                                  |
| ------------- | ------------------------------------------------- |
| Service       | `spec.type` must be `NodePort`                    |
| Deployment    | Containers require `securityContext.runAsNonRoot` |

## Running Conftest

From your project directory, run:

```
docker run --rm \
  -v $(pwd):/project \
  openpolicyagent/conftest test \
  --policy opa-k8s-security.rego \
  k8s_deployment_service.yaml
```

> [!important]
> **Warning**
>
> If any policy is violated, Conftest exits with a non-zero code and prints the error. Your Jenkins pipeline will fail until you address the violation.

Example failure output:

```
FAIL: k8s_deployment_service.yaml - main - Containers must not run as root - set runAsNonRoot: true
script returned exit code 1
```

## Fixing Policy Violations

### 1\. Enforce `runAsNonRoot`

Update your Deployment spec to include a `securityContext`:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: devsecops
  labels:
    app: devsecops
spec:
  replicas: 2
  selector:
    matchLabels:
      app: devsecops
  template:
    metadata:
      labels:
        app: devsecops
    spec:
      containers:
      - name: devsecops-container
        image: replace
        securityContext:
          runAsNonRoot: true
---
apiVersion: v1
kind: Service
metadata:
  name: devsecops
  labels:
    app: devsecops
spec:
  type: NodePort
  ports:
  - port: 8080
    targetPort: 8080
    protocol: TCP
  selector:
    app: devsecops
```

Re-run the Conftest command to confirm that all tests pass.

### 2\. Specify Numeric User (Optional)

If you encounter a `CreateContainerConfigError` due to a non-numeric user, add `runAsUser`:

```
securityContext:
  runAsNonRoot: true
  runAsUser: 100
```

Commit, push, and trigger a new build.

## Verifying Deployment

After a successful pipeline run, validate your resources:

```
kubectl get all
```

You should see the Deployment and Service running without errors.

## Links and References

- [OPA Conftest GitHub](https://github.com/open-policy-agent/conftest)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Jenkins Documentation](https://www.jenkins.io/doc/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/bc7024d0-ecc8-4b49-b688-7f5f5fcaa67f)**
>
> Watch video content
