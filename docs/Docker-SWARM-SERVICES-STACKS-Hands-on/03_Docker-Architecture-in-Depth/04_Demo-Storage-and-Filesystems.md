# Demo Storage and Filesystems - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-SWARM-SERVICES-STACKS-Hands-on/Docker-Architecture-in-Depth/Demo-Storage-and-Filesystems)

---

## Table of Contents

- Demo Storage and Filesystems
  - Pulling the Hello-World Image
  - Building a Sample Python Flask Web Application
  - Inspecting the AUFS Diff Directory
  - Demonstrating Layered Architecture with Multiple Dockerfiles
  - Conclusion
  - Watch Video
  - Practice Lab
    - Step 1: Exploring the Application Files
    - How the Dockerfile Works
    - Step 2: Building the Docker Image
    - Dockerfile (Original Application)
    - Dockerfile2 (Updated Application Version)
    - Creating an Updated Application

---

## Content

Docker - SWARM | SERVICES | STACKS - Hands-on

Docker Architecture in Depth

# Demo Storage and Filesystems

Welcome to this article where we explore how Docker manages data storage within the filesystem. You will learn where Docker stores its data by default, and how it structures files related to containers, images, and layers.

When Docker is installed, it creates a default folder structure at `/var/lib/docker`. For example, listing the contents of this directory might display the following:

```
root@Docker_Host_2:/root # ls -l /var/lib/docker
total 40
drwx------ 5 root root 4096 Aug 19 21:40 aufs
drwx------ 2 root root 4096 Aug 19 21:40 builder
drwx------ 2 root root 4096 Aug 20 20:52 containers
drwx------ 3 root root 4096 Aug 19 21:40 image
drwx------ 4 root root 4096 Aug 19 21:40 network
drwx------ 2 root root 4096 Aug 19 21:40 plugins
drwx------ 2 root root 4096 Aug 19 21:40 swarm
drwx------ 2 root root 4096 Aug 20 20:48 tmp
drwx------ 2 root root 4096 Aug 19 21:40 trust
drwx------ 2 root root 4096 Aug 19 21:40 volumes
root@Docker_Host_2:/root #
```

In this structure, directories such as `aufs`, `builder`, `containers`, `image`, `network`, `plugins`, and `swarm` are clearly visible. Docker stores container-related files in the `containers` folder and image-related files in the `image` folder.

> [!important]
> **Note**
>
> The storage driver plays a crucial role in managing image layers and associated files. You can check which storage driver is active by running `docker info`.

When you execute the `docker info` command, you will see several details including the Docker version (e.g., 17.09) and the storage driver. In this example, the storage driver is `aufs`, which is the default on Debian and Ubuntu systems. The root directory for the storage driver is `/var/lib/docker/aufs`.

Listing the contents of the `/var/lib/docker/aufs` directory provides further insight:

```
root@Docker_Host_2:/root # ls -l /var/lib/docker/aufs
total 12
drwx------ 2 root root 4096 Aug 20 20:52 diff
drwx------ 2 root root 4096 Aug 20 20:52 layers
drwx------ 2 root root 4096 Aug 20 20:52 mnt
```

- The **diff** folder contains the actual content of each image layer. Every instruction in a Dockerfile (for instance, copying source code into the image) creates a new layer stored within this directory.
- The **layers** folder holds metadata indicating how these image layers are stacked.
- The **mnt** folder stores information about the associated mount points.

At this stage, if no images or containers have been created, these directories may appear empty:

```
root@Docker_Host_2:/root # ls -l /var/lib/docker/aufs/diff
total 0
root@Docker_Host_2:/root # ls -l /var/lib/docker/aufs/layers
total 0
root@Docker_Host_2:/root # ls -l /var/lib/docker/aufs/mnt
total 0
```

---

## Pulling the Hello-World Image

Next, pull the sample Docker image known as "hello-world" to see how Docker populates these directories:

```
root@Docker_Host_2:/root # docker pull hello-world
```

After pulling the image, inspecting `/var/lib/docker/aufs` again shows the directories (while they might still appear empty at the top level, their subdirectories are now populated):

