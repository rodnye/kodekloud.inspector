# Demo Creating a Builder - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cloud-Native-Buildpacks/Creating-Builders/Demo-Creating-a-Builder)

---

## Table of Contents

- Demo Creating a Builder
  - Creating the Base Image
  - Creating the Runtime Image
  - Configuring the Builder with builder.toml
  - Creating and Testing the Builder
  - Summary
  - Watch Video
    - Dockerfile: build-base.Dockerfile
    - Enhancing the Dockerfile
    - Building the Base Image
    - Dockerfile: run-base.dockerfile
    - Building the Runtime Image
    - Defining Buildpacks and Order
    - Specifying Base Images
    - Build Process Overview

---

## Content

Cloud Native Buildpacks

Creating Builders

# Demo Creating a Builder

In this guide, you'll learn how to create your own builder by assembling the necessary files and configuring them step by step. We will begin by creating a folder named "builder" to hold all the essential files for your custom builder.

─────────────────────────────

## Creating the Base Image

The first step is to establish the base image used during the build stage. This image is crucial as it defines the environment for processing buildpacks and ultimately creating the final runtime image.

### Dockerfile: build-base.Dockerfile

Create a Dockerfile named **build-base.Dockerfile** with the following content. This file uses Ubuntu Jammy as the base image, installs required utilities (including xz-utils, ca-certificates, jq, wget, and curl), and adds the YJ tool. It also configures the CNB user and group information.

```
# Define the base image
FROM ubuntu:jammy


# Install packages that we want to make available at build time
RUN apt-get update && \
    apt-get install -y xz-utils ca-certificates jq wget curl && \
    rm -rf /var/lib/apt/lists/*


RUN curl -Lo yj https://github.com/sclevine/yj/releases/download/v5.1.0/yj-linux-amd64 && chmod +x yj && mv yj /usr/local/bin/


# Set required CNB user information
ARG cnb_uid=1000
ARG cnb_gid=1000
ENV CNB_USER_ID=${cnb_uid}
ENV CNB_GROUP_ID=${cnb_gid}
```

When you build this image, you may observe logs similar to the example below:

```
[exporter] Adding layer 'buildpacksio/lifecycle:process-types'
[exporter] Adding label 'io.buildpacks.lifecycle.metadata'
[exporter] Adding label 'io.buildpacks.project.metadata'
[exporter] Setting default process type 'web'
[exporter] Saving test...
*** Images (a303c1438de1):
test
[exporter] Adding cache layer 'my-js-buildpack:node-dependencies'
[exporter] Adding cache layer 'my-js-buildpack:node-js'
[exporter] Exporting built image test
```

> [!important]
> **Additional Configuration**
>
> To further enhance your base image, add commands to create a dedicated user and group for CNB and label your distribution.

### Enhancing the Dockerfile

Append the following commands to the Dockerfile to create a user, assign group privileges, and add metadata labels:

```
ARG cnb_gid=1000
ENV CNB_USER_ID=${cnb_uid}
ENV CNB_GROUP_ID=${cnb_gid}
# Create user and group
RUN groupadd cnb --gid ${CNB_GROUP_ID} && \
    useradd --uid ${CNB_USER_ID} --gid ${CNB_GROUP_ID} -m -s /bin/bash cnb
# Set user and group
USER ${CNB_USER_ID}:${CNB_GROUP_ID}
# Set required CNB target information
LABEL io.buildpacks.base.distro.name="ubuntu"
LABEL io.buildpacks.base.distro.version="22.04"
```

After these modifications, your build log should resemble:

```
[exporter] Adding label 'buildpacksio/lifecycle:process-types'
[exporter] Adding label 'io.buildpacks.lifecycle.metadata'
[exporter] Adding label 'io.buildpacks.project.metadata'
[exporter] Setting default process 'web'
[exporter] Saving test...
*** Images (a303c1438de1):
       test
[exporter] Adding cache layer 'my-js-buildpack:node-dependencies'
[exporter] Adding cache layer 'my-js-buildpack:node-js'
Successfully built image test
```

### Building the Base Image

Execute the following command to build the base image:

```
docker build -t build-base:v1 -f build-base.Dockerfile .
```

Below is an example of the build output:

```
[internal] load metadata for docker.io/library/ubuntu:jammy
[internal] load .dockerignore
=> transferring context: 2B
[1/4] FROM docker.io/library/ubuntu:jammy@sha256:0e5a45c72499249aafc340fcd541e9a456aab7296681a3994d613587203f97
CACHED [2/4] RUN apt-get update && apt-get install -y xz-utils ca-certificates jq wget curl && rm -rf /var/lib/apt/lists/*
CACHED [3/4] RUN curl -Lo yj https://github.com/schleini/yj/releases/download/v5.1.0/yj-linux-amd64 && chmod +x yj && mv yj /usr/local/bin/
CACHED [4/4] RUN groupadd cnb --gid 1000 && useradd --uid 1000 --gid 1000 -m -s /bin/bash cnb
=> exporting to image
=> exporting layers
=> writing image sha256:04d2c2afe9e7360523a8dcdafc299e868e624a42e6c2e4de309
```

─────────────────────────────

## Creating the Runtime Image

Next, we will create the runtime image, which will host your application and include only the essential runtime dependencies.

### Dockerfile: run-base.dockerfile

Create a file named **run-base.dockerfile** with the following content. The runtime Dockerfile is similar to the build image but installs fewer packages.

