# Polly - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Data-and-ML/Polly)

---

## Table of Contents

- Polly
  - How AWS Polly Works
  - Key Features of AWS Polly
  - Example Implementation Workflow
  - Practical Use Case: Smart Thermostat Integration
  - Get Involved
  - Watch Video

---

## Content

AWS Solutions Architect Associate Certification

Services Data and ML

# Polly

Welcome back. In this article, we explore AWS Polly—a powerful machine learning service that converts text into lifelike speech. AWS Polly is designed to provide natural-sounding audio output for applications such as voice assistants, automated announcements, and more. It seamlessly integrates with other AWS services to deliver streamlined, end-to-end voice applications.

## How AWS Polly Works

At its core, Polly takes text input, synthesizes it, and returns voice output. For example, if you ask, "Hey, tell me about the weather," Polly will generate a spoken response like "Today's forecast is mostly sunny with a high of 25°C."

![The image shows a conversation between a person and a robot about the weather, with the robot providing a sunny forecast and temperature details.](https://kodekloud.com/kk-media/image/upload/v1752865081/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Polly/conversation-robot-weather-forecast.jpg)

Polly supports both real-time speech synthesis streaming and audio file generation. This flexibility allows you to either stream the audio directly during interactions or store audio files for later playback. Moreover, Polly supports the Speech Synthesis Markup Language (SSML), which provides granular control over pronunciation, volume, pitch, and speed—making the interactions sound more natural and expressive.

> [!important]
> **Custom Lexicons**
>
> Polly allows the use of custom lexicons, essentially custom dictionaries, to accommodate specialized pronunciations or terminology unique to your business or specific use case.

## Key Features of AWS Polly

Polly's feature set makes it an essential tool for voice-enabled applications:

![The image lists five features: Lifelike Speech, Real-Time Streaming or File Generation, SSML Support, Lexicon Support, and Integration with Other AWS Services. Each feature is represented with an icon and a number.](https://kodekloud.com/kk-media/image/upload/v1752865082/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Polly/aws-features-speech-streaming-ssml.jpg)

- **Lifelike Speech:** Generate natural-sounding audio from text.
- **Real-Time Streaming and File Generation:** Choose between streaming audio directly or saving it for later use.
- **SSML Support:** Control pronunciation, volume, pitch, and speed.
- **Custom Lexicons:** Use dictionaries tailored to your specific needs.
- **AWS Integration:** Easily integrate Polly with other AWS services.

## Example Implementation Workflow

A typical implementation of AWS Polly involves the following steps:

1.  A transcription file (e.g., a video script or document) is uploaded to an Amazon S3 bucket.
2.  This event triggers an AWS Lambda function that calls Polly to perform text-to-speech conversion.
3.  The resulting audio file is then saved to an output S3 bucket, making it immediately available for playback or further dissemination.

![The image is a flowchart illustrating a process involving AWS services, where a text file is uploaded to an S3 bucket, triggering AWS Lambda to convert text to speech using Amazon Polly, and saving the audio to an output S3 bucket.](https://kodekloud.com/kk-media/image/upload/v1752865084/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Polly/aws-flowchart-text-to-speech.jpg)

## Practical Use Case: Smart Thermostat Integration

Consider a practical example where a smart thermostat, equipped with sensors and connected via AWS IoT Core, responds to voice commands. Here's how it works:

1.  The thermostat sends a voice command using the MQTT protocol.
2.  Amazon Transcribe converts the spoken command into text.
3.  An AWS Lambda function processes the text and interacts with AWS IoT Core.
4.  AWS Polly converts the resulting text (e.g., "Temperature set to 22°C") back into spoken audio for the user.

![The image is a flowchart illustrating a process where a voice command to set a temperature is converted to text using Amazon Transcribe, processed through AWS IoT Core and AWS Lambda, and then converted back to speech using Amazon Polly.](https://kodekloud.com/kk-media/image/upload/v1752865085/notes-assets/images/AWS-Solutions-Architect-Associate-Certification-Polly/voice-command-temperature-flowchart.jpg)

> [!important]
> **Service Separation**
>
> Note that AWS Transcribe handles the conversion of speech to text, while AWS Polly solely focuses on transforming text back into speech. This clear separation ensures optimal performance and smoother interactions across your applications.

## Get Involved

I'm Michael Forrester. If you have any questions or need further clarification, please join our discussion on [kodekloud.slack.com](https://kodekloud.slack.com) under the AWS courses channel. Thank you for reading this article, and I look forward to connecting with you in the next lesson.

For additional insights, explore our documentation and related resources on [AWS Documentation](https://aws.amazon.com/documentation/) and [AWS Blogs](https://aws.amazon.com/blogs/).

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/aws-solutions-architect-associate-certification/module/6d26fc1b-226e-4b42-be1f-f8168af74bb3/lesson/1e093344-7338-4ae6-8531-7c7eadfc6141)**
>
> Watch video content
