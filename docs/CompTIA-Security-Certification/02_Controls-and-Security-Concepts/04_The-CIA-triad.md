# The CIA triad - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Controls-and-Security-Concepts/The-CIA-triad)

---

## Table of Contents

- The CIA triad
  - Confidentiality
  - Integrity
  - Availability
  - Nonrepudiation
  - Watch Video

---

## Content

CompTIA Security+ Certification

Controls and Security Concepts

# The CIA triad

In this article, we delve into one of the most fundamental concepts in information security: the CIA triad, which stands for Confidentiality, Integrity, and Availability. Understanding these principles is essential for protecting sensitive data and maintaining secure systems.

## Confidentiality

Confidentiality is about ensuring that sensitive information is accessible only to authorized individuals. One of the primary methods to achieve this is by implementing the principle of least privilege. This approach restricts users to the minimum level of access necessary for their roles. For example, within a large payroll department, not every employee should have full access to all payroll files. Limiting access decreases the risk of unauthorized viewing and minimizes potential targets for hackers.

![The image illustrates the concept of confidentiality, showing the principle of least privilege to protect access to documents and files for employees.](https://kodekloud.com/kk-media/image/upload/v1752872069/notes-assets/images/CompTIA-Security-Certification-The-CIA-triad/confidentiality-least-privilege-access.jpg)

Consider a payroll department where detailed access to payroll files is granted only to select individuals required for their role. This controlled access significantly reduces the chances of a security breach.

![The image illustrates a confidentiality concept, showing a payroll department with restricted access to employees' payroll files, indicated by lines and lock symbols.](https://kodekloud.com/kk-media/image/upload/v1752872070/notes-assets/images/CompTIA-Security-Certification-The-CIA-triad/confidentiality-payroll-restricted-access.jpg)

Another effective security measure is file encryption. Even if an unauthorized party manages to access encrypted files, they cannot decipher the content without the proper decryption keys.

![The image illustrates the concept of "Confidentiality" with an icon depicting file encryption, featuring a document, a key, and a padlock.](https://kodekloud.com/kk-media/image/upload/v1752872070/notes-assets/images/CompTIA-Security-Certification-The-CIA-triad/confidentiality-file-encryption-icon.jpg)

> [!important]
> **Note**
>
> Implementing strict access controls and encryption practices is critical for safeguarding sensitive data.

## Integrity

Integrity ensures that data remains accurate and unaltered during storage or transmission. Although integrity measures may not completely prevent unauthorized modifications, they are designed to detect when a file or document has been tampered with. One common technique used to verify data integrity is employing hash functions. A hash function converts a file into a unique string of characters—a digital fingerprint. Even a minor change, such as an extra space, will result in a completely different hash.

For instance, when sending a document, the original hash is computed and sent alongside it. Upon receipt, the same hash function is applied to the document. If both hash values match, it confirms that the document remains unmodified and its integrity is intact.

## Availability

Availability is the assurance that information systems and data are accessible to authorized users when needed. Maintaining system availability is crucial because many malicious actors aim to disrupt services and render systems inaccessible. Such disruptions can lead to severe financial losses and critical failures in industries like power infrastructure and healthcare.

![The image illustrates a concept of availability, showing a user and a computer with a warning symbol, and a connection to "bad actors" depicted as a hacker.](https://kodekloud.com/kk-media/image/upload/v1752872072/notes-assets/images/CompTIA-Security-Certification-The-CIA-triad/availability-user-computer-hacker.jpg)

For example, systems that support emergency healthcare services must remain accessible at all times to avoid life-threatening situations.

![The image illustrates a flowchart showing that issues in "Power Infrastructure" and "Healthcare" can lead to "Serious Consequences."](https://kodekloud.com/kk-media/image/upload/v1752872073/notes-assets/images/CompTIA-Security-Certification-The-CIA-triad/power-infrastructure-healthcare-flowchart.jpg)

> [!important]
> **Warning**
>
> Downtime in critical systems like healthcare and power infrastructure can lead to catastrophic outcomes. Ensure you have robust redundancy and failover strategies in place.

## Nonrepudiation

Beyond the fundamental pillars of the CIA triad, nonrepudiation is another important concept in information security. Nonrepudiation guarantees that the sender of a message cannot later deny sending it. This is achieved by ensuring that there is definitive proof of the message origin and transmission, typically through the use of digital signatures or transaction logs. When nonrepudiation measures are in place, any attempt to repudiate a message is met with irrefutable evidence that confirms the sender’s identity.

![The image illustrates the concept of non-repudiation, showing a transaction between Alice and Bob with proof of origin and receipt, ensuring neither can deny the transaction.](https://kodekloud.com/kk-media/image/upload/v1752872074/notes-assets/images/CompTIA-Security-Certification-The-CIA-triad/non-repudiation-alice-bob-transaction.jpg)

Understanding and implementing the principles of the CIA triad, along with nonrepudiation, is essential for building and maintaining secure systems that can reliably protect critical data and operations.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/1846e159-7ab4-46d3-be5d-95c1a0eb51b9/lesson/b772f9df-a7b1-44c8-bc15-9b584fdccf48)**
>
> Watch video content
