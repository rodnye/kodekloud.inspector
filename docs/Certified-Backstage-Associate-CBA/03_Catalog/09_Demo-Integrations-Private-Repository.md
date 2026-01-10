# Demo Integrations Private Repository - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Catalog/Demo-Integrations-Private-Repository)

---

## Table of Contents

- Demo Integrations Private Repository
  - 1. Convert Your Repository to Private
  - 2. Review the Catalog Definition
  - 3. Attempt to Register the Component
  - 4. Configure the GitHub Integration
  - 5. Generate a GitHub Personal Access Token
  - 6. Restart Backstage and Import the Component
  - 7. View the Imported Component
  - Links and References
  - Watch Video
    - 4.1 Set the Environment Variable

---

## Content

Certified Backstage Associate (CBA)

Catalog

# Demo Integrations Private Repository

In this guide, you’ll learn how to configure Backstage to pull catalog entities from a private GitHub repository. We’ll cover:

1.  Making a repo private
2.  Reviewing the `catalog-info.yaml` definition
3.  Registering a component (and troubleshooting 404 errors)
4.  Setting up a GitHub integration with a Personal Access Token (PAT)
5.  Generating and securing a PAT
6.  Restarting Backstage and importing the entity
7.  Viewing your newly imported component

---

## 1\. Convert Your Repository to Private

Start with your Backstage example repo (e.g., `backstage-auth-service`) in a public state:

![This image shows a GitHub repository page named "backstage-auth-service" with files and folders like "openapi" and "src" listed. The repository is public, with no description or README file added.](https://kodekloud.com/kk-media/image/upload/v1752870067/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Integrations-Private-Repository/github-repo-backstage-auth-service.jpg)

Steps:

1.  Go to **Settings** → **Options** → **Change repository visibility**.
2.  Choose **Private**, confirm, and authenticate if prompted.

Once done, your repo is no longer publicly accessible.

---

## 2\. Review the Catalog Definition

Ensure your `catalog-info.yaml` defines both a Component and an API:

```
apiVersion: backstage.io/v1beta1
kind: Component
metadata:
  name: auth-service
  description: authentication service
  tags:
    - javascript
  links:
    - url: https://google.com
      title: Admin Dashboard
      icon: dashboard
      target: admin-dashboard
spec:
  type: service
  lifecycle: production
  owner: guests
  providesApis:
    - auth-api
---
apiVersion: backstage.io/v1alpha1
kind: API
metadata:
  name: auth-api
  description: Verify user authentication status
spec:
  type: openapi
  lifecycle: production
  owner: guests
  apiProvidedBy: auth-service
```

Copy the raw URL to this file (for example:  
`https://raw.githubusercontent.com/<user>/backstage-auth-service/main/catalog-info.yaml`)  
—you’ll use it to register the location in Backstage.

> [!important]
> **Note**
>
> Make sure the raw URL points to the `main` branch (or your default branch). If you rename your branch, update the URL accordingly.

---

## 3\. Attempt to Register the Component

Run the Backstage CLI command to register the existing `catalog-info.yaml` location:

```
backstage-cli register-location \
  --location "url:https://raw.githubusercontent.com/<user>/backstage-auth-service/main/catalog-info.yaml"
```

Because the repo is private, you’ll see a 404 error:

```
{
  "error": {
    "name": "InputError",
    "message": "NotFoundError: Request failed for https://raw.githubusercontent.com/<user>/backstage-auth-service/main/catalog-info.yaml: 404 Not Found",
    "stack": "..."
  }
}
```

> [!important]
> **Warning**
>
> Backstage needs authentication to access private GitHub repos. Without a token, any `raw.githubusercontent.com` request returns 404.

---

## 4\. Configure the GitHub Integration

Edit your `app-config.yaml` to allow reading from GitHub and provide your PAT via an environment variable:

```
# app-config.yaml
reading:
  allow:
    - host: 'raw.githubusercontent.com'


integrations:
  github:
    - host: github.com
      token: ${GITHUB_TOKEN}
      # For GitHub Enterprise use:
      # apiBaseUrl: https://ghe.example.net/api/v3
      # rawBaseUrl: https://ghe.example.net/raw
      # token: ${GHE_TOKEN}
```

Table: GitHub Integration Settings

| Setting    | Description                         | Default / Example                |
| ---------- | ----------------------------------- | -------------------------------- |
| host       | GitHub host (public or enterprise)  | `github.com`                     |
| token      | Personal Access Token (via env var) | `${GITHUB_TOKEN}`                |
| apiBaseUrl | (Enterprise) API endpoint           | `https://ghe.example.net/api/v3` |
| rawBaseUrl | (Enterprise) Raw content endpoint   | `https://ghe.example.net/raw`    |

### 4.1 Set the Environment Variable

After generating your PAT, export it in your shell:

```
export GITHUB_TOKEN=<your_personal_access_token>
```

Or—for demo purposes—embed it (not recommended for production):

```
integrations:
  github:
    - host: github.com
      token: ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

---

## 5\. Generate a GitHub Personal Access Token

1.  Navigate to **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token (classic)**.
2.  Enter a name and expiration, then check the **repo** scope to allow reading private repos.
3.  Click **Generate token** and **copy** the token immediately.

![The image shows a GitHub page for creating a new personal access token, with options to set a note, expiration, and select scopes for the token. Various permissions like "repo" and "workflow" are visible for selection.](https://kodekloud.com/kk-media/image/upload/v1752870068/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Integrations-Private-Repository/github-personal-access-token-creation.jpg)

GitHub will show the token only once:

![The image shows a GitHub settings page for managing personal access tokens, with a token displayed and options to delete it. The page includes a warning to copy the token as it won't be visible again.](https://kodekloud.com/kk-media/image/upload/v1752870069/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Integrations-Private-Repository/github-settings-personal-access-token.jpg)

Table: PAT Scopes for Private Repo Access

| Scope | Purpose                                         |
| ----- | ----------------------------------------------- |
| repo  | Read and write to code, commit statuses, issues |

---

## 6\. Restart Backstage and Import the Component

Save your config changes, ensure `GITHUB_TOKEN` is exported, and restart the dev server:

```
yarn dev
```

In the Backstage UI, navigate to **Create** → **Import Existing Component**, paste your raw URL, and click **Review**. Backstage will authenticate using your PAT and fetch the entity:

![The image shows a web interface for registering an existing component in a Backstage app, with options to review and import entities from a GitHub repository. The left sidebar includes navigation options like Home, APIs, Docs, and Create.](https://kodekloud.com/kk-media/image/upload/v1752870070/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Integrations-Private-Repository/backstage-component-registration-interface.jpg)

Click **Import** to complete the registration.

---

## 7\. View the Imported Component

Head over to the Catalog in Backstage, select **auth-service**, and explore its overview, description, and relationships:

![The image shows a Backstage interface for an "auth-service" component, detailing its overview, description, and relations, including a graph showing ownership by "guests."](https://kodekloud.com/kk-media/image/upload/v1752870071/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Integrations-Private-Repository/backstage-auth-service-overview-graph.jpg)

You’ve now configured Backstage to successfully fetch catalog entities from a private GitHub repository!

---

## Links and References

- [Backstage Catalog Overview](https://backstage.io/docs/features/software-catalog/software-catalog-overview)
- [GitHub Docs: Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Backstage Configuration Reference](https://backstage.io/docs/reference/configuration)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/f9244f9d-083a-4acd-a518-549f54b644b5/lesson/0b0b01d9-69a2-4dab-a159-e9ae7c0bf049)**
>
> Watch video content
