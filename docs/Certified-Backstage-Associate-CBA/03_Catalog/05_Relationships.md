# Relationships - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Catalog/Relationships)

---

## Table of Contents

- Relationships
  - User and Group Membership
  - Group Hierarchy (Parent & Child)
  - Ownership (Users & Groups)
  - Component & API Relationships
  - Generic Dependencies (dependsOn)
  - Systems and Domains
  - Further Reading & Resources
  - Watch Video
    - Group Ownership (Default)
    - User Ownership
    - Provider Component
    - Consumer Component
    - Component depending on another component
    - Component depending on a resource
    - Linking Entities to a System
    - Defining Systems and Domains
    - Domain Hierarchy

---

## Content

Certified Backstage Associate (CBA)

Catalog

# Relationships

Backstage lets you define and visualize how your components, APIs, resources, systems, domains, groups, and users connect. By modeling these relationships, you can immediately trace the impact of changes across downstream entities. In this guide, we’ll cover:

- User ↔ Group membership
- Group hierarchy
- Ownership by users or groups
- Component & API relationships
- Generic dependencies
- Organizing with systems and domains

---

## User and Group Membership

You can link users and groups using either `memberOf` on the user or `members` on the group. Backstage automatically resolves the relationship in both directions, so defining it on one side is sufficient.

> [!important]
> **Note**
>
> Define the relationship on either the user or group. Backstage will infer the reverse link.

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
    - infrastructure
    - auth
---
apiVersion: backstage.io/v1alpha1
kind: Group
metadata:
  name: infrastructure
  description: The infra business unit
spec:
  type: business-unit
  children: []
  members:
    - jdoe
  profile:
    displayName: Infrastructure
    email: infrastructure@example.com
    picture: https://example.com/groups/bu-infrastructure.jpeg
```

---

## Group Hierarchy (Parent & Child)

Groups can form a hierarchy by specifying `parent` and listing `children`. This creates a tree structure for organizational units.

```
apiVersion: backstage.io/v1alpha1
kind: Group
metadata:
  name: infrastructure
  description: The infra business unit
spec:
  type: business-unit
  parent: ops
  children:
    - cloud
    - onPrem
  members:
    - jdoe
  profile:
    displayName: Infrastructure
    email: infrastructure@example.com
    picture: https://example.com/groups/bu-infrastructure.jpeg
```

- `parent`: single group name
- `children`: array of child-group names

---

## Ownership (Users & Groups)

Entities in Backstage—components, APIs, resources, systems, domains—can be owned by a group (default) or a user.

### Group Ownership (Default)

```
apiVersion: backstage.io/v1beta1
kind: Component
metadata:
  name: auth-service
  description: Authentication service
spec:
  type: service
  lifecycle: production
  owner: group:auth-team
  system: authentication-authorization
```

### User Ownership

Prefix with `user:` to assign a user as the owner.

```
spec:
  owner: user:idoe
```

---

## Component & API Relationships

Components often **provide** or **consume** APIs. On the component side, use `providesApis` and `consumesApis`. On the API entity, use `apiProvidedBy`.

![The image is a diagram illustrating relationships between different entities such as Domain, System, API, Resource, and Component, with connections to Group and User types, showing ownership and membership relations.](https://kodekloud.com/kk-media/image/upload/v1752870107/notes-assets/images/Certified-Backstage-Associate-CBA-Relationships/entity-relationship-diagram-api-system.jpg)

### Provider Component

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
  owner: guests
  system: authentication-authorization
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
  definition:
    $text: https://raw.githubusercontent.com/Sanjeev-Thiyagarajan/backstage-auth/main/openapi/auth-api-spec.yaml
```

### Consumer Component

```
apiVersion: backstage.io/v1beta1
kind: Component
metadata:
  name: shopping-cart
  description: Shopping cart service
  tags:
    - javascript
  annotations:
    backstage.io/techdocs-ref: dir:.
spec:
  type: service
  lifecycle: production
  owner: shopping-team
  consumesApis:
    - auth-api
```

---

## Generic Dependencies (`dependsOn`)

Beyond APIs, components and resources can depend on one another. Use `dependsOn` with typed references.

| Relationship          | Field       | Example Value  |
| --------------------- | ----------- | -------------- |
| Component → Component | `component` | `auth-service` |
| Component → Resource  | `resource`  | `auth-db`      |

### Component depending on another component

```
apiVersion: backstage.io/v1beta1
kind: Component
metadata:
  name: shopping-cart
spec:
  type: service
  lifecycle: production
  owner: shopping-team
  dependsOn:
    - component: auth-service
  consumesApis:
    - auth-api
```

### Component depending on a resource

```
apiVersion: backstage.io/v1beta1
kind: Component
metadata:
  name: auth-service
spec:
  type: service
  lifecycle: production
  owner: guests
  dependsOn:
    - resource: auth-db
  providesApis:
    - auth-api
---
apiVersion: backstage.io/v1alpha1
kind: Resource
metadata:
  name: auth-db
  description: Stores user details
spec:
  type: database
  owner: user:jdoe
  system: authentication-authorization
```

---

## Systems and Domains

Backstage lets you group components, APIs, and resources into **systems**, and further organize systems into **domains**.

### Linking Entities to a System

```
apiVersion: backstage.io/v1beta1
kind: Component
metadata:
  name: auth-service
spec:
  type: service
  lifecycle: production
  owner: auth-team
  system: authentication-authorization
```

### Defining Systems and Domains

```
apiVersion: backstage.io/v1alpha1
kind: Domain
metadata:
  name: user-management
  description: Everything about user management
spec:
  owner: guests
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

### Domain Hierarchy

Domains can form a hierarchy with `subdomainOf`:

```
apiVersion: backstage.io/v1alpha1
kind: Domain
metadata:
  name: ecommerce
  description: Everything encompassing the ecommerce app
spec:
  owner: guests
---
apiVersion: backstage.io/v1alpha1
kind: Domain
metadata:
  name: user-management
  description: Everything about users
spec:
  owner: guests
  subdomainOf: ecommerce
```

---

## Further Reading & Resources

- [Backstage Entity Relationships](https://backstage.io/docs/features/software-catalog/descriptor-format#relations)
- [Backstage Software Catalog](https://backstage.io/docs/features/software-catalog/what-is-the-backstage-catalog)
- [Backstage Schema Reference](https://backstage.io/docs/apis/techdocs/descriptor-format)

---

<meta name="keywords" content="Backstage, Entity Relationships, Components, APIs, Resources, Systems, Domains, Groups, Users, Software Catalog" />

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/f9244f9d-083a-4acd-a518-549f54b644b5/lesson/f15df75e-bf38-4b11-b8fc-43c0f883e958)**
>
> Watch video content
