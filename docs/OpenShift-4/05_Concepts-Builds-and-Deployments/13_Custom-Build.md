# Custom Build - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Concepts-Builds-and-Deployments/Custom-Build)

---

## Table of Contents

- Custom Build
  - Traditional vs. Modern Build Processes
  - Key Components of the Custom Builder
  - Integrating with CI/CD Pipelines
  - Watch Video

---

## Content

OpenShift 4

Concepts Builds and Deployments

# Custom Build

In this article, we explore an innovative concept that seamlessly bridges traditional build methods with modern containerized application practices. The custom image builder offers a valuable middle ground, ensuring that legacy build artifacts such as JAR, WAR, or ZIP files remain accessible while embracing the benefits of containerization.

## Traditional vs. Modern Build Processes

Historically, deploying an application involved writing code, compiling it into a binary (for example, a Java JAR file), and then running that binary on the target system. Over time, developers began using Dockerfiles to build container images and deploy containers. Despite the surge in popularity of container images, there is still a strong need for a build process that generates conventional artifacts. The custom image builder fulfills this need by integrating build process logic into a minimal base image.

![The image compares two processes: the original way using a JAR file and the newer way using a DockerFile, both involving a user and a command line interface.](https://kodekloud.com/kk-media/image/upload/v1752882570/notes-assets/images/OpenShift-4-Custom-Build/jar-file-vs-dockerfile-comparison.jpg)

The custom builder image is conceptually similar to a scratch container image—it is extremely minimal, including only the essentials to perform its designated task: encapsulating the build process. Additionally, it can be extended to integrate with CI/CD pipelines, offering greater flexibility and automation in your development lifecycle.

## Key Components of the Custom Builder

Even when using a pre-built container image, several runtime components are necessary to ensure a successful build process:

- The build process logic itself.
- The source repository containing the application code.
- The specific directory within the repository where the build should execute.
- The source reference (branch, tag, or commit).
- The target version of OpenShift upon which the build is based.
- The output destination where the resulting container image will be deployed.
- The designated image name or tag.
- Any credentials needed to interact with the container registry.
- Access to the Docker socket for the runtime environment.

For instance, when a Git repository contains multiple directories, it is crucial to specify the directory that holds the actual code to be built.

![The image is a table listing variable names and their descriptions related to a build configuration, likely for a software development or deployment process.](https://kodekloud.com/kk-media/image/upload/v1752882572/notes-assets/images/OpenShift-4-Custom-Build/build-configuration-variable-descriptions.jpg)

> [!important]
> **Note**
>
> Specifying the correct directory and configuration parameters ensures that your build process targets the correct code segment and produces the desired artifacts.

## Integrating with CI/CD Pipelines

The custom builder image consolidates all these parameters into one cohesive process. This integration not only simplifies the generation of build artifacts but also makes it easy to incorporate into larger CI/CD pipelines. The result is an automated and efficient build and deployment process tailored for modern development workflows.

![The image shows three red squares with arrows, each accompanied by text describing different types of images: "Plain image with build process logic," "Implements extensions like CICD," and "Sort of like a scratch container image."](https://kodekloud.com/kk-media/image/upload/v1752882573/notes-assets/images/OpenShift-4-Custom-Build/red-squares-image-types-diagram.jpg)

This design paradigm delivers both artifact creation and extended functionalities like CI/CD, offering enhanced flexibility and efficiency for developers transitioning from traditional build systems to container-based architectures.

For more information on containerization best practices, explore [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) and [OpenShift Documentation](https://docs.openshift.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/3200131b-dec7-4422-9e05-68c751bc4213/lesson/2a680a93-8b77-4eab-a276-311e383ffaa3)**
>
> Watch video content
