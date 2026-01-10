# Demo Cloud Native Buildpack Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cloud-Native-Buildpacks/Buildpacks-Basics/Demo-Cloud-Native-Buildpack-Basics)

---

## Table of Contents

- Demo Cloud Native Buildpack Basics
  - Overview of the Node.js Application
  - Building the Container Image
  - Creating the Container Image
  - Testing the Container Image
  - Exploring Pack CLI Commands
  - Publishing the Container Image
  - Conclusion
  - Watch Video

---

## Content

Cloud Native Buildpacks

Buildpacks Basics

# Demo Cloud Native Buildpack Basics

In this lesson, you will learn how to use the Pack CLI to create a container image from your source code. We will use a simple Node.js web application as an example to demonstrate the process.

---

## Overview of the Node.js Application

The main application file, `index.js`, starts a web server using Express. Below is the complete code:

```
console.log(process.env.NODE_PATH);
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

In addition to the application code, the project includes a `package.json` file that specifies the third-party dependencies required by the application (such as Express and UUID). When installed, these dependencies appear in the `node_modules` folder alongside your application code.

```
{
  "name": "example-application",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "engines": {
    "node": "23.1.0"
  },
  "dependencies": {
    "express": "^4.21.1",
    "uuid": "^11.0.2"
  }
}
```

> [!important]
> **Note**
>
> The `node_modules` folder contains the application dependencies for Express and UUID, ensuring that your app runs correctly.

---

## Building the Container Image

Before building the image, you need a builder. If your organization provides one, you can reference that; otherwise, you can use the Pack CLI command to get suggestions for pre-built default builders:

```
pack builder suggest
```

This command displays several builder options. For example, the output might look like:

```
pack builder suggest
Suggested builders:
    gcr.io/buildpacks/builder:google-22
    heroku/builder:24
    paketo-buildpacks/builder-jammy-base
    paketo-buildpacks/builder-jammy-buildpackless-static
    paketo-buildpacks/builder-jammy-full
    paketo-buildpacks/builder-jammy-tiny

Tip: Learn more about a specific builder with:
  pack builder inspect <builder-image>
```

Each builder is distributed as a Docker image. In this demonstration, we will use the Google builder (`gcr.io/buildpacks/builder:google-22`) as it is the first option on the list.

---

## Creating the Container Image

Use the Pack CLI to create your container image. Here, we name the image "myapp", specify the path to your Node.js application source code, and choose the builder:

```
pack build myapp --path nodejs-app/ --builder gcr.io/buildpacks/builder:google-22
```

When you run this command, the CLI provides real-time output that explains each stage of the build process. Initially, it pulls the builder image:

```
pack build myapp --path nodejs-app/ --builder gcr.io/buildpacks/builder:google-22
google-22: Pulling from buildpacks/builder
7478e0ac0f23: Pulling fs layer
5512532c350: Pulling fs layer
91a72829bc1: Pulling fs layer
9ae183334c8a: Pulling fs layer
837fefdb9f6: Pulling fs layer
841f6cbd4c1d: Pulling fs layer
2258f93618f6: Pulling fs layer
e6bd39fa6d6: Pulling fs layer
72d629fa4f99: Pulling fs layer
e3271c319508: Pulling fs layer
dbd43f154648: Pulling fs layer
da31c8a79d1d: Pulling fs layer
bb8941b3bb9e: Pulling fs layer
7ecf3781b9cc: Pulling fs layer
c9baf0170959: Pulling fs layer
c657cd79d205: Download complete
e035aeb2d814: Download complete
Extracting [>                                 ] 32.77kB/2.516MB
```

After downloading the builder image, the build process advances through several stages:

1.  **Detection:**  
    Each buildpack inspects the source code to decide whether it should execute. For the Node.js application, buildpacks check for files like `package.json` or `package-lock.json`. In this example, three out of five buildpacks detected that they needed to run.
2.  **Restoration:**  
    Previous build metadata is restored. Although this step is useful for caching and speeding up subsequent builds, it is not the primary focus here.
3.  **Building:**  
    During this stage, the builder installs Node.js (if it isn’t cached already) and executes `npm install` to populate the `node_modules` folder with your application's dependencies. Here is an excerpt from the build log:

```
{
  "name": "example-application",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "example-application",
      "version": "1.0.0",
      "license": "ISC",
      "dependencies": {
        "express": "^4.21.1",
        "uuid": "^11.0.2"
      }
    }
  }
}
```

```
Timer: Detector ran for 175.639051ms and ended at 2024-11-04T02:34:08Z
==> RESTORING
Timer: Restorer started at 2024-11-04T02:34:08Z
Restoring metadata for "google.nodejs.npm:npm_modules" from cache
Restoring data for "google.nodejs.npm:npm_modules" from cache
Timer: Restorer ran for 72.040463ms and ended at 2024-11-04T02:34:08Z
==> BUILDING
Timer: Builder started at 2024-11-04T02:34:08Z
=== Node.js - Runtime (google.nodejs.runtime@1.0.0) ===
2024/11/04 02:34:08 [DEBUG] GET https://dl.google.com/runtimes/ubuntu2204/nodejs/version.json
***** CACHE MISS: "nodejs"
Installing Node.js v20.18.0
2024/11/04 02:34:09 [DEBUG] GET https://dl.google.com/runtimes/ubuntu2204/nodejs/nodejs-20.18.0.tar.gz
***** CACHE HIT: "npm_modules"
Running "npm install --quiet (NODE_ENV=production)"
up to date, audited 67 packages in 81ms
```

4.  **Exporting:**  
    The final stage involves assembling the image layers. The default process type is set to "web," which will serve as the container's startup command.

```
Adding label 'io.buildpacks.lifecycle.metadata'
Adding label 'io.buildpacks.build.metadata'
Adding label 'io.buildpacks.project.metadata'
Setting default process type 'web'
Timer: Saving myapp... started at 2024-11-04T02:34:17Z
*** Images (cal0ad42c689):
    myapp
