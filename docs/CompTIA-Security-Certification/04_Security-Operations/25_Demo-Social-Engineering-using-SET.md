# Demo Social Engineering using SET - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Security-Operations/Demo-Social-Engineering-using-SET)

---

## Table of Contents

- Demo Social Engineering using SET
  - Overview of Social Engineering with SET
  - Lab Walkthrough
  - Cloning a Website Using SET
  - Watch Video
  - Practice Lab
    - Question 1: Primary Purpose of SET
    - Question 2: Common Attack Vector in SET
    - Question 3: Purpose of the Website Attack Vectors Module
    - Question 4: Goal of the Credential Harvester Attack Method
    - Question 5: Advantage of Using SET for Social Engineering
    - Step 1: Launch SET
    - Step 2: Choose Website Attack Vectors
    - Step 3: Provide POST Back Information

---

## Content

CompTIA Security+ Certification

Security Operations

# Demo Social Engineering using SET

Hi, and welcome back!

In this lesson, we explore the Social Engineering Toolkit (SET) to demonstrate how to clone websites—a common technique used in social engineering attacks. SET is a comprehensive suite of penetration testing tools designed to identify vulnerabilities in your network. In this lab, our focus is on website cloning and credential harvesting.

---

## Overview of Social Engineering with SET

Social engineering attacks frequently rely on phishing, where attackers send emails that appear to be from reputable organizations (e.g., banks or financial institutions). These emails typically urge the target to click on a link leading to a cloned webpage. The cloned site closely resembles the authentic site, tricking users into entering their login credentials. Once entered, these credentials are captured by the attacker for misuse.

---

## Lab Walkthrough

### Question 1: Primary Purpose of SET

The first question asks: What is the primary purpose of the Social Engineering Toolkit? The options include:

- Social engineering attacks
- Network scanning
- Virus removal
- Password cracking

The correct answer is **social engineering attacks**.

