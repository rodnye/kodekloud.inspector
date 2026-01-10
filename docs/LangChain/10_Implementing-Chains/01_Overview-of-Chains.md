# Overview of Chains - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Implementing-Chains/Overview-of-Chains)

---

## Table of Contents

- Overview of Chains
  - 1. Summarization with Create Stuff Documents Chain
  - 2. Retrieval with Create Retrieval Chain
  - Comparison of Built-In Chains
  - Next Steps
  - Links and References
  - Watch Video
    - Example: Batch Summarization
    - Example: Simple RAG Pipeline

---

## Content

LangChain

Implementing Chains

# Overview of Chains

In this lesson, we’ll explore two high-level chains that streamline common workflows in LangChain:

1.  **Summarization**: Batch summarization using the Create Stuff Documents Chain
2.  **Retrieval**: Retrieval-Augmented Generation (RAG) via the Create Retrieval Chain

These constructs let you process multiple documents without reinventing the wheel, whether you need to summarize everything at once or selectively retrieve relevant passages.

---

## 1\. Summarization with Create Stuff Documents Chain

The **Create Stuff Documents Chain** merges a list of document chunks into a single prompt and sends it to your LLM. This is ideal when your combined content stays within the model’s context window.

Use cases:

- Summarize multiple documents in one pass
- Extract specific insights across all inputs

![The image features a graphic titled "Built-in Chain Constructs" with an icon and text that reads "Summarization based on Create Stuff Documents Chain."](https://kodekloud.com/kk-media/image/upload/v1752880966/notes-assets/images/LangChain-Overview-of-Chains/built-in-chain-constructs-summarization.jpg)

### Example: Batch Summarization

```
from langchain.chains import create_stuff_documents_chain
from langchain.llms import OpenAI
from langchain.schema import Document


# Initialize your LLM
llm = OpenAI(model_name="gpt-4")


# Prepare document chunks
docs = [
    Document(page_content="Document text chunk 1..."),
    Document(page_content="Document text chunk 2..."),
    # ...
]


# Build the chain
chain = create_stuff_documents_chain(llm=llm)


# Run the summarization
summary = chain.run(input_documents=docs)
print("Summary:", summary)
```

> [!important]
> **Note**
>
> Ensure the total token count of your document chunks doesn’t exceed your model’s context limit. You can use the [`tiktoken`](https://github.com/openai/tiktoken) library to estimate tokens in advance.

---

## 2\. Retrieval with Create Retrieval Chain

For larger corpora that exceed a single prompt window, the **Create Retrieval Chain** combines a retriever with the Stuff Documents logic. This effectively implements a simple RAG workflow:

1.  **Retriever** retrieves the most relevant chunks.
2.  **Document Chain** formats those chunks into a prompt.
3.  **LLM** generates the final answer.

![The image is a slide titled "Built-in Chain Constructs" showing a step labeled "2" with the task "Create Retrieval Chain," marked as "Easy."](https://kodekloud.com/kk-media/image/upload/v1752880967/notes-assets/images/LangChain-Overview-of-Chains/built-in-chain-constructs-retrieval-chain.jpg)

![The image shows a diagram titled "Built-in Chain Constructs" with two linked chain icons connected by a "Retriever" icon in the center.](https://kodekloud.com/kk-media/image/upload/v1752880967/notes-assets/images/LangChain-Overview-of-Chains/built-in-chain-constructs-diagram.jpg)

### Example: Simple RAG Pipeline

```
from langchain.chains import create_retrieval_chain
from langchain.llms import OpenAI
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings


# Set up embeddings and vector store
embeddings = OpenAIEmbeddings()
vectorstore = FAISS.from_texts(["Doc text A", "Doc text B"], embeddings)


# Build the retrieval chain
retrieval_chain = create_retrieval_chain(
    llm=OpenAI(model_name="gpt-4"),
    retriever=vectorstore.as_retriever()
)


# Run RAG
query = "What are the key takeaways from these documents?"
result = retrieval_chain.run(query)
print("Answer:", result)
```

> [!important]
> **Warning**
>
> Always index your documents using the same embedding model you use at query time to ensure consistency in vector representations.

---

## Comparison of Built-In Chains

| Chain Type                   | Use Case                                       | Components                       | Key Benefit                  |
| ---------------------------- | ---------------------------------------------- | -------------------------------- | ---------------------------- |
| Create Stuff Documents Chain | Batch summarization, multi-doc info extraction | LLM                              | Simple prompt stitching      |
| Create Retrieval Chain       | RAG over large corpora                         | Retriever + LLM + Document Chain | Scales beyond context window |

---

## Next Steps

Now that you understand both the **Summarization** and **Retrieval** chains, let’s dive into hands-on demos to see them in action.

---

## Links and References

- [LangChain Documentation: Chains](https://langchain.readthedocs.io/en/latest/modules/chains.html)
- [Retrieval-Augmented Generation (RAG) Overview](https://en.wikipedia.org/wiki/Retrieval-augmented_generation)
- [OpenAI Python SDK](https://github.com/openai/openai-python)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/a4d85af7-bfc2-40d7-89fc-f537792272ff/lesson/83ce2c7c-a5ea-428f-8fec-a33a56c9d69e)**
>
> Watch video content
