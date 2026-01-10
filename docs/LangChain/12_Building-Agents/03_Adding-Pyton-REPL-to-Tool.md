# Adding Pyton REPL to Tool - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Building-Agents/Adding-Pyton-REPL-to-Tool)

---

## Table of Contents

- Adding Pyton REPL to Tool
  - Prerequisites
  - 1. Import Modules and Initialize Tools
  - 2. Build the Chat Prompt Template
  - 3. Initialize the Agent Executor
  - 4. Example Queries
  - Under the Hood: Python REPL Execution
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

LangChain

Building Agents

# Adding Pyton REPL to Tool

In this guide, we'll extend a LangChain-based agent with **Python REPL** functionality. By combining the **Tavily Search Results** tool for information lookup with a Python REPL tool for on-the-fly calculations, your agent can handle both data retrieval and computation seamlessly.

> [!important]
> **Note**
>
> Make sure you have Python 3.8+ installed and the necessary packages (`langchain`, `langchain-experimental`, `langchain-openai`, `langchain-community`) available in your environment.

## Prerequisites

- Tavily API key stored in the `TAVILY_API_KEY` environment variable
- Access to OpenAI's Chat API via `langchain-openai`

> [!important]
> **Warning**
>
> Without a valid **TAVILY_API_KEY**, the search tool will fail to retrieve tournament data. Use `export TAVILY_API_KEY=your_api_key` to configure it.

## 1\. Import Modules and Initialize Tools

```
from langchain_core.prompts.chat import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory


from langchain_openai import ChatOpenAI
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_experimental.tools import PythonREPLTool


from langchain.agents import create_tool_calling_agent
from langchain.agents import AgentExecutor


import os


# Set your Tavily API key
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")


search = TavilySearchResults()
python_repl = PythonREPLTool()
```

## 2\. Build the Chat Prompt Template

```
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant. Think step by step before responding."),
    ("placeholder", "{chat_history}"),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}")
])
```

## 3\. Initialize the Agent Executor

```
llm = ChatOpenAI()
tools = [search, python_repl]
message_history = ChatMessageHistory()


agent = create_tool_calling_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)
```

## 4\. Example Queries

Below are common examples demonstrating search and computation capabilities.

| Tool           | Use Case              | Initialization          |
| -------------- | --------------------- | ----------------------- |
| search         | Fetch tournament data | `TavilySearchResults()` |
| python\\\_repl | Execute Python code   | `PythonREPLTool()`      |

1.  **Tournament Schedule**

    ```
    response = agent_executor.invoke({"input": "When is the ICC Men's T20 World Cup scheduled?"})
    print(response["output"])
    ```

2.  **Hosting Countries**

    ```
    response = agent_executor.invoke(
        {"input": "Which countries are hosting?"},
        config={"configurable": {"$session_id": "session"}}
    )
    print(response["output"])
    ```

3.  **Date Calculation**

    ```
    response = agent_executor.invoke({
        "input": "Today's date is May 1st, 2024. How many days before the first match starts?"
    })
    print(response["output"])
    ```

## Under the Hood: Python REPL Execution

```
# Code executed in the Python REPL environment
from datetime import datetime


start_date = datetime(2024, 6, 1)
today_date = datetime(2024, 5, 1)
days_until_start = (start_date - today_date).days
print(days_until_start)
```

This code prints:

```
31
```

And the agent returns:

> There are 31 days left before the first match of the ICC Men's T20 World Cup 2024 starts on June 1, 2024.

By combining the Tavily search tool for tournament data and the Python REPL tool for on-the-fly math, the agent can answer complex queries accurately and interactively.

---

## Links and References

- [LangChain Documentation](https://langchain.readthedocs.io/)
- [OpenAI Chat API](https://platform.openai.com/docs/api-reference/chat)
- [Tavily Search Results Tool](https://github.com/langchain-community/langchain-community)

Stay tuned for more demos and advanced capabilities in upcoming articles!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/530ad7de-8948-4806-8824-19eb10923d1d/lesson/36589ae2-a513-4802-a9c4-7890498a4018)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/langchain/module/530ad7de-8948-4806-8824-19eb10923d1d/lesson/81d50dee-7ffb-4092-95c2-3f8b8b07686b)**
>
> Practice lab
