# History - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Building-Blocks-of-LLM-Apps/History)

---

## Table of Contents

- History
  - Summary of LLM Application Building Blocks
  - Watch Video

---

## Content

LangChain

Building Blocks of LLM Apps

# History

History is a crucial component of LLM-based applications because it preserves both the prompt and the model’s response, enabling conversations to continue smoothly. Much like revisiting an email chain from two months ago to refresh your context before replying, maintaining history lets you return to an earlier thread, pick up where you left off, and carry on the interaction seamlessly.

By feeding this history back to the LLM, the model gains the background it needs to generate responses that align with previous exchanges. Beyond retaining context, history also plays a vital role in auditing and tracing conversations. In organizations with strict compliance requirements, every prompt and response exchanged between users and LLMs must be stored, reviewed, and traceable.

> [!important]
> **Note**
>
> Storing conversation history supports features like thread revival, context refresh, and compliance auditing.

![The image illustrates the concept of email history, showing a sequence of emails and highlighting its usefulness in auditing and tracing conversations.](https://kodekloud.com/kk-media/image/upload/v1752880957/notes-assets/images/LangChain-History/email-history-sequence-auditing-diagram.jpg)

Beyond simple memory retention, history ensures auditability, traceability, and compliance across your entire LLM workflow.

## Summary of LLM Application Building Blocks

To see how history fits into the broader LLM workflow, here are the key components:

| Component      | Description                                          | Role                                            |
| -------------- | ---------------------------------------------------- | ----------------------------------------------- |
| Prompt         | The user’s input or instruction                      | Initiates processing by the Language Model      |
| Context        | Additional information (such as history or metadata) | Enhances the prompt for more accurate responses |
| Language Model | The underlying AI engine (e.g., GPT, LLaMA)          | Processes prompt and context                    |
| Response       | The model’s output                                   | Delivered result, which may require formatting  |
| History        | Recorded prompts and responses                       | Provides continuity, audit logs, and compliance |

![The image is a flowchart illustrating the key building blocks of an LLM (Large Language Model) application, including user, application, context, language model, prompt, response, and history.](https://kodekloud.com/kk-media/image/upload/v1752880958/notes-assets/images/LangChain-History/llm-application-flowchart-building-blocks.jpg)

LangChain empowers developers to orchestrate these components seamlessly. In the next sections, we’ll dive deeper into LangChain’s features—covering prompt templates, memory modules, and chaining utilities.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/bb8afda8-9de9-4865-aabf-bc71786440b2/lesson/e76a9074-ea53-468a-8ccf-c22fb4d1758c)**
>
> Watch video content
