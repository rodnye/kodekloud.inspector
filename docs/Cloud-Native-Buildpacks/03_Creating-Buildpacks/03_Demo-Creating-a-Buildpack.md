# Demo Creating a Buildpack - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cloud-Native-Buildpacks/Creating-Buildpacks/Demo-Creating-a-Buildpack)

---

## Table of Contents

- Demo Creating a Buildpack
  - Creating the Buildpack
  - Understanding the Detect Script
  - The Default Build Script
  - Building the Image with the Custom Buildpack
  - Running and Debugging the Container
  - Process Overview
  - Conclusion
  - Watch Video
    - Updating the Build Script for Node.js

---

## Content

Cloud Native Buildpacks

Creating Buildpacks

# Demo Creating a Buildpack

In this guide, you will learn how to create a custom Node.js buildpack using the Pack CLI. We'll generate the starter boilerplate, update the detection logic to target Node.js projects, and enhance the build process to install Node.js and application dependencies. This article covers each step in detail to help you convert your source code into a container image with best practices.

## Creating the Buildpack

To get started, use the Pack CLI to create a new buildpack. In this example, the buildpack is named "my-js-buildpack", uses API version 0.10, and is stored in a folder called `js-buildpack` with an initial version of 0.0.1:

```
pack buildpack new my-js-buildpack --api 0.10 --path js-buildpack --version 0.0.1
```

After running this command, you should see output similar to:

```
create  buildpack.toml
create  bin/build
create  bin/detect
Successfully created my-js-buildpack
```

If you inspect the `js-buildpack` folder, you'll notice a `buildpack.toml` file containing metadata similar to:

```
api = "0.10"


[buildpack]
  id = "my-js-buildpack"
  version = "0.0.1"


[[targets]]
  os = "linux"
  arch = "amd64"
```

The `bin` directory hosts two scripts: `detect` and `build`. The `detect` script determines if the buildpack applies to the application, while the `build` script handles the build logic.

## Understanding the Detect Script

The default `detect` script is as follows:

```
#!/usr/bin/env bash


set -euo pipefail


layers_dir="$1"
env_dir="$2/env"
plan_path="$3"


exit 0
```

If the `detect` script exits with a status code of 0, the build process continues to the build stage. To control whether your buildpack should be activated, you can conditionally exit with a nonzero status code. For example, to explicitly fail detection, you might modify the script to:

```
#!/usr/bin/env bash
set -eo pipefail


echo "detecting if my-js-buildpack should run"
exit 1
```

Exiting with status code 1 signals the builder that this buildpack should not be used. Since our buildpack is intended for Node.js applications, updating the detection logic to check for a `package.json` file makes it more robust:

```
#!/usr/bin/env bash
set -eo pipefail


echo "detecting if my-js-buildpack should run"
if [[ ! -f package.json ]]; then
  exit 100
fi


exit 0
```

This change ensures that if the `package.json` file is absent, the buildpack exits with code 100, indicating that it does not apply.

## The Default Build Script

The default `build` script is minimal and only exits successfully:

```
#!/usr/bin/env bash


set -eu pipefail


layers_dir="$1"
env_dir="$2/env"
plan_path="$3"


exit 0
```

For a Node.js application, the build process should perform the following tasks:

1.  Download and install Node.js.
2.  Install application dependencies using an `npm` command.
3.  Create a `launch.toml` file (in the CNB layers directory) specifying the start command for the application.

### Updating the Build Script for Node.js

Enhance your `bin/build` script to download and install Node.js version 18.18.1, update the PATH during the build, install dependencies, and create a `launch.toml` file. Below is the updated script:

```
#!/usr/bin/env bash
set -euo pipefail


echo "Building image using my-js-buildpack buildpack"


echo "---> Downloading and extracting NodeJS"
node_js_url="https://nodejs.org/dist/v18.18.1/node-v18.18.1-linux-x64.tar.xz"
wget -q -O - "${node_js_url}" | tar -xJf - --strip-components 1


# Update PATH during build-time so that npm and node are locatable.
export PATH="./bin:$PATH"


pwd
ls -la


echo "---> Installing Application Dependencies"
npm ci


echo "CNB_LAYERS_DIR: ${CNB_LAYERS_DIR}"


# Write the launch.toml to define the startup process for the container.
cat > "${CNB_LAYERS_DIR}/launch.toml" << EOL
[[processes]]
type = "web"
command = ["bin/node", "index.js"]
default = true
EOL
```

