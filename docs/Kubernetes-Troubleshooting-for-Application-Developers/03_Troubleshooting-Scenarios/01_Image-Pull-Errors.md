# Image Pull Errors - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-Troubleshooting-for-Application-Developers/Troubleshooting-Scenarios/Image-Pull-Errors)

---

## Table of Contents

- Image Pull Errors
  - Overview
  - 1. Investigating a Pod with an Image Pull Error
  - 2. Resolving Credential Issues for Private Registries
  - 3. Correcting Image Tags and Resolving DNS Issues
  - Summary of Common Image Pull Error Scenarios
  - Conclusion
  - Watch Video
  - Practice Lab
    - Pod Status Example
    - Example: Fixing a Typo in the Image URL
    - Check the Image Pull Secrets
    - Updated Notifications Pod Definition
    - Steps to Apply the Change

---

## Content

Kubernetes Troubleshooting for Application Developers

Troubleshooting Scenarios

# Image Pull Errors

Welcome to this guide on resolving common image pull errors in Kubernetes. In this article, we will explore issues that can occur during image pulls, including typos in image names, missing credentials, incorrect tags, and DNS resolution errors. Whether you're new to Kubernetes or an experienced user, this step-by-step guide will help you diagnose and fix these problems.

---

## Overview

When a pod is stuck in an image pull error state, it means that Kubernetes tried to fetch the container image, encountered an error, and then applied an exponential backoff before retrying. This mechanism helps prevent network congestion and registry overload.

### Pod Status Example

Below is an example of a pod status showing the error:

```
NAME           PF  READY  STATUS             RESTARTS  CPU  MEM   %CPU/R  %CPU/L  %MEM/R  %MEM/L  IP             NODE   AGE
analyzer         0/1  ImagePullBackOff   0         0    0     n/a     n/a     n/a     n/a     10.244.1.3   node01  8m
api              0/1  ImagePullBackOff   0         0    0     n/a     n/a     n/a     n/a     10.244.1.2   node01  8m
notifications    0/1  ImagePullBackOff   0         0    0     n/a     n/a     n/a     n/a     10.244.1.4   node01  8m
portal           0/1  ImagePullBackOff   0         0    0     n/a     n/a     n/a     n/a     10.244.1.5   node01  8m
```

Each retry increases the delay before the next attempt.

---

## 1\. Investigating a Pod with an Image Pull Error

Let's start by inspecting one of the pods that is not starting correctly. In this section, we describe the API pod to look at the events, which illustrate that the image pull error is due to an unresolved image reference.

