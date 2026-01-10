# Demo Search Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/TechDocs-Search/Demo-Search-Basics)

---

## Table of Contents

- Demo Search Basics
  - Access the Search Input
  - What Can You Search?
  - Example: Find a Component
  - Example: Search Within Documentation
  - Integrating External Search Connectors
  - Links and References
  - Watch Video

---

## Content

Certified Backstage Associate (CBA)

TechDocs Search

# Demo Search Basics

In this guide, you’ll learn how to harness the powerful search capabilities in [Backstage](https://backstage.io) to discover components, documentation, and even external resources—all from a single interface.

## Access the Search Input

1.  In the left sidebar, click the search icon ![Search icon highlighted in Backstage sidebar](https://kodekloud.com/kk-media/image/upload/v1752870179/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Search-Basics/my-company-catalog-backstage-interface.jpg)
2.  The global search bar appears, ready to index and query across your catalog and docs.

> [!important]
> **Note**
>
> Backstage’s search is powered by a pluggable architecture. You can add or remove indexers for entities, tech docs, and third-party sources.

## What Can You Search?

Backstage search spans multiple resource types:

| Search Scope     | Description                                        | Example Query            |
| ---------------- | -------------------------------------------------- | ------------------------ |
| Entities         | Components, APIs, user groups, systems             | `recommendation-service` |
| Documentation    | Markdown files, tech docsMarkdown files, tech docs | `Cassandra`              |
| External Sources | Stack Exchange, GitHub, custom endpoints           | `site:stackoverflow.com` |

## Example: Find a Component

Search for the term `recommendation service`. Backstage will return a list of matching entities:

![The image shows a dashboard interface for a "recommendation-service" in Backstage, displaying details about the service, including its description, owner, system, type, and lifecycle, along with a section for relations.](https://kodekloud.com/kk-media/image/upload/v1752870180/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Search-Basics/recommendation-service-dashboard-backstage.jpg)

- Click the result to open the **Recommendation Service** component page.
- Review metadata, owner, lifecycle, and relationships to other services or systems.

## Example: Search Within Documentation

You can also look up keywords inside your tech docs. For instance, type `Cassandra` to locate all references in component documentation:

![The image shows a documentation page for an app, featuring various heading styles and a sidebar with navigation options like Home, APIs, and Docs.](https://kodekloud.com/kk-media/image/upload/v1752870181/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Search-Basics/app-documentation-sidebar-navigation.jpg)

## Integrating External Search Connectors

Backstage allows you to plug in external indices—such as [Stack Exchange](https://stackexchange.com) or private GitHub repos—so your team can search Q&A threads, code snippets, or design docs without leaving the portal.

> [!important]
> **Warning**
>
> When enabling external connectors, verify API rate limits and authentication scopes to avoid indexing failures or data leaks.

## Links and References

- [Backstage Search Architecture](https://backstage.io/docs/features/search/architecture)
- [Backstage TechDocs](https://backstage.io/docs/features/techdocs/overview)
- [Apache Cassandra](https://cassandra.apache.org)
- [Stack Exchange](https://stackexchange.com)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/ea371bfc-3770-4d25-80ef-e464e4b24fda/lesson/c87c4219-155f-4b1c-8485-67ce83d4548d)**
>
> Watch video content
