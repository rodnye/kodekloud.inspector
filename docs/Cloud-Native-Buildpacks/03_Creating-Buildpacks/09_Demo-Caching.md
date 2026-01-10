# Demo Caching - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cloud-Native-Buildpacks/Creating-Buildpacks/Demo-Caching)

---

## Table of Contents

- Demo Caching
  - Caching the Node.js Layer
  - Caching the node_modules Layer
  - Testing the Caching Logic
  - Watch Video
    - How the Node.js Layer Caching Works
    - How the node_modules Layer Caching Works

---

## Content

Cloud Native Buildpacks

Creating Buildpacks

# Demo Caching

In this guide, we demonstrate how to implement an effective caching strategy in your buildpack. The caching configuration focuses on two distinct layers: the Node.js runtime layer and the node_modules layer. Additionally, metadata is applied to guarantee that the cache is reused only when the Node.js version and package dependencies align with your configuration.

---

## Caching the Node.js Layer

For the Node.js runtime layer, the installed Node.js version is cached to accelerate subsequent builds that request the same version. When the buildpack runs, it compares the desired Node.js version (specified in the build configuration) with the version available in the cache. If they differ or if the layer is absent, the runtime is downloaded and set up accordingly.

Below is the refined script for caching the Node.js layer:

```
#!/bin/bash
set -euo pipefail

# Define the Node.js layer directory within the CNB layers directory
node_js_layer="${CNB_LAYERS_DIR}/node-js"
mkdir -p "${node_js_layer}"

default_node_js_version="18.18.0"

# Retrieve the desired Node.js version from the build plan or use the default version.
node_js_version=$(cat "${CNB_BP_PLAN_PATH}" | yj -t | jq -r '.entries[] | select(.name == "node-js") | .metadata.version' || echo "${default_node_js_version}")
echo "Node.js version specified: ${node_js_version}"

# Establish the download URL based on the desired Node.js version.
node_js_url="https://nodejs.org/dist/v${node_js_version}/node-v${node_js_version}-linux-x64.tar.xz"

# Retrieve the cached Node.js version from the layer metadata (if it exists).
cached_nodejs_version=$(cat "${CNB_LAYERS_DIR}/node-js.toml" 2>/dev/null | yj -t | jq -r .metadata.nodejs_version 2>/dev/null || echo 'NOT FOUND')
echo "Cached Node.js version: ${cached_nodejs_version}"

# ,[object Object],
if [[ "${node_js_version}" != "${cached_nodejs_version}" ]] || [[ ! -d "${node_js_layer}" ]]; then
    echo "-----> Downloading and extracting Node.js"
    wget -q -O - "${node_js_url}" | tar -xJf - --strip-components 1 -C "${node_js_layer}"
else
    echo "-----> Reusing Node.js from cache"
fi

# Write layer metadata to indicate that Node.js is available for launch and caching, recording the version.
cat > "${CNB_LAYERS_DIR}/node-js.toml" << EOL
[types]
build = false
launch = true
cache = true
[metadata]
nodejs_version = "${node_js_version}"
EOL

# Update the PATH to include the node-js layer binaries.
export PATH="${node_js_layer}/bin:$PATH"
pwd
```

### How the Node.js Layer Caching Works

1.  **Directory Preparation and Version Detection:**  
    The script creates the runtime layer directory and determines the desired Node.js version from the build plan, defaulting to version 18.18.0 if not specified.
2.  **URL Construction and Cache Verification:**  
    It sets up the download URL for the specified version and compares it with the cached version stored in the metadata file. If there is a mismatch or the layer is absent, Node.js is downloaded and extracted.
3.  **Metadata Update:**  
    The script updates the layer metadata (`node-js.toml`), ensuring that the build engine knows that Node.js is available for both launch and caching, and finally updates the PATH.

---

## Caching the node_modules Layer

Caching the node_modules layer is accomplished using a hash of the `package-lock.json` file. This hash-based approach guarantees that if dependencies have not changed, your cached node_modules directory can be efficiently reused.

Below is the enhanced script for the node_modules layer caching:

