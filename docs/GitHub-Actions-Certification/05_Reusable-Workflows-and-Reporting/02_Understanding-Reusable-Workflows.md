# Understanding Reusable Workflows - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Reusable-Workflows-and-Reporting/Understanding-Reusable-Workflows)

---

## Table of Contents

- Understanding Reusable Workflows
  - Sample CI Workflow for a Node.js App
  - Why Use Reusable Workflows?
  - Example Repository Layout
  - Invoking the Reusable Workflow
  - Key Terminology
  - Links and References
  - Watch Video
    - Original Workflow: awesome-app.yaml
    - Reusable Workflow: reusable-workflow.yaml

---

## Content

GitHub Actions Certification

Reusable Workflows and Reporting

# Understanding Reusable Workflows

By centralizing common jobs—like deployment—into standalone workflows, you can reduce duplication, simplify updates, and enforce best practices across all your repositories. This guide shows you how to extract deployment logic into a reusable workflow and invoke it from language-specific CI pipelines.

## Sample CI Workflow for a Node.js App

Here’s an example `.github/workflows/ci-testing.yml` that runs tests, coverage, dependency scanning, build, and deployments in sequence:

```
name: CI Workflow
on: push

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        os: [macos-latest, ubuntu-latest, windows-latest]
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run unit tests
        run: npm test

  code-coverage:
    needs: unit-tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Generate coverage report
        run: npm run coverage

  dependency-scan:
    needs: code-coverage
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Scan for vulnerabilities
        run: npm audit

  build:
    needs: dependency-scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build application
        run: npm run build

  deploy-dev:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      - name: Authenticate to DEV
        run: echo "Authenticating to DEV"
      - name: Deploy to development
        run: echo "Deploying to development environment"
      - name: Notify team
        run: echo "Development deployment complete"

  deploy-prod:
    needs: deploy-dev
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      - name: Authenticate to PROD
        run: echo "Authenticating to PROD"
      - name: Deploy to production
        run: echo "Deploying to production environment"
      - name: Notify team
        run: echo "Production deployment complete"
```

> [!important]
> **Warning**
>
> Copy-pasting deployment steps across multiple workflows leads to fragmented updates and higher maintenance costs. A single change requires edits in every file.

## Why Use Reusable Workflows?

A **reusable workflow** is a YAML file that other workflows can invoke via `workflow_call`. Benefits include:

| Benefit              | Description                                              |
| -------------------- | -------------------------------------------------------- |
| Avoid duplication    | Define deployment logic once and reuse everywhere.       |
| Simplify maintenance | Update a single file to apply changes organization-wide. |
| Enforce standards    | Share audited, best-practice workflows across teams.     |

## Example Repository Layout

Assume the following structure in your `XYZ/nodejs-app-repo`:

- `.github/workflows/awesome-app.yaml`
- `.github/workflows/reusable-workflow.yaml`

### Original Workflow: awesome-app.yaml

This caller workflow builds the app, runs tests, and then invokes the reusable deployment job:

```
name: My Awesome App
on: push

jobs:
  unit-testing:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm test

  code-coverage:
    needs: unit-testing
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm run coverage

  build:
    needs: code-coverage
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm run build

  dev-deploy:
    needs: build
    uses: ./.github/workflows/reusable-workflow.yaml
    with:
      environment: development
    secrets:
      DEPLOY_TOKEN: ${{ secrets.DEV_DEPLOY_TOKEN }}
```

### Reusable Workflow: reusable-workflow.yaml

By declaring `on.workflow_call`, you expose inputs, secrets, and jobs that any caller workflow can use:

```
name: Reusable Deployment
on:
  workflow_call:
    inputs:
      environment:
        type: string
        required: true
    secrets:
      DEPLOY_TOKEN:
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Authenticate with cloud
        run: echo "Authenticating for ${{ inputs.environment }} using ${{ secrets.DEPLOY_TOKEN }}"

      - name: Deploy to ${{ inputs.environment }}
        run: echo "Deploying to ${{ inputs.environment }} environment"

      - name: Notify team
        run: echo "${{ inputs.environment }} deployment complete"
```

## Invoking the Reusable Workflow

You can call this reusable workflow from _any_ repository or branch:

```
dev-deploy:
  needs: build
  uses: ./.github/workflows/reusable-workflow.yaml
  with:
    environment: development
  secrets:
    DEPLOY_TOKEN: ${{ secrets.DEV_DEPLOY_TOKEN }}

prod-deploy:
  needs: dev-deploy
  uses: ./.github/workflows/reusable-workflow.yaml
  with:
    environment: production
  secrets:
    DEPLOY_TOKEN: ${{ secrets.PROD_DEPLOY_TOKEN }}
```

> [!important]
> **Note**
>
> Inputs and secrets are strongly typed. Ensure that every `workflow_call` declaration and invocation matches the expected names and types.

## Key Terminology

- **Caller workflow**: The YAML file that uses `uses:` to invoke a reusable workflow.
- **Called workflow**: The reusable workflow that declares `on.workflow_call`.

## Links and References

- [GitHub Actions: Reusing workflows](https://docs.github.com/actions/learn-github-actions/reusing-workflows)
- [GitHub Actions: Workflow syntax](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions)
- [actions/checkout](https://github.com/actions/checkout)
- [actions/setup-node](https://github.com/actions/setup-node)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/da8706ee-24ab-41a1-916d-da8232ca028e/lesson/0e2de6f2-1dde-44bc-b811-26879e55f770)**
>
> Watch video content
