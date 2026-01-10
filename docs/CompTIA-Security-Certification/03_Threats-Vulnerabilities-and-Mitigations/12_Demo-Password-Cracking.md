# Demo Password Cracking - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Threats-Vulnerabilities-and-Mitigations/Demo-Password-Cracking)

---

## Table of Contents

- Demo Password Cracking
  - Quiz Questions
  - Hands-On Lab Exercises
  - Conclusion
  - Watch Video
  - Practice Lab
    - Question 1: What Is the Primary Goal of Password Cracking?
    - Question 2: Which Technique Is Commonly Used in Password Cracking?
    - Question 3: What Is a Dictionary Attack in Password Cracking?
    - Question 4: Which Tool Is Commonly Used for Password Cracking in Cybersecurity?
    - Question 5: What Is Hashcat Primarily Used For?
    - Lab 1: Cracking a Hashed Password with John the Ripper
    - Lab 2: Cracking a Hash with Hashcat
    - Lab 3: Cracking a Zip File Password Hash with Hashcat

---

## Content

CompTIA Security+ Certification

Threats Vulnerabilities and Mitigations

# Demo Password Cracking

Welcome to our in-depth lesson on password cracking techniques using popular tools like John the Ripper and Hashcat. In this guide, you will first test your knowledge with a series of quiz questions designed to reinforce key concepts, followed by hands-on lab exercises that demonstrate practical applications in real-world scenarios.

---

## Quiz Questions

### Question 1: What Is the Primary Goal of Password Cracking?

Choose one of the following options:

• Perform data backups  
• Create strong passwords  
• Secure user accounts  
• Gain unauthorized access

Password cracking is not used for backups. While it might indirectly inform stronger password policies, its main objective is to gain unauthorized access. Therefore, the correct answer is **"Gain unauthorized access."**

---

### Question 2: Which Technique Is Commonly Used in Password Cracking?

Consider the following options:

• Hashing  
• Brute force attack  
• Encryption  
• Firewalls

![The image shows a password cracking quiz question with multiple-choice options on the left and a terminal window on the right displaying a welcome message for a hands-on lab.](https://kodekloud.com/kk-media/image/upload/v1752872556/notes-assets/images/CompTIA-Security-Certification-Demo-Password-Cracking/password-cracking-quiz-terminal-lab.jpg)

Although password cracking involves working with hashed values, it does not use hashing or encryption as the technique itself. Since firewalls are unrelated, the most common method used is a **brute force attack**, where all possible combinations are systematically tried.

---

### Question 3: What Is a Dictionary Attack in Password Cracking?

Review these options:

• An attack that targets network protocols  
• An attack that uses predefined word lists  
• An attack that uses random character generation  
• An attack that uses physical force

![The image shows a password cracking quiz question about dictionary attacks, alongside a terminal window with a "KodeKloud" welcome message.](https://kodekloud.com/kk-media/image/upload/v1752872557/notes-assets/images/CompTIA-Security-Certification-Demo-Password-Cracking/password-cracking-dictionary-quiz.jpg)

A dictionary attack uses predefined word lists—often including common words and their variants—to guess passwords. It is not based on network protocols, random generation, or physical force. The correct answer is **"An attack that uses predefined word lists."**

---

### Question 4: Which Tool Is Commonly Used for Password Cracking in Cybersecurity?

Select the correct tool:

• John the Ripper  
• Wireshark  
• Snort  
• Metasploit

![The image shows a cybersecurity quiz question about password cracking tools, with options including "John the Ripper," and a terminal window displaying a welcome message for a hands-on lab.](https://kodekloud.com/kk-media/image/upload/v1752872558/notes-assets/images/CompTIA-Security-Certification-Demo-Password-Cracking/cybersecurity-quiz-password-cracking-tools.jpg)

John the Ripper is specifically designed for password cracking. In contrast, Wireshark is used for network analysis, and Snort and Metasploit have other specific security functions. Therefore, the correct choice is **"John the Ripper."**

---

### Question 5: What Is Hashcat Primarily Used For?

Hashcat is another powerful tool for password recovery. Among the provided options (data encryption, network monitoring, and software development), its most appropriate use is for recovering passwords. Note that password cracking techniques can also help recover forgotten passwords in legitimate scenarios.

Below is an introductory message from the lab interface:

```
Welcome to the KodeKloud Hands-On lab
KODEKLOUD
All rights reserved
kali-host ~ ➜ []
```

---

## Hands-On Lab Exercises

In this section, you will work through three practical labs that show how to crack password hashes using John the Ripper and Hashcat.

---

### Lab 1: Cracking a Hashed Password with John the Ripper

Imagine you are a digital forensics investigator in a high-profile cybercrime investigation. A crucial hashed password is located in a file named "business.txt". Your objective is to recover the password.

John the Ripper, using its single crack mode, leverages system data (like login names and home directories) to generate a mini dictionary automatically.

Run the following command to start the cracking process with the raw SHA-1 format:

```
kali-host ~ ➜ john --single --format=raw-SHA1 business.txt
```

After completion, verify the result with:

```
kali-host ~ ➜ cat business.txt
stealth: d77d6d32626f8ebf853873796bd75202c579
```

> [!important]
> **Note**
>
> The output indicates that the password for the "stealth" account has been successfully retrieved.

---

### Lab 2: Cracking a Hash with Hashcat

In this scenario, a SHA-1 hash is found in the network logs within the file "network.txt". Unlike the previous lab, this file contains only the hash. Begin by inspecting the file contents:

```
kali-host ~ ➜ cat network.txt
2b98adf6eb5808d6da14cf7a04d7f05fbf01
```

For this exercise, use Hashcat in straight mode (-a 0) with the SHA-1 mode (-m 100) and supply the popular dictionary file (rockyou.txt).

Execute this command:

```
kali-host ~ ➜ hashcat -a 0 -m 100 network.txt rockyou.txt
```

Hashcat then processes the dictionary list and, if successful, outputs the recovered password. An example output might be:

```
b2e98ad56feb858d6a14cf70bad7f05f6fb1:Password123
```

> [!important]
> **Note**
>
> This result confirms that the hashed password has been recovered as "Password123".

---

### Lab 3: Cracking a Zip File Password Hash with Hashcat

In the final lab, you receive a password-protected zip file from a whistleblower. The zip file's password hash is stored in "insider.txt". Your task is to crack this hash to access the secured document.

Again, use Hashcat with the straight mode (-a 0) and specify SHA-1 (-m 100) along with the rockyou.txt dictionary:

```
kali-host ~ ➜ hashcat -a 0 -m 100 insider.txt rockyou.txt
```

After running the command, Hashcat reveals the password. An example snippet from the output is:

```
edba955dea15fdeaf61726ef97e5af507430c0:password5
```

> [!important]
> **Note**
>
> This confirms that the password "password5" has been successfully retrieved.

---

## Conclusion

This lesson has guided you through the fundamental concepts and practical applications of password cracking using both John the Ripper and Hashcat. Through a combination of quiz questions and hands-on labs, you have learned how to approach various password hash types—from single crack mode attacks to dictionary attacks—effectively and securely.

Keep practicing these techniques to further enhance your cybersecurity skills in password recovery and digital forensics.

Thank you for participating!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/208b2070-c737-43e9-b012-7f868f1621be/lesson/924fcc80-9db2-4e1b-93d1-b3b9edbf3f03)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/208b2070-c737-43e9-b012-7f868f1621be/lesson/153194cc-fbd0-4c94-a0ea-5ab3421c6569)**
>
> Practice lab
