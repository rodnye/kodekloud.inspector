# Quick walkthrough - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-DevOps-Project/Sprint-04/Quick-walkthrough)

---

## Table of Contents

- Quick walkthrough
  - Pipeline Overview
  - 1. Update cloudbuild.yaml
  - 2. Commit to GitHub
  - 3. Open a Pull Request
  - 4. Merge into Main
  - 5. Trigger Cloud Build
  - 6. Build and Publish Docker Image
  - References
  - Watch Video

---

## Content

GCP DevOps Project

Sprint 04

# Quick walkthrough

In this lesson, we’ll recap the complete end-to-end CI/CD setup using Google Cloud Build, GitHub, and Artifact Registry. Once configured, any push to the `main` branch will automatically build and publish your Docker image.

## Pipeline Overview

| Step | Action                    | Outcome                                                  |
| ---- | ------------------------- | -------------------------------------------------------- |
| 1    | Define Build Steps        | Update `cloudbuild.yaml` with build & push instructions. |
| 2    | Commit to GitHub          | Push your pipeline code to the GitHub repository.        |
| 3    | Open a Pull Request       | Request review by targeting the `main` branch.           |
| 4    | Merge into Main           | Approved PR merge triggers the pipeline.                 |
| 5    | Execute Cloud Build       | Cloud Build runs automatically on the new commit.        |
| 6    | Build & Push Docker Image | Image is built and published to Artifact Registry.       |

> [!important]
> **Prerequisite**
>
> Ensure your GitHub repo is connected to Cloud Build and you have permissions on the Artifact Registry.

---

## 1\. Update `cloudbuild.yaml`

Place this file in the root of your repository to define your build pipeline. Example configuration:

```
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-t'
      - 'us-central1-docker.pkg.dev/PROJECT_ID/REPO/IMAGE:$SHORT_SHA'
      - '.'
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'push'
      - 'us-central1-docker.pkg.dev/PROJECT_ID/REPO/IMAGE:$SHORT_SHA'
images:
  - 'us-central1-docker.pkg.dev/PROJECT_ID/REPO/IMAGE:$SHORT_SHA'
```

---

## 2\. Commit to GitHub

Save your changes and push to a feature branch:

```
git add cloudbuild.yaml
git commit -m "chore: configure Cloud Build pipeline"
git push origin feature/ci-cd-setup
```

---

## 3\. Open a Pull Request

In GitHub, open a PR from `feature/ci-cd-setup` into `main`. Assign reviewers to validate:

- Review `cloudbuild.yaml`
- Check naming and region settings
- Verify IAM permissions for Cloud Build

---

## 4\. Merge into Main

Once approved, merge the PR. Cloud Build only triggers on commits to the `main` branch.

> [!important]
> **Warning**
>
> Avoid merging untested changes directly into `main`. Always validate in a staging or development branch first.

---

## 5\. Trigger Cloud Build

After merging, Cloud Build detects the new commit on `main` and executes your defined steps. Monitor builds via:

```
gcloud builds list --filter="status=WORKING"
```

Or in the Cloud Console under **Cloud Build** → **History**.

---

## 6\. Build and Publish Docker Image

Cloud Build will:

1.  Build the Docker image.
2.  Push it to Artifact Registry in the specified region (e.g., `us-central1`).

With artifacts versioned and stored securely, your pipeline is now fully automated.

---

## References

- [Cloud Build Documentation](https://cloud.google.com/build/docs)
- [Artifact Registry](https://cloud.google.com/artifact-registry/docs)
- [GitHub Actions vs. Cloud Build](https://cloud.google.com/solutions/continuous-delivery-with-cloud-build)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-devops-project/module/f84d8c20-935f-462e-9503-94408617064a/lesson/3dda3b73-aaa8-437c-89c7-89a679576758)**
>
> Watch video content
