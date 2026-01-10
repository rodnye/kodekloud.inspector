# Performing Semantic Search - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Performing-Retrieval/Performing-Semantic-Search)

---

## Table of Contents

- Performing Semantic Search
  - Table of Contents
  - Prerequisites
  - Step 1: Install and Import Dependencies
  - Step 2: Prepare Your Documents
  - Step 3: Create a Chroma Vector Store
  - Step 4: Execute Semantic Queries
  - How It Works
  - Further Reading
  - Watch Video
    - Cricket Query
    - Football Query

---

## Content

LangChain

Performing Retrieval

# Performing Semantic Search

In this tutorial, you’ll learn how to generate embeddings using OpenAI, store them in a Chroma vector database, and execute simple semantic searches. By the end, you’ll understand how to retrieve conceptually related documents—even when they share no exact keywords.

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [Step 1: Install and Import Dependencies](#step-1-install-and-import-dependencies)
3.  [Step 2: Prepare Your Documents](#step-2-prepare-your-documents)
4.  [Step 3: Create a Chroma Vector Store](#step-3-create-a-chroma-vector-store)
5.  [Step 4: Execute Semantic Queries](#step-4-execute-semantic-queries)
6.  [How It Works](#how-it-works)
7.  [Further Reading](#further-reading)

---

## Prerequisites

- Python 3.7+
- An [OpenAI API key](https://platform.openai.com/account/api-keys)
- Install the required libraries:

```
pip install langchain chromadb openai
```

> [!important]
> **Note**
>
> Ensure your `OPENAI_API_KEY` environment variable is set:
>
> ```
> export OPENAI_API_KEY="your_api_key_here"
> ```

---

## Step 1: Install and Import Dependencies

Begin by importing LangChain’s embedding model and the Chroma vector store:

```
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma

# Initialize the embeddings model
embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")
```

---

## Step 2: Prepare Your Documents

Here, we create a small collection of sports headlines. In real applications, you might load text from files, PDFs, or a database.

```
docs = [
    "Thrilling Finale Awaits: The Countdown to the Cricket World Cup Championship",
    "Global Giants Clash: Football World Cup Semi-Finals Set the Stage for Epic Showdowns",
    "Record Crowds and Unforgettable Moments: Highlights from the Cricket World Cup",
    "From Underdogs to Contenders: Football World Cup Surprises and Breakout Stars"
]
```

---

## Step 3: Create a Chroma Vector Store

Chroma will automatically generate embeddings for each document and store them in a local vector database:

```
vectorstore = Chroma.from_texts(texts=docs, embedding=embeddings)
```

| Component       | Description                                             | Example                                               |
| --------------- | ------------------------------------------------------- | ----------------------------------------------------- |
| Embeddings      | Converts text into high-dimensional vectors             | `OpenAIEmbeddings(model="text-embedding-ada-002")`    |
| Vector Database | Stores and indexes embedding vectors for similarity ops | `Chroma.from_texts(texts=docs, embedding=embeddings)` |

---

## Step 4: Execute Semantic Queries

With your documents indexed, you can now query the vector store. Semantic search will return contextually related headlines, even without shared keywords.

### Cricket Query

```
results_cricket = vectorstore.similarity_search("Rohit Sharma", k=2)
for doc in results_cricket:
    print(doc.page_content)
```

Output:

```
Record Crowds and Unforgettable Moments: Highlights from the Cricket World Cup
Thrilling Finale Awaits: The Countdown to the Cricket World Cup Championship
```

### Football Query

```
results_football = vectorstore.similarity_search("Lionel Messi", k=2)
for doc in results_football:
    print(doc.page_content)
```

Output:

```
From Underdogs to Contenders: Football World Cup Surprises and Breakout Stars
Global Giants Clash: Football World Cup Semi-Finals Set the Stage for Epic Showdowns
```

> [!important]
> **Tip**
>
> Adjust `k` to change the number of returned results. For instance, `k=1` returns only the single most similar document.

---

## How It Works

1.  **Embedding Generation**  
    Both documents and queries are transformed into vector embeddings by the **same** model.
2.  **Vector Similarity**  
    Chroma computes distances between the query vector and stored document vectors, retrieving the top-`k` closest matches.
3.  **Semantic Matching**  
    Unlike keyword-based search, semantic search finds conceptually related content—even if the exact terms differ.

---

## Further Reading

- [LangChain Documentation](https://langchain.readthedocs.io/)
- [Chroma Vector Store](https://github.com/chroma-core/chroma)
- [OpenAI Embeddings API](https://platform.openai.com/docs/guides/embeddings)

Feel free to integrate this pattern into your QA systems, recommendation engines, or any application requiring intelligent text retrieval.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/e47b44c9-65c3-46f8-8bed-b075a18ab12b/lesson/412c6d90-f6c8-4468-9287-9efce864fe74)**
>
> Watch video content
