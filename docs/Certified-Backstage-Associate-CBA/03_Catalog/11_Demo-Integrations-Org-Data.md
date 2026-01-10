# Demo Integrations Org Data - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Catalog/Demo-Integrations-Org-Data)

---

## Table of Contents

- Demo Integrations Org Data
  - Overview of Catalog Providers
  - Integrating GitHub Organizational Data
  - Defining GitHub and GitHub Org Providers
  - Running and Verifying the Import
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Certified Backstage Associate (CBA)

Catalog

# Demo Integrations Org Data

In this lesson, you’ll learn how to import organizational data—users and teams—from GitHub into Backstage. By leveraging the `githubOrg` catalog provider, Backstage automates the creation of User and Group entities based on your organization’s structure.

## Overview of Catalog Providers

Backstage supports multiple catalog providers to discover and import entities. Below is a summary of built-in **catalog.providers** in `app-config.yaml`:

| Provider ID           | Type             | Description                                      |
| --------------------- | ---------------- | ------------------------------------------------ |
| github                | Repository-based | Scans GitHub repos for `catalog-info.yaml` files |
| customProviderId      | Repository-based | Custom path to your `catalog-info.yaml`          |
| wildcardProviderId    | Repository-based | Supports wildcard patterns in `catalogPath`      |
| topicProviderId       | Repository-based | Discovers entities under specific topics         |
| topicFilterProviderId | Repository-based | Applies extra filters to repository discovery    |

```
catalog:
  providers:
    github:
      providerId: 'backstage'
      organization: 'backstage'
      catalogPath: '/catalog-info.yaml'
      filters:
        branch: 'main'
        repository: '.*'
      schedule:
        frequency: { minutes: 30 }
        timeout: { minutes: 3 }

    customProviderId:
      organization: 'new-org'
      catalogPath: '/custom/path/catalog-info.yaml'
      filters:
        branch: 'develop'
        repository: '.*'

    wildcardProviderId:
      organization: 'new-org'
      catalogPath: '/groups/*/*.yaml'
      filters:
        branch: 'develop'
        repository: '.*'

    topicProviderId:
      organization: 'backstage'
      catalogPath: '/catalog-info.yaml'
      filters:
        branch: 'main'
        repository: '.*'

    topicFilterProviderId:
      organization: 'backstage'
```

In this tutorial, we’ll focus on the `githubOrg` provider to import organizational data (users and teams) from GitHub.

## Integrating GitHub Organizational Data

First, install the GitHub Org backend module:

```
yarn --cwd packages/backend add @backstage/plugin-catalog-backend-module-github-org
```

> [!important]
> **Note**
>
> Ensure your workspace is up to date before adding the plugin. This module enables the `githubOrg` provider in your Backstage backend.

Next, configure the `githubOrg` provider in `app-config.yaml`:

```
catalog:
  providers:
    githubOrg:
      id: production
      githubUrl: https://github.com
      orgs:
        - organization-1
        - organization-2
        - organization-3
      schedule:
        initialDelay: { seconds: 30 }
        frequency: { hours: 1 }
        timeout: { minutes: 50 }
```

Then, update your backend `index.ts` to register the new module:

```
import { getLogger, loadBackendConfig, startBackend } from '@backstage/backend-common';
import { createRouter } from '@backstage/plugin-catalog-backend';
import authModule from '@backstage/plugin-auth-backend';
import guestProviderModule from '@backstage/plugin-auth-backend-module-guest-provider';
import catalogBackend from '@backstage/plugin-catalog-backend';
import githubModule from '@backstage/plugin-catalog-backend-module-github';
import githubOrgModule from '@backstage/plugin-catalog-backend-module-github-org';
import scaffolderEntityModelModule from '@backstage/plugin-catalog-backend-module-scaffolder-entity-model';

export default async function main() {
  const config = await loadBackendConfig();
  const logger = getLogger();
  const database = await getDatabase();
  const router = await createRouter({ config, logger, database });

  await startBackend({ config, logger, database, router })
    .then(app => {
      app.registerModule(authModule);
      app.registerModule(guestProviderModule);
      app.registerModule(catalogBackend);
      app.registerModule(githubModule);
      app.registerModule(githubOrgModule);
      app.registerModule(scaffolderEntityModelModule);
    });
}
```

