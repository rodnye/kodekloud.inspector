# Mozilla SOPS - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Secret-Management-Sign-Verification/Mozilla-SOPS)

---

## Table of Contents

- Mozilla SOPS
  - Overview
  - What Is PGP/GPG?
  - Step 1: Generate a GPG Key
  - Step 2: Store the Private Key in Kubernetes
  - Step 3: Encrypt a Kubernetes Secret with SOPS
  - Step 4: Decrypt with Flux’s Kustomize Controller
  - Watch Video

---

## Content

GitOps with FluxCD

Secret Management Sign Verification

# Mozilla SOPS

In this guide, you’ll learn how to use Mozilla SOPS with PGP (GPG) to securely encrypt and manage Kubernetes secrets in Git repositories.

## Overview

SOPS (Secrets OPerationS) lets you encrypt structured files—YAML, JSON, and ENV—so they can be safely stored in public Git repos. It integrates with multiple key management systems:

| Provider        | URI Scheme          |
| --------------- | ------------------- |
| Google KMS      | `gcp-kms://…`       |
| AWS KMS         | `awskms://…`        |
| Azure Key Vault | `azurekeyvault://…` |
| HashiCorp Vault | `vault://…`         |
| PGP/GPG         | `pgp:KEYID`         |

> [!important]
> **Learn More**
>
> For full SOPS documentation, see the Mozilla SOPS [GitHub repository](https://github.com/mozilla/sops).

## What Is PGP/GPG?

- **PGP**: Pretty Good Privacy
- **GPG**: GNU Privacy Guard (OpenPGP implementation)

Both provide strong encryption and decryption for secure data handling.

## Step 1: Generate a GPG Key

Create a 3072-bit RSA key without passphrase or expiration:

```
gpg --batch --full-generate-key <<EOF
%no-protection
Key-Type: RSA
Key-Length: 3072
Subkey-Type: RSA
Subkey-Length: 3072
Expire-Date: 0
Name-Comment: k8s
Name-Real: prod.us-e1.k8s
Name-Email: admin@bb.com
EOF
```

Verify the fingerprint:

```
gpg: key CDF0BCF69E51F marked as ultimately trusted
```

List and export your keys:

```
# List the public key
gpg --list-keys CDF0BCF69E51F


# Export public and private keys
gpg --export --armor CDF0BCF69E51F > sops.pub.asc
gpg --export-secret-keys --armor CDF0BCF69E51F > sops.private.asc
```

## Step 2: Store the Private Key in Kubernetes

Create a Kubernetes Secret in the `flux-system` namespace:

```
kubectl create secret generic sops-gpg \
  --namespace flux-system \
  --from-file=sops.asc=sops.private.asc
```

Then delete the local key files:

```
gpg --delete-secret-keys CDF0BCF69E51F
gpg --delete-keys CDF0BCF69E51F
```

> [!important]
> **Security Warning**
>
> Never commit `sops.private.asc` to Git. Only `sops.pub.asc` should be versioned.

## Step 3: Encrypt a Kubernetes Secret with SOPS

Follow these steps:

1.  Generate a plain Secret manifest:

    ```
    kubectl create secret generic password \
      --from-literal=password='s1d0hDn#t' \
      --dry-run=client -o yaml > secret.yaml
    ```

2.  Import the public key:

    ```
    gpg --import sops.pub.asc
    ```

3.  Encrypt the file (or specific fields):

    ```
    sops --encrypt \
      --encrypted-regex '^(data|stringData)$' \
      --pgp CDF0BCF69E51F \
      --in-place secret.yaml
    ```

    Encrypted `secret.yaml`:

    ```
    apiVersion: v1
    kind: Secret
    metadata:
      name: password
    data:
      password: ENC[AES256_GCM,data:…,iv:…,tag:…,type:str]
    ```

4.  Commit the encrypted `secret.yaml` to your Git repository.

## Step 4: Decrypt with Flux’s Kustomize Controller

Configure your `Kustomization` to enable SOPS decryption:

```
apiVersion: kustomize.toolkit.fluxcd.io/v1beta1
kind: Kustomization
metadata:
  name: my-app
spec:
  interval: 10m
  path: "./path/to/manifests"
  prune: true
  sourceRef:
    kind: GitRepository
    name: app-repo
  decryption:
    provider: sops
    secretRef:
      name: sops-gpg
```

With this setup, Flux’s Kustomize Controller will use the `sops-gpg` secret to decrypt and apply your `secret.yaml` inside the cluster.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/c8ad2608-2804-4413-9041-5e8dc9126d53/lesson/15b95c3f-e39f-45bc-bf89-751962d85de3)**
>
> Watch video content
