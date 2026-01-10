# Kubernetes Software Versions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Cluster-Setup-and-Hardening/Kubernetes-Software-Versions)

---

## Table of Contents

- Kubernetes Software Versions
  - Viewing Kubernetes Version Information
  - Understanding Kubernetes Versioning
  - Alpha, Beta, and Stable Releases
  - Conclusion
  - Watch Video
    - Release Types

---

## Content

Certified Kubernetes Security Specialist (CKS)

Cluster Setup and Hardening

# Kubernetes Software Versions

Welcome to this article on Kubernetes Software Versions. In this guide, we will explore the evolution of Kubernetes releases, detailed version components, and the differences between stable, beta, and alpha releases.

## Viewing Kubernetes Version Information

When you install a Kubernetes cluster, you deploy a specific Kubernetes version. To verify the version information for each node in your cluster, run:

```
kubectl get nodes
```

The output will display details similar to the following example:

```
NAME     STATUS   ROLES    AGE   VERSION
master   Ready    master   1d    v1.11.3
node-1   Ready    <none>   1d    v1.11.3
node-2   Ready    <none>   1d    v1.11.3
```

## Understanding Kubernetes Versioning

Kubernetes versions follow a three-part structure that includes a major, minor, and patch number. For example, the version "v1.11.3" is broken down as follows:

- **Major (1):** The primary release series.
- **Minor (11):** Introduces new features and capabilities.
- **Patch (3):** Focuses on bug fixes and minor improvements.

![The image illustrates versioning with "v1.11.3," highlighting "MAJOR," "MINOR," and "PATCH" components.](https://kodekloud.com/kk-media/image/upload/v1752871376/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Kubernetes-Software-Versions/frame_50.jpg)

### Release Types

- **Minor Releases:** Rolled out every few months, these include significant enhancements and new functionalities.
- **Patch Releases:** Issued more frequently, these updates address security patches and critical bug fixes.

The first major version, v1.0, was released in July 2015. At the time of writing, the latest stable version is v1.13.0. This article focuses on stable Kubernetes releases over time.

![The image shows a timeline of software version releases from March 2015 to December 2018, including versions v0.12, v1.0, v1.2.0, and v1.13.0.](https://kodekloud.com/kk-media/image/upload/v1752871377/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Kubernetes-Software-Versions/frame_90.jpg)

## Alpha, Beta, and Stable Releases

Kubernetes also offers alpha and beta release channels:

- **Alpha Releases:** Feature new additions that are disabled by default and may be unstable.
- **Beta Releases:** As features mature, they enter beta, where they are enabled by default and have been thoroughly tested.
- **Stable Releases:** Finalized and fully supported for production use.

All official Kubernetes releases are available on the [Kubernetes GitHub releases page](https://github.com/kubernetes/kubernetes/releases). Each release package, such as the `kubernetes.tar.gz`, includes executables for all Kubernetes components along with detailed download links and checksum information.

![The image shows a GitHub release page for Kubernetes version 1.13.4, including download links and SHA512 checksum information.](https://kodekloud.com/kk-media/image/upload/v1752871379/notes-assets/images/Certified-Kubernetes-Security-Specialist-CKS-Kubernetes-Software-Versions/frame_130.jpg)

> [!important]
> **Note**
>
> Keep in mind that while the main package includes all control plane components at the same version, other components like the etcd cluster and CoreDNS servers have independent versioning. For detailed dependency information, consult the specific release notes.

## Conclusion

This article provided an overview of Kubernetes versioning and release types. Understanding these concepts is crucial for planning cluster upgrades and ensuring compatibility with your environment.

In the next article, we will discuss the process of upgrading your Kubernetes cluster from one version to another.

For further reading, consider checking out:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/eac6dac8-4481-4138-96ef-a2135f20e05e/lesson/3c85fd67-4941-4d3b-bbe3-2d2f3364ce8f)**
>
> Watch video content
