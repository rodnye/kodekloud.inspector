# What are Job Containers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Integration-with-GitHub-Actions/What-are-Job-Containers)

---

## Table of Contents

- What are Job Containers
  - Why Default Runners Can Be Slow
  - What Is a Job Container?
  - How to Configure a Job Container
  - Best Practices
  - Links and References
  - Watch Video
    - Typical Step Durations
    - Speed Comparison

---

## Content

GitHub Actions

Continuous Integration with GitHub Actions

# What are Job Containers

In this guide, you’ll learn how **job containers** in GitHub Actions can speed up your CI/CD workflows, improve reproducibility, and enhance security. By running jobs inside reusable Docker images, you avoid repeated setup steps, cut down execution time, and lower billing costs.

## Why Default Runners Can Be Slow

When you use a GitHub-hosted runner (Ubuntu, Windows, or macOS), it comes with many preinstalled tools—but large language runtimes or packages still need to be configured at runtime. Consider this example workflow that installs Node.js v20 and runs unit tests on `ubuntu-latest`:

```
name: My Awesome App
on: push
jobs:
  unit-testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3
      - name: Install Node.js v20
        run: |
          curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
          sudo apt-get install -y nodejs
      - name: Install Dependencies
        run: npm install
      - name: Install Testing Packages
        run: npm install --save-dev jest
      - name: Run Tests
        run: npm test
```

### Typical Step Durations

| Step                     | Duration |
| ------------------------ | -------- |
| Checkout Code            | 2 s      |
| Install Node.js v20      | 10 m     |
| Install Dependencies     | 3 m      |
| Install Testing Packages | 45 m     |
| Run Tests                | 5 m      |
| **Total**                | **63 m** |

Repeatedly installing Node.js and testing libraries can add over an hour to each run.

## What Is a Job Container?

A **job container** runs all your job’s steps inside a Docker image on the GitHub-hosted runner. Key benefits include:

| Benefit         | Description                                                         |
| --------------- | ------------------------------------------------------------------- |
| Isolation       | Prevents conflicts between jobs or with the host VM.                |
| Reproducibility | Ensures identical environments across runs and machines.            |
| Security        | Restricts container permissions, reducing risk from untrusted code. |

> > [!important]
> > **Note**
> >
> > GitHub Actions also supports **service containers** for databases or caching layers.
> > See [services](https://docs.github.com/actions/using-containerized-services) for details.

## How to Configure a Job Container

Add a `container` section under your job to pull a prebuilt Docker image:

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
      - name: Checkout Code
        uses: actions/checkout@v3
      - name: Run Tests
        run: npm test
```

What happens under the hood:

1.  GitHub provisions an `ubuntu-latest` VM runner.
2.  It pulls `ghcr.io/node-and-packages:20`, which already includes Node.js v20 and testing dependencies.
3.  Every step executes inside that container—no extra installs required.

### Speed Comparison

| Configuration       | Total Duration |
| ------------------- | -------------- |
| Default runner      | 63 m           |
| Job container image | ~ 5 m          |

By eliminating repeated installs, job containers can reduce runtime by over 90%.

> [!important]
> **Warning**
>
> Avoid embedding production credentials in your container image. Use [GitHub Secrets](https://docs.github.com/actions/security-guides/encrypted-secrets) for sensitive data.

## Best Practices

- Build a custom image with all your project’s common dependencies.
- Version your container image tags (e.g., `:1.0.0` or `:stable`).
- Store images in your GitHub Container Registry or Docker Hub.
- Combine with caching strategies for even faster workflows.

## Links and References

- [GitHub Actions: Workflow syntax for GitHub Actions](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions)
- [GitHub Container Registry](https://docs.github.com/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Docker Documentation](https://docs.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/6136c7b5-8fe0-4a84-ae77-0274623512d5/lesson/9335c684-a9a3-49dc-93fd-405b2cf3b19e)**
>
> Watch video content
