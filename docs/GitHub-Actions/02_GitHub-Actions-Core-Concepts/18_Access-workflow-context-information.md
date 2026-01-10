# Access workflow context information - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/GitHub-Actions-Core-Concepts/Access-workflow-context-information)

---

## Table of Contents

- Access workflow context information
  - What are contexts?
  - Runner context
  - Workflow example: dumping contexts
  - Viewing workflow runs
  - Inspecting logs
  - Examples
  - Links and References
  - Watch Video
    - GitHub context JSON
    - Repository & user metadata
    - Job, steps, and runner context output

---

## Content

GitHub Actions

GitHub Actions Core Concepts

# Access workflow context information

In GitHub Actions, contexts expose metadata and runtime variables that help you automate, customize conditional logic, and debug workflows. This guide shows you how to access and dump various contexts—such as `github`, `runner`, `job`, `steps`, and `secrets`—to better understand what data is available during a workflow run.

## What are contexts?

A _context_ in GitHub Actions is a set of predefined objects containing information about the event payload, workflow, jobs, steps, secrets, runner environment, and more. You can reference any context property using the `${{ }}` syntax.

![The image shows a GitHub Docs page about "Contexts" in GitHub Actions, explaining how to access context information in workflows and actions. It includes a warning about security considerations when using contexts.](https://kodekloud.com/kk-media/image/upload/v1752876610/notes-assets/images/GitHub-Actions-Access-workflow-context-information/github-actions-contexts-docs-security-warning.jpg)

| Context | Description                                          | Example                       |
| ------- | ---------------------------------------------------- | ----------------------------- |
| github  | Event, repository, run identifiers                   | `${{ github.repository }}`    |
| runner  | Environment details for the runner executing the job | `${{ runner.os }}`            |
| job     | Status and outcome of the current job                | `${{ job.status }}`           |
| steps   | Outcomes and outputs of previous steps               | `${{ steps.build.outcome }}`  |
| secrets | Encrypted values injected at runtime                 | `${{ secrets.GITHUB_TOKEN }}` |

## Runner context

The runner context provides properties like `runner.name`, `runner.os`, `runner.arch`, and more. These can drive conditional logic:

```
if: runner.os == 'Linux'
```

![The image shows a GitHub Docs page detailing the "runner context" in GitHub Actions, including property names, types, and descriptions related to the runner executing a job.](https://kodekloud.com/kk-media/image/upload/v1752876611/notes-assets/images/GitHub-Actions-Access-workflow-context-information/github-actions-runner-context-docs.jpg)

## Workflow example: dumping contexts

The following `context-testing.yml` workflow runs on every push and uses the `toJSON` function to serialize contexts, then echoes them to the log.

```
name: Context testing
on: push


jobs:
  dump_contexts_to_log:
    runs-on: ubuntu-latest
    steps:
      - name: Dump GitHub context
        env:
          GITHUB_CONTEXT: ${{ toJSON(github) }}
        run: echo "$GITHUB_CONTEXT"


      - name: Dump job context
        env:
          JOB_CONTEXT: ${{ toJSON(job) }}
        run: echo "$JOB_CONTEXT"


      - name: Dump steps context
        env:
          STEPS_CONTEXT: ${{ toJSON(steps) }}
        run: echo "$STEPS_CONTEXT"


      - name: Dump runner context
        env:
          RUNNER_CONTEXT: ${{ toJSON(runner) }}
        run: echo "$RUNNER_CONTEXT"


      - name: Dump secrets context
        env:
          SECRET_CONTEXT: ${{ toJSON(secrets) }}
        run: echo "$SECRET_CONTEXT"
```

![The image shows a GitHub Docs page about GitHub Actions, specifically focusing on the "secrets context" used in workflows. It includes a warning about printing secrets and a table describing properties related to secrets.](https://kodekloud.com/kk-media/image/upload/v1752876612/notes-assets/images/GitHub-Actions-Access-workflow-context-information/github-actions-secrets-context-docs.jpg)

> [!important]
> **Warning**
>
> Never print secrets unmasked in public logs. Secrets may appear in the output of `toJSON(secrets)` if not handled securely.

You can dump additional contexts like `strategy` or `matrix`, or reference individual secrets via `secrets.<NAME>` (for example, `secrets.GITHUB_TOKEN`).

## Viewing workflow runs

After pushing this workflow, navigate to the **Actions** tab to see the run in progress or completed status.

![The image shows a GitHub Actions page displaying a list of workflow runs with their statuses, branches, and timestamps. The interface is in dark mode, and some workflows are queued while others have completed.](https://kodekloud.com/kk-media/image/upload/v1752876613/notes-assets/images/GitHub-Actions-Access-workflow-context-information/github-actions-workflow-runs-dark-mode.jpg)

## Inspecting logs

Once the workflow completes, open the job logs to view the dumped context values.

![The image shows a GitHub Actions log with details of a workflow run, including commit information and repository URLs.](https://kodekloud.com/kk-media/image/upload/v1752876614/notes-assets/images/GitHub-Actions-Access-workflow-context-information/github-actions-workflow-log-details.jpg)

---

## Examples

### GitHub context JSON

```
{
  "token": "****",
  "job": "dump_contexts_to_log",
  "ref": "refs/heads/main",
  "sha": "ab3c8b9cd23c8b0154se48e279bad3c8f8c6460",
  "repository": "sidd-harth-7/actions-1",
  "repository_owner": "sidd-harth-7",
  "repository_owner_id": "147390322",
  "repositoryUrl": "git://github.com/sidd-harth-7/actions-1.git",
  "run_id": "6492400732",
  "run_number": "9",
  "run_attempt": "1",
  "artifact_cache_size_limit": "10",
  "repository_visibility": "public",
  "github_actions_self_hosted_runners_disabled": "false",
  "runner": {
    "id": "729428629"
  }
}
```

### Repository & user metadata

```
{
  "id": 147799322,
  "login": "sidd-harth-7",
  "node_id": "U_kD0CMJ_cg",
  "organizations_url": "https://api.github.com/users/sidd-harth-7/orgs",
  "received_events_url": "https://api.github.com/users/sidd-harth-7/received_events",
  "repos_url": "https://api.github.com/users/sidd-harth-7/repos",
  "site_admin": false,
  "type": "User",
  "private": false,
  "ssh_url": "git@github.com:sidd-harth-7/actions-1.git",
  "svn_url": "https://github.com/sidd-harth-7/actions-1",
  "updated_at": "2023-10-13T11:16:55Z"
}
```

### Job, steps, and runner context output

```
Run echo "$JOB_CONTEXT"
{
  "status": "success"
}


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
```

Finally, the **secrets** context will list available workflow secrets like `GITHUB_TOKEN` and any custom secrets you’ve configured.

---

## Links and References

- [Contexts in GitHub Actions (official docs)](https://docs.github.com/en/actions/learn-github-actions/contexts)
- [GitHub Actions: Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/0ac6c98f-7100-471e-b9aa-037f25cb58d7/lesson/126b4d57-8844-47d4-abab-1b406d8e6624)**
>
> Watch video content
