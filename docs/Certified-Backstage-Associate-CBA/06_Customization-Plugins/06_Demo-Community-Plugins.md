# Demo Community Plugins - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Customization-Plugins/Demo-Community-Plugins)

---

## Table of Contents

- Demo Community Plugins
  - 1. Discovering Community Plugins
  - 2. Understanding Plugin Structure
  - 3. Example: Securing Dynatrace with a Backend Proxy
  - 4. Integrating the GitHub Actions Plugin
  - 5. Browsing the Software Catalog
  - 6. Verifying Your GitHub Setup
  - 7. Configuring GitHub OAuth in Backstage
  - 8. Annotating Your Component for CI/CD
  - 9. Viewing CI/CD in Backstage
  - Key Takeaways
  - Links and References
  - Watch Video

---

## Content

Certified Backstage Associate (CBA)

Customization Plugins

# Demo Community Plugins

In this guide, you’ll learn how to discover and add Community Plugins—like GitHub Actions, Dynatrace, and Copilot—to your Backstage instance. We’ll cover browsing the plugin catalog, configuring a proxy for secure tokens, and setting up GitHub Actions in Backstage.

---

## 1\. Discovering Community Plugins

1.  Open your Backstage website and navigate to **Plugins**.
2.  Browse or search for “GitHub Actions” and click **Explore**. You’ll land on the Backstage community-plugins GitHub repository:

