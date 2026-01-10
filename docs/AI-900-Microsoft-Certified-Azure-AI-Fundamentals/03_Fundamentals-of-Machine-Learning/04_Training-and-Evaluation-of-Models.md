# Training and Evaluation of Models - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-900-Microsoft-Certified-Azure-AI-Fundamentals/Fundamentals-of-Machine-Learning/Training-and-Evaluation-of-Models)

---

## Table of Contents

- Training and Evaluation of Models
  - Training Phase
  - Prediction and Evaluation
  - Iterative Refinement
  - Summary
  - Watch Video

---

## Content

AI-900: Microsoft Certified Azure AI Fundamentals

Fundamentals of Machine Learning

# Training and Evaluation of Models

In this lesson, we delve into two critical phases in machine learning: training and evaluation. Building an accurate model requires first teaching it historical data in the training phase and then examining its performance on unseen data during the evaluation stage.

## Training Phase

The training process starts with collecting historical data that comprises both features and labels. Features are the input variables that describe each observation, while labels represent the actual outcomes. For example, if predicting house prices, the training data might include features such as house size, location, and number of rooms, with the actual sale prices serving as labels.

To ensure robust learning, the data is typically divided into two sets:

- **Training Set:** Used to teach the model.
- **Validation Set:** Reserved for evaluating the model’s performance on new, unseen data.

Once the data is prepared, an algorithm is applied to the training set. The algorithm consists of a series of instructions that enable the model to discover patterns and relationships between features and labels. For instance, when using linear regression, the algorithm seeks to establish a mathematical formula linking features (like house size and location) to the price. The outcome is a trained model—a learned function that maps input features to predicted labels.

> [!important]
> **Note**
>
> Remember that careful data preparation and proper splitting are crucial to avoid issues such as overfitting.

## Prediction and Evaluation

After the training phase, the next step is to use the trained model to make predictions on the validation data—a dataset the model has never encountered before. For each input in the validation set, the model generates a prediction. These predictions are then compared with the actual labels using evaluation metrics such as:

- **Mean Absolute Error (MAE):** Commonly used in regression tasks like house price predictions.
- **Accuracy:** Often applied in classification tasks, for example when detecting spam emails.

In scenarios involving unsupervised learning, where labels are not provided, evaluation focuses on how effectively the model groups data into meaningful clusters. For example, the model might be assessed on its ability to categorize articles into segments such as technology, sports, and movies.

## Iterative Refinement

Developing a high-performing model is an iterative process. Various algorithms and parameter adjustments are experimented with to continually enhance model performance. With each iteration, the model is retrained and re-evaluated, aiming to achieve the optimal balance between accuracy and practical utility.

> [!important]
> **Key Point**
>
> While even the best models have a margin of error, a systematic approach to evaluation and refinement helps minimize this error and leads to more reliable predictions.

![The image illustrates the process of model training and evaluation, showing steps from using training data to applying algorithms, creating a model, making predictions, and evaluating the model's performance. It highlights the iterative nature of refining the model with different algorithms and parameters.](https://kodekloud.com/kk-media/image/upload/v1752857002/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Training-and-Evaluation-of-Models/model-training-evaluation-process.jpg)

## Summary

The cycle of training and evaluation involves:

| Phase                | Description                                                                                      | Example                                   |
| -------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| Training             | The model learns patterns through historical data and a learning algorithm                       | Linear regression for price prediction    |
| Prediction           | The trained model generates predictions on new, unseen data                                      | Predicting house prices on validation set |
| Evaluation           | Model performance is assessed using metrics such as MAE or accuracy                              | Evaluating forecast accuracy              |
| Iterative Refinement | Models are continuously improved by fine-tuning algorithms and parameters for better performance | Re-training with adjusted hyperparameters |

In conclusion, the training and evaluation cycle is essential for building models that can generalize well to new data. This systematic process of learning, predicting, and refining ultimately leads to more trustworthy and accurate predictions.

This concludes our discussion on model training and evaluation. Next, we will explore deep learning techniques, which delve into advanced methods for creating highly sophisticated models.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-900-microsoft-azure-ai-fundamental/module/8148a01f-2436-45df-99cc-44d03cb327f9/lesson/2f6f9c18-3d48-4321-9dd8-ad6ac4a232d4)**
>
> Watch video content
