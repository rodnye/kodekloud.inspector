# Create a Paths Filter - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/HashiCorp-Certified-Vault-Operations-Professional-2022/Scale-Vault-for-Performance/Create-a-Paths-Filter)

---

## Table of Contents

- Create a Paths Filter
  - Why Path Filters Matter
  - Allowlist Mode
  - Denylist Mode
  - Local Mounts
  - Configuring a Paths Filter
  - Links and References
  - Watch Video
    - Using the Vault UI
    - Using the Vault CLI

---

## Content

HashiCorp Certified: Vault Operations Professional 2022

Scale Vault for Performance

# Create a Paths Filter

In this lesson, you’ll learn how to use Vault’s **path filter** feature to control which mounts and namespaces are replicated between clusters. This is especially useful when your primary and secondary clusters span different regions with varying regulatory requirements (for example, GDPR in Europe).

## Why Path Filters Matter

Vault can replicate all data from a primary cluster to one or more performance replica clusters. However, cross-region replication may conflict with data residency laws. For instance, you might store [personally identifiable information (PII)](https://en.wikipedia.org/wiki/Personally_identifiable_information)—addresses, phone numbers, credit card details—under a Secrets Engine mount. European Union regulations like [GDPR](https://gdpr.eu/) forbid sending such data outside the EU.

> [!important]
> **Warning**
>
> Replicating PII or sensitive data outside regulated regions can lead to compliance violations and hefty fines under laws like GDPR.

![The image illustrates data replication between a primary cluster in Europe and a secondary cluster in APAC, highlighting regulatory compliance considerations like GDPR. It includes labeled data categories and a note on performance replication.](https://kodekloud.com/kk-media/image/upload/v1752878594/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Create-a-Paths-Filter/data-replication-europe-apac-gdpr.jpg)

In this example, sending `customers/` or `credit-cards/` from an EU primary to an APAC secondary would breach GDPR.

![The image illustrates data replication between a primary cluster in Europe and a secondary cluster in APAC, highlighting that certain data (e.g., customer data) may be restricted from replication due to regulatory compliance like GDPR.](https://kodekloud.com/kk-media/image/upload/v1752878596/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Create-a-Paths-Filter/data-replication-europe-apac-gdpr-2.jpg)

To enforce compliance, Vault’s **path filter** lets you define either:

- An **allowlist** (only specified paths replicate), or
- A **denylist** (all except specified paths replicate).

| Mode      | Behavior                                     | Example Use Case                                    |
| --------- | -------------------------------------------- | --------------------------------------------------- |
| Allowlist | Only listed paths are replicated.            | Replicate EU-only Secrets Engines to an EU replica. |
| Denylist  | All paths except listed ones are replicated. | Exclude PII mounts when replicating globally.       |

Path filters apply to any Vault path: secrets-engine mounts, auth methods, or namespaces.

## Allowlist Mode

Use an allowlist when you want to **whitelist** only certain mounts. Suppose your primary cluster has mounts:

```
aws/       kv/        cloud-team/  dev/       apps/
ansible/   customers/ help-desk/   automation/
```

Defining an allowlist with `kv/`, `cloud-team/`, `dev/`, `apps/`, and `ansible/` means **only** those five will replicate; the rest are excluded.

![The image explains a "Paths Filter - Allowlist" concept, showing which paths are included for replication to a secondary system, with a list of paths that will and will not be replicated.](https://kodekloud.com/kk-media/image/upload/v1752878597/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Create-a-Paths-Filter/paths-filter-allowlist-replication-diagram.jpg)

## Denylist Mode

A denylist lets you replicate everything **except** the paths you exclude. For example, with mounts:

```
gcp/        secrets/   eu-data/      k8s/
puppet/     rdt-team/  engineering-mobile/
```

Excluding `eu-data/`, `certificates/`, and `encryption/` results in all mounts replicating **except** those three.

![The image explains a "Paths Filter - Denylist" concept, showing that all paths will be replicated except for those on the denylist, which includes "eu-data/", "certificates/", and "encryption/".](https://kodekloud.com/kk-media/image/upload/v1752878598/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Create-a-Paths-Filter/paths-filter-denylist-concept-diagram.jpg)

## Local Mounts

If you need a mount to exist **only** on a secondary cluster (never replicated elsewhere), enable it with the `-local` flag:

```
vault secrets enable -local -path=apac kv-v2
```

This command configures a KV v2 mount at `apac/` on the secondary cluster (e.g., APAC) that does **not** replicate back to the primary or other replicas. You can also use `-local` on the primary if you need non-replicated mounts there.

> [!important]
> **Note**
>
> Local mounts are ideal for region-specific workloads or test data that must not propagate.

![The image illustrates a concept of local mounts in a database cluster setup, showing a primary cluster in Europe and a secondary cluster in APAC, with a focus on preventing certain data from being replicated across the replica set.](https://kodekloud.com/kk-media/image/upload/v1752878599/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Create-a-Paths-Filter/local-mounts-database-cluster-setup.jpg)

## Configuring a Paths Filter

### Using the Vault UI

1.  In the **Performance Replication** section, add a new secondary cluster.
2.  Provide a **Secondary ID** and default **TTL**.
3.  Scroll to **Filtered Paths**.
4.  Select **Allowlist** or **Denylist**, then enter the desired paths.

![The image is a guide on creating a paths filter for a secondary token in a performance cluster, with instructions on configuring settings, selecting list types, and adding paths. It includes a Vault certification badge and a cartoon character illustration.](https://kodekloud.com/kk-media/image/upload/v1752878601/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Create-a-Paths-Filter/paths-filter-guide-performance-cluster.jpg)

### Using the Vault CLI

Run:

```
vault write sys/replication/performance/primary/paths-filter/us-east-dr \
    mode=allow \
    paths=aws/,hcvop/,customers/
```

- `us-east-dr` is the **Secondary ID**
- `mode=allow` selects allowlist mode
- `paths=` lists the mounts to replicate

![The image shows a configuration screen for creating a paths filter, with settings for a mount filter config for "us-east-dr" in allow mode, and paths including "aws/", "customers/", and "hcvop/". It also features a Vault certification badge and a cartoon character.](https://kodekloud.com/kk-media/image/upload/v1752878602/notes-assets/images/HashiCorp-Certified-Vault-Operations-Professional-2022-Create-a-Paths-Filter/paths-filter-configuration-us-east-dr.jpg)

---

That wraps up how to configure allowlists, denylists, and local mounts in Vault’s performance replication. Experiment with these settings in your environment to meet your compliance and performance goals.

## Links and References

- [Personally Identifiable Information (PII)](https://en.wikipedia.org/wiki/Personally_identifiable_information)
- [General Data Protection Regulation (GDPR)](https://gdpr.eu/)
- [Vault Performance Replication](https://www.vaultproject.io/docs/enterprise/replication/performance)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/hashicorp-certified-vault-operations-professional-2022/module/b6a41fdb-447c-43b2-9489-6c8459821fab/lesson/21b5dacd-4317-4676-a7d4-a4b9170e1284)**
>
> Watch video content
