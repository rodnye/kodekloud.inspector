# Demo MLflow Model Artifact and Versioning - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Fundamentals-of-MLOps/Model-Development-and-Training/Demo-MLflow-Model-Artifact-and-Versioning)

---

## Table of Contents

- Demo MLflow Model Artifact and Versioning
  - Watch Video
  - Practice Lab

---

## Content

Fundamentals of MLOps

Model Development and Training

# Demo MLflow Model Artifact and Versioning

Welcome to this lesson on storing machine learning models in the MLflow Model Artifact Registry. In this guide, we will walk through using a decision tree regressor model as an example, showing you how to register it and manage its versions—an essential step before deploying the model.

Previously, we ran an ML experiment and stored the results under the ML model experiment category. For demonstration purposes, we are using the decision tree regressor model because it executes quickly. Although this use case is simplified compared to real-world scenarios, it effectively illustrates the key steps involved.

![The image shows an MLflow interface displaying a list of machine learning experiment runs, including Random Forest, Decision Tree, and Linear Regression models, with details like creation time and duration.](https://kodekloud.com/kk-media/image/upload/v1752875165/notes-assets/images/Fundamentals-of-MLOps-Demo-MLflow-Model-Artifact-and-Versioning/mlflow-experiment-runs-interface.jpg)

In the image above, the decision tree regressor model is highlighted as our candidate. Clicking on the model brings you to its overview page where you will find an "Artifacts" tab. Under this section, you will notice several packages produced for the model. One important artifact is the pickle file, which serves as the primary representation of the model. Think of this pickle file as analogous to a jar file or a PyPI package in other deployment contexts.

> [!important]
> **Important**
>
> Before proceeding, note that storing the model in the artifact registry is similar to how Docker images are versioned and stored in a Docker registry. This process ensures that multiple consumers can access and utilize different versions of the model.

To register the model in the MLflow Model Artifact Registry, click the "Register Model" option. Since no model has been registered yet, select the "Create a New Model" option and provide a name (for example, "NewMLDeployment"). Finally, click on "Register Model" to complete the registration process.

![The image shows an MLflow interface with a "Register model" dialog box open, where a model named "NewMLDeployment" is being registered. The background displays a list of artifacts related to a "Decision Tree Regressor" experiment.](https://kodekloud.com/kk-media/image/upload/v1752875166/notes-assets/images/Fundamentals-of-MLOps-Demo-MLflow-Model-Artifact-and-Versioning/mlflow-register-model-decision-tree.jpg)

After successful registration, navigate to the "Models" section. You will see that a new model has been added with version one tagged. Running the experiment again will generate another version of the model, such as version two.

If you would like to test the model locally, you can easily download it. Just navigate back to the ML model experiment, select the decision tree regressor model, click on the "Artifacts" tab, and then choose the "model.pkl" file. This file will have a download option, allowing you to retrieve the model and build or test your serving code.

This concludes the demonstration of MLflow's model artifact registration and versioning. Thank you for reading, and we look forward to sharing more insights in our next lesson.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/fundamentals-of-mlops/module/898cf36a-be28-4be6-b6cf-c616c1a4798e/lesson/ede90ca0-08c6-4af0-8fdc-888269dee218)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/fundamentals-of-mlops/module/898cf36a-be28-4be6-b6cf-c616c1a4798e/lesson/cfc4a342-a033-426d-9b0d-cb55a90253d1)**
>
> Practice lab
