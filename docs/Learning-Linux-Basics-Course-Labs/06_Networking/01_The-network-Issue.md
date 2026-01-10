# The network Issue - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Networking/The-network-Issue)

---

## Table of Contents

- The network Issue
  - Watch Video

---

## Content

Learning Linux Basics Course & Labs

Networking

# The network Issue

_Dated: July 8th, 1 p.m. — Six days before the demo_

Bob is ecstatic—after finally getting his sample project to run on his laptop, he decides to explore the company’s internal software repository. Remembering that Dave mentioned the URL is accessible from the office network, Bob eagerly opens his web browser and types:

```
http://caleston-repos
```

Instead of the expected page, Bob is confronted with an error message. Unsure of the cause, he reaches out to Dave via communicator, only to remember that Dave is currently on vacation. Suspecting a network issue, Bob promptly opens a ticket with the network team via ServiceNow.

---

After a couple of hours, Bob receives a Skype message from Jackie on the network team.

**Jackie:**  
"Hey Bob, my name is Jackie and I’m from the network team. I got your ticket and was wondering if you have some time to troubleshoot?"

**Bob:**  
"Hey Jackie, thank you. Yes, I do have some time now."

**Jackie:**  
"Great, can you come find me at the IT support floor, desk 8A-052? I think it’s better to handle this in person."

---

Bob agrees and soon meets Jackie at her desk. He explains:

**Bob:**  
"I'm trying to connect to the repo server using my browser, but I keep getting an error. It was working on Dave's laptop, so I'm not sure why it's failing on mine."

Jackie examines the error message and asks, "Are you sure that’s the correct URL? Judging by the error, it doesn’t appear to be a valid DNS name. Was Dave using file-based name resolution for this site?"

Bob admits he isn’t sure what that means. Jackie suggests they delve deeper into the issue.

---

Jackie decides to replicate the scenario on her own laptop by accessing the same URL. She encounters the same error and remarks:

"See, the problem is with the URL. I don't think it's a valid name. If I remember correctly, the correct address should be:"

```
http://caleston-repos-01
```

Jackie enters the new URL, but she then encounters a different error.

"Hmm, that appears to be the correct URL because the DNS error is gone, but it's still not working."

Eager to learn, Bob asks: "If you don’t mind, can you explain how to approach troubleshooting these kinds of issues? I’m relatively new to Linux and networking, and I have a client demonstration next week. I want to ensure everything goes smoothly."

Jackie smiles and replies: "Sure thing. Do you have a few minutes? I can walk you through some networking basics, and then we can troubleshoot this problem step by step."

**Bob:**  
"Sounds perfect. Thank you very much."

---

> [!important]
> **Troubleshooting Overview**
>
> Jackie begins the troubleshooting session by summarizing the situation:
> "You were trying to access the site using the URL `http://caleston-repos` and encountered the error: 'DNS probe finished NXDOMAIN'. This error indicates that your laptop, acting as a client, was unable to resolve the IP address for `caleston-repos`."
>
> She explains that the system relies on a DNS server to translate human-friendly domain names into IP addresses. In this case, the DNS server couldn’t find a matching record for the provided URL.

Jackie’s explanation emphasizes the importance of understanding DNS resolution when troubleshooting connectivity issues. By verifying that the URL is correct and ensuring the appropriate DNS records are in place, you can narrow down the cause of network problems.

---

For those interested in further reading on DNS and network troubleshooting, check out these resources:

- [Understanding DNS](https://en.wikipedia.org/wiki/Domain_Name_System)
- [Linux Networking Basics](https://www.linux.com/training-tutorials/introduction-linux-networking/)
- [Troubleshooting DNS Issues](https://support.dnsimple.com/articles/dns-troubleshooting/)

---

\[End of Article\]

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/beae84be-64d2-41b6-b807-575f4107dfc9/lesson/44c2171e-8cc7-4b7f-8264-d736ec92d98b)**
>
> Watch video content
