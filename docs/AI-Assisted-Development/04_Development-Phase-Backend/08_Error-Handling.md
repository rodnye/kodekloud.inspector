# Error Handling - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-Assisted-Development/Development-Phase-Backend/Error-Handling)

---

## Table of Contents

- Error Handling
  - Enhancing Error Handling
  - Integrating Logging with Error Handling
  - Using Code Assistance Tools
  - Flask's Built-In Error Handlers
  - Testing the Error Handling
  - Summary
  - Watch Video

---

## Content

AI-Assisted Development

Development Phase Backend

# Error Handling

We verified that images are loaded correctly by validating both incoming and outgoing image data. Although the basic error handling works, further enhancements can streamline our approach, especially by implementing robust logging and graceful failure mechanisms.

Below is the initial snippet of our Flask upload endpoint:

```
from flask import Blueprint, request, jsonify, send_file
import cv2
import numpy as np
import io
import imghdr
from werkzeug.utils import secure_filename
from PIL import Image


bp = Blueprint('main', __name__)


@bp.route('/upload', methods=['POST'])
def upload():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part in the request'}), 400


    image = request.files['image']


    if image.filename == '':
        return jsonify({'error': 'No image selected for uploading'}), 400


    # Secure the filename
    filename = secure_filename(image.filename)


    # Check the file extension
```

## Enhancing Error Handling

Initially, we used `jsonify` to return error responses for specific scenarios. For instance, if the file extension is not allowed, the upload function returns:

```
def upload():
    return jsonify({'error': 'Invalid file extension'}), 400


# Check the file content
image_content = image.read()
# Reset the file pointer to the beginning
image.seek(0)  # Reset file pointer
if imghdr.what(None, h=image_content) not in allowed_extensions:
    return jsonify({'error': 'Invalid image file'}), 400


# Additional validation using Pillow
try:
    img = Image.open(io.BytesIO(image_content))
    img.verify()  # Verify that it is, in fact, an image
except (IOError, SyntaxError) as e:
    return jsonify({'error': 'Invalid image file'}), 400


# Get the quality parameter from the request, default to 10 if not provided
quality = request.form.get('quality', default=10, type=int)


# Validate the quality parameter
if quality < 0 or quality > 100:
    return jsonify({'error': 'Quality must be between 0 and 100'}), 400


# Read the image directly from the request
image_array = np.frombuffer(image.read(), dtype=np.uint8)
```

By integrating detailed logging and wrapping our code in try-except blocks, we provide better error insights and help streamline debugging.

> [!important]
> **Note**
>
> Implementing robust error handling improves not only the debugging process but also the user experience by providing clearer responses and logs.

## Integrating Logging with Error Handling

Enhance your error handling by incorporating Python's logging module. The snippet below shows an improved upload function with thoughtful logging:

