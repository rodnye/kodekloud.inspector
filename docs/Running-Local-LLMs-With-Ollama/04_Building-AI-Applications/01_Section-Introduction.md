# Section Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Running-Local-LLMs-With-Ollama/Building-AI-Applications/Section-Introduction)

---

## Table of Contents

- Section Introduction
  - What You’ll Learn
  - References
  - Watch Video

---

## Content

Running Local LLMs With Ollama

Building AI Applications

# Section Introduction

In the previous article, you explored Ollama’s core features—installing the CLI, pulling models, and running large language models locally. Now, we’ll shift our focus to programmatic access: the **Ollama REST API**, which lets you interact with your local LLMs over HTTP instead of typing commands in a terminal.

> [!important]
> **Prerequisites**
>
> - Ensure you’ve installed the Ollama CLI and configured at least one local model (for example, `ollama pull llama2`).
> - Have your API base URL and authentication token ready if you’ve set up access controls.

## What You’ll Learn

- **Ollama REST API Overview**: Why and when to use the API over the CLI
- **Key Endpoints**: Create, list, and chat operations you’ll rely on
- **Request & Response Flow**: Emulate a conversational experience via HTTP
- **Hands-On Lab**: Practice making real API calls
- **AI App Architecture**: Fundamentals of integrating locally hosted LLMs
- **Python Demo**: Build a simple application with the [OpenAI Python client](https://github.com/openai/openai-python) powered by Ollama
- **OpenAI Compatibility**: How Ollama mirrors the [OpenAI API](https://platform.openai.com/docs/api-reference) for seamless production switch-overs

![The image is a slide outlining topics to be covered about the Ollama REST API, including its introduction, available endpoints, and interaction methods.](https://kodekloud.com/kk-media/image/upload/v1752883672/notes-assets/images/Running-Local-LLMs-With-Ollama-Section-Introduction/ollama-rest-api-topics-slide.jpg)

This section will guide you through every step, from sending your first `POST /v1/chat/completions` request to handling streamed responses in your application.

![The image is a slide titled "What We'll Cover," outlining topics related to building AI applications using Ollama, creating an app with the OpenAI Python client, and OpenAI compatibility.](https://kodekloud.com/kk-media/image/upload/v1752883673/notes-assets/images/Running-Local-LLMs-With-Ollama-Section-Introduction/ai-applications-ollama-openai.jpg)

Let’s dive in and start building!

---

## References

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/running-local-llms-with-ollama/module/8df2f2d5-d3c5-433d-b5f5-f553b040b2e7/lesson/095c0b79-d309-4fc4-a278-6d071d5dc1d5)**
>
> Watch video content
