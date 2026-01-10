# Azure AI Search Services - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-900-Microsoft-Certified-Azure-AI-Fundamentals/Azure-AI-Search/Azure-AI-Search-Services)

---

## Table of Contents

- Azure AI Search Services
  - Data Ingestion
  - AI Enrichment and Indexing
  - User Interaction
  - Workflow Summary
  - Creating an Azure AI Search Service in the Portal
  - Next Steps
  - Watch Video

---

## Content

AI-900: Microsoft Certified Azure AI Fundamentals

Azure AI Search

# Azure AI Search Services

Azure AI Search Services offers a comprehensive knowledge mining solution that leverages advanced artificial intelligence to extract, process, and analyze data from various sources. This robust service transforms raw data into actionable insights, enabling efficient search capabilities for applications and visualizations.

In this article, we will detail how Azure AI Search Services ingests data, enriches it using AI, indexes the information, and finally allows users to interact with the enriched dataset through effective search functionalities.

## Data Ingestion

The initial phase in using Azure AI Search Services involves data ingestion. Azure provides various storage options designed to handle different data types and use cases. Below is an outline of the primary storage options:

1.  **Azure Blob Storage Containers**  
    Ideal for storing vast amounts of unstructured data such as documents, images, and videos. Azure Blob Storage is highly scalable, which simplifies the management and retrieval of various media files.
2.  **Azure SQL Database and Cosmos DB Documents**
    - **SQL Database:** Optimized for structured data using relational storage.
    - **Cosmos DB:** A distributed NoSQL document store known for high availability and multi-region scalability. It is particularly effective for applications that require real-time access to structured document data.

3.  **Azure Data Lake Storage Gen2**  
    Specifically built for big data analytics, this service offers high-performance and scalable storage solutions, along with enhanced integration for advanced analytics.
4.  **Azure Table Storage**  
    A NoSQL key-value store that is ideal for handling structured data without rigid schemas. It provides fast access to extensive collections of semi-structured data.

Each of these storage solutions enables efficient data handling from multiple sources, ensuring that diverse datasets are seamlessly ingested for further processing.

![The image is an infographic about Azure AI Search Services, detailing various storage options like Azure Blob Storage, SQL Database, Data Lake Storage Gen2, and Table Storage, along with their features and benefits.](https://kodekloud.com/kk-media/image/upload/v1752856866/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Azure-AI-Search-Services/azure-ai-search-services-infographic.jpg)

## AI Enrichment and Indexing

Once data is ingested, Azure AI Search Services moves on to AI enrichment and indexing—a crucial process that enhances the raw data and makes it searchable.

- **AI Enrichment:**  
  Using powerful techniques such as Natural Language Processing and Computer Vision, Azure AI Search extracts meaningful information from both text and images. For example, text analysis can identify key phrases, entities, and overall sentiment, while computer vision automatically tags objects within images. This step converts unstructured data into structured, searchable content.
- **Indexing:**  
  The enriched data is then organized into indexes, facilitating quick and precise searchability. This systematic organization ensures that even large volumes of data can be rapidly accessed and queried by users.

![The image is an infographic about Azure AI Search Services, detailing processes like AI enrichment, data extraction, and indexing to enhance search capabilities. It highlights components such as understanding, extracting, and integrating AI services for improved data accessibility.](https://kodekloud.com/kk-media/image/upload/v1752856867/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Azure-AI-Search-Services/azure-ai-search-infographic.jpg)

> [!important]
> **Note**
>
> Azure AI Search Services leverages state-of-the-art AI models to enrich data. Ensure that your data sources are properly formatted to maximize the benefits of AI processing.

## User Interaction

The final stage of Azure AI Search Services focuses on how users interact with and benefit from the enriched data:

- **Querying the Index:**  
  Users can execute precise queries on the indexes. With the data enriched by AI, the search results become both accurate and relevant, ensuring a robust search experience.
- **Application Integration:**  
  The search results aren’t just static data—they can be embedded directly into applications. Developers can integrate these insights into user interfaces, enabling real-time and actionable data delivery without disrupting the overall experience.
- **Data Visualization:**  
  This service also supports creating visual representations of data. Visualizing enriched information makes it easier for stakeholders to interpret the results and make informed business decisions.

![The image is an infographic titled "Azure AI Search Services," detailing three main functions: performing searches on indexes, using results within applications, and creating data visualizations. Each function includes brief descriptions and icons illustrating efficient and accurate search, user integration, and data interpretation and communication.](https://kodekloud.com/kk-media/image/upload/v1752856868/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Azure-AI-Search-Services/azure-ai-search-services-infographic-2.jpg)

## Workflow Summary

In summary, Azure AI Search Services follows a streamlined workflow:

- **Data Ingestion:** Raw data is imported from multiple sources.
- **AI Enrichment:** AI-driven techniques process the data, extracting and analyzing key insights.
- **Indexing:** The enriched data is organized into searchable indexes.
- **User Interaction:** Users query the indexes, integrate results into applications, and create data visualizations to drive informed decision-making.

## Creating an Azure AI Search Service in the Portal

Follow these steps to create an Azure AI Search Service using the Azure Portal:

1.  Open the Azure Portal and search for "Azure AI Search".
2.  Create a new resource group (for example, "AI 900 Azure AI Search").
3.  Select your desired region (e.g., East US) and opt for the free tier pricing.
4.  Review your settings and deploy the service.

Once deployed, the search service is ready to ingest data and perform AI enrichment, setting the groundwork for advanced search capabilities.

![The image shows a Microsoft Azure portal page for creating a search service, displaying details like subscription, resource group, location, and pricing tier. Notifications about deployment submission and resource group deletion are visible on the right.](https://kodekloud.com/kk-media/image/upload/v1752856869/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Azure-AI-Search-Services/azure-portal-search-service-creation.jpg)

## Next Steps

In upcoming sections, we will explain how to connect the search service to Azure Blob Storage and detail the implementation of AI enrichment steps on your data. These integrations will enable you to further enhance your applications and transform raw data into valuable business insights.

With Azure AI Search Services, you are equipped to harness the power of AI for improved data handling, efficient search operations, and enhanced user experiences.

> [!important]
> **Further Reading**
>
> For more information about search capabilities and AI integration in Azure services, visit [Azure Documentation](https://docs.microsoft.com/en-us/azure/search/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-900-microsoft-azure-ai-fundamental/module/eec859b3-ec6b-40c0-96c6-14b70a1ece32/lesson/be2e56f9-aeb3-4f00-974f-dd2b7a1234db)**
>
> Watch video content
