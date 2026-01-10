# Performing Retrieval - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Performing-Retrieval/Performing-Retrieval)

---

## Table of Contents

- Performing Retrieval
  - Why Retrieval Matters
  - What Is Retrieval-Augmented Generation (RAG)?
  - RAG Workflow Overview
  - Two Phases of RAG
  - Building a RAG Pipeline with LangChain
  - Links and References
  - Watch Video
    - Why Not Send the Entire Document?
    - Phase 1: Indexing
    - Phase 2: Retrieval

---

## Content

LangChain

Performing Retrieval

# Performing Retrieval

Welcome back! In this lesson, we’ll dive into **retrieval** techniques and explore how **retrieval-augmented generation (RAG)** enhances your LLM applications with external context.

## Why Retrieval Matters

Large language models rely on **context**—external data and background—to generate accurate, factual responses. Without relevant context, models often “hallucinate,” producing plausible but incorrect information.

| Data Source          | Example Systems                        | Use Case                         |
| -------------------- | -------------------------------------- | -------------------------------- |
| Relational Databases | MySQL, PostgreSQL, SQLite              | Structured queries via SQL       |
| NoSQL Databases      | MongoDB                                | Flexible document storage        |
| Full-Text Search     | Elasticsearch                          | Keyword-based document retrieval |
| Vector Databases     | Pinecone, Chroma, Milvus, Weaviate     | Semantic search with embeddings  |
| Document Stores      | PDF, Word, HTML, CSV (e.g., Amazon S3) | Unstructured file retrieval      |
| APIs & Web Search    | REST endpoints, real-time web scraping | Live data fetching               |

