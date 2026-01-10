# Demo Rebase - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cloud-Native-Buildpacks/Buildpacks-Basics/Demo-Rebase)

---

## Table of Contents

- Demo Rebase
  - Step 1: Verify Your Application Image
  - Step 2: Create a New Base Image
  - Step 3: Build the New Base Image
  - Step 4: Rebase the Application Image
  - Step 5: Verify the Updated Base Image
  - Watch Video
    - Original Dockerfile (Ubuntu Jammy)
    - Updated Dockerfile (Ubuntu Focal)

---

## Content

Cloud Native Buildpacks

Buildpacks Basics

# Demo Rebase

In this lesson, we demonstrate how to use rebasing to update the operating system base layer without rebuilding the subsequent layers, including the application layer. This approach is especially useful when addressing security vulnerabilities, installing new libraries, or upgrading the underlying distribution—all without the overhead of a full rebuild.

## Step 1: Verify Your Application Image

Before rebasing, ensure that your application image is built and available in Docker. Run the following command to list your Docker images:

```
docker image ls
```

To inspect the image details, including the buildpacks used and the runtime image, execute:

```
pack inspect myapp
```

The output will include detailed information similar to:

```
Inspecting image: myapp


REMOTE:
  (not present)


LOCAL:
  Stack:
    Base Image:
      Reference: 36862ffaa256b69f1c92251e433dbe12c522f8d6d1476e792599f20c9fcb532c
      Top Layer: sha256:130264b1764b99aa2091ee0664a5e8dbf6ead305d43cd67407331191739e0d48


  Run Images:
    run-base:v1


  Rebasable: true


  Buildpacks:
    ID              VERSION   HOMEPAGE
    my-js-buildpack 0.0.1     -


  Processes:
    TYPE         SHELL   COMMAND   ARGS      WORK DIR
    web (default) node    index.js  /workspace
```

The output confirms that the current base (runtime) image is `run-base:v1`.

> [!important]
> **Note**
>
> The `pack inspect` command provides critical insight into your image’s structure. Verifying that your image is rebasable is an important prerequisite before proceeding.

## Step 2: Create a New Base Image

Suppose you need to update the base image—for instance, to switch from Ubuntu Jammy to Ubuntu Focal and install additional packages. First, modify your Dockerfile for the runtime image.

### Original Dockerfile (Ubuntu Jammy)

```
# Define the base image
FROM ubuntu:jammy


# Install packages that we want to make available at run time
RUN apt-get update && \
    apt-get install -y xz-utils ca-certificates && \
    rm -rf /var/lib/apt/lists/*


# Create user and group
ARG cnb_uid=1000
ARG cnb_gid=1000
RUN groupadd cnb --gid ${cnb_gid} && \
    useradd --uid ${cnb_uid} --gid ${cnb_gid} -m -s /bin/bash cnb
```

### Updated Dockerfile (Ubuntu Focal)

```
# Define the base image
FROM ubuntu:focal


# Install packages that we want to make available at run time
RUN apt-get update && \
    apt-get install -y xz-utils ca-certificates && \
    rm -rf /var/lib/apt/lists/*


# Create user and group
ARG cnb_uid=1000
ARG cnb_gid=1000
RUN groupadd cnb --gid ${cnb_gid} && \
    useradd --uid ${cnb_uid} --gid ${cnb_gid} -m -s /bin/bash cnb
```

## Step 3: Build the New Base Image

Before building, verify that your containers are running correctly by checking them with:

```
docker ps
```

Now, navigate to the appropriate directory (for example, the "builder" directory) and build the new base image:

```
docker build -t run-base:v2 .
```

> [!important]
> **Note**
>
> Ensure you are in the correct directory containing the updated Dockerfile before running the build command.

## Step 4: Rebase the Application Image

After successfully building the new base image (`run-base:v2`), update the application image using rebasing with the following command:

```
pack rebase myapp --run-image run-base:v2
```

This command replaces the original runtime image with `run-base:v2` without rebuilding the other layers of your image.

## Step 5: Verify the Updated Base Image

To confirm that rebasing was successful, inspect your application image again:

```
pack inspect myapp
```

You should see output reflecting the updated base image, similar to:

```
Inspecting image: myapp


REMOTE:
  (not present)


LOCAL:
Stack:
  Base Image:
    Reference: d5f7d132c2f196de58bb1ca4fb041fa9a5829587f3cb9c01aed442f79d9b8e
    Top Layer: sha256:8460bddda3ad232a2e8af998246486378f5c3df30c499a08b58a89fb71


  Run Images:
    run-base:v21
Rebasable: true


Buildpacks:
  ID                      VERSION  HOMEPAGE
  my-js-buildpack         0.0.1    https://github.com/buildpacks/samples/tree/main/buildpacks/hello-world
  samples/hello-world     0.0.1    https://github.com/buildpacks/samples/tree/main/buildpacks/hello-world
  samples/hello-moon      0.0.1    https://github.com/buildpacks/samples/tree/main/buildpacks/hello-moon
```

This demonstrates that only the base image layer was replaced, while the application layer remains unchanged.

> [!important]
> **Summary**
>
> Rebasing provides an efficient workflow for updating critical components like the operating system layer without incurring the overhead of a full image rebuild.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cloud-native-buildpacks/module/d2170747-7a07-4648-b449-958edfff954b/lesson/317cbaf3-9d6e-4e9c-8bdd-329d9147533f)**
>
> Watch video content
