# Perform an API request using a Token - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Consul-Associate-Certification/Secure-Services-with-Basic-ACLs/Perform-an-API-request-using-a-Token)

---

## Table of Contents

- Perform an API request using a Token
  - Header Options Comparison
  - Example 1: Using X-Consul-Token
  - Example 2: Using Authorization: Bearer
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Consul Associate Certification

Secure Services with Basic ACLs

# Perform an API request using a Token

In this guide, you’ll learn how to authenticate API requests to HashiCorp Consul by supplying your ACL token in the HTTP header. Consul supports two equivalent header options:

- **X-Consul-Token**
- **Authorization: Bearer**

Both methods achieve the same result—authorizing your request against the Consul ACL system—so you can choose the one that best fits your environment.

> [!important]
> **Note**
>
> Always keep your ACL tokens secure. Never commit them to version control or expose them in public logs.

## Header Options Comparison

| Header Option         | Syntax                                   |
| --------------------- | ---------------------------------------- |
| X-Consul-Token        | `X-Consul-Token: <your-acl-token>`       |
| Authorization: Bearer | `Authorization: Bearer <your-acl-token>` |

## Example 1: Using X-Consul-Token

```
curl -X PUT \
  --header "X-Consul-Token: ec15675e-2999-d789-832e-8c4794daa8d7" \
  --data @payload.json \
  https://consul.example.com:8500/v1/acl/token
```

## Example 2: Using Authorization: Bearer

```
curl -X PUT \
  --header "Authorization: Bearer ec15675e-2999-d789-832e-8c4794daa8d7" \
  --data @payload.json \
  https://consul.example.com:8500/v1/acl/token
```

Both commands send a `PUT` request to the `/v1/acl/token` endpoint, including:

- The JSON payload from `payload.json`
- Your ACL token in the request header

Consul validates the token and authorizes the operation, returning a success response if the token has the proper permissions.

## Next Steps

Jump into your lab environment and run these commands to verify that Consul accepts your token-based authentication.

## Links and References

- [Consul ACL API Documentation](https://www.consul.io/api-docs/acl)
- [HashiCorp Consul Official Site](https://www.consul.io/)
- [cURL Reference Manual](https://curl.se/docs/manual.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-consul-associate-certification/module/77c34744-e0fe-450e-82ea-c699ae223d45/lesson/adf09f7c-5caa-43a6-a552-da2f753cb767)**
>
> Watch video content
