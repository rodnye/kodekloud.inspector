# Demo Introduction to Flask - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PyTorch/Model-Deployment-and-Inference/Demo-Introduction-to-Flask)

---

## Table of Contents

- Demo Introduction to Flask
  - Installing and Verifying Flask
  - Creating the Flask Application
  - Creating Endpoints
  - Testing the Flask Application
  - Running the App with Gunicorn
  - Interpreting the Model Prediction
  - Additional Resources
  - Watch Video
  - Practice Lab
    - Prediction Endpoint
    - Health Endpoint
    - Running the App Directly
    - Sending Test Requests
    - Testing Error Handling

---

## Content

PyTorch

Model Deployment and Inference

# Demo Introduction to Flask

In this lesson, we explore the basics of Flask and demonstrate how to serve a machine learning model using Flask. This guide combines content from a Jupyter Notebook and a standalone Flask application file, providing a comprehensive introduction to model deployment with Flask.

---

## Installing and Verifying Flask

Before building the application, ensure that Flask is installed. Run the following commands to install Flask, check its version, and inspect the directory structure of your Flask app:

```
!pip install Flask
```

```
bash
!python -m flask --version
```

```
bash
!tree flask_app/
```

These commands not only install Flask but also verify that the essential files exist within the `flask_app/` directory, an important part of your model deployment workflow.

If Flask is already installed, you may see output indicating that the requirements are already satisfied, for example:

```
!pip install Flask
```

```
Requirement already satisfied: Flask in /root/venv/lib/python3.11/site-packages (3.1.0)
Requirement already satisfied: Werkzeug>=3.1 in /root/venv/lib/python3.11/site-packages (from Flask) (3.1.3)
Requirement already satisfied: Jinja2>=3.1.2 in /root/venv/lib/python3.11/site-packages (from Flask) (3.1.5)
Requirement already satisfied: itsdangerous>=2.2 in /root/venv/lib/python3.11/site-packages (from Flask) (2.2.0)
Requirement already satisfied: click>=8.1.3 in /root/venv/lib/python3.11/site-packages (from Flask) (8.1.8)
Requirement already satisfied: blinker>=1.9 in /root/venv/lib/python3.11/site-packages (from Flask) (1.9.0)
Requirement already satisfied: MarkupSafe>=2.0 in /root/venv/lib/python3.11/site-packages (from Jinja2>=3.1.2->Flask) (3.0.2)
```

You can also re-run the version command from within the Notebook:

```
python -m flask --version
```

This command displays your Python version, Flask version (3.1.0), and Werkzeug version (3.1.3).

Next, verify the structure of your Flask app. Running:

```
tree flask_app/
```

should produce an output similar to:

```
flask_app
├── app.py
└── image_transformations.py
```

---

## Creating the Flask Application

Before starting the Flask server, initialize the app by loading any required environment variables and your machine learning model. In this example, we use the MobileNetV3 Large pre-trained model. It is essential that the model is loaded before the application processes any requests.

Below is an example of the initial setup with logging and error handling:

```
import os
import io
import base64
import json
import logging
from flask import Flask, request, jsonify
from torchvision import models
import torch
from PIL import Image
from image_transforms import preprocess  # Ensure this module is available


# Initialize Flask app
app = Flask(__name__)


# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# Load environment variables or secrets
MY_SECRET = os.getenv('SECRET')


# Load the MobileNetV3 Large pre-trained model before starting the app
try:
    logger.info("Loading MobileNetV3 Large pre-trained model...")
    model = models.mobilenet_v3_large(weights=models.MobileNet_V3_Large_Weights.DEFAULT)
    model.eval()  # Switch to evaluation mode
    logger.info("Model loaded successfully.")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    raise RuntimeError("Failed to load the model.") from e
```

> [!important]
> **Note**
>
> Make sure that all required modules are imported and logging is correctly configured. The model must be loaded before any request is processed to avoid runtime errors.

---

## Creating Endpoints

### Prediction Endpoint

The `/predict` endpoint handles POST requests. It accepts a JSON payload that contains an image encoded in Base64. This endpoint decodes the image, preprocesses it, performs inference using the model, and returns the prediction in JSON format.

```
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Extract Base64 string from the incoming JSON request
        data = request.json
        if not data or 'image' not in data:
            logger.warning("No image provided in the request.")
            return jsonify({'error': 'No image provided'}), 400


        # Decode the Base64 image string
        image_data = base64.b64decode(data['image'])
        image = Image.open(io.BytesIO(image_data)).convert('RGB')

        # Preprocess the image and add the batch dimension if required
        transformed_img = preprocess(image).unsqueeze(0)


        # Perform inference in a no_grad context to save memory
        with torch.no_grad():
            logger.info("Performing inference...")
            output = model(transformed_img)
            _, predicted = torch.max(output.data, 1)
            logger.info(f"Inference complete. Predicted class: {predicted.item()}")


        # Return the prediction as a JSON response
        response = {'prediction': predicted.item()}
        logger.info(f"Response for /predict: {response}")
        return jsonify(response)

    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        response = {'error': str(e)}
        logger.info(f"Response for /predict: {response}")
        return jsonify(response), 500
```

This endpoint performs the following steps:

- Parses the request payload and verifies the presence of an `"image"` key.
- Decodes the Base64-encoded image and converts it into an RGB image.
- Applies image preprocessing before passing the tensor to the model.
- Retrieves and returns the prediction using Flask’s `jsonify` method.

### Health Endpoint

