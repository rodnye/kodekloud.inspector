# Demo RAG Application - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Generative-AI-in-Practice-Advanced-Insights-and-Operations/Retrieval-Augmented-Generation-RAG/Demo-RAG-Application)

---

## Table of Contents

- Demo RAG Application
  - System Architecture
  - Code and Sample Interactions
  - Deploying the Application
  - Watch Video

---

## Content

Generative AI in Practice: Advanced Insights and Operations

Retrieval Augmented Generation RAG

# Demo RAG Application

Welcome to our comprehensive guide on deploying a production-grade retrieval-augmented generation (RAG) application. This article walks you through a sample Azure solution—Contoso Chat—that mirrors real-world production systems. The application leverages infrastructure as code, containerized services, and advanced evaluation mechanisms to power modern Generative AI deployments.

Contoso Chat is designed for a common scenario in e-commerce, integrating a chatbot as a customer support agent. With almost every modern e-commerce platform using chat agents for customer guidance, this example serves as an excellent reference for deploying such cloud-native solutions.

![The image shows a GitHub repository page with a list of folders and files, along with details about commits and contributors. Tags and repository statistics are visible on the right side.](https://kodekloud.com/kk-media/image/upload/v1752875853/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Demo-RAG-Application/github-repository-files-commits.jpg)

The GitHub repository includes various components built with Microsoft Azure, making it a valuable resource for learning how to design complex systems that incorporate containers, evaluation metrics, and continuous deployment practices.

Consider the fictional Contoso Outdoor Company, a retailer offering adventure gear. Although Microsoft has tailored the branding for demonstration purposes, the underlying concept remains authentic—selling tents, hiking backpacks, and other outdoor products. The backend solution, particularly the chatbot, is at the heart of this deployment.

![The image shows a webpage for "Contoso Outdoor Company," featuring products like tents and backpacks, with descriptions and images of each item. It also mentions a chatbot solution for customer inquiries.](https://kodekloud.com/kk-media/image/upload/v1752875854/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Demo-RAG-Application/contoso-outdoor-company-products-webpage.jpg)

The Contoso Chat system is a prime example of a RAG-based solution designed to process dynamic data. Traditional models like GPT-4 require additional context to address customer histories, product updates, and evolving content. This article demonstrates how semantic search is integrated to process customer queries by indexing dynamic product information from services such as Cosmos DB and Azure Cognitive Search.

![The image shows a webpage describing a sample implementation of "Contoso Chat," a retail copilot solution using Azure AI. It includes images of backpacks and a chat interface, illustrating features and workflow steps.](https://kodekloud.com/kk-media/image/upload/v1752875855/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Demo-RAG-Application/contoso-chat-azure-ai-implementation.jpg)

## System Architecture

The solution’s architecture seamlessly combines containers, Azure OpenAI services (built on GPT-4), and Microsoft’s vector search capabilities to process user queries. Cosmos DB serves as the central document database for storing customer and product information. This design avoids both naive and overly complex RAG deployments, striking an ideal balance for showcasing production-level intricacies.

![The image shows an architecture diagram for "Contoso Chat Retail Copilot with Azure Container Apps," illustrating the flow from user input through Azure services to response generation. It includes components like Azure Managed Identity, Azure Container Apps, AI Search, Cosmos DB, and Azure OpenAI Services.](https://kodekloud.com/kk-media/image/upload/v1752875856/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Demo-RAG-Application/contoso-chat-retail-copilot-diagram.jpg)

One of the most notable aspects of this project is its full “infrastructure as code” implementation. To initialize the solution, use the following command:

```
azd init -t contoso-chat-openai-prompt
```

While this guide focuses primarily on backend implementation, a complete end-to-end solution (including frontend components) is available. Detailed deployment guidelines will help you deploy the system within your own Azure subscription.

As you explore the deployment process, pay close attention to the resource visualization in the Azure portal. This diagram illustrates the interconnected services such as containers, Cosmos DB, and Azure OpenAI, providing a clear view of the overall system architecture.

![The image shows a Microsoft Azure portal interface displaying a resource visualizer for a resource group, with various connected services and components like Azure Machine Learning, Container Apps, and Storage Accounts.](https://kodekloud.com/kk-media/image/upload/v1752875857/notes-assets/images/Generative-AI-in-Practice-Advanced-Insights-and-Operations-Demo-RAG-Application/azure-portal-resource-visualizer.jpg)

> [!important]
> **Deployment Note**
>
> After provisioning the infrastructure, the application is automatically populated with data via a series of conversion scripts. This includes converting Jupyter notebooks into Python scripts for seamless integration.

## Code and Sample Interactions

Once your infrastructure is deployed, the application initializes data using scripts that convert Jupyter notebooks into Python scripts. An example output might look like this:

```
Populating data ....
[NbConvertApp] Converting notebook data/customer_info/create-cosmos-db.ipynb to python
[NbConvertApp] Writing 1785 bytes to data/customer_info/create-cosmos-db.py
[NbConvertApp] Converting notebook data/product_info/create-azure-search.ipynb to python
```

With the services live, you can test the chatbot using tools such as [Postman](https://www.postman.com). For instance, sending this sample JSON request will query the system:

```
{
  "question": "How much does your Car cost? What is the engine size?",
  "answer": "The CampCruiser Overlander SUV Car by RoverRanger costs $45,000. The engine size is 3.5L V6. To enhance your off-road adventures, I recommend pairing the CampCruiser with the TrailMaster X4 Tent & the TrailWalker Hiking Shoes 🌲. Happy exploring!",
  "context": [
    {
      "id": "21",
      "title": "CampCruiser Overlander SUV",
      "content": "Ready to tackle the wilderness with all the comforts of home? The CampCruiser Overlander SUV Car by RoverRanger is more than a vehicle; it's your off-road escape pod. Whether you're blasting through mud, snoozing under the stars, or brewing coffee in the wild, this SUV is a traveler's best friend. Choose adventure, choose CampCruiser! Engine Type: 3.5L V6.",
      "url": "/products/campcruiser-overlander-suv"
    },
    {
      "id": "5",
      "title": "BaseCamp Folding Table",
      "content": "CampBuddy's BaseCamp Folding Table is an adventurer's best friend. Lightweight yet sturdy, the table is designed to function wherever you go and can easily be packed up for your next trip."
    }
  ]
}
```

The chatbot processes the query by incorporating the provided context and chat history, returning detailed product suggestions complete with pricing and technical information.

A key feature of this deployment is how it structures communication with the language model. Using prompt templates, incoming questions are grounded with relevant contextual metadata. Here is an example of such a prompt template:

```
name: Mohsenprompt
description: A prompt that uses context to ground an incoming question
authors:
  - Seth Juarez
model:
  api: chat
  configuration:
    type: azure_openai
    azure_endpoint: ${env:AZURE_OPENAI_ENDPOINT}
    azure_deployment: gpt-4-evals
  parameters:
    max_tokens: 3000
sample:
  firstName: Seth
  context: >
    The Alpine Explorer Tent boasts a detachable divider for privacy,
    numerous mesh windows and adjustable vents for ventilation, and
    a waterproof design. It even has a built-in gear loft for storing
    your outdoor essentials. In short, it's a blend of privacy, comfort,
    and convenience, making it your second home in the heart of nature!
```

This templating approach ensures that contextual information is always provided with each query, streamlining interactions with the model.

## Deploying the Application

After configuring the system, deploy the services using the following command:

```
azd deploy
```

A successful deployment displays a message like this:

```
Deploying services (azd deploy)
SUCCESS: Your workflow to provision and deploy to Azure completed in 3 minutes 5 seconds.
```

> [!important]
> **Final Note**
>
> This demonstration of a production-grade RAG application using Microsoft Azure services showcases advanced integration patterns and state-of-the-art infrastructure as code practices. Enjoy exploring the code and the robust capabilities of RAG systems!

For further insights and learning resources, consider exploring the following:

| Resource Type          | Use Case                       | Example                                               |
| ---------------------- | ------------------------------ | ----------------------------------------------------- |
| Chatbot Integration    | Customer support in e-commerce | Contoso Chat implementation                           |
| Infrastructure as Code | Automated deployments          | `azd init -t contoso-chat-openai-prompt`              |
| Semantic Search        | Dynamic query processing       | Integration with Cosmos DB and Azure Cognitive Search |

For additional reading:

- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

This concludes our demonstration of a production-grade RAG application using Microsoft Azure. In the next section, we will dive deeper into the codebase to explore further functionalities and integration points. Enjoy your journey into advanced AI applications!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/generative-ai-in-practice-advanced-insights-and-operations/module/530aab3b-2236-4f0e-b1d6-089654d76036/lesson/66270e48-1516-41dd-9098-626f0e4014b6)**
>
> Watch video content
