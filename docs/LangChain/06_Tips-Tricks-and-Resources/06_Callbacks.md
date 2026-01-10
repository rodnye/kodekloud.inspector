# Callbacks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Tips-Tricks-and-Resources/Callbacks)

---

## Table of Contents

- Callbacks
  - Table of Contents
  - What Are Callbacks?
  - Basic LLMChain without Callbacks
  - Adding a Callback Handler
  - Recap of Logging Techniques
  - Links and References
  - Watch Video

---

## Content

LangChain

Tips Tricks and Resources

# Callbacks

In this guide, you’ll learn how to use callbacks in LangChain to hook into chain events—such as chain start, prompt formatting, and chain completion—to enable custom logging, monitoring, and integrations.

## Table of Contents

1.  [What Are Callbacks?](#what-are-callbacks)
2.  [Basic LLMChain without Callbacks](#basic-llmchain-without-callbacks)
3.  [Adding a Callback Handler](#adding-a-callback-handler)
4.  [Recap of Logging Techniques](#recap-of-logging-techniques)
5.  [Links and References](#links-and-references)

## What Are Callbacks?

A **callback** is a function that runs automatically when specific events occur in a LangChain component. With callbacks you can:

- Log events to stdout, files, or cloud services
- Track prompts and responses for auditing
- Integrate with monitoring platforms (e.g., LangSmith)
- Execute custom logic on chain events

> [!important]
> **Note**
>
> Callbacks provide fine-grained control over how your application logs, monitors, and reacts to chain activities.

## Basic LLMChain without Callbacks

Start with a minimal example that formats a system and user prompt, sends it to the LLM, and returns the result:

```
from langchain.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain.chains import LLMChain


llm = ChatOpenAI()


prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a {subject} teacher"),
    ("human", "Tell me about {concept}")
])


chain = LLMChain(llm=llm, prompt=prompt)


response = chain.invoke({"subject": "physics", "concept": "galaxy"})
print(response)
```

Example response:

```
{
  "subject": "physics",
  "concept": "galaxy",
  "text": "A galaxy is a vast system of stars, gas, dust, and dark matter bound together by gravity. It is the basic building block of the universe..."
}
```

## Adding a Callback Handler

Below, we register LangChain’s standard stdout handler so that chain events are logged to the console.

```
from langchain.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain.chains import LLMChain
from langchain.callbacks import StdOutCallbackHandler


# 1. Create the callback handler
handler = StdOutCallbackHandler()


# 2. Initialize the LLM and prompt
llm = ChatOpenAI()
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a {subject} teacher"),
    ("human", "Tell me about {concept}")
])


# 3. Register the handler with the chain
chain = LLMChain(
    llm=llm,
    prompt=prompt,
    callbacks=[handler]
)


# 4. Invoke the chain; events will be printed to stdout
response = chain.invoke({"subject": "physics", "concept": "galaxy"})
print(response)
```

Example console output:

```
> Entering new LLMChain chain...
Prompt after formatting:
System: You are a physics teacher
Human: Tell me about galaxy


> Finished chain.
{'subject': 'physics', 'concept': 'galaxy', 'text': "A galaxy is a massive, gravitationally bound system..."}
```

With callbacks, you can replace or extend `StdOutCallbackHandler` to:

- Format events as HTML or JSON
- Write logs to files or databases
- Integrate with external monitoring or alerting services

> [!important]
> **Warning**
>
> Custom callback handlers must implement the [`BaseCallbackHandler`](https://github.com/langchain-ai/langchain/blob/master/langchain/callbacks/base.py) interface to ensure compatibility.

## Recap of Logging Techniques

When building production-grade LangChain systems, consider these three approaches:

| Technique                 | Scope               | Configuration Example                                |
| ------------------------- | ------------------- | ---------------------------------------------------- |
| Global debug flag         | Entire `langchain`  | `export LANGCHAIN_DEBUG=true`                        |
| Component-level verbosity | Individual chains   | `LLMChain(..., verbose=True)`                        |
| Callback handlers         | Fine-grained events | `LLMChain(..., callbacks=[StdOutCallbackHandler()])` |

## Links and References

- [LangChain Callbacks Documentation](https://python.langchain.com/docs/modules/callbacks/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/b5f7771a-fdbc-45b1-a786-6c84bb7ffc76/lesson/4e795ffc-63cb-4935-b04e-fb4911326be5)**
>
> Watch video content
