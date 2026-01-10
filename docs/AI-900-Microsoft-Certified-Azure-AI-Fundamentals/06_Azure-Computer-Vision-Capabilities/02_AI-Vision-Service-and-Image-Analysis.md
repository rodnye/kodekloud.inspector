# AI Vision Service and Image Analysis - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AI-900-Microsoft-Certified-Azure-AI-Fundamentals/Azure-Computer-Vision-Capabilities/AI-Vision-Service-and-Image-Analysis)

---

## Table of Contents

- AI Vision Service and Image Analysis
  - Overview of AI Vision Capabilities
  - Detailed Capabilities
  - Working with Azure AI Vision in the Azure Portal
  - Additional Vision Studio Features
  - Conclusion
  - Watch Video
    - Model Customization
    - Reading Text from Images (OCR)
    - Detecting People in Images
    - Generating Image Captions
    - Detecting and Labeling Objects
    - Tagging Visual Features
    - Smart Crop
    - Navigating the AI Studio Vision Section
      - Object Detection
      - Image Captioning
      - Dense Captioning
      - Image Search
      - Common Tag Extraction
      - Optical Character Recognition (OCR)

---

## Content

AI-900: Microsoft Certified Azure AI Fundamentals

Azure Computer Vision Capabilities

# AI Vision Service and Image Analysis

Welcome to this lesson on the Azure AI Vision Service and Image Analysis. In this guide, we explore the extensive capabilities of Azure AI Vision, including generating descriptive captions, object detection, OCR, and more. By the end of this lesson, you'll have a deep understanding of these features and their practical applications for various domains.

## Overview of AI Vision Capabilities

Azure AI Vision Service empowers you to analyze and interpret images with intelligence. Here are some of its key features:

- **Descriptive Captioning and Tagging:** Automatically generate captions like "a group of people walking on a sidewalk" along with relevant tags such as building, jeans, street, outdoor, jacket, etc.
- **Object and People Detection:** Identify objects (e.g., jeans, footwear) and detect individuals within images, making it ideal for scenarios like security and surveillance.
- **Text Extraction (OCR):** Extract text from images whether they are printed, handwritten, or digitally rendered.
- **Smart Crop:** Automatically crop images to highlight key areas, ensuring optimal display in websites, social media, or e-commerce platforms.

> [!important]
> **Note**
>
> Azure AI Vision Service can be customized to suit industry-specific needs, making it a powerful tool for various applications such as healthcare, retail, and security.

## Detailed Capabilities

### Model Customization

Tailor image analysis models to meet specific scenarios. For instance, organizations handling medical images can adjust models to detect medical instruments or conditions, vastly improving analysis accuracy.

### Reading Text from Images (OCR)

Leverage Optical Character Recognition (OCR) to extract text from different image types. Whether digitizing printed literature, business documents, or handwritten notes, OCR converts content into editable text, streamlining workflows across many industries.

### Detecting People in Images

The service can locate and identify people in images, making it highly suitable for crowd monitoring, security surveillance, and retail analytics. The detection is precise enough to outline individuals, aiding in both head counts and behavior analysis.

### Generating Image Captions

Automatically generate descriptive captions for images. Instead of manually labeling visuals, use this feature to produce captions like "a group of people walking on a sidewalk" to improve accessibility and content organization.

### Detecting and Labeling Objects

Automatically identify and label objects in images for use cases such as inventory management or autonomous systems. For example, the service can label books, shoes, or backpacks, enhancing the overall identification process.

### Tagging Visual Features

Apply descriptive tags to various elements within an image. Tags such as trees, bench, or lake for a park image help in efficiently categorizing and retrieving images from large datasets.

### Smart Crop

Automatically crop images to emphasize the most significant areas. This feature is especially useful for generating attractive thumbnails and ensuring that key subjects in an image are prominently displayed.

