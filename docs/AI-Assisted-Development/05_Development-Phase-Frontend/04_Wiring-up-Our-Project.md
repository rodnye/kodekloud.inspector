# Wiring up Our Project - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-Assisted-Development/Development-Phase-Frontend/Wiring-up-Our-Project)

---

## Table of Contents

- Wiring up Our Project
  - Activating the Backend
  - Connecting the React Application
  - Using Developer Tools
  - Handling CORS in Flask
  - Displaying Optimized Images and File Size Comparison
  - Final Steps and Deployment Considerations
  - Watch Video

---

## Content

AI-Assisted Development

Development Phase Frontend

# Wiring up Our Project

In this lesson, we will connect the React UI to the Flask backend API of our image optimizer application. With both the backend and frontend already developed, it’s now time to integrate them for a seamless user experience.

---

## Activating the Backend

Begin by navigating to your image optimizer application directory and activating your virtual environment. After that, start your Flask application with the following commands:

```
jeremy@Jeremys-Mac-Studio imageoptimizer.app % ls
__pycache__    requirements.txt    venv    run.py
(venv) jeremy@Jeremys-Mac-Studio imageoptimizer.app % flask run
 * Serving Flask app 'run.py'
 * Debug mode: off
WARN:werkzeug:WARNING: This is a development server. Do not use it in a producti
on deployment. Use a production WSGI server instead.
 * Running on https://127.0.0.1:5173/ (Press CTRL+C to quit)
Nov/2024 14:19:371 "POST /upload HTTP/1.1" 200 -
Nov/2024 14:19:421 "POST /upload HTTP/1.1" 200 -
```

> [!important]
> **Note**
>
> For testing purposes, you can use [Postman](https://www.postman.com/) to verify that your API is running correctly.

With the backend active, it’s time to connect it with your React application.

---

## Connecting the React Application

Within your React app, update the API endpoint so that it correctly points to your Flask backend. Below is the core functionality for image uploading through React:

```
async function handleSubmit(e) {
  e.preventDefault();


  if (!selectedImage) {
    alert('Please select an image first');
    return;
  }


  const formData = new FormData();
  formData.append('image', selectedImage);
  formData.append('quality', quality);


  try {
    const response = await fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: formData,
    });


    if (response.ok) {
      const data = await response.json();
      console.log('Upload successful:', data);
    } else {
      console.error('Upload failed');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
  }
}
```

A complete example of the component could look like this:

```
import React, { useState, useEffect } from 'react';


function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [quality, setQuality] = useState(80);
  const [optimizedImageUrl, setOptimizedImageUrl] = useState(null);
  const [selectedImageSize, setSelectedImageSize] = useState(null);
  const [optimizedImageSize, setOptimizedImageSize] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!selectedImage) {
      alert('Please select an image first');
      return;
    }


    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('quality', quality);


    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });


      if (response.ok) {
        // When the API returns binary image data
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setOptimizedImageUrl(imageUrl);
        setOptimizedImageSize(blob.size);
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };


  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setSelectedImageSize(file.size);
    }
  };


  // Cleanup object URLs to prevent memory leaks.
  useEffect(() => {
    return () => {
      if (optimizedImageUrl) URL.revokeObjectURL(optimizedImageUrl);
    };
  }, [optimizedImageUrl]);


  return (
    <div className="container">
      <header className="header">
        <h1>Image Optimizer</h1>
      </header>
      <main className="main-content">
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="upload-section">
            <label htmlFor="image-upload">Upload Image</label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
            />
          </div>
          <button type="submit">Optimize Image</button>
        </form>
        {/* Image Preview Section */}
        {selectedImage && (
          <div className="preview-section">
            <h2>Original Image:</h2>
            <p>File size: {selectedImageSize} bytes</p>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Original"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        )}
        {optimizedImageUrl && (
          <div className="preview-section">
            <h2>Optimized Image:</h2>
            <p>File size: {optimizedImageSize} bytes</p>
            <img
              src={optimizedImageUrl}
              alt="Optimized version"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        )}
      </main>
    </div>
  );
}


export default App;
```

In this React component, the selected image is uploaded to the Flask backend. Upon a successful API response, the returned binary data is converted into an object URL for display. Both the original and optimized images are shown along with their respective file sizes for easy comparison.

---

## Using Developer Tools

When testing your application, open your browser's developer tools to monitor network activity and validate that the Flask server is accessible at `127.0.0.1:5000`. For instance, after choosing an image like "coolgirl.jpeg" from your computer, you should see a preview similar to the one below:

![The image shows a computer screen with a file explorer window open, displaying a folder containing image files. The selected file is "coolgirl.jpeg," and a preview of the image is visible on the right side of the window.](https://kodekloud.com/kk-media/image/upload/v1752857070/notes-assets/images/AI-Assisted-Development-Wiring-up-Our-Project/file-explorer-image-preview-coolgirl.jpg)

---

## Handling CORS in Flask

When running the React app and Flask API on separate ports, you might experience CORS errors. To resolve this, install [Flask-Cors](https://flask-cors.readthedocs.io/en/latest/) in your virtual environment:

```
jeremy@Jeremy’s-Mac-Studio imageoptimizer.app % pip install flask-cors
```

Next, update your Flask application's initialization file (commonly `__init__.py`) to enable CORS:

```
from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    app.config['DEBUG'] = True
    CORS(app, resources={
        r"/": {
            "origins": ["http://localhost:5173"],
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type"]
        }
    })


    from . import routes
    app.register_blueprint(routes.bp)


    return app
```

> [!important]
> **Note**
>
> This configuration allows requests solely from the defined origin. Update these settings as needed when deploying to production.

---

## Displaying Optimized Images and File Size Comparison

A major feature of this project is the display of both the original and optimized images, including their file sizes, for side-by-side comparison. Once you click the "Optimize Image" button, the React component processes the binary response from the Flask endpoint and displays the optimized image with its size information. For example:

![The image shows a computer screen with a web development environment open, displaying a cartoon character in a hoodie and sunglasses holding a phone. The browser window is running a local server with an "Optimize Image" button and developer tools open.](https://kodekloud.com/kk-media/image/upload/v1752857073/notes-assets/images/AI-Assisted-Development-Wiring-up-Our-Project/web-development-cartoon-character-screen.jpg)

In some cases, an initial image (e.g., 85.95 kilobytes) might be optimized to 24.94 kilobytes, resulting in a 71% size reduction. Experiment with various quality settings to see how they affect the file size and visual quality.

---

## Final Steps and Deployment Considerations

Before finalizing the frontend integration, consider these additional improvements:

- Store the API endpoint URL as an environment variable to enhance flexibility across different deployment environments.
- Add comprehensive inline documentation in the code.
- Prepare the repository for public release by following best practices on GitHub.

You can find the complete source code for both the Flask backend and the React frontend in the following repository:

[Super-Image Optimizer on GitHub](https://github.com/JeremyMorgan/super-image-optimizer)

![The image shows a GitHub repository page for a project called "Super-Image-Optimizer." It includes details like files, commits, and a brief description of the project as a web-based image optimizer.](https://kodekloud.com/kk-media/image/upload/v1752857074/notes-assets/images/AI-Assisted-Development-Wiring-up-Our-Project/super-image-optimizer-repo.jpg)

Thank you for following along. With the project now fully integrated, we're ready to explore further enhancements and refinements to our application.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-assisted-development/module/3de5744a-0525-41be-b6cf-f2e4881e2790/lesson/fcda1762-a78b-4b27-bd7c-2188e8cf0561)**
>
> Watch video content
