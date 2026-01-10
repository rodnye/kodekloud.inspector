# Demo Using Tokens with the Consul API - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Secure-Services-with-Basic-ACLs/Demo-Using-Tokens-with-the-Consul-API)

---

## Table of Contents

- Demo Using Tokens with the Consul API
  - 1. Export the ACL Token
  - 2. Create (or Recreate) an ACL Policy
  - 3. Verify Your Token and List K/V Entries
  - 4. Authenticate API Requests
  - Watch Video
  - Practice Lab
    - Method 1: X-Consul-Token Header
    - Method 2: Authorization Bearer Header

---

## Content

HashiCorp Certified: Consul Associate Certification

Secure Services with Basic ACLs

# Demo Using Tokens with the Consul API

Welcome to the final lab of this guide. Here you’ll leverage an existing bootstrap ACL token to authenticate HTTP requests against the Consul Key/Value (K/V) store. This demonstration covers:

1.  Loading the token from a file
2.  Creating or recreating an ACL policy
3.  Retrieving K/V entries via `curl` and `jq`
4.  Two authentication methods for the Consul API

> [!important]
> **Note**
>
> Before proceeding, ensure Consul is running and you have access to the `consul` binary. For more details, see the [Consul documentation](https://www.consul.io/docs).

## 1\. Export the ACL Token

Set the `CONSUL_HTTP_TOKEN_FILE` environment variable to read your token from `token.txt`:

```
export CONSUL_HTTP_TOKEN_FILE=token.txt
```

> [!important]
> **Warning**
>
> Keep your token file secure. Avoid committing it to version control or sharing it publicly.

## 2\. Create (or Recreate) an ACL Policy

Use `consul acl policy create` to define a policy with the required rules. If the policy name already exists, choose a new one:

```
consul acl policy create -name "test123" -rules @rules.hcl
# On error (name exists), try:
consul acl policy create -name "test456" -rules @rules.hcl
```

Sample output after creating `test456`:

```
ID:        51eff8b-4581-7009-2d44-78edf6f105da
Name:      test456
Namespace: default
Rules:
  node "web-server-01" {
    policy = "write"
  }
  key_prefix "apps/eCommerce" {
    policy = "write"
  }
  session_prefix "" {
    policy = "write"
  }
  service "eCommerce-Front-End" {
    policy = "write"
  }
```

## 3\. Verify Your Token and List K/V Entries

Clear your terminal and display the token:

```
clear
cat token.txt
# Example output:
# c7142d5a-aba1-78ba-f521-189971e29c24
```

Then list all keys in the K/V store:

```
consul kv get -recurse
```

Expected output:

```
apps/eCommerce/database:billing
apps/eCommerce/database_host:customer_db
apps/eCommerce/environment:production
apps/eCommerce/version:4.5
apps/search/url:search.service.consul
apps/search/version:4
```

## 4\. Authenticate API Requests

Now that you know the key (`apps/eCommerce/database_host`) and have your ACL token, you can fetch its value using the Consul HTTP API. Below are two supported methods:

| Header Type    | Description                  | Header Example                                |
| -------------- | ---------------------------- | --------------------------------------------- |
| X-Consul-Token | Consul-specific token header | `X-Consul-Token: c7142d5a-aba1-78ba-f521-...` |
| Authorization  | Standard HTTP Bearer token   | `Authorization: Bearer c7142d5a-aba1-78ba...` |

### Method 1: X-Consul-Token Header

```
curl \
  --header "X-Consul-Token: c7142d5a-aba1-78ba-f521-189971e29c24" \
  http://127.0.0.1:8500/v1/kv/apps/eCommerce/database_host | jq
```

Response:

```
[
  {
    "LockIndex": 0,
    "Key": "apps/eCommerce/database_host",
    "Flags": 0,
    "Value": "Y3VzdG9tZXJzZGI=",
    "Namespace": "default",
    "CreateIndex": 2336,
    "ModifyIndex": 2336
  }
]
```

### Method 2: Authorization Bearer Header

```
curl \
  --header "Authorization: Bearer c7142d5a-aba1-78ba-f521-189971e29c24" \
  http://127.0.0.1:8500/v1/kv/apps/eCommerce/database_host | jq
```

The JSON payload returned is identical to **Method 1**.

---

You’ve now learned how to authenticate Consul API requests using an ACL token—either via `X-Consul-Token` or the standard `Authorization: Bearer` header. For more information, refer to the [Consul API KV documentation](https://www.consul.io/api-docs/kv).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/77c34744-e0fe-450e-82ea-c699ae223d45/lesson/3d7ed3e1-99f6-4e58-8317-2451357e5bbe)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/77c34744-e0fe-450e-82ea-c699ae223d45/lesson/dda060e9-3724-4bdf-8bb6-bc592d749b37)**
>
> Practice lab
