# Sprint 04 review - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-DevOps-Project/Sprint-04/Sprint-04-review)

---

## Table of Contents

- Sprint 04 review
  - Sprint 04 Goals
  - Implementation Steps
  - Results and Next Steps
  - References
  - Watch Video
    - 1. Configure Google Cloud Build
    - 2. Link Cloud Build to GitHub
    - 3. Automate Docker Image Builds
    - 4. Publish to Artifact Registry

---

## Content

GCP DevOps Project

Sprint 04

# Sprint 04 review

Welcome back! In this Sprint 04 review, we’ll recap our objectives and confirm that each has been met, from configuring Cloud Build to publishing container images.

## Sprint 04 Goals

| Goal ID | Objective                                | Deliverable                           |
| ------- | ---------------------------------------- | ------------------------------------- |
| 1       | Understand Google Cloud Build            | `cloudbuild.yaml` configuration files |
| 2       | Connect Cloud Build to GitHub            | Build trigger on GitHub push          |
| 3       | Automate Docker image builds             | `Dockerfile` in application repo      |
| 4       | Store Docker images in Artifact Registry | Images pushed to GCP registry         |

## Implementation Steps

### 1\. Configure Google Cloud Build

We defined build steps in a `cloudbuild.yaml` file to install dependencies, run tests, and build the Docker image:

```
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/my-app:$COMMIT_SHA', '.']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/my-app:$COMMIT_SHA']
images:
  - 'gcr.io/$PROJECT_ID/my-app:$COMMIT_SHA'
```

> [!important]
> **Note**
>
> Ensure the Cloud Build service account has `roles/artifactregistry.writer` and `roles/storage.admin` for pushing images.

### 2\. Link Cloud Build to GitHub

We created a trigger so that any push to the `main` branch starts a build:

```
gcloud beta builds triggers create github \
  --name="on-main-commit" \
  --repo-name="my-repo" \
  --repo-owner="my-org" \
  --branch-pattern="^main$" \
  --build-config="cloudbuild.yaml"
```

### 3\. Automate Docker Image Builds

Our `Dockerfile` defines how the application is containerized:

```
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
CMD ["node", "server.js"]
EXPOSE 8080
```

This file ensures dependencies install and the app runs on port 8080.

### 4\. Publish to Artifact Registry

After building, Cloud Build pushes to Google Cloud Artifact Registry:

```
gcloud artifacts repositories create my-repo \
  --repository-format=docker \
  --location=us-central1


# Already covered by cloudbuild.yaml, but manual push example:
docker tag my-app gcr.io/$PROJECT_ID/my-app:$COMMIT_SHA
docker push gcr.io/$PROJECT_ID/my-app:$COMMIT_SHA
```

> [!important]
> **Warning**
>
> Verify that your Artifact Registry repository is in the same region as your Cloud Build trigger to avoid latency issues.

## Results and Next Steps

- All build steps in `cloudbuild.yaml` execute successfully.
- GitHub pushes to `main` automatically trigger Cloud Build.
- Docker images build without manual intervention.
- Images are stored in Artifact Registry and available for deployment.

With Sprint 04 complete, our CI/CD pipeline is fully automated on Google Cloud Platform.

Thank you, and see you in the next lesson!

---

## References

- [Google Cloud Build](https://cloud.google.com/build)
- [Artifact Registry](https://cloud.google.com/artifact-registry)
- [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
- [GitHub integration](https://cloud.google.com/build/docs/automating-builds/github)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-devops-project/module/f84d8c20-935f-462e-9503-94408617064a/lesson/1e78b741-6429-4936-9e4b-228a21102997)**
>
> Watch video content
