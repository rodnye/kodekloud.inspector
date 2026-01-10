# Workflow Login and Push to GHCR - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Continuous-Integration-with-GitHub-Actions/Workflow-Login-and-Push-to-GHCR)

---

## Table of Contents

- Workflow Login and Push to GHCR
  - Step 1: Define Environment Variables
  - Step 2: View Recent Workflow Runs
  - Understanding GitHub Container Registry
  - Step 3: Authenticate to GHCR
  - Step 4: Update Your GitHub Actions Workflow
  - Step 5: Grant Write Permissions to Packages
  - Step 6: View All Workflow Runs
  - Step 7: Pull and Use Your GHCR Image
  - Links and References
  - Watch Video
    - Explore GHCR in GitHub Docs
    - GHCR Namespace Details
    - Login Actions
    - Build Image for Testing
    - Run Container Tests
    - Push to Both Registries
    - Handling Push Errors

---

## Content

GitHub Actions

Continuous Integration with GitHub Actions

# Workflow Login and Push to GHCR

Automating Docker image builds and pushes to multiple registries—Docker Hub and GitHub Container Registry (GHCR)—is straightforward with GitHub Actions. This guide walks you through defining environment variables, authenticating to GHCR, updating your workflow, and handling permissions.

## Step 1: Define Environment Variables

Keep secret credentials out of your code by declaring environment variables at the top of your workflow:

```
env:
  MONGO_URI: mongodb+srv://supercluster.d8jj.mongodb.net/superdata
  MONGO_USERNAME: ${{ vars.MONGO_USERNAME }}
  MONGO_PASSWORD: ${{ secrets.MONGO_PASSWORD }}


jobs:
  unit-testing: …
  code-coverage: …
  docker: …
```

> [!important]
> **Note**
>
> Use `vars` for non-sensitive values and `secrets` for confidential data.

## Step 2: View Recent Workflow Runs

After committing your `.github/workflows/ci.yml`, check the **Actions** tab to see your workflow executions:

