# Moderation API - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/Mastering-Generative-AI-with-OpenAI/Moderating-Prompts-with-Moderating-API/Moderation-API)

---

## Table of Contents

- Moderation API
  - How the Moderation Endpoint Works
  - Integrating Moderation into Your Application Workflow
  - Best Practices
  - Resources and References
  - Watch Video
    - Example Request
    - Example Response

---

## Content

Mastering Generative AI with OpenAI

Moderating Prompts with Moderating API

# Moderation API

The OpenAI Moderation API helps you detect policy-violating, harmful, or unsafe content in user inputs before sending them to a language model. Integrating this check early in your pipeline ensures compliance, protects end users, and maintains the integrity of your application.

## How the Moderation Endpoint Works

When you submit a prompt to the Moderation API, it returns a JSON payload with three primary sections:

| Field              | Type    | Description                                                          |
| ------------------ | ------- | -------------------------------------------------------------------- |
| flagged            | boolean | `true` if any policy violation is detected; `false` otherwise        |
| categories         | object  | A map of violation categories (e.g., `hate`, `self_harm`) to boolean |
| category\\\_scores | object  | Confidence scores (0.0–1.0) for each category                        |

### Example Request

```
curl https://api.openai.com/v1/moderations \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "input": "Your text to check for policy violations"
  }'
```

### Example Response

```
{
  "id": "modr-XXXXX",
  "model": "text-moderation-004",
  "results": [
    {
      "flagged": false,
      "categories": {
        "hate": false,
        "harassment": false,
        "self_harm": false
      },
      "category_scores": {
        "hate": 0.01,
        "harassment": 0.02,
        "self_harm": 0.00
      }
    }
  ]
}
```

> [!important]
> **Note**
>
> Use the confidence values in `category_scores` to prioritize human review of borderline cases.

## Integrating Moderation into Your Application Workflow

Adopt a secure, four-step flow to vet user inputs before content generation:

1.  Receive the user prompt.
2.  Call the Moderation API.
    - If `flagged` is `true`, return an error:  
      “Your request violates our content policy and cannot be processed.”
    - If `flagged` is `false`, continue.
3.  Invoke the Generation API.
4.  Return the generated response to the end user.

```
# Pseudocode example
def handle_user_prompt(prompt):
    mod_result = call_moderation_api(prompt)
    if mod_result["flagged"]:
        raise PolicyError("Content policy violation detected.")
    return call_generation_api(prompt)
```

> [!important]
> **Warning**
>
> Always enforce the moderation step. Skipping it may expose your system to disallowed or harmful content.

## Best Practices

- Batch multiple inputs in a single moderation request to reduce latency.
- Monitor and log flagged inputs for auditing and continuous policy tuning.
- Adjust internal thresholds based on `category_scores` trends to minimize false positives.

## Resources and References

- [Moderation API Reference](https://platform.openai.com/docs/api-reference/moderations)
- [OpenAI Content Policy](https://platform.openai.com/docs/policies/content-policy)
- [OpenAI API Documentation](https://platform.openai.com/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/mastering-generative-ai-with-openai/module/dca602e2-9f4b-4aa3-b03c-4dc3004871e5/lesson/8624dae5-0b8a-42b7-8352-d8b910684f83)**
>
> Watch video content
