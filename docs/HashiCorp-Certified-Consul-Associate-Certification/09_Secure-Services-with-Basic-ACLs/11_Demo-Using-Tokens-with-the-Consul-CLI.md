# Demo Using Tokens with the Consul CLI - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Secure-Services-with-Basic-ACLs/Demo-Using-Tokens-with-the-Consul-CLI)

---

## Table of Contents

- Demo Using Tokens with the Consul CLI
  - Quick Comparison
  - 1. Using the -token Flag
  - 2. Using the CONSUL_HTTP_TOKEN Environment Variable
  - 3. Using the -token-file Flag
  - 4. Using the CONSUL_HTTP_TOKEN_FILE Environment Variable
  - Summary
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Consul Associate Certification

Secure Services with Basic ACLs

# Demo Using Tokens with the Consul CLI

In this guide, you’ll learn four ways to provide an ACL token to the Consul CLI. ACL tokens control access to Consul’s API, ensuring your operations are authorized. You can supply your token through:

1.  The `-token` flag
2.  The `CONSUL_HTTP_TOKEN` environment variable
3.  The `-token-file` flag
4.  The `CONSUL_HTTP_TOKEN_FILE` environment variable

For demonstration, we’ll use the bootstrap/master token `c7142d25-a8b1-70ba-f521-189872e92c24`. Be sure to substitute your own token.

> [!important]
> **Warning**
>
> Never expose your ACL tokens in public repositories or logs. Treat them like passwords.

## Quick Comparison

| Method                   | Configuration            | When to Use                                            |
| ------------------------ | ------------------------ | ------------------------------------------------------ |
| `-token` flag            | CLI argument             | One-off commands or scripts                            |
| `CONSUL_HTTP_TOKEN`      | Environment variable     | Frequent CLI use, avoids repetitive flags              |
| `-token-file` flag       | File containing token    | Centralized token management via file system           |
| `CONSUL_HTTP_TOKEN_FILE` | Env var pointing to file | Combine file management with environment configuration |

---

## 1\. Using the `-token` Flag

Supply the ACL token directly on the command line with `-token`.

```
consul acl policy create \
  -token c7142d25-a8b1-70ba-f521-189872e92c24 \
  -name "test-policy" \
  -rules @rules.hcl
```

This is ideal for ad-hoc operations or automation scripts where passing flags is acceptable.

---

## 2\. Using the `CONSUL_HTTP_TOKEN` Environment Variable

Export the token once, then omit the `-token` flag in subsequent commands:

```
export CONSUL_HTTP_TOKEN=c7142d25-a8b1-70ba-f521-189872e92c24
```

Now run the same policy creation without specifying the token:

```
consul acl policy create \
  -name "test-policy" \
  -rules @rules.hcl
```

To verify permissions are enforced, unset the variable and rerun:

```
unset CONSUL_HTTP_TOKEN


consul acl policy create \
  -name "test-policy" \
  -rules @rules.hcl
# => Failed to create new policy: Unexpected response code: 403 (Permission denied)
```

> [!important]
> **Note**
>
> Using `CONSUL_HTTP_TOKEN` is convenient for CI/CD pipelines and local development shells.

---

## 3\. Using the `-token-file` Flag

Store your token in a file (e.g., `token.txt`) and point the CLI at it:

```
cat token.txt
consul acl policy create \
  -token-file token.txt \
  -name "test-policy" \
  -rules @rules.hcl
```

This approach keeps tokens out of your command history.

---

## 4\. Using the `CONSUL_HTTP_TOKEN_FILE` Environment Variable

Combine file-based tokens with environment variables to centralize configuration:

```
export CONSUL_HTTP_TOKEN_FILE=token.txt


consul acl policy create \
  -name "test-policy" \
  -rules @rules.hcl
# => failed to create new policy: Unexpected response code: 500 (Invalid Policy: A Policy with Name "test-policy" already exists)
```

> [!important]
> **Note**
>
> Ensure the token file has restrictive permissions (`chmod 600 token.txt`) to prevent unauthorized access.

---

## Summary

Consul CLI supports ACL tokens via:

- `-token` flag
- `CONSUL_HTTP_TOKEN` environment variable
- `-token-file` flag
- `CONSUL_HTTP_TOKEN_FILE` environment variable

Choose the method that best fits your workflow. For interactive use or automation, environment variables often offer the cleanest experience.

---

## Links and References

- [Consul ACL Overview](https://www.consul.io/docs/security/acl)
- [Consul CLI Documentation](https://www.consul.io/docs/commands)
- [HashiCorp Best Practices](https://learn.hashicorp.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/77c34744-e0fe-450e-82ea-c699ae223d45/lesson/e8c04e13-6d06-40f4-80cc-c8928f2fb107)**
>
> Watch video content
