# Testing with Postman - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-Assisted-Development/Development-Phase-Backend/Testing-with-Postman)

---

## Table of Contents

- Testing with Postman
  - Running the Flask Server and Testing with Postman
  - Additional Upload Function Verification
  - Enhanced Quality Parameter Validation
  - Final Version of the Flask Route
  - Watch Video
    - Testing with a JPEG File
    - Testing with a PNG File
    - Testing with Another JPEG File
    - Testing with a GIF File

---

## Content

AI-Assisted Development

Development Phase Backend

# Testing with Postman

In this guide, we walk you through testing the image upload endpoint of our Flask API. The endpoint now features enhanced image-loading, validation, robust error handling, and detailed logging. We use [Postman Essentials](https://learn.kodekloud.com/user/courses/postman-essentials) to simulate various scenarios—including successful uploads and error conditions—to ensure the system behaves as expected.

Below is an excerpt of the image upload endpoint. This snippet demonstrates how we manage file selection, validate file extensions, check file content using both imghdr and Pillow, and verify the quality parameter. Notice that after reading the file content, we reset the file pointer to ensure proper subsequent processing.

```
def upload():
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
    image.seek(0)  # Reset the file pointer to the beginning
    if imghdr.what(None, h=image_content) not in allowed_extensions:
        logger.error('Invalid image file content for: %s', filename)
        return jsonify({'error': 'Invalid image file'}), 400


    # Additional validation using Pillow
    try:
        img = Image.open(io.BytesIO(image_content))
```

## Running the Flask Server and Testing with Postman

Once the Flask server is running using `flask run`, open [Postman Essentials](https://learn.kodekloud.com/user/courses/postman-essentials) and follow these steps:

1.  **Select an Image:** For this test, we use an image of the Northern Lights.
2.  **Set the Parameters:** In Postman, create a new request with the following details.

Below is an example request for a full-quality image upload:

```
POST http://127.0.0.1:5000/upload


Key          Value
image        DSC90804.JPG
quality      100
```

This test confirms that the system only accepts specific file types—PNG, JPEG, JPG, and GIF—even when JPEG is a less common file extension.

## Additional Upload Function Verification

The following snippet shows an alternative version of the upload function. This version first checks if the 'image' key exists, then validates the file extension and content:

```
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
        image.seek(0)  # Reset the file pointer to the beginning
        if imghdr.what(None, h=image_content) not in allowed_extensions:
            logger.error('Invalid image file content for: %s', filename)
            return jsonify({'error': 'Invalid image file'}), 400
```

### Testing with a JPEG File

For a JPEG file upload, the request might look like this:

```
POST http://127.0.0.1:5000/upload
Key           Value
image         DSC08804.JPG
quality       100
```

### Testing with a PNG File

After selecting a PNG image (e.g., `book.png`), setting the quality parameter to 100 should display an acceptable image. However, reducing quality to 5 will result in poor output:

```
POST http://127.0.0.1:5000/upload
Params:
  image: File --> book.png
  quality: Text --> 5
```

### Testing with Another JPEG File

Similarly, testing with another JPEG file (`coolgirl.jpeg`) confirms that the quality adjustments work as expected:

```
POST http://127.0.0.1:5000/upload


Key              Value
image            File: coolgirl.jpeg
quality          Text: 100


Response:
200 OK
```

### Testing with a GIF File

When attempting to upload a GIF file, you may see a "failed to decode image" error. This outcome is expected because OpenCV's imdecode function does not support GIF images:

```
def upload():
    logger.error('Invalid image file content')
    return jsonify({'error': 'Invalid image file'})


# Additional validation using Pillow
try:
    img = Image.open(io.BytesIO(image_content))
    img.verify()  # Verify that it is, in fact, an image
except (IOError, SyntaxError) as e:
    logger.error('Invalid image file: %s', e)
    return jsonify({'error': 'Invalid image file'})


# Get the quality parameter from the request
quality = request.form.get('quality', default=75)


# Validate the quality parameter
if quality < 0 or quality > 100:
    logger.error('Quality must be between 0 and 100')
    return jsonify({'error': 'Quality must be between 0 and 100'})


# Read the image directly from the request
img_array = np.frombuffer(image.read(), np.uint8)
img = cv2.imdecode(img_array, cv2.IMREAD_UNCHANGED)


if img is None:
    logger.error('Failed to decode image: %s', image.filename)
    return jsonify({'error': 'Failed to decode image'})
```

A sample console output might be:

```
INFO:werkzeug:127.0.0.1 - - [20/Nov/2024 20:57:51] "POST /upload HTTP/1.1" 200 -
INFO:werkzeug:127.0.0.1 - - [20/Nov/2024 20:58:32] "POST /upload HTTP/1.1" 400 -
ERROR:app.routes:Failed to decode image: [<filename>
```

> [!important]
> **Note**
>
> Since our application does not support GIF images, you will consistently see error messages for such files. For handling GIFs, consider using Pillow as recommended by BlackboxAI and Tabnine.

## Enhanced Quality Parameter Validation

Below is an updated version of the upload function with improved quality parameter validation. This version ensures that the quality parameter is present and within the allowed range (0–100). If the parameter is omitted or invalid, an error message is returned:

```
# Check if quality parameter is present
if 'quality' not in request.form:
    logger.error('Quality parameter is missing')
    return jsonify({'error': 'Quality parameter is required'}), 400


# Get the quality parameter from the request
quality = request.form.get('quality', type=int)


# Validate the quality parameter
if quality is None or quality < 0 or quality > 100:
    logger.error('Invalid quality value: %s', quality)
    return jsonify({'error': 'Quality must be an integer between 0 and 100'}), 400


# Read the image directly from the request
img_array = np.frombuffer(image.read(), np.uint8)
img = cv2.imdecode(img_array, cv2.IMREAD_UNCHANGED)


if img is None:
    logger.error('Failed to decode image: %s', filename)
    return jsonify({'error': 'Failed to decode image'}), 400


# Process the image with OpenCV
buffer = cv2.imencode('.jpg', img, [int(cv2.IMWRITE_JPEG_QUALITY), quality])[1]


# Create a Bytes object from the buffer
```

After running Flask and testing the endpoint, if the quality parameter is missing you will receive:

```
{
  "error": "Quality parameter is required"
}
```

A successful request with a valid quality value returns the processed image.

## Final Version of the Flask Route

The final structure of our Flask route, incorporating all improvements, is shown below:

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
        image.seek(0)  # Reset the file pointer to the beginning
        if imghdr.what(None, h=image_content) not in allowed_extensions:
            logger.error('Invalid image file content for: %s', filename)
            return jsonify({'error': 'Invalid image file'}), 400


        # Check if quality parameter is present
        if 'quality' not in request.form:
            logger.error('Quality parameter is missing')
            return jsonify({'error': 'Quality parameter is required'}), 400


        # Get and validate the quality parameter
        quality = request.form.get('quality', type=int)
        if quality is None or quality < 0 or quality > 100:
            logger.error('Invalid quality value: %s', quality)
            return jsonify({'error': 'Quality must be an integer between 0 and 100'}), 400


        # Additional validation using Pillow
        try:
            img = Image.open(io.BytesIO(image_content))
            img.verify()  # Verify that it is an image
        except (IOError, SyntaxError) as e:
            logger.error('Invalid image file: %s', e)
            return jsonify({'error': 'Invalid image file'}), 400


        # Read the image directly from the request
        img_array = np.frombuffer(image.read(), np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_UNCHANGED)


        if img is None:
            logger.error('Failed to decode image: %s', filename)
            return jsonify({'error': 'Failed to decode image'}), 400


        # Process the image with OpenCV
        buffer = cv2.imencode('.jpg', img, [int(cv2.IMWRITE_JPEG_QUALITY), quality])


        # Create a BytesIO object from the buffer
        img_io = io.BytesIO(buffer[1].tobytes())


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

After integrating these enhancements, our Flask API is robust and ready for frontend consumption. Later, we will scaffold the frontend using Cursor alongside tools like Tabnine and GitHub Copilot.

![The image shows a code editor with Python code for an image upload function, alongside a terminal displaying error logs related to HTTP requests.](https://kodekloud.com/kk-media/image/upload/v1752857065/notes-assets/images/AI-Assisted-Development-Testing-with-Postman/python-image-upload-code-terminal-logs.jpg)

> [!important]
> **Note**
>
> When testing, check the API logs to see messages such as:
>
> - "Quality parameter is missing"
> - "Failed to decode image"
> - HTTP status codes 200 or 400 depending on the test scenario.

Thank you for following along. In the next article, we will build a React application to interact with this robust API. Happy coding!

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-assisted-development/module/0f8882f1-0976-491e-8243-9b522243717f/lesson/4fe1b36b-551a-45df-a2a7-d661a4d910bc)**
>
> Watch video content
