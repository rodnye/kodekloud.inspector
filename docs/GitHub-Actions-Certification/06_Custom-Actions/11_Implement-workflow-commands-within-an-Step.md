# Implement workflow commands within an Step - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Custom-Actions/Implement-workflow-commands-within-an-Step)

---

## Table of Contents

- Implement workflow commands within an Step
  - Demo Repository: ga-workflow-step-command-demo
  - Workflow Commands at a Glance
  - Running the Workflow
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Custom Actions

# Implement workflow commands within an Step

GitHub Actions workflow commands let you interact with the runner environment, annotate logs, set variables, mask secrets, and generate summaries by issuing specially formatted `echo` statements. These commands work in any workflow step, not just within the Actions Toolkit:

```
echo "::command parameter1={data},parameter2={data}::{message}"
```

> [!important]
> **Note**
>
> You can find a complete list of commands and parameters in the [Workflow Commands for GitHub Actions documentation](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions).

![The image shows a GitHub Docs page about using workflow commands for GitHub Actions, with sections on examples and accessing toolkit functions. The interface includes a navigation menu on the left and a list of article sections on the right.](https://kodekloud.com/kk-media/image/upload/v1752876051/notes-assets/images/GitHub-Actions-Certification-Implement-workflow-commands-within-an-Step/github-actions-workflow-commands-docs.jpg)

For full details, see the [official GitHub Actions workflow commands documentation](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions).

---

## Demo Repository: ga-workflow-step-command-demo

In this demo, we use a repository named `ga-workflow-step-command-demo` (under the KodeKloud training org). It contains a single workflow, **Exploring Workflow Commands**, which runs on `ubuntu-latest` and triggers on `push` (main branch) or via `workflow_dispatch`. Each step illustrates a different command:

```
name: Exploring Workflow Commands
on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  commands_job:
    runs-on: ubuntu-latest
    steps:
      - name: Set environment variable
        run: echo "COMPANY_VAR=KodeKloud" >> $GITHUB_ENV

      - name: Use environment variable
        run: echo "Hello, $COMPANY_VAR!"

      - name: Group log lines
        run: |
          echo "::group::Custom Log Group"
          echo "This is line 1"
          echo "This is line 2"
          echo "::endgroup::"

      - name: Mask a value
        env:
          key: p@$Sw0Rd
        run: |
          echo "Unmasked key = $key"
          echo "::add-mask::$key"
          echo "Masked key = $key"

      - name: Create a warning message
        run: echo "::warning::This is a warning message."

      - name: Create an error annotation
        run: echo "::error file=index.js,line=1::Missing semicolon"

      - name: Set a debug message
        run: echo "::debug::This is a debug message."

      - name: Create a notice annotation
        run: echo "::notice file=src/index.js,line=42::Custom notice message"

      - name: Set an output value
        id: my_output
        run: echo "myOutput=007" >> "$GITHUB_OUTPUT"

      - name: Show the output value
        run: echo "My output value is ${{ steps.my_output.outputs.myOutput }}"

      - name: Job Summary
        run: |
          echo "### Awesome Job Summary :rocket:" >> $GITHUB_STEP_SUMMARY
          echo "## Used Workflow Commands" >> $GITHUB_STEP_SUMMARY
          echo "- Debug" >> $GITHUB_STEP_SUMMARY
          echo "- Mask" >> $GITHUB_STEP_SUMMARY
          echo "- Output" >> $GITHUB_STEP_SUMMARY
          echo "- Variable" >> $GITHUB_STEP_SUMMARY
          echo "- Annotations" >> $GITHUB_STEP_SUMMARY
          echo "- Groups" >> $GITHUB_STEP_SUMMARY
          echo "Secret Key from previous step: $key" >> $GITHUB_STEP_SUMMARY
          echo "Output from previous step: ${{ steps.my_output.outputs.myOutput }}" >> $GITHUB_STEP_SUMMARY
          echo "![](https://raw.githubusercontent.com/sidd-harth/ga-workflow-step-cmd-demo/main/kk-logo.png)" >> $GITHUB_STEP_SUMMARY
```

---

## Workflow Commands at a Glance

| Command              | Use Case                          | Syntax Example                                      |
| -------------------- | --------------------------------- | --------------------------------------------------- |
| Set environment var  | Share data across steps           | `echo "VAR=value" >> $GITHUB_ENV`                   |
| Group logs           | Collapse/expand related log lines | `::group::Title` ... `::endgroup::`                 |
| Mask secret          | Hide sensitive values             | `::add-mask::$SECRET`                               |
| Create warning/error | Annotate logs with issues         | `::warning::Message` / `::error file=app.js,line=5` |
| Set output           | Pass data to subsequent steps     | `echo "key=value" >> $GITHUB_OUTPUT`                |
| Job summary          | Append to end-of-job summary file | `echo "#### Summary" >> $GITHUB_STEP_SUMMARY`       |

---

## Running the Workflow

Trigger the **Exploring Workflow Commands** workflow manually or push to the `main` branch. Since it doesn’t call external services, it completes in seconds. After a successful run, you’ll see annotations for warnings, errors, and notices:

![The image shows a GitHub Actions workflow summary with annotations indicating one error, one warning, and one notice related to a "commands_job."](https://kodekloud.com/kk-media/image/upload/v1752876052/notes-assets/images/GitHub-Actions-Certification-Implement-workflow-commands-within-an-Step/github-actions-workflow-summary-errors.jpg)

Clicking an annotation opens the specified file and line number. Below the annotations, you’ll find the custom job summary:

![The image shows a GitHub Actions workflow summary with a list of used workflow commands, including debug, mask, output, and others. It also includes specific outputs and variables from previous steps.](https://kodekloud.com/kk-media/image/upload/v1752876053/notes-assets/images/GitHub-Actions-Certification-Implement-workflow-commands-within-an-Step/github-actions-workflow-summary-commands.jpg)

You can also inspect live logs to see each step:

![The image shows a GitHub Actions workflow interface with a job named "commands_job" that has successfully completed, displaying various steps like setting environment variables and grouping log lines.](https://kodekloud.com/kk-media/image/upload/v1752876054/notes-assets/images/GitHub-Actions-Certification-Implement-workflow-commands-within-an-Step/github-actions-workflow-commands-job.jpg)

---

> [!important]
> **Warning**
>
> Be cautious when masking secrets. Once added, they cannot be retrieved in plain text within the runner.

Combined, these workflow commands help you produce clear, well-structured logs and summaries in your CI/CD pipelines.

## Links and References

- [Workflow Commands for GitHub Actions](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub CLI](https://cli.github.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/428391ee-45d0-4e9c-9e06-78d0c5ff7657/lesson/19197385-0faf-42e4-9ca1-eb97e779fd6f)**
>
> Watch video content
