# Removing a Docker Image - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Image-Management/Removing-a-Docker-Image)

---

## Table of Contents

- Removing a Docker Image
  - 1. List All Images
  - 2. Remove a Single Tag
  - 3. Prune All Unused Images
  - Common Docker Image Removal Commands
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Image Management

# Removing a Docker Image

Cleaning up unused Docker images helps reclaim disk space and keep your environment tidy. Before deleting an image, ensure no containers are running from it. Stop and remove any dependent containers first.

> [!important]
> **Note**
>
> You cannot remove an image if there are existing containers based on it. Always run `docker container ls -a` and `docker container rm <container_id>` as needed.

---

## 1\. List All Images

To view all images on your host:

```
docker image ls
```

Example output:

```
REPOSITORY   TAG        IMAGE ID       CREATED      SIZE
httpd        alpine     52862a02e4e9   2 weeks ago  112MB
httpd        customv1   52862a02e4e9   2 weeks ago  112MB
httpd        latest     c2aa7e16edd8   2 weeks ago  165MB
ubuntu       latest     549b9b86cb8d   4 weeks ago  64.2MB
```

In this example, the image ID `52862a02e4e9` has two tags: `httpd:alpine` and `httpd:customv1`.

---

## 2\. Remove a Single Tag

When you run `docker image rm <repository>:<tag>`, Docker:

1.  Removes the tag (soft link).
2.  Deletes the image layers only if no other tags reference them.

Remove the `customv1` tag:

```
docker image rm httpd:customv1
```

Output:

```
Untagged: httpd:customv1
```

Since `httpd:alpine` still points to the same layers, only the tag is removed.

Verify the remaining images:

```
docker image ls
```

Result:

```
REPOSITORY   TAG        IMAGE ID       CREATED      SIZE
httpd        alpine     52862a02e4e9   2 weeks ago  112MB
httpd        latest     c2aa7e16edd8   2 weeks ago  165MB
ubuntu       latest     549b9b86cb8d   4 weeks ago  64.2MB
```

Removing the last tag deletes the layers and reclaims space:

```
docker image rm httpd:alpine
```

Output:

```
Untagged: httpd:alpine
Deleted: sha256:52862a02e4e9...
Deleted: sha256:...
Total reclaimed space: 112MB
```

---

## 3\. Prune All Unused Images

If you have many dangling or unreferenced images, use:

```
docker image prune -a
```

> [!important]
> **Warning**
>
> This command deletes **all** images not currently used by at least one container. Use with caution in production.

You will be prompted to confirm:

```
WARNING! This will remove all images without at least one container associated to them.
Are you sure you want to continue? [y/N] y
```

Sample output:

```
Deleted Images:
untagged: ubuntu:latest
deleted: sha256:549b9b86c8d75a2668c21c50ee927...
untagged: httpd:latest
deleted: sha256:c2aa7e16d855da8827aa0ccf9761...
Total reclaimed space: 229.4MB
```

---

## Common Docker Image Removal Commands

| Command                              | Description                                        |
| ------------------------------------ | -------------------------------------------------- |
| `docker image ls`                    | List all images                                    |
| `docker image rm <repository>:<tag>` | Remove a specific image tag (and layers if orphan) |
| `docker image prune`                 | Delete dangling images (untagged)                  |
| `docker image prune -a`              | Delete all unused images                           |
| `docker container ls -a`             | List all containers (to identify dependencies)     |
| `docker container rm <container_id>` | Remove specified container                         |

---

## Links and References

- [Docker Image Management](https://docs.docker.com/engine/reference/commandline/image_rm/)
- [Docker Container Management](https://docs.docker.com/engine/reference/commandline/container_ls/)
- [Docker CLI Prune Commands](https://docs.docker.com/engine/reference/commandline/system_prune/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/f2e605a0-1ea7-434b-a139-0db000b0a250/lesson/7884336d-dd48-4128-aa4e-4c3d396daeef)**
>
> Watch video content
