# Stopping and Removing a Container - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine/Stopping-and-Removing-a-Container)

---

## Table of Contents

- Stopping and Removing a Container
  - 1. Linux Signals Refresher
  - 2. Docker Container Equivalents
  - 3. Sending Custom Signals
  - 4. Removing a Container
  - 5. Batch Stopping and Removing
  - 6. Pruning Stopped Containers
  - 7. Automatic Cleanup with --rm
  - Links and References
  - Watch Video
    - 2.1 Running an HTTPD Container
    - 2.2 Pause and Resume
    - 2.3 Stop (SIGTERM then SIGKILL)

---

## Content

Docker Certified Associate Exam Course

Docker Engine

# Stopping and Removing a Container

In this guide, we’ll explore how to manage Docker containers by stopping, pausing, resuming, and removing them. You’ll also learn how Linux signals map to Docker commands, plus best practices for cleaning up containers to reclaim resources.

---

## 1\. Linux Signals Refresher

Linux processes respond to signals for control and shutdown. Below is a quick overview:

| Signal  | Action            | Description                                |
| ------- | ----------------- | ------------------------------------------ |
| SIGSTOP | Pause             | Suspends the process, cannot be caught.    |
| SIGCONT | Resume            | Continues a paused process.                |
| SIGTERM | Graceful shutdown | Allows process cleanup before exit.        |
| SIGKILL | Forceful kill     | Immediately terminates; cannot be trapped. |

```
# Pause Apache httpd
kill -SIGSTOP 11663


# Resume it
kill -SIGCONT $(pgrep httpd)


# Graceful shutdown
kill -SIGTERM $(pgrep httpd)


# Forceful kill
kill -SIGKILL $(pgrep httpd)
# shorthand
kill -9 $(pgrep httpd)
```

> [!important]
> **Note**
>
> `SIGTERM` is the preferred way to stop a process because it allows cleanup. `SIGKILL` should be used only if the process does not terminate gracefully.

---

## 2\. Docker Container Equivalents

Docker uses similar primitives at the container level. The table below shows the mappings:

| Action | Linux Signal      | Docker Command                    |
| ------ | ----------------- | --------------------------------- |
| Pause  | SIGSTOP/SIGCONT   | `docker pause` / `docker unpause` |
| Stop   | SIGTERM → SIGKILL | `docker stop`                     |
| Kill   | SIGKILL           | `docker kill --signal=SIGKILL`    |
| Remove | —                 | `docker rm`                       |

### 2.1 Running an HTTPD Container

```
docker run --name web httpd
```

### 2.2 Pause and Resume

```
docker pause web
docker unpause web
```

### 2.3 Stop (SIGTERM then SIGKILL)

```
docker stop web
```

Docker sends `SIGTERM`, waits the default 10 seconds, then sends `SIGKILL` if the container is still running.

---

## 3\. Sending Custom Signals

You can target any signal to a container’s main process:

```
# Send SIGKILL by name
docker kill --signal=SIGKILL web


# Or by number
docker kill --signal=9 web
```

---

## 4\. Removing a Container

Containers must be stopped before removal:

```
docker stop web
docker rm web
```

Attempting to remove a running container yields an error:

```
$ docker rm web
Error response from daemon:
You cannot remove a running container ... Stop the container before attempting removal or use --force
```

---

## 5\. Batch Stopping and Removing

When managing multiple containers, leverage `docker ps -q` and `docker ps -aq`:

```
# Stop all running containers
docker stop $(docker ps -q)


# Remove all containers (running & exited)
docker rm $(docker ps -aq)
```

---

## 6\. Pruning Stopped Containers

To delete **all stopped** containers and free disk space:

```
docker container prune
```

> [!important]
> **Warning**
>
> `docker container prune` permanently deletes **all** stopped containers. There is no undoing this action.

---

## 7\. Automatic Cleanup with --rm

For ephemeral containers, use `--rm` to remove them automatically after exit:

```
docker run --rm ubuntu expr 4 + 5
# Output: 9
```

This is ideal for one-off tasks, CI jobs, or simple shell commands.

---

## Links and References

- [Docker CLI Commands](https://docs.docker.com/engine/reference/commandline/cli/)
- [Docker Pause Documentation](https://docs.docker.com/engine/reference/commandline/pause/)
- [Linux Signals](https://man7.org/linux/man-pages/man7/signal.7.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/871494af-49f8-42e9-95e9-cb0df80c2b21/lesson/66fe45cb-0d58-4f47-a003-4bf944fc38db)**
>
> Watch video content
