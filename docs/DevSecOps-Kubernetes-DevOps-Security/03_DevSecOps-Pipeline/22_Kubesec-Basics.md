# Kubesec Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevSecOps-Pipeline/Kubesec-Basics)

---

## Table of Contents

- Kubesec Basics
  - Key Features
  - Example: Scanning a Pod Manifest
  - Sample JSON Response
  - What’s Next
  - Links and References
  - Watch Video
    - Scan via Docker
    - Scan via REST API

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevSecOps Pipeline

# Kubesec Basics

KubeSec is an open-source Kubernetes security scanner and analysis tool that inspects your manifests for common exploitable risks—such as privilege escalation and writable host mounts—and assigns a security score to each vulnerability found. You can feed it a single YAML file containing one or more Kubernetes resources, and it will return both a numerical score and actionable recommendations.

![The image is a presentation slide about Kubesec, an open-source Kubernetes security scanner and analysis tool, detailing its features and availability. It includes a brief description of its functionality and formats in which it can be used.](https://kodekloud.com/kk-media/image/upload/v1752873722/notes-assets/images/DevSecOps-Kubernetes-DevOps-Security-Kubesec-Basics/kubesec-kubernetes-security-scanner-presentation.jpg)

## Key Features

- **Security Scoring**: Assigns points based on passed checks and best-practice recommendations.
- **Multi-Resource Support**: Scan a single YAML with multiple objects.
- **Flexible Deployment**: Use as a CLI binary, Docker image, Admission Controller, kubectl plugin, or REST API.

| Installation Method       | Use Case                         | Example Command                                    |
| ------------------------- | -------------------------------- | -------------------------------------------------- | ----- |
| Standalone Binary         | Local inspections                | `curl -sL https://kubesec.io/install.sh \\         | bash` |
| Docker Image              | CI/CD integration, containerized | `docker run -i kubesec/kubesec:v2 scan /dev/stdin` |
| Kubernetes Admission Ctrl | Enforce policies at admission    | `kubectl apply -f admission-controller.yaml`       |
| kubectl Plugin            | Scan manifests with kubectl      | `kubectl kubesec scan deployment.yaml`             |
| REST API                  | Programmatic scanning            | `curl -sSX POST --data-binary @"file.yaml"`        |

> [!important]
> **Note**
>
> KubeSec supports multi-document YAML files. Separate resources with `---` in the same file and scan them together.

---

## Example: Scanning a Pod Manifest

Below is a sample Pod specification that enforces a read-only root filesystem:

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

### Scan via Docker

```
docker run -i kubesec/kubesec:v2 scan /dev/stdin < pod.yaml
```

### Scan via REST API

```
curl -sSX POST --data-binary @"pod.yaml" https://v2.kubesec.io/scan
```

> [!important]
> **Warning**
>
> If you expose the REST endpoint publicly, ensure you protect it behind authentication or a firewall to prevent misuse.

---

## Sample JSON Response

The scanner returns a JSON object with your resource’s score and specific advisories:

```
{
  "object": "Pod/kubesec-demo.default",
  "valid": true,
  "fileName": "API",
  "message": "Passed with a score of 1 points",
  "score": 1,
  "scoring": {
    "passed": [
      {
        "id": "ReadOnlyRootFilesystem",
        "selector": "containers[0].securityContext.readOnlyRootFilesystem",
        "reason": "An immutable root filesystem can prevent malicious activity"
      }
    ],
    "advise": [
      {
        "id": "ServiceAccountName",
        "selector": ".spec.serviceAccountName",
        "reason": "Service accounts restrict Kubernetes API access and should be specified",
        "points": 3
      }
    ]
  }
}
```

- **passed**: Checks that succeeded and earned points.
- **advise**: Recommendations to improve the security posture, along with points you can earn.

---

## What’s Next

Now that you’ve seen how to scan a simple Pod, let’s apply KubeSec to a more complex Deployment resource and review deeper recommendations.

## Links and References

- [KubeSec GitHub Repository](https://github.com/controlplaneio/kubesec)
- [Kubernetes Security Context](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/)
- [Docker Hub: kubesec/kubesec](https://hub.docker.com/r/kubesec/kubesec)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/975a1292-de3c-4b22-a4d5-09dfdd0bcb61)**
>
> Watch video content
