# Parsing Model Output - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Interacting-with-LLMs/Parsing-Model-Output)

---

## Table of Contents

- Parsing Model Output
  - Why Structured Output Matters
  - How LangChain’s OutputParser Works
  - Common Output Formats
  - Benefits of Using OutputParser
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

LangChain

Interacting with LLMs

# Parsing Model Output

In this lesson, we focus on transforming a language model’s plain-text responses into structured formats like JSON, XML, YAML, or CSV. Although Large Language Models (LLMs) always return text, downstream applications typically require data in a predictable schema. By embedding clear formatting instructions in your prompt and using LangChain’s `OutputParser`, you can automate this workflow end-to-end.

![The image is a diagram illustrating the flow of information between a user, input, model I/O, output, and a language model, with a focus on "Always Text."](https://kodekloud.com/kk-media/image/upload/v1752880973/notes-assets/images/LangChain-Parsing-Model-Output/information-flow-user-model-diagram.jpg)

## Why Structured Output Matters

- **Interoperability**: Structured data (JSON, XML, YAML) integrates seamlessly with APIs and databases.
- **Reliability**: Reduces parsing errors and unexpected values at runtime.
- **Maintainability**: Clear schemas make it easier to validate and extend your data model.

> [!important]
> **Note**
>
> Large language models always return text. To work with objects, you need to parse and validate that text.

## How LangChain’s OutputParser Works

LangChain’s `OutputParser` automates both prompt construction and response transformation:

1.  **Prompt Construction**  
    You define a schema and example responses inside a `PromptTemplate`. The model then knows exactly which structure (e.g., JSON with specific fields) to produce.
2.  **Response Transformation**  
    After receiving the text output, the parser converts it into your target data type (e.g., Python `dict`, XML DOM, YAML mapping), handling parsing errors and edge cases.

```
from langchain import PromptTemplate, LLMChain
from langchain.output_parsers import ResponseSchema, StructuredOutputParser


# 1. Define the schema you expect
schemas = [
    ResponseSchema(name="title", description="Title of the article"),
    ResponseSchema(name="tags", description="List of relevant tags"),
]


# 2. Create an output parser
parser = StructuredOutputParser.from_response_schemas(schemas)


# 3. Build a prompt that includes instructions and examples
template = """
Generate an article summary:


{format_instructions}


Article:
\"\"\"
{article_text}
\"\"\"
"""
prompt = PromptTemplate(template=template, input_variables=["article_text"], partial_variables=parser.get_format_instructions())


# 4. Run the chain and parse
chain = LLMChain(llm=llm, prompt=prompt)
output = chain.run(article_text="...your content here...")
result = parser.parse(output)
```

![The image illustrates a comparison between an "Internal Python Data Structure" represented by the Python logo and "More Structured Markup" represented by XML and YAML icons.](https://kodekloud.com/kk-media/image/upload/v1752880974/notes-assets/images/LangChain-Parsing-Model-Output/python-xml-yaml-comparison-illustration.jpg)

## Common Output Formats

| Format | Description                       | Example                               |
| ------ | --------------------------------- | ------------------------------------- |
| JSON   | Widely used, machine-readable     | `{ "name": "Alice", "age": 30 }`      |
| XML    | Markup-based, verbose             | `<person><name>Alice</name></person>` |
| YAML   | Human-friendly, indentation-based | `name: Alice`                         |
| CSV    | Tabular data, comma-separated     | `name,age\\nAlice,30`                 |

## Benefits of Using OutputParser

- **Predictability**: Enforces schema so you avoid malformed data.
- **Error Handling**: Catches parsing exceptions early and returns structured error messages.
- **Extensibility**: Easily swap or update schemas without rewriting parsing logic.

> [!important]
> **Warning**
>
> Always include `format_instructions` from `StructuredOutputParser` in your prompt. Omitting them can lead to inconsistent model responses and parsing failures.

## Next Steps

1.  Experiment with custom `ResponseSchema` definitions for your use case.
2.  Validate parsed output against JSON Schema or your own validators.
3.  Integrate the parser into your production pipeline for reliable data ingestion.

---

## Links and References

- [LangChain OutputParser Documentation](https://langchain.readthedocs.io/)
- [Python `json` Module](https://docs.python.org/3/library/json.html)
- [YAML Tutorial](https://yaml.org/spec/)
- [XML in Python (`xml.etree.ElementTree`)](https://docs.python.org/3/library/xml.etree.elementtree.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/ae260750-791b-496c-991f-0d0333f61e40/lesson/ee38bab1-8189-4ab1-8b0e-8933a1ca8ab0)**
>
> Watch video content
