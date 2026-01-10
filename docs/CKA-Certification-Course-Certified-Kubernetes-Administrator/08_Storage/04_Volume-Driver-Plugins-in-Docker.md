# Volume Driver Plugins in Docker - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Storage/Volume-Driver-Plugins-in-Docker)

---

## Table of Contents

- Volume Driver Plugins in Docker
  - Watch Video

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Storage

# Volume Driver Plugins in Docker

In previous discussions, we explored storage drivers and their role in managing storage for images and containers. We also examined volumes and emphasized that if you need persistent storage, you must create volumes. It is important to note that volumes are not managed by storage drivers; instead, they are handled by volume driver plugins.

By default, Docker uses the local volume driver plugin. This plugin creates a volume on the Docker host and stores its data under the /var/lib/docker/volumes directory. However, many other volume driver plugins are available, enabling you to create volumes on third-party storage solutions such as Azure File Storage, Convoy, DigitalOcean Block Storage, Blocker, Google Compute Persistent Disks, ClusterFS, NetApp, Rex Ray, Portworx, and VMware vSphere Storage.

![The image lists storage and volume drivers for Docker, including AUFS, ZFS, BTRFS, and others, with a link to Docker documentation.](https://kodekloud.com/kk-media/image/upload/v1752869994/notes-assets/images/CKA-Certification-Course-Certified-Kubernetes-Administrator-Volume-Driver-Plugins-in-Docker/frame_60.jpg)

> [!important]
> **Tip**
>
> When selecting a volume driver plugin, consider your storage infrastructure requirements. Plugins such as Rex Ray offer flexibility by supporting various storage providers.

For example, some volume drivers support multiple storage providers. The Rex Ray storage driver, for instance, can provision storage on AWS EBS, S3, EMC storage arrays (like Isilon and ScaleIO), Google Persistent Disk, or OpenStack Cinder. When running a Docker container, you can select a specific volume driver such as Rex Ray EBS to provision a volume from Amazon EBS. This approach ensures that your data remains safe in the cloud even if the container exits.

Below is an example of running a Docker container using a specific volume driver plugin:

```
docker run -it \
  --name mysql \
  --volume-driver rexray/ebs \
  --mount src=ebs-vol,target=/var/lib/mysql \
  mysql
```

Later in the series, we will further explore how volumes are managed within Kubernetes.

For additional details, refer to the [Docker Documentation](https://docs.docker.com/) and learn more about [persistent storage in containers](https://docs.docker.com/storage/volumes/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/883f0aa9-3aa9-45a6-bd26-3a87ded1e00e/lesson/2ee28cd3-bb5c-41b4-a22d-02f9aa0704f9)**
>
> Watch video content
