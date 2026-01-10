# Dynamic Context - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/Using-Word-Embeddings-For-Dynamic-Context/Dynamic-Context)

---

## Table of Contents

- Dynamic Context
  - Why Dynamic Context Matters
  - Core Workflow: Indexing & Retrieval
  - End-to-End Sequence
  - Next Steps: Hands-On Demo
  - Links and References
  - Watch Video
    - 1. Indexing
    - 2. Retrieval

---

## Content

Mastering Generative AI with OpenAI

Using Word Embeddings For Dynamic Context

# Dynamic Context

In this lesson, we’ll explore how to enrich large language models (LLMs) with up-to-date information by injecting **dynamic context** from your own datasets—whether they’re confidential, private, internal, or public. This technique helps you build chatbots and applications that stay current beyond GPT-3.5’s September 2021 pre-training cutoff.

![The image illustrates the concept of "Adding Dynamic Context" with a diagram of a chatbot and categories labeled "Confidential," "Private," "Internal," and "Public."](https://kodekloud.com/kk-media/image/upload/v1752881579/notes-assets/images/Mastering-Generative-AI-with-OpenAI-Dynamic-Context/adding-dynamic-context-chatbot-diagram.jpg)

## Why Dynamic Context Matters

Large language models are powerful, but their knowledge is frozen at the time of their last pre-training. To handle events, documents, or data generated after September 2021, you need a way to feed fresh information at query time.

![The image displays the text "Adding Dynamic Context" and "September 2021 (Cut-off date for the pre-training of GPT 3.5)" with a copyright notice from KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752881580/notes-assets/images/Mastering-Generative-AI-with-OpenAI-Dynamic-Context/adding-dynamic-context-september-2021.jpg)

## Core Workflow: Indexing & Retrieval

Adding dynamic context involves two key phases:

| Phase     | Purpose                                    | Example Tools                              |
| --------- | ------------------------------------------ | ------------------------------------------ |
| Indexing  | Convert documents into vector embeddings   | OpenAI Embeddings, Hugging Face Embeddings |
| Retrieval | Find and return the most relevant passages | Pinecone, Weaviate, Elasticsearch          |

### 1\. Indexing

- Break each document, FAQ, or dataset entry into chunks.
- Generate a vector embedding for each chunk.
- Store embeddings in a vector database (often called a “vector store”).

### 2\. Retrieval

- Compute the embedding for the user’s prompt.
- Perform a similarity search against your vector store.
- Retrieve the top-k most relevant passages.

> [!important]
> **Note**
>
> Adjust the value of k (top-k passages) based on token limits and response quality.

![The image is a flowchart illustrating the process of adding dynamic context, involving LLMs, similarity search, and output. Each step is represented by an icon and labeled accordingly.](https://kodekloud.com/kk-media/image/upload/v1752881580/notes-assets/images/Mastering-Generative-AI-with-OpenAI-Dynamic-Context/dynamic-context-flowchart-llms-similarity-output.jpg)

## End-to-End Sequence

1.  **User Query:** A prompt is submitted through the chatbot UI.
2.  **Embedding:** The application computes an embedding for the prompt.
3.  **Search:** The vector store returns the most similar passages.
4.  **Injection:** Retrieved passages are prepended (or appended) to the original prompt.
5.  **LLM Call:** The augmented prompt is sent to the language model API.
6.  **Generation:** The model uses both pre-trained knowledge and dynamic context to craft a precise answer.
7.  **Response:** The chatbot displays the final output to the user.

![The image is a flowchart illustrating the process of adding dynamic context, involving a user interacting with a chatbot, which connects to search and retrieval, embeddings, and a large language model (LLM).](https://kodekloud.com/kk-media/image/upload/v1752881581/notes-assets/images/Mastering-Generative-AI-with-OpenAI-Dynamic-Context/dynamic-context-chatbot-flowchart.jpg)

## Next Steps: Hands-On Demo

In the following section, we’ll implement a working prototype using the **AskUs** dataset, which contains events and information generated after GPT-3.5’s cutoff. You’ll see how dynamic context dramatically improves answer accuracy with real-world data. Ready to dive in?

---

## Links and References

- [OpenAI Embeddings API](https://platform.openai.com/docs/guides/embeddings)
- [Pinecone Vector Database](https://www.pinecone.io/)
- [Weaviate Documentation](https://weaviate.io/developers/weaviate)
- [GPT-3.5 Overview](https://platform.openai.com/docs/models/gpt-3-5)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/cf879fc5-dcc3-4470-830d-4393645105c9/lesson/b91122d1-07fc-4e65-b8b6-e4d1d7f8cd90)**
>
> Watch video content