The `/health` endpoint is a simple GET endpoint used to verify that the server is running correctly. It returns a JSON response with a health status.

```
@app.route('/health', methods=['GET'])
def health():
    """
    Health check endpoint to confirm the app is running.
    """
    response = {'status': 'healthy'}
    logger.info(f"Response for /health: {response}")
    return jsonify(response), 200
```

---

## Testing the Flask Application

### Running the App Directly

To start the Flask application, run the following command from your terminal:

```
python app.py
```

This command initializes the app, loads the model, and starts a development server, typically accessible at `http://127.0.0.1:5000`.

Example terminal output:

```
root@pytorch demos/040-040-introduction-to-flask/flask_app on  [] main [!?] via 🐍 v3.11.4 (venv) → python app.py
2025-01-15 01:36:46,774 - INFO - Loading MobileNetV3 Large pre-trained model...
2025-01-15 01:36:46,912 - INFO - Model loaded successfully.
* Serving Flask app 'app'
* Debug mode: on
2025-01-15 01:36:46,919 - INFO - WARNING: This is a development server. Do not use it in a production deployment.
* Running on http://127.0.0.1:5000
2025-01-15 01:36:46,919 - INFO - Press CTRL+C to quit
```

> [!important]
> **Warning**
>
> Do not use the Flask development server in a production environment. For production deployments, consider using a WSGI server such as Gunicorn.

### Sending Test Requests

You can use the Python `requests` library to test your endpoints. Begin by creating a Base64-encoded string from an image (for example, "dog-1.jpg"):

```
import base64


with open('dog-1.jpg', 'rb') as img_file:
    base64_string = base64.b64encode(img_file.read()).decode('utf-8')
print(base64_string)
```

Next, test the prediction endpoint:

```
import requests


# JSON payload containing the Base64 encoded image
payload = {
    "image": base64_string
}


# Set the appropriate headers
headers = {
    "Content-Type": "application/json"
}


# Send a POST request to the /predict endpoint
response = requests.post("http://127.0.0.1:5000/predict",
                         json=payload,
                         headers=headers)


print("Status Code:", response.status_code)
print("Response JSON:", response.json())


# Verify the /health endpoint
health_response = requests.get("http://127.0.0.1:5000/health")
print("Health Status Code:", health_response.status_code)
print("Health Response JSON:", health_response.json())
```

A successful prediction response might look like:

```
Status Code: 200
Response JSON: {'prediction': 207}
```

And the health check output:

```
Health Status Code: 200
Health Response JSON: {'status': 'healthy'}
```

### Testing Error Handling

Test error handling by sending requests without the required payload or using an incorrect key:

```
# Test without sending any payload
error_response = requests.post("http://127.0.0.1:5000/predict", headers=headers)
print("Status Code:", error_response.status_code)
print("Response JSON:", error_response.json())


# Test with an incorrectly formatted payload
error_response = requests.post("http://127.0.0.1:5000/predict",
                               json={"video": base64_string},
                               headers=headers)
print("Status Code:", error_response.status_code)
print("Response JSON:", error_response.json())
```

The first case should return a 500 error (e.g., failure to decode JSON), while the second returns a 400 status with a message indicating that no image was provided.

---

## Running the App with Gunicorn

For production deployments, use a robust WSGI server like Gunicorn. Start the Gunicorn server with the following command:

```
gunicorn -w 2 -b 0.0.0.0:8080 app:app
```

Test the application on port 8080:

```
# Send a POST request using Gunicorn on port 8080
response = requests.post("http://127.0.0.1:8080/predict",
                         json=payload,
                         headers=headers)


print("Status Code:", response.status_code)
print("Response JSON:", response.json())
```

Terminal logs should display messages similar to:

```
2025-01-15 01:36:46,774 - INFO - Loading MobileNetV3 Large pre-trained model...
2025-01-15 01:36:46,912 - INFO - Model loaded successfully.
...
2025-01-15 01:36:49,478 - INFO - * Debugger PIN: 808-753-342
2025-01-15 01:39:17,671 - INFO - Response for /predict: {'prediction': 207}
```

---

## Interpreting the Model Prediction

To convert the numeric prediction (e.g., 207) into a human-readable class label, use a mapping file (labels.json) available from Hugging Face. The labels file can be downloaded from:

[Imagenet 1K Labels](https://huggingface.co/datasets/huggingface/label-files/blob/main/imagenet-1k-id2label.json)

After downloading the file, use the following code to interpret the prediction:

```
import json


with open("labels.json", "r") as f:
    imagenet_classes = json.load(f)


# Retrieve the class name for the predicted class
class_label = imagenet_classes['207']
print(class_label)
```

If, for instance, the prediction corresponds to a golden retriever, the output should confirm the image class as "golden retriever"—an ideal match if your input image depicts a golden retriever puppy.

---

This concludes our introduction to Flask and model deployment. With Flask, you can quickly set up HTTP endpoints to serve machine learning models, complete with robust error handling and logging. Happy coding!

## Additional Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [Kubernetes Basics](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Gunicorn Documentation](https://docs.gunicorn.org/)
- [Docker Hub](https://hub.docker.com/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pytorch/module/a958efa1-845c-4cdf-9261-7688050bd96c/lesson/02473255-a571-4ed3-8795-84db13733d23)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/pytorch/module/a958efa1-845c-4cdf-9261-7688050bd96c/lesson/c6f37a93-7ced-4b01-b1d3-de98ad5bef74)**
>
> Practice lab
