# DEMO Install Cosign - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Secret-Management-Sign-Verification/DEMO-Install-Cosign)

---

## Table of Contents

- DEMO Install Cosign
  - Verify Cosign Is Not Installed
  - Installation Options
  - Verify Installation
  - Generate a Cosign Key Pair
  - Configure Flux CD with the Public Key
  - Next Steps
  - References
  - Watch Video
    - 1. Standalone Binary
    - 2. RPM Package
    - 3. DEB Package

---

## Content

GitOps with FluxCD

Secret Management Sign Verification

# DEMO Install Cosign

In this tutorial, you’ll install Sigstore’s Cosign binary, verify your setup, generate a key pair for signing OCI artifacts, and configure Flux CD to use the Cosign public key. By following these steps, you’ll enable secure supply chain workflows for container images.

## Verify Cosign Is Not Installed

First, confirm Cosign isn’t already available:

```
root@host:~# cosign version
bash: cosign: command not found
```

> [!important]
> **Note**
>
> Seeing `command not found` means Cosign isn’t installed. Continue to the installation methods below.

## Installation Options

Cosign is part of the [Sigstore project](https://sigstore.dev). Choose the method that best fits your environment:

| Method            | Use Case                | Example Command                        |
| ----------------- | ----------------------- | -------------------------------------- |
| Standalone Binary | Quick install on Linux  | Download, move to PATH, set executable |
| RPM Package       | RPM-based Linux distros | `sudo rpm -Uvh cosign-*.rpm`           |
| DEB Package       | Debian/Ubuntu systems   | `sudo dpkg -i cosign_*.deb`            |

### 1\. Standalone Binary

```
# Download the Cosign binary
wget "https://github.com/sigstore/cosign/releases/download/v2.0.0/cosign-linux-amd64"


# Move into your PATH and make executable
sudo mv cosign-linux-amd64 /usr/local/bin/cosign
sudo chmod +x /usr/local/bin/cosign
```

### 2\. RPM Package

```
wget "https://github.com/sigstore/cosign/releases/download/v2.0.0/cosign-2.0.0.x86_64.rpm"
sudo rpm -Uvh cosign-2.0.0.x86_64.rpm
```

### 3\. DEB Package

```
wget "https://github.com/sigstore/cosign/releases/download/v2.0.0/cosign_2.0.0_amd64.deb"
sudo dpkg -i cosign_2.0.0_amd64.deb
```

## Verify Installation

After installation, check your Cosign version:

```
root@host:~# cosign version
cosign: A tool for Container Signing, Verification and Storage in an OCI registry.
GitVersion:    v2.0.0
GitCommit:     d6b9001f8e6ed745fb845849d623274c897d55f2
BuildDate:     2023-02-23T19:26:35Z
GoVersion:     go1.20.1
Compiler:      gc
Platform:      linux/amd64
```

> [!important]
> **Tip**
>
> Ensure you install v2.0.0 or later for full compatibility with Flux CD’s image verification features.

## Generate a Cosign Key Pair

Create an asymmetric key pair to sign your OCI artifacts:

```
root@host:~# cosign generate-key-pair
Enter password for private key:
Enter password for private key again:
Private key written to cosign.key
Public key written to cosign.pub
```

Verify the files:

```
root@host:~# ls cosign.*
cosign.key  cosign.pub
```

> [!important]
> **Warning**
>
> Keep your private key (`cosign.key`) secure and never commit it to version control. Remember your password—it’s required for signing and verification.

## Configure Flux CD with the Public Key

To enable [Flux CD](https://fluxcd.io) to verify image signatures, store the public key as a Kubernetes Secret in the `flux-system` namespace:

```
root@host:~# kubectl -n flux-system create secret generic cosign-pub \
  --from-file=cosign.pub=cosign.pub
secret/cosign-pub created
```

Flux will automatically fetch this key and validate any signed OCI artifacts during reconciliation.

## Next Steps

1.  Build and push an OCI artifact (e.g., container image).
2.  Sign the image using Cosign.
3.  Observe Flux CD verifying the signature in your cluster.

## References

- [Sigstore Cosign Documentation](https://github.com/sigstore/cosign)
- [Flux CD Official Site](https://fluxcd.io)
- [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)
- [OCI Artifacts Specification](https://github.com/opencontainers/artifacts)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/c8ad2608-2804-4413-9041-5e8dc9126d53/lesson/4ec5c36f-d64b-4e15-bcbb-a4c113d84f49)**
>
> Watch video content
