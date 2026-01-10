# Define how to distribute actions for an enterprise - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/GitHub-Actions-in-the-Enterprise-Cloud/Define-how-to-distribute-actions-for-an-enterprise)

---

## Table of Contents

- Define how to distribute actions for an enterprise
  - Built-in Actions on Enterprise Server
  - Handling External Action Dependencies
  - Option 1: GitHub Connect
  - Option 2: Selective Sync with actions-sync
  - Summary
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

GitHub Actions Certification

GitHub Actions in the Enterprise Cloud

# Define how to distribute actions for an enterprise

In this guide, you’ll learn how to enable GitHub Actions workflows on a self-hosted GitHub Enterprise Server to consume Marketplace actions. By default, Enterprise Server workflows only use actions stored on the instance. To extend this capability, you can integrate with GitHub.com or selectively import actions.

![The image features a blue gradient background with the text "Distributing Actions for an Enterprise Server" in the center. It also includes a copyright notice for KodeKloud in the bottom left corner.](https://kodekloud.com/kk-media/image/upload/v1752876238/notes-assets/images/GitHub-Actions-Certification-Define-how-to-distribute-actions-for-an-enterprise/distributing-actions-enterprise-server-background.jpg)

## Built-in Actions on Enterprise Server

When you set up GitHub Enterprise Server, it pre-bundles a snapshot of core Marketplace actions—such as Checkout and upload/download artifact actions. You can browse these on your instance:

```
https://<YOUR_ENTERPRISE_HOST>/_actions
```

Each action lives in its own repository under the `actions` organization, complete with tags, branches, and commits.

> [!important]
> **Note**
>
> Pre-bundled actions are static snapshots captured at installation time. If you need newer versions or third-party actions, use one of the methods below.

## Handling External Action Dependencies

Imagine a workflow requiring:

- `actions/checkout@v2` (pre-bundled)
- `azure-cli@v2.5` (not pre-bundled)

```
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: azure-cli@v2.5
```

Without internet access, `azure-cli@v2.5` can’t be fetched. You have two options:

| Method         | Description                                                                           | Ideal for                                |
| -------------- | ------------------------------------------------------------------------------------- | ---------------------------------------- |
| GitHub Connect | Integrates Enterprise Server with GitHub.com, allowing approved Marketplace actions.  | Seamless access with policy controls     |
| actions-sync   | CLI tool to download and import specific action versions into your Enterprise Server. | Air-gapped environments or tight control |

## Option 1: GitHub Connect

GitHub Connect links your Enterprise Server to GitHub Enterprise Cloud. Once enabled, workflows can reference all Marketplace actions while you enforce [Action Policies](https://docs.github.com/en/enterprise-server@latest/admin/repository-management/managing-workflow-policies-for-github-actions) to approve or block specific actions.

```
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: azure-cli@v2.5
```

> [!important]
> **Note**
>
> After configuring GitHub Connect, approved public actions resolve automatically without additional steps.

## Option 2: Selective Sync with actions-sync

For air-gapped or highly controlled environments, use the [`actions-sync`](https://github.com/github/actions-sync) CLI to pull and import only the action versions you need.

1.  Install `actions-sync`.
2.  Sync an action version:

    ```
    actions-sync sync \
      --action actions/checkout \
      --version v4 \
      --enterprise-host <YOUR_ENTERPRISE_HOST>
    ```

3.  Reference the synced action in your workflow:

    ```
    on: push
    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4
    ```

> [!important]
> **Warning**
>
> Always pin to a specific version when syncing with `actions-sync`. This prevents unintended updates and maintains workflow stability.

## Summary

By leveraging **GitHub Connect** or the **actions-sync** tool, you can distribute Marketplace actions to your GitHub Enterprise Server while enforcing security policies and compliance.

## Links and References

- [GitHub Connect Documentation](https://docs.github.com/en/enterprise-server@latest/admin/github-connect)
- [actions-sync GitHub Repository](https://github.com/github/actions-sync)
- [Managing Workflow Policies for GitHub Actions](https://docs.github.com/en/enterprise-server@latest/admin/repository-management/managing-workflow-policies-for-github-actions)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/9b181319-216b-42b5-8069-9d56650f2d53/lesson/0a8f5016-6692-42dd-994e-93d49d539235)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/github-actions-certification/module/9b181319-216b-42b5-8069-9d56650f2d53/lesson/3c2ba0a1-196a-45d4-a1f1-b9f39a2f8e45)**
>
> Practice lab
