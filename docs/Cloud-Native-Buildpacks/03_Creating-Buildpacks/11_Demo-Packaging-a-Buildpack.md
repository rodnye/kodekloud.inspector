# Demo Packaging a Buildpack - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cloud-Native-Buildpacks/Creating-Buildpacks/Demo-Packaging-a-Buildpack)

---

## Table of Contents

- Demo Packaging a Buildpack
  - Step 1: Create the package.toml File
  - Step 2: Package the Buildpack
  - Step 3: Verify the Packaged Image
  - Step 4: Tag and Distribute the Buildpack Image
  - Watch Video

---

## Content

Cloud Native Buildpacks

Creating Buildpacks

# Demo Packaging a Buildpack

In this lesson, you will learn how to package your buildpack. The process starts by creating a configuration file named package.toml in the root directory of your project. This configuration file instructs the pack tool on where to locate your buildpack code.

## Step 1: Create the package.toml File

Begin by creating a file called package.toml in your project's root directory with the following content:

```
[buildpack]
uri = "js-buildpack"
```

This configuration tells the pack tool that your buildpack resides in the folder named js-buildpack.

If your buildpack requires additional dependent buildpacks, you can include them in the package.toml file as demonstrated below:

```
[buildpack]
uri = "js-buildpack"


[[dependencies]]
uri = "samples/buildpacks/hello-moon"


[[dependencies]]
uri = "docker://cnbs/sample-package:hello-world"
```

For this example, no additional dependencies are needed, so the initial simple configuration is sufficient.

## Step 2: Package the Buildpack

Next, package the buildpack by executing the following command. This command names your buildpack image "my-js-buildpack" and points the pack tool to the package.toml file located in your project root:

```
pack buildpack package my-js-buildpack --config ./package.toml
```

After running the command, you should see an output similar to the following:

```
[exporter] Reusing layer 'buildpacksio/lifecycle:process-types'
[exporter] Adding label 'io.buildpacks.lifecycle.metadata'
[exporter] Adding label 'io.buildpacks.build.metadata'
[exporter] Adding label 'io.buildpacks.project.metadata'
[exporter] Setting default process type 'web'
[exporter] Saving myapp...
[exporter] *** Images (826b95390a10):
[exporter] myapp
[exporter] Adding cache layer 'my-js-buildpack:node-dependencies'
[exporter] Reusing cache layer 'my-js-buildpack:node-js'
[exporter] Successfully built image myapp
```

> [!important]
> **Note**
>
> This output confirms that your buildpack has been successfully packaged into a Docker image.

## Step 3: Verify the Packaged Image

To confirm that the image has been created, list your Docker images by running:

```
docker images
```

The output should include your newly packaged buildpack image, resembling the following:

```
pack.local/builder/71796564636c657170e
<none>
<none>
<none>
pack.local/builder/7465747486977260570
pack.local/builder/787166d6717a63756579
<none>
my-js-buildpack
cnbs/sample-builder
<none>
myapp
latest    4217f3dcc8b  44 years ago  192MB
<none>    6abc728b2ef  44 years ago  243MB
<none>    0adf8920ef6  44 years ago  84.2MB
<none>    e2ab749ad5aa  44 years ago  192MB
<none>    ba1c5d8ad7df  44 years ago  243MB
<none>    7f0ca68075b3  44 years ago  192MB
<none>    04bf31c086fc  44 years ago  243MB
<none>    f8a9f9645d9  44 years ago 243MB
latest    04c8aa842a  44 years ago  3.52KB
latest    32c7fcb6fa  44 years ago  243MB
jammy     69b96b5c21  44 years ago  192MB
latest    82691b65db  44 years ago  243MB
<none>    593bd8d46dfe  44 years ago  243MB
```

## Step 4: Tag and Distribute the Buildpack Image

If you plan to distribute your buildpack image, you must tag the image with the proper repository identifier before pushing it to Docker Hub or another container registry. To tag the image, run:

```
docker image tag my-js-buildpack sanjeevkt
```

After tagging your image, push it to the designated container registry using the appropriate Docker push command. This final step readies your buildpack for distribution.

Happy building!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cloud-native-buildpacks/module/0e306774-3067-4e23-9115-f3185d2ffa28/lesson/3bf29623-0de4-4ad9-bcbf-f76e48b1c214)**
>
> Watch video content
