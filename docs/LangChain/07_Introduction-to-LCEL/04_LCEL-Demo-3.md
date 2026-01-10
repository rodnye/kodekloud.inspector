# LCEL Demo 3 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Introduction-to-LCEL/LCEL-Demo-3)

---

## Table of Contents

- LCEL Demo 3
  - What Is Batching?
  - Implementing Batch Inference
  - Batch vs Single Inference Performance
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

LangChain

Introduction to LCEL

# LCEL Demo 3

This article builds on our previous examples of synchronous chain invocation and streaming output. Here, we’ll dive into **batching**—sending multiple prompts at once so LangChain can parallelize LLM calls and return results much faster, often taking about the same time as a single prompt.

## What Is Batching?

Batching allows you to submit a list of prompt dictionaries in one call. Instead of invoking your chain for each prompt sequentially, you pass them all to `chain.batch(...)` and let LangChain handle parallel execution under the hood.

> [!important]
> **Note**
>
> Batching is ideal when you have multiple similar prompts (e.g., summarization, question-answering) and want to reduce overall latency. Ensure your LLM provider supports concurrent requests.

## Implementing Batch Inference

Below is a simple example of setting up a prompt chain and running batched inference:

```
from langchain import LLMChain, PromptTemplate
from langchain.llms import OpenAI


# Define your prompt template, LLM, and output parser if needed
prompt = PromptTemplate(
    input_variables=["question"],
    template="Answer the following question concisely: {question}"
)
llm = OpenAI(model_name="gpt-4")
chain = LLMChain(prompt=prompt, llm=llm)


# Prepare a list of prompt dictionaries
questions = [
    {"question": "Tell me about The Godfather movie."},
    {"question": "Tell me about the Avatar movie."},
]


# Batch inference
responses = chain.batch(questions)
```

Each entry in `responses` corresponds to one prompt:

```
# Print the first response
print(responses[0])
```

Output:

```
The Godfather is a classic American crime film directed by Francis Ford Coppola, released in 1972. It follows the Corleone family and their patriarch Vito Corleone (Marlon Brando) passing control of the empire to Michael (Al Pacino). Renowned for its storytelling, performances, and cinematography, it's often cited as one of the greatest films ever made.
```

```
# Print the second response
print(responses[1])
```

## Batch vs Single Inference Performance

If you benchmark execution time for a batch of prompts against running them one-by-one, you’ll notice:

| Metric                   | Single Inference (2 Prompts) | Batched Inference (2 Prompts) |
| ------------------------ | ---------------------------- | ----------------------------- |
| Total Requests           | 2                            | 1                             |
| Typical Latency (total)  | ~2× RTT + processing         | ~1× RTT + processing          |
| Parallelization Overhead | Minimal                      | Negligible                    |
| Throughput Improvement   | —                            | ~2×                           |

_RTT: Round-trip time between your application and the LLM API._

## Next Steps

We’ve covered the basics of batching in LangChain. In upcoming demos, we’ll explore:

- **Runnable pass-through**: How to insert custom logic between chain links.
- **Advanced LCEL concepts**: Optimizing and orchestrating complex pipelines.

Stay tuned for more LCEL insights!

## Links and References

- [LangChain Documentation](https://langchain.readthedocs.io/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference/)
- [Prompt Engineering Guide](https://learnprompting.org/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/754457c5-1386-422b-98ad-3342dfc6aab3/lesson/8dffe6ae-3a79-440a-a04c-7397040ebc9a)**
>
> Watch video content
