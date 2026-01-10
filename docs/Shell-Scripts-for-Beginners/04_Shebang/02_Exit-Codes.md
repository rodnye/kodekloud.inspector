# Exit Codes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Shell-Scripts-for-Beginners/Shebang/Exit-Codes)

---

## Table of Contents

- Exit Codes
  - Watch Video
  - Practice Lab

---

## Content

Shell Scripts for Beginners

Shebang

# Exit Codes

In this article, we explore the concept of exit codes in shell scripts and how they indicate whether a command executed successfully or encountered an error on Linux systems.

When you run a command, it either executes successfully or fails. For instance, listing the contents of the current directory with the command below executes successfully and returns an exit status of zero:

```
$ ls
/home/root/tmp
```

Conversely, if you run a command that does not exist, an error is displayed and a non-zero exit code is returned:

```
$ lss
Failed: command not found
```

When a command runs successfully, it returns an exit status of 0; when it fails, it returns a non-zero value. These exit codes are not shown in the command output but are stored in the built-in variable "$?".

To view the exit code immediately after executing a command, use:

```
$ ls
/home/root/tmp


$ echo $?
0


$ lss
Failed: command not found


$ echo $?
127
```

> [!important]
> **Note**
>
> It is considered best practice to use exit codes in your scripts to communicate the overall status to the caller or user.

Consider a scenario where you are launching a rocket mission. For a successful launch, the script should return an exit status of 0, and for any failure, it should explicitly return a non-zero value (commonly 1).

Below is a sample script that starts a rocket launch mission. In this naive version, even if the launch fails, the script returns an exit code of 0 because it only prints a failure message without setting a non-zero index:

```
mkdir $mission_name
rocket-add $mission_name
rocket-start-power $mission_name
rocket-internal-power $mission_name
rocket-start-sequence $mission_name
rocket-start-engine $mission_name
rocket-lift-off $mission_name
rocket_status=$(rocket-status $mission_name)
while [ "$rocket_status" == "launching" ]
do
  sleep 2
  rocket_status=$(rocket-status $mission_name)
done
if [ "$rocket_status" = "failed" ]
then
  rocket-debug $mission_name
fi
```

If you run the script, the output might be:

```
$ create-and-launch-rocket
failed
```

However, checking the exit code reveals that it remains 0:

```
$ echo $?
0
```

To address this issue, update the script so that it returns a non-zero exit code (typically 1) when the launch fails. Here is the improved version of the script:

```
mkdir $mission_name
rocket-add $mission_name
rocket-start-power $mission_name
rocket-internal-power $mission_name
rocket-start-sequence $mission_name
rocket-start-engine $mission_name
rocket-lift-off $mission_name
rocket_status=$(rocket-status $mission_name)
while [ "$rocket_status" == "launching" ]
do
    sleep 2
    rocket_status=$(rocket-status $mission_name)
done
if [ "$rocket_status" = "failed" ]
then
    rocket-debug $mission_name
    exit 1
fi
```

Now, if the rocket launch fails, the script will correctly exit with a status code of 1. This can be verified as follows:

```
$ create-and-launch-rocket
failed
```

```
$ echo $?
1
```

> [!important]
> **Best Practice**
>
> Always ensure that your scripts return an appropriate exit code. Explicitly returning a non-zero code for failure conditions facilitates better integration with other systems and scripts.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/2e5d4133-6bc2-421e-bc8f-0389e7f96490/lesson/6270f719-a1bc-4ab8-91d8-71786a2c60e8)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/2e5d4133-6bc2-421e-bc8f-0389e7f96490/lesson/9cf43b24-3924-4d85-84db-519fa5eca391)**
>
> Practice lab
