# Plugins - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Customization-Plugins/Plugins)

---

## Table of Contents

- Plugins
  - What Are Backstage Plugins?
  - Organizing Plugins in Your Monorepo
  - Plugin Architecture Types
  - Plugin Presentation Styles
  - References
  - Watch Video
    - Backstage Architecture Refresh
    - 1. Standalone Plugin
    - 2. Service-Backed Plugin
    - 3. Third-Party-Backed (Proxy) Plugin
    - Full-Page Plugin
    - Catalog-Based Plugin
    - Tab Plugin

---

## Content

Certified Backstage Associate (CBA)

Customization Plugins

# Plugins

In this lesson, we dive into **Backstage plugins**, the building blocks that let you extend Backstage with new features, customize the UI, and integrate with third-party services.

## What Are Backstage Plugins?

Plugins are self-contained npm packages that add or modify functionality in Backstage. Because Backstage is entirely plugin-driven, every core feature—from the software catalog to TechDocs—is implemented as a plugin.

![The image is a graphic titled "Plugins" showing four steps: adding new features, modifying existing features, customizing the UI, and integrating with third-party systems.](https://kodekloud.com/kk-media/image/upload/v1752870146/notes-assets/images/Certified-Backstage-Associate-CBA-Plugins/plugins-four-steps-graphic.jpg)

![The image illustrates the concept "Everything Is a Plugin" with a puzzle piece design, showing components like Catalog, Templates, TechDocs, and Search.](https://kodekloud.com/kk-media/image/upload/v1752870148/notes-assets/images/Certified-Backstage-Associate-CBA-Plugins/everything-is-a-plugin-puzzle.jpg)

### Backstage Architecture Refresh

Backstage consists of a React front end and a Node.js back end connected to a database. Each plugin can include both front-end and back-end components. For instance, the Catalog plugin’s front end handles UI events and sends requests to its back end, which then queries the database and returns results.

![The image illustrates a "Backstage Architecture Refresh" diagram, showing a user interacting with a system composed of frontend and backend components, using React and Node.js, connected to a database.](https://kodekloud.com/kk-media/image/upload/v1752870149/notes-assets/images/Certified-Backstage-Associate-CBA-Plugins/backstage-architecture-refresh-diagram.jpg)

## Organizing Plugins in Your Monorepo

Each plugin lives under the `plugins` directory with its own `package.json`. Your root `package.json` workspaces might look like:

```
{
  "workspaces": {
    "packages": [
      "packages/*",
      "plugins/*"
    ]
  }
}
```

Because they’re independent npm libraries, you can:

- Develop and test plugins in isolation.
- Publish and share plugins via npm.

![The image shows a puzzle piece graphic with a "B" logo on the left and a list of plugins on the right, including Catalog, Templates, TechDocs, and Search, with checkmarks and a cross indicating their status.](https://kodekloud.com/kk-media/image/upload/v1752870150/notes-assets/images/Certified-Backstage-Associate-CBA-Plugins/puzzle-piece-b-logo-plugins-list.jpg)

Backstage also maintains a **rich ecosystem** of third-party plugins. Browse them at [backstage.io/plugins](https://backstage.io/plugins) before building your own.

![The image shows a webpage listing various plugins for Backstage, each with a brief description and an "Explore" button. The plugins cover different functionalities like analytics, reporting, and API management.](https://kodekloud.com/kk-media/image/upload/v1752870152/notes-assets/images/Certified-Backstage-Associate-CBA-Plugins/backstage-plugins-listing-webpage.jpg)

## Plugin Architecture Types

There are three main plugin architecture types in Backstage:

| Plugin Type                | Description                                                                                 | Use Case                                |
| -------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------- |
| Standalone                 | Runs entirely in the browser with hard-coded data (no external requests).                   | Simple UI demos or prototypes           |
| Service-Backed             | Combines a frontend plugin with a backend service that fetches data from a database or API. | Catalog, TechDocs, analytics dashboards |
| Third-Party-Backed (Proxy) | Uses a backend proxy to forward requests to external services, adding credentials securely. | GitHub integration, cloud provider APIs |

![The image illustrates three types of plugin architecture: standalone, service-backed, and third-party backed, each represented with a simple icon and label.](https://kodekloud.com/kk-media/image/upload/v1752870153/notes-assets/images/Certified-Backstage-Associate-CBA-Plugins/plugin-architecture-standalone-service-thirdparty.jpg)

### 1\. Standalone Plugin

A standalone plugin is a React component with static data and no external HTTP calls.

> [!important]
> **Note**
>
> Standalone plugins are ideal for quick demos or simple data visualizations, but they’re not suitable for dynamic content.

![The image illustrates a plugin architecture diagram, showing the interaction between a standalone component, frontend, backend, and a database.](https://kodekloud.com/kk-media/image/upload/v1752870154/notes-assets/images/Certified-Backstage-Associate-CBA-Plugins/plugin-architecture-diagram-interaction.jpg)

### 2\. Service-Backed Plugin

Service-backed plugins consist of:

- **Frontend plugin**: Makes HTTP requests.
- **Backend plugin**: Retrieves data from databases or external APIs.

![The image illustrates a plugin architecture with a flow from a catalog frontend to a catalog backend, which connects to a database. It also includes a section labeled "Service backed" with the number 02.](https://kodekloud.com/kk-media/image/upload/v1752870155/notes-assets/images/Certified-Backstage-Associate-CBA-Plugins/plugin-architecture-flow-diagram.jpg)

### 3\. Third-Party-Backed (Proxy) Plugin

When integrating services you don’t control (e.g., GitHub), use a backend proxy:

1.  Frontend sends a request to your backend proxy.
2.  Proxy attaches credentials (API tokens) and forwards the request.
3.  Third-party service responds; proxy returns data to the frontend.

This avoids CORS issues and keeps credentials secure.

> [!important]
> **Warning**
>
> Always secure your proxy endpoints to prevent unauthorized access to third-party credentials.

## Plugin Presentation Styles

When you implement the frontend portion of your plugin, choose one of the following styles:

### Full-Page Plugin

Gives your plugin a dedicated route (e.g., `/my-plugin`) and full Backstage page.

![The image shows a frontend plugin interface with a sidebar menu and a user list table, featuring avatars, names, emails, and nationalities. The header has a playful welcome message and the plugin is titled "Plugin title."](https://kodekloud.com/kk-media/image/upload/v1752870156/notes-assets/images/Certified-Backstage-Associate-CBA-Plugins/frontend-plugin-interface-sidebar-menu.jpg)

### Catalog-Based Plugin

Injects custom cards or panels into existing catalog component pages.

![The image shows a screenshot of a frontend plugin interface for a company catalog, featuring a sidebar menu and a list of owned components.](https://kodekloud.com/kk-media/image/upload/v1752870158/notes-assets/images/Certified-Backstage-Associate-CBA-Plugins/frontend-plugin-interface-catalog.jpg)

For example, add a panel to the About page of the Auth Service:

![The image shows a user interface for a frontend plugin, specifically a catalog plugin, with details about an "auth-service" including its description, system, type, lifecycle, and a relations graph.](https://kodekloud.com/kk-media/image/upload/v1752870159/notes-assets/images/Certified-Backstage-Associate-CBA-Plugins/frontend-plugin-catalog-auth-service.jpg)

### Tab Plugin

Adds a new tab under an existing component view (e.g., CI/CD, API Docs, Dependencies):

![The image shows a frontend plugin interface with a tab labeled "03 Tab Plugin" and a section for "auth-service" indicating no CI/CD is available, with a prompt to add an annotation for enabling it.](https://kodekloud.com/kk-media/image/upload/v1752870159/notes-assets/images/Certified-Backstage-Associate-CBA-Plugins/frontend-plugin-auth-service-tab.jpg)

---

You now have a solid understanding of Backstage plugins—how they’re structured, where they live, and how to present them. Happy plugin building!

## References

- [Backstage Plugins Marketplace](https://backstage.io/plugins)
- [React Documentation](https://reactjs.org/)
- [Node.js Documentation](https://nodejs.org/)
- [npm Registry](https://www.npmjs.com/)
- [CORS MDN Reference](https://developer.mozilla.org/docs/Web/HTTP/CORS)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/aad867ea-baf2-4ca7-b722-ad38ea794a7e/lesson/c1c81c1a-83e8-4fdc-91f3-dd8386b341f1)**
>
> Watch video content
