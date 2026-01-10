# Pre requisite Security in Docker - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Security/Pre-requisite-Security-in-Docker)

---

## Table of Contents

- Pre requisite Security in Docker
  - User Privileges and Security
  - Managing Linux Capabilities
  - Useful References
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Security

# Pre requisite Security in Docker

Welcome to this comprehensive lesson on Docker security. In this session, we explore essential Docker security concepts that lay the groundwork for understanding security contexts in Kubernetes. We’ll begin by reviewing how Docker isolates container processes using namespaces and how user privileges impact container security.

Imagine a host machine with Docker installed. This host runs its own processes, such as the operating system services, the Docker daemon, and an SSH server. Now, consider running an Ubuntu container executing a process that sleeps for one hour. Unlike virtual machines, containers share the host’s Linux kernel and achieve isolation through namespaces. Each container operates within its dedicated namespace, keeping its processes hidden from the host and other containers.

For example, when you run the following command to start a container:

```
docker run ubuntu sleep 3600
```

Inside the container, if you list the processes:

```
bash
ps aux
```

you will observe only the sleep process with a process ID of 1. However, on the host where processes across all namespaces are managed, the same sleep process appears among many with a different process ID:

```
bash
ps aux
USER   PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root     1  0.0  0.0   4528   828 ?        Ss   03:06   0:00 sleep 3600
```

> [!important]
> **Note**
>
> Docker uses namespaces to maintain process isolation. Although the container’s process starts with PID 1 inside its own namespace, it receives a different PID when viewed on the host system.

## User Privileges and Security

Docker hosts usually have a root user along with non-root users. By default, Docker starts container processes as the root user. You can verify this by comparing the process list inside and outside the container, as shown below:

```
ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
project   3720  0.1  0.1  95500  4916 ?        R     06:06   0:00 sshd: project@pts/0
project   3725  0.0  0.1  95196  4132 ?        S     06:06   0:00 sshd: project@notty
project   3727  0.2  0.1  21352  5340 pts/0    Ss    06:06   0:00 -bash
root      3802  0.0  0.0  8924  3616 ?        Sl    06:06   0:00 docker-containerd-shim --namespace m
root      3816  1.0  0.0  4528  828 ?        Ss    06:06   0:00 sleep 3600
```

To improve security, it is best practice to avoid running container processes as the root user. You can change the user at runtime using the `--user` option:

```
docker run --user=1000 ubuntu sleep 3600
```

After running this command, inspecting the host process list shows the process running as user ID 1000:

```
bash
ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
1000         1  0.0  0.0  4528  828 ?        Ss   03:06   0:00 sleep 3600
```

Another method to enforce security is by specifying the user in the Docker image during build-time. For example, you can create a Dockerfile based on the default Ubuntu image and set a non-root user:

```
FROM ubuntu
USER 1000
```

Build the custom image and run a container with the following commands:

```
docker build -t my-ubuntu-image .
docker run my-ubuntu-image sleep 3600
```

Verifying the running process confirms that it is executed as user ID 1000:

```
bash
ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
1000         1  0.0  0.0  4528  828 ?        Ss   03:06   0:00 sleep 3600
```

> [!important]
> **Key Insight**
>
> Even though containers by default run as the root user, Docker restricts the container's root privileges using Linux capabilities. This ensures that the container's root does not have the same level of control as the host's root.

## Managing Linux Capabilities

Docker utilizes Linux capabilities to restrict what the container’s root user can do. Unlike a system's root user, which can perform all actions, the container’s root is limited by a default set of capabilities. This prevents containers from performing operations that might compromise the host system or other containers.

If additional privileges are needed, you can grant them with the `--cap-add` option:

```
docker run --cap-add=MAC_ADMIN ubuntu
```

Conversely, to reduce privileges further, the `--cap-drop` option can be used. In cases where you require a container to run with all privileges, the `--privileged` flag is available, although it should be used with caution.

That concludes our introduction to Docker security. In upcoming lessons, we will dive deeper into Kubernetes security contexts and explore how these Docker security measures extend into container orchestration environments.

## Useful References

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/77826599-d456-4cb5-8cbc-b713cc077b45/lesson/82494a7a-ceb4-4198-b9a3-57d236f749a0)**
>
> Watch video content
