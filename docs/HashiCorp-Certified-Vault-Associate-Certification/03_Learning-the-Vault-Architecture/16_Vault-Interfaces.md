# Vault Interfaces - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Learning-the-Vault-Architecture/Vault-Interfaces)

---

## Table of Contents

- Vault Interfaces
  - Vault Interfaces and Their Users
  - Learning Objectives
  - References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Learning the Vault Architecture

# Vault Interfaces

Vault offers three primary interfaces for interacting with secrets and configurations: the web-based UI, the Command-Line Interface (CLI), and the HTTP API. Each interface targets different use cases, from human operators to fully automated applications.

![The image is a slide titled "Vault Interfaces," explaining the three interfaces to interact with Vault: UI, CLI, and HTTP API, and highlighting key points about their usage and requirements.](https://kodekloud.com/kk-media/image/upload/v1752878239/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Vault-Interfaces/vault-interfaces-ui-cli-http-api.jpg)

The relationship between these interfaces is straightforward:

- The **UI** provides a user-friendly dashboard for visual secret management.
- The **CLI** is a thin wrapper over the HTTP API, supporting almost every Vault operation.
- The **HTTP API** is the underlying mechanism for both the UI and CLI, so every action—even in the UI—translates to an API request.

When you initialize and start a Vault server, the CLI and HTTP API are active by default. To expose the web UI, add the following to your Vault configuration file:

```
ui = true
```

> [!important]
> **Note**
>
> Enabling the UI requires Vault to be served over TLS in production environments to prevent credentials leakage.

Before executing any operations, authenticate to Vault. For example:

```
vault login
```

> [!important]
> **Warning**
>
> Keep your tokens secure. Avoid committing them to source control or sharing them in logs.

Once authenticated, you can:

- Retrieve or store secrets (`vault kv get`, `vault kv put`)
- Generate dynamic credentials (e.g., database or AWS tokens)
- Encrypt/decrypt data with Transit secrets engine
- Manage leases and token renewals

---

## Vault Interfaces and Their Users

Different personas leverage Vault’s interfaces to manage secrets at varying levels of automation and scale.

![The image illustrates different Vault interfaces: User Interface, Command Line, and HTTP API, along with their users: Humans/Users, Orchestration, and Applications.](https://kodekloud.com/kk-media/image/upload/v1752878241/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Vault-Interfaces/vault-interfaces-user-command-http-api.jpg)

| Interface                                       | Typical User                 | Example Usage                                          |
| ----------------------------------------------- | ---------------------------- | ------------------------------------------------------ |
| UI                                              | Human operators              | Browsing secrets, viewing leases, managing policies    |
| CLI                                             | DevOps engineers & CI/CD     | `vault kv get secret/data/app`                         |
| HTTP API                                        | Applications & orchestration | \\`curl --header "X-Vault-Token: $VAULT\\\_TOKEN" \\\\ |
| https://vault.example.com/v1/secret/data/app\\` |                              |                                                        |

- **Humans**  
  Operators often prefer the UI for its graphical overview but can also use the CLI by setting `VAULT_ADDR`:

  ```
  export VAULT_ADDR='https://vault.example.com'
  ```

- **Orchestration Tools**  
  CI/CD platforms like [Jenkins](https://www.jenkins.io/), [CircleCI](https://circleci.com/), [Chef](https://www.chef.io/), and [Puppet](https://puppet.com/) integrate via CLI commands or directly call the HTTP API to automate secret retrieval and renewal.
- **Applications**  
  Most applications interact programmatically through the HTTP API. They authenticate, receive a token, and request secrets or dynamic credentials. They must handle token TTL, lease durations, and renewal processes.

---

## Learning Objectives

In subsequent sections, aligned with the Vault Associate Exam objectives, we will explore each interface in depth:

![The image outlines three learning objectives related to using Vault: utilizing the command line, user interface, and HTTP API. Each section includes an icon and a brief description of the objective.](https://kodekloud.com/kk-media/image/upload/v1752878242/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Vault-Interfaces/vault-learning-objectives-command-line-ui-api.jpg)

1.  **Objective 6:** Utilize the Vault CLI
2.  **Objective 7:** Utilize the Vault UI
3.  **Objective 8:** Be aware of the Vault HTTP API

---

## References

- [Vault UI Documentation](https://www.vaultproject.io/docs/ui)
- [Vault CLI Commands](https://www.vaultproject.io/docs/commands)
- [Vault HTTP API](https://www.vaultproject.io/api-docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/f544757d-0901-47a3-a0e6-d9ab7822ef7a/lesson/6d027509-202b-4628-b65b-50e1cb55080d)**
>
> Watch video content