![The image shows a quiz question about the primary purpose of the Social-Engineer Toolkit (SET), with "Social engineering attacks" selected as the answer. On the right, there's a terminal window with the KodeKloud Hands-On lab interface.](https://kodekloud.com/kk-media/image/upload/v1752872366/notes-assets/images/CompTIA-Security-Certification-Demo-Social-Engineering-using-SET/social-engineer-toolkit-quiz-question.jpg)

The system confirms the answer as correct, allowing us to proceed to the next question.

---

### Question 2: Common Attack Vector in SET

Next, the lab asks: Which of the following is a common attack vector used in SET? The available options are:

- Buffer overflows
- SQL injection
- Credential harvester
- Denial of service

While buffer overflows and SQL injections are associated with other attack categories, and denial of service is not related to website cloning, the technique relevant to this context is **credential harvesting**. This method deceives users into entering their login details on a cloned website, consequently capturing their credentials.

A sample terminal output shows:

```
Welcome to the KodeKloud Hands-On lab
KODEKLOUD
All rights reserved
kali-host ➜ []
```

The correct answer, "credential harvester," is selected and confirmed.

---

### Question 3: Purpose of the Website Attack Vectors Module

The third question asks: What does the website attack vectors module in SET primarily aim to do? Its main function is to create fake (cloned) websites designed to capture user credentials. The correct answer is that it generates cloned websites.

A sample output from the lab illustrates:

```
Welcome to the KodeKLOUD Hands-On lab
KODEKLOUD
All rights reserved
kali-host ~ > []
```

This confirms that the module generates cloned websites.

---

### Question 4: Goal of the Credential Harvester Attack Method

The fourth question asks: What is the main goal of the credential harvester attack method? The correct answer is **to capture sensitive credentials**.

![The image shows a question about the main goal of the Credential Harvester Attack Method with multiple-choice answers, alongside a terminal window displaying a welcome message to the KodeKloud Hands-On lab.](https://kodekloud.com/kk-media/image/upload/v1752872367/notes-assets/images/CompTIA-Security-Certification-Demo-Social-Engineering-using-SET/credential-harvester-attack-question.jpg)

---

### Question 5: Advantage of Using SET for Social Engineering

The next question evaluates the advantages of using SET. The options include:

- Guarantees a 100% success rate  
  (Incorrect – no method can guarantee complete success as the target must be deceived into clicking the link.)
- Undetectable by antivirus software  
  (Not entirely correct – this attack does not typically involve installing malware detectable by antivirus software.)
- Requires no knowledge of social engineering techniques  
  (Incorrect – successful use of SET requires an understanding of social engineering principles.)
- Automates the creation and execution of complex attacks  
  (Correct – SET streamlines and automates various stages of the attack process.)

![The image shows a question about the advantages of using SET for social engineering attacks, with multiple-choice answers, alongside a terminal window displaying a welcome message for a KodeKloud lab.](https://kodekloud.com/kk-media/image/upload/v1752872368/notes-assets/images/CompTIA-Security-Certification-Demo-Social-Engineering-using-SET/set-advantages-social-engineering-kodekloud.jpg)

The system confirms the correct answer: “automates the creation and execution of complex attacks.”

---

## Cloning a Website Using SET

In this section, we demonstrate how to use SET to clone a website and launch a social engineering attack aimed at harvesting user credentials.

First, visit the target website that you want to clone. The following screenshot shows a legitimate login page:

![The image shows a login page for "bWAPP," a web application described as "an extremely buggy web app." It includes fields for login credentials, a security level setting, and various logos and social media icons.](https://kodekloud.com/kk-media/image/upload/v1752872369/notes-assets/images/CompTIA-Security-Certification-Demo-Social-Engineering-using-SET/b-login-page-buggy-app.jpg)

This page features fields for both a username and a password. The goal here is to create a cloned version of the site using SET.

### Step 1: Launch SET

Begin by launching SET with root privileges. Open your terminal and run:

```
sudo setoolkit
```

Upon launching, SET displays its main menu with several options:

```
Welcome to the Social-Engineer Toolkit (SET)
Created by: David Kennedy (ReL1K)
Version: 0.8.3
Codename: 'Maverick'
Follow us on Twitter: @TrustedSec
Homepage: https://www.trustedsec.com


It's easy to update using the PenTesters Framework! (PTF)
Visit https://github.com/trustedsec/ptf to update all your tools!


Select from the menu:
1) Social-Engineering Attacks
2) Penetration Testing (Fast-Track)
3) Third Party Modules
4) Update the Social-Engineer Toolkit
5) Update SET configuration
6) Help, Credits, and About
99) Exit the Social-Engineer Toolkit
set>
```

Select option **1) Social-Engineering Attacks**.

### Step 2: Choose Website Attack Vectors

From the subsequent menu, choose the **Website Attack Vectors** option:

```
Select from the menu:
1) Spear-Phishing Attack Vectors
2) Website Attack Vectors
3) Infiltration Media Generator
4) Create a Payload and Listener
5) Mass Mailer Attack
6) Arduino-Based Attack Vector
7) Wireless Access Point Attack Vector
8) QRCode Generator Attack Vector
9) Powershell Attack Vectors
10) Third Party Modules
99) Return back to the main menu.
set>
```

For this demonstration, we focus on the credential harvesting attack method. This method clones a website and captures the credentials entered by users.

After selecting the appropriate website attack vector option (typically by entering "2"), SET displays further details about the available attack methods, such as the Java Applet, Metasploit Browser Exploit, and Credential Harvester. Review the descriptions, then select the site cloner option.

### Step 3: Provide POST Back Information

If you are using the credential harvester, SET will prompt you for the IP address for POST back. You can press Enter to use the default settings or input a custom URL as provided in your instructions. For example:

```
set:webattack> Enter the url to clone: https://bwapp.hakhub.net/
```

SET then clones the target website. After processing, it notifies you that the cloning is complete and prompts you to open the cloned website by clicking the “cloned” button at the top of the interface.

You can compare the cloned website side-by-side with the legitimate one. The cloned site is designed to closely mimic the original, effectively deceiving most users.

A final sample output from SET is shown below:

```
set:webattack<2
set:webattack> IP address for the POST back in Harvester/Tanabbing [172.25.0.11]:
set:webattack> Enter the url to clone: https://bwap.hakhub.net/
```

> [!important]
> **Note**
>
> Ensure you follow all legal guidelines when conducting tests with SET. This demonstration is intended for authorized and ethical use only.

---

Thank you for joining this lab walkthrough. Now it’s your turn to complete the lab using the provided instructions and tools. Happy testing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/b13ce20f-66c3-4d31-b6df-23192480b4d4/lesson/dcd15dad-0444-452a-bd6e-fcd659062f8b)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/b13ce20f-66c3-4d31-b6df-23192480b4d4/lesson/4ef79213-4825-4bec-a678-28ce055df590)**
>
> Practice lab
