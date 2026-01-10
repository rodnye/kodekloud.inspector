# Network Attacks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Threats-Vulnerabilities-and-Mitigations/Network-Attacks)

---

## Table of Contents

- Network Attacks
  - Denial of Service (DoS) and Distributed Denial of Service (DDoS) Attacks
  - Domain Name System (DNS) Attacks
  - On-Path Attacks
  - Conclusion
  - Watch Video

---

## Content

CompTIA Security+ Certification

Threats Vulnerabilities and Mitigations

# Network Attacks

Network attacks occur when a threat actor exploits vulnerabilities in a network's infrastructure. This broad category includes various methods such as distributed denial of service attacks, DNS manipulations, wireless intrusions, on-path interceptions, credential replays, and the injection of malicious code.

![The image lists six types of network attacks: Distributed Denial of Service, Domain Name System, Wireless, On-Path, Credential Replays, and Malicious Code, each with an icon.](https://kodekloud.com/kk-media/image/upload/v1752872613/notes-assets/images/CompTIA-Security-Certification-Network-Attacks/network-attacks-types-icons.jpg)

> [!important]
> **Quick Overview**
>
> Understanding the tactics used in network attacks is critical for cybersecurity professionals. Recognizing these techniques helps in designing robust defenses to mitigate threats effectively.

## Denial of Service (DoS) and Distributed Denial of Service (DDoS) Attacks

A Denial of Service (DoS) attack aims to render a website or service inaccessible by overwhelming it with an enormous volume of traffic. In contrast, a Distributed Denial of Service (DDoS) attack involves multiple computers concurrently generating this excessive traffic. In most cases, these machines are compromised devices, collectively known as a botnet, which are remotely controlled by the attacker to flood the target server with requests.

![The image illustrates a Distributed Denial of Service (DDoS) attack, showing an attacker using a botnet to overwhelm a target server, causing it to go down.](https://kodekloud.com/kk-media/image/upload/v1752872614/notes-assets/images/CompTIA-Security-Certification-Network-Attacks/ddos-attack-botnet-illustration.jpg)

> [!important]
> **Security Alert**
>
> DDoS attacks can severely disrupt business operations. It is essential to implement robust network monitoring and mitigation strategies to defend against these large-scale attacks.

## Domain Name System (DNS) Attacks

The Domain Name System (DNS) plays a pivotal role in resolving human-friendly domain names to their corresponding IP addresses, ensuring proper routing of internet traffic. However, attackers can manipulate the DNS process to redirect users to fraudulent sites or execute phishing schemes without their knowledge. For instance, a harmless URL like "www.kodekloud.gov" might be redirected to a malicious server if the DNS records are tampered with.

![The image illustrates a basic concept of the Domain Name System (DNS), showing a user connecting to a DNS server to resolve a domain name.](https://kodekloud.com/kk-media/image/upload/v1752872615/notes-assets/images/CompTIA-Security-Certification-Network-Attacks/dns-domain-name-resolution-diagram.jpg)

## On-Path Attacks

On-path attacks, previously known as man-in-the-middle attacks, occur when an attacker positions themselves between a sender and a receiver in a network communication. This positioning allows the attacker to intercept and potentially alter the traffic, leading to the unauthorized collection of sensitive information such as login credentials or personal data. The attacker can silently eavesdrop on the communication between a user's computer and a website, compromising the confidentiality and integrity of the data exchanged.

![The image illustrates an "On-Path Attack" scenario, showing a user, an attacker, and a website, with the attacker intercepting communication between the user and the website.](https://kodekloud.com/kk-media/image/upload/v1752872616/notes-assets/images/CompTIA-Security-Certification-Network-Attacks/on-path-attack-scenario-diagram.jpg)

## Conclusion

Each network attack method exploits a different aspect of network communication. By understanding the mechanics behind these methods, cybersecurity professionals can develop comprehensive strategies to protect their networks from potential breaches and data theft.

For further reading on network security strategies and best practices, consider exploring [Kubernetes Documentation](https://kubernetes.io/docs/) and [Docker Hub](https://hub.docker.com/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/208b2070-c737-43e9-b012-7f868f1621be/lesson/e7b5b838-9b44-4b88-b9fa-19aeaa404ab7)**
>
> Watch video content
