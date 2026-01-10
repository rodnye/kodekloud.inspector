# Using Document Chain - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Implementing-Chains/Using-Document-Chain)

---

## Table of Contents

- Using Document Chain
  - 1. Install & Import Dependencies
  - 2. Load Documents from URLs
  - 3. Build the Prompt Template
  - 4. Initialize the LLM and Create the Chain
  - 5. Invoke the Chain
  - 6. When to Use the Stuff Chain
  - Links and References
  - Watch Video

---

## Content

LangChain

Implementing Chains

# Using Document Chain

In this tutorial, you’ll learn how to use LangChain’s `create_stuff_documents_chain` to load two TechCrunch articles, merge their content into a single context, and query an LLM for answers that span both sources. This approach is ideal for static prompts when you need to aggregate multiple documents into one cohesive input.

![The image shows a webpage from TechCrunch discussing Microsoft's $16 million investment in Mistral AI, a Paris-based AI startup. The page includes text about the partnership and a partial image of a person gesturing with their hands.](https://kodekloud.com/kk-media/image/upload/v1752880968/notes-assets/images/LangChain-Using-Document-Chain/techcrunch-microsoft-mistral-ai-investment.jpg)

## 1\. Install & Import Dependencies

First, ensure you have LangChain and any required community packages installed:

```
pip install langchain langchain-community openai
```

Then import the necessary modules:

```
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.document_loaders import WebBaseLoader
from langchain.chains.combine_documents import create_stuff_documents_chain
```

## 2\. Load Documents from URLs

Define the two TechCrunch article URLs and use `WebBaseLoader` to fetch them:

```
URL1 = "https://techcrunch.com/2024/02/27/microsoft-made-a-16-million-investment-in-mistral-ai/"
URL2 = "https://techcrunch.com/2024/03/28/ai21-labs-new-text-generating-ai-model-is-more-efficient-than-most/"

loader = WebBaseLoader([URL1, URL2])
data = loader.load()

# Confirm two documents were loaded
print(len(data))  # 2

# Preview the start of the first article
print(data[0].page_content[:200])
```

## 3\. Build the Prompt Template

Create a chat-style prompt that asks the LLM to identify models launched by Mistral AI and AI21 Labs:

```
prompt = ChatPromptTemplate.from_messages([
    ("system", "Identify the models launched by Mistral AI and AI21 Labs:\n\n{context}")
])
```

## 4\. Initialize the LLM and Create the Chain

Instantiate your LLM client and assemble the stuff chain:

```
llm = ChatOpenAI(model="gpt-3.5-turbo")
chain = create_stuff_documents_chain(llm, prompt)
```

> [!important]
> **Note**
>
> The Stuff chain concatenates _all_ loaded documents into one context chunk. Use this when your combined input remains within the model’s context window.

## 5\. Invoke the Chain

Run the chain by passing in the document list as the `context`:

```
result = chain.invoke({"context": data})
print(result)
```

Example output:

> The models launched by Mistral AI are **Mistral 7B** (a 7 billion parameter open source language model) and **Mixtral** (a chat-optimized fine-tuned model). AI21 Labs released a text-generating and analysis model called **J1-Jumbo**.

## 6\. When to Use the Stuff Chain

| Use Case                     | Approach        | Description                                                                         |
| ---------------------------- | --------------- | ----------------------------------------------------------------------------------- |
| Static or Known Prompts      | Stuff chain     | Simplest method when you can merge all documents at once.                           |
| Large or Dynamic Collections | Retrieval chain | Performs semantic search over embeddings and sends only relevant chunks to the LLM. |

> [!important]
> **Warning**
>
> If the total size of concatenated documents exceeds the model’s context window, you will hit limitations or errors. Switch to a retrieval-based chain for larger datasets.

In the next lesson, we’ll explore LangChain’s retrieval chains for handling high-volume or dynamically changing document collections.

## Links and References

- [LangChain Documentation](https://langchain.com/docs/)
- [ChatPromptTemplate Reference](https://langchain.com/docs/modules/prompts/)
- [OpenAI API Reference](https://platform.openai.com/docs/)
- [TechCrunch](https://techcrunch.com/)
- [LangChain Retrieval Chains](https://langchain.com/docs/modules/chains/retrieval/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/a4d85af7-bfc2-40d7-89fc-f537792272ff/lesson/19ac7110-a87f-434a-aa15-a4fcb9e410b1)**
>
> Watch video content
