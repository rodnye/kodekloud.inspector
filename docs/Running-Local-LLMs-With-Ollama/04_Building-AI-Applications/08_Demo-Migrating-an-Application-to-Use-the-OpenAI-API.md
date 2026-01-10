# Demo Migrating an Application to Use the OpenAI API - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Running-Local-LLMs-With-Ollama/Building-AI-Applications/Demo-Migrating-an-Application-to-Use-the-OpenAI-API)

---

## Table of Contents

- Demo Migrating an Application to Use the OpenAI API
  - 1. Create an OpenAI API Key
  - 2. Choose a Model
  - 3. Update Your Environment Variables
  - 4. Update the Flask Server

---

## Content

Running Local LLMs With Ollama

Building AI Applications

# Demo Migrating an Application to Use the OpenAI API

This guide shows you how to update a Flask-based AI app to use the OpenAI API in production while still developing locally with Ollama. By changing only a few environment variables, you can switch between free local development and cost-effective cloud inference.

![The image shows the OpenAI developer platform webpage, featuring options to sign up or log in, and information about different AI models like GPT-4o and o1-mini. The sidebar includes links to various capabilities and resources.](https://kodekloud.com/kk-media/image/upload/v1752883645/notes-assets/images/Running-Local-LLMs-With-Ollama-Demo-Migrating-an-Application-to-Use-the-OpenAI-API/openai-developer-platform-webpage.jpg)

---

## 1\. Create an OpenAI API Key

1.  Sign in or sign up at [platform.openai.com](https://platform.openai.com/).

    ![The image shows a login page for OpenAI, offering options to sign in with an email address, phone, Google, Microsoft, or Apple accounts.](https://kodekloud.com/kk-media/image/upload/v1752883646/notes-assets/images/Running-Local-LLMs-With-Ollama-Demo-Migrating-an-Application-to-Use-the-OpenAI-API/openai-login-page-options.jpg)

2.  Navigate to **Settings → API keys**, then click **Create new secret key**.
3.  Provide a name (e.g., “Ollama app”), assign it to your default project, set permissions, and copy the secret key.

    ![The image shows a webpage for creating a new secret API key on the OpenAI platform, with a form to input details like name, project, and permissions.](https://kodekloud.com/kk-media/image/upload/v1752883647/notes-assets/images/Running-Local-LLMs-With-Ollama-Demo-Migrating-an-Application-to-Use-the-OpenAI-API/openai-new-api-key-form.jpg)

4.  Confirm that your new key appears under **API keys**.

    ![The image shows a webpage from the OpenAI platform displaying API key management, with details of an API key named "ollama-app" including its secret key, creation date, and permissions.](https://kodekloud.com/kk-media/image/upload/v1752883648/notes-assets/images/Running-Local-LLMs-With-Ollama-Demo-Migrating-an-Application-to-Use-the-OpenAI-API/openai-api-key-management-ollama-app.jpg)

::: note Keep your secret key safe. Do not commit it to version control. :::

---

## 2\. Choose a Model

Open the [Quickstart Guide](https://platform.openai.com/docs/quickstart) or the [Models Reference](https://platform.openai.com/docs/models) to compare models. In this demo, we’ll use **gpt-4o-mini**.

| Environment         | Endpoint                  | Model       | Authentication |
| ------------------- | ------------------------- | ----------- | -------------- |
| Local (Ollama)      | http://localhost:11434    | o1-mini     | none           |
| Production (OpenAI) | https://api.openai.com/v1 | gpt-4o-mini | Bearer API Key |

![The image shows a webpage from the OpenAI API documentation, detailing flagship models like GPT-4o and their capabilities, along with a sidebar menu for navigation.](https://kodekloud.com/kk-media/image/upload/v1752883650/notes-assets/images/Running-Local-LLMs-With-Ollama-Demo-Migrating-an-Application-to-Use-the-OpenAI-API/openai-api-documentation-gpt4o.jpg)

---

## 3\. Update Your Environment Variables

In your project’s `.env` file, replace the Ollama endpoint with OpenAI’s and add your secret key:

```
OPENAI_API_KEY=your_openai_api_key_here
LLM_ENDPOINT="https://api.openai.com/v1"
MODEL=gpt-4o-mini
```

---

## 4\. Update the Flask Server

Install the OpenAI Python client and `python-dotenv` if you haven’t already:

```
pip install openai python-dotenv Flask
```

```
import os
from flask import Flask, request, render_template_string
from openai import OpenAI
from dotenv import load_dotenv


load_dotenv()


app = Flask(__name__)


client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url=os.getenv("LLM_ENDPOINT")
)


HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI-Generated Poem</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background-color: #f8f9fa; }
    .container { max-width: 600px; margin: auto; }
  </style>
</head>
<body>
  <div class="container">
    <h1>AI Poem Generator</h1>
    <form method="post">
      <label for="prompt">Enter a prompt:</label><br>
      <input id="prompt" name="prompt" type="text" required style="width: 100%;"><br><br>
      <button type="submit">Generate Poem</button>
    </form>,
      <h2>Generated Poem:</h2>
      <pre>{{ poem }}</pre>,
  </div>
</body>
</html>
"""


@app.route("/", methods=["GET", "POST"])
def index():
    poem = None
    if request.method == "POST":
        prompt = request.form["prompt"]
        response = client.chat.completions.create(
            model=os.getenv("MODEL"),
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user",   "content": prompt}
            ],
            store=True
        )
        poem = response.choices[0].message.content
    return render_template_string(HTML_TEMPLATE, poem=poem)


if __name__ == '__main__':
    app.run(port=3000)
,[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
```
