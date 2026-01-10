# Running Your First Model - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Running-Local-LLMs-With-Ollama/Getting-Started-With-Ollama/Running-Your-First-Model)

---

## Table of Contents

- Running Your First Model
  - Prerequisites
  - Local vs. Cloud Deployment
  - Ollama Setup Process
  - Running a Model with Ollama
  - Chatting with Your Model
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

Running Local LLMs With Ollama

Getting Started With Ollama

# Running Your First Model

In this guide, you'll set up and run your first Large Language Model (LLM) on your local machine using Ollama. We’ll cover prerequisites, compare local versus cloud deployments, walk through Ollama’s setup process, and demonstrate how to chat with a model—all offline and without usage fees.

## Prerequisites

Before you begin, make sure you have:

- The Ollama app installed on your computer
- Access to the Ollama CLI (`ollama` command)

![The image lists prerequisites for a task, including having the Ollama app installed and a CLI on the local machine.](https://kodekloud.com/kk-media/image/upload/v1752883730/notes-assets/images/Running-Local-LLMs-With-Ollama-Running-Your-First-Model/ollama-app-cli-prerequisites.jpg)

> [!important]
> **Note**
>
> Ensure your machine meets the [Ollama system requirements](https://ollama.com/docs/installation) for smooth performance.

## Local vs. Cloud Deployment

You have two options for running LLMs:

| Deployment Type | Pros                             | Cons                                |
| --------------- | -------------------------------- | ----------------------------------- |
| Local           | No usage fees, full data control | Requires disk space, RAM            |
| Cloud Service   | Instant scale, managed infra     | Ongoing costs, data sent externally |

![The image compares two methods of running a large language model: executing it on your own machine and relying on a paid cloud service.](https://kodekloud.com/kk-media/image/upload/v1752883731/notes-assets/images/Running-Local-LLMs-With-Ollama-Running-Your-First-Model/language-models-comparison-local-cloud.jpg)

## Ollama Setup Process

Ollama automates:

1.  Downloading the model files
2.  Installing dependencies and preparing the environment

![The image outlines a streamlined setup process by Ollama, featuring two steps: downloading necessary model files and setting up an environment with dependencies.](https://kodekloud.com/kk-media/image/upload/v1752883732/notes-assets/images/Running-Local-LLMs-With-Ollama-Running-Your-First-Model/ollama-setup-process-steps.jpg)

## Running a Model with Ollama

We’ll start with **LLaMA 3.2**, Meta’s open-source LLM. To launch:

```
ollama run llama3.2
```

If the model isn’t already on your system, Ollama will:

1.  Pull the manifest and layers
2.  Verify the SHA-256 digest
3.  Cache metadata for faster future starts
4.  Launch the model

Example output:

```
$ ollama run llama3.2
pulling manifest
pulling 633fc5be925f... 100% 2.2 GB
pulling fa8235e5b48f... 100% 1.1 KB
pulling 542b217f179c... 100%
verifying digest
writing manifest
✔ model llama3.2 ready
```

> [!important]
> **Warning**
>
> The first download can take several minutes depending on your internet speed and disk performance.

## Chatting with Your Model

Once loaded, Ollama drops you into an interactive chat:

```
$ ollama run llama3.2
>>> hey! how are you?
I'm just a language model, so I don't have emotions or feelings like humans do, but thank you for asking! How can I help you today? Is there something on your mind that you'd like to chat about or ask for assistance with? I'm all ears (or rather, all text).
>>> /bye
```

Type `/bye` to close the session. You now have a fully offline LLM chat interface.

## Next Steps

In the next lesson, we’ll:

- Explore other models supported by Ollama
- Read model descriptions and metadata
- Run additional LLMs locally

![The image is a slide titled "Next Steps" with a list of three items: "Different models offered," "Reading descriptions and details," and "Running different models."](https://kodekloud.com/kk-media/image/upload/v1752883733/notes-assets/images/Running-Local-LLMs-With-Ollama-Running-Your-First-Model/next-steps-models-reading-running.jpg)

---

## Links and References

- [Ollama Documentation](https://ollama.com/docs)
- [Meta LLaMA 3 Release Notes](https://ai.meta.com/)
- [Local LLM Best Practices](https://ollama.com/blog/local-llm-guide)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/running-local-llms-with-ollama/module/836a96fe-9951-42b6-83ba-a602299c87c9/lesson/be4d479f-8938-4024-84c3-bf3335697501)**
>
> Watch video content
