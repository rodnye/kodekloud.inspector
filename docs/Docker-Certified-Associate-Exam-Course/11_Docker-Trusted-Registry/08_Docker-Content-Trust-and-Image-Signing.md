# Docker Content Trust and Image Signing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Trusted-Registry/Docker-Content-Trust-and-Image-Signing)

---

## Table of Contents

- Docker Content Trust and Image Signing
  - Step 1: Pulling an Unsigned Image (without Content Trust)
  - Step 2: Enabling Docker Content Trust on a Single Host
  - Step 3: Enforcing Content Trust Cluster-Wide via UCP
  - Step 4: Pulling an Unsigned Image from a Client with Content Trust Enabled
  - Step 5: Pushing the Unsigned Image to Docker Trusted Registry (DTR)
  - Step 6: Signing the Image with Docker Content Trust
  - Step 7: Pushing Signed Images and New Tags
  - Summary Table of Content Trust Configuration
  - Links and References
  - Watch Video
    - 6.1 Import Your Notary Private Key
    - 6.2 Initialize Trust Metadata and Add a Signer
    - 6.3 Sign the Image Tag

---

## Content

Docker Certified Associate Exam Course

Docker Trusted Registry

# Docker Content Trust and Image Signing

In this guide, you’ll learn how to configure Docker Content Trust (DCT) to allow only cryptographically signed images in your environment. We cover:

- Pulling unsigned images without Content Trust
- Enabling Content Trust on an individual host
- Enforcing Content Trust across a UCP cluster
- Pushing unsigned images to Docker Trusted Registry (DTR)
- Managing Notary keys and signing images
- Verifying and pulling signed images

---

## Step 1: Pulling an Unsigned Image (without Content Trust)

On a UCP worker node, list existing images and pull the unsigned image `yogeshraheja/tomcatone:v1` from Docker Hub:

```
[root@ucpworker ~]# docker image ls
REPOSITORY                  TAG       IMAGE ID       CREATED        SIZE
docker/ucp-pause            3.2.6     feb0e469f6ac   2 months ago   683kB
docker/ucp-agent            3.2.6     b9763a5e7df8   2 months ago   62.1MB
docker/ucp-hyperkube        3.2.6     56c3b92d2b4f   2 months ago   441MB
docker/ucp-calico-node      3.2.6     40091fdbb1b4   2 months ago   189MB
docker/ucp-calico-cni       3.2.6     dd89cabc02dd   2 months ago   162MB


[root@ucpworker ~]# docker image pull yogeshraheja/tomcatone:v1
v1: Pulling from yogeshraheja/tomcatone
[...]
Status: Downloaded newer image for docker.io/yogeshraheja/tomcatone:v1


[root@ucpworker ~]# docker image ls
REPOSITORY                  TAG       IMAGE ID       CREATED        SIZE
yogeshraheja/tomcatone      v1        bd808d1...     5 days ago     497MB
```

> [!important]
> **Note**
>
> By default, Docker allows pulling unsigned images from public registries.

---

## Step 2: Enabling Docker Content Trust on a Single Host

To require signed images, set the `DOCKER_CONTENT_TRUST` environment variable:

```
[root@ucpworker ~]# export DOCKER_CONTENT_TRUST=1
```

Remove the previously pulled image and attempt to pull it again:

```
[root@ucpworker ~]# docker image rm yogeshraheja/tomcatone:v1
[root@ucpworker ~]# docker image pull yogeshraheja/tomcatone:v1
Error: remote trust data does not exist for docker.io/yogeshraheja/tomcatone: notary.docker.io does not have trust data
```

Docker refuses to pull the unsigned image when Content Trust is enabled.

---

## Step 3: Enforcing Content Trust Cluster-Wide via UCP

Manually exporting an environment variable on each node is tedious. Instead, enforce Content Trust across your Docker Universal Control Plane (UCP) cluster:

1.  Log in to UCP as an administrator.
2.  Navigate to **Admin Settings** → **Account Settings**.
3.  Enable **Docker Content Trust (Only Signed Images)**.
4.  Save your changes.

This setting propagates `DOCKER_CONTENT_TRUST=1` to all cluster nodes.

