# Build and Build Config Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/OpenShift-4/Concepts-Builds-and-Deployments/Build-and-Build-Config-Overview)

---

## Table of Contents

- Build and Build Config Overview
  - Watch Video

---

## Content

OpenShift 4

Concepts Builds and Deployments

# Build and Build Config Overview

At a high level, the OpenShift build process transforms source code into a container image deployable across your front-end, middleware, and back-end. This process is analogous to executing a Dockerfile with the "docker build" command but is fully integrated within the OpenShift environment through a BuildConfig.

A BuildConfig defines the step-by-step instructions required to convert your application's source code—often hosted on a Git repository—into a container image. Typically, BuildConfigs are generated automatically based on predefined build strategies, which means manual creation is rarely necessary.

> [!important]
> **Key Insight**
>
> A BuildConfig streamlines your CI/CD pipeline by integrating source control, automated builds, and deployment into one seamless workflow.

Below is an example of a BuildConfig defined in YAML:

```
kind: "BuildConfig"
apiVersion: "v1"
metadata:
  name: "ruby-sample-build"
spec:
  runPolicy: "Serial"
  triggers:
    - type: "GitHub"
      github:
        secret: "secret101"
    - type: "Generic"
      generic:
        secret: "secret101"
    - type: "ImageChange"
  source:
    git:
      uri: "https://github.com/openshift/ruby-hello-world"
  strategy:
    sourceStrategy:
      from:
        kind: "ImageStreamTag"
        name: "ruby-20-centos7:latest"
  output:
    to:
      kind: "ImageStreamTag"
      name: "origin-ruby-sample:latest"
  postCommit:
    script: "bundle exec rake test"
```

This YAML BuildConfig demonstrates the core components of the build process:

- **Source Definition:** Points to the Git repository containing the source code.
- **Build Strategy:** Utilizes a specified base image from an ImageStreamTag.
- **Output Configuration:** Determines where the newly created container image is stored.
- **Triggers:** Automatically initiates builds when code changes are detected, using GitHub, Generic, or ImageChange events.
- **Post-Commit Actions:** Executes a test script after the build completes to ensure application integrity.

> [!important]
> **Important**
>
> Ensure that your repository URIs and secret tokens are correctly configured to maintain the security and integrity of your builds.

In summary, OpenShift's build process leverages BuildConfigs to automate the conversion of source code into container images. This approach simplifies deployments and supports a robust CI/CD pipeline by integrating source control, automated builds, and testing into one efficient system.

For further reading and additional resources, consider exploring the following links:

- [OpenShift Documentation](https://docs.openshift.com/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/openshift-4/module/3200131b-dec7-4422-9e05-68c751bc4213/lesson/ff4ada9f-4428-463f-835f-31f052667a55)**
>
> Watch video content