![The image shows a terminal interface displaying Kubernetes pod details, including container readiness, pod scheduling, volume information, and event logs related to image pulling errors.](https://kodekloud.com/kk-media/image/upload/v1752880432/notes-assets/images/Kubernetes-Troubleshooting-for-Application-Developers-Image-Pull-Errors/kubernetes-pod-details-terminal.jpg)

The events reveal that the cluster scheduled the pod correctly but failed to pull the image because the reference could not be resolved. Common error messages include "pull access denied," "repository does not exist," or messages indicating the need for authorization.

### Example: Fixing a Typo in the Image URL

In this example, the pod uses an image sourced from [Docker Hub](https://hub.docker.com/). Upon checking, a typo was discovered in the image name ("NGINX"). Correcting the typo will resolve the issue.

Below is the updated pod definition:

```
apiVersion: v1
kind: Pod
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","kind":"Pod","metadata":{"annotations":{},"labels":{"app":"api"},"name":"api","namespace":"production"},"spec":{"containers":[{"image":"docker.io/library/nginx:alpine","name":"api","resources":{},"terminationMessagePath":"/dev/termination-log","terminationMessagePolicy":"File"}]}}
  creationTimestamp: "2024-05-06T22:50:59Z"
  labels:
    app: api
  name: api
  namespace: production
  resourceVersion: "71898"
  uid: 823d9b4c-5ed8-44c9-9c3c-847f5286810c
spec:
  containers:
  - image: docker.io/library/nginx:alpine
    imagePullPolicy: IfNotPresent
    name: api
    resources: {}
    terminationMessagePath: /dev/termination-log
    terminationMessagePolicy: File
    volumeMounts:
    - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      name: kube-api-access-6sxcl
      readOnly: true
dnsPolicy: ClusterFirst
enableServiceLinks: true
nodeName: node01
preemptionPolicy: PreemptLowerPriority
priority: 0
```

After saving this configuration, the pod status updates to:

```
NAME           PF  READY  STATUS             RESTARTS  CPU  MEM  %CPU/R  %MEM/R  %CPU/L  %MEM/L  IP             NODE     AGE
analyzer         0/1  ImagePullBackOff   0         0    0    n/a     n/a     n/a     n/a     10.244.1.3   node01   9m49s
api              1/1  Running            0         0    0    n/a     n/a     n/a     n/a     10.244.1.2   node01   9m49s
notifications    0/1  ImagePullBackOff   0         0    0    n/a     n/a     n/a     n/a     10.244.1.4   node01   9m49s
portal           0/1  ImagePullBackOff   0         0    0    n/a     n/a     n/a     n/a     10.244.1.5   node01   9m49s
```

---

## 2\. Resolving Credential Issues for Private Registries

The next issue involves the notifications pod, which faces a 401 Unauthorized error while pulling an image from the GitHub Container Registry (ghcr.io). A 401 error generally indicates missing or invalid credentials.

### Check the Image Pull Secrets

Inspect the pod's events:

```
Events:
  Normal   Scheduled   9m56s  default-scheduler  Successfully assigned production/notifications to node01
  Normal   Pulling     8m24s  kubelet    Pulling image "ghcr.io/testuser177/solar-system:3cd635a2ae17224806363eb3a4d565623650efb1"
  Warning  Failed      8m24s  kubelet    Failed to pull image "ghcr.io/testuser177/solar-system:3cd635a2ae17224806363eb3a4d565623650efb1": failed to resolve reference "ghcr.io/testuser177/solar-system:3cd635a2ae17224806363eb3a4d565623650efb1": failed to authorize: failed to fetch anonymous token: unexpected status from GET request to https://ghcr.io/token?scope=repository%3Atestuser177%2Fsolar-system%3Apull&service=ghcr.io: 401 Unauthorized
  Warning  Failed      8m24s  kubelet    Error: ErrImagePull
  Warning  Failed      8m12s  kubelet    Error: ImagePullBackOff
  Normal   Backoff     4m47s  kubelet    Back-off pulling image "ghcr.io/testuser177/solar-system:3cd635a2ae17224806363eb3a4d565623650efb1"
```

A quick check confirms that the required secret for ghcr.io (named "ghcr-secret") does exist:

```
NAME         TYPE                               DATA   AGE
ghcr-secret  kubernetes.io/dockerconfigjson     1      10m
```

> [!important]
> **Note**
>
> Since you're editing a pod directly (instead of a Deployment), some fields cannot be updated on a running pod. You must delete the pod and reapply the updated configuration.

### Updated Notifications Pod Definition

Below is the updated configuration with the image pull secret added:

```
apiVersion: v1
kind: Pod
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","kind":"Pod","metadata":{"annotations":{},"labels":{"app":"notifications"},"name":"notifications","namespace":"production"},"spec":{"containers":[{"image":"ghcr.io/testuser177/solar-system:3cd635a2ae17224806363eb3a4d565623650efb1","name":"notifications","imagePullPolicy":"IfNotPresent","resources":{},"terminationMessagePath":"/dev/termination-log","terminationMessagePolicy":"File","volumeMounts":[{"mountPath":"/var/run/secrets/kubernetes.io/serviceaccount","name":"kube-api-access-mh4xz","readOnly":true}]}]}}
  labels:
    app: notifications
  name: notifications
  namespace: production
spec:
  imagePullSecrets:
  - name: ghcr-secret
  containers:
  - image: ghcr.io/testuser177/solar-system:3cd635a2ae17224806363eb3a4d565623650efb1
    imagePullPolicy: IfNotPresent
    name: notifications
    resources: {}
    terminationMessagePath: /dev/termination-log
    terminationMessagePolicy: File
    volumeMounts:
    - mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      name: kube-api-access-mh4xz
      readOnly: true
  dnsPolicy: ClusterFirst
  enableServiceLinks: true
  nodeName: node01
  preemptionPolicy: PreemptLowerPriority
  priority: 0
```

### Steps to Apply the Change

1.  **Export the current pod configuration:**

    ```
    kubectl get -n production pod notifications -o yaml > notifications.yaml
    ```

2.  **Delete the existing pod:**

    ```
    kubectl delete pod -n production notifications
    ```

3.  **Apply the updated configuration:**

    ```
    kubectl apply -f notifications.yaml
    ```

After applying the changes, verify the pod status using a CLI tool like [K9s](https://k9scli.io/).

![The image shows a terminal interface of K9s, a Kubernetes CLI tool, displaying the status of pods in a cluster. It lists four pods with their readiness, status, restarts, CPU, memory usage, IP, node, and age, highlighting issues like "ImagePullBackOff" and "ContainerCreating."](https://kodekloud.com/kk-media/image/upload/v1752880433/notes-assets/images/Kubernetes-Troubleshooting-for-Application-Developers-Image-Pull-Errors/k9s-kubernetes-cli-pod-status.jpg)

The notifications pod should now be in a Running state.

---

## 3\. Correcting Image Tags and Resolving DNS Issues

The portal pod experienced image pull errors due to an incorrect image tag. In the pod description, the following error was observed:

```
Failed to pull image "docker.io/library/httpd:bookstore": rpc error: code = NotFound desc = failed to pull and unpack image "docker.io/library/httpd:bookstore": not found
```

Although the repository is correct ("docker.io/library/httpd"), the tag "bookstore" does not exist. A quick check on Docker Hub confirms the correct tag should be "bookworm" (or another valid tag). After correcting the tag in the pod definition, the portal pod successfully starts.

Additionally, another pod faced DNS resolution issues with a long image reference from "gitlab.kodekloud.com". The error message showed:

```
failed to resolve reference: dial TCP ...: lookup gitlab.kodekloud.com: no such host
```

Running a local nslookup confirms that the hostname cannot be resolved:

```
nslookup gitlab.kodekloud.com
```

> [!important]
> **Warning**
>
> Since the cluster cannot resolve the hostname, you will need to coordinate with your networking team or cluster administrators to fix the DNS issue.

---

## Summary of Common Image Pull Error Scenarios

| Scenario                   | Cause                                                                  | Resolution                                               |
| -------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------- |
| Typo in Image URL          | Incorrect spelling in the image name (e.g., "NGINX" typo)              | Update the image URL to the correct spelling             |
| Missing Image Pull Secrets | 401 Unauthorized error when accessing a private registry               | Ensure valid image pull secret is configured and applied |
| Incorrect Image Tag        | Specified tag does not exist (e.g., "bookstore" instead of "bookworm") | Update the pod definition with the correct image tag     |
| DNS Resolution Issue       | The cluster cannot resolve the container registry hostname             | Coordinate with networking teams to resolve DNS issues   |

---

## Conclusion

In this guide, we walked through several common issues that lead to image pull errors in Kubernetes, including:

1.  Typos in the image URL.
2.  Missing or misconfigured image pull secrets for private registries.
3.  Incorrect image tags.
4.  DNS resolution errors.

It is essential to verify application details, ensure image URL correctness, and configure proper credentials before troubleshooting such issues. Happy troubleshooting!

For more Kubernetes resources, check out the [Kubernetes Documentation](https://kubernetes.io/docs/) and [Docker Hub](https://hub.docker.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/143d3913-caef-4dab-bde6-b77e96dbb161/lesson/58eb1ac7-8410-4692-926d-469728655bfd)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-troubleshooting-for-application-developers/module/143d3913-caef-4dab-bde6-b77e96dbb161/lesson/93267892-5937-47b7-8c27-300032234840)**
>
> Practice lab
