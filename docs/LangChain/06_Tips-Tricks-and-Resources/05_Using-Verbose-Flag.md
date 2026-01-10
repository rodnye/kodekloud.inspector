# Using Verbose Flag - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Tips-Tricks-and-Resources/Using-Verbose-Flag)

---

## Table of Contents

- Using Verbose Flag
  - Why Use verbose=True?
  - Step-by-Step Example
  - Sample Console Output
  - Verbose vs. Global Debug
  - Next Steps: Callbacks
  - References
  - Watch Video

---

## Content

LangChain

Tips Tricks and Resources

# Using Verbose Flag

In this guide, you’ll learn how to turn on the `verbose` flag for an `LLMChain` instance to inspect its internal steps—prompt formatting, input handling, and output generation—without enabling global debug mode.

## Why Use `verbose=True`?

By setting `verbose=True` on a specific chain, you can:

- Trace how input variables populate your prompt.
- See intermediate formatting before the LLM is called.
- Log only the components you’re interested in, keeping other logs clean.

> [!important]
> **Note**
>
> Verbose mode is ideal for local debugging and development. For production workloads, consider disabling verbosity to reduce log noise and potential exposure of sensitive data.

## Step-by-Step Example

```
from langchain.chains import LLMChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate


# 1. Define a prompt template with system and human messages
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a {subject} teacher"),
    ("human", "Tell me about {concept}")
])


# 2. Initialize the ChatOpenAI model
llm = ChatOpenAI()


# 3. Create an LLMChain with verbose logging enabled
chain = LLMChain(llm=llm, prompt=prompt, verbose=True)


# 4. Run the chain with inputs
result = chain.invoke({"subject": "physics", "concept": "galaxy"})
print(result)
```

## Sample Console Output

The chain prints a JSON-like debug trace along with your final output:

```
{
  "subject": "physics",
  "concept": "galaxy",
  "text": "Galaxies are massive systems of stars, stellar remnants, interstellar gas, dust, dark matter, and other astronomical objects bound together by gravity. They come in a variety of shapes and sizes..."
}
```

Typical debug messages include:

- Entering `LLMChain` with input arguments.
- Formatted prompt after variable substitution.
- Exiting `LLMChain` with generated output.

## Verbose vs. Global Debug

| Mode                   | Scope              | Output                           |
| ---------------------- | ------------------ | -------------------------------- |
| `verbose=True`         | Single chain       | Chain-specific debug messages    |
| Global `logging.DEBUG` | Entire application | All debug logs across components |

> [!important]
> **Warning**
>
> Avoid using global debug in production, as it can generate excessive logs and potentially expose secrets. Use `verbose=True` on only those chains you need to inspect.

## Next Steps: Callbacks

Once you’ve mastered verbose logging, you can explore [callbacks](/docs/callbacks) to programmatically capture and process chain events for metrics, custom monitoring, or advanced debugging.

## References

- [LangChain LLMChain Documentation](https://langchain.com/docs/modules/chains/llm_chain)
- [ChatOpenAI Model Reference](https://langchain.com/docs/modules/models/chat/openai)
- [Working with Prompt Templates](https://langchain.com/docs/modules/prompts/chat_prompt_template)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/b5f7771a-fdbc-45b1-a786-6c84bb7ffc76/lesson/ea0b058a-7c2d-4b17-81e6-fb4026f5a6fe)**
>
> Watch video content
