# Key Libraries - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Tips-Tricks-and-Resources/Key-Libraries)

---

## Table of Contents

- Key Libraries
  - Overview of LangChain Libraries
  - 1. LangChain Core
  - 2. LangChain Community
  - 3. LangChain (Primary Library)
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

LangChain

Tips Tricks and Resources

# Key Libraries

LangChain's modular design relies on three interconnected libraries. In this guide, we'll break down the core, community, and primary layers of LangChain, explain their roles, and show how they work together to build powerful AI applications.

## Overview of LangChain Libraries

| Library Layer       | Description                                                |
| ------------------- | ---------------------------------------------------------- |
| LangChain Core      | Defines runtime, interfaces, base abstractions, and LCEL.  |
| LangChain Community | Offers adapters and integrations for third-party services. |
| LangChain (Primary) | Provides pre-built chains, agents, and retrieval patterns. |

![The image is a diagram titled "Understanding LangChain Libraries," showing "LangChain Core" in the center, connected to "Interfaces" on the left and "Base Abstractions" on the right.](https://kodekloud.com/kk-media/image/upload/v1752881012/notes-assets/images/LangChain-Key-Libraries/understanding-langchain-libraries-diagram.jpg)

> [!important]
> **Note**
>
> LangChain is built in layers. Each layer depends on the one below it, ensuring a consistent API and runtime across all integrations.

---

## 1\. LangChain Core

LangChain Core is the foundation that powers chains, agents, and tools. It exposes:

- **Interfaces**: Abstract classes for LLMs, vector retrievers, and memory modules.
- **Base Abstractions**: Core types and classes that define behavior for downstream libraries.
- **LCEL (LangChain Expression Language)**: A minimal DSL for composing prompts and orchestrating chains.

Use Core when you need a lightweight runtime without external integrations.

![The image is a diagram titled "Understanding LangChain Libraries," showing the LangChain Core connected to three components: LangChain Expression Language (LCEL), Interfaces, and Base Abstractions.](https://kodekloud.com/kk-media/image/upload/v1752881013/notes-assets/images/LangChain-Key-Libraries/understanding-langchain-libraries-diagram-2.jpg)

---

## 2\. LangChain Community

The Community layer builds on Core by providing concrete implementations for popular AI services:

| LLM Provider     | LangChain Integration      |
| ---------------- | -------------------------- |
| OpenAI           | `langchain-openai`         |
| Anthropic        | `langchain-anthropic`      |
| Cohere           | `langchain-cohere`         |
| Amazon Bedrock   | `langchain-amazon-bedrock` |
| Azure OpenAI     | `langchain-azure-openai`   |
| Google Vertex AI | `langchain-google-vertex`  |

Additional integrations include:

- Vector databases (e.g., Pinecone, Weaviate)
- Retriever plugins for semantic search
- Document loaders for PDF, CSV, and more
- Specialized tooling (e.g., SQL agents, Python REPL)

> [!important]
> **Warning**
>
> Installing the wrong community package can lead to version conflicts. Always match the package version with your LangChain Core release.

![The image is a diagram showing various LLM providers connected to "LangChain Core," including Anthropic, Cohere, Amazon Bedrock, Azure OpenAI, and Google Vertex AI.](https://kodekloud.com/kk-media/image/upload/v1752881014/notes-assets/images/LangChain-Key-Libraries/llm-providers-langchain-core-diagram.jpg)

---

## 3\. LangChain (Primary Library)

The Primary Library leverages Core and Community to provide high-level building blocks:

- **Chains**: Pre-built workflows for summarization, Q&A, translation, and more.
- **Agents**: Frameworks that enable dynamic decision-making using tools.
- **Retrieval Strategies**: Caching, streaming, and hybrid search patterns.

These components form the "brain" of your AI application, handling prompt engineering, tool invocation, and response management seamlessly.

![The image is a diagram titled "LangChain Community," showing a "Runtime" icon connected to various logos, including Anthropic, Amazon Bedrock, Azure, OpenAI, and others, indicating integration or collaboration.](https://kodekloud.com/kk-media/image/upload/v1752881016/notes-assets/images/LangChain-Key-Libraries/langchain-community-runtime-integration-diagram.jpg)

---

## Next Steps

In the upcoming demo, we'll launch a Jupyter Notebook to explore these libraries in action, build a simple chatbot, and integrate a vector database for retrieval-augmented generation.

## Links and References

- [LangChain Documentation](https://python.langchain.com/en/latest/)
- [LangChain GitHub Repository](https://github.com/langchain-ai/langchain)
- [LCEL Reference Guide](https://python.langchain.com/en/latest/reference/lcel.html)
- [Community Integrations](https://python.langchain.com/en/latest/ecosystem.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/b5f7771a-fdbc-45b1-a786-6c84bb7ffc76/lesson/c68764ef-6651-4965-8e85-c4dc6a56408e)**
>
> Watch video content
