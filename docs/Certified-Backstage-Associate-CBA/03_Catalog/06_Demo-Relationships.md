# Demo Relationships - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Catalog/Demo-Relationships)

---

## Table of Contents

- Demo Relationships
  - Entity Types Overview
  - 1. Create a Component
  - 2. Import the Component
  - 3. Create a Group
  - 4. Assign Group Ownership
  - 5. Explore a URL Entity
  - 6. Create a User
  - 7. Add a Dependent Component
  - 8. Define a System
  - 9. Define a Domain
  - 10. Define a Resource
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Certified Backstage Associate (CBA)

Catalog

# Demo Relationships

Explore how to model and link key Backstage entity types—Component, Group, User, System, Domain, and Resource—by defining relationships among them in your catalog.

**In this tutorial you will:**

- Create and register a Component in Backstage
- Group components under a team entity
- Assign owners at both group and user levels
- Build dependency graphs with System, Domain, and Resource entities

---

## Entity Types Overview

| Entity Type | Purpose                                               | Example Snippet   |
| ----------- | ----------------------------------------------------- | ----------------- |
| Component   | Deployable software (website, service, library, etc.) | `kind: Component` |
| Group       | A team or collection of users/components              | `kind: Group`     |
| User        | Individual account with membership metadata           | `kind: User`      |
| System      | Logical collection of components                      | `kind: System`    |
| Domain      | Business area grouping systems and components         | `kind: Domain`    |
| Resource    | Infrastructure backing a system (database, bucket)    | `kind: Resource`  |

---

## 1\. Create a Component

Define a simple e-commerce Component named **shopping-cart**. Save this YAML in `entity.yaml` (or anywhere in your catalog):

```
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: shopping-cart
spec:
  type: website
  lifecycle: production
  owner: guests
```

Commit and push:

```
git add entity.yaml
git commit -m "Add shopping-cart component"
git push origin main
```

---

## 2\. Import the Component

1.  In Backstage, navigate to **Home → Create → Register Existing Component**.
2.  Enter the GitHub URL pointing to your `entity.yaml` and click **Analyze**.

