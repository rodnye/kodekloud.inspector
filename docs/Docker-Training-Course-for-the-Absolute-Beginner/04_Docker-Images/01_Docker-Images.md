# Docker Images - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Training-Course-for-the-Absolute-Beginner/Docker-Images/Docker-Images)

---

## Table of Contents

- Docker Images
  - Breaking Down the Dockerfile
  - Building Your Docker Image
  - Beyond Web Applications
  - Watch Video

---

## Content

Docker Training Course for the Absolute Beginner

Docker Images

# Docker Images

Welcome to this detailed guide on creating Docker images. In this article, you'll learn how to build your own Docker image, a crucial step for containerizing applications such as a simple web app built with the Python Flask framework. Custom Docker images are useful when you can't find a specific component on [Docker Hub](https://hub.docker.com) or when containerizing an application for easier deployment and portability is required.

Before containerizing your application, it’s useful to consider the manual deployment steps. For a basic web application, these steps might include:

- Starting with an operating system (e.g., Ubuntu)
- Updating package repositories via APT
- Installing required dependencies using APT
- Installing Python packages with pip
- Copying your application's source code to a target directory (for example, /opt)
- Launching the Flask web server

![The image provides steps to create a Docker image using Ubuntu, including updating repositories, installing dependencies, copying source code, and running a Flask web server.](https://kodekloud.com/kk-media/image/upload/v1752874146/notes-assets/images/Docker-Training-Course-for-the-Absolute-Beginner-Docker-Images/frame_80.jpg)

With these steps in view, you can now create a Dockerfile that encapsulates the entire process. Create a file called Dockerfile and add instructions for setting up your application by installing dependencies, copying the source code, and setting the entrypoint. Below is an example Dockerfile:

```
FROM ubuntu


RUN apt-get update && apt-get install -y python python-pip


RUN pip install flask flask-mysql


COPY . /opt/source-code


ENTRYPOINT ["sh", "-c", "FLASK_APP=/opt/source-code/app.py flask run"]
```

> [!important]
> **Tip**
>
> When designing your Dockerfile, remember that each command represents a layer. Combining commands (using &&) minimizes the number of layers and reduces image size.

Once your Dockerfile is in place, build your image locally by running the Docker build command and tagging your image. For example, if the image is tagged under the account "mmunshad" with the name "my-custom-app", you can push it to [Docker Hub](https://hub.docker.com) using the Docker push command.

## Breaking Down the Dockerfile

A Dockerfile is a plain text file defining a series of instructions and arguments that Docker interprets to create an image. Here is an explanation of each instruction used in our example:

- **FROM**: Sets the base image—in this case, Ubuntu. Every Dockerfile begins with a FROM instruction referencing an existing image on Docker Hub.
- **RUN**: Executes commands in the container. In the Dockerfile, the first RUN command updates the package lists and installs necessary packages. Combining commands with && minimizes the image layers.
- **COPY**: Transfers files from your local system into the image. Here, it copies the source code to `/opt/source-code`.
- **ENTRYPOINT**: Specifies the command that runs when the container starts. In this example, it sets the environment variable `FLASK_APP` and starts the Flask web server.

Docker’s layered architecture means that each Dockerfile instruction creates a new layer. For instance:

1.  The base Ubuntu OS.
2.  APT updates and the installation of required packages.
3.  Python package installation.
4.  Copying of the source code.
5.  Setting of the ENTRYPOINT.

Because each layer only adds the differences from the previous one, the final image size only includes these changes. You can inspect these layers with the `docker history` command.

## Building Your Docker Image

When you build your Docker image using the `docker build` command, Docker outputs each step along with its result. Docker caches each layer so that if a build step fails and you fix the issue, previous layers are reused, speeding up subsequent builds. Here’s an example build process:

```
root@osboxes:/root/simple-webapp-docker# docker build -t mmunshad/my-custom-app .
Sending build context to Docker daemon  5.12kB
Step 1/5 : FROM ubuntu
 ---> ccca711d651b
Step 2/5 : RUN apt-get update && apt-get install -y python python-pip
 ---> Using cache
 ---> e4c05538e60
Step 3/5 : RUN pip install flask flask-mysql
 ---> Running in aacdaccd7403
Collecting flask
Downloading Flask-0.12.2-py2.py3-none-any.whl (83kB)
Removing intermediate container aacdaccd7403
Step 4/5 : COPY . /opt/source-code
 ---> 4a1ef57f663
Removing intermediate container 49cc8befcf8f
Step 5/5 : ENTRYPOINT ["sh","-c","FLASK_APP=/opt/source-code/app.py flask run --host=0.0.0.0"]
 ---> Running in 3d745f707d5a
Removing intermediate container 3d745f707d5a
Successfully built 910416d630b6
```

> [!important]
> **Pro Tip**
>
> Inspecting the build layers with `docker history mmunshad/my-custom-app` can help optimize your Dockerfile by identifying unnecessary layers.

## Beyond Web Applications

Docker is not limited to containerizing web applications. It can encapsulate a wide range of software including databases, development tools, and even full operating systems. Popular applications containerized with Docker include web browsers like [Chrome](https://www.google.com/chrome/) and [Firefox](https://www.mozilla.org/en-US/firefox/new/), utilities like [cURL](https://curl.se), and applications like [Spotify](https://www.spotify.com) or [Skype](https://www.skype.com). In the future, containerization may become the norm, simplifying software deployment and maintenance.

![The image suggests containerizing applications like Chrome, Firefox, cURL, and Spotify, with the message "Containerize Everything!!!" and a Docker-themed background.](https://kodekloud.com/kk-media/image/upload/v1752874147/notes-assets/images/Docker-Training-Course-for-the-Absolute-Beginner-Docker-Images/frame_440.jpg)

By following this guide, you should now have a solid understanding of Docker images, how to build them, and why they are a powerful tool for modern application deployment. Happy containerizing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-training-course-for-the-absolute-beginner/module/26faab43-a0ea-4355-9a94-f0bac957b507/lesson/884fc935-14ba-463b-8391-f33f98d59506)**
>
> Watch video content