```
root@Docker_Host_2:/root # ls -l /var/lib/docker/aufs
total 12
drwx------ 2 root root 4096 Aug 20 20:52 diff
drwx------ 2 root root 4096 Aug 20 20:52 layers
drwx------ 2 root root 4096 Aug 20 20:52 mnt
```

The output from pulling the hello-world image is similar to:

```
root@Docker_Host_2:/root # docker pull hello-world
Using default tag: latest
latest: Pulling from library/hello-world
5b0f327be733: Pull complete
Digest: sha256:07d5f7800dfe378c2196c7b1c524c33808ce2e0f74e7aa00e603295ca9a0972
Status: Downloaded newer image for hello-world:latest
root@Docker_Host_2:/root #
```

To inspect how the hello-world image is built, use the `docker history` command along with its image ID. First, list the available images:

```
root@Docker_Host_2:/root # docker images
REPOSITORY   TAG       IMAGE ID      CREATED                   SIZE
hello-world  latest    05a3bd381fc2  Less than a second ago  1.84kB
root@Docker_Host_2:/root #
```

Then, view the image history:

```
root@Docker_Host_2:/root # docker history 05a3bd381fc2
IMAGE               CREATED              CREATED BY                                      SIZE     COMMENT
05a3bd381fc2       Less than a second ago   /bin/sh -c #(nop) CMD ["/hello"]           0B
<missing>          Less than a second ago   /bin/sh -c #(nop) COPY file:b65349dad8105c... 1.84kB
root@Docker_Host_2:/root #
```

This output reveals that the hello-world image comprises two steps:

1.  A script is copied into the image.
2.  The copied script is then set as the container’s command.

Although you could theoretically run this script directly from the Docker host, this demonstration is purely for illustrating Docker’s file storage locations.

---

## Building a Sample Python Flask Web Application

Next, let’s build a custom Docker image containing a simple Python Flask web application. In the sample application folder named `simple-webapp-docker`, you will find two files:

- `app.py` – the source code of the application.
- `Dockerfile` – the build instructions.

### Step 1: Exploring the Application Files

Navigate to the application directory and list its contents:

```
root@Docker_Host_2:/root/sample-application/ # cd simple-webapp-docker/
root@Docker_Host_2:/root/sample-application/simple-webapp-docker # ls
app.py  Dockerfile
```

View the contents of the Dockerfile:

```
root@Docker_Host_2:/root/sample-application/simple-webapp-docker # cat Dockerfile
FROM ubuntu:17.04


RUN apt-get update && apt-get install -y python python-pip


RUN pip install flask


COPY app.py /opt/


ENTRYPOINT FLASK_APP=/opt/app.py flask run --host=0.0.0.0
```

### How the Dockerfile Works

1.  **Base Image:** The application is built on top of Ubuntu 17.04.
2.  **Package Installation:** The package list is updated and Python along with pip is installed.
3.  **Dependency Installation:** The Flask package is installed via pip.
4.  **Copying Source Code:** The application source code (`app.py`) is copied into the `/opt/` directory.
5.  **Launching the Application:** An entry point is established to run the Flask application.

### Step 2: Building the Docker Image

Build the Docker image by running:

```
root@Docker_Host_2:/root/sample-application/simple-webapp-docker # docker build .
```

During the build process, layers are created and cached. For instance, because Ubuntu is not available locally, it is pulled automatically. The build output will indicate the progress of each step, similar to:

```
Sending build context to Docker daemon  50.69kB
Step 1/5 : FROM ubuntu:17.04
17.04: Pulling from library/ubuntu
...
Successfully built <image-id>
root@Docker_Host_2:/root/sample-application/simple-webapp-docker #
```

After the build completes, list the available images:

```
root@Docker_Host_2:/root/sample-application/simple-webapp-docker # docker images
REPOSITORY       TAG       IMAGE ID       CREATED              SIZE
ubuntu           17.04     6ca5545c1cef   Less than a second ago   94.7MB
hello-world      latest    05a3bd381fc2   Less than a second ago   1.84kB
<none>           <none>    5745fc6e89fe   21 seconds ago       467MB
root@Docker_Host_2:/root/sample-application/simple-webapp-docker #
```

