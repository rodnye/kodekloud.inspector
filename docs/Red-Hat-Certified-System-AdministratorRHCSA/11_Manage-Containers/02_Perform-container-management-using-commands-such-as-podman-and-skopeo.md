# Perform container management using commands such as podman and skopeo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Manage-Containers/Perform-container-management-using-commands-such-as-podman-and-skopeo)

---

## Table of Contents

- Perform container management using commands such as podman and skopeo
  - Installing Skopeo
  - Inspecting Container Repositories
  - Inspecting Container Configurations
  - Copying Container Images
  - Deleting Container Images
  - Synchronizing Registries
  - Accessing Skopeo Man Pages
  - Summary
  - Watch Video
  - Practice Lab
    - Copying Between Registries
    - Copying from an OCI Layout Directory

---

## Content

Red Hat Certified System Administrator(RHCSA)

Manage Containers

# Perform container management using commands such as podman and skopeo

In this guide, you'll learn how to efficiently handle container images using Skopeo—a powerful command-line utility that complements Podman. With Skopeo, you can manage container images and repositories directly without needing to download them onto your local disk.

## Installing Skopeo

Before you begin, ensure that Skopeo is installed on your system. If it's not already installed, you can set it up using YUM. This command installs Skopeo along with all its necessary dependencies:

```
$ sudo yum install skopeo
```

> [!important]
> **Installation Tip**
>
> For other package managers and installation options, refer to the [official Skopeo documentation](https://github.com/containers/skopeo/blob/main/install.md).

## Inspecting Container Repositories

Skopeo allows you to examine remote container repositories without using local disk space. The `skopeo inspect` command retrieves a JSON output containing various details such as repository tags, creation date, Docker version, and system architecture.

For example, to inspect a Fedora image hosted on the Fedora registry, run:

```
$ skopeo inspect docker://registry.fedoraproject.org/fedora:latest
```

The output will include information similar to:

```
{
  "Name": "registry.fedoraproject.org/fedora",
  "Digest": "sha256:655721ff6163ee7664126b5e05ae81598e1b0c3bcf7017c36c4472cb092fef9",
  "RepoTags": [
    "24",
    "25",
    "26-modular"
  ],
  "Created": "2020-04-29T06:48:16Z",
  "DockerVersion": "1.10.1",
  "Labels": {
    "license": "MIT",
    "name": "fedora",
    "vendor": "Fedora Project",
    "version": "32"
  },
  "Architecture": "amd64",
  "OS": "linux",
  "Layers": [
    "sha256:30887217d7b674cfobe64cd3fc00c25aab921cacf35fa0e7b1578500a3e1653"
  ],
  "Env": [
    "DISTTAG=f32container",
    "FGC=f32",
    "container=oci"
  ]
}
```

## Inspecting Container Configurations

Beyond repository details, Skopeo can also inspect the configuration of a container image. By using the `--config` flag with `skopeo inspect`, and piping the result through `jq`, you can view neatly formatted configuration details. For instance:

```
$ skopeo inspect --config docker://registry.fedoraproject.org/fedora:latest | jq
```

This command outputs a detailed JSON summary of the container's configuration, including environmental variables, command information, and more:

```
{
  "created": "2020-04-29T06:48:16Z",
  "architecture": "amd64",
  "os": "linux",
  "config": {
    "Env": [
      "DISTTAG=f32container",
      "FGC=f32"
    ],
    "cmd": [
      "/bin/bash"
    ]
  },
  "Labels": {
    "license": "MIT",
    "name": "fedora",
    "vendor": "Fedora Project",
    "version": "32"
  },
  "rootfs": {
    "type": "layers",
    "diff_ids": [
      "sha256:4ac0fa2b217d3fd63d51e5a6fd59432e543d499cdf2b1ac48fbe424f2ddd1"
    ]
  },
  "history": [
    {
      "created": "2020-04-29T06:48:16Z",
      "comment": "Created by Image Factory"
    }
  ]
}
```

## Copying Container Images

Skopeo is not just for inspection—it also enables you to transfer container images across different storage mechanisms. Whether you're dealing with remote registries, local container storage backends, or OCI directories, Skopeo simplifies the process.

### Copying Between Registries

To transfer an image from a public repository to an internal enterprise registry, use the following command:

```
$ skopeo copy docker://quay.io/buildah/stable docker://registry.kodekloud.com/buildah
```

### Copying from an OCI Layout Directory

If you need to copy an image from a local OCI layout directory to another local directory, this command will do the trick:

```
$ skopeo copy oci:busybox_ocilayout:latest dir:myemptydirectory
```

## Deleting Container Images

Removing an image from a repository is straightforward with Skopeo’s `delete` command. Simply specify the image address to delete it:

```
$ skopeo delete docker://localhost:5000/imagename:latest
```

> [!important]
> **Caution**
>
> Deleting images is irreversible. Ensure you have backups or are certain before executing the delete command.

## Synchronizing Registries

For maintaining consistency between registries, Skopeo offers a synchronization feature. This is especially beneficial when managing a local container registry that mirrors a remote repository. For example, to sync a remote registry with a local directory, run:

```
$ skopeo sync --src docker --dest dir registry.kodekloud.com/busybox /media/usb
```

## Accessing Skopeo Man Pages

For comprehensive details about Skopeo and its various commands, the manual pages are an excellent resource. Use the `man` command to explore them.

To access the general Skopeo manual, run:

```
$ man skopeo
```

This displays the manual which covers the tool’s overview, usage, and options. Here is an excerpt:

SKOPEO(1) August 2016 SKOPEO(1)

NAME  
skopeo -- Command line utility used to interact with local and remote container images and container image registries

SYNOPSIS  
skopeo \[global options\] command \[command options\]

DESCRIPTION  
skopeo is a command line utility providing various operations with container images and container image registries.

Similarly, for information on specific commands such as copying images, inspect the dedicated man page:

```
$ man skopeo-copy
```

This command details how to execute the `skopeo copy` operation, including its options and usage.

## Summary

Skopeo is a versatile tool that enhances container management by providing streamlined ways to inspect, copy, delete, and synchronize container images across various platforms. With seamless integration alongside Podman, managing container workflows becomes more efficient and flexible.

For further reading and advanced usage, consider exploring more resources:

- [Skopeo GitHub Repository](https://github.com/containers/skopeo)
- [Podman Documentation](https://podman.io/documentation)

By following the steps outlined in this guide, you can improve your container management strategies and streamline operations in your containerized environments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/141c7a78-21ef-4dd8-86a3-fb0ef5037a8d/lesson/dc468105-88e9-4dba-8cf3-e98fc676e572)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/141c7a78-21ef-4dd8-86a3-fb0ef5037a8d/lesson/1b588fdb-14cc-461a-93fb-81551aefbe35)**
>
> Practice lab
