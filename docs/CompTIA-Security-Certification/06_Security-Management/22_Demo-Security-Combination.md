# Demo Security Combination - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/CompTIA-Security-Certification/Security-Management/Demo-Security-Combination)

---

## Table of Contents

- Demo Security Combination
  - Step 1: Extract the Password-Protected ZIP File
  - Step 2: Uncover the Hidden Secret Message Using Steganography
  - Step 3: Analyze Image Metadata to Reveal the Treasure Location
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

CompTIA Security+ Certification

Security Management

# Demo Security Combination

Welcome to the lab that challenges you to combine password cracking, steganography, and open source intelligence techniques to uncover a hidden treasure. In this lab, you will extract a password-protected ZIP file, decode a secret message embedded in an image, and analyze image metadata to locate the treasure.

──────────────────────────────

## Step 1: Extract the Password-Protected ZIP File

The first challenge involves an old map secured inside a password-protected ZIP file (treasure.zip) located in the root directory. Your mission is to crack the ZIP file's password and extract its content. Once extracted, save the discovered password along with the file `q1.txt` in the root directory.

Begin by converting the ZIP file into a hash format that John the Ripper can process using the `zip2john` tool:

```
kali-host ➜ zip2john treasure.zip > treasure.txt
```

Now, use John the Ripper to crack the password:

```
kali-host ➜ john treasure.txt
```

You should see output similar to the example below, indicating that the password has been successfully cracked:

```
Using default input encoding: UTF-8
Loaded 1 password hash (PKZIP [32/64])
Will run 16 OpenMP threads
Proceeding with single, rules:Single
Press 'q' or Ctrl+c to abort, almost any other key for status
Almost done: Processing the remaining buffered candidate passwords, if any.
Proceeding with wordlist:/usr/share/john/password.lst
Proceeding with incremental:ASCII
admin123
1g 0:00:00:034 DONE 3/3 (2023-07-02 16:12) 0.029048g/s 11579Kc/s 11579Kc/s adongutt..adr14777
Use the "--show" option to display all of the cracked passwords reliably
Session completed.
```

Once the password (`admin123`) is retrieved, unzip the file by providing the password when prompted:

```
kali-host ➜ unzip treasure.zip
Archive:  treasure.zip
[treasure.zip] DSCN0042.jpg password:
inflating: DSCN0042.jpg
```

Finally, record the discovered password by writing it into the file `q1.txt` located in the root directory:

```
kali-host ➜ echo "admin123" > /root/q1.txt
```

> [!important]
> **Note**
>
> Make sure to verify that `q1.txt` is correctly created in the root after extracting the ZIP file.

──────────────────────────────

## Step 2: Uncover the Hidden Secret Message Using Steganography

The next challenge requires you to extract a secret message hidden within an image file (`DSCN0042.jpg`). To achieve this, we will crack the passphrase used for embedding the message with the help of the `stegcracker` tool and a popular wordlist (`rockyou.txt`).

Start by running stegcracker to obtain the passphrase:

```
kali-host ➜ stegcracker DSCN0042.jpg /usr/share/wordlists/rockyou.txt
StepCracker 2.1.0 - (https://github.com/Paradoxis/StegCracker)
Copyright (c) 2020 - Luke Paris (Paradoxis)


StepCracker has been retired following the release of StegSeek, which
will blast through the rockyou.txt wordlist within 1.9 seconds as opposed
to StegCracker which takes ~5 hours.


Counting lines in wordlist...
Attacking file 'DSCN0042.jpg' with wordlist '/usr/share/wordlists/rockyou.txt'..
Successfully cracked file with password: password123
Tried 1806 passwords
Your file has been written to: DSCN0042.jpg.out
password123
```

With the revealed passphrase (`password123`), use the `steghide` tool to extract the hidden data from the image:

```
kali-host ➜ steghide extract -sf DSCN0042.jpg
Enter passphrase: password123
wrote extracted data to "message.txt".
```

Finally, review the hidden message by displaying the contents of the extracted file:

```
kali-host ➜ cat message.txt
The key is hidden under the third brick on the left at
```

> [!important]
> **Note**
>
> Use the extracted message as the clue for locating the treasure.

──────────────────────────────

## Step 3: Analyze Image Metadata to Reveal the Treasure Location

The final step involves analyzing the metadata of an image (e.g., `clue.jpg`) to determine the treasure's exact location. Use `exiftool` or a similar metadata extraction utility on the image file to extract GPS coordinates and other relevant details.

Below is a sample output from a metadata extraction using exiftool:

```
Gain Control              : None
Contrast                  : Normal
Saturation                : Normal
Sharpness                 : Normal
Subject Distance Range    : Unknown
GPS Version ID            : 2.3.0.0
GPS Latitude Ref          : North
GPS Longitude Ref         : East
GPS Altitude Ref          : Above Sea Level
GPS Time Stamp            : 14:57:41.37Z
GPS Satellites            : 04
GPS Img Direction Ref     : Unknown ()
GPS Map Datum             : WGS-84
GPS Date Stamp            : 2008:10:23
Compression               : JPEG (old-style)
Thumbnail Offset          : 4472
Thumbnail Length          : 6472
XMP Toolkit               : Image::ExifTool 12.76
Rating Percent            :
Image Width               : 640
Image Height              : 480
Encoding Process          : Baseline DCT, Huffman coding
Bits Per Sample           : 8
Color Components          : YCbCr:2:2 (2 1)
Aperture                  : 4.4
Image Size                : 0.387
Megapixels                : 0.307
Scale Factor To 35 mm Equivalent: 1.0
Shutter Speed             :
Thumbnail Image           : (Binary data 6474 bytes, use -b option to extract)
GPS Date/Time            : 2008:10:23 14:57:41.37Z
GPS Latitude             : 43 deg 27' 52.04" N
GPS Longitude            : 11 deg 52' 53.32" E
Circle Of Confusion      : 0.006 mm
Field Of View            :
Focal Length             : 15.0 mm (35 mm equivalent: 70.0 mm)
GPS Position             : 43 deg 27' 52.04" N, 11 deg 52' 53.32" E
Hyperfocal Distance      : 7.94 m
Light Value              : 11.6
```

This GPS data and the additional metadata will guide you directly to the treasure location.

> [!important]
> **Warning**
>
> Always handle sensitive data with caution and ensure you have proper authorization before extracting or analyzing image metadata.

──────────────────────────────

## Conclusion

In this lab, you successfully:

- Extracted a password-protected ZIP file and cracked its password using `zip2john` and John the Ripper.
- Revealed a secret message embedded in an image with the help of `stegcracker` and `steghide`.
- Analyzed critical image metadata to obtain the GPS coordinates needed to locate the treasure.

Now it's your turn to apply these techniques to similar challenges. Happy hunting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/2ed228f2-896d-4847-a874-59c17394f560/lesson/52bbaa1c-aef3-4fc3-b1dd-924b2c527774)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/comptia-security-certification/module/2ed228f2-896d-4847-a874-59c17394f560/lesson/b3c2544a-5c81-4fde-bd6d-b5346f9e7bd2)**
>
> Practice lab
