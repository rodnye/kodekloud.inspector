# Demo Docker Engine Setup Ubuntu - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Docker-Certified-Associate-Exam-Course/Docker-Engine/Demo-Docker-Engine-Setup-Ubuntu)

---

## Table of Contents

- Demo Docker Engine Setup Ubuntu
  - Prerequisites
  - 1. Remove Old Docker Versions
  - 2. Install Required Packages
  - 3. Add Docker’s Official GPG Key
  - 4. Set Up the Docker APT Repository
  - 5. Install Docker Engine
  - 6. Verify the Installation
  - 7. View Docker Version and System Information
  - Links and References
  - Watch Video
    - Prerequisite Packages

---

## Content

Docker Certified Associate Exam Course

Docker Engine

# Demo Docker Engine Setup Ubuntu

In this step-by-step guide, you’ll learn how to install and configure the Docker Engine on an Ubuntu host. By the end of this tutorial, your Ubuntu VM will be ready to run containers and support your Docker-based workflows.

## Prerequisites

- A machine running **Ubuntu 16.04** or newer (this example uses **Ubuntu 18.04 “Bionic Beaver”** on `x86_64`).
- A user account with `sudo` privileges.

```
ubuntu@dockerubuntu:~$ cat /etc/lsb-release
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=18.04
DISTRIB_CODENAME=bionic
DISTRIB_DESCRIPTION="Ubuntu 18.04.5 LTS"
ubuntu@dockerubuntu:~$ uname -m
x86_64
```

> [!important]
> **Note**
>
> Make sure your system is up to date before proceeding. Run `sudo apt-get update && sudo apt-get upgrade` if you haven’t recently updated your packages.

## 1\. Remove Old Docker Versions

If you have any legacy Docker packages installed, remove them to avoid conflicts:

```
sudo apt-get remove docker docker-engine docker.io containerd runc
```

## 2\. Install Required Packages

Docker’s repository requires HTTPS transport, certificate management, and command-line tools. Update the package index and install these dependencies:

```
sudo apt-get update
sudo apt-get install \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg-agent \
  software-properties-common
```

### Prerequisite Packages

| Package                    | Purpose                                     |
| -------------------------- | ------------------------------------------- |
| apt-transport-https        | Allows `apt` to use repositories over HTTPS |
| ca-certificates            | Provides SSL certificates for HTTPS         |
| curl                       | Downloads files from the command line       |
| gnupg-agent                | Manages OpenPGP keys                        |
| software-properties-common | Adds and manages `apt` repositories         |

## 3\. Add Docker’s Official GPG Key

Import Docker’s GPG key to verify package signatures:

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

Verify the fingerprint to ensure integrity:

```
sudo apt-key fingerprint 0EBFCD88
```

> [!important]
> **Warning**
>
> If the fingerprint does not match `9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88`, do **not** continue. Verify your network and retry the key import.

## 4\. Set Up the Docker APT Repository

Add Docker’s stable repository to your system:

```
sudo add-apt-repository \
  "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) \
  stable"
```

## 5\. Install Docker Engine

Refresh the package index and install Docker Engine, CLI, and containerd:

```
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

## 6\. Verify the Installation

1.  List installed Docker packages:

    ```
    dpkg -l | grep -i docker
    ```

2.  Check that the Docker service is active and enabled at boot:

    ```
    sudo systemctl status docker
    ```

## 7\. View Docker Version and System Information

- Display the Docker client version:

  ```
  docker --version
  ```

- Show detailed version information for both client and server:

  ```
  docker version
  ```

- Inspect system-wide Docker details (containers, images, drivers, plugins):

  ```
  docker info
  ```

Congratulations! You now have **Docker Engine** installed and running on your Ubuntu host. Use this environment to build, ship, and run containerized applications.

## Links and References

- [Docker Engine Documentation](https://docs.docker.com/engine/)
- [Ubuntu Official Site](https://ubuntu.com/)
- [Docker Installation Tutorials](https://docs.docker.com/get-started/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/docker-certified-associate-exam-course/module/871494af-49f8-42e9-95e9-cb0df80c2b21/lesson/9149c8c1-70ed-4fcd-a0f3-676a69cc4738)**
>
> Watch video content
