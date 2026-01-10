# Demo Authentication - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Production-Backstage/Demo-Authentication)

---

## Table of Contents

- Demo Authentication
  - Quick Steps Overview
  - 1. Register a GitHub OAuth App
  - 2. Configure Backstage (app-config.yaml)
  - 3. Install the GitHub Backend Module
  - 4. Update the Frontend Sign-In Page
  - 5. Test and Troubleshoot
  - 6. Import User Entities from GitHub
  - 7. Verify Successful GitHub Login
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

Certified Backstage Associate (CBA)

Production Backstage

# Demo Authentication

Enable GitHub authentication in your Backstage instance so users can sign in with their GitHub accounts and be automatically recognized.

In this guide, you will:

- Register a GitHub OAuth App.
- Configure `app-config.yaml` for GitHub auth.
- Install the GitHub auth-backend module.
- Update the frontend SignInPage.
- Test login and troubleshoot common issues.
- Import GitHub users into the Backstage catalog.

---

## Quick Steps Overview

| Step                              | Description                                                              |
| --------------------------------- | ------------------------------------------------------------------------ |
| 1\\. Register OAuth App           | Create a GitHub OAuth App for Backstage                                  |
| 2\\. Configure `app-config.yaml`  | Add GitHub provider under `auth`                                         |
| 3\\. Install Backend Module       | Add and register `@backstage/plugin-auth-backend-module-github-provider` |
| 4\\. Update Frontend Sign-In Page | Add GitHub button on your SignInPage                                     |
| 5\\. Test & Troubleshoot          | Verify login flow and fix configuration errors                           |
| 6\\. Import User Entities         | Sync your GitHub org users into the catalog                              |
| 7\\. Verify Successful Login      | Confirm you can sign in as a GitHub user                                 |

---

## 1\. Register a GitHub OAuth App

