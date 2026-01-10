# LCEL Demo 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Introduction-to-LCEL/LCEL-Demo-1)

---

## Table of Contents

- LCEL Demo 1
  - Table of Contents
  - 1. Prerequisites
  - 2. Setup
  - 3. Build the Chain
  - 4. Invoke the Chain
  - 5. Inspect Input Schema
  - 6. Inspect Output Schema
  - 7. Explore Component Schemas
  - 8. Next Steps
  - References
  - Watch Video
    - 7.1 LLM Input Schema
    - 7.2 LLM Output Schema

---

## Content

LangChain

Introduction to LCEL

# LCEL Demo 1

In this guide, you’ll create a simple “Hello World” LCEL chain that connects a prompt template, a language model (LLM), and an output parser. You’ll then invoke the chain, inspect its input/output schemas, and explore individual component schemas.

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [Setup](#setup)
3.  [Build the Chain](#build-the-chain)
4.  [Invoke the Chain](#invoke-the-chain)
5.  [Inspect Input Schema](#inspect-input-schema)
6.  [Inspect Output Schema](#inspect-output-schema)
7.  [Explore Component Schemas](#explore-component-schemas)
8.  [Next Steps](#next-steps)
9.  [References](#references)

---

## 1\. Prerequisites

- Python 3.8+
- `langchain-core` and `langchain-openai` installed

```
pip install langchain-core langchain-openai
```

> [!important]
> **Note**
>
> Ensure your OpenAI API key is set in the `OPENAI_API_KEY` environment variable before running any examples.

---

## 2\. Setup

Import the necessary classes and define your prompt template, LLM, and output parser:

```
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

prompt = ChatPromptTemplate.from_template(
    """You are a helpful assistant.
    Answer the following question: {question}"""
)
llm = ChatOpenAI()
output_parser = StrOutputParser()
```

---

## 3\. Build the Chain

Chain the components together using the pipe operator (`|`):

```
chain = prompt | llm | output_parser
```

---

## 4\. Invoke the Chain

Provide the `question` input and call the chain:

```
response = chain.invoke({"question": "Tell me about The Godfather movie"})
print(response)
```

**Example Output:**

```
"The Godfather" is a classic crime film directed by Francis Ford Coppola and released in 1972. ...
```

---

## 5\. Inspect Input Schema

Every LCEL chain exposes its input schema. To view it:

```
print(chain.input_schema.schema())
```

**Sample Output:**

```
{
  "title": "PromptInput",
  "type": "object",
  "properties": {
    "question": {
      "title": "Question",
      "type": "string"
    }
  }
}
```

---

## 6\. Inspect Output Schema

Similarly, the chain’s output schema shows the format of the result:

```
print(chain.output_schema.schema())
```

**Sample Output:**

```
{
  "title": "StrOutputParserOutput",
  "type": "string"
}
```

---

## 7\. Explore Component Schemas

You can inspect schemas for each component in the chain.

### 7.1 LLM Input Schema

```
print(llm.input_schema.schema())
```

| Property            | Type                  | Description            |
| ------------------- | --------------------- | ---------------------- | --------------- |
| `content`           | string \\             | object                 | Message content |
| `additional_kwargs` | object                | Extra LLM parameters   |
| `type`              | string (default "ai") | Message role (AI only) |

**Excerpt:**

```
{
  "description": "Message from an AI.",
  "type": "object",
  "required": ["content"]
}
```

### 7.2 LLM Output Schema

```
print(llm.output_schema.schema())
```

**Excerpt:**

```
{
  "title": "ChatOpenAIOutput",
  "anyOf": [
    { "$ref": "#/definitions/AIMessage" },
    { "$ref": "#/definitions/HumanMessage" }
  ],
  "definitions": {
    "AIMessage": { "properties": { "content": { ... } }, "required": ["content"] },
    "HumanMessage": { "properties": { "content": { ... } } }
  }
}
```

---

## 8\. Next Steps

- Integrate custom prompt templates and parsers
- Combine multiple LLMs or logic in a single chain
- Use the pass-through element to include custom Python code

---

## References

- [LangChain Documentation](https://langchain.com/docs/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/754457c5-1386-422b-98ad-3342dfc6aab3/lesson/add69dd3-2805-44d2-b67f-5198effe7e2b)**
>
> Watch video content