> [!important]
> **Tip**
>
> The unnamed image is the one you just built because no repository name or tag was specified. To make management easier, tag your image using the `-t` parameter.

To view detailed build history and layer information, run:

```
docker history <image-id>
```

For example:

```
root@Docker_Host_2:/root/sample-application/simple-webapp-docker # docker history 5745fc6e89fe
IMAGE               CREATED              CREATED BY                                      SIZE          COMMENT
6ca5545c1cef4       Less than a second ago   /bin/sh -c #(nop) ENTRYPOINT ["/bin/sh" ...   0B
05a3bd381fc2       Less than a second ago   /bin/sh -c COPY file:29b928534d73898...      229B
61d0e1d1b685       35 seconds ago         /bin/sh -c pip install flask                  5.71MB
5745fc6e89fe       8 minutes ago          /bin/sh -c apt-get update && apt-get install ... 366MB
<missing>          Less than a second ago   /bin/sh -c #(nop) CMD ["/bin/bash"]           0B
...
```

This history illustrates that the bulk of the image size arises from the Ubuntu base and the Python dependency installations.

---

## Inspecting the AUFS Diff Directory

After building an image, Docker stores the actual content in the AUFS diff directory. To see the disk usage and structure under this directory, run:

```
root@Docker_Host_2:/var/lib/docker/aufs/diff # du -sh *
16K     23d6e141c6f1f8c7a182e0cbed825731adb8d8c847089aa0211c0b9a
20K     9a4d479c548701ba3be18901d57fcb5dfd62c82926937afc09f839d
16K     ae0f7a103872f03d56127012a3a0e49de854ba00b0e8423c
8.0K    a6d6c743915d5b184615f4d32caa2a8f0a4d1794fbd389dbc1f8beb4
16K     ae017a103872f03d56127012a3a0e49de854ba00b0e8423c
84K     b07d12c1bc6a58354b6de2289ca5936262991190d92a5f9cffff0
16K     9b774564e5f36cb0f464d75ff906c14a
4.0K    0a4b2488473ad10fc26cd3bd197ecbc
6.5M    ce6ac6784d5b2c8ccea0758753f393b49b9210f591f40ed1612f59efe6fc6
```

You might recognize the folder that contains your application code by its smaller size. For instance, if you suspect a directory holds your application files, navigate into it and inspect its contents:

```
root@Docker_Host_2:/var/lib/docker/aufs/diff/<folder-id> # ls
opt
root@Docker_Host_2:/var/lib/docker/aufs/diff/<folder-id>/opt # ls
app.py
root@Docker_Host_2:/var/lib/docker/aufs/diff/<folder-id>/opt # cat app.py
import os
from flask import Flask
app = Flask(__name__)


@app.route("/")
def main():
    return "Welcome!"


@app.route("/how are you?")
def hello():
    return "I am good, how about you?"


if __name__ == "__main__":
    app.run()
```

---

## Demonstrating Layered Architecture with Multiple Dockerfiles

Docker’s layered architecture allows reuse of base layers (like operating system and dependencies) even if only the application code changes. Consider the following example with two Dockerfiles:

### Dockerfile (Original Application)

```
FROM ubuntu:17.04
RUN apt-get update && apt-get -y install python
RUN pip install flask flask-mysql
COPY . /opt/source-code
ENTRYPOINT FLASK_APP=/opt/source-code/app.py flask run
```

Build this image with:

```
docker build -t mumushad/my-custom-app -f Dockerfile .
```

### Dockerfile2 (Updated Application Version)

```
FROM ubuntu:17.04
RUN apt-get update && apt-get -y install python
RUN pip install flask flask-mysql
COPY app2.py /opt/source-code
ENTRYPOINT FLASK_APP=/opt/source-code/app2.py flask run
```

Build the updated image with:

```
docker build -t mumushad/my-custom-app-2 -f Dockerfile2 .
```

Since the base operating system and dependencies remain unchanged, Docker reuses the cached layers for both builds. Only the layer that involves copying the updated application code (`app2.py`) is rebuilt. Note that when any step changes, Docker clears the cache for that step and all subsequent layers.

