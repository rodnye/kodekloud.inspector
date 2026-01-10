# Debugging LangChain Applications - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Tips-Tricks-and-Resources/Debugging-LangChain-Applications)

---

## Table of Contents

- Debugging LangChain Applications
  - 1. Basic LLMChain Example
  - 2. Enabling Global Debug Logging
  - Further Reading and References
  - Watch Video
    - What You Gain with Debug Logging

---

## Content

LangChain

Tips Tricks and Resources

# Debugging LangChain Applications

Inspecting the internal execution of your LangChain workflows is essential for troubleshooting and tuning performance. By default, LangChain hides most runtime details. Enabling debug logging reveals every step—from chain start to LLM invocation and chain end—so you can understand exactly what’s happening under the hood.

## 1\. Basic LLMChain Example

Let’s begin with a simple `LLMChain` that prompts an OpenAI model to explain a concept in the style of a teacher.

```
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain


# 1. Define a prompt template with system and human messages
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a {subject} teacher"),
    ("human", "Tell me about {concept}")
])


# 2. Initialize the LLM
llm = ChatOpenAI(model_name="gpt-4")


# 3. Create and run the chain
chain = LLMChain(llm=llm, prompt=prompt)
response = chain.invoke({"subject": "physics", "concept": "galaxy"})
print(response)
```

Expected JSON response:

```
{
  "subject": "physics",
  "concept": "galaxy",
  "text": "A galaxy is a gravitationally bound system of stars, stellar remnants, interstellar gas, dust, dark matter, and other astronomical objects..."
}
```

> [!important]
> **Note**
>
> The `response` object returns all template variables plus the generated `text`. You can further process it or store it for downstream tasks.

As your chains grow—adding memory, callbacks, or nested components—understanding the flow becomes challenging. That’s where debug logging shines.

## 2\. Enabling Global Debug Logging

LangChain offers a simple global switch to turn on detailed debug output. This logs each chain and component invocation, inputs, outputs, timing, and model parameters.

```
from langchain import debug
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain


# Enable debug logging across your application
debug(True)


prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a {subject} teacher"),
    ("human", "Tell me about {concept}")
])
llm = ChatOpenAI(model_name="gpt-4")
chain = LLMChain(llm=llm, prompt=prompt)


# Invoke with debug enabled
chain.invoke({"subject": "physics", "concept": "galaxy"})
```

When activated, your console will display output like:

```
[chain/start] [1:chain:LLMChain] Entering Chain run with input:
{
  "subject": "physics",
  "concept": "galaxy"
}
[llm/start] [1:chain:LLMChain > 2:llm:ChatOpenAI] Entering LLM run with input:
{
  "prompts": [
    "System: You are a physics teacher\nHuman: Tell me about galaxy"
  ]
}
[llm/end] [1:chain:LLMChain > 2:llm:ChatOpenAI] [3.27s] Exiting LLM run with output:
{
  "generations": [
    [
      {
        "text": "Galaxies are vast systems of stars, dust, gas, and dark matter held together by gravity..."
      }
    ]
  ]
}
[chain/end] [1:chain:LLMChain] Exiting Chain run with output:
{
  "subject": "physics",
  "concept": "galaxy",
  "text": "Galaxies are vast systems of stars, dust, gas, and dark matter held together by gravity..."
}
```

> [!important]
> **Warning**
>
> Remember to disable debug logging (`debug(False)`) in production to avoid verbose logs and potential performance overhead.

### What You Gain with Debug Logging

| Event           | Description                                         |
| --------------- | --------------------------------------------------- |
| `[chain/start]` | Marks the beginning of a chain execution            |
| `[llm/start]`   | Indicates an LLM component has been invoked         |
| `[llm/end]`     | Shows LLM output, timing metrics, and model details |
| `[chain/end]`   | Displays the final chain output and aggregated data |

By simply adding:

```
from langchain import debug
debug(True)
```

you unlock full visibility into your LangChain workflows—ideal for performance tuning, debugging complex chains, and ensuring reliability.

## Further Reading and References

- [LangChain Documentation](https://langchain.com/)
- [ChatOpenAI on GitHub](https://github.com/langchain-ai/langchain)
- [Python Logging Best Practices](https://docs.python.org/3/howto/logging.html)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/b5f7771a-fdbc-45b1-a786-6c84bb7ffc76/lesson/2306b896-2eb1-409b-84f6-f2c392dbd3c4)**
>
> Watch video content
