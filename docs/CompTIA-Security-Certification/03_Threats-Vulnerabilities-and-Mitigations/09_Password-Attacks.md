# Password Attacks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Threats-Vulnerabilities-and-Mitigations/Password-Attacks)

---

## Table of Contents

- Password Attacks
  - Watch Video

---

## Content

CompTIA Security+ Certification

Threats Vulnerabilities and Mitigations

# Password Attacks

Understanding password attacks starts with the knowledge that systems do not store actual passwords. Instead, when a user creates a password, the plaintext is processed by a hashing algorithm—commonly SHA-256—and only the resulting hash is saved on the server.

For example, when "KodeKloud" is combined with the SHA-256 algorithm, the process is as follows:

```
KodeKloud + SHA-256 = 3800688bc894e114d7d2ce6a63221765d148fdb65219b5351fedb837ef799b52
```

During a subsequent login attempt, the user’s input password is hashed using the same algorithm. The newly generated hash is then transmitted to the server, which compares it to the stored hash from the original password creation:

```
KodeKloud + SHA-256 = 3800688bc894e114d7d2ce6a63221765d148fdb65219b5351fedb837ef799b52
```

If the two hashes match, the authentication is successful.

> [!important]
> **Note**
>
> Hashing algorithms are designed to be non-reversible, meaning it is computationally impractical to retrieve the original plaintext password from its hash.

Password attacks typically focus on the hash rather than the plaintext password. Whether an attacker intercepts the hash during transmission or gains access to it from the server, they must resort to guessing the original password. Since reversing the hash directly is not feasible, attackers try different plaintext inputs, hash them, and compare the result to the target hash.

![The image illustrates a password attack process, showing how plaintext ("KodeKloud") is hashed using the SHA-256 algorithm to produce a hash, which an attacker attempts to reverse to gain access. It highlights that most hashing algorithms are non-reversible.](https://kodekloud.com/kk-media/image/upload/v1752872634/notes-assets/images/CompTIA-Security-Certification-Password-Attacks/password-attack-sha256-hashing.jpg)

If the computed hash matches the stored hash, the attacker has effectively determined the user’s password.

One common method is the brute force password attack. In this approach, a program systematically tries every possible combination of characters until a match is found:

![The image illustrates a brute password attack process, showing an attacker using a list of username and password combinations to repeatedly attempt logins until successful credential validation is achieved.](https://kodekloud.com/kk-media/image/upload/v1752872635/notes-assets/images/CompTIA-Security-Certification-Password-Attacks/brute-password-attack-process.jpg)

Another technique is known as password spraying. Instead of bombarding a single account with various guesses, an attacker tests a single common password across multiple user accounts:

![The image illustrates the concept of "Password Spraying," showing four user login interfaces and an attacker with a laptop.](https://kodekloud.com/kk-media/image/upload/v1752872636/notes-assets/images/CompTIA-Security-Certification-Password-Attacks/password-spraying-login-interfaces.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/208b2070-c737-43e9-b012-7f868f1621be/lesson/ec2f7d2e-63fc-4b9f-a4f0-0dcff760a62b)**
>
> Watch video content
