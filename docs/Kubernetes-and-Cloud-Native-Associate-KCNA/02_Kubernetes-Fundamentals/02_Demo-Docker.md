# Demo Docker - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Associate-KCNA/Kubernetes-Fundamentals/Demo-Docker)

---

## Table of Contents

- Demo Docker
  - Step 1: Becoming the Root User
  - Step 2: Installing Docker on Ubuntu
  - Step 3: Checking the Docker Version
  - Step 4: Running the "hello-world" Docker Container
  - Step 5: Running the "whalesay" Docker Container
  - Conclusion
  - Additional Resources
  - Watch Video

---

## Content

Kubernetes and Cloud Native Associate - KCNA

Kubernetes Fundamentals

# Demo Docker

Welcome to this comprehensive guide on installing Docker on an Ubuntu virtual machine. In this lesson, we will cover the process of setting up an Ubuntu VM, installing Docker, and running Docker containers.

> [!important]
> **Prerequisite**
>
> Ensure that you are connected to your Ubuntu VM via SSH from your laptop before proceeding.

## Step 1: Becoming the Root User

To start, switch to the root user by running the following command:

```
sudo su
```

## Step 2: Installing Docker on Ubuntu

Install Docker by using the apt-get package manager to install the Docker package (docker.io). This command will install Docker along with all the necessary dependencies.

```
bash
root@osboxes:/home/osboxes# apt-get install docker.io
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following additional packages will be installed:
  bridge-utils cgroupfs-mount containerd git git-man librerror-perl runc ubuntu-fan
Suggested packages:
  aufs-tools btrfs-tools debootstrap docker-doc rinse zfs-fuse | zfsutils git-daemon-run | git-daemon-svn
  git-email git-gui gitk gitweb git-arch git-cvs git-mediawiki git-svn
The following NEW packages will be installed:
  bridge-utils cgroupfs-mount containerd docker.io git git-man librerror-perl runc ubuntu-fan
0 upgraded, 9 newly installed, 0 to remove and 387 not upgraded.
Need to get 21.4 MB of archives.
After this operation, 116 MB of additional disk space will be used.
Do you want to continue? [Y/n]
```

After confirming the installation, Docker will be installed on your system. To verify the installation, display Docker's help page by running:

```
docker
```

## Step 3: Checking the Docker Version

To confirm the installed version of Docker on your Ubuntu VM, execute the following command:

```
bash
root@osboxes:/home/osboxes# docker version
Client:
 Version:       1.13.1
 API version:   1.26
 Go version:    go1.6.2
 Git commit:    092cba3
 Built:         Thu Nov  2 20:40:23 2017
 OS/Arch:       linux/amd64


Server:
 Version:       1.13.1
 API version:   1.26 (minimum version 1.12)
 Go version:    go1.6.2
 Git commit:    092cba3
 Built:         Thu Nov  2 20:40:23 2017
 OS/Arch:       linux/amd64
 Experimental:  false
root@osboxes:/home/osboxes#
```

> [!important]
> **Tip**
>
> Verifying the Docker version ensures that your installation was successful and provides details about both the Client and Server components.

## Step 4: Running the "hello-world" Docker Container

Now that Docker is installed, let's run a simple container to confirm that Docker is functioning correctly. Use the following command to run the "hello-world" container. This command will automatically pull the image from Docker Hub if it is not already available locally, and then display a confirmation message.

```
root@osboxes:/home/osboxes# docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
ca4f61b1923c: Pull complete
Digest: sha256:083de497cff944f969d8499ab94f07134c50bcf5e6b9559b27182d3fa80ce3f7
Status: Downloaded newer image for hello-world:latest


Hello from Docker!
This message shows that your installation appears to be working correctly.


To generate this message, Docker took the following steps:
1. The Docker client contacted the Docker daemon.
2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
3. The Docker daemon created a new container from that image which runs the executable that produces the output you are currently reading.
4. The Docker daemon streamed that output to the Docker client, which sent it to your terminal.


To try something more ambitious, you can run an Ubuntu container with:
$ docker run -it ubuntu bash
```

## Step 5: Running the "whalesay" Docker Container

For a bit of fun, let’s run another Docker image called "whalesay." This container uses the "cowsay" program to display a message along with an ASCII art whale. Execute the command below:

```
root@osboxes:/home/osboxes# docker run docker/whalesay cowsay boo
Unable to find image 'docker/whalesay:latest' locally
latest: Pulling from docker/whalesay
903dcd34cfd7: Pull complete
00bf65475aba: Extracting  [==================>         ] 16.12 MB/37.71 MB
a3ed95caeb02: Pull complete
c57b6bbc83e3: Download complete
8978f6879e2f: Download complete
8eed3712d2cf: Download complete
```

Once the image is pulled, the container runs and produces the following output:

```
root@osboxes:/home/osboxes# docker run docker/whalesay cowsay boo
Unable to find image 'docker/whalesay:latest' locally
latest: Pulling from docker/whalesay
Digest: sha256:178598e51a26abbc958b8a2e48825c90bc22e641de3d31e18aaf55f3258ba93b
Status: Downloaded newer image for docker/whalesay:latest
< boo >
 -----
      .   :        .
    # ## ## #  ==
  # ## ## ## # === =
 ~~ ~~~~ ~~ ~~ ~=== ~~ ~~
                o
root@osboxes:/home/osboxes# clear
```

## Conclusion

In this lesson, we demonstrated how to install Docker on an Ubuntu virtual machine and run Docker containers. You've learned to:

- Become the root user.
- Install Docker and its dependencies.
- Confirm the installation by checking the Docker version.
- Run the "hello-world" and "whalesay" containers to verify that Docker is working correctly.

Enjoy exploring Docker further and discovering more about containerization!

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Ubuntu Official Documentation](https://ubuntu.com/tutorials)

Happy Dockering!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-associate-kcna/module/8403f56b-91f8-42f9-89e9-5c27a7438ef2/lesson/1ced744e-16b6-4da6-a15c-650b4eb5f189)**
>
> Watch video content