![The image shows the "Admin Settings" page of Docker Enterprise, specifically focusing on "Docker Content Trust" settings, with an option to run only signed images.](https://kodekloud.com/kk-media/image/upload/v1752873958/notes-assets/images/Docker-Certified-Associate-Exam-Course-Docker-Content-Trust-and-Image-Signing/docker-enterprise-admin-settings-content-trust.jpg)

---

## Step 4: Pulling an Unsigned Image from a Client with Content Trust Enabled

On your local workstation using the UCP client bundle, Content Trust is now enforced:

```
[root@yogeshclientbundle ~]# ./docker image pull yogeshraheja/tomcatone:v1
Error response from daemon: image or trust data does not exist for docker.io/yogeshraheja/tomcatone:v1
```

> [!important]
> **Warning**
>
> Disabling Content Trust exposes your environment to unsigned and potentially unverified images. Only unset if absolutely necessary.

To continue working with unsigned images temporarily:

```
[root@yogeshclientbundle ~]# unset DOCKER_CONTENT_TRUST
[root@yogeshclientbundle ~]# ./docker image pull yogeshraheja/tomcatone:v1
```

---

## Step 5: Pushing the Unsigned Image to Docker Trusted Registry (DTR)

1.  In DTR, create a repository named `yogeshraheja/testimagesigning`.
2.  Tag and push the image from your local host:

```
[root@yogeshclientbundle ~]# ./docker image tag \
    yogeshraheja/tomcatone:v1 \
    54.145.234.153/yogeshraheja/testimagesigning:v1


[root@yogeshclientbundle ~]# ./docker login 54.145.234.153
Username: yogeshraheja
Password:
Login Succeeded


[root@yogeshclientbundle ~]# ./docker image push \
    54.145.234.153/yogeshraheja/testimagesigning:v1
```

The repository now contains the unsigned image.

---

## Step 6: Signing the Image with Docker Content Trust

Docker Content Trust uses _Notary_ to manage trust metadata. Below are the steps to import your keys, initialize trust for a repository, and sign an image.

### 6.1 Import Your Notary Private Key

Copy the private key into Docker’s trust directory and load it:

```
[root@yogeshclientbundle ~]# mkdir -p ~/.docker/trust
[root@yogeshclientbundle ~]# cp key.pem ~/.docker/trust/
[root@yogeshclientbundle ~]# ./docker trust key load --name yogeshraheja key.pem
Loading key from "key.pem"...
Enter passphrase for new yogeshraheja key with ID 97dd9b8:
Repeat passphrase for new yogeshraheja key with ID 97dd9b8:
Successfully imported key from key.pem
```

### 6.2 Initialize Trust Metadata and Add a Signer

Authorize your user as a signer and initialize the repository’s trust data:

```
[root@yogeshclientbundle ~]# ./docker trust signer add --key cert.pub \
    yogeshraheja \
    54.145.234.153/yogeshraheja/testimagesigning
Adding signer "yogeshraheja" to 54.145.234.153/yogeshraheja/testimagesigning...
Initializing signed repository for 54.145.234.153/yogeshraheja/testimagesigning...
Enter passphrase for root key with ID 47caaa5:
Enter passphrase for new repository key with ID faf8bd5:
Repeat passphrase for new key with ID faf8bd5:
Successfully initialized and added signer "yogeshraheja".
```

### 6.3 Sign the Image Tag

Sign the `v1` tag:

```
[root@yogeshclientbundle ~]# ./docker trust sign \
    54.145.234.153/yogeshraheja/testimagesigning:v1
Enter passphrase for "yogeshraheja" key with ID 97dd9b8:
Signed 1 tag for 54.145.234.153/yogeshraheja/testimagesigning:v1
```

(Optional) Verify trust metadata:

```
[root@yogeshclientbundle ~]# ./docker trust inspect \
    --pretty 54.145.234.153/yogeshraheja/testimagesigning
```

---

## Step 7: Pushing Signed Images and New Tags

After signing, push your `v1` image and optionally tag and sign a new version `v2`:

```
[root@yogeshclientbundle ~]# ./docker push \
    54.145.234.153/yogeshraheja/testimagesigning:v1


# Tag a new version
[root@yogeshclientbundle ~]# ./docker image tag \
    54.145.234.153/yogeshraheja/testimagesigning:v1 \
    54.145.234.153/yogeshraheja/testimagesigning:v2


# Sign the new tag
[root@yogeshclientbundle ~]# ./docker trust sign \
    54.145.234.153/yogeshraheja/testimagesigning:v2


# Push the v2 tag
[root@yogeshclientbundle ~]# ./docker push \
    54.145.234.153/yogeshraheja/testimagesigning:v2
```

![The image shows a Docker Enterprise Trusted Registry interface displaying details of a repository named "testimagesigning," including a signed image tagged "v2" with its type, ID, size, and vulnerability scan options.](https://kodekloud.com/kk-media/image/upload/v1752873959/notes-assets/images/Docker-Certified-Associate-Exam-Course-Docker-Content-Trust-and-Image-Signing/docker-enterprise-trusted-registry-testimagesigning.jpg)

---

## Summary Table of Content Trust Configuration

| Action                        | Method               | Command / UI Path                                                    |
| ----------------------------- | -------------------- | -------------------------------------------------------------------- |
| Enable Content Trust on host  | Environment variable | `export DOCKER_CONTENT_TRUST=1`                                      |
| Enforce Content Trust cluster | UCP Admin Settings   | **Admin Settings** → **Account Settings** → **Docker Content Trust** |
| Import Notary key             | CLI                  | `docker trust key load --name <user> key.pem`                        |
| Initialize repository signing | CLI                  | `docker trust signer add --key cert.pub <user> <repo>`               |
| Sign an image tag             | CLI                  | `docker trust sign <repo>:<tag>`                                     |

---

## Links and References

- [Docker Content Trust Documentation](https://docs.docker.com/engine/security/trust/)
- [Docker Notary Project](https://github.com/theupdateframework/notary)
- [Docker Trusted Registry (DTR)](https://docs.docker.com/ee/dtr/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d0ef5db6-09b0-45f3-a220-9036d58086c6/lesson/8b950e04-d2c2-4dec-8f77-0c8014b8b786)**
>
> Watch video content
