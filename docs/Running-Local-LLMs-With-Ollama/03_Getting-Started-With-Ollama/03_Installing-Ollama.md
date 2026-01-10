# Installing Ollama - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Running-Local-LLMs-With-Ollama/Getting-Started-With-Ollama/Installing-Ollama)

---

## Table of Contents

- Installing Ollama
  - 1. Downloading Ollama
  - 2. Installing on macOS
  - 3. Verifying the CLI
  - 4. Next Steps
  - Links and References
  - Watch Video

---

## Content

Running Local LLMs With Ollama

Getting Started With Ollama

# Installing Ollama

This guide walks you through downloading, installing, and verifying Ollama on your local machine so you can run large language models (LLMs) like LLaMA 3.2 straight from your terminal.

## 1\. Downloading Ollama

Visit the [Ollama website](https://ollama.com) and choose your operating system. Below is a quick reference for each platform:

| Operating System | File Format | Action                                    |
| ---------------- | ----------- | ----------------------------------------- |
| macOS            | .zip        | Download, unzip, and move to Applications |
| Linux            | .tar.gz     | Download and extract                      |
| Windows          | .exe        | Download and run installer                |

![The image shows a webpage from ollama.com, offering a download for running large language models like Llama 3.3 and Phi 4, with options for macOS, Linux, and Windows.](https://kodekloud.com/kk-media/image/upload/v1752883702/notes-assets/images/Running-Local-LLMs-With-Ollama-Installing-Ollama/ollama-download-large-language-models.jpg)

Select the download button for your OS, then you’ll land on a page like this:

![The image shows a webpage for downloading "Ollama" with options for macOS, Linux, and Windows. It features a download button for macOS and a section to sign up for updates.](https://kodekloud.com/kk-media/image/upload/v1752883703/notes-assets/images/Running-Local-LLMs-With-Ollama-Installing-Ollama/ollama-download-page-macos-linux-windows.jpg)

## 2\. Installing on macOS

Once the `.zip` file has finished downloading:

1.  Open Finder and navigate to your **Downloads** folder.
2.  Unzip the archive and double-click **Ollama.app**.
3.  When prompted, click **Open**.
4.  macOS will ask to move the app to **Applications**—confirm to complete the install.

> [!important]
> **Note**
>
> If you see a security prompt about an unidentified developer, go to **System Preferences > Security & Privacy** and allow the app to run.

![The image shows a Mac Finder window with a "Downloads" folder open, containing a folder, a ZIP file, and an app named "Ollama." A security prompt is asking if the user wants to open the downloaded app.](https://kodekloud.com/kk-media/image/upload/v1752883704/notes-assets/images/Running-Local-LLMs-With-Ollama-Installing-Ollama/mac-finder-downloads-folder-ollama.jpg)

## 3\. Verifying the CLI

Launch your terminal. On first run, you may be asked to install the Ollama CLI—type **yes** to proceed. Once installed, confirm everything is set up by running:

```
ollama
```

You should see output similar to:

```
Usage:
  ollama [flags]
  ollama [command]

Available Commands:
  serve   Start ollama
  create  Create a model from a Modelfile
  show    Show information for a model
  run     Run a model
  stop    Stop a running model
  pull    Pull a model from a registry
  push    Push a model to a registry
  list    List models
  ps      List running models
  cp      Copy a model
  rm      Remove a model
  help    Help about any command

Flags:
  -h, --help      help for ollama
  -v, --version   Show version information

Use "ollama [command] --help" for more information about a command.
```

> [!important]
> **Note**
>
> If you don’t see the above output, ensure your PATH includes the Ollama binary or restart your terminal session.

Congratulations! You now have Ollama installed and can run LLMs locally.

## 4\. Next Steps

To get started, try running Meta’s LLama 3.2 model:

```
ollama run llama3
```

Explore the full set of commands with `ollama help` or check out the official documentation to learn how to create and manage your own models.

## Links and References

- [Ollama website](https://ollama.com)
- [Ollama Documentation](https://ollama.com/docs/installation)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/running-local-llms-with-ollama/module/836a96fe-9951-42b6-83ba-a602299c87c9/lesson/473ec2e9-d32b-4d7c-8692-c68596c12730)**
>
> Watch video content
