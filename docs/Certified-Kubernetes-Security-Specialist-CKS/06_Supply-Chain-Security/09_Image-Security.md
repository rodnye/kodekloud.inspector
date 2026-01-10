# Image Security - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/Supply-Chain-Security/Image-Security)

---

## Table of Contents

- Image Security
  - Understanding Image Names
  - Image Registries
  - Accessing Private Registries
  - Watch Video
  - Practice Lab
    - Creating a Kubernetes Secret for Docker Registry

---

## Content

Certified Kubernetes Security Specialist (CKS)

Supply Chain Security

# Image Security

In this lesson, we will explore the best practices for securing container images. We will discuss image naming conventions, configuring secure image repositories, and setting up Kubernetes pods to pull images from these secured repositories. Throughout this article, you'll find examples of pod definitions and commands that illustrate these concepts in detail.

## Understanding Image Names

Consider the following simple pod definition file:

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
    - name: nginx
      image: nginx
```

In this definition, an Nginx container is deployed using the image named "nginx". But what exactly does "nginx" represent, and from where is it pulled?

This image name follows Docker's image naming convention. Here, "nginx" is shorthand for "library/nginx". The absence of a user or account name implies that Docker uses its default "library" account, which hosts official images maintained by a dedicated team according to best practices.

:::note If you create your own repository, replace "library" with your username or company name. For example: :::

Instead of:

```
image: library/nginx
```

you might use:

```
image: your-company/nginx
```

## Image Registries

When an image location is not explicitly specified, Kubernetes assumes that the image is pulled from Docker Hub (with the DNS name docker.io). Registries serve as image stores—every time you create or update an image, you push it to a registry. These images are later pulled from the registry for application deployment.

There are numerous popular registries available. For instance, Google's container registry (gcr.io) hosts many Kubernetes-related images, including those used for cluster end-to-end tests. While these images are publicly accessible, internal applications often require a private registry to maintain security.

For example, consider these image names:

```
image: docker.io/library/nginx
image: gcr.io/kubernetes-e2e-test-images/dnsutils
```

For in-house applications that should not be publicly available, it is advisable to use an internal private registry. Most cloud service providers—such as AWS, Azure, and Google Cloud Platform (GCP)—offer private registries by default. Regardless of whether it is Docker Hub, Google's registry, or your internal registry, you can secure your repositories with private access and credentials.

## Accessing Private Registries

To run a container using a private image, first authenticate with the private registry using the `docker login` command:

```
docker login private-registry.io
```

After entering your Docker ID and credentials, you can start your container with a private image:

```
docker run private-registry.io/apps/internal-app
```

To configure Kubernetes to pull the image from your private registry, update your pod definition to include the full image path:

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
    - name: nginx
      image: private-registry.io/apps/internal-app
```

However, since the Docker runtime on the worker nodes pulls these images, Kubernetes needs the appropriate credentials to access the private registry.

### Creating a Kubernetes Secret for Docker Registry

To securely store your registry credentials, create a secret of type Docker registry. Follow these steps:

1.  Authenticate against your private registry:

    ```
    docker login private-registry.io
    docker run private-registry.io/apps/internal-app
    ```

2.  Create a Kubernetes secret that stores these credentials:

    ```
    kubectl create secret docker-registry regcred \
      --docker-server=private-registry.io \
      --docker-username=registry-user \
      --docker-password=registry-password \
      --docker-email=registry-user@org.com
    ```

3.  Update your pod definition to include the secret under the `imagePullSecrets` section:

    ```
    apiVersion: v1
    kind: Pod
    metadata:
      name: nginx-pod
    spec:
      containers:
        - name: nginx
          image: private-registry.io/apps/internal-app
      imagePullSecrets:
        - name: regcred
    ```

When the pod is created, Kubernetes uses the credentials stored in the secret to authenticate with your private registry and successfully pull the image.

:::note This guide detailed how to secure container images by understanding image naming conventions, utilizing image registries, and setting up Kubernetes to pull from private registries using secrets. :::

This concludes our discussion on securing images. For additional practice and further examples on implementing secure images in your Kubernetes clusters, please visit our [practice exercises](/docs/practice-exercises).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/e4511664-185f-4204-9aa2-b4250cbadf84/lesson/1dc8b9e2-2f8c-4c62-b718-cbaadf05a542)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/e4511664-185f-4204-9aa2-b4250cbadf84/lesson/371155ba-3296-4fa9-8909-0bb98679c6ec)**
>
> Practice lab
