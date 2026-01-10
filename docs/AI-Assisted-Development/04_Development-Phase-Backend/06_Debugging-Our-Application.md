# Debugging Our Application - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-Assisted-Development/Development-Phase-Backend/Debugging-Our-Application)

---

## Table of Contents

- Debugging Our Application
  - Initial Application Setup
  - The Initial Upload Route
  - First Improvement: Directly Returning Processed Image
  - Final Refinement: Processing Images In-Memory
  - Adopting the Application Factory Pattern
  - Application Testing
  - Conclusion
  - Watch Video

---

## Content

AI-Assisted Development

Development Phase Backend

# Debugging Our Application

In our previous lesson, we encountered a 404 error when sending a request, and the root cause was not immediately obvious. In this guide, we'll explore classic debugging techniques enhanced with generative AI insights and refactor our application step by step for better performance and security.

## Initial Application Setup

Below is the initial code for creating the Flask application instance. In this block, we load the configuration, enable debug mode, and register our routes. Notice that the configuration is printed and a confirmation is logged once the routes are imported:

```
from flask import Flask


def create_app():
    app = Flask(__name__)
    # Load configuration
    app.config.from_object('app.instance.config')


    app.config['UPLOAD_FOLDER'] = './uploads'
    app.config['DEBUG'] = True  # Enable debug mode


    # Print configuration to verify
    print(f"Debug mode is {'on' if app.config['DEBUG'] else 'off'}!")


    # Register routes
    with app.app_context():
        from . import routes
        print("Routes imported successfully")

    return app
```

When we ran the application, the terminal output looked similar to the following:

```
Serving Flask app 'run.py'
Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000/
127.0.0.1 - - [20/Nov/2024 15:28:33] "POST /upload HTTP/1.1" 404 -
127.0.0.1 - - [20/Nov/2024 15:34:43] "POST /upload HTTP/1.1" 404 -
127.0.0.1 - - [20/Nov/2024 16:34:42] "POST /upload HTTP/1.1" 404 -
```

The repeated 404 errors pointed to an issue with the `/upload` route. Let’s take a closer look at that function.

## The Initial Upload Route

Initially, the upload route function manually validates the quality parameter, saves the image to a local directory, processes it with OpenCV, and returns a JSON message containing the path to the processed image:

```
def upload():
    quality = request.form.get('quality', default=10, type=int)


    # Validate the quality parameter
    if quality < 0 or quality > 100:
        return jsonify({'error': 'Quality must be between 0 and 100'}), 400


    # Save the image to a local directory
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
    image.save(image_path)


    # Process the image with OpenCV
    img = cv2.imread(image_path)


    # Reduce quality of the image by changing the compression level
    processed_image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'processed_' + image.filename)
    cv2.imwrite(processed_image_path, img, [int(cv2.IMWRITE_JPEG_QUALITY), quality])


    # Return a success message with the path to the processed image
    return jsonify({'message': 'Image successfully uploaded and processed', 'processed_image_path': processed_image_path}), 200
```

## First Improvement: Directly Returning Processed Image

To improve performance and reduce disk I/O, we leveraged generative AI insights to modify the function. Instead of writing the image to disk, we directly read the image from the request and return it using Flask's `send_file`:

```
@app.route('/upload', methods=['POST'])
def upload():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part in the request'}), 400

    image = request.files['image']


    if image.filename == '':
        return jsonify({'error': 'No image selected for uploading'}), 400


    # Get the quality parameter from the request, default to 10 if not provided
    quality = request.form.get('quality', default=10, type=int)


    # Validate the quality parameter
    if quality < 0 or quality > 100:
        return jsonify({'error': 'Quality must be between 0 and 100'}), 400


    # Save the image to a local directory
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
    image.save(image_path)


    # Process the image with OpenCV
    img = cv2.imread(image_path)


    # Reduce quality of the image by changing the compression level
    processed_image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'processed_' + image.filename)
    cv2.imwrite(processed_image_path, img, [int(cv2.IMWRITE_JPEG_QUALITY), quality])


    # Return a success message with the path to the processed image
    return jsonify({'message': 'Image successfully uploaded and processed', 'processed_image_path': processed_image_path})
```

## Final Refinement: Processing Images In-Memory

In our final version, we entirely eliminate disk I/O by processing the image in memory. We use `np.frombuffer` and OpenCV’s decoding and encoding functions to directly manipulate the image data, then send the processed image back as binary data:

