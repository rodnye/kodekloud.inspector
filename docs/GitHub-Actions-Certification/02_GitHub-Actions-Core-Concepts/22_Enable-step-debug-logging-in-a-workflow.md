# Enable step debug logging in a workflow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/GitHub-Actions-Core-Concepts/Enable-step-debug-logging-in-a-workflow)

---

## Table of Contents

- Enable step debug logging in a workflow
  - What Is Debug Logging?
  - Enabling Debug Logging via Secrets or Variables
  - Demo: Creating and Observing a Debug Workflow
  - Enabling Step Debug Logging in the UI
  - Downloading Runner Diagnostic Logs
  - Enabling Debug Logging by Default
  - Watch Video
    - Types of Debug Logging
    - 1. Create a New Repository
    - 2. Add the Workflow File
    - 3. Run Without Debug Logging
    - Precedence: Variables vs. Secrets

---

## Content

GitHub Actions Certification

GitHub Actions Core Concepts

# Enable step debug logging in a workflow

Debug logging in GitHub Actions exposes low-level details about workflow execution, making it easier to diagnose issues in jobs and steps. This guide covers:

- What debug logging is and when to use it
- How to enable it via secrets or variables
- A demo workflow showing debug logging in action
- Managing debug settings by default at the repository level

---

## What Is Debug Logging?

By default, GitHub Actions logs include only high-level execution output. When you need deeper insights—such as condition evaluations, environment variable settings, and runner internals—you can turn on debug logging.

