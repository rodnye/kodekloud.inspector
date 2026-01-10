# Exploring GitHub Packages - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-a-Package-Management-Strategy/Exploring-GitHub-Packages)

---

## Table of Contents

- Exploring GitHub Packages
  - 1. Scaffold the .NET Class Library
  - 2. Configure NuGet Package Metadata
  - 3. Build and Pack the Library
  - 4. Generate a GitHub Personal Access Token
  - 5. Register GitHub Packages as a NuGet Source
  - 6. Publish the Package
  - 7. Consume the Package in a Blazor WASM App
  - References
  - Watch Video

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement a Package Management Strategy

# Exploring GitHub Packages

GitHub Packages enables you to host and manage code dependencies alongside your repositories. In this guide, we’ll walk through publishing a .NET class library to GitHub Packages and consuming it in a Blazor WebAssembly app.

In this tutorial, you will:

1.  Scaffold a .NET class library (`KodeKonvert`).
2.  Configure NuGet package metadata in Visual Studio.
3.  Build and pack the library.
4.  Generate a GitHub Personal Access Token (PAT).
5.  Register GitHub Packages as a NuGet source.
6.  Push your `.nupkg` to GitHub Packages.
7.  Consume the package in a new Blazor WASM project.

---

## 1\. Scaffold the .NET Class Library

1.  Open Visual Studio.
2.  Create a new **Class Library** project.
3.  Rename the project to **KodeKonvert**.
4.  Target .NET 8.0 and confirm a successful build:

```
dotnet build
# success: 1 succeeded
```

---

## 2\. Configure NuGet Package Metadata

In **Solution Explorer**, right-click **KodeKonvert** → **Properties** → **Package**. Set the following values:

| Property                        | Value                                 |
| ------------------------------- | ------------------------------------- |
| Package ID                      | KodeKonvert                           |
| Version                         | 1.0.0                                 |
| Authors                         | KodeKloud                             |
| Description                     | Simple library to convert temperature |
| Generate NuGet package on build | ✔ Enabled                             |

![The image shows a Visual Studio interface with a project named "KodeKonvert" open. It displays the package settings for generating a NuGet package, including fields for Package ID, Title, Version, and Authors, along with a build output at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752867913/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Exploring-GitHub-Packages/visual-studio-kodekonvert-nuget-package.jpg)

Save and close the Properties pane.

---

## 3\. Build and Pack the Library

From your terminal:

```
dotnet build --configuration Release
dotnet pack --configuration Release
```

You should see:

```
Successfully created package "bin/Release/KodeKonvert.1.0.0.nupkg".
```

Remember the full path to the generated `.nupkg` file for later steps.

---

## 4\. Generate a GitHub Personal Access Token

1.  In GitHub, navigate to **Settings > Developer settings > Personal access tokens**.
2.  Click **Generate new token** (classic or fine-grained).
3.  Assign minimal scopes:
    - `read:packages`
    - `write:packages`
    - `repo` (only if you publish from a private repo)
4.  Copy the token **once** when presented.

> [!important]
> **Note**
>
> Store your PAT securely; you’ll need it to authenticate your NuGet source and to push packages.

![The image shows a GitHub page for creating a new personal access token, with options to set a note, expiration, and select various scopes for permissions.](https://kodekloud.com/kk-media/image/upload/v1752867914/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Exploring-GitHub-Packages/github-personal-access-token-creation.jpg)

---

## 5\. Register GitHub Packages as a NuGet Source

Add the GitHub Packages feed to your NuGet configuration:

```
dotnet nuget add source \
  --username YOUR_GITHUB_USERNAME \
  --password YOUR_PERSONAL_ACCESS_TOKEN \
  --store-password-in-clear-text \
  --name github \
  https://nuget.pkg.github.com/YOUR_GITHUB_USERNAME/index.json
```

> [!important]
> **Warning**
>
> Using `--store-password-in-clear-text` will save your PAT in plain text. Ensure your machine is secure.

Verify the source:

```
dotnet nuget list source
```

---

## 6\. Publish the Package

Push the `.nupkg` to your GitHub Packages feed:

```
dotnet nuget push bin/Release/KodeKonvert.1.0.0.nupkg \
  --source github \
  --api-key YOUR_PERSONAL_ACCESS_TOKEN
```

Expected output:

```
Pushing KodeKonvert.1.0.0.nupkg to 'https://nuget.pkg.github.com/YOUR_GITHUB_USERNAME'...
OK https://nuget.pkg.github.com/YOUR_GITHUB_USERNAME/ 380ms
Your package was pushed.
```

![The image shows a GitHub settings page for managing personal access tokens, with options to generate new tokens and view existing ones. It includes details about token usage and expiration dates.](https://kodekloud.com/kk-media/image/upload/v1752867916/notes-assets/images/AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Exploring-GitHub-Packages/github-settings-personal-access-tokens.jpg)

Head over to your repository’s **Packages** section to confirm that `KodeKonvert` v1.0.0 is listed.

---

## 7\. Consume the Package in a Blazor WASM App

1.  Create a Blazor WebAssembly project:

```
dotnet new blazorwasm -o testweb
cd testweb
```

2.  Ensure the GitHub NuGet source is available:

```
dotnet nuget list source
```

3.  Add your package:

```
dotnet add package KodeKonvert --version 1.0.0
```

Sample output:

```
info : Adding PackageReference for package 'KodeKonvert' into project 'testweb.csproj'.
info : Installed KodeKonvert 1.0.0 from https://nuget.pkg.github.com/YOUR_GITHUB_USERNAME/...
```

You can now call `KodeKonvert` APIs in your Blazor components.

---

## References

- [GitHub Packages Documentation](https://docs.github.com/packages)
- [NuGet CLI Reference](https://learn.microsoft.com/nuget/reference/cli-reference/overview)
- [ASP.NET Core Blazor](https://docs.microsoft.com/aspnet/core/blazor/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/54c26a08-243e-448b-bba5-3fbefddf9145/lesson/a3ab2927-dbe3-491f-a3f4-cf8458679e4f)**
>
> Watch video content
