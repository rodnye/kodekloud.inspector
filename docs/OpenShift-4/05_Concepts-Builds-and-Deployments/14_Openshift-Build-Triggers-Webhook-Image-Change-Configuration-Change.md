# Openshift Build Triggers Webhook Image Change Configuration Change - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Concepts-Builds-and-Deployments/Openshift-Build-Triggers-Webhook-Image-Change-Configuration-Change)

---

## Table of Contents

- Openshift Build Triggers Webhook Image Change Configuration Change
  - Manual Build Trigger
  - The Three Primary Build Triggers
  - Examining Build Triggers in the OpenShift Console
  - Conclusion
  - Watch Video
    - Webhook Trigger
    - Image Change Trigger
    - Configuration Change Trigger

---

## Content

OpenShift 4

Concepts Builds and Deployments

# Openshift Build Triggers Webhook Image Change Configuration Change

In previous lessons, we explored manual build triggers in the OpenShift console. In this guide, we dive deeper into the three primary triggers available in OpenShift—Webhook, Image Change, and Configuration Change—and explain how they work in practice.

## Manual Build Trigger

Initially, you can trigger builds manually through the OpenShift console. After navigating to the Builds section and selecting a specific build configuration, click the hamburger menu and choose "Start Build." As a result, you may see multiple builds initiated, as depicted below:

