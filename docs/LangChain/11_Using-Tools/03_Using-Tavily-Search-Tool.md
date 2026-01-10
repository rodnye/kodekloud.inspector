# Using Tavily Search Tool - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Using-Tools/Using-Tavily-Search-Tool)

---

## Table of Contents

- Using Tavily Search Tool
  - What Is Tavily?
  - Sign Up and Obtain Your API Key
  - Setting Your API Key
  - Install the LangChain Community Tool
  - Using TavilySearchResults in Python
  - Response Structure
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

LangChain

Using Tools

# Using Tavily Search Tool

In this guide, you’ll learn how to integrate **Tavily**—a search API built for large language models (LLMs) and retrieval-augmented generation (RAG)—into your workflows. Tavily provides real-time, up-to-date context by connecting your LLM directly to the web.

![The image is a webpage for Tavily AI, promoting a search API optimized for LLMs and RAG, with options to open in GitHub or join the community. It highlights features like in-depth research and intelligent query suggestions.](https://kodekloud.com/kk-media/image/upload/v1752881034/notes-assets/images/LangChain-Using-Tavily-Search-Tool/tavily-ai-search-api-llms-rag.jpg)

## What Is Tavily?

Tavily.com offers a fast, persistent search engine that you can call via API. Think of it as **search-augmented retrieval**, supplying fresh information your LLM can consume to improve accuracy and relevance.

> [!important]
> **Note**
>
> Tavily’s free tier includes **1,000 API calls per month**—perfect for experimentation and small projects.

## Sign Up and Obtain Your API Key

1.  Go to [Tavily.com](https://tavily.com) and create your account.
2.  Navigate to the dashboard to view your plan and API usage.

![The image shows a dashboard for Tavily AI, displaying a "Researcher" plan with an API limit of 90 out of 1,000 requests used, along with an API key partially visible.](https://kodekloud.com/kk-media/image/upload/v1752881035/notes-assets/images/LangChain-Using-Tavily-Search-Tool/tavily-ai-researcher-plan-dashboard.jpg)

## Setting Your API Key

Export your key as an environment variable before running any code.

| Operating System   | Command                                       |
| ------------------ | --------------------------------------------- |
| macOS/Linux        | `export TAVILY_API_KEY="Your Tavily API Key"` |
| Windows PowerShell | `$env:TAVILY_API_KEY="Your Tavily API Key"`   |

> [!important]
> **Warning**
>
> Never commit your `TAVILY_API_KEY` to public repositories. Treat it like a password!

## Install the LangChain Community Tool

Make sure you have the required package:

```
pip install langchain-community
```

## Using `TavilySearchResults` in Python

Below is a sample script that queries Tavily and prints out the results:

```
import os
from langchain_community.tools.tavily_search import TavilySearchResults


# Load your API key from the environment
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")


# Initialize the Tavily search tool
tool = TavilySearchResults()


# Perform a search query
response = tool.invoke({"query": "When is ICC Men's T20 World Cup 2024 starting?"})


# Inspect the results
print("Number of results:", len(response))
print("First URL:", response[0]["url"])
print("First snippet:", response[0]["content"])
```

## Response Structure

Tavily returns a list of dictionaries with the following fields:

| Field     | Description                                     |
| --------- | ----------------------------------------------- |
| `url`     | The source link for the search result           |
| `content` | A short snippet or summary from the linked page |

**Example output:**

```
Number of results: 5
First URL: https://www.espncricinfo.com/series/icc-men-s-t20-world-cup-2024-1411166/match-schedule-fixtures-and-results
First snippet: "Get 2024 T20 World Cup schedule, fixtures, scorecard updates, and results on ESPNcricinfo. Track latest match scores, schedule, and results of ICC Men's T20 World Cup 2024."
```

## Next Steps

- Combine multiple snippets into a single context string for your LLM.
- Explore additional [LangChain Community tools](https://github.com/langchain-ai/langchain-community) for advanced workflows.
- Experiment with different queries to see how real-time search data improves your applications.

## Links and References

- [Tavily Documentation](https://tavily.com/docs)
- [LangChain Community](https://github.com/langchain-ai/langchain-community)
- [Retrieval-Augmented Generation (RAG)](https://www.deepset.ai/guides/what-is-rag)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/06905b96-585d-4c9e-835a-d8fcaca76e2a/lesson/539b06ca-74c9-4105-a342-f3d2444affb0)**
>
> Watch video content
