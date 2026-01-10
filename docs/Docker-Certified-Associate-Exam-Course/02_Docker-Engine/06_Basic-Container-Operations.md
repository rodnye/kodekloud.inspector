# Basic Container Operations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine/Basic-Container-Operations)

---

## Table of Contents

- Basic Container Operations
  - Table of Contents
  - Quick Syntax Reference
  - Command Syntax Styles
  - Creating a Container
  - Listing Containers
  - Starting a Container
  - Create & Start in One Step
  - Ephemeral Containers
  - Interactive Shells
  - Exiting Containers
  - Naming Containers
  - Detached Mode
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Engine

# Basic Container Operations

Master the essentials of Docker CLI to create, manage, and troubleshoot containers efficiently. This guide covers key commands, options, and best practices for container operations.

## Table of Contents

- [Quick Syntax Reference](#quick-syntax-reference)
- [Command Syntax Styles](#command-syntax-styles)
- [Creating a Container](#creating-a-container)
- [Listing Containers](#listing-containers)
- [Starting a Container](#starting-a-container)
- [Create & Start in One Step](#create--start-in-one-step)
- [Ephemeral Containers](#ephemeral-containers)
- [Interactive Shells](#interactive-shells)
- [Exiting Containers](#exiting-containers)
- [Naming Containers](#naming-containers)
- [Detached Mode](#detached-mode)
- [Links and References](#links-and-references)

---

## Quick Syntax Reference

Use this general pattern for Docker commands:

```
docker [object] [command] [options] [arguments]
```

Examples:

```
docker image ls
docker container run -it ubuntu
docker image build .
docker container attach <container>
docker container kill <container>
```

---

## Command Syntax Styles

Docker supports both legacy and grouped syntax. We’ll use the **grouped** style throughout this guide.

| Syntax Type   | Example                           |
| ------------- | --------------------------------- |
| Grouped (new) | `docker container run -it ubuntu` |
| Legacy (old)  | `docker run -it ubuntu`           |

---

## Creating a Container

To create (but not start) a container:

```
docker container create httpd
```

Sample output:

```
Unable to find image 'httpd:latest' locally
latest: Pulling from library/httpd
…
Status: Downloaded newer image for httpd:latest
36a391532e10d45f772f2c9430c2cc38dad4b441aa7a1c444d59f6fa3d78c6b6
```

On Linux, Docker stores images and container metadata under `/var/lib/docker/`:

```
ls /var/lib/docker/
# builder  buildkit  containers  image  network  overlay2  plugins  runtimes  swarm  tmp  trust  volumes
```

Each container’s data lives in `containers/<container-ID>/`.

---

## Listing Containers

Use `docker container ls` with options to filter the output:

| Command                   | Description                              |
| ------------------------- | ---------------------------------------- |
| `docker container ls`     | Show running containers                  |
| `docker container ls -a`  | Show all containers (running & stopped)  |
| `docker container ls -l`  | Show the most recently created container |
| `docker container ls -q`  | Display only container IDs (running)     |
| `docker container ls -aq` | Display all container IDs                |

```
docker container ls -a
```

Sample output:

```
CONTAINER ID   IMAGE     COMMAND              CREATED         STATUS                     NAMES
36a391532e10   httpd     "httpd-foreground"   2 minutes ago   Created                    charming_wiles
```

Docker assigns a random human-readable name if you don’t provide one.

---

## Starting a Container

Start an existing container by its ID or name:

```
docker container start 36a391532e10
docker container ls
```

---

## Create & Start in One Step

Pull the image, create, and start the container:

```
docker container run httpd
```

---

## Ephemeral Containers

Some images (like `ubuntu`) don’t run a persistent process:

```
docker container run ubuntu
docker container ls -a
```

Output:

```
CONTAINER ID   IMAGE    COMMAND     CREATED         STATUS                     NAMES
d969ecdb44ea   ubuntu   "/bin/bash" 2 minutes ago   Exited (0) 2 minutes ago   intelligent_almeida
```

Once the primary process exits, the container stops.

---

## Interactive Shells

Keep STDIN open and allocate a pseudo-TTY with `-it`:

```
docker container run -it ubuntu
```

Inside the container:

```
root@6caba272c8f5:/# hostname
6caba272c8f5
```

On the host:

```
docker container ls
```

Shows:

```
CONTAINER ID   IMAGE    COMMAND      CREATED          STATUS              NAMES
6caba272c8f5   ubuntu   "/bin/bash"  About a minute   Up About a minute   quizzical_austin
```

> [!important]
> **Tip**
>
> Always place options (`-i`, `-t`, `-d`, `--name`) **before** the image name. Anything after the image name is interpreted as the container’s command.

---

## Exiting Containers

Running `exit` inside an interactive shell stops the container:

```
docker container run -it ubuntu
root@6caba272c8f5:/# exit
exit
docker container ls -a
```

---

## Naming Containers

Assign a custom name at creation:

```
docker container run -itd --name webapp ubuntu
docker container ls -l
```

Output:

```
CONTAINER ID   IMAGE    COMMAND      CREATED          STATUS             NAMES
59aa5eacd88c   ubuntu   "/bin/bash"  20 seconds ago   Up 19 seconds      webapp
```

Rename an existing container:

```
docker container rename intelligent_almeida webapp2
```

---

## Detached Mode

Run containers in the background with `-d`:

```
docker container run -d httpd
```

Sample output:

```
11cbd7fe7e65a9da453e159ed0fe163592dcc8a7845abc91b8305c78f50ac70
```

To reattach:

```
docker container attach 11cbd7fe7e65
```

A unique ID prefix is sufficient if it’s unambiguous.

---

## Links and References

- [Docker CLI Reference](https://docs.docker.com/engine/reference/commandline/cli/)
- [Docker Container Commands](https://docs.docker.com/engine/reference/commandline/container/)
- [Docker Official Documentation](https://docs.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/871494af-49f8-42e9-95e9-cb0df80c2b21/lesson/f68d9089-8ddb-476a-90ca-4dd7dd9ae6ed)**
>
> Watch video content
