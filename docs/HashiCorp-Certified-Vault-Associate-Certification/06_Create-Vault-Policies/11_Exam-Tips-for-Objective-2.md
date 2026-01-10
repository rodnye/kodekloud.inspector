# Exam Tips for Objective 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Create-Vault-Policies/Exam-Tips-for-Objective-2)

---

## Table of Contents

- Exam Tips for Objective 2
  - 1. Vault Policy Fundamentals
  - 2. Key Capabilities in Vault Policies
  - 3. Root-Protected Paths
  - 4. Policy Customization Techniques
  - Conclusion
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Create Vault Policies

# Exam Tips for Objective 2

Vault Policies are the foundation of access control in HashiCorp Vault. This guide covers the key concepts you need for Objective 2 of the Vault Certified Associate exam, including default behaviors, capabilities, protected paths, and advanced customization.

## 1\. Vault Policy Fundamentals

Vault policies are declarative, path-based rules that grant or deny access. All paths default to `deny`—if no policy explicitly allows an action, it is not permitted.

- Path-based rules control access at granular levels.
- Two built-in policies exist by default:

  | Policy      | Description                                                |
  | ----------- | ---------------------------------------------------------- |
  | **root**    | Unrestricted access; bound to the root token.              |
  | **default** | Automatically applied to non-root tokens; can be disabled. |

- To explore default permissions:
  1.  Start a [Dev server](https://www.vaultproject.io/docs/commands/server#dev-server) (`vault server -dev`).
  2.  Retrieve policies with `vault policy read default`.
  3.  Inspect allowed paths and capabilities.

![The image provides exam tips related to understanding default policy permissions, capabilities like CRUD, and the difference between "create" and "update" actions. It includes a decorative pixelated border and a cartoon character at the bottom right.](https://kodekloud.com/kk-media/image/upload/v1752878138/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Exam-Tips-for-Objective-2/exam-tips-default-policy-permissions.jpg)

## 2\. Key Capabilities in Vault Policies

Vault supports a defined set of capabilities. Understanding each is critical for writing precise policies.

| Capability | Description                                  | Example Usage                                          |
| ---------- | -------------------------------------------- | ------------------------------------------------------ |
| create     | Write a new secret or resource               | `path "secret/data/foo" { capabilities = ["create"] }` |
| read       | Retrieve data                                | `capabilities = ["read"]`                              |
| update     | Modify an existing secret or resource        | `capabilities = ["update"]`                            |
| delete     | Remove data or resource                      | `capabilities = ["delete"]`                            |
| list       | Enumerate keys or subpaths                   | `capabilities = ["list"]`                              |
| sudo       | Perform privileged operations on an endpoint | `capabilities = ["sudo"]`                              |
| deny       | Explicitly deny access                       | `capabilities = ["deny"]`                              |

> [!important]
> **Note**
>
> `write` is **not** a valid capability. Use **create** for resources that don’t exist and **update** for modifying existing ones.

## 3\. Root-Protected Paths

Some Vault endpoints require the **root** policy. While you don’t need to memorize every path, be familiar with common protected endpoints:

- `sys/policies/acl/*`
- `sys/license`
- `sys/shutdown`
- `sys/health`

Review the [Vault API references](https://www.vaultproject.io/api-docs) to recognize which operations are gated.

![The image provides exam tips related to understanding root-protected paths and customizing policies, including using specific symbols and templating options. It includes a link for further learning and features a small illustration of a person in sunglasses.](https://kodekloud.com/kk-media/image/upload/v1752878139/notes-assets/images/HashiCorp-Certified-Vault-Associate-Certification-Exam-Tips-for-Objective-2/exam-tips-root-paths-customization.jpg)

## 4\. Policy Customization Techniques

Advanced policy authorship often uses globbing and templating to handle dynamic paths:

- **Globbing**
  - `*`: matches zero or more characters
  - `+`: matches any one of the listed characters
- **Templating**
  - Insert runtime variables in paths:

    ```
    path "identity/entity/name/{{entity.name}}/alias" {
      capabilities = ["create", "read"]
    }
    ```

## Conclusion

To excel on Objective 2 of the Vault Certified Associate exam:

1.  Verify foundational policy behavior in a dev Vault instance.
2.  Memorize the set of valid capabilities (CRUD, list, sudo, deny).
3.  Recognize key root-protected endpoints.
4.  Practice globbing and templating for dynamic policy definitions.

Good luck, and happy vaulting!

---

## Links and References

- [Vault Policies](https://www.vaultproject.io/docs/concepts/policies)
- [Vault Dev Server](https://www.vaultproject.io/docs/commands/server#dev-server)
- [Vault API Reference](https://www.vaultproject.io/api-docs)
- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs/overview/what-is-vault)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/83a61f63-3f1f-436c-8aa3-e972b099eeec/lesson/0e1b8550-b265-4b0b-8e32-8f0996a6da67)**
>
> Watch video content
