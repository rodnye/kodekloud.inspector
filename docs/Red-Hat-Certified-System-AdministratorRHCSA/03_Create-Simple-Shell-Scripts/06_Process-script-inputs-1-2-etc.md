# Process script inputs 1 2 etc - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Create-Simple-Shell-Scripts/Process-script-inputs-1-2-etc)

---

## Table of Contents

- Process script inputs 1 2 etc
  - Using Command Line Arguments
  - Prompting for Input with the read Command
  - Choosing the Appropriate Method
  - Summary
  - Watch Video
  - Practice Lab
    - Without a Custom Prompt
    - With a Custom Prompt

---

## Content

Red Hat Certified System Administrator(RHCSA)

Create Simple Shell Scripts

# Process script inputs 1 2 etc

In this lesson, you'll learn how to capture user inputs in a shell script. Two common approaches exist for obtaining the mission name: via command line arguments or interactively using the read command. Choosing the right method depends on your use case and scripting needs. Below, you'll find detailed explanations and examples for each approach.

## Using Command Line Arguments

One approach is to pass the mission name as a command line argument when executing the script. The script retrieves the first argument (i.e., $1) and uses it as the mission name. This method is especially useful when you want the script to run without manual intervention.

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
echo "Status of launch: $rocket_status"
```

To run this script, execute the following command:

```
$ create-and-launch-rocket saturn-mission
```

In this example, "saturn-mission" is provided as a command line argument, allowing the script to proceed without waiting for further input.

## Prompting for Input with the read Command

For scenarios requiring interactive input, the `read` command is an effective option. The following examples illustrate two variations: one without a custom prompt and another with a clear, guiding message.

### Without a Custom Prompt

When you use `read` without the `-p` option, the script simply waits for input without displaying any guidance. This approach is straightforward but may be less user-friendly.

```
#!/bin/bash
read mission_name


mkdir "$mission_name"
rocket-add "$mission_name"
rocket-start-power "$mission_name"
rocket-internal-power "$mission_name"
rocket-start-sequence "$mission_name"
rocket-start-engine "$mission_name"
rocket-lift-off "$mission_name"


rocket_status=$(rocket-status "$mission_name")
echo "Status of launch: $rocket_status"
```

When this script runs, the user sees only a blank line prompting them to provide input:

```
$ create-and-launch-rocket
saturn-mission
```

### With a Custom Prompt

To improve clarity, you can add a custom message using the `-p` option with the `read` command. This modification makes it evident what input is expected.

```
#!/bin/bash
read -p "Enter mission name: " mission_name


mkdir "$mission_name"
rocket-add "$mission_name"
rocket-start-power "$mission_name"
rocket-internal-power "$mission_name"
rocket-start-sequence "$mission_name"
rocket-start-engine "$mission_name"
rocket-lift-off "$mission_name"


rocket_status=$(rocket-status "$mission_name")
echo "Status of launch: $rocket_status"
```

Now, when the script executes, it displays a clear prompt:

```
$ create-and-launch-rocket
Enter mission name: saturn-mission
```

After the user inputs the mission name, it is stored in the `mission_name` variable and subsequently used in the launch sequence commands.

> [!important]
> **Note**
>
> For enhanced usability, consider designing your script to support both methods. If a command line argument is provided, use it. Otherwise, prompt the user interactively. This approach offers flexibility and makes your script suitable for both manual and automated scenarios.

## Choosing the Appropriate Method

When developing your script, consider the following:

| Scenario                                           | Recommended Approach                                                      |
| -------------------------------------------------- | ------------------------------------------------------------------------- |
| Running unattended or automating processes         | Command Line Arguments                                                    |
| Requiring user confirmation (e.g., deleting files) | Interactive Input with a Custom Prompt                                    |
| Supporting both manual and automated execution     | A hybrid approach: check for command line arguments and prompt if missing |

- For simple scripts that rely on manual user input, using the `read` command with a custom prompt is ideal.
- For scripts designed to operate without human intervention or to be called by other scripts, command line arguments provide a seamless and efficient solution.

In upcoming lessons, we will explore how to implement conditional behavior using control and conditional statements in shell scripts, further enhancing your script's flexibility and reliability.

## Summary

In this session, you learned to capture inputs in shell scripts using two methods:

1.  Command line arguments for unattended runs.
2.  The `read` command (with and without a custom prompt) for interactive user input.

Both techniques have their merits, and choosing the right one depends on the operational context of your script. For more advanced scripting techniques and conditional input handling, stay tuned for the next lesson.

For additional resources on shell scripting, check out [Shell Scripting Tutorial](https://www.shellscript.sh/tutorial.html) and other online guides.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/9225d80c-3f9d-4e8e-9135-febe7ca37af2/lesson/c24ec26a-6ca4-4b67-9149-2d121e7fb5df)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/9225d80c-3f9d-4e8e-9135-febe7ca37af2/lesson/3bbe30b7-17e5-4a02-a5c5-5b2c00484e3d)**
>
> Practice lab
