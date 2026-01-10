# Key Libraries Demo - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Tips-Tricks-and-Resources/Key-Libraries-Demo)

---

## Table of Contents

- Key Libraries Demo
  - Table of Contents
  - 1. LangChain Core
  - 2. LangChain Community
  - 3. Official Provider Implementations
  - 4. Main LangChain Library
  - 5. Putting It All Together
  - 6. Further Reading
  - Watch Video

---

## Content

LangChain

Tips Tricks and Resources

# Key Libraries Demo

Discover how LangChain’s libraries are organized across four layers—**Core**, **Community**, **Official Implementations**, and the **Main LangChain** package—and learn how they build upon one another to provide powerful LLM-powered applications.

---

## Table of Contents

1.  [LangChain Core](#1-langchain-core)
2.  [LangChain Community](#2-langchain-community)
3.  [Official Provider Implementations](#3-official-provider-implementations)
4.  [Main LangChain Library](#4-main-langchain-library)
5.  [Putting It All Together](#5-putting-it-all-together)
6.  [Further Reading](#6-further-reading)

---

## 1\. LangChain Core

The `langchain_core` package defines the **abstract base classes**, **types**, and **interfaces** that power every higher-level component.

```
# LangChain Core: base definitions
from langchain_core.messages import AIMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.tools import tool
```

- **AIMessage & HumanMessage**: generic chat message classes
- **ChatPromptTemplate & MessagesPlaceholder**: prompt templating primitives
- **tool**: decorator for defining custom tool interfaces

> [!important]
> **Tip**
>
> Install the core package before anything else:
>
> ```
> pip install langchain-core
> ```

---

## 2\. LangChain Community

Under the `langchain_community` namespace, you’ll find **community-contributed** models, tools, loaders, and callbacks. Each provider lives in its own module for better organization.

```
# LangChain Community: chat models and Gmail tools
from langchain_community.chat_models import ChatOpenAI, ChatDatabricks
from langchain_community.tools.gmail import (
    GmailCreateDraft,
    GmailGetMessage,
    GmailGetThread,
    GmailSearch,
    GmailSendMessage,
)
```

- **ChatOpenAI & ChatDatabricks**: community-maintained wrappers around respective chat APIs
- **Gmail tools**: comprehensive Gmail API integrations

---

## 3\. Official Provider Implementations

Concrete classes for popular LLM providers are maintained in their own packages (e.g., `langchain_openai`, `langchain_anthropic`). These implement the methods defined by the core abstractions.

```
# LangChain OpenAI: concrete LLM implementation
from langchain_openai import ChatOpenAI
```

- **ChatOpenAI**: wraps the OpenAI API, extending `BaseChatModel`
- Similar packages: `langchain_anthropic`, `langchain_azure`, etc.

---

## 4\. Main LangChain Library

The primary `langchain` package ties together **core**, **community**, and **official** implementations to offer ready-to-use **agents**, **chains**, **tools**, and **parsers**.

```
# Main LangChain: agents, tools, and parsers
from langchain.agents import AgentExecutor
from langchain.agents.format_scratchpad import format_to_openai_function_messages
from langchain.output_parsers import OpenAIFunctionsAgentOutputParser
from langchain.tools.render import format_tool_to_openai_function
```

| Component                                      | Description                                              |
| ---------------------------------------------- | -------------------------------------------------------- |
| AgentExecutor                                  | Executes agent loops with tools and prompts              |
| format\\\_to\\\_openai\\\_function\\\_messages | Converts scratchpads into OpenAI function-calling format |
| OpenAIFunctionsAgentOutputParser               | Parses responses from function-calling agents            |
| format\\\_tool\\\_to\\\_openai\\\_function     | Renders a tool’s signature into OpenAI JSON schema       |

> [!important]
> **Version Compatibility**
>
> Ensure that `langchain`, `langchain_core`, and your provider packages share compatible versions to avoid API mismatches.

---

## 5\. Putting It All Together

In a typical application, you’ll import from **all four layers**:

```
# 1. Core components
from langchain_core.messages import AIMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.tools import tool

# 2. Community modules
from langchain_community.chat_models import ChatOpenAI, ChatDatabricks
from langchain_community.tools.gmail import (
    GmailCreateDraft, GmailGetMessage, GmailGetThread,
    GmailSearch, GmailSendMessage,
)

# 3. Official LLM provider
from langchain_openai import ChatOpenAI

# 4. Main LangChain abstractions
from langchain.agents import AgentExecutor
from langchain.agents.format_scratchpad import format_to_openai_function_messages
from langchain.output_parsers import OpenAIFunctionsAgentOutputParser
from langchain.tools.render import format_tool_to_openai_function
```

You will always need:

- **langchain_core** for base types
- At least one provider package (e.g., `langchain_openai`) to call an LLM
- **langchain** for high-level agents, tools, and chains
- **langchain_community** (optional) for extended integrations

---

## 6\. Further Reading

- [LangChain Documentation](https://langchain.readthedocs.io/)
- [LangChain GitHub Repository](https://github.com/langchain-ai/langchain)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)

Explore these resources to deepen your understanding of LangChain’s modular design and accelerate your LLM application development.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/b5f7771a-fdbc-45b1-a786-6c84bb7ffc76/lesson/f16a86c1-c3fa-45fe-b348-31f0f35783cb)**
>
> Watch video content
