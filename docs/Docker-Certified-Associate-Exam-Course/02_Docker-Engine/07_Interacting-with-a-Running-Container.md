# Interacting with a Running Container - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine/Interacting-with-a-Running-Container)

---

## Table of Contents

- Interacting with a Running Container
  - Table of Common Docker Container Operations
  - 1. Exiting an Interactive Container
  - 2. Detaching Without Stopping
  - 3. Executing a One-off Command
  - 4. Opening an Interactive Shell
  - 5. Attaching to a Running Container
  - References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Engine

# Interacting with a Running Container

This article demonstrates how to manage Docker containers that are already running. You’ll learn how to exit, detach, execute commands, open interactive shells, and reattach to containers without interrupting critical processes.

## Table of Common Docker Container Operations

| Action                        | Command                               | Description                                            |
| ----------------------------- | ------------------------------------- | ------------------------------------------------------ |
| Start interactive container   | `docker run -it ubuntu`               | Launches Ubuntu with an interactive TTY shell          |
| Exit container                | `exit`                                | Terminates the shell and stops the container           |
| Detach without stopping       | Press `Ctrl-p` `Ctrl-q`               | Leaves the container running in the background         |
| Execute a one-off command     | `docker exec CONTAINER COMMAND`       | Runs a command inside a running container              |
| Open an interactive shell     | `docker exec -it CONTAINER /bin/bash` | Starts a new shell session for troubleshooting         |
| Attach to the primary process | `docker attach CONTAINER`             | Reconnects your terminal to the container’s main shell |

## 1\. Exiting an Interactive Container

When you run a container with `-i` (interactive) and `-t` (TTY), typing `exit` in the shell will stop both the shell and the container:

```
docker run -it ubuntu
root@6caba272c8f5:/# exit
exit
```

Verify the container status:

```
docker container ls -l
CONTAINER ID   IMAGE   COMMAND     CREATED         STATUS                      PORTS   NAMES
6caba272c8f5   ubuntu  "/bin/bash" 2 minutes ago   Exited (0) 10 seconds ago           loving_ritchie
```

## 2\. Detaching Without Stopping

To keep the container running after leaving the shell, press `Ctrl-p` followed by `Ctrl-q`:

```
docker run -it ubuntu
root@b71f15d33b60:/#   # Press Ctrl-p then Ctrl-q
```

> [!important]
> **Note**
>
> The detach sequence `Ctrl-p` + `Ctrl-q` does not stop the container; it simply returns you to the host shell.

Confirm the container is still running:

```
docker container ls
CONTAINER ID   IMAGE   COMMAND     CREATED        STATUS       PORTS    NAMES
b71f15d33b60   ubuntu  "/bin/bash" 5 seconds ago  Up 3 seconds          goofy_bell
```

## 3\. Executing a One-off Command

To run a single command in an existing container, use `docker exec`:

```
docker exec b71f15d33b60 hostname
b71f15d33b60
```

This outputs the container’s hostname (its short ID).

## 4\. Opening an Interactive Shell

When you need to troubleshoot or inspect the environment, start a new shell inside the container:

```
docker exec -it b71f15d33b60 /bin/bash
root@b71f15d33b60:/# ps -ef
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0 12:00 pts/0    00:00:00 /bin/bash
root        10     1  0 12:01 pts/0    00:00:00 ps -ef


root@b71f15d33b60:/# tty
/dev/pts/0


root@b71f15d33b60:/# exit
exit
```

## 5\. Attaching to a Running Container

To reconnect to the container’s initial process (PID 1), use:

```
docker attach b71f15d33b60
root@b71f15d33b60:/#
```

> [!important]
> **Warning**
>
> Exiting the primary shell (PID 1) will stop the container. To avoid unintentionally shutting it down, detach (`Ctrl-p` `Ctrl-q`) instead of exiting.

## References

- [Docker Documentation](https://docs.docker.com/)
- [docker exec reference](https://docs.docker.com/engine/reference/commandline/exec/)
- [Managing containers](https://docs.docker.com/config/containers/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/871494af-49f8-42e9-95e9-cb0df80c2b21/lesson/3f128a25-5d52-4faf-9a30-b344cff61d60)**
>
> Watch video content
