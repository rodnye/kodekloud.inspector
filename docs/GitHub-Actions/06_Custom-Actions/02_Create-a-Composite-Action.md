# Create a Composite Action - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Custom-Actions/Create-a-Composite-Action)

---

## Table of Contents

- Create a Composite Action
  - Metadata File Basics
  - runs Syntax for Composite Actions
  - Example: npm-custom-action
  - Using the Composite Action
  - Conclusion
  - Links and References
  - Watch Video
    - How It Works

---

## Content

GitHub Actions

Custom Actions

# Create a Composite Action

Composite actions let you encapsulate multiple workflow steps into a single, reusable GitHub Actions component. In this guide, you’ll learn how to author a composite action from scratch, define its metadata, and integrate it into your workflows.

## Metadata File Basics

Every custom GitHub Action requires a metadata file named `action.yml` or `action.yaml`. This file uses [YAML syntax](https://yaml.org/) to describe your action’s configuration:

| Key           | Required | Description                                            |
| ------------- | -------- | ------------------------------------------------------ |
| `name`        | Yes      | A unique identifier for the action.                    |
| `description` | No       | A short summary of what the action does.               |
| `author`      | No       | The creator or maintainer of the action.               |
| `inputs`      | No       | Define parameters your action accepts.                 |
| `outputs`     | No       | Expose values for downstream steps.                    |
| `runs`        | Yes      | Specifies how the action executes (e.g., `composite`). |
| `branding`    | No       | Marketplace icon and color settings.                   |

> [!important]
> **Note**
>
> Learn more about metadata syntax in the [GitHub Actions docs](https://docs.github.com/actions/creating-actions/metadata-syntax-for-github-actions).

## `runs` Syntax for Composite Actions

To bundle multiple workflow steps, set `using: "composite"` under `runs`. You can then list any combination of `uses`, `run`, `if`, `shell`, or `id` fields as you would in a standard workflow.

```
runs:
  using: "composite"
  steps:
    - name: Check out code
      uses: actions/checkout@v4


    - name: Run a script
      run: echo "Hello from composite!"
```

Reference inputs with `${{ inputs.INPUT_NAME }}` and step outputs with `${{ steps.STEP_ID.outputs.OUTPUT_NAME }}`.

## Example: `npm-custom-action`

Let’s create a composite action to cache and install npm dependencies. Save this file as  
`.github/custom-actions/npm-action/action.yml` in your repository:

```
name: "npm-custom-action"
description: "Cache and install npm dependencies"
inputs:
  cache-path:
    description: "Directory to cache (e.g., node_modules)"
    required: true
    default: "node_modules"
runs:
  using: "composite"
  steps:
    - name: Cache npm dependencies
      uses: actions/cache@v3
      with:
        path: ${{ inputs.cache-path }}
        key: ${{ runner.os }}-node-modules-${{ hashFiles('package-lock.json') }}


    - name: Install dependencies
      run: npm install
```

### How It Works

1.  **Inputs**
    - `cache-path`: Specifies which folder to cache (defaults to `node_modules`).
2.  **Steps**
    - **Cache npm dependencies**: Uses [`actions/cache@v3`](https://github.com/actions/cache) to store and restore the specified directory.
    - **Install dependencies**: Runs `npm install` to fetch packages.

## Using the Composite Action

In your main workflow (e.g., `.github/workflows/ci.yml`), replace the redundant caching and install steps with your new composite action:

```
name: CI Pipeline


on: [push, pull_request]


jobs:
  unit-testing:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20]


    steps:
      - uses: actions/checkout@v4


      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}


      - name: Prepare npm
        uses: ./.github/custom-actions/npm-action
        with:
          cache-path: node_modules


      - name: Run tests
        run: npm test


      - name: Archive test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: test-results.xml
```

> [!important]
> **Note**
>
> You can reference the composite action via its relative path (`./.github/custom-actions/npm-action`). Pass inputs under `with:` just like any other action.

## Conclusion

By defining a composite action, you can centralize common steps—such as caching and installation—into a single reusable unit. This reduces duplication across workflows and simplifies maintenance. For advanced scenarios, consider adding:

- Output parameters to pass data downstream
- Conditional steps (`if`) for dynamic behavior
- [Branding options](https://docs.github.com/actions/creating-actions/metadata-syntax-for-github-actions#branding) for Marketplace listings

## Links and References

- [GitHub Actions Metadata Syntax](https://docs.github.com/actions/creating-actions/metadata-syntax-for-github-actions)
- [Composite run steps actions](https://docs.github.com/actions/creating-actions/creating-a-composite-run-steps-action)
- [actions/cache GitHub Repository](https://github.com/actions/cache)
- [actions/setup-node GitHub Repository](https://github.com/actions/setup-node)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/cdb7c2b7-442d-440c-a4f1-d6679733ffd8/lesson/0195056d-566c-4381-a10c-b791b5ebc03f)**
>
> Watch video content
