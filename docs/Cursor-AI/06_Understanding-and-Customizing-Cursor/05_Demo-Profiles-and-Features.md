# Demo Profiles and Features - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Cursor-AI/Understanding-and-Customizing-Cursor/Demo-Profiles-and-Features)

---

## Table of Contents

- Demo Profiles and Features
  - 1. Navigating to Profiles
  - 2. Creating a New Profile
  - 3. Benefits of Multiple Profiles
  - 4. Customizing Cursor Settings per Profile
  - 5. Other Key Settings
  - 6. Experimental, Security, & Workspace Trust
  - 7. Best Practices for Profiles
  - Watch Video
    - 4.1 Importing from VS Code
    - 4.2 Editor Settings: User vs. Workspace
    - 4.3 Cursor-Specific Settings
    - 4.4 Git Integration & Notifications
    - 5.1 Editor Behaviors
    - 5.2 Diff Editor
    - 5.3 Window Management
    - 5.4 Language-Specific Extensions
    - 5.5 Search and View
    - 5.6 Chat Features
    - 6.1 Experimental Features
    - 6.2 Security Settings
      - Disabling Languages

---

## Content

Cursor AI

Understanding and Customizing Cursor

# Demo Profiles and Features

Profiles in Cursor let you create isolated environments—each with its own extensions, themes, keybindings, and privacy settings—so you can effortlessly switch between personal, work, or any other context.

## 1\. Navigating to Profiles

1.  Open **Settings > Profiles** in Cursor.
2.  Review your list of profiles:
    - **default**: automatically applied to new windows, containing your standard settings, extensions, and recent workspaces.
    - Any additional profiles you’ve created.

Below, the default profile displays installed extensions like Pylance and Python, along with your recent project folders.

