# Generating Emeddings - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Performing-Retrieval/Generating-Emeddings)

---

## Table of Contents

- Generating Emeddings
  - Prerequisites
  - 1. Import and Initialize the Embedding Model
  - 2. Prepare the Input Documents
  - 3. Generate Embeddings
  - 4. Inspect and Validate the Results
  - 5. Next Steps
  - References
  - Watch Video
    - 4.1 Confirm Count
    - 4.2 View a Sample Embedding
    - 4.3 Check Embedding Dimensions

---

## Content

LangChain

Performing Retrieval

# Generating Emeddings

Embeddings convert text into high-dimensional vectors that preserve semantic meaning, enabling powerful use cases such as semantic search, document clustering, and recommendation systems. In this guide, we’ll walk through the process of generating embeddings using OpenAI’s API via LangChain.

## Prerequisites

- Python 3.7+
- `openai` and `langchain` Python packages
- An [OpenAI API key](https://platform.openai.com/account/api-keys)

```
pip install openai langchain
```

> [!important]
> **Warning**
>
> Make sure your `OPENAI_API_KEY` environment variable is set before running the examples:
>
> ```
> export OPENAI_API_KEY="your_api_key_here"
> ```

---

## 1\. Import and Initialize the Embedding Model

Begin by importing the `OpenAIEmbeddings` class from LangChain and creating an instance with your chosen model. Replace `"text-embedding-3-large"` with any supported model from the [OpenAI Embeddings guide](https://platform.openai.com/docs/guides/embeddings).

```
from langchain.embeddings import OpenAIEmbeddings


# Initialize the embeddings client
embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
```

> [!important]
> **Model Selection**
>
> Different models produce vectors of varying dimensions and performance characteristics. Refer to the OpenAI documentation for details on each embedding model.

---

## 2\. Prepare the Input Documents

In a real application, you’d split your source (e.g., PDF, web pages) into text chunks. For demonstration, we’ll use four sports headlines:

| Document Index | Headline                                                                             | Category |
| -------------- | ------------------------------------------------------------------------------------ | -------- |
| 1              | Thrilling Finale Awaits: The Countdown to the Cricket World Cup Championship         | Cricket  |
| 2              | Global Giants Clash: Football World Cup Semi-Finals Set the Stage for Epic Showdowns | Football |
| 3              | Record Crowds and Unforgettable Moments: Highlights from the Cricket World Cup       | Cricket  |
| 4              | From Underdogs to Contenders: Football World Cup Surprises and Breakout Stars        | Football |

```
docs = [
    "Thrilling Finale Awaits: The Countdown to the Cricket World Cup Championship",
    "Global Giants Clash: Football World Cup Semi-Finals Set the Stage for Epic Showdowns",
    "Record Crowds and Unforgettable Moments: Highlights from the Cricket World Cup",
    "From Underdogs to Contenders: Football World Cup Surprises and Breakout Stars"
]
```

---

## 3\. Generate Embeddings

Use the `embed_documents` method to convert each string into its corresponding vector. Depending on the number of documents, this may take a few seconds.

```
embed_docs = embeddings.embed_documents(docs)
```

---

## 4\. Inspect and Validate the Results

### 4.1 Confirm Count

Ensure that the number of embeddings matches the number of input documents:

```
len(embed_docs)
# Output: 4
```

### 4.2 View a Sample Embedding

Each embedding is a list of floats. For instance, the first document’s embedding might look like this:

```
embed_docs[0]
# [
#  -0.0257435211110519,
#   0.03683468933443764,
#  -0.05297664824695986,
#   0.02100751509421706,
#   ...
# ]
```

### 4.3 Check Embedding Dimensions

Determine the dimensionality of the vectors your model produces:

```
len(embed_docs[0])
# Output: 3072
```

> [!important]
> **Vector Dimensions**
>
> Vector size varies by model. For example, `text-embedding-3-large` outputs 3072-dimensional embeddings. Always verify dimensions before storing in a vector database.

---

## 5\. Next Steps

With embeddings generated, the typical workflow involves:

1.  **Storing vectors** in a vector database (e.g., Pinecone, Weaviate, or Chroma).
2.  **Performing similarity searches** to retrieve semantically related documents.
3.  **Building applications** like semantic search engines or Q&A chatbots.

In the next chapter, we’ll cover setting up a vector database, indexing embeddings, and executing real-time semantic queries.

---

## References

- [OpenAI Embeddings Documentation](https://platform.openai.com/docs/guides/embeddings)
- [LangChain Embeddings Integration](https://python.langchain.com/docs/modules/models/embeddings/)
- [Vector Databases Overview](https://www.semanticscholar.org/paper/An-Overview-of-Vector-Databases-for-Semantic-Search)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/e47b44c9-65c3-46f8-8bed-b075a18ab12b/lesson/187f5776-2d66-4326-bee6-86ba7569e581)**
>
> Watch video content
