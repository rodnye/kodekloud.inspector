# Demo Docker EE Setup - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine-Enterprise/Demo-Docker-EE-Setup)

---

## Table of Contents

- Demo Docker EE Setup
  - Architecture and Prerequisites
  - 1. Register for Docker EE Trial License
  - 2. Review Official Installation Documentation
  - 3. Install Docker EE Engine
  - Links and References
  - Watch Video
    - 3.1 Verify CentOS Version
    - 3.2 Remove Any Older Docker Packages
    - 3.3 Configure the Docker EE Repository
    - 3.4 Fix $dockerosversion Placeholder (if needed)
    - 3.5 Install Docker EE Packages
    - 3.6 Enable and Start Docker
    - 3.7 Verify the Installation

---

## Content

Docker Certified Associate Exam Course

Docker Engine Enterprise

# Demo Docker EE Setup

In this guide, you will learn how to install Docker Enterprise Edition (EE) on AWS. We cover registering for a 30-day Docker EE trial, installing Docker EE Engine on CentOS 7.6, configuring Universal Control Plane (UCP) and Docker Trusted Registry (DTR), and deploying a sample application with both Swarm and Kubernetes on your UCP cluster.

## Architecture and Prerequisites

All three CentOS 7.6 nodes share a flat network, have required ports open, and run NTP for time sync.

| Node        | Role        | vCPU | RAM   | Storage | IP Assignment    |
| ----------- | ----------- | ---- | ----- | ------- | ---------------- |
| ucp-manager | UCP Manager | 2    | 8 GB  | 20 GB   | Public + Private |
| ucp-worker  | UCP Worker  | 2    | 8 GB  | 20 GB   | Public + Private |
| dtr-node    | DTR Node    | 4    | 16 GB | 20 GB   | Public + Private |

## 1\. Register for Docker EE Trial License

1.  Sign in to Docker Hub: https://hub.docker.com
2.  Navigate to **Explore → Docker EE → CentOS**.
3.  Under **Get Docker Enterprise CentOS**, click **Start One-Month Trial** and submit the form.
4.  After activation, go to **My Content** to view your license.
5.  Click **Setup** to copy your private Docker EE repository URL.

![The image shows a webpage from Docker Hub with setup instructions for getting Docker Enterprise on CentOS, including links to resources and installation guides.](https://kodekloud.com/kk-media/image/upload/v1752873856/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Docker-EE-Setup/docker-enterprise-centos-setup.jpg)

> [!important]
> **Note**
>
> Ensure your corporate firewall allows access to `storebits.docker.com` and any other Docker EE endpoints.

## 2\. Review Official Installation Documentation

Visit the Mirantis-hosted docs for Docker EE Engine:

1.  Go to https://docs.docker.com → **Product Manual → Docker Enterprise**.
2.  Select **Engine → Linux → CentOS**.

You’ll find prerequisites (CentOS 7.1+) and steps to configure the Docker EE Yum repository. Be aware of the Mirantis acquisition announcement effective November 13, 2019.

![The image shows a webpage from Docker documentation detailing how to get Docker Engine - Enterprise for CentOS, including prerequisites and installation methods.](https://kodekloud.com/kk-media/image/upload/v1752873857/notes-assets/images/Docker-Certified-Associate-Exam-Course-Demo-Docker-EE-Setup/docker-engine-enterprise-centos-installation.jpg)

## 3\. Install Docker EE Engine

Perform these steps on **ucp-manager** (then repeat on **ucp-worker** and **dtr-node**):

### 3.1 Verify CentOS Version

```
[root@ucp-manager ~]# cat /etc/centos-release
CentOS Linux release 7.6.1810 (Core)
```

### 3.2 Remove Any Older Docker Packages

```
sudo yum remove -y docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine || true
```

### 3.3 Configure the Docker EE Repository

1.  Export your private repository URL (replace `<your-docker-ee-url>`):

    ```
    export DOCKERURL="<your-docker-ee-url>"
    ```

2.  Store it in Yum variables:

    ```
    sudo sh -c 'echo "$DOCKERURL/centos" > /etc/yum/vars/dockerurl'
    ```

3.  Install prerequisites and add the Docker EE repo:

    ```
    sudo yum install -y yum-utils device-mapper-persistent-data lvm2

    sudo -E yum-config-manager \
      --add-repo \
      "$DOCKERURL/centos/docker-ee.repo"
    ```

### 3.4 Fix `$dockerosversion` Placeholder (if needed)

If `yum repolist` returns a `$dockerosversion` error, edit `/etc/yum.repos.d/docker-ee.repo`:

```
[docker-ee-stable]
name=Docker EE Stable - $basearch
baseurl=https://storebits.docker.com/ee/centos/sub-<ID>/centos/7/$basearch/stable
...
```

Replace `$dockerosversion` with `7` under `[docker-ee-stable]`, then rerun:

```
sudo yum repolist
```

> [!important]
> **Warning**
>
> Editing repository files incorrectly can break package resolution. Always back up the `.repo` file before making changes.

### 3.5 Install Docker EE Packages

```
sudo yum install -y docker-ee docker-ee-cli containerd.io
```

### 3.6 Enable and Start Docker

```
sudo systemctl enable docker
sudo systemctl start docker
sudo systemctl status docker
```

### 3.7 Verify the Installation

```
[root@ucp-manager ~]# docker version
Client: Docker Engine - Enterprise
 Version:           19.03.5
 ...
Server: Docker Engine - Enterprise
 Engine:
  Version:          19.03.5
  ...
```

Congratulations! You have successfully installed Docker EE Engine on CentOS 7.6. Next, you will configure UCP and DTR, add worker nodes, and deploy sample workloads using Swarm and Kubernetes.

---

## Links and References

- [Docker EE Trial on Docker Hub](https://hub.docker.com)
- [Docker Enterprise Documentation](https://docs.docker.com/ee/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Mirantis Acquisition Announcement](https://www.mirantis.com/blog/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/a6a39359-7fb1-4fab-b0c2-6fc58a6ce617/lesson/8ef90920-bdb9-478d-a341-65ed34b6758c)**
>
> Watch video content
