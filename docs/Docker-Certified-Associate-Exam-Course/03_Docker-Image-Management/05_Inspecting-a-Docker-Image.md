# Inspecting a Docker Image - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Image-Management/Inspecting-a-Docker-Image)

---

## Table of Contents

- Inspecting a Docker Image
  - Table of Contents
  - Prerequisites
  - Listing Local Images
  - Viewing Image History
  - Inspecting Image Metadata
  - Filtering with JSONPath
  - References
  - Watch Video
    - Common Filters
    - Retrieving Exposed Ports

---

## Content

Docker Certified Associate Exam Course

Docker Image Management

# Inspecting a Docker Image

Understanding how Docker images are built from multiple layers can help you optimize, debug, and secure your container workflows. In this guide, we’ll explore essential Docker CLI commands to:

- List local images
- Examine image history
- Inspect detailed metadata
- Filter output with JSONPath

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [Listing Local Images](#listing-local-images)
3.  [Viewing Image History](#viewing-image-history)
4.  [Inspecting Image Metadata](#inspecting-image-metadata)
5.  [Filtering with JSONPath](#filtering-with-jsonpath)
6.  [References](#references)

## Prerequisites

> [!important]
> **Note**
>
> Ensure you have Docker installed and running. Check your version with `docker version`.
> For full installation steps, visit the [Docker Docs](https://docs.docker.com/get-docker/).

## Listing Local Images

To see all images stored on your host machine, use:

```
docker image list
```

Example output:

```
REPOSITORY    TAG       IMAGE ID       CREATED       SIZE
httpd         latest    c2aa7e16edd8   2 weeks ago   165MB
ubuntu        latest    549b9b86cb8d   4 weeks ago   64.2MB
```

| Command             | Description             |
| ------------------- | ----------------------- |
| `docker image list` | List all images locally |

## Viewing Image History

Examining an image’s history reveals each layer and the command that created it. This is especially valuable if the Dockerfile isn’t available.

```
docker image history ubuntu
```

Sample output:

```
IMAGE          CREATED        CREATED BY                                      SIZE
549b9b86cb8d   4 weeks ago    /bin/sh -c #(nop) CMD ["/bin/bash"]             0B
<missing>      4 weeks ago    /bin/sh -c mkdir -p /run/systemd && echo 'do…   7B
<missing>      4 weeks ago    /bin/sh -c set -xe && echo '#!/bin/sh' > ./…    745B
<missing>      4 weeks ago    /bin/sh -c [ -z "$(apt-get indextargets)" ]      987kB
<missing>      4 weeks ago    /bin/sh -c #(nop) ADD file:53f100793e6c0adfc…   63.2MB
```

| Command                        | Description                        |
| ------------------------------ | ---------------------------------- |
| `docker image history <IMAGE>` | Show layer-by-layer build commands |

## Inspecting Image Metadata

The `inspect` command returns comprehensive image metadata in JSON format, including environment variables, exposed ports, volumes, and more.

```
docker image inspect ubuntu
```

Abbreviated example:

```
[
  {
    "Id": "549b9b86cb8d...",
    "RepoTags": ["ubuntu:latest"],
    "Created": "2020-09-15T23:05:57.348340124Z",
    "ContainerConfig": {
      "ExposedPorts": {
        "80/tcp": {}
      }
    },
    "DockerVersion": "18.09.7",
    "Architecture": "amd64",
    "Os": "linux",
    "Size": 137532780
  }
]
```

> [!important]
> **Warning**
>
> Inspecting very large images may output extensive JSON. Use filtering (see next section) or redirect output to a file:
>
> ```
> docker image inspect ubuntu > ubuntu-inspect.json
> ```

| Command                        | Description                        |
| ------------------------------ | ---------------------------------- |
| `docker image inspect <IMAGE>` | Display full image metadata (JSON) |

## Filtering with JSONPath

Docker’s `inspect` supports the `-f` flag with [JSONPath](https://kubernetes.io/docs/reference/kubectl/jsonpath/) templates to extract specific fields.

### Common Filters

| Filter Template                  | Description                 |
| -------------------------------- | --------------------------- |
| `-f '{{.Os}}'`                   | Display the OS              |
| `-f '{{.Architecture}}'`         | Show the architecture       |
| `-f '{{.Architecture}} {{.Os}}'` | Combine architecture and OS |

```
docker image inspect httpd -f '{{.Os}}'
docker image inspect httpd -f '{{.Architecture}}'
docker image inspect httpd -f '{{.Architecture}} {{.Os}}'
# Output: amd64 linux
```

### Retrieving Exposed Ports

To list all ports exposed by an image:

```
docker image inspect httpd \
  -f '{{range $p := .ContainerConfig.ExposedPorts}}{{printf "%s " $p}}{{end}}'
```

Example output:

```
80/tcp
```

## References

- [Docker CLI Reference](https://docs.docker.com/engine/reference/commandline/cli/)
- [Docker Inspect](https://docs.docker.com/engine/reference/commandline/inspect/)
- [JSONPath Guide](https://kubernetes.io/docs/reference/kubectl/jsonpath/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/f2e605a0-1ea7-434b-a139-0db000b0a250/lesson/50617d16-47a8-40d2-8c3c-4d5a32117922)**
>
> Watch video content
