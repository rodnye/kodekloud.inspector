# Demo Image Variations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/Generating-Images/Demo-Image-Variations)

---

## Table of Contents

- Demo Image Variations
  - Prerequisites
  - 1. Import Modules and Configure the API Key
  - 2. Load and Display the Source Image
  - 3. Generate Three Variations
  - 4. Render the Generated Variations
  - Summary of Steps
  - Next Steps
  - References
  - Watch Video
  - Practice Lab

---

## Content

Mastering Generative AI with OpenAI

Generating Images

# Demo Image Variations

In this tutorial, you’ll learn how to generate multiple variations of an existing image using the OpenAI DALL·E API. By the end, you’ll be able to:

- Load and preview a source image
- Call the DALL·E variations endpoint
- Render the generated images

## Prerequisites

- Python 3.6+
- Install the OpenAI Python library:

```
pip install openai
```

- Set your API key as an environment variable:

```
export OPENAI_API_KEY="your_api_key_here"
```

## 1\. Import Modules and Configure the API Key

Begin by importing the necessary modules and loading your API key:

```
import openai
import os
from IPython.display import Image, display

openai.api_key = os.getenv("OPENAI_API_KEY")
```

## 2\. Load and Display the Source Image

Use IPython’s display utilities to preview the original asset:

```
display(Image(filename='./images/lion-cub.png'))
```

This shows a lion and its cub.

## 3\. Generate Three Variations

Call the DALL·E variation endpoint, specifying the image file, output size, and number of results:

```
response = openai.Image.create_variation(
    image=open('./images/lion-cub.png', 'rb'),
    size='512x512',
    n=3
)
```

> [!important]
> **Tip**
>
> You can modify the `size` or the `n` parameter to control the resolution and the number of variations returned.

## 4\. Render the Generated Variations

Display each variation using the URLs returned in the response:

```
# Variation 1
display(Image(url=response['data'][0]['url']))

# Variation 2
display(Image(url=response['data'][1]['url']))

# Variation 3
display(Image(url=response['data'][2]['url']))
```

Each variation offers a unique composition or style. Experiment with different source images or parameters to explore new creative directions.

## Summary of Steps

| Step                  | Description                                 | Example Code                                   |
| --------------------- | ------------------------------------------- | ---------------------------------------------- |
| Import & Authenticate | Load libraries and set API key              | `openai.api_key = os.getenv("OPENAI_API_KEY")` |
| Preview Source Image  | Display the original image                  | `display(Image(...))`                          |
| Request Variations    | Generate `n` new images with specified size | `openai.Image.create_variation(...)`           |
| Render Outputs        | Show each variation using returned URLs     | `display(Image(url=...))`                      |

## Next Steps

Now that you’ve created image variations, consider exploring other OpenAI offerings:

- [OpenAI DALL·E Image API Guide](https://platform.openai.com/docs/guides/images)
- [OpenAI Whisper Speech-to-Text](https://platform.openai.com/docs/guides/speech-to-text)

## References

- [OpenAI Python Library](https://github.com/openai/openai-python)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/ad3893f7-fba6-4142-a575-422006496a97/lesson/0818deaa-36b0-45ad-aa21-aa04378587c7)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/ad3893f7-fba6-4142-a575-422006496a97/lesson/641a7dc4-14a0-4bb9-b755-657b3fca56b6)**
>
> Practice lab
