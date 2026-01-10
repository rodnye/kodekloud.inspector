# Using Retrieval Chain - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Implementing-Chains/Using-Retrieval-Chain)

---

## Table of Contents

- Using Retrieval Chain
  - 1. Load and Chunk Documents
  - 2. Create Embeddings and Vector Store
  - 3. Define Prompt and Initialize LLM
  - 4. Build the Retrieval Chain
  - 5. Query the Chain and Inspect Results
  - References
  - Watch Video
  - Practice Lab
    - Vector Store Options

---

## Content

LangChain

Implementing Chains

# Using Retrieval Chain

In this tutorial, you’ll create a Retrieval-Augmented Generation (RAG) workflow using two TechCrunch articles—one on Anthropic’s latest AI chatbot and another on AI21 Labs’ efficient text model. By the end, you’ll have a chain that searches indexed article chunks and answers questions with grounded context.

![The image is a screenshot of a TechCrunch article titled "Anthropic claims its new AI chatbot models beat OpenAI’s GPT-4," with an illustration of a brain and network connections. There are also advertisements and navigation links visible.](https://kodekloud.com/kk-media/image/upload/v1752880969/notes-assets/images/LangChain-Using-Retrieval-Chain/techcrunch-anthropic-ai-chatbot-screenshot.jpg)

![The image shows a TechCrunch article titled "AI21 Labs' new AI model can handle more context than most," with a colorful abstract graphic below. There are also advertisements for Grammarly and TechCrunch Disrupt 2024.](https://kodekloud.com/kk-media/image/upload/v1752880970/notes-assets/images/LangChain-Using-Retrieval-Chain/ai21-labs-ai-model-techcrunch-article.jpg)

---

## 1\. Load and Chunk Documents

Begin by loading both article URLs into LangChain’s web loader and splitting the text into manageable, overlapping chunks.

```
from langchain.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter


URL1 = "https://techcrunch.com/2024/03/04/anthropic-claims-its-new-models-beat-gpt-4/"
URL2 = "https://techcrunch.com/2024/03/28/ai21-labs-new-text-generating-ai-model-is-more-efficient-than-most/"


loader = WebBaseLoader([URL1, URL2])
documents = loader.load()


text_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=50)
chunks = text_splitter.split_documents(documents)
```

> [!important]
> **Note**
>
> Make sure you have the latest versions of `langchain` installed:
>
> ```
> pip install langchain langchain-community
> ```

---

## 2\. Create Embeddings and Vector Store

Transform each text chunk into embeddings and index them with FAISS for fast similarity search.

```
from langchain_community.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings


embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
vector_store = FAISS.from_documents(chunks, embeddings)
retriever = vector_store.as_retriever()
```

### Vector Store Options

| Vector Store | Description                            | Install Command               |
| ------------ | -------------------------------------- | ----------------------------- |
| FAISS        | In-memory similarity search from Meta  | `pip install faiss-cpu`       |
| Chroma       | Lightweight persistent vector database | `pip install chromadb`        |
| Weaviate     | Managed cloud vector service           | `pip install weaviate-client` |

---

## 3\. Define Prompt and Initialize LLM

Craft a template that limits responses to retrieved context. Use a zero temperature to reduce hallucinations.

```
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI


prompt_template = """
Answer the question "{input}" based solely on the context below:


<context>
{context}
</context>
If you can't find an answer, say "I don't know."
"""


prompt = PromptTemplate.from_template(prompt_template)
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.0)
```

> [!important]
> **Warning**
>
> Setting `temperature=0.0` helps ensure the model sticks to retrieved information and minimizes made-up content.

---

## 4\. Build the Retrieval Chain

Link the retriever with a “stuff documents” chain so only relevant chunks appear in the prompt.

```
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain


combine_docs_chain = create_stuff_documents_chain(llm=llm, prompt=prompt)
chain = create_retrieval_chain(retriever, combine_docs_chain)
```

---

## 5\. Query the Chain and Inspect Results

Submit a question about token windows and get an answer grounded in the articles.

```
query = "List the models and their token size of models only from Anthropic and AI21 Labs"
result = chain.invoke({"input": query})
print(result["answer"])
```

Expected output:

```
- Anthropic's Claude 3: 200,000-token context window
- AI21 Labs' new AI model: 65,000-token context window
```

To examine which text chunks were retrieved:

```
print(result["context"])
```

> [!important]
> **Note**
>
> Viewing `result["context"]` helps you debug which segments were used to generate the answer.

---

## References

- [LangChain Documentation](https://python.langchain.com/)
- [OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings)
- [FAISS Vector Store (GitHub)](https://github.com/facebookresearch/faiss)
- TechCrunch Article 1: [https://techcrunch.com/2024/03/04/anthropic-claims-its-new-models-beat-gpt-4/](https://techcrunch.com/2024/03/04/anthropic-claims-its-new-models-beat-gpt-4/)
- TechCrunch Article 2: [https://techcrunch.com/2024/03/28/ai21-labs-new-text-generating-ai-model-is-more-efficient-than-most/](https://techcrunch.com/2024/03/28/ai21-labs-new-text-generating-ai-model-is-more-efficient-than-most/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/a4d85af7-bfc2-40d7-89fc-f537792272ff/lesson/0843457b-6b9d-427b-ab23-b10fd85e5d3a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/langchain/module/a4d85af7-bfc2-40d7-89fc-f537792272ff/lesson/55070b59-13f6-499d-95e1-9dc34f3f681d)**
>
> Practice lab
