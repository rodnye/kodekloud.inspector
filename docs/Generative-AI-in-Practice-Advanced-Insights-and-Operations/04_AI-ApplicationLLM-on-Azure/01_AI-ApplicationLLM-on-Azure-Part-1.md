# AI ApplicationLLM on Azure Part 1 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Generative-AI-in-Practice-Advanced-Insights-and-Operations/AI-ApplicationLLM-on-Azure/AI-ApplicationLLM-on-Azure-Part-1)

---

## Table of Contents

- AI ApplicationLLM on Azure Part 1
  - Overall Architecture
  - Deep Dive into Code Integration
    - YAML Model Configuration
    - API Setup with FastAPI
    - Backend Helper Function
    - Fetching Additional Context
    - Templated Prompt with Jinja

---

## Content

Generative AI in Practice: Advanced Insights and Operations

AI ApplicationLLM on Azure

# AI ApplicationLLM on Azure Part 1

In this lesson, we explore the infrastructure and code behind our test application using Retrieval-Augmented Generation (RAG). Our objective is to illustrate how various components—from APIs and application configurations to vector search and runtime parameters—work in tandem to deliver an end-to-end solution on Azure.

## Overall Architecture

We start by reviewing the overall architecture which includes key components such as Azure Container Apps, Machine Learning workspaces, and storage accounts. This mid-size pilot application leverages common Azure services, including Azure-managed identities and Azure AI Studio.

