# What Is Machine Learning - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-900-Microsoft-Certified-Azure-AI-Fundamentals/Fundamentals-of-Machine-Learning/What-Is-Machine-Learning)

---

## Table of Contents

- What Is Machine Learning
  - Training Phase
  - Inferencing Phase
  - Summary
  - Watch Video

---

## Content

AI-900: Microsoft Certified Azure AI Fundamentals

Fundamentals of Machine Learning

# What Is Machine Learning

Machine learning is the practice of building predictive models by identifying patterns in data. In this article, we explore the fundamentals of machine learning through two main phases: training and inferencing.

## Training Phase

During the training phase, the model learns from historical data. The training dataset includes observations where each observation contains input features and a corresponding label. In this context:

- **Features:** Attributes or variables (e.g., number of rooms, square footage, age).
- **Label:** The target outcome to predict, such as the house price.

For example, when predicting house prices, an observation might include:

- 3 bedrooms
- 1,500 square feet
- 20 years of age
- Priced at $300,000

The model processes this data using an algorithm—a set of instructions that helps it identify relationships between the features and the label. In our case, the algorithm examines how the number of rooms, square footage, and age influence the price, and it then generalizes these relationships into a mathematical function or formula.

After processing the data, the algorithm produces a trained model that encapsulates the learned function. For instance, the model might derive a relationship similar to:

```
def predict_price(num_rooms, sqft, age):
    return 50000 * num_rooms + 200 * sqft - 1000 * age
```

> [!important]
> **Note**
>
> This sample function is a simplified representation for educational purposes. In real-world applications, models are often more complex and consider additional factors.

## Inferencing Phase

Once trained, the model enters the inferencing phase, where it uses the learned function to predict outcomes for new data that includes features without labels.

Consider predicting the price of a new house with the following features:

- 4 bedrooms
- 2,000 square feet
- 10 years of age

Using the sample function:

```
predicted_price = predict_price(4, 2000, 10)
print(predicted_price)
```

The computation involves:

- 50,000 × 4 (for the number of rooms)
- 200 × 2,000 (for the square footage)
- Minus 1,000 × 10 (for the age)

This leads to a predicted price of approximately $590,000.

> [!important]
> **Note**
>
> The inferencing phase applies the model’s learned patterns to new data, enabling reliable predictions even when the label is not provided.

![The image explains the process of machine learning, illustrating how predictive models are developed by discovering patterns in data. It includes steps like training with historical data, using algorithms to generalize relationships, and creating models to make predictions.](https://kodekloud.com/kk-media/image/upload/v1752857003/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-What-Is-Machine-Learning/machine-learning-predictive-models-process.jpg)

## Summary

Machine learning involves three key steps:

1.  **Training:** Learning patterns from historical data by mapping input features to labels.
2.  **Algorithm Processing:** Generalizing these relationships into a function or formula.
3.  **Inferencing:** Applying the trained model to predict outcomes on new data.

By leveraging these steps, machine learning models can make informed predictions and drive decision-making in various applications.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-900-microsoft-azure-ai-fundamental/module/8148a01f-2436-45df-99cc-44d03cb327f9/lesson/4061a0ea-1761-4b23-888d-2ac31db69eb1)**
>
> Watch video content
