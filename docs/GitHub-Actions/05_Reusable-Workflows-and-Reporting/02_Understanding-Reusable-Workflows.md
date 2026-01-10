# Understanding Reusable Workflows - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Reusable-Workflows-and-Reporting/Understanding-Reusable-Workflows)

---

## Table of Contents

- Understanding Reusable Workflows
  - Why Use Reusable Workflows?
  - 1. Extracting the Deployment Job
  - 2. Calling a Reusable Workflow
  - 3. Inputs, Outputs, and Secrets
  - Benefits of Modular CI/CD with Reusable Workflows
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

Reusable Workflows and Reporting

# Understanding Reusable Workflows

Creating modular, maintainable CI/CD pipelines is essential for growing codebases. GitHub Actions **reusable workflows** let you extract common jobs—such as deployments—into standalone workflows that multiple repositories or branches can call. This approach eliminates duplication, reduces errors, and enforces consistent deployment practices across projects.

![The image shows a visual representation of a CI/CD workflow with steps for unit testing, code coverage, dependency scanning, application building, and deployment to development and production environments.](https://kodekloud.com/kk-media/image/upload/v1752876737/notes-assets/images/GitHub-Actions-Understanding-Reusable-Workflows/ci-cd-workflow-unit-testing-deployment.jpg)

The diagram above depicts a typical CI/CD pipeline for a Node.js application:

1.  **Unit Testing**
2.  **Code Coverage**
3.  **Dependency Scanning**
4.  **Build**
5.  **Deploy to Dev** (runs after build succeeds)
6.  **Deploy to Prod** (waits for Dev deployment)

Each deployment job consists of five granular steps (e.g., environment setup, artifact upload, feature flag toggles, smoke tests, notifications).

## Why Use Reusable Workflows?

Imagine your organization maintains services in Java, Python, .NET, Go, and more. While build and test commands differ, deployment steps—like provisioning infrastructure, uploading artifacts, and running smoke tests—tend to be identical. Reusable workflows centralize these shared steps:

| Programming Language | Build Tool   | Test Tool    | Deployment Steps                         |
| -------------------- | ------------ | ------------ | ---------------------------------------- |
| Java                 | Maven/Gradle | JUnit/TestNG | Provision → Deploy → Smoke Test → Notify |
| Python               | pip/Poetry   | pytest       | Provision → Deploy → Smoke Test → Notify |
| .NET                 | dotnet build | xUnit        | Provision → Deploy → Smoke Test → Notify |
| Go                   | go build     | go test      | Provision → Deploy → Smoke Test → Notify |
| Node.js              | npm/ Yarn    | Jest/Mocha   | Provision → Deploy → Smoke Test → Notify |

By extracting deployment logic into its own workflow, you avoid copy-pasting nearly identical YAML across repositories. Instead, each app’s pipeline can **call** the reusable deployment workflow.

---

## 1\. Extracting the Deployment Job

Let’s say you have a repository `xyz-org/nodejs-app-repo` with `.github/workflows/awesome-app.yml`:

```
# .github/workflows/awesome-app.yml
name: My Awesome App
on: push


jobs:
  unit-testing:
    # ... unit test definitions ...
  code-coverage:
    # ... code coverage definitions ...
  build:
    # ... build definitions ...
  dev-deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Step 1
        # ...
      - name: Step 2
        # ...
      - name: Step 3
        # ...
      - name: Step 4
        # ...
      - name: Step 5
        # ...
```

To DRY-up your CI/CD, move the `dev-deploy` job into its own reusable workflow file:

```
# .github/workflows/reusable-dev-deploy.yml
name: Reusable Dev-Deploy Workflow
on:
  workflow_call:


jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Step 1
        # ...
      - name: Step 2
        # ...
      - name: Step 3
        # ...
      - name: Step 4
        # ...
      - name: Step 5
        # ...
```

> [!important]
> **Note**
>
> The `on: workflow_call` trigger makes this workflow callable from other workflows. You can also define `inputs`, `outputs`, and `secrets` under `workflow_call` for advanced parameterization.

---

## 2\. Calling a Reusable Workflow

Back in `awesome-app.yml`, replace the inline `dev-deploy` job with a reference to the reusable workflow:

```
# .github/workflows/awesome-app.yml
name: My Awesome App
on: push


jobs:
  unit-testing:
    # ...
  code-coverage:
    # ...
  build:
    # ...
  dev-deploy:
    needs: build
    uses: ./.github/workflows/reusable-dev-deploy.yml
```

If the reusable workflow lives in another repository, reference it by `{owner}/{repo}/{path}@ref`:

```
jobs:
  dev-deploy:
    needs: build
    uses: my-org/common-workflows/.github/workflows/reusable-dev-deploy.yml@main
```

> [!important]
> **Warning**
>
> When calling workflows in private repositories, ensure the caller has appropriate permissions and that any required `secrets:` are declared in the called workflow’s `workflow_call` section.

---

## 3\. Inputs, Outputs, and Secrets

To make your reusable workflows more flexible:

- **Inputs** allow callers to pass parameters (e.g., environment name, version tag).
- **Outputs** let callers consume results (e.g., artifact URLs, deployment IDs).
- **Secrets** ensure sensitive data—like cloud credentials—are never exposed.

Example of declaring inputs and secrets in a reusable workflow:

```
# .github/workflows/reusable-dev-deploy.yml
on:
  workflow_call:
    inputs:
      env-name:
        description: 'Deployment environment'
        required: true
        type: string
    secrets:
      API_TOKEN:
        required: true


jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to ${{ inputs.env-name }}
        env:
          TOKEN: ${{ secrets.API_TOKEN }}
        # ...
```

---

## Benefits of Modular CI/CD with Reusable Workflows

- **Consistency:** Enforce the same deployment steps across all services.
- **Maintainability:** Update a single workflow file to propagate changes everywhere.
- **Scalability:** Easily onboard new projects by referencing prebuilt workflows.
- **Security:** Centralize and manage secrets in one place.

---

## Links and References

- [GitHub Actions: Reusing workflows](https://docs.github.com/actions/using-workflows/reusing-workflows)
- [GitHub Actions: Workflow syntax for GitHub Actions](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)
- [GitHub Actions: Workflow commands](https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/57481ffd-2f40-4d62-af84-5f992f6c92dc/lesson/6c328588-e2d3-465c-a245-ac854f3e5393)**
>
> Watch video content
