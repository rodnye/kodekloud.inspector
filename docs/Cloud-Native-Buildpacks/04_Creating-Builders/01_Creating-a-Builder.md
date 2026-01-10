# Creating a Builder - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cloud-Native-Buildpacks/Creating-Builders/Creating-a-Builder)

---

## Table of Contents

- Creating a Builder
  - 1. Creating the Build Image
  - 2. Creating the Runtime Image
  - 3. Configuring the Builder
  - 4. Creating and Using Your Builder
  - Watch Video

---

## Content

Cloud Native Buildpacks

Creating Builders

# Creating a Builder

In this guide, you'll learn how to create your own builder using Cloud Native Buildpacks. A builder is composed of three essential components:

- A build image for compiling your application.
- A runtime image for executing your application.
- An ordered list of buildpacks that perform detection and build processes.

---

## 1\. Creating the Build Image

The build image provides the environment where all your buildpacks operate. It includes all the tools and packages necessary during the build process. The following Dockerfile example uses Ubuntu Jammy as the base image, installs essential utilities (such as xz-utils, ca-certificates, jq, wget, and curl), and sets up the required user and group for Cloud Native Buildpacks (CNB).

```
# Define the base image
FROM ubuntu:jammy


# Install packages available at build time
RUN apt-get update && \
    apt-get install -y xz-utils ca-certificates jq wget curl && \
    rm -rf /var/lib/apt/lists/*


RUN curl -Lo yj https://github.com/sclevine/yj/releases/download/v5.1.0/yj-linux-amd64 && \
    chmod +x yj && mv yj /usr/local/bin/


# Set required CNB user information
ARG cnb_uid=1000
ARG cnb_gid=1000
ENV CNB_USER_ID=${cnb_uid}
ENV CNB_GROUP_ID=${cnb_gid}


# Create user and group
RUN groupadd cnb --gid ${CNB_GROUP_ID} && \
    useradd --uid ${CNB_USER_ID} --gid ${CNB_GROUP_ID} -m -s /bin/bash cnb


# Use the specified user and group
USER ${CNB_USER_ID}:${CNB_GROUP_ID}


# Set metadata about the build image base
LABEL io.buildpacks.base.distro.name="ubuntu"
LABEL io.buildpacks.base.distro.version="22.04"
```

Once you have saved this Dockerfile (commonly as `build-base.Dockerfile`), build the image using:

```
docker build -t build-base:v1 -f build-base.Dockerfile .
```

---

## 2\. Creating the Runtime Image

The runtime image is the foundation for your final application container and only includes packages necessary for running your application. The Dockerfile below illustrates how to build a minimalist runtime environment based on Ubuntu Jammy:

```
# Define the base image
FROM ubuntu:jammy


# Install packages available at runtime
RUN apt-get update && \
    apt-get install -y xz-utils ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Create user and group for runtime
ARG cnb_uid=1000
ARG cnb_gid=1000
RUN groupadd cnb --gid ${cnb_gid} && \
    useradd --uid ${cnb_uid} --gid ${cnb_gid} -m -s /bin/bash cnb


# Use the specified user and group
USER ${cnb_uid}:${cnb_gid}


# Set metadata about the runtime image base
LABEL io.buildpacks.base.distro.name="ubuntu"
LABEL io.buildpacks.base.distro.version="22.04"
```

To build this runtime image (commonly stored in a file named `run-base.Dockerfile`), use:

```
docker build -t run-base:v1 -f run-base.Dockerfile .
```

---

## 3\. Configuring the Builder

The next step is to define the buildpacks and their order in a configuration file named `builder.toml`. This file specifies the base images (build and run images) as well as an ordered list of buildpacks that the builder will use.

Below is an example configuration:

```
# Buildpacks to include in the builder
[[buildpacks]]
uri = "docker://sanjeevkt720/my-js-buildpack"


[[buildpacks]]
uri = "docker://cnbs/sample-package:hello-universe"


# Order used for detection
[[order]]
  [[order.group]]
    id = "my-js-buildpack"
  [[order.group]]
    id = "samples/hello-universe"


# Base images used to create the builder
[build]
image = "build-base:v1"


[run]
[[run.images]]
image = "run-base:v1"
arch = "amd64"
```

> [!important]
> **Tip**
>
> Ensure that the IDs listed in the order section match those defined in each buildpack's own `buildpack.toml` file. You can inspect a buildpack’s metadata with the command `pack inspect-buildpack <buildpack-uri>`.

---

![The image is a diagram titled "Creating a Builder," showing components of a builder including "Node Buildpack," "Go Buildpack," "Build Image," and "Run Image."](https://kodekloud.com/kk-media/image/upload/v1752871975/notes-assets/images/Cloud-Native-Buildpacks-Creating-a-Builder/creating-a-builder-diagram.jpg)

---

## 4\. Creating and Using Your Builder

With both the build and runtime images, along with the configuration file in place, you can create your custom builder. Run the following command to create the builder using your configured settings:

```
pack builder create my-builder --config ./builder.toml
```

Once the builder is successfully created, build your application image. For instance, if your application source is located in the `nodejs-app/` directory, use:

```
pack build my-image --path nodejs-app/ --builder my-builder
```

This command directs the pack CLI to generate your final application image using the custom builder, which includes your build and runtime images as well as the designated buildpacks.

---

By following these steps, you now have a complete setup for creating and using your own builder with Cloud Native Buildpacks, streamlining the process to build and run your cloud-native applications.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cloud-native-buildpacks/module/94f2e47e-b25f-4e0c-8073-694c188e7cab/lesson/cf3b5aa0-c4af-49d5-81d3-33ebfa7e8b62)**
>
> Watch video content
