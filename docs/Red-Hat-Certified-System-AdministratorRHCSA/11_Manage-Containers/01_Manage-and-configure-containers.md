# Manage and configure containers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Manage-Containers/Manage-and-configure-containers)

---

## Table of Contents

- Manage and configure containers
  - Installing Podman to Emulate Docker
  - Configuring Podman’s Default Registry
  - Working with Images
  - Running and Managing Containers
  - Advanced: Naming Containers and Port Mapping
  - Getting Help
  - Conclusion
  - Watch Video
    - Searching for an Image
    - Pulling an Image
    - Creating and Attaching to a Container
    - Listing, Stopping, and Removing Containers
    - Removing Images

---

## Content

Red Hat Certified System Administrator(RHCSA)

Manage Containers

# Manage and configure containers

Welcome to this comprehensive guide on container management and configuration. In this article, we explore how containers simplify application deployment and migration by encapsulating everything—daemons, configuration files, logs, and databases—in a single, portable unit. Unlike traditional setups (e.g., a conventional MariaDB installation where components are scattered in various directories), containerized applications streamline the process of moving applications between different systems.

---

## Installing Podman to Emulate Docker

In some environments, such as CentOS Stream 8, Docker might not have official support. In these cases, you can install Podman, which offers a Docker-compatible command-line interface. To install Podman using the dnf package manager, execute the following command:

```
sudo dnf install podman
```

After installation, Podman allows you to use familiar Docker commands as it seamlessly translates them under the hood. The installation output might resemble the following:

```
# Sample installation output
Install  1 Package

Total download size: 67 k
Installed size: 230
Is this ok [y/N]: y
Downloading Packages:
podman-docker-4.0.2-1.module_el8.7.0+1106+45480 208 kB/s | 67 kB     00:00
----------------------------------------------------------
Total                                         94 kB/s | 67 kB     00:00
Running transaction check.
Transaction check succeeded.
Running transaction test.
Transaction test succeeded.
Running transaction
  Preparing   :
  Installing   : podman-docker-2:4.0.2-1.module_el8.7.0+1106+45480ee0       1/1
  Verifying   : podman-docker-2:4.0.2-1.module_el8.7.0+1106+45480ee0       1/1

Installed:
  podman-docker-2:4.0.2-1.module_el8.7.0+1106+45480ee0.noarch

Complete!
[aaron@LFCS-CentOS ~]$
```

---

## Configuring Podman’s Default Registry

Podman’s configuration file is located at `/etc/containers/registries.conf`. Open it using your preferred text editor (for example, vim):

```
sudo vim /etc/containers/registries.conf
```

Find the line that configures unqualified search registries:

```
unqualified-search-registries = ["registry.fedoraproject.org", "registry.access.redhat.com", "registry.centos.org", "docker.io"]
```

> [!important]
> **Tip**
>
> Comment out the above line and add the following to set `docker.io` as the default registry:

```
# unqualified-search-registries = ["registry.fedoraproject.org", "registry.access.redhat.com", "registry.centos.org", "docker.io"]
unqualified-search-registries = ["docker.io"]
```

If you receive a message about emulating the Docker CLI with Podman, you can disable this behavior by creating a specific file:

```
sudo touch /etc/containers/no-docker
```

---

## Working with Images

### Searching for an Image

For this guide, we will use the popular Nginx web server as an example. To locate available Nginx images, run:

```
docker search nginx
```

The output may include entries such as:

```
docker.io/rancher/nginx
docker.io/vmware/nginx-photon
docker.io/ibmcom/nginx-ingress-controller-ppc64le    Docker Image for IBM Cloud Private-CE (Community Edition) ppc64le ingress controller component
...
```

The official image, often referred to as `docker.io/library/nginx`, is well-supported and highly rated.

### Pulling an Image

To pull the official Nginx image, use its fully qualified name:

```
docker pull docker.io/library/nginx
```

For convenience, you can also use the short form:

```
docker pull nginx
```

To pull a specific version (for instance, version 1.20.2), run:

```
docker pull nginx:1.20.2
```

After pulling an image, you can list the available images with:

```
docker images
```

Example output:

```
REPOSITORY                 TAG       IMAGE ID       CREATED         SIZE
docker.io/library/nginx    1.20.2    8f34c303855f   17 hours ago    146 MB
docker.io/library/nginx    latest    12766a6745ee   17 hours ago    146 MB
```

If you wish to remove a specific version, execute:

```
docker rmi nginx:1.20.2
```

Images can also be referenced by their IMAGE ID, using just enough characters to uniquely identify them.

---

## Running and Managing Containers

### Creating and Attaching to a Container

To create and run a new container using the Nginx image, use:

```
docker run nginx
```

This command creates a container and attaches your terminal to its output. If you find that the container’s logs (for example, startup messages from `/docker-entrypoint.sh`) continuously appear, press Ctrl+C to detach and terminate the container.

To run the container in detached mode, use the `-d` option:

```
docker run -d nginx
```

This command returns a hexadecimal container ID and allows the container to run in the background.

### Listing, Stopping, and Removing Containers

To list active containers, run:

```
docker ps
```

For a complete list of containers (including those that have exited), use:

```
docker ps --all
```

To stop a container, specify its container ID or assigned name. For example, to stop a container named `interesting_mcclintock`:

```
docker stop interesting_mcclintock
```

After stopping the container, remove it with:

```
docker rm interesting_mcclintock
```

If the container is running and you wish to force its removal, use:

```
docker rm --force interesting_mcclintock
```

### Removing Images

If you try to remove an image that is currently in use, Docker will produce an error:

```
docker rmi nginx
```

Example error message:

```
Error: image used by 92a87f978de328e0ec460a3775006b394459fa9f043da39179d6693416e976f2: image is in use by a container
```

To force the removal of an image (this will stop and remove any dependent containers), add the `--force` option:

```
docker rmi --force nginx
```

---

## Advanced: Naming Containers and Port Mapping

For improved container management, you can assign custom names and set up port mapping between the host and container. To run Nginx in a container named `mywebserver` with host port 8080 mapped to container port 80, use:

```
docker run -d -p 8080:80 --name mywebserver nginx
```

This configuration directs any connection to port 8080 on your machine to port 80 inside the container. To test the setup, you can use netcat:

```
nc localhost 8080
```

After connecting, type the following command:

```
GET /
```

Then press Enter. This simulates a browser request to Nginx, displaying the default HTML page. Press Ctrl+C to exit the netcat session.

Note: Mapping to privileged ports (ports below 1024) requires root privileges. For example, to map host port 80 to container port 80, use:

```
sudo docker run -d -p 80:80 --name mywebserver nginx
```

---

## Getting Help

For detailed information about any Docker command, append the `--help` option. For example:

```
docker container --help
```

Or to get help for a specific command like `docker rm`:

```
docker rm --help
```

Below is an example of help output for Podman’s container removal command:

```
podman rm [options] CONTAINER [CONTAINER...]
Examples:
  podman rm imageID
  podman rm mywebserver myflaskserver 860a4b23
  podman rm --force --all
  podman rm -f c684f0d469f2
Options:
  -a, --all                         Remove all containers
  --cidfile stringArray             Read the container ID from the file
  --depend                          Remove container and all containers that depend on the selected container
  -f, --force                       Force removal of a running or unusable container
  -i, --ignore                      Ignore errors when a specified container is missing
  -l, --latest                      Act on the latest container podman is aware of
  -t, --time uint                   Not supported with the "--remote" flag
                                   Seconds to wait for stop before killing the container
  -v, --volumes                     Remove anonymous volumes associated with the container
```

---

## Conclusion

This guide demonstrated the key steps in managing and configuring containers on Linux using Docker and Podman. We covered installing Podman, configuring its default registry, working with images, running containers in both attached and detached modes, and advanced topics like port mapping and naming containers. Continue exploring these concepts to elevate your container management skills.

Happy containerizing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/141c7a78-21ef-4dd8-86a3-fb0ef5037a8d/lesson/a54da927-4c31-4c14-94ab-a7dcdf0304b2)**
>
> Watch video content
