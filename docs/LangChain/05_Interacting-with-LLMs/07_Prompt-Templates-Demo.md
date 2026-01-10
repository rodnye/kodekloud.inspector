# Prompt Templates Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Interacting-with-LLMs/Prompt-Templates-Demo)

---

## Table of Contents

- Prompt Templates Demo
  - Prerequisites and Setup
  - Choosing the Right Prompt Classes
  - 1. Defining Reusable Message Templates
  - 2. Building a ChatPromptTemplate
  - 3. Populating and Formatting the Prompt
  - 4. Invoking the Chat Model
  - 5. Extending with Few-Shot Prompting
  - References
  - Watch Video
  - Practice Lab

---

## Content

LangChain

Interacting with LLMs

# Prompt Templates Demo

Learn how to elevate your prompt engineering by turning messages into reusable **LangChain** prompt templates. This guide shows you how to create, populate, and invoke chat prompts with the OpenAI API using `ChatPromptTemplate`, `SystemMessagePromptTemplate`, and `HumanMessagePromptTemplate`.

## Prerequisites and Setup

Ensure you have the required packages installed:

```
pip install langchain-openai
```

Import the necessary modules and set your OpenAI API key:

```
from langchain_openai import ChatOpenAI
from langchain.prompts import (
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
    ChatPromptTemplate
)
import os


# Make sure your API key is set, for example:
# export OPENAI_API_KEY="your_api_key"
```

> [!important]
> **Note**
>
> Never commit your API key to version control. Use environment variables or a secrets manager.

## Choosing the Right Prompt Classes

LangChain provides several classes to structure your chat prompts. Use the table below as a quick reference:

| Class                       | Purpose                          | Example                                   |
| --------------------------- | -------------------------------- | ----------------------------------------- |
| ChatPromptTemplate          | Combine system & human messages  | `ChatPromptTemplate.from_messages([...])` |
| SystemMessagePromptTemplate | Define system-level instructions | `SystemMessagePromptTemplate(prompt=...)` |
| HumanMessagePromptTemplate  | Template for user-level messages | `HumanMessagePromptTemplate(prompt=...)`  |

For more details, see the [LangChain Prompt Templates documentation](https://python.langchain.com/docs/modules/prompts/prompt_templates).

## 1\. Defining Reusable Message Templates

Start by creating message strings with placeholders:

```
# Template strings with placeholders
sys_msg   = "You are a {subject} teacher"
human_msg = "Tell me about {concept}"
```

These templates aren’t tied to concrete values yet—they’re blueprints for your prompts.

## 2\. Building a ChatPromptTemplate

Use `ChatPromptTemplate.from_messages` to stitch together your system and human templates:

```
prompt_template = ChatPromptTemplate.from_messages([
    ("system", sys_msg),
    ("human",  human_msg)
])
```

At this stage, `prompt_template` holds the structure but lacks the actual `subject` and `concept` values.

## 3\. Populating and Formatting the Prompt

Fill in the placeholders at runtime:

```
filled_messages = prompt_template.format_messages(
    subject="Chemistry",
    concept="Periodic Table"
)
```

Now `filled_messages` contains two messages:

- **System:** “You are a Chemistry teacher”
- **Human:** “Tell me about Periodic Table”

## 4\. Invoking the Chat Model

Send the formatted messages to the OpenAI chat model:

```
model    = ChatOpenAI()
response = model.invoke(filled_messages)
print(response.content)
```

Typical output:

> The Periodic Table is a tabular arrangement of the chemical elements, organized by atomic number, electron configuration, and recurring chemical properties. Rows are called periods, columns are groups, and elements in the same group share similar chemical behaviors.

## 5\. Extending with Few-Shot Prompting

You can embed few-shot examples or custom tones by explicitly composing templates:

```
from langchain.prompts import PromptTemplate


prompt_template = ChatPromptTemplate(
    input_variables=["subject", "concept"],
    messages=[
        SystemMessagePromptTemplate(
            prompt=PromptTemplate(
                input_variables=["subject"],
                template="You are a {subject} teacher"
            )
        ),
        HumanMessagePromptTemplate(
            prompt=PromptTemplate(
                input_variables=["concept"],
                template="Tell me about {concept}"
            )
        )
    ]
)


filled = prompt_template.format_messages(
    subject="Physics",
    concept="Quantum Mechanics"
)


model    = ChatOpenAI()
response = model.invoke(filled)
print(response.content)
```

This pattern makes it easy to add example exchanges or change the model’s persona.

> [!important]
> **Warning**
>
> Few-shot prompting can increase token usage—and cost—so monitor your token counts and model billing.

---

## References

- [LangChain Documentation](https://python.langchain.com/docs/)
- [OpenAI Chat API Reference](https://platform.openai.com/docs/guides/chat)
- [Python Official Site](https://www.python.org/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/ae260750-791b-496c-991f-0d0333f61e40/lesson/857f3912-4a8e-4594-bb30-479d5f303cc8)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/langchain/module/ae260750-791b-496c-991f-0d0333f61e40/lesson/0c1c660e-6569-4b29-b3da-790d279553ff)**
>
> Practice lab
