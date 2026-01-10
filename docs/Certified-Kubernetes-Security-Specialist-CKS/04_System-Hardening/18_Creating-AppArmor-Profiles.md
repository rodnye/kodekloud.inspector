# Creating AppArmor Profiles - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Certified-Kubernetes-Security-Specialist-CKS/System-Hardening/Creating-AppArmor-Profiles)

---

## Table of Contents

- Creating AppArmor Profiles
  - Example Bash Script
  - Generating an AppArmor Profile for the Script
  - Profiling the Script
  - Verifying the Profile
  - Testing the Enforced Profile
  - Working with Existing AppArmor Profiles
  - Watch Video

---

## Content

Certified Kubernetes Security Specialist (CKS)

System Hardening

# Creating AppArmor Profiles

In this guide, we will walk through the process of creating custom AppArmor profiles. After reviewing several example profiles in previous lessons, it’s time to build an application-specific profile from scratch.

## Example Bash Script

Below is a sample Bash script named "add_data.sh" that creates directories under the /opt filesystem and writes a log file within the new directory:

```
#!/bin/bash
data_directory=/opt/app/data
mkdir -p "${data_directory}"
echo "=> File created at $(date)" | tee "${data_directory}/create.log"
```

To run the script, execute the following command in your terminal:

```
./add_data.sh
```

Expected terminal output:

```
=> File created at Mon Mar 12 03:29:22 UTC 2021
```

You can verify the content of the log file with:

```
cat /opt/app/data/create.log
```

This should display:

```
=> File created at Mon Mar 12 03:29:22 UTC 2021
```

## Generating an AppArmor Profile for the Script

Instead of creating a profile manually, you can use AppArmor’s built-in tools. First, install the AppArmor-utils package. On Ubuntu, run:

```
apt-get install -y apparmor-utils
```

The installation output will resemble:

```
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following packages were automatically installed and are no longer required:
  libc-ares2 libhttp-parser2.7.1 libnetplan0 libuv1 nodejs-doc python3-netifaces
Use 'apt autoremove' to remove them.
The following additional packages will be installed:
  python3-apparmor python3-libapparmor
Suggested packages:
  vim-addon-manager
The following NEW packages will be installed:
  apparmor-utils python3-apparmor python3-libapparmor
...
Unpacking apparmor-utils (2.12-4ubuntu5.1) ...
Setting up python3-libapparmor (2.12-4ubuntu5.1) ...
Setting up python3-apparmor (2.12-4ubuntu5.1) ...
Setting up apparmor-utils (2.12-4ubuntu5.1) ...
Processing triggers for man-db (2.8.3-2ubuntu0.1) ...
```

Once installed, generate a profile for the Bash script using the following command:

```
aa-genprof /root/add_data.sh
```

The output will be similar to:

```
Writing updated profile for /root/add_data.sh.
Setting /root/add_data.sh to complain mode!


Before you begin, you may wish to check if a profile already exists for the application you wish to confine. See the following wiki page for more information:
https://gitlab.com/apparmor/apparmor/wikis/Profiles
Profiling: /root/add_data.sh


Please start the application to be profiled in another window and exercise its functionality now.


Once completed, select the "Scan" option below in order to scan the system logs for AppArmor events.


For each AppArmor event, you will be given the opportunity to choose whether the access should be allowed or denied.


[(S)can system log for AppArmor events] / (F)inish
```

## Profiling the Script

1.  Open a separate terminal window and run the Bash script to generate AppArmor events:

    ```
    ./add_data.sh
    ```

2.  Return to the `aa-genprof` prompt and press `s` to scan the system logs. The tool will then display multiple prompts for each event encountered, such as:

    ```
    Profile: /root/add_data.sh
    Execute: /usr/bin/mkdir
    Severity: unknown
    ```

    To allow the execution of the `mkdir` command, choose the inherit option by entering `i`.

3.  Further prompts might appear. For example:

    ```
    Profile: /root/add_data.sh
    Execute: /usr/bin/tee
    Severity: 3
    (I)nherit / (C)hild / (P)rofile / (N)amed / (U)nconfined / (X) ix On / (D)eny / Abo(r)t / (F)inish
    ```

    Again, select the appropriate option—typically `i` for inherit if needed.

