# Vault Authentication using the API - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Compare-Authentication-Methods/Vault-Authentication-using-the-API)

---

## Table of Contents

- Vault Authentication using the API
  - Authenticating with AppRole
  - Sample Response
  - Using the Vault Token for Subsequent Requests
  - Links and References
  - Watch Video
    - Prepare the Login Payload
    - Send the Login Request

---

## Content

HashiCorp Certified: Vault Associate Certification

Compare Authentication Methods

# Vault Authentication using the API

When you migrate from the Vault CLI to its HTTP API, authentication works slightly differently. Instead of the CLI persisting your token, the API returns a JSON payload containing:

| Field             | Description                                |
| ----------------- | ------------------------------------------ |
| client\\\_token   | Vault token to include in subsequent calls |
| accessor          | Token accessor for lookup and revoke       |
| policies          | List of policies attached to the token     |
| lease\\\_duration | Time-to-live (TTL) for the token           |

You must parse this JSON response, extract the `client_token`, and include it in the `X-Vault-Token` header for all future requests.

> [!important]
> **Note**
>
> You’re not storing tokens on disk as the CLI does. Securely manage your tokens in environment variables or secret managers.

## Authenticating with AppRole

AppRole authentication allows machines or applications to authenticate to Vault. No existing token is required to perform this login.

### Prepare the Login Payload

Create a JSON file (`auth.json`) containing your AppRole credentials:

```
{
  "role_id": "<your_role_id>",
  "secret_id": "<your_secret_id>"
}
```

### Send the Login Request

```
curl --request POST \
     --data @auth.json \
     https://vault.example.com:8200/v1/auth/approle/login
```

- `@auth.json`: Path to the JSON payload with `role_id` and `secret_id`.
- Endpoint: `/v1/auth/approle/login` signals Vault to authenticate via AppRole.

## Sample Response

A successful AppRole login returns a JSON object similar to:

```
{
  "request_id": "0f874bea-16a6-c3da-8f20-1f2ef9cb5d22",
  "lease_id": "",
  "renewable": false,
  "lease_duration": 0,
  "data": null,
  "wrap_info": null,
  "warnings": null,
  "auth": {
    "client_token": "s.wjkffdrqM9QYTOYrUnUxXyX6",
    "accessor": "Hbhmd3OfVTXnukBv7WxMrWld",
    "policies": [
      "admin",
      "default"
    ]
  }
}
```

Extract the `auth.client_token` value—this is your Vault API token.

## Using the Vault Token for Subsequent Requests

Include the token in the `X-Vault-Token` header for all Vault API calls. For example, to read a secret at `secret/data/my-secret`:

```
curl --header "X-Vault-Token: s.wjkffdrqM9QYTOYrUnUxXyX6" \
     https://vault.example.com:8200/v1/secret/data/my-secret
```

Replace `my-secret` with the path to your desired secret. All reads, writes, renewals, and revocations follow the same pattern.

> [!important]
> **Warning**
>
> Avoid exposing your Vault token in shared logs or command-history. Use environment variables or CI/CD secret storage to keep tokens confidential.

## Links and References

- [Vault HTTP API Documentation](https://www.vaultproject.io/api-docs)
- [AppRole Auth Method Guide](https://www.vaultproject.io/docs/auth/approle)
- [Vault CLI vs. API Overview](https://www.vaultproject.io/docs/commands)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/eebfb593-8885-43b0-a9ba-9f88af87092e/lesson/89372a2e-9d14-42ea-8b00-296a0656708a)**
>
> Watch video content
