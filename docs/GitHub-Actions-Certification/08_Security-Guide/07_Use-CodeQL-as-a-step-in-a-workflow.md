# Use CodeQL as a step in a workflow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Security-Guide/Use-CodeQL-as-a-step-in-a-workflow)

---

## Table of Contents

- Use CodeQL as a step in a workflow
  - What Is CodeQL Code Scanning?
  - Two Ways to Enable CodeQL
  - 1. Enable via Repository Settings
  - 2. Configure a CodeQL Workflow
  - Reviewing CodeQL Results
  - Best Practices
  - Links and References
  - Watch Video
  - Practice Lab
    - Example: Unsafe Database Query

---

## Content

GitHub Actions Certification

Security Guide

# Use CodeQL as a step in a workflow

In this guide, you’ll learn how to integrate GitHub’s CodeQL code scanning into your CI processes. CodeQL analyzes your source code to uncover security vulnerabilities by running community- and GitHub Security Lab–maintained queries. Results appear on pull requests and in the repository’s Security tab.

## What Is CodeQL Code Scanning?

Code scanning is a built-in GitHub feature that uses the CodeQL semantic analysis engine. It runs queries against your codebase, surfaces potential security issues, and helps you track and resolve them before they reach production.

## Two Ways to Enable CodeQL

| Method                                | Description                                         |
| ------------------------------------- | --------------------------------------------------- |
| Repository Settings                   | Turn on CodeQL under **Settings → Security**.       |
| GitHub Actions Workflow (recommended) | Add a `.github/workflows/codeql.yml` workflow file. |

## 1\. Enable via Repository Settings

1.  Navigate to **Settings → Security → Code security and analysis**.
2.  Scroll to **CodeQL analysis** and toggle it on.

![The image shows a GitHub settings page for code security and analysis, featuring options for Dependabot updates, CodeQL analysis, protection rules, and secret scanning.](https://kodekloud.com/kk-media/image/upload/v1752876412/notes-assets/images/GitHub-Actions-Certification-Use-CodeQL-as-a-step-in-a-workflow/github-settings-code-security-analysis.jpg)

## 2\. Configure a CodeQL Workflow

1.  Open the **Actions** tab.
2.  Search for **CodeQL Analysis** and select the starter workflow.

![The image shows a GitHub Actions setup page for a repository, highlighting the "CodeQL Analysis" workflow for security analysis.](https://kodekloud.com/kk-media/image/upload/v1752876413/notes-assets/images/GitHub-Actions-Certification-Use-CodeQL-as-a-step-in-a-workflow/github-actions-codeql-analysis-setup.jpg)

This creates `.github/workflows/codeql.yml`. Below is a **minimal** example you can customize:

```
name: "CodeQL"

on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]
  schedule:
    - cron: '30 13 * * 4'       # Runs weekly on Thursday

jobs:
  analyze:
    name: Analyze (${{ matrix.language }})
    runs-on: ${{ matrix.language == 'swift' && 'macos-latest' || 'ubuntu-latest' }}
    timeout-minutes: ${{ matrix.language == 'swift' && 120 || 360 }}
    permissions:
      security-events: write
      actions: read
      contents: read

    strategy:
      fail-fast: false
      matrix:
        include:
          - language: javascript-typescript
            build-mode: none
            # Other options: c-cpp, csharp, go, java-kotlin, python, ruby, swift

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: ${{ matrix.language }}
          build-mode: ${{ matrix.build-mode }}
          # queries: security-extended, security-and-quality

      - name: Build (manual mode)
        if: matrix.build-mode == 'manual'
        run: |
          echo "Replace this with your project's build steps, e.g.:"
          echo "make build"
          exit 1

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
        with:
          category: '/language:${{ matrix.language }}'
```

> [!important]
> **Note**
>
> Adjust the `build-mode` and add any custom `run` commands needed to compile your project before analysis.

Commit this file to trigger your first CodeQL run. Monitor progress in **Actions**.

![The image shows a GitHub Actions interface running a CodeQL analysis job for a JavaScript/TypeScript project. The job has succeeded, and the logs detail the steps taken during the analysis.](https://kodekloud.com/kk-media/image/upload/v1752876414/notes-assets/images/GitHub-Actions-Certification-Use-CodeQL-as-a-step-in-a-workflow/github-actions-codeql-analysis-success.jpg)

## Reviewing CodeQL Results

When the workflow completes, findings are uploaded to GitHub. Go to **Security → Code scanning** to see alerts:

![The image shows a GitHub code scanning interface with three open security alerts, including issues like "Database query built from user-controlled sources" and "Missing rate limiting," all marked with high severity.](https://kodekloud.com/kk-media/image/upload/v1752876415/notes-assets/images/GitHub-Actions-Certification-Use-CodeQL-as-a-step-in-a-workflow/github-code-scanning-security-alerts.jpg)

Click an alert to view:

- Rule ID
- Severity level
- CWE identifier
- Vulnerable code snippet

### Example: Unsafe Database Query

```
app.post('/planet', (req, res) => {
  planetModel.findOne(
    { id: req.body.id },
    (err, planetData) => {
      if (err) {
        res.status(400).send("Error in Planet Data");
      }
    }
  );
});
```

Directly using `req.body.id` in a query can lead to injection attacks. CodeQL recommends parameterized queries or sanitization, for instance:

```
// GOOD: Parameterized query to avoid injection
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  pool.query(
    'SELECT * FROM users WHERE id = $1',
    [id],
    (err, results) => {
      if (err) throw err;
      res.json(results.rows);
    }
  );
});
```

## Best Practices

- Run CodeQL on every pull request to catch issues early.
- Customize queries via the `queries` input.
- Dismiss false positives or open issues for confirmed vulnerabilities.
- Regularly update the CodeQL Action versions (`init@v3`, `analyze@v3`).

## Links and References

- [GitHub Code Scanning Documentation](https://docs.github.com/en/code-security/code-scanning)
- [CodeQL Action on GitHub Marketplace](https://github.com/marketplace/actions/codeql-analysis)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

By embedding CodeQL into your CI workflow, you automate continuous security analysis with minimal setup—helping you catch and fix vulnerabilities before they hit production.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/a3e810f5-af92-4e1c-ac54-bdf50ddbe9cf/lesson/4b9846be-ddf6-4ddb-b8b2-88e6b7ae59e8)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/github-actions-certification/module/a3e810f5-af92-4e1c-ac54-bdf50ddbe9cf/lesson/5b5e2c07-2e6a-4e9a-bf2f-38725f011faa)**
>
> Practice lab
