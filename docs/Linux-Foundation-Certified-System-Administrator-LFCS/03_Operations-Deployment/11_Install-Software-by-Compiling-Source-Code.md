# Install Software by Compiling Source Code - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Foundation-Certified-System-Administrator-LFCS/Operations-Deployment/Install-Software-by-Compiling-Source-Code)

---

## Table of Contents

- Install Software by Compiling Source Code
  - Clone the Repository
  - Install Dependencies
  - Run the Autogen Script
  - Verify Configuration Requirements
  - Compile the Application
  - Run the Compiled Application
  - Install the Binary System-wide
  - Conclusion
  - Watch Video
  - Practice Lab

---

## Content

Linux Foundation Certified System Administrator (LFCS)

Operations Deployment

# Install Software by Compiling Source Code

In this lesson, we will explore how to install software by compiling its source code. Unlike installations from Ubuntu's repositories or third-party packages, compiling from source allows you to run the absolute latest version of an application available directly from its development repository.

When you compile software, you transform human-readable source code into an optimized binary executable that your computer can run efficiently.

## Clone the Repository

Before getting started, ensure that Git is installed on your system. Most modern versions of Ubuntu and Linux come with Git pre-installed. In this example, we will clone the Git repository for an application called htop.

Run the command below to clone the repository:

```
git clone <GitHub-URL-of-htop-repository>
```

After cloning, switch to the project's directory and review its contents. You'll notice a README file that includes built-in instructions for building the project, along with other key files.

