# What is an Entity - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Catalog/What-is-an-Entity)

---

## Table of Contents

- What is an Entity
  - Defining a Backstage Entity via YAML
  - Where to Store catalog-info.yaml
  - Registering Backstage Entities
  - Links and References
  - Watch Video
    - 1. Static Configuration
    - 2. Registering via the Backstage UI
    - 3. Using Scaffolder Templates
    - 4. Entity Providers

---

## Content

Certified Backstage Associate (CBA)

Catalog

# What is an Entity

In this lesson, we explore Backstage’s catalog capabilities by breaking down what an **Entity** is. In Backstage, an Entity centralizes metadata and relationships for software components, APIs, users/groups, resources (e.g., databases, infrastructure), and systems (collections of components).

![The image is an overview diagram showing an "Entity" connected to five components: Software, API, Users/Groups, Resources, and System.](https://kodekloud.com/kk-media/image/upload/v1752870108/notes-assets/images/Certified-Backstage-Associate-CBA-What-is-an-Entity/entity-overview-diagram-components.jpg)

---

## Defining a Backstage Entity via YAML

Backstage Entities are declared in `catalog-info.yaml` files using a common YAML schema—very similar to Kubernetes manifests. Each entity document comprises:

1.  **apiVersion**: Schema version (e.g., `backstage.io/v1alpha1`).
2.  **kind**: Entity type (e.g., `Component`, `API`, `User`).
3.  **metadata**: Attributes such as `name`, `description`, `labels`, `annotations`, `tags`, and external `links`.
4.  **spec**: Kind-specific configuration (e.g., `type`, `lifecycle`, `owner`, `system`).

Here’s a complete example of a **Component** entity:

```
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: artist-web
  description: The place to be, for great artists
  labels:
    example.com/custom: custom_label_value
  annotations:
    example.com/service-discovery: artistweb
    circleci.com/project-slug: github/example-org/artist-website
  tags:
    - java
  links:
    - url: https://admin.example-org.com
      title: Admin Dashboard
      icon: dashboard
      type: admin-dashboard
spec:
  type: website
  lifecycle: production
  owner: artist-relations-team
  system: public-websites
```

---

## Where to Store `catalog-info.yaml`

It’s best practice to colocate your `catalog-info.yaml` with your source code. Typically you place it at the root of your project repository:

![The image shows a GitHub logo connected to a "catalog-info.yaml" file, with a directory structure highlighting the file in a code editor.](https://kodekloud.com/kk-media/image/upload/v1752870108/notes-assets/images/Certified-Backstage-Associate-CBA-What-is-an-Entity/github-logo-catalog-info-file.jpg)

> [!important]
> **Note**
>
> Keeping `catalog-info.yaml` beside your code enables automatic scaffolding, version control, and seamless CI/CD integration.

Alternatively, you can centralize definitions in a dedicated repository or object storage (e.g., S3), then point Backstage at that location:

![The image illustrates the storage of `catalog-info.yaml` files in two locations: GitHub and a bucket, each containing `app1.yaml`, `app2.yaml`, and `app3.yaml` files.](https://kodekloud.com/kk-media/image/upload/v1752870109/notes-assets/images/Certified-Backstage-Associate-CBA-What-is-an-Entity/catalog-info-storage-github-bucket.jpg)

For the examples below, we assume one `catalog-info.yaml` per project, located at the repository root.

---

## Registering Backstage Entities

After creating YAML definitions, configure Backstage to discover and register them. Common registration methods include:

| Method               | Description                                                                          |
| -------------------- | ------------------------------------------------------------------------------------ |
| Static Configuration | Declare each entity URL or file path in `app-config.yaml` under `catalog.locations`. |
| UI Registration      | Use the **Register Existing Component** form in the Backstage catalog interface.     |
| Scaffolder Templates | Generate and auto-register `catalog-info.yaml` when scaffolding new projects.        |
| Entity Providers     | Bulk-import entities by scanning GitHub repos, S3 buckets, or other sources.         |

### 1\. Static Configuration

Add your entity locations to `app-config.yaml`:

```
catalog:
  locations:
    - type: url
      target: https://github.com/myorg/auth-component.yaml
    - type: file
      target: ./catalog-info.yaml
```

### 2\. Registering via the Backstage UI

Backstage’s catalog UI offers a **Register Existing Component** flow. Paste the `catalog-info.yaml` URL, validate, and confirm:

![The image shows a user interface for registering a component in a Scaffolded Backstage App, with steps for selecting a URL, analyzing it, and registering an existing component.](https://kodekloud.com/kk-media/image/upload/v1752870110/notes-assets/images/Certified-Backstage-Associate-CBA-What-is-an-Entity/backstage-app-component-registration-ui.jpg)

### 3\. Using Scaffolder Templates

When you scaffold a project with Backstage Templates, `catalog-info.yaml` is created and registered automatically:

![The image is a flowchart illustrating a process involving a template, GitHub with a catalog-info.yaml file, a new project, and a CI/CD pipeline.](https://kodekloud.com/kk-media/image/upload/v1752870111/notes-assets/images/Certified-Backstage-Associate-CBA-What-is-an-Entity/flowchart-github-cicd-template.jpg)

### 4\. Entity Providers

Entity Providers scan configured sources (e.g., GitHub, S3) for YAML definitions and import them in bulk. This method streamlines onboarding across multiple projects:

![The image illustrates a diagram of entity providers, showing GitHub and a storage bucket as sources for YAML configuration files (app1.yaml, app2.yaml, app3.yaml).](https://kodekloud.com/kk-media/image/upload/v1752870112/notes-assets/images/Certified-Backstage-Associate-CBA-What-is-an-Entity/entity-providers-github-storage-diagram.jpg)

---

## Links and References

- [Backstage Official Documentation](https://backstage.io/docs)
- [Software Catalog Overview](https://backstage.io/docs/features/software-catalog/what-is-component)
- [Backstage Scaffolder](https://backstage.io/docs/features/software-templates/creating-templates)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/f9244f9d-083a-4acd-a518-549f54b644b5/lesson/17628742-0c99-47ea-ad35-d17cbf890e78)**
>
> Watch video content
