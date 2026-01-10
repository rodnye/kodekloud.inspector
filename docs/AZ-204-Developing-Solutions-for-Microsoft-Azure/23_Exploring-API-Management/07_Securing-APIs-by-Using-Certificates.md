# Securing APIs by Using Certificates - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ-204-Developing-Solutions-for-Microsoft-Azure/Exploring-API-Management/Securing-APIs-by-Using-Certificates)

---

## Table of Contents

- Securing APIs by Using Certificates
  - Understanding Certificate Properties
  - Certificate Verification Methods
  - API Management and Certificate Policies
  - Example Policy Implementation
  - Uploading Certificates in Azure API Management
  - Watch Video
    - Validating the Certificate Thumbprint
    - Validating the Certificate Issuer and Subject

---

## Content

AZ-204: Developing Solutions for Microsoft Azure

Exploring API Management

# Securing APIs by Using Certificates

Securing APIs with certificates is essential for establishing secure communication between clients and services. In this guide, you'll learn how Transport Layer Security (TLS) leverages client certificates in API Management, and how you can enforce certificate properties to restrict access only to trusted clients.

## Understanding Certificate Properties

When securing your API, validating client certificates using specific properties is crucial. Here are the primary certificate properties to consider:

- **CA (Certificate Authority):**  
  Restrict access to certificates signed by a designated CA. The CA is a trusted issuing authority, so specifying a CA ensures that only certificates from recognized sources are accepted.
- **Thumbprint:**  
  Use the unique cryptographic hash of the certificate to verify its authenticity. This method is particularly effective when you want to allow only a specific certificate.
- **Subject:**  
  Validate the subject field to ensure it correctly identifies the entity to which the certificate was issued. This check confirms that the certificate belongs to the expected client.
- **Expiration Date:**  
  Accept only certificates within their validity period. Any expired certificates are automatically rejected as they no longer guarantee secure communication.

Using these certificate properties helps ensure that the client certificate is both genuine and current, significantly enhancing your API's security.

## Certificate Verification Methods

API Management employs several methods to verify certificates, safeguarding the integrity and confidentiality of data transmissions. Two critical verification methods include:

1.  **Verifying the Certificate Issuer:**  
    Confirm that the certificate originates from a trusted CA, ensuring that it was issued by a recognized and legitimate authority.
2.  **Validating the Certificate's Origin:**  
    Ensure the certificate was issued by the expected partner or service, solidifying its authenticity and trustworthiness.

![The image illustrates two certificate verification methods: verifying the certificate issuer and validating the certificate's origin by confirming it was issued by the partner.](https://kodekloud.com/kk-media/image/upload/v1752866330/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Securing-APIs-by-Using-Certificates/certificate-verification-methods-illustration.jpg)

These verification steps are key to detecting any tampering or misuse of client certificates.

## API Management and Certificate Policies

In API Management's consumption tier, client certificates are used to authenticate clients. By defining clear certificate properties like thumbprint, issuer, and subject fields, you create rules that enforce secure access. These policies ensure that only certificates meeting your security criteria are allowed to access your APIs.

![The image shows a software interface for managing APIs, specifically highlighting the "Employee API" and its operations. It includes sections for inbound processing policies and a banner about accepting client certificates in the consumption tier.](https://kodekloud.com/kk-media/image/upload/v1752866331/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Securing-APIs-by-Using-Certificates/employee-api-management-interface.jpg)

## Example Policy Implementation

Below are code examples demonstrating certificate validation policies within your API Management service.

### Validating the Certificate Thumbprint

The following policy snippet checks if the incoming client certificate is null or if its thumbprint does not match the desired value. If either condition is true, the API returns a 403 response.

```
<!-- Check the thumbprint of a client certificate -->
<choose>
  <when condition="@(context.Request.Certificate == null || context.Request.Certificate.Thumbprint != 'desired-thumbprint')">
    <return-response>
      <set-status code="403" reason="Invalid client certificate" />
    </return-response>
  </when>
</choose>
```

### Validating the Certificate Issuer and Subject

This snippet ensures that the client certificate is present, has the expected issuer, and possesses the correct subject name. If any check fails, a 403 response is issued.

```
<!-- Check the issuer and subject of a client certificate -->
<choose>
  <when condition="@(context.Request.Certificate == null ||
                      context.Request.Certificate.Issuer != 'trusted-issuer' ||
                      context.Request.Certificate.SubjectName.Name != 'expected-subject-name')">
    <return-response>
      <set-status code="403" reason="Invalid client certificate" />
    </return-response>
  </when>
</choose>
```

Both examples employ a conditional check using an OR statement to enforce strict validation. If the certificate is missing or does not meet the defined properties, access is denied.

> [!important]
> **Security Tip**
>
> Always ensure your API Management policies are regularly reviewed and updated as new security threats emerge.

## Uploading Certificates in Azure API Management

To implement these policies, upload your client certificates into Azure API Management. You can either store the certificates in Azure Key Vault or directly upload them via the Azure portal. Once uploaded, these certificates can be referenced in your API Management policies.

![The image shows a Microsoft Azure portal interface for uploading client certificates in the API Management service, with fields for ID, certificate selection, and password.](https://kodekloud.com/kk-media/image/upload/v1752866333/notes-assets/images/AZ-204-Developing-Solutions-for-Microsoft-Azure-Securing-APIs-by-Using-Certificates/azure-portal-upload-client-certificates.jpg)

By following these steps, you can effectively secure your APIs using certificate-based authentication in Azure API Management, ensuring that your services handle only trusted communications.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az-204-developing-solutions-for-microsoft-azure/module/4fb192a0-bdef-49d6-9dd7-7e788680ea1a/lesson/956773b8-4d85-459a-b90c-407746d028ab)**
>
> Watch video content
