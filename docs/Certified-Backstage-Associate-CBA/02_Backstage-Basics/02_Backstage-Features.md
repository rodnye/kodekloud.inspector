# Backstage Features - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Backstage-Basics/Backstage-Features)

---

## Table of Contents

- Backstage Features
  - Software Catalog
  - Templates
  - Documentation
  - Search
  - Plugins
  - Summary
  - Links and References
  - Watch Video
    - Why Use Templates?
    - Template Workflow Example

---

## Content

Certified Backstage Associate (CBA)

Backstage Basics

# Backstage Features

Backstage is an open-source [Internal Developer Portal (IDP)](https://backstage.io/) built on familiar technologies—[React](https://reactjs.org) for the frontend and [Node.js](https://nodejs.org)/[Express](https://expressjs.com) for the backend. By leveraging a plugin-based architecture, Backstage lets you customize and scale your developer experience using widely adopted tools.

Below are the core benefits you get out of the box:

![The image illustrates the benefits of Backstage, highlighting its open-source nature, high customizability, and use of React as a frontend library and Node.js as a backend library.](https://kodekloud.com/kk-media/image/upload/v1752870008/notes-assets/images/Certified-Backstage-Associate-CBA-Backstage-Features/backstage-benefits-open-source-react-node.jpg)

- **Open Source**: Community-driven platform with frequent updates.
- **Customizable**: Extend with plugins or build your own.
- **Familiar Stack**: React UI + Node/Express backend.
- **Scalable**: Designed to handle catalogs of thousands of services.
- **Secure**: Integrations with SSO, RBAC, and audit logging.

---

## Software Catalog

The Software Catalog offers a **single pane of glass** for every service, component, package, and application in your organization. It tracks ownership, lifecycle, metadata, and relationships—all automatically.

![The image shows a software catalog interface with a list of services, including details like name, owner, lifecycle, and description. It features options for creating components and support, with a sidebar for navigation.](https://kodekloud.com/kk-media/image/upload/v1752870009/notes-assets/images/Certified-Backstage-Associate-CBA-Backstage-Features/software-catalog-interface-services-list.jpg)

When you select a component, you see its detail page:

![The image shows a software catalog interface for "example-website," featuring an overview section with details about the website and a relations diagram illustrating connections with other components.](https://kodekloud.com/kk-media/image/upload/v1752870010/notes-assets/images/Certified-Backstage-Associate-CBA-Backstage-Features/example-website-software-catalog.jpg)

| Field       | Description                                         |
| ----------- | --------------------------------------------------- |
| Name        | Unique identifier of the component                  |
| Owner       | User or team responsible for maintenance            |
| Lifecycle   | Stage (e.g., `production`, `staging`, `deprecated`) |
| Description | Free-form summary of the purpose and functionality  |
| Relations   | Visual graph of dependencies and interactions       |

> [!important]
> **Note**
>
> The built-in relations graph requires **no extra configuration**—you immediately see how services connect.

---

## Templates

Backstage **templates** automate project scaffolding, enforcing organizational best practices. This dramatically cuts setup time and reduces configuration drift.

![The image is a flowchart titled "Out-of-the-Box Features – Templates," showing a sequence of steps for setting up software, including creating a GitHub repo, setting up tooling, provisioning a Kubernetes cluster, and deploying an application.](https://kodekloud.com/kk-media/image/upload/v1752870010/notes-assets/images/Certified-Backstage-Associate-CBA-Backstage-Features/out-of-the-box-features-templates-flowchart.jpg)

### Why Use Templates?

| Benefit                | Impact                                        |
| ---------------------- | --------------------------------------------- |
| Consistent Structure   | All projects share the same folder layout     |
| Pre-configured Tooling | Linting, testing, and CI/CD ready to go       |
| Error Reduction        | Fewer manual steps means fewer mistakes       |
| Faster Onboarding      | Developers start coding on day one            |
| Custom Stack Support   | Templates for Java, Node.js, Python, and more |

![The image is a presentation slide titled "Out-of-the-Box Features – Templates," highlighting the benefits of standardization in project scaffolding, such as maintaining consistency, simplifying onboarding, and facilitating smoother transitions. A wavy blue line with a circular endpoint is on the right side.](https://kodekloud.com/kk-media/image/upload/v1752870011/notes-assets/images/Certified-Backstage-Associate-CBA-Backstage-Features/out-of-the-box-features-templates.jpg)

> [!important]
> **Warning**
>
> Modifying templates directly in production can cause drift—always version-control your template definitions.

![The image is a presentation slide titled "Out-of-the-Box Features – Templates," highlighting automation benefits such as automating repetitive tasks and reducing errors. It features a wavy blue line with a pink circle and text about scaffolding new projects.](https://kodekloud.com/kk-media/image/upload/v1752870012/notes-assets/images/Certified-Backstage-Associate-CBA-Backstage-Features/out-of-the-box-features-templates-2.jpg)

Organizations can ship templates for any stack:

![The image lists "Out-of-the-Box Features – Templates" with options for Node.js, Java, Node.js API with API Gateway, Python, and React, each accompanied by their respective icons.](https://kodekloud.com/kk-media/image/upload/v1752870013/notes-assets/images/Certified-Backstage-Associate-CBA-Backstage-Features/out-of-the-box-features-templates-3.jpg)

### Template Workflow Example

1.  Select your template (e.g., **Python service**).
2.  Provide project metadata (name, owner, repo ID).
3.  Pick deployment target (EC2, ECS, EKS, Lambda).
4.  Review defaults and submit.

Backstage will:

- Create a GitHub repository with your organization’s naming conventions.
- Generate starter code, config files, and CI/CD pipelines.
- Provision cloud resources and deploy the initial release.

![The image illustrates a process where a new repository is created on GitHub, connected to an AWS EC2 instance, and then used to deploy an application.](https://kodekloud.com/kk-media/image/upload/v1752870014/notes-assets/images/Certified-Backstage-Associate-CBA-Backstage-Features/github-repo-aws-ec2-deployment.jpg)

---

## Documentation

Integrated docs keep your documentation **close to the code**. Backstage uses [MkDocs](https://www.mkdocs.org) to render Markdown on demand, right within the portal.

![The image shows a software interface for a "shopping-cart" service, featuring tabs like Overview, CI/CD, API, Dependencies, and Docs, with sections for About and Relations. It includes details such as description, owner, system, type, and tags.](https://kodekloud.com/kk-media/image/upload/v1752870015/notes-assets/images/Certified-Backstage-Associate-CBA-Backstage-Features/shopping-cart-service-interface.jpg)

Typical Markdown file structure:

```
my-service/
├── docs/
│   ├── index.md
│   ├── api.md
│   └── architecture.md
├── src/
│   ├── index.js
│   └── handlers.js
├── .gitignore
└── mkdocs.yml
```

```
// Sample code snippet in docs
function greet(name) {
  return `Hello, ${name}!`;
}


console.log(greet('Backstage'));
```

![The image shows a file directory structure with folders and files like `index.md`, `index.js`, `.gitignore`, and `package.json`, under the title "Out-of-the-Box Features – Docs."](https://kodekloud.com/kk-media/image/upload/v1752870015/notes-assets/images/Certified-Backstage-Associate-CBA-Backstage-Features/file-directory-structure-docs.jpg)

---

## Search

Backstage’s universal search indexes your catalog, docs, and even external sources like [Confluence](https://www.atlassian.com/software/confluence) or [Stack Exchange](https://stackexchange.com). Developers find everything from API docs to team wikis in one place.

---

## Plugins

Every feature in Backstage is a plugin—catalog, templates, docs, search—all are modular and interchangeable. You can install community plugins or develop your own.

![The image is a slide titled "Out-of-the-Box Features – Plugins," describing how plugins can customize the behavior of backstage, display UI elements, and integrate third-party services. It includes icons of a wrench and gears.](https://kodekloud.com/kk-media/image/upload/v1752870017/notes-assets/images/Certified-Backstage-Associate-CBA-Backstage-Features/out-of-the-box-plugins-features.jpg)

| Plugin Category | Description                              | Example Usage                     |
| --------------- | ---------------------------------------- | --------------------------------- |
| Analytics       | Collect usage metrics and telemetry      | `@backstage/plugin-analytics`     |
| Monitoring      | Display service health and alerts        | `@backstage/plugin-kubernetes`    |
| CI/CD           | Integrate build and deploy pipelines     | `@backstage/plugin-circleci`      |
| Issue Tracking  | Link tickets and bug reports             | `@backstage/plugin-jira`          |
| Custom UI       | Add bespoke components or visualizations | Your organization’s custom plugin |

![The image displays a grid of plugin features for a software platform, each with a brief description and an "Explore" button. The plugins cover various functionalities such as analytics, reporting, and monitoring.](https://kodekloud.com/kk-media/image/upload/v1752870018/notes-assets/images/Certified-Backstage-Associate-CBA-Backstage-Features/plugin-features-grid-software.jpg)

> [!important]
> **Note**
>
> Because the core catalog, docs, and search are all plugins, you can replace or extend any part of Backstage without touching the main codebase.

---

## Summary

Backstage is the **open-source framework** for building modern Internal Developer Portals. With a plugin-centric design on top of React and Node.js, you get:

- A centralized **Software Catalog**
- Reusable **Templates** for consistent scaffolding
- Inline **Documentation** powered by MkDocs
- Universal **Search** across your knowledge base
- An extensible **Plugin Ecosystem**

![The image is a summary slide describing Backstage, highlighting it as an open-source framework for creating IDPs, using libraries like React.js and Node.js, with features like a software catalog and plugins for extensibility.](https://kodekloud.com/kk-media/image/upload/v1752870019/notes-assets/images/Certified-Backstage-Associate-CBA-Backstage-Features/backstage-open-source-idp-summary.jpg)

---

## Links and References

- Backstage homepage: https://backstage.io/
- React: https://reactjs.org
- Node.js: https://nodejs.org
- Express: https://expressjs.com
- MkDocs: https://www.mkdocs.org
- Confluence: https://www.atlassian.com/software/confluence
- Stack Exchange: https://stackexchange.com

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/fcbbf923-69c3-4147-bd51-18db2bd18957/lesson/e41823d1-f7ba-4b00-babc-aa7df827f09e)**
>
> Watch video content