Timer: Saving myapp... ran for 4.676490745s and ended at 2024-11-04T02:34:21Z
Timer: Exporter ran for 9.32536734s and ended at 2024-11-04T02:34:21Z
Timer: Cache started at 2024-11-04T02:34:21Z
Reusing cache layer 'google.nodejs:npm:npm_modules'
Timer: Cache ran for 141.314376ms and ended at 2024-11-04T02:34:21Z
Successfully built image myapp
```

You can verify that the image was built successfully by running:

```
docker image ls
```

---

## Testing the Container Image

After the image is built, you can test it by creating and running a container. Since the application listens on port 8080, map it to port 8000 on your host machine:

```
docker run -d -p 8000:8080 myapp
```

To verify that the container is running, check the container list with:

```
docker ps
```

Finally, use an HTTP request to interact with the application:

```
curl localhost:8000
```

The expected output is:

```
Hello, World!
```

This confirms that the application image has been built correctly and the container is operational.

---

## Exploring Pack CLI Commands

For additional commands and options, you can run:

```
pack --help
```

This command displays options for working with builders, buildpacks, stacks, extensions, and more. One particularly useful command is `pack inspect`, which provides detailed information about the image built by the buildpacks. For example:

```
pack inspect myapp
```

The output will include details such as the base image, applied buildpacks, and defined processes:

```
Inspecting image: myapp

REMOTE:
  (not present)

LOCAL:
  Stack: google.22
  Base Image:
    Reference: dd99c47037c93572a1ada64bdd4987ff7fa9408f859518f15fa435cadf3fc5b
    Top Layer: sha256:4064dc542d5199b1bd264ea33ddae9aed13f94c087c99851ccbc21e968f4084

  Run Images:
    (none)

  Rebasable: true

  Buildpacks:
    ID                          VERSION   HOMEPAGE
    google.nodejs.runtime      1.0.0     -
    google.nodejs.npm         1.1.0     -
    google.utils.label-image    0.0.2     -

  Processes:
    TYPE    SHELL    COMMAND    ARGS      WORK DIR
    web     (default)    node      index.js  /workspace
```

This output indicates that three buildpacks were applied: Node.js Runtime, Node.js NPM, and Google’s Util Label-Image. The defined process, "web," sets the command `node index.js` within the `/workspace` directory.

> [!important]
> **Tip**
>
> Although some code blocks (such as the Node.js application code) appear multiple times in the process, they are presented only once in full to avoid redundancy.

---

## Publishing the Container Image

Finally, learn how to publish the built image to a container registry (e.g., Docker Hub). Ensure you log in first:

```
docker login
```

After logging in, build and publish the image with the appropriate naming convention and the publish flag:

```
pack build sanjeevkt720/myapp --path node --builder gcr.io/buildpacks/builder:google-22 --publish
```

If everything is set up correctly, you will see output similar to the following as the image is published:

```
***** CACHE MISS: "npm_modules"
Installing application dependencies.
---------------------------------------------------------------------
Running "npm ci --quiet --no-fund --no-audit (NODE_ENV=production)"
added 65 packages in 2s
Done "npm ci --quiet --no-fund --no-audit (NODE_ENV=production)" (2.506255138s)
=== Utils - Label Image (google.utils.label-image@0.0.2) ===
Timer: Builder ran for 6.336... and ended at 2024-11-04T08:17:36Z
=== EXPORTING
no run metadata found at path '/cn/run.toml'
Timer: Exporter started at 2024-11-04T08:17:37Z
Adding layer 'google.nodejs.runtime:node'
Adding layer 'buildpack:io.buildpacks.lifecycle:launch.sbom'
Adding 1/1 app layer(s)
Adding layer 'buildpack:io.buildpacks.lifecycle:launcher'
Adding layer 'buildpack:io.buildpacks.lifecycle:config'
Adding layer 'buildpack:io.buildpacks.lifecycle:process-types'
Adding label 'io.buildpacks.metadata'
Adding label 'io.buildpacks.project.metadata'
Setting default process type='web'
Timer: Saving sanjeevkt720/myapp... ran for 4.868953308s and ended at 2024-11-04T08:17:46Z
**** Images (sha256:02579c9bc654798be821ec5d296ae89cfa76bcd345125849a5fd7b40152):
sanjeevkt720/myapp
Timer: Cache ran for 195.424539ms
Successfully built image sanjeevkt720/myapp
```

Visit your Docker Hub repository to verify that the image has been successfully pushed.

---

## Conclusion

This lesson has demonstrated how to use the Pack CLI to create, inspect, run, and publish a cloud-native application image built from source code. With these techniques, you can experiment with buildpacks to containerize your applications efficiently.

For further reading, check out the following resources:

| Resource Type | Use Case                           | Example Command                                                                     |
| ------------- | ---------------------------------- | ----------------------------------------------------------------------------------- |
| Docker        | Manage container images            | `docker image ls`                                                                   |
| Pack CLI      | Build and inspect container images | `pack build myapp --path nodejs-app/ --builder gcr.io/buildpacks/builder:google-22` |
| Node.js       | Run JavaScript server applications | `node index.js`                                                                     |

Explore additional guides on [Kubernetes Documentation](https://kubernetes.io/docs/) and [Docker Hub](https://hub.docker.com/) for more containerization practices.

Happy building and containerizing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cloud-native-buildpacks/module/d2170747-7a07-4648-b449-958edfff954b/lesson/03874d9b-c821-4ea6-9b0f-41d913f520cf)**
>
> Watch video content
