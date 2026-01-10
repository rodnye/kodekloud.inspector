# Volume Driver Plugins in Docker - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Application-Developer-CKAD/State-Persistence/Volume-Driver-Plugins-in-Docker)

---

## Table of Contents

- Volume Driver Plugins in Docker
  - Watch Video

---

## Content

Certified Kubernetes Application Developer - CKAD

State Persistence

# Volume Driver Plugins in Docker

Docker leverages storage drivers to manage images and containers, while volume driver plugins handle data persistence. Unlike storage drivers, volumes need to be explicitly created and are managed by these dedicated plugins.

> [!important]
> **Note**
>
> The default volume driver plugin, "local," creates volumes on the Docker host and stores data at `/var/lib/docker/volumes`.

Several third-party volume driver plugins further expand Docker's storage capabilities by enabling volume creation on external storage solutions. Popular plugins include:

- Azure File Storage
- Convoy
- DigitalOcean Block Storage
- Blocker
- Google Compute Persistent Disks
- ClusterFS
- NetApp
- RexRay
- Portworx
- VMware vSphere storage

> [!important]
> **Note**
>
> Certain volume drivers support multiple storage providers. For instance, the RexRay storage driver can provision storage on various platforms such as AWS EBS, S3, EMC storage arrays like Isilon and ScaleIO, Google Persistent Disk, and OpenStack Cinder.

When running a Docker container, you can specify a volume driver—such as RexRay for AWS EBS—to provision a cloud-based volume. This approach ensures that your data remains safe even after the container exits.

Below is an example command that demonstrates how to run a Docker container with a specified volume driver:

```
docker run -it \
  --name mysql \
  --volume-driver rexray/ebs \
  --mount src=ebs-vol,target=/var/lib/mysql \
  mysql
```

This command creates a container named "mysql" and attaches a volume provisioned from Amazon EBS, ensuring persistent data storage in the cloud.

While this article focuses on Docker volume driver plugins, remember that Kubernetes also offers robust solutions for managing persistent storage through its volume mechanisms. For more details on persistent storage in Kubernetes, refer to [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-application-developer-ckad/module/cb16c9a3-1608-48cf-bfd5-2465f64b4f93/lesson/133c8da6-8e20-43da-b161-03f1b9d6f787)**
>
> Watch video content
