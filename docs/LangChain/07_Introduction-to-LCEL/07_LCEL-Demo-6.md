# LCEL Demo 6 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Introduction-to-LCEL/LCEL-Demo-6)

---

## Table of Contents

- LCEL Demo 6
  - 1. Creating a Basic LCEL Chain
  - 2. Adding Custom Transformations
  - 3. Computing Metrics with Custom Logic
  - 4. Inspecting Your Chain with Grandalf
  - 5. Next Steps
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

LangChain

Introduction to LCEL

# LCEL Demo 6

In this lesson, we dive into advanced LCEL patterns by injecting custom logic into your pipelines and inspecting their internal structure. You’ll learn how to:

- Build a basic LCEL chain.
- Wrap Python functions as `RunnableLambda` components.
- Debug and compute additional metrics.
- Visualize and explore your chain graph with `grandalf`.

## 1\. Creating a Basic LCEL Chain

Start by defining a simple chain that generates a one-line description for any topic using OpenAI’s Chat API:

```
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser


prompt = ChatPromptTemplate.from_template("Give me a one-line description of {topic}")
model = ChatOpenAI()
output_parser = StrOutputParser()


chain = prompt | model | output_parser


result = chain.invoke({"topic": "AI"})
print(result)
# 'AI is the simulation of human intelligence processes by machines, especially computer systems.'
```

| Component          | Purpose                          | Example                                  |
| ------------------ | -------------------------------- | ---------------------------------------- |
| ChatPromptTemplate | Build the prompt from a template | `from_template("Give me a one-line...")` |
| ChatOpenAI         | Call the OpenAI chat model       | `ChatOpenAI()`                           |
| StrOutputParser    | Parse the raw LLM output         | `StrOutputParser()`                      |

## 2\. Adding Custom Transformations

You can seamlessly insert your own Python functions into the chain as `RunnableLambda` components.

```
def to_titlecase(text: str) -> str:
    return text.title()


chain = prompt | model | output_parser | RunnableLambda(to_titlecase)


titlecased = chain.invoke({"topic": "AI"})
print(titlecased)
# 'Ai Is The Simulation Of Human Intelligence Processes By Machines, Especially Computer Systems.'
```

> [!important]
> **Note**
>
> Use `RunnableLambda` to wrap any pure Python function and inject it at any stage of your chain.

## 3\. Computing Metrics with Custom Logic

You can further extend the pipeline to compute metrics like text length. Here’s an example that also prints the intermediate value for debugging:

```
def get_len(text: str) -> int:
    print(text)  # debug print
    return len(text)


chain = (
    prompt
    | model
    | output_parser
    | RunnableLambda(to_titlecase)
    | RunnableLambda(get_len)
)


length = chain.invoke({"topic": "AI"})
# Prints: 'Ai Is The Simulation Of Human Intelligence Processes By Machines, Especially Computer Systems.'
print(length)
# 94
```

> [!important]
> **Warning**
>
> Remember to remove or disable debug `print` statements in production to avoid cluttering your logs.

## 4\. Inspecting Your Chain with Grandalf

To explore the internal graph of your LCEL chain, install the `grandalf` package:

```
pip install grandalf  # Inspect LCEL chain structure
```

Retrieve and print the raw graph:

```
graph = chain.get_graph()
print(graph)
```

For a clearer hierarchical view, render it as ASCII art:

```
chain.get_graph().print_ascii()
```

![The image shows a Jupyter Notebook interface with a flowchart diagram illustrating a sequence of components, including "ChatPromptTemplate," "ChatOpenAI," "StrOutputParser," and two lambda functions.](https://kodekloud.com/kk-media/image/upload/v1752880977/notes-assets/images/LangChain-LCEL-Demo-6/jupyter-notebook-flowchart-chat-components.jpg)

```
+---------------------------+
|       PromptInput         |
+---------------------------+
|           *               |
+---------------------------+
|   ChatPromptTemplate      |
+---------------------------+
|           *               |
+---------------------------+
|        ChatOpenAI         |
+---------------------------+
|           *               |
+---------------------------+
|     StrOutputParser       |
+---------------------------+
|           *               |
+---------------------------+
| RunnableLambda(to_titlecase) |
+---------------------------+
|           *               |
+---------------------------+
|   RunnableLambda(get_len) |
+---------------------------+
```

This ASCII diagram illustrates the data flow from prompt generation through model invocation, parsing, custom transformations, and final metric calculation.

## 5\. Next Steps

With custom runnables and introspection in your toolkit, you can combine multiple chains, integrate external APIs, and build complex, maintainable workflows in LCEL.

---

## Links and References

- [LangChain Core Prompts](https://python.langchain.com/docs/modules/models/prompts)
- [LangChain OpenAI Integration](https://python.langchain.com/docs/integrations/openai)
- [Grandalf on PyPI](https://pypi.org/project/grandalf/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/754457c5-1386-422b-98ad-3342dfc6aab3/lesson/bd770c51-e411-479e-89f1-5c6fd2762abd)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/langchain/module/754457c5-1386-422b-98ad-3342dfc6aab3/lesson/d51c42c5-aefd-4edd-a892-ad0294da5d82)**
>
> Practice lab
