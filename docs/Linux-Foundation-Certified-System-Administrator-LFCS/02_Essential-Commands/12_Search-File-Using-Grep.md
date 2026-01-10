# Search File Using Grep - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Essential-Commands/Search-File-Using-Grep)

---

## Table of Contents

- Search File Using Grep
  - Basic grep Usage
  - Case Sensitivity
  - Recursive Search in Directories
  - Using sudo for Restricted Files
  - Inverting the Search
  - Matching Whole Words
  - Displaying Only the Matched Portions
  - Conclusion
  - Watch Video

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Essential Commands

# Search File Using Grep

In this lesson, you'll learn how to use the grep utility to search for specific text within files. Grep is particularly useful when working with large files containing thousands of lines, as it helps you quickly filter and locate the information you need.

## Basic grep Usage

The general syntax for the grep command is:

grep \[options\] \[search pattern\] \[file\]

For example, to search for the term "password" inside the SSH daemon configuration file, run:

```
$ grep 'password' /etc/ssh/sshd_config
#PermitRootLogin prohibit-password
# To disable tunneled clear text passwords, change to no here!
# Change to yes to enable challenge-response passwords (beware issues with
# the setting of "PermitRootLogin without-password".
```

> [!important]
> **Tip**
>
> Always enclose your search pattern in single quotes to prevent Bash from misinterpreting special characters, such as asterisks used in more complex search patterns.

## Case Sensitivity

By default, grep performs a case-sensitive search. This means that searching for 'password' will only match lowercase occurrences. Searching for 'Password' (with an uppercase P) produces different results.

Consider the following examples:

```
$ grep 'password' /etc/ssh/sshd_config
#PermitRootLogin prohibit-password
# To disable tunneled clear text passwords, change to no here!
# Change to yes to enable challenge-response passwords (beware issues with
# PasswordAuthentication. Depending on your PAM configuration,
# PAM authentication, then enable this but set PasswordAuthentication
```

```
$ grep 'Password' /etc/ssh/sshd_config
#PasswordAuthentication yes
#PermitEmptyPasswords no
# PasswordAuthentication. Depending on your PAM configuration,
# PAM authentication, then enable this but set PasswordAuthentication
```

To perform a case-insensitive search, use the `-i` option:

```
$ grep -i 'password' /etc/ssh/sshd_config
#PermitRootLogin prohibit-password
# To disable tunneled clear text passwords, change to no here!
#PasswordAuthentication yes
#PermitEmptyPasswords no
# Change to yes to enable challenge-response passwords (beware issues with
# PasswordAuthentication. Depending on your PAM configuration,
# the setting of "PermitRootLogin without-password".
# PAM authentication, then enable this but set PasswordAuthentication
```

## Recursive Search in Directories

Grep allows you to search through all files within a directory and its subdirectories using the `-r` (recursive) option. For example:

```
$ grep -r 'password' /etc/
/etc/fwupd/redfish.conf:# The username and password to the Redfish service
grep: /etc/sudoers.d/README: Permission denied
grep: /etc/ssl/private: Permission denied
/etc/ssl/openssl.cnf:# input_password = secret
/etc/ssl/openssl.cnf:# output_password = secret
/etc/ssl/openssl.cnf:challengePassword        = A challenge password
/etc/cloud/cloud.cfg: - set-passwords
```

The matched files are highlighted by default (using color) to help you quickly identify the search term. You might also see "Permission denied" messages for files your user does not have permission to read.

Combine recursive search with case-insensitivity using both `-r` and `-i` options:

