# Resources - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Tips-Tricks-and-Resources/Resources)

---

## Table of Contents

- Resources
  - Official Website and Documentation
  - Documentation Overview
  - Third-Party Integrations
  - Python SDK and API Reference
  - Code Examples
  - Exploring Chains
  - Blog and Updates
  - Links and References
  - Watch Video
  - Practice Lab
    - Core Modules and Model I/O
    - Agents
    - Language Models
    - Agent Toolkits
    - Community LLMs and Modules
    - Initializing an OpenAI Chat Model
    - Creating an LLMChain

---

## Content

LangChain

Tips Tricks and Resources

# Resources

Before diving in, note that LangChain evolves quickly alongside generative AI. This guide covers versions 0.1.10 and 0.1.11. To match the examples below, install one of these versions:

```
pip install langchain==0.1.11
# or
pip install langchain==0.1.10
```

> [!important]
> **Warning**
>
> Always pin your LangChain version to ensure compatibility with course notebooks and examples.

---

## Official Website and Documentation

Start your LangChain journey by browsing the official site and documentation:

- **Website:** [https://langchain.com](https://langchain.com)
- **Docs:** [https://langchain.readthedocs.io](https://langchain.readthedocs.io)

![The image shows two screenshots of the LangChain website and documentation, featuring sections on OpenAI integration and an introduction to LangChain.](https://kodekloud.com/kk-media/image/upload/v1752881017/notes-assets/images/LangChain-Resources/langchain-website-documentation-openai-screenshots.jpg)

You can also follow the LangChain blog for tutorials and release notes, and explore the [Oracle Cloud Infrastructure Python SDK docs](https://docs.oracle.com/en-us/iaas/tools/python/latest/index.html):

![The image shows two website screenshots: one of the Oracle Cloud Infrastructure Documentation for Python SDK and the other of the LangChain blog page.](https://kodekloud.com/kk-media/image/upload/v1752881018/notes-assets/images/LangChain-Resources/oracle-cloud-python-sdk-langchain-blog.jpg)

---

## Documentation Overview

LangChain’s documentation covers everything from basic concepts to advanced modules:

![The image shows a webpage from LangChain's documentation, featuring a navigation menu on the left and a diagram explaining LangChain's components and libraries in the center.](https://kodekloud.com/kk-media/image/upload/v1752881019/notes-assets/images/LangChain-Resources/langchain-documentation-navigation-diagram.jpg)

Below is a quick reference for core modules aligned with this course:

| Module             | Description                                      |
| ------------------ | ------------------------------------------------ |
| Model I/O          | Formatting, predicting, and parsing LLM requests |
| Prompt Engineering | Building and testing templates                   |
| Chat Models        | Conversational interfaces                        |
| Output Parsers     | Structured data extraction                       |
| Retrieval Agents   | Querying external knowledge                      |
| Chains             | Orchestrating multi-step processes               |
| Memory             | Context management between interactions          |

---

### Core Modules and Model I/O

LangChain’s core sections include Model I/O, prompt engineering, chat models, output parsers, retrieval agents, chains, and memory. Here’s a representative flowchart for Model I/O:

![The image shows a webpage from LangChain's documentation, specifically the "Model I/O" section, featuring a flowchart illustrating the process of formatting, predicting, and parsing data with language models.](https://kodekloud.com/kk-media/image/upload/v1752881021/notes-assets/images/LangChain-Resources/langchain-model-io-flowchart-diagram.jpg)

> [!important]
> **Note**
>
> New modules such as LangServ, LangSmith, and LangGraph are under active development and not covered in this guide. Apply for early access if you’d like to experiment.

---

## Third-Party Integrations

LangChain integrates with dozens of LLM providers, embedding models, and vector stores. You can filter integrations based on support for `invoke`, async, streaming, batch, and more:

![The image shows a webpage from LangChain's documentation, detailing LLM integration features with a table indicating support for various functionalities like invoke, async invoke, stream, and batch for different models.](https://kodekloud.com/kk-media/image/upload/v1752881022/notes-assets/images/LangChain-Resources/langchain-llm-integration-features-table.jpg)

Embedding models and databases follow a similar pattern—check the **Integrations** section for your preferred vendor.

---

## Python SDK and API Reference

Every LangChain component is documented under the API reference. You’ll find details for agents, language models, chains, toolkits, and community modules.

### Agents

![The image shows a webpage from the LangChain documentation, specifically focusing on the "langchain.agents" section, detailing classes and functions related to agents in version 0.1.11.](https://kodekloud.com/kk-media/image/upload/v1752881023/notes-assets/images/LangChain-Resources/langchain-agents-documentation-v0-1-11.jpg)

### Language Models

![The image shows a webpage from the LangChain documentation, specifically focusing on the "langchain_core.language_models" module, detailing class hierarchies, main helpers, classes, and functions related to language models.](https://kodekloud.com/kk-media/image/upload/v1752881024/notes-assets/images/LangChain-Resources/langchain-documentation-language-models-module.jpg)

---

### Agent Toolkits

A variety of toolkits help you build and customize agents:

![The image shows a webpage from the LangChain documentation, listing various toolkits and functions related to agent toolkits, along with brief descriptions of each.](https://kodekloud.com/kk-media/image/upload/v1752881026/notes-assets/images/LangChain-Resources/langchain-documentation-agent-toolkits.jpg)

---

### Community LLMs and Modules

Community contributions extend core functionality. Browse community LLM implementations and modules:

![The image shows a webpage from the LangChain documentation, specifically the section on community LLMs (Large Language Models), listing various classes and their descriptions. The left sidebar contains a navigation menu with different modules.](https://kodekloud.com/kk-media/image/upload/v1752881027/notes-assets/images/LangChain-Resources/langchain-community-llms-documentation.jpg)

![The image shows a webpage with a list of LangChain community modules and their descriptions, focusing on various large language models and integrations.](https://kodekloud.com/kk-media/image/upload/v1752881028/notes-assets/images/LangChain-Resources/langchain-community-modules-list-webpage.jpg)

---

## Code Examples

### Initializing an OpenAI Chat Model

```
from langchain_community.llms import OpenAIChat


openai_chat = OpenAIChat(model_name="gpt-3.5-turbo")
```

### Creating an LLMChain

```
from langchain.chains import LLMChain
from langchain_community.llms import OpenAI
from langchain_core.prompts import PromptTemplate


prompt = PromptTemplate(
    input_variables=["adjective"],
    template="Tell me a {adjective} joke"
)


llm_chain = LLMChain(llm=OpenAI(), prompt=prompt)
```

---

## Exploring Chains

Discover all chain implementations in the API reference:

![The image shows a webpage from the LangChain documentation, specifically the API reference for chains, listing various classes and their descriptions.](https://kodekloud.com/kk-media/image/upload/v1752881029/notes-assets/images/LangChain-Resources/langchain-api-reference-chains-classes.jpg)

---

## Blog and Updates

Stay up to date with the latest tutorials, release notes, and community announcements:

- [LangChain Blog](https://blog.langchain.com/)

---

## Links and References

- [LangChain Official Site](https://langchain.com)
- [LangChain Documentation](https://langchain.readthedocs.io)
- [Oracle Cloud Infrastructure Python SDK](https://docs.oracle.com/en-us/iaas/tools/python/latest/index.html)
- [LangChain Blog](https://blog.langchain.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/b5f7771a-fdbc-45b1-a786-6c84bb7ffc76/lesson/376f67ca-6dca-40d9-9d3a-830470975c42)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/langchain/module/b5f7771a-fdbc-45b1-a786-6c84bb7ffc76/lesson/eaabef57-b4d7-4497-aa1d-3bc1724723f4)**
>
> Practice lab
