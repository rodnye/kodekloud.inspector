# Implementing package feeds - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-a-Package-Management-Strategy/Implementing-package-feeds)

---

## Table of Contents

- Implementing package feeds
  - 1. Create a New Feed
  - 2. Configure Feed Settings
  - 3. Manage Permissions
  - 4. Add Upstream Sources
  - 5. Publish a NuGet Package
  - 6. Publish a Universal Package via Azure CLI
  - 7. Verify Your Feed
  - Links and References
  - Watch Video
    - a) Create and Pack the Library
    - b) Connect Visual Studio to Your Feed
    - c) Push the Package

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement a Package Management Strategy

# Implementing package feeds

In this guide, you’ll learn how to set up, configure, and manage private package feeds using Azure DevOps Artifacts. By the end, you’ll have a secure feed for NuGet, npm, and Universal Packages, complete with permissions, upstream sources, and retention policies.

## 1\. Create a New Feed

1.  Navigate to your Azure DevOps project (e.g., **Simple Converter**).
2.  Click **Artifacts** in the left-hand menu.
3.  Select **Create Feed**.
4.  Enter a descriptive name (e.g., **My Project Feed**).
5.  Set visibility:
    - **Organization**: Available across all projects.
    - **Project**: Limited to the current project.
6.  (Optional) Add upstream sources such as public NuGet, npmjs.com, or crates.io.
7.  Click **Create**.

> Tip: Use consistent naming conventions for feeds to simplify management and automation.

## 2\. Configure Feed Settings

After creating the feed, click **My Project Feed**, then the gear icon to open **Feed Settings**.

- **Hide deleted package versions**: Prevent re-use of deleted version numbers.
- **Package sharing**: Publish the latest version to a wiki or project homepage.
- **Retention policies**: Automatically remove old or unused packages.

