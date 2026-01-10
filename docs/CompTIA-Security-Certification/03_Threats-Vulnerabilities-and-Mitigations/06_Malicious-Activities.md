# Malicious Activities - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Threats-Vulnerabilities-and-Mitigations/Malicious-Activities)

---

## Table of Contents

- Malicious Activities
  - What Is Malware?
  - Viruses
  - Macro Viruses and Worms
  - Trojans
  - Spyware and Keyloggers
  - Ransomware and Logic Bombs
  - Rootkits
  - Watch Video
    - Boot Viruses
    - Memory-Resident Viruses

---

## Content

CompTIA Security+ Certification

Threats Vulnerabilities and Mitigations

# Malicious Activities

In this article, we explore a range of malicious activities—including malware, application attacks, password attacks, physical attacks, and attack indicators. We begin by delving into the world of malware and its various forms.

## What Is Malware?

Malware, short for malicious software, is any software that performs actions not intended by the user. This umbrella term covers harmful programs such as viruses, worms, Trojan horses, potentially unwanted programs (PUPs) or bloatware, spyware, keyloggers, ransomware, logic bombs, and rootkits.

![The image is an infographic listing different types of malware, including virus, worm, trojan, PUPs/bloatware, spyware, keyloggers, ransomware, logic bomb, and rootkit. Each type is represented with an icon.](https://kodekloud.com/kk-media/image/upload/v1752872593/notes-assets/images/CompTIA-Security-Certification-Malicious-Activities/malware-types-infographic-icons.jpg)

## Viruses

Computer viruses are designed to replicate themselves by infecting files and spreading to other computers. They are typically categorized by the type of file or media they target.

![The image illustrates a boot virus infecting a computer, with a virus icon displayed on a laptop screen. It includes a description explaining that a boot virus affects the computer's boot sector, executing at startup.](https://kodekloud.com/kk-media/image/upload/v1752872594/notes-assets/images/CompTIA-Security-Certification-Malicious-Activities/boot-virus-infecting-computer.jpg)

### Boot Viruses

A boot virus resides in a computer's boot sector, ensuring it executes each time the system starts. These viruses can also inhabit removable media like USB drives, posing a significant threat whenever such media are used at startup.

![The image shows a laptop screen displaying a USB icon with a bug symbol, illustrating the concept of a boot virus. The text below explains that it can be saved onto removable media like a USB and then inserted into a computer.](https://kodekloud.com/kk-media/image/upload/v1752872595/notes-assets/images/CompTIA-Security-Certification-Malicious-Activities/boot-virus-usb-icon-diagram.jpg)

> [!important]
> **Note**
>
> Memory-resident viruses load a copy of themselves into the computer's RAM, allowing them to continue running even after the initial process has ended.

### Memory-Resident Viruses

Memory-resident viruses embed themselves into a system’s memory (RAM), sustaining their presence and functionality even if the originating process is terminated.

![The image illustrates "Memory Resident Viruses" with a laptop displaying a virus icon and a download arrow, accompanied by a description about these viruses installing themselves in a computer's memory.](https://kodekloud.com/kk-media/image/upload/v1752872596/notes-assets/images/CompTIA-Security-Certification-Malicious-Activities/memory-resident-viruses-laptop.jpg)

## Macro Viruses and Worms

Macro viruses exploit built-in macro features in applications like Microsoft Office and PDFs. Typically hidden within documents, these macros activate upon opening, often without the user's knowledge.

In contrast, worms function independently, executing without direct user interaction. They can run simply when a user visits a compromised website or accesses a shared network drive.

![The image shows a laptop screen displaying logos for Microsoft Office and PDF, with text indicating that macro viruses are prevalent in these products.](https://kodekloud.com/kk-media/image/upload/v1752872597/notes-assets/images/CompTIA-Security-Certification-Malicious-Activities/macro-viruses-microsoft-office-pdf.jpg)

![The image shows a laptop screen displaying cartoon worms, symbolizing computer worms, with a magnifying glass and gears in the background. The text explains that worms can run when a user browses a compromised website.](https://kodekloud.com/kk-media/image/upload/v1752872598/notes-assets/images/CompTIA-Security-Certification-Malicious-Activities/cartoon-worms-laptop-magnifying-glass.jpg)

## Trojans

Trojans are deceptive in nature because they disguise themselves as legitimate software. Unlike potentially unwanted programs (PUPs), which may be bundled with other software and not always harmful, Trojans are specifically engineered to trick users into installing them.

## Spyware and Keyloggers

Spyware and keyloggers both monitor user activities, but they do so in different ways. Keyloggers capture every keystroke, potentially exposing sensitive information such as passwords and credit card numbers. Spyware, on the other hand, can record screen output or even activate cameras and microphones to spy on users.

![The image explains spyware and keyloggers, showing how spyware captures screen output or uses cameras/microphones to spy, while keyloggers capture and save keystrokes.](https://kodekloud.com/kk-media/image/upload/v1752872599/notes-assets/images/CompTIA-Security-Certification-Malicious-Activities/spyware-keyloggers-explanation-diagram.jpg)

## Ransomware and Logic Bombs

Ransomware is designed to extort money from users by encrypting or locking access to critical files. A notable example is the REvil variant, which targets large organizations using files with the .ryk extension. Not all malware is designed for immediate activation; some, known as logic bombs, trigger at a specific time or in response to a particular event.

![The image features a skull icon with a calendar and clock above it, symbolizing "Logic Bombs," with text explaining they can be programmed to execute at a specific time.](https://kodekloud.com/kk-media/image/upload/v1752872600/notes-assets/images/CompTIA-Security-Certification-Malicious-Activities/logic-bombs-skull-calendar-clock.jpg)

> [!important]
> **Warning**
>
> Rootkits are extremely dangerous as they are engineered to escalate privileges, granting system administrator access. This enables them to hide their presence and bypass security measures. Implementing robust security protocols is essential to guard against such threats.

## Rootkits

Rootkits focus on stealth by elevating their access to system-administrator levels. This privilege escalation not only conceals their presence but also enhances their ability to manipulate and control the infected system.

By familiarizing yourself with these various types of malware, you can better safeguard your systems and networks against potential threats. For further insights into cybersecurity best practices, consider reviewing our additional [Cybersecurity Documentation](/docs/cybersecurity).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/208b2070-c737-43e9-b012-7f868f1621be/lesson/107e7bf2-7112-439e-8699-dcf74f14b24f)**
>
> Watch video content
