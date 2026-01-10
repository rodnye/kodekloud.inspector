# Image Repository Security - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Platform-Security/Image-Repository-Security)

---

## Table of Contents

- Image Repository Security
  - Understanding Image Names
  - Using a Private Registry
  - Links and References
  - Watch Video
  - Practice Lab
    - Common Public Registries

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Platform Security

# Image Repository Security

In this lesson, you’ll learn how to secure container images by:

- Understanding image naming conventions
- Working with secure image registries
- Configuring Pods to pull from private repositories

Previously, we deployed Pods running web apps, databases, and caches. Let’s begin with a simple Pod definition that uses the official nginx image:

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

## Understanding Image Names

Docker interprets `image: nginx` as `library/nginx` under the hood. The full naming convention is:

```
[registry]/[user-or-namespace]/[repository]:[tag]
```

- Omit the registry → defaults to Docker Hub (`docker.io`)
- Omit the namespace → defaults to `library` (the official account)

> [!important]
> **Note**
>
> Specifying:
>
> ```
> image: library/nginx
> ```
>
> is equivalent to:
>
> ```
> image: docker.io/library/nginx
> ```

You can also pull from other public registries. For example, Google’s registry hosts Kubernetes test images:

```
image: gcr.io/kubernetes-e2e-test-images/dnsutils
```

### Common Public Registries

| Registry                 | URL       | Use Case                        |
| ------------------------ | --------- | ------------------------------- |
| Docker Hub               | docker.io | Default public images           |
| Google Artifact Registry | gcr.io    | Google-hosted Kubernetes images |
| Quay.io                  | quay.io   | CI/CD and enterprise images     |

## Using a Private Registry

For in-house applications, you can host your own registry or use a managed solution:

| Provider                 | Link                                                     |
| ------------------------ | -------------------------------------------------------- |
| AWS ECR                  | https://aws.amazon.com/ecr/                              |
| Azure Container Registry | https://azure.microsoft.com/services/container-registry/ |
| Google Artifact Registry | https://cloud.google.com/artifact-registry               |

To pull from a private registry, follow these steps:

1.  **Authenticate locally** (for pushing and testing)

    ```
    docker login private-registry.io
    # Username: registry-user
    # Password: ********
    # WARNING! Your password will be stored unencrypted in ~/.docker/config.json.
    # Login Succeeded
    ```

    > [!important]
    > **Warning**
    >
    > Avoid committing `~/.docker/config.json` to version control.
    > Store credentials securely (e.g., using a secrets manager).

2.  **Create a Kubernetes Secret** of type `docker-registry` so worker nodes can pull the image:

    ```
    kubectl create secret docker-registry regcred \
      --docker-server=private-registry.io \
      --docker-username=registry-user \
      --docker-password=registry-password \
      --docker-email=registry-user@org.com
    ```

3.  **Reference the Secret** in your Pod spec under `imagePullSecrets`:

    ```
    apiVersion: v1
    kind: Pod
    metadata:
      name: internal-app-pod
    spec:
      containers:
        - name: internal-app
          image: private-registry.io/apps/internal-app
      imagePullSecrets:
        - name: regcred
    ```

    When this Pod is scheduled, the kubelet uses the Secret to authenticate and pull the private image.

---

## Links and References

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/8f0d5517-7d43-4d97-871d-234bb4503f7f/lesson/616e31b2-8442-4d08-906e-f23f831a8b0b)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/8f0d5517-7d43-4d97-871d-234bb4503f7f/lesson/913962b3-08a6-483d-aa5d-9aca945afd44)**
>
> Practice lab
