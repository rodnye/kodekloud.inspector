# Where is my storage - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Storage-in-Linux/Where-is-my-storage)

---

## Table of Contents

- Where is my storage
  - A Fortuitous Meeting
  - Delving Into the Issue
  - Watch Video

---

## Content

Learning Linux Basics Course & Labs

Storage in Linux

# Where is my storage

July 9th, 9 a.m. – Five Days Before the Demo

Bob is hard at work preparing for an upcoming client demonstration. His final task is to migrate a Django project from his laptop to the development servers. However, while attempting to download a large file into his home directory via the shell, he encounters the error "no space on device." Running the df command reveals that his home directory is 95% full, despite the total mounted filesystems amounting to only about 50 gigabytes. This is particularly puzzling given that his laptop is advertised to have a 128-gigabyte SSD.

> [!important]
> **Investigate Storage Anomalies**
>
> When disk space discrepancies occur, consider checking for reserved system space and hidden files that might be consuming storage.

"Where is the rest of the storage?" Bob wonders. To get to the bottom of the issue, he decides to consult with Dave. After grabbing a much-needed coffee, Bob heads to the cafeteria.

## A Fortuitous Meeting

In the cafeteria, Bob notices Dave engaged in a deep conversation with another colleague. Dave spots Bob and calls him over.

"Morning, Bob! Come on over!" Dave greets warmly.

Dave introduces Bob to Mohanarajan Menavanan, the resident storage administrator. "You can call me Mohan," he says.

Dave explains, "Mohan was just telling me that we are running out of space on our production SAN appliance." He continues, "This is Bob. He is our new front-end developer who joined the Project Mercury team two weeks ago."

After a brief exchange of pleasantries, Bob remarks, "Dave has been terrific. He helped me break into the world of Linux, and after overcoming some initial hurdles, I’m now fairly comfortable with this environment."

Mohan smiles, adding, "That's fantastic. I had a similar experience when I joined the firm eight years ago. Dave was a great help back then when we were working on Fedora 16 and RHEL 5. Things have changed so much since then."

Bob then says, "I think either of you can help me understand a storage problem I’ve been encountering on my laptop."

Just then, Dave glances at his mobile and says, "Sorry, Bob, I have to join an escalation call in five minutes. In fact, I need to leave right now." He adds, "Mohan, do you mind taking a look at Bob’s question? He’s a learning machine!" With a laugh, Dave continues, "And if you have some time, perhaps you could arrange a storage session with him."

> [!important]
> **Scheduling a One-on-One**
>
> Mohan reassures Dave, "No problem. I’m free pretty much every day this week. Just find a suitable slot and send me a meeting invite."

Bob beams, "That would be great. Thank you both!"

## Delving Into the Issue

Later that afternoon, Bob sets up a session with Mohan. On his way to the meeting room, he passes a crowded conference room where Dave, Donald, and several unfamiliar colleagues are engaged in an animated discussion.

Below is a sample of Bob's work on his laptop, showcasing the commands he used to troubleshoot the issue:

```
[username-laptop: ~]$ curl -s -I https://petasos.io/pythons/python-3.10.1-3546856410-20
HTTP/1.1 200 OK
Content-Length: 123456
Content-Type: application/json
```

Bob also spots a conference room labeled "7A-052, Project Sapphire." Nearby, another terminal displays the following output:

```
[myapplication-lab bob] $ curl -s -o /dev/null -w "%{time_starttransfer} %{time_total} %{size_download} %{speed_download}" https://download.tetracasts.com/python/python-3.9.12-linux-64bit.tar.xz
2.257 2.304 78854 34230
```

A note written in permanent marker below the terminal reads: "Work at Risk Meeting. Booked 9-5 until July 10th." Bob muses, "Ah, so that's the meaning of a war meeting," and feels relieved that he is not part of that session.

With determination, Bob proceeds to meet Mohan in the adjacent room, ready to dive deeper into solving his storage mystery.

---

For more insights into troubleshooting storage issues and optimizing development workflows, explore related guides and our [technical documentation](https://example.com/docs).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/e0021af2-9983-4bde-97a2-29255d3ea1da/lesson/afb817a0-c2a7-4c4c-847a-8d6915737d04)**
>
> Watch video content