```
$ grep -ri 'password' /etc/
/etc/fwupd/redfish.conf:# The username and password to the Redfish service
/etc/fwupd/redfish.conf:#Password=
/etc/fwupd/remotes.d/lvsf-testing.conf:#Password=
grep: /etc/sudoers.d/README: Permission denied
grep: /etc/ssl/private: Permission denied
/etc/ssl/openssl.cnf:# Passwords for private keys if not present they will be prompted for
/etc/ssl/openssl.cnf:  input_password = secret
/etc/ssl/openssl.cnf:  output_password = secret
/etc/ssl/openssl.cnf:challengePassword    = A challenge password
/etc/ssl/openssl.cnf:challengePassword_min  = 4
/etc/ssl/openssl.cnf:challengePassword_max  = 20
/etc/ssl/openssl.cnf:[pbm] # Password-based protection for Insta CA
/etc/cloud/cloud.cfg: - set-passwords
```

## Using sudo for Restricted Files

If you need to search through files that are only accessible by the administrator (root), prepend the grep command with sudo. Note that this might disable colored output, so the `--color` option can be used to force it:

```
$ sudo grep -ri 'password' --color /etc/
/etc/fwupd/redfish.conf:# The username and password to the Redfish service
/etc/fwupd/redfish.conf:#Password=
/etc/fwupd/remotes.d/lvfs-testing.conf:#Password=
/etc/ssl/openssl.cnf:# Passwords for private keys if not present they will be prompted for
/etc/ssl/openssl.cnf:# input_password = secret
/etc/ssl/openssl.cnf:# output_password = secret
/etc/ssl/openssl.cnf:challengePassword        = A challenge password
/etc/ssl/openssl.cnf:challengePassword_min    = 4
/etc/ssl/openssl.cnf:challengePassword_max    = 20
/etc/ssl/openssl.cnf:[pbm] # Password-based protection for Insta CA
/etc/cloud/cloud.cfg:  - set-passwords
```

> [!important]
> **Important**
>
> When using sudo with grep, be aware that forcing colored output is necessary if you want to visualize matches in color.

## Inverting the Search

If you need to display lines that do not contain a specific pattern, use the `-v` option. This inverts the search results to exclude the matched pattern.

## Matching Whole Words

Sometimes it's important to match only the exact word "password" rather than substrings (like "PasswordAuthentication" or "passwords"). The `-w` option restricts grep to whole word matches. Compare the outputs below:

```
$ grep -i 'password' /etc/ssh/sshd_config
#PermitRootLogin prohibit-password
# To disable tunneled clear text passwords, change to no here!
#PasswordAuthentication yes
#PermitEmptyPasswords no
# Change to yes to enable challenge-response passwords (beware issues with
# PasswordAuthentication. Depending on your PAM configuration,
# the setting of "PermitRootLogin without-password".
```

```
$ grep -wi 'password' /etc/ssh/sshd_config
#PermitRootLogin prohibit-password
# the setting of "PermitRootLogin without-password".
```

Notice that using the `-w` option excludes lines where "password" is part of a longer word.

## Displaying Only the Matched Portions

By default, grep prints the entire line containing a match. If you need to extract just the text that matches your pattern, use the `-o` option. This is useful when you want to isolate specific data.

The following example compares two approaches:

```
$ grep -i 'password' /etc/ssh/sshd_config
#PermitRootLogin prohibit-password
# To disable tunneled clear text passwords, change to no here!
#PasswordAuthentication yes
#PermitEmptyPasswords no
# Change to yes to enable challenge-response passwords (beware issues with
# PasswordAuthentication. Depending on your PAM configuration,
# the setting of "PermitRootLogin without-password".
# PAM authentication, then enable this but set PasswordAuthentication
```

```
$ grep -oi 'password' /etc/ssh/sshd_config
password
password
Password
Password
password
Password
password
Password
```

Using the `-o` option outputs only the matching portions of each line, simplifying further data processing.

## Conclusion

Grep is a versatile and powerful tool for searching text within files. Its many options—such as case insensitivity, recursive searching, whole word matching, and output customization—make it an essential utility for efficiently filtering and extracting information.

Happy grepping!

For more technical guides and tips, check out our [Comprehensive Unix/Linux Tutorials](#).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/115b1db7-7970-4cc8-91d4-0ac4892fed9f/lesson/7fbf1196-1fa7-4ee9-86b1-df05c54e12ca)**
>
> Watch video content
