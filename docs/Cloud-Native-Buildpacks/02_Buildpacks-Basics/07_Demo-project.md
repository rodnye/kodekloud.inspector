# Demo project - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cloud-Native-Buildpacks/Buildpacks-Basics/Demo-project)

---

## Table of Contents

- Demo project
  - Using Examples
  - Creating and Configuring Your project.toml
  - Excluding Files from Your Build
  - Alternative: Using the Include Option
  - Additional Configuration Options
  - Summary
  - Watch Video

---

## Content

Cloud Native Buildpacks

Buildpacks Basics

# Demo project

In this lesson, you will learn how to leverage a project.toml file to embed build configuration details directly into your application. This configuration file allows you to define default builders and control which files are included in your final container image, eliminating the need to specify flags (such as the builder flag) with every build command.

For example, instead of executing:

```
pack build myapp --path nodejs-app/ --builder gcr.io/buildpacks/builder:google-22
```

you can create a project.toml file in your project’s root directory with the builder information. This file guides the buildpacks to select the correct builder by default when packaging your application.

---

## Using Examples

Below is a sample project.toml inspired by best practices for application development:

```
schema-version = "0.2"
id = "io.buildpacks.bash-script"
name = "Bash Script"
version = "1.0.0"


[io.buildpacks]
exclude = [
  "README.md",
  "bash-script-buildpack"
]


[[io.buildpacks.group]]
uri = "../buildpacks/hello-world/"


[[io.buildpacks.group]]
uri = "bash-script-buildpack"


[io.buildpacks.build.env]
name = "HELLO"
value = "WORLD"
```

There is also a reference example demonstrating additional configuration options:

```
schema-version = "0.2"
id = "io.buildpacks.bash-script"
name = "Bash Script"
version = "1.0.0"


[io.buildpacks]
exclude = [
  "/README.md",
  "bash-script-buildpack"
]


include = []


[[io.buildpacks_group]]
uri = "bash-script-buildpack"
```

You can build the app using these configurations with a command like:

```
# Build the app using the project descriptor
pack build sample-app \
  --builder cnbs/sample-builder:jammy \
  --path samples/apps/bash-script/
```

For a complete list of available options for your project.toml file, refer to the detailed configuration guide.

---

## Creating and Configuring Your project.toml

Start by copying one of the provided examples and then modify it to suit your application. For instance, here's how you might configure a project.toml for a Node.js application:

```
schema-version = "0.2"
id = "io.buildpacks.node-app"
name = "node app"
version = "1.0.0"


[io.buildpacks]
builder = "gcr.io/buildpacks/builder:google-22"
```

This snippet sets the schema version, provides a unique machine-readable ID, a human-friendly name, and version information. The \[io.buildpacks\] section specifies the default builder. You can override these settings when running the `pack build` command, if necessary.

---

## Excluding Files from Your Build

Sometimes it is important to prevent certain files from being copied into the final container image—files like local dependencies stored in a `node_modules` folder, environment variables, tests, or dummy files used during development.

> [!important]
> **Note**
>
> By excluding unnecessary files, you can streamline your image, making it leaner and more responsive.

For example, if you have a dummy file that you do not want copied into the final image, include an `exclude` section in your project.toml:

```
version = "1.0.0"


[io.buildpacks]
builder = "gcr.io/buildpacks/builder:google-22"
exclude = [
  "node_modules",
  ".env",
  "tests/**",
  "dummfile.txt"
]
```

After saving changes to your project.toml, rebuild your image by running:

```
pack build myapp --path nodejs-app/
```

Then run your container:

```
docker run -d -p 8000:8080 myapp
```

Verify the running container with:

```
docker ps
```

To confirm that the excluded files have not been copied, open a shell inside the container:

```
docker exec -it <container-id> bash
ls
```

You should notice that files such as `dummfile.txt` are not present in the container workspace, confirming that your exclude configuration works as intended.

---

## Alternative: Using the Include Option

Alternatively, you may prefer to explicitly specify the files or directories to include in the build context. This method excludes all other files not explicitly listed. For example:

```
version = "1.0.0"


[io.buildpacks]
builder = "gcr.io/buildpacks/builder:google-22"
include = [
  "index.js",
  "package.json",
  "package-lock.json",
  "cmd/",
  "go.mod",
  "go.sum"
]
```

This configuration ensures that only the files defined in the include list are part of the build context.

---

## Additional Configuration Options

The full specification of project.toml supports various configurations such as setting environment variables for the build process or even specifying individual buildpacks. Consider the following example:

```
schema-version = "0.2"
id = "io.buildpacks.my-app"
version = "0.1"


[io.buildpacks]
include = [
  "cmd/",
  "go.mod",
  "go.sum",
  "go"
]


[[io.buildpacks.build.env]]
name = "JAVA_OPTS"
value = "-Xmx1g"


[[io.buildpacks.group]]
id = "io.buildpacks/java"
version = "1.0"


[[io.buildpacks.group]]
id = "io.buildpacks/nodejs"
version = "1.0"


[._metadata]
foo = "bar"


[._metadata.fizz]
```

Review the full list of configuration options in the official documentation and tailor the settings to match your project's unique requirements.

---

## Summary

In this lesson, we covered:

- How to embed default builder configurations within a project.toml file, eliminating the need to pass the builder flag with every command.
- Techniques to exclude specific files and directories from the build context, similar to using a .dockerignore file.
- How to opt for an include-based configuration to precisely define which files are part of your build.
- Additional configuration options available to further customize your build process.

By properly configuring your project.toml, you can optimize your build process and ensure that your final image contains only the necessary files and settings.

For more details, visit the [Buildpacks Documentation](https://buildpacks.io/docs/) and other related resources.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cloud-native-buildpacks/module/d2170747-7a07-4648-b449-958edfff954b/lesson/5cb4e409-78f0-47ae-8db2-4c92feefd73c)**
>
> Watch video content
