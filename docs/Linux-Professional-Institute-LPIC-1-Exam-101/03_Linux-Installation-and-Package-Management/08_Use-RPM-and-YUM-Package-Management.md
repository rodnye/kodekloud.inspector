# Use RPM and YUM Package Management - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/Linux-Installation-and-Package-Management/Use-RPM-and-YUM-Package-Management)

---

## Table of Contents

- Use RPM and YUM Package Management
  - 1. Registering with Red Hat Subscription Management
  - 2. Listing and Inspecting Repositories
  - 3. Enabling and Disabling Repositories
  - 4. Adding a Custom Repository
  - 5. Understanding a .repo File
  - 6. Searching for Packages
  - 7. Viewing Package Information
  - 8. Installing, Reinstalling, and Removing Packages
  - 9. Managing Package Groups
  - 10. Installing from a Local RPM File
  - 11. Updating and Upgrading Packages
  - Links and References
  - Watch Video
    - 2.1 View Enabled Repositories
    - 2.2 View Repository Details
    - 3.1 List All Repositories
    - 3.2 Using Subscription Manager
    - 3.3 Using yum-config-manager

---

## Content

Linux Professional Institute LPIC-1 Exam 101

Linux Installation and Package Management

# Use RPM and YUM Package Management

Managing software on Red Hat Enterprise Linux (RHEL) relies on YUM (Yellowdog Updater, Modified) or its successor, `dnf`. In this guide, you’ll learn how to register your system, configure repositories, and install, update, or remove packages. Most `yum` commands work identically with `dnf`; just replace `yum` with `dnf` where desired.

> [!important]
> **Note**
>
> If you prefer `dnf` over `yum`, you can use it interchangeably, for example:
>
> ```
> sudo dnf install httpd
> ```

---

## 1\. Registering with Red Hat Subscription Management

Before accessing Red Hat repositories, register and attach your system to a subscription.

```
sudo subscription-manager register \
  --username your-redhat-developer-username \
  --password your-redhat-password
```

Once registered, attach the system automatically:

```
sudo subscription-manager attach --auto
```

> [!important]
> **Warning**
>
> Ensure your subscription is active; expired subscriptions will prevent you from installing or updating packages.

---

## 2\. Listing and Inspecting Repositories

A repository (repo) is a storage location—online or on your network—containing RPM packages, metadata, and signing keys.

### 2.1 View Enabled Repositories

```
sudo yum repolist
```

Sample output:

```
repo id                             repo name
rhel-8-for-x86_64-appstream-rpms    Red Hat Enterprise Linux 8 for x86_64 - AppStream (RPMs)
rhel-8-for-x86_64-baseos-rpms       Red Hat Enterprise Linux 8 for x86_64 - BaseOS (RPMs)
```

### 2.2 View Repository Details

Add `-v` for verbose details, including each repo’s URL and configuration file:

```
sudo yum repolist -v
```

Key fields in the output:

- **Repo-baseurl**: URL where YUM fetches packages
- **Repo-filename**: Local file under `/etc/yum.repos.d/`

---

## 3\. Enabling and Disabling Repositories

Some packages reside in optional or specialized repos.

### 3.1 List All Repositories

```
sudo yum repolist --all
```

### 3.2 Using Subscription Manager

Enable or disable by repo ID:

```
sudo subscription-manager repos --enable   rhel-8-for-x86_64-codeready-builder-rpms
sudo subscription-manager repos --disable  rhel-8-for-x86_64-codeready-builder-rpms
```

### 3.3 Using yum-config-manager

First, install `yum-utils`:

```
sudo yum install yum-utils
```

Then enable or disable:

```
sudo yum-config-manager --enable  some-repo-id
sudo yum-config-manager --disable some-repo-id
```

---

## 4\. Adding a Custom Repository

To add a third-party or local repo:

```
sudo yum install yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo
# Or from a local network path
sudo yum-config-manager --add-repo http://192.168.1.220/BaseOS.repo
```

