# Slash Commands in Depth - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/GitHub-Copilot-Certification/Advanced-Features/Slash-Commands-in-Depth)

---

## Table of Contents

- Slash Commands in Depth
  - Core Slash Commands
  - Additional Slash Commands
  - How to Access Slash Commands
  - Seamless Integration
  - Demo: Slash Commands in Visual Studio
  - Links and References
  - Watch Video
    - 1. Generate XML Documentation
    - 2. Explain Code with /explain
    - 3. Generate Unit Tests with /test

---

## Content

GitHub Copilot Certification

Advanced Features

# Slash Commands in Depth

Unlock the full potential of GitHub Copilot’s slash commands right inside Visual Studio. While these powerful shortcuts also work in Visual Studio Code, Visual Studio Professional and Enterprise users enjoy **GitHub Copilot Free**—2,000 code completions and 50 chat messages per month—directly from their IDE without extra cost.

![The image shows a Visual Studio interface with a GitHub Copilot integration, highlighting a "GitHub Copilot Free" feature. It includes a sidebar with options and a section promoting the benefits of using GitHub Copilot.](https://kodekloud.com/kk-media/image/upload/v1752876804/notes-assets/images/GitHub-Copilot-Certification-Slash-Commands-in-Depth/visual-studio-github-copilot-integration.jpg)

> [!important]
> **Note**
>
> Visual Studio subscribers get **Copilot Free** automatically. Monthly limits reset on your billing date. To unlock unlimited completions, sign in with an existing GitHub Copilot subscription.

## Core Slash Commands

Use these four slash commands for everyday productivity:

| Command    | Function                                                           | Languages                    |
| ---------- | ------------------------------------------------------------------ | ---------------------------- |
| `/doc`     | Inserts documentation comments (PEP8 in Python; XML/Swagger in C#) | Python, C#, JavaScript, etc. |
| `/exp`     | Starts a fresh chat session, clearing prior context                | All supported languages      |
| `/explain` | Generates a natural-language explanation of selected code          | All supported languages      |
| `/fix`     | Proposes corrections for typos, syntax errors, and logic           | All supported languages      |

![The image lists available slash commands for a coding tool, including `/doc`, `/exp`, `/explain`, and `/fix`, each with a brief description of their functions.](https://kodekloud.com/kk-media/image/upload/v1752876806/notes-assets/images/GitHub-Copilot-Certification-Slash-Commands-in-Depth/slash-commands-coding-tool.jpg)

## Additional Slash Commands

Beyond the essentials, Copilot offers specialized commands to streamline your workflow:

| Command             | Description                                                            |
| ------------------- | ---------------------------------------------------------------------- |
| `/fix-test-failure` | Targets failing unit tests and suggests fixes.                         |
| `/generate`         | Creates boilerplate code or full components (e.g., interfaces, views). |
| `/help`             | Displays a quick reference of all available slash commands.            |
| `/optimize`         | Analyzes and suggests performance improvements.                        |
| `/test`             | Auto-generates unit tests (including edge cases) for selected code.    |
| `/clear`            | Clears the chat context and starts a new session.                      |
| `/new`              | Scaffolds a new project (Flask, React, Vue, Blazor, etc.).             |

![The image lists various slash commands for GitHub Copilot, such as fixing test failures, generating code, providing help, optimizing code, creating tests, clearing sessions, and starting new projects.](https://kodekloud.com/kk-media/image/upload/v1752876807/notes-assets/images/GitHub-Copilot-Certification-Slash-Commands-in-Depth/github-copilot-slash-commands.jpg)

## How to Access Slash Commands

Invoke slash commands in three simple ways:

1.  Type a forward slash (`/`) in the Copilot Chat message box.
2.  Click the **Slash** button in the GitHub Copilot chat pane.
3.  Use inline chat: press **Alt + /** (or your custom shortcut), right-click in the editor, and choose **Ask Copilot**.

![The image provides instructions for accessing slash commands in GitHub Copilot Chat, detailing three methods: typing a slash, clicking the Slash button, and using inline chat.](https://kodekloud.com/kk-media/image/upload/v1752876808/notes-assets/images/GitHub-Copilot-Certification-Slash-Commands-in-Depth/github-copilot-chat-slash-commands.jpg)

## Seamless Integration

Whether you prefer a dedicated chat window or inline interactions, slash commands keep you focused:

- **Dedicated Chat Pane**: Maintain a continuous conversation without switching contexts.
- **Inline Chat**: Invoke Copilot suggestions right beside your code.
- **Unified Workflow**: Both methods preserve your coding flow and history.

![The image outlines three features of seamless integration: using slash commands in a main chat window, accessing commands in an inline chat dialog, and maintaining a continuous workflow without disrupting coding.](https://kodekloud.com/kk-media/image/upload/v1752876809/notes-assets/images/GitHub-Copilot-Certification-Slash-Commands-in-Depth/seamless-integration-features-diagram.jpg)

## Demo: Slash Commands in Visual Studio

Below is a quick walkthrough showing how slash commands speed up documentation, explanation, and testing tasks.

![The image shows a Visual Studio interface with a GitHub Copilot chat window open, displaying options for code summarization, unit test writing, code fixing, and programming concept explanations. The left panel highlights the "Meet GitHub Copilot Free" section, detailing its features and benefits.](https://kodekloud.com/kk-media/image/upload/v1752876811/notes-assets/images/GitHub-Copilot-Certification-Slash-Commands-in-Depth/visual-studio-github-copilot-chat.jpg)

### 1\. Generate XML Documentation

Open **Program.cs**, position the cursor, and type:

```
/doc
```

Copilot injects XML comments for methods and classes:

```
using KodexKloudDemo.Client.Pages;
using KodexKloudDemo.Components;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorComponents()
    .AddInteractiveWebAssemblyComponents();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseWebAssemblyDebugging();
}
else
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAntiforgery();

app.MapRazorComponents<App>()
    .AddInteractiveWebAssemblyRendererMode();
```

In a Razor component:

```
@page "/counter"
@using Microsoft.AspNetCore.Components

<h3>Counter</h3>
<p>Current count: @currentCount</p>
<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    /// <summary>
    /// The current count value.
    /// </summary>
    private int currentCount = 0;

    /// <summary>
    /// Increments the current count value by one.
    /// </summary>
    private void IncrementCount()
    {
        currentCount++;
    }
}
```

### 2\. Explain Code with `/explain`

Select a block:

```
app.MapRazorComponents<App>()
    .AddInteractiveWebAssemblyRendererMode()
    .AddAdditionalAssemblies(typeof(KodeKloudDemo.Client.Imports).Assembly);
```

Type `/explain` to get a step-by-step breakdown of each API call.

### 3\. Generate Unit Tests with `/test`

Highlight methods and type:

```
/test
```

Copilot scaffolds an xUnit project and test files:

```
dotnet new xunit -o KodeKloudDemo.Tests
cd KodeKloudDemo.Tests
```

In seconds, you’ll have a suite of unit tests covering the selected code paths.

> [!important]
> **Warning**
>
> If you use `/clear`, all previous chat history is lost. Make sure to save important context or prompts before resetting.

---

With these slash commands at your fingertips, you can document, explain, fix, test, and optimize your code—all without leaving your editor.

## Links and References

- [GitHub Copilot Slash Commands](https://docs.github.com/copilot/getting-started-with-github-copilot/overview-of-copilot-chat-features)
- [Visual Studio Documentation](https://docs.microsoft.com/visualstudio/)
- [Visual Studio Code Slash Commands](https://code.visualstudio.com/docs/editor/github)
- [PEP 257 – Python Docstring Conventions](https://www.python.org/dev/peps/pep-0257/)
- [xUnit Documentation](https://xunit.net/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/github-copilot-certification/module/694a659c-4ffa-4c3d-a3c3-d003725eb574/lesson/45611c07-5a97-4843-8fc5-2a9f5fb9226b)**
>
> Watch video content
