# OpenAI API and Libraries - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/Getting-Started-with-OpenAI/OpenAI-API-and-Libraries)

---

## Table of Contents

- OpenAI API and Libraries
  - Official SDKs
  - Community Libraries
  - Next Steps
  - Links and References
  - Watch Video
    - Python SDK
    - Node.js SDK
      - Installation
      - Quickstart Example
      - Using the CLI
      - Installation
      - Basic Usage (JavaScript)

---

## Content

Mastering Generative AI with OpenAI

Getting Started with OpenAI

# OpenAI API and Libraries

Programmatic access to OpenAI’s models enables seamless integration of GPT-powered features into your applications. In this guide, we’ll cover how to install and use the official OpenAI SDKs for Python and Node.js, leverage the OpenAI CLI for quick API operations, and explore community-maintained libraries.

## Official SDKs

For the latest SDKs, visit the [OpenAI documentation under “Libraries”](https://platform.openai.com/docs/libraries). Below is a quick overview:

| Language | Package | Install Command      | Documentation                                                              |
| -------- | ------- | -------------------- | -------------------------------------------------------------------------- |
| Python   | openai  | `pip install openai` | [Python SDK Guide](https://platform.openai.com/docs/libraries/python)      |
| Node.js  | openai  | `npm install openai` | [Node.js SDK Guide](https://platform.openai.com/docs/libraries/javascript) |

### Python SDK

#### Installation

```
pip install openai
```

This single package provides both:

- The Python client library (`import openai`)
- The `openai` CLI tool for tasks like generating completions or fine-tuning models

> [!important]
> **Warning**
>
> Never commit your `OPENAI_API_KEY` in plaintext. Always load it from an environment variable or a secrets manager.

#### Quickstart Example

```
import os
import openai


# Load your API key securely
openai.api_key = os.getenv("OPENAI_API_KEY")


# Request a chat completion
response = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[{"role": "user", "content": "Hello, world!"}]
)


print(response.choices[0].message.content)
```

#### Using the CLI

```
openai api chat_completions.create \
  -m gpt-3.5-turbo \
  -g user "Hello, world!"
```

> [!important]
> **Note**
>
> The `openai` CLI supports commands for completions, embeddings, file uploads, and fine-tuning. Run `openai --help` to explore all options.

### Node.js SDK

#### Installation

```
npm install openai
```

#### Basic Usage (JavaScript)

```
import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


async function chat() {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello, world!" }]
  });
  console.log(response.choices[0].message.content);
}


chat();
```

For TypeScript examples and advanced configurations, see the [Node.js SDK Guide](https://platform.openai.com/docs/libraries/javascript).

## Community Libraries

OpenAI’s documentation also links to community-maintained libraries across various languages. Use these with caution, as they are not officially supported:

![The image shows a webpage from OpenAI's documentation, listing community libraries for various programming languages like C#, C++, Clojure, and Crystal. It includes links to GitHub repositories and a disclaimer about using these libraries at one's own risk.](https://kodekloud.com/kk-media/image/upload/v1752881513/notes-assets/images/Mastering-Generative-AI-with-OpenAI-OpenAI-API-and-Libraries/openai-community-libraries-documentation.jpg)

## Next Steps

Now that you have the SDKs installed and the CLI at your fingertips, you’re ready to configure your development environment and build your first Python application that calls the OpenAI API.

## Links and References

- [OpenAI SDKs](https://platform.openai.com/docs/libraries)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Managing API Keys](https://platform.openai.com/docs/api-keys)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/7cf291c5-4705-4a69-965a-b0ba7d2169c6/lesson/6e105a90-147d-4c23-9021-e37885d4b3df)**
>
> Watch video content
