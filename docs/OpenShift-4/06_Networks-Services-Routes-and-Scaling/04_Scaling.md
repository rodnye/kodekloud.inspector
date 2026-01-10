# Scaling - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Networks-Services-Routes-and-Scaling/Scaling)

---

## Table of Contents

- Scaling
  - Watch Video

---

## Content

OpenShift 4

Networks Services Routes and Scaling

# Scaling

Hello, and welcome to this lesson on scaling applications with OpenShift.

Scaling an application in OpenShift involves modifying the number of replicas managed by its replication controller. The replication controller is responsible for ensuring that the desired number of pod replicas is running at all times. This means that whenever you adjust the replica count, OpenShift automatically creates or removes pods as needed. Additionally, the OpenShift Service or Router distributes incoming traffic evenly across all available pods, ensuring continuous application performance and high availability.

> [!important]
> **Tip**
>
> You can modify the replica count either by updating the YAML configuration file directly or by using the OpenShift web console, which provides a one-click solution for scaling your application up or down.

![The image illustrates a "Scale Deployment" process, showing a diagram of a replication controller with multiple pods and a deployment configuration interface for a web application.](https://kodekloud.com/kk-media/image/upload/v1752882687/notes-assets/images/OpenShift-4-Scaling/scale-deployment-replication-controller-diagram.jpg)

Next, we will walk through the process of scaling an application in OpenShift to help you understand each step in detail.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/ec611802-285c-4fb9-b13e-26eb84f4ec7d/lesson/cf512a01-296d-46ce-8c25-7e4da3a9097e)**
>
> Watch video content