This creates a `.repo` file in `/etc/yum.repos.d/`. Verify it:

```
sudo yum repolist -v | grep Repo-filename
```

---

## 5\. Understanding a `.repo` File

Open the Docker repo for inspection:

```
sudo vi /etc/yum.repos.d/docker-ce.repo
```

```
[docker-ce-stable]
name=Docker CE Stable - $basearch
baseurl=https://download.docker.com/linux/rhel/$releasever/$basearch/stable
enabled=1
gpgcheck=1
gpgkey=https://download.docker.com/linux/rhel/gpg
```

| Field       | Description                                       |
| ----------- | ------------------------------------------------- |
| `[repo-id]` | Unique identifier in brackets                     |
| `name=`     | Human-readable repository name                    |
| `baseurl=`  | URL to fetch packages                             |
| `enabled=`  | `1` to enable, `0` to disable                     |
| `gpgcheck=` | `1` enforces GPG signature checking (recommended) |
| `gpgkey=`   | URL or file path to the GPG public key            |

To completely remove a repository, delete its file:

```
sudo rm /etc/yum.repos.d/docker-ce.repo
```

---

## 6\. Searching for Packages

If you’re unsure of the exact name, use `yum search`. Single terms match any, quotes require both terms.

```
# Matches "web" OR "server"
sudo yum search web server


# Matches packages containing both "web" AND "server"
sudo yum search 'web server'
```

Example result:

```
nginx.x86_64 : A high performance web server and reverse proxy server
```

---

## 7\. Viewing Package Information

Inspect a package before installation:

```
sudo yum info nginx
```

Sample output:

```
Name        : nginx
Version     : 1.20.1
Release     : 1.el8
Architecture: x86_64
Summary     : High performance web server and reverse proxy
Description : NGINX is a web server and a reverse proxy server for HTTP, SMTP, POP3 and
              IMAP protocols with a focus on high concurrency, performance and low
              memory usage.
```

---

## 8\. Installing, Reinstalling, and Removing Packages

Install a new package:

```
sudo yum install nginx
```

Reinstall (e.g., to restore missing config files):

```
sudo yum reinstall nginx
```

Remove a package and its dependencies:

```
sudo yum remove nginx
```

Clean up unneeded dependencies:

```
sudo yum autoremove
```

---

## 9\. Managing Package Groups

YUM supports predefined groups (e.g., “Server with GUI”).

| Command                               | Description              |
| ------------------------------------- | ------------------------ |
| `sudo yum group list`                 | List available groups    |
| `sudo yum group list --hidden`        | Include hidden groups    |
| `sudo yum group install 'Group Name'` | Install a specific group |
| `sudo yum group remove 'Group Name'`  | Remove a specific group  |

Example:

```
sudo yum group install 'Server with GUI'
```

---

## 10\. Installing from a Local RPM File

After downloading an RPM:

```
sudo wget https://download.nomachine.com/download/7.7/Linux/nomachine_7.7.4_1_x86_64.rpm
sudo yum install ./nomachine_7.7.4_1_x86_64.rpm
```

Remove it when no longer needed:

```
sudo yum remove nomachine
```

---

## 11\. Updating and Upgrading Packages

Check for available updates:

```
sudo yum check-update
```

Apply all updates:

```
sudo yum update
```

> [!important]
> **Warning**
>
> If a kernel or critical component is updated, reboot to ensure changes take effect:
>
> ```
> sudo reboot
> ```

---

## Links and References

- [Red Hat Subscription Management](https://access.redhat.com/documentation/en-us/red_hat_subscription_management/)
- [YUM Official Documentation](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/managing_packages_with_yum/index)
- [Docker CE Repository for RHEL](https://docs.docker.com/engine/install/centos/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/78ca0fa8-2083-408a-bf8a-2775b09fbf1d/lesson/4c5f841d-94ae-4b1d-bb25-4f3564494554)**
>
> Watch video content
