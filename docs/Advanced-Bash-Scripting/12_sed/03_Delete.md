# Delete - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/sed/Delete)

---

## Table of Contents

- Delete
  - Table of Contents
  - Overview of the d Command
  - Non-Destructive Deletion
  - Deleting a Specific Line
  - Deleting a Range of Lines
  - In-Place Deletion with -i
  - Quick Reference
  - Links & References
  - Watch Video

---

## Content

Advanced Bash Scripting

sed

# Delete

Stream Editor (`sed`) is a powerful command-line utility for transforming text in a pipeline. In this guide, we’ll explore how to delete lines from input files using the `d` command, covering non-destructive edits, specific-line removals, range deletions, and in-place updates.

## Table of Contents

1.  [Overview of the `d` Command](#overview-of-the-d-command)
2.  [Non-Destructive Deletion](#non-destructive-deletion)
3.  [Deleting a Specific Line](#deleting-a-specific-line)
4.  [Deleting a Range of Lines](#deleting-a-range-of-lines)
5.  [In-Place Deletion with `-i`](#in-place-deletion-with--i)
6.  [Quick Reference](#quick-reference)
7.  [Links & References](#links--references)

---

## Overview of the `d` Command

The simplest way to remove lines in `sed` is with the delete script `d`:

```
sed 'd' employees.txt
```

This command reads every line and deletes it, producing no output.

Under the hood, `sed` follows this syntax:

```
sed [OPTIONS] SCRIPT [INPUT-FILE...]
```

- **SCRIPT**: A quoted set of editing commands (here, `'d'`).
- **INPUT-FILE**: One or more files to process (defaults to standard input).

> [!important]
> **Note**
>
> Wrap your script in single quotes (e.g., `'d'`) so the shell interprets it literally.

---

## Non-Destructive Deletion

By default, `sed` writes the transformed text to **standard output** and leaves the original file unchanged. To delete line 2 from `employees.txt`:

```
sed '2d' employees.txt
```

Output:

```
1|Kriti|Shreshtha|Finance|Financial Analyst|kriti.shreshtha@company.com|60000
3|Debbie|Miller|IT|Software Developer|debbie.miller@company.com|80000
4|Enrique|Rivera|Marketing|Marketing Specialist|enrique.rivera@company.com|65000
5|Feng|Lin|Sales|Sales Manager|feng.lin@company.com|90000
6|Andy|Luscomb|IT|IT Manager|andy.luscomb@company.com|95000
7|Mark|Crocker|HR|HR Manager|mark.crocker@company.com|85000
8|Jing|Ma|Engineering|Engineering Manager|jing.ma@company.com|100000
```

Your source file remains intact:

```
cat employees.txt
```

---

## Deleting a Specific Line

To drop only the sixth line:

```
sed '6d' employees.txt
```

This command filters out line 6 from the output stream, leaving all others.

---

## Deleting a Range of Lines

Use a comma-separated address pair to remove a block of lines:

```
sed '3,5d' employees.txt
```

This deletes lines 3 through 5.

> [!important]
> **Warning**
>
> Address ranges must ascend (e.g., `3,5d`). Specifying `5,3d` is invalid and will have no effect.

---

## In-Place Deletion with `-i`

To modify the file directly, add the `-i` (in-place) option:

```
# Inspect original
cat employees.txt


# Delete lines 2 through 7 and save changes
sed -i '2,7d' employees.txt


# Verify result
cat employees.txt
```

Resulting file:

```
1|Kriti|Shreshtha|Finance|Financial Analyst|kriti.shreshtha@company.com|60000
8|Jing|Ma|Engineering|Engineering Manager|jing.ma@company.com|100000
```

> [!important]
> **Warning**
>
> On macOS, `sed -i` requires a zero-length extension: `sed -i '' '2,7d' file.txt`. Always back up critical data before in-place edits.

---

## Quick Reference

| Command Syntax  | Effect            | Example                       |
| --------------- | ----------------- | ----------------------------- |
| `sed 'd'`       | Delete all lines  | `sed 'd' employees.txt`       |
| `sed 'Nd'`      | Delete Nth line   | `sed '6d' employees.txt`      |
| `sed 'M,Nd'`    | Delete line range | `sed '3,5d' employees.txt`    |
| `sed -i 'M,Nd'` | In-place deletion | `sed -i '2,7d' employees.txt` |

---

## Links & References

- [GNU `sed` Manual](https://www.gnu.org/software/sed/manual/sed.html)
- [Sed One-Liners Explained](https://www.pement.org/sed/)
- [Shell Quoting Best Practices](https://www.gnu.org/software/bash/manual/html_node/Quoting.html)

By mastering these delete operations, you can efficiently cleanse, filter, or reorganize textual data in scripts and pipelines. Happy editing!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/2d48deee-c9f8-4d65-b92f-f164c06b545c/lesson/0dadaabc-b371-4fc5-ace4-1a1b4dca9f42)**
>
> Watch video content
