# Authentication - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Production-Backstage/Authentication)

---

## Table of Contents

- Authentication
  - Default Guest Access
  - Supported Identity Providers
  - Authentication Workflow Overview
  - Defining a Matching User Entity
  - Automating User Import
  - Links and References
  - Watch Video

---

## Content

Certified Backstage Associate (CBA)

Production Backstage

# Authentication

In this lesson, you’ll learn how to secure your Backstage instance by integrating with external identity providers. By default, Backstage allows guest access, but you can restrict sign-in to authorized users only.

## Default Guest Access

> [!important]
> **Warning**
>
> Out of the box, Backstage permits anyone to sign in as a guest. To prevent unauthorized access, configure an external identity provider before deploying to production.

## Supported Identity Providers

Backstage natively supports multiple OAuth and SAML providers. After configuration, users will see additional **Sign in** buttons on the login page.

| Identity Provider | Protocol  | Documentation                                                                                        |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------- |
| GitHub            | OAuth 2.0 | [GitHub Setup](https://github.com/backstage/backstage/tree/master/packages/backend/src/plugins/auth) |
| Auth0             | OAuth 2.0 | [Auth0 Plugin](https://github.com/backstage/backstage/tree/master/plugins/auth-backend)              |
| Google            | OAuth 2.0 | [Google Auth](https://developers.google.com/identity)                                                |
| OneLogin          | SAML      | [OneLogin SAML](https://developers.onelogin.com/)                                                    |

## Authentication Workflow Overview

Below is a high-level OAuth 2.0 flow using GitHub as an example:

1.  The user is already logged into GitHub (e.g., **john**) in their browser.
2.  They visit Backstage and click **Sign in with GitHub**.
3.  Backstage requests the GitHub username and receives **john**.
4.  Backstage checks its catalog for a `User` entity named **john**.
5.  If found, the login succeeds; otherwise, it fails.

![The image shows a computer screen displaying a GitHub login interface with fields for a username or email address and password. It includes options for password recovery and account creation.](https://kodekloud.com/kk-media/image/upload/v1752870165/notes-assets/images/Certified-Backstage-Associate-CBA-Authentication/github-login-interface-screen.jpg)

When no matching entity exists, you’ll encounter:

```
Error: login failed, no user named john
```

## Defining a Matching User Entity

To allow **john** to authenticate, add a `User` entity in your catalog with matching metadata:

```
apiVersion: backstage.io/v1alpha1
kind: User
metadata:
  name: john
spec:
  profile:
    displayName: John Doe
    email: john@example.com
    memberOf:
      - team-b
      - employees
```

> [!important]
> **Note**
>
> Ensure the `metadata.name` exactly matches the username returned by your OAuth provider.

Once imported, **john** can sign in with GitHub without errors.

## Automating User Import

Maintaining user entities by hand doesn’t scale. Backstage can synchronize users from:

- GitHub organizations
- LDAP directories
- Enterprise identity platforms (Okta, Azure AD)

![The image illustrates user integration between two systems, represented by icons and user names, with a gear symbol in the center indicating the connection.](https://kodekloud.com/kk-media/image/upload/v1752870166/notes-assets/images/Certified-Backstage-Associate-CBA-Authentication/user-integration-systems-gear-icon.jpg)

Automated import ensures that your catalog always includes up-to-date user entries before any login attempts occur.

## Links and References

- [Backstage Authentication Docs](https://backstage.io/docs/auth/about)
- [OAuth 2.0 Guide](https://oauth.net/2/)
- [GitHub OAuth Apps](https://docs.github.com/apps/building-oauth-apps)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/d82fc857-4b5c-42a7-ab46-3772f749a741/lesson/2dd37cf6-a29b-403c-886f-5aa1804d4295)**
>
> Watch video content
