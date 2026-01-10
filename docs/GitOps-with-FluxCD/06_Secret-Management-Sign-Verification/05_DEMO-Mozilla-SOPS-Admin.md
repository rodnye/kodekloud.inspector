# DEMO Mozilla SOPS Admin - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Secret-Management-Sign-Verification/DEMO-Mozilla-SOPS-Admin)

---

## Table of Contents

- DEMO Mozilla SOPS Admin
  - 1. Install & Review GPG
  - 2. Generate a GPG Key Pair
  - 3. List and Verify Your Keys
  - 4. Export Keys for SOPS & Flux
  - 5. Create a Kubernetes Secret for Flux
  - 6. Clean Up Local GPG Material
  - 7. Summary
  - Links and References
  - Watch Video
    - 4.1 Export the Private Key
    - 4.2 Export the Public Key

---

## Content

GitOps with FluxCD

Secret Management Sign Verification

# DEMO Mozilla SOPS Admin

In this guide, you’ll learn how to generate an OpenPGP key pair using `gpg`, export the keys for use with [Mozilla SOPS](https://github.com/mozilla/sops) and [FluxCD](https://fluxcd.io/), and then securely clean up local key material. This workflow enables encrypted secrets in GitOps pipelines, ensuring that only Flux can decrypt them in-cluster.

## 1\. Install & Review GPG

First, confirm that `gpg` is installed:

```
gpg --version
```

Then inspect common OpenPGP options:

| Option               | Description                     | Example                                  |
| -------------------- | ------------------------------- | ---------------------------------------- |
| `-o, --output`       | Write output to a specific file | `gpg -o file.txt --decrypt secret.gpg`   |
| `-s, --sign`         | Create a signature              | `gpg -s document.txt`                    |
| `-e, --encrypt`      | Encrypt for specified recipient | `gpg -e -r alice document.txt`           |
| `--list-keys`        | List public keys                | `gpg --list-keys alice`                  |
| `--list-secret-keys` | List secret keys                | `gpg --list-secret-keys`                 |
| `--armor`            | ASCII-armored output            | `gpg --armor --export alice@example.com` |

> [!important]
> **Note**
>
> You can run `gpg --help` for a full list of options. Use `--openpgp` to enforce strict OpenPGP behavior.

## 2\. Generate a GPG Key Pair

Create a 3072-bit RSA primary key and subkey with no passphrase or expiration. Replace the real name, email, and comment as needed:

```
gpg --batch --full-generate-key \
  --passphrase '' \
  --key-length 3072 \
  --subkey-length 3072 \
  --exp-date 0 \
  --name-real "dev.us-e1.k8s" \
  --name-email "admin@bb.com" \
  --comment "k8s"
```

When complete, note the **Key Fingerprint** in the output (e.g., `65DD426C08931CDEB33F4DCCE248B2366542A`). You’ll use this in subsequent commands.

## 3\. List and Verify Your Keys

View all public keys:

```
gpg --list-public-keys
```

Sample output:

```
pub   rsa3072 2023-04-06 [SCEA]
      65DD426C08931CDEB33F4DCCE248B2366542A
uid           [ultimate] dev.us-e1.k8s <admin@bb.com>
sub   rsa3072 2023-04-06 [SEA]
```

To filter by fingerprint:

```
gpg --list-public-keys 65DD426C08931CDEB33F4DCCE248B2366542A
```

And list secret keys:

```
gpg --list-secret-keys
```

## 4\. Export Keys for SOPS & Flux

### 4.1 Export the Private Key

```
gpg --export-secret-keys --armor 65DD426C08931CDEB33F4DCCE248B2366542A \
  > sops-gpg.key
```

> [!important]
> **Warning**
>
> Keep `sops-gpg.key` confidential. This private key will be stored in-cluster as a Kubernetes secret. Never commit it to Git.

### 4.2 Export the Public Key

Prepare a directory in your Git repository for the public key:

```
mkdir -p bb-app-source/sops
cd bb-app-source/sops
gpg --export --armor 65DD426C08931CDEB33F4DCCE248B2366542A \
  > sops-gpg.pub
```

Commit `sops-gpg.pub` so that developers can encrypt secrets:

```
git add sops-gpg.pub
git commit -m "Add SOPS public key for Flux decryption"
```

## 5\. Create a Kubernetes Secret for Flux

Import the private key into the `flux-system` namespace:

```
kubectl -n flux-system create secret generic sops-gpg \
  --from-file=sops.asc=sops-gpg.key
```

Verify the secret:

```
kubectl -n flux-system get secret sops-gpg
# NAME      TYPE    DATA   AGE
# sops-gpg  Opaque  1      30s
```

FluxCD will mount this secret to decrypt any SOPS-encrypted manifests in Git.

## 6\. Clean Up Local GPG Material

Once the keys are exported and stored:

```
rm sops-gpg.key


# Remove both public and secret keys from your local keyring:
gpg --delete-secret-and-public-keys 65DD426C08931CDEB33F4DCCE248B2366542A
```

Confirm deletion:

```
gpg --list-secret-keys 65DD426C08931CDEB33F4DCCE248B2366542A
gpg --list-public-keys 65DD426C08931CDEB33F4DCCE248B2366542A
# gpg: error reading key: No public key
```

## 7\. Summary

You have successfully:

1.  Generated a 3072-bit OpenPGP key pair without passphrase or expiry.
2.  Exported and committed the public key for developer usage.
3.  Created a Kubernetes secret containing the private key for FluxCD.
4.  Cleared all local key material to maintain security.

You’re now ready to encrypt secrets with `sops-gpg.pub` in your GitOps repository—Flux will automatically decrypt them in-cluster.

## Links and References

- [OpenPGP Official Site](https://www.openpgp.org/)
- [Mozilla SOPS GitHub](https://github.com/mozilla/sops)
- [FluxCD Documentation](https://fluxcd.io/docs/)
- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/c8ad2608-2804-4413-9041-5e8dc9126d53/lesson/1f64b743-b032-46e6-af75-c00467869125)**
>
> Watch video content
