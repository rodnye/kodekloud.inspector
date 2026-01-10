# Dealing with Memory - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Adding-Memory-to-LLM-Apps/Dealing-with-Memory)

---

## Table of Contents

- Dealing with Memory
  - 1. Base Chain Setup: Prompt + OpenAI Model
  - 2. Persisting Message History with Redis
  - 3. Running Conversation Threads
  - 4. Inspecting Stored Data in Redis
  - 5. Resuming Conversations After Restart
  - 6. Memory Types Comparison
  - 7. Summary
  - Links and References
  - Watch Video
  - Practice Lab
    - 3.1 Math Thread
    - 3.2 Physics Thread

---

## Content

LangChain

Adding Memory to LLM Apps

# Dealing with Memory

In this tutorial, we’ll enhance our in-memory chat history demo by persisting conversation context in Redis. Externalizing message history enables multi-session, multi-tenant applications that can resume context across restarts and deployments.

## 1\. Base Chain Setup: Prompt + OpenAI Model

Begin by importing the core components and defining a base chain that combines a prompt template with an OpenAI chat model:

```
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai.chat_models import ChatOpenAI

model = ChatOpenAI()
prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        "You’re an assistant skilled in {ability}. Keep responses under 20 words.",
    ),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}"),
])
base_chain = prompt | model
```

## 2\. Persisting Message History with Redis

To support long-term memory, we’ll store each session’s chat history in Redis.

```
from langchain_community.chat_message_histories import RedisChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
```

Define your Redis connection and a helper function to instantiate a `RedisChatMessageHistory` per session:

```
REDIS_URL = "redis://localhost:6379/0"

def get_message_history(session_id: str) -> RedisChatMessageHistory:
    return RedisChatMessageHistory(session_id, url=REDIS_URL)
```

> [!important]
> **Note**
>
> Make sure a Redis server is running at `localhost:6379` or update `REDIS_URL` to match your configuration.

Wrap the base chain in a `RunnableWithMessageHistory` to automatically load and save chat history:

```
redis_chain = RunnableWithMessageHistory(
    base_chain,
    get_message_history,
    input_messages_key="input",
    history_messages_key="history",
)
```

## 3\. Running Conversation Threads

Each thread represents a separate session. Let’s demonstrate with two threads: **math** and **physics**.

### 3.1 Math Thread

```
# Start math session
redis_chain.invoke(
    {"ability": "math", "input": "What does cosine mean?"},
    config={"configurable": {"session_id": "math-thread1"}},
)
# Follow-up in the same session
redis_chain.invoke(
    {"ability": "math", "input": "Tell me more!"},
    config={"configurable": {"session_id": "math-thread1"}},
)
# → AIMessage: It oscillates between -1 and 1 and is key in wave analysis.
```

### 3.2 Physics Thread

```
# Start physics session
redis_chain.invoke(
    {"ability": "physics", "input": "What is the theory of relativity?"},
    config={"configurable": {"session_id": "phy-thread1"}},
)
# Follow-up in the same session
redis_chain.invoke(
    {"ability": "physics", "input": "Tell me more!"},
    config={"configurable": {"session_id": "phy-thread1"}},
)
# → AIMessage: Einstein’s theory unifies mass–energy equivalence and spacetime curvature.
```

## 4\. Inspecting Stored Data in Redis

You can explore stored message lists directly within Redis.

```
# Ensure Redis container is running
docker ps

# Enter the Redis CLI
docker exec -it <container_id> sh
redis-cli

# List all session keys
127.0.0.1:6379> KEYS *
1) "message_store:math-thread1"
2) "message_store:phy-thread1"
```

View the math thread history:

```
127.0.0.1:6379> LRANGE message_store:math-thread1 0 -1
```

View the physics thread:

```
127.0.0.1:6379> LRANGE message_store:phy-thread1 0 -1
```

## 5\. Resuming Conversations After Restart

After a restart or in a new notebook, simply re-import and re-create `redis_chain`. Invocations with existing session IDs will automatically load prior context:

```
# Resume math thread
redis_chain.invoke(
    {"ability": "math", "input": "Tell me more!"},
    config={"configurable": {"session_id": "math-thread1"}},
)
# Resume physics thread
redis_chain.invoke(
    {"ability": "physics", "input": "Tell me more!"},
    config={"configurable": {"session_id": "phy-thread1"}},
)
# → AIMessage: There are special and general relativity covering inertial and accelerated frames.
```

Swapping session IDs lets you switch contexts on the fly:

```
redis_chain.invoke(
    {"ability": "math", "input": "Tell me more!"},
    config={"configurable": {"session_id": "phy-thread1"}},  # loads physics history
)
```

## 6\. Memory Types Comparison

| Memory Type       | Scope           | Persistence        | Use Case                                             |
| ----------------- | --------------- | ------------------ | ---------------------------------------------------- |
| Short-Term        | In-process only | Volatile           | Single-session demos, rapid prototyping              |
| Long-Term (Redis) | Multi-session   | Persistent (Redis) | Multi-tenant apps, context resumption after restarts |

## 7\. Summary

- **Short-term memory**: Uses an in-memory list; lost on restart.
- **Long-term memory**: Persists chat history externally (Redis) via `RunnableWithMessageHistory`.
- Supports multi-session and multi-tenant LLM applications with seamless context resumption.

Next, explore **retrieval-augmented generation (RAG)** to integrate external documents with LangChain.

## Links and References

- [LangChain Documentation](https://langchain.readthedocs.io/)
- [Redis Documentation](https://redis.io/documentation)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [RunnableWithMessageHistory Source](https://github.com/langchain-ai/langchain/tree/master/langchain_core/runnables/history)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/abd1e527-3f6e-4e04-b421-3b1f8de5c69d/lesson/ee70a555-9bfa-40d9-baa8-34ee1b0ba7fe)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/langchain/module/abd1e527-3f6e-4e04-b421-3b1f8de5c69d/lesson/ad49baa3-64cc-4e0a-9c72-d34695c3d8d0)**
>
> Practice lab
