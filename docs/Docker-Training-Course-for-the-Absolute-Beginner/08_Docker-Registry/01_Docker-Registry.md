# Docker Registry - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Training-Course-for-the-Absolute-Beginner/Docker-Registry/Docker-Registry)

---

## Table of Contents

- Docker Registry
  - Running a Simple Nginx Container
  - Docker Hub and Other Popular Registries
  - Working with Private Registries
  - Setting Up a Custom On-Premises Docker Registry
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Docker Training Course for the Absolute Beginner

Docker Registry

# Docker Registry

In this article, we explore the Docker Registry—a central repository where Docker images are stored and managed. Think of Docker images as the foundations for containers; without a registry, there would be no source to pull these essential images. Let’s start by running a simple Nginx container.

## Running a Simple Nginx Container

To run the Nginx image, execute the following command:

```
docker run nginx
```

Here, the image name "nginx" represents the repository name. In Docker's terminology, when using default settings, "nginx" is shorthand for "library/nginx." The "library" prefix indicates that this is an official image available on Docker Hub.

For example, the fully qualified image reference is:

```
image: docker.io/library/nginx
```

When no username or organization is specified, Docker assumes the image is stored in Docker Hub. If you create your own images on Docker Hub or within an organization, your username or organization name will be prefixed to the image name.

## Docker Hub and Other Popular Registries

By default, Docker uses Docker Hub (docker.io) for pulling images. Anytime an image is pushed or updated, it is stored in the registry and later pulled for deployments.

Beyond Docker Hub, several other registries are popular. For instance, Google manages a registry at GCR.io, which hosts many Kubernetes-related images, particularly for cluster end-to-end tests. These registries offer publicly accessible images that anyone can download.

For in-house applications that need restricted access, hosting a private Docker registry is ideal. Cloud providers such as AWS, Azure, and GCP often offer private registry services with your account, allowing you to keep a repository private—a setting that requires valid credentials.

## Working with Private Registries

To run a container using an image from a private registry, you must first log in using the Docker login command. For example:

```
docker login private-registry.io
Username: registry-user
Password:
WARNING! Your password will be stored unencrypted in /home/vagrant/.docker/config.json.
Login Succeeded
```

After logging in, run the container by specifying the private registry in the image name:

```
docker run private-registry.io/a
```

> [!important]
> **Login Required**
>
> Ensure you log in before pulling or pushing images from a private registry. Failing to do so may result in errors indicating that the image cannot be found.

For instance, a cloud provider might require a login as follows:

```
docker login private-registry.io
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, visit https://hub.docker.com to create one.
Username: registry-user
Password:
WARNING! Your password will be stored unencrypted in /home/vagrant/.docker/config.json.
Login Succeeded
```

Then, run an internal application from your private registry using:

```
docker run private-registry.io/apps/internal-app
```

## Setting Up a Custom On-Premises Docker Registry

If you're running your applications on-premises and lack a pre-configured private registry, you can deploy your own Docker registry. The Docker registry itself is distributed as a Docker image named "registry" which exposes its API on port 5000.

To start your custom registry, run:

```
docker run -d -p 5000:5000 --name registry registry:2
```

Once your registry is running, tag your image to include the registry URL. For instance, if your image is named "my-image" and your registry is hosting on the same machine, execute:

```
docker image tag my-image localhost:5000/my-image
```

Push the tagged image to your local private registry:

```
docker push localhost:5000/my-image
```

This image can then be pulled from any host within your network using either "localhost" (if on the same machine) or the appropriate IP address or domain name:

```
docker pull localhost:5000/my-image
docker pull 192.168.56.100:5000/my-image
```

## Conclusion

This article covered the essential aspects of the Docker Registry—from understanding the default behavior on Docker Hub to setting up and managing a private registry, whether hosted on a cloud provider or deployed on-premises. Experiment with these examples in your environment to deepen your understanding of managing and securing Docker images.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-training-course-for-the-absolute-beginner/module/6a9be8df-6796-4ca4-a1bc-d62bc9c86b7c/lesson/857264ea-71b4-494e-abf1-4b07179d786b)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/docker-training-course-for-the-absolute-beginner/module/6a9be8df-6796-4ca4-a1bc-d62bc9c86b7c/lesson/13072da9-d283-442e-96b6-f3f73a4e09e0)**
>
> Practice lab
