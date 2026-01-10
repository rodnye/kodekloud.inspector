# Openshift Build Strategies - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Concepts-Builds-and-Deployments/Openshift-Build-Strategies)

---

## Table of Contents

- Openshift Build Strategies
  - Build Strategies Overview
  - Build Input Options
  - Conclusion
  - Watch Video
    - Additional Build Parameters

---

## Content

OpenShift 4

Concepts Builds and Deployments

# Openshift Build Strategies

In previous lessons, we examined builds and build configurations from a conceptual standpoint. In this article, we will dive into the various build strategies available in OpenShift and detail the build input options, enabling you to select the approach that best fits your development workflow.

## Build Strategies Overview

OpenShift provides four primary strategies for creating build configurations:

1.  **Source-to-Image (S2I):**  
    Source-to-image (S2I) creates Docker-formatted container images by injecting application source code into an existing container image. The process produces ready-to-run images assembled from your application code combined with a base image.
2.  **Pipeline:**  
    The pipeline strategy utilizes a Jenkins pipeline defined in a Jenkinsfile. OpenShift, through its Jenkins plugin, takes charge of starting, monitoring, and managing the entire build process, ensuring seamless integration between the pipeline and the OpenShift build system.
3.  **Docker:**  
    The Docker strategy functions similarly to the traditional Docker build command. If you're familiar with Docker, you'll notice that this strategy requires a Dockerfile in your code repository. The Dockerfile guides the build process exactly as it would when executing a `docker build` command.
4.  **Custom:**  
    The custom build strategy offers flexibility by allowing developers to define their own builder image. This plain Docker-formatted container image includes custom build process logic, which can be used to build artifacts such as RPMs, base images, or any artifacts not supported by the other strategies.

![The image illustrates a "Build Configuration Strategy" with a central grid of four red arrows pointing in different directions, labeled as Custom, Source to Image, Docker, and Pipeline.](https://kodekloud.com/kk-media/image/upload/v1752882597/notes-assets/images/OpenShift-4-Openshift-Build-Strategies/build-configuration-strategy-arrows.jpg)

## Build Input Options

When configuring a build, you supply build input that contains your application’s source code along with any associated files. OpenShift supports several build input options:

- **Git:**  
  Source code is fetched directly from a Git repository, ensuring code versioning and seamless integration with your development workflows.
- **Dockerfile:**  
  A Dockerfile serves as the blueprint for your container image build. It typically includes a `FROM` statement to specify a base image and other instructions to guide the image construction.
- **Binary:**  
  You can use binary data provided from a local filesystem. This option is useful when you want to upload pre-built artifacts as part of the build process.
- **Image:**  
  Additional files necessary for the image build process can be supplied via an image source, allowing for more advanced build scenarios.

> [!important]
> **Tip**
>
> For users who incorporate a Dockerfile in their build configuration, ensure that the file includes clear instructions such as `FROM`, `RUN`, and `CMD` to facilitate a smooth build process.

### Additional Build Parameters

- **Input Secrets:**  
  Input secrets allow the build process to securely access external resources or services that require specific credentials or configurations. These could be private repositories or secured endpoints.
- **External Artifacts:**  
  Although you have the option to include external artifacts (such as a Java JAR file), it is generally discouraged in modern containerized environments. Traditionally, binaries were deployed directly onto servers (using commands like `java -jar`), but today's best practice is to use a Dockerfile to build container images.

> [!important]
> **Warning**
>
> Avoid storing binaries as external artifacts. Embrace container-driven workflows by building images with Dockerfiles to ensure consistency, scalability, and ease of deployment in modern environments.

![The image shows a list of build input options, including Git, Dockerfile, Binary, Image, Input Secrets, and External Artifacts, each represented by a red icon with a downward arrow.](https://kodekloud.com/kk-media/image/upload/v1752882598/notes-assets/images/OpenShift-4-Openshift-Build-Strategies/build-input-options-git-dockerfile.jpg)

## Conclusion

This article has provided an overview of OpenShift build strategies and their various input options. Whether you choose S2I, pipeline, Docker, or a custom strategy, the flexible build inputs allow you to adapt to your project’s specific requirements. In subsequent lessons, we will explore practical examples and code implementations that further solidify your understanding of these concepts.

For more insights into OpenShift and containerized development, continue exploring our further lessons and detailed technical guides.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/3200131b-dec7-4422-9e05-68c751bc4213/lesson/bd16c674-e58a-41d3-9774-0fb98a54f826)**
>
> Watch video content
