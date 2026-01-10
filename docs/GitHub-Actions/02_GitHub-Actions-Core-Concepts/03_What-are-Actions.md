# What are Actions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions/GitHub-Actions-Core-Concepts/What-are-Actions)

---

## Table of Contents

- What are Actions
  - Discovering Actions on GitHub Marketplace
  - Pinning Action Versions
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

GitHub Actions

GitHub Actions Core Concepts

# What are Actions

GitHub Actions are modular, reusable units of automation that you integrate into your workflows to handle tasks such as continuous integration, continuous deployment, and code reviews. Authored by GitHub or community contributors, actions make it easy to share and maintain automation logic across repositories.

## Discovering Actions on GitHub Marketplace

Explore the [GitHub Marketplace](https://github.com/marketplace) to find hundreds of pre-built actions. Verified badges indicate official partner organizations, while unbadged entries are contributed by the community.

> [!important]
> **Security Best Practice**
>
> Always review an action’s source code before integrating it. Ensure it handles your repository’s content and secrets safely—never exposes secrets to unintended hosts or logs sensitive data.

## Pinning Action Versions

For reliable and predictable workflows, define the action version by tag, branch, or commit SHA:

```
steps:
  - name: Checkout using a specific tag
    uses: actions/checkout@v3.6.0


  - name: Checkout using the main branch
    uses: actions/checkout@main


  - name: Checkout using a commit SHA
    uses: actions/checkout@a824008085750b8e136effc585c3cd6082bd575f
```

| Strategy   | Syntax Example                                              | Pros                                        | Cons                                  |
| ---------- | ----------------------------------------------------------- | ------------------------------------------- | ------------------------------------- |
| Tag        | `actions/checkout@v3.6.0`                                   | Controlled upgrades between versions        | Requires manual version updates       |
| Branch     | `actions/checkout@main`                                     | Automatically uses the latest code          | May introduce breaking changes        |
| Commit SHA | `actions/checkout@a824008085750b8e136effc585c3cd6082bd575f` | Immutable reference for reproducible builds | Harder to benefit from upstream fixes |

> [!important]
> **Versioning Tip**
>
> Tags strike a balance between stability and ease of upgrades. Use SHAs when you need fully reproducible builds.

## Next Steps

Before adding an action to your workflow, consult its documentation page for required inputs, outputs, environment variables, and any additional configuration.

## Links and References

- [GitHub Marketplace](https://github.com/marketplace)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions/module/0ac6c98f-7100-471e-b9aa-037f25cb58d7/lesson/1b1ed778-35ee-441d-bd08-5e42ac845541)**
>
> Watch video content
