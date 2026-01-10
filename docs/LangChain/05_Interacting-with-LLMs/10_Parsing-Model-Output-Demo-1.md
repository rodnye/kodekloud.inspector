# Parsing Model Output Demo 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Interacting-with-LLMs/Parsing-Model-Output-Demo-1)

---

## Table of Contents

- Parsing Model Output Demo 1
  - Table of Contents
  - Prerequisites
  - Initializing LangChain and OpenAI
  - Generating an Unstructured List
  - Formatting as CSV with CommaSeparatedListOutputParser
  - Parsing the CSV into a Python List
  - Next Steps
  - References
  - Watch Video

---

## Content

LangChain

Interacting with LLMs

# Parsing Model Output Demo 1

In this guide, you’ll learn how to convert large language model (LLM) responses into native Python structures using LangChain’s output parsers. We’ll demonstrate:

- Turning a numbered list into a comma-separated string
- Parsing that string into a Python list

This approach makes LLM outputs easy to manipulate in your codebase.

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [Initializing LangChain and OpenAI](#initializing-langchain-and-openai)
3.  [Generating an Unstructured List](#generating-an-unstructured-list)
4.  [Formatting as CSV with CommaSeparatedListOutputParser](#formatting-as-csv-with-commaseparatedlistoutputparser)
5.  [Parsing the CSV into a Python List](#parsing-the-csv-into-a-python-list)
6.  [Next Steps](#next-steps)
7.  [References](#references)

---

## Prerequisites

- Python 3.7+
- An OpenAI API key
- `langchain` installed

```
pip install langchain langchain-openai
```

## Initializing LangChain and OpenAI

Import the core components:

```
from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate
from langchain.output_parsers import CommaSeparatedListOutputParser
from langchain.output_parsers.list import ListOutputParser
```

Create the OpenAI LLM client:

```
llm = OpenAI()
```

## Generating an Unstructured List

Define a simple prompt template without format constraints:

```
prompt = PromptTemplate(
    template="List 3 {things}.",
    input_variables=["things"]
)
```

Invoke the model to list three World Cup cricket teams:

```
response = llm.invoke(input=prompt.format(things="countries that play cricket in the World Cup"))
print(response)
```

Output might look like:

```
1. India
2. Australia
3. England
```

> [!important]
> **Note**
>
> This human-readable list is great for display but difficult to process in scripts. Next, we’ll add format instructions for a comma-separated response.

## Formatting as CSV with CommaSeparatedListOutputParser

1.  Instantiate the CSV parser and retrieve its instructions:

    ```
    output_parser = CommaSeparatedListOutputParser()
    format_instructions = output_parser.get_format_instructions()
    print(format_instructions)
    ```

    Expected instruction:

    ```
    Your response should be a list of comma separated values, eg: `foo, bar, baz`
    ```

2.  Embed these instructions into a new prompt template:

    ```
    prompt_with_format = PromptTemplate(
        template="List 3 {things}.\n{format_instructions}",
        input_variables=["things"],
        partial_variables={"format_instructions": format_instructions}
    )
    ```

3.  Invoke the LLM with the CSV constraint:

    ```
    final_prompt = prompt_with_format.format(things="countries that play cricket in the World Cup")
    output = llm.invoke(input=final_prompt).strip()
    print(output)
    ```

    Now the model returns:

    ```
    India, Australia, England
    ```

## Parsing the CSV into a Python List

Convert the raw string into a Python list:

```
# Before parsing
print(type(output))  # <class 'str'>


# Parse into list
things = output_parser.parse(output)
print(things)        # ['India', 'Australia', 'England']
print(type(things))  # <class 'list'>
```

Now you can work with `things` directly in your application.

## Next Steps

Explore more advanced parsers for structured outputs:

| Parser Type                    | Use Case                       | Example                          |
| ------------------------------ | ------------------------------ | -------------------------------- |
| CommaSeparatedListOutputParser | Simple lists in CSV            | `foo, bar, baz`                  |
| ListOutputParser               | Numbered or bullet lists       | `1. foo\\n2. bar\\n`             |
| JSONOutputParser               | Complex nested data structures | `{ "name": "Alice", "age": 30 }` |

You can также try the [`JSONOutputParser`](https://python.langchain.com/docs/modules/output_parsers/json) to extract richer data types from LLM responses.

## References

- [LangChain Output Parsers](https://python.langchain.com/docs/modules/output_parsers/overview)
- [PromptTemplate Documentation](https://python.langchain.com/docs/modules/prompts/prompt_templates)
- [OpenAI LLM Client](https://python.langchain.com/docs/integrations/openai)
- [CommaSeparatedListOutputParser Source](https://github.com/langchain-ai/langchain/blob/master/langchain/output_parsers/list.py)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/ae260750-791b-496c-991f-0d0333f61e40/lesson/1d5a8e19-7bfd-497d-8e3e-8ffd23c70eb3)**
>
> Watch video content
