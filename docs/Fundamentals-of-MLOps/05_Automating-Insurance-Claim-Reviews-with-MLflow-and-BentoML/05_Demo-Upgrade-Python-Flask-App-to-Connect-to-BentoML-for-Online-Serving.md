# Demo Upgrade Python Flask App to Connect to BentoML for Online Serving - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Fundamentals-of-MLOps/Automating-Insurance-Claim-Reviews-with-MLflow-and-BentoML/Demo-Upgrade-Python-Flask-App-to-Connect-to-BentoML-for-Online-Serving)

---

## Table of Contents

- Demo Upgrade Python Flask App to Connect to BentoML for Online Serving
  - Step 1: Setting Up the Flask Application
  - Step 2: Creating HTML Templates
    - 1. index.html
    - 2. results.html

---

## Content

Fundamentals of MLOps

Automating Insurance Claim Reviews with MLflow and BentoML

# Demo Upgrade Python Flask App to Connect to BentoML for Online Serving

Welcome to this lesson on how to integrate a Flask application with BentoML for online prediction serving. In this tutorial, you will learn how to set up a simple Flask application that accepts CSV file uploads, processes the data, communicates with the BentoML predict endpoint, and then displays prediction results in an intuitive user interface.

Below is an overview of the steps covered in this tutorial:

---

## Step 1: Setting Up the Flask Application

Begin by launching your VS Code editor and opening a new terminal. Also, open a separate terminal window to start the BentoML service, which must be running to serve predictions.

Create a file named `flaskapp.py` and include the following code. This code establishes an endpoint that receives a POST request containing a Base64-encoded CSV file. The CSV content is decoded and converted into a DataFrame. Should the DataFrame include a `claim_id` column, it is temporarily separated from the rest of the data. The remaining data is then sent as JSON to the BentoML predict endpoint. Upon receiving the prediction results, they are merged back with the original DataFrame, and the results are rendered through an HTML template.

```
from flask import Flask, render_template, request
import pandas as pd
import requests
import base64
import io


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    file_data = request.form.get('file')
    # Decode the Base64 encoded CSV file content
    decoded_file = base64.b64decode(file_data.split(',')[1])
    # Read CSV content into a DataFrame
    df = pd.read_csv(io.StringIO(decoded_file.decode('utf-8')))

    # Separate the 'claim_id' column if it exists
    if 'claim_id' in df.columns:
        claim_ids = df['claim_id']
        df = df.drop(columns=['claim_id'])
    else:
        claim_ids = None

    # Send the DataFrame to the BentoML service as JSON
    response = requests.post(
        'http://127.0.0.1:3000/predict/',  # BentoML endpoint
        json=df.to_dict(orient='records')
    )

    # Retrieve predictions from the response
    predictions = response.json()['predictions']
    df['Prediction'] = predictions

    # Reattach the 'claim_id' column if it was present
    if claim_ids is not None:
        df['claim_id'] = claim_ids

    # Render the results in the results.html template
    return render_template('results.html', tables=[df.to_html(classes='data')])

if __name__ == '__main__':
    app.run(port=5005)
```

> **Note:** Ensure that both Flask and BentoML are installed in your Python environment to avoid import errors.

---

## Step 2: Creating HTML Templates

To provide a straightforward user interface, create a folder named `templates` in your project directory. Inside this folder, establish the following HTML templates:

### 1\. index.html

This template displays the file upload interface for users. (Customize this file according to your design preferences.)

### 2\. results.html

The `results.html` file displays prediction results formatted in a table. Below is an example template with basic table styling:

```
<html lang="en">
<head>
    <style>
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
    </style>
</head>
<body>
    <h1>Prediction Results</h1>,
{{ table|safe }},
    <a href="/">Go Back</a>
</body>
</html>
,[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
```
