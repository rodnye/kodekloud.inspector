# Demo Auto Imports and Customizing Settings - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cursor-AI/Mastering-Autocompletion/Demo-Auto-Imports-and-Customizing-Settings)

---

## Table of Contents

- Demo Auto Imports and Customizing Settings
  - Table of Contents
  - Automatic Imports
  - Quick Fix Menu
  - Python Auto Import (Beta)
  - Customizing Settings in Cursor
  - AI Models and API Keys
  - Beta Features
  - Next Steps
  - Links and References
  - Watch Video
    - Importing VS Code Settings
    - Project-Specific Cursor Rules
    - Feature Toggles

---

## Content

Cursor AI

Mastering Autocompletion

# Demo Auto Imports and Customizing Settings

In this lesson we explore Cursor IDE’s AI-powered autocompletion, Python auto-imports, and customizable settings. We’ll demonstrate how to streamline your Flask development workflow and tailor Cursor to your preferences.

## Table of Contents

- Automatic Imports
- Quick Fix Menu
- Python Auto Import (Beta)
- Global & Project Settings
  - Importing VS Code Configuration
  - Defining .cursor-rules
  - Feature Toggles
- AI Models & API Keys
- Enabling Beta Features
- Next Steps

## Automatic Imports

Cursor leverages machine learning to detect missing Python modules and insert the corresponding imports. Consider this Flask example:

```
import sqlite3
import os
from flask import Flask, render_template, request, redirect, url_for, flash, session, g
from datetime import datetime
import hashlib
import logging


# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'dev'
app.config['DATABASE'] = os.path.join(app.instance_path, 'task_manager.sqlite')


# Ensure instance folder exists and write to CSV
try:
    os.makedirs(app.instance_path)
    with open('file.csv', 'w') as f:
        f.write('Hello, World!')
    with open('file.csv', 'r') as f:
        csvreader = csv.reader(f)
        for row in csvreader:
            print(row)
except OSError:
    pass
```

Because `csv` is not imported, `csv.reader` will trigger a quick fix. Press `⌘.` (macOS) or `Ctrl+.` (Windows/Linux), choose **Import 'csv'**, and Cursor auto-inserts:

```
import csv
import sqlite3
import os
# ...other imports
```

Your application runs without `ModuleNotFoundError`.

> [!important]
> **Tip**
>
> Use the auto-import feature to speed up development and avoid manual import typos.

## Quick Fix Menu

Beyond imports, the Quick Fix menu helps with:

- Renaming symbols
- Searching for import candidates
- Suppressing linter warnings

Navigate to suggested actions with `Ctrl+.` / `⌘.`.

## Python Auto Import (Beta)

The Python auto-import (Beta) proactively adds necessary imports as you type. Example:

```
def read_csv(file_path):
    with open(file_path, 'r') as f:
        csvreader = csv.reader(f)
        for row in csvreader:
            print(row)


def write_csv(file_path, data):
    with open(file_path, 'w') as f:
        csvwriter = csv.writer(f)
        csvwriter.writerows(data)
```

Press **Tab** inside the function, save the file, and watch `import csv` appear at the top.

## Customizing Settings in Cursor

Access global settings with `⌘⇧J` (macOS) or `Ctrl+Shift+J` (Windows/Linux). Here you can adjust AI rules, feature toggles, editor themes, and more.

### Importing VS Code Settings

