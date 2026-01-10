# Demo Model Serving using BentoML - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Fundamentals-of-MLOps/Model-Deployment-and-Serving/Demo-Model-Serving-using-BentoML)

---

## Table of Contents

- Demo Model Serving using BentoML
  - Architecture Overview
  - Setting Up the Environment
  - Training and Saving the V1 Model
  - Serving the V1 Model
  - Upgrading the Model (V2)
  - Recap
  - Watch Video

---

## Content

Fundamentals of MLOps

Model Deployment and Serving

# Demo Model Serving using BentoML

Welcome to this comprehensive guide on serving machine learning (ML) models with the BentoML platform. In this tutorial, we explain how to deploy a house price prediction model using synthetic data and serve it through a RESTful API. We will cover the complete workflow: environment setup, model training, saving the model to the BentoML repository, creating API endpoints to serve the model, and upgrading the model with additional features.

## Architecture Overview

Our solution architecture is designed for seamless interaction between users, microservices, and the ML model. Users interact through a dashboard, and requests are sent to an API endpoint to perform predictions. This endpoint, hosted on platforms like AWS, GCP, Azure, or an on-premises server, then communicates with the BentoML service that serves the ML model stored in an artifact registry (e.g., MLflow or the BentoML repository).

![The image is a diagram illustrating model serving using BentoML, showing a flow from users to a dashboard, then to a BentoML serving endpoint, and finally to a machine learning model.](https://kodekloud.com/kk-media/image/upload/v1752875131/notes-assets/images/Fundamentals-of-MLOps-Demo-Model-Serving-using-BentoML/bentoml-model-serving-diagram.jpg)

> [!important]
> **Overview Note**
>
> This diagram outlines the flow from the user interface to the deployed ML model, emphasizing the role of microservices and API endpoints.

---

## Setting Up the Environment

Begin by creating a virtual environment to manage your project dependencies. In your working directory, run the following command:

```
python3 -m venv bento-ml-env
```

Activate your virtual environment and install the necessary packages, including BentoML, scikit-learn, and pandas. During the process, you might see terminal output similar to the example below:

```
@learnwithraghu ~ /workspaces/mlops-demo (main) $ git clone https://github.com/codekloudhub/Fundamentals-of-LLMops.git
Cloning into 'Fundamentals-of-LLMops'...
remote: Enumerating objects: 89, done.
remote: Counting objects: 100% (89/89), done.
remote: Compressing objects: 100% (67/67), done.
remote: Total 89 (delta 22), reused 76 (delta 14), pack-reused 0 (from 0)
Resolving deltas: 100% (22/22), done.
@learnwithraghu ~ /workspaces/mlops-demo (main) $ python3 -m venv bentonl-env
```

Once the dependencies are installed, you're ready to build, train, and save your ML model using BentoML.

---

## Training and Saving the V1 Model

In this section, we build a basic linear regression model for predicting house prices using synthetic data. The following code demonstrates how to generate the data, split it into training and testing sets, and configure it for training:

```
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import bentoml


# Generate synthetic data for house price prediction
def generate_data():
    data = {
        'square_footage': [1000, 1500, 1800, 2000, 2300, 2500, 2700, 3000, 3200, 3500],
        'num_rooms': [3, 4, 4, 5, 6, 7, 7, 8, 8, 9],
        'price': [200000, 250000, 280000, 310000, 340000, 400000, 430000, 460000, 500000]
    }
    return pd.DataFrame(data)


# Load the data
df = generate_data()


# Define features and target
X = df[['square_footage', 'num_rooms']]
y = df['price']


# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```

After training the model using linear regression, it is saved to the BentoML repository. To verify that the model has been saved, run:

```
(bentoml-env) @learnwithraghu ~/workspaces/mLops-demo/Fundamentals-of-LLMops/04-bentoml (main) $ python3 model_train_v1.py
(bentoml-env) @learnwithraghu ~/workspaces/mLops-demo/Fundamentals-of-LLMops/04-bentoml (main) $ bentoml models list
Tag                          Module             Size      Creation Time
house_price_model:uyrh5n53xsoaan  bentoml.sklearn  1.23 KiB  2024-11-08 14:20:47
```

This output confirms that the house price model has been stored with a size of 1.23 KB and includes the associated creation timestamp.

---

## Serving the V1 Model

We now create an API endpoint to serve the trained model. The following code in `model_service_v1.py` loads the latest house price model from the repository, initializes a BentoML service, defines a Pydantic input schema, and registers the prediction endpoint:

```
import bentoml
from bentoml.io import JSON
from pydantic import BaseModel


# Load the model
model_ref = bentoml.sklearn.get("house_price_model:latest")
model_runner = model_ref.to_runner()


# Define the service
svc = bentoml.Service("house_price_predictor", runners=[model_runner])


# Input schema
class HouseInput(BaseModel):
    square_footage: float
    num_rooms: int


# API for prediction
@svc.api(input=JSON(pydantic_model=HouseInput), output=JSON())
async def predict_house_price(data: HouseInput):
    input_data = [[data.square_footage, data.num_rooms]]
    prediction = await model_runner.predict.async_run(input_data)
    return {"predicted_price": prediction[0]}
```

To serve the model, use the BentoML CLI with auto-reload enabled:

```
(bentoml-env) ~/learnwithraghu ➜ /workspaces/mLops-demo/Fundamentals-of-LLMops/04-bentoml (main) $ bentoml serve model_service_v1.py --reload
```

Once the service has started, your default web browser may automatically open on the BentoML interface (typically running on port 3000), providing a user-friendly API documentation.

![The image shows a web interface for a machine learning service called "house_price_predictor:dev" created with BentoML, featuring API endpoints for predicting house prices and infrastructure observability.](https://kodekloud.com/kk-media/image/upload/v1752875133/notes-assets/images/Fundamentals-of-MLOps-Demo-Model-Serving-using-BentoML/house-price-predictor-bentoml-interface.jpg)

You can test the API using the "Try it out" feature on the UI or by sending a curl request:

```
curl -X 'POST' 'https://vigilant-broccoli-664v5pjj97h5pg9-3000.app.github.dev/predict_house_price' \
-H 'accept: application/json' \
-H 'Content-Type: application/json' \
-d '{
  "square_footage": 2500,
  "num_rooms": 4
}'
```

Alternatively, test the service locally with:

```
curl -X POST "http://127.0.0.1:3000/predict_house_price" \
-H "Content-Type: application/json" \
-d '{"square_footage": 2500, "num_rooms": 4}'
```

The service will return a JSON response with the predicted house price.

---

## Upgrading the Model (V2)

The second version of our model includes additional features that can enhance prediction accuracy. The upgraded model integrates parameters such as the number of bathrooms, house age, distance to the city center, and more. Below is the updated training script (`model_train_v2.py`):

```
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import bentoml


# Generate synthetic data for house price prediction with 10 features
def generate_data():
    data = {
        'square_footage': [1000, 1500, 1800, 2000, 2300, 2500, 2700, 3000, 3200, 3500],
        'num_rooms': [3, 4, 4, 5, 6, 6, 7, 7, 8, 9],
        'num_bathrooms': [1, 2, 1, 2, 2, 2, 3, 4, 4, 4],
        'house_age': [10, 5, 15, 20, 8, 25, 30, 35, 40, 45],
        'distance_to_city_center': [10, 15, 20, 5, 12, 18, 25, 30, 35, 40],
        'has_garage': [1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
        'has_garden': [1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
        'crime_rate': [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        'avg_school_rating': [4, 3, 5, 4, 3, 2, 1, 5, 3, 4],
        'country': ['USA', 'USA', 'USA', 'Canada', 'Canada', 'Canada', 'UK', 'UK', 'UK', 'Germany'],
        'price': [200000, 250000, 280000, 300000, 340000, 370000, 400000, 430000, 460000, 500000]
    }
    return pd.DataFrame(data)


# Load the data
df = generate_data()


# One-hot encode categorical features like 'country'
df = pd.get_dummies(df, columns=['country'], drop_first=True)


# Features and target
X = df.drop(columns=['price'])
y = df['price']


# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


# Train the model
model = LinearRegression()
model.fit(X_train, y_train)


# Save the model with BentoML
bentoml.sklearn.save_model("house_price_model_v2", model)
```

After training, verify that the new model has been saved by running:

```
(bentoml-env) @learnwithraghu ~/workspaces/mlops-demo/Fundamentals-of-LLMops/04-bentoml (main) $ python3 model_train_v2.py
(bentoml-env) @learnwithraghu ~/workspaces/mlops-demo/Fundamentals-of-LLMops/04-bentoml (main) $ bentoml models list
```

BentoML tags the most recent version as "latest" while retaining the previous model version. To serve the V2 model, create a new service file (e.g., `model_service_v2.py`) that incorporates the expanded input schema and then use the following commands:

```
$ python3 model_train_v2.py
$ bentoml models list
$ bentoml serve model_service_v2.py --reload
```

You can test the upgraded API endpoint using the UI or by sending this curl request:

```
curl -X POST "http://127.0.0.1:3000/predict_house_price" \
  -H "Content-Type: application/json" \
  -d '{
  "square_footage": 2500,
  "num_rooms": 5,
  "num_bathrooms": 3,
  "house_age": 10,
  "distance_to_city_center": 8,
  "has_garage": 1,
  "has_garden": 0,
  "crime_rate": 1,
  "avg_school_rating": 8,
  "country": "Germany"
}'
```

The expected JSON response should resemble:

```
{"predicted_price": 366760.9746143092}
```

---

## Recap

In this guide, we covered the following key steps:

| Step                  | Description                                                                           | Command/Example                                                              |
| --------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Environment Setup** | Created a virtual environment and installed dependencies                              | `python3 -m venv bento-ml-env`                                               |
| **Training V1 Model** | Built a linear regression model with synthetic data and saved it to BentoML           | `python3 model_train_v1.py`                                                  |
| **Serving V1 Model**  | Created an API endpoint using BentoML to serve the model                              | `bentoml serve model_service_v1.py --reload`                                 |
| **Upgrading to V2**   | Expanded the model with additional features and deployed using a new API service file | `python3 model_train_v2.py` and `bentoml serve model_service_v2.py --reload` |

> [!important]
> **Key Takeaway**
>
> Integrating ML models with BentoML streamlines the deployment process, making it easy to serve and update models for real-time predictions.

Thank you for following this guide. With these steps, you can confidently deploy and serve your ML models using BentoML. Happy modeling and API serving!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/fundamentals-of-mlops/module/2bd484e3-8ec0-4fe4-8dd9-0f7f92e52970/lesson/4f2615a4-d3a3-4f25-af8c-5c4688996ffb)**
>
> Watch video content
