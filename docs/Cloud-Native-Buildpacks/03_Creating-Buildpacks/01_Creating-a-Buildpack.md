# Creating a Buildpack - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cloud-Native-Buildpacks/Creating-Buildpacks/Creating-a-Buildpack)

---

## Table of Contents

- Creating a Buildpack
  - Overview of a JavaScript Application
  - Buildpack Files Overview
  - Detailed Look at the Detect Script
  - Detailed Look at the Build Script
  - Building the Application Image
  - Watch Video

---

## Content

Cloud Native Buildpacks

Creating Buildpacks

# Creating a Buildpack

In this lesson, you will learn how to create a custom buildpack tailored for JavaScript or Node.js applications. This buildpack activates only when it detects that the application is built with JavaScript or Node.js. Before diving into the buildpack creation process, let’s review the structure of a typical JavaScript application to ensure you have the necessary context.

## Overview of a JavaScript Application

A standard JavaScript application consists of several key components:

1.  **Entry Point (index.js):**  
    This file contains the main source code of your application. In our example, all the logic is contained in a single file, although larger projects may distribute the code across multiple files. The entry point is conventionally named `index.js` or `app.js`. To run the application, execute the following command:

    ```
    node index.js
    ```

    Below is a simple example using the Express framework:

    ```
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

2.  **Package Configuration (package.json):**  
    The `package.json` file contains essential metadata about your project, including its dependencies. For instance, when using Express and UUID, your configuration might look like this:

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

    This file not only lists the dependencies but also specifies the required Node.js version for your application.

3.  **Lock File (package-lock.json):**  
    The `package-lock.json` locks dependencies to specific versions, ensuring consistency across development, CI/CD pipelines, and production environments. The buildpack later uses this file to detect any changes in dependency versions between builds.
4.  **Dependencies Folder (node_modules):**  
    After installing dependencies (for example, using npm), the `node_modules` folder contains the installed packages. A typical JavaScript project usually includes the entry point (`index.js` or `app.js`), the package configuration (`package.json`), and the `node_modules` directory.

    ![The image illustrates the basics of a JavaScript application, showing a project directory structure with files like `index.js`, `package.json`, and a `node_modules` folder containing various modules.](https://kodekloud.com/kk-media/image/upload/v1752871983/notes-assets/images/Cloud-Native-Buildpacks-Creating-a-Buildpack/javascript-application-directory-structure.jpg)

## Buildpack Files Overview

A buildpack requires only a few fundamental files. In our example, these include:

1.  **buildpack.toml:**  
    This configuration file defines metadata for your buildpack, such as the API version, buildpack ID, version, and target platform.

    ```
    api = "0.10"


    [buildpack]
      id = "my-js-buildpack"
      version = "0.0.1"


    [[targets]]
      os = "linux"
      arch = "amd64"
    ```

2.  **Detect Script (bin/detect):**  
    This executable script determines whether the buildpack should run. For a JavaScript buildpack, it checks for the presence of a `package.json` file. If the file is missing, the script exits with a status code of 100; otherwise, it allows the build process to continue.

    ```
    #!/usr/bin/env bash
    set -eo pipefail
    if [[ ! -f package.json ]]; then
      exit 100
    fi
    ```

    > [!important]
    > **Note**
    >
    > The detect script ensures that your buildpack is executed only for JavaScript applications by checking for the existence of a `package.json` file.

3.  **Build Script (bin/build):**  
    This executable script transforms your application source code into a Docker (or OCI-compliant) image. Its tasks include setting environment variables, installing dependencies, compiling source code (if necessary), and configuring the application's entry point.

    The Pack CLI offers a shortcut to generate this boilerplate. The following command creates a directory (in this example, `js-buildpack`) containing the `buildpack.toml` file and a `bin` folder with the detect and build scripts:

    ```
    pack buildpack new my-js-buildpack --api 0.10 --path js-buildpack --version 0.0.1
    ```

    The generated `buildpack.toml` will resemble:

    ```
    api = "0.10"


    [buildpack]
      id = "my-js-buildpack"
      version = "0.0.1"


    [[targets]]
      os = "linux"
      arch = "amd64"
    ```

## Detailed Look at the Detect Script

The detect script, located within the `bin` folder, is responsible for ensuring that the buildpack is applied only to JavaScript applications. It does so by verifying the presence of the `package.json` file:

```
#!/usr/bin/env bash
set -eo pipefail
if [[ ! -f package.json ]]; then
  exit 100
fi
```

If `package.json` is found, the script exits with a zero status code, allowing the build process to proceed to the build script.

## Detailed Look at the Build Script

The build script is pivotal in transforming your application's source code into a containerized image. It performs several key operations:

1.  **Installing Node.js:**  
    The script downloads and extracts Node.js from its official distribution URL.
2.  **Installing Application Dependencies:**  
    It then uses either `npm ci` or `npm install` to install all dependencies specified in both `package.json` and `package-lock.json`.
3.  **Configuring the Application Entry Point:**  
    The script creates a `launch.toml` file in the directory defined by the `CNB_LAYERS_DIR` environment variable. This file specifies the command that will run when the container is started.

Below is the complete build script:

```
#!/usr/bin/env bash
set -eo pipefail


echo "---> Building image using my-js-buildpack buildpack"
node_js_url=https://nodejs.org/dist/v18.18.1/node-v18.18.1-linux-x64.tar.xz
wget -q -O - "$node_js_url" | tar -xJf - --strip-components 1


export PATH="./bin:$PATH"


echo "---> Installing Application Dependencies"
npm ci


cat > "${CNB_LAYERS_DIR}/launch.toml" << EOL
[[processes]]
type = "web"
command = ["bin/node", "index.js"]
default = true
EOL
```

This build script executes several critical tasks: it downloads and extracts Node.js, updates the environment PATH, installs the application dependencies using npm, and generates a launch configuration (`launch.toml`) that sets the default process for running your application.

![The image illustrates a build process using a buildpack, showing the transformation from source code to a Docker image, with steps to install Node.js, application dependencies, and configure the application entry point.](https://kodekloud.com/kk-media/image/upload/v1752871984/notes-assets/images/Cloud-Native-Buildpacks-Creating-a-Buildpack/buildpack-docker-image-process.jpg)

## Building the Application Image

With the detect and build scripts in place, you can now create your application image using the following command:

```
pack build myapp --path ./nodejs/ --buildpack ./js-buildpack/ --builder cnbs/sample-builder:jamm
```

In this command:

- `myapp` represents the name of the generated image.
- `--path ./nodejs/` specifies the directory containing your application’s source code.
- `--buildpack ./js-buildpack/` points to the folder containing your custom buildpack.
- `--builder cnbs/sample-builder:jamm` indicates which builder to use (note that the builder will override its default buildpacks with the buildpack you specified).

After executing this command, the buildpack will detect your JavaScript application, download and install Node.js along with the required dependencies, and configure the startup process as defined in the `launch.toml` file.

> [!important]
> **Summary**
>
> This guide walks you through creating a custom JavaScript/Node.js buildpack, from understanding a typical application structure to crafting both the detect and build scripts, culminating in successfully building a containerized image.

Enjoy building your applications with your custom buildpack!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cloud-native-buildpacks/module/0e306774-3067-4e23-9115-f3185d2ffa28/lesson/5a80f5e8-1bef-4853-9c36-8b3ad7baebc6)**
>
> Watch video content
