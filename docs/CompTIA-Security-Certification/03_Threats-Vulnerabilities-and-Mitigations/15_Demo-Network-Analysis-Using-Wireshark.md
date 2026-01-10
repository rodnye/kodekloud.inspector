# Demo Network Analysis Using Wireshark - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Threats-Vulnerabilities-and-Mitigations/Demo-Network-Analysis-Using-Wireshark)

---

## Table of Contents

- Demo Network Analysis Using Wireshark
  - Question 1: What is Wireshark Primarily Used For?
  - Question 2: Filtering HTTP Traffic in Wireshark
  - Question 3: Capturing Traffic from a Specific IP Address
  - Question 4: Identifying Non-Features in Wireshark
  - Question 5: Analyzing Protocols in a Capture File
  - Question 6: Determining the IP Address with the Highest Traffic
  - Watch Video
  - Practice Lab

---

## Content

CompTIA Security+ Certification

Threats Vulnerabilities and Mitigations

# Demo Network Analysis Using Wireshark

Welcome to our network analysis demo using Wireshark—a powerful tool for investigating network communication and troubleshooting connectivity issues. In this guide, we will explore practical scenarios using Wireshark and its terminal-based variant, Tshark. Whether you're troubleshooting network problems or conducting cybersecurity investigations, this demo will equip you with valuable insights and hands-on experience.

Before jumping into the hands-on labs, let’s answer some fundamental questions about Wireshark to reinforce your understanding.

---

## Question 1: What is Wireshark Primarily Used For?

The first query in our hands-on lab asks:

Which of the following is the primary application of Wireshark?

- Monitoring system performance
- Writing network protocols
- Analyzing network traffic
- Configuring network devices

Wireshark is specifically designed for analyzing network traffic. Unlike the other options, it is not built to monitor system performance, write protocols, or configure devices.