![The image shows a Red Hat OpenShift Container Platform interface displaying a list of builds with their names, statuses, and creation dates. The builds include "mywebsite-1," "mywebsite-2," "sockshop-1," and "sockshop-3," with various statuses like "Complete" and "Running."](https://kodekloud.com/kk-media/image/upload/v1752882599/notes-assets/images/OpenShift-4-Openshift-Build-Triggers-Webhook-Image-Change-Configuration-Change/openshift-container-builds-interface.jpg)

Once a build is triggered, you can review its details directly in the console. This includes information on the Git repository, the latest commit, destination for the container image, streaming log events, and relevant environment details. The following screenshot illustrates these build details:

![The image shows the Red Hat OpenShift Container Platform interface, displaying the build details for "mywebsite-2," which is currently running. The "Events" tab is selected, showing a streaming event related to the build.](https://kodekloud.com/kk-media/image/upload/v1752882600/notes-assets/images/OpenShift-4-Openshift-Build-Triggers-Webhook-Image-Change-Configuration-Change/openshift-container-platform-mywebsite2-events.jpg)

> [!important]
> **Note**
>
> While manual triggers are useful for testing, the process of logging in, navigating to builds, and manually clicking "Start Build" is not optimal for automated development workflows. Automated build triggers help streamline continuous integration and delivery (CI/CD).

## The Three Primary Build Triggers

OpenShift comes with three main automated build triggers:

1.  ### Webhook Trigger

    A webhook trigger sends a request to a specific API endpoint when certain events occur. It can be triggered from sources like GitHub, GitLab, Bitbucket, or any system capable of making web requests. For instance, whenever there is an update to the repository, the webhook triggers an automated build by sending a request to the OpenShift API.

    ![The image outlines "The Three Build Triggers," focusing on sending requests to an API and using multiple webhooks, with icons representing GitHub, GitLab, Bitbucket, and another service.](https://kodekloud.com/kk-media/image/upload/v1752882601/notes-assets/images/OpenShift-4-Openshift-Build-Triggers-Webhook-Image-Change-Configuration-Change/three-build-triggers-api-webhooks.jpg)

2.  ### Image Change Trigger

    With the image change trigger, a new build is initiated automatically when the associated ImageStream tag is updated. For example, once an image tag changes from version 1.1 to 1.2, OpenShift starts a build to incorporate the updated container image. This automation reduces the manual steps typically required for tasks such as running "docker build." However, be cautious during development where frequent builds might lead to unnecessary resource consumption. It might be best to enable image change triggers in staging or production environments.

    ![The image illustrates "The Three Build Triggers" with icons of images and tags, including a red square with an image and tag inside.](https://kodekloud.com/kk-media/image/upload/v1752882602/notes-assets/images/OpenShift-4-Openshift-Build-Triggers-Webhook-Image-Change-Configuration-Change/three-build-triggers-icons.jpg)

3.  ### Configuration Change Trigger

    The configuration change trigger kicks in when there is a modification within the Pod template or any other configuration settings. This change results in the creation of a new ReplicaSet. While this behavior is similar to GitOps—where updates to Kubernetes manifests (or source control) automatically drive new deployments—it is not officially labeled as GitOps in the OpenShift documentation, though the mechanism is comparable.

## Examining Build Triggers in the OpenShift Console

To see these triggers in action, navigate to your project's BuildConfigs in the OpenShift console and select a build configuration (for example, for the Sock Shop project). Next, click the hamburger menu and open the "YAML" view to inspect the configuration details.

![The image shows the Red Hat OpenShift Container Platform interface, displaying the BuildConfig details for a project named "sockshop." It includes information such as the namespace, Git repository, and build type.](https://kodekloud.com/kk-media/image/upload/v1752882603/notes-assets/images/OpenShift-4-Openshift-Build-Triggers-Webhook-Image-Change-Configuration-Change/openshift-sockshop-buildconfig-interface.jpg)

Within the YAML configuration, you will notice that certain build triggers are preconfigured by default. An example YAML segment is provided below:

```
uri: 'https://github.com/microservices-demo/microservices-demo.git'
ref: master
triggers:
  - type: ImageChange
    imageChange: {}
  - type: ConfigChange
    runPolicy: Serial
status:
  lastVersion: 3
  imageChangeTriggers:
```

This snippet shows that both the image change and configuration change triggers are predefined. To inspect the details for a specific build (e.g., "Sock Shop 1"), click on the build and view its YAML. The snippet below demonstrates a build triggered by an image change:

```
- message: Image change
  imageChangeBuild:
    imageID: >
      image-registry.openshift-image-registry.svc:5000/openshift/ruby@sha256:f477f70618375eb34a6da
  fromRef:
    kind: ImageStreamTag
    namespace: openshift
    name: ruby:2.7
strategy:
  type: Source
```

> [!important]
> **Tip**
>
> If your workflow requires additional build scenarios, you can add a webhook trigger to your configuration. This flexibility allows you to fully customize your CI/CD pipeline.

Finally, here are two additional screenshots showing the build status and details in the OpenShift console:

![The image shows the Red Hat OpenShift Container Platform interface displaying a list of builds, with two marked as "Complete" and one as "Failed." The sidebar includes options like Operators, Workloads, Networking, and Storage.](https://kodekloud.com/kk-media/image/upload/v1752882604/notes-assets/images/OpenShift-4-Openshift-Build-Triggers-Webhook-Image-Change-Configuration-Change/openshift-container-platform-builds-list.jpg)

![The image shows the Red Hat OpenShift Container Platform interface displaying build details for a project named "sockshop-1," which is marked as complete. The interface includes navigation options like Operators, Workloads, and Networking.](https://kodekloud.com/kk-media/image/upload/v1752882606/notes-assets/images/OpenShift-4-Openshift-Build-Triggers-Webhook-Image-Change-Configuration-Change/openshift-sockshop-1-build-details.jpg)

## Conclusion

By understanding the various build triggers in OpenShift, you can automate your build process to fit your development and deployment pipelines seamlessly. Automated triggers not only reduce manual steps but also ensure that your container images are kept up-to-date, leading to more efficient and reliable CI/CD workflows.

Happy building!

For more information on OpenShift and container orchestration, check out the following resources:

- [OpenShift Documentation](https://docs.openshift.com)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/3200131b-dec7-4422-9e05-68c751bc4213/lesson/58afd8f1-5cdf-4e9a-967c-ec641835f128)**
>
> Watch video content