```
#!/bin/bash
set -euo pipefail

# Calculate the SHA-256 hash of package-lock.json to detect changes in dependencies.
pkg_lock_hash=$(sha256sum "package-lock.json" | cut -d ' ' -f 1)

workdir=$(pwd)
# Define the node_modules layer directory.
node_modules_layer="${CNB_LAYERS_DIR}/node-dependencies"
mkdir -p "${node_modules_layer}"

# Retrieve the previously cached package-lock.json hash (if available).
prev_hash=$(cat "${node_modules_layer}.toml" 2>/dev/null | yj -t | jq -r .metadata.package_lock_hash 2>/dev/null || echo "NOT_FOUND")
echo "Current package-lock hash: ${pkg_lock_hash}"
echo "Previously cached hash: ${prev_hash}"

# ,[object Object],
if [ ! -d "${node_modules_layer}/node_modules" ] || [[ "${prev_hash}" != "${pkg_lock_hash}" ]]; then
    echo "---> Installing node modules"
    cp package*.json "${node_modules_layer}"
    cd "${node_modules_layer}"
    npm ci
    cd "$workdir"
else
    echo "---> Reusing node modules from cache"
fi

# Create a symlink in the workspace so that node_modules is directly accessible.
ln -sf "${node_modules_layer}/node_modules" "/workspace/node_modules"

# Write the current package-lock hash into the layer metadata.
cat > "${node_modules_layer}.toml" << EOL
[types]
build = false
launch = true
cache = true
[metadata]
package_lock_hash = "${pkg_lock_hash}"
EOL

# Write the launch configuration.
cat > "${CNB_LAYERS_DIR}/launch.toml" << EOL
[processes]
type = "web"
command = ["node", "index.js"]
default = true
EOL

echo "CNB_LAYERS_DIR: ${CNB_LAYERS_DIR}"
```

### How the node_modules Layer Caching Works

1.  **Dependency Change Detection:**  
    The script computes a SHA-256 hash for the `package-lock.json` file and compares it to the previous hash. This hash determines if dependencies have changed.
2.  **Conditional Installation:**  
    If the `node_modules` folder does not exist or if the dependency hash differs, the necessary package configuration files are copied, and `npm ci` is executed to install the dependencies. Otherwise, the cache is reused.
3.  **Workspace Integration and Metadata Update:**  
    A symlink is created to make the cached node_modules folder accessible from the workspace. Finally, updated metadata (including the package-lock hash) is written to ensure proper caching and launch behavior.

---

## Testing the Caching Logic

After implementing the caching logic, you can build and run your application using the buildpack. Follow these steps:

1.  **Build and Run the Application:**

    ```
    docker run -d -p 8000:8080 myapp
    curl localhost:8000
    # Expected output:
    # Hello, World!
    ```

2.  **Trigger a Build with Pack:**

    Remove any existing container and build your application with the sample builder and buildpack:

    ```
    docker rm -f <container_id>
    pack build myapp --path nodejs-app/ --builder cnbs/sample-builder:jammy --buildpack js-buildpack/
    ```

    During the build process, you might see logs such as:
    - If the cached Node.js version matches the desired version:

      ```
      [builder] Node.js version specified: 18.18.0
      [builder] Cached Node.js version: 18.18.0
      [builder] -----> Reusing Node.js from cache
      [builder] -----> Reusing node modules from cache
      ```

    - If the desired Node.js version changes (e.g., from 18.18.0 to 18.18.1):

      ```
      [builder] Node.js version specified: 18.18.1
      [builder] Cached Node.js version: 18.18.0
      [builder] -----> Downloading and extracting Node.js
      [builder] -----> Reusing node modules from cache
      ```

3.  **Handling Dependency Changes:**

    When modifications are made to the dependencies (reflected by changes in `package-lock.json`), the build logs will indicate:

    ```
    [builder] -----> Installing node modules
    ```

    This confirms that the cache is being invalidated and refreshed as needed.

---

By comparing the desired state with the cached state—using both the Node.js version and the dependency hash—this caching mechanism optimizes build times and maintains consistency across builds.

For further reading, check out these resources:

- [Node.js Official Downloads](https://nodejs.org/en/download/)
- [npm Documentation](https://docs.npmjs.com/)
- [Cloud Native Buildpacks](https://buildpacks.io/)

> [!important]
> **Pro Tip**
>
> If you encounter any cache-related issues during your build process, double-check the metadata stored in the TOML files to confirm that the intended versions and hashes are correctly recorded.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cloud-native-buildpacks/module/0e306774-3067-4e23-9115-f3185d2ffa28/lesson/9556709f-b988-4eaa-aded-13397536c16d)**
>
> Watch video content
