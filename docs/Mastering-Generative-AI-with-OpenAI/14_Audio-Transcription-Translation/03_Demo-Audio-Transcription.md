# Demo Audio Transcription - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/Audio-Transcription-Translation/Demo-Audio-Transcription)

---

## Table of Contents

- Demo Audio Transcription
  - Prerequisites
  - 1. Play Audio Locally
  - 2. Transcribe with Whisper
  - 3. Next Steps: NLP Pipelines
  - 4. Run Whisper Locally
  - References
  - Watch Video
  - Practice Lab

---

## Content

Mastering Generative AI with OpenAI

Audio Transcription Translation

# Demo Audio Transcription

In this tutorial, you’ll learn how to transcribe a short audio clip using OpenAI’s Whisper API. We’ve prepared a trimmed MP3 of the first five minutes of Steve Jobs’ Stanford commencement speech for this demo.

## Prerequisites

- Python 3.7+
- An active [OpenAI API key](https://platform.openai.com/account/api-keys)
- `openai` Python package (`pip install openai`)
- `IPython` for in-notebook audio playback (`pip install ipython`)

## 1\. Play Audio Locally

Before sending the file to Whisper, verify playback in an IPython environment:

```
import IPython


file_name = "data/jobs.mp3"
IPython.display.Audio(file_name)
```

## 2\. Transcribe with Whisper

Whisper currently offers the `whisper-1` model for speech-to-text. Set your API key in the environment, then transcribe:

```
import openai
import os


# Load your OpenAI API key from environment
openai.api_key = os.getenv("OPENAI_API_KEY")


file_name = "data/jobs.mp3"
with open(file_name, "rb") as audio_file:
    transcript = openai.Audio.transcribe("whisper-1", audio_file)


print(transcript.text)
```

> [!important]
> **Note**
>
> Make sure `OPENAI_API_KEY` is correctly set. On macOS/Linux:
>
> ```
> export OPENAI_API_KEY="your_api_key_here"
> ```

## 3\. Next Steps: NLP Pipelines

Once you have the raw transcript, you can feed it into large language models like [GPT-3.5 Turbo](https://platform.openai.com/docs/models/gpt-3-5-turbo) or [GPT-4](https://platform.openai.com/docs/models/gpt-4) to:

- Summarize the speech
- Generate Q&A bots
- Classify or analyze sentiment
- Extract key topics

| Use Case           | Model         | Example Link                                                           |
| ------------------ | ------------- | ---------------------------------------------------------------------- |
| Summarization      | GPT-3.5 Turbo | [API Reference](https://platform.openai.com/docs/models/gpt-3-5-turbo) |
| Question & Answer  | GPT-4         | [API Reference](https://platform.openai.com/docs/models/gpt-4)         |
| Sentiment Analysis | GPT-3.5 Turbo | Custom prompt engineering                                              |

## 4\. Run Whisper Locally

If you prefer not to use the API, you can run Whisper on your machine via the [open-source repository](https://github.com/openai/whisper):

![The image shows a code editor with Python code for transcribing audio using OpenAI's API, along with a large block of transcribed text.](https://kodekloud.com/kk-media/image/upload/v1752881496/notes-assets/images/Mastering-Generative-AI-with-OpenAI-Demo-Audio-Transcription/python-code-editor-openai-transcription.jpg)

## References

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/574a8a5c-b7a8-4902-aa33-c26eff12ee0b/lesson/8d23bf62-f4b5-42c8-b193-908989182ca9)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/574a8a5c-b7a8-4902-aa33-c26eff12ee0b/lesson/61015f41-8233-46a7-9e17-44dea34d524e)**
>
> Practice lab
