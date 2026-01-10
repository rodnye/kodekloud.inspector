# Introduction to Azure ML - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-900-Microsoft-Certified-Azure-AI-Fundamentals/Fundamentals-of-Machine-Learning/Introduction-to-Azure-ML)

---

## Table of Contents

- Introduction to Azure ML
  - Navigating the Azure Machine Learning Studio
  - Testing the Endpoint
  - Summary
  - Further Reading
  - Watch Video

---

## Content

AI-900: Microsoft Certified Azure AI Fundamentals

Fundamentals of Machine Learning

# Introduction to Azure ML

Welcome to this comprehensive guide on Azure Machine Learning—a powerful, cloud-based platform tailored for building, training, and deploying machine learning models around the clock. In this lesson, you will explore how Azure Machine Learning simplifies the end-to-end process, making it accessible for both beginners and experts.

Azure Machine Learning offers a full suite of tools that support every stage of the machine learning lifecycle, from data preparation to deployment. One of its key features is the intuitive Azure Machine Learning Studio, a virtual workspace that allows you to drag and drop components to build models without extensive coding experience.

![The image is an introduction to Azure Machine Learning, showcasing a user-friendly interface with a diagram explaining the workflow and a screenshot of the Azure Machine Learning Studio displaying metrics and a confusion matrix for a penguin classifier model.](https://kodekloud.com/kk-media/image/upload/v1752856994/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Introduction-to-Azure-ML/azure-machine-learning-introduction-diagram.jpg)

> [!important]
> **Getting Started**
>
> Azure Machine Learning Studio is designed for simplicity. Its visual tools help you quickly build and modify your machine learning models, which you can then deploy as web services.

This user-friendly interface makes the platform ideal for those new to machine learning. After developing a model, you can deploy it as a web service and integrate it into your applications to provide real-time predictions.

![The image is an introduction to Azure Machine Learning, showing a diagram of deploying machine learning models as services and a screenshot of the Azure Machine Learning Studio interface with metrics and a confusion matrix for a penguin classifier model.](https://kodekloud.com/kk-media/image/upload/v1752856995/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Introduction-to-Azure-ML/azure-machine-learning-introduction-diagram-2.jpg)

The streamlined deployment process ensures that your model delivers insights quickly and efficiently by combining robust cloud capabilities with an easy-to-use interface.

## Navigating the Azure Machine Learning Studio

Let’s dive into the Azure portal to explore the Machine Learning Studio interface. After logging into the Azure portal and navigating to Azure Machine Learning, you'll find your Machine Learning workspace, which is the primary area for managing your projects.

When you click on "Launch Studio," you are presented with a user-friendly interface that allows you to:

- Upload datasets
- Run jobs and pipelines
- Develop machine learning models
- Create endpoints for deployment

For example, you might work with a dataset like the "house price sheet"—a CSV file containing various parameters related to house pricing.

![The image shows a screenshot of the Azure Machine Learning Studio interface, displaying details of a dataset named "house_price_sheet," including its attributes, data sources, and version information.](https://kodekloud.com/kk-media/image/upload/v1752856996/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Introduction-to-Azure-ML/azure-machine-learning-house-price-dataset.jpg)

After uploading your dataset, you can initiate a job that builds and trains a model using AutoML.

![The image shows the "Jobs" section of Azure Machine Learning Studio, displaying a list of experiments with details such as the latest job, submission date, and job type. The sidebar includes options like Notebooks, Automated ML, and Pipelines.](https://kodekloud.com/kk-media/image/upload/v1752856997/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Introduction-to-Azure-ML/azure-machine-learning-jobs-section.jpg)

Once the training is complete, Azure Machine Learning Studio displays the best model generated from the AutoML job.

![The image shows a screenshot of the Azure Machine Learning Studio interface, displaying details of a completed automated machine learning job named "house_price," including properties, inputs, outputs, and best model summary.](https://kodekloud.com/kk-media/image/upload/v1752856998/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Introduction-to-Azure-ML/azure-machine-learning-house-price-job.jpg)

The developed algorithm can then be deployed as an endpoint for real-time predictions.

![The image shows the Azure Machine Learning Studio interface with a completed job for a house prices model. It displays model details, including the algorithm name "VotingEnsemble" and performance metrics like the normalized root mean squared error.](https://kodekloud.com/kk-media/image/upload/v1752856999/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Introduction-to-Azure-ML/azure-machine-learning-house-prices-model.jpg)

Once deployed, you can access and test the endpoint directly from the Studio interface. For instance, selecting the endpoint offers options to test the service with sample data, ensuring that your model integrates smoothly into your applications.

![The image shows the Azure Machine Learning Studio interface, specifically the "Endpoints" section, listing a real-time endpoint named "ml-house-prices-ai900."](https://kodekloud.com/kk-media/image/upload/v1752857000/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Introduction-to-Azure-ML/azure-machine-learning-endpoints-ml-house-prices.jpg)

## Testing the Endpoint

When testing the deployed endpoint, you typically provide sample data in the form of JSON. Below is an example of a JSON payload that includes fields such as year, month, neighborhood, number of bedrooms, bathrooms, square footage of living area, lot size, number of floors, and waterfront information:

```
{
  "input_data": {
    "columns": [
      "year",
      "month",
      "neighborhood",
      "bedrooms",
      "bathrooms",
      "sqft_living",
      "sqft_lot",
      "floors",
      "waterfront"
    ]
  }
}
```

Based on this sample input, the model might predict a house price. For example, clicking the "Test" button could return a prediction of 628,616.

A similar lab exercise uses another dataset—bike rentals—to further strengthen your understanding. In this case, you will work with different inputs and review corresponding JSON output. For example:

Input:

```
[
    3000,
    1,
    2,
    2005,
    0.5,
    3.75,
    1
]
```

Output:

```
{
    "628616.4862228915"
}
```

> [!important]
> **Quick Tip**
>
> Experimenting with different datasets like house prices and bike rentals helps solidify your understanding of how Azure Machine Learning Studio handles various prediction scenarios.

## Summary

Azure Machine Learning streamlines the process of creating and deploying machine learning models by combining powerful cloud capabilities with an intuitive user interface. This guide has walked you through the interface components and key steps—from dataset upload and job creation to model training and endpoint testing—with visual examples at every stage.

With this foundation, you are now ready to explore more advanced topics in Azure Machine Learning. Happy learning!

## Further Reading

- [Azure Machine Learning Documentation](https://learn.microsoft.com/azure/machine-learning/)
- [Introduction to Machine Learning with Azure](https://learn.microsoft.com/azure/machine-learning/concept-what-is-azure-ml)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-900-microsoft-azure-ai-fundamental/module/8148a01f-2436-45df-99cc-44d03cb327f9/lesson/32e58eae-ba29-4c9e-b572-960e20622c57)**
>
> Watch video content
