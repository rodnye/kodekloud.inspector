# Demo Common Terminal Commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cursor-AI/Terminal-Productivity/Demo-Common-Terminal-Commands)

---

## Table of Contents

- Demo Common Terminal Commands
  - Activating Cursor AI in Your Shell
  - 1. Creating a Directory
  - 2. Creating Multiple Files
  - 3. Moving Files into a Subdirectory
  - 4. Displaying Date and Time
  - 5. Viewing System Resource Usage
  - 6. Updating All Python Packages
  - 7. Showing Recent Git Commits
  - Command Reference Table
  - Links and References
  - Watch Video
    - English Prompt
    - Generated Command
    - Execution
    - English Prompt
    - Generated Command
    - Execution
    - English Prompt
    - Generated Commands
    - Execution
    - English Prompt
    - Generated Command
    - Execution
    - English Prompt
    - Updated Commands
    - English Prompt
    - Generated Command

---

## Content

Cursor AI

Terminal Productivity

# Demo Common Terminal Commands

In this tutorial, you’ll learn how to generate and execute common terminal commands using Cursor AI. Whether you’re a beginner or an experienced user, Cursor AI lets you describe tasks in plain English and receive the correct CLI syntax for macOS, Linux, and Windows.

## Activating Cursor AI in Your Shell

Press **Command+K** (macOS) or **Ctrl+K** (Windows/Linux) to open the Cursor AI prompt. Then type your instruction in natural language. Cursor AI will suggest the corresponding shell command.

---

## 1\. Creating a Directory

### English Prompt

```
create a new directory called project files
```

### Generated Command

```
mkdir "project files"
```

### Execution

```
venvjeremy@MACSTUDIO KodeKloudTaskManager % mkdir "project files"
```

> [!important]
> **Note**
>
> Always wrap directory names containing spaces in quotes (`" "`).

---

## 2\. Creating Multiple Files

### English Prompt

```
create five blank text files named test1.txt through test5.txt in project files
```

### Generated Command

```
touch "project files/test1.txt" "project files/test2.txt" "project files/test3.txt" "project files/test4.txt" "project files/test5.txt"
```

### Execution

```
venvjeremy@MACSTUDIO KodeKloudTaskManager % touch "project files/test1.txt" "project files/test2.txt" "project files/test3.txt" "project files/test4.txt" "project files/test5.txt"
```

---

## 3\. Moving Files into a Subdirectory

### English Prompt

```
create a directory named test and move all .txt files from project files into test
```

### Generated Commands

```
mkdir test
mv "project files/"*.txt test/
```

### Execution

```
venvjeremy@MACSTUDIO KodeKloudTaskManager % mkdir test
venvjeremy@MACSTUDIO KodeKloudTaskManager % mv "project files/"*.txt test/
```

---

## 4\. Displaying Date and Time

To display the current system date and time:

```
venvjeremy@MACSTUDIO KodeKloudTaskManager % date
```

---

## 5\. Viewing System Resource Usage

### English Prompt

```
display system resource usage
```

### Generated Command

```
top
```

### Execution

```
venvjeremy@MACSTUDIO KodeKloudTaskManager % top
```

Sample output:

```
Processes: 809 total, 4 running, 805 sleeping, 5693 threads
Load Avg: 4.08, 3.48, 3.20  CPU usage: 5.48% user, 6.29% sys, 88.22% idle
MemRegions: 764871 total, 226M resident, 1282M private, 7780M shared
PhysMem: 67G used (3369M wired), 60G unused
```

> Press **Ctrl+C** to exit `top`.

---

## 6\. Updating All Python Packages

### English Prompt

```
update all python packages
```

Cursor AI may suggest:

```
pip install --upgrade pip && \
pip list --outdated --format=freeze | \
grep -v '^\-e' | cut -d= -f1 | xargs -n1 pip install -U
```

If you encounter:

```
ERROR: List format 'freeze' cannot be used with the --outdated option.
```

Refine your prompt:

```
update all python packages without using freeze format
```

### Updated Commands

```
pip install --upgrade pip
pip list --outdated --format=columns | \
tail -n +3 | awk '{print $1}' | xargs -n1 pip install -U
```

> [!important]
> **Warning**
>
> Using `xargs` can install many packages at once—ensure you trust the source before running.

---

## 7\. Showing Recent Git Commits

### English Prompt

```
show the last five git commits
```

### Generated Command

```
git log -5 --oneline
```

In a Git repository, this will list the five most recent commits. Outside a repo, you’ll see:

```
fatal: not a git repository (or any of the parent directories): .git
```

---

## Command Reference Table

| Command   | Description                               | Example                                                         |
| --------- | ----------------------------------------- | --------------------------------------------------------------- | ------------------------- |
| `mkdir`   | Create a new directory                    | `mkdir "project files"`                                         |
| `touch`   | Create empty files                        | `touch "project files/test1.txt" ... "project files/test5.txt"` |
| `mv`      | Move or rename files                      | `mv "project files/"*.txt test/`                                |
| `date`    | Display current date and time             | `date`                                                          |
| `top`     | Show real-time system resource statistics | `top`                                                           |
| `pip`     | Install and upgrade Python packages       | `pip install --upgrade pip && pip list --outdated \\            | xargs -n1 pip install -U` |
| `git log` | View recent Git commits                   | `git log -5 --oneline`                                          |

---

## Links and References

- [Cursor AI Documentation](https://cursor.com/docs)
- [GNU Coreutils (mkdir, mv, touch)](https://www.gnu.org/software/coreutils/)
- [pip User Guide](https://pip.pypa.io/en/stable/user_guide/)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)

With Cursor AI, managing your shell tasks is faster and more intuitive—just ask in plain English!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cursor-ai/module/90a13f7e-74a3-4207-8c34-c81c14757507/lesson/b2fc8d40-f707-4b20-9cdb-a188a89d9ef7)**
>
> Watch video content
