# Integrations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Backstage-Associate-CBA/Catalog/Integrations)

---

## Table of Contents

- Integrations
  - 1. Loading Entities from Source Control
  - 2. Dynamic Discovery with Entity Providers
  - 3. Loading Organizational Data
  - Links and References
  - Watch Video

---

## Content

Certified Backstage Associate (CBA)

Catalog

# Integrations

Backstage integrations enable you to publish data to or fetch data from third-party services—such as GitHub, GitLab, S3 buckets, and LDAP—automating workflows and centralizing metadata across your toolchain.

Below is an overview of common Backstage integrations:

| Integration Type | Primary Use Case                     | Configuration Example                        |
| ---------------- | ------------------------------------ | -------------------------------------------- |
| GitHub           | Load component entities from repos   | `integrations.github.token: ${GITHUB_TOKEN}` |
| S3 Bucket        | Scan buckets for entity definitions  | Custom Entity Provider setup                 |
| GitLab           | Ingest entities from GitLab projects | `integrations.gitlab.token: ${GITLAB_TOKEN}` |
| LDAP             | Sync users, teams, and groups        | `integrations.ldap.serverUrl: ldap://...`    |

![The image is a diagram showing integrations between Backstage and various services like GitHub, GitLab, S3 Bucket, and LDAP, with an integration component in the center.](https://kodekloud.com/kk-media/image/upload/v1752870103/notes-assets/images/Certified-Backstage-Associate-CBA-Integrations/backstage-integrations-diagram.jpg)

## 1\. Loading Entities from Source Control

Backstage treats each component definition and metadata file—referred to as an “entity”—as code. It reads these `Entity.yaml` files directly from your Git repositories. Public GitHub repositories work out of the box, but private repos require authentication:

```
integrations:
  github:
    - host: github.com
      token: ${GITHUB_TOKEN}
```

With this token configured, Backstage can pull `Entity.yaml` or any other catalog files from private GitHub repositories and ingest them into your service catalog.

> [!important]
> **Warning**
>
> Be sure to store your `${GITHUB_TOKEN}` securely (for example, in your CI/CD secret store) and grant it only the minimum scopes needed (typically `repo` and `read:org`).

![The image illustrates an integration process for loading entities, showing a connection between Backstage and a public GitHub repository using an "Entity.yaml" file.](https://kodekloud.com/kk-media/image/upload/v1752870104/notes-assets/images/Certified-Backstage-Associate-CBA-Integrations/backstage-github-entity-integration.jpg)

## 2\. Dynamic Discovery with Entity Providers

Maintaining a manual list of every repository is error-prone at scale. Entity Providers automate this process by scanning entire GitHub organizations or S3 buckets for entity definitions (e.g., `Entity.yaml`). When new files appear, Backstage ingests them automatically, ensuring your catalog remains up to date with minimal maintenance.

> [!important]
> **Note**
>
> Entity Providers support multiple backends. Besides GitHub and S3, you can implement custom providers to scan cloud storage, file shares, or other APIs.

![The image illustrates a diagram of integrations for dynamic discovery with entity providers, showing YAML files and folders connected to Backstage, with icons representing GitHub and a storage bucket.](https://kodekloud.com/kk-media/image/upload/v1752870105/notes-assets/images/Certified-Backstage-Associate-CBA-Integrations/dynamic-discovery-integrations-diagram.jpg)

## 3\. Loading Organizational Data

To synchronize users, teams, and groups, Backstage integrates with external identity systems. For instance, the GitHub Organizations integration fetches members and team structures automatically. You can also connect to LDAP servers, Auth0, or custom HR systems to keep your Backstage catalog aligned with your company directory.

![The image illustrates an integration between Backstage and GitHub, focusing on organizational data such as organization, users, and groups.](https://kodekloud.com/kk-media/image/upload/v1752870106/notes-assets/images/Certified-Backstage-Associate-CBA-Integrations/backstage-github-integration-organization-data.jpg)

---

Backstage also supports a wide range of additional integrations—GitLab, Bitbucket, cloud storage providers, and more—so you can centralize metadata, entity definitions, and organizational information all in one developer portal.

## Links and References

- [Backstage Integrations Overview](https://backstage.io/docs/integrations)
- [GitHub Integration Docs](https://backstage.io/docs/integrations/github/)
- [S3 Entity Provider](https://backstage.io/docs/features/software-catalog/providers/aws-s3)
- [LDAP Integration Guide](https://backstage.io/docs/auth/ldap)
- [Backstage Entity Providers](https://backstage.io/docs/features/software-catalog/providers/overview)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-backstage-associate-cba/module/f9244f9d-083a-4acd-a518-549f54b644b5/lesson/1c0e64e1-1639-40d9-9077-220ae6657e76)**
>
> Watch video content
