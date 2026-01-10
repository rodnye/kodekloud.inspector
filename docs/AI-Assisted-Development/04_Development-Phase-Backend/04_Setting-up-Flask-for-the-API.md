# Setting up Flask for the API - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-Assisted-Development/Development-Phase-Backend/Setting-up-Flask-for-the-API)

---

## Table of Contents

- Setting up Flask for the API
  - Application Initialization
  - Defining Routes
  - Frontend Template Considerations

---

## Content

AI-Assisted Development

Development Phase Backend

# Setting up Flask for the API

In this guide, you'll learn how to create a Flask API by building the application structure, configuring settings, defining routes, and running the application. We also provide troubleshooting tips for common issues. This setup forms the foundation to later integrate additional functionalities, such as a React frontend or image processing with OpenCV.

---

## Application Initialization

Start by creating your application package with an **init**.py file. In this file, define a factory function, `create_app()`, that initializes the Flask application, loads configurations, and registers the routes:

```
from flask import Flask


def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',  # Change this in production!
    )


    # Load the instance config, if it exists, when not testing
    try:
        app.config.from_pyfile('config.py', silent=True)
    except FileNotFoundError:
        pass


    with app.app_context():
        from . import routes  # Import routes


    return app
```

This snippet sets up Flask with a default secret key and attempts to load extra configuration from a config.py file in the instance directory. The routes module is imported within the app context to ensure proper registration.

---

## Defining Routes

Next, create a `routes.py` file inside your application package. This file defines the URL endpoints. Below is an example that includes a basic homepage route:

```
from flask import render_template
from . import create_app


app = create_app()


@app.route('/')
def home():
    return render_template('base.html')
```

You can extend the routes by adding more endpoints. In the following example, an About page and a helper route to display all registered endpoints are added:

```
from flask import render_template
from . import create_app


app = create_app()


@app.route('/')
def home():
    return render_template('base.html')


@app.route('/about')
def about():
    return "About Page"


@app.route('/routes')
def show_routes():
    output = []
    for rule in app.url_map.iter_rules():
        output.append(f"{rule.endpoint}: {rule.rule}")
    return "<br>".join(output)
```

The `/routes` endpoint is a useful tool for debugging, as it dynamically lists all the registered routes.

---

## Frontend Template Considerations

Though the primary focus is on building the API, a basic HTML template is included for testing purposes. Create a file named `base.html` (typically located in the `app/templates` folder):

```
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My Flask App</title>
</head>
<body>
    <h1>Welcome to My Flask App</h1>,
</body>
</html>
,[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]
```
