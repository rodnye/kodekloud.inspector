# LCEL Demo 5 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Introduction-to-LCEL/LCEL-Demo-5)

---

## Table of Contents

- LCEL Demo 5
  - Table of Contents
  - Prerequisites
  - 1. Imports
  - 2. Defining Individual Chains
  - 3. Composing the Content Chain
  - 4. Invoking the Chain
  - 5. Customizing Your LLMs
  - 6. References
  - Watch Video
    - Title Chain
    - Outline Chain
    - Blog Chain
    - Summary Chain

---

## Content

LangChain

Introduction to LCEL

# LCEL Demo 5

In this tutorial, you’ll learn how to compose multiple mini-chains into a single, end-to-end `content_chain` using LangChain. By the end, you will have created a workflow that:

1.  Generates an impactful blog post title
2.  Produces a detailed outline
3.  Writes a 200-word blog post
4.  Crafts a concise summary for social media

Each step is modular, letting you swap models or parsers as needed for maximum flexibility.

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [Imports](#1-imports)
3.  [Defining Individual Chains](#2-defining-individual-chains)
    - [Title Chain](#title-chain)
    - [Outline Chain](#outline-chain)
    - [Blog Chain](#blog-chain)
    - [Summary Chain](#summary-chain)
4.  [Composing the Content Chain](#3-composing-the-content-chain)
5.  [Invoking the Chain](#4-invoking-the-chain)
6.  [Customizing Your LLMs](#5-customizing-your-llms)
7.  [References](#6-references)

## Prerequisites

- Python 3.8+
- An active OpenAI API key
- The `langchain_core` and `langchain_openai` packages installed
- Familiarity with basic LLM concepts

```
pip install langchain_core langchain_openai
```

## 1\. Imports

Begin by importing the necessary classes and functions:

```
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.runnables import RunnablePassthrough
```

## 2\. Defining Individual Chains

Each mini-chain handles one stage of the workflow. We parse the LLM output with `StrOutputParser` and wrap the result in a passthrough runnable to tag it in the next step.

### Title Chain

Generates an engaging title from a raw topic.

```
title = (
    ChatPromptTemplate.from_template("Generate an impactful title for {input}")
    | ChatOpenAI()
    | StrOutputParser()
    | {"title": RunnablePassthrough()}
)
```

### Outline Chain

Creates a detailed outline based on the generated title.

```
outline = (
    ChatPromptTemplate.from_template("Generate a detailed outline for {title}")
    | ChatOpenAI()
    | StrOutputParser()
    | {"outline": RunnablePassthrough()}
)
```

### Blog Chain

Builds a 200-word blog post using the outline.

```
blog = (
    ChatPromptTemplate.from_template(
        "Generate a 200-word blog post based on the outline: {outline}"
    )
    | ChatOpenAI()
    | StrOutputParser()
    | {"blog": RunnablePassthrough()}
)
```

### Summary Chain

Produces a concise, social-media-ready summary from the blog content.

```
summary = (
    ChatPromptTemplate.from_template("Generate a concise summary for the post: {blog}")
    | ChatOpenAI()
    | StrOutputParser()
)
```

> [!important]
> **Note**
>
> Each chain uses the same parser (`StrOutputParser`) and can be extended with custom parsers or validators as needed.

## 3\. Composing the Content Chain

Link the mini-chains in sequence so the output of one stage feeds into the next:

```
content_chain = title | outline | blog | summary
```

## 4\. Invoking the Chain

Run the full workflow by providing a topic. The chain executes each stage in order:

```
result = content_chain.invoke({"input": "The impact of AI on jobs"})
print(result)
```

Depending on your LLM configuration, this multi-step call may take a bit longer than a single API request—but it yields structured, stage-wise outputs.

> [!important]
> **Warning**
>
> Large chains incur multiple API calls. Monitor your usage to avoid unexpected costs.

## 5\. Customizing Your LLMs

You can assign different models to each stage to optimize for speed, cost, or quality. For example:

| Stage   | Task                          | Example Model |
| ------- | ----------------------------- | ------------- |
| Title   | Creative title generation     | Gemini        |
| Outline | Structured outline creation   | GPT-3.5       |
| Blog    | Long-form content (200 words) | GPT-4         |
| Summary | Short social-media summary    | Claude        |

To swap a model, replace `ChatOpenAI()`:

```
from langchain_llms import Gemini


title = (
    ChatPromptTemplate.from_template("…")
    | Gemini()
    | StrOutputParser()
    | {"title": RunnablePassthrough()}
)
```

Then reassemble:

```
content_chain = title | outline | blog | summary
```

## 6\. References

- [LangChain Documentation](https://langchain.com/docs/)
- [OpenAI Chat Models](https://platform.openai.com/docs/models)
- [LangChain GitHub](https://github.com/langchain-ai/langchain)
- [ChatPromptTemplate API](https://langchain.com/docs/api/langchain_core/prompts)

Happy chaining!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/754457c5-1386-422b-98ad-3342dfc6aab3/lesson/1f3becbf-1cff-4ffc-9082-6e462c0617b6)**
>
> Watch video content