Mirror your [VS Code](https://code.visualstudio.com) preferences by importing your settings and extensions into Cursor.

![The image shows a dark-themed code editor interface with a file explorer on the left and a settings panel on the right, where a confirmation dialog is open for importing VS Code settings.](https://kodekloud.com/kk-media/image/upload/v1752872746/notes-assets/images/Cursor-AI-Demo-Auto-Imports-and-Customizing-Settings/dark-code-editor-vs-code-settings.jpg)

After import, extensions like [TabNine](https://www.tabnine.com) and your preferred theme sync automatically.

```
[2025-03-19 21:44:41.900] Extension version: 0.88.5
[2025-03-19 21:44:41.901] LLM bundle: none
[2025-03-19 21:44:41.901] WSL extension is supported only in Microsoft versions of VS Code
```

### Project-Specific Cursor Rules

Define a `.cursor-rules` file at your project root to override global AI instructions. These per-project settings ensure consistent code style.

![The image shows a code editor interface with a file directory on the left and a "Cursor Settings" panel on the right, displaying rules for AI and project settings. The terminal at the bottom shows a command prompt.](https://kodekloud.com/kk-media/image/upload/v1752872747/notes-assets/images/Cursor-AI-Demo-Auto-Imports-and-Customizing-Settings/code-editor-cursor-settings-terminal.jpg)

Example `.cursor-rules`:

```
# .cursor-rules
always generate Python code that is simple and PEP 8 compliant
```

### Feature Toggles

Enable or disable Cursor IDE features according to your workflow:

| Feature                          | Description                            |
| -------------------------------- | -------------------------------------- |
| Cursor predictions               | Real-time code suggestions             |
| Auto import for Python (Beta)    | Automatic import insertion as you code |
| Partial accepts                  | Accept suggestions in segments         |
| Show whitespace-only suggestions | Display whitespace completions         |

![The image shows a code editor interface with a file directory on the left and "Cursor Settings" options in the center. The terminal is visible at the bottom, and a chat panel is on the right.](https://kodekloud.com/kk-media/image/upload/v1752872749/notes-assets/images/Cursor-AI-Demo-Auto-Imports-and-Customizing-Settings/code-editor-cursor-settings-interface.jpg)

![The image shows a code editor interface with a "Cursor Settings" menu open, displaying options for features and a disclaimer about "Yolo mode." A file directory is visible on the left side.](https://kodekloud.com/kk-media/image/upload/v1752872750/notes-assets/images/Cursor-AI-Demo-Auto-Imports-and-Customizing-Settings/code-editor-cursor-settings-yolo.jpg)

> [!important]
> **Warning**
>
> Keep your API keys secure. Do not commit them to public repositories.

## AI Models and API Keys

Under **Models**, select your preferred AI backend. To unlock premium capabilities, add API keys for:

- OpenAI
- Anthropic
- Google Cloud AI
- Azure AI

![The image shows a code editor interface with a file directory on the left and a "Cursor Settings" panel on the right, displaying a list of model names. The terminal is visible at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752872751/notes-assets/images/Cursor-AI-Demo-Auto-Imports-and-Customizing-Settings/code-editor-cursor-settings-terminal-2.jpg)

![The image shows a code editor interface with a file directory on the left and a "Cursor Settings" panel on the right, displaying options for entering various API keys.](https://kodekloud.com/kk-media/image/upload/v1752872752/notes-assets/images/Cursor-AI-Demo-Auto-Imports-and-Customizing-Settings/code-editor-cursor-settings-api-keys.jpg)

## Beta Features

Join the cutting edge by toggling beta features for early access to new AI capabilities.

![The image shows a code editor interface with a file directory on the left and "Cursor Settings" options in the center. The terminal is visible at the bottom, displaying a command prompt.](https://kodekloud.com/kk-media/image/upload/v1752872754/notes-assets/images/Cursor-AI-Demo-Auto-Imports-and-Customizing-Settings/code-editor-cursor-settings-terminal-3.jpg)

## Next Steps

Now that you’ve configured Cursor’s auto-imports and personalized your IDE, proceed to explore advanced prompt engineering and delve deeper into Cursor’s AI-driven development workflow.

## Links and References

- [Cursor IDE Documentation](https://cursor.so/docs/)
- [VS Code Official Site](https://code.visualstudio.com)
- [TabNine AI Autocomplete](https://www.tabnine.com)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cursor-ai/module/e11e1c1e-9b6b-4c53-b14a-24babbd114a5/lesson/77c1697f-a322-4c85-a18b-971df1a08c16)**
>
> Watch video content
