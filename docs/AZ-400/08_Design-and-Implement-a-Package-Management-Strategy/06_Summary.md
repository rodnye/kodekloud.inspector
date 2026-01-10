# Summary - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-a-Package-Management-Strategy/Summary)

---

## Table of Contents

- Summary
  - Key Package Management Tools
  - Deep Dive: Azure Artifacts
  - References & Resources
  - Watch Video
    - Functionality & Integration
    - Key Features
    - CI/CD Best Practices

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement a Package Management Strategy

# Summary

In modern software development and CI/CD pipelines, effective package management is essential for handling libraries, dependencies, and artifacts in a consistent, maintainable manner. By standardizing how packages are stored, versioned, and consumed, teams can:

- Ensure build consistency across environments
- Reduce dependency conflicts and drift
- Accelerate development and deployment cycles

![The image is a slide titled "Discovering Package Management Tools," featuring three sections: definition of package management, its importance in software development and CI/CD, and an overview of tools like Azure Artifacts, GitHub Packages, NuGet, and npm.](https://kodekloud.com/kk-media/image/upload/v1752867920/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Summary/discovering-package-management-tools-overview.jpg)

## Key Package Management Tools

| Tool            | Description                                                                                            | Link                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| Azure Artifacts | Universal hosting for NuGet, npm, Maven, Python, and more—manage public & private feeds in one portal. | [Azure Artifacts](https://learn.microsoft.com/azure/devops/artifacts/) |
| GitHub Packages | Integrated package registry on GitHub, providing version control and artifact hosting.                 | [GitHub Packages](https://github.com/features/packages)                |
| NuGet           | Official .NET package manager simplifying third-party library integration into .NET applications.      | [NuGet.org](https://www.nuget.org/)                                    |
| npm             | JavaScript package manager for Node.js, essential for web and server-side dependency management.       | [npmjs.com](https://www.npmjs.com/)                                    |

## Deep Dive: Azure Artifacts

Azure Artifacts provides a rich set of features for hosting and managing package feeds across multiple formats.

### Functionality & Integration

- **Feed Creation**

  ```
  az artifacts feed create \
    --name MyProjectFeed \
    --organization https://dev.azure.com/MyOrg \
    --project MyProject
  ```

- **Publishing Packages**
  - .NET (NuGet):

    ```
    dotnet nuget push \
      --source "MyProjectFeed" \
      bin/Release/MyLibrary.1.0.0.nupkg
    ```

  - npm:

    ```
    npm publish \
      --registry https://pkgs.dev.azure.com/MyOrg/_packaging/MyProjectFeed/npm/registry
    ```
- **Connecting Feeds to Pipelines**
  - Add a feed resource in your YAML pipeline:

    ```
    resources:
      containers:
        - container: artifactsFeed
          connection: MyArtifactoryServiceConnection
    ```

  - Reference packages directly in your `build` and `release` stages.

> [!important]
> **Note**
>
> You can scope feeds to teams or projects to isolate dependencies and improve security.

### Key Features

- Universal support for NuGet, npm, Maven, Python, and more
- Fine-grained permissions at user, group, or token levels
- Seamless integration with Azure Pipelines for automated CI/CD workflows

### CI/CD Best Practices

| Practice             | Description                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------------- |
| Semantic Versioning  | Adopt MAJOR.MINOR.PATCH guidelines to signal breaking changes, enhancements, and fixes.      |
| Scoped Feeds & Views | Organize packages by project, environment, or team to simplify discovery and access control. |
| Retention Policies   | Automatically clean up old or unused packages to manage storage costs.                       |

> [!important]
> **Warning**
>
> Misconfigured retention policies can inadvertently delete packages in use. Always verify your cleanup rules before applying.

## References & Resources

- [Azure Artifacts Documentation](https://learn.microsoft.com/azure/devops/artifacts/)
- [GitHub Packages Guide](https://docs.github.com/packages)
- [NuGet Documentation](https://docs.microsoft.com/nuget/)
- [npm Documentation](https://docs.npmjs.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/54c26a08-243e-448b-bba5-3fbefddf9145/lesson/272b4f1e-99e8-40b3-aff0-c440b603fe9a)**
>
> Watch video content
