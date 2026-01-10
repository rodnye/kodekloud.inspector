# Context Manipulation with Copilot - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Copilot-Certification/Advanced-Features/Context-Manipulation-with-Copilot)

---

## Table of Contents

- Context Manipulation with Copilot
  - Why Context Matters
  - Defining Context
  - Types of Context
  - Calculated Context
  - Explicit Context
  - Implicit Context
  - Additional Context Sources
  - Specialized Agents
  - Context Referencing in Prompts
  - Terminal & Source Control References
  - Custom Instructions
  - Links and References
  - Watch Video

---

## Content

GitHub Copilot Certification

Advanced Features

# Context Manipulation with Copilot

Context is the key differentiator that determines whether GitHub Copilot offers generic code snippets or project-specific, high-value completions. By mastering context-manipulation techniques, you’ll guide Copilot’s AI to generate accurate, relevant code aligned with your coding standards and project needs.

In this guide, we’ll explore why context matters, define its types, and share practical tips to shape it effectively.

---

## Why Context Matters

Copilot relies on context to transform from a generic generator into a personalized coding assistant. Supplying the right information up front helps you:

- Improve suggestion relevance by guiding Copilot’s understanding
- Minimize back-and-forth clarifications for a smoother workflow
- Boost development efficiency by reducing post-generation edits

---

## Defining Context

Context includes any data provided to the AI model to help it understand your goals:

- Open files, project structure, and selected code in your editor
- Terminal output (error messages, command results)
- Project notes, documentation, or design specs

