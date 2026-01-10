# Variables - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Shell-Scripts-for-Beginners/Shell-Script-Introduction/Variables)

---

## Table of Contents

- Variables
  - Why Use Variables?
  - Basic Variable Usage
  - Capturing Command Output in Variables
  - Practice Makes Perfect
  - Watch Video
  - Practice Lab

---

## Content

Shell Scripts for Beginners

Shell Script Introduction

# Variables

In shell scripting, variables enhance flexibility and reduce errors by enabling dynamic value assignment throughout your scripts. Instead of hardcoding values such as a mission name, using a variable (typically named "mission_name") allows you to update the value in one place, ensuring consistency across all commands.

## Why Use Variables?

Hardcoding values like "lunar-mission" in every command can lead to issues:

- Inconsistencies: A single typo can disrupt the entire script.
- Maintenance Challenges: Adding or modifying steps requires updating every instance manually.
- Poor Reusability: Reusing the script for another mission (e.g., Mars mission) involves replacing each occurrence, increasing error risks.

By declaring a variable at the beginning, you can update its value once, and the change propagates throughout the script.

## Basic Variable Usage

When referencing a variable in a script, always prefix its name with a dollar sign (`$`). However, omit the dollar sign when assigning a value. Below is an improved example of how to set and use a variable in a shell script:

```
#!/bin/bash


# Set the mission name
mission_name=lunar-mission


# Use the variable in subsequent commands
mkdir "$mission_name"
rocket-add "$mission_name"
rocket-start-power "$mission_name"
rocket-internal-power "$mission_name"
rocket-crew-ready "$mission_name"
rocket-start-sequence "$mission_name"
rocket-start-engine "$mission_name"
rocket-lift-off "$mission_name"
rocket-status "$mission_name"
```

To change the mission, update the variable assignment at the beginning:

```
mission_name=mars-mission
```

This update automatically propagates to all commands, eliminating the need for repetitive manual changes.

> [!important]
> **Note**
>
> Variable names should use only lowercase letters and underscores (e.g., `mission_name`). Avoid using hyphens or other characters, as variable names must consist solely of alphanumeric characters or underscores.

## Capturing Command Output in Variables

Variables in shell scripts can also store the output of commands. For instance, if the command `rocket-status` outputs a value such as "launching", "success", or "failed", you can capture that output and then display it. The following example demonstrates how to do this:

```
#!/bin/bash


# Set the mission name for a different mission
mission_name=mars-mission


# Execute the series of commands for the mission
mkdir "$mission_name"
rocket-add "$mission_name"
rocket-start-power "$mission_name"
rocket-internal-power "$mission_name"
rocket-crew-ready "$mission_name"
rocket-start-sequence "$mission_name"
rocket-start-engine "$mission_name"
rocket-lift-off "$mission_name"
rocket-status "$mission_name"


# Capture the rocket status output into a variable
rocket_status=$(rocket-status "$mission_name")


# Print the status of the launch
echo "Status of launch: $rocket_status"
```

Here, the output of `rocket-status` is stored in the variable `rocket_status` using the command substitution syntax `$(...)` and then printed using the `echo` command.

## Practice Makes Perfect

Applying these concepts will help you write more robust and maintainable scripts. Try refactoring your existing scripts by replacing hardcoded values with variables to see how much easier updates become.

I look forward to seeing you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/2709b373-3a6f-4b31-9aff-fe8a553898fa/lesson/c5cf2034-a087-42da-ab32-1988042eda61)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/2709b373-3a6f-4b31-9aff-fe8a553898fa/lesson/cf45ee2d-0c63-4e13-95e8-47bc4ece8174)**
>
> Practice lab
