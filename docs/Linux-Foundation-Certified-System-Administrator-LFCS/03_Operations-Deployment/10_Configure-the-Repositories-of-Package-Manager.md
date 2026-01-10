# Configure the Repositories of Package Manager - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Operations-Deployment/Configure-the-Repositories-of-Package-Manager)

---

## Table of Contents

- Configure the Repositories of Package Manager
  - Breaking Down the Repository Configuration
  - Working with Additional Repositories
  - Using Personal Package Archives (PPAs)
  - Final Steps
  - Watch Video
    - Downloading the Docker Public Key
    - Adding the Docker Repository

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Operations Deployment

# Configure the Repositories of Package Manager

Most of the software you need is available in Ubuntu's official repositories. You can check the default repositories configured on your system by examining the appropriate file location for your release.

In Ubuntu 22.04—the latest release at the time of this article—the repository configuration file may differ from previous versions. Older Ubuntu versions stored the file in a different path and even included comments referencing a new filename. Let’s examine the repository configuration in detail.

Below is an excerpt from the file "/etc/apt/sources.list.d/ubuntu.sources":

```
Types: deb
URIs: http://us.archive.ubuntu.com/ubuntu/
Suites: noble noble-updates noble-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
Types: deb
URIs: http://security.ubuntu.com/ubuntu/
Suites: noble-security
Components: main restricted universe multiverse
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
~
"/etc/apt/sources.list.d/ubuntu.sources" 111L, 386B
```

## Breaking Down the Repository Configuration

1.  > [!important]
    > **Note**
    >
    > **Types**:
    > The first line identifies the type of repository. Here, `deb` indicates a Debian-style repository, signifying that the package manager (e.g., apt) will work with Debian package files (with the `.deb` extension) containing executable programs, configuration files, documentation, and scripts.
2.  **URIs**:  
    The next line specifies the Uniform Resource Identifier (URI) of the repository. In this instance, it points to the Ubuntu archive mirror in the United States (`us.archive.ubuntu.com`), with `/ubuntu` indicating the repository's content. This URI directs the package manager to the correct source for downloading packages.
3.  **Suites**:  
    This field outlines the suites or release components provided in the repository. In Ubuntu, a suite represents a set of packages tied to a specific release. For the current release codenamed "noble," three suites are defined:

    | Suite           | Description                                                   |
    | --------------- | ------------------------------------------------------------- |
    | noble           | The primary suite containing core packages for the release.   |
    | noble-updates   | Contains bug fixes, security patches, and minor enhancements. |
    | noble-backports | Includes packages backported from newer Ubuntu releases.      |

4.  **Components**:  
    This line categorizes packages based on licensing and functionality:

    | Component  | Description                                                                                   |
    | ---------- | --------------------------------------------------------------------------------------------- |
    | Main       | Contains free and open-source software that is officially supported by Ubuntu.                |
    | Restricted | Contains free and open-source software that has certain usage or redistribution restrictions. |
    | Universe   | Contains free and open-source software that is not officially supported by Ubuntu.            |
    | Multiverse | Contains packages that are non-free or have additional licensing restrictions.                |

    On servers, you typically primarily use packages from "Main" (and possibly "Universe" if needed). By default, Ubuntu enables all four components.

## Working with Additional Repositories

Sometimes, the required software may not be available in the official Ubuntu repositories or may be outdated. In these situations, you can add third-party repositories—maintained by external teams or companies—that remain compatible with your system.

For instance, if you need the latest stable version of Docker, begin by downloading the public key for Docker’s repository. Docker signs its packages with a private key; using the public key ensures the integrity of the packages by verifying their signatures.

### Downloading the Docker Public Key

Execute the following command to download the Docker public key and save it as `docker.key`:

```
jeremy@kodekloud:~$ curl "https://download.docker.com/linux/ubuntu/gpg" -o docker.key
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 3817  100 3817    0     0  9651      0 --:--:-- --:--:-- --:--:-- 9663
jeremy@kodekloud:~$
```

After downloading, verify the file by listing the directory contents:

```
jeremy@kodekloud:~$ ls -la
total 32
drwxr-x---  4 jeremy jeremy 4096 Jun  5 01:56 .
drwxr-xr-x  3 root   root   4096 Jun  5 01:47 ..
-rw-r--r--  1 jeremy jeremy  220 Mar 31 08:41 .bash_logout
-rw-r--r--  1 jeremy jeremy 3771 Mar 31 08:41 .bashrc
drwx------  2 jeremy jeremy 4096 Jun  5 01:48 .cache
-rw-r--r--  1 jeremy jeremy  807 Mar 31 08:41 .profile
drwxr-xr-x  2 jeremy jeremy 4096 Jun  5 01:47 .ssh
-rw-r--r--  1 jeremy jeremy    0 Jun  5 01:50 .sudo_as_admin_successful
jeremy@kodekloud:~$
```

Next, convert the key to a binary format using the `gpg --dearmor` command:

```
jeremy@kodekloud:~$ gpg --dearmor docker.key
jeremy@kodekloud:~$ ls
docker.key  docker.key.gpg
jeremy@kodekloud:~$
```

Then, move the dearmored key into the apt keyrings directory:

```
jeremy@kodekloud:~$ sudo mv docker.key.gpg /etc/apt/keyrings/
jeremy@kodekloud:~$ ls /etc/apt
apt.conf.d  keyrings  preferences.d  sources.list.d
jeremy@kodekloud:~$ ls /etc/apt/keyrings/
auth.conf.d  preferences.d  sources.list
```

This method organizes third-party keys separately, making them easier to manage. If you ever need to disable a repository, simply remove its configuration file.

### Adding the Docker Repository

Rather than altering the main sources file, create a new configuration file in the `sources.list.d` directory. For Docker, create a file named `docker.list` and insert the following configuration:

```
deb [signed-by=/etc/apt/keyrings/docker.key.gpg] https://download.docker.com/linux/ubuntu noble stable
```

This configuration line includes:

- `deb`: Specifies a Debian-style repository.
- The Docker repository URL.
- The distribution codename (`noble`).
- The component (`stable`) indicating the stable Docker software version.
- The `[signed-by=...]` option that points to the trusted public key.

After saving the file, update the package manager's database with:

```
jeremy@kodekLOUD:~$ sudo apt update
```

The output should indicate that the Docker repository is being queried:

```
jeremy@kodekloud:~$ sudo apt update
Get:1 https://download.docker.com/linux/ubuntu noble InRelease [48.8 kB]
Get:2 https://download.docker.com/linux/ubuntu noble/stable amd64 Packages [6,952 B]
Hit:3 http://us.archive.ubuntu.com/ubuntu noble InRelease
Get:4 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]
...
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
```

> [!important]
> **Warning**
>
> If you encounter errors related to package signatures, ensure that the dearmored public key is correctly located in `/etc/apt/keyrings/docker.key.gpg`.

## Using Personal Package Archives (PPAs)

Ubuntu supports Personal Package Archives (PPAs) as a convenient method for adding third-party repositories. PPAs simplify the process and even allow you to create your own.

For example, to add a PPA for the latest graphics drivers, use:

```
sudo add-apt-repository ppa:graphics-drivers/ppa
```

This command structure is simple:

- The `ppa:` prefix indicates a Personal Package Archive.
- It is followed by the username (e.g., `graphics-drivers`) and the repository name (`ppa`).

After executing the command, confirm the change by pressing Enter when prompted. This utility will handle key management, update repository configuration files, and refresh the package database automatically.

To list all enabled PPAs, run:

```
sudo add-apt-repository --list
```

To remove a PPA, use:

```
sudo add-apt-repository --remove ppa:graphics-drivers/ppa
```

A prompt will appear asking for confirmation before removal.

## Final Steps

After configuring repositories—whether they are official, third-party, or PPAs—it is important to update the package database one final time:

```
sudo apt update
```

This ensures that your system is aware of all available packages and updates. With the repositories correctly configured and verified, you are now ready to install software and manage your Ubuntu system effectively.

Now, let’s move on to the next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cb813f7f-73bd-40ee-a088-d31ba20c51de/lesson/e85156f3-13ad-4a6a-8a61-f3b219ce02ac)**
>
> Watch video content
