# Loading Webpages - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Performing-Retrieval/Loading-Webpages)

---

## Table of Contents

- Loading Webpages
  - Prerequisites
  - Step 1: Fetching Web Content with WebBaseLoader
  - Understanding the Loaded Document
  - Step 2: Preparing for Text Splitting
  - Next Steps
  - References
  - Watch Video

---

## Content

LangChain

Performing Retrieval

# Loading Webpages

In this tutorial, you’ll learn how to fetch and process the contents of a live webpage using LangChain’s `WebBaseLoader`. This approach is ideal for building chatbots or knowledge systems that rely on up-to-date web data.

![The image is a webpage from The Verge discussing Meta's competition with ChatGPT, featuring a presentation of Meta's AI assistant on various platforms.](https://kodekloud.com/kk-media/image/upload/v1752881005/notes-assets/images/LangChain-Loading-Webpages/meta-ai-assistant-chatgpt-competition.jpg)

The Verge recently published an in-depth article on Meta’s AI assistant powered by the new Llama 3 model. We’ll use LangChain’s web loader to pull both the text and its metadata for downstream processing.

## Prerequisites

> [!important]
> **Note**
>
> Make sure you have installed the community document loaders:
>
> ```
> pip install langchain_community
> ```
>
> You also need network access to fetch external URLs.

## Step 1: Fetching Web Content with WebBaseLoader

LangChain’s `WebBaseLoader` retrieves the full text of a page along with rich metadata (title, description, source URL, and more). Here’s a simple example:

```
from langchain_community.document_loaders import WebBaseLoader


URL = "https://www.theverge.com/2024/4/18/24133808/meta-ai-assistant-llama-3-chatgpt-openai-rival"
loader = WebBaseLoader(URL)
data = loader.load()
```

After executing the code above, `data` will be a list containing a single `Document` object:

```
# Confirm we have one document
len(data)
# Inspect the first Document
print(data[0])
# Document(
#   page_content="Meta releases new AI assistant powered by Llama 3 model - The Verge ...",
#   metadata={
#     "source": "https://www.theverge.com/2024/4/18/24133808/...-rival",
#     "title": "Meta releases new AI assistant powered by Llama 3 model",
#     "description": "Meta’s AI assistant brings Llama 3 to ChatGPT competition.",
#     "date": "2024-04-18",
#     ...
#   }
# )
```

You can access:

- Raw text: `data[0].page_content`
- Metadata fields: `data[0].metadata["title"]`, `data[0].metadata["source"]`, etc.

## Understanding the Loaded Document

Here’s a quick overview of the key metadata fields provided by `WebBaseLoader`:

| Metadata Field | Description                                | Example                                                      |
| -------------- | ------------------------------------------ | ------------------------------------------------------------ |
| source         | The original URL of the webpage            | `https://www.theverge.com/2024/4/18/...-rival`               |
| title          | The HTML `<title>` content                 | `Meta releases new AI assistant powered by Llama 3 model`    |
| description    | The page’s meta description (if available) | `Meta’s AI assistant brings Llama 3 to ChatGPT competition.` |
| date           | Publication date (if parseable)            | `2024-04-18`                                                 |

## Step 2: Preparing for Text Splitting

Once the page is loaded into a `Document` object, the next step is to split its contents into manageable chunks. This enables efficient embedding, similarity search, and retrieval in downstream applications.

```
from langchain.text_splitter import RecursiveCharacterTextSplitter


text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
docs = text_splitter.split_documents(data)
print(f"Split into {len(docs)} chunks")
```

Each chunk can now be embedded and stored in a vector database or used directly in a retrieval-augmented generation (RAG) pipeline.

> [!important]
> **Warning**
>
> Splitting too aggressively (very small chunks) can degrade context. Tune `chunk_size` and `chunk_overlap` according to your application needs.

## Next Steps

With your webpage content properly loaded and chunked, you can:

- Generate embeddings for semantic search
- Build a conversational agent over the content
- Index and query using a vector database

## References

- [LangChain Community Document Loaders](https://langchain.readthedocs.io/en/latest/modules/document_loaders/langchain_community.html)
- [RecursiveCharacterTextSplitter](https://langchain.readthedocs.io/en/latest/modules/indexes/text_splitters.html)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/e47b44c9-65c3-46f8-8bed-b075a18ab12b/lesson/c29062bc-7d53-4855-b98e-c9cb5ae6cbe3)**
>
> Watch video content
