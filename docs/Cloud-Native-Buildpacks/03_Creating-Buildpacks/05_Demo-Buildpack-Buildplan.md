# Demo Buildpack Buildplan - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cloud-Native-Buildpacks/Creating-Buildpacks/Demo-Buildpack-Buildplan)

---

## Table of Contents

- Demo Buildpack Buildplan
  - Updating the Detect Script
  - Updating the Build Script
  - Dynamically Constructing the Node.js Download URL
  - Verifying the Buildpack with package.json
  - Additional Resources
  - Watch Video

---

## Content

Cloud Native Buildpacks

Creating Buildpacks

# Demo Buildpack Buildplan

In this article, we demonstrate how to update your detect and build scripts to dynamically set the Node.js version specified by the user in the package.json file. The package.json file includes an "engines" section where you can declare the required Node.js version. In our example, the package.json file specifies Node.js version 18.18.0.

---

## Updating the Detect Script

The detect script now sets a default Node.js version and then attempts to extract the user-specified version from the package.json file by reading the "engines.node" property. Finally, it writes the appropriate "provides" and "requires" fields to the buildpack build plan, which the build script uses later to download and install the correct Node.js version.

```
if [[ -f package.json ]]; then
  # default version
  version=18.18.1
  # Determine Node.js version from package.json using jq
  version=$(jq -r '.engines.node' "./package.json")
  # echo "version: ${version}"

  cat > "${CNB_BUILD_PLAN_PATH}" << EOL
provides = [{ name = "node-js" }]
requires = [{ name = "node-js", metadata = { version = "${version}" } }]
EOL
fi
```

> [!important]
> **Tip**
>
> Ensure that your package.json file contains the "engines" section with the correct Node.js version.

To test the container state, run:

```
docker ps
```

Expected output for `docker ps`:

```
CONTAINER ID   IMAGE   COMMAND               CREATED         STATUS         PORTS                    NAMES
28f480564d5e   myapp   "/cnb/process/web"   2 seconds ago   Up 2 seconds   0.0.0.0:8000->8080/tcp, [::]:8000->8080/tcp   eager
```

Verify the application response with:

```
curl localhost:8000
```

Output:

```
Hello, World!
```

---

## Updating the Build Script

Previously, the build script hardcoded Node.js version 18.18.1. In the updated script, a default Node.js version (18.18.0) is defined, and the desired version is later retrieved from the build plan. This retrieved version is then used to dynamically construct the download URL for the appropriate Node.js tarball.

Below is the revised build script:

```
#!/usr/bin/env bash
set -euo pipefail

echo "Building image using my-js-buildpack buildpack"

default_node_js_version="18.18.0"

echo "--> Downloading and extracting NodeJS"
node_js_url=https://nodejs.org/dist/v18.18.1/node-v18.18.1-linux-x64.tar.xz
wget -q -O - "${node_js_url}" | tar -xJf - --strip-components 1

export PATH="./bin:$PATH"
pwd
ls -la

echo "--> Installing Application Dependencies"
```

After building, you can check the container status with:

```
docker ps
```

Expected output:

```
CONTAINER ID   IMAGE     COMMAND                CREATED         STATUS         PORTS                      NAMES
28f480564d5e   myapp     "/cnb/process/web"     2 seconds ago   Up 2 seconds   0.0.0.0:8000->8080/tcp, [::]:8000->8080/tcp   eager
```

And confirm the application response again:

```
curl localhost:8000
```

Output:

```
Hello, World!
```

---

## Dynamically Constructing the Node.js Download URL

The build script is now updated to dynamically include the user-specified Node.js version. After retrieving the version from the build plan, the script prints the version for verification and constructs the download URL based on that version. The snippet below shows the modified section:

