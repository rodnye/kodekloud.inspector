# Commands vs Entrypoint - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Training-Course-for-the-Absolute-Beginner/Docker-Images/Commands-vs-Entrypoint)

---

## Table of Contents

- Commands vs Entrypoint
  - Defining the Default Process in a Dockerfile
  - Overriding the Default Command
  - Using ENTRYPOINT with CMD for Flexibility
  - Overriding Entrypoint at Runtime
  - Summary of Docker Commands and Dockerfile Configurations
  - Watch Video
  - Practice Lab
    - Making the Change Permanent
    - Consolidated Dockerfile Example

---

## Content

Docker Training Course for the Absolute Beginner

Docker Images

# Commands vs Entrypoint

In this article, we explore how Docker handles commands, arguments, and entrypoints, and how these affect container behavior. Understanding these differences is crucial for building images that run as expected.

Let's start with a simple example using the Ubuntu image. Consider the following commands:

```
docker run ubuntu
docker ps
# (No running container will appear.)
docker ps -a
# (The container will be shown in an "exited" state.)
```

When you run these commands, Docker creates a container from the Ubuntu image and launches it. However, because the container’s default process (typically `bash`) expects a terminal, it exits immediately when no terminal is attached. Unlike virtual machines, containers are designed to run a specific task or process (e.g., hosting a web server, application server, or database). Once that task completes or the process crashes, the container stops running.

> [!important]
> **Key Insight**
>
> Containers are meant to run specific tasks rather than continuously running processes. The default behavior of many images reflects this design philosophy.

## Defining the Default Process in a Dockerfile

Most Docker images use the CMD instruction in their Dockerfile to specify the process that should run inside the container. For example:

- **Nginx image:** Uses `CMD ["nginx"]` to start the Nginx server.
- **MySQL image:** Uses `CMD ["mysqld"]` to launch the MySQL daemon.

Consider this excerpt from a Dockerfile that installs both Nginx and MySQL:

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


# Install MySQL server.
RUN rpmkeys --import https://repo.mysql.com/RPM-GPG-KEY-mysql \
    && yum install -y $MYSQL_SERVER_PACKAGE_URL $MYSQL_SHELL_PACKAGE_URL libpwquality \
    && yum clean all \
    && mkdir /docker-entrypoint-initdb.d


VOLUME /var/lib/mysql


COPY docker-entrypoint.sh /entrypoint.sh
COPY healthcheck.sh /healthcheck.sh
ENTRYPOINT ["/entrypoint.sh"]
HEALTHCHECK CMD /healthcheck.sh
EXPOSE 3306 33060
CMD ["mysqld"]
```

The Ubuntu image Dockerfile is structured similarly:

```
# Pull base image.
FROM ubuntu:14.04


# Install dependencies.
RUN \
    sed -i 's/# \(.*multiverse\)/\1/g' /etc/apt/sources.list && \
    apt-get update && \
    apt-get -y upgrade && \
    apt-get install -y build-essential software-properties-common && \
    apt-get install -y byobu curl git htop man unzip vim wget && \
    rm -rf /var/lib/apt/lists/*


# Add custom files.
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

In this Ubuntu example, Docker launches `bash` as the default command. However, since Docker does not attach a terminal by default, the shell exits immediately, and the container stops.

## Overriding the Default Command

You can override the default CMD by appending a new command to the `docker run` command. For example, running the Ubuntu container with the `sleep` command:

```
docker run ubuntu sleep 5
```

Here, the container runs the `sleep` program for 5 seconds before exiting.

### Making the Change Permanent

If you prefer that your image always executes the `sleep` command when started, you can create a new image based on Ubuntu with an updated CMD:

```
FROM ubuntu
CMD ["sleep", "5"]
```

After building the image:

```
docker build -t ubuntu-sleeper .
docker run ubuntu-sleeper
```

The container runs `sleep 5` each time it starts. However, if you want the flexibility to change the sleep duration without rebranding the image, you can override the CMD at runtime:

```
docker run ubuntu-sleeper sleep 10
```

While this works, the image name (`ubuntu-sleeper`) might misleadingly imply that the container always runs `sleep`.

## Using ENTRYPOINT with CMD for Flexibility

The ENTRYPOINT instruction allows you to fix the executable while still providing flexibility for command-line arguments to override or extend the CMD settings. With ENTRYPOINT, any command-line arguments are appended to the entrypoint command.

For example:

```
FROM ubuntu
ENTRYPOINT ["sleep"]
CMD ["5"]
```

When you run the container without additional arguments:

```
docker run ubuntu-sleeper
```

The container executes `sleep 5`. If you run:

```
docker run ubuntu-sleeper 10
```

Docker executes `sleep 10`, replacing the default operand defined in CMD with the provided one.

> [!important]
> **Important**
>
> If you define only ENTRYPOINT without a default CMD, the container may fail to execute properly if no command-line arguments are provided. For instance, removing CMD can result in errors like "sleep: missing operand".

## Overriding Entrypoint at Runtime

If you need to change the entrypoint entirely—say, switching from `sleep` to a different executable like `sleep2.0`—you can override it at runtime using the `--entrypoint` option:

```
docker run --entrypoint sleep2.0 ubuntu-sleeper 10
```

In this case, the container executes `sleep2.0 10`.

## Summary of Docker Commands and Dockerfile Configurations

Below is a summary table of key commands and their effects:

| Command/Configuration              | Description                                                                   | Example                                              |
| ---------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------- |
| Default CMD in Ubuntu container    | Executes `bash` but exits when no terminal is attached                        | `docker run ubuntu`                                  |
| Overridden CMD at runtime          | Replaces default command with a specified one (e.g., `sleep 5`)               | `docker run ubuntu sleep 5`                          |
| Permanent CMD update in Dockerfile | Builds an image with a permanent command change                               | `CMD ["sleep", "5"]`                                 |
| Using ENTRYPOINT with CMD          | Fixes the executable while allowing dynamic command-line argument replacement | `ENTRYPOINT ["sleep"]` & `CMD ["5"]`                 |
| Override ENTRYPOINT at runtime     | Replaces the image's fixed executable with an alternative one                 | `docker run --entrypoint sleep2.0 ubuntu-sleeper 10` |

### Consolidated Dockerfile Example

Below is the consolidated Dockerfile example using both ENTRYPOINT and CMD:

```
# Dockerfile for Ubuntu sleeper image with ENTRYPOINT and CMD
FROM ubuntu
ENTRYPOINT ["sleep"]
CMD ["5"]
```

After building the image:

```
docker build -t ubuntu-sleeper .
```

- Running without additional parameters:

  ```
  docker run ubuntu-sleeper
  ```

  Executes the command: `sleep 5`

- Overriding the sleep duration:

  ```
  docker run ubuntu-sleeper 10
  ```

  Executes the command: `sleep 10`

- Overriding the entrypoint and the sleep duration:

  ```
  docker run --entrypoint sleep2.0 ubuntu-sleeper 10
  ```

  Executes the command: `sleep2.0 10`

That concludes our exploration of Docker's CMD versus ENTRYPOINT. Happy containerizing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-training-course-for-the-absolute-beginner/module/26faab43-a0ea-4355-9a94-f0bac957b507/lesson/b9bc7112-845b-4706-ab56-d47cb1435fbd)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/docker-training-course-for-the-absolute-beginner/module/26faab43-a0ea-4355-9a94-f0bac957b507/lesson/d3a90d5f-f354-4574-b8cc-97935f3374e8)**
>
> Practice lab
