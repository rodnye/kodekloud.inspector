# Supply Chain Compliance - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Kubernetes-and-Cloud-Native-Security-Associate-KCSA/Compliance-and-Security-Frameworks/Supply-Chain-Compliance)

---

## Table of Contents

- Supply Chain Compliance
  - Core Areas of Supply Chain Security
  - 1. Artifacts: Signing and Verification
  - 2. Metadata: Generating and Validating SBOMs
  - 3. Attestations: Building a Chain of Trust
  - 4. Policies: Automated Compliance Enforcement
  - References
  - Watch Video

---

## Content

Kubernetes and Cloud Native Security Associate (KCSA)

Compliance and Security Frameworks

# Supply Chain Compliance

Supply chain security extends beyond internal threat modeling—it ensures every external dependency (libraries, container images, third-party APIs) is verified, tamper-free, and compliant. In this guide, we’ll cover the four core areas of supply chain security, show you practical commands, and point to best-in-class tools and standards.

## Core Areas of Supply Chain Security

| Core Area    | Description                       | Tool / Standard            |
| ------------ | --------------------------------- | -------------------------- |
| Artifacts    | Build outputs: images, binaries   | Sigstore Cosign            |
| Metadata     | Software Bill of Materials (SBOM) | SPDX                       |
| Attestations | Signed provenance statements      | in-toto                    |
| Policies     | Automated compliance enforcement  | Sigstore Policy Controller |

## 1\. Artifacts: Signing and Verification

Artifacts—your container images, binaries, and libraries—must be signed to prove integrity and origin.

> [!important]
> **Keyless Signing with Cosign**
>
> Sigstore’s [Cosign](https://docs.sigstore.dev/cosign/) offers a simple, keyless workflow for signing container images.

To sign an image:

```
cosign sign $IMAGE
```

Sample output:

```
Generating ephemeral keys...
Retrieving signed certificate...
By typing 'y', you attest that you have permission to grant signing.
Are you sure you would like to continue? [y/N] y
Successfully verified SCT...
tlog entry created with index: 12086900
Pushing signature to: $IMAGE
```

To verify a binary or image:

```
cosign verify-blob "$BINARY" \
  --signature "$BINARY.sig" \
  --certificate "$BINARY.cert" \
  --certificate-identity krel-staging@k8s-releng-prod.iam.gserviceaccount.com \
  --certificate-oidc-issuer https://accounts.google.com
```

## 2\. Metadata: Generating and Validating SBOMs

A Software Bill of Materials (SBOM) is an “ingredients list” for your application, detailing file checksums, licenses, and origins.

> [!important]
> **What Is an SBOM?**
>
> An SBOM (Software Bill of Materials) is often authored in [SPDX](https://spdx.org/) format. It tracks every component and its license.

Example SPDX excerpt:

```
FileName: bin/linux/amd64/kube-controller-manager
SPDXID: SPDXRef-File-kube-controller-manager-v1.31.2
FileChecksum: SHA1: c5e8da214abd18e96aabe7d1bab6addf76455
FileChecksum: SHA256: b16b6becee2bc76af97384ca611d8e972aa7ed213ea75255
LicenseConcluded: Apache-2.0
```

Retrieve and verify the Kubernetes SBOM:

```
# 1. Get the latest stable release
VERSION=$(curl -Ls https://dl.k8s.io/release/stable.txt)


# 2. Download SBOM and checksum
curl -Ls "https://sbom.k8s.io/$VERSION/release" -o "$VERSION.spdx"
echo "$(curl -Ls "https://sbom.k8s.io/$VERSION/release.sha512")  $VERSION.spdx" | sha512sum --check


# 3. Fetch Sigstore signature and certificate
curl -Ls "https://sbom.k8s.io/$VERSION/release.sig"  -o "$VERSION.spdx.sig"
curl -Ls "https://sbom.k8s.io/$VERSION/release.cert" -o "$VERSION.spdx.cert"


# 4. Verify SBOM integrity
cosign verify-blob \
  --certificate "$VERSION.spdx.cert" \
  --signature   "$VERSION.spdx.sig" \
  --certificate-identity krel-staging@k8s-releng-prod.iam.gserviceaccount.com \
  --certificate-oidc-issuer  https://accounts.google.com \
  "$VERSION.spdx"
```

## 3\. Attestations: Building a Chain of Trust

Attestations are cryptographic statements that vouch for metadata such as provenance, SBOM authenticity, or vulnerability scans.

Sign an SBOM attestation:

```
cosign sign --key <PRIVATE_KEY> sbom.k8s.io/v1.27.4/release.spdx > sbom.attestation
```

Verify the attestation:

```
cosign verify-attestation \
  --key <PUBLIC_KEY> \
  --certificate-identity krel-staging@k8s-releng-prod.iam.gserviceaccount.com \
  --certificate-oidc-issuer https://accounts.google.com \
  sbom.k8s.io/v1.27.4/release.spdx
```

> [!important]
> **Use in-toto for End-to-End Security**
>
> [in-toto](https://in-toto.io) defines and verifies attestations across your entire pipeline. Sample step definition:
>
> ```
> - name: build
> expected_command:
> - "make"
> pubkeys: ["developer"]
> expected_materials:
> - "MATCH repo/* WITH REPO"
> expected_products:
> - "CREATE binary"
> ```

## 4\. Policies: Automated Compliance Enforcement

Policies block deployments of unsigned or non-compliant artifacts. A `ClusterImagePolicy` example:

```
apiVersion: policy.sigstore.dev/v1beta1
kind: ClusterImagePolicy
metadata:
  name: secure-image-policy
spec:
  images:
    - glob: "gcr.io/my-organization/*"
  authorities:
    - key:
        data: |
          -----BEGIN PUBLIC KEY-----
          YOUR_PUBLIC_KEY_HERE
          -----END PUBLIC KEY-----
  attestations:
    - name: sbom-check
      predicateType: https://in-toto.io/Statement/v0.1
    - name: vulnerability-check
      predicateType: https://slsa.dev/provenance/v0.2
  policy:
    validate:
      all:
        - name: sbom-validation
          match:
            attestation-name: sbom-check
        - name: vulnerability-validation
          match:
            attestation-name: vulnerability-check
        - name: signing-validation
          match:
            signed: true
```

Enforce policies at admission time with Sigstore’s [Policy Controller](https://docs.sigstore.dev/policy-controller/).

![The image outlines key components of supply chain security, including artifact signing, metadata detailing, attestation signing, and policy enforcement. It emphasizes the use of Cosign for signing binaries and container images, and the role of SBOM in identifying risks and ensuring trustworthiness.](https://kodekloud.com/kk-media/image/upload/v1752880728/notes-assets/images/Kubernetes-and-Cloud-Native-Security-Associate-KCSA-Supply-Chain-Compliance/supply-chain-security-cosign-sbom.jpg)

---

## References

- [Map of Kubernetes Supply Chain Security (CNCF Blog)](https://www.cncf.io/blog/2021/11/29/map-of-kubernetes-supply-chain-security/)
- [Sigstore Cosign Documentation](https://docs.sigstore.dev/cosign/)
- [SPDX Specification](https://spdx.org/)
- [in-toto](https://in-toto.io)
- [Sigstore Policy Controller](https://docs.sigstore.dev/policy-controller/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/kubernetes-and-cloud-native-security-associate-kcsa/module/2d1969ad-ad49-4d47-93ca-493416c81c76/lesson/0a4ddea8-199a-4a0e-815f-101914e6b2ee)**
>
> Watch video content
