# Secondary AWS Services End User Computing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-Three/Secondary-AWS-Services-End-User-Computing)

---

## Table of Contents

- Secondary AWS Services End User Computing
  - Overview of Services
  - Summary
  - Watch Video
    - Amazon AppStream 2.0
    - Amazon WorkSpaces
    - Deep Dive into Amazon WorkSpaces
    - Introducing Amazon WorkSpaces Web
    - Deep Dive into Amazon AppStream 2.0

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part Three

# Secondary AWS Services End User Computing

Welcome, Cloud Practitioners! In this lesson, presented by Michael Forrester, we dive into the AWS End-User Computing service family. We will explore the primary services, their tasks and use cases, and how they simplify IT management, enhance data security, and support remote work.

![The image outlines objectives, including an overview, tasks accomplished, and use cases, with icons and a gradient background. Copyright is attributed to KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752862171/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-End-User-Computing/frame_20.jpg)

The AWS End-User Computing family is symbolized by an icon depicting a laptop with a cloud and a mobile device with a cloud. These services deliver virtual desktops and streamed applications from the cloud, ensuring a seamless computing experience from any location.

## Overview of Services

The AWS End-User Computing family consists of three primary services:

1.  **Amazon AppStream 2.0** – Streams desktop applications directly to your device.
2.  **Amazon WorkSpaces** – Provides full-featured virtual desktops hosted in the cloud.
3.  **Amazon WorkSpaces Web** – Enables browser-based access to cloud desktops.

---

### Amazon AppStream 2.0

Amazon AppStream 2.0 streams desktop applications to your device. For instance, if you need to run multiple versions of Microsoft Office simultaneously—something that can be challenging on a standard Windows system—AppStream 2.0 isolates each version in its own cloud environment. This setup allows one version to run locally while the other streams from the cloud, overcoming compatibility issues.

---

### Amazon WorkSpaces

Amazon WorkSpaces is a Virtual Desktop Infrastructure (VDI) solution that provides customizable, cloud-hosted desktops. Users can select from various operating systems such as Windows (ranging from Windows 7 to Windows 11) and Ubuntu Linux (subject to kernel requirements). They can also tailor hardware specifications by adding GPUs or expanding memory.

Key benefits of Amazon WorkSpaces include:

- **Centralized Security:** Data is stored securely in AWS data centers, reducing risks associated with data on local devices.
- **Flexible Hardware Options:** Customize each desktop to meet different performance needs.
- **Simplified IT Management:** Mass deployment and patching streamline maintenance and updates.
- **Cost-Effectiveness:** A scalable solution that offers a more affordable alternative to traditional VDI setups from vendors like VMware, Citrix, or earlier Microsoft approaches.

