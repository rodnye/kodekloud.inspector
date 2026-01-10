# Service Tokens with Use Limits - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Assess-Vault-Tokens/Service-Tokens-with-Use-Limits)

---

## Table of Contents

- Service Tokens with Use Limits
  - How Use-Limit Tokens Work
  - Creating a Service Token with Use Limits
  - Inspecting the Token
  - Simulating Token Usage
  - Summary
  - Links and References
  - Watch Video
    - Example Timeline

---

## Content

HashiCorp Certified: Vault Associate Certification

Assess Vault Tokens

# Service Tokens with Use Limits

Service Tokens with Use Limits allow you to issue short-lived Vault tokens that not only expire after a specified TTL but also revoke automatically once they’ve been used a set number of times. This provides fine-grained control over API calls and enhances your security posture.

## How Use-Limit Tokens Work

A Use-Limit Token behaves like a standard token—honoring both its `ttl` and `max_ttl`—but also tracks how many times it can be used. Vault will revoke the token when **either** of these conditions is met first:

- The token’s time-to-live (TTL) elapses
- The token’s allowed use count reaches zero

> [!important]
> **Note**
>
> Revoking on use limits protects against token replay and limits the blast radius if a token is exposed.

### Example Timeline

Imagine you create a token with:

- TTL: 24 hours
- Use limit: 3

| Time Elapsed | TTL Remaining | Uses Remaining | Status  |
| ------------ | ------------- | -------------- | ------- |
| 0 hours      | 24 hours      | 3              | Active  |
| 3 hours      | 21 hours      | 2              | Active  |
| 10 hours     | 14 hours      | 1              | Active  |
| 11 hours     | 13 hours      | 0              | Revoked |
| 24 hours     | 0 hours       | –              | Revoked |

- At ~11 hours, after the **third use**, the token is revoked immediately—even though it still had TTL left.
- If you waited the full 24 hours but used the token only once, Vault would revoke it on TTL expiry despite remaining uses.

## Creating a Service Token with Use Limits

Use the `-use-limit` flag when generating a token:

```
vault token create \
  -policy="training" \
  -ttl="24h" \
  -use-limit=3
```

Example output:

```
Key                Value
---                -----
token              s.abc123xyz
token_policies     [ "training" ]
ttl                24h
num_uses           3
...
```

This command issues a token with:

- **Policy**: `training`
- **TTL**: 24 hours
- **Maximum Uses**: 3

## Inspecting the Token

To check the remaining uses and TTL, run:

```
vault token lookup s.abc123xyz
```

Example response:

```
Key           Value
---           -----
id            s.abc123xyz
issue_time    2021-12-25T18:35:08.004652-08:00
ttl           23h59m
num_uses      3
```

The `num_uses` field shows how many times this token can still be used before Vault revokes it.

## Simulating Token Usage

Each time the token is used for an operation—such as reading a secret—Vault decrements the `num_uses` count. After the final allowed use, the token is revoked immediately.

```
# Perform a Vault operation with the token...
vault kv get secret/my-app

# Then re-check the token
vault token lookup s.abc123xyz
```

```
Key           Value
---           -----
id            s.abc123xyz
ttl           23h00m
num_uses      2
```

Repeat until `num_uses` reaches `0`.

## Summary

By defining both a TTL and a `-use-limit`, Vault tokens can expire on whichever limit is reached first—time or uses. This adds a robust safeguard against token misuse, replay attacks, and unintended long-lived credentials.

## Links and References

- [Vault Token Tuning](https://www.vaultproject.io/docs/concepts/tokens#token-tuning)
- [Vault Token CLI Commands](https://www.vaultproject.io/docs/commands/token)
- [Vault Best Practices](https://www.vaultproject.io/docs/best-practices)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/ffb53470-4115-4c47-aade-cb572b6b574f/lesson/966e8b59-f69f-4d8f-8bed-95aedc4091be)**
>
> Watch video content
