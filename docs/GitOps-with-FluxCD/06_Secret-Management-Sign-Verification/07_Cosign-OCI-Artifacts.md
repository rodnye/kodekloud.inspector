# Cosign OCI Artifacts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Secret-Management-Sign-Verification/Cosign-OCI-Artifacts)

---

## Table of Contents

- Cosign OCI Artifacts
  - 1. Package and Push Manifests as an OCI Artifact
  - 2. Install Cosign and Generate a Key Pair
  - 3. Sign the OCI Artifact
  - 4. Verify the Artifact Manually
  - 5. Store the Public Key in Kubernetes
  - 6. Configure Flux to Verify OCI Artifacts
  - 7. Inspect the Verification Status
  - CLI Commands at a Glance
  - Links and References
  - Watch Video

---

## Content

GitOps with FluxCD

Secret Management Sign Verification

# Cosign OCI Artifacts

In this guide, you’ll learn how to sign and verify OCI artifacts using [SigStore](https://sigstore.dev)’s [Cosign](https://github.com/sigstore/cosign) alongside [Flux](https://fluxcd.io). By the end, you’ll be able to:

1.  Package Kubernetes manifests into an OCI artifact
2.  Sign the artifact with Cosign
3.  Configure Flux to verify signatures on pull

> [!important]
> **Prerequisites**
>
> - Flux v0.35+ installed and configured
> - `docker` and `kubectl` CLI tools available
> - Access to a container registry (e.g., GitHub Container Registry)

---

## 1\. Package and Push Manifests as an OCI Artifact

Assume your repository has Nginx manifests structured like this:

```
nginx/
└── manifests/
    ├── deployment.yaml
    └── service.yaml
```

Authenticate with your registry and push:

```
docker login ghcr.io \
  --username sid \
  --password <GitHub-Personal-Access-Token>

flux push artifact oci://ghcr.io/sid/nginx:7.7.0-1a2b3c4d \
  --path="./nginx/manifests" \
  --source="$(git config --get remote.origin.url)" \
  --revision="7.7.0-1a2b3c4d"
```

Expected output:

```
✔ pushing to ghcr.io/sid/nginx:7.7.0-1a2b3c4d
✔ artifact successfully pushed to ghcr.io/sid/nginx@sha256:235b486df438f015861f86dfa386d4fa
```

---

## 2\. Install Cosign and Generate a Key Pair

Download the latest Cosign release and make it executable:

```
wget https://github.com/sigstore/cosign/releases/latest/download/cosign-linux-amd64 \
  -O /usr/local/bin/cosign \
  && chmod +x /usr/local/bin/cosign
```

Generate your key pair:

```
cosign generate-key-pair
```

You’ll be prompted to create a passphrase:

```
Enter password for private key: ********
Enter password for private key again: ********
Private key written to cosign.key
Public key written to cosign.pub
```

> [!important]
> **Protect Your Keys**
>
> Store your `cosign.key` in a secure vault. Loss or compromise of the private key may allow unauthorized signatures.

---

## 3\. Sign the OCI Artifact

Use your private key to sign the pushed artifact:

```
cosign sign \
  --key cosign.key \
  ghcr.io/sid/nginx:7.7.0-1a2b3c4d
```

Provide the passphrase when prompted. Cosign uploads the signature alongside the image.

---

## 4\. Verify the Artifact Manually

Confirm the signature before deploying:

```
cosign verify \
  --key cosign.pub \
  ghcr.io/sid/nginx:7.7.0-1a2b3c4d
```

You should see:

```
Verification for ghcr.io/sid/nginx:7.7.0-1a2b3c4d --
✔ Signature validated
✔ Certificate validated
```

---

## 5\. Store the Public Key in Kubernetes

Flux verifies signatures by reading your public key from a Kubernetes Secret:

```
kubectl -n flux-system create secret generic cosign-pub \
  --from-file=cosign.pub=cosign.pub
```

---

## 6\. Configure Flux to Verify OCI Artifacts

Create an `OCIRepository` resource that enforces signature verification:

```
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: OCIRepository
metadata:
  name: demo-source-oci
  namespace: flux-system
spec:
  interval: 1m0s
  provider: generic
  url: oci://ghcr.io/sid/nginx
  ref:
    tag: 7.7.0-1a2b3c4d
  secretRef:
    name: ghcr-auth
  verify:
    provider: cosign
    secretRef:
      name: cosign-pub
```

When Flux pulls this artifact, it will:

- Fetch the OCI layer
- Verify the signature against the supplied public key
- Abort on failure or extract the tarball on success

---

## 7\. Inspect the Verification Status

Check the status of your OCIRepository:

```
kubectl -n flux-system get ocirepositories demo-source-oci -o yaml
```

Relevant status snippet:

```
status:
  conditions:
    - type: SourceVerified
      status: "True"
      reason: Succeeded
      message: verified signature of revision 7.7.0-1a2b3c4d
      lastTransitionTime: "2023-03-03T14:36:10Z"
```

If signature verification fails, Flux will not apply the artifact.

---

## CLI Commands at a Glance

| Command                                    | Description                           |
| ------------------------------------------ | ------------------------------------- |
| `flux push artifact ...`                   | Push manifests as an OCI artifact     |
| `cosign generate-key-pair`                 | Generate a private/public key pair    |
| `cosign sign --key cosign.key ...`         | Sign an OCI artifact                  |
| `cosign verify --key cosign.pub ...`       | Verify a signature on an OCI artifact |
| `kubectl create secret generic cosign-pub` | Store Cosign public key in Kubernetes |

---

## Links and References

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Flux GitHub Repository](https://github.com/fluxcd/flux)
- [SigStore Cosign](https://github.com/sigstore/cosign)
- [GitHub Container Registry](https://ghcr.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/c8ad2608-2804-4413-9041-5e8dc9126d53/lesson/86ab7d9b-31ac-45a0-8511-c0f5898e9744)**
>
> Watch video content
