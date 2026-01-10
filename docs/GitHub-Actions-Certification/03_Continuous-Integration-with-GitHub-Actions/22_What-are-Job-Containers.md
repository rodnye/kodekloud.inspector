# What are Job Containers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Integration-with-GitHub-Actions/What-are-Job-Containers)

---

## Table of Contents

- What are Job Containers
  - GitHub-Hosted Runners
  - Introducing Job Containers
  - How to Configure a Job Container
  - Best Practices
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Continuous Integration with GitHub Actions

# What are Job Containers

In this guide, you’ll learn how to use **job containers** in GitHub Actions to boost isolation, reproducibility, and security in your workflows.

## GitHub-Hosted Runners

Every GitHub Actions workflow runs on a **runner**, which can be a GitHub-hosted virtual machine or a self-hosted server. A typical configuration looks like this:

```
name: My Awesome App
on: push
jobs:
  unit-testing:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Node.js 20
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      - name: Install Dependencies
        run: npm install
      - name: Install Testing Packages
        run: npm install --save-dev jest
      - name: Run Tests
        run: npm test
```

The `ubuntu-latest` runner includes many common tools—Node.js, Python, Docker, browsers, and package managers—so you can start building and testing right away. However, installing additional dependencies at runtime can slow down your jobs and increase billing minutes.

## Introducing Job Containers

A **job container** is a Docker image in which all steps of a job execute. By shipping a container that already contains everything you need, you:

| Benefit         | Description                                                                           |
| --------------- | ------------------------------------------------------------------------------------- |
| Isolation       | Each job runs in its own container, preventing conflicts with the host or other jobs. |
| Reproducibility | The same image yields identical environments across runs and machines.                |
| Security        | You can restrict permissions and reduce the attack surface on the host VM.            |

> [!important]
> **Why Use Job Containers?**
>
> Using a pre-built container image can reduce setup time, eliminate version drift, and ensure that your CI environment matches your local or production setup.

## How to Configure a Job Container

To run a job inside a container, add the `container` key under your job definition:

```
name: My Awesome App
on: push
jobs:
  unit-testing:
    runs-on: ubuntu-latest
    container:
      image: ghcr.io/node-and-packages:20
      credentials:
        username: alice
        password: ${{ secrets.PWD }}
    steps:
      - uses: actions/checkout@v3
      - name: Run Tests
        run: npm test
```

What happens under the hood:

1.  GitHub provisions an `ubuntu-latest` VM.
2.  Docker pulls and starts `ghcr.io/node-and-packages:20` (preloaded with Node.js 20 and testing tools).
3.  All `steps` execute inside that container—no extra install steps required.

> [!important]
> **Tip**
>
> Store large, frequently used images in GitHub Container Registry or Docker Hub to speed up pulls and reduce workflow time.

## Best Practices

- Always pin container images to a specific digest or version tag to avoid unexpected updates.
- Limit container permissions using the `options` field (e.g., `--user` or `--entrypoint` flags).
- Avoid using the root user inside containers; run as a dedicated non-root user instead.
- Clean up temporary files to keep your images lean.

> [!important]
> **Warning**
>
> Don’t run tests against production databases. Use dedicated testing databases or [service containers](https://docs.github.com/actions/using-containerized-services/about-service-containers) for isolated test environments.

## Links and References

- [GitHub Actions Workflow Syntax](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)
- [About GitHub-Hosted Runners](https://docs.github.com/actions/using-github-hosted-runners/about-github-hosted-runners)
- [Docker Hub](https://hub.docker.com/)
- [GitHub Container Registry](https://docs.github.com/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/56d72a06-285c-4516-9880-073fb56f579b/lesson/726f0ba0-9888-458b-8bbb-59d380a114e5)**
>
> Watch video content
