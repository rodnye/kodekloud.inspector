# What is LangChain - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Overview-of-LangChain/What-is-LangChain)

---

## Table of Contents

- What is LangChain
  - Why Choose LangChain?
  - A Brief History
  - SDKs, Languages, and Getting Started
  - Links and References
  - Watch Video

---

## Content

LangChain

Overview of LangChain

# What is LangChain

LangChain is an open-source framework and SDK that streamlines the development of generative AI applications. Acting as a middleware layer, it connects your code to the core components of any LLM-powered system—language models, embeddings, vector databases, and external data—while managing authentication and API orchestration so you can focus on application logic.  
![The image is an infographic titled "Understanding LangChain," featuring icons and labels for Embeddings, External Data, Vector Databases, and Language Models. It includes a logo with a parrot and chain link.](https://kodekloud.com/kk-media/image/upload/v1752880992/notes-assets/images/LangChain-What-is-LangChain/understanding-langchain-infographic-icons.jpg)

## Why Choose LangChain?

Without a unifying layer like LangChain, you’d handle each model’s API, write custom adapters for vector stores, and hard-code data connectors. LangChain decouples these concerns: change your LLM provider or swap vector databases simply by updating configuration, with up to 99% of your application code untouched.

| Building Block   | Purpose                         | Benefit                                        |
| ---------------- | ------------------------------- | ---------------------------------------------- |
| Language Models  | Text generation and completion  | Switch providers (OpenAI, Anthropic, etc.)     |
| Embeddings       | Semantic vector representations | Unified API for all embedding models           |
| Vector Databases | Similarity search and storage   | Plug‐and‐play with FAISS, Pinecone, Weaviate   |
| External Data    | Enterprise knowledge sources    | Prebuilt connectors for SQL, APIs, file stores |

![The image is a presentation slide titled "Understanding LangChain" with icons representing "Framework," "SDK," and "Middleware." It includes a parrot and chain link emoji next to the LangChain text.](https://kodekloud.com/kk-media/image/upload/v1752880993/notes-assets/images/LangChain-What-is-LangChain/understanding-langchain-framework-sdk-middleware.jpg)

## A Brief History

LangChain debuted in late October 2022, just before ChatGPT’s launch in November 2022. Created by Harrison Chase, it rapidly garnered a vibrant community of contributors, extending its adapters, integrations, and tutorial ecosystem.  
![The image shows the logos of LangChain and ChatGPT, with their respective release dates: late October 2022 for LangChain and November 2022 for ChatGPT.](https://kodekloud.com/kk-media/image/upload/v1752880994/notes-assets/images/LangChain-What-is-LangChain/langchain-chatgpt-logos-release-dates.jpg)

## SDKs, Languages, and Getting Started

LangChain supports both Python and JavaScript/TypeScript SDKs. This guide focuses on the Python SDK and its seamless integration with OpenAI’s API. While you can plug in any LLM provider, our code samples will demonstrate OpenAI usage.

> [!important]
> **Note**
>
> If you’re new to OpenAI, review the [OpenAI API documentation](https://platform.openai.com/docs/) and set up your API key before proceeding.

1.  Install the SDK:

    ```
    pip install langchain openai
    ```

2.  Configure your OpenAI key:

    ```
    export OPENAI_API_KEY="your_api_key_here"
    ```

3.  Initialize a simple Chat model:

    ```
    from langchain.chat_models import ChatOpenAI


    chat = ChatOpenAI(model_name="gpt-4", temperature=0.7)
    response = chat.predict("Explain LangChain in simple terms.")
    print(response)
    ```

![The image features the text "The Rise of LangChain" with logos for LangChain and OpenAI, along with an icon labeled "Application."](https://kodekloud.com/kk-media/image/upload/v1752880995/notes-assets/images/LangChain-What-is-LangChain/rise-of-langchain-openai-application.jpg)

## Links and References

- [Official LangChain Documentation](https://langchain.com/docs)
- [LangChain GitHub Repository](https://github.com/langchain-ai/langchain)
- [OpenAI API](https://platform.openai.com/docs/)
- [Vector Database Comparison](https://www.pinecone.io/learn/vector-database-comparison/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/ab7ff6ea-63e2-4d3b-af7c-ed22616cc3b6/lesson/185f55c8-b528-4016-a4ea-e35690c295f4)**
>
> Watch video content