![The image shows a GitHub documentation page about enabling debug logging in GitHub Actions, with navigation links on the left and content explaining how to set up debug logging.](https://kodekloud.com/kk-media/image/upload/v1752876131/notes-assets/images/GitHub-Actions-Certification-Enable-step-debug-logging-in-a-workflow/github-actions-debug-logging-docs.jpg)

### Types of Debug Logging

Use one or both of the following:

| Debug Type                | Purpose                                          | Secret/Variable Name   |
| ------------------------- | ------------------------------------------------ | ---------------------- |
| Runner Diagnostic Logging | Captures the runner’s internal execution details | `ACTIONS_RUNNER_DEBUG` |
| Step Debug Logging        | Increases verbosity around each step’s execution | `ACTIONS_STEP_DEBUG`   |

![The image shows a GitHub documentation page about enabling runner and step debug logging in GitHub Actions. It includes instructions and a navigation menu on the left.](https://kodekloud.com/kk-media/image/upload/v1752876132/notes-assets/images/GitHub-Actions-Certification-Enable-step-debug-logging-in-a-workflow/github-actions-runner-debug-logging.jpg)

> [!important]
> **Note**
>
> If you set both a secret and a variable with the same name, **the secret wins**.
> Ensure you configure the correct value in your repository settings.

---

## Enabling Debug Logging via Secrets or Variables

To activate debug logging for a run, add one or both keys as **repository secrets** or **repository variables**:

```
# Enable runner diagnostic logging
ACTIONS_RUNNER_DEBUG = true


# Enable step debug logging
ACTIONS_STEP_DEBUG  = true
```

> If both secret and variable exist for the same key, the secret value overrides the variable.

---

## Demo: Creating and Observing a Debug Workflow

This demo shows a simple workflow that fails intentionally, illustrating how step debug logging provides extra detail.

### 1\. Create a New Repository

1.  In GitHub, create a **public** repo named `debug-workflow-demo` with a `README.md`.
2.  Clone the repository locally or open it in VS Code.

### 2\. Add the Workflow File

Create file `.github/workflows/debug.yaml` with the following content:

```
name: Debugging Demo


on:
  workflow_dispatch:


env:
  USER_1: "foo-user"
  USER_2: "bar-user"


jobs:
  debug_job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4


      - name: Set USERNAME from USER_1
        run: |
          echo "USERNAME=$USER_1" >> $GITHUB_ENV


      - name: Print USERNAME and Fail
        run: |
          echo "Printing USERNAME from previous step"
          echo "Username: $USERNAME"
          exit 1


      - name: Print USER_2
        run: |
          echo "Printing USER_2: $USER_2"
```

Commit and push:

```
git add .github/workflows/debug.yaml
git commit -m "Add debug workflow"
git push
```

### 3\. Run Without Debug Logging

1.  In the repo, go to **Actions → Debugging Demo**.
2.  Click **Run workflow**.

The third step fails and the fourth step is skipped:

![The image shows a GitHub Actions interface with a failed debug job, displaying the setup and steps of the workflow.](https://kodekloud.com/kk-media/image/upload/v1752876133/notes-assets/images/GitHub-Actions-Certification-Enable-step-debug-logging-in-a-workflow/github-actions-failed-job-workflow.jpg)

_Default logs_ only display commands and outputs, without showing condition evaluations or skipped steps details.

---

## Enabling Step Debug Logging in the UI

1.  On the failed run’s page, click **Re-run jobs ▶︎ Re-run with debug logging**.
2.  The job reruns and prepends each log line with `##[debug]`:

![The image shows a GitHub repository settings page focused on "Actions secrets and variables," with an option to re-run the job with debug logging enabled.](https://kodekloud.com/kk-media/image/upload/v1752876134/notes-assets/images/GitHub-Actions-Certification-Enable-step-debug-logging-in-a-workflow/github-actions-failed-job-debug.jpg)

![The image shows a debug log from a GitHub Actions workflow, detailing the setup and execution of a job with various steps and actions.](https://kodekloud.com/kk-media/image/upload/v1752876135/notes-assets/images/GitHub-Actions-Certification-Enable-step-debug-logging-in-a-workflow/github-actions-workflow-debug-log.jpg)

Sample condition evaluation output:

```
##[debug]Evaluating condition for step: 'Checkout Repository'
##[debug]Evaluating: success()
##[debug]=> true
##[debug]Result: true
##[debug]Starting: Checkout Repository
```

And insight into skipped steps:

```
##[debug]Evaluating condition for step: 'Print USER_2'
##[debug]=> false
##[debug]Skipping step 'Print USER_2'
```

---

## Downloading Runner Diagnostic Logs

After rerunning with debug, you can **Download log archive** from the run’s summary. The ZIP includes:

- All job logs with `##[debug]` entries
- A `runner-diagnostic-logs` folder containing runner internals

---

## Enabling Debug Logging by Default

To apply debug settings to every workflow run:

1.  Navigate to **Settings → Secrets and variables → Actions → Variables**.
2.  Click **New repository variable** and add:
    - `ACTIONS_RUNNER_DEBUG = true`
    - `ACTIONS_STEP_DEBUG = true`

![The image shows a GitHub interface where a user is adding a new action variable named "ACTIONS_STEP_DEBUG" in the settings section of a repository.](https://kodekloud.com/kk-media/image/upload/v1752876136/notes-assets/images/GitHub-Actions-Certification-Enable-step-debug-logging-in-a-workflow/github-add-action-variable-settings.jpg)

![The image shows a GitHub repository settings page focused on "Actions secrets and variables," with sections for environment and repository variables. Two repository variables, "ACTIONS_RUNNER_DEBUG" and "ACTIONS_STEP_DEBUG," are set to true.](https://kodekloud.com/kk-media/image/upload/v1752876138/notes-assets/images/GitHub-Actions-Certification-Enable-step-debug-logging-in-a-workflow/github-repo-settings-actions-secrets-2.jpg)

### Precedence: Variables vs. Secrets

If a key exists as both a variable and a secret, **the secret value takes precedence**:

| Setting Type  | ACTIONS\\\_RUNNER\\\_DEBUG | Resulting Behavior          |
| ------------- | -------------------------- | --------------------------- |
| Repo Variable | true                       | Logging enabled by variable |
| Repo Secret   | false                      | Logging disabled by secret  |

![The image shows a GitHub repository settings page focused on "Actions secrets and variables," with options to manage environment and repository secrets.](https://kodekloud.com/kk-media/image/upload/v1752876139/notes-assets/images/GitHub-Actions-Certification-Enable-step-debug-logging-in-a-workflow/github-repo-settings-actions-secrets.jpg)

> [!important]
> **Warning**
>
> Always verify the final debug log behavior when mixing variables and secrets. Secrets override variables, which may disable diagnostic logging if set to `false`.

---

By following these steps, you can enable and customize both step-level and runner-level debug logging in GitHub Actions, giving you full visibility into your workflow executions.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/54711be0-66e6-461b-b935-f77d78a5e000/lesson/8b981037-16ef-44dd-9db7-c37988726b6d)**
>
> Watch video content
