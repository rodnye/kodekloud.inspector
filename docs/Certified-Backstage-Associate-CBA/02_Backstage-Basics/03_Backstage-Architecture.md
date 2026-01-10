# Backstage Architecture - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Backstage-Basics/Backstage-Architecture)

---

## Table of Contents

- Backstage Architecture
  - Typical Web Architecture
  - Backstage Core Architecture
  - Plugin-Based Extension
  - Plugin URLs and Navigation
  - Monorepo Structure
  - Frontend with React
  - Design System with Material-UI
  - Summary
  - Links and References
  - Watch Video

---

## Content

Certified Backstage Associate (CBA)

Backstage Basics

# Backstage Architecture

In this guide, we’ll walk through Backstage’s architecture by comparing it to a typical web application. You’ll learn how Backstage’s frontend, backend, and plugin system interconnect to form a unified developer portal.

## Typical Web Architecture

A standard web application consists of two main parts:

- **Frontend**: Runs in the browser, handling UI rendering and user interactions.
- **Backend**: Exposes REST APIs, implements business logic, and communicates with a database.

When the browser needs data, it issues an HTTP request:

```
GET http://backend-url/products
```

The flow looks like this:

1.  Browser requests `/products`.
2.  API server queries the database.
3.  Database returns product data.
4.  API responds with JSON.
5.  Frontend displays the product list.

![The image illustrates how websites work, showing the interaction between the frontend and backend, including a browser, API, and database.](https://kodekloud.com/kk-media/image/upload/v1752870000/notes-assets/images/Certified-Backstage-Associate-CBA-Backstage-Architecture/websites-work-frontend-backend-diagram.jpg)

## Backstage Core Architecture

Backstage follows the same front end/back end pattern:

1.  Frontend sends:

    ```
    GET http://<backstage-backend>/catalog
    ```

2.  Backend plugin queries the storage (database).
3.  Database returns catalog entries.
4.  Backend responds with JSON.
5.  Frontend renders the catalog in the browser.

![The image illustrates the Backstage architecture, showing a frontend and backend setup with a catalog plugin and a database connection.](https://kodekloud.com/kk-media/image/upload/v1752870001/notes-assets/images/Certified-Backstage-Associate-CBA-Backstage-Architecture/backstage-architecture-frontend-backend.jpg)

## Plugin-Based Extension

Every feature in Backstage is implemented as a plugin. A plugin can include:

| Component          | Responsibility                           | Example                                 |
| ------------------ | ---------------------------------------- | --------------------------------------- |
| Frontend           | React components for UI                  | Catalog page, Entity details view       |
| Backend (optional) | API routes, business logic, data fetches | GitLab API integration, caching service |

For the Catalog plugin:

1.  Frontend requests `/catalog`.
2.  Backend plugin queries its database.
3.  Storage returns catalog entries.
4.  Backend sends JSON response.
5.  Frontend displays the catalog.

A GitLab plugin’s backend, by contrast, would fetch data from GitLab’s REST API instead of a local database.

![The image illustrates the Backstage architecture, showing a separation between frontend and backend components, each with Catalog, GitLab, and Kubernetes plugins, and a database on the backend.](https://kodekloud.com/kk-media/image/upload/v1752870002/notes-assets/images/Certified-Backstage-Associate-CBA-Backstage-Architecture/backstage-architecture-frontend-backend-2.jpg)

## Plugin URLs and Navigation

Backstage stitches all plugins into one React-based UI. Each plugin is mapped to its own route:

| Path          | Plugin           | Description                             |
| ------------- | ---------------- | --------------------------------------- |
| `/catalog`    | Catalog          | Browse and manage software entities     |
| `/lighthouse` | Lighthouse audit | Run and view website performance audits |

Visiting `/lighthouse` in the browser loads the Lighthouse audit plugin’s interface.

![The image shows a screenshot of a "Backstage Architecture" interface with a "Lighthouse" audit section, displaying website audit details. It also includes two URLs related to Backstage services.](https://kodekloud.com/kk-media/image/upload/v1752870004/notes-assets/images/Certified-Backstage-Associate-CBA-Backstage-Architecture/backstage-architecture-lighthouse-audit.jpg)

## Monorepo Structure

A new Backstage project uses a monorepo with two main folders:

- `packages/app`: Frontend application (React).
- `packages/backend`: Backend service (Node.js).

You can develop, test, and deploy each part independently.

> [!important]
> **Note**
>
> Keeping both frontend and backend in a single repository simplifies local development and ensures consistent versioning.

![The image shows a directory structure labeled "Backstage Architecture," highlighting the "app" and "backend" folders as frontend and backend components, respectively.](https://kodekloud.com/kk-media/image/upload/v1752870005/notes-assets/images/Certified-Backstage-Associate-CBA-Backstage-Architecture/backstage-architecture-directory-structure.jpg)

## Frontend with React

Backstage’s UI is built on [React](https://reactjs.org), allowing you to compose reusable components that bundle HTML, CSS, and JavaScript.

Example of a simple button component:

```
import React from 'react';


export const Button = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };


  return (
    <div>
      <h1>Don't Click The Button!!!</h1>
      <button onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
};
```

Components can be composed into larger UIs:

```
import React from 'react';
import { Button } from './Button';


export const MyForm = () => (
  <div>
    <input id="login" type="text" />
    <input id="password" type="password" />
    <Button />
  </div>
);
```

## Design System with Material-UI

To ensure consistent styling and accessibility, Backstage uses [Material-UI (MUI)](https://mui.com/). MUI offers a suite of pre-styled React components—buttons, cards, tables, menus—that adhere to Material Design guidelines.

![The image showcases Material UI (MUI), highlighting its logo and a description of its pre-styled React components like buttons, cards, and tables.](https://kodekloud.com/kk-media/image/upload/v1752870006/notes-assets/images/Certified-Backstage-Associate-CBA-Backstage-Architecture/material-ui-logo-react-components.jpg)

## Summary

- Backstage features are implemented as modular plugins (frontend + optional backend).
- The project is organized as a monorepo with `app` and `backend` packages.
- The frontend leverages React and Material-UI for a consistent, component-driven UI.

![The image is a summary slide with three points: plugins can have a frontend and backend, Backstage is set up as a monorepo, and it uses Material UI for the design system.](https://kodekloud.com/kk-media/image/upload/v1752870007/notes-assets/images/Certified-Backstage-Associate-CBA-Backstage-Architecture/backstage-plugins-monorepo-material-ui.jpg)

## Links and References

- [Backstage Documentation](https://backstage.io/docs/)
- [Backstage Plugin Development](https://backstage.io/docs/plugins/overview)
- [React Official Site](https://reactjs.org/)
- [Material-UI Documentation](https://mui.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/fcbbf923-69c3-4147-bd51-18db2bd18957/lesson/eb3ecd35-b1f4-4a92-ba1d-98d952e6c268)**
>
> Watch video content
