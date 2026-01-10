# Demo Template Basics - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Templates/Demo-Template-Basics)

---

## Table of Contents

- Demo Template Basics
  - High-Level Workflow
  - Exploring the Built-In Example
  - Template Definition (template.yaml)
  - Links and References
  - Watch Video
    - 1. Form Parameters
    - 2. Content Blueprint
    - 3. Publishing to GitHub
    - 4. Registering in Backstage
    - 5. Template Outputs

---

## Content

Certified Backstage Associate (CBA)

Templates

# Demo Template Basics

In this lesson, we’ll create a reusable Backstage template that enforces organizational standards—linting with [ESLint](https://eslint.org/), formatting with [Prettier](https://prettier.io/), testing via [Jest](https://jestjs.io/), a [GitHub Actions](https://github.com/features/actions) CI/CD pipeline, and an [Express.js](https://expressjs.com/) API—straight out of the box.

![The image lists organizational requirements for software development, including tools like ESLint, Prettier, Jest, GitHub Actions, and Express.js.](https://kodekloud.com/kk-media/image/upload/v1752870221/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Template-Basics/organizational-requirements-software-dev.jpg)

## High-Level Workflow

1.  **Platform team** generates starter code for a Node.js + Express API that includes ESLint, Prettier, Jest, CI/CD, and more.
2.  They commit this blueprint to GitHub (e.g., `backstage-express-api-blueprint`) and add a `template.yaml`.
3.  **Developers** in Backstage run the template: fill out a form (project name, repo location), Backstage pulls the blueprint, injects the values, and publishes a new repo (e.g., `demo-app`).
4.  The template then registers the new service in the Backstage catalog.

![The image illustrates a workflow involving a platform team and a developer using a form to create a project named "Demo-App," which interacts with a GitHub repository and a YAML template.](https://kodekloud.com/kk-media/image/upload/v1752870222/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Template-Basics/platform-team-developer-workflow-demo-app.jpg)

---

## Exploring the Built-In Example

Once your Backstage app is running, go to **Create → Software Component** to find the **Example Node.js Template**, which comes pre-installed.

![The image shows a dashboard from "My Company Catalog" in Backstage, listing various components with details like name, system, owner, type, and lifecycle. The interface includes options for filtering and creating new entries.](https://kodekloud.com/kk-media/image/upload/v1752870223/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Template-Basics/my-company-catalog-dashboard.jpg)

![The image shows a web interface for creating a new software component using Backstage, featuring an "Example Node.js Template" available for selection. The interface includes options for filtering templates by categories and owner.](https://kodekloud.com/kk-media/image/upload/v1752870225/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Template-Basics/backstage-software-component-template.jpg)

This example is registered via your `app-config.yaml` under catalog locations:

```
# app-config.yaml
catalog:
  locations:
    # Local example template
    - type: file
      target: ../../examples/template/template.yaml
      rules:
        - allow: [Template]

    # Local example organizational data
    - type: file
      target: ../../examples/org.yaml
      rules:
        - allow: [User, Group]
```

The `examples/template/template.yaml` file defines that template in the UI.

---

## Template Definition (`template.yaml`)

Below is a consolidated view of the `example-nodejs-template` (`scaffolder.backstage.io/v1beta3`):

```
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: example-nodejs-template
  title: Example Node.js Template
  description: An example template for the scaffolder that creates a simple Node.js service
spec:
  owner: user:guest
  type: service

  # 1. Parameters → Generate the input form
  parameters:
    - title: Fill in some steps
      required:
        - name
      properties:
        name:
          title: Name
          type: string
          description: Unique name of the component
          ui:
            autofocus: true

    - title: Choose a location
      required:
        - repoUrl
      properties:
        repoUrl:
          title: Repository Location
          type: string
          ui:
            field: RepoUrlPicker
            options:
              allowedHosts:
                - github.com

  # 2. Steps → Execute actions in order
  steps:
    - id: fetch-base
      name: Fetch Base
      action: fetch:template
      input:
        url: ./content
        values:
          name: ${{ parameters.name }}

    - id: publish
      name: Publish
      action: publish:github
      input:
        allowedHosts: ['github.com']
        description: This is ${{ parameters.name }}
        repoUrl: ${{ parameters.repoUrl }}

    - id: register
      name: Register
      action: catalog:register
      input:
        repoContentsUrl: ${{ steps.publish.output.repoContentsUrl }}
        catalogInfoPath: '/catalog-info.yaml'

  # 3. Output → Links shown after success
  output:
    links:
      - title: Repository
        url: ${{ steps.publish.output.remoteUrl }}
      - title: Open in catalog
        icon: catalog
        entityRef: ${{ steps.register.output.entityRef }}
```

### 1\. Form Parameters

- **Name**  
  A single-line text input that is autofocused.
- **Repository Location**  
  Uses a `RepoUrlPicker` UI component, restricted to `github.com`.

> [!important]
> **Note**
>
> The `RepoUrlPicker` helps enforce allowed hosts and prevents typos in repo URLs.

### 2\. Content Blueprint

Inside the `./content` folder of the template repo, you’ll find these files:

- **package.json**

  ```
  {
    "name": "${{ values.name }}",
    "private": true,
    "dependencies": {}
  }
  ```

- **index.js**

  ```
  console.log('Hello from ${{ values.name }}!');
  ```

- **catalog-info.yaml**

  ```
  apiVersion: backstage.io/v1alpha1
  kind: Component
  metadata:
    name: ${{ values.name | dump }}
  spec:
    type: service
    owner: user:guest
    lifecycle: experimental
  ```

The `fetch:template` action copies these files into the new project and replaces template variables.

### 3\. Publishing to GitHub

The `publish:github` step creates a new repository and pushes the generated code:

- **allowedHosts**: Whitelist of Git hosts
- **description**: Repo description incorporating the component name
- **repoUrl**: Target location from form input

| Action ID  | Action           | Purpose                                 |
| ---------- | ---------------- | --------------------------------------- |
| fetch-base | fetch:template   | Pull and render the content blueprint   |
| publish    | publish:github   | Create the repo and push code to GitHub |
| register   | catalog:register | Register the new service in Backstage   |

> [!important]
> **Warning**
>
> Ensure your GitHub token has `repo` and `workflow` scopes for successful publishing.

### 4\. Registering in Backstage

With the files published, the `catalog:register` action makes the new service visible in your catalog by pointing to its `catalog-info.yaml`:

```
- id: register
  name: Register
  action: catalog:register
  input:
    repoContentsUrl: ${{ steps.publish.output.repoContentsUrl }}
    catalogInfoPath: '/catalog-info.yaml'
```

### 5\. Template Outputs

When the template runs successfully, Backstage displays quick-access links:

- **Repository** → Navigate to the GitHub repo
- **Open in catalog** → View the newly registered component

---

With a few clicks, you’ve spun up a fully configured Node.js service—complete with ESLint, Prettier, Jest, GitHub Actions CI/CD, and automatic catalog registration. Next, we’ll create our own custom template from scratch.

## Links and References

- [Backstage Software Templates](https://backstage.io/docs/features/software-templates/creating-templates)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Express.js Guide](https://expressjs.com/en/starter/installing.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/1c7142e3-0cb6-40ae-b5b6-77252f8c85b2/lesson/a5782c98-c489-465b-9386-c4b71ed6543a)**
>
> Watch video content
