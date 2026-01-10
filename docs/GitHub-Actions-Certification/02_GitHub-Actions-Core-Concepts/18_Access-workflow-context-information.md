# Access workflow context information - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/GitHub-Actions-Core-Concepts/Access-workflow-context-information)

---

## Table of Contents

- Access workflow context information
  - What Are Contexts?
  - Sample Workflow: Dumping Contexts
  - Using the Runner Context
  - Viewing Context Output in Logs
  - More Contexts to Explore
  - References
  - Watch Video
    - Context Output Explained

---

## Content

GitHub Actions Certification

GitHub Actions Core Concepts

# Access workflow context information

In this guide, you’ll learn how to access and inspect contexts in a GitHub Actions workflow. Contexts are predefined objects containing data about the workflow run, environment, events, secrets, jobs, steps, and more. Use them to drive conditional logic or dynamically configure your pipeline.

## What Are Contexts?

A **context** is a JSON object with properties you can reference in your workflow using `${{ }}` syntax. Common contexts include:

| Context | Description                         | Example Property          |
| ------- | ----------------------------------- | ------------------------- |
| github  | Repository, run, and event details  | `github.sha`              |
| job     | Job-level metadata                  | `job.status`              |
| steps   | Output and status of previous steps | `steps.step_id.outcome`   |
| runner  | Runner environment information      | `runner.os`               |
| secrets | Encrypted secrets available to jobs | `secrets.DOCKER_PASSWORD` |

To view every context object in your workflow logs, serialize it to JSON with the `toJson()` function.

![The image shows a GitHub Docs page about "Contexts" in GitHub Actions, explaining how to access context information in workflows and actions. It includes a warning about security considerations when using contexts.](https://kodekloud.com/kk-media/image/upload/v1752876107/notes-assets/images/GitHub-Actions-Certification-Access-workflow-context-information/github-actions-contexts-docs-security-warning.jpg)

> [!important]
> **Note**
>
> Combine context lookups with [GitHub expressions](https://docs.github.com/en/actions/learn-github-actions/expressions) for powerful conditional statements.

## Sample Workflow: Dumping Contexts

Create a file named `context-testing.yml` in `.github/workflows/`:

```
name: Context testing
on: push


jobs:
  dump_contexts_to_log:
    runs-on: ubuntu-latest
    steps:
      - name: Dump GitHub context
        env:
          GITHUB_CONTEXT: ${{ toJson(github) }}
        run: echo "$GITHUB_CONTEXT"


      - name: Dump job context
        env:
          JOB_CONTEXT: ${{ toJson(job) }}
        run: echo "$JOB_CONTEXT"


      - name: Dump steps context
        env:
          STEPS_CONTEXT: ${{ toJson(steps) }}
        run: echo "$STEPS_CONTEXT"


      - name: Dump runner context
        env:
          RUNNER_CONTEXT: ${{ toJson(runner) }}
        run: echo "$RUNNER_CONTEXT"


      - name: Dump secrets context
        env:
          SECRET_CONTEXT: ${{ toJson(secrets) }}
        run: echo "$SECRET_CONTEXT"
```

> [!important]
> **Warning**
>
> Never expose secrets in public or shared logs. Printing `toJson(secrets)` can reveal sensitive data if your repository or runner is not private.

![The image shows a GitHub Docs page about GitHub Actions contexts, specifically focusing on the "secrets" context, with a warning about printing secrets to the log. The page includes a sidebar with navigation links and example content of the secrets context.](https://kodekloud.com/kk-media/image/upload/v1752876108/notes-assets/images/GitHub-Actions-Certification-Access-workflow-context-information/github-actions-secrets-context-warning.jpg)

## Using the Runner Context

The `runner` context lets you customize steps based on the hosted environment. You can check:

- `runner.os` (e.g., `Windows`, `Linux`, `macOS`)
- `runner.arch` (e.g., `X64`, `ARM64`)
- `runner.name` (runner label)
- `runner.tool_cache` paths

This is invaluable for installing platform-specific tools or setting environment variables.

When you push your changes, navigate to the **Actions** tab. You’ll see your **Context testing** workflow alongside other runs.

![The image shows a GitHub Actions interface with a list of workflow runs, displaying their status, branch, and other details. The interface is dark-themed, and some workflows are queued while others have completed.](https://kodekloud.com/kk-media/image/upload/v1752876110/notes-assets/images/GitHub-Actions-Certification-Access-workflow-context-information/github-actions-workflow-runs-status.jpg)

## Viewing Context Output in Logs

After the workflow completes, expand each step in the log to inspect the JSON output:

```
Run echo "$GITHUB_CONTEXT"
{
  "token": "***",
  "job": "dump_contexts_to_log",
  "ref": "refs/heads/main",
  "sha": "ab3c0b9cd32c801545a48e279bad3cf8c6460",
  "repository": "sidd-harth-7/actions-1",
  "repository_owner": "sidd-harth-7",
  "run_id": "6492400732",
  "run_number": 1,
  "retention_days": 90,
  "repository_visibility": "public",
  "service-managed-business-id": ""
}


Run echo "$JOB_CONTEXT"
{ "status": "success" }


Run echo "$STEPS_CONTEXT"
{}


Run echo "$RUNNER_CONTEXT"
{
  "os": "Linux",
  "arch": "X64",
  "name": "GitHub Actions 3",
  "environment": "github-hosted",
  "tool_cache": "/opt/hostedtoolcache",
  "temp": "/home/runner/work/_temp",
  "workspace": "/home/runner/work/actions-1"
}


Run echo "$SECRET_CONTEXT"
{
  "github_token": "****",
  "DOCKER_PASSWORD": "****"
}
```

### Context Output Explained

- **GitHub context**: repo details, event information, commit SHA.
- **Job context**: job status (`success`, `failure`, etc.).
- **Steps context**: empty until steps define outputs.
- **Runner context**: VM details like OS, architecture, workspace paths.
- **Secrets context**: all accessible secrets (values are masked).

## More Contexts to Explore

GitHub Actions offers additional contexts for advanced workflows:

- `matrix`: Values from a strategy matrix.
- `needs`: Outputs and statuses of dependent jobs.
- `inputs`: Action inputs for reusable workflows.
- `env`: Custom environment variables.

![The image shows a GitHub Docs page about the "runner context" in GitHub Actions, detailing properties like `runner.name`, `runner.os`, and `runner.arch`. The sidebar lists various contexts and features related to GitHub Actions.](https://kodekloud.com/kk-media/image/upload/v1752876112/notes-assets/images/GitHub-Actions-Certification-Access-workflow-context-information/github-actions-runner-context-docs.jpg)

## References

- [GitHub Actions Contexts](https://docs.github.com/actions/learn-github-actions/contexts)
- [GitHub Expressions](https://docs.github.com/actions/learn-github-actions/expressions)
- [Workflow syntax for GitHub Actions](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/54711be0-66e6-461b-b935-f77d78a5e000/lesson/640e1dcd-582a-4d38-ad92-b393f3c53342)**
>
> Watch video content