![The image shows a network analysis lab interface with a question about Wireshark's primary use, alongside a terminal window.](https://kodekloud.com/kk-media/image/upload/v1752872549/notes-assets/images/CompTIA-Security-Certification-Demo-Network-Analysis-Using-Wireshark/network-analysis-wireshark-terminal.jpg)

---

## Question 2: Filtering HTTP Traffic in Wireshark

Next, consider the following question:

Which filter in Wireshark would you apply to display only HTTP traffic?

- ip.port == 80
- HTTP
- ip.address == 192.168.1.1
- DNS

Reviewing the options:

- The **DNS** filter only shows DNS traffic.
- The **ip.address == 192.168.1.1** filter limits the view to a particular IP address.
- The **ip.port == 80** filter is not as precise for HTTP, which is better targeted with the HTTP protocol filter.

Therefore, the correct filter to display only HTTP traffic is simply **HTTP**.

![The image shows a question about using Wireshark to filter HTTP traffic, with the correct answer highlighted. On the right, there's a terminal window with a "KodeKloud" welcome message.](https://kodekloud.com/kk-media/image/upload/v1752872550/notes-assets/images/CompTIA-Security-Certification-Demo-Network-Analysis-Using-Wireshark/wireshark-http-filter-question.jpg)

---

## Question 3: Capturing Traffic from a Specific IP Address

The third question in our lab is:

How can you capture only traffic from a specific IP address in Wireshark?

- Using the filter TCP
- Using the capture filter host 192.168.1.1
- Using the filter UDP
- Using the display filter ip.address == 192.168.1.1

Using TCP or UDP filters would restrict the view based on protocol, while the display filter (ip.address == 192.168.1.1) only affects the already captured data. To capture traffic exclusively from a specific IP right from the start, you should use the capture filter:

> [!important]
> **Note**
>
> Use the capture filter "host 192.168.1.1" to ensure that only traffic from the specified IP is captured.

![The image shows a network analysis task in Wireshark, asking how to capture traffic from a specific IP address, alongside a terminal window with a "KodeKloud" welcome message.](https://kodekloud.com/kk-media/image/upload/v1752872552/notes-assets/images/CompTIA-Security-Certification-Demo-Network-Analysis-Using-Wireshark/wireshark-network-analysis-ip-capture.jpg)

---

## Question 4: Identifying Non-Features in Wireshark

The fourth question asks:

Which of the following is NOT a feature of Wireshark?

- Packet filtering
- Real-time packet capturing
- Editing captured packets
- Displaying protocol details

Wireshark provides extensive capabilities for packet filtering, real-time packet capturing, and protocol analysis. However, it does not support modifying or editing the captured packets. Thus, the correct answer is **Editing captured packets**.

![The image shows a question about Wireshark features, asking which is not a feature, alongside a terminal window with a welcome message from KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752872553/notes-assets/images/CompTIA-Security-Certification-Demo-Network-Analysis-Using-Wireshark/wireshark-features-question-terminal.jpg)

---

## Question 5: Analyzing Protocols in a Capture File

This question presents a hands-on lab challenge regarding protocols present in a capture file.

You have a capture file (ending with .pcap) on the Kali host and a terminal window open. Your task is to analyze the file and identify which protocol is absent from the capture. The options provided are:

- ICMP
- UDP
- TCP
- SMTP

Since you’re using a Linux terminal, Tshark is the tool of choice for this analysis. To get started, check the usage of Tshark with the following syntax:

```
tshark [ -i <capture interface> ] [ -f <capture filter> ] [ -2 ] [ -r <infile> ] [ -w <outfile> ] [ options ] [ <filter> ]


tshark -G [ <report type> ] [ --elastic-mapping-filter <protocols> ]


tshark -h | --help


tshark -v | --version
```

Next, read the capture file (e.g., `fuzz-2006-06-26-2594.pcap`) using Tshark:

```
tshark -r fuzz-2006-06-26-2594.pcap
```

To reduce the amount of output, use the `-q` option:

```
tshark -r fuzz-2006-06-26-2594.pcap -q
```

Then, to display protocol hierarchy statistics without listing every packet, add the `-z io,phs` switch:

```
tshark -r fuzz-2006-06-26-2594.pcap -q -z io,phs
```

If you encounter an error due to a minor misspelling of the file name (for instance, missing a zero), correct the filename exactly as provided (i.e., `fuzz-2006-06-26-2594.pcap`) and run the command again. The resulting output will display various protocol statistics. By comparing the available protocols (ICMP, UDP, TCP, SMTP), it becomes evident that SMTP is not present.

![The image shows a network analysis question about which protocol is not present in a specific file, with options ICMP, UDP, TCP, and SMTP. On the right, there's a terminal window with a welcome message from KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752872555/notes-assets/images/CompTIA-Security-Certification-Demo-Network-Analysis-Using-Wireshark/network-analysis-protocols-question.jpg)

---

## Question 6: Determining the IP Address with the Highest Traffic

The final question of our demo is:

Which IP address has the highest amount of traffic in the Wireshark capture?

To answer this, begin by analyzing overall protocol statistics from the capture file using Tshark:

```
kali-host ~➜ tshark -r fuzz-2006-06-26-2594.pcap -q -z io,phs
```

This output provides details such as frame counts and byte counts for various protocols, similar to:

```
Running as user "root" and group "root". This could be dangerous.


Protocol Hierarchy Statistics
Filter:
eth         frames:691  bytes:99997
ip          frames:613  bytes:92457
udp         frames:52   bytes:82530
nbns        frames:102  bytes:9384
dns         frames:21   bytes:1932
...
```

For detailed analysis of traffic by individual IP addresses, execute the command with the `ip_hosts,tree` option:

```
tshark -r fuzz-2006-06-26-2594.pcap -q -z ip_hosts,tree
```

This command generates statistics for each IP address seen in the capture file. From the detailed output, you should notice that the IP address **192.168.1.2** shows the highest traffic count.

A sample output may resemble:

```
kali-host ~ % tshark -r fuzz-2006-06-26-2594.pcap -q -z ip_hosts,tree
Running as user "root" and group "root". This could be dangerous.

IPv4 Statistics/All Addresses:
Topic / Item     Count  Average      Min Val    Max Val    Rate (ms)    Percent    Burst Rate    Burst Start
All Addresses 606
192.168.1.2     527    0.0004      100%       0.3000     94.154
192.168.1.1     306    0.0003      86.96%     0.2500     94.154
192.168.1.255   102    0.0001      56.50%     0.2300     525.361
212.242.33.35   72     0.0001      16.84%     0.2300     1116.969
147.234.1.253   42     0.0000      6.93%      0.2200     94.154
...
67.168.1.1      1      0.0000      0.17%      0.1000     944.266
192.168.1.2     1      0.0000      0.17%      0.1000     1527.872
```

This confirms that **192.168.1.2** is responsible for the highest amount of traffic in the capture file.

> [!important]
> **Note**
>
> Always verify the accuracy of the capture file name and the paths provided in your lab instructions to avoid file-not-found errors.

---

That concludes our network analysis demo using Wireshark. Stay tuned for additional exam insights and more hands-on labs. Happy analyzing!

For more information on Wireshark and network analysis best practices, consider exploring the following resources:

- [Wireshark Official Documentation](https://www.wireshark.org/docs/)
- [Tshark User Guide](https://www.wireshark.org/docs/man-pages/tshark.html)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

Happy networking!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/208b2070-c737-43e9-b012-7f868f1621be/lesson/83b6cf35-b4e3-4689-9bd9-68c2a6172b3b)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/208b2070-c737-43e9-b012-7f868f1621be/lesson/187ab898-2604-47e4-b5f2-f3b88fc9a292)**
>
> Practice lab
