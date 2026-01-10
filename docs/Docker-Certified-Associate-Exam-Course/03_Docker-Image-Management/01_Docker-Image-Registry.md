# Docker Image Registry - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Image-Management/Docker-Image-Registry)

---

## Table of Contents

- Docker Image Registry
  - Default Registries
  - Image Categories on Docker Hub
  - Searching for Images on Docker Hub
  - Working with Image Tags
  - Listing and Searching Images from the CLI
  - Pulling Images Without Running Containers
  - References
  - Watch Video
    - List Local Images
    - Search Docker Hub from Terminal
    - Filter Search Results

---

## Content

Docker Certified Associate Exam Course

Docker Image Management

# Docker Image Registry

In this lesson, we explore Docker’s image registry. Throughout our work, we’ve run many containers using images—but where do these images reside, and how do you access them?

All images are stored in a central repository called an **image registry**. By default, Docker uses **Docker Hub**, a public registry hosting thousands of both public and private images. You can push your own images to Docker Hub and choose to keep them private.

## Default Registries

On top of Docker Hub, organizations can deploy private registries internally or use managed services from cloud providers:

![The image shows a sign-up page for Docker Hub, highlighting its use for building and shipping applications, alongside options for Docker Trusted Registry, Google Container Registry, Amazon Container Registry, and Azure Container Registry.](https://kodekloud.com/kk-media/image/upload/v1752873916/notes-assets/images/Docker-Certified-Associate-Exam-Course-Docker-Image-Registry/docker-hub-signup-page-options.jpg)

| Registry Type                     | Description                         | Link                                                                                                         |
| --------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Docker Hub                        | Docker’s public registry            | [hub.docker.com](https://hub.docker.com/)                                                                    |
| Docker Trusted Registry           | On-premises private registry        | [docs.docker.com/enterprise/registry](https://docs.docker.com/enterprise/registry/)                          |
| Google Container Registry         | Managed registry by Google Cloud    | [cloud.google.com/container-registry](https://cloud.google.com/container-registry)                           |
| Amazon Elastic Container Registry | Managed registry by AWS             | [aws.amazon.com/ecr](https://aws.amazon.com/ecr/)                                                            |
| Azure Container Registry          | Managed registry by Microsoft Azure | [azure.microsoft.com/services/container-registry/](https://azure.microsoft.com/services/container-registry/) |

## Image Categories on Docker Hub

On Docker Hub, images are organized into three categories:

![The image shows a registry of software images categorized into "Official Images," "Verified Images," and "User Images," with details like downloads and stars for each entry.](https://kodekloud.com/kk-media/image/upload/v1752873917/notes-assets/images/Docker-Certified-Associate-Exam-Course-Docker-Image-Registry/software-images-registry-categories.jpg)

| Category        | Maintained By          | Examples                                    |
| --------------- | ---------------------- | ------------------------------------------- |
| Official Images | Docker                 | `ubuntu`, `nginx`, `node`, `mongo`          |
| Verified Images | Trusted vendors        | `oracle`, `splunk`, `datadog`, `dynatrace`  |
| User Images     | Community contributors | Various open-source and custom applications |

## Searching for Images on Docker Hub

You can browse and search images via the web interface. For example, searching for “Ubuntu” displays official Ubuntu images along with download counts and star ratings:

![The image shows a Docker registry interface with a search for "Ubuntu," displaying results for the Ubuntu container image, including details like downloads and stars.](https://kodekloud.com/kk-media/image/upload/v1752873918/notes-assets/images/Docker-Certified-Associate-Exam-Course-Docker-Image-Registry/docker-registry-ubuntu-search-results.jpg)

## Working with Image Tags

Each image can have multiple tags. When you pull or run an image without specifying a tag, Docker uses the default tag: `latest`. This tag points to the version designated by the image maintainers.

> [!important]
> **Note**
>
> Pulling `ubuntu` is equivalent to pulling `ubuntu:latest`, which currently refers to Ubuntu 20.04.

```
# Pulls the Ubuntu image with the default 'latest' tag
docker pull ubuntu


# Both commands are equivalent
docker run ubuntu
docker run ubuntu:latest
```

To pull a specific version, specify its tag. For example, Ubuntu 18.04 is tagged as `bionic`, and Ubuntu 14.04 as `trusty`:

```
docker pull ubuntu:bionic
```

## Listing and Searching Images from the CLI

### List Local Images

To display all images on your host:

```
docker image ls
```

Example output:

```
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
ubuntu       latest    549b9b86cb8d   4 weeks ago     64.2MB
```

### Search Docker Hub from Terminal

```
docker search httpd
```

By default, this returns up to 25 results. To limit the output (maximum 100):

```
docker search httpd --limit 2
```

### Filter Search Results

Use filters like `stars` and `is-official` to refine results:

```
# HTTPD images with at least 10 stars
docker search httpd --filter stars=10


# Only official HTTPD images
docker search httpd --filter is-official=true


# Combine multiple filters
docker search httpd --filter stars=10 --filter is-official=true
```

## Pulling Images Without Running Containers

If you only want to download an image without starting a container:

```
docker image pull httpd
```

Example output:

```
Using default tag: latest
latest: Pulling from library/httpd
8ec398bc0356: Pull complete
354e6904d655: Pull complete
27298e4c749a: Pull complete
10e27104ba69: Pull complete
36412f6b2f6e: Pull complete
Digest: sha256:769018135ba22d3a7a2b91cb898de711562cdf51ad6621b2b13e95f3798de
Status: Downloaded newer image for httpd:latest
docker.io/library/httpd:latest
```

Verify the image is present:

```
docker image ls
```

---

That concludes this lesson on Docker image registries. In the next lesson, we’ll dive into container management.

## References

- [Docker Hub](https://hub.docker.com/)
- [Docker Trusted Registry](https://docs.docker.com/enterprise/registry/)
- [Google Container Registry](https://cloud.google.com/container-registry)
- [Amazon Elastic Container Registry](https://aws.amazon.com/ecr/)
- [Azure Container Registry](https://azure.microsoft.com/services/container-registry/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/f2e605a0-1ea7-434b-a139-0db000b0a250/lesson/5beff39a-71c3-425e-8cb0-14e914c67626)**
>
> Watch video content
