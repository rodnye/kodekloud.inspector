# Push vs Pull based Deployments - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Cloud-Native-Application-Delivery/Push-vs-Pull-based-Deployments)

---

## Table of Contents

- Push vs Pull based Deployments
  - Push-Based Deployment
  - Pull-Based Deployment
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Cloud Native Application Delivery

# Push vs Pull based Deployments

Deployment is the process of releasing new versions of an application or software to users. Typically, this involves building the application, running tests, and deploying it to a production environment. In this article, we explore two common deployment methods in Kubernetes environments: push-based and pull-based deployments.

## Push-Based Deployment

In a push-based deployment model, an external system—commonly part of a continuous delivery pipeline—initiates the deployment process. For example, a successful commit to a Git repository or an earlier CI pipeline can trigger this process. This external system requires direct read-write access to the Kubernetes cluster, allowing it to push changes into the production environment.

> [!important]
> **Security Consideration**
>
> When using push-based deployment, you must expose cluster credentials outside of the cluster. Store these credentials securely within your CI/CD system to prevent unauthorized access.

To secure push-based deployments, consider the following best practices:

- Encrypt credentials to shield them from exposure.
- Apply strict access controls to limit who can access these credentials.
- Regularly rotate credentials to minimize security risks.

## Pull-Based Deployment

In pull-based deployment, changes are applied from within the Kubernetes cluster. An operator running inside the cluster continuously monitors associated Git repositories and Docker registries for updates. When the operator detects a change, it synchronizes the cluster state accordingly.

![The image illustrates a pull-based deployment process involving GitHub, Docker, and Kubernetes, showing steps from building artifacts to syncing updated manifests with a Kubernetes cluster.](https://kodekloud.com/kk-media/image/upload/v1752880461/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Push-vs-Pull-based-Deployments/frame_80.jpg)

One significant advantage of this approach is enhanced security. With pull-based deployment, no external client holds administrative access to the cluster, thereby reducing the exposure of sensitive credentials and minimizing the attack surface.

![The image highlights the main benefit of the pull approach, featuring a Kubernetes logo and a shield with a checkmark, symbolizing security or protection.](https://kodekloud.com/kk-media/image/upload/v1752880462/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Push-vs-Pull-based-Deployments/frame_100.jpg)

> [!important]
> **Summary**
>
> While push-based deployments provide a streamlined process initiated by external systems, they require careful management of sensitive credentials. Conversely, pull-based deployments confine all changes within the cluster, offering a more secure alternative. Choose the deployment strategy that aligns with your organization’s security requirements and operational practices.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/7221af3a-169a-4c55-bc00-b7b40e1dceda/lesson/690e03e7-7468-4276-9dda-954f92225d3d)**
>
> Watch video content
