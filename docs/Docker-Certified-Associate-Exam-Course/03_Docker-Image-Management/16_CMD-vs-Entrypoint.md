# CMD vs Entrypoint - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Image-Management/CMD-vs-Entrypoint)

---

## Table of Contents

- CMD vs Entrypoint
  - Why Containers Exit Immediately
  - Examining Official Images
  - The Default Ubuntu Container Runs Bash
  - Overriding CMD at Runtime
  - Making the Change Permanent with CMD
  - ENTRYPOINT vs CMD
  - Combining ENTRYPOINT and CMD
  - Overriding ENTRYPOINT
  - Links and References
  - Watch Video
    - Nginx Dockerfile Excerpt
    - MySQL Dockerfile Excerpt
    - Shell Form vs Exec Form
    - Quick Comparison

---

## Content

Docker Certified Associate Exam Course

Docker Image Management

# CMD vs Entrypoint

In this guide, we’ll explore how Docker uses the `CMD` and `ENTRYPOINT` instructions to define the default process of a container. You’ll learn how to override or extend these defaults at runtime and bake permanent changes into your images.

## Why Containers Exit Immediately

When you run a container without specifying a command, Docker launches the default process defined in the image’s Dockerfile. If that process ends, the container exits:

```
docker run ubuntu
docker ps              # no running containers
docker ps -a           # shows the new container in exited state
```

Unlike virtual machines, containers are lightweight and designed to run a single task—such as a web server, database, or script. When that main process completes or fails, the container stops.

> [!important]
> **Note**
>
> A container only runs as long as its main process is alive. Defining a long-running service or shell will keep it running.

## Examining Official Images

Popular Docker images set up their primary service using `CMD` or `ENTRYPOINT`. Let’s look at two examples:

### Nginx Dockerfile Excerpt

```
# Install Nginx.
RUN \
    add-apt-repository -y ppa:nginx/stable && \
    apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/* && \
    echo "\ndaemon off;" >> /etc/nginx/nginx.conf && \
    chown -R www-data:www-data /var/lib/nginx


# Define mountable directories.
VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs"]


# Define working directory.
WORKDIR /etc/nginx


# Define default command.
CMD ["nginx"]
```

### MySQL Dockerfile Excerpt

```
# Install server and dependencies
RUN rpmkeys --import https://repo.mysql.com/RPM-GPG-KEY-mysql \
    && yum install -y $MYSQL_SERVER_PACKAGE_URL $MYSQL_SHELL_PACKAGE_URL libpwquality \
    && yum clean all \
    && mkdir /docker-entrypoint-initdb.d


VOLUME /var/lib/mysql


COPY docker-entrypoint.sh /entrypoint.sh
COPY healthcheck.sh /healthcheck.sh


# Define entrypoint script.
ENTRYPOINT ["/entrypoint.sh"]


# Healthcheck.
HEALTHCHECK CMD /healthcheck.sh


EXPOSE 3306 33060


# Default command to start the server.
CMD ["mysqld"]
```

## The Default Ubuntu Container Runs Bash

The official Ubuntu image uses `bash` as its default command. Without an interactive TTY, Bash exits immediately:

```
FROM ubuntu:14.04


RUN \
    sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list && \
    apt-get update && \
    apt-get -y upgrade && \
    apt-get install -y build-essential software-properties-common \
                       byobu curl git htop man unzip vim wget && \
    rm -rf /var/lib/apt/lists/*


ADD root/.bashrc /root/.bashrc
ADD root/.gitconfig /root/.gitconfig
ADD root/.scripts /root/.scripts


ENV HOME /root
WORKDIR /root


CMD ["bash"]
```

Running `docker run ubuntu` without `-t` gives Bash no TTY, so it exits immediately—causing the container to stop.

## Overriding CMD at Runtime

You can override the default `CMD` by appending your own command in `docker run`:

```
docker run ubuntu sleep 5
```

This runs `sleep 5`, keeps the container alive for 5 seconds, then exits.

## Making the Change Permanent with CMD

To bake a default command into your image, declare a new `CMD` in your Dockerfile:

```
FROM ubuntu
CMD ["sleep", "5"]
```

Build and run:

```
docker build -t ubuntu-sleeper .
docker run ubuntu-sleeper    # sleeps 5 seconds and exits
```

### Shell Form vs Exec Form

CMD can use shell form:

```
CMD sleep 5
```

or exec form (JSON array):

```
CMD ["sleep", "5"]
```

With exec form, Docker does not invoke a shell, and the first element must be the executable.

## ENTRYPOINT vs CMD

Use `ENTRYPOINT` to fix the executable but allow arguments to vary:

```
FROM ubuntu
ENTRYPOINT ["sleep"]
```

Then:

```
docker run ubuntu-sleeper 10    # runs: sleep 10
```

With only `CMD`, any arguments passed to `docker run` replace the entire command line.

> [!important]
> **Note**
>
> `ENTRYPOINT` locks in your executable. Combine it with `CMD` to set default parameters.

## Combining ENTRYPOINT and CMD

To specify both a fixed executable and default arguments:

```
FROM ubuntu
ENTRYPOINT ["sleep"]
CMD ["5"]
```

- `docker run ubuntu-sleeper` runs `sleep 5`
- `docker run ubuntu-sleeper 10` runs `sleep 10`

> [!important]
> **Warning**
>
> Always use the JSON array form for both `ENTRYPOINT` and `CMD` when combining them. This ensures proper argument handling.

### Quick Comparison

| Instruction | Purpose                        | Override Behavior                     |
| ----------- | ------------------------------ | ------------------------------------- |
| CMD         | Default command or parameters  | Replaced by arguments on `docker run` |
| ENTRYPOINT  | Fixed executable for the image | Overridable with `--entrypoint` flag  |

## Overriding ENTRYPOINT

You can also override `ENTRYPOINT` at runtime:

```
docker run --entrypoint sleep2.0 ubuntu-sleeper 10
```

This runs `sleep2.0 10` instead of the original `sleep`.

## Links and References

- [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
- [docker run reference](https://docs.docker.com/engine/reference/commandline/run/)
- [Docker Official Images](https://hub.docker.com/search?q=&type=image)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/f2e605a0-1ea7-434b-a139-0db000b0a250/lesson/1e66d7ac-82f7-4c2f-bb21-7bf40934fed5)**
>
> Watch video content
