# Image Streams Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Concepts-Builds-and-Deployments/Image-Streams-Overview)

---

## Table of Contents

- Image Streams Overview
  - Watch Video

---

## Content

OpenShift 4

Concepts Builds and Deployments

# Image Streams Overview

Image streams enable dynamic updates to deployments by using tags to manage container images. This feature is particularly valuable in OpenShift environments where automation and efficient container management are critical.

When you update a container image—such as changing a tag from "latest" to "3.4"—the image stream continuously monitors the associated container registry. It then automatically propagates the update to your deployment. This process removes the need to manually adjust configuration manifests, streamlining your workflow.

Image streams work by continuously creating and updating container images through an abstraction layer that watches for changes. When a new tag is assigned to an image, the image stream detects and tracks the modification. This ensures that any deployment referencing that image automatically receives the updated version.

> [!important]
> **Note**
>
> Deployments that reference a specific image tag benefit greatly from this functionality, as the image stream can trigger automatic rolling updates. This means your application can smoothly transition from one version of a container image to another without manual intervention.

A core benefit of image streams is their ability to automatically trigger deployment updates. For instance, when a developer pushes a new version of a container image, the image stream identifies the new tag and initiates an update for the running deployment. This process closely resembles a rolling update, ensuring that changes are applied seamlessly.

Moreover, integrating image streams with your build and deployment processes further automates management. When a new image is added, notifications can be generated and used to deploy the updated image automatically. This automated, repeatable process significantly reduces manual efforts when managing container image versions.

![The image illustrates a process involving image streams, with numbered steps and icons representing images, leading to "Build" and "Deploy" actions.](https://kodekloud.com/kk-media/image/upload/v1752882596/notes-assets/images/OpenShift-4-Image-Streams-Overview/image-streams-build-deploy-process.jpg)

It is important to understand that an image stream does not hold the actual image data. Instead, it acts as a reference to a container registry, pulling the necessary image data as required. Source images can reside in multiple locations, including the OpenShift Container Platform Integrated Registry, external registries like Docker Hub, or Red Hat's registry.

![The image illustrates that an "Image Stream" is not equivalent to "Actual Data," with a list of numbered items on the left.](https://kodekloud.com/kk-media/image/upload/v1752882596/notes-assets/images/OpenShift-4-Image-Streams-Overview/image-stream-vs-actual-data.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/3200131b-dec7-4422-9e05-68c751bc4213/lesson/229f7b61-49ec-4223-802d-ea7e32f5aa71)**
>
> Watch video content
