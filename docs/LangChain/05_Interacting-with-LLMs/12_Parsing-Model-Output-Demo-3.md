# Parsing Model Output Demo 3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Interacting-with-LLMs/Parsing-Model-Output-Demo-3)

---

## Table of Contents

- Parsing Model Output Demo 3
  - 1. Imports & Model Definition
  - 2. Initialize the Parser & Build the Prompt
  - 3. Inspect the Full Prompt
  - 4. Invoke the LLM
  - 5. Parse into a Python Object
  - Conclusion
  - Links and References
  - Watch Video
  - Practice Lab
    - Ticket Model Fields
    - Example Raw Response

---

## Content

LangChain

Interacting with LLMs

# Parsing Model Output Demo 3

Learn how to validate and convert LLM outputs into Python objects using LangChain’s `PydanticOutputParser`. In this tutorial, we will:

1.  Define a Pydantic model for a movie ticket.
2.  Generate prompt templates including format instructions.
3.  Inspect the complete prompt JSON schema.
4.  Call the LLM and get a structured response.
5.  Parse the response into a `Ticket` instance.

> [!important]
> **Prerequisites**
>
> - Python 3.8+
> - `langchain`, `pydantic` installed
> - An OpenAI API key configured as `OPENAI_API_KEY`

---

## 1\. Imports & Model Definition

Begin by importing the required modules and defining a Pydantic model for a movie ticket:

```
from typing import List
from langchain_openai import OpenAI
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain.prompts import PromptTemplate
from langchain.output_parsers import PydanticOutputParser

model = OpenAI()
```

```
class Ticket(BaseModel):
    """Schema for a movie ticket reservation."""
    date:    str = Field(description="show date")
    time:    str = Field(description="show time")
    theater: str = Field(description="theater name")
    count:   int = Field(description="number of tickets")
    movie:   str = Field(description="preferred movie")
```

### Ticket Model Fields

| Field   | Type    | Description           |
| ------- | ------- | --------------------- |
| date    | string  | Show date             |
| time    | string  | Show time             |
| theater | string  | Theater name          |
| count   | integer | Number of tickets     |
| movie   | string  | Preferred movie title |

---

## 2\. Initialize the Parser & Build the Prompt

Create a `PydanticOutputParser` from the `Ticket` model. Then define a `PromptTemplate` that embeds the JSON schema instructions:

```
# Initialize the parser
parser = PydanticOutputParser(pydantic_object=Ticket)

# Template with a placeholder for {query} and format instructions
ticket_template = """\
Book us a movie ticket for two this Friday at 6:00 PM.
Choose any theater. Send the confirmation by email.
Our preferred movie is: {query}

Format instructions:
{format_instructions}
"""

prompt = PromptTemplate(
    template=ticket_template,
    input_variables=["query"],
    partial_variables={"format_instructions": parser.get_format_instructions()},
)
```

> [!important]
> **Format Instructions**
>
> The `parser.get_format_instructions()` method injects a JSON Schema under “Format instructions.” The LLM must follow this schema exactly.

---

## 3\. Inspect the Full Prompt

Format the prompt for the movie “Interstellar” and print it:

```
formatted_prompt = prompt.format_prompt(query="Interstellar")
print(formatted_prompt.to_string())
```

Example output:

```
Book us a movie ticket for two this Friday at 6:00 PM.
Choose any theater. Send the confirmation by email.
Our preferred movie is: Interstellar

Format instructions:
The output should be formatted as a JSON instance that conforms to the JSON Schema below.

As an example, for the schema
{"properties": {"foo": {"title":"Foo","description":"a list of strings","type":"array","items":{"type":"string"}}},"required":["foo"]}
the object {"foo":["bar","baz"]} is valid.
Here is the output schema:

{"properties":{
  "date":    {"title":"Date","description":"show date","type":"string"},
  "time":    {"title":"Time","description":"show time","type":"string"},
  "theater": {"title":"Theater","description":"theater name","type":"string"},
  "count":   {"title":"Count","description":"number of tickets","type":"integer"},
  "movie":   {"title":"Movie","description":"preferred movie","type":"string"}
},"required":["date","time","theater","count","movie"]}
```

---

## 4\. Invoke the LLM

Send the formatted prompt to the model and capture its raw response:

```
llm_output = model.invoke(formatted_prompt.to_string())
print("LLM Response:\n", llm_output)
```

### Example Raw Response

```
{
  "date": "Friday",
  "time": "6:00 PM",
  "theater": "AMC Lincoln Square",
  "count": 2,
  "movie": "Interstellar"
}
```

> [!important]
> **Warning**
>
> Ensure the LLM response is valid JSON matching the schema. Invalid or malformed JSON will cause parsing errors.

---

## 5\. Parse into a Python Object

Finally, hand the LLM output back to `PydanticOutputParser` for validation and conversion:

```
reservation = parser.parse(llm_output)
print("Reservation object:", reservation)
print("Type:", type(reservation))
```

Output:

```
Reservation object: Ticket(date='Friday', time='6:00 PM', theater='AMC Lincoln Square', count=2, movie='Interstellar')
Type: <class 'Ticket'>
```

---

## Conclusion

By leveraging `PydanticOutputParser`, you can:

- Instruct the LLM to generate schema-compliant JSON.
- Automatically validate and convert responses into Python objects.

This method ensures structured, reliable LLM outputs in your applications.

---

## Links and References

- LangChain Output Parsers: https://langchain.com/docs/modules/output\_parsers
- Pydantic Documentation: https://docs.pydantic.dev/
- JSON Schema Standard: https://json-schema.org/

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/ae260750-791b-496c-991f-0d0333f61e40/lesson/31aecd1b-7ea9-4bab-898d-b8bc6b35ab62)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/langchain/module/ae260750-791b-496c-991f-0d0333f61e40/lesson/932a32b6-0fa6-445f-b1f6-7db4e21dc369)**
>
> Practice lab
