# TechDocs Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/TechDocs-Search/TechDocs-Basics)

---

## Table of Contents

- TechDocs Basics
  - How TechDocs Works Under the Hood
  - Local Builder Configuration
  - Offloading Builds to CI/CD
  - Repository Setup
  - Links and References
  - Watch Video
    - TechDocs Pipeline Stages
    - Example: GitHub Actions Workflow

---

## Content

Certified Backstage Associate (CBA)

TechDocs Search

# TechDocs Basics

In this guide, you’ll learn how to power your documentation alongside your code using **TechDocs** in [Backstage](https://backstage.io). Backstage is an open platform for building developer portals, giving your team a single place to discover, manage, and maintain software and its documentation.

Each service or component in Backstage features a **Documentation** tab that renders Markdown files stored alongside the code.

![The image shows a software interface for a "shopping-cart" service, highlighting features like "View TechDocs" and "View Source," with sections for overview, CI/CD, API, dependencies, and documentation. It also includes details about the service, such as description, owner, system, type, and tags.](https://kodekloud.com/kk-media/image/upload/v1752870193/notes-assets/images/Certified-Backstage-Associate-CBA-TechDocs-Basics/shopping-cart-service-interface.jpg)

When you click **Documentation**, TechDocs fetches and displays your site in one unified view.

---

## How TechDocs Works Under the Hood

TechDocs relies on [MkDocs](https://www.mkdocs.org/) to transform Markdown into a static HTML site. The three core stages are:

![The image shows a process where MKDocs is used to convert documents into HTML format, indicated by an arrow pointing from a stack of documents to an HTML icon.](https://kodekloud.com/kk-media/image/upload/v1752870195/notes-assets/images/Certified-Backstage-Associate-CBA-TechDocs-Basics/mkdocs-documents-to-html-process.jpg)

1.  **Prepare** – Retrieve Markdown files from your Git repository.
2.  **Generate** – Run MkDocs to convert those `.md` files into HTML.
3.  **Publish** – Store the generated site in a location Backstage can serve (local disk, [AWS S3](https://aws.amazon.com/s3), [GCS](https://cloud.google.com/storage), etc.).

### TechDocs Pipeline Stages

![The image illustrates a "Prepare Step" process involving scanning GitHub to retrieve markdown documentation, featuring icons for GitHub and markdown.](https://kodekloud.com/kk-media/image/upload/v1752870196/notes-assets/images/Certified-Backstage-Associate-CBA-TechDocs-Basics/prepare-step-github-markdown-scan.jpg)

| Stage    | Description                                                   | Example Storage   |
| -------- | ------------------------------------------------------------- | ----------------- |
| Prepare  | Fetches Markdown (`.md`) files from GitHub (or other VCS).    | N/A               |
| Generate | Uses MkDocs (via Docker or local binary) to build HTML pages. | N/A               |
| Publish  | Uploads the HTML site to a static host or bucket.             | Local FS, S3, GCS |

![The image is a flowchart illustrating a "Prepare Step" process involving three stages: Preparer, Generator, and Publisher, with outputs stored in a local file system or S3 bucket.](https://kodekloud.com/kk-media/image/upload/v1752870197/notes-assets/images/Certified-Backstage-Associate-CBA-TechDocs-Basics/prepare-step-flowchart-preparer-generator-publisher.jpg)

When a user views the docs, Backstage serves the pre-published HTML directly.

---

## Local Builder Configuration

By default, Backstage can handle all TechDocs stages using the **local** builder. Configure this in your `app-config.yaml`:

```
techdocs:
  builder: local
  generator:
    runIn: docker
    dockerImage: spotify/techdocs
  publisher:
    type: local
    local:
      publishDirectory: /var/backstage/techdocs
```

- **builder: local** enables Backstage to run prepare, generate, and publish phases.
- **generator** options:
  - `runIn: docker` uses the specified `dockerImage`.
  - `runIn: local` executes MkDocs via a binary on the host.
- **publisher** defines where to store static HTML (here, a local directory).

> [!important]
> **Note**
>
> Ensure the Backstage process has write permissions to the `publishDirectory` path.

---

## Offloading Builds to CI/CD

For larger teams or heavy documentation sites, you can offload generate and publish steps to your CI/CD pipeline. This approach uses the **external** builder in Backstage:

1.  A commit to `docs/**` or `mkdocs.yml` triggers your CI/CD workflow.
2.  CI/CD installs the TechDocs CLI and MkDocs dependencies.
3.  Run `techdocs-cli generate` then `techdocs-cli publish` to an S3 bucket.
4.  Configure Backstage to use the **external** builder and fetch published HTML from that bucket.

![The image illustrates a CI/CD workflow for generating and publishing documentation, involving steps like installing Techdocs CLI, generating docs, and publishing them to an S3 bucket, with integration from GitHub and developer input.](https://kodekloud.com/kk-media/image/upload/v1752870199/notes-assets/images/Certified-Backstage-Associate-CBA-TechDocs-Basics/ci-cd-workflow-techdocs-s3.jpg)

### Example: GitHub Actions Workflow

```
name: Publish TechDocs Site
on:
  push:
    branches:
      - main
    paths:
      - 'docs/**'
      - 'mkdocs.yml'

jobs:
  publish-techdocs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.9'
      - name: Install TechDocs CLI
        run: sudo npm install -g @techdocs/cli
      - name: Install MkDocs
        run: pip install mkdocs-techdocs-core==1.*
      - name: Generate site
        run: techdocs-cli generate --no-docker --verbose
      - name: Publish site to S3
        run: |
          techdocs-cli publish \
            --publisher-type awsS3 \
            --storage-name $TECHDOCS_S3_BUCKET_NAME \
            --entity $ENTITY_NAMESPACE/$ENTITY_KIND/$ENTITY_NAME
```

Update `app-config.yaml` in Backstage:

```
techdocs:
  builder: external
  publisher:
    type: awsS3
    awsS3:
      bucketName: $TECHDOCS_S3_BUCKET_NAME
      region: us-east-1
```

> [!important]
> **Warning**
>
> Make sure your CI/CD environment has permissions to write to your S3 bucket and that Backstage IAM roles can read from it.

---

## Repository Setup

Every service repository needs two configuration files:

1.  **mkdocs.yml** at the project root:

    ```
    site_name: 'example-docs'
    nav:
      - Home: index.md
    plugins:
      - techdocs-core
    ```

2.  **catalog-info.yaml** with a TechDocs reference:

    ```
    apiVersion: backstage.io/v1beta1
    kind: Component
    metadata:
      name: shopping-cart
      description: shopping cart API
      annotations:
        backstage.io/techdocs-ref: dir:.
      tags:
        - javascript
    spec:
      type: service
      lifecycle: production
      owner: shopping-team
    ```

The annotation `backstage.io/techdocs-ref: dir:.` tells TechDocs where to find your Markdown files (adjust `dir:` if using a `docs/` subfolder).

Once configured, Backstage will automatically surface your up-to-date documentation alongside the service catalog.

---

## Links and References

- [Backstage Documentation](https://backstage.io/docs)
- [MkDocs Official Site](https://www.mkdocs.org/)
- [TechDocs CLI](https://github.com/backstage/techdocs-cli)
- [AWS S3 Storage](https://aws.amazon.com/s3)
- [Google Cloud Storage](https://cloud.google.com/storage)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/ea371bfc-3770-4d25-80ef-e464e4b24fda/lesson/1401121b-7c6d-480b-8c78-0df1a6d9e346)**
>
> Watch video content
