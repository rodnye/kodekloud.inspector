# LLM Response - KodeKloud Notes

[Source URL](https://notes.kodekloud.com/docs/LangChain/Building-Blocks-of-LLM-Apps/LLM-Response)

---

## Table of Contents

- LLM Response
  - Receiving the LLM Response
  - Formatting and Parsing LLM Output
  - Cleaning and Validating the Output
  - Next Steps: Model I/O Patterns
  - Links and References
  - Watch Video
    - Example: Calculating Date Differences
    - Structuring Output in Desired Formats

---

## Content

LangChain

Building Blocks of LLM Apps

# LLM Response

When interacting with a language model, the raw output is always returned as a string. Depending on your application, you'll need to parse, validate, and reformat this text before using it in your codebase.

## Receiving the LLM Response

Typically, sending a prompt (and optional context) looks like this:

```
# Send prompt to LLM and receive a raw string response
response = llm.generate(prompt, context=optional_context)
print(type(response))  # <class 'str'>
```

## Formatting and Parsing LLM Output

Below are patterns to transform raw LLM responses into structured data.

### Example: Calculating Date Differences

Suppose the LLM returns two dates in plain text:

```
Start date: 2023-07-15
End date:   2023-08-01
```

You can extract and compute the difference with Python:

```
from datetime import datetime

# Simulated LLM output
llm_output = "Start date: 2023-07-15\nEnd date:   2023-08-01"

# Split lines and extract date strings
lines = llm_output.splitlines()
start_str = lines[0].split(":")[1].strip()
end_str   = lines[1].split(":")[1].strip()

# Parse to datetime objects
start_date = datetime.strptime(start_str, "%Y-%m-%d")
end_date   = datetime.strptime(end_str,   "%Y-%m-%d")

# Compute and display difference
delta = end_date - start_date
print(f"Number of days between dates: {delta.days}")
```

> [!important]
> **Tip**
>
> Always `strip()` your strings to remove extra whitespace or escape characters before parsing.

### Structuring Output in Desired Formats

As an alternative, ask the LLM to return JSON for easier parsing:

```
{
  "start_date": "2023-07-15",
  "end_date":   "2023-08-01"
}
```

Then you can load and process it:

```
import json
from datetime import datetime

json_str = '''
{"start_date": "2023-07-15", "end_date": "2023-08-01"}
'''
data = json.loads(json_str)
start_date = datetime.fromisoformat(data["start_date"])
end_date   = datetime.fromisoformat(data["end_date"])

print((end_date - start_date).days)
```

You can apply similar strategies with other formats:

| Format | Library     | Use Case                     |
| ------ | ----------- | ---------------------------- |
| JSON   | `json`      | Fast and ubiquitous          |
| YAML   | `PyYAML`    | Human-readable configuration |
| XML    | `xml.etree` | Interoperability with legacy |
| CSV    | `csv`       | Tabular data exchange        |

> [!important]
> **Note**
>
> Choose the format that best fits your downstream requirements and existing data pipeline.

## Cleaning and Validating the Output

A robust post-processing pipeline should:

- Trim whitespace and remove unwanted escape characters
- Validate date formats (e.g., using `datetime.strptime`)
- Check numeric ranges and required fields
- Handle missing or malformed values gracefully

> [!important]
> **Warning**
>
> Skipping validation can lead to runtime errors or corrupted data in production.

## Next Steps: Model I/O Patterns

Explore best practices for serializing and deserializing data when calling language models. Learn how to:

- Stream outputs incrementally
- Implement retry logic and error handling
- Cache or batch requests for performance

## Links and References

- [Python datetime Documentation](https://docs.python.org/3/library/datetime.html)
- [json — JSON encoder and decoder](https://docs.python.org/3/library/json.html)
- [PyYAML](https://pyyaml.org/)
- [xml.etree.ElementTree](https://docs.python.org/3/library/xml.etree.elementtree.html)
- [csv — CSV File Reading and Writing](https://docs.python.org/3/library/csv.html)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

> [!important]
> **## [Watch Video](https://learn.kodekloud.com/user/courses/langchain/module/bb8afda8-9de9-4865-aabf-bc71786440b2/lesson/cf17e488-e86d-494b-b410-6e89b4f47212)**
>
> Watch video content