![The image shows a terminal window displaying a list of files and directories, likely from a source code repository. The files have various extensions such as `.c`, `.h`, and `.md`, and some directory names are highlighted in different colors.](https://kodekloud.com/kk-media/image/upload/v1752881341/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Install-Software-by-Compiling-Source-Code/terminal-file-list-repository.jpg)

## Install Dependencies

According to the README file, several libraries and compilation tools are required. One essential package is `libncursesw5-dev`, which is a development library, indicated by the `-dev` suffix. Additionally, the `build-essential` package installs the necessary compilation tools.

Install the required packages by running:

```
sudo apt install libncursesw5-dev autotools-dev autoconf automake build-essential
```

> [!important]
> **Tip**
>
> If you encounter dependency errors, verify that your software repositories are updated and consider running `sudo apt update` before installing.

## Run the Autogen Script

After installing the dependencies, locate the executable script named `autogen.sh` (often highlighted in green). This script generates the `configure` file, which prepares the build configuration options for your project.

To run the autogen script, execute:

```
bash ./autogen.sh
```

The execution output should look similar to:

```
autoreconf: export WARNINGS=all
autoreconf: Entering directory '.'
autoreconf: configure.ac: not using Gettext
autoreconf: running: aclocal --force
autoreconf: configure.ac: tracing
autoreconf: configure.ac: creating directory build-aux
autoreconf: configure.ac: not using Libtool
autoreconf: configure.ac: not using Intltool
autoreconf: configure.ac: not using Gtkdoc
autoreconf: running: /usr/bin/autoconf --force
autoreconf: running: /usr/bin/autoheader --force
autoreconf: running: automake --add-missing --copy --force-missing
configure.ac:69: installing 'build-aux/compile'
configure.ac:23: installing 'build-aux/config.guess'
configure.ac:23: installing 'build-aux/config.sub'
configure.ac:24: installing 'build-aux/install-sh'
configure.ac:24: installing 'build-aux/missing'
Makefile.am: installing './INSTALL'
Makefile.am: installing 'build-aux/depcomp'
autoreconf: Leaving directory '.'
```

This generated `configure` script allows you to set various build options. To view all available configuration options, run:

```
bash
./configure --help
```

Running `./configure` without arguments will configure the project using default settings.

![The image shows a terminal screen displaying configuration options and environment variables for compiling software, specifically related to the `htop` program. It includes options for enabling warnings, debugging, and specifying package locations.](https://kodekloud.com/kk-media/image/upload/v1752881342/notes-assets/images/Linux-Foundation-Certified-System-Administrator-LFCS-Install-Software-by-Compiling-Source-Code/htop-configuration-options-terminal.jpg)

## Verify Configuration Requirements

Before building the project, the configuration script checks for the presence of necessary libraries and compiler support. Below is an example snippet of these checks:

```
checking for stdlib.h... (cached) yes
checking for string.h... (cached) yes
checking for strings.h... (cached) yes
checking for sys/param.h... yes
checking for sys/time.h... yes
checking for sys/utsname.h... yes
checking for unistd.h... (cached) yes
checking for sys/mkdev.h... no
checking for sys/sysmacros.h... yes
checking for execinfo.h... yes
checking for mbstate_t... yes
checking for mode_t... yes
checking for off_t... yes
checking for pid_t... yes
checking for size_t... yes
checking for ssize_t... yes
checking how to run the C preprocessor... gcc -E
checking for grep that handles long lines and -e... /usr/bin/grep
checking for egrep... /usr/bin/grep -E
checking for uid_t in sys/types.h... yes
checking for uint8_t... yes
checking for uint16_t... yes
checking for uint32_t... yes
checking for uint64_t... yes
checking for alloc_size... yes
checking for access... yes
checking for nonnull... yes
checking for NaN support... yes
checking for library containing ceil... |
```

Once all checks pass, you are ready to compile the application using `make`.

## Compile the Application

The `make` command compiles the source code into an executable binary. To start the compilation process, run:

```
make
```

If you wish to see a list of all available make targets (such as `clean`, `install`, and `uninstall`), type `make` followed by a space and press the Tab key twice. These common targets help in managing build artifacts and installation processes.

For example, if the build process fails or you need to start from a clean state, you can run:

```
make clean
```

After successfully running `make`, the `htop` binary is compiled in the current directory.

## Run the Compiled Application

After compilation, you can run the newly created `htop` executable directly from the current directory:

```
./htop
```

Upon running `htop`, you should see an interface similar to the following:

```
Main          I/O
PID     USER      PR NI    VIRT    RES  SHR S  CPU% MEM% TIME+     Command
13535   jeremy    20  0  15120   6956  4992 S   2.0  0.1  0:06.53   sshd: jeremy@pts/0
19840   jeremy    20  0   8000   4224  3456 R   1.3  0.1  0:00.04   /htop
24200   root      20  0  58560   4200  23304 S   0.7  0.3  0:13.96   /usr/lib/systemd/systemd-journald
...
```

Press Q to quit the application interface.

## Install the Binary System-wide

Typing the full path to run the executable each time can be cumbersome. To streamline the process, you can install the application system-wide. This action moves the `htop` binary into a directory included in your system's PATH (typically `/usr/local/bin`), allowing you to run it from any location.

Install `htop` system-wide by executing:

```
sudo make install
```

Now, you can simply type:

```
htop
```

For example, navigate to your home directory and run:

```
cd ~
htop
```

Because `/usr/local/bin` is in the default PATH for Ubuntu, you no longer need to specify the full path to launch the application.

> [!important]
> **SEO Tip**
>
> Compiling software from source can provide enhanced performance and access to the latest features. Always refer to the project's README for specific build instructions and troubleshooting tips.

## Conclusion

In this lesson, we covered the process of compiling and installing software from source code. The steps included:

- Cloning the repository
- Installing necessary dependencies
- Generating configuration scripts via `autogen.sh`
- Verifying configuration requirements
- Compiling the project using `make`
- Running and installing the binary system-wide

By compiling from source, you ensure that you are running the most recent version of the application. Happy compiling, and see you in the next lesson!

```
htop
```

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cb813f7f-73bd-40ee-a088-d31ba20c51de/lesson/15d1d3cd-fb6e-4182-a077-3ad845fe52a5)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/linux-foundation-certified-system-administrator-lfcs/module/cb813f7f-73bd-40ee-a088-d31ba20c51de/lesson/3cf44209-0fd2-49f1-8bb4-671d31110cc3)**
>
> Practice lab
