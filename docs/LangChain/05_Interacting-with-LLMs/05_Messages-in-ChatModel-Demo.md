# Messages in ChatModel Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Interacting-with-LLMs/Messages-in-ChatModel-Demo)

---

## Table of Contents

- Messages in ChatModel Demo
  - Prerequisites
  - 1. Configure Your OpenAI API Key
  - 2. Import Modules and Initialize the Chat Model
  - 3. Understand the Message Classes
  - 4. Construct and Send Your Chat
  - 5. Next Steps
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

LangChain

Interacting with LLMs

# Messages in ChatModel Demo

In this tutorial, you’ll learn how to construct and exchange messages using the LangChain SDK’s chat interface. We’ll walk through setting up your environment, importing the correct modules, and sending a simple conversation to an OpenAI-backed chat model.

> [!important]
> **Note**
>
> LangChain’s package structure may change over time. Always refer to the [official LangChain documentation](https://python.langchain.com/en/latest/) for the latest import paths and best practices.

## Prerequisites

- Python 3.7+
- `langchain` and `openai` packages installed
- Valid OpenAI API key

## 1\. Configure Your OpenAI API Key

Before you start, make sure your OpenAI API key is set as an environment variable:

```
export OPENAI_API_KEY="your_api_key_here"
```

> [!important]
> **Warning**
>
> Never commit your API keys to a public repository. Use environment variables or secret management tools to keep credentials secure.

## 2\. Import Modules and Initialize the Chat Model

First, import the modules you need from LangChain. Then create an instance of `ChatOpenAI` with a deterministic configuration:

```
import os
from langchain.chat_models import ChatOpenAI
from langchain.schema import SystemMessage, HumanMessage

# Initialize the chat model with zero temperature for deterministic responses
model = ChatOpenAI(temperature=0)
```

## 3\. Understand the Message Classes

LangChain uses distinct classes to represent different roles in a conversation. Below is a quick reference:

| Message Class | Role      | Description                                  |
| ------------- | --------- | -------------------------------------------- |
| SystemMessage | System    | Defines behavior/persona of the assistant    |
| HumanMessage  | User      | Represents the user’s prompt or question     |
| AIMessage     | Assistant | The model’s reply (returned by the API call) |

## 4\. Construct and Send Your Chat

Define a system message to set the assistant’s persona (for example, a physics teacher), followed by a human message asking a question:

```
# Define persona and prompt
sysmsg = "You are a physics teacher."
humanmsg = "Explain the concept of a galaxy."

# Build the message list
messages = [
    SystemMessage(content=sysmsg),
    HumanMessage(content=humanmsg),
]

# Send the messages to the model
response = model(messages)

# Output the assistant’s reply
print(response.content)
```

When you inspect the `response` object, you’ll find an `AIMessage` whose `content` attribute holds the model’s answer. This three-step pattern—system message, human message, then AI response—is fundamental to chat-based workflows.

## 5\. Next Steps

- Experiment with different `temperature` settings to control response creativity.
- Chain multiple messages for multi-turn conversations.
- Explore advanced prompt-crafting techniques like few-shot examples and function calling.

---

## Links and References

- [LangChain Documentation](https://python.langchain.com/en/latest/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference/introduction)
- [Managing Secrets in Python](https://realpython.com/python-environment-variables/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/ae260750-791b-496c-991f-0d0333f61e40/lesson/c67000e4-0960-4e50-a4e4-b8cb159f2f1e)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/langchain/module/ae260750-791b-496c-991f-0d0333f61e40/lesson/0dfdfd01-a5b0-4e95-9ccd-49e5189bcd2e)**
>
> Practice lab
