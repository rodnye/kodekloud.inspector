# Ollama REST API Introduction - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Running-Local-LLMs-With-Ollama/Building-AI-Applications/Ollama-REST-API-Introduction)

---

## Table of Contents

- Ollama REST API Introduction
  - Why Use the Ollama REST API?
  - How an AI Application Interacts with an LLM
  - Getting Started: Launching the Ollama Server
  - Example: Generating a Poem with curl
  - Next Steps
  - Links and References
  - Watch Video
    - Response Fields

---

## Content

Running Local LLMs With Ollama

Building AI Applications

# Ollama REST API Introduction

In this tutorial, you’ll learn how to launch and interact with Ollama’s REST API. We’ll cover:

- Running the API server locally
- Sending requests via HTTP
- Interpreting responses for seamless integration into your applications

![The image is a slide titled "So Far..." with three sections: "Running models locally with Ollama," "Adding a UI for chatbots," and "Ollama commands," each accompanied by an icon.](https://kodekloud.com/kk-media/image/upload/v1752883665/notes-assets/images/Running-Local-LLMs-With-Ollama-Ollama-REST-API-Introduction/so-far-running-models-ui-commands.jpg)

---

## Why Use the Ollama REST API?

Imagine you’re Jane, a developer building an AI-powered app. Your goals include:

- Quick local setup without internet access
- Zero costs during experimentation
- Easy swapping of LLM models
- A simple transition to production with hosted APIs

![The image is an illustration titled "Jane the Developer," highlighting the benefits of building an AI application, such as easy local setup, low development cost, model flexibility, and easy production deployment.](https://kodekloud.com/kk-media/image/upload/v1752883666/notes-assets/images/Running-Local-LLMs-With-Ollama-Ollama-REST-API-Introduction/jane-the-developer-ai-benefits.jpg)

Ollama checks all these boxes:

| Benefit                  | Description                                                             |
| ------------------------ | ----------------------------------------------------------------------- |
| Offline Usage            | Run models locally without internet after pulling them once.            |
| Free & No Sign-Up        | No credit card required to explore and prototype.                       |
| Model Flexibility        | Compare and switch between different LLMs with a single CLI command.    |
| Production Compatibility | Swap your local endpoint for the OpenAI API when you’re ready to scale. |

![The image is an infographic titled "Ollama to the Rescue!" featuring a cartoon llama and highlighting four benefits: local model runs without internet, cost-free usage, model flexibility, and compatibility with OpenAI API.](https://kodekloud.com/kk-media/image/upload/v1752883667/notes-assets/images/Running-Local-LLMs-With-Ollama-Ollama-REST-API-Introduction/ollama-to-the-rescue-infographic.jpg)

> [!important]
> **Tip**
>
> When it’s time for production, simply update your API base URL and credentials to point at [OpenAI’s API](%22https://platform.openai.com/docs/api-reference%22)—your code stays the same.

---

## How an AI Application Interacts with an LLM

A typical AI workflow involves:

1.  User submits input to your app.
2.  App pre-processes the text (e.g., tokenization).
3.  App sends a request to the LLM endpoint.
4.  LLM generates and returns a response.
5.  App post-processes the output (e.g., formatting).
6.  App displays results to the user.

![The image shows a diagram illustrating a user interacting with an app that processes data through a large language model (LLM) and returns the output.](https://kodekloud.com/kk-media/image/upload/v1752883668/notes-assets/images/Running-Local-LLMs-With-Ollama-Ollama-REST-API-Introduction/user-app-llm-data-processing-diagram.jpg)

To implement this flow, you need a REST endpoint for both requests and responses. That’s exactly what `ollama serve` provides.

---

## Getting Started: Launching the Ollama Server

By default, Ollama’s REST API runs on port `11434`. Start the server with:

```
ollama serve
```

Once the service is up, you can send HTTP requests to `http://localhost:11434/api`.

![The image illustrates a process for using an API to communicate with LLMs, showing the Ollama REST API running on localhost port 11434. It suggests testing by running "Ollama Serve" and sending a request.](https://kodekloud.com/kk-media/image/upload/v1752883669/notes-assets/images/Running-Local-LLMs-With-Ollama-Ollama-REST-API-Introduction/api-llm-ollama-rest-process.jpg)

> [!important]
> **Warning**
>
> Ensure port `11434` is not used by other services. If it is, stop those processes or choose a different port using `--port <PORT>`.

---

## Example: Generating a Poem with `curl`

Here’s how to call the `llama3.2` model to compose a poem:

```
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2",
  "prompt": "Compose a poem on LLMs",
  "stream": false
}'
```

Sample JSON response:

```
{
  "model": "llama3.2",
  "created_at": "2025-01-08T06:19:15.039927Z",
  "response": "In silicon halls, where data reigns\nA new breed of mind, with logic gains\n...A future where language, is a tool for all\nNot a gatekeeper, that stands at the wall\nSo let us nurture these models with care\nAnd guide them gently, through the digital air\nFor in their potential, we find our own\nA world of wonder, where knowledge is sown.",
  "done": true,
  "done_reason": "stop"
}
```

### Response Fields

| Field          | Description                                                      |
| -------------- | ---------------------------------------------------------------- |
| model          | The name of the model that generated the output.                 |
| created\\\_at  | ISO 8601 timestamp when processing finished.                     |
| response       | The generated text from the model.                               |
| done           | Boolean indicating whether the generation completed.             |
| done\\\_reason | Explanation for why generation stopped (e.g., `stop`, `length`). |

Additional diagnostic fields (token counts, timing metrics) appear in the payload for performance tuning but are optional for most production use cases.

---

## Next Steps

You’ve now set up the Ollama REST API and tested a simple `generate` endpoint. In the following lessons, we’ll explore:

- Streaming responses for real-time applications
- Custom prompts and system messages
- Advanced endpoints for embeddings, classifications, and more

## Links and References

- [Ollama CLI Reference](https://ollama.com/docs/cli)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Large Language Models Overview](https://en.wikipedia.org/wiki/Large_language_model)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/running-local-llms-with-ollama/module/8df2f2d5-d3c5-433d-b5f5-f553b040b2e7/lesson/850e3bf8-9451-41aa-8539-272bc7a9d49d)**
>
> Watch video content
