# Access Controls and Security With CloudFront - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Certified-SysOps-Administrator-Associate/Domain-5-Networking-and-Content-Delivery/Access-Controls-and-Security-With-CloudFront)

---

## Table of Contents

- Access Controls and Security With CloudFront
  - Enforcing HTTPS Connections
  - Field-Level Encryption
  - Geographic Restrictions
  - Pre-signed URLs and Signed Cookies
  - Summary
  - Watch Video

---

## Content

AWS Certified SysOps Administrator - Associate

Domain 5 Networking and Content Delivery

# Access Controls and Security With CloudFront

Welcome, students.

In this article, we explore CloudFront's advanced access controls and security features. Learn how to enforce HTTPS connections, utilize field-level encryption, apply geographic restrictions, and implement pre-signed URLs or signed cookies for authenticated access.

CloudFront provides robust capabilities that ensure secure data transmission and protect sensitive content. These features help you secure communications between users, CloudFront, and your origin servers while complying with best practices and certification requirements.

![The image outlines four access control and security features of CloudFront: configuring HTTPS connections, setting up field-level encryption, preventing access based on geographic location, and using signed URLs or cookies.](https://kodekloud.com/kk-media/image/upload/v1752860732/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Access-Controls-and-Security-With-CloudFront/cloudfront-access-control-security-features.jpg)

## Enforcing HTTPS Connections

CloudFront supports enforcing secure connections using a viewer policy, which mandates HTTPS for all communications. This configuration provides several security benefits:

- Secures the connection from the viewer to CloudFront.
- Encrypts the request from CloudFront to the origin and the response from the origin to CloudFront.
- Maintains an encrypted connection as content is delivered back to the viewer.

In some situations, CloudFront can decrypt the response at the backend, process it as necessary, and then re-encrypt it before forwarding it to the viewer. While end-to-end TLS encryption is generally recommended, this flexibility allows for varied configurations based on your application needs.

![The image illustrates the configuration of HTTPS connections between a viewer, CloudFront edge location, and an S3 bucket. It shows secure communication paths using HTTPS between each component.](https://kodekloud.com/kk-media/image/upload/v1752860734/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Access-Controls-and-Security-With-CloudFront/https-configuration-cloudfront-s3-diagram.jpg)

> [!important]
> **Note**
>
> Ensuring HTTPS is critical for protecting data integrity and confidentiality during transit. Always verify that your origin servers support secure protocols.

## Field-Level Encryption

Rather than encrypting an entire connection, CloudFront allows you to specifically encrypt sensitive fields within your content. This approach is particularly useful for protecting personally identifiable information (PII), API keys, protected health information (PHI), payment details, and other confidential data.

CloudFront’s field-level encryption uses asymmetric (public key) encryption to secure these specific content elements without impacting overall data flow. After configuring the necessary key management settings, CloudFront manages the encryption process, simplifying the implementation.

![The image illustrates the process of setting up field-level encryption for specific content fields using CloudFront, showing the flow of data from user agents to a custom origin with public and private key encryption. It includes examples of data types like personally identifiable information and payments data.](https://kodekloud.com/kk-media/image/upload/v1752860735/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Access-Controls-and-Security-With-CloudFront/field-level-encryption-cloudfront-setup.jpg)

## Geographic Restrictions

CloudFront enables geographic restrictions that help control content delivery based on user location. You can specify allowed or blocked countries to tailor your content distribution and comply with regional regulations.

Keep in mind that these restrictions work at the country level only. For more granular geographic filtering—such as by state, county, or province—you will need to consider integrating third-party solutions available on the AWS Marketplace.

## Pre-signed URLs and Signed Cookies

For content requiring restricted access—such as private documents, downloadable files from Amazon S3, or streaming content—CloudFront offers two methods:

- **Pre-signed URLs:** Ideal for granting access to a single file, these URLs include parameters such as time-to-live, signature, and policy details. AWS services like IAM verify these parameters to provide secure access.
- **Signed Cookies:** Best suited for scenarios with multiple files or when you want to avoid changing existing URL structures. Signed cookies enable authenticated users to seamlessly access multiple resources without modifying URLs.

![The image illustrates the process of CloudFront Signed URLs, showing steps from user verification to fetching and responding to requests via signed URLs.](https://kodekloud.com/kk-media/image/upload/v1752860736/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Access-Controls-and-Security-With-CloudFront/cloudfront-signed-urls-process.jpg)

> [!important]
> **Warning**
>
> When choosing between pre-signed URLs and signed cookies, remember that pre-signed URLs require modifying the URL structure, while signed cookies do not. Evaluate your application's architecture and user experience before implementation.

![The image compares signed URLs and signed cookies, showing a user accessing a single file with a signed URL and multiple files with signed cookies.](https://kodekloud.com/kk-media/image/upload/v1752860737/notes-assets/images/AWS-Certified-SysOps-Administrator-Associate-Access-Controls-and-Security-With-CloudFront/signed-urls-vs-signed-cookies.jpg)

## Summary

CloudFront's security features provide a comprehensive approach to protecting your content through:

| Feature                          | Description                                                                                                                                                | Use Case Example                                      |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Enforcing HTTPS Connections      | Ensures secure communication between viewers, CloudFront, and origins by enforcing the use of HTTPS.                                                       | Securing web traffic and API endpoints.               |
| Field-Level Encryption           | Encrypts specific sensitive fields within requests and responses using asymmetric encryption.                                                              | Protecting PII, API keys, and financial data.         |
| Geographic Restrictions          | Limits content access based on the user's geographic location, allowing or blocking countries.                                                             | Complying with regional content delivery regulations. |
| Pre-signed URLs & Signed Cookies | Controls access to content via temporary URLs (pre-signed) or authenticated sessions (signed cookies) without modifying URL structures for multiple files. | Securing downloads and streaming media content.       |

These access control and security options help ensure that your data remains protected while delivering optimal performance and user experiences. Whether you are preparing for certification exams or implementing a secure content delivery strategy, mastering these features is essential.

We hope you find this article informative and useful. Study these concepts thoroughly to enhance your security practices and prepare for your CloudFront-related certification exams.

See you in the next article!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-certified-sysops-administrator-associate/module/fd99c412-5efc-46e2-99ce-bb9c581fec27/lesson/a76741d8-dd3a-4723-92b6-e73ffbdcd933)**
>
> Watch video content
