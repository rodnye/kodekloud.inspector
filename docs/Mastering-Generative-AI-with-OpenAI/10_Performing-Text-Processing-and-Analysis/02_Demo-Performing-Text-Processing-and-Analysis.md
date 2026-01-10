# Demo Performing Text Processing and Analysis - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/Performing-Text-Processing-and-Analysis/Demo-Performing-Text-Processing-and-Analysis)

---

## Table of Contents

- Demo Performing Text Processing and Analysis
  - 1. Text Summarization
  - 2. Sentiment Analysis
  - 4. Data Formatting (JSON, XML, JSONL)
  - Summary of Techniques
  - Links and References
  - Watch Video
  - Practice Lab
    - 1.1 Full-Length (~500 words)

---

## Content

Mastering Generative AI with OpenAI

Performing Text Processing and Analysis

# Demo Performing Text Processing and Analysis

Explore four fundamental NLP tasks—summarization, sentiment analysis, translation, and data formatting—using OpenAI’s GPT-3.5-Turbo model in a Jupyter notebook. We’ll define a helper function for chat completions and reuse it throughout.

```
import os
import openai


openai.api_key = os.getenv("OPENAI_API_KEY")
# Alternatively, set your key directly:
def get_word_completion(prompt):
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user",   "content": prompt}
    ]
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    return response.choices[0].message.content
```

> [!important]
> **Note**
>
> Keep your API key secure. Never hardcode it in shared repositories.

---

## 1\. Text Summarization

We’ll summarize Steve Jobs’ 2005 Stanford commencement address in two ways:

1.  A ~500-word narrative
2.  Bullet-point highlights

```
# Load the speech into `context`
context = """
[Steve Jobs’ 2005 Stanford Commencement Address full text goes here…]
"""
```

### 1.1 Full-Length (~500 words)

````
prompt = f"""
Create a summary capturing the main points and key details in 500 words based on the content delimited by triple backticks.
```{context}```
"""
response = get_word_completion(prompt)
print(response)
```text


### 1.2 Bullet-Point Summary


```python
prompt = f"""
Create a summary capturing the main points and key details as bullet points based on the content delimited by triple backticks.
```{context}```
"""
response = get_word_completion(prompt)
print(response)
````

Sample Bullet Output:

- Jobs shared three stories: connecting the dots, love and loss, and reflections on mortality.
- He credited calligraphy classes—taken after dropping out—for the Macintosh’s design.
- Being fired from Apple sparked his creativity at NeXT and Pixar.
- A cancer diagnosis taught him the value of time.
- He concluded with “Stay Hungry. Stay Foolish,” quoting _The Whole Earth Catalog_.

---

## 2\. Sentiment Analysis

Label each movie review as positive, negative, or neutral.

````
context = """
1. If you sometimes like to go to the movies to have fun, Wasabi is a good place to start.
2. An idealistic love story that brings out the latent 15-year-old romantic in everyone.
3. The story loses its bite in a last-minute happy ending that's even less plausible than the rest of the picture.
"""


prompt = f"""
Analyze the sentiment of the reviews delimited in triple backticks.
First show the actual review and then add the sentiment – positive, negative, or neutral.
```{context}```
"""
response = get_word_completion(prompt)
print(response)
```text


**Expected Output**:


1. If you sometimes like to go to the movies to have fun, Wasabi is a good place to start.
   Sentiment: Positive
2. An idealistic love story that brings out the latent 15-year-old romantic in everyone.
   Sentiment: Positive
3. The story loses its bite in a last-minute happy ending that's even less plausible than the rest of the picture.
   Sentiment: Negative


---


## 3. Translation


Translate a French poem by Victor Hugo into English while preserving its poetic style.


```python
context = """
Demain, dès l’aube, à l’heure où blanchit la campagne,
Je partirai. Vois-tu, je sais que tu m’attends.
"""


prompt = f"""
Write an English poem based on the French poem delimited in triple backticks.
```{context}```
"""
response = get_word_completion(prompt)
print(response)
````

**Sample Translation**:

```
Tomorrow, at dawn's early light,
I shall depart, for I know you wait.
Through misty fields and silent night,
I press ahead despite my fate.
...
```

---

## 4\. Data Formatting (JSON, XML, JSONL)

Convert a list of U.S. states and capitals into three structured formats.

````
context = """
1. Alabama - Montgomery
2. California - Sacramento
3. Florida - Tallahassee
4. Georgia - Atlanta
5. Illinois - Springfield
6. Massachusetts - Boston
7. New York - Albany
8. Texas - Austin
9. Pennsylvania - Harrisburg
10. Washington - Olympia
"""


prompt = f"""
From the content delimited in triple backticks, format it into JSON, XML, and JSONL.
```{context}```
"""
response = get_word_completion(prompt)
print(response)
````

| Format                                                           | Example Snippet                                            |
| ---------------------------------------------------------------- | ---------------------------------------------------------- |
| JSON                                                             | \\`\\`\\`json<br>\\[                                       |
| {"state":"Alabama","capital":"Montgomery"},                      |                                                            |
| …<br>\\]\\`\\`\\`                                                |                                                            |
| XML                                                              | \\`\\`\\`xml<br><root>                                     |
| <state><name>Alabama</name><capital>Montgomery</capital></state> |                                                            |
| …                                                                |                                                            |
| </root>\\`\\`\\`                                                 |                                                            |
| JSONL                                                            | `jsonl<br>{"state":"Alabama","capital":"Montgomery"}<br>…` |

---

## Summary of Techniques

| Task               | Description                                           |
| ------------------ | ----------------------------------------------------- |
| Summarization      | Generate full or bullet summaries from large text.    |
| Sentiment Analysis | Classify reviews as positive, negative, or neutral.   |
| Translation        | Translate text while preserving style and tone.       |
| Data Formatting    | Convert unstructured lists into JSON, XML, and JSONL. |

These examples demonstrate how GPT-3.5-Turbo can accelerate common text-processing workflows. Next up: word embeddings and similarity search.

---

## Links and References

- [OpenAI Chat Completion API](https://platform.openai.com/docs/api-reference/chat)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Terraform Registry](https://registry.terraform.io/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/0bad671a-6a77-4e3b-b63d-6c771ea3087f/lesson/57e895f5-f8b2-4066-a203-8cd242d01870)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/0bad671a-6a77-4e3b-b63d-6c771ea3087f/lesson/513d39ab-dcb6-4f67-a208-26949181f4a0)**
>
> Practice lab
