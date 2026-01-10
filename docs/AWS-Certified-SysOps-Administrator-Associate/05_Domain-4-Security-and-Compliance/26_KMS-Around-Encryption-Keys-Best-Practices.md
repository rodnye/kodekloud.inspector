# KMS Around Encryption Keys Best Practices - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-4-Security-and-Compliance/KMS-Around-Encryption-Keys-Best-Practices)

---

## Table of Contents

- KMS Around Encryption Keys Best Practices
  - 1. Use Customer-Managed Keys
  - 2. Enable Automatic Key Rotation
  - 3. Restrict Access and Enable Logging
  - 4. Establish a Key Recovery Strategy
  - 5. Consider Hardware Security Modules (HSMs) for High-Security Needs
  - 6. Use Strong Encryption Algorithms
  - 7. Handle Deprecated Keys Appropriately
  - Summary
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 4 Security and Compliance

# KMS Around Encryption Keys Best Practices

This article outlines key best practices for managing encryption keys using AWS Key Management Service (KMS). It focuses on utilizing customer-managed keys (CMKs) over AWS-managed keys, enabling enhanced control over your key material while benefiting from KMS automation for tasks like key generation, rotation, and management.

## 1\. Use Customer-Managed Keys

Instead of relying solely on AWS-managed keys, opt for customer-managed keys to achieve:

- Enhanced control over key material.
- Automated key generation and rotation handled by KMS.
- Tighter access controls and the ability to segregate keys by environment (development, staging, QA, production) or sensitivity levels.
- Sufficient protection using symmetric key encryption, while asymmetric keys are best reserved for scenarios that require digital signatures.

## 2\. Enable Automatic Key Rotation

Implement automatic key rotation to bolster security. Configure key rotation every one to three years based on your security requirements. This practice not only updates keys continuously but also preserves previous versions for decrypting legacy data.

![The image shows two colored boxes labeled "Automatic key rotation" and "Key versioning," related to enabling key rotation.](https://kodekloud.com/kk-media/image/upload/v1752860530/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-KMS-Around-Encryption-Keys-Best-Practices/automatic-key-rotation-versioning.jpg)

> [!important]
> **Note**
>
> When rotating keys, ensure you retain and version older keys. Removing old keys prematurely could result in losing access to data encrypted with those keys.

## 3\. Restrict Access and Enable Logging

Control access to KMS by limiting it to only those roles and users who absolutely need it. Regularly audit permissions to mitigate the risk of unauthorized access. Additionally, enable logging for all encryption and decryption operations and integrate these logs with your security monitoring tools (e.g., Security Hub). Set up alerts to promptly notify administrators if suspicious activity is detected.

## 4\. Establish a Key Recovery Strategy

When deactivating keys, utilize the provided grace period to allow for recovery if necessary. Instead of immediately deleting a key, disable it to ensure there is a window for restoration should it be needed. Only proceed with permanent deletion after confirming that the key is compromised and all data has been successfully re-encrypted. Regularly back up keys to prevent data loss.

## 5\. Consider Hardware Security Modules (HSMs) for High-Security Needs

For environments that require top-tier security (such as FIPS 140 compliance), consider integrating Hardware Security Modules (HSMs) like CloudHSM. While HSMs provide enhanced device-level hardware isolation for keys, their use should be reserved for situations where maximum security justifies the additional cost and complexity.

![The image is a slide titled "Using Hardware Security Modules (HSMs) for Highly Sensitive Data," featuring two points: "Leverage HSMs" and "Cloud KMS with HSM integration."](https://kodekloud.com/kk-media/image/upload/v1752860531/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-KMS-Around-Encryption-Keys-Best-Practices/using-hsms-sensitive-data-slide.jpg)

## 6\. Use Strong Encryption Algorithms

Ensure that you deploy the strongest encryption algorithms available in your environment. AWS KMS defaults to AES-256 for symmetric encryption. For asymmetric keys, consider using RSA 2048 or upgrade to RSA 4096 (or an equivalent algorithm) to maintain optimal security without compromising performance.

## 7\. Handle Deprecated Keys Appropriately

For keys that have become deprecated due to outdated algorithms or potential compromises, disable (rather than immediately delete) the keys. Permanent deletion should only occur after confirming that all encrypted data has been transferred to a new, secure key.

![The image is about "Disabling Deprecated Keys" and features an illustration of a key with a prohibition symbol, suggesting the deactivation of outdated or insecure keys.](https://kodekloud.com/kk-media/image/upload/v1752860532/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-KMS-Around-Encryption-Keys-Best-Practices/disabling-deprecated-keys-illustration.jpg)

## Summary

By adhering to these best practices—using customer-managed keys, enabling key rotation, restricting access and enabling logging, establishing a robust key recovery strategy, incorporating HSMs when necessary, employing strong encryption algorithms, and handling deprecated keys carefully—you can strengthen your encryption key management strategy with AWS KMS and enhance your overall security posture.

For further details on encryption key management and additional AWS security best practices, explore the [AWS KMS Documentation](https://aws.amazon.com/kms/documentation/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/0c9bb9a3-5201-434e-8085-a9f1e9f23f22/lesson/f8acb23d-1a93-4ea7-afe6-6de7a5ce74f9)**
>
> Watch video content
