# Exploring Configurable Parameters - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Adding-Memory-to-LLM-Apps/Exploring-Configurable-Parameters)

---

## Table of Contents

- Exploring Configurable Parameters
  - Defining a Configurable Model
  - Building and Invoking the Chain
  - Overriding the Model at Runtime
  - Benefits of Configurable Fields
  - Further Reading
  - Watch Video

---

## Content

LangChain

Adding Memory to LLM Apps

# Exploring Configurable Parameters

In this guide, you’ll learn how to use **configurable fields** in LangChain to override default runtime parameters—ideal for switching between OpenAI models (e.g., GPT-3.5 and GPT-4) based on your prompt’s complexity or cost requirements.

## Defining a Configurable Model

Begin by importing the required classes and creating a `ChatOpenAI` instance where `model_name` is exposed as a configurable field. By default, this example uses **GPT-3.5 Turbo**.

```
from langchain_core.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.runnables import ConfigurableField


# Initialize ChatOpenAI with a configurable `model_name`
model = ChatOpenAI(model_name="gpt-3.5-turbo").configurable_fields(
    model_name=ConfigurableField(
        id="model_name",
        name="Model Name",
        description="Select the OpenAI chat model to use",
    )
)
```

> [!important]
> **Note**
>
> If you don’t override `model_name`, the chain will always use `gpt-3.5-turbo` by default.

## Building and Invoking the Chain

Next, define a simple haiku prompt template and compose it with your configurable model. Invoking the chain without further configuration uses the default settings.

```
# Create a haiku prompt template
prompt = PromptTemplate.from_template("Write a Haiku on {subject}")


# Chain the prompt with the model
chain = prompt | model


# Invoke using default model (gpt-3.5-turbo)
response = chain.invoke({"subject": "cat"})
print(response)
```

Example response:

```
AIMessage(
  content='Whiskers soft and fine
Purring gently in the sun
Graceful feline friend',
  response_metadata={
    'token_usage': {'completion_tokens': 19, 'prompt_tokens': 13, 'total_tokens': 32},
    'model_name': 'gpt-3.5-turbo',
    'finish_reason': 'stop'
  }
)
```

## Overriding the Model at Runtime

To leverage a more advanced model like **GPT-4** for complex prompts, call `.with_config()` with a dictionary matching your configurable field’s key:

```
# Override to use GPT-4
response_gpt4 = chain.with_config(configurable={"model_name": "gpt-4"}).invoke(
    {"subject": "cat"}
)
print(response_gpt4)
```

Example response:

```
AIMessage(
  content="Soft purr in the night,
Eyes gleaming in moon's soft light,
Cat in calm delight.",
  response_metadata={
    'token_usage': {'completion_tokens': 22, 'prompt_tokens': 13, 'total_tokens': 35},
    'model_name': 'gpt-4',
    'finish_reason': 'stop'
  }
)
```

> [!important]
> **Warning**
>
> Switching to higher-capability models (like `gpt-4`) may increase your API costs. Monitor usage via your OpenAI dashboard.

## Benefits of Configurable Fields

Configurable fields provide a flexible, cost-effective way to manage runtime parameters:

| Benefit               | Description                                                        | Example                                             |
| --------------------- | ------------------------------------------------------------------ | --------------------------------------------------- |
| Cost Optimization     | Default to a less expensive model, upgrade only when needed.       | Start with GPT-3.5, switch to GPT-4 selectively     |
| Developer Flexibility | Let users or downstream code adjust parameters without redeploy.   | Expose `temperature`, `max_tokens`, or `model_name` |
| Seamless Integration  | Combine with memory, callbacks, and dynamic prompts for workflows. | Multi-turn chatbots with user preferences           |

## Further Reading

- [LangChain Configuration Guide](https://docs.langchain.com/docs/configuration)
- [OpenAI Model Reference](https://platform.openai.com/docs/models)
- [PromptTemplate Documentation](https://docs.langchain.com/docs/prompts/prompt-template)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/abd1e527-3f6e-4e04-b421-3b1f8de5c69d/lesson/d20a74d2-983f-41da-a5bb-026e3d541199)**
>
> Watch video content
