# Managing Tokens using the API - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Assess-Vault-Tokens/Managing-Tokens-using-the-API)

---

## Table of Contents

- Managing Tokens using the API
  - 1. Authenticate and Retrieve a Client Token
  - 2. Store the Token
  - 3. Use the Token in API Requests
  - Links and References
  - Watch Video
    - 2.1 Save to a File
    - 2.2 Save to an Environment Variable
    - 3.1 Write a Secret
    - 3.2 Read a Secret

---

## Content

HashiCorp Certified: Vault Associate Certification

Assess Vault Tokens

# Managing Tokens using the API

In this guide, you’ll learn how to authenticate to Vault using an auth method, extract the client token from the API response, store it securely, and use it for subsequent requests. All examples use [`jq`](https://stedolan.github.io/jq/) to parse JSON.

## 1\. Authenticate and Retrieve a Client Token

When you log in (with any method other than token auth), Vault returns a JSON payload containing `auth.client_token`. Use `curl` to send your credentials:

```
curl --request POST \
     --data @payload.json \
     http://127.0.0.1:8200/v1/auth/userpass/login/bryan | jq
```

Sample response:

```
{
  "request_id": "Ob4181fe-0dec-2261-5231-bb3f033387e5",
  "lease_id": "",
  "renewable": false,
  "auth": {
    "client_token": "s.WN54zL4c4wQJet9KS9KItkHW",
    "accessor": "zsapl3bBo0GzB5xVPZFEu3Th",
    "policies": ["default", "training"],
    "token_policies": ["default", "training"],
    "metadata": { "username": "bryan" },
    "lease_duration": 2764800,
    "renewable": true,
    "entity_id": "88669d54-b405-c27a-d468-410a1185eb0d",
    "token_type": "service",
    "orphan": true
  }
}
```

The value of `auth.client_token` is your Vault token for future API calls.

## 2\. Store the Token

You have two common options for storing the token.

| Method      | Command Example                   | Pros & Cons                                  |
| ----------- | --------------------------------- | -------------------------------------------- |
| File        | \\`curl …                         | jq -r ".auth.client\\\_token" > token.txt\\` |
| Environment | \\`export VAULT\\\_TOKEN=$(curl … | jq -r ".auth.client\\\_token")\\`            |

> [!important]
> **Warning**
>
> Storing tokens in plain text files can expose secrets if file permissions aren’t locked down. Always enforce least-privilege access.

### 2.1 Save to a File

```
curl --request POST \
     --data @payload.json \
     http://127.0.0.1:8200/v1/auth/userpass/login/bryan \
  | jq -r ".auth.client_token" > token.txt


# Verify
cat token.txt
# s.dhtIk8VsE3Mj61PuGP3ZfFrg
```

### 2.2 Save to an Environment Variable

```
OUTPUT=$(curl --request POST \
              --data @payload.json \
              http://127.0.0.1:8200/v1/auth/userpass/login/bryan)


export VAULT_TOKEN=$(echo "$OUTPUT" | jq -r '.auth.client_token')


echo "$VAULT_TOKEN"
# s.dhtIk8VsE3Mj61PuGP3ZfFrg
```

## 3\. Use the Token in API Requests

Vault supports two header styles for passing the token. Choose one:

| Header Style  | Example                                   |
| ------------- | ----------------------------------------- |
| X-Vault-Token | `-H "X-Vault-Token: $VAULT_TOKEN"`        |
| Authorization | `-H "Authorization: Bearer $VAULT_TOKEN"` |

> The most common practice is to use **X-Vault-Token**.

### 3.1 Write a Secret

```
curl --header "X-Vault-Token: $VAULT_TOKEN" \
     --request POST \
     --data '{ "apikey": "3230sc$832d" }' \
     https://vault.example.com:8200/v1/secret/apikey/splunk
```

### 3.2 Read a Secret

```
curl --header "X-Vault-Token: $VAULT_TOKEN" \
     --request GET \
     https://vault.example.com:8200/v1/secret/data/apikey/splunk
```

That’s it! Authenticate, extract `auth.client_token`, store it securely, and include it in the header for all Vault API calls.

## Links and References

- [Vault HTTP API Documentation](https://www.vaultproject.io/api-docs)
- [jq Tool Documentation](https://stedolan.github.io/jq/)
- [Vault Authentication Methods](https://www.vaultproject.io/docs/auth)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/ffb53470-4115-4c47-aade-cb572b6b574f/lesson/f641b172-da5d-457d-853a-2080dc00b4f8)**
>
> Watch video content
