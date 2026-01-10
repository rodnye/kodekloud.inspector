# Creating Backstage Instance - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Backstage-Basics/Creating-Backstage-Instance)

---

## Table of Contents

- Creating Backstage Instance
  - Prerequisites
  - 1. Install NVM and Node.js
  - 2. Scaffold Your Backstage App
  - 3. Install Yarn (if missing)
  - 4. Explore the Project Structure
  - 5. Configure Backstage
  - 6. Run in Development Mode
  - 7. Expose Backstage Externally
  - Links and References
  - Watch Video
    - 4.1 Front-end Entry Point
    - 4.2 Back-end Structure

---

## Content

Certified Backstage Associate (CBA)

Backstage Basics

# Creating Backstage Instance

In this guide, you’ll set up your own [Backstage](https://backstage.io/) instance on a remote machine. All terminal sessions shown here run on that server. By the end, you’ll configure Backstage to be reachable via its IP address or a custom domain.

## Prerequisites

Before you begin, ensure you have:

- A remote Linux server (Ubuntu, Debian, etc.)
- SSH access with sudo privileges
- Git installed
- Firewall rules allowing ports 3000 (app) and 7007 (backend)

Backstage is a Node.js application. We recommend using NVM (Node Version Manager) to install and switch Node versions effortlessly.

```
# Quick preview: simple HTTP server example (server.mjs)
import { createServer } from 'node:http';


const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});


server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});
# Run with: node server.mjs
```

![This image shows a GitHub repository page for the Node Version Manager (nvm) project, displaying files, contributors, and language statistics.](https://kodekloud.com/kk-media/image/upload/v1752870020/notes-assets/images/Certified-Backstage-Associate-CBA-Creating-Backstage-Instance/github-repo-node-version-manager.jpg)

> [!important]
> **Note**
>
> Using NVM lets you install multiple Node.js versions side by side and switch between them with `nvm use <version>`.

## 1\. Install NVM and Node.js

1.  Download and install NVM:

    ```
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    source ~/.bashrc
    ```

2.  Install the latest LTS (e.g., v16) and set it as default:

    ```
    nvm install --lts
    nvm alias default lts/*
    ```

3.  Confirm installation:

    ```
    node --version    # e.g., v16.20.2
    npm --version     # bundled npm version
    ```

## 2\. Scaffold Your Backstage App

Follow the Backstage [Getting Started → Introduction](https://backstage.io/docs/getting-started/overview) to generate your project.

```
npx @backstage/create-app@latest
```

You’ll see prompts like:

```
? Enter a name for the app [required] › my-backstage-app
```

![The image shows a webpage from Backstage's documentation, specifically the "Creating your Backstage App" section, with navigation links on the left and content about prerequisites and summary on the right.](https://kodekloud.com/kk-media/image/upload/v1752870022/notes-assets/images/Certified-Backstage-Associate-CBA-Creating-Backstage-Instance/backstage-creating-app-documentation.jpg)

This command creates a `my-backstage-app` directory and installs dependencies with Yarn.

## 3\. Install Yarn (if missing)

If you encounter `yarn: not found`, install Yarn globally:

```
npm install -g yarn
yarn --version    # e.g., 1.22.22
```

Then remove any partial scaffold and retry:

```
rm -rf my-backstage-app
npx @backstage/create-app@latest
```

If you see errors about Node.js ≥18.12.0, switch versions:

```
nvm install 18
nvm use 18
npm install -g yarn
npx @backstage/create-app@latest
```

## 4\. Explore the Project Structure

Navigate into your app and list its contents:

```
cd my-backstage-app
ls
# app-config.yaml  node_modules  package.json  packages  plugins  ...
```

The repository uses Yarn workspaces:

| Directory        | Purpose                      |
| ---------------- | ---------------------------- |
| packages/app     | React front-end application  |
| packages/backend | Node.js back-end services    |
| plugins/\\\*     | Additional Backstage plugins |

```
// package.json (root)
{
  "scripts": {
    "start": "yarn workspace app start",
    "start:backend": "yarn workspace backend start",
    "build:all": "backstage-cli repo build --all",
    "dev": "backstage-cli repo start"
  },
  "workspaces": ["packages/*", "plugins/*"],
  "devDependencies": {
    "@backstage/cli": "^0.29.5",
    "typescript": "~5.4.0"
  }
}
```

![The image shows a Visual Studio Code interface with a file explorer open, displaying various project files and folders. A cursor is hovering over the "package.json" file.](https://kodekloud.com/kk-media/image/upload/v1752870023/notes-assets/images/Certified-Backstage-Associate-CBA-Creating-Backstage-Instance/visual-studio-code-file-explorer.jpg)

### 4.1 Front-end Entry Point

In `packages/app/src/index.tsx`:

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(<App />);
```

The `<div id="root"></div>` is defined in `packages/app/public/index.html`:

```
<div id="root"></div>
```

`App.tsx` initializes the UI:

```
export default app.createRoot(
  <>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <Root>{routes}</Root>
    </AppRouter>
  </>,
);
```

Components and pages live under `packages/app/src/components`.

### 4.2 Back-end Structure

Inside `packages/backend`, you’ll find:

- `src/` – source code for API endpoints
- `Dockerfile` – optional containerization
- `package.json` – runtime dependencies (e.g., `pg`, `better-sqlite3`, Backstage plugins)

## 5\. Configure Backstage

Backstage settings use YAML. Edit `app-config.yaml` (or create `.local.yaml` / `.production.yaml`) to adjust URLs, CORS, and integrations:

```
backend:
  baseUrl: http://0.0.0.0:7007
  listen:
    port: 7007
  cors:
    origin:
      - '*'


techdocs:
  builder: local
  generator:
    runIn: docker
  publisher:
    type: local
```

## 6\. Run in Development Mode

From the project root:

```
yarn dev
```

Expected output:

```
[app]: Project is running at:
[app]:   http://localhost:3000
[backend]: Listening on :7007
```

Open `http://localhost:3000` in your browser.

## 7\. Expose Backstage Externally

On a remote server, `localhost:3000` isn’t reachable directly. Verify the server is running:

```
curl localhost:3000
```

```
<!DOCTYPE html>
<html lang="en">...</html>
```

![The image shows a Visual Studio Code interface with an open HTML file and a terminal at the bottom. The file explorer on the left displays various project files and folders.](https://kodekloud.com/kk-media/image/upload/v1752870024/notes-assets/images/Certified-Backstage-Associate-CBA-Creating-Backstage-Instance/visual-studio-code-html-terminal.jpg)

> [!important]
> **Warning**
>
> Make sure your `app-config.yaml` binds the UI to `0.0.0.0` (or your server's public IP) so external clients can connect.

Additional steps—such as configuring a reverse proxy (Nginx, Apache) or setting up SSL certificates—are covered in [Backstage Deployment Docs](https://backstage.io/docs/deployment).

## Links and References

- [Backstage Official Documentation](https://backstage.io/docs/)
- [NVM GitHub Repository](https://github.com/nvm-sh/nvm)
- [Yarn Package Manager](https://yarnpkg.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/fcbbf923-69c3-4147-bd51-18db2bd18957/lesson/82ca2c42-4741-4886-bac9-1816d7c96071)**
>
> Watch video content
