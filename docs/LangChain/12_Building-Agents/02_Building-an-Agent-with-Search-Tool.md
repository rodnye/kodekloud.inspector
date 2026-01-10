# Building an Agent with Search Tool - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Building-Agents/Building-an-Agent-with-Search-Tool)

---

## Table of Contents

- Building an Agent with Search Tool
  - Table of Contents
  - 1. Install Dependencies
  - 2. Import Libraries & Configure API Key
  - 3. Define the Prompt Template
  - 4. Initialize LLM, Tools, and History
  - 5. Create Agent & Executor
  - 6. Enable Session Management
  - 7. Invoke the Agent
  - 8. Component Reference Table
  - 9. Next Steps & Observations
  - 10. Links and References
  - Watch Video

---

## Content

LangChain

Building Agents

# Building an Agent with Search Tool

In this guide, you’ll learn how to build a session-aware agent that leverages the [Tavily Search API](https://github.com/langchain-community/langchain-community) to answer questions step by step. We’ll set up message history, define a rich prompt template, instantiate an LLM and tools, and finally run the agent in a persistent session.

---

## Table of Contents

1.  [Install Dependencies](#1-install-dependencies)
2.  [Import Libraries & Configure API Key](#2-import-libraries--configure-api-key)
3.  [Define the Prompt Template](#3-define-the-prompt-template)
4.  [Initialize LLM, Tools, and History](#4-initialize-llm-tools-and-history)
5.  [Create Agent & Executor](#5-create-agent--executor)
6.  [Enable Session Management](#6-enable-session-management)
7.  [Invoke the Agent](#7-invoke-the-agent)
8.  [Component Reference Table](#8-component-reference-table)
9.  [Next Steps & Observations](#9-next-steps--observations)
10. [Links and References](#10-links-and-references)

---

## 1\. Install Dependencies

Install the core LangChain packages and the community search tool:

```
pip install langchain_core langchain_openai langchain_community
```

## 2\. Import Libraries & Configure API Key

Load required modules and read your Tavily API key from the environment.

```
import os


from langchain_core.prompts.chat import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_openai import ChatOpenAI
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain.agents import create_tool_calling_agent, AgentExecutor


# Load your Tavily API key
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
search = TavilySearchResults(api_key=TAVILY_API_KEY)
```

> [!important]
> **Note**
>
> Ensure `TAVILY_API_KEY` is set in your environment (`export TAVILY_API_KEY=your_key_here`) before running the code.

## 3\. Define the Prompt Template

We use a chat prompt that includes:

- A **system** instruction
- A placeholder for **chat history**
- The **user’s input**
- A placeholder for the **agent scratchpad**

```
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant. Think step by step before responding."),
    ("placeholder", "{chat_history}"),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}")
])
```

The **agent scratchpad** holds intermediate reasoning or tool calls before the final response.

## 4\. Initialize LLM, Tools, and History

Instantiate the chat model, register the search tool, and prepare in-memory history.

```
llm = ChatOpenAI()
tools = [search]
message_history = ChatMessageHistory()
```

## 5\. Create Agent & Executor

Build the tool-calling agent and wrap it in an executor for streamlined invocation.

```
agent = create_tool_calling_agent(
    llm=llm,
    tools=tools,
    prompt=prompt
)


agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=False
)
```

## 6\. Enable Session Management

To maintain context across calls, wrap the executor with `RunnableWithMessageHistory`. In production, you can replace the in-memory store with [Redis](https://redis.io).

```
agent_chain = RunnableWithMessageHistory(
    agent_executor,
    # Map a session ID to the shared ChatMessageHistory instance
    lambda session_id: message_history,
    input_messages_key="input",
    history_messages_key="chat_history"
)
```

> [!important]
> **Note**
>
> For scalable session storage, consider using a Redis-backed message history.

## 7\. Invoke the Agent

Pass a `session_id` with every call to preserve dialogue history and agent scratchpad.

```
# 1. Start the session
result = agent_chain.invoke(
    {"input": "hi!"},
    config={"configurable": {"session_id": "session1"}}
)
print(result["output"])
# 2. Query the ICC Men's T20 2024 World Cup schedule
resp = agent_chain.invoke(
    {"input": "When is the ICC Men's T20 2024 World Cup scheduled?"},
    config={"configurable": {"session_id": "session1"}}
)
print(resp["output"])
# 3. Ask which countries are hosting
resp = agent_chain.invoke(
    {"input": "Which countries are hosting?"},
    config={"configurable": {"session_id": "session1"}}
)
print(resp["output"])
# 4. Ask for days until first match
resp = agent_chain.invoke(
    {"input": "How many days before the first match starts?"},
    config={"configurable": {"session_id": "session1"}}
)
print(resp["output"])
# → The LLM may approximate rather than calculate precisely.
```

> [!important]
> **Warning**
>
> The LLM’s arithmetic can be inaccurate. In the next section, we’ll add a Python REPL tool for exact calculations.

## 8\. Component Reference Table

| Component                  | Purpose                             | Instantiation                                   |
| -------------------------- | ----------------------------------- | ----------------------------------------------- |
| ChatOpenAI                 | Core chat-based LLM                 | `ChatOpenAI()`                                  |
| TavilySearchResults        | External search integration         | `TavilySearchResults(api_key=...)`              |
| AgentExecutor              | Executes the tool-calling agent     | `AgentExecutor(agent=…, tools=…)`               |
| RunnableWithMessageHistory | Manages per-session message history | `RunnableWithMessageHistory(agent_executor, …)` |

## 9\. Next Steps & Observations

The agent effectively combines web search results and LLM reasoning for concise answers. To improve numeric accuracy (e.g., date calculations), integrate a Python REPL tool in the next lesson.

## 10\. Links and References

- [LangChain Documentation](https://docs.langchain.com/)
- [LangChain Community Tools](https://github.com/langchain-community/langchain-community)
- [Redis](https://redis.io/)
- [OpenAI API](https://openai.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/530ad7de-8948-4806-8824-19eb10923d1d/lesson/cb8e55e0-21b4-4980-8418-ece887303e7a)**
>
> Watch video content
