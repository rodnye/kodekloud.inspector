# Demo Registering a Component - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Catalog/Demo-Registering-a-Component)

---

## Table of Contents

- Demo Registering a Component
  - 1. Where the Example Component Is Configured
  - 2. Defining Your Own Component (catalog-info.yaml)
  - 3. Statically Importing the Entity
  - 4. Importing from a GitHub URL
  - 5. Registering via the Backstage UI
  - Summary of Registration Methods
  - Watch Video
  - Practice Lab

---

## Content

Certified Backstage Associate (CBA)

Catalog

# Demo Registering a Component

In this guide, we’ll explore four ways to register a component in Backstage:

1.  Statically from a local project
2.  From a remote URL (e.g., GitHub)
3.  Via the Backstage UI
4.  Automatically via templates or repository scanning

---

## 1\. Where the Example Component Is Configured

Backstage ships with an example component in its software catalog. You can inspect it in the repo:

![The image shows a GitHub repository page with a file directory view, displaying folders and files such as "auth-api-spec.yaml" and "package.json." The repository is named "backup-backstage-auth."](https://kodekloud.com/kk-media/image/upload/v1752870072/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Registering-a-Component/github-repo-backup-backstage-auth.jpg)

Open `app-config.yaml` and find the `catalog` section. By default, it imports example entities and templates:

```
# app-config.yaml
catalog:
  import:
    entityFilename: catalog-info.yaml
    pullRequestBranchName: backstage-integration
  rules:
    - allow: [Component, System, API, Resource, Location]
  locations:
    # Local example data; paths are relative to packages/backend
    - type: file
      target: ../examples/entities.yaml
    # Local example templates
    - type: file
      target: ../../examples/template/template.yaml
      rules:
        - allow: [Template]
```

The file `examples/entities.yaml` defines the example component and API:

```
# examples/entities.yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: example-website
spec:
  type: website
  lifecycle: experimental
  owner: guests
  system: examples
  providesApis:
    - example-grpc-api
---
apiVersion: backstage.io/v1alpha1
kind: API
metadata:
  name: example-grpc-api
spec:
  type: grpc
  lifecycle: experimental
  owner: guests
  system: examples
  definition: |
    syntax = "proto3";
```

After starting Backstage, you’ll see **example-website** already registered:

![The image shows a dashboard interface of "My Company Catalog" in Backstage, displaying a starred component named "example-website" with details like system, owner, type, and lifecycle. The sidebar includes options for Home, APIs, Docs, and Create.](https://kodekloud.com/kk-media/image/upload/v1752870073/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Registering-a-Component/my-company-catalog-dashboard.jpg)

---

## 2\. Defining Your Own Component (`catalog-info.yaml`)

Let’s add a simple Node.js “auth service” component:

src/index.js

```
import express from "express";


const app = express();
app.get("/", (req, res) => res.send("Hello World!"));


const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

In your project root, create `catalog-info.yaml`:

```
# catalog-info.yaml
apiVersion: backstage.io/v1beta1
kind: Component
metadata:
  name: auth-service
  description: Authentication service
  tags:
    - javascript
  links:
    - url: https://admin.example-org.com
      title: Admin Dashboard
      icon: dashboard
      type: admin-dashboard
spec:
  type: service
  lifecycle: production
  owner: guests
```

Backstage supports a variety of `spec.type` values (e.g., `service`, `website`, `library`). For full schema details, see the [Backstage software catalog descriptor format docs](https://backstage.io/docs/features/software-catalog/descriptor-format):

![The image shows a webpage from Backstage documentation, specifically detailing the YAML file format for software catalog configuration. It includes sections on `apiVersion`, `kind`, and `spec.type` with descriptions and requirements.](https://kodekloud.com/kk-media/image/upload/v1752870074/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Registering-a-Component/backstage-yaml-file-format-docs.jpg)

---

## 3\. Statically Importing the Entity

To register your `auth-service` locally, update `app-config.yaml`:

```
# app-config.yaml
catalog:
  import:
    entityFilename: catalog-info.yaml
    pullRequestBranchName: backstage-integration
  rules:
    - allow: [Component, System, API, Resource, Location]
  locations:
    - type: file
      target: ../../examples/entities.yaml
    - type: file
      target: ../../examples/auth-entity.yaml   # <-- your new file
```

Restart the Backstage backend. In the catalog you’ll now see **auth-service** next to **example-website**:

![The image shows a web interface for "My Company Catalog" on Backstage, displaying a list of components with details like name, system, owner, type, and lifecycle. There are two components listed: "auth-service" and "example-website."](https://kodekloud.com/kk-media/image/upload/v1752870075/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Registering-a-Component/my-company-catalog-backstage-interface.jpg)

Click **auth-service** to view its details and relations:

![The image shows a dashboard interface of a software tool called Backstage, displaying details about an authentication service, including its description, owner, system, and lifecycle. It also features a relations graph and links to additional resources.](https://kodekloud.com/kk-media/image/upload/v1752870076/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Registering-a-Component/backstage-authentication-service-dashboard.jpg)

---

## 4\. Importing from a GitHub URL

You can host `catalog-info.yaml` alongside your code on GitHub:

1.  Create a new repo (e.g., `backstage-auth-service`):  
    ![The image shows a GitHub page for creating a new repository, with fields for the repository name, description, and settings for visibility and initialization options.](https://kodekloud.com/kk-media/image/upload/v1752870077/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Registering-a-Component/github-new-repository-creation.jpg)
2.  Push your code and YAML:

    ```
    git init
    git add .
    git commit -m "first commit"
    git branch -M main
    git remote add origin https://github.com/YourOrg/backstage-auth-service.git
    git push -u origin main
    ```

    ![The image shows a GitHub repository page with a list of files and folders, including "openapi," "src," and configuration files. The repository is titled "backstage-auth-service" and is written in JavaScript.](https://kodekloud.com/kk-media/image/upload/v1752870078/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Registering-a-Component/backstage-auth-service-repo-files.jpg)

> [!important]
> **Note**
>
> When using a GitHub URL for Backstage locations, point to the **raw** file link, for example:
> `https://raw.githubusercontent.com/YourOrg/backstage-auth-service/main/catalog-info.yaml`

3.  Update `app-config.yaml` to reference the remote URL:

```
catalog:
  locations:
    - type: file
      target: ../../examples/entities.yaml
    - type: url
      target: https://raw.githubusercontent.com/YourOrg/backstage-auth-service/main/catalog-info.yaml
```

4.  Restart the backend. Backstage will fetch **auth-service** from GitHub and register it automatically.
5.  Backstage syncs on its regular interval (~30 min). You can force a sync by clicking the refresh icon in the UI.

> [!important]
> **Warning**
>
> If you update `owner: auth-team` without registering the `auth-team` group, you’ll get a missing relation error.

![The image shows a web interface for a service called "auth-service" in Backstage, displaying details like description, owner, system, and type, along with a warning about missing entity relations.](https://kodekloud.com/kk-media/image/upload/v1752870079/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Registering-a-Component/auth-service-backstage-interface-details.jpg)

To fix relations, define `User` and `Group` entities, for example:

```
---
apiVersion: backstage.io/v1alpha1
kind: User
metadata:
  name: guest
spec:
  memberOf:
    - guests
---
apiVersion: backstage.io/v1alpha1
kind: Group
metadata:
  name: guests
spec:
  type: team
  children: []
```

---

## 5\. Registering via the Backstage UI

You can import any existing component directly in the UI:

1.  Click **Create** → **Register existing component**.
2.  Paste the URL to `catalog-info.yaml` and click **Analyze**.

![The image shows a user interface for registering an existing component in a Scaffolded Backstage App, with options to select a URL, review entities, and import them into a catalog. The left sidebar includes navigation options like Home, APIs, Docs, and Create.](https://kodekloud.com/kk-media/image/upload/v1752870080/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Registering-a-Component/backstage-app-register-component-ui.jpg)

3.  Review the entity and click **Import**. Now **auth-service** appears in your catalog.
4.  Use the “…” menu on a component to:
    - **Inspect entity**: view metadata or raw JSON/YAML
    - **Unregister entity**: remove it from the catalog

![The image shows a web interface for a service called "auth-service" in Backstage, displaying details like description, owner, and lifecycle, with options to inspect or unregister the entity.](https://kodekloud.com/kk-media/image/upload/v1752870081/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Registering-a-Component/auth-service-backstage-web-interface.jpg)

The **Entity Inspector** provides a full overview:

![The image shows a software interface titled "Entity Inspector" with an "Overview" section displaying details about an entity's identity and metadata, including fields like `apiVersion`, `kind`, and `spec.type`.](https://kodekloud.com/kk-media/image/upload/v1752870081/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Registering-a-Component/entity-inspector-overview-metadata.jpg)

---

## Summary of Registration Methods

| Method                | Configuration Location                       | When to Use                                   |
| --------------------- | -------------------------------------------- | --------------------------------------------- |
| Static file           | `app-config.yaml` → `type: file`             | Local projects or monorepos                   |
| Remote URL            | `app-config.yaml` → `type: url`              | Hosted catalogs on GitHub or HTTPS endpoint   |
| UI import             | Backstage **Create** → **Register existing** | Quick manual imports without config changes   |
| Templates & repo scan | Scaffold or scanning plugins                 | Automated registration during code generation |

![The image shows a web interface of a "My Company Catalog" in Backstage, displaying a list of components with details like name, system, owner, type, and lifecycle. There is one component listed named "example-website."](https://kodekloud.com/kk-media/image/upload/v1752870082/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Registering-a-Component/my-company-catalog-backstage-interface-2.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/f9244f9d-083a-4acd-a518-549f54b644b5/lesson/f07e27d6-12c8-4688-a61b-a1fc9df9b291)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/f9244f9d-083a-4acd-a518-549f54b644b5/lesson/71558f5a-be40-4d55-836f-2d73ac1c8aea)**
>
> Practice lab
