# Image Security - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CKA-Certification-Course-Certified-Kubernetes-Administrator/Security/Image-Security)

---

## Table of Contents

- Image Security
  - Understanding Container Image Naming
  - Private Registry Usage
  - Configuring Kubernetes Pods for Private Registries
  - Summary
  - Watch Video
  - Practice Lab
    - Authentication for Private Registries

---

## Content

CKA Certification Course - Certified Kubernetes Administrator

Security

# Image Security

In this lesson, we explore best practices for securing container images throughout the deployment process. You will learn about image naming conventions, securing image repositories, and configuring your pods to pull images from trusted sources. We will illustrate these concepts using several pod examples that deploy various applications such as web apps, databases, and Redis caches.

## Understanding Container Image Naming

Let’s start by examining a simple pod definition file that deploys an Nginx container:

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

Notice the image name "nginx". This follows Docker’s image naming convention. When a repository name is provided without a user or account, Docker defaults to the "library" account. In this example, "nginx" is interpreted as "library/nginx", which represents Docker’s official image maintained by a dedicated team that follows industry best practices.

If you create your own account and build custom images, you should update the image name accordingly. For instance:

```
image: your-account/nginx
```

By default, Docker pulls images from Docker Hub (with the DNS name docker.io) if no other registry is specified. The registry is a centralized storage where images are pushed during creation or updates, and subsequently pulled during deployment.

## Private Registry Usage

For projects that require enhanced security and privacy, you might opt for private registries. Many popular cloud service providers—such as AWS, Azure, and GCP—offer private registries built into their platforms. Alternatively, tools like [Google Container Registry](https://cloud.google.com/container-registry) (gcr.io) are frequently used for Kubernetes-related images and testing purposes.

When referencing an image from a private registry, the full image path should be specified. For example:

```
image: docker.io/library/nginx
```

### Authentication for Private Registries

Accessing private repositories requires prior authentication. Start by logging into your private registry using the Docker CLI:

```
docker login private-registry.io
```

After you provide your credentials, you should see a confirmation similar to this:

```
Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: registry-user
Password:
WARNING! Your password will be stored unencrypted in /home/vagrant/.docker/config.json.
Login Succeeded
```

## Configuring Kubernetes Pods for Private Registries

To pull an image from a private registry within a pod, specify the full image path in your pod definition. For example:

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

Since Kubernetes worker nodes rely on the Docker runtime for image retrieval, they must be provided with the appropriate credentials. This is achieved by creating a Kubernetes secret of type Docker registry. Execute the following command to create the secret:

```
kubectl create secret docker-registry regcred \
  --docker-server=private-registry.io \
  --docker-username=registry-user \
  --docker-password=registry-password \
  --docker-email=registry-user@org.com
```

Once the secret is created, reference it in your pod specification using the `imagePullSecrets` section:

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

> [!important]
> **Note**
>
> When the pod is created, the Kubelet on the worker node will use the credentials stored in the secret to authenticate and pull the image from your private registry.

## Summary

This lesson covered key aspects of container image security by demonstrating:

- The importance of proper image naming conventions.
- How to designate public and private repositories.
- Steps for authenticating with private registries.
- Configuring Kubernetes pods with image pull secrets.

By following these practices, you ensure that your applications are deployed using secure and trusted container images. Now, put your understanding into practice and work with secure images in your own projects.

For more information, check out the [Kubernetes Documentation](https://kubernetes.io/docs/) and best practices guides on container security.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/77826599-d456-4cb5-8cbc-b713cc077b45/lesson/bc0607ce-e843-43ab-9444-a46dab7b7339)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/cka-certification-course-certified-kubernetes-administrator/module/77826599-d456-4cb5-8cbc-b713cc077b45/lesson/fe2eb504-d1e6-44d1-bc0d-ba35f1fdcc12)**
>
> Practice lab
