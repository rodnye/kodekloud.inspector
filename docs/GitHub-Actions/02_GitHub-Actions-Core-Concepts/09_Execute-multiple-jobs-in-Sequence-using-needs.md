# Execute multiple jobs in Sequence using needs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/GitHub-Actions-Core-Concepts/Execute-multiple-jobs-in-Sequence-using-needs)

---

## Table of Contents

- Execute multiple jobs in Sequence using needs
  - How needs Works
  - 1. Basic Build + Test Workflow
  - 2. Detecting Cyclic Dependencies
  - 3. Adding a Deploy Phase
  - 4. Observing the Workflow Run
  - References
  - Watch Video
    - Job Dependency Table

---

## Content

GitHub Actions

GitHub Actions Core Concepts

# Execute multiple jobs in Sequence using needs

Use the `needs` syntax in GitHub Actions to control job execution order. In this tutorial, you'll chain `build_job_1`, `test_job_2`, and `deploy_job_3` so that each runs only after its dependency succeeds.

## How `needs` Works

> [!important]
> **Note**
>
> The `needs` keyword, defined at the job level, accepts a single job name or an array of job names. A job won't start until all its specified dependencies complete successfully.

## 1\. Basic Build + Test Workflow

Here’s a minimal workflow where `test_job_2` waits for `build_job_1`:

```
name: Generate ASCII Artwork
on:
  push:


jobs:
  build_job_1:
    runs-on: ubuntu-latest
    steps:
      - name: Install Cowsay
        run: sudo apt-get install cowsay -y
      - name: Generate message
        run: cowsay -f dragon "Run for cover, I am a DRAGON....RAWR" >> dragon.txt
      - name: Pause for 30 seconds
        run: sleep 30


  test_job_2:
    needs: build_job_1
    runs-on: ubuntu-latest
    steps:
      - name: Pause for 10 seconds
        run: sleep 10
      - name: Verify file exists
        run: test -f dragon.txt
```

With this setup, `test_job_2` only starts once `build_job_1` finishes without errors.

## 2\. Detecting Cyclic Dependencies

If you introduce a cycle, GitHub Actions will reject your workflow before it runs.

> [!important]
> **Warning**
>
> Circular dependencies (e.g., `build_job_1` needs `test_job_2` and vice versa) are invalid. The runner throws an error on push.

Invalid example:

```
jobs:
  build_job_1:
    needs: test_job_2   # ❌ Invalid: cycle detected
    runs-on: ubuntu-latest
    steps:
      - run: echo "Building..."


  test_job_2:
    needs: build_job_1
    runs-on: ubuntu-latest
    steps:
      - run: echo "Testing..."
```

## 3\. Adding a Deploy Phase

You can chain multiple jobs by listing dependencies as an array. Below is a full build–test–deploy sequence:

```
name: Generate ASCII Artwork
on:
  push:


jobs:
  build_job_1:
    runs-on: ubuntu-latest
    steps:
      - name: Install Cowsay
        run: sudo apt-get install cowsay -y
      - name: Generate message
        run: cowsay -f dragon "Run for cover, I am a DRAGON....RAWR" >> dragon.txt
      - name: Pause for 30 seconds
        run: sleep 30


  test_job_2:
    needs: build_job_1
    runs-on: ubuntu-latest
    steps:
      - name: Pause for 10 seconds
        run: sleep 10
      - name: Verify content
        run: grep -i "dragon" dragon.txt


  deploy_job_3:
    needs: [test_job_2]
    runs-on: ubuntu-latest
    steps:
      - name: Display file
        run: cat dragon.txt
```

### Job Dependency Table

| Job                | needs                | Purpose                                      |
| ------------------ | -------------------- | -------------------------------------------- |
| build\\\_job\\\_1  | —                    | Installs Cowsay and generates `dragon.txt`   |
| test\\\_job\\\_2   | build\\\_job\\\_1    | Verifies that `dragon.txt` contains "dragon" |
| deploy\\\_job\\\_3 | \\[test\\_job\\_2\\] | Outputs the contents of `dragon.txt`         |

## 4\. Observing the Workflow Run

When you push this workflow:

1.  The GitHub Actions graph displays:  
    `build_job_1 → test_job_2 → deploy_job_3`
2.  Each job runs on a separate runner; files are not shared by default.
3.  If `test_job_2` fails to find `dragon.txt`, the runner skips `deploy_job_3`:

```
grep -i "dragon" dragon.txt
# exit status 1
```

![The image shows a GitHub Actions workflow interface with a failed job sequence, where "test_job_2" has failed, causing the overall status to be marked as "Failure."](https://kodekloud.com/kk-media/image/upload/v1752876637/notes-assets/images/GitHub-Actions-Execute-multiple-jobs-in-Sequence-using-needs/github-actions-failed-job-workflow.jpg)

> [!important]
> **Note**
>
> To share files between jobs, explicitly upload and download artifacts using the [`actions/upload-artifact`](https://github.com/actions/upload-artifact) and [`actions/download-artifact`](https://github.com/actions/download-artifact) actions.

## References

- [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [actions/upload-artifact](https://github.com/actions/upload-artifact)
- [actions/download-artifact](https://github.com/actions/download-artifact)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/0ac6c98f-7100-471e-b9aa-037f25cb58d7/lesson/84ce7e91-2adc-4228-a690-b16769f2ed56)**
>
> Watch video content
