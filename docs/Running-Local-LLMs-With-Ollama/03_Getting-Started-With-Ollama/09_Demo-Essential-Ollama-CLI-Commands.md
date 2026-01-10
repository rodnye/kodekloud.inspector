# Demo Essential Ollama CLI Commands - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Running-Local-LLMs-With-Ollama/Getting-Started-With-Ollama/Demo-Essential-Ollama-CLI-Commands)

---

## Table of Contents

- Demo Essential Ollama CLI Commands
  - Table of Contents
  - 1. List All Commands
  - 2. Run a Model Interactively
  - 3. Stop a Running Model
  - 4. View Local Models
  - 5. Remove a Model
  - 6. Download Models Without Running
  - 7. Show Model Details
  - 8. Monitor Active Models
  - 9. Links and References
  - Watch Video
  - Practice Lab

---

## Content

Running Local LLMs With Ollama

Getting Started With Ollama

# Demo Essential Ollama CLI Commands

In this guide, we’ll walk through the most common Ollama CLI commands with practical examples. Whether you’re spinning up a model server, inspecting metadata, or managing local models, these commands form the foundation of any AI application workflow.

## Table of Contents

1.  [List All Commands](#1-list-all-commands)
2.  [Run a Model Interactively](#2-run-a-model-interactively)
3.  [Stop a Running Model](#3-stop-a-running-model)
4.  [View Local Models](#4-view-local-models)
5.  [Remove a Model](#5-remove-a-model)
6.  [Download Models Without Running](#6-download-models-without-running)
7.  [Show Model Details](#7-show-model-details)
8.  [Monitor Active Models](#8-monitor-active-models)
9.  [Links and References](#9-links-and-references)

---

## 1\. List All Commands

To discover every available Ollama subcommand, simply run:

```
ollama
```

You’ll see output similar to:

```
Available Commands:
  serve      Start Ollama model server
  create     Create a model from a Modelfile
  show       Show information for a model
  run        Run a model
  stop       Stop a running model
  pull       Pull a model from a registry
  push       Push a model to a registry
  list       List local models
  ps         List running models
  cp         Copy a model
  rm         Remove a model
  help       Help about any command


Flags:
  -h, --help     Help for ollama
  -v, --version  Show version information
```

> [!important]
> **Tip**
>
> Append `--help` to any command to view detailed usage information, for example:
>
> ```
> ollama run --help
> ```

---

## 2\. Run a Model Interactively

Launch an interactive chat session with a model (e.g., `llama3.2`):

```
ollama run llama3.2
```

Once running, type your queries:

```
>>> What is the time?
I'm not sure what time you are referring to, as I'm a large language model without real-time access...
```

To exit the chat, enter:

```
>>> /bye
```

---

## 3\. Stop a Running Model

Models continue running in the background even after you exit the chat interface. To completely terminate:

```
ollama stop llama3.2
```

> [!important]
> **Warning**
>
> Leaving unused models running can consume memory and GPU resources. Always stop models you’re no longer using.

---

## 4\. View Local Models

List all models downloaded on your machine:

```
ollama list
```

| NAME            | ID           | SIZE   | MODIFIED          |
| --------------- | ------------ | ------ | ----------------- |
| llava:latest    | 8dd30f6b0cb1 | 4.7 GB | 48 minutes ago    |
| llama3.2:latest | a80c4f17acd5 | 2.0 GB | About an hour ago |

---

## 5\. Remove a Model

Free up disk space by deleting a model:

```
ollama rm llava
```

Confirm removal:

```
ollama list
```

| NAME            | ID           | SIZE   | MODIFIED          |
| --------------- | ------------ | ------ | ----------------- |
| llama3.2:latest | a80c4f17acd5 | 2.0 GB | About an hour ago |

---

## 6\. Download Models Without Running

Use `ollama pull` to fetch a model without immediately launching it. For example, to pull Mistral 7B:

![The image shows a webpage for the Mistral AI 7B model, detailing its version, parameters, and license information. The page includes options for searching models and accessing tools.](https://kodekloud.com/kk-media/image/upload/v1752883698/notes-assets/images/Running-Local-LLMs-With-Ollama-Demo-Essential-Ollama-CLI-Commands/mistral-ai-7b-model-page.jpg)

```
ollama pull mistral
```

You’ll see progress bars like:

```
pulling manifest
pulling ff82381e2bea... 28%
```

> [!important]
> **Note**
>
> Press `Ctrl+C` at any point to abort the download.

---

## 7\. Show Model Details

Inspect model metadata, architecture, and licensing:

```
ollama show llama3.2
```

```
Model
  architecture     llama
  parameters       3.2B
  context length   131072
  embedding length 3072
  quantization     Q4_K_M


Parameters
  stop  "<|start_header_id|>"
  stop  "<|end_header_id|>"
  stop  "<|eot_id|>"


License
  LLAMA 3.2 COMMUNITY LICENSE AGREEMENT
  Release Date: March 26, 2024
```

Understanding the license ensures you comply with usage restrictions.

---

## 8\. Monitor Active Models

Similar to Docker’s `ps`, this command lists all currently running models:

```
ollama ps
```

After launching a model in one terminal:

```
ollama run llama3.2
```

Open another terminal and run:

```
ollama ps
```

| NAME            | ID           | SIZE   | PROCESSOR | UNTIL              |
| --------------- | ------------ | ------ | --------- | ------------------ |
| llama3.2:latest | a80c4f17acd5 | 4.0 GB | 100% GPU  | 4 minutes from now |

To stop the model:

```
ollama stop llama3.2
```

Verify no active models remain:

```
ollama ps
```

---

## 9\. Links and References

- [Ollama CLI Documentation](https://github.com/jmorganca/ollama)
- [Mistral AI Models](https://huggingface.co/mistralai)
- [LLAMA 3.2 License Details](https://example.com/llama3-license)
- [Local LLM Best Practices](https://example.com/local-llm-guide)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/running-local-llms-with-ollama/module/836a96fe-9951-42b6-83ba-a602299c87c9/lesson/7bb1f793-6edb-4b13-8e2c-5fd9027b0ed8)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/running-local-llms-with-ollama/module/836a96fe-9951-42b6-83ba-a602299c87c9/lesson/1e1ade67-8661-4f08-bfe0-5177df20caea)**
>
> Practice lab
