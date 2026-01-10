# Demo Regenerating a Root Token - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Create-a-working-Vault-server-configuration-given-a-scenario/Demo-Regenerating-a-Root-Token)

---

## Table of Contents

- Demo Regenerating a Root Token
  - Table of Contents
  - 1. Check Vault Status
  - 2. Initialize Vault
  - 3. Authenticate with the Initial Root Token
  - 4. Revoke the Root Token
  - 5. Begin Root Token Generation
  - 6. Submit Recovery Keys
  - 7. Decode the New Root Token
  - 8. Authenticate with the New Root Token
  - 9. Verify Restored Access
  - Watch Video
  - Practice Lab
    - Example HCL Policy

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Create a working Vault server configuration given a scenario

# Demo Regenerating a Root Token

In this tutorial, you’ll learn how to recover access to your Vault cluster by regenerating a root token using the recovery keys. We’ll cover status verification, initialization, revocation, root token generation, and final validation.

## Table of Contents

1.  [Check Vault Status](#check-vault-status)
2.  [Initialize Vault](#initialize-vault)
3.  [Authenticate with the Initial Root Token](#authenticate-with-the-initial-root-token)
4.  [Revoke the Root Token](#revoke-the-root-token)
5.  [Begin Root Token Generation](#begin-root-token-generation)
6.  [Submit Recovery Keys](#submit-recovery-keys)
7.  [Decode the New Root Token](#decode-the-new-root-token)
8.  [Authenticate with the New Root Token](#authenticate-with-the-new-root-token)
9.  [Verify Restored Access](#verify-restored-access)

---

## 1\. Check Vault Status

Start with a fresh, uninitialized Vault server configured with AWS KMS auto-unseal:

```
# Check initialization and seal state
vault status
```

Example output:

```
Key                     Value
---                     -----
Recovery Seal Type      awskms
Initialized             false
Sealed                  true
Version                 1.10.0+ent
Storage Type            raft
HA Enabled              true
```

> [!important]
> **Note**
>
> Vault is uninitialized and sealed. The `Recovery Seal Type` shows AWS KMS for auto-unseal.

## 2\. Initialize Vault

Generate the recovery key shares and the initial root token:

```
vault operator init
```

Sample output:

```
Recovery Key 1: Sr90rdG3SEEz8pEmUd1HJhWmoDzMLiHwBay4EpD82Duy
Recovery Key 2: Mjk+TZO/p4sm36KTaZFXNuPuCMjdn6Y/Qvm65DLX2e8
Recovery Key 3: 6WltKoVAf8J4yTHVfMt/Ky9txhJL5P3XIlf9W6Baz93
Recovery Key 4: aDy61n4SezTFZFVtfkD6jiUTse16BG4BH4Cx1GRUPjm
Recovery Key 5: +xb/S9Sb4S2poactdbwzjl9zGpH7qB25YmyIOAJ2Yjx
Initial Root Token: hvs.jtEqNjivmy2aw9d30RRpt71
Success! Vault is initialized.
```

> [!important]
> **Warning**
>
> Securely distribute and store your recovery keys and initial root token. Anyone holding 3 of 5 keys can generate a new root token.

## 3\. Authenticate with the Initial Root Token

Log in using the root token you just received:

```
vault login hvs.jtEqNjivmy2aw9d30RRpt71
```

You should see:

```
Success! You are now authenticated.
token                 hvs.jtEqNjivmy2aw9d30RRpt71
token_policies        ["root"]
```

## 4\. Revoke the Root Token

Revoking the root token simulates loss of access:

```
vault token revoke hvs.jtEqNjivmy2aw9d30RRpt71
```

After revocation, any Vault API call will return a `403 permission denied`:

```
vault policy list
# → Error listing policies: permission denied
```

Now no valid authentication mechanism remains.

## 5\. Begin Root Token Generation

Initialize the root-token recovery process:

```
vault operator generate-root -init
```

Output includes:

```
Nonce         babe8c7d-8a2d-f604-0d27-3667f70e93bb
Progress      0/3
OTP           LlfdKVI8pV5pQZQExfi10s5LIRvws
OTP Length    28
```

> [!important]
> **Note**
>
> Save the **Nonce** and **One-Time Password (OTP)**. You will need them to decode the final token.

## 6\. Submit Recovery Keys

Enter recovery keys one at a time until you reach the threshold (3/3):

```
vault operator generate-root
# Enter Unseal Key when prompted
```

Repeat for each key:

| Attempt | Command                      | Progress |
| ------- | ---------------------------- | -------- |
| 1       | vault operator generate-root | 1/3      |
| 2       | vault operator generate-root | 2/3      |
| 3       | vault operator generate-root | 3/3      |

After the third key, you’ll receive an **Encoded Token**:

```
Encoded Token: JBoVSgEbPDI6QQNZJmQeKSYhP3MgVnUKPzIH0Q
```

## 7\. Decode the New Root Token

Use the `Encoded Token` and `OTP` to retrieve the actual root token:

```
vault operator generate-root \
  -decode="JBoVSgEbPDI6QQNZJmQeKSYhP3MgVnUKPzIH0Q" \
  -otp="LlfdKVI8pV5pQZQExfi10s5LIRvws"
```

Result:

```
hvs.jMupJyUlV5DxCYB0c9CMdPj
```

## 8\. Authenticate with the New Root Token

Log in with your newly generated root token:

```
vault login hvs.jMupJyUlV5DxCYB0c9CMdPj
```

Expected output:

```
Success! You are now authenticated.
token                 hvs.jMupJyUlV5DxCYB0c9CMdPj
token_policies        ["root"]
```

## 9\. Verify Restored Access

Confirm Vault is functional again:

```
vault policy list
vault secrets enable aws
# → Enables the AWS secrets engine
```

### Example HCL Policy

```
path "sys/tools/hash" {
  capabilities = ["update"]
}


path "identity/oidc/provider/+authorize" {
  capabilities = ["read", "update"]
}
```

---

Regenerating the root token with recovery keys ensures you can restore full access even if the original token is lost or revoked. For more details, see the [Vault CLI Generate-Root Documentation](https://www.vaultproject.io/docs/commands/operator/generate-root).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/f15c55a1-02f2-423f-83b3-c490a745aabb)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b59936f2-3ed0-4ec2-b1fd-971dcce5c2ca/lesson/1ad448b4-a6f6-4003-9e2f-487e6c3bb3e4)**
>
> Practice lab
