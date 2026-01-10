# DEMO Cosign OCI Artifacts - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitOps-with-FluxCD/Secret-Management-Sign-Verification/DEMO-Cosign-OCI-Artifacts)

---

## Table of Contents

- DEMO Cosign OCI Artifacts
  - Prerequisites
  - 1. Prepare the Repository
  - 2. Authenticate to GitHub Container Registry
  - 3. Push the OCI Artifact with Flux
  - 4. Sign the Artifact with Cosign
  - 5. Verify the Signature Locally
  - 6. Configure Flux to Pull and Verify
  - 7. Confirm Verification and Deployment
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

GitOps with FluxCD

Secret Management Sign Verification

# DEMO Cosign OCI Artifacts

In this guide, we’ll walk through signing and verifying an OCI artifact using [Cosign](https://github.com/sigstore/cosign) and then configuring [Flux CD](https://fluxcd.io/) to fetch and verify that artifact before deploying it in Kubernetes.

## Prerequisites

- A fork or clone of the `bb-appsource-git` repository
- Docker CLI installed and authenticated
- A GitHub personal access token with **read:packages** and **write:packages** scopes
- [Flux CLI](https://fluxcd.io/docs/installation/) installed
- A Cosign key pair generated (`cosign.key` and `cosign.pub`)

---

## 1\. Prepare the Repository

1.  Switch to a new feature branch:

    ```
    git checkout -b 10-demo
    ```

2.  Under the `manifests/` folder, confirm you have:
    - `namespace.yaml`
    - `deployment.yaml`
    - `service.yaml`

3.  Verify your `deployment.yaml` uses version **7.10.0**:

    ```
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: block-buster
      labels:
        app: block-buster
        api: downward
        usage: global
    spec:
      replicas: 1
      selector:
        matchLabels:
          app: block-buster
      template:
        metadata:
          labels:
            app: block-buster
            env: dev
            version: 7.10.0
        spec:
          containers:
          - name: app
            image: siddharth67/block-buster-dev:7.10.0
            imagePullPolicy: Always
            resources:
              requests:
                cpu: "100m"
                memory: "256Mi"
    ```

---

## 2\. Authenticate to GitHub Container Registry

Log in to [GitHub Container Registry (GHCR)](https://ghcr.io/) using your username and personal access token:

```
docker login ghcr.io --username sidd-harth-2
# Enter your GHCR token when prompted
```

> [!important]
> **Note**
>
> Ensure your token has at least `read:packages` and `write:packages` scopes to push and pull images.

---

## 3\. Push the OCI Artifact with Flux

Package your manifests folder and push it as an OCI artifact:

```
flux push artifact \
  oci://ghcr.io/sidd-harth-2/bb-app:7.10.0-$(git rev-parse --short HEAD) \
  --path="./manifests" \
  --source="$(git config --get remote.origin.url)" \
  --revision="7.10.0/$(git rev-parse --short HEAD)"
```

Expected output:

```
pushing artifact to ghcr.io/sidd-harth-2/bb-app:7.10.0-d6c285f
artifact successfully pushed to ghcr.io/sidd-harth-2/bb-app:7.10.0-d6c285f@sha256:eda014...
```

Verify the new package under **Packages → bb-app** on GitHub.

---

## 4\. Sign the Artifact with Cosign

1.  Pull the image by tag:

    ```
    docker pull ghcr.io/sidd-harth-2/bb-app:7.10.0-d6c285f
    ```

2.  Sign by digest:

    ```
    cosign sign \
      --key ../cosign/cosign.key \
      ghcr.io/sidd-harth-2/bb-app@sha256:eda014...
    ```

Approve uploading to the transparency log when prompted. A `.sig` blob is now attached to your OCI package.

---

## 5\. Verify the Signature Locally

Use your public key to confirm the artifact’s integrity:

```
cosign verify \
  --key ../cosign/cosign.pub \
  ghcr.io/sidd-harth-2/bb-app@sha256:eda014...
```

You should see:

```
Verification for ghcr.io/sidd-harth-2/bb-app@sha256:eda014...
  - The cosign claims were validated
  - Evidence of claims in the transparency log was verified offline
  - The signatures were verified against the specified public key
```

---

## 6\. Configure Flux to Pull and Verify

1.  Change to your Flux cluster repo:

    ```
    cd ~/block-buster/flux-clusters/dev-cluster
    ```

2.  Create an `OCIRepository` source for GHCR:

    ```
    flux create source oci 10-demo-source-oci-bb-app \
      --url oci://ghcr.io/sidd-harth-2/bb-app \
      --tag 7.10.0-d6c285f \
      --secret-ref ghcr-auth \
      --provider generic \
      --export > 10-demo-source-oci-bb-app.yaml
    ```

3.  Edit **10-demo-source-oci-bb-app.yaml** to include Cosign verification:

    ```
    apiVersion: source.toolkit.fluxcd.io/v1beta2
    kind: OCIRepository
    metadata:
      name: 10-demo-source-oci-bb-app
      namespace: flux-system
    spec:
      interval: 1m0s
      provider: generic
      url: oci://ghcr.io/sidd-harth-2/bb-app
      ref:
        tag: 7.10.0-d6c285f
      secretRef:
        name: ghcr-auth
      verify:
        provider: cosign
        secretRef:
          name: cosign-pub
    ```

4.  Apply the source:

    ```
    kubectl apply -f 10-demo-source-oci-bb-app.yaml
    ```

5.  Ensure secrets exist:

    ```
    kubectl -n flux-system get secret ghcr-auth cosign-pub
    ```

6.  Create and apply a `Kustomization` to deploy the manifests:

    ```
    flux create kustomization 10-demo-kustomize-oci-bb-app \
      --source=OCIRepository/10-demo-source-oci-bb-app \
      --target-namespace=10-demo \
      --path="./" \
      --prune=false \
      --interval=10s \
      --export > 10-demo-kustomize-oci-bb-app.yaml


    kubectl apply -f 10-demo-kustomize-oci-bb-app.yaml
    ```

---

## 7\. Confirm Verification and Deployment

1.  Reconcile and check the OCI source status:

    ```
    flux reconcile source oci -n flux-system 10-demo-source-oci-bb-app
    flux get sources oci -n flux-system
    ```

    You should see `READY True`.

2.  Inspect the `SourceVerified` condition:

    ```
    kubectl -n flux-system get ocirepository 10-demo-source-oci-bb-app -o yaml
    ```

3.  Verify deployment in the `10-demo` namespace:

    ```
    kubectl -n 10-demo get all
    ```

4.  Access the application on its NodePort (e.g., `localhost:30010`). You should see version **7.10.0** of Block Buster:

![The image shows a "Block Buster" game interface with colorful blocks, a paddle, and a ball, set against a starry background. Game details like pod name, IP, and version are displayed at the top.](https://kodekloud.com/kk-media/image/upload/v1752877687/notes-assets/images/GitOps-with-FluxCD-DEMO-Cosign-OCI-Artifacts/block-buster-game-interface-stars.jpg)

---

## Links and References

- [Cosign by Sigstore](https://github.com/sigstore/cosign)
- [Flux CD Documentation](https://fluxcd.io/docs/)
- [GitHub Container Registry](https://ghcr.io/)
- [OCI Artifacts Spec](https://github.com/opencontainers/artifacts)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/c8ad2608-2804-4413-9041-5e8dc9126d53/lesson/3db54ec2-a57f-479e-9fcd-f4ca0717bcce)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/gitops-with-fluxcd/module/c8ad2608-2804-4413-9041-5e8dc9126d53/lesson/909af89e-e23d-4fdb-ab12-99e20cf7d386)**
>
> Practice lab
