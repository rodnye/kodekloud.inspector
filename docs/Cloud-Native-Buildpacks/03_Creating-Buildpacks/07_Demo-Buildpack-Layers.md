# Demo Buildpack Layers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cloud-Native-Buildpacks/Creating-Buildpacks/Demo-Buildpack-Layers)

---

## Table of Contents

- Demo Buildpack Layers
  - Creating the Node.js Runtime Layer
  - Installing Application Dependencies in a Separate Node Modules Layer
  - Resolving the Node.js Executable Path
  - Final Build and Verification
  - Watch Video

---

## Content

Cloud Native Buildpacks

Creating Buildpacks

# Demo Buildpack Layers

In this guide, we demonstrate how to separate the Node.js runtime and Node modules installation into dedicated layers. Separating these components not only clarifies the build process but also leverages caching and boosts launch performance.

Below is a comprehensive step-by-step walkthrough with clearly structured code blocks.

---

## Creating the Node.js Runtime Layer

In this section, we create a dedicated layer for the Node.js runtime. Here, we download and extract Node.js into a specified directory. The runtime layer’s metadata is configured in a TOML file to ensure it is available at launch.

```
#!/usr/bin/env bash
set -euo pipefail


echo "Building image using my-js-buildpack buildpack"


# Create the Node.js runtime layer directory
node_js_layer="${CNB_LAYERS_DIR}/node-js"
mkdir -p "${node_js_layer}"


default_node_js_version="18.18.0"


# Retrieve the user's desired Node.js version from the plan or use the default
node_js_version=$(jq -r '.entries[] | select(.name == "node-js") | .metadata.version' < "$CNB_BP_PLAN_PATH" || echo "${default_node_js_version}")
echo "nodejs version: ${node_js_version}"


echo "--> Downloading and extracting NodeJS"
node_js_url="https://nodejs.org/dist/v${node_js_version}/node-v${node_js_version}-linux-x64.tar.xz"
wget -q -O - "${node_js_url}" | tar -xJf - --strip-components=1 -C "${node_js_layer}"


# Create the TOML file for Node.js layer metadata
cat > "${CNB_LAYERS_DIR}/node-js.toml" << EOL
[types]
build = false
launch = true
cache = false
EOL
```

After executing these steps, the Node.js runtime is installed into the custom layer defined by the `node_js_layer` variable. To ensure that this runtime is available for subsequent build steps and the final image, update the PATH to include the Node.js binary directory:

```
export PATH="${node_js_layer}/bin:$PATH"
```

You can verify the installation with the following commands:

```
pwd
ls -la
```

---

## Installing Application Dependencies in a Separate Node Modules Layer

Next, we focus on installing your application’s dependencies in a distinct layer. This separation allows you to cache Node modules separately, improving build times and resource utilization. Since dependency installation normally occurs in the current directory, we copy the package files into a new directory, install the dependencies there with `npm ci`, and then create a symbolic link back to the workspace.

First, capture the current working directory to reference later:

```
workdir=$(pwd)
```

Now, create the layer for your Node modules, install dependencies, and configure the launch process:

```
# Create layer for the node modules
node_modules_layer="${CNB_LAYERS_DIR}/node-dependencies"
mkdir -p "${node_modules_layer}"


echo "---> Installing Application Dependencies"
# Copy package files to the node_modules layer and install dependencies there
cp package*.json "${node_modules_layer}"
cd "${node_modules_layer}"
npm ci
cd "$workdir"


# Create launch configuration for the final runtime image
cat > "${CNB_LAYERS_DIR}/launch.toml" << EOL
[[processes]]
type = "web"
command = ["node", "index.js"]
default = true
EOL


# Symlink the installed node_modules back into the workspace to satisfy the application structure
ln -s "${node_modules_layer}/node_modules" "/workspace/node_modules"
```

This setup ensures that your dependencies reside in their own layer while keeping your application code in the workspace. The symbolic link enables Node.js to locate the `node_modules` folder during runtime.

---

## Resolving the Node.js Executable Path

During preliminary testing, you might encounter an error similar to:

```
npm: command not found
```

> [!important]
> **Note**
>
> This error occurs because Node.js is installed in a separate layer, and the PATH variable has not been updated to include the binary location.

To resolve this issue:

1.  First, add the Node.js runtime layer (and its `bin` folder) to your PATH:

    ```
    export PATH="${node_js_layer}/bin:$PATH"
    ```

2.  Ensure the launch process is correctly configured. In the final launch TOML, reference the proper command as shown below:

    ```
    cat > "${CNB_LAYERS_DIR}/launch.toml" << EOL
    [[processes]]
    type = "web"
    command = ["node", "index.js"]
    default = true
    EOL
    ```

The runtime image builder automatically includes the Node.js layer in the PATH so that both `node` and `npm` are recognized.

---

## Final Build and Verification

After configuring both layers, you are ready to build the image. During the export stage, you should see that both the Node.js runtime layer and the node modules layer have been added:

```
[exporter] Adding layer 'my-js-buildpack:node-dependencies'
[exporter] Adding layer 'my-js-buildpack:node-js'
[exporter] Saving myapp...
```

To build the image with the appropriate buildpacks, use the following command:

```
pack build myapp --path nodejs-app --builder cnbs/sample-builder:jammy --buildpack js-buildpack/
```

Once the image is successfully built, run a container and verify that the application functions as expected. For example, you can use a command like the one below to check for a “Hello World” response:

```
curl localhost:8000
```

---

By following these steps, you have successfully separated the Node.js runtime and Node modules into individual layers. This modular approach optimizes caching and ensures that your final runtime image includes only the necessary components, enhancing both build performance and deployability.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cloud-native-buildpacks/module/0e306774-3067-4e23-9115-f3185d2ffa28/lesson/96ae0edd-0c81-456b-8950-f57d47e1ee98)**
>
> Watch video content
