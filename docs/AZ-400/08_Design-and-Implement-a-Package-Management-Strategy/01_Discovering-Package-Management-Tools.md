# Discovering Package Management Tools - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-a-Package-Management-Strategy/Discovering-Package-Management-Tools)

---

## Table of Contents

- Discovering Package Management Tools
  - Introduction
  - Key Package Management Tools at a Glance
  - Azure Artifacts
  - GitHub Packages
  - NuGet
  - npm
  - Further Reading
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement a Package Management Strategy

# Discovering Package Management Tools

Design and Implementation of a Package Management Strategy

## Introduction

In this lesson, we explore package management in **Azure DevOps** and **GitHub**—critical components of modern software development and CI/CD pipelines. We’ll start by defining package management, then highlight why it matters. Finally, we’ll dive into four main tools:

- Azure Artifacts
- GitHub Packages
- NuGet
- npm

![The image is an introduction slide for "Package Management in Azure DevOps and GitHub," highlighting three sections: definition of package management, its importance in software development and CI/CD, and an overview of tools like Azure Artifacts and GitHub Packages.](https://kodekloud.com/kk-media/image/upload/v1752867904/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Discovering-Package-Management-Tools/package-management-azure-devops-github.jpg)

## Key Package Management Tools at a Glance

| Tool            | Platform     | Supported Packages                         | Highlights                                      |
| --------------- | ------------ | ------------------------------------------ | ----------------------------------------------- |
| Azure Artifacts | Azure DevOps | NuGet, npm, Maven, Python, universal feeds | Upstream sources, seamless CI/CD integration    |
| GitHub Packages | GitHub       | npm, NuGet, Maven, RubyGems, Docker images | Native auth, GitHub Actions workflows           |
| NuGet           | .NET         | .NET libraries and tools                   | Visual Studio & `dotnet` CLI integration        |
| npm             | Node.js      | JavaScript modules                         | Vast registry, script support, dependency audit |

> [!important]
> **Why Package Management Matters**
>
> Consistent versioning, faster builds, and secure dependency control are essential for scalable CI/CD. A unified registry reduces “works on my machine” issues and simplifies audits.

---

## Azure Artifacts

Azure Artifacts is a universal package management solution built into Azure DevOps. It allows teams to:

- Store and version packages in one central location
- Proxy public registries using **upstream sources**
- Integrate directly with Azure Pipelines for seamless CI/CD

```
# Example: Publish a NuGet package in Azure Pipelines
steps:
  - task: NuGetCommand@2
    inputs:
      command: 'push'
      packagesToPush: '**/*.nupkg'
      publishVstsFeed: 'your-feed-name'
```

> [!important]
> **Upstream Sources**
>
> Use upstream sources to cache npm, Maven, or PyPI packages—reducing build times and improving reliability.

---

## GitHub Packages

GitHub Packages is GitHub’s integrated registry, working with **GitHub Actions** and repository permissions.

- **Authentication**: Uses your GitHub account credentials
- **Supported Formats**: npm, NuGet, Maven, RubyGems, Docker, and more
- **Access Control**: Repository-level permissions and fine-grained scopes

```
# Example: Publish npm package with GitHub Actions
name: Publish npm Package
on:
  push:
    tags:
      - 'v*.*.*'
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## NuGet

NuGet is the de facto package manager for the .NET ecosystem, providing:

- Distribution of libraries and CLI tools
- Integration with **Visual Studio** and the `.NET CLI`
- Automatic dependency resolution and semantic versioning

```
# Install a package
dotnet add package Newtonsoft.Json --version 13.0.1


# Restore dependencies
dotnet restore
```

---

## npm

npm is the largest registry for JavaScript and Node.js packages, featuring:

- Over a million modules and growing
- Simple commands: `npm install`, `npm update`
- Scripts, semantic versioning, and built-in security audits

![The image is an informational graphic about npm, highlighting it as the largest software registry and part of the JavaScript ecosystem. It features two sections: "What is npm?" and "Key Features."](https://kodekloud.com/kk-media/image/upload/v1752867905/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Discovering-Package-Management-Tools/npm-software-registry-infographic.jpg)

```
# Install dependencies
npm install


# Run a project script
npm run build


# Audit for vulnerabilities
npm audit fix
```

> [!important]
> **Security Tip**
>
> Regularly run `npm audit` and review advisories. Use lockfiles (`package-lock.json`) to ensure reproducible builds.

---

## Further Reading

- [Azure Artifacts Documentation](https://docs.microsoft.com/azure/devops/artifacts/)
- [GitHub Packages](https://docs.github.com/packages)
- [NuGet Docs](https://docs.microsoft.com/nuget/)
- [npm Documentation](https://docs.npmjs.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/54c26a08-243e-448b-bba5-3fbefddf9145/lesson/48289a08-237e-4523-9209-3d192dc759c8)**
>
> Watch video content
