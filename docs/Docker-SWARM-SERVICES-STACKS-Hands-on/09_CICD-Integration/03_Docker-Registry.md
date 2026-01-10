# Docker Registry - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-SWARM-SERVICES-STACKS-Hands-on/CICD-Integration/Docker-Registry)

---

## Table of Contents

- Docker Registry
  - Overview
  - Setting Up a Private Docker Registry
  - Using Your Private Registry
  - References
  - Watch Video

---

## Content

Docker - SWARM | SERVICES | STACKS - Hands-on

CICD Integration

# Docker Registry

Hello and welcome to this article on Docker Registry. My name is Mumshad Mannambeth, and in this guide we will dive into an advanced Docker topic—Docker Registry.

## Overview

Previously, we learned that running the Docker build command creates an image of your application based on the instructions provided in the Dockerfile. In that example, the Dockerfile was located in the same directory where the build command was executed. Docker reads the "Dockerfile", follows its instructions, and builds an image (for example, named "mmumshad/my-custom-app").

Once the image is built, you can push it to a repository such as [Docker Hub](https://hub.docker.com/) using the Docker push command. Docker Hub acts as the publicly hosted Docker Registry for all Docker images. By default, the Docker push command sends images to Docker Hub.

Below is an example of how to build the image and push it to Docker Hub:

```
docker build . -t mmumshad/my-custom-app
docker push mmumshad/my-custom-app
```

## Setting Up a Private Docker Registry

In some environments—especially in enterprise settings—you might not want to use Docker Hub for storing your images. Instead, you may prefer to use a private registry within your local data center.

There are two main options for setting up an internal Docker Registry:

1.  Install the Docker Registry software directly on your server.
2.  Run a Docker container using the pre-built Docker Registry image available on Docker Hub (this approach is typically easier).

To run an instance of the Docker Registry container and expose it on port 5000, execute the following command:

```
docker run -d -p 5000:5000 registry:2
```

> [!important]
> **Tip**
>
> Once your private registry is up and running (for example, on localhost at port 5000), be sure to update the image tags to reflect the new registry location.

## Using Your Private Registry

After your private registry is configured, you can build your Docker image and push it to your internal registry. Simply prefix the image name with your registry address. For instance, if your registry is hosted on the same machine, use "localhost:5000". For a remote host, replace this with the appropriate IP address or DNS name.

Here’s how you can build the image and push it to your private registry:

```
docker build . -t mmumshad/my-custom-app
docker push localhost:5000/mmumshad/my-custom-app
```

Integrating your private registry into your CI/CD pipeline can automate the process of image building and deployment within your internal network.

## References

- [Docker Hub](https://hub.docker.com/)
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

This concludes our article on Docker Registry. Thank you for reading, and see you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-swarm-services-stacks-hands-on/module/404bf677-0487-4d68-a0bc-2ab53b45fb79/lesson/83c4db32-5b0f-43db-9378-9a7d4758fba0)**
>
> Watch video content
