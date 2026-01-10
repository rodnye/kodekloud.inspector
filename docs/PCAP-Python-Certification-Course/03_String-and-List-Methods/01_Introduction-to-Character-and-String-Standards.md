# Introduction to Character and String Standards - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PCAP-Python-Certification-Course/String-and-List-Methods/Introduction-to-Character-and-String-Standards)

---

## Table of Contents

- Introduction to Character and String Standards
  - Understanding Code Points and Code Pages
  - The Emergence of Unicode
  - UTF-8: The Most Widely Adopted Unicode Encoding
  - Watch Video

---

## Content

PCAP - Python Certification Course

String and List Methods

# Introduction to Character and String Standards

When working with strings in Python, it's crucial to understand that computers don't store text as literal characters. Instead, they represent each character as a unique numeric code. These numeric representations are often standardized, with ASCII (American Standard Code for Information Interchange) being one of the most well-known.

![The image shows the phrase "Hello world" with each letter and space represented by its corresponding ASCII code below.](https://kodekloud.com/kk-media/image/upload/v1752882925/notes-assets/images/PCAP-Python-Certification-Course-Introduction-to-Character-and-String-Standards/hello-world-ascii-codes.jpg)

ASCII originally provides 256 different character slots using 8 bits. However, only the first 128 codes represent the standard Latin alphabet in both uppercase and lowercase. The remaining 128 slots, which were designed for additional characters, were insufficient to cover the myriad of characters used in languages around the world. This limitation led to the development of more comprehensive systems.

## Understanding Code Points and Code Pages

A code point is the unique number assigned to each character. For example, the code point 32 in ASCII represents the space character. Standard ASCII defines 128 code points, which was enough for early computing needs. To include national characters, the concept of code pages was introduced, whereby the upper 128 slots were repurposed to accommodate language-specific characters. However, this method had a significant drawback: the same code point could represent different characters depending on the code page being used. This ambiguity proved problematic for internationalization efforts.

> [!important]
> **Note**
>
> The inconsistency of code pages paved the way for a more robust solution in character encoding.

## The Emergence of Unicode

The ultimate solution to these challenges was the Unicode standard, which assigns unique code points to over one million characters. Importantly, the first 128 Unicode code points are identical to the standard ASCII set, and the first 256 match a widely used Western European code page. This compatibility ensures that legacy systems and modern applications can work together seamlessly.

![The image defines "Unicode" as an information technology standard that assigns unique characters to more than a million code points.](https://kodekloud.com/kk-media/image/upload/v1752882925/notes-assets/images/PCAP-Python-Certification-Course-Introduction-to-Character-and-String-Standards/unicode-information-technology-standard.jpg)

## UTF-8: The Most Widely Adopted Unicode Encoding

UTF-8 (Unicode Transformation Format) is the most commonly used encoding for Unicode characters. It is a variable-width encoding system that uses one to four 8-bit bytes to represent each code point. This means:

- Latin characters and basic ASCII characters typically use a single 8-bit byte.
- Many non-Latin characters require 16 bits.
- Certain ideographs may occupy up to 24 bits.

Since Python 3 fully supports Unicode and UTF-8, it enables seamless handling of text from multiple languages, making it an excellent choice for internationalized applications.

![The image defines UTF-8 as a text encoding system that represents Unicode by using one to four one-byte code units for over a million code points.](https://kodekloud.com/kk-media/image/upload/v1752882926/notes-assets/images/PCAP-Python-Certification-Course-Introduction-to-Character-and-String-Standards/utf-8-text-encoding-unicode.jpg)

> [!important]
> **Note**
>
> Python 3's complete support for Unicode and UTF-8 simplifies working with multi-language text and is a significant advantage for developers.

That's all for this lesson. See you in the next one!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pcap-python-certification-course/module/2c9c597a-cb2d-43ca-ba29-2dc1b630cae6/lesson/8f749351-3b18-4b2f-b01f-2d3385ae0678)**
>
> Watch video content
