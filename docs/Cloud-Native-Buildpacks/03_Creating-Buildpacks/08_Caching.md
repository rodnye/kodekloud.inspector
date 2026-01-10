# Caching - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cloud-Native-Buildpacks/Creating-Buildpacks/Caching)

---

## Table of Contents

- Caching
  - Caching the Node.js Layer
  - Caching the node_modules Layer
  - Watch Video

---

## Content

Cloud Native Buildpacks

Creating Buildpacks

# Caching

In this article, we explore how to implement caching within a buildpack to streamline the build process. Caching eliminates redundant work during repeated builds by storing pre-built layers, such as the Node.js runtime and application dependencies. Without caching, each build would require reinstalling Node.js and downloading all dependencies from scratch—an inefficient and time-consuming process.

![The image illustrates inefficiency in a build process, showing repeated steps of installing Node.js and dependencies across multiple buildpacks.](https://kodekloud.com/kk-media/image/upload/v1752871980/notes-assets/images/Cloud-Native-Buildpacks-Caching/inefficient-build-process-nodejs.jpg)

By implementing caching, our buildpack creates reusable layers. For example, one layer is dedicated to Node.js and another to dependencies (node_modules). These layers are stored and reused in subsequent builds, significantly reducing build times by avoiding unnecessary downloads and installations.

![The image illustrates a caching process involving buildpacks, with steps to install Node.js and dependencies. It features logos and a flowchart-like design.](https://kodekloud.com/kk-media/image/upload/v1752871981/notes-assets/images/Cloud-Native-Buildpacks-Caching/caching-process-buildpacks-nodejs-flowchart.jpg)

Below, we detail how caching is implemented for both the Node.js runtime layer and the node_modules layer.

---

## Caching the Node.js Layer

To enable caching for the Node.js layer, we modify the `project.toml` file to set the cache property to true and include additional metadata, such as the Node.js version. The script below demonstrates how the desired Node.js version is retrieved from the build plan, compares it with the cached version, and determines whether to download and extract Node.js or reuse the existing cached version:

```
# Retrieve the user’s desired Node.js version from the build plan
node_js_version=$(cat "$CNB_BP_PLAN_PATH" | .metadata.version | jq -r '.entries[] | select(.name == "node-js")')
echo "nodejs version: ${node_js_version}"


# Get the currently cached Node.js version
cached_nodejs_version=$(cat "${CNB_LAYERS_DIR}/node-js.toml" 2>/dev/null | yj -t | jq -r '.metadata.nodejs_version' 2>/dev/null || echo "NOT FOUND")
echo "cached version: ${cached_nodejs_version}"


# If the desired Node.js version differs from the cached version or the cache is missing,
# download and extract Node.js; otherwise, reuse the cached version.
if [[ "${node_js_version}" != *"${cached_nodejs_version}"* ]] || [[ ! -d "${node_js_layer}" ]]; then
    echo "---> Downloading and extracting NodeJS"
    wget -q -O "${node_js_url}" | tar -xJf - --strip-components 1 -C "${node_js_layer}"
else
    echo "---> Reusing NodeJS"
fi


# Make Node.js available during launch and mark the layer as cacheable.
cat > "${CNB_LAYERS_DIR}/node-js.toml" << EOL
[types]
build = false
launch = true
cache = true
[metadata]
nodejs_version = "${node_js_version}"
EOL
```

> [!important]
> **Note**
>
> This script first reads the user-specified Node.js version and then checks the cache for an existing version. If the versions mismatch or if the cache is absent, it downloads and extracts Node.js accordingly.

---

## Caching the node_modules Layer

Caching application dependencies is handled by comparing the hash of the `package-lock.json` file. Since this file specifies exact versions of dependencies, any change in its content indicates that the dependencies have been updated. The following script manages the caching logic for the node_modules layer:

```
# Get the hash of the current package-lock.json file
pkg_lock_hash=$(sha256sum "package-lock.json" | cut -d ' ' -f 1)
prev_hash=""


# Retrieve the cached package-lock hash if available
if [ -f "${node_modules_layer}.toml" ]; then
    prev_hash=$(cat "${node_modules_layer}.toml" | grep "package_lock_hash" || true)
fi


# Install dependencies if the cache is invalid:
# either the node_modules directory does not exist or the hashes differ.
if [ ! -d "${node_modules_layer}/node_modules" ] || [[ "${prev_hash}" != *"${pkg_lock_hash}"* ]]; then
    echo "---> Installing node modules"
    # Copy package.json and package-lock.json to the layer
    cp package*.json "${node_modules_layer}/"
    # Install dependencies in the layer
    cd "${node_modules_layer}"
    npm ci
    cd "$workdir"
else
    echo "---> Reusing node modules from cache"
fi


# Create a symbolic link to make the node_modules layer available in the working directory
ln -s "${node_modules_layer}/node_modules" "/workspace/node_modules"


# Mark the modules layer as available during build and launch, and enable caching
cat > "${node_modules_layer}.toml" << EOL
[types]
build = true
launch = true
cache = true
[metadata]
package_lock_hash = "${pkg_lock_hash}"
EOL
```

This caching process works as follows:

1.  A SHA-256 hash is generated for the current `package-lock.json`.
2.  The script checks if there is a previously cached hash.
3.  If the node_modules directory is missing or the hashes do not match (indicating updated dependencies), the script copies the `package.json` and `package-lock.json` to the layer, runs `npm ci` to install dependencies, and updates the cache.
4.  A symbolic link is created, making the node_modules layer accessible from the working directory.
5.  Finally, metadata is saved to ensure the layer remains cacheable for future builds.

> [!important]
> **Key Takeaway**
>
> Using caching not only speeds up the build process but also ensures that builds are consistent by reusing the exact versions of dependencies from previous builds.

---

Implementing caching logic with both the Node.js runtime and the node_modules layers optimizes the build process. By reusing these layers, subsequent builds can avoid unnecessary downloads, leading to improved efficiency and faster deployment times.

For more details on related topics, refer to the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cloud-native-buildpacks/module/0e306774-3067-4e23-9115-f3185d2ffa28/lesson/0b8f3100-2342-40d7-bdc6-bcb066bd47a1)**
>
> Watch video content
