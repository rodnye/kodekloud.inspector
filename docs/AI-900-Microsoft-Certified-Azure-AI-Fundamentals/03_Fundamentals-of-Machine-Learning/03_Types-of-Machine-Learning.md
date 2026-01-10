# Types of Machine Learning - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-900-Microsoft-Certified-Azure-AI-Fundamentals/Fundamentals-of-Machine-Learning/Types-of-Machine-Learning)

---

## Table of Contents

- Types of Machine Learning
  - Supervised Learning
  - Unsupervised Learning
  - Summary
  - Watch Video
    - Regression
    - Classification
    - Clustering

---

## Content

AI-900: Microsoft Certified Azure AI Fundamentals

Fundamentals of Machine Learning

# Types of Machine Learning

Machine learning can be categorized based on the type of data it processes and the tasks it performs. In this guide, we explore the different types of machine learning, highlighting their differences and applications.

We divide machine learning into two primary categories: supervised learning and unsupervised learning.

## Supervised Learning

Supervised learning involves training models on datasets that include known labels. A label represents the expected outcome a model should predict. For example, when forecasting house prices, the dataset might contain features such as size, location, and age along with the corresponding prices. The model learns by comparing its predictions with these actual values.

Supervised learning typically comprises two main tasks: regression and classification.

### Regression

Regression is applied when the target label is a numerical value. For instance, predicting temperature using historical weather data is a regression task. Here, the model is trained to predict continuous values, such as temperature, house prices, or sales figures.

### Classification

Classification is used when the target label represents a category or class. In this process, the model learns to assign data into distinct groups. For example, a classification model might predict whether a patient is at risk for diabetes based on clinical data.

Classification tasks are further divided into:

- **Binary Classification:** Involves predicting one of two possible classes. Examples include determining if a patient is at risk for diabetes (yes/no) or recognizing spam emails (spam/not spam).
- **Multiclass Classification:** Involves selecting one class from more than two possible classes. For instance, classifying plant species (e.g., roses, daisies, sunflowers) requires the model to choose a category from multiple options.

## Unsupervised Learning

Unsupervised learning is used when training data does not come with labels. The model independently identifies patterns or groupings within the dataset. For example, when working with a collection of unlabeled articles, an unsupervised algorithm might group articles by topics such as sports, politics, or technology.

### Clustering

Clustering is a common unsupervised learning technique. It involves grouping similar items together without any predefined labels. This method is highly effective for organizing and analyzing large datasets, especially when labels are not available.

> [!important]
> **Note**
>
> Building a strong foundation in both supervised and unsupervised learning is crucial for selecting the right approach to solve your predictive modeling challenges.

## Summary

To recap:

- **Supervised Learning:** Utilizes labeled data to make predictions. It encompasses tasks like regression (predicting continuous values) and classification (assigning data to specific categories).
- **Unsupervised Learning:** Deals with unlabeled data to uncover hidden patterns, with clustering being a primary example.

Understanding these machine learning types is essential for choosing the appropriate strategy for your projects. With this foundation, we will now move on to exploring the training and evaluation of models.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-900-microsoft-azure-ai-fundamental/module/8148a01f-2436-45df-99cc-44d03cb327f9/lesson/3fb093dc-d8fc-439f-89df-6e6083952f5c)**
>
> Watch video content
