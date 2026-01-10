# What is GitOps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Cloud-Native-Application-Delivery/What-is-GitOps)

---

## Table of Contents

- What is GitOps
  - How GitOps Works
  - Key GitOps Tools and Projects
  - Conclusion
  - Watch Video
    - Flux
    - Argo CD
    - Jenkins X

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Cloud Native Application Delivery

# What is GitOps

GitOps is an innovative approach to managing Kubernetes environments by using Git repositories as a single source of truth for infrastructure as code. This method not only tracks and versions every change but also automates the synchronization between your code repository and live Kubernetes clusters.

Imagine your team manages a Kubernetes environment for a popular e-commerce website. The infrastructure relies on various Kubernetes objects such as Deployments, Services, and ConfigMaps to run smoothly.

One day, a team member updates the ConfigMap that stores the website's branding colors to reflect a new marketing campaign—directly in the live environment without prior coordination. Simultaneously, another team member updates the Checkout service Deployment to use a new software version. Unfortunately, this results in a conflict: the branding colors in the checkout process no longer match the overall site design, and the updated service struggles to work correctly with the older branding settings. Consequently, customers experience issues, and the team must spend extra time debugging these discrepancies.

This is where GitOps becomes invaluable.

With GitOps, team members manage Kubernetes objects by committing changes to a central Git repository. When a change is committed, a GitOps tool—such as Flux or Argo CD—automatically pulls the updates from the repository and deploys the changes to the live environment.

![The image explains GitOps, showing synchronization between Kubernetes manifests in a Git repository and live environments using tools like Flux and Argo.](https://kodekloud.com/kk-media/image/upload/v1752880463/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-What-is-GitOps/frame_70.jpg)

In a GitOps workflow, if a team member wants to update the branding colors, they modify the ConfigMap in the Git repository and create a pull request (PR) for team review. This process notifies the team for approval before merging the changes. Once approved, the GitOps tool synchronizes the updates to the Kubernetes cluster.

Simultaneously, the team member updating the checkout service also creates a PR. However, upon noticing the earlier change to the branding colors, the team opts to delay merging the checkout service PR until after the marketing campaign concludes. This decision ensures that the website's appearance remains consistent and minimizes customer disruption.

> [!important]
> **GitOps Benefits**
>
> GitOps leverages Git for infrastructure management, ensuring reproducibility, traceability, and automation in your deployment process.

## How GitOps Works

GitOps treats a Git repository as the authoritative source of truth. As all changes are versioned in Git, reviewing, tracking, and reverting modifications becomes straightforward. Additionally, GitOps tools monitor for any divergence between the state defined in Git and the actual running state in the cluster. When discrepancies are found, Kubernetes reconcilers can automatically update or roll back the cluster state based on the defined specifications.

By automating updates via continuous delivery, GitOps empowers teams to deploy infrastructure changes efficiently and accurately.

![The image explains GitOps, showing a process where Kubernetes manifests in a Git repository are synchronized and deployed to live environments using tools like Flux and Argo.](https://kodekloud.com/kk-media/image/upload/v1752880464/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-What-is-GitOps/frame_100.jpg)

## Key GitOps Tools and Projects

GitOps has catalyzed the emergence of powerful continuous delivery tools that integrate closely with Git workflows. The following are three popular tools in the GitOps domain:

### Flux

Flux (also known as Flux CD) is a Kubernetes-native tool that continuously synchronizes Kubernetes state with configuration files in a Git repository. Developed by Weaveworks and now a CNCF graduated project, Flux uses a pull-based model to monitor changes in a Git repository and sync them with live Kubernetes environments.

> [!important]
> **Limitation**
>
> Flux is limited to watching a single Git repository and can deploy only to one Kubernetes cluster and namespace, which might restrict its scalability in complex environments.

### Argo CD

Argo CD is a declarative GitOps tool crafted specifically for Kubernetes. Compared to Flux, Argo CD offers enhanced flexibility by allowing a single installation to monitor multiple Git repositories and deploy to various Kubernetes namespaces. Initially developed at Intuit and now recognized as a CNCF project, Argo CD operates as a native Kubernetes application using a pull-based model for continuous delivery.

![The image describes ArgoCD, a declarative GitOps tool for Kubernetes, highlighting its features and origins, including its development by Intuit and CNCF graduation.](https://kodekloud.com/kk-media/image/upload/v1752880465/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-What-is-GitOps/frame_240.jpg)

### Jenkins X

Jenkins X focuses on GitOps for Kubernetes by covering the complete CI/CD process. It combines several open-source tools to simplify deployments, although its configuration and operation can be more complex compared to Flux and Argo CD.

![The image describes Jenkins X, a Kubernetes-focused GitOps tool for CI/CD processes, highlighting its open-source nature and ease of deployment.](https://kodekloud.com/kk-media/image/upload/v1752880466/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-What-is-GitOps/frame_260.jpg)

![The image describes Flux, a Kubernetes-native application for syncing Kubernetes state with Git repositories, developed by Weaveworks, and highlights its features and limitations.](https://kodekloud.com/kk-media/image/upload/v1752880467/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-What-is-GitOps/frame_220.jpg)

## Conclusion

In summary, GitOps revolutionizes infrastructure management by using Git as a centralized and reliable source of truth. This approach ensures that all changes are carefully tracked, versioned, and audited. By automatically synchronizing and deploying changes, GitOps helps teams maintain consistency across Kubernetes environments, reduce manual errors, and streamline continuous delivery workflows.

For more insights on cloud-native practices and continuous delivery tools, consider exploring [Kubernetes Documentation](https://kubernetes.io/docs/) and [Docker Hub](https://hub.docker.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/7221af3a-169a-4c55-bc00-b7b40e1dceda/lesson/e561c6ab-594b-40b8-b91a-b706ed3445dd)**
>
> Watch video content
