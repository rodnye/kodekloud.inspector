# Demo Exploring Backstage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Backstage-Basics/Demo-Exploring-Backstage)

---

## Table of Contents

- Demo Exploring Backstage
  - Homepage and Company Catalog
  - Component Details
  - API Exploration
  - Exploring Other Entities
  - My Company Catalog Interface
  - Documentation (TechDocs)
  - Software Templates
  - User Settings and Personalization
  - Next Steps
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Certified Backstage Associate (CBA)

Backstage Basics

# Demo Exploring Backstage

> [!important]
> **Note**
>
> Ensure you have Backstage installed and running before following along. Refer to the [Backstage Installation Guide](https://backstage.io/docs/getting-started/) for setup instructions.

In this demo, we’ll navigate Backstage’s Internal Developer Portal (IDP) features—from your company catalog to creating new services with templates. You’ll learn how to:

- Browse and filter entities
- Inspect component and API dashboards
- Search documentation with TechDocs
- Scaffold projects using built-in templates
- Customize your personal settings

---

## Homepage and Company Catalog

When you first log in, Backstage presents the **My Company Catalog**, listing all software entities your organization manages. In our demo, you’ll see:

- **example-website** (a sample website component)

Clicking any entry surfaces metadata such as owner, system, component type, and lifecycle stage, enabling quick discovery of relationships across your platform.

---

## Component Details

Select **example-website** to open its dashboard:

![The image shows a dashboard interface for a component named "example-website" in Backstage, displaying details like description, owner, lifecycle, and relations in a graph format.](https://kodekloud.com/kk-media/image/upload/v1752870025/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Exploring-Backstage/backstage-example-website-dashboard.jpg)

On the **Overview** tab you can:

- Jump to the source code repository
- Open TechDocs for in-depth documentation
- Review metadata: owner, system affiliation, type (website, API, library), and lifecycle (e.g., experimental)

Backstage also generates a relationship graph:

- Owned by the **Guests** group
- Belongs to the **Example** system
- Provides the **example-grpc-api** service/API

Click any node to navigate directly to related entities.

---

## API Exploration

Back at the homepage, filter by **APIs** and choose **example-grpc-api**:

![The image shows a dashboard interface for an API named "example-grpc-api" in Backstage, displaying an overview, relations graph, and details about the API's owner, system, and lifecycle.](https://kodekloud.com/kk-media/image/upload/v1752870026/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Exploring-Backstage/example-grpc-api-backstage-dashboard.jpg)

View the API’s definition in Protobuf:

```
syntax = "proto3";


service Example {
  rpc Example (ExampleMessage) returns (ExampleMessage);
}


message ExampleMessage {
  string example = 1;
}
```

For REST APIs, Backstage displays an OpenAPI/Swagger specification or similar docs instead.

---

## Exploring Other Entities

Backstage models everything as an **Entity**. Use the sidebar to browse:

| Entity Type | Description                                            | Example Entry       |
| ----------- | ------------------------------------------------------ | ------------------- |
| Components  | Services, websites, libraries with metadata dashboards | `example-website`   |
| APIs        | gRPC or REST endpoints along with their specifications | `example-grpc-api`  |
| Groups      | Teams or organizational units owning components/APIs   | `Guests`            |
| Users       | Individual developer profiles with access and settings | `alice@example.com` |

Filter or search (e.g., “example”) to quickly locate relevant entities and documentation.

---

## My Company Catalog Interface

![The image shows a software interface titled "My Company Catalog" with a list of components, including an "example-website." A dropdown menu is open, displaying options like API, Component, and Group.](https://kodekloud.com/kk-media/image/upload/v1752870027/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Exploring-Backstage/my-company-catalog-interface.jpg)

Viewing a **Group** (such as **Guests**) reveals:

- A list of owned components and APIs
- Associated users

Here’s a snippet of a sample group YAML configuration:

```
metadata:
  name: example
links:
  - url: https://dashboard.example.com
    title: My Dashboard
    icon: dashboard
```

---

## Documentation (TechDocs)

All project documentation is accessible under **Docs** or via the **View TechDocs** button on any component or API dashboard. The global search indexes TechDocs, making it easy to find keywords and navigate directly to the relevant content.

![The image shows a documentation search interface on a platform called Backstage, with search results for the term "example" including options like "Example Node.js Template" and "example-website."](https://kodekloud.com/kk-media/image/upload/v1752870028/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Exploring-Backstage/backstage-documentation-search-example.jpg)

> [!important]
> **Tip**
>
> Use inline Markdown links and headings in your TechDocs to improve searchability and SEO for your internal documentation.

---

## Software Templates

Backstage’s **Create** menu lets you scaffold new projects from predefined templates. By default, an example Node.js template is available:

![The image shows a web interface for creating a new component using an "Example Node.js Template" in Backstage, with fields for specifying the repository location on GitHub.](https://kodekloud.com/kk-media/image/upload/v1752870029/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Exploring-Backstage/backstage-nodejs-template-interface.jpg)

Steps to scaffold:

1.  Select the template (e.g., Example Node.js Template).
2.  Fill in required fields: project name, repository URL, etc.
3.  Review and confirm to provision a new service automatically.

> [!important]
> **Warning**
>
> When customizing templates, ensure your `cookiecutter` values and catalog-info.yaml annotations are valid YAML to avoid provisioning errors.

---

## User Settings and Personalization

Under **Settings**, configure:

- Your profile and authentication provider
- UI preferences (light/dark theme)

![The image shows a settings page from a software interface called "Backstage," featuring options for profile management, backstage identity, and appearance settings, including theme selection.](https://kodekloud.com/kk-media/image/upload/v1752870030/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Exploring-Backstage/backstage-settings-profile-appearance.jpg)

Additional personalization:

- **Star** your favorite components for quick access
- Filter the catalog to display only entities owned by your team

---

## Next Steps

You’ve now covered Backstage’s core features:

- Company catalog and entity dashboards
- TechDocs-powered documentation search
- Project scaffolding with software templates
- Personal settings and UI customizations

In upcoming sections, we’ll dive deeper into advanced catalog configurations, custom plugin development, and CI/CD integration to help you master Backstage end to end.

---

## Links and References

- [Backstage Documentation](https://backstage.io/docs/)
- [TechDocs Overview](https://backstage.io/docs/features/techdocs/)
- [Backstage Plugin Marketplace](https://backstage.io/plugins)
- [Understanding Catalog Entities](https://backstage.io/docs/features/software-catalog/descriptor-format)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/fcbbf923-69c3-4147-bd51-18db2bd18957/lesson/2fb83ce7-f036-4c36-8faf-35a4c24d5096)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/fcbbf923-69c3-4147-bd51-18db2bd18957/lesson/ab74222d-b1db-4adc-8205-098552e46ba6)**
>
> Practice lab
