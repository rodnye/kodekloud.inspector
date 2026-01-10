# What are Agents - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Building-Agents/What-are-Agents)

---

## Table of Contents

- What are Agents
  - Prerequisites
  - Observations on Large Language Models (LLMs)
  - Addressing LLM Limitations
  - Introducing LangChain Agents
  - Advantages of Agents
  - Agents vs. LLMs: A Comparison
  - The Big Picture Architecture
  - How Agents Work
  - Agent Use Cases
  - References
  - Watch Video

---

## Content

LangChain

Building Agents

# What are Agents

In this final lesson, we bring together prompt engineering, memory management, tool integration, and retrieval-augmented generation (RAG) to build a complete LangChain agent. You’ll see how to orchestrate Long Language Models (LLMs) with external tools and memory stores in one cohesive workflow.

![The image lists prerequisites for a task, including prompt engineering, adding memory, using tools, and performing retrieval augmented generation (RAG).](https://kodekloud.com/kk-media/image/upload/v1752880942/notes-assets/images/LangChain-What-are-Agents/prerequisites-prompt-engineering-memory-tools-rag.jpg)

## Prerequisites

- Prompt engineering best practices
- Short-term and long-term memory strategies
- Integrating external tools (APIs, Python REPL, search)
- Retrieval-Augmented Generation for grounding responses

## Observations on Large Language Models (LLMs)

LLMs power modern AI but come with both strengths and limitations:

- **Statelessness**: No built-in memory across calls
- **Synchronous execution**: Single-turn prompt processing
- **Varying intelligence**: GPT-4 vs. smaller models
- **Hallucination risk**: Inventing unsupported details
- **No internet access**: Stuck with training data cutoff
- **Weak math**: Simple arithmetic often fails
- **Non-deterministic**: Outputs and formats can change

![The image presents observations about Large Language Models (LLMs), highlighting their intelligence and potential for memory addition on the positive side, and their statelessness, hallucination, lack of internet access, poor math skills, and non-deterministic output on the negative side.](https://kodekloud.com/kk-media/image/upload/v1752880943/notes-assets/images/LangChain-What-are-Agents/llm-observations-intelligence-memory-limitations.jpg)

## Addressing LLM Limitations

LangChain modules help overcome these challenges:

- **Memory**: Short-term scratchpads & long-term stores
- **Grounding**: RAG with vector stores and document retrieval
- **Real-time data**: API/tool integrations (e.g., search, weather)
- **Accurate math**: Python REPL tool for calculations
- **Consistent output**: Prompt templates + output parsers

When you need all these in one workflow, agents are the solution.

## Introducing LangChain Agents

Agents are orchestration layers that combine LLMs with tools, memory, and custom code to handle multi-step tasks.

![The image illustrates the "Role of Agents" with icons representing programming languages: C++, Java, Python, Swift, and Ruby.](https://kodekloud.com/kk-media/image/upload/v1752880944/notes-assets/images/LangChain-What-are-Agents/role-of-agents-programming-languages-icons.jpg)

> [!important]
> **Note**
>
> An agent acts as a controller: it queries the LLM for required data, invokes external tools, updates memory, and composes the final structured response.

With agents, you can:

- Expose functions in any language as REST endpoints
- Seamlessly integrate Python, Java, or custom libraries
- Scale from simple chatbots to multi-step pipelines

## Advantages of Agents

By unifying LangChain modules, agents offer:

- **Modularity**: Plug-and-play tools, memory, and parsers
- **Flexibility**: Adapt to domains like healthcare, service, or education
- **Efficiency**: Automated prompt engineering & formatting
- **Scalability**: From quick scripts to enterprise systems

![The image is a diagram titled "Role of Agents," highlighting their functions: bringing modules together, being highly efficient compared to writing code, reducing time and complexity, and connecting the dots.](https://kodekloud.com/kk-media/image/upload/v1752880945/notes-assets/images/LangChain-What-are-Agents/role-of-agents-functions-diagram.jpg)

Agents also bridge user intent and LLM reasoning across sectors:

![The image illustrates the role of agents in three areas: Healthcare, Customer Service, and Educational Guidance, each represented by an icon.](https://kodekloud.com/kk-media/image/upload/v1752880946/notes-assets/images/LangChain-What-are-Agents/agents-healthcare-customer-service-education.jpg)

## Agents vs. LLMs: A Comparison

| Limitation of LLMs    | Agent Enhancement             |
| --------------------- | ----------------------------- |
| Stateless             | Long-term & short-term memory |
| Synchronous           | Asynchronous workflows        |
| Variable intelligence | Chain-of-thought reasoning    |
| Hallucination         | Grounded with contextual data |
| No internet access    | Web browsing & API invocation |
| Poor at math          | Python REPL calculations      |
| Unpredictable output  | Structured output via parsers |

![The image compares how agents enhance user experience by providing features like long-term memory and asynchronous work, against limitations of LLMs such as being stateless and having no internet access.](https://kodekloud.com/kk-media/image/upload/v1752880948/notes-assets/images/LangChain-What-are-Agents/agents-vs-llms-user-experience-comparison.jpg)

## The Big Picture Architecture

An agent orchestrates end-to-end AI workflows:

1.  **User** sends a query
2.  **Agent** analyzes intent and decides on tools/memory
3.  **Tools** (Wikipedia, search APIs, custom functions, Python) fetch data
4.  **LLM** processes prompts with context and returns structured output

![The image is a flowchart titled "The Big Picture," showing a process from "User" to "Agents," then branching to "Wikipedia," "Memory," "Custom Functions," "Python Interpreter," and finally "LLM" (Large Language Model).](https://kodekloud.com/kk-media/image/upload/v1752880951/notes-assets/images/LangChain-What-are-Agents/the-big-picture-flowchart-process.jpg)

Agents leverage both scratchpads and databases (e.g., [Redis](https://redis.io)) and automate advanced prompting patterns like chain-of-thought and React-Reason-Act.

## How Agents Work

At runtime, the agent uses the LLM as a reasoning engine with external support:

1.  Agent asks the LLM: "What else do you need to answer this?"
2.  LLM lists data points (A, B, C)
3.  Agent invokes tools (search, Wikipedia, Python REPL) to gather data
4.  New data is fed back to the LLM iteratively
5.  Loop continues until the LLM returns the final result

![The image illustrates a flowchart showing how agents work, with a user sending a query to agents, which then query a large language model (LLM). A speech bubble asks, "If you have to answer this correctly, what else do you need?"](https://kodekloud.com/kk-media/image/upload/v1752880952/notes-assets/images/LangChain-What-are-Agents/agents-query-llm-flowchart.jpg)

![The image illustrates a process flow showing how agents work, with a user querying agents, which then query a large language model (LLM). A speech bubble contains a question about obtaining data points.](https://kodekloud.com/kk-media/image/upload/v1752880953/notes-assets/images/LangChain-What-are-Agents/agents-query-llm-process-flow.jpg)

Agents can run autonomously for tasks such as customer support, counseling, or academic guidance:

![The image shows two icons representing "Customer Service and Counseling" and "Academic Guidance" under the heading "How Agents Work."](https://kodekloud.com/kk-media/image/upload/v1752880954/notes-assets/images/LangChain-What-are-Agents/customer-service-academic-guidance-icons.jpg)

> [!important]
> **Warning**
>
> Always secure API keys and protect sensitive data when configuring memory stores and external tools.

## Agent Use Cases

- Customer Support Agent: FAQs, troubleshooting, escalation
- Student Guide Agent: Step-by-step problem solving
- Travel Coordinator Agent: Itinerary planning, booking
- Meeting Scheduler Agent: Calendar integration, invites

These examples are just the beginning. In the next lessons, we’ll build and deploy real-world agents end to end—stay tuned!

---

## References

- [LangChain Documentation](https://langchain.com/docs/)
- [Redis](https://redis.io/)
- [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page)
- [OpenAI GPT Models](https://platform.openai.com/docs/models)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/530ad7de-8948-4806-8824-19eb10923d1d/lesson/6321298e-ef4e-4acd-b383-4745a68eee9c)**
>
> Watch video content
