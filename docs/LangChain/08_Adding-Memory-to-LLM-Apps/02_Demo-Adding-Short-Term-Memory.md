# Demo Adding Short Term Memory - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Adding-Memory-to-LLM-Apps/Demo-Adding-Short-Term-Memory)

---

## Table of Contents

- Demo Adding Short Term Memory
  - 1. Stateless Prompt: No Memory
  - 2. Adding a History Placeholder
  - 3. Putting It All Together
  - 4. Sending Configurable Parameters
  - Comparison: Stateless vs. Memory-Enabled
  - Links and References
  - Watch Video
    - 2.1 Constructing the History
    - 2.2 Invoking with History

---

## Content

LangChain

Adding Memory to LLM Apps

# Demo Adding Short Term Memory

In this tutorial, you’ll learn how to build a simple memory (conversation history) feature into a chatbot using LangChain. We’ll start with a stateless prompt, observe why follow-up questions break, then enhance our chain to carry context across messages for a more natural dialogue.

## 1\. Stateless Prompt: No Memory

First, let’s define a minimal chat chain without any history support:

```
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai.chat_models import ChatOpenAI


model = ChatOpenAI()
prompt = ChatPromptTemplate.from_messages([
    ("system", "You’re an assistant with expertise in {ability}."),
    ("human", "{input}"),
])
base_chain = prompt | model
```

Invoke it twice—once to ask about right-angled triangles, then a follow-up without context:

```
# First call: establishing the topic
response1 = base_chain.invoke({
    "ability": "math",
    "input":   "What’s a right-angled triangle?"
})
print(response1.content)
# Second call: follow-up without history
response2 = base_chain.invoke({
    "ability": "math",
    "input":   "What are the other types?"
})
print(response2.content)
# ➜ "Could you please clarify what you’re asking about?"
```

> [!important]
> **Warning**
>
> Without passing previous messages, the model has no context to answer follow-up questions.

## 2\. Adding a History Placeholder

To maintain context, inject a `MessagesPlaceholder` into your prompt template:

```
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai.chat_models import ChatOpenAI


model = ChatOpenAI()
prompt = ChatPromptTemplate.from_messages([
    ("system", "You’re an assistant with expertise in {ability}."),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}"),
])
base_chain = prompt | model
```

### 2.1 Constructing the History

Build a simple list of `(role, content)` tuples that tracks the dialogue so far:

```
history = [
    ("human", "What’s a right-angled triangle?"),
    ("ai",    "A right-angled triangle has one angle of 90 degrees, "
              "with the other two angles summing to 90 degrees."),
]
```

### 2.2 Invoking with History

Pass the `history` on each request to provide context:

```
response = base_chain.invoke({
    "ability": "math",
    "input":   "What are the other types?",
    "history": history
})
print(response.content)
# ➜ "Other types of triangles include equilateral (all sides equal), "
#     "isosceles (two sides equal), and scalene (no sides equal)."
```

By supplying the `history` key, the chain can reference previous turns and answer accurately.

## 3\. Putting It All Together

Here’s the complete, memory-enabled chatbot example:

```
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai.chat_models import ChatOpenAI


model = ChatOpenAI()
prompt = ChatPromptTemplate.from_messages([
    ("system", "You’re an assistant who’s good at {ability}."),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}"),
])
base_chain = prompt | model


history = [
    ("human", "What’s a right-angled triangle?"),
    ("ai",    "A right-angled triangle has one angle of 90 degrees, "
              "with the other two angles summing to 90 degrees.")
]


result = base_chain.invoke({
    "ability": "math",
    "input":   "What are the other types?",
    "history": history
})
print(result.content)
```

## 4\. Sending Configurable Parameters

You can also include adjustable parameters—like response length limits—directly in your system prompt:

```
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_openai.chat_models import ChatOpenAI


model = ChatOpenAI()
prompt = ChatPromptTemplate.from_messages([
    ("system", "You’re an assistant who’s good at {ability}. Respond in 20 words or fewer."),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}"),
])
base_chain = prompt | model


history = [
    ("human", "What’s a right-angled triangle?"),
    ("ai",    "A right-angled triangle has one angle of 90 degrees, "
              "with the other two angles summing to 90 degrees.")
]


response = base_chain.invoke({
    "ability": "math",
    "input":   "What are the other types?",
    "history": history
})
print(response.content)
```

## Comparison: Stateless vs. Memory-Enabled

| Prompt Type    | Behavior                | Use Case                           |
| -------------- | ----------------------- | ---------------------------------- |
| Stateless      | No context recall       | One-off Q&A                        |
| Memory-Enabled | Remembers past messages | Multi-turn conversations, chatbots |

## Links and References

- [LangChain Documentation](https://langchain.com/docs/)
- [OpenAI Chat Models](https://platform.openai.com/docs/guides/chat)
- [MessagesPlaceholder API](https://langchain.com/docs/modules/prompts/templates/messagesplaceholder)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/abd1e527-3f6e-4e04-b421-3b1f8de5c69d/lesson/2b05e60c-8398-432c-8215-1bb3a9e64cb5)**
>
> Watch video content
