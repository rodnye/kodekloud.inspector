# Setting up Environment - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Interacting-with-LLMs/Setting-up-Environment)

---

## Table of Contents

- Setting up Environment
  - Prerequisites
  - Next Steps
  - Watch Video
    - Dependency Versions
    - Installing Dependencies
    - Configuring Your API Key

---

## Content

LangChain

Interacting with LLMs

# Setting up Environment

Welcome to this lesson on interacting with large language models using LangChain. In this module, we’ll explore the **Model I/O** layer—the essential bridge between your application and the LLM. By the end of this guide, you’ll be able to:

- Craft effective prompts
- Format and transform model responses
- Parse and process output programmatically

![The image is a welcome slide with a gradient background, listing three topics: understanding prompt engineering, formatting and transforming responses, and interacting with a large language model.](https://kodekloud.com/kk-media/image/upload/v1752880976/notes-assets/images/LangChain-Setting-up-Environment/welcome-slide-prompt-engineering-topics.jpg)

Model I/O focuses on three core capabilities:

1.  **Prompt Invocation:** Techniques for engineering prompts
2.  **Response Formatting:** Structuring outputs for downstream tasks
3.  **Parsing & Transformation:** Converting raw text into data structures

---

## Prerequisites

Before diving in, ensure you meet the following requirements:

![The image is a slide titled "Prerequisites" with a blue gradient background, listing "Install the Libraries" and "Follow the Versions" as key points.](https://kodekloud.com/kk-media/image/upload/v1752880976/notes-assets/images/LangChain-Setting-up-Environment/prerequisites-slide-blue-gradient-libraries-versions.jpg)

- Python 3.8+ installed
- An [OpenAI API key](https://platform.openai.com/account/api-keys) stored in an environment variable
- Exact versions of dependencies to avoid compatibility issues

> [!important]
> **Warning**
>
> LangChain is under active development. Installing the specified versions ensures consistency with this tutorial.

### Dependency Versions

| Package             | Version | Installation Command                  |
| ------------------- | ------- | ------------------------------------- |
| langchain           | 0.1.10  | `pip install langchain==0.1.10`       |
| langchain\\\_openai | 0.0.8   | `pip install langchain_openai==0.0.8` |
| openai              | 1.13.3  | `pip install openai==1.13.3`          |

### Installing Dependencies

Run the following commands in your terminal:

```
pip install langchain==0.1.10
pip install langchain_openai==0.0.8
pip install openai==1.13.3
```

### Configuring Your API Key

Set your OpenAI API key as an environment variable:

```
export OPENAI_API_KEY=YOUR_OPENAI_API_KEY
```

> [!important]
> **Note**
>
> If you’re using the KodeKloud labs environment, you can configure `OPENAI_API_KEY` directly through the labs interface. Refer to your lab’s documentation for details.

---

## Next Steps

With your environment ready, you can now:

1.  Invoke the LLM via prompt engineering
2.  Format responses into JSON, Markdown, or custom schemas
3.  Parse outputs into Python objects for further processing

For more information, see:

- [LangChain Documentation](https://github.com/hwchase17/langchain)
- [OpenAI Python Library](https://github.com/openai/openai-python)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/ae260750-791b-496c-991f-0d0333f61e40/lesson/5f40ca43-ec72-4c68-a0df-06085674863e)**
>
> Watch video content
