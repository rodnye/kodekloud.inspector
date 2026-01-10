# Demo Image Masking - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/Generating-Images/Demo-Image-Masking)

---

## Table of Contents

- Demo Image Masking
  - Prerequisites
  - 1. Install and Authenticate
  - 2. Prepare Your Images
  - 3. Perform the Edit
  - 4. Generate Multiple Variations
  - 5. Parameter Reference
  - 6. Generate Image Variations
  - Watch Video
  - Practice Lab

---

## Content

Mastering Generative AI with OpenAI

Generating Images

# Demo Image Masking

In this tutorial, you’ll learn how to use DALL·E 2’s image masking feature to edit an existing picture by defining a masked region and supplying a text prompt. This approach is perfect for seamlessly replacing objects, changing backgrounds, or adding new elements to your images.

## Prerequisites

- Python 3.7+
- The `openai` Python package (`pip install openai`)
- An OpenAI API key

> [!important]
> **Note**
>
> Make sure you’ve exported your API key as an environment variable:
>
> ```
> export OPENAI_API_KEY="your_api_key_here"
> ```

## 1\. Install and Authenticate

Begin by installing the client library and initializing your API key in Python:

```
import openai
import os
from IPython.display import Image

# Load API key from environment
openai.api_key = os.getenv("OPENAI_API_KEY")
```

## 2\. Prepare Your Images

You need three files:

1.  **Original image** (with the object you want to replace)
2.  **Base image** (same image after removing the object)
3.  **Mask image** (a transparent PNG that marks the area to edit)

```
display(Image(filename='images/dog_table.png'))        # Original image with dog
display(Image(filename='images/table.png'))            # Image with dog removed
display(Image(filename='images/table-masked.png'))     # Transparent mask placeholder
```

## 3\. Perform the Edit

Use the `create_edit` endpoint to fill the masked area based on your prompt:

```
response = openai.Image.create_edit(
    image=open('images/table.png', 'rb'),
    mask=open('images/table-masked.png', 'rb'),
    prompt='A cat sitting on a dining table chair waiting for food',
    n=1,
    size='512x512'
)
edited_url = response['data'][0]['url']
display(Image(url=edited_url))
```

## 4\. Generate Multiple Variations

If you’d like several options, increase `n` and iterate through the results:

```
response = openai.Image.create_edit(
    image=open('images/table.png', 'rb'),
    mask=open('images/table-masked.png', 'rb'),
    prompt='A cat sitting on a dining table chair waiting for food',
    n=3,
    size='512x512'
)
for result in response['data']:
    display(Image(url=result['url']))
```

> [!important]
> **Warning**
>
> Requesting a large number of edits or very high resolutions may incur higher usage costs. Monitor your [API usage dashboard](https://platform.openai.com/account/usage).

## 5\. Parameter Reference

| Parameter | Type    | Description                                                   |
| --------- | ------- | ------------------------------------------------------------- |
| `image`   | File    | The base image without the masked object (PNG or JPEG).       |
| `mask`    | File    | A transparent PNG marking the area to edit (white = mask).    |
| `prompt`  | String  | Textual description of what should appear in the masked area. |
| `n`       | Integer | Number of edits to generate (1–10).                           |
| `size`    | String  | Output resolution: `256x256`, `512x512`, or `1024x1024`.      |

## 6\. Generate Image Variations

Beyond masking, DALL·E 2 can also create variations of a single image without any prompt:

```
response = openai.Image.create_variation(
    image=open('images/table.png', 'rb'),
    n=4,
    size='512x512'
)
for img in response['data']:
    display(Image(url=img['url']))
```

For full details on both endpoints, see the [OpenAI Image API Reference](https://platform.openai.com/docs/api-reference/images).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/ad3893f7-fba6-4142-a575-422006496a97/lesson/ff7f071e-87be-41fd-8f4c-0d3fa959250a)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/ad3893f7-fba6-4142-a575-422006496a97/lesson/0dfd8ad8-78ca-4419-9380-653e4f34b845)**
>
> Practice lab
