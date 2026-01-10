# Using a Composite Action in Workflow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Custom-Actions/Using-a-Composite-Action-in-Workflow)

---

## Table of Contents

- Using a Composite Action in Workflow
  - Original Workflow
  - Refactoring with a Composite Action
  - Comparison of Workflows
  - Defining the Composite Action
  - Running the Refactored Workflow
  - References
  - Watch Video

---

## Content

GitHub Actions

Custom Actions

# Using a Composite Action in Workflow

Integrating a composite action into your GitHub Actions workflow helps you DRY up repetitive steps—such as caching dependencies and installing packages—so your CI pipeline stays clean and maintainable.

## Original Workflow

The workflow below sets up Node.js, caches dependencies, installs packages, runs tests, and uploads test results:

```
name: CI
on:
  push:
    branches: [main]
jobs:
  test:
    strategy:
      matrix:
        operating_system: [ubuntu-latest]
        nodejs_version: [14, 16, 18]
      exclude:
        - nodejs_version: 18
          operating_system: macos-latest
    runs-on: ${{ matrix.operating_system }}
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4


      - name: Setup Node.js - ${{ matrix.nodejs_version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.nodejs_version }}


      - name: Cache NPM dependencies
        uses: actions/cache@v3
        with:
          path: node_modules
          key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}


      - name: Install Dependencies
        run: npm install


      - name: Unit Testing
        id: nodejs-unit-testing
        run: npm test


      - name: Archive Test Result
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: Mocha-Test-Result
          path: test-results.xml
```

## Refactoring with a Composite Action

Instead of repeating cache and install steps, reference a custom composite action stored under `.github/custom-actions/npm-action`:

```
jobs:
  test:
    runs-on: ${{ matrix.operating_system }}
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4


      - name: Setup Node.js - ${{ matrix.nodejs_version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.nodejs_version }}


      - name: Composite Action – Cache & Install NPM Packages
        uses: ./.github/custom-actions/npm-action
        with:
          path-of-folder: node_modules


      - name: Unit Testing
        id: nodejs-unit-testing
        run: npm test


      - name: Archive Test Result
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: Mocha-Test-Result
          path: test-results.xml
```

> [!important]
> **Note**
>
> You can omit the `action.yml` filename and simply point to the directory containing your composite action.

## Comparison of Workflows

| Phase           | Original Workflow                  | Refactored Workflow             |
| --------------- | ---------------------------------- | ------------------------------- |
| Checkout        | `actions/checkout@v4`              | `actions/checkout@v4`           |
| Setup Node.js   | `actions/setup-node@v3`            | `actions/setup-node@v3`         |
| Cache & Install | `actions/cache@v3` + `npm install` | Composite Action (`npm-action`) |
| Test            | `npm test`                         | `npm test`                      |
| Archive Results | `actions/upload-artifact@v3`       | `actions/upload-artifact@v3`    |

## Defining the Composite Action

Below is the `action.yml` for our reusable NPM composite action. It accepts a required `path-of-folder` input and runs cache & install steps:

```
name: 'NPM Custom Action'
description: 'Install and cache NPM packages'
inputs:
  path-of-folder:
    description: 'The path to cache'
    required: true
runs:
  using: composite
  steps:
    - name: Cache NPM dependencies
      uses: actions/cache@v3
      with:
        path: ${{ inputs.path-of-folder }}
        key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}


    - name: Install Dependencies
      run: npm install
      shell: bash
```

> [!important]
> **Warning**
>
> Every `run` step in a composite action must specify a `shell` (e.g., `bash`, `pwsh`, `sh`, `cmd`) depending on the runner OS.

![The image shows a GitHub Docs page detailing the workflow syntax for GitHub Actions, including supported platforms, shell parameters, and command run details. The left sidebar lists various topics related to GitHub Actions, such as using workflows and workflow syntax.](https://kodekloud.com/kk-media/image/upload/v1752876586/notes-assets/images/GitHub-Actions-Using-a-Composite-Action-in-Workflow/github-actions-workflow-syntax-docs.jpg)

## Running the Refactored Workflow

After committing your composite action and workflow changes, view the GitHub Actions dashboard. You’ll see the unified “Cache & Install NPM Packages” step replace the individual cache and install tasks across all jobs:

![The image shows a GitHub Actions workflow interface with a "solar-system.yml" file in progress. It displays a series of jobs including unit testing and code coverage, with a visual representation of the workflow steps.](https://kodekloud.com/kk-media/image/upload/v1752876587/notes-assets/images/GitHub-Actions-Using-a-Composite-Action-in-Workflow/github-actions-solar-system-workflow.jpg)

![The image shows a GitHub Actions workflow interface with a focus on a unit testing job for an Ubuntu environment. It details steps like setting up a job, initializing containers, and a composite action for caching and installing NPM packages.](https://kodekloud.com/kk-media/image/upload/v1752876588/notes-assets/images/GitHub-Actions-Using-a-Composite-Action-in-Workflow/github-actions-workflow-unit-testing.jpg)

![The image shows a GitHub Actions workflow interface with a series of jobs and their statuses, including unit testing, code coverage, and deployment steps.](https://kodekloud.com/kk-media/image/upload/v1752876590/notes-assets/images/GitHub-Actions-Using-a-Composite-Action-in-Workflow/github-actions-workflow-jobs-statuses.jpg)

By consolidating common operations into a composite action, you keep workflows consistent and scalable. To share your action with the community, consider publishing it on the [GitHub Marketplace](https://github.com/marketplace).

## References

- [GitHub Actions: Creating a Composite Action](https://docs.github.com/en/actions/creating-actions/creating-a-composite-action)
- [GitHub Marketplace](https://github.com/marketplace)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/cdb7c2b7-442d-440c-a4f1-d6679733ffd8/lesson/3288cb0d-e893-4319-96b2-ed558f98264e)**
>
> Watch video content
