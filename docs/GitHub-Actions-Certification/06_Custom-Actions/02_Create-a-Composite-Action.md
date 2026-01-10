# Create a Composite Action - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Custom-Actions/Create-a-Composite-Action)

---

## Table of Contents

- Create a Composite Action
  - Table of Contents
  - Action Metadata Overview
  - Use Case: Caching & Installing Dependencies
  - Sample Workflow Before Refactoring
  - Defining the Composite Action
  - Using Your Composite Action
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Custom Actions

# Create a Composite Action

In this tutorial, you’ll learn how to package common CI/CD steps—caching and installing NPM dependencies—into a reusable **composite GitHub Action**. By extracting these steps, you reduce duplication across jobs and maintain a single source of truth.

## Table of Contents

- [Action Metadata Overview](#action-metadata-overview)
- [Use Case: Caching & Installing Dependencies](#use-case-caching--installing-dependencies)
- [Sample Workflow Before Refactoring](#sample-workflow-before-refactoring)
- [Defining the Composite Action](#defining-the-composite-action)
- [Using Your Composite Action](#using-your-composite-action)
- [Links and References](#links-and-references)

## Action Metadata Overview

Every custom GitHub Action requires a metadata file (`action.yml` or `action.yaml`). At minimum, include:

- **name**: Visual identifier
- **description**: Short summary
- **inputs/outputs** (optional): Dynamic parameters
- **runs**: Runtime configuration

| Runtime Type | Syntax Example                                                                          |
| ------------ | --------------------------------------------------------------------------------------- |
| JavaScript   | `yaml<br>runs:<br> using: 'node20'<br> main: 'main.js'<br>`                             |
| Docker       | `yaml<br>runs:<br> using: 'docker'<br> image: 'Dockerfile'<br>`                         |
| Composite    | `yaml<br>runs:<br> using: 'composite'<br> steps:<br> # series of run or uses steps<br>` |

> [!important]
> **Note**
>
> Composite actions let you chain multiple `uses:` and `run:` steps, apply `if` conditions, and even define `pre`/`post` scripts. They don’t require separate Docker or Node environments.

Optionally, add **branding** for the GitHub Marketplace:

```
branding:
  icon: 'award'
  color: 'green'
```

## Use Case: Caching & Installing Dependencies

Imagine a CI workflow with two jobs—**Unit Testing** and **Code Coverage**—both executing:

1.  Checkout repository
2.  Set up Node.js
3.  Cache NPM dependencies
4.  Install dependencies

Steps 3 and 4 are identical in both jobs. Extracting them into a composite Action improves maintainability.

## Sample Workflow Before Refactoring

```
jobs:
  unit-testing:
    name: Unit Testing
    runs-on: ubuntu-latest
    strategy:
      matrix:
        nodejs_version: [18, 20]
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4


      - name: Setup Node.js ${{ matrix.nodejs_version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.nodejs_version }}


      - name: Cache NPM dependencies
        uses: actions/cache@v3
        with:
          path: node_modules
          key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}


      - name: Install dependencies
        run: npm install
```

The **Code Coverage** job repeats the same `cache` and `install` steps. Let’s extract them next.

## Defining the Composite Action

1.  Create a directory for custom actions:

    ```
    .github/
    └── custom-actions/
        └── npm-action/
            └── action.yml
    ```

2.  Populate `action.yml`:

    ```
    name: 'NPM Cache & Install'
    description: 'Composite action to cache and install NPM packages'
    inputs:
      cache-folder:
        description: 'Directory to cache (e.g., node_modules)'
        required: true
        default: 'node_modules'
    runs:
      using: 'composite'
      steps:
        - name: Cache dependencies
          uses: actions/cache@v3
          with:
            path: ${{ inputs.cache-folder }}
            key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}


        - name: Install dependencies
          run: npm install
          shell: bash
    ```

- **Inputs**
  - `cache-folder`: Makes the cache path configurable.
- **Steps**
  - Reproduce the original cache and install commands.

> [!important]
> **Warning**
>
> Composite actions currently **do not support** Docker-level isolation. All steps run in the same default environment.

## Using Your Composite Action

Update your workflow jobs to replace separate cache and install steps with one `uses:` entry:

```
jobs:
  unit-testing:
    name: Unit Testing
    runs-on: ubuntu-latest
    strategy:
      matrix:
        nodejs_version: [18, 20]
    steps:
      - uses: actions/checkout@v4


      - name: Setup Node.js ${{ matrix.nodejs_version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.nodejs_version }}


      - name: Cache & install dependencies
        uses: ./.github/custom-actions/npm-action
        with:
          cache-folder: 'node_modules'
```

Repeat the same `uses:` step in **Code Coverage** or any other job. Now both jobs share a single, maintainable action.

## Links and References

- [GitHub Actions: Creating a composite run steps action](https://docs.github.com/en/actions/creating-actions/creating-a-composite-run-steps-action)
- [actions/cache](https://github.com/actions/cache)
- [actions/setup-node](https://github.com/actions/setup-node)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/428391ee-45d0-4e9c-9e06-78d0c5ff7657/lesson/eeb5b8cc-c962-4ea4-998e-4ea1327b0064)**
>
> Watch video content
