# Search Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/TechDocs-Search/Search-Basics)

---

## Table of Contents

- Search Basics
  - Unified Search Interface
  - Extending Search with Plugins
  - Search Engine Options
  - Configuring What Gets Indexed
  - Adding Elasticsearch as Your Search Backend
  - Links and References
  - Watch Video
    - 1. Install the Elasticsearch module
    - 2. Register the Elasticsearch plugin in your backend
    - 3. Configure the connection in app-config.yaml

---

## Content

Certified Backstage Associate (CBA)

TechDocs Search

# Search Basics

In this lesson, we’ll dive into Backstage’s powerful search capabilities. Backstage offers a single place for developers to discover everything—your service catalog, component documentation, and even external resources like [Confluence](https://www.atlassian.com/software/confluence) or [Stack Exchange](https://stackexchange.com). By configuring Backstage’s collators and search backends, you can tailor the search experience to fit your organization’s needs.

![The image highlights the main benefit of a search feature in Backstage, stating that all documentation will be searchable and centralized in one location. It includes a stylized "B" logo and icons representing documents and settings.](https://kodekloud.com/kk-media/image/upload/v1752870188/notes-assets/images/Certified-Backstage-Associate-CBA-Search-Basics/backstage-search-feature-benefit.jpg)

## Unified Search Interface

Backstage’s built-in search lets you query across services, APIs, and docs—all from one place. Even if you’re not sure where something lives in your infrastructure, a quick search will surface the right component or guide.

![The image shows a stylized "B" logo with a search interface, including options for "Search," "Catalog," and "Docs."](https://kodekloud.com/kk-media/image/upload/v1752870188/notes-assets/images/Certified-Backstage-Associate-CBA-Search-Basics/stylized-b-logo-search-interface.jpg)

## Extending Search with Plugins

Beyond out-of-the-box catalog and docs indexing, you can add collators for external tools. Index your Confluence pages, Stack Exchange threads, or any web-based resource.

![The image shows a stylized "B" logo with a layered design, accompanied by the words "Plugin," "Confluence," and "Stack Exchange" with their respective icons. The word "Search" is displayed in the top left corner.](https://kodekloud.com/kk-media/image/upload/v1752870189/notes-assets/images/Certified-Backstage-Associate-CBA-Search-Basics/stylized-b-logo-plugin-confluence.jpg)

## Search Engine Options

Backstage supports multiple search backends. By default, it uses **Lunr**, but you can also connect to **Postgres** or **Elasticsearch**.

| Engine        | Default | Scalability | Typical Use Case                        |
| ------------- | ------- | ----------- | --------------------------------------- |
| Lunr          | ✓       | Low         | Small to mid-size deployments           |
| PostgreSQL    |         | Medium      | Teams already standardizing on Postgres |
| Elasticsearch |         | High        | Large-scale or global search clusters   |

> [!important]
> **Note**
>
> Switching backends is straightforward and lets you match search performance to your infrastructure scale.

![The image is a diagram showing three search engine options: Lunr Search, Postgres, and Elastic Search, with Lunr Search marked as the default.](https://kodekloud.com/kk-media/image/upload/v1752870191/notes-assets/images/Certified-Backstage-Associate-CBA-Search-Basics/search-engine-options-lunr-default-diagram.jpg)

## Configuring What Gets Indexed

The **collator** system controls which resources are crawled and how often. Out of the box, Backstage includes collators for:

- Service Catalog
- Built-in documentation

You can define additional collators for Confluence, Stack Exchange, or any REST API. Schedule each collator independently—for example:

| Source         | Interval   |
| -------------- | ---------- |
| Catalog        | 30 minutes |
| Docs           | 1 hour     |
| Confluence     | 6 hours    |
| Stack Exchange | 2 days     |

> [!important]
> **Note**
>
> Frequent indexing keeps your search results fresh, but be mindful of API rate limits and server load.

![The image is a diagram illustrating a scheduler system that collects indexes from various sources like Catalog, Docs, Confluence, and Stack Exchange at different intervals (30 mins, 1 hr, 6 hrs, 2 days).](https://kodekloud.com/kk-media/image/upload/v1752870192/notes-assets/images/Certified-Backstage-Associate-CBA-Search-Basics/scheduler-system-index-collection-diagram.jpg)

## Adding Elasticsearch as Your Search Backend

If you need enterprise-grade search, switch from Lunr to Elasticsearch:

### 1\. Install the Elasticsearch module

```
yarn --cwd packages/backend add @backstage/plugin-search-backend-module-elasticsearch
```

### 2\. Register the Elasticsearch plugin in your backend

```
import { createBackend } from '@backstage/backend-app-api';


async function main() {
  const backend = createBackend();


  backend.add(
    await import('@backstage/plugin-search-backend'),
  );
  backend.add(
    await import('@backstage/plugin-search-backend-module-elasticsearch'),
  );


  await backend.start();
}


main().catch(console.error);
```

### 3\. Configure the connection in `app-config.yaml`

```
search:
  elasticsearch:
    provider: opensearch
    node: http://0.0.0.0:9200
    auth:
      username: opensearch
      password: changeme
```

> [!important]
> **Warning**
>
> Ensure your Elasticsearch credentials are secured and never committed to version control. Consider using secrets management or environment variables.

## Links and References

- [Backstage Documentation](https://backstage.io/docs)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/ea371bfc-3770-4d25-80ef-e464e4b24fda/lesson/53322bb2-0984-402b-80c8-c88c4e98e72e)**
>
> Watch video content
