# Exploring Self Hosted Runner - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Self-Hosted-Runner/Exploring-Self-Hosted-Runner)

---

## Table of Contents

- Exploring Self Hosted Runner
  - Table of Contents
  - 1. Directory Layout
  - 2. Inspecting Diagnostic Logs (\_diag)
  - 3. Exploring the Workflow Workspace (\_work)
  - 4. Real-Time Diagnostics
  - 5. Cleanup
  - 6. Summary
  - Links and References
  - Watch Video
    - 3.1 Before Any Job Runs
    - 3.2 Preparing a Long-Running Workflow
    - 3.3 Monitoring Job Start
    - 3.4 After Job Initialization
      - 3.4.1 PipelineFolder.json
      - 3.4.2 Generated Shell Script
      - 3.4.3 Workflow Event Payload
      - 3.4.4 Runner File Commands

---

## Content

GitHub Actions Certification

Self Hosted Runner

# Exploring Self Hosted Runner

In this guide, we’ll dive into the key directories of a self-hosted GitHub Actions runner. You’ll learn how to inspect diagnostics in `_diag/` and explore workflow workspaces in `_work/`. We’ll keep the runner process running in one shell while using a second terminal to inspect its file structure in real time.

---

## Table of Contents

1.  [Directory Layout](#directory-layout)
2.  [Inspecting Diagnostic Logs (`_diag/`)](#inspecting-diagnostic-logs-_diag)
3.  [Exploring the Workflow Workspace (`_work/`)](#exploring-the-workflow-workspace-_work)
4.  [Real-Time Diagnostics](#real-time-diagnostics)
5.  [Cleanup](#cleanup)
6.  [Summary](#summary)
7.  [Links and References](#links-and-references)

---

## 1\. Directory Layout

Start the runner in one terminal:

```
root@ubuntu-host:~/actions-runner$ ./run.sh
```

Open a second terminal to inspect the directory structure:

```
root@ubuntu-host:~$ cd actions-runner/
root@ubuntu-host:~/actions-runner$ ls -l
total 183128
drwxr-xr-x  4 1001 127    16384 Oct 18 18:27 bin/
-rwxr-xr-x  1 root root     266 Oct 24 14:50 config.sh*
drwxr-xr-x  1 root root    4096 Oct 24 14:48 .credentials/
drwxr-xr-x  1 root root    4096 Oct 24 14:48 .credentials_rsaparams/
drwxr-xr-x  4 root root    4096 Oct 24 14:49 _diag/
-rw-r--r--  1 root root      17 Oct 24 14:48 .env
drwxr-xr-x  4 1001 127    4096 Oct 24 14:48 externals/
-rw-r--r--  1 root root     259 Oct 24 14:48 run-helper.sh.template*
-rwxr-xr-x  1 root root     382 Oct 24 14:50 run-helper.sh*
-rw-r--r--  1 root root     718 Oct 24 14:50 .runner
-rwxr-xr-x  1 root root    2537 Oct 24 15:26 run.sh*
drwxr-xr-x  6 root root    4096 Oct 24 14:48 _work/
```

| Directory       | Purpose                           |
| --------------- | --------------------------------- |
| `bin/`          | Runner executables                |
| `config.sh`     | Configuration script              |
| `.credentials/` | Authentication material           |
| `_diag/`        | Diagnostic and worker logs        |
| `_work/`        | Workflow checkout & runtime files |
| `externals/`    | External dependencies             |

- `_diag/`: Contains both runner and worker logs.
- `_work/`: Hosts the workspace where jobs execute.

---

## 2\. Inspecting Diagnostic Logs (`_diag`)

Use `tree` to view the log layout:

```
root@ubuntu-host:~/actions-runner$ tree _diag/
_diag/
├── blocks
└── pages
    ├── Runner_20231024-144833-utc.log
    ├── Runner_20231024-145143-utc.log
    └── Worker_20231024-152375-utc.log


2 directories, 3 files
```

Display the contents of a runner log:

```
root@ubuntu-host:~/actions-runner$ cat _diag/pages/Runner_20231024-145143-utc.log
[2023-10-24 14:51:43Z INFO HostContext] Well known directory 'Root': '/root/actions-runner'
[2023-10-24 14:51:43Z INFO RunnerServer] EstablishSvsConnection with 60 seconds timeout.
[2023-10-24 14:51:43Z INFO GitHubActionsService] Starting operation Location.GetConnectionData
...
```

> [!important]
> **Troubleshooting Tip**
>
> If you encounter connectivity or authentication issues, always start with the latest entries in `_diag/pages/Runner_*.log` and `_diag/pages/Worker_*.log`.

---

## 3\. Exploring the Workflow Workspace (`_work`)

### 3.1 Before Any Job Runs

By default, the workspace is mostly empty:

```
root@ubuntu-host:~/actions-runner$ tree _work/
_work/
└── actions-1
    └── actions-1


7 directories, 1 file
```

### 3.2 Preparing a Long-Running Workflow

To observe changes in `_work/` during execution, use a simple workflow that sleeps:

```
name: Self-Hosted Runner Demo
on:
  workflow_dispatch:


jobs:
  demo:
    runs-on: [self-hosted, linux]
    steps:
      - name: Echo and Pause
        run: |
          echo "Runner is active"
          sleep 1500s
```

Commit and trigger via **Run workflow** in the GitHub UI.

> [!important]
> **Long-Running Job**
>
> Using `sleep 1500s` keeps the job alive long enough to explore file changes. Remember to cancel or stop the runner when done.

### 3.3 Monitoring Job Start

In the runner terminal you’ll see:

```
root@ubuntu-host:~/actions-runner$ ./run.sh
Current runner version: '2.310.2'
2023-10-24 14:52:57Z: Running job: demo
# (job will remain active)
```

### 3.4 After Job Initialization

Re-execute the tree command:

```
root@ubuntu-host:~/actions-runner$ tree _work/
_work/
├── actions-1
│   ├── actions-1
│   ├── PipelineMapping
│   │   └── your-org-demo-1
│   │       └── actions-1
│   │           └── PipelineFolder.json
└── _temp
    ├── 06abcca7-d09b-406e-ba2e-f87e625ac8db.sh
    ├── _github_workflow/event.json
    └── runner_file_commands
        ├── add_path_*.txt
        ├── save_state_*.txt
        ├── set_env_*.txt
        ├── set_output_*.txt
        └── step_summary_*.txt


9 directories, 8 files
```

#### 3.4.1 PipelineFolder.json

Metadata about your repo and workspace:

```
{
  "repositoryName": "your-org/demo-repo",
  "workspaceDirectory": "actions-1/actions-1",
  "lastRunOn": "2023-10-24T15:34:10Z",
  "repositories": {
    "your-org/demo-repo": {
      "repositoryPath": "actions-1/actions-1",
      "lastRunOn": "2023-10-24T15:23:59Z"
    }
  }
}
```

#### 3.4.2 Generated Shell Script

Your `run:` commands are translated into a shell script:

```
root@ubuntu-host:~/actions-runner$ cat _work/_temp/06abcca7-d09b-406e-ba2e-f87e625ac8db.sh
echo "Runner is active"
sleep 1500s
```

#### 3.4.3 Workflow Event Payload

The full event that triggered the job lives in `event.json`:

```
{
  "inputs": null,
  "ref": "refs/heads/main",
  "repository": {
    "clone_url": "https://github.com/your-org/demo-repo.git",
    "default_branch": "main",
    ...
  }
}
```

#### 3.4.4 Runner File Commands

Commands such as `::set-env` and `::add-path` are materialized into files under `runner_file_commands`. The runner engine reads these to adjust environment variables, outputs, and step summaries.

---

## 4\. Real-Time Diagnostics

While the job is running, new logs continuously populate `_diag`:

```
root@ubuntu-host:~/actions-runner$ tree _diag/
_diag/
├── blocks
│   ├── ..._1.log
│   └── ..._2.log
└── pages
    ├── ..._1.log
    └── ..._2.log
```

Live snippet from a worker log:

```
[2023-10-24 15:34:11Z INFO ProcessInvokerWrapper] Starting process:
[2023-10-24 15:34:11Z INFO ProcessInvokerWrapper] File name: '/usr/bin/bash'
[2023-10-24 15:34:11Z INFO ProcessInvokerWrapper] Arguments: '-e /root/actions-runner/_work/_temp/06abcca7-d09b-406e-ba2e-f87e625ac8db.sh'
[2023-10-24 15:35:11Z INFO JobServerQueue] Stop aggressive web console lines queue.
```

---

## 5\. Cleanup

When you’ve finished inspecting logs and workspace files, stop the runner:

```
# In the runner terminal:
^C
Stopping runner...
```

This terminates the current job and shuts down the service.

---

## 6\. Summary

- **`_diag/`**: Central location for runner and worker diagnostics.
- **`_work/`**: Contains your repo checkout, generated scripts, event payloads, and runner file commands.
- Monitoring these folders in real time is essential for debugging connectivity, authentication, and workflow execution on self-hosted runners.

---

## Links and References

- [GitHub Actions: Self-hosted runners](https://docs.github.com/actions/hosting-your-own-runners/about-self-hosted-runners)
- [Workflow syntax for GitHub Actions](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)
- [Viewing runner diagnostic logs](https://docs.github.com/actions/monitoring-and-troubleshooting-workflows/managing-workflow-runner-logs)

Dry-run these steps to gain confidence in troubleshooting and customizing your self-hosted GitHub Actions runners.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/7cc7bcee-0af6-41af-9653-dfd6e0403fe9/lesson/b2bb21f7-ac54-45af-8d41-f8b7a03a9c53)**
>
> Watch video content
