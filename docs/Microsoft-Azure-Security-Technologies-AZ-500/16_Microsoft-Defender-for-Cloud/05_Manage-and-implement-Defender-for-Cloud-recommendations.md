# Manage and implement Defender for Cloud recommendations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Microsoft-Defender-for-Cloud/Manage-and-implement-Defender-for-Cloud-recommendations)

---

## Table of Contents

- Manage and implement Defender for Cloud recommendations
  - Key Benefits
  - Navigating Recommendations in the Azure Portal
  - Next Steps
  - Watch Video
    - Proactive Protection
    - Tailored Security Posture
    - Improved Secure Score
    - Holistic Oversight
    - Future-Proofing

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Microsoft Defender for Cloud

# Manage and implement Defender for Cloud recommendations

Microsoft Defender for Cloud is a comprehensive security platform that not only protects your cloud environment but also delivers intelligent recommendations to enhance your security posture. In this article, we explore the key benefits of these recommendations and demonstrate how to implement them directly from the Azure portal.

## Key Benefits

### Proactive Protection

Defender for Cloud anticipates potential threats by identifying vulnerabilities and recommending actionable fixes before issues escalate. With many quick fixes integrated within the Azure portal, you can efficiently resolve issues without juggling multiple tools.

### Tailored Security Posture

Every organization has its unique security needs. Defender for Cloud provides personalized recommendations based on detailed policy audits specific to your resources. This targeted approach ensures that the fixes suggested are relevant to your infrastructure and not generic security assessments.

### Improved Secure Score

One of the standout features of Defender for Cloud is its Secure Score—a quantifiable metric that reflects the strength of your security posture. Each recommendation you implement adds points (e.g., three or six points) to your overall score, offering a clear, measurable way to track your progress.

> [!important]
> **Note**
>
> Monitoring your Secure Score helps you understand the impact of each security enhancement, enabling continuous improvement in your cloud security.

### Holistic Oversight

Gain a 360-degree view of your cloud environment. Defender for Cloud covers everything from misconfigurations to potential breach vectors, offering a comprehensive dashboard that keeps you informed.

![The image shows a dashboard for managing and implementing security center recommendations, highlighting a secure score and resource health. It also lists benefits like proactive protection, tailored security posture, improved secure score, and holistic oversight.](https://kodekloud.com/kk-media/image/upload/v1752882036/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-and-implement-Defender-for-Cloud-recommendations/security-center-dashboard-recommendations.jpg)

### Future-Proofing

With continuous updates that incorporate the latest threat intelligence, Defender for Cloud evolves alongside your infrastructure. Whether you’re a system administrator, architect, or a security novice, the clear descriptions and remediation steps ensure you can effectively implement each recommendation.

## Navigating Recommendations in the Azure Portal

Follow these steps to access and apply recommendations directly from the Azure portal:

1.  **Accessing Recommendations:**  
    Open Microsoft Defender for Cloud in the Azure portal. Even if using the free version, you can view all available recommendations. For example, you might see that your Secure Score is 33, along with a detailed list of recommendations.
2.  **Applying System Updates:**  
    Click on a recommendation like “Apply system updates.” Often, this suggestion involves installing the Log Analytics agent on virtual machines. Due to recent transitions to the Azure Monitoring Agent, you may opt to ignore this recommendation or add an exemption to prevent it from lowering your score.
3.  **Enabling Encryption at Rest:**  
    Select the recommendation for “Enable encryption at rest.” The description explains that while the OS and data disks of a virtual machine are encrypted using PMK by default, the temporary disk and data cache remain unencrypted, as does data while in transit between compute and storage resources. Follow the provided remediation steps to enable disk encryption on your virtual machines or set an exemption if needed.
4.  **Protecting Internet-Facing Applications:**  
    For internet-facing applications, recommendations might advise the use of Network Security Groups (NSGs). For instance, the recommendation titled “All network ports should be restricted on NSGs” details how to add rules within the networking blade to block specific IP ranges.

    ![The image shows a Microsoft Azure portal screen with a security recommendation to restrict all network ports on virtual machines. It lists affected resources with details like name, subscription, and last change date.](https://kodekloud.com/kk-media/image/upload/v1752882037/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Manage-and-implement-Defender-for-Cloud-recommendations/azure-portal-security-recommendation.jpg)

    If an internet connection is required, you can configure allowed IP ranges; otherwise, consider removing the public IP address to minimize exposure.

5.  **Understanding the Context:**  
    Each recommendation includes detailed information about the tactics being mitigated (such as initial access, execution, and credential discovery), which align with various stages of the cyber kill chain. This context helps you gauge the potential impact and urgency of each recommendation.

## Next Steps

Once you implement the appropriate recommendations, monitor your Secure Score to track improvements. In our upcoming article, we'll delve into how the Secure Score functions and share additional strategies for continuous security enhancements.

By leveraging the tailored recommendations provided by Microsoft Defender for Cloud, you can ensure your cloud environment remains secure, compliant, and resilient against evolving threats.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/aea85892-224f-4bd2-8013-e36764e15f37/lesson/3bec30f2-6c75-47c4-8f38-aa5e24954a95)**
>
> Watch video content
