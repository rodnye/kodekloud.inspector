# Demo Fixing Script and Read Only Root File System - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/DevSecOps-Kubernetes-DevOps-Security/DevSecOps-Pipeline/Demo-Fixing-Script-and-Read-Only-Root-File-System)

---

## Table of Contents

- Demo Fixing Script and Read Only Root File System
  - Table of Contents
  - Problem Overview
  - Initial Deployment Configuration
  - Why readOnlyRootFilesystem Isn’t Applied
  - Original Deployment Script Analysis
  - Quick Workaround: Always Apply Manifest
  - Solution: Mounting an emptyDir Volume
  - Applying the Updated Manifest
  - Verification Steps
  - Best Practices
  - References
  - Watch Video

---

## Content

DevSecOps - Kubernetes DevOps & Security

DevSecOps Pipeline

# Demo Fixing Script and Read Only Root File System

In this tutorial, you’ll learn how to troubleshoot a Deployment script that skips full manifest updates and how to enable a read-only root filesystem in your container without breaking writable paths like `/tmp`.

## Table of Contents

- [Problem Overview](#problem-overview)
- [Initial Deployment Configuration](#initial-deployment-configuration)
- [Why `readOnlyRootFilesystem` Isn’t Applied](#why-readonlyrootfilesystem-isnt-applied)
- [Original Deployment Script Analysis](#original-deployment-script-analysis)
- [Quick Workaround: Always Apply Manifest](#quick-workaround-always-apply-manifest)
- [Solution: Mounting an `emptyDir` Volume](#solution-mounting-an-emptydir-volume)
- [Applying the Updated Manifest](#applying-the-updated-manifest)
- [Verification Steps](#verification-steps)
- [Best Practices](#best-practices)
- [References](#references)

---

## Problem Overview

You’ve added `readOnlyRootFilesystem: true` to your container’s `securityContext`, but after deployment, the pod spec doesn’t reflect this change. The Deployment script only updates the image, never reapplies the full YAML, so new securityContext settings are ignored.

## Initial Deployment Configuration

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
      serviceAccountName: default
      containers:
        - name: devsecops-container
          image: replace
          securityContext:
            runAsNonRoot: true
            runAsUser: 100
            readOnlyRootFilesystem: true
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

After applying:

```
kubectl get po devsecops-66cd4b7475-8fn5d -o yaml | grep readOnlyRootFilesystem
# <no output>
```

## Why `readOnlyRootFilesystem` Isn’t Applied

Because the deployment script checks for an existing Deployment and only runs `kubectl set image…`, it never reapplies the manifest changes (securityContext, volumes, etc.).

## Original Deployment Script Analysis

```
#!/bin/bash
# Replace image placeholder
sed -i "s|replace|${imageName}|g" k8s_deployment_service.yaml
kubectl get deployment ${deploymentName} > /dev/null


if [[ $? -ne 0 ]]; then
    echo "deployment ${deploymentName} doesn't exist"
    kubectl apply -f k8s_deployment_service.yaml
else
    echo "deployment ${deploymentName} exists, updating image to ${imageName}"
    kubectl -n default set image deployment ${deploymentName} \
      ${containerName}=${imageName} --record=true
fi
```

This script never picks up any YAML changes besides the image tag.

## Quick Workaround: Always Apply Manifest

```
#!/bin/bash
sed -i "s|replace|${imageName}|g" k8s_deployment_service.yaml
# Always apply full manifest to pick up config changes
kubectl -n default apply -f k8s_deployment_service.yaml
```

> [!important]
> **Warning**
>
> Always applying the full manifest will restart pods and may cause brief downtime. Plan for rolling updates.

After pushing this change, pods now crash with:

```
kubectl logs devsecops-6d547ad96b-67x7n
# org.springframework.context.ApplicationContextException: Unable to start web server;
# nested exception is org.springframework.boot.web.server.WebServerException:
# Unable to create tempDir. java.io.tmpdir is set to /tmp
```

Since `/tmp` is on a read-only root, the Spring Boot app can’t create its temp directory.

## Solution: Mounting an `emptyDir` Volume

To provide a writable `/tmp` while keeping the rest of the filesystem read-only, add an `emptyDir` volume and mount it at `/tmp`.

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
      serviceAccountName: default
      volumes:
        - name: tmp-vol
          emptyDir: {}
      containers:
        - name: devsecops-container
          image: replace
          volumeMounts:
            - name: tmp-vol
              mountPath: /tmp
          securityContext:
            runAsNonRoot: true
            runAsUser: 100
            readOnlyRootFilesystem: true
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

> [!important]
> **Note**
>
> The `emptyDir` volume is ephemeral and only persists for the pod’s lifetime. Use a `PersistentVolume` if you need data durability.

## Applying the Updated Manifest

```
kubectl -n default apply -f k8s_deployment_service.yaml
```

## Verification Steps

| Step                                 | Command                                                         | Expected Output                                          |
| ------------------------------------ | --------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------ |
| 1\\. Check pods are running          | `kubectl get pods`                                              | All pods in `Running` state                              |
| 2\\. Confirm readOnlyRootFilesystem  | `kubectl get po devsecops-xxx -o yaml \\                        | grep readOnlyRootFilesystem`                             | `readOnlyRootFilesystem: true` |
| 3\\. Test write to `/etc`            | `kubectl exec -it devsecops-xxx -- touch /etc/deny && echo ok`  | `touch: cannot touch '/etc/deny': Read-only file system` |
| 4\\. Test write to `/tmp`            | `kubectl exec -it devsecops-xxx -- touch /tmp/allow && echo ok` | `ok`                                                     |
| 5\\. Verify application startup logs | `kubectl logs devsecops-xxx`                                    | Tomcat and Spring Boot start messages                    |

## Best Practices

| Resource        | Purpose                                       | Reference                                                                                     |
| --------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------- |
| securityContext | Enforce container security policies           | [Kubernetes Docs](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) |
| emptyDir volume | Provide ephemeral writable storage            | [emptyDir Volume](https://kubernetes.io/docs/concepts/storage/volumes/#emptydir)              |
| Rolling Updates | Minimize downtime when applying new manifests | [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)          |

## References

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Spring Boot Reference Guide](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
- [Deployments in Kubernetes](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [emptyDir Volume](https://kubernetes.io/docs/concepts/storage/volumes/#emptydir)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/devsecops-kubernetes-devops-security/module/877bd662-968c-40a5-bda6-a42b600ea957/lesson/c502eeeb-4e4b-4054-8860-ea5829bcbb29)**
>
> Watch video content
