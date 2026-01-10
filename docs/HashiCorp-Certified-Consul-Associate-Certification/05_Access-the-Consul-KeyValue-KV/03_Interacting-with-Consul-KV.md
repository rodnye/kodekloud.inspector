# Interacting with Consul KV - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Access-the-Consul-KeyValue-KV/Interacting-with-Consul-KV)

---

## Table of Contents

- Interacting with Consul KV
  - 1. Consul KV HTTP API
  - 2. Consul Command-Line Interface
  - 3. Consul Web UI
  - 4. Limiting Access with ACLs
  - Links and References
  - Watch Video
    - 1.1 Writing a Key (PUT)
    - 1.2 Reading a Key (GET)

---

## Content

HashiCorp Certified: Consul Associate Certification

Access the Consul KeyValue KV

# Interacting with Consul KV

Consul’s key/value (KV) store lets you centrally manage configuration data, feature flags, and more. You can interact with the KV store in three ways:

| Interface    | Description                               | Ideal For                      |
| ------------ | ----------------------------------------- | ------------------------------ |
| HTTP API     | Perform CRUD operations over HTTP         | Applications, automation, SDKs |
| Command-Line | `consul kv` subcommands for KV management | Administrators, scripts        |
| Web UI       | Browser-based view and edit               | Exploratory or ad hoc changes  |

Below, we’ll explore each interface in detail.

---

## 1\. Consul KV HTTP API

The HTTP API exposes a `/v1/kv` endpoint. Use standard HTTP verbs (`PUT`, `GET`, `DELETE`) to manage keys.

### 1.1 Writing a Key (`PUT`)

```
curl --request PUT \
     --data 'enabled' \
     https://consul.example.com:8500/v1/kv/data/app4
# => true
```

A response of `true` means the write succeeded. If the path (`data/app4`) doesn’t exist, Consul creates it automatically.

### 1.2 Reading a Key (`GET`)

```
curl https://consul.example.com:8500/v1/kv/data/app4 | jq
```

```
[
  {
    "LockIndex": 0,
    "Key": "data/app4",
    "Flags": 0,
    "Value": "J2VuYWJsZWQn",
    "CreateIndex": 69,
    "ModifyIndex": 87
  }
]
```

The `Value` field is Base64-encoded. Decode it:

```
echo "J2VuYWJsZWQn" | base64 --decode
# => 'enabled'
```

> [!important]
> **Note**
>
> Base64 encoding is not encryption. Data at rest in Consul is unencrypted by default; the API simply returns values encoded in Base64.

For full API reference, see the [Consul KV HTTP API documentation](https://www.consul.io/api-docs/kv).

---

## 2\. Consul Command-Line Interface

The `consul kv` set of commands provides a quick way to interact with the KV store from your terminal.

```
# Write or update a key
consul kv put app1/config/apikey 4fe20s12a02$23
# Read back the value
consul kv get app1/config/apikey
# Delete the key
consul kv delete app1/config/apikey
# Output: Success! Data deleted at key: app1/config/apikey
```

| Subcommand | Action                       |
| ---------- | ---------------------------- |
| `put`      | Create or update a key       |
| `get`      | Retrieve the plaintext value |
| `delete`   | Remove a key and its data    |

Consult the [Consul CLI documentation](https://www.consul.io/docs/commands/kv) for additional flags and examples.

---

## 3\. Consul Web UI

The Consul UI provides a visual way to browse and modify KV entries.

1.  Log in to your Consul cluster.
2.  Click on the **Key/Value** tab in the top navigation.
3.  Drill down through key prefixes to locate your entry.
4.  Click on a key to view or edit its value in JSON, YAML, or HCL format.

![The image is a screenshot of a user interface for accessing a key/value store, highlighting the key name, key value, and options to view data in different formats. It includes labeled annotations and a cartoon character in the bottom right corner.](https://kodekloud.com/kk-media/image/upload/v1752877775/notes-assets/images/HashiCorp-Certified-Consul-Associate-Certification-Interacting-with-Consul-KV/key-value-store-ui-screenshot.jpg)

---

## 4\. Limiting Access with ACLs

By default, Consul’s KV store is open to all clients. To enforce security:

1.  Enable ACLs in your Consul configuration.
2.  Bootstrap an ACL management token.
3.  Create policies that grant read/write permissions on specific key prefixes.
4.  Distribute tokens to users or applications.

> [!important]
> **Warning**
>
> Once ACLs are enabled, all API, CLI, and UI requests require a valid token. Plan your migration and token distribution carefully.

For a deep dive, see the [Consul ACL guide](https://www.consul.io/docs/security/acl).

---

## Links and References

- [Consul Key/Value HTTP API](https://www.consul.io/api-docs/kv)
- [Consul CLI Commands: `kv`](https://www.consul.io/docs/commands/kv)
- [Consul Web UI Overview](https://www.consul.io/docs/ui)
- [Consul ACL Security](https://www.consul.io/docs/security/acl)
- [HashiCorp Consul Documentation](https://www.consul.io/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/70a7eb0f-aec7-41aa-b417-398c341698b6/lesson/ca2bd73a-7f10-4da4-8839-a2e82b26b618)**
>
> Watch video content
