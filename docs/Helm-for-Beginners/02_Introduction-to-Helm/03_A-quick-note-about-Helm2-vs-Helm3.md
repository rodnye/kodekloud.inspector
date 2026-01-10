# A quick note about Helm2 vs Helm3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Helm-for-Beginners/Introduction-to-Helm/A-quick-note-about-Helm2-vs-Helm3)

---

## Table of Contents

- A quick note about Helm2 vs Helm3
  - Architecture: Removing Tiller
  - Three-Way Strategic Merge Patch: Intelligent Rollbacks and Upgrades
  - Summary
  - Watch Video

---

## Content

Helm for Beginners

Introduction to Helm

# A quick note about Helm2 vs Helm3

Helm has come a long way since its inception. Understanding the differences between Helm 2 and Helm 3 is crucial when browsing charts and technical articles. This article reviews the evolution of Helm and highlights the major architectural changes introduced in Helm 3.

Helm 1.0 debuted in February 2016, followed by Helm 2.0 in November 2016 and Helm 3.0 in November 2019. The project has matured significantly, driven largely by enhancements in Kubernetes.

![The image is a timeline of Helm's version history, showing releases 1.0 in February 2016, 2.0 in November 2016, and 3.0 in November 2019.](https://kodekloud.com/kk-media/image/upload/v1752878958/notes-assets/images/Helm-for-Beginners-A-quick-note-about-Helm2-vs-Helm3/helm-version-history-timeline.jpg)

Improvements in Kubernetes empowered Helm with more robust tools, enabling a simpler and more effective design in Helm 3 compared to Helm 2. In this lesson, we focus on Helm 3, which simplifies the overall design and introduces enhanced features—particularly in security and revision management.

## Architecture: Removing Tiller

Helm uses a command-line client on your local machine to execute commands on a Kubernetes cluster. In Helm 2, limitations in Kubernetes—such as the absence of role-based access control (RBAC) and custom resource definitions (CRDs)—necessitated an extra component called Tiller. The Helm client communicated with Tiller, which then interacted with Kubernetes to implement your commands.

![The image is a diagram illustrating the architecture of Helm 2, showing the interaction between the Helm CLI and Tiller, with references to Kubernetes and notes on Role-Based Access Control and Custom Resource Definitions.](https://kodekloud.com/kk-media/image/upload/v1752878959/notes-assets/images/Helm-for-Beginners-A-quick-note-about-Helm2-vs-Helm3/helm-2-architecture-diagram.jpg)

> [!important]
> **Note**
>
> In Helm 2, Tiller functioned with full privileges by default, which introduced significant security concerns.

With the introduction of RBAC and CRDs in Kubernetes, the need for Tiller was eliminated. Consequently, Helm 3 removes Tiller entirely, allowing direct communication between the Helm CLI and the Kubernetes API. This change not only reduces complexity but also enhances security by enforcing Kubernetes’ RBAC policies consistently—whether commands are executed via kubectl or Helm.

![The image is a diagram illustrating Helm 3 architecture, showing the interaction between the Helm CLI, Kubernetes, and features like Role-Based Access Control and Custom Resource Definitions.](https://kodekloud.com/kk-media/image/upload/v1752878960/notes-assets/images/Helm-for-Beginners-A-quick-note-about-Helm2-vs-Helm3/helm-3-architecture-diagram.jpg)

## Three-Way Strategic Merge Patch: Intelligent Rollbacks and Upgrades

One of the standout improvements in Helm 3 is the introduction of a three-way strategic merge patch mechanism. This mechanism functions as a snapshot system, creating revisions of the release state to facilitate intelligent rollbacks and upgrades.

Consider the following example:

1.  Install a WordPress website using a Helm chart, which creates revision number one:

    ```
    $ helm install wordpress
    ```

2.  Later, upgrade to a newer chart that changes the image version from WordPress 4.8 to WordPress 5.8. Before the upgrade, your deployment configuration might look like this:

    ```
    containers:
      - image: wordpress:4.8-apache
    ```

    After the upgrade, the configuration updates to:

    ```
    containers:
      - image: wordpress:5.8-apache
    ```

    Execute the upgrade command with:

    ```
    $ helm upgrade wordpress
    ```

At this point, Helm assigns revision number two to record the new state. These revisions act as snapshots, enabling you to roll back to a previous version if necessary. Running a rollback command results in the creation of a new revision that reflects the restored state:

```
$ helm rollback wordpress
```

In Helm 2, rollbacks based solely on comparing the current chart with the previous chart did not accommodate manual changes made via kubectl. For instance:

1.  Install the WordPress deployment (revision one):

    ```
    $ helm install wordpress
    ```

2.  A user manually updates the application image using kubectl:

    ```
    $ kubectl set image wordpress wordpress=5.8-apache
    ```

Since this modification occurred outside of Helm, no new revision was created. Attempting a rollback:

```
$ helm rollback wordpress
```

would yield no change as Helm 2 simply compares the charts and sees no differences.

In contrast, Helm 3 performs a three-way strategic merge patch by comparing:

- The current chart in use (if a revision exists),
- The desired chart from the previous revision, and
- The live state of the Kubernetes objects.

For example, if the live state shows the WordPress image as 5.8-apache but revision one indicates wordpress:4.8-apache, Helm 3 detects the difference and reverts the changes accordingly.

```
$ helm install wordpress
$ kubectl set image wordpress wordpress=5.8-apache
$ helm rollback wordpress
```

This intelligent capability ensures that changes made outside of Helm are recognized and handled appropriately during rollbacks and upgrades.

## Summary

The key differences between Helm 2 and Helm 3 are summarized below:

| Feature            | Helm 2                                                          | Helm 3                                                                                  |
| ------------------ | --------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Tiller             | Required for managing releases, with full privileges by default | Removed for direct CLI-to-Kubernetes communication                                      |
| Rollback Mechanism | Based solely on chart comparison, ignoring manual changes       | Uses a three-way strategic merge patch to intelligently record and revert state changes |

![The image is a comparison table between Helm 2 and Helm 3, showing that Helm 2 uses Tiller while Helm 3 does not, and Helm 3 supports 3-Way Strategic Merge Patch while Helm 2 does not.](https://kodekloud.com/kk-media/image/upload/v1752878960/notes-assets/images/Helm-for-Beginners-A-quick-note-about-Helm2-vs-Helm3/helm-2-vs-helm-3-comparison.jpg)

That concludes this article. In the next lesson, we will explore more advanced Helm topics and further refine our practices in managing Kubernetes deployments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/helm-for-beginners/module/15e220ca-1229-4779-81f0-3bc9f804aa6b/lesson/9f3e63c6-1bec-4b90-b946-2ddd9a974478)**
>
> Watch video content
