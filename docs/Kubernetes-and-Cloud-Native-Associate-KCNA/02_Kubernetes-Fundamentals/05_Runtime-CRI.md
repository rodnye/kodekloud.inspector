# Runtime CRI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Kubernetes-Fundamentals/Runtime-CRI)

---

## Table of Contents

- Runtime CRI
  - Background and Evolution
  - Docker and the Introduction of Docker Shim
  - Embracing Container-Native CRI Support
  - Conclusion
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Kubernetes Fundamentals

# Runtime CRI

In this article, we explore the Container Runtime Interface (CRI) and its critical role in the container ecosystem. The CRI is a fundamental component that enables Kubernetes to support a variety of container runtimes without modifying its core codebase.

## Background and Evolution

Initially, Docker became the most popular solution for container operations due to its simplicity. When Kubernetes was first introduced, it was designed to orchestrate Docker containers exclusively. However, as Kubernetes grew in popularity, new container technologies such as Rocket and ContainerD emerged that required integration with Kubernetes. To address this need, Kubernetes introduced the Container Runtime Interface (CRI).

CRI defines a plugin interface that any container vendor can implement if they adhere to the Open Container Initiative (OCI) standards. This design involves a gRPC API used by the Kubernetes Kubelet to manage container images, containers, and networking. By implementing the CRI API, container runtimes can operate independently of Kubernetes, allowing system architects the flexibility to choose the optimal runtime for their environment.

![The image explains the Container Runtime Interface (CRI), highlighting its role in defining the gRPC protocol for Kubernetes Kubelet to interact with container runtimes, images, and networking.](https://kodekloud.com/kk-media/image/upload/v1752880656/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Runtime-CRI/frame_70.jpg)

> [!important]
> **Note**
>
> For more details on container orchestration and Kubernetes, consider reviewing the [Kubernetes Documentation](https://kubernetes.io/docs/).

## Docker and the Introduction of Docker Shim

Docker's widespread adoption in the container ecosystem meant that even as CRI was introduced, the Kubernetes community continued to support Docker. To maintain compatibility, Kubernetes implemented a temporary solution known as Docker Shim. This intermediary layer allowed Docker to communicate with Kubernetes without directly using the CRI, ensuring that existing Docker-based workflows continued to function seamlessly.

![The image illustrates the relationship between Rkt, Containerd, Docker, and Kubernetes via the Container Runtime Interface and Dockershim.](https://kodekloud.com/kk-media/image/upload/v1752880657/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Runtime-CRI/frame_100.jpg)

Docker Shim was maintained purely for backward compatibility. As Kubernetes evolved toward a more container runtime-agnostic approach, the reliance on Docker Shim was deprecated. In Kubernetes version 1.24, Docker Shim was officially removed, and native support for Docker was dropped. However, Docker images remain compatible because they adhere to the OCI standard, which means they can be used with other container runtimes like ContainerD.

## Embracing Container-Native CRI Support

Users are now encouraged to adopt container runtimes that natively support the CRI. This shift not only enhances compatibility and standardization across container runtimes but also helps mitigate vendor lock-in. By supporting multiple container runtimes, Kubernetes enables organizations to choose the most appropriate solution for their infrastructure needs.

![The image illustrates Docker removal, highlighting Docker, Docker Images, Kubernetes, and the Open Container Initiative with tools like gVisor, containerd, kata containers, and cri-o.](https://kodekloud.com/kk-media/image/upload/v1752880658/notes-assets/images/Kubernetes-and-Cloud-Native-Associate-KCNA-Runtime-CRI/frame_160.jpg)

> [!important]
> **Additional Resources**
>
> Explore further insights into container runtimes and Kubernetes best practices by visiting the [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) and other related resources.

## Conclusion

The Container Runtime Interface has paved the way for enhanced compatibility and flexibility in the container ecosystem. By enabling a diverse set of container runtimes, CRI ensures that Kubernetes users can avoid vendor-specific limitations and foster innovation in container management.

That concludes this article on the Container Runtime Interface. Thank you for reading, and we'll see you in the next one.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/8403f56b-91f8-42f9-89e9-5c27a7438ef2/lesson/7cc0d9f7-3c34-49c9-b1c1-2d1af42b39f4)**
>
> Watch video content