![The image is an infographic titled "Understanding Context – Definition," illustrating how context is information provided to an AI model, using charts, code, and a robot to represent data forms and their role in guiding understanding and improving output quality.](https://kodekloud.com/kk-media/image/upload/v1752876785/notes-assets/images/GitHub-Copilot-Certification-Context-Manipulation-with-Copilot/understanding-context-infographic-ai.jpg)

---

## Types of Context

Copilot’s suggestions draw from three primary context sources:

| Context Type | Description                                         | Example                                         |
| ------------ | --------------------------------------------------- | ----------------------------------------------- |
| Calculated   | Files and snippets Copilot auto-selects as relevant | Analyzing prompt to pick matching project files |
| Explicit     | Manually supplied via prompts, references, or files | `#selection`, file attachments                  |
| Implicit     | Derived from open/edited files and selections       | Current file buffer and highlighted code        |

![The image illustrates three types of context: Calculated Context, Explicit Context, and Implicit Context, each with a brief description of how they are determined or used.](https://kodekloud.com/kk-media/image/upload/v1752876787/notes-assets/images/GitHub-Copilot-Certification-Context-Manipulation-with-Copilot/context-types-calculated-explicit-implicit.jpg)

---

## Calculated Context

Calculated context minimizes manual work: Copilot analyzes your request and automatically includes relevant code snippets and files. For instance, in an Agentic Workspace scenario, it selects files that match your prompt criteria.

![The image shows a breakdown of code handling file selection in a GUI application, with a flowchart explaining how Copilot analyzes and provides detailed explanations.](https://kodekloud.com/kk-media/image/upload/v1752876789/notes-assets/images/GitHub-Copilot-Certification-Context-Manipulation-with-Copilot/code-file-selection-flowchart.jpg)

Below is a simplified example of a text-processing GUI that Copilot might pull into context:

```
import tkinter as tk
from tkinter import filedialog
from matplotlib.figure import Figure

class WordCountApp:
    def __init__(self, root):
        self.file_button = tk.Button(root, text="Select File", command=self.select_file)
        self.file_button.pack(pady=5)

        tk.Label(root, text="Number of top words:").pack()
        self.n_words = tk.Entry(root)
        self.n_words.insert(0, "20")
        self.n_words.pack()

        self.plot_button = tk.Button(root, text="Plot", command=self.plot)
        self.plot_button.pack(pady=5)

        self.plot_frame = tk.Frame(root)
        self.plot_frame.pack(fill=tk.BOTH, expand=True)
        self.filename = None

    def select_file(self):
        self.filename = filedialog.askopenfilename(
            filetypes=[("Text Files", "*.txt"), ("All Files", "*.*")]
        )

    def plot(self):
        if not self.filename:
            return
        for widget in self.plot_frame.winfo_children():
            widget.destroy()
        words = self.read_and_clean_text(self.filename)
        word_count = self.count_words(words)
        top_n = int(self.n_words.get())
        sorted_counts = self.sort_by_count(word_count, top_n)
        self.plot_word_count(sorted_counts)

    def read_and_clean_text(self, path):
        # Read file and return cleaned list of words
        ...

    def count_words(self, words):
        counts = {}
        for w in words:
            counts[w] = counts.get(w, 0) + 1
        return counts

    def sort_by_count(self, counts, n):
        return dict(sorted(counts.items(), key=lambda x: x[1], reverse=True)[:n])

    def plot_word_count(self, counts):
        fig = Figure(figsize=(10, 6))
        ax = fig.add_subplot(111)
        ax.bar(counts.keys(), counts.values())
        # Embed fig in self.plot_frame
```

---

## Explicit Context

Explicit context gives you full control over what Copilot considers. You can specify it by:

- Writing clear, descriptive prompts
- Using reference tags like `#selection`, `#editor`, or `#file:utils.py`
- Attaching files or data for Copilot to process

> [!important]
> **Note**
>
> Combine natural language with context references for precise guidance. For example:
> “Refactor `#selection` to improve error handling in `#file:data_loader.py`.”

---

## Implicit Context

Implicit context is automatically inferred from your workspace activity:

- Captures the open file and any selected text
- Can be disabled in settings for more explicit control

> [!important]
> **Warning**
>
> In very large codebases, implicit context may include irrelevant files. Disable it in settings to prevent suggestion confusion.

![The image describes "Implicit Context" with three points: automatically added by Copilot, includes current file and selection, and can be disabled in configurations.](https://kodekloud.com/kk-media/image/upload/v1752876790/notes-assets/images/GitHub-Copilot-Certification-Context-Manipulation-with-Copilot/implicit-context-copilot-description.jpg)

---

## Additional Context Sources

Copilot can reference multiple environment inputs:

- Code files & project structure
- Current editor selection
- Terminal output (errors, command results)
- Source control diffs and commits

These sources give Copilot a full picture of your project when generating suggestions.

---

## Specialized Agents

Invoke focused assistants with the `@` symbol to tap domain-specific knowledge:

| Agent      | Purpose                                            |
| ---------- | -------------------------------------------------- |
| @workspace | Understands project structure & code relationships |
| @terminal  | Runs shell commands and interprets output          |
| @vscode    | Provides VS Code feature guidance                  |
| @github    | Handles GitHub workflows and metadata              |
| @azure     | (Preview) Assists with Azure service deployments   |

> [!important]
> **Note**
>
> Mention `@workspace` or `@terminal` in your query to route questions to the right Copilot agent.

![The image lists chat participants (agents) with their roles: @workspace, @terminal, @vscode, @github, and @azure, each specializing in different technical areas.](https://kodekloud.com/kk-media/image/upload/v1752876791/notes-assets/images/GitHub-Copilot-Certification-Context-Manipulation-with-Copilot/chat-participants-roles-agents.jpg)

---

## Context Referencing in Prompts

Use these tags to focus Copilot on specific parts of your code:

- `#file:filename.py` — Target a particular file
- `#symbol:MyClass` — Reference a class, function, or variable
- `#selection` — Include only the selected code
- `#editor` — Pass the full open file contents

These references combined with clear instructions let you zero-in on the exact code you’re working on.

![The image is a presentation slide titled "Context Referencing – Selection References," showing key improvements for code visualization and how to help Copilot focus on specific code portions using #selection and #editor tags.](https://kodekloud.com/kk-media/image/upload/v1752876792/notes-assets/images/GitHub-Copilot-Certification-Context-Manipulation-with-Copilot/context-referencing-code-visualization.jpg)

---

## Terminal & Source Control References

For debugging or reviewing recent changes, include:

- `#codebase` — Entire workspace context
- `#changes` — Git diffs and staged modifications
- `#terminalLastCommand` — Your last executed shell command
- `#terminalSelection` — Selected terminal output

![The image is a diagram titled "Context Referencing – Terminal and Source Control," showing four elements: #codebase, #changes, #terminalLastCommand, and #terminalSelection, each with a brief description of its function.](https://kodekloud.com/kk-media/image/upload/v1752876793/notes-assets/images/GitHub-Copilot-Certification-Context-Manipulation-with-Copilot/context-referencing-terminal-source-control-diagram.jpg)

---

## Custom Instructions

For ultimate control, add a `github-copilot-instructions.md` file in your repo root. Copilot will load these guidelines for every session:

```
# Project Context
This is a Word Count project that processes text files to count words.

## Project Structure
data/          # Contains input text files for processing
README.md      # Project documentation

## Folder Details
### Root Folder (/)
- Main project files and configuration
- Primary workspace for source code
- Location for build and project configs
```

You can create multiple instruction files—for docs, testing, or deployment—while keeping context concise and focused.

---

## Links and References

- [GitHub Copilot Documentation](https://docs.github.com/copilot)
- [Copilot Context Management](https://docs.github.com/copilot/context)
- [VS Code Extensions](https://marketplace.visualstudio.com/vscode)
- [Python Tkinter Reference](https://docs.python.org/3/library/tkinter.html)

By strategically shaping and managing context, you’ll unlock Copilot’s full potential—generating accurate, relevant code suggestions that enhance your productivity every day.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-copilot-certification/module/694a659c-4ffa-4c3d-a3c3-d003725eb574/lesson/31b83cc6-70fe-4474-b1b5-a3ef2d021437)**
>
> Watch video content
