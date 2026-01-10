# Configure risk event detections - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Microsoft-Azure-Security-Technologies-AZ-500/Identity-Protection/Configure-risk-event-detections)

---

## Table of Contents

- Configure risk event detections
  - What Is a Risk Event?
  - Common Risk Event Types
  - Detailed Risk Event Examples
  - Azure AD Identity Protection Dashboard
  - Watch Video
    - Anonymous IP Address
    - Atypical Travel
    - Malware-Linked IP Addresses
    - Unfamiliar Sign-in Properties
    - Leaked Credentials
    - Password Spray Attacks
    - Azure AD Threat Intelligence
    - New Country & MCAS-Integrated Events

---

## Content

Microsoft Azure Security Technologies (AZ-500)

Identity Protection

# Configure risk event detections

Azure AD Identity Protection is designed to assess user identities, record potentially harmful activities, and initiate remediation as needed. In this guide, we explain what a risk event is and provide detailed examples of how Azure AD Identity Protection identifies risks.

## What Is a Risk Event?

A risk event is any detected activity that deviates from a user's normal behavior, suggesting a potential security threat. Azure AD Identity Protection captures a range of risk events by monitoring sign-ins, user behavior, and other relevant signals. Each entry in the risk event log represents a potentially dangerous event that may require additional verification or remediation steps.

## Common Risk Event Types

Below is a table summarizing several key risk event types and illustrating real-world scenarios:

| Risk Event Type               | Description                                                                    | Example Scenario                                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Anonymous IP Address          | Detects logins from hidden or anonymous sources (e.g., Tor or VPN).            | A user typically logging in from New York suddenly attempts to sign in via a Tor browser.                                   |
| Atypical Travel               | Flags sign-ins from locations that deviate from the user's usual pattern.      | An employee in San Francisco logs in from Russia, triggering a security alert.                                              |
| Malware-linked IP Address     | Monitors logins from IP addresses linked to known malware activity.            | A sign-in attempt from an IP address identified as a source of ransomware is detected.                                      |
| Unfamiliar Sign-in Properties | Observes anomalies in login behavior (e.g., unusual times or unknown devices). | An employee who normally uses a company laptop during weekdays logs in at midnight from a mobile device.                    |
| Leaked Credentials            | Cross-references data breaches to check for exposed valid credentials.         | A user's email and password, if found in a data breach, trigger a flag for immediate password change.                       |
| Password Spray Attack         | Identifies attempts using a common password across multiple accounts.          | Multiple accounts accessed using a common password (e.g., "123456") are flagged for review.                                 |
| New Country                   | Tracks logins from countries not previously associated with the user.          | An employee based in the United States signs in from Japan for the first time.                                              |
| MCAS-Integrated Events        | Monitors anonymous IP activity and suspicious inbox forwarding via MCAS.       | Alerts are generated when logins occur from anonymous IP addresses or emails are forwarded to unfamiliar external accounts. |

> [!important]
> **Note**
>
> The integration with Microsoft Cloud App Security (MCAS) provides additional monitoring for events such as anonymous IP activity and suspicious inbox forwarding. These events help administrators to pinpoint anomalous behavior that may indicate a security compromise.

## Detailed Risk Event Examples

### Anonymous IP Address

This event identifies when logins are initiated from concealed or anonymous sources (e.g., Tor browsers or VPNs). Such logins are automatically flagged as high risk. For example, if a user who usually logs in from New York suddenly uses a Tor browser, Azure AD Identity Protection may require extra verification steps like multi-factor authentication—or in some cases, block the login attempt.

### Atypical Travel

The system detects when a user's sign-in location deviates from their normal pattern. For instance, if an employee who typically accesses the system from San Francisco suddenly signs in from Russia, Azure AD Identity Protection may trigger a temporary account lock or request additional authentication measures.

### Malware-Linked IP Addresses

Azure AD Identity Protection continuously monitors sign-ins from IP addresses that have been associated with malware. Should a login attempt originate from an IP linked to ransomware activity, the system might block it, prompt extra verification, and alert administrators of the potential threat.

### Unfamiliar Sign-in Properties

This feature tracks anomalies in user login behavior, such as unusual login times or the use of unrecognized devices. For example, when an employee accustomed to logging in during business hours from a company laptop accesses their account at midnight from a mobile device, the system flags that as abnormal behavior and requires further authentication.

### Leaked Credentials

By cross-referencing multiple data sources, Azure AD Identity Protection checks if a user’s credentials have been compromised in a data breach. If valid login details are discovered in such a breach, the affected account will be flagged and a password change might be enforced.

### Password Spray Attacks

The system is designed to detect attempts where common passwords are used in multiple account login attempts—a common tactic in password spray attacks. If several accounts are being accessed using a weak password like "123456", the system will lock those accounts and alert global administrators.

### Azure AD Threat Intelligence

Azure AD Threat Intelligence leverages advanced detection systems to recognize known attack patterns. For example, when a new phishing technique is identified, threat intelligence updates its parameters to enhance protection against such threats.

### New Country & MCAS-Integrated Events

The "new country" feature monitors logins from locations that have not been previously observed for a given user. For instance, if an employee based in the United States signs in from Japan—an unfamiliar location—the event is flagged for review. Additionally, activities from anonymous IP addresses and suspicious inbox forwarding are managed in conjunction with MCAS. These events alert administrators if a user’s emails are being forwarded to an unknown external address or if logins occur from suspicious IP sources.

## Azure AD Identity Protection Dashboard

To visualize these risk events, refer to the Azure AD Identity Protection dashboard in Azure AD. Even if no risks are currently detected, switching from a seven-day to a 90-day view can reveal recent risk activity. For example, risk activity recorded on September 1st might have been intentionally triggered from a virtual machine deployed in East US. This unusual sign-in displays properties—such as browser, device, IP address, location, Exchange ActiveSync ID, and tenant subnet IP—that differ from normal user behavior.

![The image shows a Microsoft Azure Identity Protection dashboard displaying risk detection details for an unfamiliar sign-in, including information about the detection type, risk state, and sign-in location.](https://kodekloud.com/kk-media/image/upload/v1752881932/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-risk-event-detections/azure-identity-protection-dashboard.jpg)

As illustrated above, the combination of these properties results in the sign-in being flagged as unfamiliar. Administrators responsible for securing environments with risky user activity can review these risk detections to take appropriate action.

For another perspective of the dashboard view:

![The image shows a Microsoft Azure Identity Protection dashboard displaying risk detections, including details like detection time, user, IP address, location, detection type, risk state, and risk level.](https://kodekloud.com/kk-media/image/upload/v1752881932/notes-assets/images/Microsoft-Azure-Security-Technologies-AZ-500-Configure-risk-event-detections/azure-identity-protection-dashboard-2.jpg)

This detailed view reinforces how Azure AD Identity Protection continuously monitors and safeguards user identities. In the next section, we will discuss the user risk policy and explore how to configure it for enhanced security.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/microsoft-azure-security-technologies-az-500/module/d856cd5d-a782-4723-82b7-5a6e69cba71d/lesson/3d01ed5c-404c-4489-a179-0f7296fc2858)**
>
> Watch video content
