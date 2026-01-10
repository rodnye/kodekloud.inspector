# Processing shell command exit codes - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Create-Simple-Shell-Scripts/Processing-shell-command-exit-codes)

---

## Table of Contents

- Processing shell command exit codes
  - Custom Command Example: Rocket Commands
  - Best Practices for Scripts
  - Watch Video

---

## Content

Red Hat Certified System Administrator(RHCSA)

Create Simple Shell Scripts

# Processing shell command exit codes

In this lesson, we explore how exit codes function when executing commands on a Linux system. Every command returns an exit code (also known as a return code) that indicates whether the command executed successfully or encountered an error.

When you run a command like `ls` to list directory contents, it typically returns an exit code of 0 to indicate success:

```
$ ls
/home /root /tmp


$ echo $?
0
```

In contrast, executing a command that does not exist—such as `lss`—results in an error message and a non-zero exit code:

```
$ lss
Failed: command not found


$ echo $?
127
```

## Custom Command Example: Rocket Commands

The same principles apply to custom commands. Consider a command named `rocket-status` used to check the status of a rocket launch. This command returns an exit code of 0 if the launch is successful and 1 if it fails:

```
$ rocket-status
success


$ echo $?
0


$ rocket-status
failed


$ echo $?
1
```

Although exit codes are not displayed in the command output, they are stored in the special variable `$?`. It is important to execute `echo $?` immediately after running the command, as any subsequent command may modify its value.

> [!important]
> **Note**
>
> Always check the exit code immediately after running a command using `echo $?` to ensure you capture the correct value.

## Best Practices for Scripts

It is best practice for scripts—especially those integrated with other scripts—to return appropriate exit codes that signal success or failure. Consider the following example script for launching a rocket:

```
#!/bin/bash
mission_name=$1


mkdir "$mission_name"
rocket-add "$mission_name"
rocket-start-power "$mission_name"
rocket-internal-power "$mission_name"
rocket-start-sequence "$mission_name"
rocket-start-engine "$mission_name"
rocket-lift-off "$mission_name"


rocket_status=$(rocket-status "$mission_name")
while [ "$rocket_status" == "launching" ]; do
    sleep 2
    rocket_status=$(rocket-status "$mission_name")
done


if [ "$rocket_status" = "failed" ]; then
    rocket-debug "$mission_name"
    exit 1
fi
```

In this script:

1.  Various setup steps are executed for initiating the mission.
2.  The script continuously checks the rocket’s status until it is no longer "launching".
3.  If the status changes to "failed", the script runs `rocket-debug` and explicitly exits with an exit code of 1.

> [!important]
> **Warning**
>
> Without the `exit 1` command in the failure block, the script would default to an exit code of 0 even when the launch fails, which can lead to improper error handling.

Returning a non-zero exit code upon failure is essential for robust error handling and seamless integration with other scripts. As a best practice, always ensure your scripts return a status code that accurately reflects the outcome of their execution.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/9225d80c-3f9d-4e8e-9135-febe7ca37af2/lesson/76e4844e-b2b8-4352-99bb-94a47883ccc8)**
>
> Watch video content
