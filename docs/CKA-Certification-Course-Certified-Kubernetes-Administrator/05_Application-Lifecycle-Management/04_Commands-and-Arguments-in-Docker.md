# Commands and Arguments in Docker - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Application-Lifecycle-Management/Commands-and-Arguments-in-Docker)

---

## Table of Contents

- Commands and Arguments in Docker
  - Understanding Container Commands
  - Default Commands in Docker Images
  - Overriding the Default Command
  - Configuring ENTRYPOINT for Runtime Arguments
  - Overriding ENTRYPOINT at Runtime
  - Conclusion
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Application Lifecycle Management

# Commands and Arguments in Docker

Hello and welcome to this comprehensive lesson on Docker commands, arguments, and entry points. My name is Mumshad Mannambeth, and in this session, we will dive into how containers run processes and how these concepts later translate into pod definitions in Kubernetes. Although these topics are often overlooked in certification curricula, understanding them is essential for mastering containerization.

## Understanding Container Commands

When you run a Docker container using the Ubuntu image, as shown below:

```
docker run ubuntu
```

Docker launches a container based on the Ubuntu image, which starts and immediately exits since it runs a default process that completes quickly. If you inspect the currently running containers:

```
docker ps
```

you will notice that the container is absent because it has already exited. However, viewing all containers—including those that have stopped—with:

```
docker ps -a
```

reveals that the container is in an "exited" state:

```
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                     PORTS
45aacca36850        ubuntu              "/bin/bash"         43 seconds ago      Exited (0) 41 seconds ago
```

This behavior is different from traditional virtual machines. Containers are optimized to run a single task or process, such as hosting a web server, application server, database, or performing a specific computation. Once the task completes, the container stops because its lifecycle is tied directly to the process running inside it.

## Default Commands in Docker Images

Each Docker image contains instructions that define the process to run when a container starts. Many popular images, such as [nginx](https://www.nginx.com/) or [MySQL](https://www.mysql.com/), include a CMD instruction in their Dockerfile that sets the default command. For instance, the nginx image typically has the command `nginx`, and the MySQL image uses `mysqld`.

Consider this Dockerfile snippet for installing and configuring nginx:

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
VOLUME ["/etc/nginx/sites-enabled", "/etc/nginx/certs", "/etc/nginx/conf"]


# Define working directory.
WORKDIR /etc/nginx


# Define default command.
CMD ["nginx"]
```

Now, let's examine the Ubuntu image's Dockerfile. Notice that in this example, the default command is set to Bash:

```
# Pull base image.
FROM ubuntu:14.04


# Install necessary packages.
RUN \
    sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list && \
    apt-get update && \
    apt-get -y upgrade && \
    apt-get install -y build-essential software-properties-common byobu curl git htop man unzip vim wget && \
    rm -rf /var/lib/apt/lists/*


# Add configuration files.
ADD root/.bashrc /root/.bashrc
ADD root/.gitconfig /root/.gitconfig
ADD root/.scripts /root/.scripts


# Set environment variables.
ENV HOME /root


# Define working directory.
WORKDIR /root


# Define default command.
CMD ["bash"]
```

> [!important]
> **Note**
>
> Remember: Bash is a shell, not a persistent server process. When the Ubuntu container is launched without an attached terminal, the shell exits immediately.

## Overriding the Default Command

To override the default command for a container, you can append a command to the end of the `docker run` command. For example, this command instructs the container to run `sleep 5`:

```
docker run ubuntu sleep 5
```

In this scenario, the container executes `sleep 5`, waits for five seconds, and then exits.

If you want to permanently change the behavior of the image so that it always runs `sleep 5`, you must create a new image based on Ubuntu and specify the new default command in its Dockerfile. You can specify the command in either of two formats:

1.  Shell form:

    ```
    FROM ubuntu
    CMD sleep 5
    ```

2.  JSON array format:

    ```
    FROM ubuntu
    CMD ["sleep", "5"]
    ```

Build the new image with:

```
docker build -t ubuntu-sleeper .
```

Then run the container using:

```
docker run ubuntu-sleeper
```

By default, this container will sleep for five seconds.

## Configuring ENTRYPOINT for Runtime Arguments

Sometimes, you may want to specify only runtime arguments without changing the default command. In such cases, the ENTRYPOINT instruction is useful. This instruction sets the executable to run when the container starts, and any command-line arguments provided at runtime are appended to it.

Consider the following Dockerfile:

```
FROM ubuntu
ENTRYPOINT ["sleep"]
CMD ["5"]
```

After building and running this image:

```
docker build -t ubuntu-sleeper .
docker run ubuntu-sleeper
```

the container executes `sleep 5` by default. You can override the sleep duration at runtime by specifying a new parameter:

```
docker run ubuntu-sleeper 10
```

This command runs `sleep 10`.

> [!important]
> **Key Difference**
>
> - With CMD alone, runtime arguments replace the default command.
> - With ENTRYPOINT, runtime arguments are appended to the specified executable, allowing you to override just the parameters.

## Overriding ENTRYPOINT at Runtime

At times, you might want to completely override the ENTRYPOINT. For example, if you wish to use a different command (like switching from `sleep` to `sleep2.0`), you can do so using the `--entrypoint` flag in the `docker run` command.

Given the Dockerfile:

```
FROM ubuntu
ENTRYPOINT ["sleep"]
CMD ["5"]
```

Build the image:

```
docker build -t ubuntu-sleeper .
```

Running the container without modifications:

```
docker run ubuntu-sleeper
```

will produce an error because `sleep` expects an operand:

```
docker run ubuntu-sleeper
# Output:
# sleep: missing operand
# Try 'sleep --help' for more information.
```

However, running with a new parameter:

```
docker run ubuntu-sleeper 10
```

executes `sleep 10`.

To override the ENTRYPOINT with a different executable, run:

```
docker run --entrypoint sleep2.0 ubuntu-sleeper 10
```

This command starts the container with `sleep2.0 10` (provided that `sleep2.0` is a valid command).

![The image is a plain white background with no discernible objects or features.](https://kodekloud.com/kk-media/image/upload/v1752869660/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Commands-and-Arguments-in-Docker/frame_190.jpg)

## Conclusion

This lesson explained the inner workings of Docker commands, arguments, and how the ENTRYPOINT instruction allows dynamic parameter passing at runtime. These concepts not only help in managing Docker containers efficiently but also lay the groundwork for understanding how they translate into pod definitions in Kubernetes in subsequent lessons.

Happy Dockering!

For further reading, check out the following resources:

- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Nginx Official Website](https://www.nginx.com/)
- [MySQL Official Website](https://www.mysql.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/2ddcf79b-abb0-4aeb-ad0c-3d54c7b4fc64/lesson/c62a2a06-dffd-4669-b5eb-b98b503e0c0a)**
>
> Watch video content
