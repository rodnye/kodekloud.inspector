# Namespaces and Capabilities - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine-Security/Namespaces-and-Capabilities)

---

## Table of Contents

- Namespaces and Capabilities
  - Process Isolation with PID Namespaces
  - User and Process Ownership
  - Linux Capabilities
  - Links and References
  - Watch Video
    - Demonstration

---

## Content

Docker Certified Associate Exam Course

Docker Engine Security

# Namespaces and Capabilities

In this lesson, we explore how Docker leverages Linux namespaces and capabilities to isolate and secure containerized processes. You’ll learn about PID namespaces, user mappings, and fine-grained capability controls.

## Process Isolation with PID Namespaces

Docker uses Linux namespaces to give each container its own view of system resources—PIDs, network interfaces, IPC, mounts, and time-sharing clocks:

![The image is a diagram illustrating containerization, showing "Namespace" at the center connected to "Process ID," "Unix Timesharing," "Mount," "Network," and "InterProcess."](https://kodekloud.com/kk-media/image/upload/v1752873895/notes-assets/images/Docker-Certified-Associate-Exam-Course-Namespaces-and-Capabilities/containerization-namespace-diagram.jpg)

When Linux boots, it creates a single init process (PID 1) and forks all other processes from it. On the host, PIDs must remain unique, but containers also need a PID 1 without colliding with host IDs. PID namespaces solve this by providing each container its own PID space.

![The image illustrates a PID namespace hierarchy in a Linux system, showing a parent system with PIDs 1 to 6 and a child system (container) with PIDs 1 and 2.](https://kodekloud.com/kk-media/image/upload/v1752873896/notes-assets/images/Docker-Certified-Associate-Exam-Course-Namespaces-and-Capabilities/pid-namespace-hierarchy-linux.jpg)

Processes inside the container see only PIDs 1 and 2, while the host maps them to PIDs 5 and 6.

### Demonstration

1.  Launch a container that sleeps for an hour:

    ```
    docker run -d --name pid-namespace-test ubuntu sleep 3600
    ```

2.  Inside the container, list processes:

    ```
    docker exec -it pid-namespace-test bash -c "ps aux"
    ```

    ```
    USER   PID %CPU %MEM    VSZ   RSS TTY STAT START   TIME COMMAND
    root     1  0.0  0.0   4528   828 ?    Ss   03:06   0:00 sleep 3600
    ```

3.  On the host, verify the same process has a different PID:

    ```
    ps aux | grep sleep
    ```

    ```
    USER   PID %CPU %MEM    VSZ   RSS TTY STAT START   TIME COMMAND
    root  3816  0.0  0.0   4528   828 ?    Ss   06:06   0:00 sleep 3600
    ```

The output shows how PID namespaces isolate container processes from the host.

## User and Process Ownership

By default, Docker runs container processes as `root` inside the container, which maps to `root` on the host. To confirm:

```
docker run --rm ubuntu sleep 1
docker ps
```

To run processes as a non-root user, use the `--user` flag:

```
docker run --rm --user 1000 ubuntu sleep 3600
docker exec -it <container_id> bash -c "ps aux"
```

```
USER   PID %CPU %MEM    VSZ   RSS TTY STAT START   TIME COMMAND
1000     1  0.0  0.0   4528   828 ?    Ss   03:06   0:00 sleep 3600
```

You can also set a default user in your `Dockerfile`:

```
FROM ubuntu
USER 1000
```

```
docker build -t my-ubuntu-image .
docker run --rm my-ubuntu-image sleep 3600
docker exec -it <container_id> bash -c "ps aux"
```

```
USER   PID %CPU %MEM    VSZ   RSS TTY STAT START   TIME COMMAND
1000     1  0.0  0.0   4528   828 ?    Ss   03:06   0:00 sleep 3600
```

## Linux Capabilities

Beyond namespaces, Docker restricts container privileges by dropping most Linux capabilities from the root user inside a container. This prevents operations like rebooting the host or altering network configurations.

![The image illustrates various Linux capabilities, such as CHOWN, KILL, and SETUID, represented in colorful blocks beneath a user icon. It also references the file path `/usr/include/linux/capability.h`.](https://kodekloud.com/kk-media/image/upload/v1752873898/notes-assets/images/Docker-Certified-Associate-Exam-Course-Namespaces-and-Capabilities/linux-capabilities-chown-kill-setuid.jpg)

By default, containers run with a minimal set of capabilities. You can customize them using `--cap-add`, `--cap-drop`, or the `--privileged` flag:

| Command                   | Description                              |
| ------------------------- | ---------------------------------------- |
| `--cap-add=<CAPABILITY>`  | Add a specific capability                |
| `--cap-drop=<CAPABILITY>` | Remove a specific capability             |
| `--privileged`            | Grant all capabilities (not recommended) |

> [!important]
> **Warning**
>
> Granting `--privileged` mode gives the container all host capabilities, which can compromise security. Use it only when absolutely necessary.> [!important]
> **Note**
>
> For a full list of Linux capabilities, see [Kernel Capabilities](http://man7.org/linux/man-pages/man7/capabilities.7.html).

That’s it for namespaces and capabilities in Docker. Proceed to the next lesson for more on container networking and storage.

## Links and References

- [Docker run reference](https://docs.docker.com/engine/reference/commandline/run/)
- [Linux namespaces overview](https://man7.org/linux/man-pages/man7/namespaces.7.html)
- [Docker security documentation](https://docs.docker.com/engine/security/security/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/59a97752-06d2-4cac-a4d0-ad4240730912/lesson/caac6653-a748-4931-b872-347c8c63d7c6)**
>
> Watch video content