![The image shows a GitHub repository page for "community-plugins" with a list of files and directories, along with their last commit messages and dates. The interface includes options for code, issues, pull requests, actions, projects, and security.](https://kodekloud.com/kk-media/image/upload/v1752870125/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Community-Plugins/github-community-plugins-repo.jpg)

This repo hosts all vetted Community Plugins: GitHub Actions, FireHydrant, Dynatrace, Copilot, and more.

---

## 2\. Understanding Plugin Structure

Plugins may include only a frontend, only a backend, or both. Check the `plugins/` folder:

| Plugin         | Frontend | Backend                               |
| -------------- | -------- | ------------------------------------- |
| copilot        | ✓        | `plugins/copilot-backend`             |
| github-actions | ✓        | (uses generic backend for auth/proxy) |
| dynatrace      | ✓        | (requires custom proxy configuration) |

> [!important]
> **Note**
>
> Even if a plugin doesn’t ship a backend folder, it can leverage your Backstage backend for authentication or API proxying.

---

## 3\. Example: Securing Dynatrace with a Backend Proxy

The Dynatrace plugin provides a UI only. To avoid exposing your API token in the browser, configure a proxy in `app-config.yaml`:

```
# app-config.yaml
proxy:
  endpoints:
    '/dynatrace/':
      target: 'https://example.dynatrace.com/api/v2'
      headers:
        Authorization: 'Api-Token ${DYNATRACE_ACCESS_TOKEN}'


dynatrace:
  baseUrl: 'https://example.dynatrace.com'
```

![The image shows a GitHub repository page with a README file open, detailing setup instructions for a Dynatrace plugin using Backstage. The file structure is visible on the left side.](https://kodekloud.com/kk-media/image/upload/v1752870126/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Community-Plugins/github-repo-readme-dynatrace-backstage.jpg)

> [!important]
> **Warning**
>
> Never embed raw API tokens in the frontend. Always use a backend proxy to inject secrets from environment variables.

---

## 4\. Integrating the GitHub Actions Plugin

Follow these steps to add GitHub Actions support:

1.  Install the frontend plugin:

    ```
    # From your Backstage root directory
    yarn --cwd packages/app add @backstage-community/plugin-github-actions
    ```

2.  Install the GitHub auth provider on the backend:

    ```
    yarn --cwd packages/backend add @backstage/plugin-auth-backend-module-github-provider
    ```

3.  Register the auth module in `packages/backend/src/index.ts`:

    ```
    // packages/backend/src/index.ts
    backend.add(import('@backstage/plugin-auth-backend-module-github-provider'));
    ```

4.  Restart your services:

    ```
    yarn --cwd packages/backend start
    yarn --cwd packages/app start
    ```

---

## 5\. Browsing the Software Catalog

1.  Open **Software Catalog** in your Backstage UI:

    ![The image shows a software catalog interface titled "My Company Catalog" with a list of components, including their names, systems, owners, types, lifecycles, descriptions, and tags. The sidebar includes navigation options like Home, APIs, Docs, Create, and Register.](https://kodekloud.com/kk-media/image/upload/v1752870127/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Community-Plugins/my-company-catalog-interface.jpg)

2.  Select a component, for example **my-demo-app**, to view its overview:

    ![The image shows a web interface for a service called "my-demo-app" on Backstage, displaying an overview with details about the app, including its owner, lifecycle, and relations.](https://kodekloud.com/kk-media/image/upload/v1752870128/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Community-Plugins/my-demo-app-backstage-overview.jpg)

---

## 6\. Verifying Your GitHub Setup

1.  Confirm your repo has GitHub Actions workflows under `.github/workflows`:

    ![This image shows a GitHub repository page named "my-demo-app" with a list of files and folders, including `.github`, `src`, and `tests`. The repository is public, has no stars or forks, and is primarily written in JavaScript.](https://kodekloud.com/kk-media/image/upload/v1752870129/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Community-Plugins/github-repo-my-demo-app-files.jpg)

2.  View your workflow runs for confirmation:

    ![The image shows a GitHub Actions page displaying a list of workflow runs for a repository, with details such as commit messages, status, and timestamps.](https://kodekloud.com/kk-media/image/upload/v1752870130/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Community-Plugins/github-actions-workflow-runs-list.jpg)

---

## 7\. Configuring GitHub OAuth in Backstage

1.  Register a new OAuth App in GitHub:
    - **Settings → Developer settings → OAuth Apps → New OAuth App**
    - **Homepage URL:** Your Backstage URL
    - **Authorization callback URL:** `http://<HOST>:7007/api/auth/github/handler/frame`

    ![The image shows a GitHub page for registering a new OAuth application, with fields for application name, homepage URL, application description, and authorization callback URL. There is a "Register application" button at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752870131/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Community-Plugins/github-oauth-application-registration.jpg)

2.  Copy the **Client ID** and **Client Secret**:

    ![The image shows a GitHub application settings page for an application named "backstage," displaying details like the client ID, client secrets, and options to manage the application.](https://kodekloud.com/kk-media/image/upload/v1752870132/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Community-Plugins/github-backstage-app-settings-details.jpg)

3.  Add them to `app-config.yaml`:

    ```
    # app-config.yaml
    auth:
      providers:
        github:
          development:
            clientId: ${AUTH_GITHUB_CLIENT_ID}
            clientSecret: ${AUTH_GITHUB_CLIENT_SECRET}
    ```

---

## 8\. Annotating Your Component for CI/CD

In your `catalog-info.yaml` for **my-demo-app**, annotate with the GitHub project slug:

```
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: my-demo-app
  annotations:
    github.com/project-slug: 'your-org-or-user/my-demo-app'
spec:
  type: service
  owner: user:default/guest
  lifecycle: experimental
```

Commit and refresh the component in Backstage:

![The image shows a web interface for a component named "my-demo-app" in a software catalog, displaying details like owner, system, and type, along with a relations graph.](https://kodekloud.com/kk-media/image/upload/v1752870133/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Community-Plugins/my-demo-app-software-catalog-interface.jpg)

---

## 9\. Viewing CI/CD in Backstage

1.  Click the **CI/CD** tab and sign in via GitHub.
2.  You’ll see your workflow runs:

    ![The image shows a CI/CD dashboard for a project named "my-demo-app" with a list of completed tasks, including updates to a "catalog-info.yaml" file. The interface includes details like ID, message, source, workflow, status, and actions.](https://kodekloud.com/kk-media/image/upload/v1752870135/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Community-Plugins/ci-cd-dashboard-my-demo-app.jpg)

3.  Select any run for detailed logs:

    ![The image shows a GitHub Actions workflow run summary for a repository, indicating a successful job execution for updating a `catalog-info.yaml` file. The workflow was triggered by a push to the main branch and completed in 20 seconds.](https://kodekloud.com/kk-media/image/upload/v1752870136/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Community-Plugins/github-actions-workflow-summary-success.jpg)

    ![The image shows a GitHub Actions workflow run for a project, displaying a successful test job with steps like setting up a job, checking out code, and setting up Node.js.](https://kodekloud.com/kk-media/image/upload/v1752870137/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Community-Plugins/github-actions-workflow-success-test.jpg)

---

## Key Takeaways

- Community Plugins come in three flavors:
  - Frontend only
  - Backend only
  - Both frontend and backend
- To add a **frontend** plugin:

  ```
  yarn --cwd packages/app add <plugin-package-name>
  ```

- To add a **backend** plugin:

  ```
  yarn --cwd packages/backend add <plugin-package-name>
  backend.add(import('<plugin-package-name>'));
  ```

- Plugin UI components can render as:
  - Entire pages  
    ![The image shows a web interface for a service component named "app1" in Backstage, displaying details like description, owner, and lifecycle, with a sidebar for navigation.](https://kodekloud.com/kk-media/image/upload/v1752870138/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Community-Plugins/backstage-app1-service-interface.jpg)
  - Tabs
  - Cards  
    ![The image shows a web interface for documentation management, listing two documents related to APIs under "My Company." The sidebar includes options like Home, APIs, Docs, Create, and Register.](https://kodekloud.com/kk-media/image/upload/v1752870140/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Community-Plugins/documentation-management-web-interface.jpg)
  - Dedicated sections  
    ![The image shows a software interface from Backstage, displaying details about a component called "my-demo-app," including its owner, system, and lifecycle status. There is also a relations graph indicating ownership and a section for links and subcomponents.](https://kodekloud.com/kk-media/image/upload/v1752870141/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Community-Plugins/backstage-my-demo-app-interface.jpg)

With this setup, developers gain a unified CI/CD and DevOps dashboard—no more context switching!

---

## Links and References

- [Backstage Documentation](https://backstage.io/docs)
- [GitHub Actions Docs](https://docs.github.com/actions)
- [Backstage Community Plugins](https://github.com/backstage-community)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/aad867ea-baf2-4ca7-b722-ad38ea794a7e/lesson/1e3ae2bd-4bb1-4a35-b0af-8f7c5f2129f8)**
>
> Watch video content
