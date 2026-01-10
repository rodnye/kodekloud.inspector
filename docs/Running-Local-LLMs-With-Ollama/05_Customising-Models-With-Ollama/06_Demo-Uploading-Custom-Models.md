# Demo Uploading Custom Models - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Running-Local-LLMs-With-Ollama/Customising-Models-With-Ollama/Demo-Uploading-Custom-Models)

---

## Table of Contents

- Demo Uploading Custom Models
  - 1. Set Up Your Ollama Account and Trust Relationship
  - 2. Tag and Copy Your Local Model
  - 3. Push Your Model to the Registry
  - 4. Pull and Verify the Custom Model
  - Quick Reference: Ollama CLI Commands
  - Conclusion
  - Watch Video

---

## Content

Running Local LLMs With Ollama

Customising Models With Ollama

# Demo Uploading Custom Models

Distributing Modelfiles for every update can be cumbersome. By uploading custom models to the [Ollama Model Registry](https://ollama.com/), your team can pull the latest version directly—just like using [Docker Hub](https://hub.docker.com) for container images.

In this tutorial, we’ll cover how to:

1.  Set up your Ollama account and trust relationship
2.  Tag and copy your local model
3.  Push the tagged model to the registry
4.  Pull and verify your custom model

---

## 1\. Set Up Your Ollama Account and Trust Relationship

1.  Create an Ollama account at https://ollama.com/ and sign in.
2.  Go to **Settings** → **Ollama Key**.
3.  Locate your public SSH key on your local machine:

| OS      | Public Key Path                                  |
| ------- | ------------------------------------------------ |
| macOS   | `~/.ollama/id_ed25519.pub`                       |
| Linux   | `~/.ollama/id_ed25519.pub`                       |
| Windows | `C:\\Users\\<username>\\.ollama\\id_ed25519.pub` |

4.  Display and copy your public key:

```
cat ~/.ollama/id_ed25519.pub
# Example output:
# ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIH7Ief2QY2HB3PsazsapAGID8hBSf7rc3is9C/0ldmR
```

5.  Paste the key into your Ollama **Ollama Key** field and save.

> [!important]
> **Note**
>
> Once added, Ollama will recognize and authenticate your machine for publishing.

---

## 2\. Tag and Copy Your Local Model

First, list your existing local models:

```
ollama ls
```

Example output:

```
NAME            ID              SIZE    MODIFIED
harris:latest   267a012ab49f    2.0 GB  5 days ago
phi3:latest     4f2222927938    2.2 GB  5 days ago
llama3.2:latest a80c4f17acd5    2.0 GB  6 days ago
```

Next, create a tagged copy under your Ollama username:

```
ollama copy harris your_username/harris:latest
```

Replace `your_username` with your actual Ollama account name. Verify the new entry:

```
ollama ls
```

Expected result:

```
NAME                        ID              SIZE    MODIFIED
your_username/harris:latest 267a012ab49f    2.0 GB  just now
harris:latest               267a012ab49f    2.0 GB  5 days ago
phi3:latest                 4f2222927938    2.2 GB  5 days ago
llama3.2:latest             2.0 GB  6 days ago
```

---

## 3\. Push Your Model to the Registry

Push the tagged model to make it available on Ollama:

```
ollama push your_username/harris:latest
```

Sample output:

```
retrieving manifest
pushing dd5aaa3fc5ff... 100%
pushing 966de95ca8a6... 100%
...
pushing manifest
success


You can find your model at:
https://ollama.com/your_username/harris
```

Visit the URL to view details such as architecture, parameter count, quantization, and any custom system instructions.

![The image shows a user interface for a model named "harris" with details about its architecture, parameters, and quantization. It includes sections for model information, parameters, system description, template, and license details.](https://kodekloud.com/kk-media/image/upload/v1752883677/notes-assets/images/Running-Local-LLMs-With-Ollama-Demo-Uploading-Custom-Models/harris-model-ui-architecture-details.jpg)

---

## 4\. Pull and Verify the Custom Model

Anyone with access can now pull and run your personalized model:

```
ollama pull your_username/harris:latest
```

---

## Quick Reference: Ollama CLI Commands

| Command                    | Description                           | Example                                          |
| -------------------------- | ------------------------------------- | ------------------------------------------------ |
| `ollama ls`                | List all local models                 | `ollama ls`                                      |
| `ollama copy <src> <dest>` | Tag and copy a model for the registry | `ollama copy harris your_username/harris:latest` |
| `ollama push <repo>:<tag>` | Push tagged model to the registry     | `ollama push your_username/harris:latest`        |
| `ollama pull <repo>:<tag>` | Pull a model from the registry        | `ollama pull your_username/harris:latest`        |

---

## Conclusion

Uploading custom models to the Ollama Model Registry simplifies sharing, version control, and collaboration. Experiment with tagging, pushing, and pulling your own models to integrate this workflow into your development process.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/running-local-llms-with-ollama/module/5785c7c7-5088-4ac3-b82f-8835e72b66d0/lesson/83650bbf-180c-4956-b5be-cd6560320385)**
>
> Watch video content
