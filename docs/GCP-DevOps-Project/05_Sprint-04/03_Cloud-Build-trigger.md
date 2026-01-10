# Cloud Build trigger - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-DevOps-Project/Sprint-04/Cloud-Build-trigger)

---

## Table of Contents

- Cloud Build trigger
  - Why Use a Cloud Build Trigger?
  - Common Trigger Events
  - How It Works
  - Next Steps
  - References
  - Watch Video

---

## Content

GCP DevOps Project

Sprint 04

# Cloud Build trigger

Cloud Build triggers let you automatically start build jobs in Google Cloud Build whenever specific events occur in your GitHub repository—just like webhooks in Jenkins. By connecting your repo to Cloud Build through a trigger, you can ensure consistent, repeatable builds for your CI/CD pipeline.

## Why Use a Cloud Build Trigger?

In Jenkins, you configure webhooks to detect pushes or pull requests in GitHub. Cloud Build provides the same capability natively with **Cloud Build triggers**, which listen for repository events and kick off builds defined in your `cloudbuild.yaml`.

> [!important]
> **Note**
>
> Before you begin, make sure you’ve granted Cloud Build access to your GitHub repository. See [Create and Manage Triggers](https://cloud.google.com/build/docs/automating-builds/create-manage-triggers) for detailed steps.

![The image is a flow diagram showing a process from GitHub to Cloud Build via a Cloud Build Trigger.](https://kodekloud.com/kk-media/image/upload/v1752875468/notes-assets/images/GCP-DevOps-Project-Cloud-Build-trigger/github-cloud-build-trigger-flow-diagram.jpg)

## Common Trigger Events

When creating a trigger, you specify which events should start a build. Typical events include:

| Event Type                   | Description                                              |
| ---------------------------- | -------------------------------------------------------- |
| Push to `main` or `master`   | Ideal for deploying from the primary branch              |
| Push to a specific branch    | Build feature or release branches on demand              |
| Pull request creation/update | Test code before merging changes into protected branches |

![The image shows a document icon with three location markers and text stating that any push on the main/master branch will trigger a Cloud Build.](https://kodekloud.com/kk-media/image/upload/v1752875469/notes-assets/images/GCP-DevOps-Project-Cloud-Build-trigger/document-icon-location-markers-cloud-build.jpg)

## How It Works

1.  **Define the trigger**  
    In the Cloud Console or via `gcloud`, link your GitHub repo and select the event and branch filters.
2.  **Provide your build configuration**  
    Cloud Build looks for a `cloudbuild.yaml` at the repo root. Each step runs in its own container image, in sequence:

    ```
    steps:
      - name: 'gcr.io/cloud-builders/docker'
        args: ['build', '-t', 'gcr.io/$PROJECT_ID/my-app:$COMMIT_SHA', '.']
      - name: 'gcr.io/cloud-builders/docker'
        args: ['push', 'gcr.io/$PROJECT_ID/my-app:$COMMIT_SHA']
    images:
      - 'gcr.io/$PROJECT_ID/my-app:$COMMIT_SHA'
    ```

3.  **Trigger execution**  
    When GitHub detects your specified event (e.g., `push` to `main`), it notifies Cloud Build, which then runs your pipeline automatically.

> [!important]
> **Warning**
>
> Ensure your `cloudbuild.yaml` is valid and located at the repository root. Otherwise, triggers will fail with a configuration error.

## Next Steps

- Configure and test your Cloud Build trigger.
- Monitor build history in the Cloud Console under **Cloud Build > History**.
- Integrate additional notifications or approvals as needed.

---

## References

- [Cloud Build Triggers Documentation](https://cloud.google.com/build/docs/automating-builds/create-manage-triggers)
- [cloudbuild.yaml Reference](https://cloud.google.com/build/docs/build-config-file-schema)
- [GitHub Integration Guide](https://cloud.google.com/build/docs/automating-builds/github-builds)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-devops-project/module/f84d8c20-935f-462e-9503-94408617064a/lesson/ba8b5efa-8408-4633-b747-8f384d8089a4)**
>
> Watch video content
