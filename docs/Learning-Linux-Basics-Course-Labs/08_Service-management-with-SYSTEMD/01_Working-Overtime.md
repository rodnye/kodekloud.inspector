# Working Overtime - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Service-management-with-SYSTEMD/Working-Overtime)

---

## Table of Contents

- Working Overtime
  - Watch Video

---

## Content

Learning Linux Basics Course & Labs

Service management with SYSTEMD

# Working Overtime

_July 12th, 7 p.m. – Two days before the demo_

Bob is burning the midnight oil on a Friday evening. Instead of working at his desk, he is unwinding in the lounge area. Next to him, Dave is under immense pressure, handling an urgent production change that required patching hundreds of servers.

While Bob is intent on making sure his Django application runs correctly before the switch to the development servers, he encounters a persistent problem: every time he exits the terminal or reboots the system, the application stops.

Bob turns to Dave with a common developer challenge:  
"How do I make it run in the background and ensure that it is up and running when the system boots?"

Dave responds with a straightforward solution:  
"You need to create a SYSTEMD service for the application."

Before Dave can continue, Mumshad Mannambeth interjects, "Give me about 15 minutes to finish my task, and I'll show you exactly how it's done."  
"Thanks," Bob replies.

Curious about how Dave managed to patch over 100 servers so quickly, Bob asks, "But didn't you have to patch more than 100 servers? How are you doing this so quickly?"  
Dave smiles and explains, "Ah, I am using an automation tool called Ansible. I'll show you how that works someday, but for now, let me demonstrate service management with SYSTEMD."

> [!important]
> **Remember:**
>
> Creating a SYSTEMD service is a best practice to ensure your applications run in the background and automatically restart on system boot.

In this article, we will explore how to create a SYSTEMD service for a Django application, enabling it to run as a background service and start automatically at system boot. This approach not only improves reliability but also minimizes downtime during reboots or terminal exits.

For more insights into setting up reliable services on Linux systems, check out [systemd documentation](https://www.freedesktop.org/wiki/Software/systemd/) and related [Django deployment guides](https://docs.djangoproject.com/en/stable/howto/deployment/).

Then, stay tuned for our detailed step-by-step guide complete with code snippets and diagrams to help you follow along seamlessly.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/35ba7692-62b1-429d-87e3-74ac7cc25061/lesson/da570340-ffb0-4f28-bfba-452b9cd0904f)**
>
> Watch video content
