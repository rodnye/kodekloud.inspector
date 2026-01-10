# Configure organizational use policies for GitHub Actions - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/GitHub-Actions-in-the-Enterprise-Cloud/Configure-organizational-use-policies-for-GitHub-Actions)

---

## Table of Contents

- Configure organizational use policies for GitHub Actions
  - Types of Actions in Your Workflows
  - Example Workflow: NodeJS CI
  - Configuring Organization-Level Policies
  - Testing Your Policy
  - Allowing Verified & Specific Community Actions
  - Summary
  - Links and References
  - Watch Video

---

## Content

GitHub Actions Certification

GitHub Actions in the Enterprise Cloud

# Configure organizational use policies for GitHub Actions

Learn how to enforce organization-wide policies for GitHub Actions to secure your CI/CD pipelines. Using the **solar-system** repository as an example, you’ll see how to restrict which actions can run, preventing unapproved third-party code from executing.

## Types of Actions in Your Workflows

- **Official GitHub Actions** (e.g., `actions/checkout`, `actions/setup-node`)
- **Custom Composite Actions** (e.g., `./github/custom-actions/npm-action`)
- **Verified Marketplace Actions** (e.g., Docker, Azure)
- **Community Actions** (e.g., `jakejarvis/s3-sync-action@master`)

## Example Workflow: NodeJS CI

Below is an excerpt from `.github/workflows/nodejs-ci.yml` showcasing various action types:

```
name: NodeJS CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
env:
  MONGO_URI: "mongodb://localhost:27017/superstar"
  MONGO_USERNAME: non-prod-user
  MONGO_PASSWORD: non-prod-password
strategy:
  matrix:
    nodejs_version: [18, 20]
    operating_system: [ubuntu-latest]
runs-on: ${{ matrix.operating_system }}


steps:
  - name: Checkout Repository
    uses: actions/checkout@v4


  - name: Set up Node.js ${{ matrix.nodejs_version }}
    uses: actions/setup-node@v3
    with:
      node-version: ${{ matrix.nodejs_version }}


  - name: Cache & Install NPM Packages
    uses: ./github/custom-actions/npm-action
    with:
      path-of-folder: node_modules


  - name: Run Unit Tests
    run: npm test


  - name: Archive Test Results
    if: always()
    uses: actions/upload-artifact@v3


  - name: Upload Reports to S3
    uses: jakejarvis/s3-sync-action@master
    with:
      args: --follow-symlinks --delete
    env:
      AWS_S3_BUCKET: solar-system-reports-bucket
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      AWS_REGION: us-east-1
      SOURCE_DIR: reports-${{ github.sha }}
      DEST_DIR: reports-${{ github.sha }}
```

> [!important]
> **Warning**
>
> If you enable strict policies without allowing required actions, existing workflows will fail. Always test policy changes on a non-production branch first.

![The image shows the GitHub Actions settings page for an organization, where permissions for actions and workflows are being configured. Various options for allowing actions and workflows are displayed, with one option selected.](https://kodekloud.com/kk-media/image/upload/v1752876207/notes-assets/images/GitHub-Actions-Certification-Configure-organizational-use-policies-for-GitHub-Actions/github-actions-settings-permissions-configuration.jpg)

## Configuring Organization-Level Policies

1.  Navigate to **Organization** → **Settings** → **Actions** → **General**.
2.  Under **Repository access**, select **Allow actions and reusable workflows selected repositories**, then add **solar-system**.
3.  Choose a **Workflow permissions** option:

    | Policy Level                               | Description                                               |
    | ------------------------------------------ | --------------------------------------------------------- |
    | Allow all actions and reusable workflows   | No restrictions; all actions run freely.                  |
    | Allow local actions only                   | Only actions within your enterprise repositories.         |
    | Allow local & verified Marketplace actions | Actions from your enterprise or GitHub-verified creators. |
    | Custom policy                              | Precisely list allowed actions and workflows.             |

4.  To restrict to official GitHub actions, select **Allow actions created by GitHub**.
5.  Click **Save**.

## Testing Your Policy

In **solar-system** repository:

1.  Open the **Actions** tab.
2.  Choose **Solar System Workflow**.
3.  Click **Run workflow**.

The run will fail at startup if unapproved actions are blocked:

![The image shows a GitHub Actions page for a repository named "solar-system," displaying a "Solar System Workflow" with a startup failure status.](https://kodekloud.com/kk-media/image/upload/v1752876208/notes-assets/images/GitHub-Actions-Certification-Configure-organizational-use-policies-for-GitHub-Actions/github-actions-solar-system-workflow-failure.jpg)

![The image shows a GitHub Actions workflow page with a "Startup failure" status and an error message indicating that certain actions are not allowed to be used in the specified repository.](https://kodekloud.com/kk-media/image/upload/v1752876209/notes-assets/images/GitHub-Actions-Certification-Configure-organizational-use-policies-for-GitHub-Actions/github-actions-startup-failure-workflow.jpg)

```
Error: Actions in this workflow must be within a repository that belongs to our enterprise account or created by GitHub.
```

## Allowing Verified & Specific Community Actions

To include verified Marketplace actions (Azure, Docker) without approving all third-party code:

1.  Go back to **Organization** → **Settings** → **Actions** → **General**.
2.  Under **Workflow permissions**, select **Allow actions from GitHub, local Enterprise, and GitHub Marketplace (verified creators)**.
3.  Click **Save** and rerun the workflow.

Community actions still blocked? Add them explicitly under **Custom policy**:

```
jakejarvis/s3-sync-action@master, my-org/my-custom-action@v1
```

Save your changes and retry. Any remaining disallowed actions will be reported:

```
Error: Actions in this workflow must be within a repository that belongs to our enterprise account, created by GitHub, verified in the GitHub Marketplace, or match the following list: jakejarvis/s3-sync-action@master, my-org/my-custom-action@v1.
```

![The image shows a GitHub settings page for an organization, focusing on configuring general actions permissions. It includes options for allowing specific actions and reusable workflows within selected repositories.](https://kodekloud.com/kk-media/image/upload/v1752876210/notes-assets/images/GitHub-Actions-Certification-Configure-organizational-use-policies-for-GitHub-Actions/github-settings-actions-permissions-configuration.jpg)

## Summary

By enforcing organization-level use policies for GitHub Actions, you can:

- Restrict workflows to approved actions
- Mitigate risks from untrusted third-party code
- Maintain consistent, secure CI/CD practices across all repositories

## Links and References

- [GitHub Actions Permissions](https://docs.github.com/en/enterprise-server@latest/admin/configuring-actions/configuring-allowed-actions)
- [Controlling Access to Actions](https://docs.github.com/en/actions/reference/permissions-reference)
- [GitHub Marketplace](https://github.com/marketplace)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/9b181319-216b-42b5-8069-9d56650f2d53/lesson/bc05183b-98db-4e47-bd85-78c2e9fb28bd)**
>
> Watch video content
