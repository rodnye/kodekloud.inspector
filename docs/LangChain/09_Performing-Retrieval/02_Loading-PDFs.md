# Loading PDFs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Performing-Retrieval/Loading-PDFs)

---

## Table of Contents

- Loading PDFs
  - Prerequisites
  - 1. Import the PDF Loader
  - 2. Initialize the Loader
  - 3. Load and Split into Pages
  - 4. Verify the Page Count
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

LangChain

Performing Retrieval

# Loading PDFs

In this lesson, we'll walk through loading and splitting a PDF document—an employee handbook for Lakeside Bicycles—using LangChain’s `PyPDFLoader`. This process is a common first step in a Retrieval-Augmented Generation (RAG) pipeline, enabling your Q&A application to fetch answers directly from document content.

## Prerequisites

Before you begin, ensure you have the following:

| Requirement         | Install Command                   |
| ------------------- | --------------------------------- |
| Python 3.7+         | —                                 |
| langchain           | `pip install langchain`           |
| langchain-community | `pip install langchain-community` |

> [!important]
> **Note**
>
> You can install both packages at once:
>
> ```
> pip install langchain langchain-community
> ```

## 1\. Import the PDF Loader

Start by importing `PyPDFLoader` from the community loaders:

```
from langchain_community.document_loaders import PyPDFLoader
```

## 2\. Initialize the Loader

Point the loader at your PDF file (e.g., `data/handbook.pdf`):

```
loader = PyPDFLoader("data/handbook.pdf")
```

> [!important]
> **Warning**
>
> Make sure the file path is correct and the PDF is not password-protected. Otherwise, the loader will raise an error.

## 3\. Load and Split into Pages

Use the `load_and_split()` method to read the PDF and split it by page:

```
pages = loader.load_and_split()
```

## 4\. Verify the Page Count

Confirm you have the expected number of pages:

```
print(len(pages))
# Output: 3
```

![The image shows a Jupyter Notebook interface with text discussing performance appraisals, training, and grievance procedures. It includes details about online courses and disciplinary actions.](https://kodekloud.com/kk-media/image/upload/v1752881004/notes-assets/images/LangChain-Loading-PDFs/jupyter-notebook-performance-appraisals-training.jpg)

The output confirms three pages. You can inspect any page’s content by indexing into `pages`:

```
print(pages[1].page_content)
```

## Next Steps

With your PDF now loaded and split, you can:

- Embed page texts for semantic search
- Build a vector store for similarity matching
- Hook into a chat interface for RAG-powered Q&A

## Links and References

- [LangChain Documentation](https://langchain.readthedocs.io/)
- [PyPDFLoader Source Code](https://github.com/hwchase17/langchain-community/blob/main/langchain_community/document_loaders/pypdf.py)
- [Retrieval-Augmented Generation (RAG) Overview](https://blog.langchain.dev/what-is-rag/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/e47b44c9-65c3-46f8-8bed-b075a18ab12b/lesson/18155e0f-cc83-4438-ac30-051e60337344)**
>
> Watch video content
