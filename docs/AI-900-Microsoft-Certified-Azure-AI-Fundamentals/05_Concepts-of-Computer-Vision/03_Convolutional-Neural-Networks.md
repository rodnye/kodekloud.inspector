# Convolutional Neural Networks - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-900-Microsoft-Certified-Azure-AI-Fundamentals/Concepts-of-Computer-Vision/Convolutional-Neural-Networks)

---

## Table of Contents

- Convolutional Neural Networks
  - Feeding Labeled Images
  - Applying Convolution Filters
  - Flattening the Feature Maps
  - Fully Connected Layers and Prediction
  - Training the Network
  - Summary
  - Watch Video

---

## Content

AI-900: Microsoft Certified Azure AI Fundamentals

Concepts of Computer Vision

# Convolutional Neural Networks

Convolutional Neural Networks (CNNs) are specialized deep learning models extensively used for image classification. They are a cornerstone in computer vision, enabling machines to detect patterns, identify objects, and decipher complex scenes within images. This article outlines the key steps involved in how a CNN processes input data and produces predictions.

## Feeding Labeled Images

The CNN process starts with labeled images. Each image is paired with a corresponding label (for example, "apple," "banana," or "orange") that guides the learning process. These labels are essential during training, as they help the network understand the distinct features of each category.

## Applying Convolution Filters

After feeding the network, CNNs apply convolution filters—small matrices that slide over the image—to extract significant features such as edges, textures, and patterns. For instance, one filter may detect the curve of a banana, while another highlights the smooth surface of an apple. The outcome of these operations is a collection of feature maps, each emphasizing a different aspect of the image.

## Flattening the Feature Maps

Once the feature maps are generated, they are flattened into a one-dimensional vector. This flattening process streamlines the data, making it suitable for the next stage in the network: the fully connected layers.

## Fully Connected Layers and Prediction

The flattened feature vector is fed into a fully connected neural network layer, where every neuron connects to all neurons in the preceding layer. This structure allows the network to combine the extracted features, recognize complex patterns, and generate a final prediction. The output layer computes a probability for each class label. For example, if the input image is of a banana, the network will most likely assign the highest probability to the banana class, thereby classifying the image correctly.

## Training the Network

During the training phase, the CNN begins with random initial weights for its filters. Through multiple iterations, these weights are adjusted to minimize errors, thereby enhancing the network's ability to accurately identify features. After training, the CNN applies its refined knowledge to new and unseen images, consistently identifying familiar patterns and making reliable predictions.

> [!important]
> **Note**
>
> Understanding the step-by-step process of CNNs—from input labeling to output prediction—provides valuable insights into the power of deep learning for computer vision tasks.

## Summary

To summarize, CNNs transform raw image data into meaningful predictions by:

1.  Feeding labeled images,
2.  Applying convolution filters,
3.  Flattening the generated feature maps,
4.  Processing the features through fully connected layers,
5.  Producing class probability scores.

This structured approach allows CNNs to learn from and adapt to image data in a manner similar to traditional neural network models.

In the next section, we will explore MultiModal Models and delve into how they integrate various data types for enhanced predictive performance.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-900-microsoft-azure-ai-fundamental/module/ea26ec15-029f-4b2e-953e-3c9e3840f9f9/lesson/580dd156-8818-460f-8aee-72c89816e8c5)**
>
> Watch video content
