# DEMO Mozilla SOPS Developer - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Secret-Management-Sign-Verification/DEMO-Mozilla-SOPS-Developer)

---

## Table of Contents

- DEMO Mozilla SOPS Developer
  - Prerequisites
  - Table of Contents
  - 1. Prepare the Repository
  - 2. Import the Public PGP Key
  - 3. Install SOPS
  - 4. Encrypt the Secret with SOPS
  - 5. Commit and Push
  - 6. Configure FluxCD Decryption
  - 7. Verify Decrypted Secret in Cluster
  - Links and References
  - Watch Video
  - Practice Lab
    - Encryption Backends Supported by SOPS

---

## Content

GitOps with FluxCD

Secret Management Sign Verification

# DEMO Mozilla SOPS Developer

Learn how to encrypt and manage your Kubernetes secrets in Git using [Mozilla SOPS](https://github.com/mozilla/sops) with a PGP key, then let FluxCD decrypt them automatically on apply.

## Prerequisites

- A Git repository with your application code checked out.
- Administrator-generated PGP keypair (public key committed in `infrastructure/SOPS/`).
- FluxCD installed in your cluster.
- `gpg`, `git`, `wget`, and `kubectl` available on your machine.

---

## Table of Contents

1.  [Prepare the Repository](#prepare-the-repository)
2.  [Import the Public PGP Key](#import-the-public-pgp-key)
3.  [Install SOPS](#install-sops)
4.  [Encrypt the Secret with SOPS](#encrypt-the-secret-with-sops)
5.  [Commit and Push](#commit-and-push)
6.  [Configure FluxCD Decryption](#configure-fluxcd-decryption)
7.  [Verify Decrypted Secret in Cluster](#verify-decrypted-secret-in-cluster)

---

## 1\. Prepare the Repository

Switch to your infrastructure branch and restore the plaintext secret for re-encryption.

```
cd bb-app-source/
git checkout infrastructure
```

> [!important]
> **Warning**
>
> Always back up existing sealed or encrypted secrets before modifying them.

| Action                            | Command                                                                      |
| --------------------------------- | ---------------------------------------------------------------------------- |
| Backup old Bitnami Sealed Secret  | `mv database/secret-mysql-sealed.yaml database/secret-mysql-sealed.yaml.bak` |
| Restore plaintext secret manifest | `mv database/secret-mysql-backup.yaml database/secret-mysql.yaml`            |

Verify the plaintext `Secret` at `database/secret-mysql.yaml`:

```
apiVersion: v1
kind: Secret
metadata:
  name: secret-mysql
  namespace: database
stringData:
  password: mysql-password-0123456789
```

---

## 2\. Import the Public PGP Key

On a fresh developer machine, confirm you have no existing public keys:

```
gpg --list-public-keys
# -> (no keys found)
```

Import the administrator’s public key:

```
gpg --import infrastructure/SOPS/dev-us-e1-k8s.pub
```

Validate the import and note the fingerprint (e.g., `CE284BB236654E42A`):

```
gpg --list-public-keys
# gpg: key CE284BB236654E42: public key "dev.us.e1.k8s (k8s) <admin@bb.com>" imported
```

> [!important]
> **Note**
>
> You will use the PGP fingerprint with the `sops` CLI to encrypt your secret.

---

## 3\. Install SOPS

Install the SOPS binary if it’s not already present:

```
cd ~
wget https://github.com/mozilla/sops/releases/download/v3.7.3/sops-v3.7.3.linux.amd64
chmod +x sops-v3.7.3.linux.amd64
sudo mv sops-v3.7.3.linux.amd64 /usr/local/bin/sops
```

Confirm the installation:

```
sops --version
# sops version 3.7.3
```

---

## 4\. Encrypt the Secret with SOPS

Navigate to the directory containing your plaintext secret:

```
cd bb-app-source/database
cat secret-mysql.yaml
```

Encrypt only the `data` and `stringData` sections in place:

```
sops --encrypt \
  --encrypted-regex="^(data|stringData)$" \
  --pgp CE284BB236654E42A \
  --in-place secret-mysql.yaml
```

After encryption, `secret-mysql.yaml` will include an `sops:` block:

```
apiVersion: v1
kind: Secret
metadata:
  name: secret-mysql
  namespace: database
stringData:
  password: ENC[AES256_GCM,data:...,iv:...]
sops:
  pgp:
    created_at: "2023-04-06T18:35:26Z"
    enc: |
      -----BEGIN PGP MESSAGE-----
      hQGMAxQRIka4bFJ8AQv/...
      -----END PGP MESSAGE-----
  mac: ENC[AES256_GCM,data:...]
  lastmodified: "2023-04-06T18:35:29Z"
```

### Encryption Backends Supported by SOPS

| Backend         | Description                                     |
| --------------- | ----------------------------------------------- |
| PGP             | Public-key encryption via GnuPG / GPG           |
| AWS KMS         | Key management using AWS Key Management Service |
| GCP KMS         | Google Cloud Key Management Service integration |
| Azure Key Vault | Microsoft Azure Key Vault integration           |
| HashiCorp Vault | Vault secret engine encryption                  |

---

## 5\. Commit and Push

Add the encrypted secret to your Git repository and push:

```
git add database/secret-mysql.yaml
git commit -m "chore: encrypt secret-mysql.yaml with SOPS"
git push origin infrastructure
```

---

## 6\. Configure FluxCD Decryption

FluxCD needs the private key stored in a Kubernetes `Secret` (e.g., `sops-gpg`) and decryption enabled in the `Kustomization` manifest.

Edit `infrastructure/flux/kustomization-database.yaml`:

```
apiVersion: kustomize.toolkit.fluxcd.io/v1beta2
kind: Kustomization
metadata:
  name: infra-database-mysql
  namespace: flux-system
spec:
  interval: 10s
  path: "./database"
  prune: true
  sourceRef:
    kind: GitRepository
    name: infra-source-git
  targetNamespace: database
  decryption:
    provider: sops
    secretRef:
      name: sops-gpg
```

Commit and push the FluxCD configuration:

```
git add infrastructure/flux/kustomization-database.yaml
git commit -m "feat: enable SOPS decryption in Flux Kustomization"
git push origin infrastructure
```

For details, see [FluxCD Kustomization Documentation](https://fluxcd.io/docs/components/kustomize/kustomization/).

---

## 7\. Verify Decrypted Secret in Cluster

Trigger reconciliation and inspect the applied secret:

```
flux reconcile source git flux-system
flux reconcile kustomization infra-database-mysql


kubectl -n database get secret secret-mysql -o json \
  | jq -r .data.password | base64 -d
# => mysql-password-0123456789
```

You should see the original plaintext password, confirming that FluxCD decrypted the secret before applying it.

---

## Links and References

- [Mozilla SOPS Releases](https://github.com/mozilla/sops/releases)
- [GnuPG (GPG) Documentation](https://gnupg.org/documentation/)
- [FluxCD Kustomization Docs](https://fluxcd.io/docs/components/kustomize/kustomization/)
- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/c8ad2608-2804-4413-9041-5e8dc9126d53/lesson/6f504936-daab-4ee3-8063-793bc83a9329)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/c8ad2608-2804-4413-9041-5e8dc9126d53/lesson/9ae09784-a5ae-481c-a4f1-cf7d338e2713)**
>
> Practice lab
