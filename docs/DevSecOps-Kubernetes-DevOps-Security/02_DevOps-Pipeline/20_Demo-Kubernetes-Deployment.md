# Demo Kubernetes Deployment - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevOps-Pipeline/Demo-Kubernetes-Deployment)

---

## Table of Contents

- Demo Kubernetes Deployment
  - Table of Contents
  - Jenkins Pipeline (Jenkinsfile)
  - Kubernetes Deployment & Service Manifest
  - Deploying the Node.js Service
  - Numeric Spring Boot Application
  - Verifying the Deployment
  - Links & References
  - Watch Video
  - Practice Lab

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevOps Pipeline

# Demo Kubernetes Deployment

In this tutorial, we’ll walk through a complete CI/CD workflow that builds a Spring Boot application, runs tests, publishes a Docker image, and deploys it to a Kubernetes cluster using a Jenkins Pipeline. Our Git repo contains a Kubernetes manifest (`k8s_deployment_service.yaml`) defining both a Deployment and a Service.

---

## Table of Contents

- [Jenkins Pipeline (Jenkinsfile)](#jenkins-pipeline-jenkinsfile)
- [Kubernetes Deployment & Service Manifest](#kubernetes-deployment--service-manifest)
- [Deploying the Node.js Service](#deploying-the-nodejs-service)
- [Numeric Spring Boot Application](#numeric-spring-boot-application)
- [Verifying the Deployment](#verifying-the-deployment)
- [Links & References](#links--references)

---

## Jenkins Pipeline (Jenkinsfile)

> [!important]
> **Note**
>
> This pipeline leverages Maven for build and test, Docker for image creation and pushing, and the Kubernetes CLI (`kubectl`) for deployment.

```
pipeline {
  agent any


  stages {
    stage('Build Artifact - Maven') {
      steps {
        sh 'mvn clean package -DskipTests=true'
        archiveArtifacts 'target/*.jar'
      }
    }


    stage('Unit Tests - JUnit & JaCoCo') {
      steps {
        sh 'mvn test'
      }
      post {
        always {
          junit 'target/surefire-reports/*.xml'
          jacoco execPattern: 'target/jacoco.exec'
        }
      }
    }


    stage('Docker Build & Push') {
      steps {
        withDockerRegistry([credentialsId: 'docker-hub', url: '']) {
          sh 'docker build -t siddharth67/numeric-app:${GIT_COMMIT} .'
          sh 'docker push siddharth67/numeric-app:${GIT_COMMIT}'
        }
      }
    }


    stage('Kubernetes Deployment - DEV') {
      steps {
        withKubeConfig([credentialsId: 'kubeconfig']) {
          sh 'sed -i "s#replace#siddharth67/numeric-app:${GIT_COMMIT}#g" k8s_deployment_service.yaml'
          sh 'kubectl apply -f k8s_deployment_service.yaml'
        }
      }
    }
  }
}
```

---

## Kubernetes Deployment & Service Manifest

The `k8s_deployment_service.yaml` file defines:

- A **Deployment** named `devsecops` with 2 replicas.
- A **Service** of type `NodePort` exposing port 8080.

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


---


apiVersion: v1
kind: Service
metadata:
  name: devsecops-svc
  labels:
    app: devsecops
spec:
  type: NodePort
  selector:
    app: devsecops
  ports:
    - port: 8080
      targetPort: 8080
      protocol: TCP
```

| Resource Type | Purpose                            | Example Command                                |
| ------------- | ---------------------------------- | ---------------------------------------------- |
| Deployment    | Manages replicated Pods            | `kubectl apply -f k8s_deployment_service.yaml` |
| Service       | Exposes Pods internally/externally | `kubectl expose ...`                           |

> [!important]
> **Warning**
>
> Ensure you replace the placeholder `replace` with your Docker image tag (`siddharth67/numeric-app:${GIT_COMMIT}`) before applying the manifest.

---

## Deploying the Node.js Service

We need a backend service that our Spring Boot app will call. Deploy a pre-built Node.js service (`siddharth67/node-service:v1`) in the `default` namespace:

```
# Create the Deployment
kubectl -n default create deployment node-app --image=siddharth67/node-service:v1


# Expose as ClusterIP on port 5000
kubectl -n default expose deployment node-app \
  --name=node-service \
  --port=5000 \
  --target-port=5000


# Verify
kubectl -n default get all
```

Expected output:

```
NAME                             READY   STATUS    RESTARTS   AGE
pod/node-app-6b8496465-tsrkf     1/1     Running   0          24s


NAME                    TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
service/node-service    ClusterIP   10.96.198.94    <none>        5000/TCP   4s
```

The Node.js service is now reachable at `http://node-service:5000`.

---

## Numeric Spring Boot Application

Update your controller to call the Kubernetes service instead of `localhost`. Example:

```
package com.devsecops;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


@RestController
public class NumericController {
    private final Logger logger = LoggerFactory.getLogger(NumericController.class);
    private static final String BASE_URL = "http://node-service:5000/plussone";


    private final RestTemplate restTemplate;


    public NumericController(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }


    @GetMapping("/")
    public String welcome() {
        return "Kubernetes DevSecOps";
    }


    @GetMapping("/increment/{value}")
    public String increment(@PathVariable int value) {
        ResponseEntity<String> response =
            restTemplate.getForEntity(BASE_URL + "/" + value, String.class);
        return response.getBody();
    }


    @GetMapping("/compare/{value}")
    public String compareToFifty(@PathVariable int value) {
        return (value < 50) ? "Less than 50" : "Greater than 50";
    }
}
```

Commit all changes to your `main` branch—Jenkins will automatically trigger the pipeline.

---

## Verifying the Deployment

After the pipeline completes, verify both applications:

```
kubectl -n default get all
```

Sample output:

```
NAME                                READY   STATUS    RESTARTS   AGE
pod/devsecops-xxxxx-xxxxx          1/1     Running   0          2m


NAME                    TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
service/devsecops-svc   NodePort    10.96.xxx.xxx   <none>        8080:31933/TCP   2m
service/node-service    ClusterIP   10.96.xxx.xxx   <none>        5000/TCP         5m
```

Access the Numeric application via NodePort:

- `http://<NODE_IP>:31933/` → `Kubernetes DevSecOps`
- `http://<NODE_IP>:31933/increment/77` → `78`
- `http://<NODE_IP>:31933/compare/44` → `Less than 50`
- `http://<NODE_IP>:31933/compare/95` → `Greater than 50`

Both services communicate seamlessly within the Kubernetes cluster.

---

## Links & References

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Docker Hub](https://hub.docker.com/)
- [Spring Boot Reference Guide](https://docs.spring.io/spring-boot/docs/current/reference/html/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/6942848d-9481-472e-a8ec-47357cf8ceaa/lesson/a0425702-2a0f-4cef-aa40-28dfa0a1d13f)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/6942848d-9481-472e-a8ec-47357cf8ceaa/lesson/391995ae-bfe7-4b8d-845d-a46becf963fc)**
>
> Practice lab
