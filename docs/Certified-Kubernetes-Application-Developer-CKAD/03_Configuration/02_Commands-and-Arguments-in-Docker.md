# Commands and Arguments in Docker - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/Configuration/Commands-and-Arguments-in-Docker)

---

## Table of Contents

- Commands and Arguments in Docker
  - Running a Container with an Ubuntu Image
  - Understanding the CMD Instruction in Dockerfiles
  - Overriding the Default Command
  - Using ENTRYPOINT to Combine Commands and Arguments
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

Configuration

# Commands and Arguments in Docker

Welcome to this detailed lesson on Docker commands and arguments. My name is Mumshad Mannambeth, and in this article we will explore how commands work in containers and Docker. Although this topic may not be explicitly featured in certification curriculums, understanding it is crucial since it is often overlooked. We will begin by reviewing container commands with Docker and then translate these concepts to Pods in Kubernetes.

## Running a Container with an Ubuntu Image

Imagine running a Docker container using an Ubuntu image. Executing the commands below creates a container instance that immediately exits:

```
docker run ubuntu
docker ps
docker ps -a
```

The container does not appear in the list of running containers because, unlike virtual machines, containers are designed for specific tasks (such as hosting a web server, application server, or performing computations) and terminate once these tasks complete. Essentially, a container’s life cycle is tied to its main process. For instance, if the web service inside the container stops or crashes, the container will exit.

> [!important]
> **Note**
>
> Containers are ideal for running single processes because they are lightweight and are not intended to persist beyond the execution of their primary task.

## Understanding the CMD Instruction in Dockerfiles

The behavior of a container is defined by its Dockerfile. Many popular Docker images, such as nginx or MySQL, use the CMD instruction to specify the default command that runs when the container starts. For example, the nginx image is configured to launch the nginx process, whereas the MySQL image starts the MySQL server process.

Consider the following Dockerfile excerpt that installs and configures nginx as well as MySQL:

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


# Install server
RUN rpmmkeys --import https://repo.mysql.com/RPM-GPG-KEY-mysql \
    && yum install -y $MYSQL_SERVER_PACKAGE_URL $MYSQL_SHELL_PACKAGE_URL libpqquality \
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

Another common example is a Dockerfile for an Ubuntu image that sets bash as the default command:

```
# Pull base image.
FROM ubuntu:14.04


# Install.
RUN \
    sed -i 's/#\(.*multiverse\)$/\1/' /etc/apt/sources.list && \
    apt-get update && \
    apt-get -y upgrade && \
    apt-get install -y build-essential && \
    apt-get install -y software-properties-common && \
    apt-get install -y byobu curl git htop man unzip vim wget && \
    rm -rf /var/lib/apt/lists/*


# Add files.
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

Because bash is a shell that waits for terminal input, if Docker does not attach a terminal at runtime, the container exits immediately when no input is provided.

## Overriding the Default Command

You can override the default command defined in the Docker image by appending a different command to the Docker run command. For instance, if you want the container to run a sleep command for five seconds instead of starting bash, execute:

```
docker run ubuntu sleep 5
```

This approach temporarily replaces the default CMD from the image. To make a permanent change, create a new Docker image based on the Ubuntu image with a custom CMD. For example:

```
FROM ubuntu
CMD ["sleep", "5"]
```

Build and run your new image with the following commands:

```
docker build -t ubuntu-sleeper .
docker run ubuntu-sleeper
```

The container will now always sleep for five seconds before exiting.

## Using ENTRYPOINT to Combine Commands and Arguments

What if you want to pass a variable argument, such as the number of seconds, when running the container without specifying the command every time? This is where the ENTRYPOINT instruction proves useful.

ENTRYPOINT sets the default executable that runs when the container starts. Any command-line arguments provided at runtime are appended to the ENTRYPOINT. Consider this Dockerfile:

```
FROM ubuntu
ENTRYPOINT ["sleep"]
CMD ["5"]
```

With this configuration:

- Running the container without additional arguments:

  ```
  docker run ubuntu-sleeper
  ```

  Executes the command:

  Command at Startup: sleep 5

- Running the container with an extra argument:

  ```
  docker run ubuntu-sleeper 10
  ```

  Executes the command:

  Command at Startup: sleep 10

> [!important]
> **Warning**
>
> If the necessary argument is missing (for example, if the ENTRYPOINT command expects an argument and none is provided), the container will fail to run and display an error.

To temporarily override the ENTRYPOINT and run a different command (for example, switching from sleep to sleep2.0), you can use the --entrypoint flag:

```
docker run --entrypoint sleep2.0 ubuntu-sleeper 10
```

This command will execute:

Command at Startup: sleep2.0 10

This example clearly illustrates the difference between CMD and ENTRYPOINT. CMD's parameters can be completely overridden by command-line arguments, whereas ENTRYPOINT ensures that its predefined executable is always run, appending any supplied arguments.

---

That concludes our lesson on managing commands and arguments in Docker. By mastering these concepts, you can create more flexible and powerful containerized applications. Happy containerizing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/a2ce8bef-967b-48a9-9f58-253035a96c98/lesson/c11b6336-739d-4891-9e9e-8b46a1986cdd)**
>
> Watch video content
