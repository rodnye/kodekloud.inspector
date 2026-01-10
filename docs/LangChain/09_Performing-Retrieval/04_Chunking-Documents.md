# Chunking Documents - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Performing-Retrieval/Chunking-Documents)

---

## Table of Contents

- Chunking Documents
  - 1. Loading the PDF
  - 2. Configuring Recursive Character Splitter
  - 3. Why Overlap Matters
  - 4. Inspecting the Chunks
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

LangChain

Performing Retrieval

# Chunking Documents

In this lesson, we’ll demonstrate how to load a PDF file (`handbook.pdf`) using LangChain’s PyPDFLoader, split it into pages, and implement a recursive chunking strategy for semantic search preprocessing.

## 1\. Loading the PDF

```
from langchain_community.document_loaders import PyPDFLoader


loader = PyPDFLoader("data/handbook.pdf")
pages = loader.load_and_split()


# Verify page count and preview
print(len(pages))            # e.g., 3
print(pages[0].page_content) # Content preview
```

Example output:

```
3
LakeSide Bicycles Employee Handbook Welcome to the team! LakeSide Bicycles is a company that values quality, innovation, and...
```

## 2\. Configuring Recursive Character Splitter

To enable effective [semantic search](https://en.wikipedia.org/wiki/Semantic_search), we’ll split each page into smaller chunks with overlap to preserve context across boundaries.

```
from langchain.text_splitter import RecursiveCharacterTextSplitter


text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=200,
    chunk_overlap=50
)
chunks = text_splitter.split_documents(pages)
```

| Parameter        | Description                           | Value |
| ---------------- | ------------------------------------- | ----- |
| chunk\\\_size    | Maximum characters per chunk          | 200   |
| chunk\\\_overlap | Characters overlapping between chunks | 50    |

> [!important]
> **Note**
>
> Adjust `chunk_size` and `chunk_overlap` based on document length, LLM context window, and vector-database performance.

## 3\. Why Overlap Matters

- **Context preservation:** Prevents sentences from cutting off abruptly.
- **Improved retrieval:** Ensures related queries find relevant segments.

## 4\. Inspecting the Chunks

Check how many chunks were generated and preview the first two:

```
print(len(chunks))  # e.g., 40


# First chunk
print(chunks[0])


# Second chunk
print(chunks[1])
```

Example output:

```
40
Document(page_content='LakeSide Bicycles Employee Handbook Welcome to the team! LakeSide Bicycles is a company that values quality, innovation, and customer satisfaction...', metadata={'source': 'data/handbook.pdf', 'page': 0})


Document(page_content='…We are passionate about creating and selling bicycles that meet the needs and preferences of our diverse clientele. As an employee of LakeSide Bicycles, you are expected to uphold our mission,…', metadata={'source': 'data/handbook.pdf', 'page': 0})
```

Each `Document` object contains:

- **page_content:** Up to 200 characters of text.
- **metadata:** Source file path and original page number, useful for citation and retrieval.

## Next Steps

With chunking complete, you can:

1.  Generate embeddings for each chunk.
2.  Build a vector index for semantic retrieval.
3.  Integrate into a [Retrieval-Augmented Generation (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) pipeline.

## Links and References

- [LangChain Documentation](https://python.langchain.com/)
- [Recursive Text Splitter](https://python.langchain.com/en/latest/modules/indexes/text_splitter.html)
- [Retrieval-Augmented Generation Explained](https://en.wikipedia.org/wiki/Retrieval-augmented_generation)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/e47b44c9-65c3-46f8-8bed-b075a18ab12b/lesson/fc020e0a-7253-4445-8fff-d30d8d639315)**
>
> Watch video content
