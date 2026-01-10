# LLM Context - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Building-Blocks-of-LLM-Apps/LLM-Context)

---

## Table of Contents

- LLM Context
  - Why LLMs Require Context
  - Understanding and Preventing Hallucinations
  - Core Components of a Contextual LLM Workflow
  - External Data Sources for Context
  - Runtime Context Injection
  - Further Reading
  - Watch Video

---

## Content

LangChain

Building Blocks of LLM Apps

# LLM Context

In modern LLM applications, **context** is the external information injected into a model’s prompt to improve accuracy and reduce hallucinations. By supplying timely, relevant data, you enable an LLM to generate grounded, up-to-date answers.

![The image is a diagram with a document icon labeled "Context," explaining that it refers to information from external data sources to assist LLMs in generating accurate responses.](https://kodekloud.com/kk-media/image/upload/v1752880959/notes-assets/images/LangChain-LLM-Context/context-document-diagram-llms-responses.jpg)

## Why LLMs Require Context

Large language models are typically trained on data with a fixed cutoff date. As a result, they can’t natively answer questions about events or data emerging after that cutoff. For example:

> Ask ChatGPT about yesterday’s news, and it will respond that it has no knowledge beyond its training cutoff.

To bridge this gap, production systems programmatically retrieve data—such as a paragraph from a recent article—and inject it into the prompt. This automation replaces manual copy–paste and ensures responses remain current.

## Understanding and Preventing Hallucinations

When an LLM lacks sufficient information, it may generate plausible but incorrect or fabricated content, known as **hallucination**.

![The image illustrates a concept of "hallucinations" in large language models (LLM), showing a brain icon with stars and a chat box with a nonsensical statement about a monkey and a man eating bananas.](https://kodekloud.com/kk-media/image/upload/v1752880959/notes-assets/images/LangChain-LLM-Context/hallucinations-llm-brain-chatbox-image.jpg)

> [!important]
> **Warning**
>
> Hallucinations can mislead users and degrade trust in your application. Always supply accurate and verifiable context.

## Core Components of a Contextual LLM Workflow

The following diagram outlines the key building blocks of a contextual LLM application:

![The image illustrates the key building blocks of a Large Language Model (LLM) application, showing the flow from user to application, context, language model, and external data sources, with components like prompt, response, and history.](https://kodekloud.com/kk-media/image/upload/v1752880960/notes-assets/images/LangChain-LLM-Context/llm-application-building-blocks-diagram.jpg)

1.  **User Input**: The initial query or instruction.
2.  **Context Retrieval**: Fetching relevant data from external sources.
3.  **Prompt Assembly**: Combining user input, retrieved context, and any conversation history.
4.  **Language Model**: The LLM processes the assembled prompt.
5.  **Response Delivery**: The model’s output, grounded by the supplied context.

Advanced applications often implement [Retrieval-Augmented Generation](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) (RAG) to automate context retrieval and integration.

## External Data Sources for Context

To ensure comprehensive coverage, LLM applications can pull from a variety of sources:

![The image illustrates different types of databases: structured (PostgreSQL, MySQL), NoSQL (MongoDB, Cassandra), and vector (Chroma, Pinecone), along with icons for PDF and Word documents.](https://kodekloud.com/kk-media/image/upload/v1752880961/notes-assets/images/LangChain-LLM-Context/database-types-structured-nosql-vector.jpg)

| Source Category     | Examples                       | Usage                                          |
| ------------------- | ------------------------------ | ---------------------------------------------- |
| Structured          | PostgreSQL, MySQL              | SQL queries for transactional and tabular data |
| NoSQL               | MongoDB, Cassandra             | Flexible schemas for unstructured records      |
| Vector Database     | Chroma, Pinecone               | Semantic search and similarity matching        |
| Full-Text Documents | PDF, Word, HTML                | Document embeddings and text extraction        |
| Real-Time APIs      | Stock quotes, Flight schedules | Live data for current events                   |
| Web Search          | Custom scraping or search APIs | Aggregated information from multiple sites     |

> [!important]
> **Note**
>
> Choosing the right data source depends on your use case: transactional queries suit relational stores, while semantic retrieval demands a vector database.

## Runtime Context Injection

At runtime, your application should:

1.  Query each relevant data source.
2.  Extract and preprocess the results (e.g., chunking large documents).
3.  Integrate the processed information into the LLM’s prompt.
4.  Send the enriched prompt to the model for inference.

By automating this pipeline, you create a robust system that delivers accurate, up-to-date responses and minimizes hallucinations.

## Further Reading

- [Large Language Model (Wikipedia)](https://en.wikipedia.org/wiki/Large_language_model)
- [Retrieval-Augmented Generation](https://en.wikipedia.org/wiki/Retrieval-augmented_generation)
- [Vector Database (Wikipedia)](https://en.wikipedia.org/wiki/Vector_database)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/bb8afda8-9de9-4865-aabf-bc71786440b2/lesson/710cf4ad-299d-49bb-86f0-6b06a41502f7)**
>
> Watch video content