![The image shows a webpage from Backstage documentation about integrating GitHub organizational data, including sections on permissions and installation. The interface includes a sidebar with navigation links and a dark theme.](https://kodekloud.com/kk-media/image/upload/v1752870062/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Integrations-Org-Data/backstage-github-integration-docs.jpg)

## Defining GitHub and GitHub Org Providers

You can combine the standard GitHub repository-based provider with the GitHub Org provider to pull both code entities and org data:

```
catalog:
  providers:
    githubOrg:
      - id: github
        githubUrl: https://github.com
        orgs:
          - shopping-hub
        schedule:
          initialDelay: { seconds: 30 }
          frequency: { hours: 1 }
          timeout: { minutes: 50 }

    github:
      shoppingHub:
        organization: 'shopping-hub'
        catalogPath: '/catalog-info.yaml'
        filters:
          branch: 'main'
          repository: '.*'
        schedule:
          frequency: { minutes: 20 }
          timeout: { minutes: 2 }
```

- **githubOrg**: Imports all users and teams from **shopping-hub**.
- **github**: Discovers `catalog-info.yaml` in **shopping-hub** repos to create Component, API, or System entities.

On GitHub, the Shopping Hub organization currently has one owner and several teams:

![The image shows a GitHub organization page titled "shopping-hub" under the "People" tab, displaying a single member with owner permissions. A notification suggests having at least two people with the owner role.](https://kodekloud.com/kk-media/image/upload/v1752870063/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Integrations-Org-Data/github-organization-shopping-hub-owner.jpg)

## Running and Verifying the Import

Apply your changes by restarting Backstage:

```
yarn dev
```

![The image shows a user interface of a "My Company Catalog" with a list of users, including "guest" and "Jenny Doe," and options for filtering and managing the catalog.](https://kodekloud.com/kk-media/image/upload/v1752870064/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Integrations-Org-Data/my-company-catalog-user-interface.jpg)

If no users or groups appear, it’s likely your GitHub token is missing the required scopes.

> [!important]
> **Warning**
>
> Ensure your GitHub personal access token includes `read:org` (and optionally `read:user`). Without these scopes, Backstage cannot retrieve organizational data.

To update your token:

1.  Go to **Settings > Developer settings > Personal access tokens** in GitHub.
2.  Edit or generate a token with **read:org** and **read:user** scopes.
3.  Update the token in Backstage (e.g., via `GITHUB_TOKEN` env var) and restart.

![The image shows a GitHub settings page for editing personal access tokens, with various scopes like "repo" and "workflow" available for selection. A cursor is pointing at the "delete:packages" option.](https://kodekloud.com/kk-media/image/upload/v1752870065/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Integrations-Org-Data/github-settings-personal-access-tokens.jpg)

After adding the correct permissions, Backstage will sync users and teams on the next schedule run. You will then see GitHub members and nested teams as Backstage `User` and `Group` entities:

![The image shows a dashboard from "My Company Catalog" on Backstage, displaying a list of groups with names, types, and actions available for each group.](https://kodekloud.com/kk-media/image/upload/v1752870066/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Integrations-Org-Data/my-company-catalog-dashboard-groups.jpg)

By following these steps, you can automate the import of your GitHub organizational structure into Backstage, ensuring your User and Group entities stay up to date.

## Links and References

- [Backstage Catalog Providers](https://backstage.io/docs/features/software-catalog/providers)
- [GitHub Provider Plugin](https://backstage.io/docs/plugins/catalog/github-provider)
- [Backstage Authentication Overview](https://backstage.io/docs/features/auth/overview)
- [GitHub Personal Access Token Scopes](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/f9244f9d-083a-4acd-a518-549f54b644b5/lesson/a0f304c9-fe03-4770-9ad0-a9c124022d00)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/f9244f9d-083a-4acd-a518-549f54b644b5/lesson/f46885a4-ee59-448f-aa0e-b13bca1bdbf3)**
>
> Practice lab