```
echo "nodejs version: ${node_js_version}"

echo "--> Downloading and extracting NodeJS"
node_js_url=https://nodejs.org/dist/v${node_js_version}/node-v${node_js_version}-linux-x64.tar.xz
wget -q -O - "${node_js_url}" | tar -xJf - --strip-components 1

export PATH="./bin:$PATH"
pwd
ls -la

echo "--> Installing Application Dependencies"
npm ci

echo "CNB_LAYERS_DIR: ${CNB_LAYERS_DIR}"
cat "${CNB_LAYERS_DIR}/launch.toml" << EOL
[[processes]]
type = "web"
EOL
```

Run the container check again with:

```
docker ps
```

Expected output:

```
CONTAINER ID   IMAGE   COMMAND                  CREATED         STATUS          PORTS                     NAMES
28f480564d5e   myapp   "/cnb/process/web"      2 seconds ago   Up 2 seconds    0.0.0.0:8000->8080/tcp   eager
```

Verify the endpoint:

```
curl localhost:8000
```

Output:

```
Hello, World!
```

> [!important]
> **Important**
>
> Remember to delete the old container and rebuild the image to ensure the changes take effect.

---

## Verifying the Buildpack with package.json

Once again, note that the version requested (as printed in the logs) is 18.18.0. The updated package.json looks like this:

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
    "node": "18.18.0"
  },
  "dependencies": {
    "express": "^4.21.1",
    "uuid": "^11.0.2"
  }
}
```

The console output during the build might resemble:

```
[analyzer]  Restoring data for SBOM from previous image
==> DETECTING
[detector]  my-js-buildpack 0.0.1
==> RESTORING
[builder]   Building image using my-js-buildpack buildpack
[builder]   nodejs version: 18.18.0
==> Downloading and extracting NodeJS
[builder]   workspace
Total 812
[builder]   drwxr-xr-x 1 root root  4096 Nov  4 04:42 ..
```

After confirming this output, delete the old container and rebuild the image. The build output will then verify that the correct Node.js version is used.

To test the dynamic version retrieval, update the package.json "engines.node" value to 18.18.1 and rebuild the image. The build logs should now indicate that Node.js version 18.18.1 is installed:

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
    "node": "18.18.1"
  },
  "dependencies": {
    "express": "^4.21.1",
    "uuid": "^11.0.2"
  }
}
```

Console output for the new build may include:

```
[exporter] Reusing layer 'buildpacksio/lifecycle:process-types'
[exporter] Adding label 'io.buildpacks.lifecycle.metadata'
[exporter] Adding label 'io.buildpacks.build.metadata'
[exporter] Setting default process type 'web'
[exporter] Saving myapp...
[exporter] *** Images (5d6facb4612d):
myapp
Successfully built image myapp
```

And later:

```
[exporter] Reusing layer 'buildpacksio/lifecycle:process-types'
[exporter] Adding label 'io.buildpacks.lifecycle.metadata'
[exporter] Adding label 'io.buildpacks.build.metadata'
[exporter] Adding label 'io.buildpacks.project.metadata'
[exporter] Setting default process type 'web'
[exporter] Saving myapp...
[exporter] *** Images (56dfacb4612d):
[exporter]   myapp
Successfully built image myapp
root in ubuntu-s-4vcpu-8gb-nyc1-01 in ~/buildpack-demo took 20s
```

This confirms that the buildpack now successfully supports dynamic Node.js version selection based on the user's specification in package.json.

Happy building!

---

## Additional Resources

| Resource Type | Use Case             | Example                                                |
| ------------- | -------------------- | ------------------------------------------------------ |
| Buildpack     | Custom build process | [Buildpack Documentation](https://buildpacks.io/docs/) |
| Docker        | Container management | [Docker Documentation](https://docs.docker.com/)       |
| Node.js       | JavaScript runtime   | [Node.js Downloads](https://nodejs.org/en/download/)   |

For further details, visit the following helpful resources:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cloud-native-buildpacks/module/0e306774-3067-4e23-9115-f3185d2ffa28/lesson/b42dfa02-3405-4796-a351-1bb55e2a9cdc)**
>
> Watch video content
