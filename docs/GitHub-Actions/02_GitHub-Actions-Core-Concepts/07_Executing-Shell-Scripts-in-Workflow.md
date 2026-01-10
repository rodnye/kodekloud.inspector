# Executing Shell Scripts in Workflow - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/GitHub-Actions-Core-Concepts/Executing-Shell-Scripts-in-Workflow)

---

## Table of Contents

- Executing Shell Scripts in Workflow
  - Table of Contents
  - 1. Create the Shell Script
  - 2. Example: Workflow Fails Due to Permissions
  - 3. Grant Execute Permissions in Workflow
  - 4. Verify the Workflow Run
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

GitHub Actions Core Concepts

# Executing Shell Scripts in Workflow

Running a series of shell commands directly in a workflow can quickly become messy. By placing your commands in a standalone script file and invoking it in one step, you maintain a clean, maintainable workflow.

## Table of Contents

| Step | Description                                | File/Command               |
| ---- | ------------------------------------------ | -------------------------- |
| 1    | Create the shell script                    | `ascii-script.sh`          |
| 2    | Show a failing workflow (permission error) | `./ascii-script.sh`        |
| 3    | Update workflow to grant execute rights    | `chmod +x ascii-script.sh` |
| 4    | Verify successful run                      | Actions → Logs             |

## 1\. Create the Shell Script

In your repository root, add a file named `ascii-script.sh`:

```
#!/bin/sh
sudo apt-get update -y
sudo apt-get install cowsay -y
cowsay -f dragon "Run for cover, I am a DRAGON....RAWR" >> dragon.txt
grep -i "dragon" dragon.txt
ls -ltra
```

Commit and push this script.

> [!important]
> **Note**
>
> Make sure your script uses a Unix-style line ending (`LF`) and the correct shebang (`#!/bin/sh`).

## 2\. Example: Workflow Fails Due to Permissions

A minimal workflow that invokes the script directly will fail because the checked-out file isn’t executable by default:

```
name: Run ASCII Script


on:
  push:
    branches: [ main ]


jobs:
  ascii_job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4


      - name: List Files Before Run
        run: ls -ltra


      - name: Run Script
        run: ./ascii-script.sh
```

When this runs, you'll see:

```
/home/runner/work/_temp/abcdef.sh: line 1: ./ascii-script.sh: Permission denied
Error: Process completed with exit code 126
```

> [!important]
> **Warning**
>
> Without executable permissions, the runner cannot invoke your script. Always ensure your scripts are marked as executable before running.

## 3\. Grant Execute Permissions in Workflow

Update the workflow to add a `chmod +x` step before executing:

```
name: Run ASCII Script


on:
  push:
    branches: [ main ]


jobs:
  ascii_job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4


      - name: List Files Before Run
        run: ls -ltra


      - name: Make Script Executable and Run
        run: |
          chmod +x ascii-script.sh
          ./ascii-script.sh
```

Commit and push these changes to trigger a new run.

## 4\. Verify the Workflow Run

1.  Go to the **Actions** tab and select your latest workflow.
2.  In **List Files Before Run**, notice `ascii-script.sh` is still `-rw-r--r--`:

    ```
    -rw-r--r-- 1 runner docker 161 Oct 11 11:17 ascii-script.sh
    ```

3.  The **Make Script Executable and Run** step applies `chmod +x` and executes the script. You’ll see:

    ```
    Reading package lists...
    Building dependency tree...
    Reading state information...
    ...
    Fetched 18.6 kB in 0s (177 kB/s)
    Reading database...
    ```

4.  Finally, the script’s `ls -ltra` shows both the executable script and generated `dragon.txt`:

    ```
    -rwxr-xr-x 1 runner docker 161 Oct 11 11:18 ascii-script.sh
    -rw-r--r-- 1 runner docker 227 Oct 11 11:18 dragon.txt
    ```

With executable permissions in place, your script will run smoothly—keeping your workflow concise and your commands centralized.

## Links and References

- [GitHub Actions Workflows](https://docs.github.com/en/actions/using-workflows/about-workflows)
- [actions/checkout@v4](https://github.com/actions/checkout)
- [cowsay on Docker Hub](https://hub.docker.com/r/elkowl/cowsay)
- [Ubuntu Package Management](https://help.ubuntu.com/community/AptGet/Howto)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/0ac6c98f-7100-471e-b9aa-037f25cb58d7/lesson/6f3494e0-1334-4724-9ed3-214cbc8fae18)**
>
> Watch video content