![The image shows the "Feed Settings" page in Azure DevOps, where settings for a project feed named "MyProjectFeed" are being configured, including options for deleted packages, package sharing, and retention policies.](https://kodekloud.com/kk-media/image/upload/v1752867917/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implementing-package-feeds/azure-devops-feed-settings-myprojectfeed.jpg)

> [!important]
> **Immutable Feeds**
>
> Once a package version is pushed to an immutable feed, its version number is permanently reserved. This ensures consistency for consumers who depend on that exact version.

## 3\. Manage Permissions

Use the **Permissions** tab under **Feed Settings** to control who can view, publish, or manage the feed.

| Role         | Scope       | Capabilities                                    |
| ------------ | ----------- | ----------------------------------------------- |
| Feed Owner   | Project/Org | Full control: modify settings, upstream sources |
| Contributor  | Project     | Publish & consume packages                      |
| Collaborator | Project     | Read-only access to consume packages            |
| Reader       | Project     | Limited to listing and downloading              |

1.  Click **Permissions**.
2.  Select **Add users/groups**.
3.  Assign the appropriate role (e.g., **Contributor** for package authors).

![The image shows the "Feed Settings" page in Azure DevOps, specifically the "Permissions" tab, where users and groups are being managed for access roles. A pop-up window is open for adding users or groups with different permission levels.](https://kodekloud.com/kk-media/image/upload/v1752867918/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implementing-package-feeds/azure-devops-feed-settings-permissions-tab.jpg)

> [!important]
> **Permission Best Practices**
>
> Grant the minimum required permissions. Avoid giving **Feed Owner** rights unless management tasks are necessary.

## 4\. Add Upstream Sources

Upstream sources allow caching and proxying of public or internal feeds:

1.  Go to **Upstream Sources**.
2.  Select built-in public feeds such as [NuGet.org](https://www.nuget.org), [npmjs.com](https://www.npmjs.com), or [crates.io](https://crates.io).
3.  (Optional) Add other Azure Artifacts feeds or custom registry URLs.
4.  Click **Add**.

![The image shows the "Feed Settings" page in Azure DevOps, specifically the "Upstream Sources" tab for a project feed. A dialog box titled "Add upstream source" is open, offering options to add a public source or an Azure Artifacts feed.](https://kodekloud.com/kk-media/image/upload/v1752867918/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implementing-package-feeds/azure-devops-feed-settings-upstream-sources.jpg)

## 5\. Publish a NuGet Package

### a) Create and Pack the Library

In Visual Studio:

1.  Create a new **Class Library** project.
2.  Add a calculator class:

```
// Kalculator/AddKalculator.cs
using System;


namespace Kalculator
{
    public class AddKalculator
    {
        public int Add(int x, int y)
        {
            return x + y;
        }
    }
}
```

3.  Right-click the project → **Pack**.
4.  Confirm `Kalculator.1.0.0.nupkg` is generated in `bin/Debug`.

### b) Connect Visual Studio to Your Feed

1.  In Azure DevOps, click **Connect to feed** and copy the NuGet source URL.
2.  In Visual Studio:
    - **Tools → Options → NuGet Package Manager → Package Sources**
    - Click **+**, name it **My Project Feed**, and paste the URL.
    - Click **Update** and **OK**.

### c) Push the Package

Use the [NuGet CLI](https://learn.microsoft.com/nuget/tools/cli-ref-nuget-exe):

```
nuget push "bin\Debug\Kalculator.1.0.0.nupkg" \
  -Source "My Project Feed" \
  -ApiKey <Your-PAT>
```

> [!important]
> **Personal Access Token**
>
> Replace `<Your-PAT>` with a valid Azure DevOps Personal Access Token that has **Packaging (Read & write)** scope.

## 6\. Publish a Universal Package via Azure CLI

Universal Packages are ideal for scripts, binaries, or any non-NuGet artifacts.

1.  Install the [Azure DevOps CLI extension](https://learn.microsoft.com/azure/devops/cli/?view=azure-devops).
2.  Authenticate:

    ```
    az devops login --organization https://dev.azure.com/KodeKloudDemo/
    ```

3.  Publish the package:

    ```
    az artifacts universal publish \
      --organization https://dev.azure.com/KodeKloudDemo/ \
      --project SimpleConverter \
      --scope project \
      --feed MyProjectFeed \
      --name my-first-package \
      --version 0.0.1 \
      --description "Welcome to Universal Packages" \
      --path .
    ```

During the process, Azure CLI will download the necessary tooling automatically:

```
Downloading Universal Packages tooling (ArtifactTool_win-x64_0.2.364): 47.12%
Downloading Universal Packages tooling (ArtifactTool_win-x64_0.2.364): 87.71%
Publishing ..
```

## 7\. Verify Your Feed

Return to **Artifacts → My Project Feed**. You should see:

- `Kalculator` **1.0.0** (NuGet package)
- `my-first-package` **0.0.1** (Universal Package)

![The image shows an Azure DevOps interface displaying a project feed named "MyProjectFeed" with a package titled "my-first-package" version 0.0.1. The sidebar includes options like Overview, Boards, Repos, Pipelines, Test Plans, and Artifacts.](https://kodekloud.com/kk-media/image/upload/v1752867919/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Implementing-package-feeds/azure-devops-myprojectfeed-package-0-0-1.jpg)

---

By following these steps, you now have a fully functional private feed in Azure DevOps Artifacts. Use it to securely share reusable libraries and assets across your teams.

## Links and References

- [Azure DevOps Artifacts Documentation](https://learn.microsoft.com/azure/devops/artifacts/)
- [NuGet CLI Reference](https://learn.microsoft.com/nuget/tools/cli-ref-nuget-exe)
- [Azure DevOps CLI Extension](https://learn.microsoft.com/azure/devops/cli/?view=azure-devops)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/54c26a08-243e-448b-bba5-3fbefddf9145/lesson/9f7b7055-e1b6-4a29-b6b6-d7025b9c1a78)**
>
> Watch video content
