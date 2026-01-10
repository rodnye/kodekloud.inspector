# Demo API Entity - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Catalog/Demo-API-Entity)

---

## Table of Contents

- Demo API Entity
  - 1. Import the Existing Authentication Service Component
  - 2. Define the API Entity
  - 3. Embed or Reference Your OpenAPI Definition
  - 4. Reference an External OpenAPI Spec
  - 5. Configure Backstage to Fetch External Specs
  - 6. View the API in Backstage
  - 7. Define API Consumers
  - Backstage Entity Summary
  - Links and References
  - Watch Video
    - 3.1 Inline OpenAPI Example

---

## Content

Certified Backstage Associate (CBA)

Catalog

# Demo API Entity

In this guide, we’ll walk through how to define an **API entity** in Backstage, link it to the component that provides it (the authentication service), and show how another component (e.g., a shopping cart) consumes it. You’ll learn how to embed or reference your OpenAPI spec, configure Backstage to fetch external files, and visualize relationships in the catalog.

## 1\. Import the Existing Authentication Service Component

First, ensure you have already registered your `auth-service` component in the catalog. This service will expose the API that downstream services use to verify user authentication.

```
apiVersion: backstage.io/v1beta1
kind: Component
metadata:
  name: auth-service
  description: Authentication service for user login and token management
  tags:
    - javascript
  links:
    - url: https://admin.example.com
      title: Admin Dashboard
      icon: dashboard
      type: admin-dashboard
spec:
  type: service
  lifecycle: production
  owner: guests
```

## 2\. Define the API Entity

Co-locate the API definition with the component in your `catalog-info.yaml`. Add the `providesApis` field to the component, then define a new `API` entity.

```
apiVersion: backstage.io/v1beta1
kind: Component
metadata:
  name: auth-service
  description: Authentication service for user login and token management
  tags:
    - javascript
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
  description: Service API for verifying user authentication status
spec:
  type: openapi
  lifecycle: production
  owner: guests
  apiProvidedBy: auth-service
  # definition goes below
```

## 3\. Embed or Reference Your OpenAPI Definition

The `definition` property accepts inline specs or external references. Backstage supports formats such as OpenAPI, AsyncAPI, GraphQL, and gRPC.

![The image shows a webpage from Backstage documentation, specifically detailing the descriptor format of a software catalog. It includes sections on API ownership, system references, and definition requirements, with a sidebar menu for navigation.](https://kodekloud.com/kk-media/image/upload/v1752870051/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-API-Entity/backstage-documentation-descriptor-format.jpg)

> [!important]
> **Note**
>
> For small APIs or quick demos, embed your definition inline under `definition: |`. For production, reference an external spec to keep your catalog readable.

### 3.1 Inline OpenAPI Example

```
spec:
  type: openapi
  lifecycle: production
  owner: guests
  apiProvidedBy: auth-service
  definition: |
    openapi: "3.0.0"
    info:
      version: 1.0.0
      title: Authentication Service API
      license:
        name: MIT
    servers:
      - url: https://auth.example.com/v1
    paths:
      /signup:
        post:
          summary: Create a new user account
          responses:
            '201':
              description: Created
```

## 4\. Reference an External OpenAPI Spec

Store your OpenAPI YAML in your repo (e.g., `openapi/auth-api-spec.yaml`) and reference its raw GitHub URL.

```
apiVersion: backstage.io/v1alpha1
kind: API
metadata:
  name: auth-api
  description: Service API for verifying user authentication status
spec:
  type: openapi
  lifecycle: production
  owner: guests
  apiProvidedBy: auth-service
  definition:
    $text: https://raw.githubusercontent.com/your-org/backstage-auth-service/main/openapi/auth-api-spec.yaml
```

## 5\. Configure Backstage to Fetch External Specs

By default, Backstage blocks external hosts. Allow the GitHub raw domain in your backend’s `app-config.yaml` so the spec can be fetched as plain text.

```
# app-config.yaml
reading:
  allow:
    - host: 'raw.githubusercontent.com'
```

> [!important]
> **Warning**
>
> After updating `app-config.yaml`, restart your Backstage backend to apply changes. Failing to do so will prevent the API definition from loading.

## 6\. View the API in Backstage

Navigate to **Catalog > Components > auth-service** and select the **API** tab. You should see `auth-api` listed.

![The image shows a dashboard from Backstage, displaying details about an "auth-service" component, including its description, owner, lifecycle, and related entities in a graph format.](https://kodekloud.com/kk-media/image/upload/v1752870052/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-API-Entity/backstage-auth-service-dashboard.jpg)

You can also browse **Catalog > APIs** and select `auth-api`.

![The image shows a web interface for "My Company Catalog" in Backstage, displaying a list of components with details like name, system, owner, type, and lifecycle. A dropdown menu is open, showing options like API, Component, Group, and more.](https://kodekloud.com/kk-media/image/upload/v1752870053/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-API-Entity/my-company-catalog-backstage-interface.jpg)

Under **Definition**, Backstage renders the interactive documentation:

![The image shows an API documentation interface for an "Authentication Service API" with endpoints for signup, login, logout, and token refresh. The interface includes options to expand each endpoint for more details.](https://kodekloud.com/kk-media/image/upload/v1752870055/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-API-Entity/authentication-service-api-docs.jpg)

## 7\. Define API Consumers

To show that another service consumes `auth-api`, update the consuming component’s entity:

```
apiVersion: backstage.io/v1alpha1
kind: System
metadata:
  name: purchasing
  description: System for managing user purchases
spec:
  owner: ecommerce
  domain: shopping-app
---
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: shopping-cart
  description: Frontend for selecting products and completing purchases
spec:
  type: website
  lifecycle: production
  owner: user:john
  system: purchasing
  dependsOn:
    - component: inventory
  consumesApis:
    - auth-api
```

![The image shows a dashboard interface for a "shopping-cart" component, displaying details like owner, system, and type, along with a relations graph illustrating dependencies and associations with other components.](https://kodekloud.com/kk-media/image/upload/v1752870056/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-API-Entity/shopping-cart-dashboard-interface.jpg)

Now the **shopping-cart** component graphically displays its dependency on `auth-api` in the Backstage catalog.

## Backstage Entity Summary

| Entity Kind | Purpose                               | Field                         |
| ----------- | ------------------------------------- | ----------------------------- |
| Component   | Defines services, websites, libraries | `providesApis`, `dependsOn`   |
| API         | Documents and links to an API spec    | `apiProvidedBy`, `definition` |
| System      | Groups related components and APIs    | `domain`, `spec.owner`        |

## Links and References

- [Backstage Catalog Descriptor Format](https://backstage.io/docs/features/software-catalog/descriptor-format)
- [Backstage API Docs](https://backstage.io/docs/features/api-docs/overview)
- [GitHub Raw Content Docs](https://docs.github.com/en/repositories/working-with-files/managing-files/raw-content)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/f9244f9d-083a-4acd-a518-549f54b644b5/lesson/b9bd1cb4-2841-41b9-95cc-c0433f48663a)**
>
> Watch video content
