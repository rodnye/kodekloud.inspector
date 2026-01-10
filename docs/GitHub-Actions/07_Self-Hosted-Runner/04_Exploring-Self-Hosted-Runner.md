# Exploring Self Hosted Runner - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Self-Hosted-Runner/Exploring-Self-Hosted-Runner)

---

## Table of Contents

- Exploring Self Hosted Runner
  - Table of Contents
  - 1. Starting the Runner
  - 2. Diagnostic Directory (\_diag/)
  - 3. Workflow Workspace (\_work/)
  - 4. Running a Long-Running Workflow
  - 5. Inspecting Pipeline Mapping
  - 6. Exploring the \_temp Folder
  - 7. Runner File Commands
  - 8. Live Diagnostics
  - 9. Cleanup and Termination
  - Watch Video

---

## Content

GitHub Actions

Self Hosted Runner

# Exploring Self Hosted Runner

Understand how GitHub Actions self-hosted runners organize files into `_diag/` (diagnostics) and `_work/` (workflow workspace). This guide helps you troubleshoot connectivity, inspect logs, and debug live jobs.

## Table of Contents

1.  [Starting the Runner](#starting-the-runner)
2.  [Diagnostic Directory (`_diag/`)](#diagnostic-directory-_diag)
3.  [Workflow Workspace (`_work/`)](#workflow-workspace-_work)
4.  [Running a Long-Running Workflow](#running-a-long-running-workflow)
5.  [Inspecting Pipeline Mapping](#inspecting-pipeline-mapping)
6.  [Exploring the `_temp` Folder](#exploring-the-_temp-folder)
7.  [Runner File Commands](#runner-file-commands)
8.  [Live Diagnostics](#live-diagnostics)
9.  [Cleanup and Termination](#cleanup-and-termination)

---

## 1\. Starting the Runner

Launch the runner process in one shell:

```
root@ubuntu-host ~/actions-runner ➜ ./run.sh
```

Expected output:

```
Current runner version: '2.310.2'
2023-10-24 14:51:44Z: Listening for Jobs
2023-10-24 15:23:57Z: Running job: testing
2023-10-24 15:24:16Z: Job testing completed with result: Succeeded
```

Verify the runner directories:

```
root@ubuntu-host ~/actions-runner ➜ ll
drwxr-xr-x 1 root root   34 Oct 24 15:41 _diag/
drwxr-xr-x 6 root root   48 Oct 24 15:24 _work/
```

---

## 2\. Diagnostic Directory (`_diag/`)

This folder contains runner and worker logs:

```
root@ubuntu-host ~/actions-runner ➜ tree _diag/
_diag/
├── blocks
│   ├── RunnerJobID_… .1
│   └── … .1
└── pages
    ├── Runner_20231024-144833-utc.log
    ├── Runner_20231024-145143-utc.log
    ├── Worker_20231024-152375-utc.log
    └── … logs
```

| Folder   | Description                         | Example Files                |
| -------- | ----------------------------------- | ---------------------------- |
| `blocks` | Binary dumps of runner job payloads | `RunnerJobID_<id>.1`         |
| `pages`  | Human-readable logs with timestamps | `Runner_<timestamp>-utc.log` |

> [!important]
> **Tip**
>
> Check `pages/` for connectivity, authentication, or execution errors.

Sample entry:

```
[2023-10-24 14:51:43Z INFO RunnerServer] Connecting to the Runner Server...
```

---

## 3\. Workflow Workspace (`_work/`)

Populated when jobs run, this directory includes repository checkouts, temp scripts, and tools:

```
root@ubuntu-host ~/actions-runner ➜ tree _work/
_work/
├── actions-1
│   ├── actions-1
│   ├── _PipelineMapping
│   └── _temp
└── _tool
```

| Directory          | Purpose                                        |
| ------------------ | ---------------------------------------------- |
| `actions-1/`       | Checkout of your repository                    |
| `_PipelineMapping` | Maps repository names to workspace directories |
| `_temp`            | Shell scripts & metadata per step              |
| `_tool`            | Installed tools or action-specific binaries    |

---

## 4\. Running a Long-Running Workflow

To inspect `_work/` mid-run, add a sleep in your workflow:

```
name: Testing Self-Hosted Runner
on:
  workflow_dispatch:


jobs:
  testing:
    runs-on: [self-hosted, linux, prod]
    steps:
      - name: Echo Content
        run: |
          echo "Ok"
          sleep 1500s
```

Trigger manually. Logs will show:

```
2023-10-24 15:34:09Z: Running job: testing
```

While the job sleeps, list `_work/` again:

```
root@ubuntu-host ~/actions-runner ➜ tree _work/
_work/
├── actions-1
│   ├── actions-1
│   ├── _PipelineMapping
│   │   └── sidd-harth-7
│   │       └── actions-1
│   │           └── PipelineFolder.json
│   ├── _temp
│   └── _tool
```

---

## 5\. Inspecting Pipeline Mapping

`PipelineFolder.json` maps repo metadata to local paths:

```
root@ubuntu-host ~/actions-runner ➜ cat _work/actions-1/_PipelineMapping/sidd-harth-7/actions-1/PipelineFolder.json
```

```
{
  "repositoryName": "sidd-harth-7/actions-1",
  "pipelineDirectory": "actions-1",
  "workspaceDirectory": "actions-1/actions-1",
  "repositories": {
    "sidd-harth-7/actions-1": {
      "repositoryPath": "actions-1/actions-1",
      "lastRunOn": "10/24/2023 15:23:59 +00:00"
    }
  },
  "lastRunOn": "10/24/2023 15:34:10 +00:00"
}
```

---

## 6\. Exploring the `_temp` Folder

Each step’s commands and metadata live here:

```
root@ubuntu-host ~/actions-runner ➜ tree _work/_temp
_work/_temp/
├── 06abcca7-d09b-406e-ba2e-f87e625ac8db.sh
├── event.json
├── github_workflow
└── _runner_file_commands
    ├── add_path_… .txt
    ├── save_state_… .txt
    ├── set_env_… .txt
    ├── set_output_… .txt
    └── step_summary_… .txt
```

View the generated script:

```
root@ubuntu-host ~/actions-runner ➜ cat _work/_temp/06abcca7-d09b-406e-ba2e-f87e625ac8db.sh
echo OK
sleep 1500
```

---

## 7\. Runner File Commands

Actions communicate with the runner via file commands stored under `_runner_file_commands`:

```
root@ubuntu-host ~/actions-runner ➜ tree _work/_temp/_runner_file_commands
_work/_temp/_runner_file_commands/
├── add_path_… .txt
├── save_state_… .txt
├── set_env_… .txt
├── set_output_… .txt
└── step_summary_… .txt
```

These contain directives like `::add-path::…` and `::set-env::…`.

---

## 8\. Live Diagnostics

Tail worker logs for real-time monitoring:

```
root@ubuntu-host ~/actions-runner ➜ tail -f _diag/pages/Worker_*.log
```

Watch for execution steps, container pulls, or authentication events as they occur.

---

## 9\. Cleanup and Termination

After troubleshooting, stop the runner:

```
^C  # Ctrl+C to stop
```

Verify it’s no longer running:

```
root@ubuntu-host ~/actions-runner ➜ ps aux | grep run.sh
```

> [!important]
> **Further Reading**
>
> - [GitHub Actions Self-Hosted Runners](https://docs.github.com/actions/hosting-your-own-runners/about-self-hosted-runners)
> - [Managing Workflow Run Logs](https://docs.github.com/actions/monitoring-and-troubleshooting-workflows/managing-workflow-run-logs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/8d91a711-49f5-449c-9531-393bfdc7d9b5/lesson/8630b543-c88d-420a-bca8-307a810a0b65)**
>
> Watch video content
