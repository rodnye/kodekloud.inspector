# Remove - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Arrays/Remove)

---

## Table of Contents

- Remove
  - Removing a Specific Element by Index
  - Clearing All Elements
  - Summary of Removal Operations
  - Links and References
  - Watch Video

---

## Content

Advanced Bash Scripting

Arrays

# Remove

In this lesson, you’ll learn two key operations for managing Bash arrays:

1.  Removing a specific element by its index
2.  Clearing all elements in one command

![The image is a slide titled "Arrays remove," showing two checked items: "How to remove a specific element from an array" and "How to remove all of the elements from an array in one shot."](https://kodekloud.com/kk-media/image/upload/v1752868550/notes-assets/images/Advanced-Bash-Scripting-Remove/arrays-remove-element-diagram.jpg)

## Removing a Specific Element by Index

To delete a single entry in a Bash array, use `unset` with the array name and the target index:

```
#!/usr/bin/env bash
declare -a servers=("server1" "server2" "server3")
unset 'servers[1]'
echo "Remaining elements: ${servers[@]}"
```

Running this script produces:

```
$ ./removing.sh
server1 server3
```

> [!important]
> **Note**
>
> Bash does not reindex arrays after removal. The original indices remain, leaving gaps in the sequence.

To view both values and their indices after deletion:

```
#!/usr/bin/env bash
declare -a servers=("server1" "server2" "server3")
unset 'servers[1]'
echo "Values : ${servers[@]}"
echo "Indices: ${!servers[@]}"
```

```
$ ./removing_indices.sh
Values : server1 server3
Indices: 0 2
```

## Clearing All Elements

If you need to empty an array completely, omit the brackets when using `unset`:

```
#!/usr/bin/env bash
declare -a servers=("server1" "server2" "server3")
unset servers
echo "After clearing: ${servers[@]}"
```

```
$ ./removing_all.sh
```

No output appears because the array has been removed.

> [!important]
> **Warning**
>
> Using `unset array` deletes the entire variable. You must redeclare it before adding new elements.

## Summary of Removal Operations

| Operation          | Command Usage          | Result                                |
| ------------------ | ---------------------- | ------------------------------------- |
| Remove by index    | `unset 'array[index]'` | Deletes the specified element only    |
| Clear entire array | `unset array`          | Removes all elements and the variable |

## Links and References

- [Bash Array Basics](https://www.gnu.org/software/bash/manual/html_node/Arrays.html)
- [Shell Parameter Expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)
- [Bash Scripting Guide](https://tldp.org/LDP/abs/html/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/df27d5e6-23c2-4e4e-9163-4dd73f639282/lesson/9a3bfc72-8ba1-41bc-9011-fe3f2980b4c4)**
>
> Watch video content