4.  Another prompt may request permission to access the tty interface. If a prompt with severity 9 appears when printing to the console, enter `a` (allow).
5.  You might encounter a prompt asking for read access to a system file. For instance:

    ```
    Profile: /root/add_data.sh
    Path: /proc/filesystems
    New Mode: owner r
    Severity: 6
    [1] 'owner /proc/filesystems r,'
    (A)llow / [D]eny / [I]gnore / [G]lob / Glob with [E]xtension / [N]ew /
    Audi(t) / [O]wner permissions off / Abo(t) / [F]inish
    ```

    Since the script does not need access to this file, choose `d` to deny access.

> [!important]
> **Important**
>
> Ensure that you only allow permissions essential for your application to operate. Deny any unnecessary access to maintain a secure profile.

After processing all events, press `S` to save and `F` to finish. You should see output similar to:

```
= Changed Local Profiles =


The following local profiles were changed. Would you like to save them?


[1 - /root/add_data.sh]
(s)ave Changes / Save Sele(c)t(ed Profile / [(V)iew Changes] / View Changes
b/w -(C)lean profiles ./ Abo(r)t
Writing updated profile for /root/add_data.sh.


Profiling: /root/add_data.sh
.


For each AppArmor event, you will be given the opportunity to choose whether the access should be allowed or denied.


[(S)can system log for AppArmor events] / (F)inish Setting /root/add_data.sh to enforce mode.
Finished generating profile for /root/add_data.sh
```

Your new AppArmor profile is now running in enforce mode.

## Verifying the Profile

To confirm that the profile is in enforce mode, use the following command:

```
aa-status
```

Expected output:

```
apparmor module is loaded.
13 profiles are loaded.
13 profiles are in enforce mode.
/root/add_data.sh
/sbin/dhclient
/usr/bin/man
/usr/lib/NetworkManager/nm-dhcp-client.action
/usr/lib/NetworkManager/nm-dhcp-helper
...
usr/sbin/tcpdump
docker-default
man_filter
man_groff
0 profiles are in complain mode.
11 processes have profiles defined.
11 processes are in enforce mode.
/root/add_data.sh
/sbin/dhclient (621)
docker-default (3970)
docker-default (4025)
docker-default (9853)
docker-default (9964)
0 processes are in complain mode.
0 processes are unconfined but have a profile defined.
```

The new profile, along with other existing profiles, is stored in the /etc/apparmor.d directory. An example profile for "add_data.sh" might look like this:

```
# Last Modified: Mon Mar 22 11:21:42 2021
#include <tunables/global>


/root/add_data.sh {
    #include <abstractions/base>
    #include <abstractions/bash>
    #include <abstractions/consoles>


    deny owner /proc/filesystems r,
    /root/add_data.sh r,
    /usr/bin/bash ix,
    /usr/bin/date mrix,
    /usr/bin/mkdir mrix,
    /usr/bin/tee mrix,
    owner /opt/app/ rw,
    owner /opt/app/data/ w,
    owner /opt/app/data/create.log w,
}
```

## Testing the Enforced Profile

To verify that the enforced profile restricts unauthorized access, modify the script to change the log file path from `/opt/app/data` to `/opt`. Update the script as follows:

```
#!/bin/bash
data_directory=/opt
mkdir -p "${data_directory}"
echo "=> File created at $(date)" | tee "${data_directory}/create.log"
```

When you run the modified script:

```
./add_data.sh
```

You should see an output similar to:

```
tee: /opt/create.log: Permission denied
=> File created at Mon 22 Mar 2021 04:04:47 PM EDT
```

This confirms that while the script can output to the terminal, the AppArmor profile restricts write access only to the `/opt/app` directory, yielding a permission denied error when attempting to write directly to `/opt`.

## Working with Existing AppArmor Profiles

To load an existing profile, use the AppArmor parser command. If no output is returned, the profile has been successfully loaded.  
To disable a profile, use the same command with the `-r` flag and create a symlink to the profile in the `/etc/apparmor.d/disable` directory.

> [!important]
> **Next Steps**
>
> Now that you've learned how to create and enforce AppArmor profiles for a custom application, you can explore securing applications running within Kubernetes pods using AppArmor for enhanced security.

This concludes the lesson on creating AppArmor profiles. Next, we will explore securing an application running inside a Kubernetes pod with AppArmor profiles.

Happy securing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/certified-kubernetes-security-specialist-cks/module/d67be5ee-871d-4435-a187-382610cb6a1f/lesson/093e196c-059d-4eac-8816-af343c5e0695)**
>
> Watch video content