### Creating an Updated Application

To demonstrate this:

1.  Copy the existing application file and Dockerfile:

    ```
    root@Docker_Host_2:/root/sample-application/simple-webapp-docker # ls
    app.py  Dockerfile
    root@Docker_Host_2:/root/sample-application/simple-webapp-docker # cp app.py app2.py
    root@Docker_Host_2:/root/sample-application/simple-webapp-docker # cp Dockerfile Dockerfile2
    ```

2.  Edit `app2.py` (for example, change "Welcome" to "Welcome 2") and update `Dockerfile2` to reference `app2.py`:

    ```
    FROM ubuntu:17.04
    RUN apt-get update && apt-get install -y python python-pip
    RUN pip install flask
    COPY app2.py /opt/
    ENTRYPOINT FLASK_APP=/opt/app2.py flask run --host=0.0.0.0
    ```

3.  Build the new image with the updated Dockerfile:

    ```
    root@Docker_Host_2:/root/sample-application/simple-webapp-docker # docker build -f Dockerfile2 -t sample-webapp2:latest .
    Sending build context to Docker daemon  52.74kB
    Step 1/5 : FROM ubuntu:17.04
     ---> 6ca5545c1e...
    Step 2/5 : RUN apt-get update && apt-get install -y python python-pip
     ---> Using cache
     ---> 2b00cb5a0256
    Step 3/5 : RUN pip install flask
     ---> Using cache
     ---> 947b3a20cb4d
    Step 4/5 : COPY app2.py /opt/
     ---> f7d212ed84fa
    Step 5/5 : ENTRYPOINT FLASK_APP=/opt/app2.py flask run --host=0.0.0.0
     ---> Running in c135ff9454ba
     ---> 61d0e1d1b685
    Removing intermediate container c135ff9454ba
    Successfully built 61d0e1d1b685
    Successfully tagged sample-webapp2:latest
    ```

List the images to confirm the updated tags:

```
docker images
REPOSITORY          TAG       IMAGE ID       CREATED                  SIZE
ubuntu              17.04     6ca5545c1cef   Less than a second ago   94.7MB
hello-world         latest    05a3bd381fc2   Less than a second ago   1.84kB
sample-webapp2      latest    61d0e1d1b685   About a minute ago         467MB
simple-webapp       latest    2b00cb5a0256   8 minutes ago           467MB
```

Although both web application images report a size of 467MB, most layers (such as the Ubuntu base image and dependencies) are shared. The reported size includes duplicated layers; to view the unique disk usage, use the following command:

```
root@Docker_Host_2:/root/sample-application/simple-webapp-docker # docker system df
TYPE                TOTAL     ACTIVE
Images              4         0
Containers          0         0
Local Volumes       3         0


Images space usage:
REPOSITORY        TAG       IMAGE ID        SIZE       RECLAIMABLE
sample-webapp2    latest    5179af23f3c1    431.7MB   431.7MB (100%)
hello-world       latest    05a3bd381fc2    1.84kB    0B
simple-webapp     latest    0b2e4c549545    431.7MB   431.7MB (100%)
ubuntu            latest    ccc7a1d651b1    120.1MB   0B
```

The `docker system df` command presents the actual disk consumption without counting shared layers multiple times. For an even more detailed view, include the verbose flag (`-v`) to examine each image’s layer breakdown.

---

## Conclusion

In this article we explored:

- The default file structure created by Docker in `/var/lib/docker`
- How storage drivers like AUFS organize images into layers using directories such as `diff`, `layers`, and `mnt`
- How to inspect Docker images using the `docker history` command
- The efficiency of Docker’s layer caching during image rebuilds after minor application changes
- Monitoring actual disk usage with the `docker system df` command

We hope this comprehensive guide deepens your understanding of Docker's storage mechanisms and layer management. Happy containerizing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on/module/01c6c0f6-50bd-495b-a164-52a82eeebd79/lesson/288f05f8-b323-4e34-b32e-caa25cc7759a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on/module/01c6c0f6-50bd-495b-a164-52a82eeebd79/lesson/ce0ca513-5ee7-4709-8ded-cc6f87d15174)**
>
> Practice lab
