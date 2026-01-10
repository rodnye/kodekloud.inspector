# Demo TechDocs Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/TechDocs-Search/Demo-TechDocs-Basics)

---

## Table of Contents

- Demo TechDocs Basics
  - Viewing Docs in Backstage
  - 1. TechDocs Plugin Registration
  - 2. Configuring TechDocs in app-config.yaml
  - 3. Preparing Your Component Repository
  - 4. MkDocs Configuration
  - 5. Annotating catalog-info.yaml
  - 6. Viewing TechDocs in Backstage
  - Summary
  - References
  - Watch Video
  - Practice Lab
    - Available Publisher Options

---

## Content

Certified Backstage Associate (CBA)

TechDocs Search

# Demo TechDocs Basics

In this guide, we’ll show you how to enable Backstage’s TechDocs plugin so each component in your catalog links directly to its documentation. You’ll learn how to register the plugin, configure it in `app-config.yaml`, set up MkDocs in your repo, and annotate your component so Backstage can discover and render the docs.

![The image shows a dashboard interface for a "shopping-cart" service in Backstage, displaying its overview, description, and relations with other APIs and services.](https://kodekloud.com/kk-media/image/upload/v1752870183/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-TechDocs-Basics/shopping-cart-dashboard-backstage-overview.jpg)

## Viewing Docs in Backstage

On your component page, click the **Docs** tab to see the generated site—complete with a table of contents, headings, and navigation sidebar.

![The image shows a documentation page for a "shopping-cart" component, featuring various heading styles and a table of contents on the right. The interface includes a sidebar with navigation options like Home, APIs, and Docs.](https://kodekloud.com/kk-media/image/upload/v1752870184/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-TechDocs-Basics/shopping-cart-documentation-sidebar.jpg)

## 1\. TechDocs Plugin Registration

Backstage includes TechDocs plugins for both frontend and backend. In your backend entrypoint (e.g., `packages/backend/src/index.ts`), you’ll find:

```
import { createBackend } from '@backstage/backend-defaults';


const backend = createBackend();


backend.add(import('@backstage/plugin-app-backend'));
backend.add(import('@backstage/plugin-proxy-backend'));
backend.add(import('@backstage/plugin-scaffolder-backend'));
backend.add(import('@backstage/plugin-scaffolder-backend-module-github'));
backend.add(import('@backstage/plugin-techdocs-backend'));


// auth plugin
backend.add(import('@backstage/plugin-auth-backend'));
backend.add(import('@backstage/plugin-auth-backend-module-guest-provider'));


// catalog plugin
backend.add(import('@backstage/plugin-catalog-backend'));
```

No extra registration steps are required—just configure the plugin in `app-config.yaml`.

## 2\. Configuring TechDocs in app-config.yaml

Open `app-config.yaml` and locate the `techdocs` section. The defaults are:

```
techdocs:
  builder: 'local'         # Use 'external' for a dedicated builder service
  generator:
    runIn: 'docker'        # 'local' runs without Docker
  publisher:
    type: 'local'          # Choices: 'googleGcs', 'awsS3'
auth:
  # See https://backstage.io/docs/auth/ for auth providers
```

> [!important]
> **Note**
>
> This configuration uses Docker to build your docs and stores HTML on the local filesystem. To publish to Google Cloud Storage or AWS S3, switch `publisher.type`.

### Available Publisher Options

| Publisher Type | Description                         | When to Use           |
| -------------- | ----------------------------------- | --------------------- |
| local          | Store artifacts on local filesystem | Quick local testing   |
| googleGcs      | Store in Google Cloud Storage       | GCP-based workflows   |
| awsS3          | Store in AWS S3 buckets             | AWS-based deployments |

## 3\. Preparing Your Component Repository

Let’s assume your service is named **recommendation-service**. The root directory should include:

- `package.json`
- `catalog-info.yaml`
- `.gitignore`
- `mkdocs.yml`
- `docs/` directory

Example `package.json`:

```
{
  "name": "recommendation-service",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.21.2"
  }
}
```

![The image shows a Visual Studio Code interface with a `.gitignore` file open, containing the entry `node_modules/`. The file explorer on the left displays a project structure with various files and folders.](https://kodekloud.com/kk-media/image/upload/v1752870185/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-TechDocs-Basics/vscode-gitignore-node-modules.jpg)

## 4\. MkDocs Configuration

Create `mkdocs.yml` in your repo root to define your documentation site:

```
site_name: 'recommendation-service-docs'
nav:
  - Home: index.md
  - Getting Started: getting-started.md
  - API Reference: api.md
theme:
  name: material
plugins:
  - techdocs-core
```

All Markdown files go into the `docs/` folder:

```
recommendation-service/
├── docs/
│   ├── index.md
│   ├── getting-started.md
│   └── api.md
├── mkdocs.yml
├── catalog-info.yaml
└── package.json
```

![The image shows a code editor with a Markdown file open, displaying various heading levels and a horizontal rule. The sidebar lists project files, and a terminal at the bottom shows a Git branch and version information.](https://kodekloud.com/kk-media/image/upload/v1752870186/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-TechDocs-Basics/code-editor-markdown-file-sidebar.jpg)

## 5\. Annotating catalog-info.yaml

Tell Backstage where your docs live by adding the `backstage.io/techdocs-ref` annotation:

```
apiVersion: backstage.io/v1beta1
kind: Component
metadata:
  name: recommendation-service
  description: Recommendation service API
  annotations:
    backstage.io/techdocs-ref: dir:.
spec:
  type: service
  lifecycle: production
  owner: shopping-team
```

> [!important]
> **Warning**
>
> If you rename the `docs/` directory (for example to `documentation/`), update both `mkdocs.yml` (`docs_dir`) and the `techdocs-ref` annotation accordingly.

## 6\. Viewing TechDocs in Backstage

1.  Push your repository to GitHub (or your Git provider).
2.  Import the component in Backstage’s catalog.
3.  Click **View TechDocs** on the component page.

Backstage will fetch your Markdown, generate HTML, and render the site with the navigation you defined in `mkdocs.yml`.

## Summary

To integrate TechDocs into Backstage:

1.  Ensure `plugin-techdocs-backend` is registered.
2.  Configure the `techdocs` section in `app-config.yaml`.
3.  Add `mkdocs.yml` at the root of your component repo.
4.  Place all Markdown files in a `docs/` directory.
5.  Annotate `catalog-info.yaml` with `backstage.io/techdocs-ref`.

This local setup can be extended with external builders and cloud storage for production environments.

## References

- [Backstage TechDocs Plugin](https://backstage.io/docs/features/techdocs/techdocs-overview)
- [MkDocs Documentation](https://www.mkdocs.org/)
- [Backstage Configuration](https://backstage.io/docs/features/techdocs/configuration)
- [Backstage Authentication](https://backstage.io/docs/auth/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/ea371bfc-3770-4d25-80ef-e464e4b24fda/lesson/44ce2ea1-2bd5-4c6d-99ee-6159d2786336)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/ea371bfc-3770-4d25-80ef-e464e4b24fda/lesson/3c1a8d11-3762-4160-805d-6294b7c934ee)**
>
> Practice lab
