# Demo Kubesec - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevSecOps-Pipeline/Demo-Kubesec)

---

## Table of Contents

- Demo Kubesec
  - Table of Contents
  - Sample Pod Specification
  - Scanning with Kubesec
  - Bash Wrapper for HTTP API
  - Jenkins Pipeline Integration
  - Improving Your Security Score
  - References
  - Watch Video
    - 1. CLI
    - kubesec-scan.sh

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevSecOps Pipeline

# Demo Kubesec

In this lesson, we’ll walk through scanning Kubernetes resource definitions using [Kubesec](https://kubesec.io/). Kubesec helps you enforce cluster security best practices with a simple CLI, Docker image, or HTTP API.

## Table of Contents

1.  [Sample Pod Specification](#sample-pod-specification)
2.  [Scanning with Kubesec](#scanning-with-kubesec)
    - CLI
    - Docker Image
    - HTTP API
3.  [Bash Wrapper for HTTP API](#bash-wrapper-for-http-api)
4.  [Jenkins Pipeline Integration](#jenkins-pipeline-integration)
5.  [Improving Your Security Score](#improving-your-security-score)
6.  [References](#references)

---

## Sample Pod Specification

Here’s a minimal Pod manifest that enables a read-only root filesystem:

```
apiVersion: v1
kind: Pod
metadata:
  name: kubesec-demo
spec:
  containers:
    - name: kubesec-demo
      image: gcr.io/google-samples/node-hello:1.0
      securityContext:
        readOnlyRootFilesystem: true
```

---

## Scanning with Kubesec

You can scan your YAML definitions in three ways:

| Method       | Command Example                                                        |
| ------------ | ---------------------------------------------------------------------- |
| CLI          | `kubesec scan pod.yaml`                                                |
| Docker image | `docker run --rm -i kubesec/kubesec:latest scan /dev/stdin < pod.yaml` |
| HTTP API     | `curl -sSX POST --data-binary @"pod.yaml" https://v2.kubesec.io/scan`  |

### 1\. CLI

Install the `kubesec` binary, then run:

```
$ kubesec scan pod.yaml
```

Sample JSON output:

```
[
  {
    "object": "Pod/kubesec-demo.default",
    "valid": true,
    "message": "Passed with a score of 1 points",
    "score": 1,
    "scoring": [
      {
        "id": "ReadOnlyRootFilesystem",
        "selector": "containers[].securityContext.readOnlyRootFilesystem == true",
        "reason": "Immutable root filesystems increase attack cost",
        "points": 1
      }
    ],
    "advice": [
      {
        "id": "ServiceAccountName",
        "selector": ".spec.serviceAccountName",
        "reason": "Use least-privilege service accounts",
        "points": 1
      },
      {
        "id": "AppArmorAny",
        "selector": "metadata.annotations.\"container.apparmor.security.beta.kubernetes.io/nginx\"",
        "reason": "Define AppArmor policies for stronger isolation",
        "points": 1
      },
      {
        "id": "SeccompAny",
        "selector": "metadata.annotations.\"container.seccomp.security.alpha.kubernetes.io/pod\"",
        "reason": "Apply Seccomp profiles to limit syscalls",
        "points": 1
      },
      {
        "id": "LimitsCPU",
        "selector": "containers[].resources.limits.cpu",
        "reason": "Prevent DoS by enforcing CPU limits",
        "points": 1
      },
      {
        "id": "LimitsMemory",
        "selector": "containers[].resources.limits.memory",
        "reason": "Prevent DoS by enforcing memory limits",
        "points": 1
      }
    ]
  }
]
```

---

## Bash Wrapper for HTTP API

Create a shell function to simplify HTTP scans:

```
#!/usr/bin/env bash
kubesec_scan() {
  local FILE="${1:?Usage: kubesec_scan <file.yaml>}"
  [[ ! -f "$FILE" ]] && { echo "Error: $FILE not found"; return 1; }

  curl -sSX POST \
    --data-binary @"$FILE" \
    https://v2.kubesec.io/scan
}
```

Call it with:

```
$ kubesec_scan pod.yaml
```

---

## Jenkins Pipeline Integration

Here’s a sample `Jenkinsfile` that builds a Docker image, pushes it, then runs parallel scans with [Conftest](https://www.conftest.dev/) and Kubesec:

```
pipeline {
  agent any

  stages {
    stage('Docker Build & Push') {
      steps {
        withDockerRegistry([credentialsId: 'docker-hub', url: '']) {
          sh 'docker build -t youruser/app:$GIT_COMMIT .'
          sh 'docker push youruser/app:$GIT_COMMIT'
        }
      }
    }

    stage('Vulnerability Scan') {
      steps {
        parallel(
          'OPA Scan': {
            sh '''
              docker run --rm -v $(pwd):/project \
                openpolicyagent/conftest test \
                --policy opa-k8s-security.rego \
                k8s_deployment_service.yaml
            '''
          },
          'Kubesec Scan': {
            sh 'bash kubesec-scan.sh'
          }
        )
      }
    }
  }
}
```

### kubesec-scan.sh

```
#!/usr/bin/env bash
set -euo pipefail

scan_result=$(curl -sSX POST --data-binary @"k8s_deployment_service.yaml" https://v2.kubesec.io/scan)
scan_score=$(jq -r '.[0].score' <<<"$scan_result")
scan_message=$(jq -r '.[0].message' <<<"$scan_result")

echo "Scan Score: $scan_score"
if [[ "$scan_score" -ge 5 ]]; then
  echo "✅ Kubesec Scan Passed: $scan_message"
else
  echo "❌ Kubesec Scan Failed: $scan_message (score $scan_score < 5)"
  exit 1
fi
```

> [!important]
> **Note**
>
> Adjust the threshold (`5` points) to match your team’s security policy.

---

## Improving Your Security Score

Based on the advice from Kubesec, let’s update our Deployment to include:

- A dedicated service account
- AppArmor & Seccomp annotations
- CPU & memory limits
- Immutable root filesystem
- Non-root user execution

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
      annotations:
        container.apparmor.security.beta.kubernetes.io/devsecops-container: runtime/default
        container.seccomp.security.alpha.kubernetes.io/devsecops-container: runtime/default
    spec:
      serviceAccountName: default
      containers:
        - name: devsecops-container
          image: youruser/app:latest
          securityContext:
            runAsNonRoot: true
            runAsUser: 100
            readOnlyRootFilesystem: true
          resources:
            limits:
              cpu: "500m"
              memory: "256Mi"
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

Re-running the scan:

```
+ bash kubesec-scan.sh
Scan Score: 5
✅ Kubesec Scan Passed: Passed with a score of 5 points
```

---

## References

- [Kubesec Documentation](https://kubesec.io/)
- [Conftest – Policy Testing](https://www.conftest.dev/)
- [Kubernetes Concepts](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/b3a99bc0-8670-45ea-af08-d34f75ec3267)**
>
> Watch video content