Follow the official [Backstage GitHub Auth docs](https://backstage.io/docs/auth/github-auth) to set up your OAuth application.

![The image shows a webpage from Backstage documentation, detailing how to set up authentication using GitHub. It includes instructions and a form for registering a new OAuth application.](https://kodekloud.com/kk-media/image/upload/v1752870167/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Authentication/backstage-authentication-github-setup.jpg)

Scroll to the **GitHub OAuth** section:

![The image shows a webpage from Backstage documentation about setting up authentication using GitHub OAuth. It includes instructions and a form for registering a new OAuth application.](https://kodekloud.com/kk-media/image/upload/v1752870169/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Authentication/backstage-github-oauth-authentication.jpg)

1.  In GitHub, go to **Settings → Developer settings → OAuth Apps**.
2.  Click **New OAuth App**.
3.  Fill in the form:
    - **Application name**: `Backstage Auth`
    - **Homepage URL**: `http://<BACKSTAGE_HOST>:3000`
    - **Authorization callback URL**:  
      `http://<BACKSTAGE_HOST>:7007/api/auth/github/handler/frame`

![The image shows a GitHub Developer Settings page for an application named "backstage," displaying details like the owner, client ID, and client secrets. There are options to transfer ownership, list the application in the marketplace, and manage user tokens.](https://kodekloud.com/kk-media/image/upload/v1752870169/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Authentication/github-developer-settings-backstage.jpg)

4.  Register the app, copy the **Client ID**, and generate a **Client Secret**:

![The image shows a GitHub page for registering a new OAuth application, with fields for application name, homepage URL, application description, and authorization callback URL. There is also an option to enable Device Flow and buttons to register the application or cancel.](https://kodekloud.com/kk-media/image/upload/v1752870170/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Authentication/github-oauth-application-registration.jpg)

![The image shows a GitHub application settings page displaying a client ID and client secret management section, with options to generate a new client secret and upload an application logo.](https://kodekloud.com/kk-media/image/upload/v1752870171/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Authentication/github-app-settings-client-id-secret.jpg)

---

## 2\. Configure Backstage (`app-config.yaml`)

Enable GitHub under the `auth` section of your `app-config.yaml`:

```
auth:
  environment: development         # Replace with your environment key
  providers:
    guest: {}
    github:
      development:
        clientId: YOUR_CLIENT_ID
        clientSecret: YOUR_CLIENT_SECRET
        signIn:
          resolvers:
            - resolver: usernameMatchingUserEntityName
```

> [!important]
> **Note**
>
> Ensure that the `environment` value matches the top-level key under `providers:`. If they don't match, the GitHub provider won’t be found.

This setup uses the `usernameMatchingUserEntityName` resolver to match GitHub usernames to Backstage user entities.

---

## 3\. Install the GitHub Backend Module

Install the GitHub auth backend package:

```
yarn --cwd packages/backend add @backstage/plugin-auth-backend-module-github-provider
```

Then register it in `packages/backend/src/index.ts`:

```
import { createRouter } from '@backstage/plugin-auth-backend';
import githubProviderModule from '@backstage/plugin-auth-backend-module-github-provider';
import guestProviderModule from '@backstage/plugin-auth-backend-module-guest-provider';

// ...

backend.add(
  createRouter({
    // other config...
    providers: {
      github: githubProviderModule(),
      guest: guestProviderModule(),
    },
  }),
);
```

---

## 4\. Update the Frontend Sign-In Page

In `packages/app/src/app.tsx`, import `githubAuthApiRef` and add a GitHub button to `SignInPage`:

```
import { createApp } from '@backstage/app-defaults';
import { SignInPage } from '@backstage/core-components';
import { githubAuthApiRef } from '@backstage/core-plugin-api';

const app = createApp({
  components: {
    SignInPage: props => (
      <SignInPage
        {...props}
        auto
        provider={{
          id: 'github',
          title: 'GitHub',
          message: 'Sign in using GitHub',
          apiRef: githubAuthApiRef,
        }}
      />
    ),
  },
  // other app config...
});
```

---

## 5\. Test and Troubleshoot

Clear your browser cookies for the Backstage domain and reload. You should see:

- **Enter as guest**
- **Sign in using GitHub**

> [!important]
> **Warning**
>
> If you see an error like **GitHub provider is not configured to support sign-in**, double-check your `app-config.yaml` for missing `environment` or `providers` entries.

![The image shows a login page for a "Scaffolded Backstage App" with options to enter as a guest or sign in using GitHub. There's an error message indicating that the GitHub provider is not configured to support sign-in.](https://kodekloud.com/kk-media/image/upload/v1752870172/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Authentication/scaffolded-backstage-app-login-error.jpg)

---

## 6\. Import User Entities from GitHub

If you sign in and see:

```
Error: failed to sign in; unable to resolve user identity;
please verify that your catalog contains the expected user entities
that would match your configured sign-in resolver.
```

Then enable the GitHub org provider to sync users and teams:

```
catalog:
  providers:
    githubOrg:
      - id: github
        githubUrl: https://github.com
        orgs: ['shopping-hub']
        schedule:
          initialDelay:
            seconds: 30
          frequency:
            hours: 1
          timeout:
            minutes: 50
```

Restart Backstage, clear cookies again, and sign in. All members of `shopping-hub` will be imported into your catalog.

![The image shows a user interface for "My Company Catalog" with a list of users, including "guest," "Jenny Doe," and another user. There are options for filtering and actions like editing or starring users.](https://kodekloud.com/kk-media/image/upload/v1752870174/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Authentication/my-company-catalog-user-interface.jpg)

---

## 7\. Verify Successful GitHub Login

Once your GitHub username matches a catalog user entity, login will succeed and you'll be signed in as that user.

![The image shows a GitHub Developer Settings page for an application named "backstage-auth," displaying details like the owner, client ID, and client secrets. A dropdown menu is open on the right, showing user profile options.](https://kodekloud.com/kk-media/image/upload/v1752870175/notes-assets/images/Certified-Backstage-Associate-CBA-Demo-Authentication/github-developer-settings-backstage-auth.jpg)

Congratulations—GitHub authentication is now fully integrated into your Backstage instance!

---

## Links and References

- [Backstage GitHub Auth Guide](https://backstage.io/docs/auth/github-auth)
- [Backstage Plugin Auth Backend](https://backstage.io/docs/plugins/auth-backend)
- [GitHub OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Backstage Catalog Providers](https://backstage.io/docs/features/software-catalog/providers-overview)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/d82fc857-4b5c-42a7-ab46-3772f749a741/lesson/4f04b6c3-8db2-41b9-95b1-c073d12298e2)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/d82fc857-4b5c-42a7-ab46-3772f749a741/lesson/12c3e3e6-cee7-4e60-a3fc-67e323f12a35)**
>
> Practice lab
