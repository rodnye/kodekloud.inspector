# Building a Custom Tool - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Using-Tools/Building-a-Custom-Tool)

---

## Table of Contents

- Building a Custom Tool
  - Defining the Tool
  - Inspecting Tool Metadata
  - Using the Tool in a Chain
  - Invoking the Chain
  - Links and References
  - Watch Video
  - Practice Lab

---

## Content

LangChain

Using Tools

# Building a Custom Tool

In this guide, we’ll walk through creating a custom LangChain tool that retrieves flight status details. You’ll learn how to define the tool, inspect its metadata, and wire it into a prompt–LLM chain for concise, one-word or short answers.

## Defining the Tool

First, install or import the required packages:

```
pip install langchain openai
```

Then define your tool using the `@tool` decorator from LangChain:

```
from langchain.tools import tool
from langchain.llms.openai import OpenAI

@tool
def GetFlightStatus(flight_no: str) -> str:
    """Gets flight status and schedule"""
    # ,[object Object],
    return (
        f"Flight {flight_no} departed at 5:20 PM. "
        "It is on-time and expected to arrive at 8:10 PM at Gate B12."
    )
```

> [!important]
> **Note**
>
> The `@tool` decorator registers the function’s name, description, and argument schema automatically.

## Inspecting Tool Metadata

After defining `GetFlightStatus`, you can verify its registered metadata:

```
print(GetFlightStatus.name)         # -> GetFlightStatus
print(GetFlightStatus.description)  # -> Gets flight status and schedule
print(GetFlightStatus.args)
# -> {'flight_no': {'title': 'Flight No', 'type': 'string'}}
```

You can also view the complete `StructuredTool` representation:

```
from langchain.tools import StructuredTool

print(StructuredTool(
    name='GetFlightStatus',
    description="Gets flight status and schedule",
    args_schema=GetFlightStatus.args_schema,
    func=GetFlightStatus.func
))
```

For a quick overview, here’s how the metadata maps out:

| Property    | Value                           |
| ----------- | ------------------------------- |
| name        | `GetFlightStatus`               |
| description | Gets flight status and schedule |
| arguments   | `flight_no: string`             |
| return type | `str`                           |

## Using the Tool in a Chain

Next, we’ll connect the tool to a prompt template, the OpenAI LLM, and a simple output parser:

```
from langchain import PromptTemplate
from langchain.output_parsers import StrOutputParser

prompt = PromptTemplate.from_template(
    "Based on the context: {context}\nAnswer the query: {query}"
)
llm = OpenAI()
output_parser = StrOutputParser()
```

Run the tool to generate the context:

```
flight = "EK524"
context = GetFlightStatus.run(flight)
```

Compose the chain by piping the prompt into the LLM and then into the parser:

```
chain = prompt | llm | output_parser
```

## Invoking the Chain

With the chain ready, invoke it to extract specific details:

```
print(chain.invoke({"context": context, "query": "status"}))         # -> On-time
print(chain.invoke({"context": context, "query": "departure time"})) # -> 5:20 PM
print(chain.invoke({"context": context, "query": "arrival time"}))   # -> 8:10 PM
print(chain.invoke({"context": context, "query": "gate"}))           # -> B12
```

Each invocation returns a concise answer tailored by your prompt design.

---

You now have a reusable flight status tool. Integrate real-world APIs inside `GetFlightStatus` to fetch live data, and combine multiple tools to build sophisticated LangChain agents.

## Links and References

- [LangChain Tools](https://langchain.com/docs/tools/)
- [LangChain PromptTemplate](https://langchain.com/docs/prompts/)
- [OpenAI on PyPI](https://pypi.org/project/openai/)
- [StrOutputParser](https://langchain.com/docs/output-parsers/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/06905b96-585d-4c9e-835a-d8fcaca76e2a/lesson/f564445e-f3df-4cae-9d49-986dc4a02a02)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/langchain/module/06905b96-585d-4c9e-835a-d8fcaca76e2a/lesson/a39008e8-97e9-4813-a404-3c1006e6e97c)**
>
> Practice lab
