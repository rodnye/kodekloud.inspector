# Parsing Model Output Demo 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Interacting-with-LLMs/Parsing-Model-Output-Demo-2)

---

## Table of Contents

- Parsing Model Output Demo 2
  - Setup
  - 1. Basic Prompt without Parsing
  - 2. Defining the JSON Output Parser
  - 3. Prompt Template with Format Instructions
  - 4. Invoking the Model and Parsing
  - 5. Comparison of LangChain Output Parsers
  - Conclusion
  - Links and References
  - Watch Video

---

## Content

LangChain

Interacting with LLMs

# Parsing Model Output Demo 2

In this guide, you’ll learn how to generate model output with LangChain and transform plain-text responses into structured JSON using the `JsonOutputParser`. This approach removes manual parsing, ensures valid JSON, and boosts developer productivity.

## Setup

Begin by installing and importing the necessary packages, then initialize your language model:

```
pip install langchain langchain-openai
```

```
from langchain.prompts import PromptTemplate
from langchain_openai import OpenAI
from langchain_core.output_parsers import JsonOutputParser
import json


llm = OpenAI()
```

## 1\. Basic Prompt without Parsing

First, create a simple prompt template to list three countries and their capitals:

```
prompt = PromptTemplate(
    template="List 3 countries in {continent} and their capitals",
    input_variables=["continent"]
)


raw_output = llm.invoke(input=prompt.format(continent="Asia"))
print(raw_output)
```

Example response:

```
1. Japan – Tokyo
2. China – Beijing
3. India – New Delhi
```

While human-readable, this plain-text format is hard to consume programmatically.

## 2\. Defining the JSON Output Parser

Instantiate LangChain’s JSON parser and get its format instructions so the LLM knows to return valid JSON:

```
output_parser = JsonOutputParser()
format_instructions = output_parser.get_format_instructions()
print(format_instructions)
```

This prints:

```
Return a JSON object.
```

> [!important]
> **Note**
>
> The `JsonOutputParser` automatically validates the model’s response and raises an error if it’s not well-formed JSON.

## 3\. Prompt Template with Format Instructions

Embed the format instructions into your template to enforce JSON output:

```
prompt = PromptTemplate(
    template=(
      "List 3 countries in {continent} and their capitals\n"
      "{format_instructions}"
    ),
    input_variables=["continent"],
    partial_variables={"format_instructions": format_instructions}
)


print(prompt.format(continent="North America"))
```

Resulting prompt:

```
List 3 countries in North America and their capitals
Return a JSON object.
```

## 4\. Invoking the Model and Parsing

Invoke the LLM with the enhanced prompt and parse the JSON response:

```
response = llm.invoke(input=prompt.format(continent="North America"))
print(response)
# Example LLM response (JSON):
# {
#   "USA": "Washington D.C.",
#   "Canada": "Ottawa",
#   "Mexico": "Mexico City"
countries = output_parser.parse(response)
print(type(countries))        # <class 'dict'>
print(json.dumps(countries))  # {"USA":"Washington D.C.","Canada":"Ottawa","Mexico":"Mexico City"}
```

## 5\. Comparison of LangChain Output Parsers

| Parser Type      | Description                 | Example Usage                     |
| ---------------- | --------------------------- | --------------------------------- |
| JsonOutputParser | Ensures valid JSON output   | `JsonOutputParser()`              |
| ListOutputParser | Parses list-style responses | `ListOutputParser(separator=",")` |

## Conclusion

By incorporating the `JsonOutputParser` and embedding format instructions in your LangChain prompts, you can automatically obtain structured JSON from your LLM calls. This streamlines data handling in Python and eliminates fragile text parsing.

## Links and References

- [LangChain Documentation](https://langchain.readthedocs.io/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference/introduction)
- [JSON Specification](https://www.json.org/json-en.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/ae260750-791b-496c-991f-0d0333f61e40/lesson/0a72e0ca-6e2c-41db-b741-2a1763894c11)**
>
> Watch video content