![The image shows a software interface for managing profiles, extensions, and workspaces, with a list of extensions like Pylance and Python, and various project paths.](https://kodekloud.com/kk-media/image/upload/v1752872803/notes-assets/images/Cursor-AI-Demo-Profiles-and-Features/software-interface-managing-profiles-extensions.jpg)

## 2\. Creating a New Profile

Click **Create Profile** to start a fresh environment—e.g., “KodeKloud.” You can:

- Copy settings, extensions, and keybindings from an existing profile
- Or select only the items you need and build from scratch

![The image shows a software interface for creating a new profile, with options to set a profile name, icon, and configure content sources like settings and keyboard shortcuts. There are buttons for canceling, previewing, and creating the profile.](https://kodekloud.com/kk-media/image/upload/v1752872804/notes-assets/images/Cursor-AI-Demo-Profiles-and-Features/profile-creation-interface-settings.jpg)

## 3\. Benefits of Multiple Profiles

| Profile Type | Privacy Mode | Ideal For                        |
| ------------ | ------------ | -------------------------------- |
| Personal     | Off          | AI suggestions with full context |
| Work         | On           | Restricted extensions & settings |
| Side Project | Custom       | Unique themes and keybindings    |

Switching profiles isolates your workflow, so you maintain separate configurations for each project or task.

## 4\. Customizing Cursor Settings per Profile

Select a profile and open **Cursor Settings** to enable or disable AI features. The signed-in account appears at the top—you can log out and switch accounts anytime.

> [!important]
> **Note**
>
> Importing your VS Code setup accelerates your transition to Cursor.

### 4.1 Importing from VS Code

Leverage your existing [Visual Studio Code](https://code.visualstudio.com) configuration:

- Extensions
- Settings
- Keybindings

This import retains your familiar environment and speeds up onboarding.

### 4.2 Editor Settings: User vs. Workspace

Editor settings apply at two levels:

- **User**: global preferences
- **Workspace**: project-specific overrides

For example, adjust font family or tab size for one project without impacting others.

![The image shows a settings menu from a code editor, displaying options for commonly used settings such as auto-save, font size, font family, and tab size.](https://kodekloud.com/kk-media/image/upload/v1752872806/notes-assets/images/Cursor-AI-Demo-Profiles-and-Features/code-editor-settings-menu.jpg)

### 4.3 Cursor-Specific Settings

Under **Cursor AI > Full Settings**, toggle features unique to Cursor:

- Composer
- File Picker
- Command Center
- And more

#### Disabling Languages

Exclude file types from AI processing, such as Plain Text or sensitive YAML:

> [!important]
> **Warning**
>
> Disabling a language prevents Cursor AI from analyzing or suggesting code in those files.

![The image shows a settings page of a software application, with options for configuring cursor behavior and language settings. A hand cursor is hovering over an "Add Item" button in the "Disabled Languages" section.](https://kodekloud.com/kk-media/image/upload/v1752872807/notes-assets/images/Cursor-AI-Demo-Profiles-and-Features/settings-page-cursor-language-options.jpg)

### 4.4 Git Integration & Notifications

- **Index Git History**: Allow Cursor AI to learn your repo’s structure and relationships.
- **Private Mode**: Turn off Git indexing for private repositories.
- **Notification Toasts**: Choose where AI suggestions and alerts appear.

## 5\. Other Key Settings

### 5.1 Editor Behaviors

- Auto indent
- Auto closing brackets
- Bracket pair colorization

### 5.2 Diff Editor

Customize diff views:

- Enable or disable CodeLens
- Select diff algorithm
- Choose inline or side-by-side layout

![The image shows the settings menu of a text editor, specifically focusing on the "Diff Editor" options, with various configuration settings visible.](https://kodekloud.com/kk-media/image/upload/v1752872808/notes-assets/images/Cursor-AI-Demo-Profiles-and-Features/diff-editor-settings-menu.jpg)

### 5.3 Window Management

Control how files and folders open:

- New windows
- Reuse existing windows
- Open without arguments

![The image shows a settings menu from a code editor, displaying options for window behavior and accessibility features. It includes settings for opening files and folders in new windows and handling new instances without arguments.](https://kodekloud.com/kk-media/image/upload/v1752872810/notes-assets/images/Cursor-AI-Demo-Profiles-and-Features/code-editor-settings-menu-2.jpg)

### 5.4 Language-Specific Extensions

Set extension behavior per language to enforce linting, formatting, or custom rules.

### 5.5 Search and View

Adjust search options:

- Action bar position
- Collapse/expand behavior
- Default view mode

### 5.6 Chat Features

Enable or disable:

- Command Center
- Editing preferences
- Chat UI options

![The image shows a settings menu in a software application, specifically focusing on chat features and options like enabling the command center and editing preferences.](https://kodekloud.com/kk-media/image/upload/v1752872811/notes-assets/images/Cursor-AI-Demo-Profiles-and-Features/settings-menu-chat-features.jpg)

## 6\. Experimental, Security, & Workspace Trust

### 6.1 Experimental Features

Try cutting-edge options like renderer profiling and shell environment timeouts:

![The image shows a settings menu from a software application, highlighting options under "Application," "Security," and "Workspace" categories, with a focus on "Experimental" features.](https://kodekloud.com/kk-media/image/upload/v1752872813/notes-assets/images/Cursor-AI-Demo-Profiles-and-Features/settings-menu-application-security-workspace.jpg)

### 6.2 Security Settings

Manage workspace trust and URI handling in line with [VS Code’s security model](https://code.visualstudio.com/docs/getstarted/security):

![The image shows the security settings in a code editor, likely Visual Studio Code, with options related to workspace trust and file handling.](https://kodekloud.com/kk-media/image/upload/v1752872814/notes-assets/images/Cursor-AI-Demo-Profiles-and-Features/security-settings-visual-studio-code.jpg)

## 7\. Best Practices for Profiles

- Spend 10–15 minutes exploring settings after installation or update.
- Create separate profiles for **Work**, **Personal**, and **Side Projects**.
- Delete stale profiles and start fresh when configurations become cluttered.

---

By following these steps, you’ll harness the full power of Cursor’s Profiles and Features to streamline your development workflows.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/cursor-ai/module/fcc10c1c-5240-4626-9bfc-bf172a3a00c6/lesson/caf43294-90c3-4b51-a287-3fadc2267c5e)**
>
> Watch video content
