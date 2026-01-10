# Docker Enterprise Engine Setup - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine-Enterprise/Docker-Enterprise-Engine-Setup)

---

## Table of Contents

- Docker Enterprise Engine Setup
  - Prerequisites
  - 1. Obtain Your Docker EE Repository URL
  - 2. Configure the Docker EE Repository
  - 3. Install Docker Enterprise Engine
  - 4. Verify the Installation
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Engine Enterprise

# Docker Enterprise Engine Setup

Learn how to install and configure Docker Enterprise Engine (EE) on CentOS 7 to get your container workloads up and running securely.

## Prerequisites

| Prerequisite           | Description                                                 |
| ---------------------- | ----------------------------------------------------------- |
| Docker Hub ID          | An active Docker Hub account.                               |
| Docker EE Subscription | A paid subscription or a 30-day trial (for evaluation use). |
| Supported OS           | CentOS 7 (x86\\\_64)                                        |

> [!important]
> **Note**
>
> If you don’t have a subscription, sign in to Docker Hub and click **Start One-Month Trial** to enable Docker EE repositories for your account.

## 1\. Obtain Your Docker EE Repository URL

1.  Sign in to Docker Hub.
2.  Navigate to **Subscriptions** and start your trial or activate your paid plan.
3.  Copy the repository URL provided under **Docker Enterprise Engine**.

You’ll use this URL in the next step to configure your host.

## 2\. Configure the Docker EE Repository

Replace `<YOUR-REPO-URL>` with the URL you obtained:

```
sudo yum install -y yum-utils
sudo yum-config-manager \
  --add-repo \
  <YOUR-REPO-URL>
```

> [!important]
> **Warning**
>
> Make sure your subscription is active; otherwise the repository will return a 404 error.

## 3\. Install Docker Enterprise Engine

Once the repository is added, install Docker EE and its dependencies:

```
sudo yum install -y docker-ee docker-ee-cli containerd.io
```

Enable and start the Docker service:

```
sudo systemctl enable docker
sudo systemctl start docker
```

## 4\. Verify the Installation

Run the following command to confirm you’re using Docker Engine – Enterprise:

```
docker version
```

Expected output sample:

```
Client: Docker Engine - Enterprise
 Version:           19.03.5
 API version:       1.40
 Go version:        go1.12.12
 Git commit:        2ee0c57608
 Built:             Wed Nov 13 07:36:57 2019
 OS/Arch:           linux/amd64
 Experimental:      false


Server: Docker Engine - Enterprise
 Engine:
  Version:          19.03.5
  API version:      1.40 (minimum version 1.12)
  Go version:       go1.12.12
  Git commit:       2ee0c57608
  Built:            Wed Nov 13 07:35:23 2019
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.2.10
  GitCommit:        b34a5c8af56e510852c35414db4c1f4a6172339
 runc:
  Version:          1.0.0-rc8+dev
  GitCommit:        3e425f80a8c931f88e6d94a8c831b9d5aa481657
 docker-init:
  Version:          0.18.0
  GitCommit:        fec3683
```

If you see **Docker Engine – Enterprise** in both Client and Server sections, the installation was successful.

## Links and References

- [Official Docker EE Installation (CentOS)](https://docs.docker.com/engine/install/centos/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Documentation](https://docs.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/a6a39359-7fb1-4fab-b0c2-6fc58a6ce617/lesson/eefe7f6f-51f8-4857-9863-0aa084669806)**
>
> Watch video content
