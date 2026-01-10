# Docker Volume - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine-Storage/Docker-Volume)

---

## Table of Contents

- Docker Volume
  - Table of Contents
  - Inspecting a Volume
  - Removing a Volume
  - Pruning Unused Volumes
  - Verifying Mount Options
  - Mounting a Volume as Read-Only
  - Common Docker Volume Commands
  - References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Engine Storage

# Docker Volume

In this tutorial, you’ll learn how to inspect, remove, prune, and configure Docker volumes. Managing volumes effectively helps persist data across container lifecycles and keeps your host system clean.

## Table of Contents

- [Inspecting a Volume](#inspecting-a-volume)
- [Removing a Volume](#removing-a-volume)
- [Pruning Unused Volumes](#pruning-unused-volumes)
- [Verifying Mount Options](#verifying-mount-options)
- [Mounting a Volume as Read-Only](#mounting-a-volume-as-read-only)
- [References](#references)

---

## Inspecting a Volume

Use `docker volume inspect` to retrieve metadata about your volume, including driver, mount point, labels, and scope:

```
docker volume inspect data_volume
```

Sample output:

```
[
  {
    "CreatedAt": "2020-01-20T19:52:34Z",
    "Driver": "local",
    "Labels": {},
    "Mountpoint": "/var/lib/docker/volumes/data_volume/_data",
    "Name": "data_volume",
    "Options": {},
    "Scope": "local"
  }
]
```

This command is essential for troubleshooting mount permissions and verifying where Docker stores your volume data on the host.

---

## Removing a Volume

To delete a volume that’s no longer used by any container:

```
docker volume rm data_volume
```

If the volume is active, Docker returns an error:

```
Error response from daemon: remove data_volume: volume is in use - [2be4d9182296…]
```

Stop or remove the container first, then run the same command again:

```
docker volume rm data_volume
# data_volume
```

---

## Pruning Unused Volumes

Clean up all dangling volumes in one step to free up disk space:

```
docker volume prune
```

You'll see a confirmation prompt:

```
WARNING! This will remove all local volumes not used by at least one container.
Are you sure you want to continue? [y/N] y
Deleted Volumes:
  data_vol3
  data_vol1
  data_vol2
Total reclaimed space: 12MB
```

> [!important]
> **Warning**
>
> Pruning removes **all** unused volumes. Ensure you have backups of any critical data before proceeding.

---

## Verifying Mount Options

By default, volumes are mounted read-write. To inspect a container’s mount configuration:

```
docker container inspect my-container
```

Look for the `Mounts` section:

```
"Mounts": [
  {
    "Type": "volume",
    "Name": "data_vol1",
    "Source": "/var/lib/docker/volumes/data_vol1/_data",
    "Destination": "/var/www/html/index.html",
    "Driver": "local",
    "Mode": "z",
    "RW": true,
    "Propagation": ""
  }
]
```

> [!important]
> **Note**
>
> The `"RW": true` field confirms the volume is mounted read-write inside the container.

---

## Mounting a Volume as Read-Only

To ensure data integrity, you can mount a volume as read-only. Use the `--mount` flag with `readonly`:

```
docker container run \
  --mount type=volume,source=data_vol1,target=/var/www/html,index.html,readonly \
  httpd
```

This is useful for scenarios where containers should not modify shared data.

---

## Common Docker Volume Commands

| Command                          | Description                       | Example                             |
| -------------------------------- | --------------------------------- | ----------------------------------- |
| docker volume ls                 | List all volumes                  | `docker volume ls`                  |
| docker volume inspect \\[NAME\\] | Show detailed info about a volume | `docker volume inspect data_volume` |
| docker volume rm \\[NAME\\]      | Remove a specific volume          | `docker volume rm data_volume`      |
| docker volume prune              | Remove all unused volumes         | `docker volume prune`               |

---

## References

- [Docker Volumes Overview](https://docs.docker.com/storage/volumes/)
- [Use Bind Mounts or Volumes](https://docs.docker.com/storage/bind-mounts-vs-volumes/)
- [Docker CLI Reference](https://docs.docker.com/engine/reference/commandline/volume/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/44e269a4-bbba-4b6a-9540-696a6f90bace/lesson/05b25198-16e2-48c7-bf27-57fcff207044)**
>
> Watch video content
