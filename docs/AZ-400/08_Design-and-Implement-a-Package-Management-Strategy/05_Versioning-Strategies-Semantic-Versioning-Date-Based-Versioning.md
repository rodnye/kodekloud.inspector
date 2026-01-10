# Versioning Strategies Semantic Versioning Date Based Versioning - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-400/Design-and-Implement-a-Package-Management-Strategy/Versioning-Strategies-Semantic-Versioning-Date-Based-Versioning)

---

## Table of Contents

- Versioning Strategies Semantic Versioning Date Based Versioning
  - Getting Started
  - Semantic Versioning (Major.Minor.Patch)
  - Date-Based Versioning (YYYY.MM.DD.BUILD)
  - Comparing Versioning Strategies
  - Choosing Your Strategy
  - References
  - Watch Video
    - 1. Incrementing Major
    - 2. Incrementing Minor
    - 3. Incrementing Patch
    - Real-World Workflow
    - Example Builds

---

## Content

AZ-400: Designing and Implementing Microsoft DevOps Solutions

Design and Implement a Package Management Strategy

# Versioning Strategies Semantic Versioning Date Based Versioning

In modern software development, a clear versioning strategy ensures consistency, compatibility, and traceability. This guide compares two popular approaches—[Semantic Versioning](https://semver.org/) (SemVer) and Date-Based Versioning—demonstrated with a simple .NET console application. You’ll learn how to set up each scheme, understand their advantages, and choose the best fit for your CI/CD pipeline in environments like Azure DevOps.

## Getting Started

Begin by creating a new .NET console app and setting an initial version:

```
dotnet new console -n VersioningDemo
cd VersioningDemo
```

Open `Program.cs` and add a `version` field:

```
using System;


namespace VersioningDemo
{
    // Version number will be updated per strategy
    static class Program
    {
        static string version = "v0.0.0";


        static void Main(string[] args)
        {
            Console.WriteLine("Hello, Azure DevOps!");
            Console.WriteLine($"Version: {version}");
        }
    }
}
```

Run the app to verify:

```
dotnet run
# Output:
# Hello, Azure DevOps!
# Version: v0.0.0
```

---

## Semantic Versioning (Major.Minor.Patch)

Semantic Versioning (SemVer) uses a three-part format: **MAJOR.MINOR.PATCH**. It’s ideal for libraries and APIs where backward compatibility matters.

- **Major**: Breaking changes
- **Minor**: New, backwards-compatible features
- **Patch**: Bug fixes and small enhancements

> [!important]
> **Note**
>
> Follow [semver.org](https://semver.org/) guidelines to maintain consistency across releases.

### 1\. Incrementing Major

When you introduce breaking changes:

```
static string version = "v1.0.0";
```

```
dotnet run
# Version: v1.0.0
```

### 2\. Incrementing Minor

For new, non-breaking features:

```
static string version = "v1.2.0";
```

```
dotnet run
# Version: v1.2.0
```

### 3\. Incrementing Patch

For bug fixes or tweaks:

```
static string version = "v1.2.1";
```

```
dotnet run
# Version: v1.2.1
```

### Real-World Workflow

1.  Fix a bug → **Patch**: `v1.2.1`
2.  Add a feature → **Minor**: `v1.3.1`
3.  Revamp API (breaking) → **Major**: `v2.0.0`

**Benefits of Semantic Versioning**

- Clear upgrade path: patch/minor safe, major breaking
- Widely adopted by package managers (NuGet, npm)
- Communicates intent to consumers

---

## Date-Based Versioning (YYYY.MM.DD.BUILD)

Date-Based Versioning encodes the release date and a daily build counter. It’s perfect for fast-paced CI/CD workflows.

```
YYYY.MM.DD.BUILD
```

### Example Builds

First build on October 3, 2024:

```
static string version = "2024.10.03.01";
```

```
dotnet run
# Version: 2024.10.03.01
```

Second build same day:

```
static string version = "2024.10.03.02";
```

```
dotnet run
# Version: 2024.10.03.02
```

> [!important]
> **Note**
>
> Build counter resets daily. Useful for tracking exact deploy date in high-frequency releases.

**Benefits of Date-Based Versioning**

- Immediate insight into release date
- Simplifies automated CI pipelines
- No ambiguity about build sequence

---

## Comparing Versioning Strategies

| Strategy              | Format            | Use Case                                    | Pros                                                  |
| --------------------- | ----------------- | ------------------------------------------- | ----------------------------------------------------- |
| Semantic Versioning   | MAJOR.MINOR.PATCH | Libraries, APIs, traditional release cycles | Predictable compatibility, standard across ecosystems |
| Date-Based Versioning | YYYY.MM.DD.BUILD  | Rapid CI/CD, daily deployments              | Clear date tracking, easy automation                  |

---

## Choosing Your Strategy

- **Semantic Versioning**  
  Ideal for API-driven products and packages where compatibility communication is critical.
- **Date-Based Versioning**  
  Best for teams with continuous deployment, where the exact release date and order matter more than change scope.

Select the approach that aligns with your development workflow, tooling (e.g., Azure DevOps pipelines), and stakeholder requirements.

---

## References

- [Semantic Versioning Specification](https://semver.org/)
- [.NET Standard Documentation](https://docs.microsoft.com/dotnet/standard/net-standard)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Azure DevOps Documentation](https://learn.microsoft.com/azure/devops/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-400/module/54c26a08-243e-448b-bba5-3fbefddf9145/lesson/2640024f-8fd2-4d09-81c9-8e78df5b33f0)**
>
> Watch video content
