# Linux as a Virtualization Guest Containers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/Linux-Installation-and-Package-Management/Linux-as-a-Virtualization-Guest-Containers)

---

## Table of Contents

- Linux as a Virtualization Guest Containers
  - Why Use Containers?
  - Installing Podman for Docker Compatibility
  - Searching for Docker Images
  - Pulling Docker Images
  - Managing Docker Images
  - Running Containers with Docker
  - Naming, Port Mapping, and Networking
  - Common Docker Commands
  - Getting Help
  - Links and References
  - Watch Video
    - Configure the Default Registry
    - Suppress the Podman-Docker Warning
    - Foreground Mode
    - Detached Mode
    - Listing Containers
    - Stop and Remove
    - Testing Connectivity

---

## Content

Linux Professional Institute LPIC-1 Exam 101

Linux Installation and Package Management

# Linux as a Virtualization Guest Containers

Hello and welcome to our hands-on guide for Docker container management on Linux. In this tutorial, you’ll learn how to install Podman (a Docker-compatible runtime), pull and manage Docker images, and run containers in various modes. Let’s dive in!

## Why Use Containers?

Containers package an application’s binaries, libraries, configuration, and data into a single, portable image.

- Manual setups scatter configuration files, data directories, and logs across the filesystem, making migrations tedious.
- A Docker image encapsulates everything. Copy it to a new host and “just work.”

Containers give you:

- Consistent environments across development, staging, and production
- Rapid provisioning and scaling
- Isolation without the overhead of full virtual machines

## Installing Podman for Docker Compatibility

CentOS Stream 8 does not include Docker by default. Instead, install Podman with a Docker‐CLI wrapper:

```
sudo dnf install podman
```

This pulls in `podman-docker`, so you can use familiar `docker` commands backed by Podman.

> [!important]
> **Note**
>
> Podman runs containers rootlessly by default, enhancing security.
> You do not need a daemon—each container is managed as a separate process.

### Configure the Default Registry

To ensure unqualified pulls (e.g., `docker pull nginx`) only search Docker Hub:

```
sudo vim /etc/containers/registries.conf
```

Comment out the existing entries and replace with:

```
# unqualified-search-registries = ["registry.fedoraproject.org", "registry.access.redhat.com", "registry.centos.org", "docker.io"]
unqualified-search-registries = ["docker.io"]
```

Save and exit. Podman now defaults to Docker Hub for image pulls.

### Suppress the Podman-Docker Warning

Podman prints a one-time notice when emulating Docker. Disable it:

```
sudo touch /etc/containers/no-docker
```

## Searching for Docker Images

List all high-level Docker commands:

```
docker help
```

Search for the `nginx` image:

```
docker search nginx | head -n 10
```

Sample output:

```
NAME                               DESCRIPTION                                         STARS     OFFICIAL   AUTOMATED
nginx                              Official build of NGINX.                            19719     [OK]
rancher/nginx-conf                 Nginx configuration for Rancher                      12
bitnami/nginx                      Bitnami Docker Image for NGINX                      115
...
```

Choose the official `[OK]` image for stability and support.

## Pulling Docker Images

Pull the latest NGINX image:

```
# Fully qualified
docker pull docker.io/library/nginx:latest


# Or shorthand
docker pull nginx
```

Expected output:

```
Trying to pull docker.io/library/nginx:latest...
Getting image source signatures
Copying blob c4ffe9532b5f done
Copying config 12766a6745 done
Writing manifest to image destination
Storing signatures
12766a6745eea133de...d4bc72b417c123b15619
```

## Managing Docker Images

List all local images:

```
docker images
```

Example:

```
REPOSITORY          TAG       IMAGE ID       CREATED         SIZE
nginx               latest    12766a6745ee   2 days ago      146 MB
```

Pull, remove, and force-delete images:

```
# Pull a specific tag
docker pull nginx:1.20.2


# Remove by tag
docker rmi nginx:1.20.2


# Remove by image ID (prefix is fine if unambiguous)
docker rmi 8f34c303855f


# Force remove images and dependent containers
docker rmi --force nginx
```

> [!important]
> **Warning**
>
> Forcing image removal will also delete any containers based on that image.
> Be sure you no longer need those containers before running `docker rmi --force`.

## Running Containers with Docker

### Foreground Mode

Run NGINX in the foreground to view logs live:

```
docker run nginx
```

You’ll see:

```
/docker-entrypoint.sh: Configuration complete; ready for start up
2022/03/30 08:58:17 [notice] 1#1: start worker process 32
...
```

Press **Ctrl+C** to stop and exit (container stops as well).

### Detached Mode

Run NGINX in the background:

```
docker run -d nginx
```

The command returns a long container ID:

```
7953475436b958ea43ee1553bd905ae722f8f69c874ad5854f0454ea4e62d0b
```

### Listing Containers

```
# Only running
docker ps


# All containers (running & stopped)
docker ps --all
# or
docker container ls --all
```

Sample running container:

```
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS     NAMES
92a87f978de3   nginx     "nginx -g 'daemon of…"   30 seconds ago  Up 28 seconds             happy_morse
```

### Stop and Remove

```
# Stop a running container
docker stop happy_morse


# Remove a stopped container
docker rm happy_morse


# Combine stop + remove
docker rm --force happy_morse
```

## Naming, Port Mapping, and Networking

By default Docker assigns random names. Customize names and publish ports:

```
docker run -d \
  --name mywebserver \
  -p 8080:80 \
  nginx
```

- `--name mywebserver`: Assigns a friendly name
- `-p 8080:80` : Maps host port 8080 to container port 80

### Testing Connectivity

Use Netcat to verify HTTP access:

```
nc localhost 8080
GET /
```

Press **Enter** twice. You should see:

```
<html>
<head><title>Welcome to nginx!</title></head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and working.</p>
...
</body>
</html>
```

> [!important]
> **Note**
>
> To map host port 80 (privileged), run as root:
>
> ```
> sudo docker run -d -p 80:80 --name mywebserver nginx
> ```

## Common Docker Commands

| Command                | Description                       | Example                               |
| ---------------------- | --------------------------------- | ------------------------------------- |
| `docker pull <image>`  | Download an image from a registry | `docker pull nginx:latest`            |
| `docker images`        | List local images                 | `docker images`                       |
| `docker rmi <image>`   | Remove one or more images         | `docker rmi nginx:1.20.2`             |
| `docker run [options]` | Create and start a container      | `docker run -d --name web nginx`      |
| `docker ps [--all]`    | List running (or all) containers  | `docker ps --all`                     |
| \\`docker stop <name   | id>\\`                            | Stop a running container              |
| \\`docker rm <name     | id>\\`                            | Remove one or more stopped containers |
| `docker <cmd> --help`  | Show help for any Docker command  | `docker run --help`                   |

## Getting Help

Every Docker command supports `--help`. For example:

```
docker run --help
docker rm --help
```

Use the help flag to explore options, flags, and examples.

---

## Links and References

- [Docker Documentation](https://docs.docker.com/)
- [Podman Project](https://podman.io/)
- [Docker Hub](https://hub.docker.com/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/78ca0fa8-2083-408a-bf8a-2775b09fbf1d/lesson/a44e2a00-f21e-41d2-b33d-4a45ef05d395)**
>
> Watch video content
