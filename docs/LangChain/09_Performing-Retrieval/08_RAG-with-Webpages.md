# RAG with Webpages - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Performing-Retrieval/RAG-with-Webpages)

---

## Table of Contents

- RAG with Webpages
  - 1. Setup: Imports & Loader Selection
  - 2. Load & Split the Document
  - 3. Embed & Store in a Vector Database
  - 4. Format Retrieved Chunks
  - 5. Build the QA Chain
  - 6. Run a Query
  - 7. Next Steps & References
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

LangChain

Performing Retrieval

# RAG with Webpages

In this tutorial, you’ll learn how to implement a complete RAG pipeline using web pages instead of PDFs. We’ll cover:

1.  Loader selection
2.  Content splitting
3.  Embedding generation
4.  Vector storage
5.  Retrieval & formatting
6.  QA over the retrieved context

By the end, you’ll have a reusable recipe for answering questions grounded in any web article.

---

## 1\. Setup: Imports & Loader Selection

Begin by installing and importing the required packages. We’ll switch out the PDF loader for a web-based loader.

```
pip install langchain langchain-community chromadb openai
```

```
from langchain_community.document_loaders import PyPDFLoader, WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_chroma import Chroma
from langchain.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser


# Option 1: PDF loader
# Option 2: Web page loader
URL = "https://www.theverge.com/2024/4/18/24133808/meta-ai-assistant-llama-3-chatgpt-openai-rival"
loader = WebBaseLoader(URL)
```

| Loader        | Source Type  | Use Case                  | Example                                        |
| ------------- | ------------ | ------------------------- | ---------------------------------------------- |
| PyPDFLoader   | PDF file     | Static document ingestion | `PyPDFLoader("path/to/manual.pdf")`            |
| WebBaseLoader | Web page URL | Dynamic HTML content      | `WebBaseLoader("https://example.com/article")` |

> [!important]
> **Note**
>
> WebBaseLoader fetches rendered HTML content, so it’s best for news articles, blog posts, and static documentation.

---

## 2\. Load & Split the Document

Fetch the page and break it into manageable chunks for embedding.

```
# 1. Load the web page
docs = loader.load()


# 2. Split content into chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=200,
    chunk_overlap=50
)
chunks = text_splitter.split_documents(docs)
```

> [!important]
> **Warning**
>
> Smaller chunk sizes increase retrieval precision but raise API call counts. Adjust `chunk_size` and `chunk_overlap` based on your quota and use case.

---

## 3\. Embed & Store in a Vector Database

Generate embeddings for each text chunk and store them in [Chroma](https://github.com/chroma-core/chroma).

```
# Initialize the embedding model
embeddings = OpenAIEmbeddings(model="text-embedding-3-large")


# Create a Chroma vector store from the chunks
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings
)


# Prepare a retriever interface
retriever = vectorstore.as_retriever()
```

---

## 4\. Format Retrieved Chunks

Define a helper that merges multiple document chunks into a single context string for the LLM.

```
def format_docs(docs):
    """
    Concatenates page_content from each retrieved document.
    """
    return "\n\n".join(doc.page_content for doc in docs)
```

---

## 5\. Build the QA Chain

Create a prompt template and chain together retrieval, formatting, and the LLM.

```
# System prompt template
template = """
SYSTEM: You are a question-answering assistant.
Use only the provided context to answer; if unknown, reply "I don't know."


Question: {question}
Context:
{context}
"""
prompt = PromptTemplate.from_template(template)


# Initialize the chat model
llm = ChatOpenAI()


# Assemble the chain:
#   retrieval → formatting → prompt → LLM → string output
chain = (
    {
        "context": retriever | format_docs,
        "question": RunnablePassthrough()
    }
    | prompt
    | llm
    | StrOutputParser()
)
```

---

## 6\. Run a Query

Invoke the chain with any factual question related to the web page.

```
result = chain.invoke("What's the size of the largest Llama 3 model?")
print(result)
# Expected output: "The largest Llama 3 model will have over 400 billion parameters."
```

You can adapt the question to explore any section of the article or domain-specific content.

---

## 7\. Next Steps & References

- Experiment with other web pages, blogs, or API-based content sources.
- Explore pre-built RAG chains for summarization, code generation, or translation.
- Fine-tune `chunk_size`, embedding models, and LLM parameters for performance and cost.

## Links and References

- [LangChain Documentation](https://langchain.com/docs/)
- [Chroma Vector Store](https://github.com/chroma-core/chroma)
- [OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings)
- [RecursiveCharacterTextSplitter](https://python.langchain.com/docs/modules/data_connection/document/question_answering/text_splitting)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/e47b44c9-65c3-46f8-8bed-b075a18ab12b/lesson/9b858443-cf1c-4573-b52f-7a1740cd473c)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/langchain/module/e47b44c9-65c3-46f8-8bed-b075a18ab12b/lesson/124c59d6-584f-4ab5-8190-8f83f35a14ab)**
>
> Practice lab
