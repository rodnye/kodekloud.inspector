# Introduction to Transformations - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/PyTorch/Working-with-Data/Introduction-to-Transformations)

---

## Table of Contents

- Introduction to Transformations
  - Resizing Images
  - Normalization and Random Horizontal Flip
  - Creating a Transformation Pipeline
  - Integrating Transformations with Datasets
  - Transitioning to the V2 API
  - Summary
  - Watch Video

---

## Content

PyTorch

Working with Data

# Introduction to Transformations

In this lesson, we explore how to use transformations to prepare and enhance image data for training models in PyTorch. These techniques introduce variety into your dataset, allowing models to learn robust features and generalize effectively to new data. Transformations are a crucial preprocessing step that not only standardizes input images but also augments the dataset to reduce overfitting.

Transformations serve two primary purposes:

1.  **Preprocessing:** Resize images to a uniform dimension and normalize pixel values to ensure consistency across the dataset.
2.  **Data Augmentation:** Apply operations such as rotating, flipping, and cropping to generate multiple modified versions of each image. This variation helps the model perform well on unseen data by reducing the risk of overfitting.

> [!important]
> **Note**
>
> Benefits of data transformations include improved preprocessing, effective data augmentation, and enhanced generalization, which collectively reduce overfitting.

![The image explains the benefits of transforming data, highlighting preprocessing, data augmentation, improved learning, and preventing overfitting.](https://kodekloud.com/kk-media/image/upload/v1752883308/notes-assets/images/PyTorch-Introduction-to-Transformations/data-transformation-benefits-diagram.jpg)

Overfitting, which is discussed later in more detail, can be mitigated effectively using these augmentation techniques. The TorchVision Transforms module in PyTorch simplifies the application of these transformations, offering easy-to-use operations for resizing, converting images to tensors, normalizing pixel values, and applying various augmentation methods.

For example, here is a simple import statement to get started with TorchVision Transforms:

```
# Import transforms module from torchvision
from torchvision import transforms
```

Some common image transformations include:

- **Resize:** Adjust the dimensions of an image to a specific size.
- **Normalize:** Convert pixel intensity values to a standard scale that aids model training.
- **ToTensor:** Change images into tensors, the primary data structures used in PyTorch for numerical computations.
- **RandomHorizontalFlip:** Horizontally flip the image with a given probability to simulate different viewing angles.

> [!important]
> **Note**
>
> The diagram below summarizes these common image transformations. The details provided above are typically sufficient for implementation.

![The image lists four common image transforms: Resize, Normalize, ToTensor, and RandomHorizontalFlip, each with a brief description of their function.](https://kodekloud.com/kk-media/image/upload/v1752883309/notes-assets/images/PyTorch-Introduction-to-Transformations/image-transforms-resize-normalize-totensor-randomhorizontalflip.jpg)

Let's examine these transformations in action.

## Resizing Images

The code below demonstrates how to use the Python Pillow library to load an image and then apply the PyTorch resize transformation to change its dimensions to 128x128 pixels:

```
from torchvision import transforms
from PIL import Image


# Load an image
image = Image.open('path_to_image.jpg')


# Resize the image to 128x128 pixels
resize_transform = transforms.Resize((128, 128))
resized_image = resize_transform(image)
```

Resizing ensures that all images in your dataset share consistent dimensions before training your model.

## Normalization and Random Horizontal Flip

Normalization adjusts pixel values, positioning them on a consistent scale, which in turn helps optimize model training. The following example normalizes an image tensor to a mean and standard deviation of 0.5. In addition, applying a random horizontal flip with a 50% probability introduces variation in image perspectives:

```
# Random Horizontal Flip with a 50% chance
random_flip_transform = transforms.RandomHorizontalFlip(p=0.5)
flipped_image = random_flip_transform(image)
```

Random horizontal flipping enriches the dataset by simulating different angles, which enhances the model’s ability to generalize.

## Creating a Transformation Pipeline

PyTorch allows you to combine multiple transformations into a single pipeline using the `transforms.Compose` class. This approach streamlines preprocessing by chaining operations such as resizing, flipping, converting to a tensor, and normalizing pixel values. The diagram below visually outlines this process:

![The image illustrates a pipeline for image processing using `transforms.Compose()`, showing steps from an original image through resizing, flipping, and converting to a tensor, resulting in a final image.](https://kodekloud.com/kk-media/image/upload/v1752883310/notes-assets/images/PyTorch-Introduction-to-Transformations/image-processing-pipeline-transforms.jpg)

Below is an example of how to create such a transformation pipeline:

```
# Pipeline using Compose
transform_pipeline = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.RandomHorizontalFlip(),
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])
```

This pipeline resizes the image to 128x128 pixels, applies a random horizontal flip, converts the image into a tensor, and then normalizes the pixel values.

> [!important]
> **Note**
>
> An additional diagram (if available) further clarifies the sequential data processing within this pipeline. The code and explanation above provide a comprehensive overview.

![The image illustrates a data processing pipeline example for an image, showing steps like resizing, random horizontal flipping, converting to a tensor, and normalizing.](https://kodekloud.com/kk-media/image/upload/v1752883311/notes-assets/images/PyTorch-Introduction-to-Transformations/data-processing-pipeline-image-example.jpg)

To apply the pipeline to an image, load the image using Python Pillow and then pass it through the transformation pipeline:

```
from PIL import Image
image = Image.open('path_to_image.jpg')


# Apply the pipeline to the image
transformed_image = transform_pipeline(image)
```

## Integrating Transformations with Datasets

Transformations can be directly integrated into dataset objects. For example, when using the preloaded MNIST dataset, you can integrate a transformation pipeline so that each image is preprocessed automatically during data loading:

```
from torchvision.datasets import MNIST


# Integrate the transformation pipeline into the dataset
dataset = MNIST(root='data', train=True, transform=transform_pipeline, download=True)
```

Each image accessed from this dataset undergoes consistent preprocessing, streamlining your workflow.

## Transitioning to the V2 API

Everything discussed so far is based on version 1 of the transformations API. PyTorch now recommends using the V2 API due to its enhanced features and improved performance. The V2 API is backward compatible with V1 and offers additional functionality and efficiency. Although a diagram may compare the two versions visually, the key takeaway is that V2 provides faster performance and more features while maintaining compatibility.

![The image compares v1 and v2 of `torchvision.transforms`, recommending v2 for its faster performance and additional features. It highlights v2's ability to handle more tasks and its backward compatibility with v1.](https://kodekloud.com/kk-media/image/upload/v1752883313/notes-assets/images/PyTorch-Introduction-to-Transformations/torchvision-transforms-v1-v2-comparison.jpg)

To use the V2 API, simply import the new module as shown below:

```
# V2 API Import
from torchvision.transforms import v2
```

We will explore the V2 API in greater detail in the demonstration section.

## Summary

Transformations are essential for preparing image data and augmenting it to improve model robustness. Techniques such as flipping and rotating images help prevent overfitting by offering diverse perspectives on the input data. Additionally, combining multiple transformations using `transforms.Compose` creates an efficient and organized preprocessing pipeline.

> [!important]
> **Note**
>
> While a summary diagram could provide a visual recap, the detailed discussion above comprehensively covers the importance and application of data transformations in deep learning workflows.

![The image is a summary slide highlighting the importance of transforms in preparing data for deep learning, using augmentations to prevent overfitting, and employing "transforms.Compose()" for creating transform pipelines.](https://kodekloud.com/kk-media/image/upload/v1752883313/notes-assets/images/PyTorch-Introduction-to-Transformations/data-transforms-importance-summary.jpg)

Integrating these transformations into the data loading process ensures that preprocessing is both seamless and efficient. With this understanding of image transformations in PyTorch, you are now ready to see these techniques in action in the upcoming demonstration.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/pytorch/module/f9d4b50b-328e-4cf7-a22a-3b236bf0abcd/lesson/5fd8231b-b241-4785-a397-ca229e3695c5)**
>
> Watch video content