![The image shows a GitHub Actions workflow page for a repository, displaying a list of recent workflow runs with their statuses and timestamps.](https://kodekloud.com/kk-media/image/upload/v1752876553/notes-assets/images/GitHub-Actions-Workflow-Login-and-Push-to-GHCR/github-actions-workflow-repository-runs.jpg)

## Understanding GitHub Container Registry

GHCR lets you publish, store, and share Docker and OCI images under the `ghcr.io` namespace.

### Explore GHCR in GitHub Docs

Visit the GitHub Packages documentation and select **Container Registry**:

![The image shows a GitHub documentation page about GitHub Packages, detailing its features and availability. The sidebar includes navigation links for different package registries and workflows.](https://kodekloud.com/kk-media/image/upload/v1752876555/notes-assets/images/GitHub-Actions-Workflow-Login-and-Push-to-GHCR/github-packages-documentation-sidebar-navigation.jpg)

### GHCR Namespace Details

All images live under `ghcr.io/<OWNER>/<IMAGE>`:

![The image shows a GitHub documentation page about working with the Container registry, detailing how to store and manage Docker and OCI images. The sidebar lists various registry options like Docker, RubyGems, and npm.](https://kodekloud.com/kk-media/image/upload/v1752876556/notes-assets/images/GitHub-Actions-Workflow-Login-and-Push-to-GHCR/github-container-registry-documentation.jpg)

## Step 3: Authenticate to GHCR

Authenticating uses a GitHub token with _write_ permissions to `packages`. The registry is `ghcr.io`, username is your GitHub account, and the password is a Personal Access Token (PAT) or `$GITHUB_TOKEN`.

![The image shows a GitHub documentation page about authenticating to the container registry, detailing the use of personal access tokens and GitHub Actions workflows. The sidebar lists various registry options and related topics.](https://kodekloud.com/kk-media/image/upload/v1752876557/notes-assets/images/GitHub-Actions-Workflow-Login-and-Push-to-GHCR/github-authentication-container-registry-docs.jpg)

```
export CR_PAT=YOUR_TOKEN
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin
docker push ghcr.io/NAMESPACE/IMAGE_NAME:latest
docker push ghcr.io/NAMESPACE/IMAGE_NAME:2.5
```

> [!important]
> **Warning**
>
> By default, `GITHUB_TOKEN` only has **read** access to packages. You must grant **write** permissions (shown later) to push images.

## Step 4: Update Your GitHub Actions Workflow

Under the `docker` job, add login, build, test, and push steps.

### Login Actions

| Registry                  | Action                       | Inputs                                                                                                   |
| ------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------- |
| Docker Hub                | `docker/login-action@v2.2.0` | `username: ${{ vars.DOCKERHUB_USERNAME }}`, `password: ${{ secrets.DOCKERHUB_PASSWORD }}`                |
| GitHub Container Registry | `docker/login-action@v2.2.0` | `registry: ghcr.io`, `username: ${{ github.repository_owner }}`, `password: ${{ secrets.GITHUB_TOKEN }}` |

```
jobs:
  docker:
    name: Containerization
    needs: [unit-testing, code-coverage]
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4


      - name: Docker Hub Login
        uses: docker/login-action@v2.2.0
        with:
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_PASSWORD }}


      - name: GHCR Login
        uses: docker/login-action@v2.2.0
        with:
          registry: ghcr.io
          username: ${{ github.repository_owner }}
          password: ${{ secrets.GITHUB_TOKEN }}
```

### Build Image for Testing

Use `docker/build-push-action` with `push: false` to build without pushing:

```
      - name: Build image for testing
        uses: docker/build-push-action@v4
        with:
          context: .
          push: false
          tags: ${{ vars.DOCKERHUB_USERNAME }}/solar-system:${{ github.sha }}
```

### Run Container Tests

Start your container and verify health endpoints:

```
      - name: Test Docker image
        run: |
          docker images
          docker run --name solar-system-app -d \
            -p 3000:3000 \
            -e MONGO_URI=$MONGO_URI \
            -e MONGO_USERNAME=$MONGO_USERNAME \
            -e MONGO_PASSWORD=$MONGO_PASSWORD \
            ${{ vars.DOCKERHUB_USERNAME }}/solar-system:${{ github.sha }}


          export IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' solar-system-app)
          echo "App IP: $IP"
          echo "Testing endpoint"
          wget -q -O - 127.0.0.1:3000/live | grep live
```

### Push to Both Registries

Finally, enable `push: true` and tag for both Docker Hub and GHCR:

```
      - name: Push to registries
        uses: docker/build-push-action@v4
        with:
          context: .
          push: true
          tags: |
            ${{ vars.DOCKERHUB_USERNAME }}/solar-system:${{ github.sha }}
            ghcr.io/${{ github.repository_owner }}/solar-system:${{ github.sha }}
```

Commit (e.g., `chore: add GHCR authentication and push steps`) and monitor:

![The image shows a GitHub Actions workflow interface with a summary of jobs, including unit testing, code coverage, and containerization, some of which are completed and one in progress.](https://kodekloud.com/kk-media/image/upload/v1752876558/notes-assets/images/GitHub-Actions-Workflow-Login-and-Push-to-GHCR/github-actions-workflow-jobs-summary.jpg)

### Handling Push Errors

If you encounter:

`denied: installation not allowed to Create organization package`

you’ll see a failed **Containerization** job:

![The image shows a GitHub Actions workflow interface with a failed "Containerization" job, while other jobs like "Unit Testing" and "Code Coverage" have succeeded. The failure occurred during the "Container Registry Push" step.](https://kodekloud.com/kk-media/image/upload/v1752876559/notes-assets/images/GitHub-Actions-Workflow-Login-and-Push-to-GHCR/github-actions-workflow-failed-job.jpg)

And logs may display:

![The image shows a GitHub Actions interface with a failed containerization job, displaying logs related to pushing layers to a container registry.](https://kodekloud.com/kk-media/image/upload/v1752876560/notes-assets/images/GitHub-Actions-Workflow-Login-and-Push-to-GHCR/github-actions-failed-container-job-logs.jpg)

## Step 5: Grant Write Permissions to Packages

Add package write permissions to the `docker` job:

```
jobs:
  docker:
    permissions:
      packages: write
    …
```

Refer to the GitHub Token permissions table:

![The image shows a GitHub Docs page detailing permissions for the GITHUB_TOKEN, with a table listing different actions and their access levels.](https://kodekloud.com/kk-media/image/upload/v1752876561/notes-assets/images/GitHub-Actions-Workflow-Login-and-Push-to-GHCR/github-docs-github-token-permissions-table.jpg)

Re-run the workflow. The **Containerization** job should now succeed:

![The image shows a GitHub Actions workflow interface with a successful "Containerization" job, displaying logs and steps involved in the process.](https://kodekloud.com/kk-media/image/upload/v1752876562/notes-assets/images/GitHub-Actions-Workflow-Login-and-Push-to-GHCR/github-actions-containerization-workflow.jpg)

## Step 6: View All Workflow Runs

Check all runs under your workflow:

![The image shows a GitHub Actions page displaying the "Solar System Workflow" with a list of workflow runs, including their status, commit messages, and timestamps.](https://kodekloud.com/kk-media/image/upload/v1752876563/notes-assets/images/GitHub-Actions-Workflow-Login-and-Push-to-GHCR/github-actions-solar-system-workflow.jpg)

If you need to reference a failed run, it appears like this:

![The image shows a GitHub Actions workflow interface with a failed "Containerization" job, while other jobs like "Unit Testing" and "Code Coverage" have succeeded. The failure occurred during a step involving authentication and pushing an image to a container registry.](https://kodekloud.com/kk-media/image/upload/v1752876564/notes-assets/images/GitHub-Actions-Workflow-Login-and-Push-to-GHCR/github-actions-workflow-failed-job-2.jpg)

## Step 7: Pull and Use Your GHCR Image

Now that your image lives on GHCR, you can pull and reuse it:

```
docker pull ghcr.io/${{ github.repository_owner }}/solar-system:${{ github.sha }}
```

Use it as a base in other Dockerfiles:

```
FROM ghcr.io/${{ github.repository_owner }}/solar-system:${{ github.sha }}
```

Visit your **Packages** tab to explore your new container package:

![The image shows a GitHub Packages page with options to choose a registry like Docker, Apache Maven, and npm. It includes a user profile section on the left.](https://kodekloud.com/kk-media/image/upload/v1752876565/notes-assets/images/GitHub-Actions-Workflow-Login-and-Push-to-GHCR/github-packages-registry-options-user-profile.jpg)

## Links and References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [GitHub Container Registry](https://docs.github.com/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Docker Build and Push Action](https://github.com/docker/build-push-action)
- [Permissions for the GITHUB_TOKEN](https://docs.github.com/actions/security-guides/permissions-for-the-github_token)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/6136c7b5-8fe0-4a84-ae77-0274623512d5/lesson/44d8fb39-66e0-484f-b815-2fd4d36b1644)**
>
> Watch video content
