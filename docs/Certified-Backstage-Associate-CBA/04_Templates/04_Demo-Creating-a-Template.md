# Demo Creating a Template - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Templates/Demo-Creating-a-Template)

---

## Table of Contents

- Demo Creating a Template
  - High-Level Workflow
  - 1. Project Skeleton
  - 2. Developer Experience
  - 3. Exploring Built-in Actions
  - 4. Registering the Template
  - 5. Using the Template
  - 6. Template YAML Example
  - Links and References
  - Watch Video
    - package.json
    - Express API (src/index.js)
    - GitHub Actions Workflow (.github/workflows/ci.yml)

---

## Content

Certified Backstage Associate (CBA)

Templates

# Demo Creating a Template

In this walkthrough, we'll build a reusable [Backstage](https://backstage.io/) template for provisioning a **Node.js** API using **Express.js**. By standardizing your project setup, every new API automatically includes:

- Linting with [ESLint](https://eslint.org/)
- Formatting with [Prettier](https://prettier.io/)
- Testing with [Jest](https://jestjs.io/)
- CI/CD via [GitHub Actions](https://docs.github.com/actions)
- Express.js as the API framework

| Tool           | Purpose           | Example Command            |
| -------------- | ----------------- | -------------------------- |
| ESLint         | Linting           | `npm run lint`             |
| Prettier       | Code formatting   | `npm run format`           |
| Jest           | Automated testing | `npm run test`             |
| GitHub Actions | CI/CD             | `.github/workflows/ci.yml` |
| Express.js     | API framework     | `npm install express`      |

![The image lists organizational requirements, including tools for linting (eslint), formatting (prettier), testing (jest), CI/CD pipeline (GitHub Actions), and API library (express.js).](https://kodekloud.com/kk-media/image/upload/v1752870200/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Creating-a-Template/organizational-requirements-tools-eslint-prettier.jpg)

---

## High-Level Workflow

The platform team maintains a **blueprint repository** containing a `template.yaml`. When a developer fills out a form in Backstage:

1.  Backstage fetches the project skeleton.
2.  It injects parameters (name, owner, repo URL).
3.  A new GitHub repository is created and registered automatically.

![The image illustrates a workflow involving a platform team and a developer, featuring a form for project creation, a GitHub repository, and a YAML template. It visually represents steps in a process, likely related to software development or deployment.](https://kodekloud.com/kk-media/image/upload/v1752870201/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Creating-a-Template/platform-team-developer-workflow.jpg)

---

## 1\. Project Skeleton

Your blueprint (“Backstage Express API blueprint”) provides starter code:

- **package.json** with scripts for start, dev, test, format, lint
- **.nvmrc** (Node.js version: `v20.11.0`)
- **.gitignore** (ignoring `node_modules/`)
- **src/** directory with a minimal Express endpoint
- **.github/workflows/ci.yml** for GitHub Actions

In the IDE, it looks like this:

![The image shows a Visual Studio Code interface with a file explorer open on the left, displaying various project files, and a `.gitignore` file open in the editor. The terminal at the bottom shows a Windows command prompt.](https://kodekloud.com/kk-media/image/upload/v1752870202/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Creating-a-Template/visual-studio-code-file-explorer.jpg)

### package.json

```
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest",
    "test:ci": "jest --ci",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "lint": "eslint .",
    "lint:fix": "eslint --fix ."
  },
  "type": "module",
  "keywords": [],
  "author": ""
}
```

> [!important]
> **Node Version**
>
> Make sure to update **.nvmrc** when your team upgrades Node.js:
>
> ```
> v20.11.0
> ```

### Express API (`src/index.js`)

```
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from your Express API!');
});

const port = process.env.PORT ?? 4000;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
```

### GitHub Actions Workflow (`.github/workflows/ci.yml`)

```
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  quality-checks:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Check formatting with Prettier
        run: npm run format:check

      - name: Run tests
        run: npm run test:ci
```

---

## 2\. Developer Experience

Developers select the **Node.js + Express** template in Backstage’s **Create** UI, fill in project fields, and click **Create**. Everything else is automated.

![The image shows a web interface for creating new software components using templates, specifically featuring options for Node.js API with Express.js and an example Node.js template. The interface includes a sidebar with navigation options and a search bar.](https://kodekloud.com/kk-media/image/upload/v1752870203/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Creating-a-Template/web-interface-nodejs-templates.jpg)

![The image shows a web interface for creating a new software component using a Node.js API with Express.js template. It includes fields for entering project information such as the component name and owner.](https://kodekloud.com/kk-media/image/upload/v1752870204/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Creating-a-Template/nodejs-api-express-template-interface.jpg)

![The image shows a web interface for creating a new software component using a Node.js API with Express.js template. It includes fields for specifying the repository location on GitHub.](https://kodekloud.com/kk-media/image/upload/v1752870205/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Creating-a-Template/nodejs-api-express-template-interface-2.jpg)

Backstage shows real-time progress:

![The image shows a web interface for running an "api-express-template" task in Backstage, with steps for fetching, publishing, and registering. The sidebar includes options like Home, APIs, Docs, and Create.](https://kodekloud.com/kk-media/image/upload/v1752870206/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Creating-a-Template/backstage-api-express-template-interface.jpg)

Once complete, the GitHub repository is created:

![The image shows a GitHub repository page for a project named "inventory-service," displaying a list of files and folders with their initial commit status. The repository is private and written in JavaScript.](https://kodekloud.com/kk-media/image/upload/v1752870207/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Creating-a-Template/github-repo-inventory-service-js.jpg)

Backstage also registers the component automatically:

![The image shows a dashboard interface for an "inventory-service" component in Backstage, displaying details like owner, lifecycle, and relations. It includes sections for overview, CI/CD, API, dependencies, and documentation.](https://kodekloud.com/kk-media/image/upload/v1752870207/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Creating-a-Template/inventory-service-dashboard-backstage.jpg)

---

## 3\. Exploring Built-in Actions

Backstage Scaffolder comes with many **pre-built actions**. For example:

| Action                    | Purpose                                    |
| ------------------------- | ------------------------------------------ |
| `github:actions:dispatch` | Trigger a GitHub Actions workflow          |
| `github:repo:push`        | Push generated code to a GitHub repository |
| `fetch:template`          | Fetch and render a template repository     |

![The image shows a user interface for "Backstage" with a section titled "Installed actions," specifically highlighting the "github:actions:dispatch" action, which allows dispatching a GitHub Action workflow for a given branch or tag. It includes input fields for repository location, workflow ID, branch or tag name, workflow inputs, and authentication token.](https://kodekloud.com/kk-media/image/upload/v1752870208/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Creating-a-Template/backstage-installed-actions-github.jpg)

![The image shows a Backstage interface with details about a GitHub repository push action, including input parameters and their descriptions.](https://kodekloud.com/kk-media/image/upload/v1752870209/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Creating-a-Template/backstage-github-repo-push-action.jpg)

You can preview parameters for `fetch:template` in the form playground:

![The image shows a screenshot of a Backstage interface with a section titled "fetch:template," detailing input parameters for a templating action. The left sidebar includes navigation options like Home, APIs, Docs, and a "Create..." button.](https://kodekloud.com/kk-media/image/upload/v1752870210/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Creating-a-Template/backstage-fetch-template-interface-screenshot.jpg)

---

## 4\. Registering the Template

Register your `template.yaml` so Backstage displays it in the **Create** UI. You have two options:

1.  **UI Registration**: Paste the URL of your template YAML.
2.  **Import**: Select **Import** and choose from your templates repository.

![The image shows a user interface for registering an existing component in a Backstage app, with a URL input field and an "ANALYZE" button. The sidebar includes navigation options like Home, APIs, Docs, and Create.](https://kodekloud.com/kk-media/image/upload/v1752870211/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Creating-a-Template/backstage-component-registration-ui.jpg)

![The image shows a user interface for registering an existing component in a Scaffolded Backstage App, with options to select a URL, review entities, and an "IMPORT" button highlighted.](https://kodekloud.com/kk-media/image/upload/v1752870213/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Creating-a-Template/backstage-app-register-component-ui.jpg)

---

## 5\. Using the Template

Once registered, your Node.js + Express template appears in **Create**. Select it, fill in details, and click **Create**:

![The image shows a web interface for creating new software components using templates, specifically for Node.js with Express.js and a Node.js template. A cursor is hovering over the "CHOOSE" button for one of the templates.](https://kodekloud.com/kk-media/image/upload/v1752870214/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Creating-a-Template/nodejs-express-template-interface.jpg)

![The image shows a web interface for creating a new component using a Node.js API with Express.js template. It includes fields for project information such as the component name and owner.](https://kodekloud.com/kk-media/image/upload/v1752870215/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Creating-a-Template/nodejs-api-express-component-creation.jpg)

After creation, view your new service dashboard:

![The image shows a dashboard interface for a "video-processing" service in Backstage, displaying details like owner, lifecycle, and relations. The sidebar includes options for Home, APIs, Docs, and Create.](https://kodekloud.com/kk-media/image/upload/v1752870216/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Creating-a-Template/video-processing-dashboard-backstage.jpg)

---

## 6\. Template YAML Example

Here’s a complete `template.yaml` that ties everything together:

```
apiVersion: backstage.io/v1beta3
kind: Template
metadata:
  name: api-express-template
  title: Node.js API w/ Express.js
  description: A template for provisioning Express.js APIs with built-in CI/CD and code quality tools
spec:
  owner: user:guest
  type: service

  parameters:
    - title: Project Info
      required:
        - name
        - owner
      properties:
        name:
          title: Name
          type: string
          description: Unique component name
          ui:
            autofocus: true
        owner:
          title: Owner
          type: string
          description: Component owner
          ui:
            field: OwnerPicker
            options:
              catalogFilter:
                kind: [User, Group]

    - title: Choose Location
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

  steps:
    - id: fetch-base
      name: Fetch Base
      action: fetch:template
      input:
        url: https://github.com/Sanjeev-Thiyagarajan/backstage-express-api-blueprint
        values:
          name: ${{ parameters.name }}
          owner: ${{ parameters.owner }}

    - id: publish
      name: Publish to GitHub
      action: publish:github
      input:
        allowedHosts: ['github.com']
        description: Project ${{ parameters.name }}
        repoUrl: ${{ parameters.repoUrl }}

    - id: register
      name: Register Component
      action: catalog:register
      input:
        repoContentsUrl: ${{ steps.publish.output.repoContentsUrl }}
        catalogInfoPath: /catalog-info.yaml

  output:
    links:
      - title: Repository
        url: ${{ steps.publish.output.remoteUrl }}
      - title: Open in Catalog
        icon: catalog
        entityRef: ${{ steps.register.output.entityRef }}
```

> [!important]
> **Templating Values**
>
> In your skeleton’s `package.json` and `catalog-info.yaml`, reference parameters using the `values` object:
>
> ```
> {
> "name": "${{ values.name }}",
> "version": "1.0.0"
> }
> ```
>
> ```
> apiVersion: backstage.io/v1alpha1
> kind: Component
> metadata:
> name: '${{ values.name | dump }}'
> spec:
> type: service
> owner: '${{ values.owner }}'
> lifecycle: experimental
> ```

---

## Links and References

- [Backstage Scaffolder Concepts](https://backstage.io/docs/features/software-templates/creating-templates)
- [Backstage Template API](https://backstage.io/docs/features/software-templates/reference/template-format)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Node.js Official Site](https://nodejs.org/)
- [Express.js Guide](https://expressjs.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/1c7142e3-0cb6-40ae-b5b6-77252f8c85b2/lesson/bdcf9a0b-92e8-4ce6-80c9-187b0e117a98)**
>
> Watch video content
