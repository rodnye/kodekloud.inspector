# Social Engineering - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Threats-Vulnerabilities-and-Mitigations/Social-Engineering)

---

## Table of Contents

- Social Engineering
  - Watch Video

---

## Content

CompTIA Security+ Certification

Threats Vulnerabilities and Mitigations

# Social Engineering

One of the most damaging attack vectors in cybersecurity is the human element. Beyond vulnerabilities in hardware, software, and systems, individuals—employees, customers, contractors, and suppliers—represent a significant attack surface.

Often, people are granted system access to perform legitimate tasks. However, this same access can be exploited when individuals are manipulated or tricked into revealing credentials or inadvertently granting unauthorized access.

![The image illustrates a social engineering concept, highlighting a person as a major attack surface with connections to employees, customers, contractors, and suppliers.](https://kodekloud.com/kk-media/image/upload/v1752872646/notes-assets/images/CompTIA-Security-Certification-Social-Engineering/social-engineering-attack-surface.jpg)

This method is known as social engineering, sometimes described as "acting the human." Common techniques include impersonation and pretexting, where an attacker poses as someone in a trusted position to coerce a target into taking a specific action—often under a false sense of urgency.

![The image illustrates the concept of "Impersonation and Pretext," showing a flow from impersonation/pretext to authority, leading to performing an action, with icons representing each step.](https://kodekloud.com/kk-media/image/upload/v1752872647/notes-assets/images/CompTIA-Security-Certification-Social-Engineering/impersonation-pretext-flow-diagram.jpg)

Attackers may also use social consensus to create the impression that everyone is complying with the request, thereby making any refusal appear abnormal. In addition, phishing is one of the most prevalent attack techniques in this domain.

> [!important]
> **Phishing Attack Overview**
>
> Phishing attacks lure users into executing malicious code concealed within seemingly legitimate emails or files. A single click on a deceptive link may lead to the compromise of login credentials or unauthorized system access. Attackers sometimes set up counterfeit websites, such as fake bank login pages, to steal sensitive information.

![The image illustrates a phishing attack, showing how an attacker gains unauthorized access by copying a user's login credentials through deceptive emails.](https://kodekloud.com/kk-media/image/upload/v1752872648/notes-assets/images/CompTIA-Security-Certification-Social-Engineering/phishing-attack-login-credentials.jpg)

While most phishing attempts are executed through email, they can also occur over telephone or voice channels.

![The image shows two labeled boxes related to phishing: one for "Mail" with an envelope icon, and another for "Telephone or Voice Channel" with a phone icon.](https://kodekloud.com/kk-media/image/upload/v1752872649/notes-assets/images/CompTIA-Security-Certification-Social-Engineering/phishing-mail-telephone-boxes.jpg)

When phishing is conducted over voice channels, it is known as vishing; when it occurs via SMS text messages, it is termed smishing.

![The image illustrates two types of phishing: "Vishing" through telephone or voice channels, and "Smishing" via SMS text messaging.](https://kodekloud.com/kk-media/image/upload/v1752872650/notes-assets/images/CompTIA-Security-Certification-Social-Engineering/vishing-smishing-phishing-illustration.jpg)

Business compromise emails are a specialized form of phishing that include steps to appear as though they originate internally within the organization. For example, an attacker might send an urgent email impersonating a company executive to trick the target into actions like purchasing gift cards for a fictitious event.

![The image depicts a laptop displaying an email with a warning symbol, surrounded by floating envelopes, illustrating the concept of business compromise emails.](https://kodekloud.com/kk-media/image/upload/v1752872651/notes-assets/images/CompTIA-Security-Certification-Social-Engineering/business-compromise-email-warning-laptop.jpg)

It is important to distinguish this from whaling—a targeted phishing attack aimed specifically at high-profile individuals rather than regular employees.

![The image illustrates a concept of "whaling," showing a laptop with a phishing login screen and emails, symbolizing targeted phishing attacks on high-profile individuals.](https://kodekloud.com/kk-media/image/upload/v1752872652/notes-assets/images/CompTIA-Security-Certification-Social-Engineering/whaling-phishing-laptop-emails.jpg)

Another sophisticated technique is the watering hole attack. Unlike phishing—where the attacker directly entices the target to click on a malicious link—a watering hole attack involves compromising a website known to be popular with a specific group. Once infected, the site delivers a malicious payload to visitors during their interaction.

![The image illustrates a "Watering Hole Attack," showing a laptop with a magnifying glass over a website, and a caption explaining that an attacker targets a popular website for a specific group.](https://kodekloud.com/kk-media/image/upload/v1752872653/notes-assets/images/CompTIA-Security-Certification-Social-Engineering/watering-hole-attack-laptop-magnifying-glass.jpg)

![The image illustrates a "Watering Hole Attack," showing a laptop with a website being infected by bugs.](https://kodekloud.com/kk-media/image/upload/v1752872654/notes-assets/images/CompTIA-Security-Certification-Social-Engineering/watering-hole-attack-laptop-bugs.jpg)

Pharming is a more complex attack that redirects users to a malicious website even when the correct URL is entered. This method manipulates the Domain Name System (DNS), which converts website names into IP addresses. For example, a user typing www.kodekloud.com might be unknowingly redirected to an attacker-controlled site.

![The image illustrates a pharming attack, where an attacker injects a fake DNS entry, redirecting a user's request from a real website to a fake one.](https://kodekloud.com/kk-media/image/upload/v1752872655/notes-assets/images/CompTIA-Security-Certification-Social-Engineering/pharming-attack-fake-dns-entry.jpg)

Typosquatting exploits common typing errors in website addresses. An attacker registers a domain name that closely resembles a legitimate one (e.g., www.kodekloud.com versus www.kodecloud.com) and designs it to mimic the real site. Users who make a typographical error are then directed to the fraudulent site.

![The image illustrates a typosquatting attack, where an attacker purchases a domain with a typo ("kidekloud.com") similar to a legitimate domain ("kodekloud.com").](https://kodekloud.com/kk-media/image/upload/v1752872656/notes-assets/images/CompTIA-Security-Certification-Social-Engineering/typosquatting-attack-domain-illustration.jpg)

Finally, it is crucial to understand the role of lures in social engineering attacks. A lure is an enticing element—such as an email, USB drive, or other removable media—that encourages a user to click on a link or execute a file containing hidden malicious code. Lures may be disguised as useful applications, documents, or image files.

![The image is an infographic titled "Social Engineering" that lists "Phishing Lures" such as messages, removable media, programs/trojan horses, documents, and image files.](https://kodekloud.com/kk-media/image/upload/v1752872657/notes-assets/images/CompTIA-Security-Certification-Social-Engineering/social-engineering-phishing-lures-infographic.jpg)

> [!important]
> **Stay Vigilant**
>
> Always verify the authenticity of emails, websites, and other digital communications before taking action. Maintaining vigilance is critical in defending against social engineering attacks.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/208b2070-c737-43e9-b012-7f868f1621be/lesson/ba8fd772-5e19-4fbf-9eb4-bc89da84d6e2)**
>
> Watch video content
