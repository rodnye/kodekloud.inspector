# Configure PAM - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Manage-Users-and-Groups/Configure-PAM)

---

## Table of Contents

- Configure PAM
  - Understanding Authentication with su
  - Introducing PAM
  - Testing the New PAM Configuration
  - Summary
  - Watch Video
  - Practice Lab
    - How PAM Modules Work
    - Choosing the Right Control Flags
    - Exploring PAM Modules with man

---

## Content

Red Hat Certified System Administrator(RHCSA)

Manage Users and Groups

# Configure PAM

Welcome to this detailed guide on configuring Pluggable Authentication Modules (PAM). In this article, you'll learn the fundamentals of authentication, explore the PAM configuration files, and see how to modify them for various authentication scenarios.

## Understanding Authentication with su

When you run a command like `su`, it prompts for the root user's password. Entering the correct password proves your identity and grants you the privileges of the root user. For example:

```
[aaron@LFCS-CentOS ~]$ su
Password:
[aaron@LFCS-CentOS ~]$
```

This simple interaction demonstrates how authentication works. Not only do humans authenticate, but programs also use authentication to verify and share confidential data with one another.

## Introducing PAM

Pluggable Authentication Modules (PAM) provide a flexible mechanism for authenticating users. With PAM, you can plug in different authentication methods, customize utilities like `su`, and even require specific actions like plugging in a USB security token for authentication.

PAM's configuration files can be found in the `/etc/pam.d` directory. To inspect the directory contents, run:

```
[aaron@LFCS-CentOS ~]$ ls /etc/pam.d/
atd                     gdm-launch-environment  remote
chfn                    gdm-password            runuser
chsh                    gdm-pin                 runuser-l
cockpit                 gdm-smartcard           smartcard-auth
config-util             login                   smtp
crond                   other                   sssd
cups                    passwd                  sssd-shadowutils
fingerprint-auth        password-auth           su
gdm-autologin           polkit-1                sudo
gdm-fingerprint         postlogin               sudo-i
                       system-auth             su-l
```

Notice the `su` file in the directory, which defines the PAM modules for the `su` utility. Let’s take a closer look at its contents.

```
[aaron@LFCS-CentOS ~]$ ls /etc/pam.d/
atd                    gdm-launch-environment   gdm-password            gdm-pin
gdm-smartcard         login                    other                  passwd
fingerprint-auth      password-auth            polkit-1               postlogin
gdm-autologin
```

In this demonstration, after providing the necessary password for authentication, we modify the configuration. Below is an example snippet from the PAM configuration file:

```
#%PAM-1.0
auth      required      pam_env.so
auth      sufficient    pam_rootok.so
# Uncomment the following line to implicitly trust users in the "wheel" group.
auth      sufficient    pam_wheel.so trust use_uid
# Uncomment the following line to require a user to be in the "wheel" group.
#auth      required      pam_wheel.so use_uid
auth      substack      system-auth
auth      include       postlogin
account   sufficient    pam_succeed_if.so uid = 0 use_uid quiet
account   include       system-auth
password  include       system-auth
session   include       system-auth
session   include       postlogin
session   optional      pam_xauth.so
```

By uncommenting the line containing `pam_wheel.so trust use_uid`, an additional authentication module is activated. When you execute `su`, the modules are processed in the specified order, each serving its distinct purpose.

> [!important]
> **Note**
>
> PAM modules are categorized into four types:
>
> - **auth modules**: Verify the identity of a user.
> - **account modules**: Manage tasks related to user accounts.
> - **password modules**: Handle password updates.
> - **session modules**: Prepare the user's session after authentication.

### How PAM Modules Work

The control fields (e.g., required, sufficient, requisite) in the configuration determine how each module's result affects the overall authentication process:

- **required**: Every module marked as required runs, even if one fails. All must pass for authentication to succeed.
- **requisite**: If a module fails, the process halts immediately.
- **sufficient**: If a module passes, remaining modules may be skipped.

For example, the `pam_rootok.so` module allows the root user to bypass password authentication if the module returns a success.

Here’s the improved configuration snippet with proper alignment for clarity:

```
#%PAM-1.0
auth            required        pam_env.so
auth            sufficient      pam_rootok.so
# Uncomment the following line to implicitly trust users in the "wheel" group.
auth            sufficient      pam_wheel.so    trust use_uid
# Uncomment the following line to require a user to be in the "wheel" group.
#auth           required        pam_wheel.so    use_uid
auth            substack        system-auth
auth            include         postlogin
account         sufficient      pam_succeed_if.so    uid = 0 use_uid quiet
account         include         system-auth
password        include         system-auth
session         include         system-auth
session         include         postlogin
session         optional        pam_xauth.so
```

For more detailed information about these modules and their control flags, consult the PAM configuration manual:

```
man pam.conf
```

![The image shows a terminal window on a CentOS system displaying text about default rules and module types for account management and authentication.](https://kodekloud.com/kk-media/image/upload/v1752883597/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Configure-PAM/centos-terminal-account-management-rules.jpg)

### Choosing the Right Control Flags

Consider a scenario where you want the user to authenticate only if they provide both a personal USB security token and a password. In such a case, both modules should be set as required. If only one authentication method succeeds, the overall authentication will fail. Alternatively, if you wish to allow access when either method is successful, you would configure both modules as sufficient.

The difference between control flags like required, requisite, and sufficient can significantly alter the authentication flow. For instance, a failing requisite module halts the process immediately, whereas a failing required module still lets subsequent modules run to log the attempt or perform other tasks.

Below is another display of the detailed PAM configuration:

```
#%PAM-1.0
auth        required      pam_env.so
auth        sufficient    pam_rootok.so
# Uncomment the following line to implicitly trust users in the "wheel" group.
auth        sufficient    pam_wheel.so    trust use_uid
# Uncomment the following line to require a user to be in the "wheel" group.
#auth       required      pam_wheel.so    use_uid
auth        substack      system-auth
auth        include       postlogin
account     sufficient    pam_succeed_if.so uid = 0 use_uid quiet
account     include       system-auth
password    include       system-auth
session     include       system-auth
session     include       postlogin
session     optional      pam_xauth.so
```

Additional documentation on the PAM API and its control fields is available in the module manual pages.

![The image shows a terminal window on a CentOS system displaying text about the PAM-API control field and its syntax. It explains the behavior of the PAM-API in authentication tasks, detailing control values like "required" and "requisite."](https://kodekloud.com/kk-media/image/upload/v1752883598/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Configure-PAM/centos-terminal-pam-api-control.jpg)

### Exploring PAM Modules with man

To see an overview of available PAM modules, execute:

```
[aaron@LFCS-CentOS ~]$ man pam
```

This command displays manual pages for modules such as `pam_unix`, `pam_wheel`, and others. For an in-depth look at the configuration details, try:

```
man pam.conf
```

This will list modules with their functionalities. A typical output might resemble:

```
[aaron@LFCS-CentOS ~]$ man pam.conf
pam
pam_access          pam_keyinit        pam_lastlog
pam.conf           pam_limits        pam_listfile
pam_console        pam_localuser     pam_loginit
pam_console_apply   pam_loginuid      pam_mail
pam.d              pam_mkhomedir     pam_motd
pam_debug          pam_namespace      pam_nologin
pam_env.conf       pam_oddjob_mkhomedir  pamon
pam_failedt       pam_permit        pam_postgresok
pam_faillock       pam_pwistory      pam_pwquality
pam_filter         pam_rhosts        pam_rootok
pam_exec          pam_security      pam_succeed_if
pam_deny           pam_selinux       pam_sepermit
pam_echo           pam_shells        pam_ssh_add
pam_env            pam_sss          pam_sss_gss
pam_issue          pam_systemd       pam_time
pam_exec           pam_timestamp     pam_timestamp_check
pam_failetd       pam_tty_audit     pam_umask
pam_unix           pam_userdb        pam_usertype
pam_warn           pam_wheel        pam_xauth
```

This command is an excellent way to explore and understand the numerous options available with each PAM module.

## Testing the New PAM Configuration

After modifying your PAM configuration for the `su` command, confirm that your user is a member of the `wheel` group with:

```
[aaron@LFCS-CentOS ~]$ groups
aaron wheel family
```

Since the configuration now includes the `pam_wheel.so trust use_uid` module, being part of the `wheel` group should let you switch to the root user without needing a password:

```
[aaron@LFCS-CentOS ~]$ su
[root@LFCS-CentOS aaron]#
```

To exit the root session, simply type:

```
[aaron@LFCS-CentOS ~]$ exit
exit
[aaron@LFCS-CentOS ~]$
```

## Summary

In this article, we explored how PAM allows you to configure authentication modules in a specific sequence, with diverse control flags that influence the authentication process. We reviewed the syntax of PAM configuration files, observed key modules like `pam_rootok.so` and `pam_wheel.so`, and tested the changes using the `su` command.

For further information, remember to consult these resources:

- [man pam.conf](https://linux.die.net/man/8/pam.conf)
- [man pam](https://linux.die.net/man/8/pam)

Proceed to your next demo or lecture for more in-depth coverage of system authentication strategies.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c2d7d0cc-a429-484c-b81b-674ff5fadc7e/lesson/dcca6371-1022-4760-9ebf-0594df308f3e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/c2d7d0cc-a429-484c-b81b-674ff5fadc7e/lesson/e2697162-3126-48e1-b5cc-144e7f26d186)**
>
> Practice lab
