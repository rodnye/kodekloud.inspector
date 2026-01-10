# Workflow Login and Push to GHCR - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Integration-with-GitHub-Actions/Workflow-Login-and-Push-to-GHCR)

---

## Table of Contents

- Workflow Login and Push to GHCR
  - What Is GitHub Container Registry?
  - Authenticating to GHCR
  - Updating Your GitHub Actions Workflow
  - Troubleshooting: Permissions Error
  - Using Your Published Image
  - Watch Video
    - Using a PAT Locally
    - Workflow in Action
    - Verifying the Failure Case

---

## Content

GitHub Actions Certification

Continuous Integration with GitHub Actions

# Workflow Login and Push to GHCR

Building a Docker image and pushing it to multiple registries—like Docker Hub, GitLab Container Registry, or GitHub Container Registry (GHCR)—is a common requirement for modern CI/CD pipelines. In this guide, we’ll focus on how to build and push an image to GHCR using GitHub Actions.

---

## What Is GitHub Container Registry?

GitHub Container Registry (ghcr.io) is part of [GitHub Packages](https://github.com/features/packages). It allows you to store and manage both Docker and OCI images, either publicly or privately.

![The image shows a GitHub Actions workflow page for a repository named "solar-system" by the user "sidd-harth-7," displaying a list of recent workflow runs with their statuses and timestamps.](https://kodekloud.com/kk-media/image/upload/v1752876017/notes-assets/images/GitHub-Actions-Certification-Workflow-Login-and-Push-to-GHCR/github-actions-solar-system-workflow.jpg)

Key Features:

| Feature       | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| Namespace     | `ghcr.io`                                                     |
| Image Formats | Docker images, OCI artifacts                                  |
| Visibility    | Public or private                                             |
| Integration   | Tight integration with GitHub Actions and GitHub Packages API |

Click **Packages** → **Container registry** in your repo sidebar to explore existing images:

![The image shows a GitHub documentation page about GitHub Packages, detailing its features and usage for hosting and managing software packages. The sidebar includes links to various package registries and related topics.](https://kodekloud.com/kk-media/image/upload/v1752876019/notes-assets/images/GitHub-Actions-Certification-Workflow-Login-and-Push-to-GHCR/github-packages-documentation-features-usage.jpg)

---

## Authenticating to GHCR

You can authenticate using:

- A GitHub Personal Access Token (PAT) scoped for `read:packages` and `write:packages`.
- The automatically generated `GITHUB_TOKEN` in Actions workflows (requires explicit `packages: write` permission).

![The image shows a GitHub documentation page about authenticating to the container registry, detailing the use of personal access tokens and GitHub Actions workflows. The page includes a navigation menu on the left and a list of related topics on the right.](https://kodekloud.com/kk-media/image/upload/v1752876020/notes-assets/images/GitHub-Actions-Certification-Workflow-Login-and-Push-to-GHCR/github-authentication-container-registry-docs.jpg)

### Using a PAT Locally

```
export CR_PAT=YOUR_PERSONAL_ACCESS_TOKEN
echo "$CR_PAT" | docker login ghcr.io -u YOUR_USERNAME --password-stdin
# Login Succeeded
docker push ghcr.io/YOUR_USERNAME/IMAGE_NAME:latest
```

You can push multiple tags:

```
docker push ghcr.io/YOUR_USERNAME/IMAGE_NAME:latest
docker push ghcr.io/YOUR_USERNAME/IMAGE_NAME:2.5
```

> [!important]
> **Tip**
>
> For automation, store your PAT as a GitHub Secret (e.g., `GHCR_PAT`) and reference it in workflows.

---

## Updating Your GitHub Actions Workflow

We’ll extend our CI workflow to:

1.  Build the Docker image.
2.  Run a quick container test.
3.  Authenticate and push to Docker Hub and GHCR.

Add or update the **Containerization** job in `.github/workflows/workflow.yml`:

```
jobs:
  unit-testing: ...
  code-coverage: ...


  docker:
    name: Containerization
    needs: [unit-testing, code-coverage]
    runs-on: ubuntu-latest
    permissions:
      packages: write    # Grant write access to GHCR
      contents: read


    steps:
      - name: Checkout code
        uses: actions/checkout@v4


      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_PASSWORD }}


      - name: Login to GHCR
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ github.repository_owner }}
          password: ${{ secrets.GITHUB_TOKEN }}


      - name: Build image for tests
        uses: docker/build-push-action@v4
        with:
          context: .
          push: false
          tags: ${{ vars.DOCKERHUB_USERNAME }}/solar-system:${{ github.sha }}


      - name: Test container locally
        run: |
          docker run --rm -d -p 3000:3000 \
            -e MONGO_URI=$MONGO_URI \
            -e MONGO_USERNAME=$MONGO_USERNAME \
            -e MONGO_PASSWORD=$MONGO_PASSWORD \
            ${{ vars.DOCKERHUB_USERNAME }}/solar-system:${{ github.sha }}
          sleep 5
          wget -qO- http://localhost:3000/live | grep "live"


      - name: Push to Docker Hub & GHCR
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: |
            ${{ vars.DOCKERHUB_USERNAME }}/solar-system:${{ github.sha }}
            ghcr.io/${{ github.repository_owner }}/solar-system:${{ github.sha }}
```

### Workflow in Action

When the workflow triggers, you’ll see Unit Testing and Code Coverage complete before Containerization runs:

![The image shows a GitHub Actions workflow in progress, with unit testing and code coverage jobs completed, and containerization currently running.](https://kodekloud.com/kk-media/image/upload/v1752876021/notes-assets/images/GitHub-Actions-Certification-Workflow-Login-and-Push-to-GHCR/github-actions-workflow-unit-testing-containerization.jpg)

---

## Troubleshooting: Permissions Error

If you omit `permissions: packages: write`, the push to GHCR will fail:

![The image shows a GitHub Actions workflow interface with a failed "Containerization" job, specifically at the "Container Registry Push" step. Other steps like "Unit Testing" and "Code Coverage" are marked as successful.](https://kodekloud.com/kk-media/image/upload/v1752876022/notes-assets/images/GitHub-Actions-Certification-Workflow-Login-and-Push-to-GHCR/github-actions-failed-containerization-job.jpg)

Error message:

```
#12 ERROR: denied: installation not allowed to Create organization package
```

> [!important]
> **Permission Denied**
>
> By default, `GITHUB_TOKEN` only has **read** access to packages. You must explicitly set write permissions.

Refer to GitHub’s token permissions documentation:

![The image shows a GitHub Docs page detailing permissions for the GITHUB_TOKEN, with a table listing different actions and their access levels. The sidebar includes navigation links related to GitHub Actions.](https://kodekloud.com/kk-media/image/upload/v1752876023/notes-assets/images/GitHub-Actions-Certification-Workflow-Login-and-Push-to-GHCR/github-docs-github-token-permissions.jpg)

After updating the workflow, pushes succeed:

![The image shows a GitHub Actions workflow interface with a focus on the "Containerization" job, displaying steps and logs related to setting up the job and permissions.](https://kodekloud.com/kk-media/image/upload/v1752876024/notes-assets/images/GitHub-Actions-Certification-Workflow-Login-and-Push-to-GHCR/github-actions-containerization-workflow.jpg)

---

### Verifying the Failure Case

In earlier runs (without write access), you can inspect the setup logs for clues:

![The image shows a GitHub Actions workflow interface with a failed "Containerization" job, displaying logs and details of the setup process.](https://kodekloud.com/kk-media/image/upload/v1752876025/notes-assets/images/GitHub-Actions-Certification-Workflow-Login-and-Push-to-GHCR/github-actions-failed-containerization-job-2.jpg)

---

## Using Your Published Image

Once the workflow finishes:

1.  Navigate to **Packages** → **Container registry** in your repository.
2.  You’ll see your Docker image listed under GHCR.

Pull your published image:

```
docker pull ghcr.io/${{ github.repository_owner }}/solar-system:${{ github.sha }}
```

Use it as a base image in another `Dockerfile`:

```
FROM ghcr.io/${{ github.repository_owner }}/solar-system:${{ github.sha }}
```

Congratulations! You’ve successfully built, tested, and pushed Docker images to both Docker Hub and GitHub Container Registry in a single GitHub Actions workflow.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/56d72a06-285c-4516-9880-073fb56f579b/lesson/16105ff9-d709-4d84-8098-d57675af9b39)**
>
> Watch video content
