# Tools - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Key-Components-of-LangChain/Tools)

---

## Table of Contents

- Tools
  - Built-In Tools
  - Creating Custom Tools
  - Toolkits and Agents
  - Links and References
  - Watch Video

---

## Content

LangChain

Key Components of LangChain

# Tools

LangChain’s **tools** allow your applications to interact with external functions, services, and APIs—enabling sophisticated AI-driven workflows that go beyond pure language generation.

![The image is a diagram labeled "Tools" featuring three icons for "Functions," "Services," and "API," each with a distinct color and symbol.](https://kodekloud.com/kk-media/image/upload/v1752880989/notes-assets/images/LangChain-Tools/tools-functions-services-api-diagram.jpg)

## Built-In Tools

LangChain ships with a suite of preconfigured tools for common data sources. Use these when you need reliable access to real-time information or specialized content that enriches your language model’s output.

| Tool Name     | Description                             | Usage Example                                            |
| ------------- | --------------------------------------- | -------------------------------------------------------- |
| Wikipedia     | Fetch summaries and article content     | `tool.run("Tell me about the Apollo missions")`          |
| YouTube       | Retrieve video metadata and transcripts | `tool.run("Get video transcript for 'Intro to Python'")` |
| Google Search | Perform web searches with snippets      | `tool.run("Latest news on renewable energy")`            |

![The image shows the LangChain logo with icons for Wikipedia, YouTube, and Google Search, labeled as tools.](https://kodekloud.com/kk-media/image/upload/v1752880990/notes-assets/images/LangChain-Tools/langchain-logo-wikipedia-youtube-google-tools.jpg)

## Creating Custom Tools

When your project requires integration with proprietary services or data sources not covered by the built-in library, you can define a **custom tool** in just a few steps:

1.  Specify the input schema (usually text).
2.  Call your external API or service.
3.  Format and return the response in a structured form.

> [!important]
> **Note**
>
> Custom tools fit seamlessly into LangChain’s architecture—just implement the `run` method and register your tool with an agent or chain.

![The image is a flowchart showing a process where a user inputs text into a custom tool, which then produces an output.](https://kodekloud.com/kk-media/image/upload/v1752880991/notes-assets/images/LangChain-Tools/text-input-output-flowchart.jpg)

## Toolkits and Agents

- **Toolkits**: Group related tools into a single package for streamlined access.
- **Agents**: Automatically select and invoke the appropriate tool(s) based on the user’s query.

Combining toolkits with agents unlocks fully autonomous AI pipelines: your application can decide which services to call, compose results, and deliver a coherent response—all without manual orchestration.

## Links and References

- [LangChain Official Documentation](https://langchain.com/docs/)
- [Wikipedia](https://www.wikipedia.org/)
- [YouTube](https://www.youtube.com/)
- [Google Search](https://www.google.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/5bedac05-3eaa-4d0d-9892-e05b80c528fb/lesson/f956bded-e65d-4693-b89d-31cb29adb543)**
>
> Watch video content
