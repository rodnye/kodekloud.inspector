# Docker Build - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Concepts-Builds-and-Deployments/Docker-Build)

---

## Table of Contents

- Docker Build
  - Docker BuildConfig Example
  - Creating the BuildConfig in OpenShift
  - The Dockerfile
  - Monitoring the Build
  - Conclusion
  - Watch Video

---

## Content

OpenShift 4

Concepts Builds and Deployments

# Docker Build

In this article, we detail how to set up BuildConfigs and process builds to generate OCI-compliant container images using Buildah and OpenShift. In a typical scenario, you might have a Dockerfile stored in your Git repository that you want to convert into a fully compliant container image. OpenShift leverages Buildah to streamline this process.

Buildah automatically creates container images that comply with the Open Container Initiative (OCI) standards. It builds images from scratch, ensuring that they work seamlessly across different Kubernetes versions and environments regardless of the build method used (such as Dockerfiles, Podman, or Cloud Native Buildpacks). Buildah’s robust capabilities include creating a new container, mounting its root filesystem to update file contents, and producing a compliant image.

The following diagram illustrates Buildah’s role in automating these tasks:

![The image features the "buildah" logo with text highlighting its capabilities: creating a working container from scratch and building images in an OCI-compliant fashion, with automation.](https://kodekloud.com/kk-media/image/upload/v1752882593/notes-assets/images/OpenShift-4-Docker-Build/buildah-logo-container-automation.jpg)

## Docker BuildConfig Example

The BuildConfig for a Docker-based strategy closely mirrors other BuildConfigs in OpenShift. It includes the API version, resource kind, metadata (such as name and labels), and the source location (typically a Git repository). The primary distinction is found in the strategy section—where the type is set to Docker and the Docker strategy specifies the path to the Dockerfile.

Below is an example BuildConfig YAML file:

```
apiVersion: build.openshift.io/v1
kind: BuildConfig
metadata:
  name: mywebsite
  labels:
    app: mywebsite
spec:
  source:
    type: Git
    git:
      uri: https://github.com/AdminTurnedDevOps/GoWebAPI
      contextDir: .
  strategy:
    type: Docker
    dockerStrategy:
      dockerfilePath: Dockerfile
  output:
    to:
      kind: ImageStreamTag
      name: gowebapi:latest
```

This configuration directs OpenShift to use the Dockerfile from the specified Git repository to build a container image named "gowebapi:latest." The completed image is then stored in OpenShift’s internal registry.

## Creating the BuildConfig in OpenShift

To create the BuildConfig through the OpenShift console, follow these steps:

1.  Navigate to the "Build" section and then "BuildConfigs."
2.  Create a new BuildConfig and clear the default template.
3.  Paste the YAML configuration provided above. Be sure to specify the appropriate namespace by adding `namespace: default` under the metadata section:

    ```
    apiVersion: build.openshift.io/v1
    kind: BuildConfig
    metadata:
      name: mywebsite
      namespace: default
      labels:
        app: mywebsite
    spec:
      source:
        type: Git
        git:
          uri: https://github.com/AdminTurnedDevOps/GoWebAPI
          contextDir: .
      strategy:
        type: Docker
        dockerStrategy:
          dockerfilePath: Dockerfile
      output:
        to:
          kind: ImageStreamTag
          name: gowebapi:latest
    ```

4.  Save the configuration. With this BuildConfig in place, OpenShift will monitor your Git repository for the Dockerfile, execute the build using the Docker strategy, and push the resulting image to the internal registry.

> [!important]
> **Note**
>
> Ensure that your Git repository and Dockerfile are correctly configured to avoid build-time issues.

## The Dockerfile

The Dockerfile used in this example is designed for building a Go-based application. Even if you're not familiar with Go, the Dockerfile performs the following crucial steps:

- Pulls the latest Golang image.
- Creates an application directory (`/app`).
- Adds all application files to the container.
- Sets `/app` as the working directory.
- Compiles the Go application.
- Exposes port 8080.
- Specifies the command to run the application.

Below is the Dockerfile:

```
FROM golang:latest
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN go build -o main .
EXPOSE 8080
CMD ["/app/main"]
```

After configuring the BuildConfig and Dockerfile, initiate the build process from the OpenShift console by clicking the hamburger menu and selecting "Start Build." The build will start in a pending state, and you can view the details to verify that the Docker strategy, Git repository, and output image are properly configured.

## Monitoring the Build

While the build is in progress, logs will detail each step, including:

- Cloning the Git repository.
- Pulling the Golang image.
- Executing the Dockerfile to build the container image.

An excerpt from the build log might look like this:

```
Pulling image golang:latest ...
Resolving "golang" using unqualified-search registries (/etc/containers/registries.conf)
Trying to pull registry.redhat.io/golang:latest...
time="2022-09-12T10:17:46Z" level=warning msg="failed, retrying in 1s ... (1/3)"
...
```

These logs confirm that the build process is being executed within the OpenShift environment and not on your local machine. The complete build process typically takes about two minutes.

Once the process is finished, open the "Builds" section to review the completed build. Selecting the "GoWebAPI:latest" image stream detail will display the container's configuration, including key settings like the command, working directory, exposed port, and architecture.

![The image shows a Red Hat OpenShift Container Platform interface displaying details of a completed Docker build for a project named "mywebsite-1." It includes information about the namespace, labels, Git repository, and commit details.](https://kodekloud.com/kk-media/image/upload/v1752882594/notes-assets/images/OpenShift-4-Docker-Build/openshift-docker-build-mywebsite-1.jpg)

Key configuration details include:

| Configuration Element | Value     | Description                           |
| --------------------- | --------- | ------------------------------------- |
| Command               | /app/main | Command to run the application        |
| Working Directory     | /app      | Directory where the application runs  |
| Exposed Ports         | 8080/tcp  | Network port exposed by the container |
| Architecture          | amd64     | Container image architecture          |

This confirms that the container was built as intended according to the specifications outlined in both the Dockerfile and BuildConfig.

## Conclusion

In summary, this article demonstrated how to create an OCI-compliant container image in OpenShift using Buildah and a Docker-based BuildConfig. By configuring a BuildConfig, writing an appropriate Dockerfile for a Go application, and initiating the build via the OpenShift console, you can seamlessly produce and deploy consistent container images.

For additional resources on container image building and OpenShift, please refer to the following links:

- [OpenShift Documentation](https://docs.openshift.com/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **Warning**
>
> Ensure that both your Dockerfile and BuildConfig are kept up to date with the latest security patches and best practices to maintain a robust container security posture.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/3200131b-dec7-4422-9e05-68c751bc4213/lesson/f17b386a-3f50-4bff-9e79-a9558ec7548d)**
>
> Watch video content
