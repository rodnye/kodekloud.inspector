# Using Wikipedia Tool - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Using-Tools/Using-Wikipedia-Tool)

---

## Table of Contents

- Using Wikipedia Tool
  - 1. Install Dependencies
  - 2. Setting Up the Wikipedia Tool
  - 3. Inspecting Tool Metadata
  - 4. Running the Wikipedia Tool
  - 5. Common Use Cases
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

LangChain

Using Tools

# Using Wikipedia Tool

Integrating external knowledge sources into your applications can dramatically improve accuracy and relevance. LangChain provides a built-in **Wikipedia** tool that fetches summaries directly from Wikipedia pages. In this guide, you’ll learn how to set up, configure, and run the Wikipedia tool, as well as explore common use cases for real-world applications.

For a full list of available integrations, see the [LangChain Tools Documentation](https://docs.langchain.com/docs/integrations/tools).

## 1\. Install Dependencies

Make sure you have LangChain and the community tools installed:

```
pip install langchain langchain-community
```

## 2\. Setting Up the Wikipedia Tool

First, import the required classes and configure the API wrapper. Two key parameters are:

- `top_k_results`: Number of Wikipedia pages to fetch (default: 1).
- `doc_content_chars_max`: Maximum characters to retrieve from each page (default: 1000).

```
from langchain_community.tools import WikipediaQueryRun
from langchain_community.utilities import WikipediaAPIWrapper


# Configure the wrapper to fetch 1 result with up to 1000 characters
api_wrapper = WikipediaAPIWrapper(
    top_k_results=1,
    doc_content_chars_max=1000
)


# Initialize the Wikipedia query tool
tool = WikipediaQueryRun(api_wrapper=api_wrapper)
```

> [!important]
> **Note**
>
> You don’t need an API key for basic Wikipedia queries, but be mindful of rate limits if making frequent requests.

## 3\. Inspecting Tool Metadata

Every LangChain tool exposes metadata attributes. Here’s an overview of the Wikipedia tool properties:

| Attribute          | Description                                              | Example Output                                    |
| ------------------ | -------------------------------------------------------- | ------------------------------------------------- |
| `tool.name`        | Unique identifier for the tool                           | `"wikipedia"`                                     |
| `tool.description` | Brief explanation of the tool’s functionality            | `"A wrapper around Wikipedia..."`                 |
| `tool.args`        | Expected input parameters (as a dict of name/type pairs) | `{'query': {'title': 'Query', 'type': 'string'}}` |

```
print(tool.name)         # wikipedia
print(tool.description)  # A wrapper around Wikipedia...
print(tool.args)         # {'query': {'title': 'Query', 'type': 'string'}}
```

## 4\. Running the Wikipedia Tool

To fetch a summary for a given topic, call the `run` method with a dictionary containing the `"query"` key:

```
# Fetch a summary of “Neural Network”
result = tool.run({"query": "Neural Network"})
print(result)
```

This returns the topmost summary up to 1000 characters (based on our configuration).

## 5\. Common Use Cases

You can leverage the Wikipedia tool in various application scenarios:

| Use Case               | Description                                                                |
| ---------------------- | -------------------------------------------------------------------------- |
| **LCEL Chains**        | Wrap the tool in a function and include it in a LangChain Execution Layer. |
| **RAG Pipelines**      | Inject Wikipedia summaries as external retrieval context for LLMs.         |
| **Hybrid Q&A Systems** | Combine real-time Wikipedia data with LLM responses for precise answers.   |

> [!important]
> **Warning**
>
> When chaining multiple tools or LLM calls, ensure you handle errors and empty results gracefully to avoid unexpected failures.

## Next Steps

You’ve successfully set up and run the Wikipedia tool. In upcoming lessons, you’ll learn how to:

- Build custom tools
- Orchestrate multiple tools using agents
- Integrate search, plugins, and external APIs in complex workflows

---

## Links and References

- [LangChain Tools Documentation](https://docs.langchain.com/docs/integrations/tools)
- [Wikipedia API Wrapper Source](https://github.com/langchain-community/langchain-community)
- [LangChain Official Site](https://docs.langchain.com)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/06905b96-585d-4c9e-835a-d8fcaca76e2a/lesson/dd8b1038-f63d-4623-9cac-2378b7808082)**
>
> Watch video content