```
import logging
from flask import Blueprint, request, jsonify, send_file
import cv2
import numpy as np
import io
import imghdr
from werkzeug.utils import secure_filename
from PIL import Image


# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


bp = Blueprint('main', __name__)


@bp.route('/upload', methods=['POST'])
def upload():
    try:
        if 'image' not in request.files:
            logger.error('No image part in the request')
            return jsonify({'error': 'No image part in the request'}), 400


        image = request.files['image']


        if image.filename == '':
            logger.error('No image selected for uploading')
            return jsonify({'error': 'No image selected for uploading'}), 400


        # Secure the filename
        filename = secure_filename(image.filename)


        # Check the file extension
        allowed_extensions = {'png', 'jpg', 'jpeg', 'gif'}
        if not ('.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions):
            logger.error('Invalid file extension: %s', filename)
            return jsonify({'error': 'Invalid file extension'}), 400


        # Check the file content
        image_content = image.read()
        image.seek(0)  # Reset the file pointer
        if imghdr.what(None, h=image_content) not in allowed_extensions:
            logger.error('Invalid image file content for: %s', filename)
            return jsonify({'error': 'Invalid image file'}), 400


        # Additional validation using Pillow
        try:
            img = Image.open(io.BytesIO(image_content))
            img.verify()  # Confirm that it is a valid image
        except (IOError, SyntaxError) as e:
            logger.error('Invalid image file: %s', e)
            return jsonify({'error': 'Invalid image file'}), 400


        # Get the quality parameter from the request; default to 10 if not provided
        quality = request.form.get('quality', default=10, type=int)


        # Validate the quality parameter
        if quality < 0 or quality > 100:
            logger.error('Quality must be between 0 and 100, got: %d', quality)
            return jsonify({'error': 'Quality must be between 0 and 100'}), 400


        # Process the image with OpenCV
        _, buffer = cv2.imencode('.jpg', img, [int(cv2.IMWRITE_JPEG_QUALITY), quality])
        img_io = io.BytesIO(buffer)


        # Validate the processed image
        try:
            processed_img = Image.open(img_io)
            processed_img.verify()
        except (IOError, SyntaxError) as e:
            logger.error('Failed to process image: %s', e)
            return jsonify({'error': 'Failed to process image'}), 400


        # Reset the BytesIO pointer to the beginning
        img_io.seek(0)


        # Return the processed image as binary data
        return send_file(img_io, mimetype='image/jpeg')


    except Exception as e:
        logger.exception('An unexpected error occurred: %s', e)
        return jsonify({'error': 'An unexpected error occurred. Please try again later.'}), 500
```

> [!important]
> **Logging Tip**
>
> Utilize Python's built-in logging to capture detailed error context. This practice significantly simplifies troubleshooting and maintenance.

## Using Code Assistance Tools

Consider using code assistance tools like [BlackboxAI](https://www.useblackbox.io) to further enhance error handling. These tools can analyze your code, suggest improvements such as additional try-except blocks, and prompt you to add logging statements where necessary. This can be particularly useful during rapid development and debugging.

## Flask's Built-In Error Handlers

Beyond function-specific error handling, Flask provides mechanisms for global error management. Define error handlers for specific HTTP error codes to return custom error pages or JSON responses. For example, to handle 404 and 500 errors for HTML responses:

```
from flask import Flask, render_template


app = Flask(__name__)


@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500
```

For REST APIs, it’s beneficial to use JSON error responses even for unexpected exceptions:

```
import logging
from flask import Flask, jsonify


app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.errorhandler(Exception)
def handle_exception(e):
    logger.error('An error occurred: %s', e)
    return jsonify({'error': 'An unexpected error occurred'}), 500
```

## Testing the Error Handling

After integrating the enhanced error handling, test your API endpoints using tools like Postman. Testing the `/upload` endpoint under various conditions ensures that errors are caught and properly logged. A typical console output might look like this:

```
(venv) user@dev-machine imageoptimizer.app % flask run
 * Serving Flask app 'run.py'
 * Debug mode off:
INFO:werkzeug:WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
INFO:werkzeug:Press CTRL+C to quit
INFO:werkzeug:127.0.0.1 - - [20/Nov/2024 20:31:18] "POST /upload HTTP/1.1" 200 -
INFO:werkzeug:127.0.0.1 - - [20/Nov/2024 20:31:24] "POST /upload HTTP/1.1" 200 -
```

This output confirms that even when errors occur, the upload function reacts gracefully while logging appropriate details.

## Summary

By incorporating detailed logging and proper error handling practices in your Flask application, you not only save time during development but also build a robust, maintainable API. These improvements ensure your application responds gracefully to unexpected errors while providing clear feedback for both users and developers.

For further reading on Flask error handling and logging best practices, check out the [Flask Documentation](https://flask.palletsprojects.com/en/latest/errorhandling/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-assisted-development/module/0f8882f1-0976-491e-8243-9b522243717f/lesson/ce39ef40-4880-4878-a89a-5a0a06cef382)**
>
> Watch video content
