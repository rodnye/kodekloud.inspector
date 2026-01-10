# Buildpack Buildplan - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cloud-Native-Buildpacks/Creating-Buildpacks/Buildpack-Buildplan)

---

## Table of Contents

- Buildpack Buildplan
  - Detect Script
  - Build Script
  - Watch Video

---

## Content

Cloud Native Buildpacks

Creating Buildpacks

# Buildpack Buildplan

In this lesson, you'll learn how buildpack build plans dynamically select the appropriate Node.js version based on your application's needs. By using build plans, our buildpack can support multiple Node.js versions without hardcoding a specific version in the build script.

Consider the following build script snippet used in our buildpack:

```
#!/usr/bin/env bash
set -euo pipefail


echo "Building image using my-js-buildpack buildpack"


echo "---> Downloading and extracting NodeJS"
node_js_url=https://nodejs.org/dist/v18.18.1/node-v18.18.1-linux-x64.tar.xz
wget -q -O "${node_js_url}" | tar -xJf - --strip-components 1
```

In this script, the Node.js version (18.18.1) is hardcoded. This approach limits flexibility because different teams might require different Node.js versions (e.g., version 18, 20, etc.). Instead, our buildpack is designed to read the version specified by the developer and then download the corresponding Node.js runtime.

A common convention is to specify the required Node.js version in the "engines" section of the package.json file, as shown below:

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

In this example, the developer indicates that the application requires Node.js version 23.1.0. The buildpack is modified to enable a separation of concerns by having the detect script extract the desired Node.js version. This version information is then passed to the build script through a build plan file.

The build plan file is stored in the environment variable CNB_BUILD_PLAN_PATH and contains two critical sections:

- **provides:** Informs the subsequent build phase that a Node.js runtime is available.
- **requires:** Passes metadata (such as the desired Node.js version) from the detect phase to the build phase.

For example, a build plan file might look like this:

```
provides = [{ name = "node-js" }]
requires = [{ name = "node-js", metadata = { version = "18.18.0" } }]
```

> [!important]
> **Key Concept**
>
> Using build plans to communicate metadata between the detect and build phases allows for flexible and scalable configurations. This approach supports advanced scenarios such as decoupling the Node.js installation from dependency management tasks.

The following sections describe the implementation details for the detect and build scripts.

## Detect Script

The detect script checks if the application is JavaScript-based, extracts the desired Node.js version from package.json, and then creates the build plan file with that information. Below is the improved version of the detect script:

```
#!/usr/bin/env bash
set -eo pipefail


if [[ ! -f package.json ]]; then
  exit 100
fi


# Set a default version in case none is specified
default_version="18.18.1"


# Determine the Node.js version from package.json; if not available, use the default version
version=$(jq -r '.engines.node // empty' "./package.json")
version=${version:-$default_version}


# Write the build plan file using the CNB_BUILD_PLAN_PATH environment variable
cat > "${CNB_BUILD_PLAN_PATH}" << EOL
provides = [{ name = "node-js" }]
requires = [{ name = "node-js", metadata = { version = "$version" } }]
EOL
```

This script first verifies the existence of the package.json file. It then sets a default Node.js version (18.18.1) and uses the `jq` tool to extract the version from the "engines" section. If no version is found, the script falls back to the default version. Finally, it writes the build plan file with both "provides" and "requires" sections.

## Build Script

The build script leverages the information written by the detect script to download and install the correct version of Node.js. Here is the improved build script:

```
#!/usr/bin/env bash
set -euo pipefail


echo "Building image using my-js-buildpack buildpack"


default_node_js_version="18.18.0"


# Retrieve the user's desired Node.js version from the build plan file.
# The build plan file is accessed via the CNB_BUILD_PLAN_PATH environment variable.
node_js_version=$(cat "$CNB_BUILD_PLAN_PATH" | yj -t | jq -r '.entries[] | select(.name == "node-js") | .metadata.version' || echo "${default_node_js_version}")
echo "Node.js version: ${node_js_version}"


node_js_url="https://nodejs.org/dist/v${node_js_version}/node-v${node_js_version}-linux-x64.tar.xz"
echo "---> Downloading and extracting NodeJS"
wget -q -O - "$node_js_url" | tar -xJf - --strip-components 1
```

In this script, a default Node.js version is defined, and then the build plan file (pointed to by CNB_BUILD_PLAN_PATH) is read to extract the desired version using the tools `yj` (a YAML/JSON converter) and `jq`. Once the desired version is determined, the script dynamically constructs the URL for the corresponding Node.js archive, downloads, and extracts it.

> [!important]
> **Summary**
>
> By using build plans to transfer version metadata from the detect script to the build script, the buildpack gains flexibility and scalability. This design enables multiple teams to seamlessly specify different Node.js versions without needing to modify hardcoded values in the build script.

This concludes our lesson on using buildpack build plans to dynamically configure runtime versions for Node.js applications.

---

For more details on buildpacks and deploying applications, check out:

- [Cloud Native Buildpacks](https://buildpacks.io/)
- [Node.js Official Downloads](https://nodejs.org/en/download/)
- [Using jq for JSON Processing](https://stedolan.github.io/jq/manual/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cloud-native-buildpacks/module/0e306774-3067-4e23-9115-f3185d2ffa28/lesson/9f36cce8-caee-49cb-bcc6-ace554fa2331)**
>
> Watch video content
