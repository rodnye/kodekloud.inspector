# Demo Performance Replication - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Scale-Vault-for-Performance/Demo-Performance-Replication)

---

## Table of Contents

- Demo Performance Replication
  - Cluster Details
  - 1. Enable Performance Replication on the Primary
  - 2. Enable Performance Replication on the Secondary
  - 3. Verify Replication Status
  - 4. Token & Unseal Key Behavior
  - 5. Replicating Auth Methods, Secrets Engines & Data
  - Conclusion
  - Links and References
  - Watch Video

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Scale Vault for Performance

# Demo Performance Replication

In this tutorial, you’ll configure Vault Enterprise performance replication between two clusters—a primary and a secondary. Performance replication streams all changes on the primary (auth methods, secrets engines, data, audit logs, etc.) to the secondary, ensuring high-throughput, low-latency synchronization.

## Cluster Details

| Role      | IP Address   |
| --------- | ------------ |
| Primary   | 10.1.102.170 |
| Secondary | 10.1.102.156 |

---

## 1\. Enable Performance Replication on the Primary

1.  Authenticate to the primary cluster:

    ```
    ec2-user@ip-10-1-102-170:~$ vault login hvs.KYjTNrIdZaOPkriOuD5tfClA
    Success! You are now authenticated. Future Vault clients will automatically use this token.
    ```

2.  Enable the primary replication role:

    > [!important]
    > **Warning**
    >
    > Enabling the primary replication role will briefly make Vault unavailable. Expect a short service interruption.

    ```
    ec2-user@ip-10-1-102-170:~$ vault write -f sys/replication/performance/primary/enable
    WARNING! The following warnings were returned from Vault:
    * This cluster is being enabled as a primary for replication. Vault will be unavailable for a brief period and will resume service shortly.
    ```

3.  Generate a wrapped token for the secondary:

    ```
    ec2-user@ip-10-1-102-170:~$ vault write sys/replication/performance/primary/secondary-token id=hcvop-performance
    Key                           Value
    ---                           -----
    wrapping_token                eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    wrapping_token_ttl            30m
    wrapping_token_creation_time  2022-06-02T01:19:11.387715359Z +0000 UTC
    wrapping_token_creation_path  sys/replication/performance/primary/secondary-token
    ```

    > [!important]
    > **Note**
    >
    > Copy the `wrapping_token` value; you’ll need it to enable replication on the secondary node.

---

## 2\. Enable Performance Replication on the Secondary

1.  Authenticate to the secondary cluster:

    ```
    ec2-user@ip-10-1-102-156:~$ vault login hvs.AVecCoMzQSmLYTQ9ufdpRAZ
    Success! You are now authenticated.
    ```

2.  Initialize the secondary with the wrapped token:

    ```
    ec2-user@ip-10-1-102-156:~$ vault write sys/replication/performance/secondary/enable \
        token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    WARNING! The following warnings were returned from Vault:
    * Vault has successfully found secondary information; it may take a while to perform setup tasks. Vault will be unavailable until these tasks and the initial sync complete.
    ```

---

## 3\. Verify Replication Status

Run this command on **either** node to check the performance replication status:

```
ec2-user@ip-10-1-102-156:~$ vault read sys/replication/performance/status
Key                           Value
---                           -----
cluster_id                    d7c75ca6-1cc4-bc99-faa1-db2401ec56bf
connection_state              ready
known_primary_cluster_addrs   [https://10.1.102.170:8201]
mode                          secondary
state                         stream-wals
```

| Field                                | Description                                                   |
| ------------------------------------ | ------------------------------------------------------------- |
| connection\\\_state                  | `ready` indicates the link is active and healthy.             |
| mode                                 | `primary` or `secondary` role of this node.                   |
| state                                | Replication phase; `stream-wals` is continuous log streaming. |
| known\\\_primary\\\_cluster\\\_addrs | List of primary endpoint URLs.                                |

---

## 4\. Token & Unseal Key Behavior

Once performance replication is active, the secondary cluster adopts the primary’s unseal keys and root tokens.

- Attempting to log in with the old secondary root token fails:

  ```
  ec2-user@ip-10-1-102-156:~$ vault login hvs.AVecCoMzQSmYLytQ9ufdpRA2
  Error making API request.
  Code: 403. Errors:
  * permission denied
  ```

- Use the primary’s root token to authenticate on the secondary:

  ```
  ec2-user@ip-10-1-102-156:~$ vault login hvs.KYjTNrIdZaOPkriOuD5tfClA
  Success! You are now authenticated.
  ```

---

## 5\. Replicating Auth Methods, Secrets Engines & Data

All Vault configuration changes—enabled auth methods, secrets engines, user accounts, and KV data—on the primary automatically replicate to the secondary.

**Example: Enable `userpass` auth and create a user on the primary:**

```
# On primary:
ec2-user@ip-10-1-102-170:~$ vault auth enable userpass
Success! Enabled userpass auth method at: userpass/

ec2-user@ip-10-1-102-170:~$ vault write auth/userpass/users/bryan \
    password="bryan" policies="default"
Success! Data written to: auth/userpass/users/bryan
```

**Verify on the secondary:**

```
ec2-user@ip-10-1-102-156:~$ vault login -method=userpass username=bryan
Password (will be hidden):
Success! Token policies: ["default"]
```

> [!important]
> **Note**
>
> Service tokens created on the primary do _not_ replicate. Only Vault’s native auth methods and user credentials are mirrored.

---

## Conclusion

With performance replication enabled, your secondary cluster stays in near real-time sync with the primary, providing a robust high-throughput, low-latency replication solution for read scaling and disaster recovery readiness.

## Links and References

- [Vault Performance Replication](https://www.vaultproject.io/docs/enterprise/replication/performance)
- [HashiCorp Vault Replication Concepts](https://www.vaultproject.io/docs/concepts/replication)
- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b6a41fdb-447c-43b2-9489-6c8459821fab/lesson/75a4d87b-1685-42b3-8c6a-bb005b2ae5f3)**
>
> Watch video content
