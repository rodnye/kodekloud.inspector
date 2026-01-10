# Azure AI Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-900-Microsoft-Certified-Azure-AI-Fundamentals/Introduction-to-Azure-AI-Services/Azure-AI-Services)

---

## Table of Contents

- Azure AI Services
  - Azure Machine Learning
  - Azure AI Services
  - Azure Cognitive Search
  - Deploying and Consuming Azure AI Resources
  - Deploying and Testing Azure AI Services Using the Azure Portal
  - Summary
  - Watch Video
    - Accessing Azure AI Services via REST APIs
    - Step 1: Deploying the Service
    - Step 2: Testing the Computer Vision API with Postman

---

## Content

AI-900: Microsoft Certified Azure AI Fundamentals

Introduction to Azure AI Services

# Azure AI Services

Azure AI services consist of three core offerings: Azure Machine Learning, Azure AI Services, and Azure Cognitive Search. In this guide, you'll learn about each service, explore their unique features, and discover how to deploy and interact with these resources using the Azure portal and REST APIs.

---

## Azure Machine Learning

Azure Machine Learning is a comprehensive cloud platform that supports the entire machine learning lifecycle—including training, deployment, and management. It offers a wide range of machine learning algorithms suitable for various tasks such as image recognition, language processing, and predictive analytics. Its seamless integration capabilities allow you to easily embed machine learning models into your applications, enhancing them with intelligent functions.

