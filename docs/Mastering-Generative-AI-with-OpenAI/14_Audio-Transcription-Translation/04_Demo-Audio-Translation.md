# Demo Audio Translation - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/Audio-Transcription-Translation/Demo-Audio-Translation)

---

## Table of Contents

- Demo Audio Translation
  - Prerequisites
  - Translation Code Example
  - Next Steps
  - Links and References
  - Watch Video
  - Practice Lab
    - Step-by-Step Breakdown

---

## Content

Mastering Generative AI with OpenAI

Audio Transcription Translation

# Demo Audio Translation

In this tutorial, we’ll demonstrate how to translate a short Spanish audio clip into English text using OpenAI’s Whisper API. We'll process a 20-second MP3 segment (up to 25 MB) extracted from an Easy Spanish YouTube video and send it to the API in one request.

## Prerequisites

- Python 3.7+
- `openai` Python SDK
- An OpenAI API key

Install the SDK with:

```
pip install --upgrade openai
```

> [!important]
> **Note**
>
> Ensure your MP3 file is under 25 MB. Whisper supports formats like MP3, WAV, and FLAC.

## Translation Code Example

```
import os
import openai
import IPython.display as ipd


# 1. Configure API key
openai.api_key = os.getenv("OPENAI_API_KEY")


# 2. Load and play the Spanish audio clip
file_name = "data/Spanish.mp3"
audio_file = open(file_name, "rb")
ipd.display(ipd.Audio(file_name))


# 3. Call Whisper for translation
result = openai.Audio.translate("whisper-1", audio_file)


# 4. Output the English translation
print(result.text)
```

### Step-by-Step Breakdown

| Step | Action                               | Code Snippet                                      |
| ---- | ------------------------------------ | ------------------------------------------------- |
| 1    | Configure the OpenAI API key         | `openai.api_key = os.getenv("OPENAI_API_KEY")`    |
| 2    | Load and display the MP3 clip inline | `ipd.display(ipd.Audio(file_name))`               |
| 3    | Translate audio using `whisper-1`    | `openai.Audio.translate("whisper-1", audio_file)` |
| 4    | Print the translated English text    | `print(result.text)`                              |

> [!important]
> **Warning**
>
> Keep your API key secure. Do not hard-code it in public repositories.

## Next Steps

Once you have the translated text, you can pass it to [GPT-4](https://platform.openai.com/docs/models/gpt-4) (or any other LLM) for further processing—such as summarization, sentiment analysis, or content moderation.

## Links and References

- [Whisper Speech-to-Text Guide](https://platform.openai.com/docs/guides/speech-to-text)
- [OpenAI Python SDK Reference](https://github.com/openai/openai-python)
- [GPT-4 Model Details](https://platform.openai.com/docs/models/gpt-4)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/574a8a5c-b7a8-4902-aa33-c26eff12ee0b/lesson/908c22bc-c534-40ba-b504-b5c293dd50f3)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/574a8a5c-b7a8-4902-aa33-c26eff12ee0b/lesson/fe263cc3-81c8-413d-b065-815fecae7149)**
>
> Practice lab