![The image lists two Amazon services: AppStream 2.0 and WorkSpaces, under the heading "Dive in to the Services."](https://kodekloud.com/kk-media/image/upload/v1752862172/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-End-User-Computing/frame_90.jpg)

![The image outlines three general use cases: remote working, secure data handling, and simplified IT management, each represented with an icon and numbered 01 to 03.](https://kodekloud.com/kk-media/image/upload/v1752862173/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-End-User-Computing/frame_140.jpg)

![The image illustrates modern computing's relevance, highlighting cost-efficiency and scalability as key components, connected through a central icon.](https://kodekloud.com/kk-media/image/upload/v1752862174/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-End-User-Computing/frame_160.jpg)

![The image highlights AWS End-User Computing Services: Amazon AppStream 2.0, Amazon WorkSpaces, and Amazon WorkSpaces Web, with their respective icons.](https://kodekloud.com/kk-media/image/upload/v1752862175/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-End-User-Computing/frame_190.jpg)

---

### Deep Dive into Amazon WorkSpaces

Amazon WorkSpaces offers secure, virtual desktops hosted in the cloud with a wide range of customization options. Depending on your workload—whether for routine office tasks or high-performance graphic design—you can choose a Windows or Ubuntu-based WorkSpace engineered with the specific hardware configurations you require.

Key features of Amazon WorkSpaces include:

- **Centralized Management:** Secure desktops managed from a single console.
- **Customized Hardware:** Options such as high-end CPUs, additional memory, and GPU capabilities.
- **Secure Data Storage:** Data remains in the AWS data center, ensuring robust security.
- **Simplified IT Processes:** Efficient mass deployment and automated patching processes for ease of management.

This service is ideal for remote work and BYOD (Bring Your Own Device) scenarios, ensuring that sensitive data never leaves the secure AWS environment.

![The image describes Amazon WorkSpaces, highlighting "Core features" and "Customization options" as key aspects of the personalized virtual desktop service.](https://kodekloud.com/kk-media/image/upload/v1752862176/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-End-User-Computing/frame_310.jpg)

![The image outlines three general use cases for Amazon WorkSpaces: remote working, secure data handling, and simplified IT management.](https://kodekloud.com/kk-media/image/upload/v1752862178/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-End-User-Computing/frame_350.jpg)

![The image illustrates the relevance of modern computing, highlighting security and scalability as key components, connected to a central icon representing computing infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752862179/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-End-User-Computing/frame_380.jpg)

---

### Introducing Amazon WorkSpaces Web

Amazon WorkSpaces Web extends virtual desktop capabilities by enabling browser-based access. This is particularly beneficial for users on devices that do not support traditional remote desktop clients—such as Chromebooks or systems within locked-down corporate environments.

Key features of Amazon WorkSpaces Web include:

- **Browser-Based Virtual Desktops:** Access your cloud desktop directly through any modern web browser.
- **Consistent Security:** Offers the same robust security and core features as Amazon WorkSpaces.
- **Optimized for Restricted Networks:** Communicates over standard TLS/SSL (typically on port 443), ideal for environments with strict network policies.

This service suits educational institutions and BYOD setups where installing client software is not feasible.

![The image highlights Amazon WorkSpaces Web, focusing on "Core features" and "Security aspects" with corresponding icons.](https://kodekloud.com/kk-media/image/upload/v1752862181/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-End-User-Computing/frame_490.jpg)

![The image lists Amazon WorkSpaces Web general use cases: remote working, BYOD environments, and education, each represented with an icon and numbered 01 to 03.](https://kodekloud.com/kk-media/image/upload/v1752862182/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-End-User-Computing/frame_520.jpg)

![The image illustrates the relevance of modern computing, highlighting flexibility and accessibility with interconnected icons representing technology concepts.](https://kodekloud.com/kk-media/image/upload/v1752862183/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-End-User-Computing/frame_540.jpg)

---

### Deep Dive into Amazon AppStream 2.0

Amazon AppStream 2.0 is designed to stream individual desktop applications rather than delivering a full desktop. It centralizes application licensing, updates, and patch management while streaming the application interface to the client device. This model minimizes the reliance on client hardware and operating systems.

Key benefits of Amazon AppStream 2.0 include:

- **Multi-Version Compatibility:** Run different versions of the same application side-by-side without conflicts.
- **Reduced Client Hardware Requirements:** Heavy processing is handled server-side, eliminating the need for high-end client devices.
- **Enhanced Security:** Ensures that data processing and storage occur within AWS’s secure infrastructure.
- **Cost Efficiency:** A scalable, pay-as-you-go pricing model that simplifies management and controls costs.

This service is particularly attractive for software vendors, educational institutions, and enterprises that require access to specific applications regardless of local operating systems.

![The image outlines two tasks accomplished by Amazon AppStream 2.0: delivering desktop applications to any computer and centralized application management.](https://kodekloud.com/kk-media/image/upload/v1752862184/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-End-User-Computing/frame_630.jpg)

![The image illustrates Amazon AppStream 2.0 use cases for software vendors, educational institutions, and enterprises.](https://kodekloud.com/kk-media/image/upload/v1752862186/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-End-User-Computing/frame_660.jpg)

![The image highlights Amazon AppStream 2.0's benefits: scalability, security, and cost-efficiency, using a flowchart with icons and text.](https://kodekloud.com/kk-media/image/upload/v1752862187/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-End-User-Computing/frame_730.jpg)

In summary, AppStream 2.0 enables secure, scalable, and cost-efficient application streaming while reducing client-side dependencies and ensuring centralized control over application updates and licensing.

![The image lists conclusions about delivering remote applications securely, targeting software vendors and educational institutions, supporting software versions, enabling cloud access, and reducing hardware dependencies.](https://kodekloud.com/kk-media/image/upload/v1752862188/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-End-User-Computing/frame_770.jpg)

---

## Summary

The AWS End-User Computing service family—comprising Amazon AppStream 2.0, Amazon WorkSpaces, and Amazon WorkSpaces Web—empowers organizations with secure and efficient access to virtual desktops and applications. Key takeaways include:

- Centralized data storage within AWS data centers enhances security.
- Scalable, pay-as-you-go solutions reduce IT management complexity and costs.
- Flexibility and customization support various work styles, including remote work, BYOD, and educational environments.
- Browser-based access through WorkSpaces Web addresses scenarios where installing client software is impractical.

![The image lists three Amazon services for streamlined access: AppStream 2.0, WorkSpaces, and WorkSpaces Web, each represented with icons and numbered sequentially.](https://kodekloud.com/kk-media/image/upload/v1752862190/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-End-User-Computing/frame_810.jpg)

These innovative solutions enable organizations to deliver secure and efficient end-user computing experiences while simplifying operations and reducing costs.

> [!important]
> **Note**
>
> I'm Michael Forrester—thank you for reading this lesson. Stay tuned for more insights in our upcoming articles.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/bc372a48-ec05-4d1c-a3ef-e6b3ac1caf48/lesson/e64578ca-a831-4298-9456-f89cdf956950)**
>
> Watch video content
