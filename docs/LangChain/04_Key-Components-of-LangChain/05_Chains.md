# Chains - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Key-Components-of-LangChain/Chains)

---

## Table of Contents

- Chains
  - Why Use Chains?
  - Core Chain Components
  - Basic Sequential Chain Example
  - Chain Execution Modes
  - Next Steps
  - Watch Video

---

## Content

LangChain

Key Components of LangChain

# Chains

Chains are the fundamental building blocks of LangChain. They let you assemble prompts, language models (LLMs), retrieval components, parsers, functions, and even other chains into unified pipelines. With chains, you can design complex, end-to-end workflows that enhance the capabilities of your language model applications.

![The image shows three colored chain link icons stacked vertically, with an API gear icon above them, labeled "Chains."](https://kodekloud.com/kk-media/image/upload/v1752880985/notes-assets/images/LangChain-Chains/chains-api-gear-icons-stack.jpg)

## Why Use Chains?

By composing modular stages—such as retrievers, prompts, LLMs, and output parsers—you can:

- Inject relevant context before calling an LLM
- Validate or transform model outputs
- Orchestrate multi-step processes, from data fetching to API calls

This approach scales from simple one-step interactions to sophisticated pipelines that power production systems.

## Core Chain Components

| Component     | Purpose                                                   | LangChain Class Example |
| ------------- | --------------------------------------------------------- | ----------------------- |
| Retriever     | Fetches contextual data (e.g., from a vector store)       | `VectorDBRetriever`     |
| Prompt        | Defines the template for LLM input                        | `PromptTemplate`        |
| LLM           | Executes the prompt and generates the raw completion      | `OpenAI`, `AzureOpenAI` |
| Output Parser | Parses or validates LLM outputs (e.g., JSON, regex)       | `PydanticOutputParser`  |
| Function Call | Invokes external APIs or Python functions as part of flow | `StructuredToolChain`   |

> [!important]
> **Note**
>
> You can easily insert an **output parser** to enforce structure on your LLM’s response (for example, ensure valid JSON).

## Basic Sequential Chain Example

The following example shows how to build a simple translation chain:

```
from langchain import PromptTemplate, OpenAI, LLMChain

# 1. Define a prompt template
template = "Translate the following text to French:\n\n{text}"
prompt = PromptTemplate(template=template, input_variables=["text"])

# 2. Initialize the LLM
llm = OpenAI(temperature=0.0)

# 3. Assemble the chain
translation_chain = LLMChain(
    llm=llm,
    prompt=prompt
)

# 4. Run the chain
result = translation_chain.run({"text": "Hello, world!"})
print(result)  # "Bonjour le monde !"
```

## Chain Execution Modes

Chains in LangChain support two primary execution modes:

| Chain Type      | Description                                                            | Use Case                               |
| --------------- | ---------------------------------------------------------------------- | -------------------------------------- |
| SequentialChain | Executes each component step-by-step in a defined order                | Prompt → LLM → Parser                  |
| Router/Parallel | Dispatches inputs to multiple branches in parallel, then merges output | Calling different APIs or data sources |

> [!important]
> **Warning**
>
> Parallel execution can increase throughput but may also raise costs on API calls. Monitor usage carefully.

## Next Steps

Chains are highly extensible. In upcoming sections, we’ll cover:

- Customizing chains with callbacks and middleware
- Building nested or recursive chains
- Integrating chains with external data stores and tools

For more details, see the [LangChain Chains documentation](https://python.langchain.com/docs/modules/chains/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/5bedac05-3eaa-4d0d-9892-e05b80c528fb/lesson/79d145d4-21fc-49e3-af36-4616e469466f)**
>
> Watch video content
