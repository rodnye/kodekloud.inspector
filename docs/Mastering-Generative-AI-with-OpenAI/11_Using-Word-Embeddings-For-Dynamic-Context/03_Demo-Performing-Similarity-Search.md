# Demo Performing Similarity Search - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/Using-Word-Embeddings-For-Dynamic-Context/Demo-Performing-Similarity-Search)

---

## Table of Contents

- Demo Performing Similarity Search
  - 1. Setup
  - 2. Sample Phrases
  - 3. Generating Embeddings
  - 4. Defining Cosine Similarity
  - 5. Running Similarity Searches
  - 6. Discussion
  - Links and References
  - Watch Video
    - 1.1 Install Dependencies
    - 1.2 Import Libraries and Define Helper
    - 5.1 Example Queries

---

## Content

Mastering Generative AI with OpenAI

Using Word Embeddings For Dynamic Context

# Demo Performing Similarity Search

In this guide, you’ll learn how to convert text into numerical vectors (embeddings) using OpenAI’s `text-embedding-ada-002` model and perform similarity searches with NumPy. This technique is essential for building semantic search, recommendation engines, and context-aware chatbots.

## 1\. Setup

### 1.1 Install Dependencies

Make sure you have the OpenAI SDK and NumPy installed:

```
pip install openai numpy
```

### 1.2 Import Libraries and Define Helper

```
import openai
import numpy as np


def text_embedding(text: str) -> list[float]:
    response = openai.Embedding.create(
        model="text-embedding-ada-002",
        input=text
    )
    return response["data"][0]["embedding"]
```

> [!important]
> **Note**
>
> Each embedding from `text-embedding-ada-002` has a fixed dimension of 1536, regardless of the input length.

## 2\. Sample Phrases

We’ll use four phrases that share keywords but differ in meaning:

| Phrase                                                                                   | Context        |
| ---------------------------------------------------------------------------------------- | -------------- |
| "Most of the websites provide the users with the choice of accepting or denying cookies" | Web cookies    |
| "Olivia went to the bank to open a savings account"                                      | Financial bank |
| "Sam sat under a tree that was on the bank of a river"                                   | River bank     |
| "John's cookies were only half-baked but he still carries them for Mary"                 | Edible cookies |

## 3\. Generating Embeddings

Convert each phrase to its embedding vector:

```
phrases = [
    "Most of the websites provide the users with the choice of accepting or denying cookies",
    "Olivia went to the bank to open a savings account",
    "Sam sat under a tree that was on the bank of a river",
    "John's cookies were only half-baked but he still carries them for Mary"
]


embeddings = [text_embedding(p) for p in phrases]
print(f"Embedding dimension: {len(embeddings[0])}")  # Expect 1536
```

## 4\. Defining Cosine Similarity

Cosine similarity measures the angle between two vectors in the semantic space. Identical vectors yield a score of 1.0.

```
def vector_similarity(vec1: list[float], vec2: list[float]) -> float:
    a, b = np.array(vec1), np.array(vec2)
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))
```

## 5\. Running Similarity Searches

Define a function to find the most similar phrase from our list:

```
def find_most_similar(query: str) -> str:
    q_emb = text_embedding(query)
    scores = [vector_similarity(q_emb, emb) for emb in embeddings]
    ranked = sorted(zip(scores, phrases), reverse=True, key=lambda x: x[0])
    best_score, best_phrase = ranked[0]
    print(f"Query: {query!r}\nBest match ({best_score:.2f}): {best_phrase}\n")
    return best_phrase
```

### 5.1 Example Queries

```
find_most_similar("Sam sat under a tree that was on the bank of a river")
find_most_similar("Mary got the biscuits from John that were not fully baked")
find_most_similar("It's recommended to put your savings in a financial institution")
find_most_similar("You get refreshed when you spend time with nature")
find_most_similar("Cookies are covered by GDPR if they collect information about users that could be used to identify them")
```

Expected outputs:

- Exact riverbank match → similarity ≈ 1.00
- Biscuits (edible cookies) → ≈ 0.92
- Financial advice → ≈ 0.84
- Nature reference → ≈ 0.82
- GDPR cookies → ≈ 0.83

## 6\. Discussion

- Embeddings capture **semantic context**, not just surface-level keywords.
- All vectors have the same dimensionality (1536) to sit in a common embedding space.
- Cosine similarity retrieves items by **meaning**, not by exact word overlap.

> [!important]
> **Note**
>
> This approach powers many AI-driven features such as semantic search, recommendation engines, and dynamic context for chatbots.

Experiment by adding new phrases, querying different sentences, and watching how similarity scores adapt to meaning.

## Links and References

- [OpenAI Embeddings Documentation](https://platform.openai.com/docs/guides/embeddings)
- [Cosine Similarity on Wikipedia](https://en.wikipedia.org/wiki/Cosine_similarity)
- [NumPy API Reference](https://numpy.org/doc/stable/reference/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/cf879fc5-dcc3-4470-830d-4393645105c9/lesson/d78345f7-7490-4860-b9fe-da2730b087d8)**
>
> Watch video content
