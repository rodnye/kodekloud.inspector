# Demo Setup and Configuring Copilot - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Copilot-Certification/Introduction/Demo-Setup-and-Configuring-Copilot)

---

## Table of Contents

- Demo Setup and Configuring Copilot
  - 1. Install the GitHub Copilot Extension
  - 2. Try a Simple Flask Example
  - 3. Configure Copilot Settings
  - 4. Explore GitHub Copilot Chat
  - 5. Use Context with Copilot Chat
  - 6. Add Custom Instructions
  - Links and References
  - Watch Video
    - Chat Configuration

---

## Content

GitHub Copilot Certification

Introduction

# Demo Setup and Configuring Copilot

In this guide, you’ll learn how to integrate GitHub Copilot into Visual Studio Code, customize its behavior, and leverage Copilot Chat for conversational code assistance. We’ll cover:

1.  Installing the Copilot extension
2.  Trying a simple Flask example
3.  Configuring Copilot settings
4.  Exploring Copilot Chat
5.  Using contextual prompts
6.  Adding workspace-specific instructions

---

## 1\. Install the GitHub Copilot Extension

1.  Launch [Visual Studio Code](https://code.visualstudio.com/) and open the **Extensions** view (`Ctrl+Shift+X`).
2.  Search for **GitHub Copilot**.
3.  Click **Install**.
4.  Authenticate with your GitHub account when prompted.

> [!important]
> **Warning**
>
> You must have a valid Copilot subscription or trial to authenticate. Visit [GitHub Copilot Pricing](https://github.com/features/copilot#pricing) for more details.

![The image shows the GitHub Copilot extension page in Visual Studio Code, highlighting its features and installation details. The interface includes a sidebar with other extensions and a terminal at the bottom.](https://kodekloud.com/kk-media/image/upload/v1752876847/notes-assets/images/GitHub-Copilot-Certification-Demo-Setup-and-Configuring-Copilot/github-copilot-vscode-extension.jpg)

---

## 2\. Try a Simple Flask Example

After installation, Copilot will suggest code completions inline. Here’s a minimal Flask app with an in-memory database and a POST endpoint:

```
from flask import Flask, request, jsonify
from models import Item


app = Flask(__name__)
items_db = []
current_id = 1


@app.route('/items', methods=['POST'])
def create_item():
    global current_id
    data = request.get_json()
    if not data or 'name' not in data:
        return jsonify({'error': 'Name is required'}), 400


    new_item = Item(
        id=current_id,
        name=data['name'],
        description=data.get('description', '')
    )
    items_db.append(new_item)
    current_id += 1


    return jsonify(new_item.to_dict()), 201
```

Place your cursor inside the function and start typing to see Copilot’s suggestions.

> [!important]
> **Note**
>
> Ensure you have Flask installed:
>
> ```
> pip install flask
> ```

---

## 3\. Configure Copilot Settings

VS Code lets you enable or disable Copilot features globally or per language. Open **Settings** (`Ctrl+,`) and search for “Copilot.” Key options include:

| Setting                             | Description                                 | Default     |
| ----------------------------------- | ------------------------------------------- | ----------- |
| Inline Completions                  | Show suggestions as you type                | Enabled     |
| Model Selection                     | Select a specific Copilot model             | `default`   |
| Language-Specific Activation        | Toggle Copilot for individual languages     | All enabled |
| Automatic Test-Failure Fixes (Chat) | Auto-correct failing tests via Copilot Chat | Disabled    |

You can also edit `settings.json` directly:

```
{
  "github.copilot.enable": true,
  "github.copilot.inlineSuggest.enable": true,
  "github.copilot.model": "gpt-4",
  "github.copilot.languages": {
    "markdown": false
  }
}
```

![The image shows a Visual Studio Code interface with the GitHub Copilot extension settings open, displaying options for enabling auto completions and configuring language-specific settings. The terminal at the bottom shows a command prompt.](https://kodekloud.com/kk-media/image/upload/v1752876847/notes-assets/images/GitHub-Copilot-Certification-Demo-Setup-and-Configuring-Copilot/vscode-github-copilot-settings-interface.jpg)

---

## 4\. Explore GitHub Copilot Chat

Copilot Chat provides an interactive panel for code explanations, refactoring, and test generation.

- Click the **Copilot Chat** icon in the sidebar or status bar.
- Ask questions like “Explain this function” or “Generate unit tests.”

![The image shows a settings interface for GitHub Copilot, displaying various options and features related to code actions, renaming suggestions, and code generation.](https://kodekloud.com/kk-media/image/upload/v1752876848/notes-assets/images/GitHub-Copilot-Certification-Demo-Setup-and-Configuring-Copilot/github-copilot-settings-interface.jpg)

### Chat Configuration

Within the **Copilot Chat** settings, you can:

- Enable automatic test-failure fixes
- Suggest follow-up messages
- Override locale (`en`, `fr`, etc.)
- Define the default chat panel location
- Include or exclude enterprise repositories

![The image shows a settings interface for GitHub Copilot Chat, displaying various experimental features related to edits, tests, and language context.](https://kodekloud.com/kk-media/image/upload/v1752876849/notes-assets/images/GitHub-Copilot-Certification-Demo-Setup-and-Configuring-Copilot/github-copilot-chat-settings-interface.jpg)

---

## 5\. Use Context with Copilot Chat

1.  Open any file (e.g., `app.py`).
2.  Select or add code snippets.
3.  Launch Copilot Chat and ask targeted questions:

```
@app.route('/items', methods=['GET'])
def list_items():
    return jsonify([item.to_dict() for item in items_db]), 200
```

Copilot Chat will include the current file name and selection context for more accurate responses.

---

## 6\. Add Custom Instructions

To guide Copilot across your repository, create a custom instructions file:

```
mkdir -p .github/copilot
touch .github/copilot/instructions.md
```

Populate `.github/copilot/instructions.md` with workspace-specific guidelines:

```
# Copilot Custom Instructions
- Use snake_case for JSON keys.
- Prefer f-strings in Python code.
- Include docstrings for all public functions.
```

> [!important]
> **Note**
>
> Commit this file to version control so that all collaborators benefit from the same Copilot behavior.

---

## Links and References

- [GitHub Copilot Overview](https://github.com/features/copilot)
- [Visual Studio Code Documentation](https://code.visualstudio.com/docs)
- [Flask Official Site](https://flask.palletsprojects.com/)

You’re all set! Enjoy AI-powered completions, advanced settings, and the collaborative power of Copilot Chat to accelerate your development.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-copilot-certification/module/b02a5227-ee17-43dc-b006-51fef8272f13/lesson/f7cc5c19-f952-4a7e-92d6-2e77f1f1d82f)**
>
> Watch video content
