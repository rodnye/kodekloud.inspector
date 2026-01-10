# Demo Docker Engine Setup CentOS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine/Demo-Docker-Engine-Setup-CentOS)

---

## Table of Contents

- Demo Docker Engine Setup CentOS
  - Prerequisites
  - 1. Remove Older Docker Versions
  - 2. Install Dependencies & Configure the Docker Repository
  - 3. Install Docker Engine (Docker CE)
  - 4. Start and Enable the Docker Service
  - 5. Verify Your Docker Installation
  - Links and References
  - Watch Video

---

## Content

Docker Certified Associate Exam Course

Docker Engine

# Demo Docker Engine Setup CentOS

Learn how to quickly install and configure Docker Engine (Community Edition) on a CentOS 7 server. This guide covers uninstalling old packages, setting up the official Docker repository, installing Docker CE, and verifying your installation.

> [!important]
> **Note**
>
> Always refer to the [official Docker documentation](https://docs.docker.com/get-docker/) for the most up-to-date installation instructions.

## Prerequisites

| Requirement        | Details                                |
| ------------------ | -------------------------------------- |
| Operating System   | CentOS 7 (x86\\\_64)                   |
| User Account       | A non-root user with `sudo` privileges |
| Enabled Repository | `CentOS Extras`                        |
| Server Access      | SSH access to your instance or VM      |

Log in to your server:

```
ssh centos@docker-centos
```

## 1\. Remove Older Docker Versions

Before installing Docker CE, remove any legacy packages to prevent conflicts:

```
sudo yum remove -y docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-logrotate \
                  docker-engine
```

Verify your enabled repos:

```
sudo yum repolist
```

You should see `base`, `extras`, and `updates` in the list.

> [!important]
> **Warning**
>
> Removing old Docker packages will not delete your images or containers stored under `/var/lib/docker`, but it’s a good idea to back up any critical data before proceeding.

## 2\. Install Dependencies & Configure the Docker Repository

1.  Install `yum-utils`, which provides the `yum-config-manager` utility:

    ```
    sudo yum install -y yum-utils
    ```

2.  Add the official Docker CE repository:

    ```
    sudo yum-config-manager \
      --add-repo \
      https://download.docker.com/linux/centos/docker-ce.repo
    ```

3.  Confirm the new repo is enabled:

    ```
    sudo yum repolist | grep docker-ce
    ```

You should see an entry similar to `docker-ce-stable/x86_64`.

## 3\. Install Docker Engine (Docker CE)

Install Docker Engine and its core components:

```
sudo yum install -y docker-ce docker-ce-cli containerd.io
```

Verify that the Docker packages are installed:

```
sudo rpm -qa | grep -i docker
```

Expected packages in the output:

- `docker-ce`
- `docker-ce-cli`
- `containerd.io`

## 4\. Start and Enable the Docker Service

1.  Check the Docker service status:

    ```
    systemctl status docker
    ```

2.  If it’s not running, start and enable it to launch on boot:

    ```
    sudo systemctl start docker
    sudo systemctl enable docker
    ```

3.  Re-check to ensure Docker is active:

    ```
    systemctl status docker
    ```

## 5\. Verify Your Docker Installation

- **Check Docker version:**

  ```
  sudo docker --version
  ```

  Sample output:

  ```
  Docker version 19.03.13, build 4484c46d9d
  ```

- **View detailed client/server info:**

  ```
  sudo docker version
  ```

- **Display full system information:**

  ```
  sudo docker system info
  ```

When you see information about the Engine, containerd, runc, and your host environment, Docker is installed and running correctly.

Congratulations! You have successfully installed and configured Docker Engine on CentOS 7.

## Links and References

- [Docker Get Started Guide](https://docs.docker.com/get-docker/)
- [Docker Engine Overview](https://docs.docker.com/engine/)
- [CentOS Linux Documentation](https://wiki.centos.org/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/871494af-49f8-42e9-95e9-cb0df80c2b21/lesson/0997ace0-1714-4e32-a74b-231dce511f7d)**
>
> Watch video content
