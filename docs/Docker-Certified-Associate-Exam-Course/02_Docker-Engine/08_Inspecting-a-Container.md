# Inspecting a Container - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine/Inspecting-a-Container)

---

## Table of Contents

- Inspecting a Container
  - 1. List Running Containers
  - 2. Inspect Container Details
  - 3. Monitor Resource Usage
  - 4. List Processes Inside a Container
  - 5. Fetch and Stream Container Logs
  - 6. Stream Docker Events
  - Summary of Inspection Commands
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Engine

# Inspecting a Container

In this guide, you’ll learn how to explore and troubleshoot Docker containers by using built-in inspection commands. We’ll cover:

- Listing containers
- Retrieving detailed JSON metadata
- Monitoring live resource usage
- Viewing in-container processes
- Fetching and streaming logs
- Streaming Docker system events

---

## 1\. List Running Containers

Before diving deeper, get a quick overview of containers on your host:

```
docker container ls
```

You can extend this with flags:

| Command                        | Description                         |
| ------------------------------ | ----------------------------------- |
| `docker container ls`          | Show running containers             |
| `docker container ls -a`       | Include stopped containers          |
| `docker container ls --filter` | Filter by status, name, label, etc. |

---

## 2\. Inspect Container Details

To view in-depth information—configuration, network settings, volumes—use:

```
docker container inspect <container_name_or_ID>
```

This outputs a JSON array. Example:

```
[
  {
    "Id": "59aa5eacd88c42970754cd6005ce315944a2efcd32288df998b29267ae54c152",
    "Created": "2020-01-14T13:23:01.225868339Z",
    "Path": "/bin/bash",
    "Args": [],
    "State": {
      "Status": "running",
      "Running": true,
      "Paused": false,
      "Restarting": false,
      "IPAddress": "172.17.0.5",
      "IPPrefixLen": 16,
      "MacAddress": "02:42:ac:11:00:05"
    }
  }
]
```

| JSON Field | Description                                       |
| ---------- | ------------------------------------------------- |
| `Id`       | Unique container identifier                       |
| `Created`  | Timestamp when the container was instantiated     |
| `Path`     | Entrypoint command executed in the container      |
| `Args`     | Arguments passed to the entrypoint                |
| `State`    | Current runtime status and networking information |

> [!important]
> **Note**
>
> Use `-f json` to pipe this output into `jq` or other JSON parsers for selective querying.

---

## 3\. Monitor Resource Usage

Docker can stream real-time metrics—CPU, memory, network I/O, block I/O—across all running containers:

```
docker container stats
```

Sample output:

```
CONTAINER ID   NAME           CPU %     MEM USAGE / LIMIT   MEM %   NET I/O        BLOCK I/O
59aa5eacd88c   webapp         50.00%    400KiB / 989.4MiB   0.04%   656B / 0B      0B / 0B
```

> [!important]
> **Note**
>
> The `stats` command runs continuously. Press <kbd>Ctrl+C</kbd> to stop the stream.

---

## 4\. List Processes Inside a Container

Identify which processes are consuming resources within a specific container:

```
docker container top webapp
```

Example:

```
UID     PID    PPID  C STIME TTY TIME     CMD
root    17001  16985 0 13:23 ?   00:00:00 stress
```

This shows the `stress` process (host PID 17001) running inside `webapp`.

---

## 5\. Fetch and Stream Container Logs

To retrieve application logs:

```
docker container logs <container_name_or_ID>
```

Follow logs in real time with:

```
docker container logs -f <container_name_or_ID>
```

> [!important]
> **Warning**
>
> If your logs are large, consider limiting output with options like `--since` or `--tail` to avoid overwhelming your terminal.

---

## 6\. Stream Docker Events

Docker records events for containers, networks, volumes, and more. To see recent events—for example, within the last hour—run:

```
docker system events --since 60m
```

Sample output:

```
2020-01-14T18:30:30Z network connect ... (container=68649c8b..., name=bridge)
2020-01-14T18:30:30Z container start ... (image=ubuntu, name=casethree)
```

All resource lifecycle events can be retrieved using `docker system events`.

---

## Summary of Inspection Commands

| Command                            | Purpose                                    |
| ---------------------------------- | ------------------------------------------ |
| `docker container ls`              | List active containers                     |
| `docker container inspect <id>`    | Show detailed JSON metadata                |
| `docker container stats`           | Stream live resource usage                 |
| `docker container top <name>`      | List processes inside the container        |
| `docker container logs <id>`       | Retrieve container logs                    |
| `docker container logs -f <id>`    | Follow logs in real time                   |
| `docker system events --since 60m` | Stream Docker engine events from last hour |

---

## Links and References

- [Docker Inspect Documentation](https://docs.docker.com/engine/reference/commandline/inspect/)
- [Docker Stats Documentation](https://docs.docker.com/engine/reference/commandline/stats/)
- [Docker Logs Documentation](https://docs.docker.com/engine/reference/commandline/logs/)
- [Docker Events Documentation](https://docs.docker.com/engine/reference/commandline/events/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/871494af-49f8-42e9-95e9-cb0df80c2b21/lesson/292ab898-d1dd-4c2f-ae4f-cee3df59bf1c)**
>
> Watch video content
