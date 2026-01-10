# Understanding and Using tools - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Using-Tools/Understanding-and-Using-tools)

---

## Table of Contents

- Understanding and Using tools
  - What Is a Tool?
  - Real-World Example: Airline Chatbot
  - Fetching Live Data with Tools
  - Built-In Tools in LangChain
  - When to Use RAG vs. Tools
  - Putting It All Together
  - References
  - Watch Video

---

## Content

LangChain

Using Tools

# Understanding and Using tools

In this lesson, we’ll dive into **LangChain tools**—modular components that let your LLM applications fetch real-time data or perform advanced processing beyond what a static knowledge base or prompt alone can handle. By the end, you’ll understand when to use retrieval-augmented generation (RAG) versus real-time tools and how they fit into production workflows.

## What Is a Tool?

A _tool_ in LangChain is a configurable wrapper around external functionality—APIs, custom functions, or runtimes like Python REPL. Instead of relying solely on indexed documents or prompts, tools enable:

- Real-time data retrieval (e.g., stock quotes, weather forecasts)
- Dynamic computation or code execution
- Integration with proprietary or third-party services

## Real-World Example: Airline Chatbot

Imagine an airline support chatbot:

1.  **Baggage Policy**  
    The policy is stored in a PDF, already indexed in your vector database. You use RAG to retrieve and inject the policy text into the prompt, and the LLM answers.
2.  **Flight Arrival Time**  
    The expected arrival isn’t in static documents—you must call a flight-tracking API for live data. This is exactly where **tools** come in.

![The image illustrates an airline use case involving a user asking about flight arrival times, with a flight tracking API and a PDF document icon.](https://kodekloud.com/kk-media/image/upload/v1752881030/notes-assets/images/LangChain-Understanding-and-Using-tools/airline-flight-arrival-times-api-illustration.jpg)

## Fetching Live Data with Tools

By plugging a flight-tracking API into your chain, the LLM can request and display up-to-the-minute flight status. You can also stream updates or combine multiple APIs in one workflow.

![The image illustrates an airline use case where a user inquires about flight arrival times using a flight tracking API and tools.](https://kodekloud.com/kk-media/image/upload/v1752881031/notes-assets/images/LangChain-Understanding-and-Using-tools/airline-flight-tracking-api-use-case.jpg)

## Built-In Tools in LangChain

LangChain ships with a variety of ready-to-use tools:

- **Wikipedia**: Fetch article summaries or full pages
- **Search**: Perform live web searches
- **YouTube**: Retrieve and summarize video transcripts
- **Python REPL**: Run snippets of code for computation
- **Custom Functions**: Wrap any proprietary or third-party API

> [!important]
> **Note**
>
> You can extend these tools with your own wrappers or SDKs to integrate specialized services.

Tools become most powerful when orchestrated by **agents**, which automatically decide which tool to call and when. We’ll cover agents in a future lesson.

## When to Use RAG vs. Tools

| Capability             | RAG (Pre-Indexed)                       | Tools (Real-Time)                                 |
| ---------------------- | --------------------------------------- | ------------------------------------------------- |
| Data Source            | Static documents (PDFs, articles)       | Live APIs, streaming endpoints, custom runtimes   |
| Latency                | Batch-driven (indexing over hours/days) | Synchronous, real-time                            |
| Use Cases              | FAQs, policy lookup, historical data    | Flight tracking, stock quotes, on-the-fly compute |
| Integration Complexity | Vector database + retriever + LLM       | API client + tool wrapper + LLM                   |

> [!important]
> **Warning**
>
> Don’t use RAG for live data—indexed documents can’t provide up-to-the-minute information. Instead, plug in a real-time tool.

![The image compares "RAG" and "Tools," highlighting that RAG is for pre-processed and indexed data and happens in batches, while Tools are for real-time information.](https://kodekloud.com/kk-media/image/upload/v1752881032/notes-assets/images/LangChain-Understanding-and-Using-tools/rag-tools-comparison-preprocessed-real-time.jpg)

## Putting It All Together

Returning to our airline chatbot:

- **Baggage Policy** → RAG (static, indexed)
- **Flight Status** → Tools (real-time API calls)

![The image illustrates use cases for an airline chatbot, featuring categories like RAG, baggage policy, tools, and flight tracking. Each category is represented with an icon and text.](https://kodekloud.com/kk-media/image/upload/v1752881033/notes-assets/images/LangChain-Understanding-and-Using-tools/airline-chatbot-use-cases-icons.jpg)

In upcoming demos, we’ll walk through several built-in LangChain tools and show how agents leverage them to build robust, interactive applications.

## References

- [LangChain Tools](https://langchain.com/docs/modules/agents/tools)
- [Vector Database Integration](https://docs.langchain.com/docs/integrations/datastores/vectorstores)
- [Retrieval-Augmented Generation (RAG)](https://docs.langchain.com/docs/guides/rag/overview)
- [LangChain Agents](https://docs.langchain.com/docs/modules/agents/overview)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/06905b96-585d-4c9e-835a-d8fcaca76e2a/lesson/aa3a1783-f92e-417b-9352-d18c1784a501)**
>
> Watch video content
