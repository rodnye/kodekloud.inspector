# Secondary AWS Services IoT Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Cloud-Practitioner-CLF-C02/Technology-Part-Three/Secondary-AWS-Services-IoT-Services)

---

## Table of Contents

- Secondary AWS Services IoT Services
  - AWS IoT Core
  - AWS IoT Greengrass
  - Summary
  - Watch Video

---

## Content

AWS Cloud Practitioner CLF-C02

Technology Part Three

# Secondary AWS Services IoT Services

Welcome back, Cloud Practitioners!

In this article, we explore two essential AWS IoT services featured in the [CLF-C02 Cloud Practitioner exam](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02): AWS IoT Core and AWS IoT Greengrass. Although AWS provides a variety of IoT services, these two are highlighted for their relevance to large-scale IoT deployments. Below, we break down the core functionalities, use cases, and benefits of each service.

---

## AWS IoT Core

AWS IoT Core is designed for centralized device management, secure connectivity, and efficient message brokering. It is the backbone of many IoT solutions by maintaining device registries, tracking device states, and aggregating messages from connected devices. Supported communication protocols include MQTT, WebSockets, and HTTPS, with integration to X.509 certificates for enhanced security. This service is widely used for industrial automation, smart homes, connected vehicles, and similar scenarios requiring robust fleet management.

![The image illustrates AWS IoT Core's tasks: secure device connectivity, data processing, and device management for large fleets.](https://kodekloud.com/kk-media/image/upload/v1752862201/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-IoT-Services/frame_210.jpg)

**Key Features of AWS IoT Core:**

- Secure device connectivity and robust fleet management.
- Maintenance of device registries and last known states.
- Acts as a message broker to collect and aggregate IoT data.
- Supports data processing, transformation, and rule-based engines.
- Seamless integration with other AWS services, offering scalable and cost-effective solutions.

![The image outlines AWS IoT Core use cases: industrial automation, smart home solutions, and connected vehicles.](https://kodekloud.com/kk-media/image/upload/v1752862202/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-IoT-Services/frame_240.jpg)

> [!important]
> **Note**
>
> AWS IoT Core is best suited for applications that leverage reliable and continuous Internet connectivity, as it centralizes device management and data analytics.

![The image is a slide titled "Conclusion," highlighting secure device connectivity, data processing, and device management for large fleets.](https://kodekloud.com/kk-media/image/upload/v1752862203/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-IoT-Services/frame_330.jpg)

---

## AWS IoT Greengrass

AWS IoT Greengrass extends computing capabilities beyond the cloud by enabling local processing, analysis, and device management. Unlike the centralized approach of IoT Core, Greengrass operates at the edge, allowing for containerized applications and on-site machine learning inference. This local processing is crucial for environments with intermittent or limited connectivity, including remote industrial sites, agricultural fields, and connected vehicles.

![The image describes AWS IoT Greengrass as a local IoT orchestrator, highlighting core functionalities: local compute, messaging, and data caching.](https://kodekloud.com/kk-media/image/upload/v1752862204/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-IoT-Services/frame_430.jpg)

**Main Capabilities of AWS IoT Greengrass:**

- Executes local computing tasks, including containerized applications.
- Manages local messaging and supports data stream processing.
- Caches data to ensure continuity in environments with limited connectivity.
- Enables on-site machine learning inference to facilitate real-time decisions.
- Ensures secure device deployments and smooth integration with local hardware.

These features empower various real-world applications, such as industrial automation, smart agriculture, and healthcare, where fast, localized data processing is paramount.

![The image outlines AWS IoT Greengrass tasks: enabling edge computing, local data processing and analysis, and secure device deployment and management.](https://kodekloud.com/kk-media/image/upload/v1752862205/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-IoT-Services/frame_460.jpg)

![The image illustrates three AWS IoT Greengrass use cases: industrial automation, smart agriculture, and healthcare, each represented with icons and numbered 01 to 03.](https://kodekloud.com/kk-media/image/upload/v1752862206/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-IoT-Services/frame_480.jpg)

> [!important]
> **Important**
>
> In areas where reliable connectivity is a challenge, AWS IoT Greengrass significantly reduces latency by processing data locally, ensuring uninterrupted operations.

![The image highlights the relevance of modern computing, focusing on facilitating IoT solutions at the edge and enabling offline operations to reduce latency.](https://kodekloud.com/kk-media/image/upload/v1752862207/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-IoT-Services/frame_510.jpg)

---

## Summary

Both AWS IoT Core and AWS IoT Greengrass are integral components of comprehensive IoT solutions:

| Service            | Key Functionality                                                       | Ideal Use Case                                                                                                            |
| ------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| AWS IoT Core       | Centralized device connectivity, message brokering, and data processing | Scenarios with robust, continuous Internet connectivity, such as industrial automation and smart homes.                   |
| AWS IoT Greengrass | Local data processing, containerized computing, and offline operations  | Applications that require fast, local decision-making in environments with limited or intermittent Internet connectivity. |

![The image describes AWS IoT solutions: IoT Core for centralized device management and IoT Greengrass for localized edge computing.](https://kodekloud.com/kk-media/image/upload/v1752862209/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-IoT-Services/frame_600.jpg)

Both services are deeply integrated within the AWS ecosystem, providing strong security measures and scalability. While IoT Core excels in managing large fleets of connected devices in well-connected environments, IoT Greengrass is optimized for edge computing where local processing is critical.

![The image highlights AWS IoT Core for secure device connectivity and AWS IoT Greengrass for enhanced security in local deployments, under "Security and Scalability."](https://kodekloud.com/kk-media/image/upload/v1752862210/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-IoT-Services/frame_620.jpg)

![The image describes AWS IoT Core for cloud-based data processing and AWS IoT Greengrass for offline operations and reduced latency in edge computing.](https://kodekloud.com/kk-media/image/upload/v1752862211/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-IoT-Services/frame_640.jpg)

![The image describes real-world applications of AWS IoT Core and AWS IoT Greengrass in industrial automation, smart homes, connected vehicles, agriculture, healthcare, and more.](https://kodekloud.com/kk-media/image/upload/v1752862213/notes-assets/images/AWS-Cloud-Practitioner-CLF-C02-Secondary-AWS-Services-IoT-Services/frame_670.jpg)

Understanding the strengths of both AWS IoT Core and IoT Greengrass is crucial for building efficient, secure, and scalable IoT solutions. These topics are essential for the [Cloud Practitioner exam](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02), so a firm grasp of each service’s role in the IoT ecosystem is highly recommended.

I'm Michael Forrester, and I look forward to seeing you in the next article.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-cloud-practitioner-clf-c02/module/bc372a48-ec05-4d1c-a3ef-e6b3ac1caf48/lesson/b6c92e9f-24ce-442f-92bc-023444d3de75)**
>
> Watch video content