> [!important]
> **Note**
>
> When running build commands, environment variable changes (like modifications to PATH) only persist during the build process. At runtime, these changes do not apply. Hence, we reference the full path (`bin/node`) in the launch command.

With these modifications, the build script will:

- Download and extract Node.js into the current working directory.
- Update the PATH so that Node.js and npm are accessible during the build.
- Install application dependencies using `npm ci`.
- Generate a `launch.toml` file that defines a web process with the command `bin/node index.js`.

## Building the Image with the Custom Buildpack

With the updated detect and build scripts, you can now build the container image using your custom buildpack. For example, run:

```
pack build myapp --path nodejs-app/ --builder cnbs/sample-builder:jammy --buildpack js-buildpack/
```

During the build process, you should see output similar to:

```
==> ANALYZING
[analyzer] Image with name "myapp" not found
==> DETECTING
[detector] my-js-buildpack 0.0.1
[detector] detecting if my-js-buildpack should run
==> BUILDING
[builder] Building image using my-js-buildpack buildpack
[builder] ---> Downloading and extracting NodeJS
[builder] (Directory listing of /workspace ...)
[builder] ---> Installing Application Dependencies
...
[exporter] Setting default process type 'web'
[exporter] Saving myapp...
Successfully built image myapp
```

At this point, your image is successfully created. The generated `launch.toml` file instructs the lifecycle to execute `bin/node index.js` when the container starts.

## Running and Debugging the Container

To run your new image, you can use the following Docker command:

```
docker run -d -p 8000:8080 myapp
```

If you encounter issues such as the container stopping unexpectedly, list all containers with:

```
docker ps -a
```

You might see an error in the logs similar to:

```
ERROR: failed to launch: path lookup: exec: "node": executable file not found in $PATH
```

This error indicates that the runtime environment cannot locate Node.js because PATH changes during the build process are not propagated. The solution is to reference the full executable path (i.e., using `"bin/node"` in the launch command).

Once the container is running with the correct launch command, test the application with:

```
curl localhost:8000
```

If configured correctly, you should receive:

```
Hello, World!
```

## Process Overview

Below is a summary table of actions performed by the buildpack:

| Step                           | Action                                            | Command/Result                                               |
| ------------------------------ | ------------------------------------------------- | ------------------------------------------------------------ |
| Generate Buildpack Boilerplate | Create a new buildpack with Pack CLI              | `pack buildpack new my-js-buildpack --...`                   |
| Enhance Detect Script          | Check for `package.json` to continue detection    | Exit with code 100 if missing                                |
| Update Build Script            | Download Node.js, install dependencies, and setup | Create `launch.toml` with `bin/node index.js`                |
| Build Image                    | Build an image using the custom buildpack         | `pack build myapp --...`                                     |
| Run Container                  | Start the container and test application          | `docker run -d -p 8000:8080 myapp` and `curl localhost:8000` |

## Conclusion

In this article, you learned how to create a custom Node.js buildpack that transforms source code into a runnable container image. We started by generating the buildpack boilerplate, modified the detect script to verify the presence of `package.json`, and enhanced the build script to:

• Download and extract Node.js  
• Install application dependencies via `npm ci`  
• Generate a `launch.toml` that specifies the startup process

While this example buildpack provides a basic setup, it can be extended and optimized further to adhere to advanced best practices. Future articles will delve into additional optimizations and buildpack features.

For more details on containerizing Node.js applications, check out the [official Node.js documentation](https://nodejs.org/en/docs/) and [Cloud Native Buildpacks documentation](https://buildpacks.io/docs/).

Happy building!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cloud-native-buildpacks/module/0e306774-3067-4e23-9115-f3185d2ffa28/lesson/892e7d65-bc34-49a6-ac37-54e854f3e5bb)**
>
> Watch video content
