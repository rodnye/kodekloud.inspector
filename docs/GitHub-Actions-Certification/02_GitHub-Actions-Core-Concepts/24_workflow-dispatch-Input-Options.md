# workflow dispatch Input Options - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/GitHub-Actions-Core-Concepts/workflow-dispatch-Input-Options)

---

## Table of Contents

- workflow dispatch Input Options
  - Supported Input Types
  - Basic Input Example
  - Example Repository
  - Defining the Workflow
  - Running the Workflow
  - Creating Environments
  - Viewing the Run
  - Conditional Steps and Debugging
  - Summary
  - Watch Video

---

## Content

GitHub Actions Certification

GitHub Actions Core Concepts

# workflow dispatch Input Options

In this guide, you’ll learn how to leverage the `workflow_dispatch` trigger in GitHub Actions to define custom inputs for manual workflows. By specifying parameters, you can create a more intuitive, guided interface for team members and contributors.

> [!important]
> **Note**
>
> GitHub supports up to 10 top-level inputs in a `workflow_dispatch` trigger. Use descriptive names and defaults to simplify the form.
> See the [Workflow Syntax documentation](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions#onworkflow_dispatch) for details.

![The image shows a GitHub documentation page about "on.workflow_dispatch" and "on.workflow_dispatch.inputs" for GitHub Actions, detailing how to specify inputs for workflows. The page includes navigation links on the left and a list of related topics on the right.](https://kodekloud.com/kk-media/image/upload/v1752876198/notes-assets/images/GitHub-Actions-Certification-workflow-dispatch-Input-Options/github-actions-workflow-dispatch-inputs.jpg)

## Supported Input Types

Use these five input types to collect values in your workflow form:

| Input Type  | Description                         | YAML Example                |
| ----------- | ----------------------------------- | --------------------------- |
| boolean     | True/false toggle                   | `type: boolean`             |
| choice      | Select one option from a list       | `type: choice` + `options:` |
| string      | Free-form text                      | `type: string`              |
| number      | Numeric value                       | `type: number`              |
| environment | Select from repository environments | `type: environment`         |

## Basic Input Example

Below is a minimal example showing `choice`, `boolean`, `string`, and `environment` inputs. Access them in steps via `${{ inputs.<name> }}`:

```
on:
  workflow_dispatch:
    inputs:
      logLevel:
        description: 'Log level'
        required: true
        default: 'warning'
        type: choice
        options:
          - info
          - warning
          - debug
      print_tags:
        description: 'Print tags to STDOUT'
        required: true
        type: boolean
      tags:
        description: 'Test scenario tags'
        required: true
        type: string
      environment:
        description: 'Environment to run tests against'
        required: true
        type: environment


jobs:
  print-tag:
    runs-on: ubuntu-latest
    if: ${{ inputs.print_tags }}
    steps:
      - run: echo "Tags: ${{ inputs.tags }}"
```

---

## Example Repository

Clone or browse the **trigger-inputs** repository to see these inputs in action. It contains a simple README and one workflow file:

![The image shows a GitHub repository page named "trigger-inputs" with a folder and a README file listed. The repository has two commits and no description or releases.](https://kodekloud.com/kk-media/image/upload/v1752876198/notes-assets/images/GitHub-Actions-Certification-workflow-dispatch-Input-Options/github-repo-trigger-inputs-readme.jpg)

---

## Defining the Workflow

Open `.github/workflows/trigger-inputs.yml` in your editor:

![The image shows a Visual Studio Code environment with a YAML file open, specifically a GitHub Actions workflow file named "trigger-inputs.yml" under the ".github/workflows" directory. The file contains a workflow named "Triggered Workflow with Various Inputs."](https://kodekloud.com/kk-media/image/upload/v1752876200/notes-assets/images/GitHub-Actions-Certification-workflow-dispatch-Input-Options/vscode-yaml-github-actions-workflow.jpg)

This workflow declares five inputs and a job that prints them:

```
name: Triggered Workflow with Various Inputs
on:
  workflow_dispatch:
    inputs:
      run-tests:
        description: 'Run unit tests'
        required: false
        type: boolean
      test-type:
        description: 'Type of tests to run'
        type: choice
        options:
          - unit
          - integration
          - all
        required: true
      environment:
        description: 'Deployment target'
        type: environment
        required: true
      build-number:
        description: 'Custom build number'
        type: number
        required: false
      message:
        description: 'Additional message'
        type: string
        required: false


jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Print workflow inputs
        run: |
          echo "Run tests: ${{ inputs.run-tests }}"
          echo "Test type: ${{ inputs.test-type }}"
          echo "Environment: ${{ inputs.environment }}"
          echo "Build number: ${{ inputs.build-number }}"
          echo "Message: ${{ inputs.message }}"


      - name: Run tests (if selected)
        if: ${{ inputs.run-tests }}
        run: echo "Running tests..."


      # Uncomment to deploy based on the selected environment
      # - name: Deploy to ${{ inputs.environment }}
      #   environment: ${{ inputs.environment }}
      #   run: echo "Deploying to ${{ inputs.environment }}"
```

---

## Running the Workflow

1.  Go to the **Actions** tab, select **Triggered Workflow with Various Inputs**, and click **Run workflow**.
2.  GitHub displays a form based on your `inputs` block:

![The image shows a GitHub Actions page for a repository, displaying a workflow titled "Triggered Workflow with Various Inputs" with no runs yet. A dropdown menu is open, allowing the user to configure and run the workflow.](https://kodekloud.com/kk-media/image/upload/v1752876201/notes-assets/images/GitHub-Actions-Certification-workflow-dispatch-Input-Options/github-actions-triggered-workflow-inputs.jpg)

3.  Choose the branch, toggle **Run tests**, pick your **Test type**, select an **Environment**, and enter **Build number** or **Message** as needed.
4.  Click **Run workflow**.

---

## Creating Environments

If no environments exist, add them under **Settings** → **Environments**. We created two examples here:

![The image shows the "Environments" settings page of a GitHub repository, with a "development" environment listed. The sidebar includes options like branches, tags, actions, and webhooks.](https://kodekloud.com/kk-media/image/upload/v1752876202/notes-assets/images/GitHub-Actions-Certification-workflow-dispatch-Input-Options/github-repo-environments-settings-development.jpg)

---

## Viewing the Run

After you submit the form, watch the job start:

![The image shows a GitHub Actions page with a workflow titled "Triggered Workflow with Various Inputs," displaying details about a workflow run and options for managing caches and runners.](https://kodekloud.com/kk-media/image/upload/v1752876203/notes-assets/images/GitHub-Actions-Certification-workflow-dispatch-Input-Options/github-actions-triggered-workflow-details.jpg)

Once it finishes, open the logs to confirm your inputs:

![The image shows a GitHub Actions page displaying a successfully completed workflow run named "Triggered Workflow with Various Inputs." The job "build-and-deploy" is highlighted as successful.](https://kodekloud.com/kk-media/image/upload/v1752876204/notes-assets/images/GitHub-Actions-Certification-workflow-dispatch-Input-Options/github-actions-successful-workflow-run.jpg)

```
echo "Run tests: true"
echo "Test type: integration"
echo "Environment: production"
echo "Build number: 12345"
echo "Message: testing input options"
```

---

## Conditional Steps and Debugging

When you guard a step with a boolean input, compare directly to a boolean:

```
- name: Run tests (if selected)
  if: ${{ inputs.run-tests }}
  run: echo "Testing..."
```

> [!important]
> **Warning**
>
> Avoid comparing a boolean input to a string (`'true'`). That always evaluates to false, as shown in the debug logs below.

![The image shows a GitHub Actions workflow log with sections for "Print workflow inputs" and "Run tests (if selected)," displaying debug information and evaluation results.](https://kodekloud.com/kk-media/image/upload/v1752876205/notes-assets/images/GitHub-Actions-Certification-workflow-dispatch-Input-Options/github-actions-workflow-log-debug.jpg)

```
##[debug]Evaluating: (success() && (inputs.run-tests == 'true'))
##[debug]=> success: true
##[debug]=> (true == 'true'): false
##[debug]Result: false
```

---

## Summary

- Define up to 10 `workflow_dispatch` inputs (boolean, choice, string, number, environment).
- Access values with `${{ inputs.<name> }}` in your steps.
- Use inputs in `if:` conditional expressions.
- Enable [workflow debug logs](https://docs.github.com/actions/managing-workflow-runs/enabling-debug-logging) to troubleshoot.

With these patterns, you can build flexible, user-friendly GitHub Actions workflows that adapt at run time.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/54711be0-66e6-461b-b935-f77d78a5e000/lesson/01eed79c-e158-4729-8b6a-a98e7410decb)**
>
> Watch video content
