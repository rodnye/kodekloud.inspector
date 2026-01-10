# Workflow Commands and Setting exit codes in Custom Actions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Custom-Actions/Workflow-Commands-and-Setting-exit-codes-in-Custom-Actions)

---

## Table of Contents

- Workflow Commands and Setting exit codes in Custom Actions
  - Table of Contents
  - Workflow Commands
  - Actions Toolkit Library
  - Using @actions/core
  - Exit Codes in Custom Actions
  - Links and References
  - Watch Video
    - Setting Environment Variables
    - Defining Step Outputs
    - Emitting Debug Messages
    - Inputs and Outputs
    - Logging and Messages
    - Environment Variables and Secrets
    - JavaScript Actions
    - Docker Container Actions

---

## Content

GitHub Actions Certification

Custom Actions

# Workflow Commands and Setting exit codes in Custom Actions

In this guide, you’ll dive into **GitHub Actions workflow commands**, learn how to export variables, emit logs, and manage **exit codes** in both JavaScript and Docker-based custom actions. Whether you’re writing a simple workflow file or building a full-fledged action with the [Actions Toolkit](https://github.com/actions/toolkit), these patterns will help you create robust CI/CD pipelines.

## Table of Contents

- [Workflow Commands](#workflow-commands)
  - [Setting Environment Variables](#setting-environment-variables)
  - [Defining Step Outputs](#defining-step-outputs)
  - [Emitting Debug Messages](#emitting-debug-messages)
- [Actions Toolkit Library](#actions-toolkit-library)
- [Using `@actions/core`](#using-actionscore)
  - [Inputs and Outputs](#inputs-and-outputs)
  - [Logging and Messages](#logging-and-messages)
  - [Environment Variables and Secrets](#environment-variables-and-secrets)
- [Exit Codes in Custom Actions](#exit-codes-in-custom-actions)
  - [JavaScript Actions](#javascript-actions)
  - [Docker Container Actions](#docker-container-actions)
- [Links and References](#links-and-references)

---

## Workflow Commands

Workflow commands let you interact with the runner environment—setting variables, emitting outputs, grouping logs, and more. You can use them directly in your workflow YAML or via the Actions Toolkit for a higher-level API.

### Setting Environment Variables

Append key-value pairs to the special `$GITHUB_ENV` file to make them available in all subsequent steps:

```
- name: Export AWS region
  run: echo "AWS_REGION=us-east-1" >> $GITHUB_ENV
```

After this step, `$AWS_REGION` can be referenced in later steps:

```
- name: Show AWS region
  run: echo "Region is $AWS_REGION"
```

### Defining Step Outputs

To pass dynamic values between steps, write to `$GITHUB_OUTPUT`:

```
- name: Compute and export result
  id: compute
  run: |
    result=$(( 42 + 25 ))
    echo "RESULT=$result" >> $GITHUB_OUTPUT
```

Consume the output in another step:

```
- name: Use computed result
  run: echo "The result was ${{ steps.compute.outputs.RESULT }}"
```

### Emitting Debug Messages

Debug logs are only visible when you enable debug mode (`ACTIONS_STEP_DEBUG`):

```
- name: Log debug info
  run: echo "::debug::Current build number is $BUILD_NUMBER"
```

> [!important]
> **Note**
>
> Enable debug logging by setting `ACTIONS_STEP_DEBUG` to `true` in your repository’s secrets.

For a full list of workflow commands (grouping, warnings, notices, and more), see the [official GitHub Actions documentation](https://docs.github.com/en/actions/learn-github-actions/workflow-commands-for-github-actions).

---

## Actions Toolkit Library

The [Actions Toolkit](https://github.com/actions/toolkit) provides JavaScript and TypeScript libraries that wrap raw workflow commands into secure, well-tested APIs. Below are the most commonly used packages:

| Package             | Purpose                                                  |
| ------------------- | -------------------------------------------------------- |
| @actions/core       | Core functions for inputs, outputs, logging, and secrets |
| @actions/github     | Octokit client with workflow context                     |
| @actions/exec       | Execute commands with streamed stdout/stderr             |
| @actions/io         | File system operations (copy, move, remove)              |
| @actions/tool-cache | Download and manage tools for your workflow              |

![The image lists various components of the GitHub Actions toolkit library, each with an icon and a corresponding URL. It includes links like `@actions/core`, `@actions/exec`, and others, with a reference to the GitHub repository.](https://kodekloud.com/kk-media/image/upload/v1752876098/notes-assets/images/GitHub-Actions-Certification-Workflow-Commands-and-Setting-exit-codes-in-Custom-Actions/github-actions-toolkit-components-list.jpg)

Refer to the [Actions Toolkit docs](https://github.com/actions/toolkit) for detailed examples and best practices.

---

## Using `@actions/core`

The `@actions/core` package offers three main feature sets for building custom JavaScript actions.

### Inputs and Outputs

```
getInput(name: string, options?: { required?: boolean }): string
getBooleanInput(name: string, options?: { required?: boolean }): boolean
getMultilineInput(name: string, options?: { required?: boolean }): string[]
setOutput(name: string, value: any): void
```

- **getInput**, **getBooleanInput**, **getMultilineInput**: Read user-defined inputs from `action.yml`.
- **setOutput**: Emit step outputs for consumption in downstream steps.

### Logging and Messages

```
setFailed(message: string): void
warning(message: string): void
error(message: string): void
info(message: string): void
notice(message: string): void
debug(message: string): void
isDebug(): boolean
startGroup(name: string): void
endGroup(): void
```

- **setFailed**: Fails the action and sets exit code to 1.
- **warning**, **error**, **notice**, **info**, **debug**: Emit logs at various levels.
- **startGroup** / **endGroup**: Collapse related log lines into a group.

### Environment Variables and Secrets

```
exportVariable(name: string, value: any): void
setSecret(secret: string): void
```

- **exportVariable**: Equivalent to writing to `$GITHUB_ENV`.
- **setSecret**: Masks sensitive values in workflow logs.

![The image is a diagram of the actions/core package, showing functions categorized under "Inputs and Outputs," "Logging and Messages," and "Environment and Secrets." Functions include `getInput`, `setOutput`, `setFailed`, `debug`, and `exportVariable`.](https://kodekloud.com/kk-media/image/upload/v1752876099/notes-assets/images/GitHub-Actions-Certification-Workflow-Commands-and-Setting-exit-codes-in-Custom-Actions/actions-core-package-functions-diagram.jpg)

---

## Exit Codes in Custom Actions

GitHub Actions interprets the exit code of each step to decide success or failure:

- **0**: Success — runner continues with downstream steps.
- **Non-zero**: Failure — runner halts concurrent jobs and skips subsequent steps.

> [!important]
> **Warning**
>
> Always handle errors and set exit codes explicitly. A forgotten error can cause unexpected pipeline success.

![The image explains exit codes in custom actions, showing a green checkmark for successful actions with an exit code of zero, and a red cross for failed actions with non-zero exit codes.](https://kodekloud.com/kk-media/image/upload/v1752876100/notes-assets/images/GitHub-Actions-Certification-Workflow-Commands-and-Setting-exit-codes-in-Custom-Actions/exit-codes-custom-actions-checkmark-cross.jpg)

### JavaScript Actions

Use `core.setFailed` to log the error and exit with code 1:

```
const core = require('@actions/core');

try {
  // Your custom logic here
} catch (error) {
  core.setFailed(error.message);
}
```

### Docker Container Actions

In your `entrypoint.sh`, leverage shell exit codes:

```
#!/bin/sh
if [ -z "$INPUT_SOME_PARAM" ]; then
  echo "Missing required input: some-param" >&2
  exit 1
fi

# Continue your action logic...
```

A non-zero `exit` will signal failure back to GitHub Actions.

---

## Links and References

- [GitHub Actions Workflow Commands](https://docs.github.com/en/actions/learn-github-actions/workflow-commands-for-github-actions)
- [GitHub Actions Toolkit](https://github.com/actions/toolkit)
- [GitHub Actions: Custom Actions](https://docs.github.com/en/actions/creating-actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/428391ee-45d0-4e9c-9e06-78d0c5ff7657/lesson/f8a38a6e-55ac-4234-9eb9-d887b501b041)**
>
> Watch video content
