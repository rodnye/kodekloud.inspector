# Agents - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Key-Components-of-LangChain/Agents)

---

## Table of Contents

- Agents
  - Agent Workflow
  - Common Agent Use Cases
  - Built-in Agent Support
  - LangChain Building Blocks
  - Links and References
  - Watch Video

---

## Content

LangChain

Key Components of LangChain

# Agents

Agents are the most advanced LangChain components, combining the comprehension and reasoning power of large language models (LLMs) with external tools to tackle complex tasks. An agent dynamically queries an LLM whenever it needs extra “brain power,” then orchestrates APIs or services to accomplish user objectives.

> [!important]
> **Note**
>
> Agents operate in a loop: they consult the LLM for reasoning, invoke tools (APIs, databases, etc.), and feed results back into the LLM until the task is complete.

## Agent Workflow

When a user issues a high-level request—such as:

> “Book me a cab for my return flight.”

—the agent breaks it down into sub-steps by interacting with the LLM and external tools:

1.  **Receive Request**  
    The user’s input is sent to the agent’s controller.
2.  **Clarify with the LLM**  
    The agent asks the LLM questions:
    - What is the flight number?
    - When does the flight depart?
    - What’s the destination city?
3.  **Select Tools**  
    Based on the LLM’s clarifications, the agent chooses required integrations (e.g., a calendar API).
4.  **Query External Services**  
    The agent invokes chosen tools, retrieves data, and forwards answers to the LLM.
5.  **Generate Plan**  
    The LLM synthesizes a detailed step-by-step plan.
6.  **Execute Actions**  
    Finally, the agent uses the plan to call the appropriate APIs (ride-hailing, email confirmation, etc.).

![The image is a diagram showing a user interacting with an agent, which checks tools like a calendar and an LLM (large language model).](https://kodekloud.com/kk-media/image/upload/v1752880982/notes-assets/images/LangChain-Agents/user-agent-interaction-calendar-llm-diagram.jpg)

## Common Agent Use Cases

Because agents can loop between LLM reasoning and external tools, they excel at:

| Use Case            | Description                                                  | Example                                        |
| ------------------- | ------------------------------------------------------------ | ---------------------------------------------- |
| Personal Assistants | Automate scheduling, reminders, and travel planning          | Book flights, reserve hotels, manage calendars |
| Data Extraction     | Pull structured data from documents or websites              | Extract tables from PDFs, scrape web pages     |
| Q&A Systems         | Answer domain-specific questions with tool-augmented context | Internal knowledge-base querying               |
| Chatbots            | Maintain multi-turn dialogue with external API lookups       | Order tracking, support ticket status          |
| Summarization       | Generate concise summaries of long texts or conversations    | Meeting notes, research article digests        |

![The image is a diagram titled "Agents" with a central icon of a robot and surrounding labels: Personal Assistants, Data Extraction, Q and A Systems, Chatbots, and Summarization.](https://kodekloud.com/kk-media/image/upload/v1752880983/notes-assets/images/LangChain-Agents/agents-robot-diagram-personal-assistants.jpg)

## Built-in Agent Support

LangChain ships with robust agent frameworks out of the box:

- **Function Calling**: Define and register custom functions that the LLM can invoke.
- **Tool Integration**: Seamlessly plug in any API or service as a “tool” for the agent.
- **Custom Workflows**: Combine multiple tools and conditional logic into one orchestrated pipeline.

With these features, you can rapidly prototype powerful agent-driven applications for virtually any domain.

---

## LangChain Building Blocks

Below is the big-picture view of core LangChain components covered so far:

- **Model I/O**: Designing prompts and processing LLM responses.
- **Memory**: Managing conversational context, both short-term and long-term.
- **Retrieval**: Connecting to external data sources and fetching relevant content.
- **Chains**: Chaining together prompts, APIs, and logic into a cohesive pipeline.
- **Tools**: Exposing APIs and services for agents to interact with.
- **Agents**: Orchestrating LLM reasoning with tools to solve complex tasks.

Next up, we’ll dive into Model I/O with hands-on code examples to see how LangChain interfaces with language models.

## Links and References

- [LangChain Documentation](https://langchain.com/docs)
- [Large Language Models Overview](https://en.wikipedia.org/wiki/Large_language_model)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/5bedac05-3eaa-4d0d-9892-e05b80c528fb/lesson/db49466c-c5af-4c79-b889-cf31536588ca)**
>
> Watch video content
