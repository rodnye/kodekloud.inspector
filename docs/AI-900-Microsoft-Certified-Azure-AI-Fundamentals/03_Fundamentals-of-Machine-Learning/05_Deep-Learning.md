# Deep Learning - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-900-Microsoft-Certified-Azure-AI-Fundamentals/Fundamentals-of-Machine-Learning/Deep-Learning)

---

## Table of Contents

- Deep Learning
  - Artificial Neural Networks
  - Example: Classifying Animal Sounds
  - Learning Through Iterative Training
  - Summary
  - Watch Video
    - 1. Input Layer and Feature Extraction
    - 2. Hidden Layers
    - 3. Output Layer and Prediction

---

## Content

AI-900: Microsoft Certified Azure AI Fundamentals

Fundamentals of Machine Learning

# Deep Learning

Deep Learning is an advanced subfield of machine learning inspired by the structure and function of the human brain. Just as billions of neurons in our brain communicate through electrochemical signals to help us think, see, and make decisions, artificial neural networks in deep learning simulate this behavior by processing data and identifying patterns.

## Artificial Neural Networks

Artificial neural networks simulate biological neurons by receiving input, processing it, and transmitting output. Each artificial neuron multiplies its input by a weight that reflects the importance of that feature. For instance, when predicting house prices, the number of rooms may be weighted differently than the room size. An activation function then decides whether the neuron’s output should move to the next layer, filtering the most relevant information.

![The image illustrates the concept of an artificial neural network, showing how each neuron processes an input and a weight, with activation functions determining signal propagation.](https://kodekloud.com/kk-media/image/upload/v1752856989/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Deep-Learning/artificial-neural-network-diagram.jpg)

Deep learning models, also known as deep neural networks (DNNs), consist of multiple layers that progressively refine the data. This hierarchical structure allows these models to learn complex patterns gradually from raw input data.

![The image is an infographic about artificial neural networks, explaining that they consist of multiple layers of neurons, often called deep neural networks, and are used for machine learning, natural language processing, and computer vision.](https://kodekloud.com/kk-media/image/upload/v1752856990/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Deep-Learning/artificial-neural-networks-infographic.jpg)

> [!important]
> **Note**
>
> In image recognition tasks, early layers may detect edges, mid-layers capture shapes, and deeper layers recognize complete objects, leading to highly effective classification and prediction.

## Example: Classifying Animal Sounds

This section explains how a deep learning model can classify animal sounds using a step-by-step process. The model processes a feature vector X, which includes characteristics such as pitch, duration, amplitude, and frequency. Each feature is processed by a corresponding neuron in the input layer.

### 1\. Input Layer and Feature Extraction

Each neuron in the input layer receives a feature and calculates a weighted sum using its specific weight (W). These weights are continuously adjusted during training, enabling the model to learn the contribution of each feature to the final prediction.

### 2\. Hidden Layers

The output from the input layer is sent through one or more hidden layers. In these layers, every neuron connects to all neurons in the subsequent layer, allowing the model to refine and abstract features iteratively. This process helps uncover complex patterns essential for accurate predictions.

### 3\. Output Layer and Prediction

In the final output layer, the network computes probabilities for each possible class. For example, a probability distribution might be 0.1 for dog, 0.6 for cat, and 0.3 for bird. The model then selects the class with the highest probability as its prediction.

![The image illustrates a deep neural network model used for classifying animal sounds, with input features and predicted probabilities for different animals. The model predicts the sound as a cat with the highest probability.](https://kodekloud.com/kk-media/image/upload/v1752856992/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Deep-Learning/deep-neural-network-animal-sounds.jpg)

The classification process can be summarized as:

- Start with a feature vector describing the sound.
- Process the features in the input layer with weighted summation.
- Pass the data through multiple hidden layers for iterative feature refinement.
- Compute output probabilities in the final layer and choose the class with the maximum probability.

## Learning Through Iterative Training

The power of deep learning lies in its ability to learn from repeated exposure to data. During training, the model performs the following steps:

- Forward propagates training data through the network to generate predicted probabilities.
- Compares these predictions with actual labels (ground truth) to determine the loss, which measures the error.
- Adjusts the weights using optimization techniques such as backpropagation to minimize the loss.

For example, if the correct label for a sound is \[0, 1, 0\] (indicating a cat) and the model outputs \[0.1, 0.6, 0.3\], the network will update its weights to reduce the error.

![The image is a slide about deep learning, specifically discussing a neural network model used for classifying animal sounds, with a conclusion on how the model learns and adjusts weights.](https://kodekloud.com/kk-media/image/upload/v1752856993/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-Deep-Learning/deep-learning-neural-network-animal-sounds.jpg)

> [!important]
> **Note**
>
> The continuous process of weight adjustment through backpropagation is what makes deep learning models robust and effective for diverse applications in artificial intelligence.

## Summary

Deep learning models draw inspiration from the human brain to learn complex patterns from data by processing inputs through multiple layers. The essential aspects include:

- Feature extraction in the input layer.
- Progressive abstraction in hidden layers.
- Final prediction in the output layer using probabilities.

These principles extend to various AI techniques, including [Azure Machine Learning](https://azure.microsoft.com/en-us/services/machine-learning/), further showcasing the versatility of deep learning.

For more information on related topics, consider exploring these resources:

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Docker Hub](https://hub.docker.com/)
- [Terraform Registry](https://registry.terraform.io/)

By understanding and applying these deep learning principles, you can leverage powerful techniques for applications in image recognition, natural language processing, and beyond.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-900-microsoft-azure-ai-fundamental/module/8148a01f-2436-45df-99cc-44d03cb327f9/lesson/40c65437-4cbb-4dcc-97d1-932f422f83c7)**
>
> Watch video content
