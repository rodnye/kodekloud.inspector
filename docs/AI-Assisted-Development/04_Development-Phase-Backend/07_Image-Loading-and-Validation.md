# Image Loading and Validation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-Assisted-Development/Development-Phase-Backend/Image-Loading-and-Validation)

---

## Table of Contents

- Image Loading and Validation
  - Watch Video

---

## Content

AI-Assisted Development

Development Phase Backend

# Image Loading and Validation

In our last lesson, we successfully launched our application. Although it needed refinement, we were able to upload an image, compress it, and return the processed image as expected. The following slide from the presentation summarizes our progress:

![The image is a presentation slide with the text "Image loading and validation" and "Demo" on a light and dark background. It includes a copyright notice for KodeKloud.](https://kodekloud.com/kk-media/image/upload/v1752857055/notes-assets/images/AI-Assisted-Development-Image-Loading-and-Validation/image-loading-validation-demo-slide.jpg)

Below is the initial version of the upload function that enabled image processing:

```
import numpy as np
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
```

To ensure robust image processing and enhance security, we implemented additional validation checks. These safeguards confirm that the uploaded file is a legitimate image, rather than a file with a spoofed image extension. We achieve this by inspecting both the file extension and its actual content using Python's imghdr module. The updated code snippet below illustrates these validations:

```
@bp.route('/upload', methods=['POST'])
def upload():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part in the request'}), 400


    image = request.files['image']


    if image.filename == '':
        return jsonify({'error': 'No image selected for uploading'}), 400


    # Check the file extension
    allowed_extensions = {'png', 'jpg', 'jpeg', 'gif'}
    if not ('.' in image.filename and image.filename.rsplit('.', 1)[1].lower() in allowed_extensions):
        return jsonify({'error': 'Invalid file extension'}), 400


    # Check the file content
    image_content = image.read()
    image.seek(0)  # Reset the file pointer to the beginning
    if imghdr.what(None, h=image_content) not in allowed_extensions:
        return jsonify({'error': 'Invalid image file'}), 400
```

> [!important]
> **Note**
>
> The above snippet demonstrates verifying both the file extension and the underlying file content. This dual check prevents scenarios where a malicious user might upload an executable file disguised as an image.

Building on these changes, we further refined our function by incorporating additional security practices and image validation using trusted libraries. The updated function now leverages secure filenames with Werkzeug and employs the Pillow library for thorough image validation. This ensures that the image not only uploads correctly but also maintains its integrity after processing.

```
from flask import request, jsonify, send_file
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


    # Secure the filename to prevent directory traversal attacks
    filename = secure_filename(image.filename)


    # Check the file extension
    allowed_extensions = {'png', 'jpg', 'jpeg', 'gif'}
    if not ('.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions):
        return jsonify({'error': 'Invalid file extension'}), 400


    # Verify the file content
    image_content = image.read()
    image.seek(0)  # Reset the file pointer to the beginning
    if imghdr.what(None, h=image_content) not in allowed_extensions:
        return jsonify({'error': 'Invalid image file'}), 400


    # Additional validation using Pillow to confirm image integrity
    try:
        pil_img = Image.open(io.BytesIO(image_content))
        pil_img.verify()  # Check if the file is a valid image
    except (IOError, SyntaxError):
        return jsonify({'error': 'Invalid image file'}), 400


    # Get the quality parameter from the request, default to 10 if not provided
    quality = request.form.get('quality', default=10, type=int)


    # Validate the quality parameter range
    if quality < 0 or quality > 100:
        return jsonify({'error': 'Quality must be between 0 and 100'}), 400


    # Decode the image with OpenCV
    image.seek(0)
    img_array = np.frombuffer(image.read(), np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_UNCHANGED)


    if img is None:
        return jsonify({'error': 'Failed to decode image'}), 400


    # Process the image by compressing it using OpenCV
    _, buffer = cv2.imencode('.jpg', img, [int(cv2.IMWRITE_JPEG_QUALITY), quality])


    # Create a BytesIO stream from the processed buffer
    img_io = io.BytesIO(buffer)


    # Validate the processed image with Pillow
    try:
        processed_img = Image.open(img_io)
        processed_img.verify()
    except (IOError, SyntaxError):
        return jsonify({'error': 'Failed to process image'}), 400


    # Reset the BytesIO pointer before sending the image file
    img_io.seek(0)
    return send_file(img_io, mimetype='image/jpeg')
```

After implementing these refinements, we tested the application using Postman. The testing procedure involved uploading a sample image and adjusting the quality parameter (e.g., 5%, 50%, 100%) to ensure that the image processing capabilities worked as desired.

Example Postman Request:

- URL: POST http://127.0.0.1:5000/upload
- Form Data:
  - Key: image (File: DSC08804.JPG)
  - Key: quality (Text: 50)

The successful response returns a 200 OK status along with the processed image.

> [!important]
> **Key Takeaway**
>
> By incorporating multiple layers of validation—from file extension verification and imghdr checks to robust validation using Pillow—the upload function is now more secure and resilient against potential threats, such as malicious file uploads.

Integrating generative AI tools like GitHub Copilot into our workflow provided valuable suggestions that led to enhanced security and reliability in our code. With these incremental improvements, our image-loading and validation module now efficiently handles image uploads while defending against potential security risks, ensuring overall robust performance.

For more information on secure file handling and image processing, explore the following resources:

- [Flask Documentation](https://flask.palletsprojects.com/)
- [OpenCV Documentation](https://docs.opencv.org/)
- [Pillow Documentation](https://pillow.readthedocs.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-assisted-development/module/0f8882f1-0976-491e-8243-9b522243717f/lesson/d73feacf-6264-42e9-afef-cfb43b41363d)**
>
> Watch video content
