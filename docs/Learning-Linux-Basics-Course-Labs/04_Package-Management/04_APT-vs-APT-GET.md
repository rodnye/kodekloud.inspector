# APT vs APT GET - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Learning-Linux-Basics-Course-Labs/Package-Management/APT-vs-APT-GET)

---

## Table of Contents

- APT vs APT GET
  - Package Installation Comparison
  - Package Search Comparison
  - Conclusion
  - Watch Video
  - Practice Lab
    - Searching for the Telnet Package Using APT
    - Searching for the Telnet Package Using APT-GET

---

## Content

Learning Linux Basics Course & Labs

Package Management

# APT vs APT GET

APT is a modern, user-friendly package management tool that comes pre-installed on current Debian-based distributions. In this article, we compare APT with the older APT-GET by demonstrating how each tool handles package installations and searches. This comparison highlights why APT is generally preferred over APT-GET for everyday tasks.

## Package Installation Comparison

Before diving into the package search functionality, let's see how both tools handle the installation of the Firefox package.

When you run the following command with APT, the output is clean and concise, providing essential details along with a progress bar:

```
[~]$ apt install firefox
Recommended packages:
  xul-ext-ubufox
The following NEW packages will be installed:
  firefox
0 upgraded, 1 newly installed, 0 to remove and 36 not upgraded.
Need to get 0 B/52.0 MB of archives.
After this operation, 202 MB of additional disk space will be used.
Selecting previously unselected package firefox.
(Reading database ... 416280 files and directories currently installed.)
Preparing to unpack .../firefox_74.0+linuxmint2+tricia_amd64.deb ...
Unpacking firefox (74.0+linuxmint2+tricia) ...
Progress: [ 17%]
[#############..............]
```

In contrast, APT-GET produces functional output that is less visually appealing and does not include the same level of user-friendly feedback.

> [!important]
> **Note**
>
> APT provides an enhanced visual experience and integrates useful information (such as progress indicators), making it more accessible for users performing daily package management tasks.

## Package Search Comparison

The next aspect to compare is the way both tools search for packages. With APT, you can use a single command to integrate all options. On the other hand, APT-GET requires an additional command, `apt-cache`, to search for packages.

### Searching for the Telnet Package Using APT

The following command shows how to search for the Telnet package using APT:

```
[~]$ apt search telnet
p  dcap-tunnel-telnet                       - telnet tunnel for dCache
p  dcap-tunnel-telnet:i386                  - telnet tunnel for dCache
p  inetutils-telnet                         - telnet client
p  inetutils-telnet:i386                    - telnet client
p  inetutils-telnetd                        - telnet server
p  inetutils-telnetd:i386                   - telnet server
i  telnet                                   - basic telnet client
p  telnet:i386                              - basic telnet client
```

### Searching for the Telnet Package Using APT-GET

In contrast, when using APT-GET, you must run the following command with `apt-cache`:

```
[~]$ apt-cache search telnet
curl - command line tool for transferring data with URL syntax
libcurl3-gnutls - easy-to-use client-side URL transfer library (GnuTLS flavour)
libcurl3-nss - easy-to-use client-side URL transfer library (NSS flavour)
libcurl4-doc - documentation for libcurl
libcurl4-gnutls-dev - development files and documentation for libcurl (GnuTLS flavour)
libcurl4-nss-dev - development files and documentation for libcurl (NSS flavour)
libcurl4-openssl-dev - development files and documentation for libcurl (OpenSSL flavour)
redir - Redirect TCP connections
ser2net - Serial port to network proxy
socks4-clients - Socks4 enabled clients as rtelnet and rftp
sredir - RFC 2217 compliant Telnet serial port redirector
swaks - SMTP command-line test tool
telnet-ssl - telnet client with SSL encryption support
telnetd - basic telnet server
telnetd-ssl - telnet server with SSL encryption support
```

Notice that the output of the APT search command is more focused, making it easier for users to locate the desired package. In contrast, the output from `apt-cache search` provides additional and sometimes unrelated information.

> [!important]
> **Tip**
>
> For a more streamlined package search experience, prefer using APT, as it reduces clutter and presents only the most relevant results.

## Conclusion

This comparison clearly demonstrates that APT not only offers a better user experience through cleaner output and integrated features, but also provides greater ease of use for daily package management tasks compared to APT-GET. Embracing APT can simplify tasks such as package installation and search, leading to a more efficient workflow.

For more information on package management in Debian-based systems, explore additional articles and the official [Debian Documentation](https://www.debian.org/doc/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/7ced7d44-760f-47a8-a9bc-69971bb0ca17/lesson/fdd93b26-4ff1-4fa0-ac14-230260f0145c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/learning-linux-basics-course-labs/module/7ced7d44-760f-47a8-a9bc-69971bb0ca17/lesson/a8092210-9729-4d7b-b001-d33afd69ed45)**
>
> Practice lab
