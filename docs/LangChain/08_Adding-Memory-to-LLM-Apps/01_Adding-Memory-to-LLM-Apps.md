# Adding Memory to LLM Apps - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Adding-Memory-to-LLM-Apps/Adding-Memory-to-LLM-Apps)

---

## Table of Contents

- Adding Memory to LLM Apps
  - Why History Matters
  - Memory Types
  - Next Steps
  - Links and References
  - Watch Video
    - Short-Term Memory
    - Long-Term Memory

---

## Content

LangChain

Adding Memory to LLM Apps

# Adding Memory to LLM Apps

In this lesson, we'll enhance your LLM-based application by introducing memory capabilities that maintain conversational continuity. A central component in any LLM architecture is **history**, which keeps track of past exchanges between the user and the model.

![The image is a flowchart illustrating the interaction between a user, an application, a language model, and context, with a focus on prompts, responses, and history.](https://kodekloud.com/kk-media/image/upload/v1752880934/notes-assets/images/LangChain-Adding-Memory-to-LLM-Apps/user-application-language-model-flowchart.jpg)

## Why History Matters

Enterprise-grade chatbots—like ChatGPT—depend on stored context to resume conversations seamlessly. Since LLMs are inherently stateless, each new query loses all prior session details unless you explicitly include them.

![The image shows a "Chat GPT" logo with the label "Stateless" and a speech bubble icon, under the heading "History."](https://kodekloud.com/kk-media/image/upload/v1752880935/notes-assets/images/LangChain-Adding-Memory-to-LLM-Apps/chat-gpt-stateless-history-speech-bubble.jpg)

> [!important]
> **Warning**
>
> If you omit previous messages from the input, the model treats every prompt in isolation. This can lead to incoherent replies or hallucinations.

To preserve context, every request must bundle in the earlier conversation thread. By doing so, the LLM can reference past discussions and produce coherent, context-aware responses.

![The image features three purple chat bubbles of varying sizes, each with three dots, arranged vertically. The words "History" and "Context" are also present, with a copyright notice for KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752880936/notes-assets/images/LangChain-Adding-Memory-to-LLM-Apps/purple-chat-bubbles-history-context.jpg)

## Memory Types

LLM apps generally leverage two forms of memory:

| Memory Type | Scope          | Persistence                           |
| ----------- | -------------- | ------------------------------------- |
| Short-term  | Single session | Volatile (stored in RAM)              |
| Long-term   | Cross sessions | Durable (persisted in external store) |

![The image illustrates three types of memory: short-term memory stored in RAM, history, and long-term memory stored outside the application.](https://kodekloud.com/kk-media/image/upload/v1752880937/notes-assets/images/LangChain-Adding-Memory-to-LLM-Apps/memory-types-short-term-long-term-illustration.jpg)

### Short-Term Memory

- Lives only in RAM during a session.
- Ideal for quick back-and-forth where data retention ends when the session closes.

### Long-Term Memory

- Persisted in an external database.
- Ensures conversations can resume even after days or weeks.

![The image illustrates the concept of "Long-Term Memory" with icons for Redis and SQLite, suggesting their use in this context.](https://kodekloud.com/kk-media/image/upload/v1752880938/notes-assets/images/LangChain-Adding-Memory-to-LLM-Apps/long-term-memory-redis-sqlite-icons.jpg)

> [!important]
> **Note**
>
> While this lesson uses Redis for demonstration—thanks to its speed and simplicity—you can apply the same patterns to any persistent store, such as SQLite, PostgreSQL, or vector databases.

## Next Steps

With these concepts in place, you’re ready to implement a Redis-backed memory store for your LLM application. In the upcoming lesson, we’ll walk through the integration code, how to serialize conversation history, and best practices for managing token usage.

---

## Links and References

- [Redis](https://redis.io)
- [SQLite](https://www.sqlite.org)
- [Understanding LLM Statelessness](https://arxiv.org/abs/2302.02866)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/abd1e527-3f6e-4e04-b421-3b1f8de5c69d/lesson/e48e21f4-e63a-4cc1-83b3-5f4d6c5582c3)**
>
> Watch video content
