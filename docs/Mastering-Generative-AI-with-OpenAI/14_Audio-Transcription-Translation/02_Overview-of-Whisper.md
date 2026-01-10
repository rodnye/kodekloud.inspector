# Overview of Whisper - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/Audio-Transcription-Translation/Overview-of-Whisper)

---

## Table of Contents

- Overview of Whisper
  - Key Audio APIs
  - Audio File Size Limit
  - Deployment Options
  - Next Steps
  - Links and References
  - Watch Video

---

## Content

Mastering Generative AI with OpenAI

Audio Transcription Translation

# Overview of Whisper

OpenAI’s Whisper is a specialized foundation model designed for audio-to-text tasks. Unlike GPT-3.5, which processes text, or DALL·E 2, which generates images, Whisper accepts audio files as input and returns text output. It provides two main API endpoints for handling audio content:

## Key Audio APIs

> [!important]
> **Note**
>
> Whisper supports transcription and translation for multiple source languages. However, its accuracy peaks when the output language is set to English.

![The image describes two key APIs: audio transcription, which transcribes audio files into English text, and audio translation, which translates audio files into English text.](https://kodekloud.com/kk-media/image/upload/v1752881497/notes-assets/images/Mastering-Generative-AI-with-OpenAI-Overview-of-Whisper/audio-transcription-translation-apis.jpg)

| Endpoint             | Description                                                               |
| -------------------- | ------------------------------------------------------------------------- |
| audio.transcriptions | Transcribes spoken content from an uploaded audio file into English text. |
| audio.translations   | Translates audio in various languages into English text.                  |

## Audio File Size Limit

> [!important]
> **Warning**
>
> Each audio file uploaded to Whisper must not exceed 25 MB. Exceeding this limit will result in an error response from the API.

![The image shows a document icon with a sound wave and "25MB" on it, indicating that audio file sizes cannot exceed 25MB. It is titled "Two Key APIs."](https://kodekloud.com/kk-media/image/upload/v1752881498/notes-assets/images/Mastering-Generative-AI-with-OpenAI-Overview-of-Whisper/document-icon-sound-wave-25mb.jpg)

## Deployment Options

Whisper is offered both as an open-source model and via the OpenAI API. Depending on your needs:

- **OpenAI API**: Easiest path—no infrastructure setup, automatic scaling, and straightforward billing.
- **Self-hosted Whisper**: Full control over compute environment, on-premises or cloud, ideal for organizations with strict data privacy requirements.

In this guide, we’ll demonstrate how to call the Whisper API through OpenAI’s managed service.

## Next Steps

Let’s dive into a hands-on demo of audio transcription and translation using the OpenAI Whisper API.

---

## Links and References

- [OpenAI Whisper API Reference](https://platform.openai.com/docs/api-reference/audio)
- [Whisper GitHub Repository](https://github.com/openai/whisper)
- [OpenAI API Documentation](https://platform.openai.com/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/574a8a5c-b7a8-4902-aa33-c26eff12ee0b/lesson/aecc63f1-6f2a-4fa2-92c3-27be046237e5)**
>
> Watch video content