![The image displays logos of various database systems like MySQL, SQLite, PostgreSQL, and MongoDB, along with icons representing different file types and formats such as PDF, HTML, DOC, and API.](https://kodekloud.com/kk-media/image/upload/v1752881006/notes-assets/images/LangChain-Performing-Retrieval/database-logos-file-types-icons.jpg)

> [!important]
> **Note**
>
> Retrieving only the most relevant passages keeps your prompt within the LLM’s context window (e.g., 4,096 tokens) and reduces hallucinations.

## What Is Retrieval-Augmented Generation (RAG)?

Retrieval-Augmented Generation (RAG) is a two-step framework:

1.  **Retrieve** relevant context from external data sources.
2.  **Augment** the LLM prompt with those facts before generation.

![The image illustrates the concept of Retrieval Augmented Generation (RAG), showing a flow between external data sources and a large language model (LLM) to provide additional facts.](https://kodekloud.com/kk-media/image/upload/v1752881007/notes-assets/images/LangChain-Performing-Retrieval/retrieval-augmented-generation-llm-flow.jpg)

### Why Not Send the Entire Document?

- **Context window limits**: LLMs can’t process an entire 100-page PDF in one go.
- **Efficiency**: Fetching only necessary chunks saves on compute and token usage.
- **Explainability**: You can cite the exact source of each fact.
- **Privacy & Control**: Only selected passages are exposed to the model.

## RAG Workflow Overview

A typical RAG pipeline consists of five steps:

1.  **User Query**: The user asks a question.
2.  **Search**: The system queries databases or document stores.
3.  **Context Injection**: Retrieved passages are inserted into the prompt.
4.  **LLM Call**: The augmented prompt is sent to the LLM.
5.  **Response**: The model generates an answer, which is returned to the user.

![The image illustrates a RAG (Retrieval-Augmented Generation) workflow, showing the interaction between a user, a chatbot, a large language model (LLM), and databases/documents for search and retrieval.](https://kodekloud.com/kk-media/image/upload/v1752881007/notes-assets/images/LangChain-Performing-Retrieval/rag-workflow-user-chatbot-llm.jpg)

## Two Phases of RAG

### Phase 1: Indexing

1.  Load unstructured documents (PDFs, HTML, JSON, images).
2.  Split each document into manageable chunks (sentences, paragraphs, or token windows).
3.  Embed each chunk via an embeddings model, producing numerical vectors.
4.  Store these vectors in a vector database (e.g., Chroma, Milvus, Weaviate).

> [!important]
> **Tip**
>
> Choosing the right chunk size (e.g., 500 tokens) balances retrieval precision and recall.

```
from langchain.document_loaders import UnstructuredPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma


# 1. Load documents
loader = UnstructuredPDFLoader("path/to/doc.pdf")
docs = loader.load()


# 2. Split into chunks
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_documents(docs)


# 3. Create embeddings and store
embeddings = OpenAIEmbeddings()
vector_db = Chroma.from_documents(chunks, embeddings, persist_directory="chroma_db")
vector_db.persist()
```

![The image illustrates "RAG – Phase 1" with a flowchart showing four stages: Load, Split, Embed, and Store, with arrows indicating the process flow. The final stage, Store, contains numerical data arrays.](https://kodekloud.com/kk-media/image/upload/v1752881009/notes-assets/images/LangChain-Performing-Retrieval/rag-phase-1-flowchart-stages.jpg)

### Phase 2: Retrieval

1.  Embed the user’s query using the same embeddings model.
2.  Perform a semantic search against stored vectors in the vector database.
3.  Retrieve the top‐k matching chunks.
4.  Augment the original prompt with those chunks.
5.  Generate the final answer via the LLM.

```
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI


# Create a retriever
retriever = vector_db.as_retriever(search_kwargs={"k": 5})


# Build a RAG chain
qa_chain = RetrievalQA.from_chain_type(
    llm=OpenAI(model_name="gpt-4"),
    chain_type="stuff",
    retriever=retriever
)


# Ask a question
response = qa_chain.run("What are the main benefits of RAG?")
print(response)
```

![The image illustrates the RAG (Retrieval-Augmented Generation) Phase 2 process, showing a flow from a question to retrieval, context, prompt, and then to a large language model (LLM).](https://kodekloud.com/kk-media/image/upload/v1752881010/notes-assets/images/LangChain-Performing-Retrieval/rag-phase2-process-flow-llm.jpg)

## Building a RAG Pipeline with LangChain

LangChain offers modular components to assemble a complete RAG workflow:

| Component         | Description                                                       |
| ----------------- | ----------------------------------------------------------------- |
| Document Loaders  | Fetch external data (PDFs, web pages, APIs)                       |
| Text Splitters    | Break documents into searchable chunks                            |
| Embeddings Models | Convert text chunks into semantic vectors                         |
| Vector Stores     | Store and index vectors for efficient similarity search           |
| Retrievers        | Query vector stores to retrieve the most relevant document chunks |

![The image is about "RAG With LangChain" and shows a diagram with icons representing document loaders and external data sources, including a web search and PDF.](https://kodekloud.com/kk-media/image/upload/v1752881011/notes-assets/images/LangChain-Performing-Retrieval/rag-with-langchain-diagram-icons.jpg)

When these modules are connected, you get a robust RAG pipeline. Next, we’ll build a Q&A application that ingests both a PDF and a web page.

![The image shows a graphic of a computer screen with a cube icon and a disc, labeled "RAG Workflow," with the text "RAG With LangChain" at the top.](https://kodekloud.com/kk-media/image/upload/v1752881012/notes-assets/images/LangChain-Performing-Retrieval/rag-workflow-langchain-computer-graphic.jpg)

Let’s jump into the demo!

## Links and References

- [LangChain Documentation](https://langchain.readthedocs.io/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference/)
- [Chroma Vector Database](https://www.trychroma.com/)
- [Pinecone](https://www.pinecone.io/)
- [Elasticsearch Guide](https://www.elastic.co/guide/index.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/e47b44c9-65c3-46f8-8bed-b075a18ab12b/lesson/fa08ba22-b76f-4355-8a50-4a40dd49aba8)**
>
> Watch video content
