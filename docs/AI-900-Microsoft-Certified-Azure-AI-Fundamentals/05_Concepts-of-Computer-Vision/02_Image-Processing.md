# Image Processing - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-900-Microsoft-Certified-Azure-AI-Fundamentals/Concepts-of-Computer-Vision/Image-Processing)

---

## Table of Contents

- Image Processing
  - Representing Images
  - Applying Filters
  - Example: Laplace Filter
  - Watch Video

---

## Content

AI-900: Microsoft Certified Azure AI Fundamentals

Concepts of Computer Vision

# Image Processing

In this lesson, we introduce the fundamentals of image processing, explaining how images are structured and demonstrating the use of filters to modify their appearance. This process is instrumental in highlighting specific features within an image.

## Representing Images

An image is essentially an array of pixel values. For a grayscale image, each pixel value represents a shade of gray ranging from 0 (black) to 255 (white). On the other hand, color images are represented by three separate channels—red, green, and blue—with each channel containing its own array of pixel values.

## Applying Filters

Image processing techniques often rely on applying filters. Filters are typically composed of a kernel, which is a small matrix of weights. This kernel is convolved over the image: it moves across the image and, at each position, computes a new pixel value by combining the original pixel values with the kernel’s weights.

![The image illustrates image processing, showing an array of pixel values and a filter matrix used to modify images.](https://kodekloud.com/kk-media/image/upload/v1752856959/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Image-Processing/image-processing-pixel-values-filter.jpg)

The convolution process results in a modified version of the original image. For example, certain areas of the image may show concentrations of pixel values like 255 (white), while others may display 0 (black), thereby emphasizing distinct visual features.

## Example: Laplace Filter

A common filter used in image processing is the Laplace filter, which is highly effective for edge detection. As the Laplace kernel moves over the image, it accentuates regions with abrupt changes in pixel intensity, thus clearly defining the edges of objects within the image.

![The image shows two grids representing pixel arrays, illustrating how filters are applied to change images in image processing. The left grid shows an original array of pixel values, while the right grid shows the result after a filter is applied.](https://kodekloud.com/kk-media/image/upload/v1752856960/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Image-Processing/pixel-arrays-image-processing-filters.jpg)

The output of this filtering process is an image where edges are prominently defined. Regions with minimal variation—such as the image center—may remain at a uniform value of 0. This clear delineation of features makes subsequent analysis and computer vision tasks more effective.

> [!important]
> **Note**
>
> Understanding how filters modify an image is a crucial step in many computer vision applications. These techniques facilitate the extraction of important details from images, which can then be used in more advanced analyses.

Next, we will explore how Convolutional Neural Networks build upon these image processing techniques to further analyze and interpret visual data.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-900-microsoft-azure-ai-fundamental/module/ea26ec15-029f-4b2e-953e-3c9e3840f9f9/lesson/7f8d52a2-2342-4f56-afb6-e97ab0ddc181)**
>
> Watch video content
