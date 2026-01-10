# LCEL Demo 4 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Introduction-to-LCEL/LCEL-Demo-4)

---

## Table of Contents

- LCEL Demo 4
  - 1. Basic Prompt → LLM → Parser Chain
  - 2. Adding a No-Op with RunnablePassthrough
  - 3. Verifying the Output
  - 4. Injecting or Overriding Inputs with assign
  - 5. Summary
  - Links and References
  - Watch Video
    - Common assign Patterns

---

## Content

LangChain

Introduction to LCEL

# LCEL Demo 4

As LangChain pipelines grow in complexity, you often need to forward data between stages or even modify inputs on the fly. This guide walks you through how to leverage `RunnablePassthrough` from `langchain_core.runnables` to:

- Act as a **no-op placeholder** in a chain.
- **Inject** or **override** keys in the input dictionary at runtime with `assign`.

You’ll build on a simple Prompt → LLM → Parser pipeline and then introduce passthrough steps for flexibility.

---

## 1\. Basic Prompt → LLM → Parser Chain

Start by creating a minimal chain that sends a prompt to an LLM and parses the raw string output:

```
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser


# 1. Define a prompt template
prompt = ChatPromptTemplate.from_template(
    "You are a helpful assistant on {topic}.\n"
    "Answer the following question: {question}"
)


# 2. Initialize the LLM client and parser
llm = ChatOpenAI()
output_parser = StrOutputParser()


# 3. Build the chain: Prompt → LLM → Parser
chain = prompt | llm | output_parser


# 4. Invoke with inputs
response = chain.invoke({
    "topic": "movies",
    "question": "Tell me about The Godfather movie"
})
print(response)
```

Expected output:

```
"The Godfather" is a classic American crime film released in 1972, directed by Francis Ford Coppola...
```

> [!important]
> **Note**
>
> This chain uses `ChatPromptTemplate` to format inputs, `ChatOpenAI` to call OpenAI’s chat API, and `StrOutputParser` to convert the model’s response to a plain string.

---

## 2\. Adding a No-Op with RunnablePassthrough

You can insert `RunnablePassthrough` anywhere to forward data unchanged. It’s useful as a placeholder for future logic or debugging:

```
from langchain_core.runnables import RunnablePassthrough


# Insert at the beginning
chain1 = RunnablePassthrough() | prompt | llm | output_parser
print(chain1.invoke({"topic": "movies", "question": "Tell me about The Godfather movie"}))


# Or at the end
chain2 = prompt | llm | output_parser | RunnablePassthrough()
print(chain2.invoke({"topic": "movies", "question": "Tell me about The Godfather movie"}))
```

Both invocations return the same result since passthrough does not alter the payload.

> [!important]
> **Note**
>
> Use passthrough steps to reserve spots in your pipeline for metrics, logging, or future transformations.

---

## 3\. Verifying the Output

Even with a passthrough at the tail, the result remains identical:

```
chain_end = prompt | llm | output_parser | RunnablePassthrough()
result = chain_end.invoke({
    "topic": "movies",
    "question": "Tell me about The Godfather movie"
})
print(result)
```

```
"The Godfather" is a classic crime film directed by Francis Ford Coppola ...
```

---

## 4\. Injecting or Overriding Inputs with `assign`

The true power of `RunnablePassthrough` lies in its `assign` method, which lets you inject or override dictionary keys before they reach downstream components. For instance, you can fix the `topic` to `"movies"`, so callers only need to supply `question`:

```
new_chain = (
    RunnablePassthrough() |
    RunnablePassthrough.assign(topic=lambda _: "movies") |
    prompt |
    llm |
    output_parser
)


# Now the chain accepts only 'question'
response = new_chain.invoke({"question": "Tell me about Inception"})
print(response)
```

Under the hood:

1.  The first passthrough forwards `{"question": ...}`.
2.  `assign(topic=lambda _: "movies")` adds `"topic": "movies"`.
3.  The prompt, LLM, and parser receive both keys.

You can isolate and test `assign` by itself:

```
test_chain = (
    RunnablePassthrough() |
    RunnablePassthrough.assign(topic=lambda _: "movies")
)
result = test_chain.invoke({"question": "Tell me about Inception"})
print(result)
```

Expected output:

```
{'question': 'Tell me about Inception', 'topic': 'movies'}
```

> [!important]
> **Warning**
>
> Ensure that your assignment functions return serializable values. Non-serializable objects may break downstream components or logging.

### Common `assign` Patterns

| Method                       | Purpose                             | Example                                                     |
| ---------------------------- | ----------------------------------- | ----------------------------------------------------------- |
| `assign(key=value)`          | Static value injection              | `assign(topic=lambda _: "news")`                            |
| `assign(key=function)`       | Dynamic or computed value injection | `assign(timestamp=lambda _: datetime.utcnow().isoformat())` |
| Multiple assignments chained | Inject several keys at once         | \\`assign(a=lambda \\\_:1)                                  |

---

## 5\. Summary

You’ve learned how to:

- Use `RunnablePassthrough` as a **no-op placeholder** for debugging or future pipeline steps.
- Employ `assign` to **inject** or **override** keys in your chain inputs.
- Maintain a clean and testable pipeline structure with minimal boilerplate.

You can even wrap arbitrary Python functions using [`RunnableLambda`](https://github.com/langchain-ai/langchain/blob/master/langchain_core/runnables/lambda.py) for custom transformations.

---

## Links and References

- [LangChain Documentation](https://langchain.com/docs/)
- [ChatOpenAI on GitHub](https://github.com/openai/openai-python)
- [RunnablePassthrough Source](https://github.com/langchain-ai/langchain/blob/master/langchain_core/runnables/passthrough.py)
- [LangChain Output Parsers](https://langchain.com/docs/modules/output_parsers/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/754457c5-1386-422b-98ad-3342dfc6aab3/lesson/18f5c92b-a25c-4449-ae23-6c65658209d5)**
>
> Watch video content
