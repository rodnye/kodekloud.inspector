# Demo Using Envconsul to monitor Changes to Consul KV - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Access-the-Consul-KeyValue-KV/Demo-Using-Envconsul-to-monitor-Changes-to-Consul-KV)

---

## Table of Contents

- Demo Using Envconsul to monitor Changes to Consul KV
  - Prerequisites
  - 1. Install envconsul
  - 2. Fetch and Export KV Data
  - 3. Launch Your Application with envconsul
  - Summary
  - Links and References
  - Watch Video
    - Example KV Entries
    - Common Flags

---

## Content

HashiCorp Certified: Consul Associate Certification

Access the Consul KeyValue KV

# Demo Using Envconsul to monitor Changes to Consul KV

In this tutorial, you’ll learn how to install and run HashiCorp envconsul on an application server. Envconsul fetches key-value pairs from Consul and exposes them as environment variables, automatically watching for changes without manual intervention.

## Prerequisites

- A running Consul cluster with KV entries under `apps/ecommerce`
- SSH access to your application server
- (Optional) Consul ACL token if your cluster enforces ACLs

### Example KV Entries

| Consul KV Path                     | Value                                               |
| ---------------------------------- | --------------------------------------------------- |
| `apps/ecommerce/database_host`     | `"customer-db"`                                     |
| `apps/ecommerce/database`          | `"billing"`                                         |
| `apps/ecommerce/connection_string` | `"Server=customer-db;Database=billing;User Id=..."` |

## 1\. Install envconsul

Download the latest Linux AMD64 binary from HashiCorp’s release archive:

```
curl --silent -Lo /tmp/envconsul.zip \
  https://releases.hashicorp.com/envconsul/0.11.0/envconsul_0.11.0_linux_amd64.zip
```

Unzip and move the binary into your `PATH`:

```
unzip /tmp/envconsul.zip -d /tmp
sudo mv /tmp/envconsul /usr/local/bin/
```

Verify the installation:

```
envconsul --version
# => envconsul v0.11.0
```

> [!important]
> **Note**
>
> Make sure to update the version number in the URL if a newer release is available.

## 2\. Fetch and Export KV Data

Use `envconsul` to pull all keys under the `apps/ecommerce` prefix and convert them to uppercase environment variables:

```
envconsul \
  -prefix="apps/ecommerce" \
  -uppercase \
  -- printenv
```

Sample output:

```
DATABASE_HOST=customer-db
DATABASE=billing
CONNECTION_STRING=Server=customer-db;Database=billing;User Id=...
```

### Common Flags

| Flag         | Description                                        |
| ------------ | -------------------------------------------------- |
| `-prefix`    | Consul KV path to fetch                            |
| `-uppercase` | Convert all keys to uppercase environment variable |
| `--`         | Separator before the command to execute            |

## 3\. Launch Your Application with envconsul

To ensure your application picks up the variables at startup and on any KV change:

```
envconsul \
  -prefix="apps/ecommerce" \
  -uppercase \
  -- ./start-your-app.sh
```

> [!important]
> **Warning**
>
> If your app requires a Consul ACL token, set `CONSUL_HTTP_TOKEN` in the environment or pass `-token` to `envconsul`.

## Summary

In this demo, you:

1.  Installed `envconsul` on a Linux server.
2.  Retrieved KV pairs from Consul and exposed them as environment variables.
3.  Launched your application to inherit and watch for configuration updates automatically.

By integrating `envconsul`, your service maintains up-to-date settings without manual polling or restarts.

## Links and References

- [envconsul Releases](https://releases.hashicorp.com/envconsul/)
- [Consul KV Documentation](https://www.consul.io/docs/kv)
- [HashiCorp envconsul Overview](https://www.hashicorp.com/products/envconsul)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/70a7eb0f-aec7-41aa-b417-398c341698b6/lesson/ffc95153-fa8e-41ed-a1c8-3f2e71794713)**
>
> Watch video content
