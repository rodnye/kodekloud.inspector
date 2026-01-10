# Overview of LCEL - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Introduction-to-LCEL/Overview-of-LCEL)

---

## Table of Contents

- Overview of LCEL
  - Watch Video

---

## Content

LangChain

Introduction to LCEL

# Overview of LCEL

Welcome back! In this lesson, we’ll dive into the **LangChain Expression Language (LCEL)**—a declarative, domain-specific language that makes it easy to compose, visualize, and maintain LangChain pipelines using a simple pipe (`|`) operator.

LCEL treats each LangChain component (prompts, LLMs, retrievers, parsers, etc.) as a stage in a logical pipeline. The output of one stage seamlessly becomes the input of the next, resulting in clean, modular code that’s straightforward to extend and debug.

![The image shows two terminal windows labeled "Command" and "Output," connected by a dashed line, with the title "What is LangChain Expression Language?"](https://kodekloud.com/kk-media/image/upload/v1752880978/notes-assets/images/LangChain-Overview-of-LCEL/langchain-expression-language-terminal-diagram.jpg)

Every component in LangChain implements a clear **input → processing → output** contract. When you wire these components with `|`, LCEL builds an executable graph under the hood:

![The image explains the LangChain Expression Language (LCEL) and Domain Specific Language (DSL), showing a flow from prompts to an LLM and then to an output parser.](https://kodekloud.com/kk-media/image/upload/v1752880979/notes-assets/images/LangChain-Overview-of-LCEL/langchain-expression-language-flow-diagram.jpg)

This approach offers:

- **Modularity**: Swap, reorder, or reuse stages without rewriting the entire chain
- **Readability**: A visual, left-to-right flow similar to shell pipelines
- **Extensibility**: Integrate custom `Runnable` components, retrievers, or parsers

At the core of LCEL is the `Runnable` base class. By subclassing `Runnable[InputType, OutputType]`, you define how a component:

1.  **Receives** input
2.  **Processes** its logic (e.g., calls an LLM or parses text)
3.  **Emits** output

Implementing `Runnable` ensures your custom components plug into LCEL pipelines without extra boilerplate.

![The image is a graphic illustrating the concept of LangChain Expression Language, featuring a terminal window labeled "Runnable" surrounded by colorful icons of gears and cubes.](https://kodekloud.com/kk-media/image/upload/v1752880980/notes-assets/images/LangChain-Overview-of-LCEL/langchain-expression-language-terminal-graphic.jpg)

> [!important]
> **Note**
>
> Define your component by extending `Runnable` and overriding the `invoke` method:
>
> ```
> from langchain.core.runnable import Runnable
>
> class MyCustomProcessor(Runnable[str, str]):
> def invoke(self, input_text: str) -> str:
> # transform input_text and return result
> return input_text.upper()
> ```

LCEL is production-ready and powers systems with hundreds of chained components running reliably at scale.

If you’ve used Unix or Linux, you know how `|` passes the output of one command to another:

```
$ cat file.txt | grep "error" | wc -l
```

- `cat file.txt` streams the file content
- `grep "error"` filters for “error” lines
- `wc -l` counts matching lines

You can achieve the same clarity in LCEL:

```
from langchain import PromptTemplate, OpenAI, RegexParser

prompt = PromptTemplate("Q: {question}\nA:")
llm = OpenAI(model="gpt-4")
parser = RegexParser(pattern=r"^.*$")

chain = prompt | llm | parser
result = chain.invoke({"question": "Tell me about the Godfather movie"})
print(result)
```

1.  **Prompt** formats the question
2.  **LLM** generates the answer
3.  **Parser** extracts the relevant output

> [!important]
> **Warning**
>
> Long, monolithic pipelines can be hard to debug. Break complex workflows into smaller sub-chains and reassemble them for clarity.

| Component      | Role                              | Example                                |
| -------------- | --------------------------------- | -------------------------------------- |
| Prompt         | Template for input formatting     | `PromptTemplate("Q: {text}")`          |
| LLM            | Language model invocation         | `OpenAI(model="gpt-4")`                |
| Retriever      | External data lookup (e.g., docs) | `PDFRetriever(file_path="report.pdf")` |
| OutputParser   | Structured output extraction      | `RegexParser(pattern=r"Answer: (.*)")` |
| CustomRunnable | User-defined processing logic     | `MyCustomProcessor()`                  |

LCEL also supports **meta-chains**—where one chain’s output feeds another chain. This unlocks powerful workflows, such as multi-step reasoning or data enrichment pipelines.

![The image illustrates a concept inspired by pipes in Unix/Linux, showing two sets of colored circles connected by a chain link.](https://kodekloud.com/kk-media/image/upload/v1752880981/notes-assets/images/LangChain-Overview-of-LCEL/unix-linux-pipes-colored-circles.jpg)

Most of our upcoming demos and labs will leverage LCEL to build expressive, maintainable LangChain applications. To deepen your understanding:

- Read the [official LCEL documentation](https://python.langchain.com/docs/modules/expression_language/overview)
- Explore the [LangChain GitHub examples](https://github.com/langchain-ai/langchain)
- Try extending `Runnable` with your own custom processors

Let’s switch to the demo and see LCEL in action!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/754457c5-1386-422b-98ad-3342dfc6aab3/lesson/59a17ad6-cdd8-42a5-868b-d7b47163d130)**
>
> Watch video content
