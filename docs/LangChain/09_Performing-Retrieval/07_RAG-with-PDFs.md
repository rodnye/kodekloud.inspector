# RAG with PDFs - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Performing-Retrieval/RAG-with-PDFs)

---

## Table of Contents

- RAG with PDFs
  - 1. Install Dependencies
  - 2. Import Required Modules
  - 3. Load and Chunk the PDF
  - 4. Generate Embeddings & Build Vector Store
  - 5. Configure Retriever & Formatter
  - 6. Define the LLM and Prompt Template
  - 7. Assemble the RAG Chain
  - 8. Query the Chain
  - Summary of Steps
  - Further Reading & References
  - Watch Video
    - 3.1 Load the PDF
    - 3.2 Split into Overlapping Chunks

---

## Content

LangChain

Performing Retrieval

# RAG with PDFs

In this guide, you’ll learn how to connect PDF loaders, chunk your documents, generate embeddings, and query a vector database to build a Retrieval-Augmented Generation (RAG) pipeline using LangChain.

> [!important]
> **Warning**
>
> Make sure your `OPENAI_API_KEY` is set in the environment before running any of the code snippets.

---

## 1\. Install Dependencies

```
pip install langchain langchain-community langchain-openai langchain-chroma
```

---

## 2\. Import Required Modules

We’ll use:

- [PyPDFLoader](https://python.langchain.com/docs/modules/data_connection/document_loaders/integrations/pypdf) to load PDFs
- [RecursiveCharacterTextSplitter](https://python.langchain.com/docs/modules/data_connection/text_splitter/) for chunking
- [OpenAIEmbeddings](https://python.langchain.com/docs/modules/embeddings/models/integrations/openai) & [ChatOpenAI](https://python.langchain.com/docs/modules/model_io/models/openai/chat) for LLM interactions
- [Chroma](https://docs.trychroma.com/) as our vector store
- [PromptTemplate](https://python.langchain.com/docs/modules/prompts/prompt_templates) and core runnables

```
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_chroma import Chroma
from langchain.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
```

---

## 3\. Load and Chunk the PDF

### 3.1 Load the PDF

```
loader = PyPDFLoader("data/handbook.pdf")
pages = loader.load_and_split()
```

### 3.2 Split into Overlapping Chunks

> [!important]
> **Note**
>
> Adjust `chunk_size` and `chunk_overlap` based on your document length and the LLM’s context window.

```
text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=50)
chunks = text_splitter.split_documents(pages)
```

---

## 4\. Generate Embeddings & Build Vector Store

```
embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
vectorstore = Chroma.from_documents(documents=chunks, embedding=embeddings)
```

---

## 5\. Configure Retriever & Formatter

Convert the vector store to a retriever and define a helper to merge relevant chunks:

```
retriever = vectorstore.as_retriever()


def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)
```

---

## 6\. Define the LLM and Prompt Template

We’ll create a system prompt that forces the model to answer based only on retrieved context:

```
llm = ChatOpenAI()


template = """
SYSTEM: You are a question-answering assistant.
Use only the provided context to answer.
If you don’t know, respond with “I don’t know.”
QUESTION: {question}
CONTEXT:
{context}
"""
prompt = PromptTemplate.from_template(template)
```

---

## 7\. Assemble the RAG Chain

Chain steps:

1.  Retrieve relevant chunks
2.  Format them into a context string
3.  Inject into the prompt template
4.  Generate a factual answer
5.  Parse output to string

```
chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)
```

---

## 8\. Query the Chain

```
chain.invoke("How many sick leaves are allowed in a year?")
chain.invoke("How many unpaid personal leaves are allowed in a year?")
chain.invoke("What's the sick leave policy?")
# 'You are eligible for 10 days of paid sick leave per year, which can be used for any illness or injury that prevents you from working.'
```

---

## Summary of Steps

| Step | Action                | Description                                                      |
| ---- | --------------------- | ---------------------------------------------------------------- |
| 1    | Install & Import      | Install `langchain`, import loaders, splitters, embeddings, etc. |
| 2    | Load PDF              | Use `PyPDFLoader`                                                |
| 3    | Chunk Documents       | Split pages with `RecursiveCharacterTextSplitter`                |
| 4    | Embed & Store Vectors | Generate embeddings and index with `Chroma.from_documents`       |
| 5    | Create Retriever      | Convert vector store into a retriever                            |
| 6    | Format Context        | Define `format_docs` helper                                      |
| 7    | Define Prompt & LLM   | Set up `PromptTemplate` and `ChatOpenAI`                         |
| 8    | Build & Invoke Chain  | Assemble LCEL chain and query with `chain.invoke()`              |

---

## Further Reading & References

- [LangChain Documentation](https://python.langchain.com/)
- [Chroma Vector Database](https://docs.trychroma.com/)
- [OpenAI API Reference](https://platform.openai.com/docs)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/e47b44c9-65c3-46f8-8bed-b075a18ab12b/lesson/01cbeda2-251d-4e7b-bf85-cac00fdf40d6)**
>
> Watch video content
