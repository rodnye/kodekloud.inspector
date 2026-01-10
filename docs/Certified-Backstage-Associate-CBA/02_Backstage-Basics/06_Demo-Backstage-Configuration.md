# Demo Backstage Configuration - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Backstage-Basics/Demo-Backstage-Configuration)

---

## Table of Contents

- Demo Backstage Configuration
  - Prerequisites
  - 1. Start the Development Server
  - 2. Configure Frontend baseUrl
  - 3. Configure Backend baseUrl, listen, CORS & CSP
  - 4. Restart the Server
  - 5. Use app-config.local.yaml for Local Overrides
  - Links and References
  - Watch Video
    - Verify Overrides

---

## Content

Certified Backstage Associate (CBA)

Backstage Basics

# Demo Backstage Configuration

In this guide, you’ll learn how to manage Backstage configuration using `app-config.yaml` and `app-config.local.yaml`. We’ll cover:

- Starting the development server
- Binding Frontend and Backend to specific hosts
- Setting up CORS and CSP rules
- Using local overrides for environment-specific settings

This ensures your Backstage instance runs correctly on both `localhost` and external IPs.

---

## Prerequisites

- Node.js & Yarn installed
- A cloned Backstage project
- Basic familiarity with YAML configuration

---

## 1\. Start the Development Server

Run the following command in your project root:

```
yarn dev
```

Sample output:

```
Loaded config from app-config.yaml
fatal: not a git repository (or any of the parent directories): .git
NOTE: Did not compute git version or commit hash
[webpack-dev-server] Project is running at:
[webpack-dev-server] Loopback: http://localhost:3000/, http://[::1]:3000/
[backend]: Loading config from MergedConfigSource(
  FileConfigSource{path="/root/demo/backstage/app-config.yaml"},
  FileConfigSource{path="/root/demo/backstage/app-config.local.yaml"},
  EnvConfigSource{count=0}
)
[backend]: 2025-02-13T00:04:45.136Z backstage info rootHttpRouter info Listening on :7007
[backend]: 2025-02-13T00:04:45.367Z search warn Postgres search engine is not supported
[backend]: 2025-02-13T00:04:45.932Z auth info Configuring "database" as KeyStore
```

By default:

| Component | URL or Port           |
| --------- | --------------------- |
| Frontend  | http://localhost:3000 |
| Backend   | http://localhost:7007 |

Accessing `http://localhost:3000` should work immediately, while external IPs (e.g. `http://147.182.170.10:3000`) will be refused until we update the config.

---

## 2\. Configure Frontend `baseUrl`

Open `app-config.yaml` and locate the `app` section:

```
app:
  title: Scaffolded Backstage App
  baseUrl: http://localhost:3000


organization:
  name: My Company


backend:
  # See https://backstage.io/docs/auth/service-to-service-auth
  # auth:
  #   keys:
  #     - secret: ${BACKEND_SECRET}
  baseUrl: http://localhost:7007
  listen:
    port: 7007
    # host: 127.0.0.1
```

Update `app.baseUrl` to your server’s external IP:

```
app:
  baseUrl: http://147.182.170.10:3000
```

> [!important]
> **Note**
>
> Changing `app.baseUrl` ensures the frontend assets and JS bundles point to the correct host.

---

## 3\. Configure Backend `baseUrl`, `listen`, CORS & CSP

Still in `app-config.yaml`, adjust the backend and security settings:

```
backend:
  baseUrl: http://147.182.170.10:7007
  listen:
    port: 7007
    # host: 0.0.0.0


csp:
  connect-src: ["'self'", "http:", "https:"]


cors:
  origin:
    - http://147.182.170.10:3000
```

Key points:

- **backend.baseUrl** must match your external IP and port so clients can reach the API.
- **listen.host** can be omitted to bind all interfaces, or set to `0.0.0.0`.
- **cors.origin** should list each allowed frontend origin.

> [!important]
> **Warning**
>
> Binding to `0.0.0.0` exposes your service to all network interfaces. Ensure your firewall rules are configured correctly.

---

## 4\. Restart the Server

After saving changes, restart:

```
Ctrl+C
yarn dev
```

Now `http://147.182.170.10:3000` and `http://147.182.170.10:7007` should both be accessible.

---

## 5\. Use `app-config.local.yaml` for Local Overrides

Rather than modifying `app-config.yaml` directly, you can place environment-specific overrides in `app-config.local.yaml`:

```
app:
  baseUrl: http://147.182.170.10:3000


backend:
  baseUrl: http://147.182.170.10:7007


cors:
  origin:
    - http://147.182.170.10:3000
```

Revert your `app-config.yaml` to the defaults:

```
app:
  baseUrl: http://localhost:3000


backend:
  baseUrl: http://localhost:7007
```

Backstage automatically merges these files in development, giving `app-config.local.yaml` higher precedence.

### Verify Overrides

Restart again:

```
Ctrl+C
yarn dev
```

Despite the defaults in `app-config.yaml`, the local overrides in `app-config.local.yaml` will take effect, and your external IP remains reachable.

---

## Links and References

- [Backstage Configuration Documentation](https://backstage.io/docs/configuration/overview)
- [Service-to-Service Auth in Backstage](https://backstage.io/docs/auth/service-to-service-auth)
- [Yarn Official Site](https://yarnpkg.com/)

---

You’ve successfully configured Backstage to bind to different hosts and enabled local overrides for flexible development environments.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/fcbbf923-69c3-4147-bd51-18db2bd18957/lesson/2093a42d-0510-427e-b3c3-2f1e3c932bd4)**
>
> Watch video content
