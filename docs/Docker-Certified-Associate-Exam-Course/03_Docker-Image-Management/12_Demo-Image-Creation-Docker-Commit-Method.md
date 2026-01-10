# Demo Image Creation Docker Commit Method - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Image-Management/Demo-Image-Creation-Docker-Commit-Method)

---

## Table of Contents

- Demo Image Creation Docker Commit Method
  - 1. Pull the CentOS 7 Base Image
  - 2. Create and Start a Container
  - 3. Install HTTPD and Customize the Web Page
  - 4. Commit the Container to a New Image
  - 5. Test Your Custom Image
  - 6. Tag and Push to Docker Hub
  - References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Image Management

# Demo Image Creation Docker Commit Method

In this tutorial, you’ll learn how to build an HTTPD webserver image on top of a CentOS 7 base image using the Docker commit method. By the end, you’ll have a reusable image that includes your custom Apache configuration and index page.

## 1\. Pull the CentOS 7 Base Image

Start by pulling the official CentOS 7 image from Docker Hub:

```
docker image pull centos:7
```

You should see output like:

```
7: Pulling from library/centos
75f829a71a1c: Pull complete
Digest: sha256:19a79828ca2505eae0ff38c2f39901f4826737295157cc5212b7a372cd2b
Status: Downloaded newer image for centos:7
docker.io/library/centos:7
```

Verify it’s available locally:

```
docker image ls
```

Example:

```
REPOSITORY   TAG   IMAGE ID       CREATED        SIZE
centos       7     7e6257c9f8d8   2 months ago   203MB
```

## 2\. Create and Start a Container

1.  Create a container named `test` from the CentOS 7 image:

    ```
    docker container create --name test centos:7
    ```

2.  Start it:

    ```
    docker container start test
    ```

3.  Attach an interactive shell:

    ```
    docker container exec -it test /bin/bash
    ```

## 3\. Install HTTPD and Customize the Web Page

Inside the container shell:

```
yum -y update
yum install -y httpd
echo "<h1>Hello from KodeKloud</h1>" > /var/www/html/index.html
```

This installs Apache HTTPD and replaces the default index page.

> [!important]
> **Tip**
>
> You can test the Apache service within the container before committing:
>
> ```
> httpd -k start
> curl http://localhost
> httpd -k stop
> ```

## 4\. Commit the Container to a New Image

1.  Exit and stop the container:

    ```
    exit
    docker container stop test
    ```

2.  Review container status:

    ```
    docker container ls -l
    ```

3.  Commit with metadata and a default `CMD`. Here’s an overview of common flags:

| Flag | Description                              | Example                                |
| ---- | ---------------------------------------- | -------------------------------------- |
| \\-a | Specify the author                       | `-a "Yogesh Raheja"`                   |
| \\-m | Add a commit message                     | `-m "Add HTTPD and custom index"`      |
| \\-c | Set a Dockerfile instruction (e.g., CMD) | `-c 'CMD ["httpd","-D","FOREGROUND"]'` |

4.  Run `docker commit`:

    ```
    docker container commit \
      -a "Yogesh Raheja" \
      -m "Add HTTPD and custom index" \
      -c 'CMD ["httpd", "-D", "FOREGROUND"]' \
      test webtest:v1
    ```

You’ll get a new image ID, for example:

```
sha256:9cd11553a2e7...
```

Verify the image list:

```
docker image ls
```

Expected:

```
REPOSITORY   TAG   IMAGE ID       CREATED         SIZE
webtest      v1    9cd11553a2e7   30 seconds ago  328MB
centos       7     7e6257c9f8d8   2 months ago    203MB
```

## 5\. Test Your Custom Image

Launch a container from `webtest:v1`, mapping port 80:

```
docker container run -d --name webtesting -p 80:80 webtest:v1
```

Confirm it’s running:

```
docker container ls -l
```

Open `http://<DockerHostIP>` in your browser. You should see:

```
Hello from KodeKloud
```

This verifies that your HTTPD configuration and custom index page are baked into the image.

## 6\. Tag and Push to Docker Hub

1.  Tag the image for your repository (replace `<your-dockerhub-username>`):

    ```
    docker image tag webtest:v1 <your-dockerhub-username>/codekloud-webtest:v1
    ```

2.  Log in to Docker Hub:

    ```
    docker login
    ```

3.  Push the tagged image:

    ```
    docker push <your-dockerhub-username>/codekloud-webtest:v1
    ```

Visit your [Docker Hub](https://hub.docker.com/) repository to confirm the `v1` tag is published.

---

Congratulations! You’ve successfully created and published a custom Docker image using the `docker commit` method.

## References

- [Docker Commit Documentation](https://docs.docker.com/engine/reference/commandline/commit/)
- [Docker Image Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [CentOS on Docker Hub](https://hub.docker.com/_/centos/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/f2e605a0-1ea7-434b-a139-0db000b0a250/lesson/2b07cbde-a382-448a-b4f0-0c7be474526d)**
>
> Watch video content
