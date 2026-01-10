# Using a matrix for your jobs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/GitHub-Actions-Core-Concepts/Using-a-matrix-for-your-jobs)

---

## Table of Contents

- Using a matrix for your jobs
  - A straightforward workflow
  - The problem of repetition
  - Introducing the matrix strategy
  - Converting our workflow to use a matrix
  - Links and References
  - Watch Video
    - Inspecting the Windows job
    - Handling failures

---

## Content

GitHub Actions Certification

GitHub Actions Core Concepts

# Using a matrix for your jobs

In this guide, you’ll learn how to leverage GitHub Actions' **matrix strategy** to run the same job across multiple environments without duplicating YAML. By the end, you’ll be able to execute Docker commands on various OS runners and image combinations in parallel.

## A straightforward workflow

Below is a basic workflow that defines two separate jobs—one on Ubuntu and one on Windows—to echo Docker details and run the `hello-world` image.

```
name: Matrix Configuration

on:
  push:
  workflow_dispatch:

jobs:
  deploy-on-ubuntu:
    runs-on: ubuntu-latest
    steps:
      - name: Echo Docker Details
        run: docker info
      - name: Run Image
        run: docker run hello-world

  deploy-on-windows:
    runs-on: windows-latest
    steps:
      - name: Echo Docker Details
        run: docker info
      - name: Run Image
        run: docker run hello-world
```

This triggers on both `push` and manual dispatch, executing the same two steps on different OS runners.

![The image shows a GitHub Actions page displaying a list of workflow runs, including their status, branch, and execution time. The interface is dark-themed, with options for managing workflows on the left sidebar.](https://kodekloud.com/kk-media/image/upload/v1752876168/notes-assets/images/GitHub-Actions-Certification-Using-a-matrix-for-your-jobs/github-actions-workflow-runs-status.jpg)

Both jobs kick off in parallel and complete successfully.

---

### Inspecting the Windows job

Click into **deploy-on-windows** to view details about the runner, Docker info, and the `hello-world` output:

```
Run docker info
Client:
 Version: 24.0.6
 Context: default
 Debug Mode: false
 Plugins:
  compose: Docker Compose (Docker Inc.)
    Version: v2.22.0
    Path: C:\ProgramData\Docker\cli-plugins\docker-compose.exe

Server:
 Containers: 0
  Running: 0
  Paused: 0
  Stopped: 0
 Images: 5
 Server Version: 24.0.6
 Storage Driver: windowsfilter
 Logging Driver: json-file
```

Then it pulls and runs `hello-world`:

```
Run docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
...
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

![The image shows a GitHub Actions interface with a job titled "deploy-on-windows" that has successfully completed. It details the setup process, including the operating system and runner version used.](https://kodekloud.com/kk-media/image/upload/v1752876169/notes-assets/images/GitHub-Actions-Certification-Using-a-matrix-for-your-jobs/github-actions-deploy-on-windows-success.jpg)

---

## The problem of repetition

Imagine scaling this to more OS versions or Docker images. You’d end up copying and pasting nearly identical job definitions:

```
jobs:
  deploy-on-ubuntu:
    runs-on: ubuntu-latest
    steps:
      - name: Echo Docker Details
        run: docker info
      - name: Run Image
        run: docker run hello-world

  deploy-on-windows:
    runs-on: windows-latest
    steps:
      - name: Echo Docker Details
        run: docker info
      - name: Run Image
        run: docker run hello-world

  # ...more duplicates for other OS or images
```

Maintaining this becomes a headache as you add environments.

## Introducing the matrix strategy

GitHub Actions’ matrix lets you define multiple variables, and it automatically expands one job into many. Here’s the minimal syntax:

```
jobs:
  example_matrix:
    strategy:
      matrix:
        version: [10, 12, 14]
        os: [ubuntu-latest, windows-latest]
```

This generates six parallel jobs (3 versions × 2 OS).

| Field             | Description                        | Example                                     |
| ----------------- | ---------------------------------- | ------------------------------------------- |
| `strategy.matrix` | Defines variables to expand        | `version: [10,12,14], os: [ubuntu,windows]` |
| `runs-on`         | Runner label substituted by matrix | `runs-on: ${{ matrix.os }}`                 |
| `steps`           | Standard job steps                 | `run: docker run ${{ matrix.image }}`       |

Learn more in the [GitHub Actions matrix documentation](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs).

![The image shows a GitHub Actions interface with a workflow run summary for a matrix job, displaying details of a successful deployment on Ubuntu.](https://kodekloud.com/kk-media/image/upload/v1752876170/notes-assets/images/GitHub-Actions-Certification-Using-a-matrix-for-your-jobs/github-actions-matrix-job-deployment.jpg)

---

## Converting our workflow to use a matrix

Let’s refactor our example to run two Docker images (`hello-world` and `alpine`) across three OS environments (`ubuntu-latest`, `ubuntu-20.04`, `windows-latest`):

```
name: Matrix Configuration

on:
  push:
  workflow_dispatch:

jobs:
  deploy:
    strategy:
      matrix:
        os: [ubuntu-latest, ubuntu-20.04, windows-latest]
        image: [hello-world, alpine]
    runs-on: ${{ matrix.os }}
    steps:
      - name: Echo Docker Details
        run: docker info

      - name: Run ${{ matrix.image }} on ${{ matrix.os }}
        run: docker run ${{ matrix.image }}
```

- `runs-on: ${{ matrix.os }}` selects the runner OS dynamically.
- The second step pulls and runs each image on each OS.

When you push this change, GitHub Actions spawns six jobs in parallel:

![The image shows a GitHub Actions workflow interface with a matrix configuration, displaying the status of various deployment jobs for different environments like Ubuntu and Windows.](https://kodekloud.com/kk-media/image/upload/v1752876171/notes-assets/images/GitHub-Actions-Certification-Using-a-matrix-for-your-jobs/github-actions-workflow-matrix-status.jpg)

> [!important]
> **Note**
>
> You can also filter specific combinations using `include` and `exclude` under `strategy.matrix`. For example:
>
> ```
> strategy:
> matrix:
> os: [ubuntu-latest, windows-latest]
> image: [hello-world, alpine]
> exclude:
> - os: windows-latest
> image: alpine
> ```
>
> This skips running Alpine on Windows.

---

### Handling failures

In some cases, certain image/OS combinations may not be supported. For example, `alpine` has no Windows manifest, so that job fails:

![The image shows a GitHub Actions workflow summary with a matrix configuration. It indicates a failure in the deployment process, with some jobs succeeding and others failing.](https://kodekloud.com/kk-media/image/upload/v1752876172/notes-assets/images/GitHub-Actions-Certification-Using-a-matrix-for-your-jobs/github-actions-workflow-matrix-failure.jpg)

```
Run docker run alpine
Unable to find image 'alpine:latest' locally
latest: Pulling from library/alpine
docker: no matching manifest for windows/amd64 in the manifest list entries.
See 'docker run --help'.
Error: Process completed with exit code 1
```

By default, a failure in one matrix job cancels the rest and marks the workflow as failed. Use `continue-on-error: true` on a step or job-level conditionals if you want to proceed despite errors.

---

## Links and References

- [GitHub Actions: Using a matrix for your jobs](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)
- [Docker CLI reference](https://docs.docker.com/engine/reference/commandline/cli/)
- [GitHub Actions workflow syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/54711be0-66e6-461b-b935-f77d78a5e000/lesson/262b76e3-8f5b-455d-838f-d17f8676c140)**
>
> Watch video content
