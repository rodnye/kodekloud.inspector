# Demo Building Dynamic Context with Custom Data Part 2 - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/Using-Word-Embeddings-For-Dynamic-Context/Demo-Building-Dynamic-Context-with-Custom-Data-Part-2)

---

## Table of Contents

- Demo Building Dynamic Context with Custom Data Part 2
  - 1. Generate Embeddings for the text Column
  - 2. Define a Similarity Function
  - 3. Querying the DataFrame with Similarity Search
  - 4. Build the Context Block
  - 6. Resources and References
  - Watch Video
  - Practice Lab

---

## Content

Mastering Generative AI with OpenAI

Using Word Embeddings For Dynamic Context

# Demo Building Dynamic Context with Custom Data Part 2

In this guide, we'll continue from having a `text` column ready as context. Next, we'll generate word embeddings for each sentence, compute similarities, and dynamically build context for OpenAI API calls—all using a pandas DataFrame.

## 1\. Generate Embeddings for the `text` Column

Use your embedding function to vectorize each row in the DataFrame:

```
# Generate embeddings for each row in the 'text' column
df = df.assign(embedding=df["text"].apply(lambda x: text_embedding(x)))
```

> [!important]
> **Note**
>
> Generating embeddings for a large dataset may take some time. For 121 rows, expect multiple API calls.

Inspect the new `embedding` column:

```
df.head()
```

Example output:

```
   year_film  year_ceremony  ceremony                    category                     name                      film  winner                                               text                                           embedding
10639      2022            2023        95       actor in a leading role           Austin Butler                    Elvis   False                 Austin Butler got nominated under the category...                [–0.0378, –0.0199, …]
10640      2022            2023        95       actor in a leading role         Colin Farrell       The Banshees of Inisherin   False                 Colin Farrell got nominated under the category...                [–0.0082, –0.0100, …]
…          …               …       …                                 …                          …                         …      …                                               …                                               …
```

To view a specific example:

```
df["text"].iloc[100]
# Output:
# 'Viktor Prášil, Frank Kruse, Markus Stembler, Lars Ginzel and Stefan Korte got nominated under the category, sound, for the film All Quiet on the Western Front but did not win'
```

## 2\. Define a Similarity Function

We'll use the dot product to measure vector similarity:

```
import numpy as np


def vector_similarity(vec1, vec2):
    return np.dot(np.squeeze(np.array(vec1)), np.squeeze(np.array(vec2)))
```

## 3\. Querying the DataFrame with Similarity Search

When asking a question (e.g., “Who won the Best Picture award?”), follow these steps:

1.  **Embed the query**
2.  **Compute similarity** against each row
3.  **Select top candidates**

```
# 1. Embed the query
query = "Who won the Best Picture award?"
query_embedding = text_embedding(query)


# 2. Compute similarity for each row
df["similarity"] = df["embedding"].apply(lambda x: vector_similarity(x, query_embedding))


# 3. Retrieve top 20 matches
top_res = df.nlargest(20, "similarity")
```

## 4\. Build the Context Block

Concatenate the top candidates into one string:

```
context = "\n".join(top_res["text"])
print(context)
```

Now craft the prompt and call the API:

````
prompt = f"""
From the data provided in three backticks, respond to the question: {query}
```{context}```
"""


result = get_word_completion(prompt)
print(result)
```text


Expected output:
````

The film "Everything Everywhere All at Once" won the Best Picture award at the 95th Oscar awards.

````
[object Object],


## 5. Try a Different Question


For example, “Who is the lyricist for RRR?”:


```python
query = "Who is the lyricist for RRR?"
query_embedding = text_embedding(query)


# Recompute similarities and get top matches
df["similarity"] = df["embedding"].apply(lambda x: vector_similarity(x, query_embedding))
top_res = df.nlargest(20, "similarity")
context = "\n".join(top_res["text"])


# Craft prompt and call API
prompt = f"""
From the data provided in three backticks, respond to the question: {query}
```{context}```
"""


result = get_word_completion(prompt)
print(result)
````

Expected response:

```
The lyricist for RRR is Chandra Bose.
```

## 6\. Resources and References

| Resource                         | Description                            | Link                                                                   |
| -------------------------------- | -------------------------------------- | ---------------------------------------------------------------------- |
| pandas DataFrame                 | Data manipulation and analysis         | https://pandas.pydata.org/                                             |
| OpenAI Embeddings API            | Generate vector embeddings             | https://openai.com/embeddings                                          |
| NumPy                            | Numerical computing in Python          | https://numpy.org/                                                     |
| Best Practices for Prompt Design | Tips for crafting effective AI prompts | https://platform.openai.com/docs/guides/chat/completions-prompt-design |

---

This workflow—building dynamic context from a DataFrame using embeddings, then crafting prompts on the fly—unlocks powerful generative AI applications with OpenAI.

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/cf879fc5-dcc3-4470-830d-4393645105c9/lesson/ad69eb15-6828-4cde-8497-48ae10cfce23)**
>
> Watch video content

> [!important]
> **## [Practice Lab](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/cf879fc5-dcc3-4470-830d-4393645105c9/lesson/ccfb6f10-72b1-43e1-a9a7-c0836f996463)**
>
> Practice lab
