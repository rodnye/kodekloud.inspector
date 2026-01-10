# AI Enrichment - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-900-Microsoft-Certified-Azure-AI-Fundamentals/Azure-AI-Search/AI-Enrichment)

---

## Table of Contents

- AI Enrichment
  - Enhancing Content for AI Search
  - Implementing AI Enrichment on the Azure Portal
  - Exploring the Enriched Search Results
  - Conclusion
  - Watch Video
    - Creating Enriched Content with Skill Sets
    - Serializing Data for Indexing
    - The Role of the Knowledge Store

---

## Content

AI-900: Microsoft Certified Azure AI Fundamentals

Azure AI Search

# AI Enrichment

In this article, we explore the concept of AI enrichment within Azure AI. AI enrichment transforms raw data into structured, meaningful information, significantly enhancing search and analysis capabilities.

The overall AI enrichment process consists of the following steps:

1.  Data ingestion
2.  Extraction
3.  AI enrichment and indexing
4.  Data exploration

Each step connects raw data to AI-powered insights, adding layers of meaning and structure that enable more relevant and efficient search capabilities.

## Enhancing Content for AI Search

In Azure AI Search, enriched content is created by applying advanced AI techniques. These methods convert unstructured information into structured insights, thereby improving search accuracy and relevance. Users can quickly retrieve valuable information from the data repository.

### Creating Enriched Content with Skill Sets

Skill sets in Azure AI are specialized AI models designed to analyze and enhance data. They provide depth and context by performing several key tasks, including:

- Recognizing and extracting entities such as names, dates, and locations.
- Translating text from one language to another to support multilingual datasets.
- Evaluating sentiment to determine whether text is positive, negative, or neutral.

For example, when a document references various people, places, or events, the associated skill set extracts these details and converts them into searchable metadata. As data is processed, enriched documents are created by:

- Incorporating them during indexing to improve search results.
- Storing them in a dedicated repository known as the knowledge store.

