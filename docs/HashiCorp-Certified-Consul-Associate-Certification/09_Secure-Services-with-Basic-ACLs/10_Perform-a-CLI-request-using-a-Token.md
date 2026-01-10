# Perform a CLI request using a Token - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Secure-Services-with-Basic-ACLs/Perform-a-CLI-request-using-a-Token)

---

## Table of Contents

- Perform a CLI request using a Token
  - 1. Export an Environment Variable
  - 2. Export a Token-File Environment Variable
  - 3. Use the --token Flag
  - 4. Use the --token-file Flag
  - Summary
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Consul Associate Certification

Secure Services with Basic ACLs

# Perform a CLI request using a Token

When interacting with HashiCorp Consul via the CLI, you must authenticate requests using an ACL token. This guide covers four primary ways to supply your token:

| Method                           | Usage Scope          | Example                                            |
| -------------------------------- | -------------------- | -------------------------------------------------- |
| Environment Variable             | Entire shell session | `export CONSUL_HTTP_TOKEN=YOUR_TOKEN`              |
| Token-File Environment Variable  | Entire shell session | `export CONSUL_HTTP_TOKEN_FILE=/path/to/token.txt` |
| `--token` Command-Line Flag      | Single command       | `consul members --token YOUR_TOKEN`                |
| `--token-file` Command-Line Flag | Single command       | `consul members --token-file /path/to/token.txt`   |

Environment variables persist across all Consul commands in your current shell, while CLI flags apply only to the specific command where they’re used.

---

## 1\. Export an Environment Variable

Supply the ACL token once per session. All subsequent Consul commands will automatically pick it up:

```
export CONSUL_HTTP_TOKEN=ec15675e-2999-d789-832e-8c4794daa8d7
consul members   # Uses token from $CONSUL_HTTP_TOKEN
```

> [!important]
> **Best Practice**
>
> Storing tokens as environment variables is convenient, but ensure your shell history is secured to prevent accidental leakage.

## 2\. Export a Token-File Environment Variable

If you prefer keeping tokens out of your shell history, you can point to a file that contains the token:

```
export CONSUL_HTTP_TOKEN_FILE=/etc/consul/token.txt
consul members   # Reads the token from /etc/consul/token.txt
```

Validate that the file has restrictive permissions (`chmod 600`) to protect sensitive data.

## 3\. Use the `--token` Flag

For one-off commands, specify the token inline. This overrides any environment variable settings:

```
consul members --token ec15675e-2999-d789-832e-8c4794daa8d7
```

## 4\. Use the `--token-file` Flag

Combine the security of a file with the precision of a per-command setting:

```
consul members --token-file /etc/consul/token.txt
```

> [!important]
> **Note**
>
> The `--token-file` flag instructs Consul to read the token from the specified path, mirroring the behavior of `CONSUL_HTTP_TOKEN_FILE`.

---

## Summary

When starting a new shell session, remember to re-export any environment variables. In exam or production scenarios, you may be asked to demonstrate any of these four ACL token injection techniques.

---

## Links and References

- [Consul ACL Concepts](https://www.consul.io/docs/security/acl)
- [Consul CLI Reference](https://www.consul.io/docs/commands)
- [Secure Shell Best Practices](https://www.ssh.com/academy/ssh/config)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/77c34744-e0fe-450e-82ea-c699ae223d45/lesson/4238cfb3-e0c6-4d6d-a9ea-469d08f3339a)**
>
> Watch video content
