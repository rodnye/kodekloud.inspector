# What are Actions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/GitHub-Actions-Core-Concepts/What-are-Actions)

---

## Table of Contents

- What are Actions
  - Discovering Actions in the GitHub Marketplace
  - Adding an Action to Your Workflow
  - Specifying Action Versions
  - Best Practices
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

GitHub Actions Core Concepts

# What are Actions

GitHub Actions are pre-built, reusable automation components designed to help you automate software development workflows—such as CI/CD, testing, and deployment. Whether you choose official Actions from GitHub, community-created Actions, or build your own, you can share and reuse automation logic across repositories with ease.

## Discovering Actions in the GitHub Marketplace

The [GitHub Marketplace](https://github.com/marketplace) is the primary hub for finding Actions contributed by GitHub and the wider community. You’ll find hundreds of Actions covering tasks like code analysis, Docker builds, notifications, and more.

- **Verified Actions**: Marked with a ✅ badge to indicate GitHub has vetted the creator as a partner.
- **Community Actions**: Created by individual contributors or organizations without the verification badge.

> [!important]
> **Warning**
>
> Always review the source code of community Actions before adding them to your workflows. Verify they don’t expose secrets, log sensitive data, or perform unexpected network requests.

## Adding an Action to Your Workflow

After selecting an Action, navigate to its documentation page to view usage examples, version compatibility, and required inputs. Then, add it to your workflow under `steps:` using the `uses:` keyword:

```
# .github/workflows/ci.yml
name: CI Pipeline


on:
  push:
    branches: [ main ]


jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository
        uses: actions/checkout@v3.6.0
```

## Specifying Action Versions

Pinning Actions to specific versions helps maintain stability and repeatability in your CI/CD workflows. You can reference an Action by tag, branch, or SHA:

| Versioning Method | Stability                   | Syntax Example                                                    |
| ----------------- | --------------------------- | ----------------------------------------------------------------- |
| Tag               | Stable; semantic versioning | `uses: actions/checkout@v3.6.0`                                   |
| Branch            | Rolling updates (risky)     | `uses: actions/checkout@main`                                     |
| SHA               | Immutable commit            | `uses: actions/checkout@a824008085750b8e136effc585c3cd6082bd575f` |

> [!important]
> **Note**
>
> For production workflows, pin to a tagged release or a commit SHA to avoid unexpected breaking changes.

## Best Practices

- Reuse official and verified Actions when possible to reduce security risks.
- Extract common steps into [composite Actions](https://docs.github.com/en/actions) to keep workflows DRY.
- Regularly audit and update pinned versions to include security patches and new features.

## Links and References

- [GitHub Marketplace](https://github.com/marketplace)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Actions Security Guidelines](https://docs.github.com/en/actions/security-guides)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/54711be0-66e6-461b-b935-f77d78a5e000/lesson/5fe28e1e-ea2a-4783-8b36-fae524609ac5)**
>
> Watch video content