```
# Define the base image
FROM ubuntu:jammy


# Install packages that we want to make available at run-time
RUN apt-get update && \
    apt-get install -y xz-utils ca-certificates && \
    rm -rf /var/lib/apt/lists/*


# Create user and group
ARG cnb_uid=1000
ARG cnb_gid=1000
RUN groupadd cnb --gid ${cnb_gid} && \
    useradd --uid ${cnb_uid} --gid ${cnb_gid} -m -s /bin/bash cnb


# Set user and group
USER ${cnb_uid}:${cnb_gid}


# Set required CNB target information
LABEL io.buildpacks.base.distro.name="ubuntu"
LABEL io.buildpacks.base.distro.version="22.04"
```

A sample build log for the runtime image may look like this:

```
[internal] load metadata for docker.io/library/ubuntu:jammy
[internal] load .dockerignore
=> transferring context: 2B
[1/4] FROM docker.io/library/ubuntu:jammy@sha256:0e5a475c249294aafc340fcd541e9a456aab7296681a3994d613587203f97
CACHED [2/4] RUN apt-get update && ...
CACHED [3/4] RUN curl -Lo yj https://github.com/sclevine/yj/releases/download/v5.1.0/yj-linux-amd64 && chmod +x yj &&
CACHED [4/4] RUN groupadd cnb --gid 1000 && ...
exporting to image
writing image sha256:04d2c26afe940c736053a38dc4dcfa12c299e68624a42e6c2e4de309
```

### Building the Runtime Image

Run the following command to build the runtime image:

```
docker build -t run-base:v1 -f run-base.dockerfile .
```

─────────────────────────────

## Configuring the Builder with builder.toml

With both the build and runtime images in place, the next step is to configure your builder using a **builder.toml** file. This configuration file specifies the buildpacks to include and outlines the order in which they will execute during the detection phase.

### Defining Buildpacks and Order

Create the **builder.toml** file in your builder directory with the following contents. In this example, we include a JavaScript buildpack and a sample buildpack:

```
# Buildpacks to include in builder
[[buildpacks]]
uri = "docker://sanjeevkt720/my-js-buildpack"


[[buildpacks]]
uri = "docker://cnbs/sample-package:hello-universe"
```

Define the order in which your buildpacks will run. In this case, the JavaScript buildpack runs first followed by the sample buildpack:

```
[[order]]
  [[order.group]]
    id = "my-js-buildpack"
  [[order.group]]
    id = "samples/hello-universe"
```

### Specifying Base Images

Complete your **builder.toml** configuration by specifying the base images for both the build and run phases:

```
[build]
  image = "build-base:v1"


[run]
  [[run.image]]
    image = "run-base:v1"
```

A full example of **builder.toml** looks as follows:

```
[[buildpacks]]
uri = "docker://sanjeevkt720/my-js-buildpack"


[[buildpacks]]
uri = "docker://cnbs/sample-package:hello-universe"


[[order]]
  [[order.group]]
    id = "my-js-buildpack"
  [[order.group]]
    id = "samples/hello-universe"


[build]
  image = "build-base:v1"


[run]
  [[run.image]]
    image = "run-base:v1"
```

When processing this configuration, Docker will indicate that contexts are being transferred and layers are cached.

─────────────────────────────

## Creating and Testing the Builder

After configuring your builder, use the Pack CLI to create your builder image. Run the following command:

```
pack builder create my-builder --config ./builder.toml
```

Once the builder image is successfully created (verify using `docker image ls`), you can test it by building a sample image from your Node.js application. Change to the directory containing your application and execute:

```
pack build my-image --path nodejs-app/ --builder my-builder
```

### Build Process Overview

During the build process, you will see several distinct phases:

- **ANALYZING** – Checks for an existing image.
- **DETECTING** – Runs the detection phase for your buildpacks (e.g., my-js-buildpack, samples/hello-world, and samples/hello-moon).
- **RESTORING and BUILDING** – Installs Node.js (for example, version 18.18.1) along with its dependencies, caches layers, and finalizes the image.

An excerpt of the build logs could include:

```
0.20.0: Pulling from buildpacksio/lifecycle
Digest: sha256:bald717ec095f94eb75a667a2fe4178f6f5de6430c89c7168cd04fcfd3
Status: Image is up to date for buildpacksio/lifecycle:0.20.0
=== ANALYZING
[analyzer] Image with name "my-image" not found
===> DETECTING
[detector] my-js-buildpack    0.0.1
[detector] samples/hello-world   0.0.1
[detector] samples/hello-moon    0.0.1
===> RESTORING
===> BUILDING
Building image using my-js-buildpack buildpack
[builder] nodejs version: 18.18.1
[builder] cached version: null
```

After the build completes, you should see confirmation messages similar to the following:

```
[exporter] Saving my-image...
*** Images (3d886d0be80):
    my-image
[exporter] Adding cache layer 'my-js-buildpack:node-dependencies'
[exporter] Adding cache layer 'my-js-buildpack:node-js'
Successfully built image my-image
```

> [!important]
> **Tip**
>
> Ensure that the builder image is correctly created before attempting to build your application, as this step validates your configuration and buildpack order.

─────────────────────────────

## Summary

In this lesson, you have learned how to create a custom builder for buildpacks by:

- Defining a base image (build-base) and a runtime image (run-base) using dedicated Dockerfiles.
- Configuring a **builder.toml** file to list the required buildpacks and specify the detection order.
- Creating and testing the builder using the Pack CLI to build a sample Node.js application image.

This systematic approach guarantees that your buildpacks execute in the correct sequence and that your final runtime image contains only the necessary dependencies for optimal performance.

For more details, refer to [Kubernetes Documentation](https://kubernetes.io/docs/) or check out the [Pack CLI documentation](https://buildpacks.io/docs/tools/pack/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cloud-native-buildpacks/module/94f2e47e-b25f-4e0c-8073-694c188e7cab/lesson/69a3e567-2ae8-4475-886f-f2328ea6afdc)**
>
> Watch video content
