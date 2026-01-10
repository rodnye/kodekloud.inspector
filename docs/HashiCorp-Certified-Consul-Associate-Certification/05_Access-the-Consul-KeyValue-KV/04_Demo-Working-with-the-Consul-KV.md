# Demo Working with the Consul KV - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Access-the-Consul-KeyValue-KV/Demo-Working-with-the-Consul-KV)

---

## Table of Contents

- Demo Working with the Consul KV
  - 1. Prerequisites
  - 2. Adding Data via the CLI
  - 3. Deleting an Entry
  - 4. Adding Data for the Search Service
  - 5. Querying Data in the CLI
  - 6. Querying Data via the HTTP API
  - 7. Operation Summary
  - 8. Further Reading
  - Watch Video
  - Practice Lab

---

## Content

HashiCorp Certified: Consul Associate Certification

Access the Consul KeyValue KV

# Demo Working with the Consul KV

In this hands-on tutorial, you’ll learn how to manage key/value pairs in HashiCorp Consul’s K/V store using three methods: the web UI, the CLI, and the HTTP API. We'll cover adding, querying, and deleting entries, plus best practices for decoding API responses.

---

## 1\. Prerequisites

- SSH access to one of your Consul server nodes
- Consul UI open in your browser (defaults to http://127.0.0.1:8500/ui)

When you first open the UI, the **Key/Value** section should be empty.

---

## 2\. Adding Data via the CLI

Use the `consul kv put` command to insert entries under the `apps/eCommerce` prefix.

```
# 1. Add the database host
consul kv put apps/eCommerce/database_host customer_db


# 2. Add the database name
consul kv put apps/eCommerce/database billing


# 3. Add the connection string
consul kv put apps/eCommerce/connection_string 'Server=myServerAddress;Database=myDataBase;Uid=myUsername;Pwd=myPassword;'
```

Each command will return a confirmation similar to:

```
Success! Data written to: apps/eCommerce/database_host
```

---

## 3\. Deleting an Entry

If you need to remove a key, use `consul kv delete`. For example, to delete the connection string:

```
consul kv delete apps/eCommerce/connection_string
```

Successful deletion yields:

```
Success! Deleted key: apps/eCommerce/connection_string
```

---

## 4\. Adding Data for the Search Service

Next, create configuration entries for a hypothetical search service:

```
# Store the current version
consul kv put apps/search/version 4


# Store the service URL
consul kv put apps/search/url search.service.consul
```

Refresh the UI to verify new keys under **apps → search**.

> [!important]
> **Note**
>
> If you don’t see the new entries right away, click the **Refresh** button in the UI or clear your browser cache.

---

## 5\. Querying Data in the CLI

Retrieve a value directly from the CLI:

```
consul kv get apps/search/url
```

Output:

```
search.service.consul
```

---

## 6\. Querying Data via the HTTP API

Consul’s HTTP API returns values in Base64. First, inspect the raw JSON:

```
curl -s http://127.0.0.1:8500/v1/kv/apps/search/url | jq
```

Sample response:

```
[
  {
    "LockIndex": 0,
    "Key": "apps/search/url",
    "Flags": 0,
    "Value": "c2VhcmNoLnNlcnZpY2UuY29uc3Vs",
    "Namespace": "default",
    "CreateIndex": 2359,
    "ModifyIndex": 2359
  }
]
```

To decode in one step:

```
curl -s http://127.0.0.1:8500/v1/kv/apps/search/url \
  | jq -r '.[0].Value' \
  | base64 --decode
```

Output:

```
search.service.consul
```

> [!important]
> **Note**
>
> Any application using Consul’s K/V HTTP API must Base64-decode the `Value` field before use.

---

## 7\. Operation Summary

| Operation     | CLI Command                   | API Endpoint                       |
| ------------- | ----------------------------- | ---------------------------------- |
| Add Key       | `consul kv put <key> <value>` | POST `/v1/kv/:key`                 |
| Delete Key    | `consul kv delete <key>`      | DELETE `/v1/kv/:key`               |
| Get Key (CLI) | `consul kv get <key>`         | —                                  |
| Get Key (API) | —                             | GET `/v1/kv/:key` (Base64-encoded) |

---

## 8\. Further Reading

- [Consul K/V Store Overview](https://www.consul.io/docs/agent/kv)
- [Consul HTTP API Reference](https://www.consul.io/api-docs/kv)
- [Installing Consul](https://www.consul.io/docs/install)

You’ve now mastered adding, deleting, and retrieving key/value pairs in Consul using the UI, CLI, and HTTP API. Happy configuring!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/70a7eb0f-aec7-41aa-b417-398c341698b6/lesson/8daa6274-68ef-4e26-8a1b-41643814b399)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/70a7eb0f-aec7-41aa-b417-398c341698b6/lesson/0859eaa2-247a-4a8f-ba16-f748e256a817)**
>
> Practice lab
