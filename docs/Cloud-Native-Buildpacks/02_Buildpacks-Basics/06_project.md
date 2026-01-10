# project - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cloud-Native-Buildpacks/Buildpacks-Basics/project)

---

## Table of Contents

- project
  - 1. Schema Version
  - 2. Project Identity
  - 3. Builder Specification
  - 4. File Inclusion and Exclusion
  - 5. Custom Buildpack Group and Build-Time Environment Variables
  - Summary
  - Watch Video
    - Custom Buildpack Group
    - Build-Time Environment Variables

---

## Content

Cloud Native Buildpacks

Buildpacks Basics

# project

In this lesson, we explore the project.toml file—a crucial configuration file that centralizes repository settings and defines how a buildpack should execute. The file enables you to set various configuration options for your project in a single, manageable location. Below is an example project.toml configuration:

```
[1]
schema-version = "0.2"
id = "io.buildpacks.node-app"
name = "node app"
version = "1.0.0"


[io.buildpacks]
builder = "gcr.io/buildpacks/builder:google-22"
exclude = [
  "node_modules",
  ".env",
  "tests/*",
  "dummyfile.txt"
]


include = []


[[io.buildpacks.group]]
uri = "bash-script-buildpack"


[[io.buildpacks.build.env]]
name = 'HELLO'
value = 'WORLD'
```

Let's review the key sections of this configuration and understand their purpose:

## 1\. Schema Version

The `schema-version` key specifies the version of the project.toml specification being used (in this case, "0.2"). It ensures compatibility between your configuration and the buildpack system. For further details, please refer to the official buildpacks documentation.

> [!important]
> **Note**
>
> Make sure to verify the supported schema versions in the buildpack documentation to ensure compatibility with future updates.

## 2\. Project Identity

The project identity is defined using the following keys:

- **id**: A machine-readable identifier (e.g., `"io.buildpacks.node-app"`).
- **name**: A human-friendly application name (e.g., `"node app"`).
- **version**: The version of your application (e.g., `"1.0.0"`).

This structured information helps in managing and deploying your application consistently.

## 3\. Builder Specification

Within the `[io.buildpacks]` section, the `builder` key is set to `"gcr.io/buildpacks/builder:google-22"`. This configuration instructs the pack build command to automatically use the specified builder, thus eliminating the need to pass the `--builder` flag manually when running the command.

## 4\. File Inclusion and Exclusion

The file inclusion and exclusion mechanism works similarly to a .dockerignore file. Specific files and directories such as:

- `"node_modules"`
- `".env"`
- `"tests/*"`
- `"dummyfile.txt"`

are excluded from the final image. If there are files or directories that you want to ensure are included, you can specify them in the `include` array.

## 5\. Custom Buildpack Group and Build-Time Environment Variables

The project.toml file also allows you to define custom buildpacks and environment variables:

| Key Section                         | Purpose                                                    | Example Value                     |
| ----------------------------------- | ---------------------------------------------------------- | --------------------------------- |
| \\[\\[io.buildpacks.group\\]\\]     | Specifies the buildpack(s) to run during the build process | `uri = "bash-script-buildpack"`   |
| \\[\\[io.buildpacks.build.env\\]\\] | Sets environment variables needed at build time            | `name = 'HELLO', value = 'WORLD'` |

### Custom Buildpack Group

The `[[io.buildpacks.group]]` array is used to specify which buildpacks should run. In this example, the buildpack defined by `uri = "bash-script-buildpack"` will be executed.

### Build-Time Environment Variables

You can define environment variables under `[[io.buildpacks.build.env]]` that will be available during the build process. For this instance, the variable `HELLO` is set to `WORLD`.

> [!important]
> **Warning**
>
> Ensure that sensitive data is not exposed through environment variables in the project.toml file. Use secure methods for managing secrets whenever possible.

## Summary

This project.toml configuration simplifies the build process by consolidating project settings, automatically selecting a builder, and managing file inclusion/exclusion. Leveraging this configuration file not only streamlines your development workflow but also promotes a standardized approach to project setup and deployment.

For more information on buildpack configurations and best practices, please visit the [Buildpacks Documentation](https://buildpacks.io/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cloud-native-buildpacks/module/d2170747-7a07-4648-b449-958edfff954b/lesson/96ec432e-4a98-4da4-b70b-0b53c10baf87)**
>
> Watch video content
