# Few shot Prompt Templates - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Interacting-with-LLMs/Few-shot-Prompt-Templates)

---

## Table of Contents

- Few shot Prompt Templates
  - Table of Contents
  - 1. Prerequisites
  - 2. Defining Examples
  - 3. Creating an Example Prompt
  - 4. Building the Few-Shot Prompt
  - 5. Assembling the Chat Prompt Template
  - 6. Inspecting the Prompt Structure
  - 7. Formatting for Invocation
  - 8. Invoking the Model
  - 9. References
  - Watch Video
  - Practice Lab

---

## Content

LangChain

Interacting with LLMs

# Few shot Prompt Templates

Few-shot prompting is a powerful technique that teaches a language model a specific pattern by providing a handful of examples at runtime. This approach avoids hardcoding lengthy instructions and lets the LLM infer the desired transformation from context.

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [Defining Examples](#defining-examples)
3.  [Creating an Example Prompt](#creating-an-example-prompt)
4.  [Building the Few-Shot Prompt](#building-the-few-shot-prompt)
5.  [Assembling the Chat Prompt Template](#assembling-the-chat-prompt-template)
6.  [Inspecting the Prompt Structure](#inspecting-the-prompt-structure)
7.  [Formatting for Invocation](#formatting-for-invocation)
8.  [Invoking the Model](#invoking-the-model)
9.  [References](#references)

---

## 1\. Prerequisites

Install the required packages and set your OpenAI API key:

```
pip install langchain langchain_openai
```

```
export OPENAI_API_KEY="your_api_key_here"
```

> [!important]
> **Warning**
>
> Never commit your API keys to version control. Use environment variables or a secret manager instead.

```
from langchain.prompts import (
    ChatPromptTemplate,
    FewShotChatMessagePromptTemplate,
)
from langchain_openai import ChatOpenAI
```

---

## 2\. Defining Examples

Prepare a small list of example pairs. Each item maps an `input` (country name) to its `output` (the reversed string):

```
examples = [
    {"input": "India",     "output": "aidnI"},
    {"input": "Canada",    "output": "adanaC"},
    {"input": "Australia", "output": "ailartsuA"},
]
```

---

## 3\. Creating an Example Prompt

Use `ChatPromptTemplate` to describe how each example should appear in the conversation:

```
example_prompt = ChatPromptTemplate.from_messages(
    [
        ("human", "{input}"),
        ("ai",    "{output}"),
    ]
)
```

---

## 4\. Building the Few-Shot Prompt

Combine your individual example template with the list of examples via `FewShotChatMessagePromptTemplate`:

```
few_shot_prompt = FewShotChatMessagePromptTemplate(
    example_prompt=example_prompt,
    examples=examples,
)
```

---

## 5\. Assembling the Chat Prompt Template

Wrap the system instruction, the few-shot examples, and the final human query into a single `ChatPromptTemplate`:

```
prompt_template = ChatPromptTemplate.from_messages(
    [
        ("system", "You are a linguistic specialist."),
        few_shot_prompt,
        ("human",  "{input}"),
    ]
)
```

---

## 6\. Inspecting the Prompt Structure

Print out the internal representation to verify the sequence of messages:

```
print(prompt_template)
```

This helps ensure your prompt layout and placeholders are correct.

---

## 7\. Formatting for Invocation

Populate the template with a new input—e.g., `"Brazil"`—to generate the messages you’ll send to the LLM:

```
messages = prompt_template.format_messages(input="Brazil")
print(messages)
```

Example output:

```
[
  SystemMessage(content='You are a linguistic specialist.'),
  HumanMessage(content='India'),
  AIMessage(content='aidnI'),
  HumanMessage(content='Canada'),
  AIMessage(content='adanaC'),
  HumanMessage(content='Australia'),
  AIMessage(content='ailartsuA'),
  HumanMessage(content='Brazil'),
]
```

---

## 8\. Invoking the Model

Pass the formatted messages to the `ChatOpenAI` model and print the response:

```
model = ChatOpenAI()
response = model.invoke(messages)
print(response.content)
```

Expected result:

```
'lizarB'
```

Notice the model inferred the reverse‐text pattern purely from examples—no explicit instruction was needed.

> [!important]
> **Note**
>
> You can adapt this structure to teach any pattern by changing the `system` role or example pairs.

---

## 9\. References

- [LangChain Prompt Templates](https://langchain.readthedocs.io/en/latest/modules/prompts.html)
- [OpenAI Python SDK](https://github.com/openai/openai-python)
- [Few-Shot Learning on Wikipedia](https://en.wikipedia.org/wiki/Few-shot_learning)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/ae260750-791b-496c-991f-0d0333f61e40/lesson/e2f5f01a-0ea8-4905-8b0b-29d174baedb8)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/langchain/module/ae260750-791b-496c-991f-0d0333f61e40/lesson/c6cfbec7-d94d-4eaa-990e-4845b4b0ab5b)**
>
> Practice lab
