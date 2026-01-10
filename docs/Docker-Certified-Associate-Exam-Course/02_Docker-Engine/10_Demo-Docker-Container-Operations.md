# Demo Docker Container Operations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine/Demo-Docker-Container-Operations)

---

## Table of Contents

- Demo Docker Container Operations
  - 1. Creating and Starting a Container
  - 2. Listing Options
  - 3. Running Containers Interactively
  - 4. Executing Commands in Running Containers
  - 5. Attaching to a Container
  - 6. Stopping and Removing Containers
  - 7. Detached Mode and Naming
  - 8. Inspecting Container Details
  - 9. Monitoring Containers
  - Conclusion
  - Watch Video
    - Table: docker container ls Field Descriptions
    - Detaching Without Stopping
    - 9.1 Resource Usage
    - 9.2 Process List
    - 9.3 Logs

---

## Content

Docker Certified Associate Exam Course

Docker Engine

# Demo Docker Container Operations

In this tutorial, we’ll cover essential Docker container lifecycle commands using the Docker CLI. You’ll learn how to create, start, list, interact with, monitor, and clean up containers.

## 1\. Creating and Starting a Container

1.  **Create a container** from the official `httpd` image.  
    If the image isn’t available locally, Docker pulls it from Docker Hub.

    ```
    docker container create httpd
    ```

2.  **List containers** (none are running yet):

    ```
    docker container ls
    ```

3.  **Include stopped containers** with `-a`:

    ```
    docker container ls -a
    ```

4.  **Start the container** by its CONTAINER ID:

    ```
    docker container start d52fad69ea76
    ```

5.  **Verify it’s running**:

    ```
    docker container ls
    ```

### Table: `docker container ls` Field Descriptions

| Field        | Description                     |
| ------------ | ------------------------------- |
| CONTAINER ID | Short 12-character container ID |
| IMAGE        | Name of the image               |
| COMMAND      | Entrypoint command              |
| CREATED      | Timestamp when created          |
| STATUS       | Current state and uptime        |
| PORTS        | Exposed ports                   |
| NAMES        | Auto-generated container name   |

## 2\. Listing Options

Use different flags with `docker container ls` to customize output:

| Flag  | Description                                        |
| ----- | -------------------------------------------------- |
| \\-a  | Show all containers (running and stopped)          |
| \\-l  | Show the latest created container                  |
| \\-q  | Only display numeric IDs of running containers     |
| \\-aq | Display numeric IDs of all containers (all states) |

Example—list only IDs of running containers:

```
docker container ls -q
```

## 3\. Running Containers Interactively

Combine create and start with `run`:

```
docker container run -it ubuntu
```

If `ubuntu:latest` isn’t local, you’ll see the pull progress, then a shell prompt:

```
root@0afdaf794887:/# ps -ef
UID        PID PPID  C STIME TTY          TIME CMD
root         1     0  0 06:47 pts/0    00:00:00 /bin/bash
root         9     1  0 06:48 pts/0    00:00:00 ps -ef
root@0afdaf794887:/# exit
```

Exiting the shell stops the container:

```
docker container ls -l
```

### Detaching Without Stopping

To leave a container running and return to the host shell, press `Ctrl+P` then `Ctrl+Q`:

```
docker container run -it ubuntu
# Press Ctrl+P, Ctrl+Q
docker container ls
```

> [!important]
> **Note**
>
> Detaching this way leaves the container running in the background.

## 4\. Executing Commands in Running Containers

Run additional commands inside an active container using `exec`:

```
docker container exec -it 9fe83b47dc1f /bin/bash
root@9fe83b47dc1f:/# ps -ef
```

You can even use partial container IDs:

```
docker container exec -it 65 cat /etc/lsb-release
```

## 5\. Attaching to a Container

Use `attach` to connect to the primary process of a running container:

```
docker container attach <container_id>
# then:
exit  # This will stop the container
```

> [!important]
> **Warning**
>
> Exiting an attached session (`exit`) will terminate the container’s main process.

## 6\. Stopping and Removing Containers

- **Stop** a running container:

  ```
  docker container stop 14fc5c1661f9
  ```

- **Remove** a stopped container:

  ```
  docker container rm 14fc5c1661f9
  ```

- **Prune** all stopped containers:

  ```
  docker container prune
  ```

> [!important]
> **Warning**
>
> `docker container prune` removes _all_ stopped containers. Use with caution.

Or combine stop and remove for _all_ containers:

```
docker container stop $(docker container ls -q)
docker container rm $(docker container ls -aq)
```

## 7\. Detached Mode and Naming

Run in detached mode (`-d`) and assign a custom name:

```
docker container run -itd --name=kodekloud ubuntu
```

Rename an existing container:

```
docker container rename kodekloud yogish-codecloud
```

## 8\. Inspecting Container Details

Retrieve full metadata with `inspect`:

```
docker container inspect yogish-codecloud
```

Sample output:

```
[
  {
    "Id": "5c2b2b5fc32f...",
    "Created": "2020-05-04T07:04:13.230760175Z",
    "Path": "/bin/bash",
    "Args": [],
    "State": {
      "Status": "running",
      "Running": true,
      "Paused": false,
      "Restarting": false,
      "OOMKilled": false,
      "Dead": false,
      "Pid": 14776,
      "ExitCode": 0,
      "StartedAt": "2020-05-04T07:04:13.598111123Z",
      "FinishedAt": "0001-01-01T00:00:00Z"
    },
    "Image": "sha256:1d622ef86b1...",
    "Name": "/yogish-codecloud",
    "Driver": "overlay2"
  }
]
```

## 9\. Monitoring Containers

### 9.1 Resource Usage

Display real-time stats:

```
docker container stats
```

### 9.2 Process List

Show host PIDs inside a container:

```
docker container top reverent_hopper
```

### 9.3 Logs

View past logs:

```
docker container logs d52fad69ea76
```

Follow logs live:

```
docker container logs -f d52fad69ea76
```

## Conclusion

You’ve now mastered:

- Creating, starting, and listing containers
- Interactive sessions with `run`, `exec`, and `attach`
- Naming, renaming, and inspecting container details
- Monitoring resource usage and logs
- Cleaning up with `stop`, `rm`, and `prune`

For more commands, see the [Docker CLI reference](https://docs.docker.com/engine/reference/commandline/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/871494af-49f8-42e9-95e9-cb0df80c2b21/lesson/4156c342-a7b3-4703-bc36-f1241c8782f8)**
>
> Watch video content
