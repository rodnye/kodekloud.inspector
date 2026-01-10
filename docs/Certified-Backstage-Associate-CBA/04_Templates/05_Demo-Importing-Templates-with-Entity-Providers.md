# Demo Importing Templates with Entity Providers - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Templates/Demo-Importing-Templates-with-Entity-Providers)

---

## Table of Contents

- Demo Importing Templates with Entity Providers
  - Manual Template Registration in Backstage
  - Why Automate Template Imports?
  - Setting Up GitHub Entity Providers
  - Organizing Your Repository for Template Imports
  - Adding a GitHub Provider for Templates
  - Verifying Imported Templates
  - References
  - Watch Video

---

## Content

Certified Backstage Associate (CBA)

Templates

# Demo Importing Templates with Entity Providers

In this guide, we’ll show you how to eliminate manual template registration in Backstage by leveraging Entity Providers. Instead of running a `register existing` command for each template, Entity Providers will scan your GitHub repositories and automatically import all template descriptors.

## Manual Template Registration in Backstage

Traditionally, you’d register a new template by copying its Git URL and running:

```
backstage-cli scaffolder register existing \
  --path https://github.com/your-org/your-repo/blob/main/api-express-template.yaml
```

The template descriptor might look like this:

```
apiVersion: scaffolder.backstage.io/v1beta3
# https://backstage.io/docs/features/software-catalog/descriptor-format#kind-template
kind: Template
metadata:
  name: api-express-template
  title: Node.js API w/ express.js
  description: A template for provisioning APIs with Express.js
spec:
  owner: user:guest
  type: service


parameters:
  - title: Project Info
    required:
      - name
    properties:
      name:
        type: string
        title: Name
        description: Unique name of the component
        ui:autofocus: true
        minLength: 2
        ui:options:
          rows: 5
      owner:
        title: Owner
        description: Owner of the component
```

Your `app-config.yaml` needs scaffolder settings and authentication:

```
scaffolder:
  builder: local        # Alternatives: external
  generator: docker     # Alternatives: local
  publisher:
    type: local         # Alternatives: googleGcs, awsS3


auth:
  providers:
    guest: {}           # https://backstage.io/docs/auth/guest/provider
```

## Why Automate Template Imports?

- Reduce manual steps and human error
- Keep templates in sync automatically
- Scale effortlessly as your template library grows

## Setting Up GitHub Entity Providers

Backstage can continuously poll GitHub (or other SCMs) for `catalog-info.yaml` or any YAML entity descriptors. Here’s an example of existing GitHub providers in `app-config.yaml`:

```
catalog:
  providers:
    github:
      shoppingHub:
        organization: 'shopping-hub'
        catalogPath: '/catalog-info.yaml'
        filters:
          branch: 'main'
          repository: '.*'
        schedule:
          frequency: { minutes: 20 }
          timeout:   { minutes: 2 }


      sanjeevAccount:
        organization: 'Sanjeev-Thiyagarajan'
        catalogPath: '/catalog-info.yaml'
        filters:
          branch: 'main'
          repository: '.*'
        schedule:
          frequency: { minutes: 20 }
          timeout:   { minutes: 2 }
```

> [!important]
> **Note**
>
> Entity Providers treat templates the same way they treat components, APIs, and docs—every valid YAML descriptor is an entity.

## Organizing Your Repository for Template Imports

In our GitHub repo, all templates live under a dedicated `templates` folder:

![The image shows a GitHub repository page with a folder named "templates" containing three YAML files. The files are listed with their last commit messages and dates.](https://kodekloud.com/kk-media/image/upload/v1752870217/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Importing-Templates-with-Entity-Providers/github-repo-templates-yaml-files.jpg)

Since each file ends with `-template.yaml` and resides under `templates/`, they won’t match the default `/catalog-info.yaml`. The solution is to add a new GitHub provider that points to `templates/**/*.yaml`.

## Adding a GitHub Provider for Templates

Update the `catalog.providers.github` section in `app-config.yaml` by appending a `github-templates` provider:

```
catalog:
  providers:
    github:
      shoppingHub:
        organization: 'shopping-hub'
        catalogPath: '/catalog-info.yaml'
        filters:
          branch: 'main'
          repository: '.*'
        schedule:
          frequency: { minutes: 20 }
          timeout:   { minutes: 2 }


      sanjeevAccount:
        organization: 'Sanjeev-Thiyagarajan'
        catalogPath: '/catalog-info.yaml'
        filters:
          branch: 'main'
          repository: '.*'
        schedule:
          frequency: { minutes: 20 }
          timeout:   { minutes: 2 }


      github-templates:
        organization: 'Sanjeev-Thiyagarajan'
        catalogPath: 'templates/**/*.yaml'
        filters:
          branch:     'main'
          repository: 'backstage-templates'
        schedule:
          frequency: { minutes: 20 }
          timeout:   { minutes: 2 }
```

| Field          | Description                                 | Example                             |
| -------------- | ------------------------------------------- | ----------------------------------- |
| organization   | GitHub org or user                          | `Sanjeev-Thiyagarajan`              |
| catalogPath    | Glob pattern for descriptor files           | `templates/**/*.yaml`               |
| filters.branch | Branch to scan                              | `main`                              |
| filters.repo   | Repository name regex                       | `backstage-templates`               |
| schedule       | Frequency and timeout for periodic scanning | `{ minutes: 20 }`, `{ minutes: 2 }` |

1.  `catalogPath: 'templates/**/*.yaml'` instructs Backstage to crawl all subdirectories under `templates`.
2.  `repository: 'backstage-templates'` limits the scan to that single repo.
3.  `schedule` controls how often the import runs.

> [!important]
> **Warning**
>
> After saving `app-config.yaml`, you must restart your Backstage backend for changes to take effect.

## Verifying Imported Templates

Once the backend is back online, open the Backstage UI and navigate to **Create ▶︎**. You should see your Express API and other templates automatically appear:

![The image shows a web interface for creating new software components using templates, with options for Node.js API and other templates. The sidebar includes navigation options like Home, APIs, Docs, and Create.](https://kodekloud.com/kk-media/image/upload/v1752870220/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Importing-Templates-with-Entity-Providers/web-interface-software-templates.jpg)

Congratulations! Your templates are now managed by Entity Providers and will stay in sync without any manual registration.

## References

- [Backstage Software Catalog](https://backstage.io/docs/features/software-catalog/what-is-catalog)
- [Entity Providers Documentation](https://backstage.io/docs/features/software-catalog/entity-providers)
- [Scaffolder API Reference](https://backstage.io/docs/features/software-templates/using-scaffolder)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/1c7142e3-0cb6-40ae-b5b6-77252f8c85b2/lesson/70d3e032-2511-4846-8c95-3d4f3b31f7c9)**
>
> Watch video content
