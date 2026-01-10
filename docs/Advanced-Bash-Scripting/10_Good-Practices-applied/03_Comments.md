# Comments - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Good-Practices-applied/Comments)

---

## Table of Contents

- Comments
  - Header Comment Structure
  - Example Header
  - Tips for Effective Comments
  - References
  - Watch Video

---

## Content

Advanced Bash Scripting

Good Practices applied

# Comments

Clear, concise comments make your shell scripts easier to maintain, understand, and extend. Follow these best practices to ensure your scripts are well-documented and self-explanatory.

## Header Comment Structure

A standardized header typically includes:

| Field      | Purpose                                               |
| ---------- | ----------------------------------------------------- |
| Shebang    | Defines the interpreter (`#!/usr/bin/env bash`)       |
| Summary    | One-line description of the script’s functionality    |
| Usage      | How to invoke the script, including any flags/options |
| Exit Codes | List of possible exit codes and their meanings        |
| Author     | Name and contact information                          |

> [!important]
> **Note**
>
> With modern version control systems like [Git](https://git-scm.com/), embedding a change history in comments is usually redundant.

## Example Header

```
#!/usr/bin/env bash
#
# Script usage: Brief summary of the script’s purpose and how to invoke it.
# Exit codes: 0 = Success, 1 = General error, 2 = Missing arguments
# Author: Your Name <your.email@example.com>
```

## Tips for Effective Comments

- Keep lines under 80 characters for readability.
- Write comments in complete sentences where clarity is needed.
- Update comments whenever you modify related code blocks.
- Avoid over-commenting trivial code—focus on intent, not implementation.

## References

- [Git Documentation](https://git-scm.com/doc)
- [Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/48c76c43-0257-44a4-b95d-36a8cceaff66/lesson/ce43002c-6c71-46ef-9896-db036ba84e67)**
>
> Watch video content
