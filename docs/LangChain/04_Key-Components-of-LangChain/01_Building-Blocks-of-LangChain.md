# Building Blocks of LangChain - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Key-Components-of-LangChain/Building-Blocks-of-LangChain)

---

## Table of Contents

- Building Blocks of LangChain
  - Watch Video

---

## Content

LangChain

Key Components of LangChain

# Building Blocks of LangChain

Previously, we provided an overview of LangChain. In this article, we’ll dive into LangChain’s architecture and explore its six core building blocks. Acting as middleware, LangChain connects your application to Large Language Models (LLMs), vector stores, embedding models, and other data sources—providing abstractions that simplify integration and accelerate development.

Below is a high-level diagram illustrating these components:

![The image illustrates the building blocks of LangChain, including components like Model I/O, Memory, Retrieval, and Agents, along with elements such as Language Models, Vector Databases, Embeddings, and External Data.](https://kodekloud.com/kk-media/image/upload/v1752880984/notes-assets/images/LangChain-Building-Blocks-of-LangChain/langchain-building-blocks-models-agents.jpg)

| Component     | Purpose                                                    | Examples                        |
| ------------- | ---------------------------------------------------------- | ------------------------------- |
| Model I/O     | Manages prompt formatting, response parsing, and streaming | OpenAI, Anthropic, Hugging Face |
| Memory        | Persists conversational context or state                   | Redis, in-memory cache          |
| Retrieval     | Retrieves relevant documents or embeddings                 | Pinecone, FAISS, Weaviate       |
| Agents        | Orchestrates decision-making across tools and APIs         | Custom toolkits, action chains  |
| Embeddings    | Converts text into vectors for similarity search           | OpenAI Embeddings, Cohere       |
| External Data | Integrates external knowledge sources (databases, APIs)    | SQL/NoSQL, RESTful APIs         |

Each building block plays a vital role in crafting production-grade applications with LangChain. In the sections that follow, we’ll examine each component in detail and show you how to leverage them effectively.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/5bedac05-3eaa-4d0d-9892-e05b80c528fb/lesson/ccb34a44-28e4-478d-ae1a-13df8ef583c4)**
>
> Watch video content
