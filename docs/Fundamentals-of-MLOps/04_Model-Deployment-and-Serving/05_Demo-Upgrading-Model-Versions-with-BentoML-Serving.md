# Demo Upgrading Model Versions with BentoML Serving - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Fundamentals-of-MLOps/Model-Deployment-and-Serving/Demo-Upgrading-Model-Versions-with-BentoML-Serving)

---

## Table of Contents

- Demo Upgrading Model Versions with BentoML Serving
  - Prediction Function for the House Price Model
  - Defining Separate Endpoints for Each Model Version
  - Testing the API Endpoints
  - Additional Context: Extended Model Input Schema
  - Watch Video
  - Practice Lab
    - Testing the v1 Endpoint
    - Testing the v2 Endpoint
    - Testing the v1 Endpoint (Extended)
    - Testing the v2 Endpoint (Extended)

---

## Content

Fundamentals of MLOps

Model Deployment and Serving

# Demo Upgrading Model Versions with BentoML Serving

Welcome to this tutorial on using BentoML to gradually upgrade your machine learning models without disrupting live user traffic. In this example, we have two versions of our ML model—v1 and v2. Switching all user traffic to a new version instantly is impractical in production environments. Instead, we use a blue-green deployment strategy to gradually route traffic between the two model versions.

In our previous setup, a single model was deployed. In a real-world scenario, you might host both model versions in the same BentoML service yet keep their traffic isolated on different endpoints. This design allows requests for v1 and v2 to be handled separately, ensuring a smooth transition for your users.

Below is a diagram that illustrates the model serving flow using BentoML. It shows how incoming requests are distributed between the different endpoints based on the model version:

