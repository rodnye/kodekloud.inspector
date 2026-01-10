# Commands and Arguments in Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Commands-and-Arguments-in-Kubernetes)

---

## Table of Contents

- Commands and Arguments in Kubernetes
  - Table of Contents
  - Recap: ubuntu-sleeper Docker Image
  - Create a Pod with the Default Command
  - Override CMD with args
  - Override ENTRYPOINT with command
  - Summary & Mapping Table
  - References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Commands and Arguments in Kubernetes

In this tutorial, you’ll learn how to configure **commands** and **arguments** in a Kubernetes Pod. We’ll use a simple `ubuntu-sleeper` image that demonstrates how `ENTRYPOINT` and `CMD` from a Dockerfile map to the `command` and `args` fields in a Pod spec.

---

## Table of Contents

1.  [Recap: ubuntu-sleeper Docker Image](#recap-ubuntu-sleeper-docker-image)
2.  [Create a Pod with the Default Command](#create-a-pod-with-the-default-command)
3.  [Override CMD with `args`](#override-cmd-with-args)
4.  [Override ENTRYPOINT with `command`](#override-entrypoint-with-command)
5.  [Summary & Mapping Table](#summary--mapping-table)
6.  [References](#references)

---

## Recap: ubuntu-sleeper Docker Image

We built a minimal Docker image called **ubuntu-sleeper**:

```
FROM ubuntu
ENTRYPOINT ["sleep"]
CMD ["5"]
```

- Running without extra arguments uses the default sleep duration (5 seconds):

  ```
  docker run --name ubuntu-sleeper ubuntu-sleeper
  ```

- Providing an argument overrides `CMD` (for example, sleep 10):

  ```
  docker run --name ubuntu-sleeper ubuntu-sleeper 10
  ```

In Docker CLI, anything after the image name replaces the `CMD` instruction.

---

## Create a Pod with the Default Command

Here’s the simplest Pod manifest that runs `sleep 5` by default:

```
apiVersion: v1
kind: Pod
metadata:
  name: ubuntu-sleeper-pod
spec:
  containers:
    - name: ubuntu-sleeper
      image: ubuntu-sleeper
```

Apply the Pod:

```
kubectl create -f pod-definition.yml
```

By default, Kubernetes uses the image’s `ENTRYPOINT` + `CMD` (`sleep 5`), and the container will exit after 5 seconds.

---

## Override CMD with `args`

To change the sleep duration without touching the entrypoint, specify an `args` array in your Pod spec:

```
apiVersion: v1
kind: Pod
metadata:
  name: ubuntu-sleeper-pod
spec:
  containers:
    - name: ubuntu-sleeper
      image: ubuntu-sleeper
      args: ["10"]
```

This runs `sleep 10`. Update the Pod:

```
kubectl apply -f pod-definition.yml
```

> [!important]
> **Note**
>
> The `args` field in Kubernetes corresponds directly to the Dockerfile `CMD`. Any elements you list here will override the default `CMD` values.

---

## Override ENTRYPOINT with `command`

If you need to override both the entrypoint and its arguments, use the `command` field for the entrypoint and `args` for its parameters:

```
apiVersion: v1
kind: Pod
metadata:
  name: ubuntu-sleeper-pod
spec:
  containers:
    - name: ubuntu-sleeper
      image: ubuntu-sleeper
      command: ["sleep2.0"]
      args: ["10"]
```

- `command` replaces the Dockerfile `ENTRYPOINT`.
- `args` replaces the Dockerfile `CMD`.

Apply this configuration:

```
kubectl create -f pod-definition.yml
```

> [!important]
> **Warning**
>
> If you override the `command` field, make sure the specified executable exists in the container filesystem. Otherwise, the Pod will fail to start.

---

## Summary & Mapping Table

The table below summarizes how Dockerfile instructions map to Kubernetes Pod spec fields:

| Dockerfile Instruction | Kubernetes Pod Spec Field | Purpose                               |
| ---------------------- | ------------------------- | ------------------------------------- |
| ENTRYPOINT             | command                   | Defines the executable to run         |
| CMD                    | args                      | Provides default parameters/arguments |

Use these fields to precisely control the process invoked inside your containers.

---

## References

- [Kubernetes Official Documentation](https://kubernetes.io/docs/)
- [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
- [Managing Containers in Pods](https://kubernetes.io/docs/concepts/workloads/pods/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/2c5416fe-a10c-42cc-8427-f776a2489163)**
>
> Watch video content