![The image shows a Microsoft Azure Resource Visualizer interface displaying a diagram of interconnected cloud services and resources. It includes various Azure components like Container Apps, Machine Learning workspaces, and Storage accounts.](https://kodekloud.com/kk-media/image/upload/v1752875743/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-AI-ApplicationLLM-on-Azure-Part-1/azure-resource-visualizer-diagram.jpg)

## Deep Dive into Code Integration

Next, we examine the code—with an in-depth look at Promptly integration.

### YAML Model Configuration

The following YAML configuration defines model settings, including the API endpoint, deployment details, and runtime parameters such as max tokens, temperature, top_p, and logit bias adjustments. It also provides a sample user and context prompt.

```
model:
  configuration:
    azure_endpoint: ${env:AZURE_OPENAI_ENDPOINT}
    azure_deployment: gpt-4-evals
    parameters:
      max_tokens: 1500
      temperature: 0.1
      top_p: 0.9
      logit_bias:
        "18147": -100
        "2754": -100
  sample:
    firstName: Mohsen
    context: >
      Imagine you are a stand-up comedian with a knack for delivering witty, punchy sketches
      about U.S. politics. Your humor is sharp, insightful, and always respectful, though you
      don't shy away from a little satire on political figures, policies, or the latest headlines.
      Each sketch should be brief, relatable, and funny, making your audience laugh while nudging them
      to think.
```

After saving these changes, the application functions as an API. Users send inquiries and receive answers from the backend LLM.

### API Setup with FastAPI

Consider the main API file that sets up routes using FastAPI. The sample snippet demonstrates the inclusion of CORS middleware and two endpoints: one for a health-check (GET) and another for generating responses (POST).

```
origins = ['*']


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello and welcome"}


@app.post("/api/create_response")
@trace
def create_response(question: str, customer_id: str, chat_history: str) -> dict:
    # Implementation goes here
    pass
```

A more detailed view of the API call shows that when the "get response" endpoint is triggered, the code extracts inputs and passes them to another module, which uses Promptly to orchestrate backend processes.

```
@app.get("/")
async def root():
    return {"message": "Hello and welcome"}


@app.post("/api/create_response")
@trace
def create_response(question: str, customer_id: str, chat_history: str) -> dict:
    result = get_response(customer_id, question, chat_history)
    return result


# TODO: fix open telemetry so it doesn't slow app so much
FastAPIInstrumentor.instrument_app(app)
```

### Backend Helper Function

In the helper function, model configuration is loaded from environment variables. The prompt is executed using Promptly, and the result is printed and returned.

```
def get_response(customerId, question, chat_history):
    model_config = {
        "azure_endpoint": os.environ["AZURE_OPENAI_ENDPOINT"],
        "api_version": os.environ["AZURE_OPENAI_API_VERSION"],
    }

    result = prompty.execute(
        "chat.prompty",
        inputs={"question": question, "customer": customerId, "documentation": context},
        configuration=model_config,
    )

    print("result: ", result)
    return {"question": question, "answer": result, "context": context}


if __name__ == "__main__":
    get_response(4, "What hiking jackets would you recommend?", [])
    # get_response(argv[1], argv[2], argv[3])
```

A similar implementation is repeated with minor modifications in variable naming. Both versions extract inputs, execute the prompt, and return the generated response.

```
def get_response(customerId, question, chat_history):
    model_config = {
        "azure_endpoint": os.environ["AZURE_OPENAI_ENDPOINT"],
        "api_version": os.environ["AZURE_OPENAI_API_VERSION"],
    }


    result = prompty.execute(
        "chat.prompty",
        inputs={"question": question, "customer": customer, "documentation": context},
        configuration=model_config,
    )


    print("result: ", result)
    return {"question": question, "answer": result, "context": context}


if __name__ == "__main__":
    get_response(4, "What hiking jackets would you recommend?", [])
    # get_response(argv[1], argv[2], argv[3])
```

### Fetching Additional Context

Another snippet demonstrates fetching additional context before executing the prompt. The function retrieves customer information and product details to create a comprehensive context.

```
def get_response(customerId: str, question, chat_history):
    print("getting customer...")
    customer = get_customer(customerId)
    print("customer complete")
    context = product.find_products(question)
    print(context)
    print("products complete")
    print("getting result...")

    model_config = {
        "azure_endpoint": os.environ["AZURE_OPENAI_ENDPOINT"],
        "api_version": os.environ["AZURE_OPENAI_API_VERSION"],
    }


    result = prompty.execute(
        "ask me..."
    )
```

````
### Promptly YAML Configuration for Retail Assistant


The Promptly file used here features an elegant YAML configuration designed for a retail assistant serving Contoso Outdoors. It defines the model deployment, API version, system behavior, and sample inputs.


```yaml
description: A retail assistant for Contoso Outdoors products retailer.
authors:
  - Cassie Breviu
  - Seth Juarez
model:
  api: chat
  configuration:
    type: azure_openai
    azure_deployment: gpt-35-turbo
    azure_endpoint: ${ENV:AZURE_OPENAI_ENDPOINT}
    api_version: 2023-07-01-preview
  parameters:
    max_tokens: 128
    temperature: 0.2
  inputs:
    customer:
      type: object
      documentation:
        type: object
        question:
          type: string
          sample: ${file:chat.json}
system: |
  You are an AI agent for the Contoso Outdoors products retailer. As the agent, you answer questions briefly, succinctly, and in a personable manner using markdown, the customer's name and even add some personal flair with appropriate emojis.
# Safety
- You **should always** reference factual statements to search results based on [relevant documents]
````

A similar configuration using Jinja templating illustrates how to define system prompts and grounding information.

```
description: A retail assistant for Contoso Outdoors products retailer.
authors:
  - Cassie Breviu
  - Seth Juarez
model:
  api: chat
  configuration:
    type: azure_openai
    azure_deployment: gpt-35-turbo
    azure_endpoint: ${ENV:AZURE_OPENAI_ENDPOINT}
    api_version: 2023-07-01-preview
  parameters:
    max_tokens: 128
    temperature: 0.2
  inputs:
    customer:
      type: object
      documentation:
        type: object
        question:
          type: string
          sample: ${file:chat.json}
system: |
  You are an AI agent for the Contoso Outdoors products retailer. As the agent, you answer questions briefly, succinctly, and in a personable manner using markdown, the customer's name and even add some personal flair with appropriate emojis.
# Safety
- You **should always** reference factual statements to search results based on [relevant documents]
```

### Templated Prompt with Jinja

```


catalog: {{item.id}}
item: {{item.title}}
content: {{item.content}},


# Previous Orders
Use their order as context to the question they are asking.,
{{item.name}}
description: {{item.description}},


# Customer Context
The customer's name is {{customer.firstName}} {{customer.lastName}} and is {{customer.age}} years old.
{{customer.firstName}} {{customer.lastName}} has a "{{customer.membership}}" membership status.


# question
{{question}}


# Instructions
Reference other items purchased specifically by name and description that would go well with the items found above. Be brief and concise and use appropriate emojis.
,
{{item.role}},
,[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
```
