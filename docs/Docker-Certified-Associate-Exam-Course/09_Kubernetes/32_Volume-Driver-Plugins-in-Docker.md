# Volume Driver Plugins in Docker - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Kubernetes/Volume-Driver-Plugins-in-Docker)

---

## Table of Contents

- Volume Driver Plugins in Docker
  - Understanding Storage Drivers vs Volume Plugins
  - Default Local Volume Driver
  - Third-Party Volume Driver Plugins
  - Multi-Provider Example: RexRay
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Kubernetes

# Volume Driver Plugins in Docker

## Understanding Storage Drivers vs Volume Plugins

Storage drivers handle the low-level management of image and container layers. For persistent data, Docker uses **volumes**, which rely on volume driver plugins rather than storage drivers.

> [!important]
> **Note**
>
> Volumes are decoupled from image storage drivers. They ensure your data persists across container restarts and removals.

## Default Local Volume Driver

Docker’s default volume driver is `local`. It creates volumes on the host under `/var/lib/docker/volumes`. This driver is ideal for simple, on-host storage needs.

## Third-Party Volume Driver Plugins

To integrate with external storage platforms, Docker supports many community and commercial volume plugins. Below is a summary of popular options:

| Plugin       | Storage Provider(s)                                      | Reference      |
| ------------ | -------------------------------------------------------- | -------------- |
| Azure File   | Azure File Storage                                       | `azurefile`    |
| Convoy       | Various (via driver extensions)                          | `convoy`       |
| DigitalOcean | Block Storage                                            | `digitalocean` |
| Blocker      | Block Storage                                            | `blocker`      |
| GCE PD       | Google Persistent Disk                                   | `gcepd`        |
| ClusterFS    | Clustered filesystems                                    | `clusterfs`    |
| NetApp       | NetApp storage arrays                                    | `netapp`       |
| RexRay       | AWS EBS/S3, EMC Isilon/ScaleIO, GCE PD, OpenStack Cinder | `rexray`       |
| Portworx     | Portworx clusters                                        | `pxd`          |
| vSphere      | VMware vSphere storage                                   | `vsphere`      |

![The image lists different types of storage and volume drivers, including AUFS, ZFS, and Azure File Storage, with a link to Docker documentation.](https://kodekloud.com/kk-media/image/upload/v1752874037/notes-assets/images/Docker-Certified-Associate-Exam-Course-Volume-Driver-Plugins-in-Docker/storage-volume-drivers-docker.jpg)

> [!important]
> **Warning**
>
> Ensure each volume driver plugin is installed and configured on your Docker host. Verify compatibility and installation steps in the [Docker Storage Plugins](https://docs.docker.com/engine/extend/plugins/) guide.

## Multi-Provider Example: RexRay

RexRay can provision volumes across multiple storage backends. To run a MySQL container with an AWS EBS volume:

```
docker run -it \
  --name mysql \
  --mount type=volume,volume-driver=rexray/ebs,source=ebs-vol,target=/var/lib/mysql \
  mysql
```

When this container stops or is removed, your data remains intact on the attached EBS volume.

> [!important]
> **Next Steps**
>
> This approach extends to Kubernetes. Explore how Kubernetes **PersistentVolumes** and **StorageClasses** manage dynamic provisioning with external drivers.

## Links and References

- [Docker Volumes](https://docs.docker.com/storage/volumes/)
- [RexRay Documentation](https://rexray.readthedocs.io/)
- [Docker Storage Plugins](https://docs.docker.com/engine/extend/plugins/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d9358627-4fc7-4acc-ab96-fa25232555c6/lesson/0367a659-2e0a-4b02-97ed-1f8b291679e8)**
>
> Watch video content
