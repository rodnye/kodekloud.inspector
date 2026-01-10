# Storing workflow data as artifacts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/GitHub-Actions-Core-Concepts/Storing-workflow-data-as-artifacts)

---

## Table of Contents

- Storing workflow data as artifacts
  - Table of Contents
  - Initial Workflow Setup
  - Upload Artifact Action
  - Download Artifact Action
  - Integrate in Build, Test, and Deploy Jobs
  - Inspecting Workflow Results
  - Retention and Storage Limits
  - Links and References
  - Watch Video
    - 1. Build Job
    - 2. Test Job
    - 3. Deploy Job

---

## Content

GitHub Actions

GitHub Actions Core Concepts

# Storing workflow data as artifacts

In this guide, you’ll learn how to generate an ASCII art file with `cowsay`, upload it as an artifact in one job, and download it in subsequent jobs within a GitHub Actions workflow. This approach ensures files produced in the **build** step are available during **test** and **deploy** phases.

---

## Table of Contents

1.  [Initial Workflow Setup](#initial-workflow-setup)
2.  [Upload Artifact Action](#upload-artifact-action)
3.  [Download Artifact Action](#download-artifact-action)
4.  [Integrate in Build, Test, and Deploy Jobs](#integrate-in-build-test-and-deploy-jobs)
5.  [Inspecting Workflow Results](#inspecting-workflow-results)
6.  [Retention and Storage Limits](#retention-and-storage-limits)
7.  [Links and References](#links-and-references)

---

## Initial Workflow Setup

Here’s a basic workflow that installs `cowsay`, generates ASCII art, then idles—without using artifacts yet:

```
name: Generate ASCII Artwork
on:
  push:
jobs:
  build_job_1:
    runs-on: ubuntu-latest
    steps:
      - name: Install Cowsay
        run: sudo apt-get install cowsay -y

      - name: Generate Dragon ASCII
        run: cowsay -f dragon "Run for cover, I am a DRAGON....RAWR" >> dragon.txt

      - name: Sleep (demo)
        run: sleep 30

  test_job_2: ...
  deploy_job_3: ...
```

![The image shows a GitHub Marketplace page displaying a list of actions for automating development workflows, with options like setting up Java JDK and .NET Core SDK.](https://kodekloud.com/kk-media/image/upload/v1752876640/notes-assets/images/GitHub-Actions-Storing-workflow-data-as-artifacts/github-marketplace-development-workflows-actions.jpg)

---

## Upload Artifact Action

Use the **actions/upload-artifact** action to persist files or share them with later jobs. Below is the minimal configuration:

```
steps:
  - uses: actions/checkout@v3
  - run: mkdir -p path/to/artifact
  - run: echo hello > path/to/artifact/world.txt
  - uses: actions/upload-artifact@v3
    with:
      name: my-artifact
      path: path/to/artifact/world.txt
```

![The image shows a GitHub Marketplace page for the "Upload a Build Artifact" GitHub Action, detailing its version, features, and contributors.](https://kodekloud.com/kk-media/image/upload/v1752876642/notes-assets/images/GitHub-Actions-Storing-workflow-data-as-artifacts/github-marketplace-upload-build-artifact.jpg)

---

## Download Artifact Action

To pull down an artifact in another job, configure **actions/download-artifact**:

```
steps:
  - uses: actions/checkout@v3
  - uses: actions/download-artifact@v3
    with:
      name: my-artifact
```

---

## Integrate in Build, Test, and Deploy Jobs

### 1\. Build Job

Remove the sleep step and upload `dragon.txt`:

```
name: Generate ASCII Artwork
on:
  push:
jobs:
  build_job_1:
    runs-on: ubuntu-latest
    steps:
      - name: Install Cowsay
        run: sudo apt-get install cowsay -y

      - name: Generate Dragon ASCII
        run: cowsay -f dragon "Run for cover, I am a DRAGON....RAWR" >> dragon.txt

      - name: Upload Dragon text file
        uses: actions/upload-artifact@v3
        with:
          name: dragon-text-file
          path: dragon.txt
```

### 2\. Test Job

Download the artifact and verify its content:

```
test_job_2:
  needs: build_job_1
  runs-on: ubuntu-latest
  steps:
    - name: Download Dragon text file
      uses: actions/download-artifact@v3
      with:
        name: dragon-text-file

    - name: Test File Exists
      run: grep -i "dragon" dragon.txt
```

### 3\. Deploy Job

Retrieve the same artifact before deployment:

```
deploy_job_3:
  needs: test_job_2
  runs-on: ubuntu-latest
  steps:
    - name: Download Dragon text file
      uses: actions/download-artifact@v3
      with:
        name: dragon-text-file

    - name: Display File
      run: cat dragon.txt

    - name: Deploy
      run: echo "Deploying..."
```

---

## Inspecting Workflow Results

After committing and pushing, view the **GitHub Actions** tab. You might see a failed test job if something goes wrong:

![The image shows a GitHub Actions workflow interface with a failed job sequence. The "test_job_2" has failed, causing the overall status to be marked as "Failure."](https://kodekloud.com/kk-media/image/upload/v1752876642/notes-assets/images/GitHub-Actions-Storing-workflow-data-as-artifacts/github-actions-failed-job-workflow.jpg)

On success, all three jobs complete and list the uploaded artifact:

![The image shows a GitHub Actions workflow summary with three completed jobs: build, test, and deploy. The workflow was successful, taking 40 seconds, and produced an artifact named "dragon-text-file."](https://kodekloud.com/kk-media/image/upload/v1752876643/notes-assets/images/GitHub-Actions-Storing-workflow-data-as-artifacts/github-actions-workflow-summary-successful.jpg)

Review runner logs for confirmation:

```
Run cowsay -f dragon "Run for cover, I am a DRAGON....RAWR" >> dragon.txt
Successfully uploaded artifact: dragon-text-file (1000 bytes)

Starting download for dragon-text-file
Total number of files that will be downloaded: 1
Artifact download has finished successfully

Run cat dragon.txt
Run for cover, I am a DRAGON... RAWR
```

---

## Retention and Storage Limits

By default, artifacts and logs are kept for 90 days. Free-tier repositories can store up to 500 MB in total.

| Setting                | Default | Max (free tier) |
| ---------------------- | ------- | --------------- |
| Artifact retention     | 90 days | Configurable    |
| Total artifact storage | N/A     | 500 MB          |

> [!important]
> **Note**
>
> You can adjust retention settings under **Repository > Settings > Actions** to match your project requirements.

![The image shows a GitHub repository settings page focused on "Actions permissions," where options for allowing or disabling actions and reusable workflows are displayed. It also includes settings for artifact and log retention and fork pull request workflows.](https://kodekloud.com/kk-media/image/upload/v1752876645/notes-assets/images/GitHub-Actions-Storing-workflow-data-as-artifacts/github-repo-settings-actions-permissions.jpg)

---

## Links and References

- [GitHub Actions: Uploading artifacts](https://docs.github.com/actions/using-workflows/storing-workflow-data-as-artifacts)
- [actions/upload-artifact on Marketplace](https://github.com/actions/upload-artifact)
- [actions/download-artifact on Marketplace](https://github.com/actions/download-artifact)

---

By following this pattern, you can persist build outputs (JARs, WARs, binaries) across jobs and ensure a clean, maintainable CI/CD pipeline in GitHub Actions.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/0ac6c98f-7100-471e-b9aa-037f25cb58d7/lesson/6068d1b2-b26f-4ddc-b5f8-0547e61e8892)**
>
> Watch video content
