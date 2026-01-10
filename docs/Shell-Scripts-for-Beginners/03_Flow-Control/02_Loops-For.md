# Loops For - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Shell-Scripts-for-Beginners/Flow-Control/Loops-For)

---

## Table of Contents

- Loops For
  - Watch Video
  - Practice Lab

---

## Content

Shell Scripts for Beginners

Flow Control

# Loops For

In this article, we explore how to use for loops in shell scripts to automate repetitive tasks. Imagine you built a script to launch a single rocket with one command. Now, if you need to launch hundreds of rockets for various missions—each requiring the same set of commands executed sequentially—a for loop becomes essential.

Initially, you might have executed commands like these:

```
$ create-and-launch-rocket lunar-mission
$ create-and-launch-rocket jupiter-mission
$ create-and-launch-rocket saturn-mission
$ create-and-launch-rocket satellite-mission
$ create-and-launch-rocket lunar-mission-2
$ create-and-launch-rocket mars-mission
$ create-and-launch-rocket earth-mission
```

Instead of calling the `create-and-launch-rocket` script multiple times, you can consolidate these tasks into a new script (e.g., `launch_rockets.sh`) and use a for loop to handle each mission. For example, you could have written the commands manually as follows:

```
create-and-launch-rocket lunar-mission
create-and-launch-rocket saturn-mission
create-and-launch-rocket solar-mission-20
create-and-launch-rocket lunar-mission
create-and-launch-rocket earth-mission
```

A for loop allows you to execute the `create-and-launch-rocket` command for every mission in a given list. A basic for loop in a shell script is structured like this:

```
for mission in <list of missions>
do
    create-and-launch-rocket lunar-mission
done
```

In this structure, the keywords `do` and `done` define the block of commands executed during each loop iteration. The list of missions can be provided as space-separated names. However, keep in mind that using a hardcoded mission name inside the loop (e.g., always using `lunar-mission`) will result in launching the same mission each time:

```
for mission in lunar-mission jupiter-mission saturn-mission satellite-mission lunar-mission-2
do
  create-and-launch-rocket lunar-mission
done
```

To correctly use the mission name for each iteration, replace the hardcoded mission name with the variable `mission`:

```
for mission in lunar-mission jupiter-mission saturn-mission satellite-mission lunar-mission-2
do
  create-and-launch-rocket $mission
done
```

With this change, during each iteration the variable `mission` holds the value of the current mission in the list, and the script launches the corresponding rocket.

When you have a large number of missions, listing all mission names directly in the script becomes impractical. Instead, store the mission names in an external file (e.g., `mission-names.txt`) and read them into your loop:

```
for mission in `cat mission-names.txt`
do
    create-and-launch-rocket $mission
done
```

Here, the command within the backticks (`cat mission-names.txt`) is executed first to retrieve the mission names, which are then iterated over by the loop. A best practice is to design your script so that inputs are either passed as command-line arguments or read from an external file, ensuring that the script requires no modifications for routine use.

> [!important]
> **Note**
>
> Avoid using backticks for command substitution; instead, use the more readable `$()` syntax, especially when embedding multiple commands.

There are two primary ways to supply values to a for loop:

1.  Reading values from a file.
2.  Specifying the items directly.

For example, to generate mission names from one to six, you might write:

```
for mission in $(cat mission-names.txt)
do
    create-and-launch-rocket $mission
done


for mission in 1 2 3 4 5 6
do
    create-and-launch-rocket mission-$mission
done
```

If you need to run the loop over a specific range (such as 100 times), you can utilize brace expansion to generate the sequence:

```
for mission in $(cat mission-names.txt)
do
  create-and-launch-rocket $mission
done


for mission in 1 2 3 4 5 6
do
  create-and-launch-rocket mission-$mission
done


for mission in {0..100}
do
  create-and-launch-rocket mission-$mission
done
```

For users familiar with programming languages like C, which combine initialization, condition, and increment in loops, note that shell scripts also support similar styles using double parentheses.

Typically, you would use a for loop to repeat tasks such as executing commands multiple times, iterating through files, parsing lines within a file, or processing command outputs. Consider the scenarios illustrated in the diagram below:

![The image lists scenarios for using a "For Loop": executing commands repeatedly, iterating through files, lines within a file, and command outputs.](https://kodekloud.com/kk-media/image/upload/v1752884049/notes-assets/images/Shell-Scripts-for-Beginners-Loops-For/frame_370.jpg)

Here are some practical examples of using for loops:

1.  **Counting lines in files:** Iterate through a list of files from the output of the `ls` command and print the line count for each file.

    ```
    for file in $(ls)
    do
      echo "Line count of $file is $(cat $file | wc -l)"
    done
    ```

2.  **Installing packages:** Read a list of packages from a file and install them one by one.

    ```
    for package in $(cat install-packages.txt)
    do
      sudo apt-get -y install $package
    done
    ```

3.  **Checking server uptimes:** SSH into a list of servers (provided in a file) to check their uptimes. (Note: This approach requires passwordless SSH for a seamless experience.)

    ```
    for server in $(cat servers.txt)
    do
      ssh $server "uptime"
    done
    ```

By incorporating these practices, you can create scripts that are both robust and maintainable, simplifying the task for users, even those with limited shell scripting experience.

Happy scripting!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/054d2eb5-f3b9-47d4-af5a-37b9f0d15f2c/lesson/aafb5bad-118d-4486-9b24-c0dbb05b8cc9)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/shell-scripts-for-beginners/module/054d2eb5-f3b9-47d4-af5a-37b9f0d15f2c/lesson/2a701243-2952-4ba0-b1b4-218164117d87)**
>
> Practice lab
