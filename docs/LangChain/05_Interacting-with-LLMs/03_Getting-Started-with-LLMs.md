# Getting Started with LLMs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Interacting-with-LLMs/Getting-Started-with-LLMs)

---

## Table of Contents

- Getting Started with LLMs
  - Prerequisites
  - 1. Imports and Environment Setup
  - 2. Initializing the OpenAI LLM
  - 3. Defining a Prompt and Generating Text
  - 4. Switching to Google Generative AI (Gemini Pro)
  - Comparing LLM Clients
  - Next Steps
  - References
  - Watch Video

---

## Content

LangChain

Interacting with LLMs

# Getting Started with LLMs

Learn how to seamlessly integrate and switch between large language models (LLMs) using LangChain. In this tutorial, you will:

1.  Install and import the necessary modules
2.  Configure API keys via environment variables
3.  Initialize and invoke the OpenAI LLM
4.  Swap to Google’s Generative AI (Gemini Pro) on the fly

---

## Prerequisites

- Python 3.7+
- An OpenAI API key ([Get yours here](https://platform.openai.com/signup))
- A Google Cloud API key with access to Gemini Pro

> [!important]
> **Note**
>
> Store your API keys securely. Avoid committing them to version control.

---

## 1\. Imports and Environment Setup

Begin by installing and importing LangChain, the `os` module, and (optionally) the Google GenAI client.

```
pip install langchain langchain_google_genai
```

```
import os
from langchain import OpenAI
# from langchain_google_genai import GoogleGenerativeAI
```

To configure your API keys:

```
# export OPENAI_API_KEY="your_openai_api_key"
# export GOOGLE_API_KEY="your_google_api_key"
```

---

## 2\. Initializing the OpenAI LLM

LangChain’s `OpenAI` class only requires the `OPENAI_API_KEY` environment variable. No additional parameters are needed.

```
# Initialize the OpenAI client
llm = OpenAI()
```

---

## 3\. Defining a Prompt and Generating Text

With the client initialized, craft your prompt and call the model:

```
prompt = "What would be a good company name for a startup that makes educational toys for kids?"
response = llm.invoke(prompt)
print(response)
```

**Sample Output**  
Playful Pals Toys

---

## 4\. Switching to Google Generative AI (Gemini Pro)

LangChain makes it effortless to swap LLM backends. Simply import and initialize the `GoogleGenerativeAI` class:

```
from langchain_google_genai import GoogleGenerativeAI


# Initialize the Gemini Pro client
llm = GoogleGenerativeAI(model="gemini-pro")


# Reuse the same prompt
response = llm.invoke(prompt)
print(response)
```

**Sample Output Suggestions**

1.  Joyful Creations
2.  Imagination Unbound
3.  Wonder & Play

---

## Comparing LLM Clients

| Model             | Initialization Code                            | Environment Variable |
| ----------------- | ---------------------------------------------- | -------------------- |
| OpenAI            | `llm = OpenAI()`                               | `OPENAI_API_KEY`     |
| Google Gemini Pro | `llm = GoogleGenerativeAI(model="gemini-pro")` | `GOOGLE_API_KEY`     |

---

## Next Steps

- Explore [LangChain Documentation](https://langchain.com/docs/) for advanced features
- Integrate embedding models and vector databases
- Automate prompt engineering with chains and agents

> [!important]
> **Warning**
>
> Always monitor your API usage to avoid unexpected charges.

---

## References

- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Google Generative AI (Gemini) Overview](https://cloud.google.com/vertex-ai/docs/generative-ai/overview)
- [LangChain GitHub Repository](https://github.com/langchain-ai/langchain)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/ae260750-791b-496c-991f-0d0333f61e40/lesson/9e76504b-2c1a-48b2-a099-b53c1c5bf71b)**
>
> Watch video content
