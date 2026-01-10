# Conditional Access - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AZ900-Microsoft-Azure-Fundamentals/Identity-Access-and-Security/Conditional-Access)

---

## Table of Contents

- Conditional Access
  - How Conditional Access Works
  - Key Features of Conditional Access
  - Benefits of Conditional Access
  - Watch Video
    - User and Group-Based Policies
    - Location-Based Policies
    - Device-Based Policies
    - Risk-Based Policies

---

## Content

AZ900: Microsoft Azure Fundamentals

Identity Access and Security

# Conditional Access

Conditional Access is a core security feature in Azure that enforces access controls on cloud applications based on specific conditions. In this guide, we explore how Conditional Access functions within the Azure ecosystem and how it keeps your data secure.

Imagine arriving at an airport where security performs a thorough check before granting access to restricted areas. Similarly, Conditional Access evaluates several signals to determine whether to allow or block access to resources.

## How Conditional Access Works

The process begins with the collection of key signals such as:

- **User and Location:** Identifies who is accessing and where the access is coming from.
- **Device Security:** Confirms that the device complies with security standards.
- **Application Type:** Determines whether the access is through browsers like Safari or Edge.
- **Real-Time Risk Evaluation:** Spots any suspicious behaviors or deviations from typical usage patterns.

Each time you sign in, Azure records this data to establish a usage pattern. If there is an anomaly—such as a login from an unfamiliar location or device—Azure immediately flags it as a potential risk.

Once these signals are collected, Azure moves into the verification stage. During this phase, it makes one of the following decisions:

- Grant access if all conditions are met.
- Request Multi-Factor Authentication (MFA) to add an extra layer of security.
- Block access if the risk is deemed too high.

If access is approved, users seamlessly reach the necessary applications and data.

![The image is a flowchart illustrating a conditional access process, showing signals like user location and devices, verification steps such as allowing access or requiring MFA, and access to apps and data.](https://kodekloud.com/kk-media/image/upload/v1752868407/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Conditional-Access/conditional-access-flowchart-signals.jpg)

> [!important]
> **Note**
>
> Understanding the flow of signals and verification steps is crucial. Each step reinforces your organization's security posture by ensuring that only the appropriate users gain access.

## Key Features of Conditional Access

Conditional Access incorporates several features that contribute to a robust security framework:

### User and Group-Based Policies

Think of this as issuing tailored entry passes for different areas within a building. User and group-based policies let you assign access controls to individual users or specific groups, ensuring that restrictions apply precisely where needed.

### Location-Based Policies

Just as some documents may only be accessible in certain offices, location-based policies restrict access based on where a user is trying to sign in. For instance, you might allow access to critical applications only when users are on the corporate network.

### Device-Based Policies

Like verifying a security badge before entry, device-based policies ensure that access is only granted from devices that meet your organization’s security requirements. This includes compliance with operating system standards, antivirus protection, and other security protocols.

### Risk-Based Policies

Risk-based policies work alongside Azure Risk Detection. If Azure notices a deviation from the established usage pattern—such as an unexpected login location—it can immediately escalate the response by blocking access or demanding additional verification.

![The image outlines four key features of conditional access: user and group-based policies, location-based policies, device-based policies, and risk-based policies.](https://kodekloud.com/kk-media/image/upload/v1752868408/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Conditional-Access/conditional-access-key-features.jpg)

## Benefits of Conditional Access

Implementing Conditional Access in your organization offers a range of benefits:

- **Enhanced Security:** Only authorized users meeting the appropriate conditions can access sensitive resources.
- **Flexibility and Control:** Policies can be finely tuned for specific applications, users, or devices, similar to instituting customizable locks for different doors.
- **Improved User Experience:** By minimizing unnecessary obstacles for legitimate users while effectively keeping out unauthorized access attempts, Conditional Access supports a smooth workflow.

![The image outlines the benefits of conditional access, highlighting enhanced security, flexibility and control, and a streamlined user experience.](https://kodekloud.com/kk-media/image/upload/v1752868409/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Conditional-Access/conditional-access-benefits-diagram.jpg)

> [!important]
> **Remember**
>
> Conditional Access is especially beneficial in remote work or Bring Your Own Device (BYOD) environments, where securing access from various locations and devices is critical.

Essentially, Conditional Access functions akin to an "if-then" statement: If a user meets certain criteria (for example, signing in from a recognized location), then access is granted; otherwise, access might be denied or require further authentication.

In conclusion, Conditional Access forms a foundational element of secure cloud access management, paving the way for a deeper exploration into business-to-business (B2B) and business-to-customer (B2C) concepts within Microsoft Entra.

![The image illustrates a flowchart of conditional access use cases, showing the process from user sign-in to access verification and corporate application access, with options to allow access, require MFA, or block access.](https://kodekloud.com/kk-media/image/upload/v1752868410/notes-assets/images/AZ900-Microsoft-Azure-Fundamentals-Conditional-Access/conditional-access-flowchart-use-cases.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/az900-microsoft-azure-fundamentals/module/89fa8b43-65f9-450e-9f65-ebd0bcd5ca8b/lesson/c2ecfc7c-09a6-421b-9d7b-5a513b6ec18f)**
>
> Watch video content
