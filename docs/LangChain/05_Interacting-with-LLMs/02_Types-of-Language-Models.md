# Types of Language Models - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Interacting-with-LLMs/Types-of-Language-Models)

---

## Table of Contents

- Types of Language Models
  - 1. Standard Text-Generation LLMs
  - 2. Chat Models
  - Next Steps
  - References
  - Watch Video
    - Typical Chat Flow

---

## Content

LangChain

Interacting with LLMs

# Types of Language Models

Large Language Models (LLMs) power a wide range of AI applications—from single-prompt text generation to full conversational agents. In this lesson, we’ll compare the two main categories of LLMs and demonstrate how LangChain seamlessly integrates both.

## 1\. Standard Text-Generation LLMs

Standard text-generation LLMs process a lone prompt and produce a completion. They’re ideal for tasks like:

- Creative writing (poems, short stories)
- Sentence or idiom completion
- Code snippets and documentation generation

You send a prompt, the model applies its generation algorithm, and it returns a block of text.

| Capability            | Description                            | Example Command                                    |
| --------------------- | -------------------------------------- | -------------------------------------------------- |
| Creative Writing      | Generate narratives, poetry, scripts   | `model.generate("Write a Haiku about spring.")`    |
| Text Completion       | Finish a partial sentence or paragraph | `model.generate("In a world where AI...")`         |
| Code or Documentation | Produce code blocks or technical text  | `model.generate("Implement quicksort in Python.")` |

> [!important]
> **Note**
>
> Standard LLMs excel in single-shot tasks but do not maintain conversational state across multiple inputs.

## 2\. Chat Models

Chat models are LLM variants fine-tuned for multi-turn dialogues. Key differences include:

- **Roles**: Messages are tagged as `system`, `user`, or `assistant`
- **Context History**: Maintains the conversation transcript across turns
- **Persona Configuration**: A `system` message sets tone, rules, or behavior

### Typical Chat Flow

1.  **system**: Sets behavior (e.g., “You are a helpful assistant.”)
2.  **user**: User’s question or instruction
3.  **assistant**: Model’s response

| Feature         | Standard LLM            | Chat Model              |
| --------------- | ----------------------- | ----------------------- |
| Input Format    | Single prompt           | Role-based message list |
| Context Window  | Single-turn only        | Multi-turn with memory  |
| Persona Control | Prompt engineering only | Dedicated `system` role |

> [!important]
> **Warning**
>
> Keep an eye on the token limit for chat models—the full history contributes to usage and may incur additional cost.

Both standard and chat-based LLMs are fully supported in LangChain. You can switch between them using the same notebook and API patterns.

---

## Next Steps

Now that you understand the distinction between standard text-generation LLMs and chat models, let’s dive into hands-on examples with LangChain:

- Initialize a text-generation chain
- Build a conversational agent with memory
- Compare responses and performance

## References

- [LangChain Documentation](https://langchain.com/docs/)
- [OpenAI API Models](https://platform.openai.com/docs/models)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/ae260750-791b-496c-991f-0d0333f61e40/lesson/46332dc3-f81b-4b21-bd67-574c6a4de70a)**
>
> Watch video content
