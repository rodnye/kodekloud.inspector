# Demo Working with UsersGroupsDomainsSystems - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Catalog/Demo-Working-with-UsersGroupsDomainsSystems)

---

## Table of Contents

- Demo Working with UsersGroupsDomainsSystems
  - Backstage Entity Overview
  - Users
  - Groups
  - APIs
  - Systems
  - Domains
  - Resources
  - Links and References
  - Watch Video

---

## Content

Certified Backstage Associate (CBA)

Catalog

# Demo Working with UsersGroupsDomainsSystems

In this guide, we’ll explore core Backstage entities: **Users**, **Groups**, **APIs**, **Systems**, **Domains**, **Resources**, and **Templates**. Understanding how these types interrelate will help you organize your software catalog and automate entity synchronization.

![The image is a diagram with a central hexagon labeled "Entity" surrounded by six other hexagons labeled "Users," "Groups," "Systems," "Domains," "Templates," and "Resources." It illustrates different types of entities.](https://kodekloud.com/kk-media/image/upload/v1752870093/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Working-with-UsersGroupsDomainsSystems/entity-diagram-types-hexagons.jpg)

## Backstage Entity Overview

| Entity Type | Kind      | Description                                       |
| ----------- | --------- | ------------------------------------------------- |
| User        | User      | A person (employee, contractor)                   |
| Group       | Group     | Organizational units like teams or business units |
| Component   | Component | Services, libraries, or applications              |
| API         | API       | Interfaces provided or consumed by components     |
| System      | System    | Collection of related components and resources    |
| Domain      | Domain    | Logical business area grouping multiple systems   |
| Resource    | Resource  | Infrastructure elements (databases, queues, etc.) |

---

## Users

A **UserEntity** represents an individual—an employee, contractor, or consultant. Each user follows the same YAML structure:

```
apiVersion: backstage.io/v1alpha1
kind: User
metadata:
  name: jdoe
spec:
  profile:
    displayName: Jenny Doe
    email: jenny-doe@example.com
    picture: https://example.com/staff/jenny-with-party-hat.jpeg
    memberOf:
      - team-b
      - employees
```

- **metadata.name**: unique identifier for the user
- **spec.profile**: contains `displayName`, `email`, `picture`
- **memberOf**: lists Backstage groups the user belongs to

> [!important]
> **Note**
>
> You can synchronize users automatically from LDAP, SSO, or an HR system instead of hand-authoring each YAML file.

![The image is a diagram illustrating user entity synchronization, showing connections between LDAP, Single Sign-On, and an internal HR database, with outputs to user YAML files.](https://kodekloud.com/kk-media/image/upload/v1752870094/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Working-with-UsersGroupsDomainsSystems/user-entity-synchronization-diagram.jpg)

---

## Groups

A **GroupEntity** models teams, business units, or communities of interest. Groups help organize users and reflect your company’s hierarchy:

```
apiVersion: backstage.io/v1alpha1
kind: Group
metadata:
  name: infrastructure
  description: The infra business unit
spec:
  type: business-unit
  profile:
    displayName: Infrastructure
    email: infrastructure@example.com
    picture: https://example.com/groups/bu-infrastructure.jpeg
  parent: ops
  children:
    - backstage
    - other
  members:
    - jdoe
```

- **spec.type**: e.g., `business-unit`, `team`
- **parent/children**: build a hierarchy of groups
- **members**: list of user `metadata.name` values

> [!important]
> **Warning**
>
> When syncing groups from GitHub or an identity provider, ensure the `metadata.name` matches the external group's identifier to avoid duplicates.

![The image is a diagram showing the concept of syncing information to create teams, with two example teams labeled "Auth Team" and "Content Team."](https://kodekloud.com/kk-media/image/upload/v1752870095/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Working-with-UsersGroupsDomainsSystems/syncing-information-teams-diagram.jpg)

---

## APIs

Backstage treats APIs as first-class entities. Define **Component** and **API** resources to model service interfaces:

![The image is a diagram showing an "Auth Service" providing an API, which is consumed by three different services labeled Service 1, Service 2, and Service 3.](https://kodekloud.com/kk-media/image/upload/v1752870096/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Working-with-UsersGroupsDomainsSystems/auth-service-api-diagram.jpg)

```
apiVersion: backstage.io/v1beta1
kind: Component
metadata:
  name: auth-service
  description: Authentication service
  tags:
    - javascript
spec:
  type: service
  lifecycle: production
  owner: auth-team
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
  owner: auth-team
  apiProvidedBy: auth-service
  definition:
    $json: https://raw.githubusercontent.com/Sanjeev-Thiyagarajan/backstage-auth/main/openapi/auth-api-spec.yaml
```

You can declare the relationship from the **Component** (`providesApis`) or from the **API** (`apiProvidedBy`).

---

## Systems

A **SystemEntity** groups related components and resources, exposing only public APIs to consumers:

![The image explains that a system is a collection of resources and components exposing public APIs, with the main benefit being the hiding of resources and private APIs between components. It includes icons representing consumers and a network.](https://kodekloud.com/kk-media/image/upload/v1752870097/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Working-with-UsersGroupsDomainsSystems/system-resources-apis-diagram.jpg)

```
apiVersion: backstage.io/v1alpha1
kind: System
metadata:
  name: authentication-authorization
  description: Handles user authentication and profiles
spec:
  owner: guests
  domain: user-management
---
apiVersion: backstage.io/v1beta1
kind: Component
metadata:
  name: auth-service
  description: Authentication service
  tags:
    - javascript
  links:
    - url: https://google.com
      title: Admin Dashboard
      icon: dashboard
      type: admin-dashboard
spec:
  type: service
  lifecycle: production
  owner: guests
  system: authentication-authorization
  providesApis:
    - auth-api
```

Real-world examples:

![The image illustrates a playlist management system with a mobile interface and a backend service for updating, querying, and storing playlists.](https://kodekloud.com/kk-media/image/upload/v1752870098/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Working-with-UsersGroupsDomainsSystems/playlist-management-mobile-backend.jpg)

![The image illustrates a real-world analogy of entity-systems, showing a banking app interface connected to a payment system and an account management system.](https://kodekloud.com/kk-media/image/upload/v1752870099/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Working-with-UsersGroupsDomainsSystems/banking-app-entity-systems-diagram.jpg)

---

## Domains

A **DomainEntity** defines a logical business area. Systems are grouped under domains to reflect products or services:

![The image explains the concept of a domain as a collection of components serving a specific business, focusing on the "User Management Domain" with systems for authentication, user profiles, and tenants.](https://kodekloud.com/kk-media/image/upload/v1752870100/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Working-with-UsersGroupsDomainsSystems/user-management-domain-concept.jpg)

```
apiVersion: backstage.io/v1alpha1
kind: Domain
metadata:
  name: user-management
  description: Everything about user operations
spec:
  type: product-area
  owner: guests
  subdomainOf: Ecommerce
---
apiVersion: backstage.io/v1alpha1
kind: System
metadata:
  name: authentication-authorization
  description: Handles user authentication and profiles
spec:
  owner: guests
  domain: user-management
```

---

## Resources

A **ResourceEntity** represents infrastructure—databases, message queues, buckets, or CDNs—that a system relies on:

![The image is a diagram showing a "Component" that depends on a "Resource," which is connected to a database, server, and S3 bucket.](https://kodekloud.com/kk-media/image/upload/v1752870101/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Working-with-UsersGroupsDomainsSystems/component-resource-dependency-diagram.jpg)

```
apiVersion: backstage.io/v1alpha1
kind: Resource
metadata:
  name: auth-db
  description: Stores user profiles
spec:
  type: database
  owner: guests
  system: authentication-authorization
```

---

## Links and References

- [Backstage Software Catalog Entities](https://backstage.io/docs/features/software-catalog/markup#entities)
- [Backstage Catalog Processing](https://backstage.io/docs/features/software-catalog/descriptor-processing)
- [Backstage Software Templates](https://backstage.io/docs/features/software-templates/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/f9244f9d-083a-4acd-a518-549f54b644b5/lesson/f1c4777e-f92c-46d0-8234-3f7ed5ea2cf8)**
>
> Watch video content
