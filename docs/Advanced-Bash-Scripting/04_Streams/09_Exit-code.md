# Exit code - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Streams/Exit-code)

---

## Table of Contents

- Exit code
  - Analogy: The Food Delivery Driver
  - How Exit Codes Work in Unix
  - Custom Exit Codes in Your Script
  - References
  - Watch Video
  - Practice Lab
    - Common Exit Codes Table

---

## Content

Advanced Bash Scripting

Streams

# Exit code

Applications and commands in Unix return an exit status—a numerical code indicating success or failure. By convention, a zero exit code means success, while any non-zero code signals an error. Understanding these codes is crucial for writing robust shell scripts and ensuring predictable automation.

## Analogy: The Food Delivery Driver

Consider a food delivery driver verifying an address before dispatch. If the address is correct, the driver proceeds. If it’s wrong, they return with an error report. This mirrors how scripts and commands operate: they check conditions, perform tasks, and then report their status.

![The image shows a graphic of a smartphone with a map and location pins, alongside an icon of a delivery person on a scooter. There are checkmarks next to "Address" and "Task completion."](https://kodekloud.com/kk-media/image/upload/v1752868628/notes-assets/images/Advanced-Bash-Scripting-Exit-code/smartphone-map-delivery-icon.jpg)

## How Exit Codes Work in Unix

Every Unix-based command finishes with an exit code:

- **0**: Success
- **Non-zero**: An error occurred

![The image displays the text "Exit Code" with the number "0" and a checkmark, indicating a successful operation.](https://kodekloud.com/kk-media/image/upload/v1752868629/notes-assets/images/Advanced-Bash-Scripting-Exit-code/exit-code-0-success-checkmark.jpg)

### Common Exit Codes Table

| Exit Code | Description                            |
| --------- | -------------------------------------- |
| 0         | Success                                |
| 1         | General error                          |
| 2         | Misuse of shell builtins               |
| 126       | Command invoked cannot execute         |
| 127       | Command not found                      |
| 128+      | Fatal error (invalid argument to exit) |

> [!important]
> **Warning**
>
> Exit codes are constrained to the range 0–255. Any value above 255 wraps around modulo 256.

Certain exit codes are reserved by the shell or operating system. Defining your own codes (above 2) helps callers distinguish between different failure modes.

## Custom Exit Codes in Your Script

Below is a template that checks for a configuration file and terminates with meaningful exit statuses.

```
#!/usr/bin/env bash


export CONF_FILE="/var/tmp/file.conf"


terminate() {
    local message="$1"
    local code="${2:-1}"
    echo "${message}" >&2
    exit "${code}"
}


echo "Starting script execution"
echo "Sourcing configuration file"
if [[ ! -f "${CONF_FILE}" ]]; then
    terminate "Configuration file not found: ${CONF_FILE}" 2
fi


exit 0
```

> [!important]
> **Note**
>
> Use clear, documented exit codes in your scripts. This makes it easier for users and other scripts to handle errors automatically.

## References

- [GNU Bash Manual: Exit Status](https://www.gnu.org/software/bash/manual/html_node/Exit-Status.html)
- [Linux Shell Exit Codes](https://tldp.org/LDP/abs/html/exitcodes.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/d972cdb8-d83f-4d2a-bf89-4d4b38161cf2/lesson/5262e47c-04af-4fe1-a50e-514f85c85a97)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/d972cdb8-d83f-4d2a-bf89-4d4b38161cf2/lesson/0357fc3d-7800-4944-a641-b5d713d957f4)**
>
> Practice lab
