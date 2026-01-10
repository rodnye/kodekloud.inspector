# Shared responsibility model - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GCP-Cloud-Digital-Leader-Certification/Security-in-GCP/Shared-responsibility-model)

---

## Table of Contents

- Shared responsibility model
  - What Is the Shared Responsibility Model?
  - Visual Representation of the Model
  - Conclusion
  - Watch Video
    - GCP's Responsibilities
    - Your Responsibilities

---

## Content

GCP Cloud Digital Leader Certification

Security in GCP

# Shared responsibility model

Hello and welcome back!

In our previous discussion, we explored various GCP services that enable robust security best practices. Today, we'll dive deeper into a key security principle known as the Shared Responsibility Model.

## What Is the Shared Responsibility Model?

Imagine a circle representing your entire cloud infrastructure, encompassing all GCP services. In this model, two primary roles emerge:

- **Security of the Cloud:** Managed entirely by Google Cloud Platform (GCP).
- **Security Inside the Cloud:** Managed by you, the cloud user or organization.

### GCP's Responsibilities

GCP takes care of the foundational elements, which include:

- **Physical Data Center Security:** GCP secures their data centers against unauthorized access.
- **Global Networks:** Management of internet connectivity, network configuration, and cybersecurity for data centers.
- **System Maintenance:** Regular system upgrades, patches, and licensing.
- **Compliance and Regulation:** Ensuring operating system compliance with regional regulations and addressing taxation matters.

> [!important]
> **Note**
>
> GCP's comprehensive management of these aspects allows organizations to focus on securing their own data and applications.

### Your Responsibilities

As an organization leveraging GCP’s infrastructure, you are responsible for the security of the data and applications you deploy in the cloud. This includes:

- **Data Collection:** Ensuring you only collect necessary data from your users.
- **Compliance Adherence:** Maintaining compliance with regional data sovereignty laws and relevant application standards.
- **Configuration Best Practices:** Following security best practices when configuring your applications to prevent misconfigurations that could expose resources.
- **Proactive Security Measures:** Implementing proactive security measures and addressing any potential threats promptly.

## Visual Representation of the Model

Any exam or certification referring to the "security of the cloud" specifically points to the areas managed by GCP. For a clear visual breakdown, review the diagram below:

![The image illustrates a shared responsibility model for cloud security, dividing responsibilities into "Security inside the cloud" and "Security of the cloud," with a circular diagram highlighting different aspects like data security, application configuration, and physical security of data centers.](https://kodekloud.com/kk-media/image/upload/v1752875369/notes-assets/images/GCP-Cloud-Digital-Leader-Certification-Shared-responsibility-model/shared-responsibility-cloud-security-diagram.jpg)

Conversely, actions that you take as a GCP user relate to "security inside the cloud." This distinction reinforces the notion that while GCP ensures a secure infrastructure, the safety of your data and applications is your responsibility.

> [!important]
> **Security Reminder**
>
> Always review your application configurations and security policies regularly to ensure that any vulnerabilities are addressed swiftly.

## Conclusion

Understanding the Shared Responsibility Model is critical to effectively managing your cloud infrastructure’s security. By clearly distinguishing between "security of the cloud" (handled by GCP) and "security inside the cloud" (your responsibility), you can focus your efforts and resources appropriately.

Stay tuned for more insights in our upcoming articles.

Thank you for reading!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/gcp-cloud-digital-leader-certification/module/94df18a8-6701-4320-b53d-e0809147e4a5/lesson/7014fe3a-07d1-4b52-ac3d-885dd625aab0)**
>
> Watch video content
