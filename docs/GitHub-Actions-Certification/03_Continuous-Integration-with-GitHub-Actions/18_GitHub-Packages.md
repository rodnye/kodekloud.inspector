# GitHub Packages - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Actions-Certification/Continuous-Integration-with-GitHub-Actions/GitHub-Packages)

---

## Table of Contents

- GitHub Packages
  - What Is GitHub Packages?
  - Supported Ecosystems
  - Why Use GitHub Packages?
  - Integration with GitHub Actions
  - Authentication
  - Links and References
  - Watch Video
    - Example Workflows
      - Publish an npm Package
      - Build and Push a Docker Image
      - Deploy a Maven Artifact
      - Push a .NET NuGet Package

---

## Content

GitHub Actions Certification

Continuous Integration with GitHub Actions

# GitHub Packages

Imagine your organization has multiple teams working on projects in Node.js, Ruby, .NET, Java—and running Docker containers. Each team uses GitHub Actions to build, package, and publish artifacts to external registries like [npm Registry](https://www.npmjs.com/), [RubyGems](https://rubygems.org/), [Maven](https://maven.apache.org/), [Docker Hub](https://hub.docker.com/), and [NuGet](https://www.nuget.org/). Managing credentials for all these services can quickly become a headache.

![The image illustrates GitHub Packages, showing various programming languages and tools like JavaScript, Ruby, and Docker, linked to their respective package registries or repositories such as npm, RubyGems, and Docker.](https://kodekloud.com/kk-media/image/upload/v1752875946/notes-assets/images/GitHub-Actions-Certification-GitHub-Packages/github-packages-programming-languages-tools.jpg)

By consolidating your packages into a single registry—GitHub Packages—you streamline authentication, governance, and version control. Publish and consume packages alongside your code without juggling multiple credentials.

## What Is GitHub Packages?

GitHub Packages is a native package hosting service that lives alongside your repositories. It supports multiple ecosystems, provides fine-grained access control, and integrates directly with GitHub Actions to automate your CI/CD pipelines.

![The image is a presentation slide about GitHub Packages, featuring icons and text highlighting seamless integration with package managers and secure code sharing.](https://kodekloud.com/kk-media/image/upload/v1752875946/notes-assets/images/GitHub-Actions-Certification-GitHub-Packages/github-packages-integration-presentation-slide.jpg)

## Supported Ecosystems

GitHub Packages works with all major package managers and container registries:

| Ecosystem     | Registry URL                                    | Example Manager Action          |
| ------------- | ----------------------------------------------- | ------------------------------- |
| JavaScript    | `https://npm.pkg.github.com/`                   | actions/setup-node@v3           |
| Ruby          | `https://rubygems.pkg.github.com/`              | ruby/setup-ruby@v1              |
| Java (Maven)  | `https://maven.pkg.github.com/OWNER/REPO`       | actions/setup-java@v3           |
| Java (Gradle) | same as Maven                                   | gradle config in `build.gradle` |
| Docker        | `ghcr.io`                                       | docker/login-action@v2          |
| .NET (NuGet)  | `https://nuget.pkg.github.com/OWNER/index.json` | actions/setup-dotnet@v2         |

![The image illustrates GitHub Packages, showing different programming languages and tools like JavaScript, Ruby, and Docker, and their corresponding package managers such as npm registry and RubyGems.](https://kodekloud.com/kk-media/image/upload/v1752875948/notes-assets/images/GitHub-Actions-Certification-GitHub-Packages/github-packages-programming-languages-tools-2.jpg)

## Why Use GitHub Packages?

- **Centralized management**  
  Keep code, CI/CD workflows, and packages in one place for consistent versioning.
- **Secure distribution**  
  Leverage private packages or granular access controls tied to your GitHub org.
- **Streamlined workflows**  
  Publish & consume packages in the same Actions workflow—no external credentials needed.

![The image highlights three benefits of using GitHub Packages: centralized management, secure distribution, and simplified workflow, each represented by an icon.](https://kodekloud.com/kk-media/image/upload/v1752875949/notes-assets/images/GitHub-Actions-Certification-GitHub-Packages/github-packages-benefits-icons.jpg)

## Integration with GitHub Actions

GitHub Actions automates build, test, and publish steps to your GitHub Packages registry. Each package manager exposes a unique endpoint:

![The image illustrates GitHub Actions with GitHub Packages, showing package registry endpoints for npm, maven, nuget, and rubygems, alongside a container registry endpoint for ghcr.io.](https://kodekloud.com/kk-media/image/upload/v1752875950/notes-assets/images/GitHub-Actions-Certification-GitHub-Packages/github-actions-packages-registry-diagram.jpg)

### Example Workflows

#### Publish an npm Package

```
# .github/workflows/publish-npm.yml
name: Publish npm Package
on:
  push:
    branches: [ main ]
jobs:
  build-and-publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          registry-url: 'https://npm.pkg.github.com/'

      - name: Publish to GitHub Packages
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

#### Build and Push a Docker Image

```
# .github/workflows/docker-publish.yml
name: Build and Push Docker Image
on:
  push:
    tags: [ 'v*' ]
jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and Push
        run: |
          docker build -t ghcr.io/${{ github.repository }}/my-app:latest .
          docker push ghcr.io/${{ github.repository }}/my-app:latest
```

#### Deploy a Maven Artifact

```
# .github/workflows/maven-deploy.yml
name: Publish Maven Artifacts
on:
  push:
    tags: [ 'v*' ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up Java
        uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '11'
          server-id: github
          settings-path: ${{ github.workspace }}

      - name: Deploy to GitHub Packages
        run: mvn deploy
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

#### Push a .NET NuGet Package

```
# .github/workflows/nuget-publish.yml
name: Publish NuGet Package
on:
  push:
    branches: [ main ]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Set up .NET
        uses: actions/setup-dotnet@v2
        with:
          dotnet-version: '6.x'

      - name: Push to GitHub Packages
        run: |
          dotnet nuget push MyPackage.nupkg \
            --api-key ${{ secrets.GITHUB_TOKEN }} \
            --source "https://nuget.pkg.github.com/${{ github.repository_owner }}/index.json"
```

## Authentication

All of these workflows rely on the built-in `GITHUB_TOKEN`. This secret is automatically created for each workflow run and scoped to the repository:

- Grants read/write access to GitHub Packages.
- Requires no extra setup or manual credential management.
- Automatically expires when the workflow completes.

> [!important]
> **Note**
>
> If you need to publish packages across multiple repositories or organizations, consider using a [Personal Access Token (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) with the appropriate scopes.

## Links and References

- [GitHub Packages Documentation](https://docs.github.com/packages)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [npm Registry](https://www.npmjs.com/)
- [RubyGems](https://rubygems.org/)
- [Apache Maven](https://maven.apache.org/)
- [Docker Hub](https://hub.docker.com/)
- [NuGet Gallery](https://www.nuget.org/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-actions-certification/module/56d72a06-285c-4516-9880-073fb56f579b/lesson/c8d70bad-a81b-4bf2-bfbf-55dac325686c)**
>
> Watch video content
