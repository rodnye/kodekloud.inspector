# Demo Integrations Entity Provider - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Catalog/Demo-Integrations-Entity-Provider)

---

## Table of Contents

- Demo Integrations Entity Provider
  - 1. Install the GitHub Discovery Plugin
  - 2. Register the Plugin in the Backend
  - 3. Configure the GitHub Entity Provider
  - 4. Verify Automatic Discovery
  - 5. Importing from a GitHub Organization
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

Certified Backstage Associate (CBA)

Catalog

# Demo Integrations Entity Provider

Backstage can automatically discover entities by scanning GitHub repositories for `catalog-info.yaml` files. In this guide, you’ll install and configure the GitHub Entity Provider to import components, systems, APIs, and more—without manual registration.

## 1\. Install the GitHub Discovery Plugin

Backstage provides a dedicated backend module for GitHub discovery. From your repo root, run:

```
yarn --cwd packages/backend add @backstage/plugin-catalog-backend-module-github
```

## 2\. Register the Plugin in the Backend

Edit `packages/backend/src/index.ts` to include the GitHub module:

```
// packages/backend/src/index.ts


import { createRouter } from '@backstage/plugin-catalog-backend';
import githubDiscovery from '@backstage/plugin-catalog-backend-module-github';


export default async function main() {
  const backend = await createBackend();


  // Core plugins
  backend.add(import('@backstage/plugin-search-backend'));
  backend.add(import('@backstage/plugin-search-backend-module-pg'));
  backend.add(import('@backstage/plugin-search-backend-module-catalog'));
  backend.add(import('@backstage/plugin-search-backend-module-techdocs'));
  backend.add(import('@backstage/plugin-kubernetes-backend'));
  backend.add(import('@backstage/plugin-catalog-backend'));


  // Add GitHub discovery
  backend.add(import('@backstage/plugin-catalog-backend-module-github'));


  await backend.start();
}
```

> [!important]
> **Note**
>
> If you see duplicate registrations for the GitHub module, remove the extras to avoid startup errors.

Now restart the backend:

```
cd packages/backend
yarn dev
```

## 3\. Configure the GitHub Entity Provider

Add a `github` provider under `catalog.providers` in `app-config.yaml`:

```
catalog:
  providers:
    github:
      personalAccount:
        organization: 'Sanjeev-Thiyagarajan'
        catalogPath: '/catalog-info.yaml'
        filters:
          branch: 'main'
          repository: '.*'
        schedule:
          frequency: { minutes: 20 }
          timeout: { minutes: 3 }


import:
  entityFilename: catalog-info.yaml
  pullRequestBranchName: backstage-integration
  rules:
    - allow: [Component, System, API, Resource, Location, Group, User, Domain]
```

| Configuration Key  | Description                                           |
| ------------------ | ----------------------------------------------------- |
| providerId         | Unique identifier (`personalAccount` in this example) |
| organization       | GitHub user/org name (where to scan for entities)     |
| catalogPath        | Path to each repo’s `catalog-info.yaml`               |
| filters.branch     | Branch to scan (e.g., `main`)                         |
| filters.repository | Regex for repo names (e.g., `.*` for all)             |
| schedule.frequency | How often to poll GitHub (e.g., every 20 minutes)     |
| schedule.timeout   | Max time per scan (e.g., 3 minutes)                   |

> [!important]
> **Warning**
>
> Ensure `catalogPath` matches your `catalog-info.yaml` location exactly. A mismatch prevents discovery.

## 4\. Verify Automatic Discovery

Restart your Backstage frontend:

```
yarn dev
```

Backstage will poll your GitHub account and import any entities it finds. For example, you might see:

![The image shows a dashboard from "My Company Catalog" in Backstage, listing three components: "auth-service," "example-website," and "shopping-cart," with details like system, owner, type, lifecycle, and tags.](https://kodekloud.com/kk-media/image/upload/v1752870057/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Integrations-Entity-Provider/my-company-catalog-dashboard-components.jpg)

Under the hood, it scans each repo’s `main` branch for `catalog-info.yaml`:

```
catalog:
  providers:
    github:
      personalAccount:
        organization: 'Sanjeev-Thiyagarajan'
        catalogPath: '/catalog-info.yaml'
        filters:
          branch: 'main'
          repository: '.*'
        schedule:
          frequency: { minutes: 20 }
          timeout: { minutes: 2 }


import:
  entityFilename: catalog-info.yaml
  pullRequestBranchName: backstage-integration
```

For example, the `backstage-shopping-cart` repo contains:

![The image shows a GitHub repository page named "backstage-shopping-cart," which is private and contains several files and folders. The repository is primarily written in JavaScript and lacks a README file.](https://kodekloud.com/kk-media/image/upload/v1752870058/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Integrations-Entity-Provider/backstage-shopping-cart-repo-java.jpg)

## 5\. Importing from a GitHub Organization

To import from another GitHub org (e.g., `shopping-hub`), add a second provider block:

```
catalog:
  providers:
    github:
      personalAccount:
        organization: 'Sanjeev-Thiyagarajan'
        catalogPath: '/catalog-info.yaml'
        filters:
          branch: 'main'
          repository: '.*'
        schedule:
          frequency: { minutes: 20 }
          timeout: { minutes: 2 }


      shoppingHub:
        organization: 'shopping-hub'
        catalogPath: '/catalog-info.yaml'
        filters:
          branch: 'main'
          repository: '.*'
        schedule:
          frequency: { minutes: 20 }
          timeout: { minutes: 2 }


import:
  entityFilename: catalog-info.yaml
  pullRequestBranchName: backstage-integration
  rules:
    - allow: [Component, System, API, Resource, Location, Group, User, Domain]
```

Here’s the GitHub UI showing three private repos in `shopping-hub`:

![The image shows a GitHub repository page with three private repositories listed, all updated on January 4th. The repositories are named app3, app2, and app1, and are written in JavaScript.](https://kodekloud.com/kk-media/image/upload/v1752870059/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Integrations-Entity-Provider/github-private-repositories-javascript.jpg)

After restarting, Backstage imports all three:

![The image shows a dashboard from "My Company Catalog" in Backstage, listing various components with details like name, system, owner, type, lifecycle, description, and tags.](https://kodekloud.com/kk-media/image/upload/v1752870060/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Integrations-Entity-Provider/my-company-catalog-dashboard.jpg)

Each repo has its own `catalog-info.yaml`. For instance, `app3` contains YAML and JSON definitions:

![The image shows a GitHub repository page for a project named "app3," displaying a list of files and folders, including YAML and JSON files. The repository is private, with no stars or forks, and the main programming language used is JavaScript.](https://kodekloud.com/kk-media/image/upload/v1752870061/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Integrations-Entity-Provider/github-repo-app3-yaml-json.jpg)

## Next Steps

Backstage supports additional entity providers such as GitLab, Amazon S3, and more.  
Refer to the [Backstage documentation](https://backstage.io/docs) for full integration guides and advanced configuration.

## Links and References

- [Backstage Catalog Documentation](https://backstage.io/docs/features/software-catalog/what-is-catalog)
- [GitHub Entity Provider](https://backstage.io/docs/features/software-catalog/descriptor-processing#github-provider)
- [Backstage Plugin Catalog Backend Module — GitHub](https://github.com/backstage/backstage/tree/master/plugins/catalog-backend-module-github)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/f9244f9d-083a-4acd-a518-549f54b644b5/lesson/9d20eb93-f189-4438-99c5-0fe4c53cbc19)**
>
> Watch video content
