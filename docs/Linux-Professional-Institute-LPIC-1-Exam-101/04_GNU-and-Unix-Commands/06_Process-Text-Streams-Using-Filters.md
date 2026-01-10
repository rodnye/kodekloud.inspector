# Process Text Streams Using Filters - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Linux-Professional-Institute-LPIC-1-Exam-101/GNU-and-Unix-Commands/Process-Text-Streams-Using-Filters)

---

## Table of Contents

- Process Text Streams Using Filters
  - Viewing Files with cat, tac, head, and tail
  - Automating In-File Replacements with sed
  - Extracting Fields with cut
  - Listing Unique Entries with sort and uniq
  - Comparing Files with diff
  - Quick Reference: Linux Text Filters
  - Links and References
  - Watch Video
    - Displaying Entire and Reversed Files
    - Inspecting the Start or End of Large Logs

---

## Content

Linux Professional Institute LPIC-1 Exam 101

GNU and Unix Commands

# Process Text Streams Using Filters

In Linux, nearly every interaction—SSH sessions, command outputs, system logs, and configuration files—is plain text. Mastering text filters allows you to view, transform, and compare these streams efficiently at the command line.

## Viewing Files with `cat`, `tac`, `head`, and `tail`

### Displaying Entire and Reversed Files

Use `cat` for quick, on-screen dumps of small files:

```
cat /home/users.txt
# Output:
# user1
# user2
# user3
# user4
# user5
# user6
```

To flip the order (last line first), pipe through `tac`:

```
tac /home/users.txt
# Output:
# user6
# user5
# user4
# user3
# user2
# user1
```

### Inspecting the Start or End of Large Logs

Log files can grow huge. Quickly grab the first or last N lines:

- **Last 10 lines (default):**  
  `tail /var/log/dnf.log`
- **Last 20 lines:**  
  `tail -n 20 /var/log/dnf.log`
- **First 20 lines:**  
  `head -n 20 /var/log/dnf.log`

These let you preview recent errors or initial startup messages without opening the full file.

## Automating In-File Replacements with `sed`

The stream editor `sed` excels at find-and-replace tasks:

1.  **Preview changes** (no file modified):

    ```
    sed 's/canda/canada/g' userinfo.txt
    ```

2.  **Apply in-place** (`-i`) substitutions:

    ```
    sed -i 's/canda/canada/g' userinfo.txt
    cat userinfo.txt
    ```

- `s/pattern/replacement/g` replaces all occurrences on each line.
- The `-i` flag edits the file directly.

> [!important]
> **Warning**
>
> Always preview your `sed` commands without `-i` first. To keep a backup, use `-i.bak` (e.g., `sed -i.bak 's/old/new/g' file`).

## Extracting Fields with `cut`

When working with delimited data (spaces, commas, or tabs), `cut` slices out columns:

![The image shows a terminal interface with a command prompt on the left and a text file named "userinfo.txt" on the right, containing a list of names, cities, countries, and numbers.](https://kodekloud.com/kk-media/image/upload/v1752881405/notes-assets/images/Linux-Professional-Institute-LPIC-1-Exam-101-Process-Text-Streams-Using-Filters/terminal-command-prompt-userinfo-file.jpg)

- **By space delimiter:** extract the first field (name)

  ```
  cut -d ' ' -f 1 userinfo.txt
  ```

- **By comma delimiter:** extract the third field (country) and save

  ```
  cut -d ',' -f 3 userinfo.txt > countries.txt
  ```

## Listing Unique Entries with `sort` and `uniq`

The `uniq` filter only removes adjacent duplicates—sort first to catch all duplicates:

```
sort countries.txt | uniq
```

> [!important]
> **Note**
>
> If your file isn’t sorted, `uniq` may leave non-adjacent duplicates. Always sort before `uniq` for a full cleanse.

## Comparing Files with `diff`

Spot differences between configuration files using:

- **Basic side-by-side:**

  ```
  diff file1 file2
  ```

- **Unified context (`-c`):**

  ```
  diff -c file1 file2
  ```

- **Two-column view (`-y`):**

  ```
  diff -y file1 file2
  ```

This helps pinpoint changes before editing or deploying configurations.

## Quick Reference: Linux Text Filters

| Command | Purpose                                  | Basic Usage                     |
| ------- | ---------------------------------------- | ------------------------------- | ----- |
| `cat`   | Dump entire file                         | `cat file.txt`                  |
| `tac`   | Reverse file order                       | `tac file.txt`                  |
| `head`  | Show first N lines                       | `head -n 20 file.log`           |
| `tail`  | Show last N lines                        | `tail -n 20 file.log`           |
| `sed`   | Stream editor (find & replace)           | `sed -i 's/old/new/g' file.txt` |
| `cut`   | Extract columns from delimited streams   | `cut -d',' -f3 file.csv`        |
| `sort`  | Sort lines alphabetically or numerically | `sort file.txt`                 |
| `uniq`  | Remove adjacent duplicates               | `sort file.txt \\               | uniq` |
| `diff`  | Compare files line by line               | `diff -y file1 file2`           |

## Links and References

- [GNU Coreutils Manual](https://www.gnu.org/software/coreutils/manual/)
- [sed – An Introduction and Tutorial](https://www.grymoire.com/Unix/Sed.html)
- [Linux `diff` Tutorial](https://www.gnu.org/software/diffutils/manual/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/linux-professional-institute-lpic-1-exam-101/module/2490f961-886c-4531-be8c-915cccff60a9/lesson/cfb18eb7-37ff-4763-ad32-3fd55c995d8b)**
>
> Watch video content
