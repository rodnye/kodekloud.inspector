# Demo Register the Model and Setup BentoML for Serving ML Models - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Fundamentals-of-MLOps/Automating-Insurance-Claim-Reviews-with-MLflow-and-BentoML/Demo-Register-the-Model-and-Setup-BentoML-for-Serving-ML-Models)

---

## Table of Contents

- Demo Register the Model and Setup BentoML for Serving ML Models
  - Watch Video

---

## Content

Fundamentals of MLOps

Automating Insurance Claim Reviews with MLflow and BentoML

# Demo Register the Model and Setup BentoML for Serving ML Models

Welcome to this tutorial on serving machine learning models with BentoML. In this guide, you'll learn how to download a model, register it with BentoML, and deploy a service to handle predictions. This step-by-step lesson is designed for improved performance tracking and production-grade serving.

──────────────────────────────────────── Step 1: Download and Prepare the Model ────────────────────────────────────────

Begin by downloading your machine learning model (for example, a pickle file named `model.pkl`) from your chosen source. Once downloaded, place the model file into your project's root directory using VS Code or your preferred editor.

──────────────────────────────────────── Step 2: Register the Model with BentoML ────────────────────────────────────────

Create a Python script (e.g., `register_model.py`) to load your pickle file and register it with BentoML. Use the code below:

```
import bentoml
import pickle


# Load the model from the downloaded pickle file
model_path = "model.pkl"  # Update the path if needed
with open(model_path, 'rb') as model_file:
    model = pickle.load(model_file)


# Save the model to BentoML with a unique name
bento_model = bentoml.sklearn.save_model("health_insurance_anomaly_detector", model)


print(f"Model registered with BentoML: {bento_model}")
```

Run the script by executing:

```
$ python3 register_model.py
```

If the model registration is successful, you'll see output similar to the following:

```
2024/12/03 11:22:46 INFO mlflow.tracking.fluent: Experiment with name 'Health Insurance Claim Anomaly Detection' does not exist. Creating a new experiment.
2024/12/03 11:22:49 WARNING mlflow.models.model: Model logged without a signature and input example. Please set 'input_example' parameter when logging the model to auto infer the model signature.
Train Anomaly Percentage: 5.29%
Test Anomaly Percentage: 4.29%
Model metrics logged to MLflow.
View run bidi-... at http://127.0.0.1:5000/#/experiments/199595116865516564/runs/t8d3fcbfd4496503aeb75f4feeb7f
✅ Experiment at: http://127.0.0.1:5000/#/experiments/199595116865516564
Model registered with BentoML: health_insurance_anomaly_detector:your_model_tag_here
```

> [!important]
> **Note**
>
> This output confirms successful integration with both MLflow (for experiment tracking) and BentoML (for model serving).

──────────────────────────────────────── Step 3: Verify Registration in BentoML ────────────────────────────────────────

After registration, ensure that the model is stored in the BentoML registry. Execute the following command:

```
$ bentoml models list
```

A typical output should show your model details:

```
Tag                                         Module          Size    Creation Time
health_insurance_anomaly_detector:5gxztv(rnq95z76)  bentoml.sklearn  1.39 MiB  2024-12-03 11:29:59
```

This confirms that your model artifact is securely stored in the BentoML repository. Although multiple experiments might be tracked with MLflow, only the model registered in BentoML is used for serving.

──────────────────────────────────────── Step 4: Create the BentoML Service for Serving ────────────────────────────────────────

Define a service to serve your model by creating a file (e.g., `service.py`) with the following content:

```
import bentoml
from bentoml.io import JSON, PandasDataFrame


# Load the registered model from BentoML registry using the latest version.
model_runner = bentoml.sklearn.get("health_insurance_anomaly_detector:latest").to_runner()


# Create a BentoML service and attach the model runner.
svc = bentoml.Service("health_insurance_anomaly_detection_service", runners=[model_runner])


# API endpoint for prediction using a Pandas DataFrame as input and JSON as output.
@svc.api(input=PandasDataFrame(), output=JSON())
def predict(data):
    predictions = model_runner.predict.run(data)
    return {"predictions": predictions.tolist()}
```

This service creates an endpoint (`/predict`) that accepts feature data in a Pandas DataFrame format and returns predictions in JSON.

──────────────────────────────────────── Step 5: Running the BentoML Service ────────────────────────────────────────

Start the BentoML service with live-reloading enabled to pick up any local changes automatically. Run:

```
$ bentoml serve service.py --reload
```

By default, BentoML serves on port 3000. Open your browser and navigate to the BentoML UI. You will see the `/predict` endpoint readily available.

The API endpoint specifications are as follows:

| Endpoint      | Input           | Output |
| ------------- | --------------- | ------ |
| POST /predict | PandasDataFrame | JSON   |

> [!important]
> **Quick Tip**
>
> This endpoint is intended for receiving feature data (for instance, from a CSV file uploaded by an insurance claims agent) and returning prediction results.

──────────────────────────────────────── Next Steps ────────────────────────────────────────

In this lesson, you registered a machine learning model with BentoML and created a simple prediction API. In the upcoming lesson, you'll learn how to integrate this API into a web application so insurance claims agents can upload CSV files and receive predictions effortlessly.

Happy serving!

For more information, refer to the official [BentoML Documentation](https://docs.bentoml.org/) and [MLflow Documentation](https://mlflow.org/docs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/fundamentals-of-mlops/module/e6813732-5ba7-496f-84db-2272a4c2b188/lesson/79edd427-b092-42e5-9eb3-3af706b5f3ad)**
>
> Watch video content
