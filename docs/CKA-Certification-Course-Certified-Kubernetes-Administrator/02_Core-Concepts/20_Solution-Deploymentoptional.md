# Solution Deploymentoptional - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Core-Concepts/Solution-Deploymentoptional)

---

## Table of Contents

- Solution Deploymentoptional
  - Environment Verification
  - Creating a Deployment Using a YAML Definition
  - Creating a Deployment via the Command Line
  - Summary
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Core Concepts

# Solution Deploymentoptional

In this guide, we introduce Kubernetes deployments by first examining the current environment state before any deployment is created.

## Environment Verification

Start by checking how many pods exist on the system with the command:

```
kubectl get pods
```

Output:

```
No resources found in default namespace.
```

Next, verify the number of ReplicaSets:

```
kubectl get rs
```

Output:

```
No resources found in default namespace.
```

Finally, check the existing deployments:

```
kubectl get deployments
```

Output:

```
No resources found in default namespace.
```

At this point, the environment is clean—no pods, ReplicaSets, or deployments are present.

Some changes are then applied. Rechecking the deployments now shows that one deployment has been created:

```
kubectl get deployments
```

Output:

```
NAME                    READY   UP-TO-DATE   AVAILABLE   AGE
frontend-deployment     0/4     4            0           10s
```

Next, inspect the ReplicaSets:

```
kubectl get rs
```

Output:

```
NAME                              DESIRED   CURRENT   READY   AGE
frontend-deployment-7f8dcd896       4         4         0       35s
```

And finally, list the pods:

```
kubectl get pods
```

Output:

```
NAME                                                     READY   STATUS             RESTARTS   AGE
frontend-deployment-7f8dcd896-stmbx                      0/1     ImagePullBackOff   0          59s
frontend-deployment-7f8dcd896-zc6wc                      0/1     ErrImagePull       0          59s
frontend-deployment-7f8dcd896-jgcbx                      0/1     ErrImagePull       0          59s
frontend-deployment-7f8dcd896-jbr44                      0/1     ErrImagePull       0          59s
```

None of the four pods are ready. To investigate further, inspect one of the pods in detail:

```
kubectl describe pod frontend-deployment-7f8dcd896-stmbx
```

Within the detailed output, you will notice that the image used is "busybox888" (visible under the “Pulling image” events). Key excerpts from the `describe` output include:

```
State:          Waiting
Reason:         ErrImagePull
...
Pulling image "busybox888"
Warning   Failed      ...   Failed to pull image "busybox888": rpc error: code = Unknown desc = failed to pull and unpack image "docker.io/library/busybox888:latest": pull access denied, repository does not exist or may require authorization: server response: authorization failed
Warning   Failed      ...   Error: ErrImagePull
Normal    BackOff     ...   Back-off pulling image "busybox888"
```

> [!important]
> **Warning**
>
> The image "busybox888" does not exist, which is why the pods are not becoming ready. Verify and update your image name as needed.

---

## Creating a Deployment Using a YAML Definition

The next task is to create a new deployment using a YAML file. In your root directory, verify the YAML file presence:

```
controlplane ~  pwd
/root
controlplane ~  ls
deployment-definition-1.yaml  sample.yaml
```

Then, attempt to create the deployment by executing:

```
kubectl create -f deployment-definition-1.yaml
```

You might encounter an error similar to this:

```
Error from server (BadRequest): error when creating "deployment-definition-1.yaml": deployment in version "v1" cannot be handled as a Deployment: no kind "deployment" is registered for version "apps/v1" in scheme "k8s.io/apimachinery/v1.23.3-k3s1/pkg/runtime/schema.go:100"
```

Upon inspecting the file, you could notice that although the API version is correctly set to `apps/v1`, the kind is mistakenly written in lowercase. The `kind` field is case sensitive and must start with an uppercase letter.

Below is the corrected YAML definition:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deployment-1
spec:
  replicas: 2
  selector:
    matchLabels:
      name: busybox-pod
  template:
    metadata:
      labels:
        name: busybox-pod
    spec:
      containers:
        - name: busybox-container
          image: busybox888
          command:
            - sh
            - "-c"
            - echo Hello Kubernetes! && sleep 3600
```

After correcting the `kind` field, save the file and run:

```
kubectl create -f deployment-definition-1.yaml
```

If the file is corrected properly, the deployment will be created successfully.

---

## Creating a Deployment via the Command Line

An alternative method is to create a deployment directly from the command line by specifying the name, image, and number of replicas. For example, to create an HTTP frontend deployment with three replicas using a specific image, run:

```
kubectl create deployment http-frontend --image=<your-httpd-image> --replicas=3
```

It is a good practice to verify the newly created deployment immediately:

```
kubectl get deploy
```

You should see the new `http-frontend` deployment listed, and eventually, the pods should transition to a ready state.

---

## Summary

This lesson demonstrated how to:

- Check the environment for existing pods, ReplicaSets, and deployments.
- Troubleshoot a deployment issue caused by an incorrect image.
- Correctly create a deployment using a YAML definition.
- Create a deployment directly from the command line.

> [!important]
> **Note**
>
> Ensuring correct syntax and case sensitivity in your Kubernetes YAML files is crucial to avoid deployment errors.

By following these steps, you will strengthen your understanding of Kubernetes deployments and develop the skills to quickly troubleshoot and resolve common issues.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/c6d2ac7d-8192-4cff-aa54-e36d888c5bd9/lesson/bab0855f-cbd7-4a57-909b-a19dec777eba)**
>
> Watch video content