![The image shows an AI vision service analyzing a photo of people walking on a sidewalk, highlighting individuals and tagging elements like jeans and footwear. It illustrates the capability of smart cropping to improve visual appeal.](https://kodekloud.com/kk-media/image/upload/v1752856875/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-AI-Vision-Service-and-Image-Analysis/ai-vision-service-sidewalk-analysis.jpg)

## Working with Azure AI Vision in the Azure Portal

Start by accessing the Azure Portal and navigating to Azure AI Services. Although it's possible to deploy the Computer Vision Service independently, this demonstration uses an AI Services deployment that includes all necessary components.

![The image shows a Microsoft Azure portal interface displaying Azure AI services, with a list of available services on the left and details of a specific AI service on the right.](https://kodekloud.com/kk-media/image/upload/v1752856876/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-AI-Vision-Service-and-Image-Analysis/azure-portal-ai-services-interface.jpg)

Once your AI Services are deployed, open the AI Studio—a centralized hub offering access to all AI services including image generation and OpenAI models.

### Navigating the AI Studio Vision Section

Within the AI Studio, the Vision section is organized into several key areas:

- **Document:** Dedicated to OCR tasks.
- **Face:** Focused on face detection.
- **Image:** Encompasses all image-related capabilities, including captioning, object detection, and more.

The following diagram illustrates the "Vision + Document" section, showcasing features such as object detection, image captioning, and OCR.

![The image shows a webpage from Azure AI Studio, specifically the "Vision + Document" section, highlighting various vision capabilities like object detection, image captioning, and OCR. It also includes links to demos and learning resources.](https://kodekloud.com/kk-media/image/upload/v1752856877/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-AI-Vision-Service-and-Image-Analysis/azure-ai-studio-vision-document.jpg)

#### Object Detection

Within AI Studio, the object detection feature recognizes and locates items within an image. To test this feature:

1.  Select or create a hub.
2.  Choose an image from the available samples or upload your own.
3.  The system will detect objects (e.g., person, laptop, seating, table) and display attributes accordingly.

For example, you might see attributes like Taxi when processing a photo. Adjusting the threshold value allows you to refine detection confidence levels.

![The image shows a webpage from Azure AI Studio for detecting common objects in images, with options to upload or select sample images for object detection. The interface includes a sidebar with various document and image processing options.](https://kodekloud.com/kk-media/image/upload/v1752856879/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-AI-Vision-Service-and-Image-Analysis/azure-ai-studio-object-detection.jpg)

Another sample demonstrates an image with three people sitting on a couch with a laptop on a table.

![The image shows three people sitting on a couch with a laptop on a table in front of them, engaged in conversation. The scene is part of an object detection interface, highlighting detected objects like people, a laptop, and a table.](https://kodekloud.com/kk-media/image/upload/v1752856880/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-AI-Vision-Service-and-Image-Analysis/people-couch-laptop-conversation.jpg)

#### Image Captioning

Leveraging the Image section, the captioning feature enables automatic descriptive captions. For example, hubs might generate captions such as "a statue of a woman holding a scale on top of a building" or describe a pile of fruits accurately. Sample code is provided below for integrating these capabilities programmatically using the SDK and REST API with Python:

```
httpRequest.Content = new StreamContent(stream);
var json = JsonSerializer.Serialize(new AnalyzeRequest() { Url = imageUrl });
httpRequest.Content = new StringContent(json, Encoding.UTF8, MediaTypeHeaders.ContentType);


var client = new HttpClient();
var response = await client.SendAsync(httpRequest).ConfigureAwait(false);
var result = await response.Content.ReadAsStringAsync();


var deserializedObject = JsonSerializer.Deserialize<AnalyzeResult>(result);
Console.WriteLine($"Model Version: {deserializedObject.ModelVersion}");
Console.WriteLine($"Metadata: {JsonSerializer.Serialize(deserializedObject.Metadata)}");
Console.WriteLine($"Caption Result: {deserializedObject.CaptionResult}");


// Define the AnalyzeRequest class
public class AnalyzeRequest
{
    public string Url { get; set; }
}
```

#### Dense Captioning

Dense Captioning generates detailed, human-readable captions for all significant objects in your image. For instance:

- A person holding a sprig of rosemary.
- A person cutting a sprig of rosemary.
- A city street with many buildings and cars.
- Yellow taxi cabs on a street.

![The image shows a busy city street with many buildings, bright advertisements, and yellow taxis.](https://kodekloud.com/kk-media/image/upload/v1752856882/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-AI-Vision-Service-and-Image-Analysis/busy-city-street-yellow-taxis.jpg)

#### Image Search

The Image Search feature allows you to query a collection of images similar to popular photo management systems. For example, searching for "rocky beaches" among a collection of 260 images retrieves all relevant photos. You can also adjust relevance settings to optimize search results.

![The image shows a webpage from Azure AI Studio with a search interface for image retrieval, displaying various nature-related images, including beaches and landscapes.](https://kodekloud.com/kk-media/image/upload/v1752856883/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-AI-Vision-Service-and-Image-Analysis/azure-ai-studio-image-search-nature.jpg)

#### Common Tag Extraction

This feature extracts descriptive tags from images to enhance categorization. For example, after uploading an image, you might receive tags like "sports person," "skateboarder," "individual sports," or "street stunts." For a seamless experience, create a hub and link it to your Azure AI service.

![The image shows a web interface for creating a new hub in Azure AI Studio, with fields for hub name, subscription, resource group, location, and AI services connections.](https://kodekloud.com/kk-media/image/upload/v1752856884/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-AI-Vision-Service-and-Image-Analysis/azure-ai-studio-new-hub-interface.jpg)

#### Optical Character Recognition (OCR)

OCR is used for extracting both printed and handwritten text from images and documents. This is especially useful for verifying identification documents or digitizing various texts (e.g., nutrition labels showing "sodium 20 mg daily" or "vitamin A 50%").

![The image shows a screenshot of a web page from Azure AI Services, specifically demonstrating optical character recognition (OCR) on a nutrition facts label. The detected text and attributes from the label are displayed on the right side.](https://kodekloud.com/kk-media/image/upload/v1752856885/notes-assets/images/AI-900-Microsoft-Certified-Azure-AI-Fundamentals-AI-Vision-Service-and-Image-Analysis/azure-ai-ocr-nutrition-label-screenshot.jpg)

## Additional Vision Studio Features

In addition to the functionalities discussed above, Vision Studio offers several other features:

- Smart Crop for automated image adjustments.
- Generating human-readable captions for enhanced accessibility.
- Detecting common objects to streamline analysis.
- Extracting text and performing portrait processing.
- Matching photo IDs for verification purposes.

> [!important]
> **Important**
>
> Please note that the multi-account AI Services deployment does not support Vision Studio features directly. To use Vision Studio, create a dedicated Custom Vision service. Similar segregation applies for other domains (e.g., Speech Studio requires a separate Speech service).

The Vision service also offers a free tier, allowing you to experiment with these features without incurring costs. Once the service is set up, you can easily integrate it with Vision Studio for a seamless experience.

## Conclusion

This lesson provided a comprehensive overview of the powerful capabilities available in Azure AI Vision Service—from model customization and OCR to object detection, image captioning, dense captioning, tag extraction, and more. Additionally, we've highlighted the integration paths available via AI Studio, illustrating practical use cases including face detection and image search.

Happy exploring!

For more details on Azure AI services, check out the [Azure AI Documentation](https://azure.microsoft.com/en-us/services/cognitive-services/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/ai-900-microsoft-azure-ai-fundamental/module/46a90709-d0a2-4cb4-b860-dc4d791fd802/lesson/1a3c067e-bfd0-4de0-84df-983d1be18343)**
>
> Watch video content
