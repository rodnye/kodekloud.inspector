# Demo Unsealing with Auto Unseal - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Associate-Certification/Learning-the-Vault-Architecture/Demo-Unsealing-with-Auto-Unseal)

---

## Table of Contents

- Demo Unsealing with Auto Unseal
  - Prerequisites
  - 1. Check Current Vault Status
  - 2. Review the Vault Configuration
  - 3. Add the AWS KMS Seal Stanza
  - 4. Restart Vault and Verify Seal Type
  - 5. Initialize the Vault Cluster
  - 6. Use Vault as Usual
  - 7. Confirm Auto-Unseal After Restart
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Associate Certification

Learning the Vault Architecture

# Demo Unsealing with Auto Unseal

In this guide, you’ll configure HashiCorp Vault to use **AWS KMS** for automatic unsealing. By leveraging Cloud Auto Unseal, you eliminate the operational overhead of manual unseal keys and enhance your security posture.

## Prerequisites

- An EC2 instance running [Vault](https://www.vaultproject.io/)
- A Customer Managed Key (CMK) in AWS KMS (e.g., **Vault Unseal Key**)

---

## 1\. Check Current Vault Status

SSH into your Vault server and run:

```
vault status
```

Example output:

```
Key                 Value
---                 -----
Seal Type           shamir
Initialized         false
Sealed              true
Total Shares        0
Threshold           0
Unseal Progress     0/0
Unseal Nonce        n/a
Version             1.7.1
Storage Type        raft
HA Enabled          true
```

Vault is not yet initialized and uses the default Shamir seal.

> [!important]
> **Note**
>
> By default, Vault uses [Shamir’s Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing) for unsealing. We’ll replace this with AWS KMS.

---

## 2\. Review the Vault Configuration

Open `/etc/vault.d/vault.hcl`:

```
cat /etc/vault.d/vault.hcl
```

```
storage "raft" {
  path    = "/opt/vault/data"
  node_id = "node-a-us-east-1"
  retry_join {
    auto_join = "provider=aws region=us-east-1 tag_key=vault tag_value=us-east-1"
  }
}

listener "tcp" {
  address         = "0.0.0.0:8200"
  cluster_address = "0.0.0.0:8201"
  tls_disable     = 1
}

api_addr     = "http://10.0.1.37:8200"
cluster_addr = "http://10.0.1.37:8201"
cluster_name = "vault-prod-us-east-1"
ui           = true
log_level    = "INFO"
```

There’s no `seal` stanza yet—this is where we’ll plug in our AWS KMS configuration.

---

## 3\. Add the AWS KMS Seal Stanza

1.  In the AWS Console, go to **KMS → Customer managed keys** and copy your CMK ARN (for example: `arn:aws:kms:us-east-1:123456789012:key/abcd1234-5678-90ab-cdef-EXAMPLEKEY`).

> [!important]
> **Warning**
>
> Treat your KMS key ARN and Vault configuration file as sensitive information. Do _not_ expose them in public repositories.

2.  Edit the Vault HCL:

```
sudo vi /etc/vault.d/vault.hcl
```

3.  Insert the `awskms` seal stanza anywhere in the file:

```
seal "awskms" {
  region     = "us-east-1"
  kms_key_id = "arn:aws:kms:us-east-1:123456789012:key/abcd1234-5678-90ab-cdef-EXAMPLEKEY"
}
```

4.  Your complete configuration should now be:

```
storage "raft" {
  path    = "/opt/vault/data"
  node_id = "node-a-us-east-1"
  retry_join = [
    "provider=aws region=us-east-1 tag_key=vault tag_value=us-east-1"
  ]
}

seal "awskms" {
  region     = "us-east-1"
  kms_key_id = "arn:aws:kms:us-east-1:123456789012:key/abcd1234-5678-90ab-cdef-EXAMPLEKEY"
}

listener "tcp" {
  address         = "0.0.0.0:8200"
  cluster_address = "0.0.0.0:8201"
  tls_disable     = 1
}

api_addr     = "http://10.0.1.37:8200"
cluster_addr = "http://10.0.1.37:8201"
cluster_name = "vault-prod-us-east-1"
ui           = true
log_level    = "INFO"
```

---

## 4\. Restart Vault and Verify Seal Type

Restart the Vault service:

```
sudo systemctl restart vault
```

Check the new status:

```
vault status
```

| Key                   | Value  |
| --------------------- | ------ |
| Seal Type             | awskms |
| Initialized           | false  |
| Sealed                | true   |
| Total Recovery Shares | 0      |
| Threshold             | 0      |
| Version               | 1.7.1  |
| Storage Type          | raft   |
| HA Enabled            | true   |

Vault is now configured to auto-unseal with AWS KMS, but still needs initialization.

---

## 5\. Initialize the Vault Cluster

Initialize Vault:

```
vault operator init
```

Example output:

```
Recovery Key 1:  qDfLTvJNhT3Dgj8UWaep9o2qgQZcVq/+w6QXQ4Tq+
...
Recovery Key 5:  2/FshgVlCzLhqhG+C0M0azU3ry82c2KhmKSUpelv

Initial Root Token: s.7gu7dshRlK1KNoq8B9dFme

Success! Vault is initialized with 5 recovery shares and a threshold of 3.
```

Re-run `vault status`:

```
vault status
```

```
Key                     Value
---                     -----
Seal Type               awskms
Recovery Seal Type      shamir
Initialized             true
Sealed                  false
Total Recovery Shares   5
Threshold               3
Version                 1.7.1
Storage Type            raft
Cluster Name            vault-prod-us-east-1
Cluster ID              6245bbfd-8db5-b507-f689-ba48628ad2a5
HA Enabled              true
HA Cluster              http://10.0.1.37:8201
HA Mode                 active
```

Vault is now **unsealed automatically** via AWS KMS.

---

## 6\. Use Vault as Usual

Authenticate with the root token:

```
vault login s.7gu7dshRlK1KNoq8B9dFme
```

Enable and list secrets engines:

```
vault secrets enable azure
vault secrets list
```

```
Path          Type        Accessor
----          ----        --------
azure/        azure       azure_6d868445
cubbyhole/    cubbyhole   cubbyhole_2e79ae0c
identity/     identity    identity_65b04cae
sys/          system      system_9d391d96
```

Everything works without manual unseal steps.

---

## 7\. Confirm Auto-Unseal After Restart

Restart Vault again:

```
sudo systemctl restart vault
vault status
```

Vault remains **unsealed** thanks to AWS KMS auto-unseal, eliminating manual recovery.

---

Congratulations! You’ve successfully set up **Cloud Auto Unseal** with AWS KMS. This configuration streamlines your Vault operations and boosts security by removing manual unseal key handling.

## Links and References

- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs)
- [AWS KMS Customer Managed Keys](https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html)
- [Shamir’s Secret Sharing on Wikipedia](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-associate-certification/module/f544757d-0901-47a3-a0e6-d9ab7822ef7a/lesson/5ffd0124-fe78-4323-8e44-42841ed4fd23)**
>
> Watch video content
