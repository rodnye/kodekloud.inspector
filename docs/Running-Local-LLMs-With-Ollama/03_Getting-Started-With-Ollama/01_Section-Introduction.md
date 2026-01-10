# Section Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Running-Local-LLMs-With-Ollama/Getting-Started-With-Ollama/Section-Introduction)

---

## Table of Contents

- Section Introduction
  - What You’ll Learn
  - Why Run LLMs Locally with Ollama?
  - Core Concepts
  - Getting Started: Install & Setup
  - Run Your First Text Model
  - Load an Image-Based Model
  - Mastering the Ollama CLI
  - Community Integrations & Building Your Chatbot
  - Watch Video

---

## Content

Running Local LLMs With Ollama

Getting Started With Ollama

# Section Introduction

Welcome to the first major section of this course! Here, you’ll discover how Ollama simplifies running large language models (LLMs) on your local machine. By the end of this lesson, you’ll be ready to build your own AI-powered chatbot—all without sending data to the cloud.

## What You’ll Learn

1.  **Introduction to Ollama:** Explore core use cases and real-world applications.
2.  **Installation & Setup:** Get Ollama up and running on macOS, Linux, or Windows.
3.  **First Text Model:** Run your first text-based LLM locally and interact via prompts.
4.  **Key Concepts:** Understand quantization, tokens, and parameters to choose the right model.
5.  **Image-Based Models:** Load and query models that process images.
6.  **Ollama CLI Mastery:** Learn essential commands, complete live demos, and tackle hands-on labs.
7.  **Community Integrations:** Discover how extensions like prompt templating and logging enhance Ollama.
8.  **ChatGPT-Style Interface:** Build a simple chat UI with a community integration.

![The image outlines a four-step agenda covering learning about Ollama, installing it, running a first model, and exploring models and parameters.](https://kodekloud.com/kk-media/image/upload/v1752883734/notes-assets/images/Running-Local-LLMs-With-Ollama-Section-Introduction/ollama-four-step-agenda.jpg)

---

## Why Run LLMs Locally with Ollama?

Running models on your own machine offers:

- **Privacy & Security:** Your data never leaves your hardware.
- **Low Latency:** Instant responses without network delays.
- **Offline Capability:** Develop and test even when disconnected.
- **Cost Control:** No per-API-call fees or usage limits.

Ollama provides a consistent CLI and API for all major open-source models. Whether you need text generation, summarization, or image inference, Ollama handles the heavy lifting—model downloads, quantization, and optimized local execution.

---

## Core Concepts

Understanding these terms will help you pick—and tune—the right model:

| Concept      | Description                                            | Benefit                           |
| ------------ | ------------------------------------------------------ | --------------------------------- |
| Quantization | Reduces model size by compressing weights              | Faster inference, lower RAM       |
| Tokens       | Individual text units (words, subwords, or characters) | Controls prompt length & cost     |
| Parameters   | Numerical weights that define model behavior           | Dictate accuracy and capabilities |

---

## Getting Started: Install & Setup

> [!important]
> **Note**
>
> Ollama supports macOS, Linux, and Windows. Ensure you have at least 8 GB of RAM for basic models, and more for large-scale LLMs.

Follow the official [Ollama installation guide](/docs/installation) for step-by-step instructions. Once installed, verify with:

```
ollama version
```

---

## Run Your First Text Model

With Ollama installed:

1.  **List available models:**

    ```
    ollama list
    ```

2.  **Pull a model (e.g., Llama 2):**

    ```
    ollama pull llama2
    ```

3.  **Start an interactive session:**

    ```
    ollama run llama2
    ```

Type your prompt and watch the model respond instantly.

---

## Load an Image-Based Model

Ollama isn’t limited to text. You can load vision models the same way:

```
ollama pull stable-diffusion
ollama run stable-diffusion --image ./input.jpg
```

Feed an image, and the model will generate captions, classifications, or new visuals—demonstrating Ollama’s versatility.

---

## Mastering the Ollama CLI

The CLI is your control center. Key commands include:

| Command                 | Description               | Example                |
| ----------------------- | ------------------------- | ---------------------- |
| `ollama list`           | Show installed models     | `ollama list`          |
| `ollama pull <model>`   | Download a new model      | `ollama pull llama2`   |
| `ollama run <model>`    | Run a model interactively | `ollama run llama2`    |
| `ollama remove <model>` | Uninstall a local model   | `ollama remove llama2` |

![The image is a slide titled "What We'll Cover," outlining topics such as mastering Ollama CLI commands, demos and labs, community integrations, and building a ChatGPT-like interface.](https://kodekloud.com/kk-media/image/upload/v1752883736/notes-assets/images/Running-Local-LLMs-With-Ollama-Section-Introduction/what-we-will-cover-ollama-cli.jpg)

We’ll reinforce these commands through live demos and a hands-on lab so you can practice in real time.

---

## Community Integrations & Building Your Chatbot

Ollama is fully open-source, with a vibrant ecosystem of plugins and integrations. You’ll explore top community projects—prompt templating libraries, advanced logging tools, and UI wrappers. Finally, you’ll combine Ollama with one of these integrations to build a ChatGPT-style interface, complete with conversational history and custom prompts.

By the end of this section, you’ll have a solid foundation in Ollama—from installation to building production-ready chat applications. Let’s dive in!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/running-local-llms-with-ollama/module/836a96fe-9951-42b6-83ba-a602299c87c9/lesson/ae7c6c44-8a9e-415f-835b-f6ffdd4fb353)**
>
> Watch video content
