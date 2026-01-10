# Commands and Arguments in Kubernetes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Configuration/Commands-and-Arguments-in-Kubernetes)

---

## Table of Contents

- Commands and Arguments in Kubernetes
  - Overriding Default Arguments in a Pod Definition
  - Overriding the Entrypoint
  - Summary
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Configuration

# Commands and Arguments in Kubernetes

Welcome to this lesson on handling commands and arguments within a Kubernetes pod. In this guide, you'll learn how to customize container behavior by overriding default settings defined in your Docker image. Previously, we built a simple Docker image called "ubuntu-sleeper" that pauses execution (sleeps) for a specified number of seconds. By default, running:

```
docker run ubuntu-sleeper
```

makes the container sleep for five seconds. However, you can change this behavior by providing a command-line argument. For example, running:

```
docker run --name ubuntu-sleeper ubuntu-sleeper 10
```

will cause the container to sleep for 10 seconds.

## Overriding Default Arguments in a Pod Definition

Kubernetes allows you to replicate the Docker behavior of passing command-line arguments by using the `args` field in a pod definition. When you specify additional arguments in a Kubernetes pod, they are supplied as an array.

Consider this pod definition template. In the example below, the pod runs the "ubuntu-sleeper" container and overrides the default sleep duration by setting the `args` field to `["10"]`:

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

To create the pod, execute:

```
kubectl create -f pod-definition.yml
```

When the pod starts, it creates a container from the specified image. The `args` field in the Kubernetes definition effectively overrides the default CMD instruction defined in the Dockerfile.

> [!important]
> **Note**
>
> In Kubernetes, you can manipulate container behavior at startup by tweaking the pod specification. Always ensure your YAML syntax is valid to avoid deployment issues.

## Overriding the Entrypoint

In our Dockerfile, we defined an entry point and a CMD instruction as follows:

```
FROM ubuntu
ENTRYPOINT ["sleep"]
CMD ["5"]
```

Typically, when you run the container, the entry point `sleep` is combined with the CMD default `5`. To override the entry point in Docker, you would use the `--entrypoint` flag, for instance:

```
docker run --name ubuntu-sleeper --entrypoint sleep2.0 ubuntu-sleeper 10
```

In Kubernetes, you achieve the same result by using the `command` field in the pod definition. Specifically, the `command` field replaces the ENTRYPOINT from the Dockerfile, and the `args` field continues to override the CMD instruction. Below is an example demonstrating how to set both fields:

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

To deploy this pod, run:

```
kubectl create -f pod-definition.yml
```

> [!important]
> **Note**
>
> Using the `command` and `args` fields in tandem gives you full control over the container's startup process, allowing you to override both the ENTRYPOINT and CMD as needed.

## Summary

There are two primary fields in a Kubernetes pod definition that correspond to your Dockerfile settings:

| Field   | Dockerfile Equivalent | Purpose                                                  |
| ------- | --------------------- | -------------------------------------------------------- |
| command | ENTRYPOINT            | Overrides the default entry point of the image           |
| args    | CMD                   | Replaces the default arguments passed to the entry point |

By correctly configuring these fields, you can modify the startup parameters of your container dynamically. This capability is particularly useful for customizing application behavior in different environments.

Review the provided exercises to practice configuring and troubleshooting commands and arguments in Kubernetes, and enhance your deployment strategies effectively.

For additional resources, refer to [Kubernetes Documentation](https://kubernetes.io/docs/) and [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/a2ce8bef-967b-48a9-9f58-253035a96c98/lesson/a7fb1078-b411-40ed-b2a3-100e46be9c70)**
>
> Watch video content
