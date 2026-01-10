# Work with package module streams - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Deploy-Configure-and-Maintain-Systems/Work-with-package-module-streams)

---

## Table of Contents

- Work with package module streams
  - Viewing Available Modules
  - Detailed Module Information and Installation
  - Resetting Module Streams
  - Watch Video
  - Practice Lab

---

## Content

Red Hat Certified System Administrator(RHCSA)

Deploy Configure and Maintain Systems

# Work with package module streams

In this lesson, you'll learn how to manage packaged module streams in RHEL 8. Application streams (or app streams) allow you to select from multiple versions of software packages grouped as modules, offering greater flexibility and compatibility for your environment.

A module is a collection of packages that are typically installed together, while a profile is a subset of that module tailored for a specific purpose—for example, server configuration, client setup, or development environment. Module streams can be active (enabled) or inactive (disabled), and only one version of a module stream can be active at any given time. This setup ensures that only the designated version of a package and its dependencies are installed, with the YUM package manager handling all dependencies automatically.

> [!important]
> **Note**
>
> If you ever need to verify which modules are available or currently active, the YUM package manager provides commands to list module streams and their profiles.

## Viewing Available Modules

To display all available module streams, run the following command:

```
sudo yum module list
```

The output will look similar to this:

```
Extra Packages for Enterprise Linux Modular 8 - x86_64
Name    Stream    Profiles        Summary
nginx   mainline  common          [ nginx webserver]
nginx   1.20     common          [ nginx webserver]
nodejs  13       default,        Javascript runtime
                develop
                minimal
nodejs  16-epel default,        Javascript runtime
                develop
                minimal
```

## Detailed Module Information and Installation

For more detailed information about a specific module, you can search within its listings. For instance, the Node.js module may list several versions (such as 10, 12, 14, and 16). By default, installing Node.js without specifying a version will install version 10 with the common profile.

To install a specific version with a designated profile—for example, Node.js version 14 using the development profile—execute:

```
sudo yum module install nodejs:14/development
```

After installation, you can confirm the active module stream and its profiles by running:

```
sudo yum module list --installed nodejs
```

The output should indicate that Node.js version 14 is active, similar to the following:

```
Name              Stream      Profiles                       Summary
nodejs            14 [e]     common [d], development [i], minimal, s2i
Hint: [d]efault, [e]nabled, [x]disabled, [i]ninstalled
```

## Resetting Module Streams

If you need to revert to the default module settings—for example, to switch back to Node.js version 10 with the common profile—you can use the reset command:

```
sudo yum module reset nodejs
```

Once reset, you can install a different version (such as version 16 with the development profile) if needed. This modular approach simplifies the process of switching between different package versions to suit your current requirements.

> [!important]
> **Summary**
>
> This lesson covered how to view available modules, install a specific module stream with a chosen profile, and reset module streams in RHEL 8 using the YUM package manager.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/736506db-a70d-463d-a061-74c768d309b0/lesson/6a7fcbd3-681c-41a6-8d4c-2465a85141b4)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/736506db-a70d-463d-a061-74c768d309b0/lesson/2d44ca62-2a64-4588-8755-8a8ebcb91421)**
>
> Practice lab
