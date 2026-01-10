# Packaging a Buildpack - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cloud-Native-Buildpacks/Creating-Buildpacks/Packaging-a-Buildpack)

---

## Table of Contents

- Packaging a Buildpack
  - Watch Video

---

## Content

Cloud Native Buildpacks

Creating Buildpacks

# Packaging a Buildpack

In this lesson, you will learn how to package a buildpack into an image. Packaging a buildpack allows you to share it via repositories such as Docker Hub either within your organization or with external users.

A buildpack is stored as a directory containing all its source code. To package it, you must first create a configuration file named project.toml. This file specifies the buildpack location and, optionally, includes any dependent buildpacks.

Below is an example of a project.toml configuration file:

```
[buildpack]
uri = "js-buildpack"


[[dependencies]]
uri = "samples/buildpacks/hello-moon"


[[dependencies]]
uri = "docker://cnbs/sample-package:hello-world"
```

In this configuration:

- The `[buildpack]` section defines the URI (or path) where your buildpack source code is located.
- The `[[dependencies]]` sections list additional buildpacks that this buildpack might call. Although the example does not use dependent buildpacks, you have the option to include them either as local source directories or as Docker image references if they have been packaged.

> [!important]
> **Tip**
>
> Ensure that the paths or Docker references provided in your project.toml file are correct to avoid runtime issues.

Once the project.toml file is ready, package your buildpack by running the following command:

```
pack buildpack package my-js-buildpack --config ./package.toml
```

This command performs the following actions:

- Utilizes the `pack buildpack package` command to create an image.
- Assigns the image the name `my-js-buildpack`.
- Specifies the configuration file (project.toml) using the `--config` flag.

After running the command, your buildpack is packaged into an image. You can now upload this image to your preferred repository, making it available for use in various deployment scenarios.

For more details on buildpack packaging and usage, consider exploring additional resources:

- [Docker Hub](https://hub.docker.com/)
- [Buildpacks Documentation](https://buildpacks.io/docs/)

Happy packaging!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cloud-native-buildpacks/module/0e306774-3067-4e23-9115-f3185d2ffa28/lesson/df1fee88-bf08-4924-a6a8-1e54f9cbd7db)**
>
> Watch video content
