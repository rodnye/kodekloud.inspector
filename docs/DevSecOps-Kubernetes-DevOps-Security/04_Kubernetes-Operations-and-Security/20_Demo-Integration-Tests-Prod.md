# Demo Integration Tests Prod - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/Kubernetes-Operations-and-Security/Demo-Integration-Tests-Prod)

---

## Table of Contents

- Demo Integration Tests Prod
  - Overview
  - Jenkins Pipeline Changes
  - Testing via Istio Ingress Gateway
  - integration-test-PROD.sh
  - Complete Jenkins Pipeline Snippet
  - Demo Run
  - Links & References
  - Watch Video

---

## Content

DevSecOps - Kubernetes DevOps & Security

Kubernetes Operations and Security

# Demo Integration Tests Prod

In this guide, we’ll walk through adding a lightweight integration testing stage to your Jenkins pipeline after deploying an application to the production namespace. This approach ensures your production release undergoes quick sanity checks before serving real traffic.

## Overview

Post-deployment testing often includes functional, smoke, black-box, and performance tests. Common tools include [JMeter](https://jmeter.apache.org/) for load testing. Here, we’ll implement a simple **Integration Tests – PROD** stage in Jenkins that mirrors our dev workflow.

| Test Type   | Purpose                              | Example Tool                         |
| ----------- | ------------------------------------ | ------------------------------------ |
| Smoke       | Basic health and response validation | `curl`, Postman                      |
| Functional  | Business logic verification          | Custom scripts                       |
| Black-box   | External interface testing           | `curl`, Selenium                     |
| Performance | Throughput and latency measurement   | [JMeter](https://jmeter.apache.org/) |

> [!important]
> **Note**
>
> This integration step is a quick sanity check. For full end-to-end or load tests, consider extending with specialized tools or scripts.

## Jenkins Pipeline Changes

We insert a new **Integration Tests – PROD** stage immediately after the `K8S_Deployment - PROD` stage. If any test fails, the deployment rolls back to the previous version automatically.

```
stage('Integration Tests - PROD') {
    steps {
        script {
            try {
                withKubeConfig([credentialsId: 'kubeconfig']) {
                    sh "bash integration-test-PROD.sh"
                }
            } catch (e) {
                withKubeConfig([credentialsId: 'kubeconfig']) {
                    sh "kubectl -n prod rollout undo deploy ${deploymentName}"
                }
                error("Integration tests failed; rolled back deployment.")
            }
        }
    }
}
```

## Testing via Istio Ingress Gateway

In production, services typically use a **ClusterIP**. To access your app behind [Istio](https://istio.io/latest/docs/concepts/traffic-management/#gateways), retrieve the NodePort assigned to port 80 on the Istio Ingress Gateway:

```
kubectl -n istio-system get svc istio-ingressgateway -o json \
  | jq '.spec.ports[] | select(.port == 80) | .nodePort'
```

> [!important]
> **Warning**
>
> If the Ingress Gateway service does not expose port 80 as a NodePort, your tests will fail. Ensure your Gateway configuration allows external access.

## integration-test-PROD.sh

Below is the shell script executed in the **Integration Tests – PROD** stage. It:

1.  Waits briefly for the deployment to settle.
2.  Retrieves the Istio NodePort for port 80.
3.  Constructs the application URL.
4.  Checks a simple increment endpoint and HTTP status code.

```
#!/bin/bash
set -euo pipefail
sleep 5s

# Retrieve the Istio Ingress Gateway NodePort for port 80
PORT=$(kubectl -n istio-system get svc istio-ingressgateway -o json \
  | jq '.spec.ports[] | select(.port == 80) | .nodePort')

if [[ -z "$PORT" ]]; then
  echo "Error: Istio Ingress Gateway port 80 is not exposed as a NodePort."
  exit 1
fi

applicationURL="http://devsecops-demo.eastus.cloudapp.azure.com"
applicationURI="/increment/99"

echo "Using port: $PORT"
echo "Calling: $applicationURL:$PORT$applicationURI"

# Perform the increment test
response=$(curl -s "$applicationURL:$PORT$applicationURI")
http_code=$(curl -s -o /dev/null -w "%{http_code}" "$applicationURL:$PORT$applicationURI")

if [[ "$response" == "100" ]]; then
  echo "Increment Test Passed"
else
  echo "Increment Test Failed: expected '100', got '$response'"
  exit 1
fi

# Validate HTTP status code
if [[ "$http_code" == "200" ]]; then
  echo "HTTP Status Code Test Passed"
else
  echo "HTTP Status Code Test Failed: $http_code"
  exit 1
fi
```

## Complete Jenkins Pipeline Snippet

Here’s the full context showing how both the **K8S_Deployment - PROD** and **Integration Tests - PROD** stages integrate into your Jenkinsfile:

```
pipeline {
  agent any
  stages {
    stage('K8S_Deployment - PROD') {
      steps {
        parallel(
          "Apply Deployment": {
            withKubeConfig([credentialsId: 'kubeconfig']) {
              sh """
                sed -i 's#\\\${imageName}#${imageName}#g' k8s_PROD-deployment_service.yaml
                kubectl -n prod apply -f k8s_PROD-deployment_service.yaml
              """
            }
          },
          "Rollout Status": {
            withKubeConfig([credentialsId: 'kubeconfig']) {
              sh "bash k8s-PROD-deployment-rollout-status.sh"
            }
          }
        )
      }
    }

    stage('Integration Tests - PROD') {
      steps {
        script {
          try {
            withKubeConfig([credentialsId: 'kubeconfig']) {
              sh "bash integration-test-PROD.sh"
            }
          } catch (e) {
            withKubeConfig([credentialsId: 'kubeconfig']) {
              sh "kubectl -n prod rollout undo deploy ${deploymentName}"
            }
            error("Rolled back due to integration test failure.")
          }
        }
      }
    }
  }

  post {
    always {
      junit 'target/surefire-reports/*.xml'
      jacoco execPattern: 'target/jacoco.exec'
      pitmutation mutationStatsFile: '**/target/pit-reports/**/*mutations.xml'
      dependencyCheckPublisher pattern: 'target/dependency-check-report.xml'
      publishHTML(
        allowMissing: false,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'owasp-zap-report',
        reportFiles: ''
      )
    }
  }
}
```

## Demo Run

Once pushed, the pipeline runs the integration script:

```
$ bash integration-test-PROD.sh
32564
http://devsecops-demo.eastus.cloudapp.azure.com:32564/increment/99
Increment Test Passed
HTTP Status Code Test Passed
```

With this setup, you have a streamlined integration test step for your production deployments. To expand your testing strategy, integrate [JMeter](https://jmeter.apache.org/) for performance or other specialized tools.

## Links & References

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Istio Gateway Concepts](https://istio.io/latest/docs/concepts/traffic-management/#gateways)
- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/fc1733bc-1e9c-4e38-ae86-84e6bd9af04d/lesson/28109bc8-356d-467a-bc46-3b072d3cfca3)**
>
> Watch video content
