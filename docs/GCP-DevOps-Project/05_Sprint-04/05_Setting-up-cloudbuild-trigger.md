# Setting up cloudbuild trigger - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-DevOps-Project/Sprint-04/Setting-up-cloudbuild-trigger)

---

## Table of Contents

- Setting up cloudbuild trigger
  - 1. Verify Your Repository Connection
  - 2. Understand Trigger Events
  - 3. Create a Build Trigger
  - 4. Configure Build Settings
  - 5. Test the Trigger
  - 6. Next Steps: Add cloudbuild.yaml
  - Links and References
  - Watch Video

---

## Content

GCP DevOps Project

Sprint 04

# Setting up cloudbuild trigger

Hello, and welcome back! You’ve successfully connected Cloud Build to your GitHub repository. In this guide, we’ll verify the connection and configure a trigger that automatically runs builds on pushes to your main (or master) branch.

## 1\. Verify Your Repository Connection

1.  Open the [Google Cloud Console](https://console.cloud.google.com).
2.  Navigate to **Build** > **Triggers** > **Manage repositories**.

![The image shows the Google Cloud Build interface with a "Triggers" section open, indicating no triggers are found. There are options to create a trigger or connect a repository.](https://kodekloud.com/kk-media/image/upload/v1752875482/notes-assets/images/GCP-DevOps-Project-Setting-up-cloudbuild-trigger/google-cloud-build-triggers-interface.jpg)

If your repository appears in the list, the integration succeeded. Otherwise, connect it via the Cloud Build GitHub App.

## 2\. Understand Trigger Events

Cloud Build can start builds automatically based on various events. The most common trigger is a push or merge to a specific branch:

![The image shows a Google Cloud Build interface with a repository connected via the Cloud Build GitHub App. It includes options to manage repositories and connect new ones.](https://kodekloud.com/kk-media/image/upload/v1752875483/notes-assets/images/GCP-DevOps-Project-Setting-up-cloudbuild-trigger/google-cloud-build-github-interface.jpg)

Whenever code is pushed to the target branch, Cloud Build will run your pipeline.

## 3\. Create a Build Trigger

1.  On the **Manage repositories** page, click the ••• menu next to your repo and select **Add trigger**.
2.  Configure the trigger settings:

| Field              | Description                                                 |
| ------------------ | ----------------------------------------------------------- |
| **Trigger name**   | Friendly name, e.g., `GCP DevOps Project`                   |
| **Event**          | Select **Push to a branch**                                 |
| **Repository**     | Choose your GitHub repository                               |
| **Branch (regex)** | Define which branches activate the trigger (see regex note) |

![The image shows a Google Cloud Build interface where a trigger is being created, with options for naming, region selection, and event type configuration. The event is set to trigger on a "Push to a branch" for a specific repository and branch.](https://kodekloud.com/kk-media/image/upload/v1752875485/notes-assets/images/GCP-DevOps-Project-Setting-up-cloudbuild-trigger/google-cloud-build-trigger-creation.jpg)

> [!important]
> **Branch name regex**
>
> To restrict the trigger to exactly **main** or **master**, use:
>
> ```
> ^(main|master)$
> ```
>
> This prevents branches like `feature/main-update` from starting a build.

## 4\. Configure Build Settings

Choose how Cloud Build finds your build instructions:

- **Autodetect**: Automatically detects a `cloudbuild.yaml` or `Dockerfile` at the repo root.
- **Cloud Build configuration file**: Manually specify the path to your `cloudbuild.yaml`.

![The image shows a Google Cloud Build interface where a user is creating a trigger. It includes options for selecting a repository, branch, and configuration type for automated builds.](https://kodekloud.com/kk-media/image/upload/v1752875486/notes-assets/images/GCP-DevOps-Project-Setting-up-cloudbuild-trigger/google-cloud-build-trigger-interface.jpg)

> [!important]
> **Configuration file required**
>
> If your repository doesn’t include a `cloudbuild.yaml`, the trigger will fail at runtime.

## 5\. Test the Trigger

Click **Run trigger** to verify your setup. Without a `cloudbuild.yaml`, you’ll see an error:

![The image shows a Google Cloud Build interface with a trigger setup for a project, and an error message indicating that the "cloudbuild.yaml" file was not found.](https://kodekloud.com/kk-media/image/upload/v1752875487/notes-assets/images/GCP-DevOps-Project-Setting-up-cloudbuild-trigger/google-cloud-build-trigger-error-cloudbuild-yaml.jpg)

## 6\. Next Steps: Add `cloudbuild.yaml`

To resolve the error, add a `cloudbuild.yaml` at your repository’s root. Here’s an example CI/CD pipeline:

```
steps:
- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', 'gcr.io/$PROJECT_ID/my-app:$COMMIT_SHA', '.']
images:
- 'gcr.io/$PROJECT_ID/my-app:$COMMIT_SHA'
```

Commit and push this file to **main**. Your Cloud Build trigger will then run automatically on each push.

## Links and References

- [Google Cloud Build Triggers](https://cloud.google.com/build/docs/automating-builds/create-manage-triggers)
- [Writing a `cloudbuild.yaml` file](https://cloud.google.com/build/docs/build-config)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-devops-project/module/f84d8c20-935f-462e-9503-94408617064a/lesson/cea6263a-e201-4b2f-8c1e-48c08d330a37)**
>
> Watch video content
