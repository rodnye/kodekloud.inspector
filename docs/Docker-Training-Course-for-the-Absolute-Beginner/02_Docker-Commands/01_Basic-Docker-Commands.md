# Basic Docker Commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Training-Course-for-the-Absolute-Beginner/Docker-Commands/Basic-Docker-Commands)

---

## Table of Contents

- Basic Docker Commands
  - Running a Container
  - Listing Containers
  - Stopping and Removing Containers
  - Managing Docker Images
  - Running Ubuntu Containers
  - Executing Commands in a Running Container
  - Running a Web Application Container
  - Conclusion
  - Watch Video

---

## Content

Docker Training Course for the Absolute Beginner

Docker Commands

# Basic Docker Commands

In this guide, we explore a range of fundamental Docker commands that are essential for effectively managing containers and images. By understanding these core commands, you can efficiently run, monitor, and manage your Docker environment. At the end of this article, you can test your knowledge with a hands-on quiz.

We'll start by explaining the Docker run command and progressively move through container management commands, image operations, and executing commands within running containers.

## Running a Container

The Docker run command creates and starts a container from a specified image. For example, to start an Nginx container, simply execute:

```
docker run nginx
```

If the Nginx image already exists on your host, Docker immediately starts a new container. However, if the image is not present, Docker will pull it from [Docker Hub](https://hub.docker.com/). When pulling, you might see output similar to the following:

```
docker run nginx
Unable to find image 'nginx:latest' locally
latest: Pulling from library/nginx
fc71811084d0: Already exists
d2e987ca2267: Pull complete
0b760b431b11: Pull complete
Digest: sha256:96fb261b66270b900ea5a2c17a26abbfabe95506e73c3a3c65869a6dbe83223a
Status: Downloaded newer image for nginx:latest
```

Once the image is downloaded, any subsequent run command will use the cached image.

## Listing Containers

You can view running containers using the `docker ps` command. This command provides an overview, including container IDs, image names, statuses, and container names. For instance:

```
docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
796856ac413d        nginx               "nginx -g 'daemon of..." 7 seconds ago       Up 6 seconds        80/tcp              silly_sammet
```

To list all containers, including those that have stopped or exited, add the `-a` flag:

```
docker ps -a
CONTAINER ID        IMAGE               COMMAND                        CREATED             STATUS                        NAMES
796856ac413d        nginx               "nginx -g 'daemon of..."       7 seconds ago       Up 6 seconds                  silly_sammet
cff8ac918a2f        redis               "docker-entrypoint.s..."       6 seconds ago       Exited (0) 3 seconds ago
```

> [!important]
> **Note**
>
> The `docker ps` command is a quick way to get insights into the container statuses, while `-a` reveals a complete list including inactive ones.

## Stopping and Removing Containers

To stop a running container, provide the container ID or name. First, confirm the container details with:

```
docker ps
CONTAINER ID   IMAGE     COMMAND                  CREATED        STATUS        PORTS       NAMES
796856ac413d   nginx     "nginx -g 'daemon of..." 7 seconds ago  Up 6 seconds  80/tcp     silly_sammet
```

Then, stop the container by running:

```
docker stop silly_sammet
```

After stopping, running `docker ps` will show no active containers. To permanently remove a stopped container, use:

```
docker rm silly_sammet
docker ps
```

The removed container will no longer appear in your Docker listings.

## Managing Docker Images

Viewing local Docker images is straightforward with the `docker images` command. This command displays each image along with its size, creation time, and more:

```
docker images
REPOSITORY          TAG       IMAGE ID       CREATED        SIZE
nginx               latest    f68d6e55e065   4 days ago     109MB
redis               latest    4760dc956b2d   15 months ago  107MB
ubuntu              latest    f975c503748    16 months ago  112MB
alpine              latest    3fd9065eaf02   18 months ago  4.14MB
```

To delete an image no longer needed, ensure no container is using it and execute:

```
docker rmi nginx
Untagged: nginx:latest
Untagged: nginx@sha256:96fb261b66270b900ea5a2c17a26abbfabe95506e73c3a3c65869a6dbe83223a
Deleted: sha256:f68d6e55e06520f152403e69d6d0de5c9790a89b4cf99f4626f68146faldc
Deleted: sha256:1b0c768769e2bb66e74a2531437381a78b77feef8ea6fd7e7f4044e1
Deleted: sha256:34138fb6002a180512485fb96f42e86fbd08c6f1a2506b11ff6b945b03f
Deleted: sha256:cf5b3c6798f77b1f78b297b27cfa5b6caa982f04caeb5de7d13c255fd7ale
```

Additionally, if you want to download an image for later use without running a container immediately, use the `docker pull` command:

```
docker pull nginx
Using default tag: latest
latest: Pulling from library/nginx
fc71811084d0: Pull complete
d2e987ca2267: Pull complete
0b760b431b11: Pull complete
Digest: sha256:96fb261b66270b900ea5a2c17a26abbfabe95506e73c3a3c65869a6dbe83223a
Status: Downloaded newer image for nginx:latest
```

## Running Ubuntu Containers

When using the Ubuntu image, simply running:

```
docker run ubuntu
```

will start a container that immediately exits. This occurs because Ubuntu, by default, has no long-running process. Check the container status with:

```
docker ps -a
CONTAINER ID        IMAGE               COMMAND       CREATED             STATUS                      NAMES
45aacca36850        ubuntu              "/bin/bash"   43 seconds ago      Exited (0) 41 seconds ago   <container_name>
```

To keep the container active, instruct it to run a specific command, such as sleeping for a defined duration:

```
docker run ubuntu sleep 5
```

Here, the container runs the sleep command for five seconds before exiting.

## Executing Commands in a Running Container

There may be times when you need to execute a command inside a running container. For instance, if you have a container running Ubuntu with the command `sleep 100`, inspect its details using:

```
docker ps -a
CONTAINER ID        IMAGE               COMMAND       CREATED             STATUS              NAMES
538d037f94a7        ubuntu              "sleep 100"   6 seconds ago       Up 4 seconds       distracted_mcclintock
```

To interact with the running container—for example, to view the contents of `/etc/hosts`—use the `docker exec` command. This command allows you to run commands inside a running container without starting a new one.

> [!important]
> **Tip**
>
> Using `docker exec` is particularly useful for debugging or modifying container states during runtime.

## Running a Web Application Container

Consider running a simple web application container. For instance, the repository "kodekloud/simple-webapp" contains a sample web application. Running the container in the foreground displays the application's output directly in your terminal:

```
docker run kodekloud/simple-webapp
```

The output might resemble:

```
This is a sample web application that displays a colored background.
* Serving Flask app "app" (lazy loading)
* Running on http://0.0.0.0:8080/ (Press CTRL+C to quit)
```

To run the web application in detached (background) mode, add the `-d` option:

```
docker run -d kodekloud/simple-webapp
```

This will output a container ID similar to:

```
a043d40f85fefa414254e4775f9336ea59e5cf597af5c554e0a35a1631118
```

You can then check running containers with:

```
docker ps
```

If you need to reattach to the container, use the `docker attach` command along with the container ID (a shortened unique prefix is acceptable):

```
docker attach a043d
```

## Conclusion

This article covered several basic Docker commands for running containers, listing and stopping containers, managing images, and executing commands within running containers. With these fundamentals, you'll be well-equipped to interact with Docker's CLI more effectively and explore further configurations in your containerized environments.

Next, dive into our hands-on exercises to solidify your understanding of these commands and boost your Docker expertise.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-training-course-for-the-absolute-beginner/module/672dc9a2-52ce-467f-b00c-c2f16185479b/lesson/8f626b4e-ee33-487c-866a-a0b5c3b07a74)**
>
> Watch video content