![The image is an informational graphic about Azure Machine Learning, highlighting its features such as training, deployment, management of machine learning models, support for various algorithms, and easy integration into applications.](https://kodekloud.com/kk-media/image/upload/v1752857023/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Azure-AI-Services/azure-machine-learning-features-graphic.jpg)

Azure Machine Learning is ideal for anyone looking to integrate robust machine learning projects into their applications.

---

## Azure AI Services

Azure AI Services provide a comprehensive suite of tools designed to embed intelligence into your applications. These services simplify the process of adding advanced features by offering capabilities in:

- **Vision:** Image recognition and analysis.
- **Speech:** Voice and speech processing.
- **Language:** Text analytics and natural language understanding.
- **Decision-making:** Intelligent guidance and automation.
- **Generative AI:** Content creation algorithms.

These features help developers build applications that understand, interpret, and interact more naturally with users, reducing the complexities often associated with AI development.

![The image is a slide titled "AI Services in Azure," describing Azure AI Services as a collection of tools for vision, speech, language, decision-making, and generative AI, aimed at building intelligent applications.](https://kodekloud.com/kk-media/image/upload/v1752857024/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Azure-AI-Services/ai-services-in-azure-tools.jpg)

> [!important]
> **Note**
>
> Azure AI Services enable a smarter application ecosystem by allowing you to process visual data, recognize speech, analyze text, and generate dynamic content without needing comprehensive AI expertise.

---

## Azure Cognitive Search

Azure Cognitive Search is engineered to efficiently search and retrieve information from vast datasets. By combining traditional keyword searches with intelligent features like semantic understanding and relevance ranking, it enriches your data with insights and organizes it for quick access. This capability not only improves search experience but also aids in decision-making and knowledge discovery.

![The image is a slide titled "AI Services in Azure," focusing on "Azure Cognitive Search," highlighting its capabilities in data extraction, enrichment, indexing, enhancing search experiences, and facilitating knowledge discovery.](https://kodekloud.com/kk-media/image/upload/v1752857025/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Azure-AI-Services/ai-services-azure-cognitive-search.jpg)

---

## Deploying and Consuming Azure AI Resources

When deploying Azure AI resources in the cloud, you have two main deployment options:

1.  **Standalone Resources:** Deploy individual services such as vision, speech, language, or decision-making separately. This method is ideal for a focused service configuration.
2.  **Unified Azure AI Service Resources:** Deploy a single resource that bundles multiple AI capabilities (Vision, Speech, Language, and Decision-making) into one configuration. This unified approach simplifies management and accelerates deployment.

### Accessing Azure AI Services via REST APIs

Azure AI Services are accessible through REST APIs, with each service exposing its own endpoint for interaction via standard HTTP calls. Every API request requires an authentication token or subscription key to secure communication.

![The image illustrates how AI services in Azure are accessed by applications using RESTful APIs and authentication keys or tokens. It includes a diagram showing a cloud with AI and gears, connected to an app via a key and endpoint.](https://kodekloud.com/kk-media/image/upload/v1752857026/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Azure-AI-Services/azure-ai-services-restful-api-diagram.jpg)

> [!important]
> **Security Reminder**
>
> Always ensure that your API requests include the proper authentication token or subscription key to prevent unauthorized access.

---

## Deploying and Testing Azure AI Services Using the Azure Portal

This section explains how to deploy and test Azure AI Services using the Azure portal and Postman.

### Step 1: Deploying the Service

- Open the Azure portal and search for AI services.
- Choose to create individual services (e.g., Computer Vision) or opt for the unified Azure AI Services resource if you need multiple capabilities.
- For a unified approach, click on Azure AI Services and create a new resource group (e.g., "AI services AI-900") using the standard pricing tier.

  ![The image shows a Microsoft Azure portal page for creating Azure AI services, with fields for project and instance details such as subscription, resource group, region, name, and pricing tier.](https://kodekloud.com/kk-media/image/upload/v1752857027/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Azure-AI-Services/azure-portal-ai-services-creation.jpg)

- After clicking "Create," wait for the deployment to finish. Once complete, select "Go to resource" to view the service details, including endpoints and subscription keys for various APIs such as Computer Vision, speech, and language.

  ![The image shows an Azure portal interface for managing AI services, displaying details like resource group, status, location, and keys for accessing the service. It includes options to view endpoints and manage keys.](https://kodekloud.com/kk-media/image/upload/v1752857028/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Azure-AI-Services/azure-portal-ai-services-management.jpg)

### Step 2: Testing the Computer Vision API with Postman

To test the Computer Vision API, follow these steps:

1.  Copy the endpoint URL for the Computer Vision API.
2.  Open Postman and create a new POST request with the URL.
3.  In the request headers, add your subscription key.
4.  Set the request body to include a JSON payload with the URL of a publicly accessible image. For example:

    ```
    {
        "url": "https://<your_storage_account>/Vision/handwritten.jpg"
    }
    ```

5.  Send the POST request. The response will include an "Operation-Location" header providing a URL to poll for the analysis status.
6.  Duplicate the request tab, change the request type to GET, and paste the Operation-Location URL. Remove the body and ensure the subscription key is included in the request headers.
7.  Click "Send" to retrieve the analysis result. A successful response will look similar to the example below:

    ```
    {
        "status": "succeeded",
        "createdDateTime": "2024-11-05T15:15:04Z",
        "lastUpdatedDateTime": "2024-11-05T15:15:05Z",
        "analyzeResult": {
            "version": "3.0.0",
            "readResults": [
                {
                    "page": 1,
                    "angle": -0.4915,
                    "width": 2268,
                    "height": 4032,
                    "lines": [
                        {
                            "boundingBox": [
                                532,
                                995,
                                1958,
                                995,
                                1958,
                                1045,
                                532,
                                1045
                            ]
                        }
                    ]
                }
            ]
        }
    }
    ```

This indicates that the Computer Vision API successfully processed and recognized the handwritten content in the provided image.

---

## Summary

Integrating Azure AI Services into your projects unlocks a range of intelligent capabilities—from machine learning and language understanding to data enrichment and advanced search. Whether you choose standalone services or a unified resource, Azure's powerful tools and REST APIs provide the flexibility and security necessary for modern intelligent applications.

Good luck as you experiment with these services, and enjoy enhancing your applications with Azure's AI capabilities!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-900-microsoft-azure-ai-fundamental/module/3f906796-1fb2-415e-8fe4-22f1470c83d5/lesson/c09a9ebc-7feb-4551-898b-7a44a63f5b00)**
>
> Watch video content
