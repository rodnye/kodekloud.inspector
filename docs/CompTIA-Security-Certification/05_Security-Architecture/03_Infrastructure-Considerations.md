# Infrastructure Considerations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Security-Architecture/Infrastructure-Considerations)

---

## Table of Contents

- Infrastructure Considerations
  - Device Placement
  - Attack Surface and Attack Vectors
  - Connectivity
  - Failure Modes
  - Device Attributes
  - Network Appliances
  - Firewall Types
  - Conclusion
  - Watch Video

---

## Content

CompTIA Security+ Certification

Security Architecture

# Infrastructure Considerations

Welcome to this comprehensive guide on securing enterprise infrastructure. In this article, we investigate how to integrate security principles into your IT environment effectively. We cover a range of topics, including device placement, attack surface analysis, connectivity, failure modes, device attributes, network appliances, port security, and various firewall types. By the end of this guide, you will have a strong understanding of how to enhance your organization’s security posture.

![The image is an agenda slide outlining three points: security principles for enterprise infrastructure, key considerations for device and network security, and implementing security principles to enhance IT infrastructure.](https://kodekloud.com/kk-media/image/upload/v1752872130/notes-assets/images/CompTIA-Security-Certification-Infrastructure-Considerations/enterprise-security-agenda-slide.jpg)

As illustrated above, there is a vast amount of information to cover. Let's start by exploring the strategic positioning of devices within your network.

## Device Placement

Device placement involves positioning network devices in a manner that maximizes both security and performance. Two critical concepts to keep in mind are segmentation and defense in depth. Segmenting your network isolates sensitive data, while a layered security approach enhances overall resilience.

![The image is about device placement strategies, highlighting "Segmentation" for isolating sensitive data and "Defense in Depth" for implementing multiple security layers.](https://kodekloud.com/kk-media/image/upload/v1752872131/notes-assets/images/CompTIA-Security-Certification-Infrastructure-Considerations/device-placement-segmentation-defense.jpg)

For example, installing a firewall between your internal network and the Internet helps filter traffic, ensuring that only legitimate data flows into your network.

## Attack Surface and Attack Vectors

Understanding your organization’s attack surface is essential. The attack surface encompasses every possible entry point that an attacker could exploit. In contrast, an attack vector is the specific method or pathway—such as phishing, social engineering, or SQL injection—used to breach security.

![The image compares "Attack Vector" and "Attack Surface," explaining that an attack vector is a method an attacker can use, while an attack surface is the sum of all potential entry points for unauthorized access.](https://kodekloud.com/kk-media/image/upload/v1752872132/notes-assets/images/CompTIA-Security-Certification-Infrastructure-Considerations/attack-vector-vs-attack-surface.jpg)

To minimize risks:

- Reduce the number of exposed services.
- Eliminate unnecessary entry points.
- Conduct regular security audits.

![The image is a slide titled "Attack Surface" with two sections: "Minimize Exposure" and "Regular Audits," each with corresponding icons.](https://kodekloud.com/kk-media/image/upload/v1752872133/notes-assets/images/CompTIA-Security-Certification-Infrastructure-Considerations/attack-surface-minimize-exposure-audits.jpg)

## Connectivity

Connectivity defines how devices and systems interact within your network. It is crucial to establish secure communication channels—such as VPNs or TLS—to safeguard data during transit. Additionally, restrict access strictly to those users and systems that require it.

For instance, implementing a VPN ensures that remote access is both secure and limited to authorized personnel only.

![The image shows two icons labeled "Secure Channels" and "Controlled Access" under the heading "Connectivity."](https://kodekloud.com/kk-media/image/upload/v1752872133/notes-assets/images/CompTIA-Security-Certification-Infrastructure-Considerations/connectivity-secure-channels-access-icons.jpg)

## Failure Modes

It's important to understand the two primary failure modes that impact security during system disruptions:

- **Fail Open:**  
  In this configuration, the system remains accessible during a failure, potentially allowing unauthorized access. A common example is a firewall that, when it fails, permits all traffic.
- **Fail Close:**  
  Here, the system blocks access when a failure occurs, thereby preventing unauthorized entry. For example, a firewall that shuts down traffic completely upon failure operates in a fail-close manner.

![The image depicts a hooded figure representing a hacker, surrounded by symbols of cybersecurity threats like a lock, credit card, and bug, illustrating a "Security Risk."](https://kodekloud.com/kk-media/image/upload/v1752872134/notes-assets/images/CompTIA-Security-Certification-Infrastructure-Considerations/hooded-hacker-cybersecurity-risk.jpg)

![The image depicts a person using a key to unlock a padlock on a laptop screen, symbolizing controlled access, with a warning icon nearby.](https://kodekloud.com/kk-media/image/upload/v1752872136/notes-assets/images/CompTIA-Security-Certification-Infrastructure-Considerations/key-unlock-padlock-laptop-access.jpg)

## Device Attributes

Devices in a network can be categorized based on operational characteristics. Two main distinctions include:

- **Active vs. Passive Devices:**  
  Active devices, such as firewalls and IPS systems, engage with network traffic to block malicious actions. Passive devices, like intrusion detection systems and network taps, observe traffic without interfering, offering essential situational awareness.

![The image compares active and passive devices, highlighting that active devices interact with network traffic and block malicious activities, while passive devices monitor traffic without altering it.](https://kodekloud.com/kk-media/image/upload/v1752872136/notes-assets/images/CompTIA-Security-Certification-Infrastructure-Considerations/active-passive-devices-comparison.jpg)

- **Inline vs. Tap/Monitor Devices:**  
  Inline devices are installed directly into the network traffic flow and actively block threats, though they may introduce latency. In contrast, tap/monitor devices observe the traffic without affecting its flow, making them ideal for passive surveillance.

![The image compares Inline Devices and Tap/Monitor Devices, highlighting their positions in network traffic and their impact on threat blocking and traffic flow.](https://kodekloud.com/kk-media/image/upload/v1752872138/notes-assets/images/CompTIA-Security-Certification-Infrastructure-Considerations/inline-vs-tap-devices-comparison.jpg)

## Network Appliances

Network appliances are specialized devices that enhance both security and operational efficiency. Key types include:

- **Jump Servers:**  
  Jump servers act as secure intermediaries, enabling controlled access to devices in segregated security zones. They are particularly useful for accessing systems within a demilitarized zone (DMZ).

![The image depicts a person sitting on a large smartphone with a laptop, next to a tablet displaying a checkmark and a shield with a lock, symbolizing controlled access. The text "Jump Server" is in the top left corner.](https://kodekloud.com/kk-media/image/upload/v1752872139/notes-assets/images/CompTIA-Security-Certification-Infrastructure-Considerations/jump-server-smartphone-laptop-tablet.jpg)

- **Proxy Servers:**  
  Proxy servers serve as intermediaries between clients and the internet, providing anonymity for users while enforcing security policies. They help administrators monitor and control web traffic effectively.

![The image features a graphic of a checklist and gear icon, with text about proxy servers providing anonymity for users and security control for administrators.](https://kodekloud.com/kk-media/image/upload/v1752872140/notes-assets/images/CompTIA-Security-Certification-Infrastructure-Considerations/proxy-servers-checklist-gear-icon.jpg)

- **Load Balancers:**  
  Load balancers distribute incoming network traffic across multiple servers, ensuring high reliability and performance through redundancy. They play a vital role in maintaining balanced traffic distribution among web servers.

![The image features the text "Load Balancer" and an icon labeled "Redundancy" with a lock symbol inside a network-like design.](https://kodekloud.com/kk-media/image/upload/v1752872141/notes-assets/images/CompTIA-Security-Certification-Infrastructure-Considerations/load-balancer-redundancy-icon.jpg)

- **Sensors:**  
  Sensors are designed to collect and analyze network data in real time. They help detect anomalies that might indicate a security breach, offering early warnings of potential threats.

## Firewall Types

Firewalls are a cornerstone of network defense, and understanding their various types is key to deploying effective security measures. The primary categories include:

- **Web Application Firewall (WAF):**  
  WAFs focus on protecting web applications by filtering and monitoring HTTP traffic. They defend against attacks like SQL injections and cross-site scripting (XSS).

![The image is a graphic about application-level protection, highlighting defense against web application attacks like SQL injection and XSS. It features a lock icon and is labeled "Firewall" on the left.](https://kodekloud.com/kk-media/image/upload/v1752872141/notes-assets/images/CompTIA-Security-Certification-Infrastructure-Considerations/application-protection-firewall-graphic.jpg)

- **Unified Threat Management (UTM):**  
  UTM devices combine multiple security features—including firewalling, antivirus, and intrusion prevention—into a single solution. This integration simplifies the management of complex security needs.

![The image depicts a person using a laptop with a shield labeled "UTM" in the background, symbolizing comprehensive security and threat management.](https://kodekloud.com/kk-media/image/upload/v1752872142/notes-assets/images/CompTIA-Security-Certification-Infrastructure-Considerations/person-laptop-utm-security-shield.jpg)

- **Next-Generation Firewalls (NGFW):**  
  NGFWs enhance traditional firewall capabilities with features like application awareness, integrated intrusion prevention, deep packet inspection, and advanced threat protection. They effectively counter modern cyber threats.

Additionally, firewalls may operate at different layers of the OSI model:

- **Layer Four Firewalls:**  
  These firewalls manage traffic based on transport layer information, such as ports.
- **Layer Seven Firewalls:**  
  Operating at the application layer, these firewalls provide granular control over application traffic, which allows them to block specific application-level threats.

![The image is a diagram titled "Next-Generation Firewall" showing two types of firewalls: Layer 4 Firewalls and Layer 7 Firewalls.](https://kodekloud.com/kk-media/image/upload/v1752872143/notes-assets/images/CompTIA-Security-Certification-Infrastructure-Considerations/next-generation-firewall-diagram.jpg)

## Conclusion

In conclusion, securing enterprise infrastructure requires a holistic approach that encompasses device placement, attack surface minimization, secure connectivity, understanding failure modes, categorizing device attributes, leveraging network appliances, and selecting the right firewall technologies. Implementing these best practices will not only safeguard your critical assets but also strengthen your organization’s overall security posture.

![The image is a slide titled "Conclusion" with two points: applying security principles requires careful consideration, and organizations can enhance their security posture.](https://kodekloud.com/kk-media/image/upload/v1752872144/notes-assets/images/CompTIA-Security-Certification-Infrastructure-Considerations/conclusion-security-principles-enhancement.jpg)

> [!important]
> **Note**
>
> For more detailed information on implementing these security strategies, consider exploring additional resources like [Kubernetes Documentation](https://kubernetes.io/docs/) and [Docker Hub](https://hub.docker.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/f2757634-6347-4186-a981-c205389f227e/lesson/f365abdd-1ebf-4cb6-acf5-e13e00c6176c)**
>
> Watch video content
