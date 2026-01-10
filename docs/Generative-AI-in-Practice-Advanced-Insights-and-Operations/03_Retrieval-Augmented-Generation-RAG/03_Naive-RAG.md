# Naive RAG - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Generative-AI-in-Practice-Advanced-Insights-and-Operations/Retrieval-Augmented-Generation-RAG/Naive-RAG)

---

## Table of Contents

- Naive RAG
  - Overview of the Workflow
  - Embedding Models
  - Document Chunking Techniques
  - Advantages of Naive RAG
  - Limitations of Naive RAG
  - Conclusion
  - Watch Video

---

## Content

Generative AI in Practice: Advanced Insights and Operations

Retrieval Augmented Generation RAG

# Naive RAG

In this lesson, we explore the simplest form of Retrieval-Augmented Generation (RAG), known as Naive RAG. This method follows a straight-forward pipeline by converting inputs to vector embeddings, executing a similarity search, and using the retrieved context to generate responses.

## Overview of the Workflow

The process begins by transforming a user's query into a vector embedding using a dedicated embedding model. This embedding is then compared against pre-processed documents stored in a vector store. Since language models have context window limitations, documents—such as PDFs converted to text—must be split into manageable chunks. It is essential to use the same embedding model for both the query and the documents to ensure consistency in vector space.

The typical workflow involves the following steps:

1.  Transform the user's query into an embedding.
2.  Divide documents into manageable chunks.
3.  Create embeddings for each document chunk using the same model.
4.  Perform a similarity search to retrieve the most relevant chunks.
5.  Augment the query with the retrieved context and pass it to the generative model to produce a response.

![The image is a flowchart illustrating a process involving a user query, embedding model, vector store, and generative language model, with steps for document parsing, vectorization, and response generation.](https://kodekloud.com/kk-media/image/upload/v1752875867/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Naive-RAG/user-query-embedding-flowchart.jpg)

## Embedding Models

There are several embedding models available for use. Common options include Cohere Embed version 3 and OpenAI’s text embedding model. Numerous competitive open-source alternatives can also be found on platforms like Hugging Face.

> [!important]
> **Note**
>
> While general-purpose embeddings typically produce high-quality results due to their extensive dimensionality, specialized datasets may benefit from dynamically adjusted or fine-tuned embeddings. We will explore these advanced strategies in future lessons.

## Document Chunking Techniques

Effective chunking is vital for creating a robust RAG system. Various strategies include:

- **Fixed-size chunking:** Splits text into equally sized segments.
- **Sentence-based chunking:** Divides text at sentence boundaries.
- **Semantic chunking:** Groups together contextually related content.
- **Sliding window chunking:** Creates overlapping chunks to maintain contextual continuity.
- **Hierarchical chunking:** Organizes text in a multi-level structure according to content hierarchy.

Choosing the right chunking method depends on the data characteristics and often requires iterative evaluation to optimize performance.

## Advantages of Naive RAG

Despite its simplicity, Naive RAG offers several benefits:

- Ease of implementation.
- Cost-effectiveness.
- Reduced hallucination due to grounding provided by the retrieved context.

![The image lists three advantages: simplicity, cost-effectiveness, and reduced hallucination, each with an icon and numbered from 01 to 03.](https://kodekloud.com/kk-media/image/upload/v1752875868/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Naive-RAG/advantages-simplicity-cost-effectiveness-hallucination.jpg)

## Limitations of Naive RAG

However, Naive RAG also has significant limitations that should be considered:

- Tightly coupled system components hinder parallel processing.
- Sequential execution may result in increased latency.
- Scalability challenges and a limitation on retrieval quality could impact the overall response quality.

> [!important]
> **Warning**
>
> For large-scale or complex implementations, the constraints of Naive RAG—particularly in terms of scalability and performance—may necessitate the adoption of more advanced techniques.

![The image lists three limitations: latency issues, scalability problems, and limited retrieval quality, each represented with an icon.](https://kodekloud.com/kk-media/image/upload/v1752875869/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Naive-RAG/limitations-latency-scalability-retrieval.jpg)

## Conclusion

While Naive RAG provides a highly accessible and cost-effective solution for basic applications, its inherent limitations in scalability and performance indicate the need for more advanced strategies in larger or more complex scenarios. Future lessons will delve into these advanced techniques to overcome the constraints of the naive approach.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/generative-ai-in-practice-advanced-insights-and-operations/module/530aab3b-2236-4f0e-b1d6-089654d76036/lesson/52b18d3f-954e-40d4-96aa-54473adf0329)**
>
> Watch video content
