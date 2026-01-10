# Use Looping constructs for etc - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Red-Hat-Certified-System-AdministratorRHCSA/Create-Simple-Shell-Scripts/Use-Looping-constructs-for-etc)

---

## Table of Contents

- Use Looping constructs for etc
  - Manual vs. Automated Launching
  - Creating a Simple For Loop
  - Reading Missions from an External File
  - Dynamically Generating Mission Names
  - Real-Life For Loop Applications
  - Watch Video

---

## Content

Red Hat Certified System Administrator(RHCSA)

Create Simple Shell Scripts

# Use Looping constructs for etc

In this lesson, we'll explore how to use looping constructs to automate rocket launches. Previously, you built a script to launch a rocket for a single mission using one command. Now, imagine you need to launch hundreds of rockets for different missions across various celestial bodies. Instead of issuing commands manually for each mission, you can automate the process by repeatedly executing the same command with different mission names.

## Manual vs. Automated Launching

Below is an example of manually launching several missions:

```
$ create-and-launch-rocket lunar-mission
$ create-and-launch-rocket jupiter-mission
$ create-and-launch-rocket saturn-mission
$ create-and-launch-rocket satellite-mission
$ create-and-launch-rocket lunar-mission-2
$ create-and-launch-rocket mars-mission
$ create-and-launch-rocket earth-mission
```

To streamline this process, consider creating a new script (e.g., `launch_rockets.sh`) that employs a for loop to run the `create-and-launch-rocket` command for each mission in a predefined list.

## Creating a Simple For Loop

A for loop is especially useful when you need to run the same command repeatedly. Consider this initial version of a for loop:

```
for mission in lunar-mission jupiter-mission
do
  create-and-launch-rocket lunar-mission
done
```

Notice that the command inside the loop is hard-coded to `lunar-mission`. As a result, it will always launch the lunar mission regardless of the mission names listed. To ensure the correct mission is launched each time, replace the hard-coded value with the loop variable:

```
for mission in lunar-mission jupiter-mission saturn-mission satellite-mission lunar-mission-2
do
  create-and-launch-rocket $mission
done
```

In this corrected version, the variable `mission` takes on each value from the provided list sequentially. For example, during the first iteration it will launch `lunar-mission`, during the second iteration `jupiter-mission`, and so forth.

## Reading Missions from an External File

When dealing with a large number of missions, manually listing all names in the script is impractical. Instead, store the mission names in an external file (e.g., `mission-names.txt`) and use command substitution to read from it:

```
for mission in $(cat mission-names.txt)
do
  create-and-launch-rocket $mission
done
```

This approach decouples your data from the script logic. Any updates to the mission names can be managed by simply editing `mission-names.txt`, without needing to modify the script itself.

> [!important]
> **Command Substitution Tip**
>
> Use the modern syntax `$(...)` instead of backticks for command substitution. It is more readable and handles nested commands better.

## Dynamically Generating Mission Names

You can also generate mission names dynamically. For instance, if you want to create mission names in a numerical sequence from 1 to 6, you can use:

```
for mission in 1 2 3 4 5 6
do
  create-and-launch-rocket mission-$mission
done
```

Or, for looping through a larger sequence using brace expansion:

```
for mission in {0..100}
do
  create-and-launch-rocket mission-$mission
done
```

## Real-Life For Loop Applications

For loops are not limited to rocket launches. They can significantly simplify repetitive tasks in various real-life scenarios, such as iterating over files, processing command outputs, or managing remote servers. Consider these examples:

```
# Loop through all files in the current directory and print the line count for each.
for file in $(ls)
do
  echo "Line count of $file is $(cat $file | wc -l)"
done


# Iterate over a list of servers provided in servers.txt and check their uptime via SSH.
for server in $(cat servers.txt)
do
  ssh $server "uptime"
done


# Install a list of packages stored in install-packages.txt.
for package in $(cat install-packages.txt)
do
  sudo apt-get -y install $package
done
```

> [!important]
> **SSH Access Note**
>
> When using the SSH loop, ensure that your environment is configured for passwordless SSH access. Without this, you will be prompted to enter a password for each connection, which may hinder automation.

Using for loops in these ways not only simplifies repetitive tasks but also reduces the risk of manual errors, making your scripts more maintainable and user-friendly.

![The image is a slide explaining when to use a "For Loop," listing tasks such as executing commands multiple times, iterating through files, lines within a file, and command outputs.](https://kodekloud.com/kk-media/image/upload/v1752883564/notes-assets/images/Red-Hat-Certified-System-AdministratorRHCSA-Use-Looping-constructs-for-etc/for-loop-usage-explained-slide.jpg)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/red-hat-certified-system-administrator-rhcsa/module/9225d80c-3f9d-4e8e-9135-febe7ca37af2/lesson/6c35d238-fb7f-4aac-8c83-8b1a86e4a056)**
>
> Watch video content
