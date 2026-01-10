# Actions Release and Version Management - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Custom-Actions/Actions-Release-and-Version-Management)

---

## Table of Contents

- Actions Release and Version Management
  - 1. Versioning with Tags
  - 2. Referencing a Branch
  - 3. Pinning to a Commit SHA
  - Summary
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

Custom Actions

# Actions Release and Version Management

Ensure stable and predictable execution of your GitHub workflows by versioning your custom actions. In this guide, we’ll cover three methods to specify exact action releases: tags, branches, and commit SHAs.

## 1\. Versioning with Tags

Tags are the most common approach to label and organize GitHub Action releases. They support both flexible version ranges and precise version pins.

| Tag Type            | Purpose                             | Example                          |
| ------------------- | ----------------------------------- | -------------------------------- |
| Major version       | Significant or breaking changes     | `uses: actions/checkout@v3`      |
| Pre-release (beta)  | Beta releases for testing before GA | `uses: actions/checkout@v3-beta` |
| Semantic versioning | Precise `MAJOR.MINOR.PATCH` tags    | `uses: actions/checkout@v3.6.0`  |

```
steps:
  - uses: actions/checkout@v3        # Major version
  - uses: actions/checkout@v3-beta   # Beta release
  - uses: actions/checkout@v3.6.0    # Semantic versioning
```

> [!important]
> **Note**
>
> Using [Semantic Versioning](https://semver.org) ensures clear communication of changes and consistent release management.

## 2\. Referencing a Branch

Referencing a branch name (e.g., `main` or `master`) always pulls the latest action code from that branch. While convenient for continuous updates, this approach can introduce unexpected breaking changes.

```
steps:
  - uses: actions/checkout@main      # Always uses the latest code on 'main'
```

> [!important]
> **Warning**
>
> Pinning to a branch like `main` can lead to non-deterministic builds if the branch receives breaking changes.

## 3\. Pinning to a Commit SHA

Commit SHAs guarantee immutability by referencing a specific commit. This is the most reliable method for ensuring your workflow uses exactly the code you intend.

```
steps:
  - uses: actions/checkout@a8240080885750b8e136effc585c3cd6082bd575f  # Specific commit SHA
```

> [!important]
> **Note**
>
> Commit SHAs are tamper-proof and cannot be moved or deleted, providing maximum stability.

## Summary

Choosing the right versioning strategy depends on your needs:

- **Tags**: Best balance between flexibility and stability.
- **Branches**: Ideal for continuous updates, but risk instability.
- **Commit SHAs**: Maximum reliability with immutable references.

## Links and References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Semantic Versioning](https://semver.org)
- [Git References (Commits)](https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/428391ee-45d0-4e9c-9e06-78d0c5ff7657/lesson/28793cd1-e573-4f2e-ba5f-c77896f3b7d4)**
>
> Watch video content
