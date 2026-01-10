# Demo Open Source Intelligence - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Security-Management/Demo-Open-Source-Intelligence)

---

## Table of Contents

- Demo Open Source Intelligence
  - Question 1: OSINT Sources
  - Question 2: Identifying OSINT Tools
  - Question 3: Objective of OSINT
  - Question 4: OSINT Framework Developer
  - Question 5: Understanding Maltego
  - Question 6: People Search OSINT Tool
  - Hands-On Practice with EXIF Data
  - Final Question: Determining the Camera Model
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

CompTIA Security+ Certification

Security Management

# Demo Open Source Intelligence

Welcome back! In this lesson, we dive into Open Source Intelligence (OSINT), a crucial part of the reconnaissance phase in penetration testing. OSINT involves collecting publicly available information about your target to identify potential vulnerabilities in hardware, software, and even to uncover opportunities for social engineering attacks.

The more data you gather, the better you can plan and execute your tests. For instance, online posts, images, and files often carry hidden metadata—information about the data—that specialized OSINT tools can retrieve.

![The image shows a split screen with a multiple-choice question about OSINT sources on the left and a terminal window with a welcome message to a lab on the right.](https://kodekloud.com/kk-media/image/upload/v1752872210/notes-assets/images/CompTIA-Security-Certification-Demo-Open-Source-Intelligence/osint-sources-multiple-choice-terminal.jpg)

Let's explore sample questions and see these OSINT tools in action.

---

## Question 1: OSINT Sources

Which of the following is not considered an OSINT source?

- Government databases
- News websites
- Social media platforms
- Encrypted private communications

Government databases, news websites, and social media platforms are valuable because they provide public information. Encrypted private communications, however, are not publicly available and therefore do not qualify as OSINT.

---

## Question 2: Identifying OSINT Tools

Which tool is commonly used for OSINT investigations?  
Although Nmap excels in network discovery by identifying active IP addresses and open ports, it is not primarily an OSINT tool. Similarly, Wireshark is tailored for network packet analysis and Metasploit is intended for penetration testing. The correct answer is **Shodan**, a tool specifically designed to search for internet-connected devices.

![The image shows a question about which tool is commonly used for OSINT investigations, with options including Nmap, Shodan, Wireshark, and Metasploit. On the right, there's a terminal window with "Welcome to the KodeKloud Hands-On lab" displayed.](https://kodekloud.com/kk-media/image/upload/v1752872210/notes-assets/images/CompTIA-Security-Certification-Demo-Open-Source-Intelligence/osint-tools-question-terminal-lab.jpg)

---

## Question 3: Objective of OSINT

What is the primary objective of OSINT?  
While options might include launching social engineering attacks, hacking private systems, or defending against malware, the real goal of OSINT is to gather information from public sources.

![The image shows a split screen with a multiple-choice question about the primary objective of OSINT on the left and a terminal window with a welcome message to the KodeKloud Hands-On lab on the right.](https://kodekloud.com/kk-media/image/upload/v1752872212/notes-assets/images/CompTIA-Security-Certification-Demo-Open-Source-Intelligence/osint-objective-multiple-choice-terminal.jpg)

Once you select the correct answer, you can move on to the next question.

---

## Question 4: OSINT Framework Developer

Which organization is known for developing the OSINT framework?  
Among the provided options, the Meta Corporation is recognized for its contributions to open source intelligence.

![The image shows a split screen with a multiple-choice question about the OSINT framework on the left and a terminal window with "KodeKloud" branding on the right.](https://kodekloud.com/kk-media/image/upload/v1752872213/notes-assets/images/CompTIA-Security-Certification-Demo-Open-Source-Intelligence/osint-framework-multiple-choice-terminal.jpg)

---

## Question 5: Understanding Maltego

What is Maltego?  
Your options are: a data mining tool used for OSINT, firewall software, a penetration testing tool, or a network scanning tool. Maltego is a data mining tool specifically designed for OSINT, not for network scanning, penetration testing, or firewall purposes.

![The image shows a question about Maltego in an open source intelligence context, with multiple-choice answers, alongside a terminal window displaying a welcome message for the KodeKloud Hands-On lab.](https://kodekloud.com/kk-media/image/upload/v1752872214/notes-assets/images/CompTIA-Security-Certification-Demo-Open-Source-Intelligence/maltego-osint-question-terminal-welcome.jpg)

---

## Question 6: People Search OSINT Tool

Which OSINT tool specializes in searching for people across multiple social networks?  
The correct answer is **SpiderFoot**, which is engineered to gather information about individuals from various online sources.

---

## Hands-On Practice with EXIF Data

Now let's put theory into practice. In this exercise, you will extract the GPS location (latitude and longitude) from an image file. Although the image appears to show a simple wooden walkway in a forest, its metadata holds valuable information.

![The image shows a wooden walkway with railings in a forested area. On the left, there is a task asking for the GPS location embedded in the image, with multiple-choice options.](https://kodekloud.com/kk-media/image/upload/v1752872215/notes-assets/images/CompTIA-Security-Certification-Demo-Open-Source-Intelligence/wooden-walkway-forest-gps-task.jpg)

To extract this metadata, use a tool called EXIFTool. For instance, the following command executed on our file (assumed to be DSCN0011.jpg) displays detailed metadata that includes the GPS latitude and longitude:

```
kali-host ➜ exiftool DSCN0011.jpg
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
    LANGUAGE = (unset),
    LC_ALL = (unset),
    LANG = "en_US.UTF-8"
are supported and installed on your system.
perl: warning: Falling back to the standard locale ("C").
ExifTool Version Number         : 12.76
File Name                       : DSCN0011.jpg
Directory                       : .
File Size                       : 5.2 MB
File Modification Date/Time     : 2024:06:16 16:23:20+00:00
File Access Date/Time           : 2024:07:02 14:40:26+00:00
File Inode Change Date/Time     : 2024:07:02 14:40:27+00:00
File Permissions                : -rw-rw-r--
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
Exif Byte Order                 : Big-endian (Motorola, MM)
Camera Model Name               : Nokia 8.3 5G
Software                        : QCAM_V2.270_SP01
Orientation                     : Rotate 90 CW
X Resolution                    : 72
Y Resolution                    : 72
Resolution Unit                 : inches
Exposure Time                   : 1/1000
White Balance                   : Auto
Focal Length                    : 5.0 mm
ISO                             : 601
Date/Time Original              : 2021:07:09 21:28:46
Aperture Value                  : 1.9
```

Within the retrieved metadata, note the GPS latitude and longitude values. In this example, they indicate a latitude of 60° and a longitude of 24°, confirming the correct result.

Next, you are presented with another file where you need to identify the ISO sensitivity setting used during capture. Running EXIFTool on this file produces the following excerpt:

```
Exposure Time          : 1/60
Offset Time Digitized  : +03:00
Offset Time Original   :
Focal Length           : 5.4 m
Flash                  : No Flash
ISO                    :
Metering Mode          : Center-weighted average
Date/Time Original     : 2021:07:29 21:28:46
White Balance          : Auto
Aperture Value         : 1.9
Exposure Program       : Not Defined
GPS Img Direction Ref  : Magnetic North
GPS Latitude Ref       : North
GPS Img Direction      : 178
GPS Longitude Ref      : East
GPS Time Stamp         : 18:28:47
GPS Date Stamp         : 2021:07:29
Make                   : HVD Global
JFIF Version           : 1.01
Resolution Unit        : None
Y Resolution           : 1
X Resolution           : 1
Image Width            : 4608
Image Height           : 3456
Encoding Process       : Baseline DCT, Huffman coding
Bits Per Sample        : 8
Color Components       : YCbCr:4:2:0 (2 2)
Aperture               : 1.9
Image Size             : 4608x3456
Megapixels             :
Shutter Speed          : 1/60
Date/Time Original     : 2021:07:29 21:28:46+03:00
GPS Date/Time          : 2021:07:29 18:28:47
GPS Latitude           : 28.97° N
GPS Longitude          : 27.09° E
GPS Position           : 24 deg 59' 28.97" N, 24 deg 25' 27.09" E
kali-host ~ >
```

After reviewing all metadata, you locate the ISO setting, which is 64. Choosing 64 confirms the correct answer.

!!! note "Additional Example of Metadata Output" For further reference, below is an expanded metadata output from a file taken by a Nikon COOLPIX P6000:

```
Make                     : NIKON
Camera Model Name       : COOLPIX P6000
Orientation             : Horizontal (normal)
X Resolution            : 300
Y Resolution            : 300
Resolution Unit         : inches
Modify Date             : 2008:11:01 21:15:07
Y Cb Cr Positioning     : Centered
Exposure Time           : 1/75
F Number                : 5.9
Exposure Program        : Program AE
ISO                     : 64
Exif Version            : 0220
Date/Time Original      : 2008:10:12 16:28:39
Create Date             : 2008:10:12 16:28:39
Components Configuration: Y, Cb, Cr, -
Exposure Compensation   : 0
Metering Mode           : Multi-segment
Light Source            : Unknown
Flash                   : Off, did not fire
Focal Length            : 24.0 mm
Maker Note Version      : 2.10
Color Mode              : Color
Quality                 : Fine
White Balance           : Auto
Focus Mode              : AF-S
ISO Selection           : Auto
Data Dump               : (Binary data 2542 bytes, use -b option to extract)
Pixel Detect Frame Size : 320 240
Faces Detected          :
Active D-Lighting       : Off
Image Adjustment        : Normal
Image Mode              : Normal
Auxiliary Items         : Off
AF Area Mode            : Single Area
AF Area Coordinate      : Center
AF Points In Focus      :
Distortion Control      : Off
```

---

## Final Question: Determining the Camera Model

The final challenge is to identify the camera model from a given VAS file. Reviewing the metadata confirms the camera details. Below is one example from running EXIFTool on the file DSCN0012.jpg, showing that the camera model is **Nokia 8.3 5G**:

```
LANGUAGE = (unset),
LC_ALL = (unset),
LANG = "en_US.UTF-8"
are supported and installed on your system.
perl: warning: Falling back to the standard locale ("C").
ExifTool Version Number         : 12.76
File Name                       : DSCN0012.jpg
Directory                       :
File Size                       : 2.2 MB
File Modification Date/Time     : 2022:06:14 16:23:24+00:00
File Access Date/Time           : 2022:07:02 14:46:26+00:00
File Inode Change Date/Time     : 2022:07:02 14:40:27+00:00
File Permissions                : -rw-r--r--
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
Exif Byte Order                 : Big-endian (Motorola, IV)
Camera Model Name               : Nokia 8.3 5G
Software                        : 00WW_3.380.SP02
Exif Version                    : 0220
Exposure Time                   : 1/1848
Offset Time Digitized           : +03:00
Offset Time Original            : +03:00
F-Number                        : f/2.2
Focal Length                    : 6.0 mm
Flash                           : No Flash
ISO                             : 64
Metering Mode                   : Center-weighted average
Date/Time Original              : 2022:08:14 14:12:31
Aperture Value                  : 2.1
Date Balance                    : Not Defined
GPS Latitude Ref                : Magnetic North
GPS Latitude                    : 56.574348
GPS Longitude Ref               : East
GPS Longitude                   : 36.143678
GPS Date Stamp                  : 2022:06:14
JFIF Version                    : 1.01
X Resolution                    : 72
Y Resolution                    : 72
```

A subsequent run of EXIFTool on the same file may show slight differences in formatting, but the camera model remains confirmed as **Nokia 8.3 5G**.

---

## Conclusion

As demonstrated, OSINT tools like EXIFTool are incredibly powerful for extracting key metadata from files. From uncovering GPS coordinates and ISO settings to determining the camera model, these methods provide essential insights for security assessments and research.

Now it’s your turn to explore similar labs on your own. Happy investigating, and thank you for following along in this tutorial!

For more detailed information on OSINT and related tools, check out the following resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/2ed228f2-896d-4847-a874-59c17394f560/lesson/90ce7bc9-4299-4782-92a7-d2d9ef4c7d3c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/2ed228f2-896d-4847-a874-59c17394f560/lesson/8fc66798-24dc-48e5-a4ad-6b9d075e1d5c)**
>
> Practice lab