![The image is a diagram illustrating model serving using BentoML, showing a flow from users to a dashboard, then to BentoML serving with endpoints for different model versions, and finally to a machine learning model.](https://kodekloud.com/kk-media/image/upload/v1752875134/notes-assets/images/Fundamentals-of-MLOps-Demo-Upgrading-Model-Versions-with-BentoML-Serving/bentoml-model-serving-diagram.jpg)

In this updated architecture, all incoming requests are processed by one of two endpoints, each corresponding to a different model version.

## Prediction Function for the House Price Model

In the VS Code editor, consider the following snippet that defines the prediction function for our house price model:

```
async def predict_house_price(data: HouseInput):
    input_data = [[
        data.distance_to_city_center, data.has_garage, data.has_garden,
        data.crime_rate, data.avg_school_rating
        + country_encoded
    ]]
    prediction = await model_runner.predict.async_run(input_data)
    return {"predicted_price": prediction[0]}
```

After stopping the BentoML service, clearing the screen, and closing the file, open the `model_service_v3.py` file to review its configuration. This file references both models (v1 and v2) by creating two separate model runners and exposing two distinct endpoints.

## Defining Separate Endpoints for Each Model Version

In `model_service_v3.py`, you will find code defining separate APIs for each model version:

```
# API for V1 model prediction
@svc.api(input=JSON(pydantic_model=HouseInputV1), output=JSON(), route="/predict_house_price_v1")
async def predict_house_price_v1(data: HouseInputV1):
    input_data = [[data.square_footage, data.num_rooms]]
    prediction = await model_v1_runner.predict.async_run(input_data)
    return {"predicted_price_v1": prediction[0]}


# API for V2 model prediction
@svc.api(input=JSON(pydantic_model=HouseInputV2), output=JSON(), route="/predict_house_price_v2")
async def predict_house_price_v2(data: HouseInputV2):
    # One-hot encoding for the country
    country_encoded = [0, 0, 0]  # Default for ['Canada', 'Germany', 'UK']
    if data.country == "Canada":
        country_encoded[0] = 1
    elif data.country == "Germany":
        country_encoded[1] = 1
    elif data.country == "UK":
        country_encoded[2] = 1
    # Further processing and prediction logic for v2 can be added here...
```

By merging both prediction functions into a single BentoML service, we can efficiently manage traffic for legacy integrations (using v1) and for new clients (using v2).

The snippet below further defines the input schema for the v2 model along with an API endpoint for the v1 model again:

```
class HouseInputV2(BaseModel):
    num_bathrooms: int
    has_garage: int
    has_garden: int
    crime_rate: float
    avg_school_rating: float
    country: str


# API for v1 model prediction
@svc.api(input=JSON(pydantic_model=HouseInputV1), output=JSON(), route="/predict_house_price_v1")
async def predict_house_price_v1(data: HouseInputV1):
    input_data = [data.square_footage, data.num_rooms]
    prediction = await model_v1_runner.predict.async_run(input_data)
    return {"predicted_price_v1": prediction[0]}
```

After running the BentoML service command and refreshing the service endpoint, both the v1 and v2 endpoints become available. This separation ensures compatibility with legacy clients while allowing new features and improvements to be tested using the v2 endpoint.

Below, the following diagram shows the BentoML Prediction Service’s web interface. It displays the available API endpoints for house price prediction and provides additional information on infrastructure observability:

![The image shows a web interface for a BentoML Prediction Service, displaying API endpoints for house price prediction and infrastructure observability. It includes sections for service APIs, infrastructure endpoints, and schemas.](https://kodekloud.com/kk-media/image/upload/v1752875135/notes-assets/images/Fundamentals-of-MLOps-Demo-Upgrading-Model-Versions-with-BentoML-Serving/bentoml-prediction-service-api-endpoints.jpg)

## Testing the API Endpoints

You can use curl to send requests to these endpoints:

### Testing the v1 Endpoint

```
curl -X POST "http://127.0.0.1:3000/predict_house_price_v1" \
-H "Content-Type: application/json" \
-d '{"square_footage": 2500, "num_rooms": 5}'
```

### Testing the v2 Endpoint

```
curl -X POST "http://127.0.0.1:3000/predict_house_price_v2" \
-H "Content-Type: application/json" \
-d '{"square_footage": 2500, "num_rooms": 5, "num_bathrooms": 5, "house_age": 0, "distance_to_city_center": 0.5, "has_garden": 1, "has_garage": 1, "avg_school_rating": 4.5, "country": "Germany"}'
```

Below is a comprehensive example demonstrating the curl commands and their expected outputs:

```
$ curl -X POST "http://127.0.0.1:3000/predict_house_price_v1" \
  -H "Content-Type: application/json" \
  -d '{"square_footage": 2500, "num_rooms": 5, "num_bathrooms": 5, "house_age": 10, "distance_to_city_center": 1.5, "has_garden": true, "has_garage": true, "crime_rate": 0.5, "avg_school_rating": 8.0, "country": "Germany"}'
```

```
$ curl -X POST "http://127.0.0.1:3000/predict_house_price_v2" \
  -H "Content-Type: application/json" \
  -d '{"square_footage":2500, "num_rooms":5, "num_bathrooms":5, "house_age":10, "distance_to_city_center":1.5, "has_garden":true, "has_garage":true, "crime_rate":0.5, "avg_school_rating":8.0, "country":"Germany"}'
```

```
predicted_price_v1: 366794.6602055242
predicted_price_v2: 367670.9746143092
```

> [!important]
> **Note**
>
> Managing both endpoints within a single service simplifies the transition and allows controlled traffic routing. In the future, depending on your production needs and traffic patterns, you may consider separating these endpoints into different services.

## Additional Context: Extended Model Input Schema

Here is another version of the model input schema and its endpoint configuration. This variation provides additional parameters for more detailed predictions:

```
class HouseInputV2(BaseModel):
    num_bathrooms: int
    house_age: int
    distance_to_city_center: float
    has_garden: int
    crime_rate: float
    avg_school_rating: float
    country: str


# API for V2 model prediction
@svc.api(input=JSON(pydantic_model=HouseInputV2), output=JSON(), route="/predict_house_price_v2")
async def predict_house_price_v2(data: HouseInputV2):
    input_data = [[data.square_footage, data.num_rooms]]
    prediction = await model_v1_runner.predict.async_run(input_data)
    return {"predicted_price_v2": prediction[0]}
```

Test the improved service setup with the following curl requests:

### Testing the v1 Endpoint (Extended)

```
curl -X POST "http://127.0.0.1:3000/predict_house_price_v1" \
  -H "Content-Type: application/json" \
  -d '{
  "square_footage": 2500,
  "num_rooms": 5,
  "num_bathrooms": 5,
  "house_age": 10,
  "distance_to_city_center": 10.5,
  "has_garden": 1,
  "has_garage": 1,
  "crime_rate": 0.5,
  "avg_school_rating": 8.5,
  "country": "Germany"
}'
```

### Testing the v2 Endpoint (Extended)

```
curl -X POST "http://127.0.0.1:3000/predict_house_price_v2" \
  -H "Content-Type: application/json" \
  -d '{
  "square_footage": 2500,
  "num_rooms": 5,
  "num_bathrooms": 5,
  "house_age": 10,
  "distance_to_city_center": 10.5,
  "has_garden": 1,
  "has_garage": 1,
  "crime_rate": 0.5,
  "avg_school_rating": 8.5,
  "country": "Germany"
}'
```

This setup, which provides separate endpoints for different model versions using a single BentoML service, offers a controlled environment for traffic routing and facilitates a smoother transition from legacy models to new enhancements.

Thank you for following this lesson on upgrading model versions with BentoML Serving.

Below is a final example of using curl to test the v1 endpoint:

```
curl -X POST "http://127.0.0.1:3000/predict_house_price_v1" \
    -H "Content-Type: application/json" \
    -d '{"square_footage": 2500, "num_rooms": 5}'
```

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/fundamentals-of-mlops/module/2bd484e3-8ec0-4fe4-8dd9-0f7f92e52970/lesson/1fe0d1ad-057b-4a58-8e5a-cf42989c11d3)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/fundamentals-of-mlops/module/2bd484e3-8ec0-4fe4-8dd9-0f7f92e52970/lesson/d76264e2-e5d0-4e0c-8d30-a70707537723)**
>
> Practice lab