```
@app.route('/upload', methods=['POST'])
def upload():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part in the request'}), 400


    image = request.files['image']


    if image.filename == '':
        return jsonify({'error': 'No image selected for uploading'}), 400


    # Get the quality parameter from the request, default to 10 if not provided
    quality = request.form.get('quality', default=10, type=int)


    # Validate the quality parameter
    if quality < 0 or quality > 100:
        return jsonify({'error': 'Quality must be between 0 and 100'}), 400


    # Read the image directly from the request into a NumPy array
    img_array = np.frombuffer(image.read(), np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_UNCHANGED)


    if img is None:
        return jsonify({'error': 'Failed to decode image'}), 400


    # Process the image with OpenCV by encoding it with the requested JPEG quality
    _, buffer = cv2.imencode('.jpg', img, [int(cv2.IMWRITE_JPEG_QUALITY), quality])

    # Create a BytesIO object from the buffer
    img_io = io.BytesIO(buffer)


    # Return the processed image as binary data
    return send_file(img_io, mimetype='image/jpeg')
```

> [!important]
> **Note**
>
> The in-memory processing significantly improves performance by reducing disk I/O, making the application more efficient in handling image uploads.

## Adopting the Application Factory Pattern

While testing, an error was encountered indicating that the `app` object was undefined in the `routes.py` file. To resolve this, we refactored the application following the application factory pattern. The `__init__.py` was updated as follows:

```
from flask import Flask


def create_app():
    app = Flask(__name__)
    # Load configuration
    app.config.from_object('app.instance.config')

    app.config['UPLOAD_FOLDER'] = './uploads'
    app.config['DEBUG'] = True  # Enable debug mode


    # Print configuration to verify
    print(f"Debug mode is {'on' if app.config['DEBUG'] else 'off'}")


    # Register routes
    with app.app_context():
        from . import routes
        print("Routes imported successfully")

    return app
```

Subsequently, `routes.py` was updated to remove the dependency on a global `app` object by using a Flask Blueprint:

```
from flask import Blueprint, request, jsonify, send_file
import os
import cv2
import numpy as np
from werkzeug.utils import secure_filename
import io


bp = Blueprint('main', __name__)


@bp.route('/upload', methods=['POST'])
def upload():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part in the request'}), 400


    image = request.files['image']


    if image.filename == '':
        return jsonify({'error': 'No image selected for uploading'}), 400


    # Get the quality parameter from the request, default to 10 if not provided
    quality = request.form.get('quality', default=10, type=int)


    # Validate the quality parameter
    if quality < 0 or quality > 100:
        return jsonify({'error': 'Quality must be between 0 and 100'}), 400


    # Read the image directly from the request
    img_array = np.frombuffer(image.read(), np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_UNCHANGED)


    if img is None:
        return jsonify({'error': 'Failed to decode image'}), 400


    # Process the image with OpenCV
    _, buffer = cv2.imencode('.jpg', img, [int(cv2.IMWRITE_JPEG_QUALITY), quality])


    # Create a BytesIO object from the buffer
    img_io = io.BytesIO(buffer)


    # Return the processed image as binary data
    return send_file(img_io, mimetype='image/jpeg')
```

## Application Testing

After refactoring, the application properly initialized using the Flask application factory. The Blueprint registration ensured that the upload route was correctly integrated. Running the application with:

```
(venv) jeremy@Jeremys-Mac-Studio imageoptimizer.app$ flask run
 * Serving Flask app "run.py"
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000/
Press CTRL+C to quit
```

resulted in a 200 OK response when sending a POST request to `/upload`. Testing various quality parameters (e.g., quality = 10 or 100) revealed clear and noticeable differences in image compression quality.

## Conclusion

This debugging session demonstrates the benefits of leveraging generative AI to propose improvements, such as eliminating unnecessary disk I/O and processing images entirely in memory. Although the process required some trial and error, the final design is robust and efficient.

> [!important]
> **Next Steps**
>
> Consider enhancing error handling and adding additional code comments in future iterations to further improve maintainability and clarity.

Happy coding, and see you in the next lesson!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-assisted-development/module/0f8882f1-0976-491e-8243-9b522243717f/lesson/7783df63-3ecc-445d-8391-d3c80d4fce05)**
>
> Watch video content