![The image is an infographic about AI Enrichment in Azure AI Search, detailing processes like recognizing entities, translating text, and evaluating sentiment to create enriched content and documents. It also explains how enriched documents are used during indexing and stored in a knowledge store for further analysis.](https://kodekloud.com/kk-media/image/upload/v1752856859/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-AI-Enrichment/ai-enrichment-azure-search-infographic.jpg)

The knowledge store plays a crucial role in holding enriched data for advanced analysis, reporting, and integration with other applications.

### Serializing Data for Indexing

After the enrichment process, the data is serialized into a consistent format that is optimal for indexing by the search engine. This conversion step accelerates the indexing process and contributes to improved overall search performance.

![The image is a diagram illustrating the process of AI enrichment in Azure AI Search, showing steps from data ingestion to indexing and exploration. It highlights the flow of processed and enriched data through a search engine for indexing.](https://kodekloud.com/kk-media/image/upload/v1752856860/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-AI-Enrichment/ai-enrichment-azure-search-diagram.jpg)

### The Role of the Knowledge Store

The knowledge store is a vital element of the AI enrichment pipeline in Azure AI Search. It serves as a centralized repository where all enriched documents are stored and organized. This storage mechanism supports advanced search and analytic functions by making the enriched data readily available for querying and further analysis.

![The image illustrates the AI enrichment process in Azure AI Search, showing a flow from data ingestion to exploration, with components like a knowledge store, advanced search, and analytics.](https://kodekloud.com/kk-media/image/upload/v1752856861/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-AI-Enrichment/ai-enrichment-azure-search-flow.jpg)

## Implementing AI Enrichment on the Azure Portal

Follow these steps to enable AI enrichment for a search service in the Azure portal. This guide assumes that you have already deployed your search service and are storing reviews in a blob storage container. For example, a review stored in JSON format may look like this:

```
{
  "Review": "Finished '1984' by George Orwell. A chilling dystopian novel that remains relevant. Essential reading for anyone interested in politics and society.",
  "Date": "October 10, 2020",
  "Location": "Los Angeles, California",
  "BookTitle": "1984",
  "Author": "George Orwell",
  "Genre": "Dystopian"
}
```

To add this container as a data source:

1.  Navigate to the Data Source section of your search service and click "Add Data Source".
2.  Select "Blob Storage" since your data resides there.
3.  Choose the appropriate storage account and container (in this example, "reviews") and click "Create".

Once added, the data source appears in the overview blade. You can now import data and attach cognitive skills by selecting the existing data source and adding enrichments. These enrichments might include:

- Enabling optical character recognition (OCR) to merge text into a single “merged content” field.
- Extracting key entities (e.g., people, organizations, locations) and key phrases, and detecting language.
- Translating text (for example, reviews can be translated into French).
- Generating tags from images (if applicable).

![The image shows a Microsoft Azure portal interface for importing data, specifically focusing on adding cognitive skills and attaching AI services. It includes options for selecting AI services and regions, with a section for adding enrichments.](https://kodekloud.com/kk-media/image/upload/v1752856862/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-AI-Enrichment/azure-portal-import-data-ai-services.jpg)

> [!important]
> **Note**
>
> You can configure the enhanced data (projections) to be saved into a knowledge store by setting up the storage account connection string with a SAS token for time-bound access.

Next, customize the target index by expanding the index settings to view the fields from your review data. Here, you can designate which fields are filterable, sortable, facetable, or searchable based on your specific requirements. After finalizing these settings, save them and create an indexer. A notification will confirm that the indexer has been created and the process has started.

![The image shows a Microsoft Azure interface for importing data, with options to configure fields such as "Review," "Location," and "Genre" for indexing. Various checkboxes are available for settings like "Retrievable," "Filterable," and "Searchable."](https://kodekloud.com/kk-media/image/upload/v1752856864/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-AI-Enrichment/azure-data-import-interface-settings.jpg)

After the indexing job completes (in this demonstration, 14 records were processed without warnings or errors), return to your search service and open the Search Explorer to inspect your results.

![The image shows the Microsoft Azure portal interface for an AI Search service, displaying options for managing and exploring data, along with service details like resource group, location, and subscription ID.](https://kodekloud.com/kk-media/image/upload/v1752856865/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-AI-Enrichment/azure-portal-ai-search-service.jpg)

## Exploring the Enriched Search Results

When you perform a search query, you will see enriched data complete with detected entities, translated text, and additional metadata. For example, a sample search result might appear as follows:

```
{
  "@odata.context": "https://ai900azsearch.search.windows.net/indexes('azureblob-index')/$metadata#docs(*)",
  "@odata.count": 14,
  "value": [
    {
      "@search.score": 1,
      "metadata_storage_path": "aHR0cHM6Ly9ic2p2Y2l2ZGZtZ2lzZjMxL3VzbGVuZG9jL3RhbGdlcnNvZi9kZW1v",
      "people": [
        "George Orwell"
      ],
      "organizations": [],
      "locations": [
        "Los Angeles",
        "California"
      ],
      "keyphrases": [
        "Chilling dystopian novel",
        "Essential reading",
        "Review",
        "Politics",
        "October",
        "Location",
        "BookTitle",
        "Author",
        "Genre"
      ],
      "language": "en",
      "translated_text": "{{\n  \"Critique\" : \"Fin! '1984' par George Orwell. Un roman dystopique glaçant qui reste\n  : 'Review'. \"Finished '1984' by George Orwell. A Chilling dystopian novel that remains\"}}",
      "text": []
    }
  ]
}
```

Another query could yield this result:

```
{
  "@odata.context": "https://ai900azsearch.search.windows.net/indexes('azureblob-index')/$metadata#docs",
  "@odata.count": 14,
  "value": [
    {
      "@search.score": 58.536095,
      "metadata_storage_path": "AHRcHM6Ly9jc2VydGl2ZGVyNjI6ZG9jcy9qMS9kLnB1YmxpY2F0aW9uL21vYmlsZS8yMDYyMDIwMTY1NDQ0P3ZhbGlkYXRpb24vMDBiMjlhYjY1ZTA1MTRhYjZjZGMwYjA5NTdjMTk2MTNiNWYy",
      "people": [
        "F. Scott Fitzgerald"
      ],
      "organizations": [],
      "locations": [
        "American",
        "New York"
      ],
      "keyphrases": [
        "The Great Gatsby",
        "F. Scott Fitzgerald",
        "timeless classic",
        "American dream",
        "classic literature",
        "New York"
      ],
      "Reviews": [
        {
          "fan": "",
          "March": "",
          "Location": "",
          "BookTitle": "",
          "Author": "",
          "language": "en",
          "translated_text": "{\n  \"Critique\" : \"Lisez 'The Great Gatsby' de F. Scott Fitzgerald. Un classique intemporel.\",\n  \"merged_content\" : \"{\\n  'Review': 'We read 'The Great Gatsby' by F. Scott Fitzgerald. A timeless classic that...'\n}"
        }
      ]
    }
  ]
}
```

Enhanced search results demonstrate that AI enrichment automatically detects entities such as people, locations, key phrases, performs sentiment analysis, and even translates text. This comprehensive process results in a more effective search experience and enables robust data analytics.

Consider the following sample output for a final enriched search result:

```
{
  "@odata.context": "https://ai900azsearch.search.windows.net/indexes('{azureblob-index}')/$metadata#docs",
  "@odata.count": 14,
  "value": [
    {
      "@search.score": 50.536905,
      "metadata_storage_path": "AHR0CHM6LY9Jc2VYbGZlYj2CtZvGBGIZ6FMDkmWb0L3JdmlLd3MwVGHxLxdydZw",
      "people": [
        "F. Scott Fitzgerald"
      ],
      "organizations": [],
      "locations": [
        "American",
        "New York"
      ],
      "keyphrases": [
        "The Great Gatsby",
        "F. Scott Fitzgerald",
        "timeless classic",
        "American dream",
        "classic literature",
        "New York",
        "reviews",
        "fans",
        "genre",
        "author"
      ],
      "language": "en",
      "translated_text": "\n  \"Critique\" de F. Scott Fitzgerald. Un classique intemporel...",
      "merged_content": "\n  \"REVview\". \"Read 'The Great Gatsby' by F. Scott Fitzgerald. A timeless classic that..."
    }
  ]
}
```

This final output confirms that AI enrichment not only enhances the structure and relevance of your data but also facilitates dynamic search functionalities and deep data analysis.

## Conclusion

AI enrichment in Azure AI Search is a powerful process that transforms raw data by adding layers of meaning and context. By leveraging specialized skill sets, creating enriched documents, serializing data effectively, and utilizing a knowledge store, organizations gain deeper insights and achieve a more effective search experience. This article has guided you through the complete process—from configuring the data source in the Azure portal to exploring the enriched search results—demonstrating how Azure AI Search can support advanced analysis and improve data accessibility.

Happy searching!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-900-microsoft-azure-ai-fundamental/module/eec859b3-ec6b-40c0-96c6-14b70a1ece32/lesson/9277e88f-f61b-4ce1-8786-d3c454500e3f)**
>
> Watch video content
