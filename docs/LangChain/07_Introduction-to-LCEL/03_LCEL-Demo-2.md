# LCEL Demo 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Introduction-to-LCEL/LCEL-Demo-2)

---

## Table of Contents

- LCEL Demo 2
  - 1. Synchronous Invocation (invoke)
  - 2. Streaming Output (stream)
  - 3. Batch Processing (batch)
  - Invocation Methods Comparison
  - What’s Next?
  - Links and References
  - Watch Video

---

## Content

LangChain

Introduction to LCEL

# LCEL Demo 2

Before diving into the **runnable interface** and **pass-through components**, this lesson reviews three primary ways to invoke a chain in LangChain:

- Synchronous invocation (`invoke`)
- Streaming output (`stream`)
- Batch processing (`batch`)

---

## 1\. Synchronous Invocation (`invoke`)

Execute the entire chain in one call and receive the complete response:

```
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser


# 1. Construct prompt, LLM, and parser
prompt = ChatPromptTemplate.from_template(
    "You are a helpful assistant.\nAnswer the following question: {question}"
)
llm = ChatOpenAI()
output_parser = StrOutputParser()


# 2. Build the chain
chain = prompt | llm | output_parser


# 3. Invoke synchronously
result = chain.invoke({"question": "Tell me about The Godfather Movie"})
print(result)
```

> [!important]
> **Note**
>
> `chain.invoke(...)` will block until the LLM has generated the full response. Use this for simpler or short-prompt scenarios.

---

## 2\. Streaming Output (`stream`)

When you need a “typing” effect or to process tokens on the fly, use streaming:

```
for chunk in chain.stream({"question": "Tell me about The Godfather Movie"}):
    # Print each chunk without extra newlines
    print(chunk, end="")
```

Example of streamed chunks:

```
The God
father is
a classic
American
crime
film
directed
by Francis...
```

> [!important]
> **Warning**
>
> Streaming large models can generate many tokens. Monitor your usage and consider rate limits.

---

## 3\. Batch Processing (`batch`)

Process multiple inputs in parallel to improve throughput:

```
questions = [
    {"question": "What is LangChain?"},
    {"question": "Explain chain-of-thought prompting."},
    {"question": "How does streaming work?"}
]
results = chain.batch(questions)
for response in results:
    print(response)
```

Batch execution is ideal for high-volume workloads and will be explored further alongside parallelism patterns.

---

## Invocation Methods Comparison

| Method | Description                               | Example                          |
| ------ | ----------------------------------------- | -------------------------------- |
| invoke | Synchronous, returns full result          | `chain.invoke({...})`            |
| stream | Yields tokens/chunks as they’re generated | `for chunk in chain.stream(...)` |
| batch  | Runs multiple inputs concurrently         | `chain.batch([{…}, {…}])`        |

---

## What’s Next?

In the following sections, we’ll explore:

- The **Runnable Interface**: How to wrap custom logic into reusable components
- **Pass-Through Components**: Techniques for chaining without transforming the data

---

## Links and References

- [LangChain Documentation](https://python.langchain.com/)
- [langchain-openai on GitHub](https://github.com/langchain-ai/langchain)
- [ChatPromptTemplate API](https://python.langchain.com/en/latest/modules/prompts.html)
- [StrOutputParser Guide](https://python.langchain.com/en/latest/modules/output_parsers.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/754457c5-1386-422b-98ad-3342dfc6aab3/lesson/73409062-5bca-4e9b-86cf-48d797f1050b)**
>
> Watch video content
