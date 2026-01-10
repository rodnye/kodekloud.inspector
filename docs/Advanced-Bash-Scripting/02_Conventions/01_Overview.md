# Overview - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Advanced-Bash-Scripting/Conventions/Overview)

---

## Table of Contents

- Overview
  - What Are Coding Conventions?
  - Why Consistent Style Matters
  - Shell Script Conventions: Naming & Style
  - Community Standards in Other Languages
  - Scope & Getting Started
  - Further Reading
  - Watch Video

---

## Content

Advanced Bash Scripting

Conventions

# Overview

Welcome to this comprehensive guide on shell scripting conventions. Consistent coding style makes scripts more readable, maintainable, and approachable—whether you’re working solo or as part of a team.

| Section                              | Description                                                   |
| ------------------------------------ | ------------------------------------------------------------- |
| What Are Coding Conventions?         | Definitions and real-world analogies                          |
| Benefits of a Unified Style          | How consistency boosts readability and reduces bugs           |
| Recommended Shell Script Conventions | Naming patterns, formatting rules, and directory organization |

## What Are Coding Conventions?

Coding conventions are agreed-upon practices that determine how code is structured and named. Much like social norms guide behavior in gatherings, technical conventions help developers understand each other’s work at a glance.

## Why Consistent Style Matters

In any engineering discipline—from aircraft cockpit layouts to network topologies—standardized designs enhance safety and efficiency. In software, conventions:

- Reduce cognitive load when switching between projects
- Simplify onboarding for new contributors
- Prevent subtle bugs caused by inconsistent formatting

> [!important]
> **Note**
>
> Conventions focus on style, not interpreter rules. Violating them won’t usually break your code, but following them makes future maintenance far easier.

![The image is a circular diagram labeled "Easy to Understand," divided into three sections: "Readable," "Maintainable," and "Easier," each in different colors.](https://kodekloud.com/kk-media/image/upload/v1752868554/notes-assets/images/Advanced-Bash-Scripting-Overview/easy-to-understand-diagram.jpg)

## Shell Script Conventions: Naming & Style

Below are high-level recommendations for shell scripts. We’ll dive into each in detail later.

- Use lowercase, snake_case for variable names (e.g., `user_home`)
- Prefix boolean flags with `is_` or `has_` (e.g., `is_enabled`)
- Name functions with verbs and snake_case (e.g., `backup_database`)
- Indent with two spaces for readability
- Organize scripts into `bin/`, `lib/`, and `conf/` directories

## Community Standards in Other Languages

Languages like Java and Python have de facto style guides that virtually every developer follows—think PEP 8 or Google’s Java Style Guide. In those ecosystems, naming functions, classes, and methods requires little debate.

![The image shows an overview checklist with items like "Naming Functions," "Variables," "Methods," and "Classes," each marked with a checkmark. It has a dark background with a small star icon on the left.](https://kodekloud.com/kk-media/image/upload/v1752868556/notes-assets/images/Advanced-Bash-Scripting-Overview/overview-checklist-functions-variables.jpg)

Shell scripting hasn’t settled on one universal standard, so teams often craft their own. Whether you’re a novice or a seasoned scripter, adopting these guidelines will sharpen your skills and improve collaboration.

## Scope & Getting Started

This guide targets style—naming conventions, file layouts, and formatting—rather than performance optimizations or interpreter quirks. For example, the following assignments behave differently at runtime:

```
file="somefile.txt"  # ✅ Valid: no spaces around =
file= "somefile.txt" # ❌ Runtime error: unexpected token
```

> [!important]
> **Warning**
>
> Shell interpreters enforce certain rules (like no spaces around `=` in assignments). Always validate your scripts with [ShellCheck](https://www.shellcheck.net/) before deployment.

If you already follow a style guide, feel free to refactor the examples here. If you’re new to conventions, adopt these recommendations to jump-start your productivity.

## Further Reading

- [ShellCheck – A static analysis tool for shell scripts](https://www.shellcheck.net/)
- [Bash Guide for Beginners](https://tldp.org/LDP/Bash-Beginners-Guide/html/)
- [POSIX Shell and Utilities](https://pubs.opengroup.org/onlinepubs/9699919799/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/advanced-bash-scripting/module/06219b3e-dc63-404c-a9df-3ea035628308/lesson/06ce12d2-8a88-4ce3-b13d-08f3116b2f41)**
>
> Watch video content
