# Bobs first team meeting - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Linux-Core-Concepts/Bobs-first-team-meeting)

---

## Table of Contents

- Bobs first team meeting
  - Project Mercury Overview
  - Initial Emails and Project Confusion
  - Linux Environment and Directory Structure
  - Setting Up the Lab Session
  - Watch Video

---

## Content

Learning Linux Basics Course & Labs

Linux Core Concepts

# Bobs first team meeting

Good morning, team! Join me in welcoming Bob, our new developer, who will be contributing to the delivery of Project Mercury.

Bob receives a warm welcome from his new teammates. Andrew enthusiastically praises him, “I must say, Bob, good job on completing the mandatory training and tests on such short notice.”

Andrew continues, “Now, Bob, if you don't mind, please introduce yourself to the team.” With a smile, Bob introduces himself.

“Excellent. Let me introduce the team working on Project Mercury. Donald, our senior developer who joined last year, has already contributed to several projects and will support you during the first phase of Project Mercury. Feel free to approach him for any technical advice on application development.”

“Amira, our project manager assigned to this engagement, will be sending you frequent emails regarding project updates,” Andrew adds with a laugh.

“And finally, Aditi, our test engineer who joined last month from our offshore office in Bangalore, will assist with software testing during the later stages of the project,” Andrew concludes, glancing at the person sitting beside Amira.

---

## Project Mercury Overview

Andrew outlines the task at hand:

Project Mercury will progress along several parallel streams. Our immediate goal is to deliver a working sample of the application for the client demo website. This sample will run on our on-premise development servers, with the client demo scheduled for July 15th—less than three weeks away.

After an in-depth discussion (or, as some call it, a distro war among the IT team), the decision was made to use Ubuntu for the development servers. If things go well, there is potential to deploy the application in the cloud on a VM running Debian, CentOS, or even Red Hat. There’s also the possibility of containerizing the entire application to run as microservices on a managed cloud Kubernetes environment.

Looking at Bob, Andrew adds, “That's why you've received an Ubuntu laptop. Donald will brief you on the progress so far, and Amira will share the comprehensive project plan. I also suggest you connect with Dave when you have a spare moment—he will be your go-to person for any issues related to the new OS.”

Before leaving, Andrew reminds Bob, “Make sure you stick to the project timelines.”

Bob nods, relieved to have Donald as a senior resource guiding him on such a crucial project.

---

## Initial Emails and Project Confusion

On June 26 at 11 a.m., just 18 days before the demo, Bob settles at his desk and notices several new emails. The first is a welcome message from Amira, along with a forwarded email containing high-level timelines for Project Mercury. Soon after, he finds multiple emails from Donald. The first forwarded email states:

“Bob, please take care of this ASAP.”

As Bob scrolls down, he discovers a long email thread. He wonders, “Is this the technical documentation for Project Mercury?” However, upon further reading, he notices references to “Project Sapphire” and realizes that the thread dates back three months.

Below is a snippet of JavaScript code included in the email:

```
document.M = new Array();
document.M[0] = new Image();
document.M[1] = new Image();
document.M[2] = new Image();
```

Bob thinks, “Perhaps Donald wants me to help with Project Sapphire before diving into Project Mercury?” He reaches out to Donald, only to find that his Skype status is set to Do Not Disturb. Frustrated, Bob observes that two other emails from Donald also urge him to handle issues ASAP. Finally, the last email from Donald is titled “Project Mercury.” Eagerly, Bob opens it and finds twelve attachments. While reviewing the design document, he receives a phone call from a client seeking an update on Project Sapphire.

Another JavaScript code snippet appears in the email:

```
document.MY = new Array();
for (i = 0; i < document.MY.length; i++) {
    document.MY[i].id = new Array();
    document.MY[i].id[0] = i;
}
```

Despite his repeated attempts to contact Donald, Bob has no luck. Realizing that he may have to manage on his own, he spends the remainder of the day trying to resolve the issues.

---

## Linux Environment and Directory Structure

On June 28 at 2 p.m., 16 days before the demo, Bob is busy addressing client escalations related to Project Sapphire. Amid the daily escalation emails forwarded by Donald and limited time to review introductory materials, Bob is comfortable with basic Linux commands but is still unclear about Linux internals. He knows his home directory is located in /home, yet directories such as /etc, /usr, /var, /tmp, and /dev remain puzzling. Bob wonders if these directories, which he did not create manually, were generated automatically during installation. The term “Linux Kernel” is mentioned frequently, and although he's encountered it on Windows, its role still eludes him.

Growing increasingly confused, Bob reaches out to Dave on Skype.

Dave warmly welcomes Bob and says, “I’d be happy to help clear up your Linux questions. Let’s examine the file system structure on your machine.”

Below is an example of the root directory listing from Bob's Ubuntu system:

```
bob@caleston-Lp10 ~$ ls /
bin   etc   lib   lib64   boot   home   cdrom   initrd.img   lost+found   dev   initrd.img.old   media   mnt   proc   snap   swapfile   sys   timeshift   usr   var   vmLinux.img
bob@caleston-Lp10 ~$
```

After a brief discussion, Bob and Dave agree to set up an in-person training session. Dave explains, “Let’s arrange a session to cover core Linux concepts. We can start by re-running the same command to observe the particulars.”

Below is another directory listing from the same command, showing slight differences:

```
bob@caleston-lp10 ~ $ ls /
bin    etc   lib    lib64   boot  home   cdrom   initrd.img   lost+found   dev   initrd.img.old   media   mnt   proc   snap   swapfile   sys   timeshift   usr   var   vmlinuz   vmlinuz.old
bob@caleston-lp10 ~ $
```

> [!important]
> **Lab Environment**
>
> Dave reassures Bob, “There's no need to worry about making mistakes. We'll be working in a lab environment where you will access a temporary operating system setup. These sessions are hands-on, and the environment will automatically reset after an hour.”

---

## Setting Up the Lab Session

Dave highlights the benefits of the lab session: “This isn’t your typical meeting room. See those computers over there? They give you access to an environment similar to what’s in the quick start guide. You can experiment with real operating system commands and test different scenarios during our session. Don’t worry about permanent changes—everything will be reset as needed.”

Bob feels a surge of relief and excitement at the prospect of hands-on learning. “This will be amazing,” he remarks.

Before wrapping up the conversation, Dave teases, “You look like a ghost today,” as he guides Bob towards the meeting room. “Busy start to your career?” Dave asks.

Bob responds with a weak smile, “You could say that. I didn’t even glance out the window on my train ride to work, and I’ve been handling client escalations all week.”

Dave laughs, “Ah, your dreams are already coming true. You're one of us now.”

Bob then asks, “But aren’t you assigned to Project Mercury? Why are you handling escalation calls?”

Dave clarifies, “Donald from your team assigned you some tasks related to Project Sapphire, but remember, you’re also working on Project Mercury. Prioritize the Mercury tasks, as Andrew expects that focus from you. And remember—technically, Donald isn’t your manager, so you can choose which tasks to accept.”

Although Bob finds this advice unusual, he claps his hands in silence—a signal that he is ready to learn Linux.

Dave concludes, “Let’s get started with the Linux basics. Today’s session in the lab will not be purely theoretical; you’ll get significant hands-on experience. Ready?”

Bob nods enthusiastically, “Yes, absolutely.”

And so, the training begins.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/19296611-5fb9-4e5d-a926-d157d3f3c3db/lesson/517f0ad3-c629-46c1-9c3a-670d27a246d5)**
>
> Watch video content
