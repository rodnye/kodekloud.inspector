# Demo Docker Trusted Registry - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Trusted-Registry/Demo-Docker-Trusted-Registry)

---

## Table of Contents

- Demo Docker Trusted Registry
  - Table of Contents
  - 1. Accessing and Configuring DTR
  - 2. CLI Login to DTR
  - 3. Creating a Repository
  - 4. Pushing Images to DTR
  - 5. Scanning Images for Vulnerabilities
  - 6. Scanning an Older Image
  - 7. Adjusting Image Scan Settings
  - 8. Deleting Tags and Repositories
  - Quick Reference Table
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Trusted Registry

# Demo Docker Trusted Registry

In this guide, we’ll walk through key Docker Trusted Registry (DTR) tasks—logging in via UI and CLI, configuring external URLs, creating repositories, pushing and scanning images, adjusting scan settings, and cleaning up images and repositories.

## Table of Contents

1.  [Accessing and Configuring DTR](#1-accessing-and-configuring-dtr)
2.  [CLI Login to DTR](#2-cli-login-to-dtr)
3.  [Creating a Repository](#3-creating-a-repository)
4.  [Pushing Images to DTR](#4-pushing-images-to-dtr)
5.  [Scanning Images for Vulnerabilities](#5-scanning-images-for-vulnerabilities)
6.  [Scanning an Older Image](#6-scanning-an-older-image)
7.  [Adjusting Image Scan Settings](#7-adjusting-image-scan-settings)
8.  [Deleting Tags and Repositories](#8-deleting-tags-and-repositories)

## 1\. Accessing and Configuring DTR

1.  Open your browser and navigate to your DTR’s IP or DNS.
2.  Log in with your credentials.

> [!important]
> **Warning**
>
> If your DTR VM doesn’t have a persistent IP or DNS name, any change will break UI access. Always assign a static IP or DNS record.

3.  To update the external URL for DTR, use the `dtr reconfigure` command:

    ![The image shows a webpage from Docker documentation, specifically detailing command-line options for configuring Docker Trusted Registry (DTR). It includes descriptions and parameters for various configuration settings.](https://kodekloud.com/kk-media/image/upload/v1752873945/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Docker-Trusted-Registry/docker-dtr-command-line-options.jpg)

    ```
    docker/dtr reconfigure --dtr-external-url https://<NEW_DTR_IP_OR_URL>
    ```

## 2\. CLI Login to DTR

On a machine with the UCP client bundle:

```
docker login 54.145.234.153
# Username (yogeshraheja): yogeshraheja
# Password:
# Login Succeeded
```

> [!important]
> **Note**
>
> If you see `x509: certificate signed by unknown authority`, add the DTR CA certificate to your Docker daemon trust store. See the **Configuring your Docker Daemon** section in the [DTR User Guide](/docs/dtr/2.7/guides/admin/configure/).

## 3\. Creating a Repository

1.  In the DTR UI, click **New Repository**.
2.  Select **Public**, enter your namespace (e.g., `yogeshraheja/kodekloud`), and create.

![The image shows a Docker Enterprise Trusted Registry interface with a repository named "yogeshraheja / kodekloud" listed. The interface includes options for filtering namespaces and creating a new repository.](https://kodekloud.com/kk-media/image/upload/v1752873946/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Docker-Trusted-Registry/docker-enterprise-trusted-registry-kodekloud.jpg)

Within your repository you can:

- **Info**, **Tags**, **Promotions** views
- **Edit** description
- **Permissions** to manage access
- **Settings → Delete Repository**

![The image shows a Docker Enterprise Trusted Registry interface, displaying options for image scanning, pruning, and deleting a repository. The interface includes settings for scanning images on push or manually.](https://kodekloud.com/kk-media/image/upload/v1752873947/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Docker-Trusted-Registry/docker-enterprise-trusted-registry-interface.jpg)

## 4\. Pushing Images to DTR

1.  Pull a base image:

    ```
    docker pull alpine:latest
    ```

2.  Tag for your registry (default tag is `latest`):

    ```
    docker tag alpine:latest 54.145.234.153/yogeshraheja/kodekloud
    ```

3.  Add a version tag:

    ```
    docker tag alpine:latest 54.145.234.153/yogeshraheja/kodekloud:v1
    ```

4.  Push the image:

    ```
    docker push 54.145.234.153/yogeshraheja/kodekloud:v1
    ```

5.  Verify locally:

    ```
    docker image ls
    REPOSITORY                                TAG      IMAGE ID       SIZE
    54.145.234.153/yogeshraheja/kodekloud     latest   f70734b6a266   5.61MB
    54.145.234.153/yogeshraheja/kodekloud     v1       f70734b6a266   5.61MB
    ```

Refresh the DTR UI and check **Tags** for your image.

## 5\. Scanning Images for Vulnerabilities

1.  In the **Tags** tab, select your `v1` tag.
2.  Click **Start a Scan** or **View Details**:

    ![The image shows a Docker Enterprise Trusted Registry interface displaying a repository with a tag named "v1" for a Linux amd64 image. It includes details like image ID, size, signing status, last pushed time, and options for vulnerability scanning.](https://kodekloud.com/kk-media/image/upload/v1752873948/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Docker-Trusted-Registry/docker-enterprise-trusted-registry-v1.jpg)

3.  View **Layers** and **Components** before scanning:

    ```
    1  ADD file:b91adb67b67… in /
    2  CMD ["/bin/sh"]
    ```

4.  After the scan completes, **Components** lists all packages:

    ![The image shows a Docker Enterprise Trusted Registry interface displaying details of a repository named "yogeshraheja/kodekloud:v1," including components like "alpine-keys" with no vulnerabilities.](https://kodekloud.com/kk-media/image/upload/v1752873949/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Docker-Trusted-Registry/docker-enterprise-trusted-registry-yogeshraheja.jpg)

5.  The **Vulnerabilities** tab should report zero issues.

## 6\. Scanning an Older Image

Demonstrate vulnerabilities by pushing an older image:

```
docker pull yogeshraheja/result:v1
docker tag yogeshraheja/result:v1 54.145.234.153/yogeshraheja/kodekloud:v2
docker push 54.145.234.153/yogeshraheja/kodekloud:v2
```

Refresh and scan the `v2` tag. You may see multiple vulnerabilities:

![The image shows a Docker Enterprise Trusted Registry interface displaying details of a repository named "yogeshraheja/kodekloud:v2," including components, vulnerabilities, and their severity levels.](https://kodekloud.com/kk-media/image/upload/v1752873950/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Docker-Trusted-Registry/docker-enterprise-trusted-registry-yogeshraheja-kodekloud-v2.jpg)

## 7\. Adjusting Image Scan Settings

1.  In DTR UI, go to **System → Security**.
2.  Enable image scanning and choose **Online** or **Offline CVE** mode.
3.  Adjust scan timeout and review last CVE sync date:

    ![The image shows a Docker Enterprise Trusted Registry interface focused on security settings, specifically for image scanning methods and automatic scanning timeouts. It offers options for online and offline scanning and displays the last sync date and CVE database version.](https://kodekloud.com/kk-media/image/upload/v1752873951/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Docker-Trusted-Registry/docker-enterprise-trusted-registry-security-settings.jpg)

## 8\. Deleting Tags and Repositories

- **Delete a Tag**: In **Tags**, select the tag (e.g., `v2`) → **Delete** → confirm by typing `Delete`.
- **Delete a Repository**: In **Settings**, find **Delete Repository**, enter the repository name, and confirm.

---

## Quick Reference Table

| Operation                | CLI Command                                       | UI Location                      |
| ------------------------ | ------------------------------------------------- | -------------------------------- |
| Update External URL      | `docker/dtr reconfigure --dtr-external-url <URL>` | N/A                              |
| Login to DTR             | `docker login <DTR_IP_OR_URL>`                    | N/A                              |
| Create Repository        | N/A                                               | **New Repository**               |
| Push Image               | `docker tag`, `docker push`                       | **Tags**                         |
| Scan for Vulnerabilities | N/A                                               | **Tags → Start a Scan**          |
| Configure Scan Settings  | N/A                                               | **System → Security**            |
| Delete Tag               | N/A                                               | **Tags → Delete**                |
| Delete Repository        | N/A                                               | **Settings → Delete Repository** |

## Links and References

- [Docker Trusted Registry CLI Reference](https://docs.docker.com/ee/dtr/2.7/cli/)
- [Configuring your Docker Daemon](https://docs.docker.com/engine/security/certificates/)
- [Docker Enterprise Documentation](https://docs.docker.com/ee/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/d0ef5db6-09b0-45f3-a220-9036d58086c6/lesson/6954df34-3539-4ccf-afa5-e18736e5f459)**
>
> Watch video content
