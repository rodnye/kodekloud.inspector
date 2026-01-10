# Memory - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Key-Components-of-LangChain/Memory)

---

## Table of Contents

- Memory
  - Memory Types
  - What’s Next
  - Watch Video
    - Short-term Memory
    - Long-term Memory

---

## Content

LangChain

Key Components of LangChain

# Memory

LangChain enhances stateless LLMs by introducing two memory modules—short-term and long-term—so your applications can remember past interactions. By default, a large language model treats each prompt independently, forgetting previous exchanges. LangChain’s memory abstractions fix this, enabling more dynamic and context-aware agents.

## Memory Types

| Memory Type | Description                                                                     | Storage Examples          |
| ----------- | ------------------------------------------------------------------------------- | ------------------------- |
| Short-term  | Tracks conversation history during a single session by appending each exchange. | In-memory buffer          |
| Long-term   | Persists select interactions across sessions for later recall.                  | SQLite, Redis, text files |

![The image is a diagram illustrating a memory system involving a user, memory storage, a language model, and external databases like SQLite and Redis.](https://kodekloud.com/kk-media/image/upload/v1752880987/notes-assets/images/LangChain-Memory/memory-system-user-storage-diagram.jpg)

### Short-term Memory

Short-term memory keeps track of user inputs and LLM responses only while the session is active. Each exchange is stored in an in-memory buffer, preserving conversational context within a single runtime.

> [!important]
> **Note**
>
> Use short-term memory for interactive applications like chatbots or live Q&A, where context only matters during the current session.

### Long-term Memory

Long-term memory saves important conversation snippets to an external store, allowing your agent to recall them across sessions. You can back this with any supported database or file system, such as [SQLite](https://sqlite.org), [Redis](https://redis.io), or a plain text file.

> [!important]
> **Warning**
>
> When storing sensitive data, implement encryption and proper access controls to protect user privacy.

## What’s Next

In the following sections, we’ll walk through configuring and using both short-term and long-term memory in LangChain, complete with code examples and best practices.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/5bedac05-3eaa-4d0d-9892-e05b80c528fb/lesson/87a18942-f7f0-43fa-a0c4-ceed571b426d)**
>
> Watch video content