![The image shows a web interface for creating a new software component using standard templates, specifically highlighting an "Example Node.js Template." The interface includes options for personal and company templates, categories, and owner selection.](https://kodekloud.com/kk-media/image/upload/v1752870083/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Relationships/web-interface-software-component-template.jpg)

> [!important]
> **Warning**
>
> If you see an error like:
>
> ```
> {
> "name": "InputError",
> "message": "No processor recognized the entity component:default/shopping-cart..."
> }
> ```
>
> it often means an `apiVersion` typo. Correct `backstag.io` to `backstage.io`, push again, then wait a minute before re-analyzing.

Once **Analyze** succeeds, click **Import** to register your Component.

---

## 3\. Create a Group

Backstage YAML supports multiple documents per file. Extend `entity.yaml` to add an **ecommerce** Group:

```
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: shopping-cart
spec:
  type: website
  lifecycle: production
  owner: guests
---
apiVersion: backstage.io/v1alpha1
kind: Group
metadata:
  name: ecommerce
spec:
  type: team
  children: []
```

Commit and push:

```
git add entity.yaml
git commit -m "Add ecommerce group"
git push origin main
```

> [!important]
> **Note**
>
> After pushing, go to **Catalog → Locations**, remove the previous location, and re-register it. This forces Backstage to refresh your entities.

![The image shows a user interface of a "My Company Catalog" with a list of groups, specifically displaying a group named "guests" categorized as a team. There are options for filtering and searching on the left sidebar.](https://kodekloud.com/kk-media/image/upload/v1752870085/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Relationships/my-company-catalog-guests-team-ui.jpg)

![The image shows a dashboard from "My Company Catalog" in Backstage, displaying a list of locations with details such as name, type, and targets. The interface includes options for filtering and managing these locations.](https://kodekloud.com/kk-media/image/upload/v1752870086/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Relationships/my-company-catalog-backstage-dashboard.jpg)

---

## 4\. Assign Group Ownership

Once the catalog updates, open **shopping-cart** in Backstage to confirm its owner is `guests`. Then verify the new **ecommerce** group appears under **Owner**.

![The image shows a web interface for registering an existing component in a Scaffolded Backstage App, with steps completed and entities added to a catalog from a GitHub repository.](https://kodekloud.com/kk-media/image/upload/v1752870087/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Relationships/backstage-app-register-component-interface.jpg)

![The image shows a dashboard interface for a component named "shopping-cart" in a system called Backstage. It includes details like owner, lifecycle, and relations, with a graph showing the relationship between "guests" and "shopping-cart."](https://kodekloud.com/kk-media/image/upload/v1752870088/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Relationships/backstage-shopping-cart-dashboard.jpg)

---

## 5\. Explore a URL Entity

Backstage can register non-code resources too. Here’s a URL entity example:

![The image shows a screenshot of a web application interface, specifically a page from Backstage, displaying details about a URL entity with no description or owner. It includes sections for viewing source, tech docs, and related links.](https://kodekloud.com/kk-media/image/upload/v1752870089/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Relationships/backstage-url-entity-interface-screenshot.jpg)

---

## 6\. Create a User

Append a **User** entry (e.g., `john`) to `entity.yaml`:

```
---
apiVersion: backstage.io/v1alpha1
kind: User
metadata:
  name: john
spec:
  memberOf: [ecommerce]
```

Commit, push, then re-register the location. If you encounter a **NotAllowedError** for `User`, update your `app-config.yaml`:

```
catalog:
  import:
    rules:
      - allow: [Component, System, API, Resource, Location, Group, User]
```

Restart your dev server (`yarn dev`), then re-import.

![The image shows a webpage from the Backstage app, where a user is in the process of registering an existing component by importing entities from a GitHub repository.](https://kodekloud.com/kk-media/image/upload/v1752870090/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Relationships/backstage-app-registering-component.jpg)

Finally, edit **shopping-cart** to change its owner:

```
spec:
  owner: user:john
```

---

## 7\. Add a Dependent Component

Define a second Component **inventory** and declare that **shopping-cart** depends on it:

```
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: inventory
spec:
  type: service
  lifecycle: production
  owner: ecommerce
---
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: shopping-cart
spec:
  dependsOn:
    - component: inventory
  type: website
  lifecycle: production
  owner: user:john
```

Commit, push, re-register, and view the updated dependency graph.

---

## 8\. Define a System

Group **shopping-cart** and **inventory** under a **purchasing** System:

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
# (Component entries with `spec.system: purchasing`)
```

Commit & push. In **Systems** view, you’ll see both components under **purchasing**.

---

## 9\. Define a Domain

Create a **shopping-app** Domain to group related systems:

```
apiVersion: backstage.io/v1alpha1
kind: Domain
metadata:
  name: shopping-app
  description: Handles everything in the e-commerce portion of the business
spec:
  owner: ecommerce
---
# (System & Component entries)
```

Enable **Domain** in your import rules, restart (`yarn dev`), and re-register:

![The image shows a software interface for "My Company Catalog" with a list of components, including their system, owner, type, and lifecycle. A dropdown menu is open, displaying options like API, Component, Domain, and more.](https://kodekloud.com/kk-media/image/upload/v1752870091/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Relationships/my-company-catalog-interface.jpg)

Click **shopping-app** to inspect its overview and relationship graph:

![The image shows a Backstage interface with an overview of a shopping app, including its description, owner, and related systems. A relationship graph on the right illustrates connections between "ecommerce," "shopping-app," and "purchasing."](https://kodekloud.com/kk-media/image/upload/v1752870092/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Relationships/backstage-shopping-app-overview-graph.jpg)

---

## 10\. Define a Resource

Model a **Resource** (e.g., an inventory database) and link it to your System:

```
apiVersion: backstage.io/v1alpha1
kind: Resource
metadata:
  name: inventory-db
  description: Stores inventory details
spec:
  type: database
  owner: ecommerce
  system: purchasing
---
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: inventory
spec:
  dependsOn:
    - resource: inventory-db
  type: service
  lifecycle: production
  owner: ecommerce
  system: purchasing
```

Commit, push, re-register. The **inventory** component will now show a dependency on **inventory-db**:

![The image shows a dashboard interface from Backstage, displaying an overview of an "inventory" component with details like owner, system, and lifecycle, alongside a relations graph illustrating dependencies and ownership.](https://kodekloud.com/kk-media/image/upload/v1752870093/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Relationships/backstage-inventory-dashboard-overview.jpg)

---

Congratulations! You’ve successfully created and linked Component, Group, User, System, Domain, and Resource entities in Backstage, complete with ownership and dependency mappings.

## Links and References

- [Backstage Documentation](https://backstage.io/docs/)
- [Backstage Catalog Concepts](https://backstage.io/docs/features/software-catalog/what-is-software-catalog)
- [Backstage Entity Reference](https://backstage.io/docs/features/software-catalog/descriptor-format)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/f9244f9d-083a-4acd-a518-549f54b644b5/lesson/9d4c3f12-387c-4851-b681-c49ad9bc636e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/f9244f9d-083a-4acd-a518-549f54b644b5/lesson/1dbf42bd-8fab-446b-91f1-dcea0ff429f7)**
>
> Practice lab
